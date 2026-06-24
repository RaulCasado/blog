import { expect, test } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const routes = [
  { name: 'home-es', path: '/es/' },
  { name: 'home-en', path: '/en/' },
  { name: 'portfolio', path: '/es/portfolio/' },
  { name: 'blog', path: '/es/blog/' },
  { name: 'article', path: '/es/blog/job-1/' },
];

const scope = process.env.AUDIT_BASE_URL ? 'production' : 'local';

for (const route of routes) {
  test(`${route.name}: rendering, console, images and responsive layout`, async ({ page }, testInfo) => {
    const consoleErrors: string[] = [];
    const thirdPartyFindings: string[] = [];
    const pageErrors: string[] = [];
    page.on('console', message => {
      if (message.type() !== 'error') return;
      const location = message.location().url;
      if (location.startsWith('https://giscus.app/api/discussions')) {
        thirdPartyFindings.push(`${message.text()} (${location})`);
      } else {
        consoleErrors.push(`${message.text()}${location ? ` (${location})` : ''}`);
      }
    });
    page.on('pageerror', error => pageErrors.push(error.message));

    const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1_500);

    expect(response?.status(), 'HTTP status').toBeLessThan(400);
    expect(await page.title(), 'document title').not.toBe('');

    const h1Count = await page.locator('h1').count();
    const semanticFindings = [];
    if (h1Count !== 1) semanticFindings.push({ rule: 'one-h1', actual: h1Count });
    await testInfo.attach('semantic-findings', {
      body: Buffer.from(JSON.stringify(semanticFindings, null, 2)),
      contentType: 'application/json',
    });
    expect(h1Count, 'page should expose exactly one h1').toBe(1);

    if (route.name === 'portfolio') {
      // Portfolio is now a static curated list (no language filters); just ensure
      // no incomplete tablist ARIA remains.
      await expect(page.locator('[role="tablist"]'), 'portfolio filters should not use incomplete tabs ARIA').toHaveCount(0);
    }

    await page.evaluate(async () => {
      const step = Math.max(window.innerHeight, 600);
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(resolve => setTimeout(resolve, 80));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500);
    await testInfo.attach('third-party-findings', {
      body: Buffer.from(JSON.stringify(thirdPartyFindings, null, 2)),
      contentType: 'application/json',
    });

    const brokenImages = await page.locator('img').evaluateAll(images =>
      images
        .filter(image => !image.complete || image.naturalWidth === 0)
        .map(image => image.getAttribute('src') || '(missing src)'),
    );
    const horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );

    expect(brokenImages, 'broken images').toEqual([]);
    expect(horizontalOverflow, 'horizontal overflow in pixels').toBeLessThanOrEqual(1);
    expect(pageErrors, 'uncaught page errors').toEqual([]);
    expect(consoleErrors, 'console errors').toEqual([]);

    const screenshotDir = path.resolve('.audit', scope, 'screenshots', testInfo.project.name);
    await mkdir(screenshotDir, { recursive: true });
    await page.screenshot({
      path: path.join(screenshotDir, `${route.name}.png`),
      fullPage: true,
    });
  });
}

test('primary interactions remain usable', async ({ page }, testInfo) => {
  await page.goto('/es/', { waitUntil: 'domcontentloaded' });

  if (testInfo.project.name === 'mobile-chrome') {
    const burger = page.locator('#burger-menu-toggle');
    await expect(burger).toBeVisible();
    await burger.click();
    await expect(page.locator('.nav-container')).toHaveClass(/active/);
  }

  const themeToggle = page.locator('#theme-toggle');
  const initialTheme = await page.locator('html').getAttribute('class');
  await themeToggle.click();
  await expect(page.locator('html')).not.toHaveAttribute('class', initialTheme || '');

  const languageSelect = page.locator('#language-select');
  await expect(languageSelect).toBeVisible();
  await expect(languageSelect.locator('option')).toHaveCount(2);

  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();
});

test('seed pages do not expose broken internal links', async ({ page, request }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chrome', 'One crawl is sufficient for viewport-independent links.');
  const baseUrl = new URL(process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4321');
  const internalLinks = new Set<string>();

  for (const route of routes) {
    await page.goto(route.path, { waitUntil: 'domcontentloaded' });
    const hrefs = await page.locator('a[href]').evaluateAll(anchors =>
      anchors.map(anchor => (anchor as HTMLAnchorElement).href),
    );
    for (const href of hrefs) {
      const url = new URL(href);
      if (url.origin === baseUrl.origin) {
        url.hash = '';
        internalLinks.add(url.href);
      }
    }
  }

  const broken: Array<{ url: string; status: number }> = [];
  for (const url of internalLinks) {
    let response;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        response = await request.get(url, { failOnStatusCode: false, timeout: 20_000 });
        break;
      } catch {
        await new Promise(resolve => setTimeout(resolve, 300 * (attempt + 1)));
      }
    }
    if (!response || response.status() >= 400) {
      broken.push({ url, status: response?.status() || 0 });
    }
  }
  expect(broken).toEqual([]);
});

test('every blog article exposes exactly one h1', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chrome', 'Heading structure is viewport-independent.');
  const baseUrl = new URL(process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4321');
  const articleListPages = ['/es/blog/', '/en/blog/'];
  const articleUrls = new Set<string>();

  for (const listPath of articleListPages) {
    await page.goto(listPath, { waitUntil: 'domcontentloaded' });
    const hrefs = await page.locator('a[href*="/blog/"]').evaluateAll(anchors =>
      anchors.map(anchor => (anchor as HTMLAnchorElement).href),
    );
    for (const href of hrefs) {
      const { origin, pathname } = new URL(href);
      if (origin !== baseUrl.origin) continue;
      // Keep article pages (/<lang>/blog/<slug>/); exclude the index and tag listings.
      if (/^\/(es|en)\/blog\/[^/]+\/?$/.test(pathname) && !pathname.includes('/tag')) {
        articleUrls.add(new URL(pathname, baseUrl).href);
      }
    }
  }

  expect(articleUrls.size, 'crawl should discover blog articles').toBeGreaterThan(0);

  const offenders: Array<{ url: string; h1Count: number }> = [];
  for (const url of articleUrls) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const h1Count = await page.locator('h1').count();
    if (h1Count !== 1) offenders.push({ url, h1Count });
  }

  await testInfo.attach('article-h1-audit', {
    body: Buffer.from(JSON.stringify({ checked: articleUrls.size, offenders }, null, 2)),
    contentType: 'application/json',
  });
  expect(offenders, 'every article must expose exactly one h1').toEqual([]);
});

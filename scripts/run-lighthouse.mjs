import { spawn } from 'node:child_process';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const remoteBaseUrl = process.env.AUDIT_BASE_URL;
const baseUrl = remoteBaseUrl || 'http://127.0.0.1:4321';
const scope = remoteBaseUrl ? 'production' : 'local';
const outputDir = path.resolve('.audit', scope, 'lighthouse');
const routes = [
  { name: 'home', path: '/es/' },
  { name: 'portfolio', path: '/es/portfolio/' },
  { name: 'blog', path: '/es/blog/' },
  { name: 'article', path: '/es/blog/job-1/' },
];

await mkdir(outputDir, { recursive: true });
let preview;

try {
  if (!remoteBaseUrl) {
    preview = spawn('pnpm', ['preview', '--host', '127.0.0.1', '--port', '4321'], {
      cwd: process.cwd(),
      detached: true,
      stdio: 'ignore',
    });
    await waitForServer(baseUrl);
  }

  for (const route of routes) {
    for (const mode of ['mobile', 'desktop']) {
      const outputPath = path.join(outputDir, `${route.name}-${mode}`);
      const args = [
        'exec',
        'lighthouse',
        new URL(route.path, baseUrl).href,
        '--quiet',
        '--output=json',
        '--output=html',
        `--output-path=${outputPath}`,
        '--only-categories=performance,accessibility,best-practices,seo',
        '--chrome-flags=--headless --no-sandbox --disable-gpu',
      ];
      if (mode === 'desktop') args.push('--preset=desktop');
      await run('pnpm', args, { CHROME_PATH: '/usr/bin/google-chrome' });
      process.stdout.write(`Lighthouse ${scope}: ${route.name} ${mode}\n`);
    }
  }

  await writeSummary(outputDir);
} finally {
  if (preview?.pid) {
    try {
      process.kill(-preview.pid, 'SIGTERM');
    } catch {
      // The preview process may already have exited.
    }
  }
}

async function waitForServer(url) {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Preview is still starting.
    }
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  throw new Error(`Preview did not become available at ${url}`);
}

function run(command, args, extraEnv = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: process.cwd(),
      stdio: 'inherit',
      env: { ...process.env, ...extraEnv },
    });
    child.on('error', reject);
    child.on('exit', code => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(' ')} exited with ${code}`));
    });
  });
}

async function writeSummary(directory) {
  const files = (await readdir(directory)).filter(file => file.endsWith('.report.json'));
  const summary = [];
  for (const file of files) {
    const report = JSON.parse(await readFile(path.join(directory, file), 'utf8'));
    const audit = id => report.audits[id]?.numericValue ?? null;
    summary.push({
      report: file,
      url: report.finalDisplayedUrl,
      scores: Object.fromEntries(
        Object.entries(report.categories).map(([key, value]) => [key, Math.round(value.score * 100)]),
      ),
      metrics: {
        fcpMs: audit('first-contentful-paint'),
        lcpMs: audit('largest-contentful-paint'),
        cls: audit('cumulative-layout-shift'),
        tbtMs: audit('total-blocking-time'),
        speedIndexMs: audit('speed-index'),
        transferBytes: audit('total-byte-weight'),
        requests: report.audits['network-requests']?.details?.items?.length ?? null,
      },
    });
  }
  await writeFile(path.join(directory, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`);
}

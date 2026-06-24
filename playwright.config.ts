import { defineConfig, devices } from '@playwright/test';

const remoteBaseUrl = process.env.AUDIT_BASE_URL;
const baseURL = remoteBaseUrl || 'http://127.0.0.1:4321';
const scope = remoteBaseUrl ? 'production' : 'local';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  timeout: 45_000,
  expect: { timeout: 8_000 },
  outputDir: `.audit/${scope}/playwright-results`,
  reporter: [
    ['list'],
    ['json', { outputFile: `.audit/${scope}/playwright-results.json` }],
    ['html', { outputFolder: `.audit/${scope}/playwright-report`, open: 'never' }],
  ],
  use: {
    baseURL,
    channel: 'chrome',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop-chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 7'],
      },
    },
  ],
  webServer: remoteBaseUrl
    ? undefined
    : {
        command: 'pnpm build && pnpm preview --host 127.0.0.1 --port 4321',
        // `/` only 301-redirects via Netlify _redirects (not processed by the
        // local preview server), so probe a real page for the readiness check.
        url: `${baseURL}/es/`,
        reuseExistingServer: false,
        timeout: 120_000,
      },
});

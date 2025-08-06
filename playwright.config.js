// @ts-check
import { defineConfig } from '@playwright/test'

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  // Retry failed tests in CI
  retries: process.env.CI ? 2 : 0,
  // Limit parallel workers in CI
  workers: process.env.CI ? 1 : undefined,
  use: {
    // Configure browsers for headless mode in CI
    headless: true,
    // Set viewport size
    viewport: { width: 1280, height: 720 },
    // Ignore HTTPS errors
    ignoreHTTPSErrors: true,
    // Add navigation timeout
    navigationTimeout: 30000,
    // Add action timeout
    actionTimeout: 15000,
  },
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 180000, // Increase to 3 minutes
    stderr: 'pipe',
    stdout: 'pipe',
  },
  // Configure browsers
  projects: [
    {
      name: 'chromium',
      use: {
        ...require('@playwright/test').devices['Desktop Chrome'],
        // Disable GPU acceleration in CI
        launchOptions: {
          args: process.env.CI
            ? [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
              ]
            : [],
        },
      },
    },
  ],
})

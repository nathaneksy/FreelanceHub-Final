import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  testMatch: "*.spec.js",
  workers: 1,
  timeout: 30000,
  use: {
    baseURL: process.env.E2E_BASE_URL || "http://127.0.0.1:5180",
    headless: true,
    actionTimeout: 10000,
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined,
    },
  },
  reporter: "list",
});

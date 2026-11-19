import { test, expect } from "@playwright/test";
test("preview is transparent, read-only, role-filtered, and responsive", async ({
  page,
  baseURL,
}) => {
  await page.goto("/");
  await expect(
    page.getByText("Read-only team preview", { exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Brand refresh", exact: false }).click();
  await page.getByText("Edit project details", { exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Save project" }),
  ).toBeDisabled();
  const response = await page.request.post("/?project=1&/mutate", {
    form: { kind: "project-edit", id: "1", name: "Injected" },
    headers: { Origin: baseURL },
  });
  expect(response.status()).toBe(503);
  expect(await response.text()).toContain(
    "Accounts and saving are unavailable",
  );
  await page.goto("/?role=client");
  await page.getByRole("link", { name: "Brand refresh", exact: false }).click();
  expect(page.url()).toContain("role=client");
  await expect(
    page.getByText("Share initial concepts", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Prepare internal review notes", { exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByText("Edit project details", { exact: true }),
  ).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "test-results/mobile-client-preview.png",
    fullPage: true,
  });
  await page.goto("/login");
  await expect(
    page.getByRole("heading", { name: "Accounts are coming next." }),
  ).toBeVisible();
  const login = await page.request.post("/login", {
    form: { email: "test@example.com", password: "NotARealAccount" },
    headers: { Origin: baseURL },
  });
  expect(login.status()).toBe(503);
});

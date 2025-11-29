import { test, expect } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading")).toBeVisible();
});

test("header has Home link", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
});

test("header has Communities link", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Communities" })).toBeVisible();
});

test("navigate to communities page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Communities" }).first().click();
  await expect(page.getByRole("heading", { name: "Communities" })).toBeVisible();
});

test("communities page has title text", async ({ page }) => {
  await page.goto("/communities");
  await expect(page.getByRole("heading", { name: "Communities" })).toBeVisible();
});

test("homepage shows empty state OR heading", async ({ page }) => {
  await page.goto("/");
  // Either "No posts yet" or homepage heading exists
  const heading = page.getByRole("heading");
  await expect(heading).toBeVisible();
});

test("navigate to login page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /login/i }).first().click();
  await expect(page.getByRole("heading", { name: /login/i })).toBeVisible();
});

test("login page has email input", async ({ page }) => {
  await page.goto("/auth/login");
  await expect(page.locator("input[type=email]")).toBeVisible();
});

test("login page has password input", async ({ page }) => {
  await page.goto("/auth/login");
  await expect(page.locator("input[type=password]")).toBeVisible();
});

test("navigate to register page", async ({ page }) => {
  await page.goto("/auth/login");
  await page.getByRole("link", { name: /register/i }).first().click();
  await expect(page.getByRole("heading", { name: /register/i })).toBeVisible();
});

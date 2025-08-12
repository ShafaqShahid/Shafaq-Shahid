import { BeforeAll, AfterAll, Before, After, Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page, expect } from '@playwright/test';

setDefaultTimeout(60_000);

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async () => {
  browser = await chromium.launch({ headless: true });
});

AfterAll(async () => {
  await browser?.close();
});

Before(async () => {
  context = await browser.newContext();
  page = await context.newPage();
});

After(async () => {
  await context?.close();
});

Given('I am on the login page', async () => {
  await page.goto('https://example.com/login');
  await expect(page.getByTestId('login-title')).toBeVisible();
});

When('I log in with email {string} and password {string}', async (email: string, password: string) => {
  await page.getByTestId('email-input').fill(email);
  await page.getByTestId('password-input').fill(password);
  await page.getByTestId('login-submit').click();
});

Then('I should see the dashboard', async () => {
  await page.waitForURL('**/dashboard');
  await expect(page.getByTestId('user-greeting')).toContainText('Welcome');
});

Then('I should see an invalid credentials error', async () => {
  await expect(page.getByTestId('login-error')).toHaveText(/invalid credentials/i);
});

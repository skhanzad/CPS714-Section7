import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');
  await page.getByRole('button', { name: 'Test Login (System Admin)' }).click();
  await page.getByRole('link', { name: 'Register as a Club Organizer!' }).click();
  await page.getByRole('textbox', { name: 'Club Name:' }).click();
  await page.getByRole('textbox', { name: 'Club Name:' }).fill('test club');
  await page.getByRole('button', { name: 'Register as Club Leader' }).click();
  await page.getByText('You are now registered as a').click();
});
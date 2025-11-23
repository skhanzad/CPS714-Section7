import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://mtjgmoctyzgfubkpsydg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10amdtb2N0eXpnZnVia3BzeWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2Mjc5MTksImV4cCI6MjA3NTIwMzkxOX0.9Ku1_VjUhsBUtHwPSiBCYAez8sWyhK0x6Hc2SVxpqnk";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//console.log("Supabase object:", supabaseClient);


test('Sign in', async ({ page }) => {

  await supabaseClient
  .from('users')
  .update({ role: 'Student' })
  .eq('email', 'eric.shaw@torontomu.ca')

  await page.goto('http://127.0.0.1:5500/');
  await page.getByRole('button', { name: 'Test Login (System Admin)' }).click();

  const { data } = await supabaseClient
  .from('users')
  .select('*')
  .eq('email', 'eric.shaw@torontomu.ca')
  .maybeSingle();

  expect(data.role).toBe('Student');
});

test('Access Denied to Create Events', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');
  await page.getByRole('button', { name: 'Test Login (System Admin)' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('link', { name: 'Create Events' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('link', { name: 'Create Events' }).click();

  const { data } = await supabaseClient
  .from('users')
  .select('*')
  .eq('email', 'eric.shaw@torontomu.ca')
  .maybeSingle();

  expect(data.role).toBe('Student');
});

test('Register as Club Leader', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');
  await page.getByRole('button', { name: 'Test Login (System Admin)' }).click();
  await page.getByRole('link', { name: 'Register as a Club Organizer!' }).click();
  await page.getByRole('textbox', { name: 'Club Name:' }).click();
  await page.getByRole('textbox', { name: 'Club Name:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Club Name:' }).fill('T');
  await page.getByRole('textbox', { name: 'Club Name:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Club Name:' }).fill('Test ');
  await page.getByRole('textbox', { name: 'Club Name:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Club Name:' }).fill('Test C');
  await page.getByRole('textbox', { name: 'Club Name:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Club Name:' }).fill('Test Club');
  await page.getByRole('button', { name: 'Register as Club Leader' }).click();

  await page.waitForTimeout(1000); // Wait for the role update to process
  const { data } = await supabaseClient
  .from('users')
  .select('*')
  .eq('email', 'eric.shaw@torontomu.ca')
  .maybeSingle();

  expect(data.role).toBe('Club Leader');
});


test('Access Event Creation with Club Leader Role', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');
  await page.getByRole('button', { name: 'Test Login (System Admin)' }).click();

  await supabaseClient
  .from('users')
  .update({ role: 'Club Leader' })
  .eq('email', 'eric.shaw@torontomu.ca')
  await page.waitForTimeout(1000);

  const { data } = await supabaseClient
  .from('users')
  .select('*')
  .eq('email', 'eric.shaw@torontomu.ca')
  .maybeSingle();

  await page.getByRole('link', { name: 'Create Events' }).click();

  expect(data.role).toBe('Club Leader');
});

test('As admin, update other roles', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  await supabaseClient
  .from('users')
  .update({ role: 'System Administrator' })
  .eq('email', 'eric.shaw@torontomu.ca')
  
  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: 'Test Login (System Admin)' }).click();
  await page.getByRole('link', { name: 'Admin Console' }).click();
  await page.getByText('User Management View all').click();
  await page.getByRole('button', { name: 'Refresh' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('row', { name: '11 Eric Shaw eric.shaw@' }).getByRole('combobox').selectOption('Student');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('row', { name: '11 Eric Shaw eric.shaw@' }).getByRole('combobox').selectOption('System Administrator');
});
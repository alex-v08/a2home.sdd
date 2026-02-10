import { test, expect } from '@playwright/test';

test.describe('A2Home Full Booking Cycle', () => {
  test('Client creates booking and Provider accepts - Real-time update', async ({ browser }) => {
    // Create two separate contexts (Client and Provider)
    const clientContext = await browser.newContext();
    const providerContext = await browser.newContext();

    const clientPage = await clientContext.newPage();
    const providerPage = await providerContext.newPage();

    // STEP 1: Client logs in
    await clientPage.goto('http://localhost:3001');
    await clientPage.waitForLoadState('networkidle');
    
    await clientPage.click('button:has-text("Login as Client")');
    await clientPage.waitForTimeout(2000);

    // STEP 2: Client creates a booking
    await clientPage.fill('input[placeholder="e.g. plumbing"]', 'plumbing_test');
    await clientPage.fill('input[placeholder="-34.60"]', '-34.6037');
    await clientPage.fill('input[placeholder="-58.38"]', '-58.3816');
    await clientPage.fill('input[placeholder="1000"]', '5000');
    
    await clientPage.click('button:has-text("Book Now")');
    
    // Wait for booking to be created and status tracker to appear
    await clientPage.waitForTimeout(3000);
    
    // Verify client sees "Waiting for Provider" status
    await expect(clientPage.locator('text=Waiting for Provider')).toBeVisible({ timeout: 10000 });
    console.log('✅ Client: Booking created, waiting for provider...');

    // STEP 3: Provider logs in
    await providerPage.goto('http://localhost:3001');
    await providerPage.waitForLoadState('networkidle');
    
    await providerPage.click('button:has-text("Login as Provider")');
    await providerPage.waitForTimeout(2000);

    // STEP 4: Provider sees pending bookings
    await expect(providerPage.locator('text=Available Bookings')).toBeVisible({ timeout: 10000 });
    console.log('✅ Provider: Viewing available bookings...');

    // STEP 5: Provider accepts the booking
    const acceptButton = providerPage.locator('button:has-text("Accept")').first();
    await expect(acceptButton).toBeVisible({ timeout: 10000 });
    await acceptButton.click();
    
    await providerPage.waitForTimeout(2000);
    console.log('✅ Provider: Booking accepted!');

    // STEP 6: Client receives real-time update via WebSocket
    await expect(clientPage.locator('text=Provider on the way!')).toBeVisible({ timeout: 15000 });
    console.log('✅ Client: Real-time update received! Provider confirmed.');

    // Verify the success icon is visible
    await expect(clientPage.locator('text=✓')).toBeVisible();

    // Cleanup
    await clientContext.close();
    await providerContext.close();
  });
});

import { test, expect } from '@playwright/test';

test.describe('Profile response mock', () => {

    test('Profile should display mocked user data', async ({ page }) => {

        const mockedProfile = {
            status: 'ok',
            data: {
                userId: 100,
                photoFilename: 'default-user.png',
                name: 'Polar',
                lastName: 'Bear'
            }
        };

        await page.route('**/api/users/profile', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockedProfile),
            });
        });

        await page.goto('/panel/profile');
        await expect(page.getByText('Polar Bear')).toBeVisible();
    });

});
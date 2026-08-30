import { test, expect } from './userGaragePage';

test.describe('Garage page tests', () => {

    test('Successful user authorization', async ({ userGaragePage }) => {
        await expect(userGaragePage.page).toHaveURL(/panel\/garage/);
    });

    test('Check the Garage page title', async ({ userGaragePage }) => {
        await expect(userGaragePage.garageTitle).toBeVisible();
    });

    test('Add car button is visible', async ({ userGaragePage }) => {
        await expect(userGaragePage.addCarButton).toBeVisible();
    });

});
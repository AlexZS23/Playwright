import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up', exact: true }).first().click();
})

test.describe('Check the "Name" field requirements', () => {

    //Test failed. ER: Name is required, AR: Name required
    test('Is Name mandatory field', async ({ page }) => {
        await page.locator('#signupName').click();
        await page.locator('#signupName').blur();
        await expect(page.locator('.invalid-feedback', { hasText: 'Name is required' })).toBeVisible();
    })

    test('Border color is red for the "Name is required" error', async ({ page }) => {
        const nameInput = page.locator('#signupName');
        await nameInput.click();
        await nameInput.blur();
        await expect(nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Name has wrong data - Numbers', async ({ page }) => {
        await page.locator('#signupName')
            .fill('123');
        await page.locator('#signupName').blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText('Name is invalid');
    });

    test('Name has wrong data - Special symbols', async ({ page }) => {
        await page.locator('#signupName')
            .fill('Test-John');
        await page.locator('#signupName').blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText('Name is invalid');
    });

    test('Name has wrong data - Cyrylic symbols', async ({ page }) => {
        await page.locator('#signupName')
            .fill('Олексій');
        await page.locator('#signupName').blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText('Name is invalid');
    });

    test('Border color is red for the "Name is invalid" error', async ({ page }) => {
        await page.locator('#signupName')
            .fill('Олексій');
        await page.locator('#signupName').blur();

        await expect(page.locator('#signupName'))
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Check if the name length is less than 2 symbols', async ({ page }) => {
        await page.locator('#signupName')
            .fill('S');
        await page.locator('#signupName').blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText('Name has to be from 2 to 20 characters long');
    });

    test('Check if the name length is more than 20 symbols', async ({ page }) => {
        await page.locator('#signupName')
            .fill('DataLengthMoreTwentyO');
        await page.locator('#signupName').blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText('Name has to be from 2 to 20 characters long');
    });

    test('Border color is red for the "Name has to be from 2 to 20 characters long" error', async ({ page }) => {
        await page.locator('#signupName')
            .fill('DataLengthMoreTwentyO');
        await page.locator('#signupName').blur();

        await expect(page.locator('#signupName'))
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Check if the name length is 3 symbols (Valid limit check)', async ({ page }) => {
        const nameInput = page.locator('#signupName');

        await nameInput.fill('QAt');
        await nameInput.blur();

        await expect(nameInput).toHaveValue('QAt');
        await expect(nameInput).not.toHaveClass(/is-invalid/);
        await expect(
            nameInput.locator('..').locator('.invalid-feedback')
        ).toHaveCount(0);
    });

    test('Check if the name length is 19 symbols (Valid limit check)', async ({ page }) => {
        const nameInput = page.locator('#signupName');
        await nameInput.fill('NineteenSymbolsTest');
        await nameInput.blur();

        await expect(nameInput).toHaveValue('NineteenSymbolsTest');
        await expect(nameInput).not.toHaveClass(/is-invalid/);
        await expect(nameInput.locator('..').locator('.invalid-feedback')
        ).toHaveCount(0);
    });

    //Test failed. ER: TRIM is applied, AR: TRIM function doesn't work
    test('Check if the TRIM function was applied', async ({ page }) => {
        const nameInput = page.locator('#signupName');

        await nameInput.fill(' Test ');
        await nameInput.blur();
        await expect(nameInput).toHaveValue(' Test ');
        await expect(nameInput).not.toHaveClass(/is-invalid/);
        await expect(
            nameInput.locator('..').locator('.invalid-feedback')
        ).toHaveCount(0);
    });

    //Test failed. ER: space is ignored, AR: space is not ignored
    test('Check that space is ignored', async ({ page }) => {
        const nameInput = page.locator('#signupName');
        await nameInput.fill('John Alan');
        await nameInput.blur();
        await expect(nameInput).toHaveValue('John Alan');
        await expect(nameInput).not.toHaveClass(/is-invalid/);
        await expect(nameInput.locator('..').locator('.invalid-feedback')
        ).toHaveCount(0);
    });
})

test.describe('Check the "Last Name" field requirements', () => {

    //Test failed. ER: Last Name is required, AR: Last Name required
    test('Is Last Name mandatory field', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.click();
        await lastNameInput.blur();

        await expect(lastNameInput).toHaveClass(/is-invalid/);
        await expect(
            page.locator('.invalid-feedback', { hasText: 'Last name is required' })
        ).toBeVisible();
    });

    test('Border color is red for the "Last name is required" error', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.click();
        await lastNameInput.blur();

        await expect(lastNameInput)
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Last name has wrong data - Numbers', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.fill('123');
        await lastNameInput.blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText('Last name is invalid');
    });

    test('Last name has wrong data - Special symbols', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.fill('Test-John');
        await lastNameInput.blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText('Last name is invalid');
    });

    test('Last name has wrong data - Cyrylic symbols', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.fill('ТестДата');
        await lastNameInput.blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText('Last name is invalid');
    });

    test('Border color is red for the "Last name is invalid" error', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.fill('ТестДата');
        await lastNameInput.blur();

        await expect(lastNameInput)
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Check if the last name length is less than 2 symbols', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.fill('S');
        await lastNameInput.blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText('Last name has to be from 2 to 20 characters long');
    });

    test('Check if the last name length is more than 20 symbols', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.fill('DataLengthMoreTwentyO');
        await lastNameInput.blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText('Last name has to be from 2 to 20 characters long');
    });

    test('Border color is red for the "Last name has to be from 2 to 20 characters long" error', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.fill('DataLengthMoreTwentyO');
        await lastNameInput.blur();

        await expect(lastNameInput)
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Check if the last name length is 3 symbols (Valid limit check)', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.fill('QAt');
        await lastNameInput.blur();

        await expect(lastNameInput).toHaveValue('QAt');
        await expect(lastNameInput).not.toHaveClass(/is-invalid/);

        await expect(
            lastNameInput
                .locator('xpath=ancestor::div[contains(@class, "form-group")]')
                .locator('.invalid-feedback')
        ).toHaveCount(0);
    });

    test('Check if the last name length is 19 symbols (Valid limit check)', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.fill('NineteenSymbolsTest');
        await lastNameInput.blur();

        await expect(lastNameInput).toHaveValue('NineteenSymbolsTest');
        await expect(lastNameInput).not.toHaveClass(/is-invalid/);

        await expect(
            lastNameInput
                .locator('xpath=ancestor::div[contains(@class, "form-group")]')
                .locator('.invalid-feedback')
        ).toHaveCount(0);
    });

    //Test failed. ER: TRIM is applied, AR: TRIM function doesn't work
    test('Check if the TRIM function was applied', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.fill(' Test ');
        await lastNameInput.blur();

        await expect(lastNameInput).toHaveValue(' Test ');
        await expect(lastNameInput).not.toHaveClass(/is-invalid/);

        await expect(
            lastNameInput
                .locator('xpath=ancestor::div[contains(@class, "form-group")]')
                .locator('.invalid-feedback')
        ).toHaveCount(0);
    });

    //Test failed. ER: space is ignored, AR: space is not ignored
    test('Check that space is ignored', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.fill('John Alan');
        await lastNameInput.blur();

        await expect(lastNameInput).toHaveValue('John Alan');
        await expect(lastNameInput).not.toHaveClass(/is-invalid/);

        await expect(
            lastNameInput
                .locator('xpath=ancestor::div[contains(@class, "form-group")]')
                .locator('.invalid-feedback')
        ).toHaveCount(0);
    });
})

test.describe('Check the "Email" field requirements', () => {

    test('Is Email mandatory field', async ({ page }) => {
        const emailInput = page.locator('#signupEmail');

        await emailInput.click();
        await emailInput.blur();

        await expect(emailInput).toHaveClass(/is-invalid/);
        await expect(
            page.locator('.invalid-feedback', {
                hasText: 'Email required'
            })
        ).toBeVisible();
    });

    test('Border color is red for the "Email required" error', async ({ page }) => {
        const emailInput = page.locator('#signupEmail');

        await emailInput.click();
        await emailInput.blur();

        await expect(emailInput)
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Email validation: symbols before @ is missing', async ({ page }) => {
        const emailInput = page.locator('#signupEmail');

        await emailInput.fill('@test.com');
        await emailInput.blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText('Email is incorrect');
    });

    test('Email validation: symbols @ is missing', async ({ page }) => {
        const emailInput = page.locator('#signupEmail');

        await emailInput.fill('testdata.com.ua');
        await emailInput.blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText('Email is incorrect');
    });

    test('Email validation: the dot after @ symbol is missing', async ({ page }) => {
        const emailInput = page.locator('#signupEmail');

        await emailInput.fill('test@com');
        await emailInput.blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText('Email is incorrect');
    });

    test('Email validation: domain finished with a dot', async ({ page }) => {
        const emailInput = page.locator('#signupEmail');

        await emailInput.fill('test@com.');
        await emailInput.blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText('Email is incorrect');
    });

    test('Email validation: has a space', async ({ page }) => {
        const emailInput = page.locator('#signupEmail');

        await emailInput.fill('te st@com.ua');
        await emailInput.blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText('Email is incorrect');
    });

    test('Email validation: has a comma instead of the dot', async ({ page }) => {
        const emailInput = page.locator('#signupEmail');

        await emailInput.fill('test@com,ua');
        await emailInput.blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText('Email is incorrect');
    });

    //Test failed. ER: Special symbols shouldn't be allowed , AR: email allows using special symbols
    test('Email validation: has invalid special symbols', async ({ page }) => {
        const emailInput = page.locator('#signupEmail');

        await emailInput.fill('te%s$t#123@com.ua');
        await emailInput.blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText('Email is incorrect');
    });

    test('Border color is red for the "Email is incorrect" error', async ({ page }) => {
        const emailInput = page.locator('#signupEmail');

        await emailInput.fill('test@com,ua');
        await emailInput.blur();

        await expect(emailInput)
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Check that Email contains letters, numbers, underline and a dash', async ({ page }) => {
        const emailInput = page.locator('#signupEmail');

        await emailInput.fill('test-123_qa@testqa.ua');
        await emailInput.blur();

        await expect(emailInput)
            .toHaveValue('test-123_qa@testqa.ua');

        await expect(emailInput)
            .not.toHaveClass(/is-invalid/);

        await expect(
            emailInput
                .locator('xpath=ancestor::div[contains(@class, "form-group")]')
                .locator('.invalid-feedback')
        ).toHaveCount(0);
    });
})

test.describe('Check the "Password" field requirements', () => {

    test('Is Password mandatory field', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');

        await passwordInput.click();
        await passwordInput.blur();

        await expect(passwordInput).toHaveClass(/is-invalid/);
        await expect(
            page.locator('.invalid-feedback', {
                hasText: 'Password required'
            })
        ).toBeVisible();
    });

    test('Border color is red for the "Password required" error', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');

        await passwordInput.click();
        await passwordInput.blur();

        await expect(passwordInput)
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Password validation: contains integer, capital letter without small letter. Lenght is acceptable (8 symbols).', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');

        await passwordInput.fill('C123PASS');
        await passwordInput.blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText(
                'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
            );
    });

    test('Password validation: contains capital and small letters without integer. Lenght is acceptable (8 symbols).', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');

        await passwordInput.fill('Password');
        await passwordInput.blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText(
                'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
            );
    });

    test('Password validation: contains integer and small letter without capital. Lenght is acceptable (8 symbols).', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');

        await passwordInput.fill('p1234567');
        await passwordInput.blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText(
                'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
            );
    });

    test('Password validation: contains all needed symbol, but lenght is less than 8 symbols.', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');

        await passwordInput.fill('Pass123');
        await passwordInput.blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText(
                'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
            );
    });

    test('Password validation: contains all needed symbol, bu lenght is more than 15 symbols.', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');

        await passwordInput.fill('Password12345678');
        await passwordInput.blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText(
                'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
            );
    });

    test('Border color is red for the "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" error', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');

        await passwordInput.fill('123');
        await passwordInput.blur();

        await expect(passwordInput)
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Password validation: contains all needed symbol with min lenght 8 symbols (Valid limit check)', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');

        await passwordInput.fill('Pass1234');
        await passwordInput.blur();

        await expect(passwordInput).toHaveValue('Pass1234');
        await expect(passwordInput).not.toHaveClass(/is-invalid/);

        await expect(
            passwordInput
                .locator('xpath=ancestor::div[contains(@class, "form-group")]')
                .locator('.invalid-feedback')
        ).toHaveCount(0);
    });

    test('Password validation: contains all needed symbol with max lenght 15 symbols (Valid limit check)', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');

        await passwordInput.fill('Password1234567');
        await passwordInput.blur();

        await expect(passwordInput).toHaveValue('Password1234567');
        await expect(passwordInput).not.toHaveClass(/is-invalid/);

        await expect(
            passwordInput
                .locator('xpath=ancestor::div[contains(@class, "form-group")]')
                .locator('.invalid-feedback')
        ).toHaveCount(0);
    });
})

test.describe('Check the "Re-enter password" field requirements', () => {

    test('Is Re-enter password mandatory field', async ({ page }) => {
        const repeatPasswordInput = page.locator('#signupRepeatPassword');

        await repeatPasswordInput.click();
        await repeatPasswordInput.blur();

        await expect(repeatPasswordInput).toHaveClass(/is-invalid/);
        await expect(
            page.locator('.invalid-feedback', {
                hasText: 'Re-enter password required'
            })
        ).toBeVisible();
    });

    test('Border color is red for the "Re-enter password required" error', async ({ page }) => {
        const repeatPasswordInput = page.locator('#signupRepeatPassword');

        await repeatPasswordInput.click();
        await repeatPasswordInput.blur();

        await expect(repeatPasswordInput)
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Check error if passwords don`t match', async ({ page }) => {
        await page.locator('#signupPassword').fill('Password123');

        const repeatPasswordInput = page.locator('#signupRepeatPassword');

        await repeatPasswordInput.fill('Password123!');
        await repeatPasswordInput.blur();

        await expect(page.locator('.invalid-feedback'))
            .toContainText('Passwords do not match');
    });

    test('Password validation: passwords are matched', async ({ page }) => {
        await page.locator('#signupPassword').fill('Password123');

        const repeatPasswordInput = page.locator('#signupRepeatPassword');

        await repeatPasswordInput.fill('Password123');
        await repeatPasswordInput.blur();

        await expect(repeatPasswordInput).toHaveValue('Password123');
        await expect(repeatPasswordInput).not.toHaveClass(/is-invalid/);

        await expect(
            repeatPasswordInput
                .locator('xpath=ancestor::div[contains(@class, "form-group")]')
                .locator('.invalid-feedback')
        ).toHaveCount(0);
    });
})

test.describe('Successful user registration', () => {

    test('The new user was registered', async ({ page }) => {
        await page.locator('#signupName').fill(`TestFirstName`);
        await page.locator('#signupLastName').fill(`TestSecondName`);
        await page.locator('#signupEmail').fill(`aqaHW24test+${Date.now()}@testdata.com`);
        await page.locator('#signupPassword').fill(`TestPass123`);
        await page.locator('#signupRepeatPassword').fill(`TestPass123`);
        await page.getByRole('button', { name: 'Register', exact: true }).click();
        await expect(page.locator('div p', { hasText: 'Registration complete' })).toBeVisible();
    })
})
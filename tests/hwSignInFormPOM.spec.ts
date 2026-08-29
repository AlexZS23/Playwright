import { test, expect } from '@playwright/test';
import HomePage from '../tests/HomePage';
import SignUpForm from '../tests/SignUpForm';

const { messages } = SignUpForm;
let signUpForm: SignUpForm;

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openRegistrationForm();
    signUpForm = new SignUpForm(page);
});


test.describe('Check the "Name" field requirements', () => {

    test('Is Name mandatory field', async () => {
        await signUpForm.clickName();
        await signUpForm.blurName();

        await expect(
            signUpForm.getErrorMessage(messages.nameRequired)
        ).toBeVisible();
    });

    test('Border color is red for the "Name is required" error', async () => {
        await signUpForm.clickName();
        await signUpForm.blurName();

        await expect(signUpForm.nameInput)
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Name has wrong data - Numbers', async () => {
        await signUpForm.fillAndBlurName('123');

        await expect(
            signUpForm.getErrorMessage(messages.nameInvalid)
        ).toContainText(messages.nameInvalid);
    });

    test('Name has wrong data - Special symbols', async () => {
        await signUpForm.fillAndBlurName('Test-John');

        await expect(
            signUpForm.getErrorMessage(messages.nameInvalid)
        ).toContainText(messages.nameInvalid);
    });

    test('Name has wrong data - Cyrylic symbols', async () => {
        await signUpForm.fillAndBlurName('Олексій');

        await expect(
            signUpForm.getErrorMessage(messages.nameInvalid)
        ).toContainText(messages.nameInvalid);
    });

    test('Border color is red for the "Name is invalid" error', async () => {
        await signUpForm.fillAndBlurName('Олексій');

        await expect(signUpForm.nameInput)
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Check if the name length is less than 2 symbols', async () => {
        await signUpForm.fillAndBlurName('S');

        await expect(
            signUpForm.getErrorMessage(messages.nameLength)
        ).toContainText(messages.nameLength);
    });

    test('Check if the name length is more than 20 symbols', async () => {
        await signUpForm.fillAndBlurName('DataLengthMoreTwentyO');

        await expect(
            signUpForm.getErrorMessage(messages.nameLength)
        ).toContainText(messages.nameLength);
    });

    test('Border color is red for the "Name has to be from 2 to 20 characters long" error', async () => {
        await signUpForm.fillAndBlurName('DataLengthMoreTwentyO');

        await expect(signUpForm.nameInput)
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Check if the name length is 3 symbols (Valid limit check)', async () => {
        await signUpForm.fillAndBlurName('QAt');

        await expect(signUpForm.nameInput)
            .toHaveValue('QAt');

        await expect(signUpForm.nameInput)
            .not.toHaveClass(/is-invalid/);

        await expect(
            signUpForm.getFieldError(signUpForm.nameInput)
        ).toHaveCount(0);
    });

    test('Check if the name length is 19 symbols (Valid limit check)', async () => {
        await signUpForm.fillAndBlurName('NineteenSymbolsTest');

        await expect(signUpForm.nameInput)
            .toHaveValue('NineteenSymbolsTest');

        await expect(signUpForm.nameInput)
            .not.toHaveClass(/is-invalid/);

        await expect(
            signUpForm.getFieldError(signUpForm.nameInput)
        ).toHaveCount(0);
    });

    // Test failed. ER: TRIM is applied, AR: TRIM function doesn't work
    test('Check if the TRIM function was applied', async () => {
        await signUpForm.fillAndBlurName(' Test ');

        await expect(signUpForm.nameInput)
            .toHaveValue(' Test ');

        await expect(signUpForm.nameInput)
            .not.toHaveClass(/is-invalid/);

        await expect(
            signUpForm.getFieldError(signUpForm.nameInput)
        ).toHaveCount(0);
    });

    // Test failed. ER: space is ignored, AR: space is not ignored
    test('Check that space is ignored', async () => {
        await signUpForm.fillAndBlurName('John Alan');

        await expect(signUpForm.nameInput)
            .toHaveValue('John Alan');

        await expect(signUpForm.nameInput)
            .not.toHaveClass(/is-invalid/);

        await expect(
            signUpForm.getFieldError(signUpForm.nameInput)
        ).toHaveCount(0);
    });
});

test.describe('Check the "Last Name" field requirements', () => {

    test('Is Last Name mandatory field', async () => {
        await signUpForm.clickLastName();
        await signUpForm.blurLastName();

        await expect(
            signUpForm.getErrorMessage(messages.lastNameRequired)
        ).toBeVisible();
    });

    test('Border color is red for the "Last name is required" error', async () => {
        await signUpForm.clickLastName();
        await signUpForm.blurLastName();

        await expect(signUpForm.lastNameInput)
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Last name has wrong data - Numbers', async () => {
        await signUpForm.fillAndBlurLastName('123');

        await expect(
            signUpForm.getErrorMessage(messages.lastNameInvalid)
        ).toContainText(messages.lastNameInvalid);
    });

    test('Last name has wrong data - Special symbols', async () => {
        await signUpForm.fillAndBlurLastName('Test-John');

        await expect(
            signUpForm.getErrorMessage(messages.lastNameInvalid)
        ).toContainText(messages.lastNameInvalid);
    });

    test('Last name has wrong data - Cyrylic symbols', async () => {
        await signUpForm.fillAndBlurLastName('ТестДата');

        await expect(
            signUpForm.getErrorMessage(messages.lastNameInvalid)
        ).toContainText(messages.lastNameInvalid);
    });

    test('Border color is red for the "Last name is invalid" error', async () => {
        await signUpForm.fillAndBlurLastName('ТестДата');

        await expect(signUpForm.lastNameInput)
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Check if the last name length is less than 2 symbols', async () => {
        await signUpForm.fillAndBlurLastName('S');

        await expect(
            signUpForm.getErrorMessage(messages.lastNameLength)
        ).toContainText(messages.lastNameLength);
    });

    test('Check if the last name length is more than 20 symbols', async () => {
        await signUpForm.fillAndBlurLastName('DataLengthMoreTwentyO');

        await expect(
            signUpForm.getErrorMessage(messages.lastNameLength)
        ).toContainText(messages.lastNameLength);
    });

    test('Border color is red for the "Last name has to be from 2 to 20 characters long" error', async () => {
        await signUpForm.fillAndBlurLastName('DataLengthMoreTwentyO');

        await expect(signUpForm.lastNameInput)
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Check if the last name length is 3 symbols (Valid limit check)', async () => {
        await signUpForm.fillAndBlurLastName('QAt');

        await expect(signUpForm.lastNameInput)
            .toHaveValue('QAt');

        await expect(signUpForm.lastNameInput)
            .not.toHaveClass(/is-invalid/);

        await expect(
            signUpForm.getFieldError(signUpForm.lastNameInput)
        ).toHaveCount(0);
    });

    test('Check if the last name length is 19 symbols (Valid limit check)', async () => {
        await signUpForm.fillAndBlurLastName('NineteenSymbolsTest');

        await expect(signUpForm.lastNameInput)
            .toHaveValue('NineteenSymbolsTest');

        await expect(signUpForm.lastNameInput)
            .not.toHaveClass(/is-invalid/);

        await expect(
            signUpForm.getFieldError(signUpForm.lastNameInput)
        ).toHaveCount(0);
    });

    // Test failed. ER: TRIM is applied, AR: TRIM function doesn't work
    test('Check if the TRIM function was applied', async () => {
        await signUpForm.fillAndBlurLastName(' Test ');

        await expect(signUpForm.lastNameInput)
            .toHaveValue(' Test ');

        await expect(signUpForm.lastNameInput)
            .not.toHaveClass(/is-invalid/);

        await expect(
            signUpForm.getFieldError(signUpForm.lastNameInput)
        ).toHaveCount(0);
    });

    // Test failed. ER: space is ignored, AR: space is not ignored
    test('Check that space is ignored', async () => {
        await signUpForm.fillAndBlurLastName('John Alan');

        await expect(signUpForm.lastNameInput)
            .toHaveValue('John Alan');

        await expect(signUpForm.lastNameInput)
            .not.toHaveClass(/is-invalid/);

        await expect(
            signUpForm.getFieldError(signUpForm.lastNameInput)
        ).toHaveCount(0);
    });
});

test.describe('Check the "Email" field requirements', () => {

    test('Is Email mandatory field', async () => {
        await signUpForm.clickEmail();
        await signUpForm.blurEmail();

        await expect(
            signUpForm.getErrorMessage(messages.emailRequired)
        ).toBeVisible();
    });

    test('Border color is red for the "Email required" error', async () => {
        await signUpForm.clickEmail();
        await signUpForm.blurEmail();

        await expect(signUpForm.emailInput)
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Email validation: symbols before @ is missing', async () => {
        await signUpForm.fillAndBlurEmail('@test.com');

        await expect(
            signUpForm.getErrorMessage(messages.emailInvalid)
        ).toContainText(messages.emailInvalid);
    });

    test('Email validation: symbols @ is missing', async () => {
        await signUpForm.fillAndBlurEmail('testdata.com.ua');

        await expect(
            signUpForm.getErrorMessage(messages.emailInvalid)
        ).toContainText(messages.emailInvalid);
    });

    test('Email validation: the dot after @ symbol is missing', async () => {
        await signUpForm.fillAndBlurEmail('test@com');

        await expect(
            signUpForm.getErrorMessage(messages.emailInvalid)
        ).toContainText(messages.emailInvalid);
    });

    test('Email validation: domain finished with a dot', async () => {
        await signUpForm.fillAndBlurEmail('test@com.');

        await expect(
            signUpForm.getErrorMessage(messages.emailInvalid)
        ).toContainText(messages.emailInvalid);
    });

    test('Email validation: has a space', async () => {
        await signUpForm.fillAndBlurEmail('te st@com.ua');

        await expect(
            signUpForm.getErrorMessage(messages.emailInvalid)
        ).toContainText(messages.emailInvalid);
    });

    test('Email validation: has a comma instead of the dot', async () => {
        await signUpForm.fillAndBlurEmail('test@com,ua');

        await expect(
            signUpForm.getErrorMessage(messages.emailInvalid)
        ).toContainText(messages.emailInvalid);
    });

    // Test failed. ER: Special symbols shouldn't be allowed, AR: email allows using special symbols
    test('Email validation: has invalid special symbols', async () => {
        await signUpForm.fillAndBlurEmail('te%s$t#123@com.ua');

        await expect(
            signUpForm.getErrorMessage(messages.emailInvalid)
        ).toContainText(messages.emailInvalid);
    });

    test('Border color is red for the "Email is incorrect" error', async () => {
        await signUpForm.fillAndBlurEmail('test@com,ua');

        await expect(signUpForm.emailInput)
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Check that Email contains letters, numbers, underline and a dash', async () => {
        await signUpForm.fillAndBlurEmail('test-123_qa@testqa.ua');

        await expect(signUpForm.emailInput)
            .toHaveValue('test-123_qa@testqa.ua');

        await expect(signUpForm.emailInput)
            .not.toHaveClass(/is-invalid/);

        await expect(
            signUpForm.getFieldError(signUpForm.emailInput)
        ).toHaveCount(0);
    });
});

test.describe('Check the "Password" field requirements', () => {

    test('Is Password mandatory field', async () => {
        await signUpForm.clickPassword();
        await signUpForm.blurPassword();

        await expect(
            signUpForm.getErrorMessage(messages.passwordRequired)
        ).toBeVisible();
    });

    test('Border color is red for the "Password required" error', async () => {
        await signUpForm.clickPassword();
        await signUpForm.blurPassword();

        await expect(signUpForm.passwordInput)
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Password validation: contains integer, capital letter without small letter. Lenght is acceptable (8 symbols).', async () => {
        await signUpForm.fillAndBlurPassword('C123PASS');

        await expect(
            signUpForm.getErrorMessage(messages.passwordInvalid)
        ).toContainText(messages.passwordInvalid);
    });

    test('Password validation: contains capital and small letters without integer. Lenght is acceptable (8 symbols).', async () => {
        await signUpForm.fillAndBlurPassword('Password');

        await expect(
            signUpForm.getErrorMessage(messages.passwordInvalid)
        ).toContainText(messages.passwordInvalid);
    });

    test('Password validation: contains integer and small letter without capital. Lenght is acceptable (8 symbols).', async () => {
        await signUpForm.fillAndBlurPassword('p1234567');

        await expect(
            signUpForm.getErrorMessage(messages.passwordInvalid)
        ).toContainText(messages.passwordInvalid);
    });

    test('Password validation: contains all needed symbol, but lenght is less than 8 symbols.', async () => {
        await signUpForm.fillAndBlurPassword('Pass123');

        await expect(
            signUpForm.getErrorMessage(messages.passwordInvalid)
        ).toContainText(messages.passwordInvalid);
    });

    test('Password validation: contains all needed symbol, bu lenght is more than 15 symbols.', async () => {
        await signUpForm.fillAndBlurPassword('Password12345678');

        await expect(
            signUpForm.getErrorMessage(messages.passwordInvalid)
        ).toContainText(messages.passwordInvalid);
    });

    test('Border color is red for the password validation error', async () => {
        await signUpForm.fillAndBlurPassword('123');

        await expect(signUpForm.passwordInput)
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Password validation: contains all needed symbol with min lenght 8 symbols (Valid limit check)', async () => {
        await signUpForm.fillAndBlurPassword('Pass1234');

        await expect(signUpForm.passwordInput)
            .toHaveValue('Pass1234');

        await expect(signUpForm.passwordInput)
            .not.toHaveClass(/is-invalid/);

        await expect(
            signUpForm.getFieldError(signUpForm.passwordInput)
        ).toHaveCount(0);
    });

    test('Password validation: contains all needed symbol with max lenght 15 symbols (Valid limit check)', async () => {
        await signUpForm.fillAndBlurPassword('Password1234567');

        await expect(signUpForm.passwordInput)
            .toHaveValue('Password1234567');

        await expect(signUpForm.passwordInput)
            .not.toHaveClass(/is-invalid/);

        await expect(
            signUpForm.getFieldError(signUpForm.passwordInput)
        ).toHaveCount(0);
    });
});

test.describe('Check the "Re-enter password" field requirements', () => {

    test('Is Re-enter password mandatory field', async () => {
        await signUpForm.clickRepeatPassword();
        await signUpForm.blurRepeatPassword();

        await expect(
            signUpForm.getErrorMessage(messages.repeatPasswordRequired)
        ).toBeVisible();
    });

    test('Border color is red for the "Re-enter password required" error', async () => {
        await signUpForm.clickRepeatPassword();
        await signUpForm.blurRepeatPassword();

        await expect(signUpForm.repeatPasswordInput)
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Check error if passwords don`t match', async () => {
        await signUpForm.fillPassword('Password123');
        await signUpForm.fillAndBlurRepeatPassword('Password123!');

        await expect(
            signUpForm.getErrorMessage(messages.passwordsMismatch)
        ).toContainText(messages.passwordsMismatch);
    });

    test('Password validation: passwords are matched', async () => {
        await signUpForm.fillPassword('Password123');
        await signUpForm.fillAndBlurRepeatPassword('Password123');

        await expect(signUpForm.repeatPasswordInput)
            .toHaveValue('Password123');

        await expect(signUpForm.repeatPasswordInput)
            .not.toHaveClass(/is-invalid/);

        await expect(
            signUpForm.getFieldError(signUpForm.repeatPasswordInput)
        ).toHaveCount(0);
    });
});

test.describe('Successful user registration', () => {

    test('The new user was registered', async () => {
        const email = `aqaHW24test+${Date.now()}@testdata.com`;

        await signUpForm.fillRegistrationForm(
            'TestFirstName',
            'TestSecondName',
            email,
            'TestPass123'
        );

        await signUpForm.register();

        await expect(
            signUpForm.registrationCompleteMessage
        ).toBeVisible();
    });
});
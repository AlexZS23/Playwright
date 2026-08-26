import { Page, Locator } from '@playwright/test';

export default class SignUpForm {
    readonly page: Page;

    readonly nameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly repeatPasswordInput: Locator;
    readonly registerButton: Locator;
    readonly registrationCompleteMessage: Locator;

    static readonly messages = {
        nameRequired: 'Name is required',
        nameInvalid: 'Name is invalid',
        nameLength: 'Name has to be from 2 to 20 characters long',

        lastNameRequired: 'Last name is required',
        lastNameInvalid: 'Last name is invalid',
        lastNameLength: 'Last name has to be from 2 to 20 characters long',

        emailRequired: 'Email required',
        emailInvalid: 'Email is incorrect',

        passwordRequired: 'Password required',
        passwordInvalid:
            'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',

        repeatPasswordRequired: 'Re-enter password required',
        passwordsMismatch: 'Passwords do not match',
    } as const;

    constructor(page: Page) {
        this.page = page;

        this.nameInput = page.locator('#signupName');
        this.lastNameInput = page.locator('#signupLastName');
        this.emailInput = page.locator('#signupEmail');
        this.passwordInput = page.locator('#signupPassword');
        this.repeatPasswordInput = page.locator('#signupRepeatPassword');

        this.registerButton = page.getByRole('button', {
            name: 'Register',
            exact: true
        });

        this.registrationCompleteMessage = page.locator('div p', {
            hasText: 'Registration complete'
        });
    }

    // =========================
    // Name
    // =========================

    async clickName() {
        await this.nameInput.click();
    }

    async blurName() {
        await this.nameInput.blur();
    }

    async fillName(name: string) {
        await this.nameInput.fill(name);
    }

    async fillAndBlurName(name: string) {
        await this.fillName(name);
        await this.blurName();
    }

    // =========================
    // Last Name
    // =========================

    async clickLastName() {
        await this.lastNameInput.click();
    }

    async blurLastName() {
        await this.lastNameInput.blur();
    }

    async fillLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    async fillAndBlurLastName(lastName: string) {
        await this.fillLastName(lastName);
        await this.blurLastName();
    }

    // =========================
    // Email
    // =========================

    async clickEmail() {
        await this.emailInput.click();
    }

    async blurEmail() {
        await this.emailInput.blur();
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillAndBlurEmail(email: string) {
        await this.fillEmail(email);
        await this.blurEmail();
    }

    // =========================
    // Password
    // =========================

    async clickPassword() {
        await this.passwordInput.click();
    }

    async blurPassword() {
        await this.passwordInput.blur();
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async fillAndBlurPassword(password: string) {
        await this.fillPassword(password);
        await this.blurPassword();
    }

    // =========================
    // Repeat Password
    // =========================

    async clickRepeatPassword() {
        await this.repeatPasswordInput.click();
    }

    async blurRepeatPassword() {
        await this.repeatPasswordInput.blur();
    }

    async fillRepeatPassword(password: string) {
        await this.repeatPasswordInput.fill(password);
    }

    async fillAndBlurRepeatPassword(password: string) {
        await this.fillRepeatPassword(password);
        await this.blurRepeatPassword();
    }

    // =========================
    // Registration
    // =========================

    async fillRegistrationForm(
        name: string,
        lastName: string,
        email: string,
        password: string
    ) {
        await this.fillName(name);
        await this.fillLastName(lastName);
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.fillRepeatPassword(password);
    }

    async register() {
        await this.registerButton.click();
    }

    // =========================
    // Helpers
    // =========================

    getErrorMessage(text: string) {
        return this.page.locator('.invalid-feedback', {
            hasText: text
        });
    }

    getFieldError(field: Locator) {
        return field
            .locator('xpath=ancestor::div[contains(@class, "form-group")]')
            .locator('.invalid-feedback');
    }
}
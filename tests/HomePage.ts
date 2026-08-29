import { Page, Locator } from '@playwright/test';

export default class HomePage {
    readonly page: Page;
    readonly signUpButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.signUpButton = page.getByRole('button', {
            name: 'Sign up',
            exact: true
        }).first();
    }

    async open() {
        await this.page.goto('/');
    }

    async openSignUpForm() {
        await this.signUpButton.click();
    }

    async openRegistrationForm() {
        await this.open();
        await this.openSignUpForm();
    }
}

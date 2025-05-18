import { Page, Locator, expect } from '@playwright/test';

export class DemoQAPage {
  readonly page: Page;
  
  readonly qaAutoMenu: Locator;
  readonly elementsSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.qaAutoMenu = page.locator('span.font-medium:has-text("QA Auto")');
    this.elementsSection = page.locator('h3:has-text("Elements")');
  }

  async navigate() {
    await this.page.goto('https://demoqa.ru/');
  }

  async openElementsSection() {
    await this.qaAutoMenu.click();
    await this.elementsSection.click();
  }
}

export class TextBoxPage {
  readonly page: Page;
  
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly currentAddressTextarea: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fullNameInput = page.locator('input#fullName');
    this.emailInput = page.locator('input#email');
    this.currentAddressTextarea = page.locator('textarea#currentAddress');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async navigate() {
    await this.page.locator('h3:has-text("Text Box")').click();
  }

  async fillForm(name: string, email: string, address: string) {
    await this.fullNameInput.fill(name);
    await this.emailInput.fill(email);
    await this.currentAddressTextarea.fill(address);
    await this.submitButton.click();
  }
}

export class RadioButtonPage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.locator('h3:has-text("Radio Button")').click();
  }

  async selectOptions() {
    await this.page.locator('input[name="likeWebsite"][value="yes"]').click();
    await this.page.locator('input[name="gender"][value="male"]').click();
    await this.page.locator('input[name="experience"][value="student"]').click();
    await this.page.locator('input[name="preferredLanguage"][value="javascript"]').click();
  }
}

export class CheckBoxPage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.locator('h3:has-text("Check Box")').click();
  }

  async selectItems() {
    await this.page.locator('button:has(path[d="m9 18 6-6-6-6"])').click();
    await this.page
      .locator('div.flex.items-center.space-x-2:has-text("Desktop") button.p-1:not(.flex):not(.items-center)')
      .click();
    await this.page
      .locator('div.flex.items-center.space-x-2:has-text("Documents") button.p-1:not(.flex):not(.items-center)')
      .click();
    await this.page.locator('button:has-text("Downloads")').click();
    await this.page.locator('button:has-text("Notes")').click();
    await this.page.locator('button:has-text("Commands")').click();
  }

  async verifySelectedItems() {
    await expect(this.page.getByText('Desktop, Notes, Commands, Downloads, Word File.doc, Excel File.doc')).toBeVisible();
  }
}

export class ButtonsPage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.locator('h3:has-text("Buttons")').click();
  }

  async performClicks() {
    await this.page.locator('button:has-text("Кликни меня")').click({ clickCount: 23 });
    await this.page.locator('button:has-text("Кликни правой кнопкой")').click({ button: 'right', clickCount: 15 });

    const button = this.page.locator('button:has-text("Двойной клик")');
    for (let i = 0; i < 3; i++) {
      await button.dblclick();
      await this.page.waitForTimeout(1000);
    }
  }

  async verifyClickResults() {
    await expect(this.page.getByText('Вы кликнули 23 раз(а)')).toBeVisible();
    await expect(this.page.getByText('Вы кликнули правой кнопкой 15 раз(а)')).toBeVisible();
    await expect(this.page.getByText('Вы сделали двойной клик 3 раз(а)')).toBeVisible();
  }
}

export class UploadDownloadPage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.locator('h3:has-text("Upload and Download")').click();
  }

  async downloadFile() {
    const downloadButton = this.page
      .locator('div.flex.items-center:has-text("sample.txt")')
      .locator('button:has-text("Download")');
    await downloadButton.click();
  }

  async uploadFile(filePath: string) {
    await this.page.locator('input#file-upload').setInputFiles(filePath);
  }

  async verifyUpload() {
    await expect(this.page.locator('h3:text("Uploaded Files")')).toBeVisible();
    await expect(this.page.locator('div.flex.items-center.gap-3:has-text("sample.txt"):has-text("Bytes")')).toBeVisible();
  }
}
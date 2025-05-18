import { test } from '@playwright/test';
import { DemoQAPage, TextBoxPage, RadioButtonPage, CheckBoxPage, ButtonsPage, UploadDownloadPage } from '../page-objects/demoqa.page';

test.describe('DemoQA Tests', () => {
  let demoQAPage: DemoQAPage;
  let textBoxPage: TextBoxPage;
  let radioButtonPage: RadioButtonPage;
  let checkBoxPage: CheckBoxPage;
  let buttonsPage: ButtonsPage;
  let uploadDownloadPage: UploadDownloadPage;

  test.beforeEach(async ({ page }) => {
    demoQAPage = new DemoQAPage(page);
    textBoxPage = new TextBoxPage(page);
    radioButtonPage = new RadioButtonPage(page);
    checkBoxPage = new CheckBoxPage(page);
    buttonsPage = new ButtonsPage(page);
    uploadDownloadPage = new UploadDownloadPage(page);

    await demoQAPage.navigate();
    await demoQAPage.openElementsSection();
  });

  test('Text Box Form', async () => {
    await textBoxPage.navigate();
    await textBoxPage.fillForm('Name Surname', 'test@mail.ru', 'Moscow, Russia');
  });

  test('Radio Button Selection', async () => {
    await radioButtonPage.navigate();
    await radioButtonPage.selectOptions();
  });

  test('Check Box Selection', async () => {
    await checkBoxPage.navigate();
    await checkBoxPage.selectItems();
    await checkBoxPage.verifySelectedItems();
  });

  test('Buttons Click Actions', async () => {
    await buttonsPage.navigate();
    await buttonsPage.performClicks();
    await buttonsPage.verifyClickResults();
  });

  test('File Upload and Download', async () => {
    await uploadDownloadPage.navigate();
    await uploadDownloadPage.downloadFile();
    await uploadDownloadPage.uploadFile('C:\\Users\\v.kostenko\\Downloads\\sample.txt');
    await uploadDownloadPage.verifyUpload();
  });
});
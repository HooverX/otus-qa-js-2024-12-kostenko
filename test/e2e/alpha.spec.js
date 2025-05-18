import { test, expect } from '@playwright/test'

test('textbox', async ({ page }) => {
  await page.goto('https://demoqa.ru/')
  await page.locator('span.font-medium:has-text("QA Auto")').click()
  await page.locator('h3:has-Text("Elements")').click()
  await page.locator('h3:has-Text("Text Box")').click()
  await page.locator('input#fullName').fill('Name Surname')
  await page.locator('input#email').fill('test@mail.ru')
  await page.locator('textarea#currentAddress').fill('Moscow, Russia')
  await page.locator('button[type="submit"]').click()
})

test('radiobutton', async ({ page }) => {
  await page.goto('https://demoqa.ru/')
  await page.locator('span.font-medium:has-text("QA Auto")').click()
  await page.locator('h3:has-Text("Elements")').click()
  await page.locator('h3:has-Text("Radio Button")').click()
  await page.locator('input[name="likeWebsite"][value="yes"]').click()
  await page.locator('input[name="gender"][value="male"]').click()
  await page.locator('input[name="experience"][value="student"]').click()
  await page.locator('input[name="preferredLanguage"][value="javascript"]').click()
})

test('checkbox', async ({ page }) => {
  await page.goto('https://demoqa.ru/')
  await page.locator('span.font-medium:has-text("QA Auto")').click()
  await page.locator('h3:has-Text("Elements")').click()
  await page.locator('h3:has-Text("Check Box")').click()
  await page.locator('button:has(path[d="m9 18 6-6-6-6"])').click()
  await page
    .locator('div.flex.items-center.space-x-2:has-text("Desktop") button.p-1:not(.flex):not(.items-center)')
    .click()
  await page
    .locator('div.flex.items-center.space-x-2:has-text("Documents") button.p-1:not(.flex):not(.items-center)')
    .click()
  await page.locator('button:has-text("Downloads")').click()
  await page.locator('button:has-text("Notes")').click()
  await page.locator('button:has-text("Commands")').click()
  await expect(page.getByText('Desktop, Notes, Commands, Downloads, Word File.doc, Excel File.doc')).toBeVisible()
})

test('buttons', async ({ page }) => {
  await page.goto('https://demoqa.ru/')
  await page.locator('span.font-medium:has-text("QA Auto")').click()
  await page.locator('h3:has-Text("Elements")').click()
  await page.locator('h3:has-Text("Buttons")').click()
  await page.locator('button:has-text("Кликни меня")').click({ clickCount: 23 })
  await page.locator('button:has-text("Кликни правой кнопкой")').click({ button: 'right', clickCount: 15 })

  const button = page.locator('button:has-text("Двойной клик")')
  for (let i = 0; i < 3; i++) {
    await button.dblclick()
    await page.waitForTimeout(1000)
  }
  await expect(page.getByText('Вы кликнули 23 раз(а)')).toBeVisible()
  await expect(page.getByText('Вы кликнули правой кнопкой 15 раз(а)')).toBeVisible()
  await expect(page.getByText('Вы сделали двойной клик 3 раз(а)')).toBeVisible()
})

test('uploadanddownload', async ({ page }) => {
  await page.goto('https://demoqa.ru/')
  await page.locator('span.font-medium:has-text("QA Auto")').click()
  await page.locator('h3:has-Text("Elements")').click()
  await page.locator('h3:has-Text("Upload and Download")').click()
  const downloadButton = page
    .locator('div.flex.items-center:has-text("sample.txt")')
    .locator('button:has-text("Download")')
  await downloadButton.click()
  const filePath = 'C:\\Users\\v.kostenko\\Downloads\\sample.txt'
  await page.locator('input#file-upload').setInputFiles(filePath)
  await expect(page.locator('h3:text("Uploaded Files")')).toBeVisible()
  await expect(page.locator('div.flex.items-center.gap-3:has-text("sample.txt"):has-text("Bytes")')).toBeVisible()
})

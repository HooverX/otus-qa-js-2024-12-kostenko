require('dotenv').config();

exports.config = {
  tests: './test/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: process.env.BASE_URL,
      show: true,
      browser: 'chromium',
      waitForTimeout: 5000,
      timeout: 10000
    }
  },
  include: {
    I: './steps_file.js',
    loginPage: './test/pages/LoginPage.js',
    inventoryPage: './test/pages/InventoryPage.js',
    cartPage: './test/pages/CartPage.js',
    checkoutPage: './test/pages/CheckoutPage.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'sauce-demo-tests',
  plugins: {
    screenshotOnFail: {
      enabled: true
    }
  }
}
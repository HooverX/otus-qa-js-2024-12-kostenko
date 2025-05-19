const { I } = inject();

Feature('SauceDemo Tests');

Before(() => {
  I.amOnPage('/');
});

Scenario('Successful login', ({ loginPage }) => {
  loginPage.login(process.env.VALID_USER, process.env.VALID_PASS);
  I.seeInCurrentUrl('/inventory.html');
});

Scenario('Failed login', ({ loginPage }) => {
  loginPage.login(process.env.LOCKED_USER, process.env.LOCKED_PASS);
  loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
});

Scenario('Add item to cart', async ({ loginPage, inventoryPage, cartPage }) => {
  loginPage.login(process.env.VALID_USER, process.env.VALID_PASS);
  const itemName = await inventoryPage.getFirstItemName();
  inventoryPage.addItemToCart(itemName);
  inventoryPage.openCart();
  cartPage.verifyItemInCart(itemName);
});

Scenario('Remove item from cart', async ({ loginPage, inventoryPage, cartPage }) => {
  loginPage.login(process.env.VALID_USER, process.env.VALID_PASS);
  const itemName = await inventoryPage.getFirstItemName();
  inventoryPage.addItemToCart(itemName);
  inventoryPage.openCart();
  cartPage.removeItem(itemName);
  I.dontSee(itemName, cartPage.elements.itemName)
  I.dontSee('.shopping_cart_badge')
});

Scenario('Complete purchase', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
  loginPage.login(process.env.VALID_USER, process.env.VALID_PASS);
  const itemName = await inventoryPage.getFirstItemName();
  inventoryPage.addItemToCart(itemName);
  inventoryPage.openCart();
  cartPage.proceedToCheckout();
  checkoutPage.fillCheckoutInfo(
    process.env.CHECKOUT_FIRSTNAME,
    process.env.CHECKOUT_LASTNAME,
    process.env.CHECKOUT_ZIP
  );
  checkoutPage.completeCheckout();
  I.see('Thank you for your order!');
});
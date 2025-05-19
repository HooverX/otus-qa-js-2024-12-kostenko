const { I } = inject();

module.exports = {
  elements: {
    itemName: '.inventory_item_name',
    addToCartButton: 'button.btn_inventory',
    cartIcon: '.shopping_cart_link'
  },

  async getFirstItemName() {
    return await I.grabTextFrom(this.elements.itemName);
  },

  addItemToCart(itemName) {
    I.click(`//div[text()="${itemName}"]/ancestor::div[@class="inventory_item"]//button`);
  },

  openCart() {
    I.click(this.elements.cartIcon);
  }
}
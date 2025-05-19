const { I } = inject();

module.exports = {
  elements: {
    cartItem: '.cart_item',
    checkoutButton: '#checkout',
    removeButton: 'button.cart_button'
  },

  verifyItemInCart(itemName) {
    I.see(itemName, '.inventory_item_name')
  },

  removeItem(itemName) {
    I.click(`//div[text()="${itemName}"]/ancestor::div[@class="cart_item"]//button`)
  },

  proceedToCheckout() {
    I.click(this.elements.checkoutButton)
  }
}
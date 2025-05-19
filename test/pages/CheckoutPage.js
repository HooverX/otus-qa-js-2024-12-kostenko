const { I } = inject();

module.exports = {
  elements: {
    firstNameField: '#first-name',
    lastNameField: '#last-name',
    zipCodeField: '#postal-code',
    continueButton: '#continue',
    finishButton: '#finish'
  },

  fillCheckoutInfo(firstName, lastName, zipCode) {
    I.fillField(this.elements.firstNameField, firstName);
    I.fillField(this.elements.lastNameField, lastName);
    I.fillField(this.elements.zipCodeField, zipCode);
  },

  completeCheckout() {
    I.click(this.elements.continueButton);
    I.click(this.elements.finishButton);
  }
}
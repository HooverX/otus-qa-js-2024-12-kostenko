const { I } = inject()

module.exports = {
  elements: {
    usernameField: '#user-name',
    passwordField: '#password',
    loginButton: '#login-button',
    errorMessage: '[data-test="error"]'
  },

  login(username, password) {
    I.fillField(this.elements.usernameField, username)
    I.fillField(this.elements.passwordField, password)
    I.click(this.elements.loginButton)
  },

  verifyErrorMessage(text) {
    I.see(text, this.elements.errorMessage)
  }
}
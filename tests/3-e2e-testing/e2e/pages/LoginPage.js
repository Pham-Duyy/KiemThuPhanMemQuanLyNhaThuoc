// cypress/e2e/pages/LoginPage.js

export class LoginPage {
  visit() {
    cy.visit('/login');
  }

  fillEmail(email) {
    cy.get('input[name="email"]').clear().type(email);
  }

  fillPassword(password) {
    cy.get('input[name="password"]').clear().type(password);
  }

  clickLoginButton() {
    cy.get('button[type="submit"]').click();
  }

  login(email = 'admin@pharmacy.com', password = '123456') {
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickLoginButton();
  }

  getErrorMessage() {
    return cy.get('[role="alert"]');
  }

  verifyLoginSuccess() {
    cy.url().should('not.include', '/login');
    cy.get('[data-testid="user-menu"]').should('be.visible');
  }

  verifyLoginFailed(expectedErrorMsg) {
    cy.get('[role="alert"]').should('contain', expectedErrorMsg);
  }
}

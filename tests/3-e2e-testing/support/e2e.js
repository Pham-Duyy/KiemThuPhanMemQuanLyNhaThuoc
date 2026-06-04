// cypress/support/e2e.js
import './commands';

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('ResizeObserver')) {
    return false;
  }
  return true;
});

beforeEach(() => {
  // Clear localStorage before each test
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
});

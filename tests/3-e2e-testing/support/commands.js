// cypress/support/commands.js

// Custom command: Login
Cypress.Commands.add('login', (email = 'admin@pharmacy.com', password = '123456') => {
  cy.visit('/');
  cy.get('input[name="email"]').clear().type(email);
  cy.get('input[name="password"]').clear().type(password);
  cy.get('button[type="submit"]').click();
  cy.get('[role="alert"]').should('contain', 'Đăng nhập thành công');
  cy.url().should('not.include', '/login');
});

// Custom command: Logout
Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="user-menu"]').click();
  cy.get('[data-testid="logout-btn"]').click();
  cy.url().should('include', '/login');
});

// Custom command: Navigate to page
Cypress.Commands.add('navigateTo', (path) => {
  cy.get(`[href="${path}"]`).click();
});

// Custom command: Get API token
Cypress.Commands.add('getToken', () => {
  return cy.request('POST', 'http://localhost:5001/api/auth/login', {
    email: 'admin@pharmacy.com',
    password: '123456'
  }).then((response) => {
    expect(response.status).to.equal(200);
    return response.body.token;
  });
});

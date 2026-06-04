// cypress/e2e/auth.cy.js
import { LoginPage } from './pages/LoginPage';

describe('TC 1 - Authentication Tests', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    cy.visit('/login');
  });

  it('TC 1.1 - Login thành công với email/password đúng', () => {
    loginPage.login('admin@pharmacy.com', '123456');
    loginPage.verifyLoginSuccess();
    
    // Verify dashboard loaded
    cy.get('[data-testid="dashboard"]').should('be.visible');
  });

  it('TC 1.2 - Login thất bại với password sai', () => {
    loginPage.login('admin@pharmacy.com', 'wrong_password');
    loginPage.verifyLoginFailed('Sai email hoặc mật khẩu');
    
    // Verify still on login page
    cy.url().should('include', '/login');
  });

  it('TC 1.3 - Login thất bại với email không tồn tại', () => {
    loginPage.login('nonexistent@pharmacy.com', '123456');
    loginPage.verifyLoginFailed('Sai email hoặc mật khẩu');
  });

  it('TC 1.4 - Verify role-based access control (RBAC)', () => {
    // Login as pharmacist
    loginPage.login('pharmacist@pharmacy.com', '123456');
    loginPage.verifyLoginSuccess();
    
    // Verify pharmacist can access medicines but not user management
    cy.get('[href="/medicines"]').should('be.visible');
    cy.get('[href="/users"]').should('not.exist');
  });

  it('TC 1.5 - Token expiry handling', () => {
    loginPage.login('admin@pharmacy.com', '123456');
    loginPage.verifyLoginSuccess();
    
    // Clear token from localStorage to simulate expiry
    cy.window().then((win) => {
      win.localStorage.removeItem('token');
    });
    
    // Try to navigate to protected page
    cy.visit('/medicines');
    
    // Should redirect to login
    cy.url().should('include', '/login');
  });

  it('TC 1.6 - Logout functionality', () => {
    loginPage.login('admin@pharmacy.com', '123456');
    loginPage.verifyLoginSuccess();
    
    // Logout
    cy.logout();
    
    // Verify redirect to login
    cy.url().should('include', '/login');
    
    // Verify token cleared
    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.be.null;
    });
  });
});

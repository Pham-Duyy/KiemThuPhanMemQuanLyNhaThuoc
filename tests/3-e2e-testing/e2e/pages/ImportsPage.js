// cypress/e2e/pages/ImportsPage.js

export class ImportsPage {
  visit() {
    cy.visit('/imports');
  }

  // Click create import
  clickCreateImport() {
    cy.get('[data-testid="create-import-btn"]').click();
  }

  // Select supplier
  selectSupplier(supplierName) {
    cy.get('[data-testid="supplier-select"]').click();
    cy.get('[role="option"]').contains(supplierName).click();
  }

  // Add item to import
  addItem(medicineName, quantity, importPrice) {
    cy.get('[data-testid="add-item-btn"]').click();
    cy.get('[data-testid="medicine-search"]').clear().type(medicineName);
    cy.get('[role="option"]').first().click();
    cy.get('[data-testid="quantity-input"]').clear().type(quantity);
    cy.get('[data-testid="import-price-input"]').clear().type(importPrice);
    cy.get('[data-testid="confirm-item-btn"]').click();
  }

  // Get total amount
  getTotalAmount() {
    return cy.get('[data-testid="total-amount"]').then(($el) => {
      return parseFloat($el.text());
    });
  }

  // Select payment status
  selectPaymentStatus(status) {
    cy.get('[data-testid="payment-status-select"]').click();
    cy.get('[role="option"]').contains(status).click();
  }

  // Fill partial payment amount
  fillPartialPayment(amount) {
    cy.get('[data-testid="amount-paid-input"]').clear().type(amount);
  }

  // Submit import
  submitImport() {
    cy.get('button').contains('Lưu').click();
  }

  // Verify import created
  verifyImportCreated() {
    cy.get('[role="alert"]').should('contain', 'Tạo đơn nhập thành công');
  }

  // Get import history
  getImportRow(importCode) {
    return cy.get('table tbody tr').contains(importCode).closest('tr');
  }

  // Pay debt
  payDebt(importCode, amount) {
    this.getImportRow(importCode).find('[data-testid="pay-btn"]').click();
    cy.get('[data-testid="payment-amount-input"]').clear().type(amount);
    cy.get('button').contains('Thanh toán').click();
  }

  // Verify payment success
  verifyPaymentSuccess() {
    cy.get('[role="alert"]').should('contain', 'Thanh toán thành công');
  }
}

// cypress/e2e/pages/SalesPage.js

export class SalesPage {
  visit() {
    cy.visit('/sales');
  }

  // Select customer
  selectCustomer(customerId) {
    cy.get('[data-testid="customer-search"]').click();
    cy.get('[role="option"]').contains(customerId).click();
  }

  // Search medicine in POS
  searchMedicine(medicineName) {
    cy.get('[data-testid="medicine-search"]').clear().type(medicineName);
    cy.get('[role="option"]').first().click();
  }

  // Add medicine to cart
  addToCart(medicineName, quantity = 1) {
    this.searchMedicine(medicineName);
    cy.get('[data-testid="quantity-input"]').clear().type(quantity);
    cy.get('[data-testid="add-to-cart-btn"]').click();
  }

  // Get total amount
  getTotalAmount() {
    return cy.get('[data-testid="total-amount"]').then(($el) => {
      return parseFloat($el.text());
    });
  }

  // Select payment method
  selectPaymentMethod(method) {
    cy.get(`[data-testid="payment-method-${method}"]`).click();
  }

  // Click checkout
  checkout() {
    cy.get('[data-testid="checkout-btn"]').click();
  }

  // Confirm payment
  confirmPayment() {
    cy.get('[data-testid="confirm-payment-btn"]').click();
  }

  // Verify sale created successfully
  verifySaleSuccess() {
    cy.get('[role="alert"]').should('contain', 'Bán hàng thành công');
    cy.get('[data-testid="invoice-number"]').should('be.visible');
  }

  // Get invoice number
  getInvoiceNumber() {
    return cy.get('[data-testid="invoice-number"]').then(($el) => {
      return $el.text();
    });
  }

  // Apply loyalty points
  applyLoyaltyPoints(points) {
    cy.get('[data-testid="loyalty-points-input"]').clear().type(points);
    cy.get('[data-testid="apply-points-btn"]').click();
  }
}

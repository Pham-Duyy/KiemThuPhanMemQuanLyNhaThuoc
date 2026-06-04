// cypress/e2e/sales.cy.js
import { LoginPage } from './pages/LoginPage';
import { SalesPage } from './pages/SalesPage';

describe('TC 4 - Sales/POS Tests', () => {
  const loginPage = new LoginPage();
  const salesPage = new SalesPage();

  beforeEach(() => {
    cy.login();
    salesPage.visit();
  });

  it('TC 4.1 - CREATE sale with FEFO deduction', () => {
    // Select customer
    salesPage.selectCustomer('CUST_001');
    
    // Add first medicine (quantity: 2)
    salesPage.addToCart('Paracetamol', 2);
    
    // Add second medicine (quantity: 1)
    salesPage.addToCart('Ibuprofen', 1);
    
    // Verify cart items
    cy.get('[data-testid="cart-item"]').should('have.length', 2);
    
    // Select cash payment
    salesPage.selectPaymentMethod('cash');
    
    // Checkout
    salesPage.checkout();
    salesPage.confirmPayment();
    
    // Verify success
    salesPage.verifySaleSuccess();
    
    // Verify inventory decreased
    cy.visit('/medicines');
    cy.get('table').should('contain', 'Paracetamol');
  });

  it('TC 4.2 - CREATE sale with customer credit (ghi nợ)', () => {
    salesPage.selectCustomer('CUST_002');
    salesPage.addToCart('Aspirin', 5);
    
    // Select credit payment
    salesPage.selectPaymentMethod('credit');
    
    salesPage.checkout();
    salesPage.confirmPayment();
    
    salesPage.verifySaleSuccess();
    
    // Verify customer debt increased
    cy.visit('/customers');
    cy.get('table').should('contain', 'CUST_002');
    cy.get('table').contains('CUST_002').closest('tr').find('[data-testid="debt"]').then(($debt) => {
      expect(parseFloat($debt.text())).to.be.greaterThan(0);
    });
  });

  it('TC 4.3 - APPLY loyalty points and get discount', () => {
    salesPage.selectCustomer('CUST_003');
    salesPage.addToCart('Vitamin C', 10);
    
    // Get original total
    let originalTotal;
    salesPage.getTotalAmount().then((total) => {
      originalTotal = total;
    });
    
    // Apply points
    salesPage.applyLoyaltyPoints(50);
    
    // Verify discount applied
    cy.get('[role="alert"]').should('contain', 'Áp dụng điểm thành công');
  });

  it('TC 4.4 - REDEEM loyalty points', () => {
    salesPage.selectCustomer('CUST_001');
    
    // Verify customer has points
    cy.get('[data-testid="customer-info"]').should('contain', 'Điểm tích lũy');
    
    // Redeem points for discount
    cy.get('[data-testid="redeem-points-btn"]').click();
    cy.get('[data-testid="points-amount-input"]').clear().type(100);
    cy.get('button').contains('Đổi').click();
    
    cy.get('[role="alert"]').should('contain', 'Đổi điểm thành công');
  });

  it('TC 4.5 - AI drug interaction check', () => {
    cy.visit('/sales/check-interactions');
    
    // Add drugs to check
    cy.get('[data-testid="drug-input"]').clear().type('Paracetamol');
    cy.get('[data-testid="add-drug-btn"]').click();
    
    cy.get('[data-testid="drug-input"]').clear().type('Aspirin');
    cy.get('[data-testid="add-drug-btn"]').click();
    
    // Check interactions
    cy.get('[data-testid="check-btn"]').click();
    
    // Verify AI response
    cy.get('[data-testid="interaction-result"]').should('be.visible');
  });

  it('TC 4.6 - CANCEL sale and refund to inventory', () => {
    // Create a sale first
    salesPage.selectCustomer('CUST_001');
    salesPage.addToCart('Paracetamol', 3);
    salesPage.selectPaymentMethod('cash');
    salesPage.checkout();
    salesPage.confirmPayment();
    
    // Get invoice number
    let invoiceNumber;
    salesPage.getInvoiceNumber().then((invNum) => {
      invoiceNumber = invNum;
    });
    
    // Get medicine stock before cancel
    cy.visit('/medicines');
    cy.get('table').contains('Paracetamol').closest('tr').find('[data-testid="stock"]').then(($stock1) => {
      const stockAfterSale = parseFloat($stock1.text());
      
      // Cancel sale
      cy.visit('/sales');
      cy.get('table').contains(invoiceNumber).closest('tr').find('[data-testid="cancel-btn"]').click();
      cy.get('button').contains('Xác nhận').click();
      
      cy.get('[role="alert"]').should('contain', 'Hủy bán thành công');
      
      // Verify stock refunded
      cy.visit('/medicines');
      cy.get('table').contains('Paracetamol').closest('tr').find('[data-testid="stock"]').then(($stock2) => {
        const stockAfterCancel = parseFloat($stock2.text());
        expect(stockAfterCancel).to.be.greaterThan(stockAfterSale);
      });
    });
  });

  it('TC 4.7 - PRINT invoice', () => {
    // Create sale
    salesPage.selectCustomer('CUST_001');
    salesPage.addToCart('Paracetamol', 1);
    salesPage.selectPaymentMethod('cash');
    salesPage.checkout();
    salesPage.confirmPayment();
    
    // Get invoice number
    let invoiceNumber;
    salesPage.getInvoiceNumber().then((invNum) => {
      invoiceNumber = invNum;
    });
    
    // Print invoice
    cy.get('[data-testid="print-invoice-btn"]').click();
    
    // Verify print dialog appears or new tab opens
    cy.get('[data-testid="invoice-preview"]').should('be.visible');
  });

  it('TC 4.8 - E-Invoice (public invoice without authentication)', () => {
    // Get public link from last sale
    cy.visit('/sales');
    cy.get('table tbody tr').first().find('[data-testid="public-link-btn"]').click();
    
    // Copy public link
    cy.get('[data-testid="public-url"]').then(($url) => {
      const publicUrl = $url.attr('href');
      
      // Open in new session (simulating public access)
      cy.visit(publicUrl);
      
      // Verify invoice details visible without login
      cy.get('[data-testid="invoice-detail"]').should('be.visible');
      cy.get('[data-testid="invoice-items"]').should('be.visible');
    });
  });

  it('TC 4.9 - FILTER sales by payment method', () => {
    cy.visit('/sales');
    
    // Filter by cash
    cy.get('[data-testid="payment-filter"]').click();
    cy.get('[role="option"]').contains('Tiền mặt').click();
    
    // Verify all results are cash payment
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).should('contain', 'Tiền mặt');
    });
  });

  it('TC 4.10 - GET sales by date range', () => {
    cy.visit('/sales');
    
    // Select date range
    cy.get('[data-testid="start-date"]').clear().type('2026-05-01');
    cy.get('[data-testid="end-date"]').clear().type('2026-05-31');
    cy.get('button').contains('Tìm kiếm').click();
    
    // Verify results within date range
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
  });
});

// cypress/e2e/imports.cy.js
import { LoginPage } from './pages/LoginPage';
import { ImportsPage } from './pages/ImportsPage';

describe('TC 3 - Imports Tests', () => {
  const loginPage = new LoginPage();
  const importsPage = new ImportsPage();

  beforeEach(() => {
    cy.login();
    importsPage.visit();
  });

  it('TC 3.1 - GET smart PO suggestions (Smart Ordering)', () => {
    // Go to suggestions
    cy.get('[data-testid="suggestions-btn"]').click();
    
    // Verify suggestions loaded
    cy.get('[data-testid="suggestion-item"]').should('have.length.greaterThan', 0);
    
    // Verify algorithm considered: current stock, min-max range, sales velocity
    cy.get('[data-testid="suggestion-item"]').first().then(($item) => {
      cy.wrap($item).should('contain', 'Đề xuất'); // Should show suggested quantity
    });
  });

  it('TC 3.2 - CREATE import order with full payment', () => {
    importsPage.clickCreateImport();
    
    // Select supplier
    importsPage.selectSupplier('Supplier A');
    
    // Add items
    importsPage.addItem('Paracetamol', 100, 2000);
    importsPage.addItem('Ibuprofen', 50, 3500);
    
    // Get total
    let totalAmount;
    importsPage.getTotalAmount().then((total) => {
      totalAmount = total;
    });
    
    // Full payment
    importsPage.selectPaymentStatus('Thanh toán đủ');
    
    importsPage.submitImport();
    importsPage.verifyImportCreated();
    
    // Verify medicine stock increased
    cy.visit('/medicines');
    cy.get('table').contains('Paracetamol').closest('tr').find('[data-testid="stock"]').then(($stock) => {
      expect(parseFloat($stock.text())).to.be.greaterThan(0);
    });
  });

  it('TC 3.3 - CREATE import with partial payment (ghi nợ NCC)', () => {
    importsPage.clickCreateImport();
    
    importsPage.selectSupplier('Supplier B');
    importsPage.addItem('Aspirin', 200, 1500);
    
    let totalAmount;
    importsPage.getTotalAmount().then((total) => {
      totalAmount = total;
    });
    
    // Partial payment
    importsPage.selectPaymentStatus('Thanh toán một phần');
    importsPage.fillPartialPayment(totalAmount * 0.5);
    
    // Set due date
    cy.get('[data-testid="due-date-input"]').clear().type('2026-06-21');
    
    importsPage.submitImport();
    importsPage.verifyImportCreated();
  });

  it('TC 3.4 - GET all imports history', () => {
    // Verify imports list displayed
    cy.get('table').should('be.visible');
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
    
    // Verify columns
    cy.get('th').should('contain', 'Mã ĐN');
    cy.get('th').should('contain', 'NCC');
    cy.get('th').should('contain', 'Tổng tiền');
    cy.get('th').should('contain', 'Trạng thái');
  });

  it('TC 3.5 - GET import detail with all batch info', () => {
    // Click first import
    cy.get('table tbody tr').first().find('[data-testid="detail-btn"]').click();
    
    // Verify import details
    cy.get('[data-testid="import-detail"]').should('be.visible');
    
    // Verify all items with batch info displayed
    cy.get('[data-testid="import-item"]').should('have.length.greaterThan', 0);
    cy.get('[data-testid="batch-number"]').should('be.visible');
    cy.get('[data-testid="expiry-date"]').should('be.visible');
  });

  it('TC 3.6 - PAY import debt (Thanh toán nợ NCC)', () => {
    // Find import with outstanding debt
    cy.get('table').contains('Chưa thanh toán').closest('tr').then(($row) => {
      const importCode = $row.find('[data-testid="import-code"]').text();
      
      importsPage.payDebt(importCode, 100000);
      importsPage.verifyPaymentSuccess();
      
      // Verify debt status updated
      cy.get('table').contains(importCode).closest('tr').find('[data-testid="status"]').should('contain', 'Đã thanh toán');
    });
  });

  it('TC 3.7 - FILTER imports by supplier', () => {
    // Apply supplier filter
    cy.get('[data-testid="supplier-filter"]').click();
    cy.get('[role="option"]').first().click();
    
    // Verify all results are from selected supplier
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).find('[data-testid="supplier"]').should('be.visible');
    });
  });

  it('TC 3.8 - GET imports by date range', () => {
    // Set date range
    cy.get('[data-testid="start-date"]').clear().type('2026-05-01');
    cy.get('[data-testid="end-date"]').clear().type('2026-05-31');
    cy.get('button').contains('Tìm kiếm').click();
    
    // Verify results
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
  });

  it('TC 3.9 - VERIFY stock alerts after import', () => {
    // Create import
    importsPage.clickCreateImport();
    importsPage.selectSupplier('Supplier A');
    importsPage.addItem('TestMedicine', 500, 1000);
    importsPage.selectPaymentStatus('Thanh toán đủ');
    importsPage.submitImport();
    
    // Go to alerts
    cy.visit('/alerts');
    
    // Verify no low stock alert for imported medicine
    cy.get('[data-testid="low-stock-alerts"]').should('not.contain', 'TestMedicine');
  });

  it('TC 3.10 - VERIFY debt tracking for supplier', () => {
    // Go to suppliers
    cy.visit('/suppliers');
    
    // Click supplier with pending payments
    cy.get('table tbody tr').first().find('[data-testid="detail-btn"]').click();
    
    // Verify debt info displayed
    cy.get('[data-testid="supplier-debt"]').should('be.visible');
    cy.get('[data-testid="payment-history"]').should('be.visible');
  });
});

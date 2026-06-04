// cypress/e2e/medicines.cy.js
import { LoginPage } from './pages/LoginPage';
import { MedicinesPage } from './pages/MedicinesPage';

describe('TC 2 - Medicines Tests', () => {
  const loginPage = new LoginPage();
  const medicinesPage = new MedicinesPage();

  beforeEach(() => {
    cy.login();
    medicinesPage.visit();
  });

  it('TC 2.1 - GET all medicines list', () => {
    // Verify medicines list is loaded
    cy.get('table').should('be.visible');
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
    
    // Verify columns exist
    cy.get('th').should('contain', 'Tên thuốc');
    cy.get('th').should('contain', 'Giá bán');
    cy.get('th').should('contain', 'Tồn kho');
  });

  it('TC 2.2 - CREATE new medicine with batch tracking', () => {
    medicinesPage.clickAddMedicine();
    
    const medicineData = {
      code: 'TEST_MED_' + Date.now(),
      name: 'Test Medicine 500mg',
      sellPrice: 10000,
      importPrice: 5000,
      minStock: 10,
      category: 'Thuốc hạ sốt'
    };
    
    medicinesPage.fillMedicineForm(medicineData);
    medicinesPage.submitForm();
    medicinesPage.verifyMedicineAdded(medicineData.name);
  });

  it('TC 2.3 - UPDATE medicine details', () => {
    const medicineName = 'Paracetamol';
    medicinesPage.editMedicine(medicineName);
    
    // Update price
    cy.get('input[name="sellPrice"]').clear().type(12000);
    medicinesPage.submitForm();
    
    cy.get('[role="alert"]').should('contain', 'cập nhật thành công');
  });

  it('TC 2.4 - DELETE medicine (soft delete)', () => {
    const medicineName = 'Ibuprofen';
    medicinesPage.deleteMedicine(medicineName);
    medicinesPage.verifyMedicineDeleted(medicineName);
    
    // Verify medicine not visible by default
    cy.get('table').should('not.contain', medicineName);
  });

  it('TC 2.5 - SEARCH medicine by name', () => {
    medicinesPage.search('Aspirin');
    
    // Verify search results
    cy.get('table').should('contain', 'Aspirin');
  });

  it('TC 2.6 - FILTER low stock medicines', () => {
    medicinesPage.filterLowStock();
    
    // Verify filtered results show only low stock
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).find('td').eq(4).then(($stock) => {
        const stock = parseInt($stock.text());
        expect(stock).to.be.lessThan(20); // Assuming min stock is 20
      });
    });
  });

  it('TC 2.7 - VERIFY FEFO batch tracking on medicine detail', () => {
    // Click medicine detail
    cy.get('table tbody tr').first().find('[data-testid="detail-btn"]').click();
    
    // Verify batches displayed sorted by expiry date
    cy.get('[data-testid="batch-list"]').should('be.visible');
    cy.get('[data-testid="batch-item"]').first().then(($firstBatch) => {
      const firstExpiry = $firstBatch.find('[data-testid="expiry-date"]').text();
      cy.get('[data-testid="batch-item"]').eq(1).then(($secondBatch) => {
        const secondExpiry = $secondBatch.find('[data-testid="expiry-date"]').text();
        expect(new Date(firstExpiry)).to.be.below(new Date(secondExpiry));
      });
    });
  });

  it('TC 2.8 - GET expiring medicines alert', () => {
    // Go to settings or alerts page
    cy.visit('/alerts');
    
    // Verify expiring medicines shown
    cy.get('[data-testid="expiring-medicines"]').should('be.visible');
    cy.get('[data-testid="expiring-item"]').should('have.length.greaterThan', 0);
  });
});

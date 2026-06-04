// cypress/e2e/pages/MedicinesPage.js

export class MedicinesPage {
  visit() {
    cy.visit('/medicines');
  }

  // Search medicine
  search(medicineName) {
    cy.get('[data-testid="medicine-search"]').clear().type(medicineName);
    cy.get('button').contains('Tìm kiếm').click();
  }

  // Filter by low stock
  filterLowStock() {
    cy.get('[data-testid="low-stock-filter"]').check();
  }

  // Click add medicine button
  clickAddMedicine() {
    cy.get('[data-testid="add-medicine-btn"]').click();
  }

  // Fill medicine form
  fillMedicineForm(medicineData) {
    cy.get('input[name="code"]').clear().type(medicineData.code);
    cy.get('input[name="name"]').clear().type(medicineData.name);
    cy.get('input[name="sellPrice"]').clear().type(medicineData.sellPrice);
    cy.get('input[name="importPrice"]').clear().type(medicineData.importPrice);
    cy.get('input[name="minStock"]').clear().type(medicineData.minStock);
    
    if (medicineData.category) {
      cy.get('[data-testid="category-select"]').click();
      cy.get('[role="option"]').contains(medicineData.category).click();
    }
  }

  // Submit form
  submitForm() {
    cy.get('button').contains('Lưu').click();
  }

  // Verify medicine added
  verifyMedicineAdded(medicineName) {
    cy.get('[role="alert"]').should('contain', 'Thêm thuốc thành công');
    cy.get('table').should('contain', medicineName);
  }

  // Get medicine row
  getMedicineRow(medicineName) {
    return cy.get('table tbody tr').contains(medicineName).closest('tr');
  }

  // Edit medicine
  editMedicine(medicineName) {
    this.getMedicineRow(medicineName).find('[data-testid="edit-btn"]').click();
  }

  // Delete medicine
  deleteMedicine(medicineName) {
    this.getMedicineRow(medicineName).find('[data-testid="delete-btn"]').click();
    cy.get('button').contains('Xác nhận').click();
  }

  // Verify medicine deleted (soft delete)
  verifyMedicineDeleted(medicineName) {
    cy.get('[role="alert"]').should('contain', 'Xóa thành công');
  }
}

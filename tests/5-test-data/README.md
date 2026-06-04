# 📊 Test Data

Sample data for testing Group5 Pharmacy system

## 📄 Files

### test-users.json
Test account credentials for different roles

```json
{
  "admin": {
    "email": "admin@pharmacy.com",
    "password": "123456",
    "role": "admin",
    "permissions": ["all"]
  },
  "pharmacist": {
    "email": "pharmacist@pharmacy.com",
    "password": "123456",
    "role": "pharmacist",
    "permissions": ["medicines", "sales", "imports"]
  },
  "staff": {
    "email": "staff@pharmacy.com",
    "password": "123456",
    "role": "staff",
    "permissions": ["sales"]
  }
}
```

### test-medicines.json
Sample medicines for testing CRUD operations

```json
[
  {
    "id": "med_001",
    "code": "PARA500",
    "name": "Paracetamol 500mg",
    "category": "Thuốc hạ sốt",
    "unit": "viên",
    "sellPrice": 5000,
    "importPrice": 2000,
    "minStock": 10,
    "maxStock": 500,
    "batches": [
      {
        "batchNumber": "LOT001",
        "quantity": 100,
        "expiryDate": "2028-12-31"
      }
    ]
  },
  {
    "id": "med_002",
    "code": "IBU200",
    "name": "Ibuprofen 200mg",
    "category": "Thuốc giảm đau",
    "unit": "viên",
    "sellPrice": 8000,
    "importPrice": 3500,
    "minStock": 15,
    "maxStock": 400
  }
]
```

### test-scenarios.json
Complex test scenarios combining multiple steps

```json
{
  "scenario_1": {
    "name": "Complete POS Flow",
    "steps": [
      "Login as staff",
      "Select customer (CUST_001)",
      "Add Paracetamol × 2 to cart",
      "Add Ibuprofen × 1 to cart",
      "Select cash payment",
      "Checkout",
      "Verify FEFO deduction",
      "Print invoice"
    ]
  },
  "scenario_2": {
    "name": "Supplier Debt Workflow",
    "steps": [
      "Login as pharmacist",
      "Create import order (partial payment)",
      "Verify debt created",
      "Make payment",
      "Verify debt decreased",
      "Complete payment",
      "Verify status = paid"
    ]
  }
}
```

## 🎯 How to Use

### During API Testing

1. Use credentials from `test-users.json`
2. Copy request bodies from `test-medicines.json`
3. Modify IDs/values as needed
4. Send requests

### During E2E Testing

1. Tests auto-login using `test-users.json` credentials
2. Create medicines using `test-medicines.json` structure
3. Run complex scenarios from `test-scenarios.json`

### When Adding New Data

1. Document in appropriate JSON file
2. Include all required fields
3. Use realistic values (Vietnamese currency, medicine names, etc.)
4. Add to git for team consistency

## 📝 Test Data Standards

### Medicines
- **Code**: Format CODEXXXX (e.g., PARA500)
- **Name**: Full name with dosage (e.g., Paracetamol 500mg)
- **Price**: Vietnamese đồng (VND)
- **Stock**: Realistic pharmacy amounts (10-500)
- **Batch**: With realistic expiry dates (future dates)

### Customers
- **Name**: Vietnamese names
- **Phone**: Format 0XXX-XXX-XXXX
- **Address**: Real-looking addresses
- **Debt**: Calculated from sales/returns

### Suppliers
- **Name**: Pharmaceutical company names
- **Contact**: Business phone + email
- **Debt**: Calculated from import history

## 🚀 Quick Reference

| Need | File | Field |
|------|------|-------|
| Login credentials | test-users.json | email, password |
| Medicine template | test-medicines.json | All fields |
| Customer ID | test-scenarios.json | CUST_001 |
| Supplier ID | test-scenarios.json | SUPP_001 |
| Complex flow | test-scenarios.json | steps array |

## 💡 Tips

**Tip 1**: Keep test data consistent across test runs

**Tip 2**: Use IDs like med_001, cust_001 for easy tracking

**Tip 3**: Update test-scenarios.json as you discover workflows

**Tip 4**: Share test data with backend developers for seeding

## 🔗 See Also

- [../1-planning/TEST_PLAN.md](../1-planning/TEST_PLAN.md) - Test case details
- [../2-api-testing/postman/README.md](../2-api-testing/postman/README.md) - How to use test data in Postman
- [../3-e2e-testing/README.md](../3-e2e-testing/README.md) - How E2E tests use data


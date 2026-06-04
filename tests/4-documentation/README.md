# 📚 Documentation

Reference guides for testing Group5 Pharmacy API

## 📄 Files

### TEST_API_GUIDE.md
- **Content**: Complete API reference for all endpoints
- **Sections**: Auth, Medicines, Customers, Sales, Imports, etc.
- **Format**: Endpoint → Headers → Request body → Response examples
- **Use case**: Look up API details while testing

### TROUBLESHOOTING.md (Optional - create if needed)
- Common issues & solutions
- Error code reference
- Environment setup help

## 🔍 How to Use

### Looking up an API?

1. Open TEST_API_GUIDE.md
2. Find your endpoint (e.g., "POST /sales")
3. See:
   - Headers required
   - Request body format
   - Expected responses (200, 400, 401, etc.)
   - Example values
   - Test variations

### Example

**Question**: How do I create a sale with FEFO logic?

**Answer**:
1. Open TEST_API_GUIDE.md
2. Search "TC 4.1" or "CREATE Sale"
3. Find:
   ```
   Endpoint: POST /api/sales
   Headers: Authorization: Bearer {token}
   Request: {
     customer: { customerId: "..." },
     items: [{ medicineId, quantity, sellPrice }],
     totalAmount,
     paymentMethod
   }
   Response: 201 Created with FEFO batch info
   ```

## 📊 API Endpoints Covered

### Auth (5)
- POST /auth/login
- GET /auth/me
- PUT /auth/change-password
- GET /auth/verify-token
- POST /auth/refresh-token

### Medicines (8)
- GET /medicines
- POST /medicines
- GET /medicines/{id}
- PUT /medicines/{id}
- DELETE /medicines/{id}
- GET /medicines?lowStock=true
- GET /medicines?search=...
- GET /medicines/expiring

### Customers (5)
- POST /customers
- GET /customers
- GET /customers/{id}
- PUT /customers/{id}
- GET /customers/{id}/purchase-history

### Sales (10+)
- POST /sales
- GET /sales
- GET /sales/{id}
- GET /sales/public/{id}
- PUT /sales/{id}/cancel
- POST /ai/check-interactions
- GET /sales?paymentMethod=...
- GET /sales?startDate=...&endDate=...

### Imports (8)
- GET /imports/suggest
- POST /imports
- GET /imports
- GET /imports/{id}
- POST /imports/pay-debt
- GET /imports?supplier=...
- GET /imports?startDate=...

### Others
- Returns
- Suppliers  
- Prescriptions
- Cashbook
- HR & Timesheet
- Reports
- Audit Logs

## 🎯 Usage Patterns

### Pattern 1: Before Testing
1. Read TEST_API_GUIDE.md for endpoint you'll test
2. Understand request/response format
3. Know what to verify

### Pattern 2: During Testing
1. Make request (Postman/REST Client)
2. Compare response with TEST_API_GUIDE.md
3. Verify status code matches expected
4. Check response structure

### Pattern 3: After Testing
1. Document results in TEST_REPORT.md
2. If failed, check TEST_API_GUIDE.md for error meanings
3. Debug using TROUBLESHOOTING.md

## 📋 Document Structure

Each API section includes:

```
### TC X.Y - Description

**Endpoint**: [METHOD] /api/path

**Headers**:
- Authorization: Bearer {token}
- Content-Type: application/json

**Request Body**:
{
  field1: type,
  field2: type
}

**Expected Response (200/201)**:
{
  _id: string,
  field1: value,
  createdAt: timestamp
}

**Error Responses**:
- 400: Bad Request (invalid data)
- 401: Unauthorized (token missing/invalid)
- 403: Forbidden (RBAC denied)
- 404: Not Found (resource doesn't exist)
- 500: Server Error (backend issue)

**Test Variations**:
- Variation 1: ...
- Variation 2: ...

**FEFO Logic** (if applicable):
- Explain batch deduction order

**Debt Tracking** (if applicable):
- Explain debt calculation
```

## 🚀 Quick Reference Links

| Need Help With | File | Search For |
|---|---|---|
| Login endpoint | TEST_API_GUIDE.md | "TC 1.1" or "/auth/login" |
| FEFO logic | TEST_API_GUIDE.md | "TC 4.1" or "FEFO" |
| Debt tracking | TEST_API_GUIDE.md | "TC 3.3" or "ghi nợ" |
| Error codes | TEST_API_GUIDE.md | "401" or "Error Responses" |
| Loyalty points | TEST_API_GUIDE.md | "TC 4.3" or "loyalty" |
| Troubleshooting | TROUBLESHOOTING.md | "Issue:" |

## 💡 Tips

**Tip 1**: Keep TEST_API_GUIDE.md open while testing

**Tip 2**: Copy-paste request body examples, then modify

**Tip 3**: If test fails, check error code in guide

**Tip 4**: Use as reference for frontend developers too

## 🔗 See Also

- [../1-planning/TEST_PLAN.md](../1-planning/TEST_PLAN.md) - Test cases
- [../2-api-testing/postman/README.md](../2-api-testing/postman/README.md) - How to run Postman
- [../2-api-testing/rest-client/README.md](../2-api-testing/rest-client/README.md) - How to use REST Client


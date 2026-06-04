# 🔌 API Testing

## 📦 Postman Collections

### Files

| File | Purpose | Test Cases |
|------|---------|-----------|
| `01_Auth.postman_collection.json` | Login, RBAC, token management | 5 TCs |
| `02_Medicines.postman_collection.json` | CRUD, batch tracking, search | 8 TCs |
| `03_Sales.postman_collection.json` | POS, loyalty, AI check, E-invoice | 10 TCs |
| `04_Imports.postman_collection.json` | Smart PO, debt tracking, payment | 8 TCs |
| `Group5_Local_Environment.postman_environment.json` | Variables (baseUrl, token, etc.) | - |

**Total**: 31 API requests

## 🚀 Quick Start

### 1. Import Collections

1. **Open Postman**
2. Click **Import** (top left)
3. Upload **all 5 files** from this folder
4. Collections appear in sidebar ✅

### 2. Import Environment

1. Click **Import** again
2. Upload `Group5_Local_Environment.postman_environment.json`
3. Select environment from dropdown (top right)

### 3. Run Tests

```
1. Run TC 1.1 (Login) → Token auto-saves
   ↓
2. Run any other request → Auto-authenticated
   ↓
3. Check response (should be 200/201)
```

## 📝 Test Execution Order

### Phase 1: Auth (5 min)
```
✅ TC 1.1 - Login success
✅ TC 1.2 - Login wrong password
✅ TC 1.3 - Get current user
✅ TC 1.4 - Change password
✅ TC 1.5 - RBAC test
```

### Phase 2: Medicines (10 min)
```
✅ TC 2.1 - GET medicines
✅ TC 2.2 - CREATE medicine
✅ TC 2.3 - GET detail
✅ TC 2.4 - UPDATE medicine
✅ TC 2.5 - DELETE (soft)
✅ TC 2.6 - Filter low stock
✅ TC 2.7 - Search
✅ TC 2.8 - Expiring medicines
```

### Phase 3: Imports (10 min)
```
✅ TC 3.1 - Smart PO suggestions
✅ TC 3.2 - CREATE import (full payment)
✅ TC 3.3 - CREATE import (partial/ghi nợ)
✅ TC 3.4 - GET all imports
✅ TC 3.5 - GET detail
✅ TC 3.6 - PAY debt
✅ TC 3.7 - Filter by supplier
✅ TC 3.8 - Filter by date
```

### Phase 4: Sales (10 min)
```
✅ TC 4.1 - CREATE sale (FEFO)
✅ TC 4.2 - GET sales
✅ TC 4.3 - GET detail
✅ TC 4.4 - Public E-invoice
✅ TC 4.5 - CREATE with credit
✅ TC 4.6 - CANCEL sale
✅ TC 4.7 - AI drug interactions
✅ TC 4.8 - Filter by payment method
✅ TC 4.9 - Date range
✅ TC 4.10 - Loyalty points
```

**Total**: ~35 minutes

## 📊 Response Validation

### Expected Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | GET /medicines |
| 201 | Created | POST /sales |
| 204 | No Content | DELETE /medicines/{id} |
| 400 | Bad Request | Invalid JSON body |
| 401 | Unauthorized | Token expired/missing |
| 403 | Forbidden | RBAC denied |
| 404 | Not Found | ID doesn't exist |
| 500 | Server Error | Backend crashed |

### FEFO Logic Validation

In TC 4.1 response, verify:
```json
{
  "items": [
    {
      "medicineId": "med_001",
      "batchDeducted": "LOT_001",    // Earliest expiry
      "expiryDate": "2026-12-31"     // Batch with earliest expiry
    }
  ]
}
```

## 🔍 Debugging

### Issue: "Invalid token"
- Run TC 1.1 again to refresh
- Check environment shows {{token}} value
- Verify token not expired (24hr)

### Issue: "Cannot find endpoint"
- Check {{baseUrl}} = http://localhost:5001/api
- Ensure backend running on port 5001
- Check MongoDB connected

### Issue: "FEFO not working"
- Verify batches created with different expiry dates
- Earliest batch should be deducted first
- Check medicine model has batch array with expiryDate

## 💾 Saving Results

1. After each request, take screenshot or note:
   - Request sent
   - Status code received
   - Response body validated

2. Update TEST_REPORT.md:
   ```
   | TC 4.1 | PASS ✅ | 200 | Created sale with FEFO |
   ```

## 🔗 See Also

- [IMPORT_GUIDE.md](IMPORT_GUIDE.md) - Detailed import steps
- [../1-planning/TEST_PLAN.md](../1-planning/TEST_PLAN.md) - Test case details
- [../4-documentation/TEST_API_GUIDE.md](../4-documentation/TEST_API_GUIDE.md) - API reference


# Postman Import & Setup Guide - Group5 Pharmacy

## ⚡ Quick Start (5 minutes)

### Step 1: Import Collections into Postman

1. **Open Postman** (Desktop or Web)
2. Click **Import** button (top left)
3. Choose **Upload Files** tab
4. Select and upload these 4 files:
   - `01_Auth.postman_collection.json`
   - `02_Medicines.postman_collection.json`
   - `03_Sales.postman_collection.json`
   - `04_Imports.postman_collection.json`
5. Click **Import** button

### Step 2: Import Environment

1. Click **Import** button again
2. Select `Group5_Local_Environment.postman_environment.json`
3. Click **Import**

### Step 3: Select Environment

1. In top-right corner, find the environment dropdown (usually shows "No Environment")
2. Select **Group5_Local_Environment**
3. You should see {{baseUrl}}, {{token}}, etc. in the environment panel

### Step 4: Start Testing

1. **First, Login**: Run request `TC 1.1 - Login Thành Công`
2. Token will auto-save to {{token}} variable
3. All other requests use {{token}} for authentication

---

## 📋 Collection Overview

### 01_Auth - Authentication
| Request | Method | Endpoint | Purpose |
|---------|--------|----------|---------|
| TC 1.1 | POST | /auth/login | Get JWT token |
| TC 1.2 | POST | /auth/login | Test wrong password |
| TC 1.3 | GET | /auth/me | Verify token + current user |
| TC 1.4 | PUT | /auth/change-password | Change password |
| TC 1.5 | DELETE | /users/{id} | Test RBAC (pharmacist should fail) |

**Quick Test**:
```
1. Run TC 1.1 → Token saved to {{token}}
2. Run TC 1.3 → Should return user info (401 if token invalid)
3. Run TC 1.2 → Should return 401 Unauthorized
```

### 02_Medicines - Medicine CRUD & Batch Management
| Request | Method | Endpoint | Purpose |
|---------|--------|----------|---------|
| TC 2.1 | GET | /medicines?page=1&limit=10 | List all medicines |
| TC 2.2 | POST | /medicines | Create new medicine with batch |
| TC 2.3 | GET | /medicines/{id} | Get medicine detail |
| TC 2.4 | PUT | /medicines/{id} | Update medicine |
| TC 2.5 | DELETE | /medicines/{id} | Soft delete medicine |
| TC 2.6 | GET | /medicines?lowStock=true | Filter low stock |
| TC 2.7 | GET | /medicines?search=Aspirin | Search by name |
| TC 2.8 | GET | /medicines/expiring | Get expiring medicines |

**Quick Test**:
```
1. TC 2.1 → See all medicines
2. TC 2.2 → Create medicine "TEST_MED_001"
3. TC 2.3 → Get detail with batch info
4. TC 2.7 → Search "TEST_MED" → Find created medicine
5. TC 2.4 → Update price to 15000
6. TC 2.5 → Delete (soft delete, should still exist in DB)
```

### 03_Sales - POS & Loyalty Points
| Request | Method | Endpoint | Purpose |
|---------|--------|----------|---------|
| TC 4.1 | POST | /sales | Create sale (FEFO deduction) |
| TC 4.2 | GET | /sales?page=1&limit=10 | List all sales |
| TC 4.3 | GET | /sales/{id} | Get sale detail + invoice |
| TC 4.4 | GET | /sales/public/{id} | Public e-invoice (no auth) |
| TC 4.5 | POST | /sales | Create sale with credit (ghi nợ) |
| TC 4.6 | PUT | /sales/{id}/cancel | Cancel sale + refund stock |
| TC 4.7 | POST | /ai/check-interactions | AI drug interaction check |
| TC 4.8 | GET | /sales?paymentMethod=cash | Filter by payment method |
| TC 4.9 | GET | /sales?startDate=2026-05-01&endDate=2026-05-31 | Date range filter |
| TC 4.10 | POST | /sales | Create sale with loyalty points |

**Quick Test**:
```
1. TC 4.1 → Create sale:
   - Customer: CUST_001
   - Items: med_001 (qty=2), med_002 (qty=1)
   - Payment: cash
   - Total: 18000
2. TC 4.3 → Get sale detail → Verify FEFO logic (earliest batch used first)
3. TC 4.2 → List sales → Should see new sale
4. TC 4.7 → Check interactions for Paracetamol + Ibuprofen
5. TC 4.6 → Cancel sale → Inventory refunded
```

### 04_Imports - Supplier Orders & Debt Tracking
| Request | Method | Endpoint | Purpose |
|---------|--------|----------|---------|
| TC 3.1 | GET | /imports/suggest | Smart PO suggestions |
| TC 3.2 | POST | /imports | Create import (full payment) |
| TC 3.3 | POST | /imports | Create import (partial payment = ghi nợ) |
| TC 3.4 | GET | /imports?page=1&limit=10 | List all imports |
| TC 3.5 | GET | /imports/{id} | Get import detail with batches |
| TC 3.6 | POST | /imports/pay-debt | Pay supplier debt |
| TC 3.7 | GET | /imports?supplier=supp_001 | Filter by supplier |
| TC 3.8 | GET | /imports?startDate=2026-05-01&endDate=2026-05-31 | Date range filter |

**Quick Test**:
```
1. TC 3.2 → Create import:
   - Supplier: supp_001
   - Items: med_001 (qty=100, price=2000)
   - Payment: FULL
2. TC 3.4 → List imports → Should see new import
3. TC 3.5 → Get detail → Verify batch numbers stored
4. TC 3.3 → Create import with PARTIAL payment:
   - Total: 400000
   - Paid: 200000
   - Due: 200000
5. TC 3.6 → Pay 100000 toward debt
6. TC 3.5 → Verify remaining debt: 100000
```

---

## 🔧 Environment Variables

File: `Group5_Local_Environment.postman_environment.json`

### Required Variables (Set Before Use)

| Variable | Default | Purpose | Example |
|----------|---------|---------|---------|
| `baseUrl` | http://localhost:5001/api | API base URL | ✅ Already set |
| `token` | [empty] | JWT token (auto-filled by TC 1.1) | Filled after login |
| `userId` | [empty] | Current user ID | Filled after login |
| `customerId` | cust_001 | Test customer ID | Edit as needed |
| `medicineId` | med_001 | Test medicine ID | Edit as needed |
| `supplierId` | supp_001 | Test supplier ID | Edit as needed |

### Credentials

| User | Email | Password | Role |
|------|-------|----------|------|
| Admin | admin@pharmacy.com | 123456 | Admin |
| Pharmacist | pharmacist@pharmacy.com | 123456 | Pharmacist |
| Staff | staff@pharmacy.com | 123456 | Staff |

---

## 📝 Manual Test Flow Examples

### Example 1: Complete Sales Workflow (5 minutes)

**Goal**: Test complete POS flow with FEFO inventory deduction

**Steps**:
1. **Login**: Run `TC 1.1` → Copy token to clipboard
2. **View Medicines**: Run `TC 2.1` → Identify available medicines
3. **Create Sale**:
   - Run `TC 4.1` (already has sample data)
   - Edit body to use real medicine IDs from TC 2.1
   - Send request → Get Sale ID from response
4. **Get Sale Detail**: 
   - Run `TC 4.3`
   - Replace `sale_001` with actual Sale ID from step 3
   - Verify FEFO deduction (earliest batch should be used)
5. **Cancel Sale**:
   - Run `TC 4.6`
   - Replace `sale_001` with actual Sale ID
   - Verify refund
6. **Check Inventory**:
   - Run `TC 2.1` → Verify stock returned to original level

**Expected**: Stock decreases on sale → Increases on cancellation ✅

---

### Example 2: Supplier Debt Tracking (5 minutes)

**Goal**: Test partial payment and debt tracking

**Steps**:
1. **Login**: Run `TC 1.1`
2. **Create Partial Import**:
   - Run `TC 3.3` (already has partial payment setup)
   - Send → Get Import ID
3. **Verify Debt**:
   - Run `TC 3.5` with Import ID
   - Verify `amountDue: 200000`
4. **Pay Partial Debt**:
   - Run `TC 3.6`
   - Send 100000 payment
5. **Verify Updated Debt**:
   - Run `TC 3.5` again
   - Verify `amountDue: 100000` (remaining)

**Expected**: Debt decreases as payments made ✅

---

### Example 3: RBAC Testing (3 minutes)

**Goal**: Verify role-based access control

**Steps**:
1. **Login as Admin**: `TC 1.1` with admin@pharmacy.com
2. **Perform Admin Action**: `TC 1.5` (delete user)
   - Should return 200 or 204 (success)
3. **Login as Pharmacist**: `TC 1.1` with pharmacist@pharmacy.com
4. **Try Admin Action**: `TC 1.5`
   - Should return 403 (Forbidden) ❌

**Expected**: Pharmacist cannot delete users ✅

---

## 🚀 Running Tests Programmatically

### Using Postman CLI (Newman)

**Install Newman**:
```bash
npm install -g newman
```

**Run all collections**:
```bash
newman run 01_Auth.postman_collection.json \
  -e Group5_Local_Environment.postman_environment.json \
  -r cli,json \
  --reporter-json-export results.json
```

**Run specific collection**:
```bash
newman run 02_Medicines.postman_collection.json \
  -e Group5_Local_Environment.postman_environment.json
```

**Run with custom data**:
```bash
newman run 03_Sales.postman_collection.json \
  -e Group5_Local_Environment.postman_environment.json \
  --global-var "customerId=CUST_123" \
  --global-var "medicineId=med_456"
```

### Generate HTML Report

```bash
npm install -g newman-reporter-html

newman run 01_Auth.postman_collection.json \
  -e Group5_Local_Environment.postman_environment.json \
  -r html \
  --reporter-html-export auth_results.html
```

---

## ⚠️ Troubleshooting

### Issue: "Invalid token" error

**Solution**:
1. Run `TC 1.1` again to get fresh token
2. Check environment shows {{token}} value
3. Verify token not expired (JWT valid for 24hrs)
4. Check backend running on port 5001

### Issue: "Cannot find endpoint"

**Solution**:
1. Verify {{baseUrl}} = http://localhost:5001/api
2. Check backend logs for routing errors
3. Ensure MongoDB connected (check backend console)
4. Try restarting backend: `npm start` in backend folder

### Issue: "FEFO logic not working"

**Solution**:
1. Verify batches created with different expiry dates
2. Check batch with EARLIEST expiry deducted first
3. Review backend logic in medicineController.js
4. Ensure expiryDate field is Date type (not string)

### Issue: "Debt not tracking"

**Solution**:
1. Verify import created with `paymentStatus: "partial"`
2. Check `amountDue` calculated correctly
3. Verify payment endpoint exists: POST /imports/pay-debt
4. Check supplier model has debt field

---

## ✅ Pre-Test Checklist

- [ ] Postman installed (latest version)
- [ ] Collections imported (4 files visible in sidebar)
- [ ] Environment imported and selected
- [ ] {{baseUrl}} shows http://localhost:5001/api
- [ ] Backend running (curl http://localhost:5001/api/auth/login works)
- [ ] MongoDB running (check connection string in backend config)
- [ ] Test user exists: admin@pharmacy.com / 123456
- [ ] TC 1.1 returns 200 with token in response
- [ ] {{token}} auto-populated after TC 1.1

---

## 📊 Quick Reference

### Request Structure
```json
POST /sales
Headers:
  - Authorization: Bearer {{token}}
  - Content-Type: application/json
Body:
{
  "customer": { "customerId": "{{customerId}}" },
  "items": [
    { "medicineId": "med_001", "quantity": 2, "sellPrice": 5000 }
  ],
  "totalAmount": 10000,
  "paymentMethod": "cash"
}
```

### Response Structure
```json
200 Created
{
  "_id": "sale_abc123",
  "saleCode": "SAL20260521001",
  "totalAmount": 10000,
  "paidAmount": 10000,
  "status": "completed",
  "createdAt": "2026-05-21T15:30:00Z"
}
```

### Common Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| 200 | OK | Success ✅ |
| 201 | Created | Resource created ✅ |
| 400 | Bad Request | Check request body syntax |
| 401 | Unauthorized | Token invalid, run TC 1.1 |
| 403 | Forbidden | RBAC denied, check user role |
| 404 | Not Found | ID doesn't exist, verify ID |
| 500 | Server Error | Backend crashed, check logs |

---

## 📚 Additional Resources

- **Postman Docs**: https://learning.postman.com/
- **API Guide**: See TEST_API_GUIDE.md in this repo
- **Test Plan**: See TEST_PLAN.md for all 68 test cases
- **Backend Code**: See backend/ folder for implementation

---

**Last Updated**: 2026-05-21  
**Status**: ✅ Ready to Import  
**Version**: 1.0  


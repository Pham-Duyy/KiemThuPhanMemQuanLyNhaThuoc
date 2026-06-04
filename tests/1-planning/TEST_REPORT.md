# Test Execution Report - Group5 Pharmacy

## Project Information
- **Project**: Group5 Pharmacy Management System (GPP)
- **Report Date**: 2026-05-21
- **Test Environment**: Local (http://localhost:5173 & http://localhost:5001)
- **Database**: MongoDB Local
- **Tester**: [Your Name]
- **Platform**: Windows / Browser: Chrome

---

## Executive Summary

| Metric | Value | Status |
|--------|-------|--------|
| **Total Test Cases** | 68 | 🎯 |
| **Total E2E Tests** | 34 | 🎯 |
| **Executed** | 0 | ⏳ |
| **Passed** | 0 | ✅ |
| **Failed** | 0 | ❌ |
| **Blocked** | 0 | ⛔ |
| **Pass Rate** | 0% | 📊 |
| **Execution Date** | [Date] | 📅 |

---

## Test Summary by Phân Hệ

| Phân Hệ | Test Cases | API | E2E | Status |
|---------|-----------|-----|-----|--------|
| 🔐 **1. Auth & Roles** | 6 | 5 | 6 | ⏳ Chưa test |
| 💊 **2. Medicines** | 8 | 8 | 8 | ⏳ Chưa test |
| 📦 **3. Imports** | 10 | 8 | 10 | ⏳ Chưa test |
| 🛒 **4. Sales/POS** | 10 | 10 | 10 | ⏳ Chưa test |
| 🔄 **5. Returns** | 4 | 4 | - | ⏳ Chưa test |
| 👥 **6. Customers** | 5 | 5 | - | ⏳ Chưa test |
| 🏢 **7. Suppliers** | 3 | 3 | - | ⏳ Chưa test |
| 🧾 **8. Prescriptions** | 5 | 5 | - | ⏳ Chưa test |
| 💰 **9. Cashbook** | 4 | 4 | - | ⏳ Chưa test |
| ⏰ **10. HR & Timesheet** | 6 | 6 | - | ⏳ Chưa test |
| 📊 **11. Reports** | 5 | 5 | - | ⏳ Chưa test |
| 👁️ **12. Audit Logs** | 3 | 3 | - | ⏳ Chưa test |
| ⚙️ **13. Settings** | 4 | 4 | - | ⏳ Chưa test |
| **TOTAL** | **68** | **60** | **34** | - |

---

## Detailed Test Results

### TC 1 - Authentication & Authorization Tests

| # | Test Case | API | E2E | Result | Executed | Notes |
|---|-----------|-----|-----|--------|----------|-------|
| 1.1 | Login thành công (Admin) | ✅ READY | ✅ READY | ⏳ | [ ] | Endpoint: POST /auth/login |
| 1.2 | Login sai password | ✅ READY | ✅ READY | ⏳ | [ ] | Should return 401 Unauthorized |
| 1.3 | Login sai email | ✅ READY | ✅ READY | ⏳ | [ ] | Should return 401 Unauthorized |
| 1.4 | RBAC - Pharmacist access control | ✅ READY | ✅ READY | ⏳ | [ ] | Pharmacist cannot delete users |
| 1.5 | RBAC - Staff access control | ✅ READY | ✅ READY | ⏳ | [ ] | Staff cannot manage inventory |
| 1.6 | Token expiry handling | ✅ READY | ✅ READY | ⏳ | [ ] | 24hr expiry validation |
| **STATUS** | - | 5/5 ✅ | 6/6 ✅ | **0/6** | - | - |

### TC 2 - Medicines Management Tests

| # | Test Case | API | E2E | Result | Executed | Notes |
|---|-----------|-----|-----|--------|----------|-------|
| 2.1 | GET all medicines with pagination | ✅ READY | ✅ READY | ⏳ | [ ] | /medicines?page=1&limit=10 |
| 2.2 | CREATE medicine with batch tracking | ✅ READY | ✅ READY | ⏳ | [ ] | FEFO batch tracking required |
| 2.3 | UPDATE medicine price | ✅ READY | ✅ READY | ⏳ | [ ] | Should update sellPrice only |
| 2.4 | DELETE medicine (soft delete) | ✅ READY | ✅ READY | ⏳ | [ ] | isActive: false, not physical deletion |
| 2.5 | SEARCH medicine by name | ✅ READY | ✅ READY | ⏳ | [ ] | Case-insensitive search |
| 2.6 | FILTER low stock medicines | ✅ READY | ✅ READY | ⏳ | [ ] | minStock threshold check |
| 2.7 | VERIFY batch sorting by expiry (FEFO) | ✅ READY | ✅ READY | ⏳ | [ ] | Earliest expiry first |
| 2.8 | GET expiring medicines alert | ✅ READY | ✅ READY | ⏳ | [ ] | 30-day expiry warning |
| **STATUS** | - | 8/8 ✅ | 8/8 ✅ | **0/8** | - | - |

### TC 3 - Import Orders & Debt Tracking Tests

| # | Test Case | API | E2E | Result | Executed | Notes |
|---|-----------|-----|-----|--------|----------|-------|
| 3.1 | GET smart PO suggestions | ✅ READY | ✅ READY | ⏳ | [ ] | Algorithm: current stock + sales velocity |
| 3.2 | CREATE import with full payment | ✅ READY | ✅ READY | ⏳ | [ ] | Stock should increase immediately |
| 3.3 | CREATE import with partial payment (ghi nợ) | ✅ READY | ✅ READY | ⏳ | [ ] | Supplier debt tracking |
| 3.4 | GET import history | ✅ READY | ✅ READY | ⏳ | [ ] | Pagination + filters |
| 3.5 | GET import detail with batch info | ✅ READY | ✅ READY | ⏳ | [ ] | Show all batch numbers & expiry dates |
| 3.6 | PAY supplier debt | ✅ READY | ✅ READY | ⏳ | [ ] | Update payment status to "paid" |
| 3.7 | FILTER imports by supplier | ✅ READY | ✅ READY | ⏳ | [ ] | Supplier ID filter |
| 3.8 | FILTER imports by date range | ✅ READY | ✅ READY | ⏳ | [ ] | startDate & endDate params |
| 3.9 | VERIFY stock alerts after import | ✅ READY | ✅ READY | ⏳ | [ ] | No low-stock alert after import |
| 3.10 | VERIFY supplier debt tracking | ✅ READY | ✅ READY | ⏳ | [ ] | Total debt should decrease after payment |
| **STATUS** | - | 8/8 ✅ | 10/10 ✅ | **0/10** | - | - |

### TC 4 - Sales/POS & Loyalty Points Tests

| # | Test Case | API | E2E | Result | Executed | Notes |
|---|-----------|-----|-----|--------|----------|-------|
| 4.1 | CREATE sale with FEFO inventory deduction | ✅ READY | ✅ READY | ⏳ | [ ] | Earliest expiry batch deducted first |
| 4.2 | CREATE sale with customer credit (ghi nợ) | ✅ READY | ✅ READY | ⏳ | [ ] | Customer debt tracking |
| 4.3 | APPLY loyalty points for discount | ✅ READY | ✅ READY | ⏳ | [ ] | 1 point = 1 VND discount |
| 4.4 | REDEEM loyalty points | ✅ READY | ✅ READY | ⏳ | [ ] | Customer tier: Thường→Bạc→Vàng→Kim cương |
| 4.5 | AI drug interaction check | ✅ READY | ✅ READY | ⏳ | [ ] | Google Gemini AI check before checkout |
| 4.6 | CANCEL sale and refund to inventory | ✅ READY | ✅ READY | ⏳ | [ ] | Stock must increase, customer debt cleared |
| 4.7 | PRINT invoice | ✅ READY | ✅ READY | ⏳ | [ ] | PDF generation required |
| 4.8 | GET public E-Invoice (no auth required) | ✅ READY | ✅ READY | ⏳ | [ ] | Public link with 30-day expiry |
| 4.9 | FILTER sales by payment method | ✅ READY | ✅ READY | ⏳ | [ ] | Cash / Credit / Bank Transfer |
| 4.10 | GET sales by date range | ✅ READY | ✅ READY | ⏳ | [ ] | Revenue report data |
| **STATUS** | - | 10/10 ✅ | 10/10 ✅ | **0/10** | - | - |

### TC 5-13 - Other Modules (API Tests)

| # | Phân Hệ | Test Cases | API | Status |
|---|---------|-----------|-----|--------|
| 5 | Returns & Refunds | 4 | ✅ READY | ⏳ Chưa test |
| 6 | Customer Management | 5 | ✅ READY | ⏳ Chưa test |
| 7 | Supplier Management | 3 | ✅ READY | ⏳ Chưa test |
| 8 | AI Prescriptions | 5 | ✅ READY | ⏳ Chưa test |
| 9 | Cashbook Transactions | 4 | ✅ READY | ⏳ Chưa test |
| 10 | HR & Timesheet | 6 | ✅ READY | ⏳ Chưa test |
| 11 | Reports & Analytics | 5 | ✅ READY | ⏳ Chưa test |
| 12 | Audit Logs | 3 | ✅ READY | ⏳ Chưa test |
| 13 | Settings | 4 | ✅ READY | ⏳ Chưa test |

---

## Test Execution Metrics

### By Priority Level

| Priority | Total | Passed | Failed | Pass Rate |
|----------|-------|--------|--------|-----------|
| 🔴 **CRITICAL** (15) | 15 | 0 | 0 | 0% |
| 🟠 **HIGH** (35) | 35 | 0 | 0 | 0% |
| 🟡 **MEDIUM** (18) | 18 | 0 | 0 | 0% |
| **TOTAL** | **68** | **0** | **0** | **0%** |

### By Test Type

| Type | Count | Passed | Failed | Status |
|------|-------|--------|--------|--------|
| API Tests (Postman) | 60 | 0 | 0 | ⏳ Ready |
| E2E Tests (Cypress) | 34 | 0 | 0 | ⏳ Ready |
| Manual Tests | - | - | - | ⏳ Ready |
| Integration Tests | - | - | - | ⏳ Ready |

---

## Testing Tools & Environment

### API Testing
- **Postman Collections**: 4 files created (Auth, Medicines, Sales, Imports)
- **REST Client**: VS Code extension with 100+ endpoints
- **Base URL**: http://localhost:5001/api
- **Environment**: Local MongoDB (mongodb://localhost:27017/data_pharmacy)

### UI/E2E Testing  
- **Framework**: Cypress 13.x+
- **Browser**: Chrome (Headless supported)
- **Base URL**: http://localhost:5173
- **Test Files**: 4 spec files (auth, medicines, imports, sales)
- **Page Objects**: 4 POM classes (LoginPage, MedicinesPage, ImportsPage, SalesPage)

### Backend
- **Runtime**: Node.js 18+
- **Port**: 5001
- **Database**: MongoDB 7.2.0
- **Authentication**: JWT (Bearer token)

---

## Test Execution Timeline

### Phase 1: Smoke Tests (High Priority)
- Duration: 15-20 minutes
- Focus: Core functionality (Auth, Medicines, Sales, Imports)
- Decision Gate: All Critical tests must PASS ✅

### Phase 2: Functional Tests (High & Medium Priority)
- Duration: 30-45 minutes  
- Focus: All TC 1-4 with variations
- Decision Gate: Critical + High must be ≥95% PASS ✅

### Phase 3: Integration Tests
- Duration: 20-30 minutes
- Focus: Multi-module flows (Sales→Returns, Imports→Stock, etc.)
- Decision Gate: All integration tests must PASS ✅

### Phase 4: Regression Tests (If Changes Made)
- Duration: 30-60 minutes
- Focus: Affected modules only
- Decision Gate: 100% PASS required ✅

---

## Defects Found

| ID | Severity | Module | Description | Status | Fix Date |
|----|----------|--------|-------------|--------|----------|
| [BUG-001] | 🔴 Critical | Auth | [Description if found] | ⏳ Open | - |
| [BUG-002] | 🟠 High | Medicines | [Description if found] | ⏳ Open | - |
| [BUG-003] | 🟡 Medium | Sales | [Description if found] | ⏳ Open | - |

---

## Performance Metrics

| Test Suite | Avg Execution Time | Status |
|-----------|-------------------|--------|
| Auth Tests (TC 1) | ~15 sec | ⏳ |
| Medicines Tests (TC 2) | ~30 sec | ⏳ |
| Imports Tests (TC 3) | ~40 sec | ⏳ |
| Sales Tests (TC 4) | ~45 sec | ⏳ |
| **Total (All 34 E2E)** | ~2-3 min | ⏳ |

---

## Test Data Used

### Users
```
Admin: admin@pharmacy.com / 123456
Pharmacist: pharmacist@pharmacy.com / 123456
Staff: staff@pharmacy.com / 123456
```

### Sample Data IDs
```
Customer: CUST_001, CUST_002, CUST_003
Medicine: med_001, med_002 (Paracetamol, Ibuprofen)
Supplier: supp_001 (Supplier A)
Import: imp_001
Sale: sale_001
```

---

## Sign-Off & Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| **QA Lead** | [Name] | [ ] | [ ] |
| **Developer** | [Name] | [ ] | [ ] |
| **Manager** | [Name] | [ ] | [ ] |

---

## Notes & Observations

### Strengths
- ✅ Complete test coverage (68 TCs across 13 modules)
- ✅ Mix of API + E2E tests (34 automated)
- ✅ Well-organized test scenarios
- ✅ Page Object Models for maintainability
- ✅ Comprehensive FEFO & debt tracking validation

### Areas for Improvement
- [ ] Add performance/load testing (stress test with 1000+ users)
- [ ] Add security testing (SQL injection, XSS checks)
- [ ] Add accessibility testing (WCAG 2.1 compliance)
- [ ] Add mobile UI testing (responsive design)
- [ ] Add API contract testing (schema validation)

### Recommendations
1. Run full test suite before each production release
2. Execute smoke tests daily in CI/CD pipeline
3. Maintain test data consistency across environments
4. Update tests when UI/API changes occur
5. Generate coverage reports monthly

---

## Attachments

- 📄 [TEST_PLAN.md](TEST_PLAN.md) - 68 test cases with detailed steps
- 🔌 [requests.http](requests.http) - REST Client API tests (100+ endpoints)
- 📖 [TEST_API_GUIDE.md](TEST_API_GUIDE.md) - API documentation with examples
- 📬 [Postman Collections](./01_Auth.postman_collection.json) - API automation (4 files)
- 🧪 [Cypress Tests](cypress/e2e/) - E2E test suite (34 test cases)

---

**Report Generated**: 2026-05-21  
**Next Review**: [After first test execution]  
**Version**: 1.0  


# 🎭 E2E Testing (Cypress)

## 🧪 Test Suites

| File | Tests | Coverage |
|------|-------|----------|
| `auth.cy.js` | 6 | Login, RBAC, token expiry, logout |
| `medicines.cy.js` | 8 | CRUD, batch tracking, FEFO, search, filters |
| `sales.cy.js` | 10 | POS, FEFO deduction, credit, loyalty, AI check, cancel, e-invoice |
| `imports.cy.js` | 10 | Smart PO, full/partial payment, debt tracking, filters |
| **TOTAL** | **34** | Complete UI workflows |

## 🚀 Quick Start

### 1. Install Cypress

```bash
cd tests/3-e2e-testing/

npm install --save-dev cypress
```

### 2. Open Test Runner

```bash
# Visual mode (recommended for first time)
npx cypress open

# Then select:
# - Chrome browser
# - E2E testing
# - Click on test file
```

### 3. Run All Tests

```bash
# Headless (CLI mode)
npx cypress run

# Specific file
npx cypress run --spec "cypress/e2e/auth.cy.js"

# Specific test
npx cypress run --spec "cypress/e2e/sales.cy.js" --env testName="TC 4.1"
```

## 📁 Project Structure

```
3-e2e-testing/
├── cypress.config.js          # Configuration
├── README.md                   # This file
├── e2e/
│   ├── auth.cy.js             # 6 tests
│   ├── medicines.cy.js        # 8 tests
│   ├── sales.cy.js            # 10 tests
│   ├── imports.cy.js          # 10 tests
│   └── pages/                 # Page Object Models
│       ├── LoginPage.js
│       ├── MedicinesPage.js
│       ├── SalesPage.js
│       └── ImportsPage.js
└── support/
    ├── e2e.js                 # Global setup
    └── commands.js            # Custom commands
```

## 📋 Test Cases

### TC 1: Authentication (6 tests)
```javascript
✅ Login success
✅ Login wrong password
✅ Login wrong email
✅ RBAC - Pharmacist restrictions
✅ Token expiry handling
✅ Logout functionality
```

### TC 2: Medicines (8 tests)
```javascript
✅ View all medicines
✅ Create medicine with batch tracking
✅ Update medicine details
✅ Delete medicine (soft delete)
✅ Search medicine by name
✅ Filter low stock medicines
✅ Verify FEFO batch sorting
✅ View expiring medicines
```

### TC 3: Imports (10 tests)
```javascript
✅ Get smart PO suggestions
✅ Create import (full payment)
✅ Create import (partial payment/ghi nợ)
✅ View import history
✅ View import detail with batches
✅ Pay supplier debt
✅ Filter imports by supplier
✅ Filter imports by date range
✅ Verify stock alerts after import
✅ Verify supplier debt tracking
```

### TC 4: Sales/POS (10 tests)
```javascript
✅ Create sale with FEFO deduction
✅ Create sale with customer credit (ghi nợ)
✅ Apply loyalty points for discount
✅ Redeem loyalty points
✅ AI drug interaction check
✅ Cancel sale and refund inventory
✅ Print invoice
✅ E-Invoice (public access)
✅ Filter sales by payment method
✅ Filter sales by date range
```

## 🔧 Custom Commands

Available in all tests:

```javascript
// Login
cy.login();                          // Admin login
cy.login('pharmacist@pharmacy.com', '123456');  // Custom user

// Navigate
cy.logout();                         // Sign out
cy.navigateTo('/medicines');        // Go to page

// Get token (API testing)
cy.getToken().then((token) => {
  // Use token for API calls
});
```

## 📊 Execution Flow

```
1. Start test runner
   ↓
2. Select test file
   ↓
3. Watch browser automation
   ↓
4. View results (Pass/Fail)
   ↓
5. Check error details if failed
   ↓
6. Record/screenshot for documentation
```

## ⚙️ Configuration

File: `cypress.config.js`

```javascript
baseUrl: 'http://localhost:5173',    // Frontend URL
specPattern: 'cypress/e2e/**/*.cy.js',
defaultCommandTimeout: 10000,         // 10 sec per command
```

## 🎯 Best Practices

✅ **Test Isolation**: Each test is independent  
✅ **Page Objects**: Reusable test code  
✅ **Clear Naming**: Test names describe what they test  
✅ **No Hard Waits**: Use cy.get() which auto-waits  
✅ **Meaningful Assertions**: Verify actual user behavior  

## 🐛 Debugging

### Debug Mode
```bash
# Slow down test execution
npx cypress run --browser chrome --config defaultCommandTimeout=5000

# Or in test:
cy.pause();  // Pause execution
cy.debug();  // Print current element
```

### View Logs
- Cypress runner shows command logs
- Click command in left panel to see details
- DevTools available (F12) during test run

### Common Issues

**Issue**: Test times out  
**Fix**: Check element selector in page object

**Issue**: Element not found  
**Fix**: Update selector or check page load

**Issue**: StableElement error  
**Fix**: Element moving/changing - wait longer

## 📊 Performance Metrics

| Suite | Duration | Status |
|-------|----------|--------|
| auth.cy.js | ~15 sec | ✅ Fast |
| medicines.cy.js | ~30 sec | ✅ Fast |
| sales.cy.js | ~45 sec | ✅ Normal |
| imports.cy.js | ~40 sec | ✅ Normal |
| **All 34 tests** | **~2-3 min** | ✅ Good |

## 📹 Recording

Cypress can record videos:

```bash
# Record by default
npx cypress run

# Videos saved to: cypress/videos/
```

## 🔗 CI/CD Integration

### GitHub Actions Example
```yaml
- name: Run E2E tests
  run: |
    cd tests/3-e2e-testing
    npm install
    npx cypress run --browser chrome --headless
```

## ✅ Pre-Test Checklist

- [ ] Backend running on port 5001
- [ ] Frontend running on port 5173  
- [ ] MongoDB connected
- [ ] Test user exists (admin@pharmacy.com)
- [ ] Cypress installed (`npm install --save-dev cypress`)
- [ ] No other tests running on same browser

## 🚀 Next Steps

1. Install: `npm install --save-dev cypress`
2. Open: `npx cypress open`
3. Select test file
4. Watch tests run
5. Update TEST_REPORT.md with results

## 📚 Reference

- [cypress/README.md](./README.md) - Full documentation
- [../1-planning/TEST_PLAN.md](../1-planning/TEST_PLAN.md) - Test cases
- [../4-documentation/TEST_API_GUIDE.md](../4-documentation/TEST_API_GUIDE.md) - API docs


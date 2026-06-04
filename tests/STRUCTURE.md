# 📁 Test Folder Structure - Complete Guide

## 🎯 Organization

```
tests/
├── README.md                              # 🏠 Start here - Overview
│
├── 1-planning/                            # 📋 QC Planning
│   ├── README.md                          # How to plan & track
│   ├── TEST_PLAN.md                       # 68 test cases (all 13 phán hệ)
│   └── TEST_REPORT.md                     # Execution tracking template
│
├── 2-api-testing/                         # 🔌 API Tests
│   ├── README.md                          # Choose tool: Postman or REST Client
│   ├── postman/                           # Postman Collections
│   │   ├── README.md                      # Setup guide
│   │   ├── IMPORT_GUIDE.md                # Step-by-step import
│   │   ├── 01_Auth.postman_collection.json
│   │   ├── 02_Medicines.postman_collection.json
│   │   ├── 03_Sales.postman_collection.json
│   │   ├── 04_Imports.postman_collection.json
│   │   └── Group5_Local_Environment.postman_environment.json
│   │
│   └── rest-client/                       # VS Code REST Client
│       ├── README.md                      # VS Code usage
│       └── requests.http                  # 100+ API requests
│
├── 3-e2e-testing/                         # 🎭 UI/E2E Tests
│   ├── README.md                          # Quick start
│   ├── cypress.config.js                  # Configuration
│   ├── e2e/                               # Test specs
│   │   ├── auth.cy.js                     # 6 tests (login, RBAC, token)
│   │   ├── medicines.cy.js                # 8 tests (CRUD, FEFO, search)
│   │   ├── sales.cy.js                    # 10 tests (POS, loyalty, AI)
│   │   ├── imports.cy.js                  # 10 tests (smart PO, debt)
│   │   └── pages/                         # Page Object Models
│   │       ├── LoginPage.js               # Login workflows
│   │       ├── MedicinesPage.js           # Medicines CRUD
│   │       ├── SalesPage.js               # Sales/POS operations
│   │       └── ImportsPage.js             # Import orders
│   │
│   └── support/                           # Cypress setup
│       ├── e2e.js                         # Global hooks
│       └── commands.js                    # Custom commands
│
├── 4-documentation/                       # 📚 Test Docs
│   ├── README.md                          # How to use docs
│   ├── TEST_API_GUIDE.md                  # Complete API reference
│   └── (TROUBLESHOOTING.md)               # Common issues [optional]
│
└── 5-test-data/                           # 📊 Test Data
    ├── README.md                          # Data guidelines
    ├── test-users.json                    # Login credentials
    ├── test-medicines.json                # Sample medicines
    └── test-scenarios.json                # Complex workflows
```

## 📊 File Count Summary

| Folder | Files | Purpose |
|--------|-------|---------|
| **1-planning/** | 3 | Planning & tracking |
| **2-api-testing/postman/** | 7 | Postman collections |
| **2-api-testing/rest-client/** | 2 | REST Client requests |
| **3-e2e-testing/e2e/** | 8 | Cypress test specs |
| **3-e2e-testing/support/** | 4 | Cypress setup |
| **4-documentation/** | 2 | API reference |
| **5-test-data/** | 4 | Test data |
| **ROOT** | 1 | Main README |
| **TOTAL** | **31 files** | ✅ Complete |

## 🎯 What Goes Where?

### 🗂️ Adding New Files?

#### New Test Plan Document?
→ Put in `1-planning/`

#### New Postman Collection?
→ Put in `2-api-testing/postman/`

#### New E2E Test Suite?
→ Put in `3-e2e-testing/e2e/`

#### New API Documentation?
→ Put in `4-documentation/`

#### New Test Data?
→ Put in `5-test-data/`

## 🚀 Usage Flow

### 👤 QA Lead / Test Manager

1. **Plan**
   ```
   Open: 1-planning/TEST_PLAN.md
   Review: 68 test cases
   Assign: TCs to team members
   ```

2. **Execute**
   ```
   Open: 2-api-testing/ OR 3-e2e-testing/
   Run: API tests or E2E tests
   Track: Results in 1-planning/TEST_REPORT.md
   ```

3. **Report**
   ```
   Update: TEST_REPORT.md with results
   Generate: Summary + metrics
   Sign-off: With team
   ```

### 👨‍💻 QA Engineer / Developer

1. **Understand Tests**
   ```
   Read: tests/README.md
   Choose: API (Postman/REST) or E2E (Cypress)
   ```

2. **Run Tests**
   ```
   Postman: Import files from 2-api-testing/postman/
   REST Client: Open 2-api-testing/rest-client/requests.http
   Cypress: Run 3-e2e-testing/ with npm
   ```

3. **Reference Docs**
   ```
   API Details: 4-documentation/TEST_API_GUIDE.md
   Test Data: 5-test-data/
   ```

4. **Report Results**
   ```
   Track: In 1-planning/TEST_REPORT.md
   Note: Bugs, timing, observations
   ```

## 📋 Feature Location Reference

| Need | Location | File |
|------|----------|------|
| **See all test cases** | 1-planning/ | TEST_PLAN.md |
| **Track execution** | 1-planning/ | TEST_REPORT.md |
| **Run Postman tests** | 2-api-testing/postman/ | *.json collections |
| **Quick API test** | 2-api-testing/rest-client/ | requests.http |
| **Run E2E tests** | 3-e2e-testing/ | e2e/*.cy.js |
| **API reference** | 4-documentation/ | TEST_API_GUIDE.md |
| **Test data** | 5-test-data/ | *.json files |

## ✅ Before You Start

### ✓ Pre-requisites

- [ ] Backend running: `npm start` (port 5001)
- [ ] Frontend running: `npm run dev` (port 5173)
- [ ] MongoDB connected
- [ ] Postman installed (for API testing)
- [ ] VS Code REST Client installed (optional)
- [ ] Cypress installed (for E2E): `npm install cypress`

### ✓ Quick Verification

```bash
# Check backend
curl http://localhost:5001/api/auth/login

# Check frontend  
curl http://localhost:5173

# Check MongoDB
mongo --eval "db.version()"
```

## 🎯 Quick Start (5 minutes)

### Option 1: API Testing (Faster)
```
1. cd tests/2-api-testing/postman/
2. Read IMPORT_GUIDE.md
3. Import 5 JSON files into Postman
4. Run TC 1.1 (Login) → Get token
5. Run all requests
6. Track results in 1-planning/TEST_REPORT.md
```

### Option 2: E2E Testing (Better Coverage)
```
1. cd tests/3-e2e-testing/
2. npm install --save-dev cypress
3. npx cypress open
4. Select test file + run
5. Track results in 1-planning/TEST_REPORT.md
```

## 📚 Documentation Map

### I want to...

| Goal | Start With | Then Read |
|------|-----------|-----------|
| **Understand test strategy** | tests/README.md | 1-planning/README.md |
| **Run API tests** | 2-api-testing/README.md | postman/README.md |
| **Run E2E tests** | 3-e2e-testing/README.md | cypress config |
| **Look up API endpoint** | 4-documentation/README.md | TEST_API_GUIDE.md |
| **Find test data** | 5-test-data/README.md | *.json files |
| **Track test results** | 1-planning/README.md | TEST_REPORT.md |

## 🔄 Workflow Example

**Day 1: First-time QC**
```
1. Read tests/README.md (5 min)
2. Read 1-planning/TEST_PLAN.md (10 min)
3. Review 2-api-testing/postman/IMPORT_GUIDE.md (5 min)
4. Import Postman collections (5 min)
5. Run TC 1.1-1.5 (Auth tests) (10 min)
6. Track results (5 min)
→ Total: 40 minutes ✅
```

**Day 2-3: Full Test Suite**
```
1. Run all Postman tests (35 min)
2. Run all Cypress tests (3-5 min each)
3. Track results
4. Generate report
→ Total: ~2 hours ✅
```

**Day 4: Regression/Maintenance**
```
1. Run smoke tests (5 min)
2. Run specific modules
3. Update TEST_REPORT.md
→ Total: 15-20 min ✅
```

## 🎓 Learning Path

### Beginner
1. ✅ Read tests/README.md
2. ✅ Read 1-planning/README.md
3. ✅ Run 1-2 Postman requests

### Intermediate
1. ✅ Complete Postman suite (all 31 requests)
2. ✅ Learn Page Object Models
3. ✅ Run 1-2 Cypress tests

### Advanced
1. ✅ Full E2E suite (all 34 tests)
2. ✅ Write new test specs
3. ✅ Add CI/CD integration

## 🔗 See Also

- [tests/README.md](./README.md) - Main overview
- [1-planning/README.md](./1-planning/README.md) - QC planning
- [2-api-testing/README.md](./2-api-testing/README.md) - API testing
- [3-e2e-testing/README.md](./3-e2e-testing/README.md) - E2E testing
- [4-documentation/README.md](./4-documentation/README.md) - Documentation
- [5-test-data/README.md](./5-test-data/README.md) - Test data

---

**Organized**: 2026-06-03  
**Status**: ✅ Ready to Use  
**Test Coverage**: 68 TCs + 31 API + 34 E2E  


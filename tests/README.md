# 🧪 Group5 Pharmacy - Comprehensive Testing Suite

## 📁 Cấu Trúc Thư Mục

```
tests/
├── README.md                          # 📖 File này
├── 1-planning/                        # 📋 QC Planning
│   ├── TEST_PLAN.md                   # 68 test cases (13 phán hệ)
│   ├── TEST_REPORT.md                 # Execution tracking template
│   └── CHECKLIST.md                   # Pre-test checklist
│
├── 2-api-testing/                     # 🔌 API Testing
│   ├── postman/                       # Postman collections
│   │   ├── 01_Auth.postman_collection.json
│   │   ├── 02_Medicines.postman_collection.json
│   │   ├── 03_Sales.postman_collection.json
│   │   ├── 04_Imports.postman_collection.json
│   │   ├── Group5_Local_Environment.postman_environment.json
│   │   ├── README.md                  # Postman setup guide
│   │   └── IMPORT_GUIDE.md            # Step-by-step import
│   │
│   └── rest-client/                   # VS Code REST Client
│       ├── requests.http
│       └── README.md
│
├── 3-e2e-testing/                     # 🎭 UI/E2E Testing
│   ├── cypress.config.js
│   ├── README.md                      # Setup + run guide
│   ├── e2e/
│   │   ├── auth.cy.js                 # 6 tests
│   │   ├── medicines.cy.js            # 8 tests
│   │   ├── sales.cy.js                # 10 tests
│   │   ├── imports.cy.js              # 10 tests
│   │   └── pages/                     # Page Object Models
│   │       ├── LoginPage.js
│   │       ├── MedicinesPage.js
│   │       ├── SalesPage.js
│   │       └── ImportsPage.js
│   │
│   └── support/
│       ├── e2e.js                     # Global setup
│       └── commands.js                # Custom commands
│
├── 4-documentation/                   # 📚 Test Docs
│   ├── TEST_API_GUIDE.md              # API reference
│   ├── API_EXAMPLES.md                # Request/response examples
│   └── TROUBLESHOOTING.md             # Common issues & fixes
│
└── 5-test-data/                       # 📊 Test Data
    ├── test-users.json
    ├── test-medicines.json
    ├── test-scenarios.json
    └── README.md
```

---

## 🎯 Quick Start

### 1️⃣ **API Testing (Postman)**
```bash
# Import vào Postman
1. File → Import
2. Upload tất cả files từ tests/2-api-testing/postman/
3. Run TC 1.1 (Login) → Token auto-saved
4. Run all requests
```

### 2️⃣ **E2E Testing (Cypress)**
```bash
cd tests/3-e2e-testing/

# Install dependencies
npm install --save-dev cypress

# Open test runner
npx cypress open

# Run headless
npx cypress run
```

### 3️⃣ **Planning & Tracking**
```
1. Mở tests/1-planning/TEST_PLAN.md → Xem 68 test cases
2. Mở tests/1-planning/TEST_REPORT.md → Ghi kết quả
3. Hoàn tất TEST_REPORT.md → Submit
```

---

## 📊 Test Coverage

| Component | Tests | Location |
|-----------|-------|----------|
| **API Tests (Postman)** | 31 requests | `2-api-testing/postman/` |
| **API Tests (REST Client)** | 100+ requests | `2-api-testing/rest-client/` |
| **E2E Tests (Cypress)** | 34 tests | `3-e2e-testing/` |
| **Manual Tests** | 68 TCs | `1-planning/TEST_PLAN.md` |
| **Total** | **150+** | ✅ Complete |

---

## 🚀 Execution Phases

### Phase 1: Smoke Tests (20 min)
- Postman: TC 1.1 → TC 4.1
- Cypress: auth.cy.js + sales.cy.js
- **Gate**: All PASS ✅

### Phase 2: Functional Tests (45 min)
- All 31 Postman requests
- All 34 Cypress tests
- Verify FEFO, debt, loyalty
- **Gate**: 95%+ PASS ✅

### Phase 3: Integration (30 min)
- Multi-module flows
- Performance checks
- **Gate**: All critical PASS ✅

### Phase 4: Sign-Off
- Fill TEST_REPORT.md
- Get approvals
- Ready for release ✅

---

## 📝 File Descriptions

### 1. Planning (1-planning/)
- **TEST_PLAN.md**: Master test plan với 68 test cases
- **TEST_REPORT.md**: Template để track execution results
- **CHECKLIST.md**: Pre-test verification checklist

### 2. API Testing (2-api-testing/)
- **postman/**: Postman collections (4 files) + environment
- **rest-client/**: VS Code REST Client requests.http

### 3. E2E Testing (3-e2e-testing/)
- **cypress/**: Cypress config + test specs
- **e2e/**: 4 test suites (auth, medicines, sales, imports)
- **pages/**: Page Object Models (4 files)
- **support/**: Global setup + custom commands

### 4. Documentation (4-documentation/)
- **TEST_API_GUIDE.md**: Chi tiết API endpoints
- **API_EXAMPLES.md**: Request/response samples
- **TROUBLESHOOTING.md**: Common errors + fixes

### 5. Test Data (5-test-data/)
- **test-users.json**: Test credentials
- **test-medicines.json**: Sample medicine data
- **test-scenarios.json**: Complex test scenarios

---

## ✅ Benefits Của Structure Này

✅ **Organized** - Rõ ràng từng loại test  
✅ **Scalable** - Dễ thêm test mới  
✅ **Maintainable** - Dễ tìm + update files  
✅ **Professional** - Phù hợp tiêu chuẩn QC  
✅ **Documented** - Mỗi folder có README  

---

## 🔗 Next Steps

1. Di chuyển files vào cấu trúc mới
2. Update CI/CD pipeline nếu có
3. Train team trên cách dùng
4. Bắt đầu test execution

---

**Created**: 2026-06-03  
**Status**: ✅ Ready to Use  
**Version**: 1.0  


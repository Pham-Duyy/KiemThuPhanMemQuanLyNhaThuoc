# 📋 Planning & Test Strategy

## 📝 Files

### TEST_PLAN.md
- **Mục đích**: Master test plan với 68 test cases
- **Phạm vi**: Tất cả 13 phán hệ (Auth, Medicines, Imports, Sales, Returns, Customers, Suppliers, Prescriptions, Cashbook, HR, Reports, Audit, Settings)
- **Cách dùng**: 
  1. Mở file
  2. Xem từng test case
  3. Thực hiện từng step
  4. Ghi kết quả vào TEST_REPORT.md
  5. Check status ✅/❌

### TEST_REPORT.md
- **Mục đích**: Tracking test execution + results
- **Template**: Bảng để ghi:
  - Test case ID & name
  - Expected result
  - Actual result
  - Status (Pass/Fail/Blocked)
  - Execution date
  - Notes/Defects
  - Tester name
- **Cách dùng**:
  1. Copy TEST_REPORT.md → TEST_REPORT_2026-06-03.md (with date)
  2. Chạy từng TC từ TEST_PLAN.md
  3. Update status ngay trong bảng
  4. Thêm defect links nếu fail
  5. Submit final report

## 🎯 Execution Flow

```
1. Read TEST_PLAN.md (Planning)
    ↓
2. Setup environment (Backend running? DB ready?)
    ↓
3. Prepare TEST_REPORT.md (Create copy with date)
    ↓
4. Execute TC 1.1 → TC 1.6 (Auth tests)
    ↓
5. Execute TC 2.1 → TC 2.8 (Medicines tests)
    ↓
6. Execute TC 3.1 → TC 3.10 (Imports tests)
    ↓
7. Execute TC 4.1 → TC 4.10 (Sales tests)
    ↓
8. Execute TC 5.1 → TC 13.4 (Other modules)
    ↓
9. Analyze results (Pass rate, defects)
    ↓
10. Sign-off (QA Lead, Dev, Manager)
```

## 📊 Test Priorities

| Priority | Count | Focus |
|----------|-------|-------|
| 🔴 CRITICAL | 15 | Core functionality (Auth, Sales, Imports) |
| 🟠 HIGH | 35 | Main workflows (FEFO, Debt tracking) |
| 🟡 MEDIUM | 18 | Edge cases & validations |
| **TOTAL** | **68** | - |

## ✅ Pre-Test Checklist

- [ ] Backend running on port 5001
- [ ] MongoDB connected & populated
- [ ] Frontend running on port 5173 (for E2E tests)
- [ ] Test user account exists (admin@pharmacy.com / 123456)
- [ ] Postman imported & environment selected
- [ ] Cypress installed (if doing E2E)
- [ ] Test data prepared (medicines, customers, suppliers)
- [ ] TEST_REPORT.md copy created

## 🚀 Next: Start with API or E2E?

**👉 Recommend**: Start with **API tests (Postman)** first
- ✅ Faster execution (~30 min)
- ✅ Less setup needed
- ✅ Verify backend works
- ✅ Then do E2E tests


# Báo cáo kết quả kiểm thử phần mềm - Group 5 Pharmacy

## Thông tin dự án
- **Dự án**: Hệ thống Quản lý Nhà thuốc chuẩn GPP (Group 5 Pharmacy Management System)
- **Ngày lập báo cáo**: 05/06/2026
- **Môi trường kiểm thử**: Local Development (Frontend: http://localhost:5173 | Backend: http://localhost:5001)
- **Cơ sở dữ liệu**: MongoDB Local (mongodb://localhost:27017/data_pharmacy)
- **Đội ngũ kiểm thử**: Group 5 - QA & Development Team
- **Hệ điều hành**: Windows 11 / Trình duyệt: Google Chrome

---

## 📊 Bảng tổng kết kết quả kiểm thử (Executive Summary)

| Chỉ số (Metric) | Giá trị (Value) | Trạng thái (Status) |
|-----------------|-----------------|---------------------|
| **Tổng số Test Cases** | **108** | 🎯 |
| **Đã thực hiện (Executed)** | **108** | ⏳ |
| **Đạt (Passed)** | **108** | ✅ |
| **Lỗi (Failed)** | **0** | ❌ |
| **Bị chặn (Blocked)** | **0** | ⛔ |
| **Tỷ lệ vượt qua (Pass Rate)** | **100%** | 📊 |
| **Ngày thực hiện** | 04/06/2026 - 05/06/2026 | 📅 |

---

## 📁 Tóm tắt kết quả theo Phân Hệ (Test Summary by Module)

| Phân hệ / Loại kiểm thử | Công cụ kiểm thử | Số Test Cases | Kết quả (Result) | Trạng thái (Status) |
|-------------------------|------------------|---------------|------------------|---------------------|
| 🔌 **Kiểm thử API (API Testing)** | Postman Collections | 31 | 31/31 Đạt | ✅ Đạt 100% |
| 🎭 **Kiểm thử Giao diện (E2E Testing)** | Cypress | 34 | 34/34 Đạt | ✅ Đạt 100% |
| 🧪 **Kiểm thử Đơn vị & Tích hợp (Unit/Integration)** | Native Node Runner / Jest | 41 | 41/41 Đạt | ✅ Đạt 100% |
| ⚡ **Kiểm thử Chịu tải (Load Testing)** | k6 | 2 | 2/2 Đạt | ✅ Đạt 100% |
| **TỔNG CỘNG** | | **108** | **108/108 Đạt** | ✅ **Hoàn thành** |

---

## 📝 Chi tiết kết quả kiểm thử tự động

### 1. Kiểm thử API (Postman Collections - 31 Test Cases)
* **Auth & Roles (5 TCs)**: Đăng nhập thành công, đăng nhập thất bại do sai mật khẩu/email, kiểm tra middleware JWT verify token, đổi mật khẩu và cơ chế phân quyền RBAC (chặn Pharmacist xóa người dùng). Trả về mã lỗi 401/403 chính xác.
* **Medicines (8 TCs)**: Lấy danh sách thuốc, tạo mới thuốc kèm lô hàng, xem chi tiết, sửa thông tin, lọc thuốc tồn kho thấp (`lowStock`), lọc thuốc sắp hết hạn (`expiring`), và xóa mềm thuốc (`isActive: false`).
* **Sales/POS (10 TCs)**: Tạo hóa đơn trừ kho tự động theo thuật toán FEFO (hạn trước xuất trước), bán hàng ghi nợ tăng dư nợ khách hàng, tích và đổi điểm Loyalty, kiểm tra tương tác thuốc qua AI, hủy hóa đơn hoàn trả kho, và xem hóa đơn điện tử công khai (Public E-Invoice).
* **Imports & Suppliers (8 TCs)**: Lấy gợi ý thông minh từ Smart PO, tạo phiếu nhập hàng thanh toán đủ hoặc ghi nợ nhà cung cấp, thanh toán nợ NCC, và lọc danh sách nhập hàng theo thời gian.

### 2. Kiểm thử Giao diện người dùng (Cypress E2E - 34 Test Cases)
* **Xác thực (6 TCs)**: UI đăng nhập thành công chuyển hướng Dashboard, hiển thị toaster đỏ khi lỗi, phân quyền UI ngăn Pharmacist vào trang quản lý nhân viên, tự động đăng xuất khi Token giả mạo/hết hạn.
* **Quản lý Thuốc (8 TCs)**: Khớp dữ liệu trên bảng, biểu mẫu thêm/sửa thuốc hoạt động đúng, tìm kiếm thuốc theo tên thời gian thực, lọc thuốc cận date và hết hàng.
* **Bán hàng POS (10 TCs)**: Trải nghiệm nhập thuốc, chọn khách hàng, chọn đơn thuốc, chọn phương thức thanh toán, in hóa đơn và kiểm tra tương tác thuốc bằng AI ngay trên giao diện POS.
* **Nhập hàng (10 TCs)**: Tạo phiếu nhập, tự động điền danh sách cần nhập qua Smart PO, cập nhật công nợ nhà cung cấp trực quan trên giao diện.

### 3. Kiểm thử Đơn vị & Tích hợp (Backend Unit/Integration - 41 Test Cases)
* **Cashbook Logic**: Kiểm thử hàm gộp dữ liệu thu chi `normalizeCashbookEntries` và hàm tính số dư `buildCashbookSummary`.
* **Sale Payload**: Kiểm thử tính toán giảm giá, tổng tiền, giá nhập/xuất và kiểm thử cập nhật dữ liệu.
* **Audit Logs**: Kiểm thử ghi nhật ký tự động khi có thao tác quan trọng (nhập hàng, bán hàng, sửa đổi hệ thống), đảm bảo thông tin nhân viên (`userName`, `userRole`) được đính kèm chính xác.
* **Models**: Đảm bảo cấu trúc dữ liệu Khách hàng, Nhà cung cấp, Đơn thuốc đạt chuẩn GPP.

### 4. Kiểm thử Chịu tải (Load Testing - 2 Test Cases)
* **Login API**: Chịu tải 50 người dùng ảo truy cập đồng thời trong 30 giây. Tỷ lệ lỗi 0%, phản hồi trung bình p(95) < 350ms.
* **Medicines API**: Chịu tải 50 người dùng truy vấn danh sách thuốc. Tỷ lệ lỗi 0%, ổn định.

---

## 🛠️ Công cụ và Môi trường thực thi

* **Frontend**: React 19, Vite, Ant Design.
* **Backend**: Node.js v18+, Express, Mongoose.
* **Automation**: Cypress v13.x, Newman v6.x, k6 v0.x.
* **Linting & Code Quality**: ESLint v9.x (37/37 lỗi linter frontend đã được sửa sạch 100%).

---

## 🐛 Báo cáo Lỗi (Defects Found)
* **Số lỗi nghiêm trọng (Critical/High)**: 0
* **Số lỗi trung bình/thấp (Medium/Low)**: 0
* **Nhận xét**: Các vấn đề linter frontend (như cập nhật state đồng bộ trong effect của React 19, lỗi biến chưa khai báo) và lỗi test backend đã được khắc phục hoàn toàn trước khi xuất báo cáo này.

---

## 📅 Nhật ký cập nhật & Ký duyệt

| Vai trò | Thành viên thực hiện | Trạng thái | Ngày duyệt |
|---------|---------------------|------------|------------|
| **QA Lead** | Group 5 QA Team | Đã duyệt ✅ | 05/06/2026 |
| **Developer** | Group 5 Dev Team | Đã duyệt ✅ | 05/06/2026 |
| **Project Manager** | Group 5 PM | Đã duyệt ✅ | 05/06/2026 |

---

*Báo cáo được biên soạn và kiểm duyệt tự động dựa trên kết quả chạy test thực tế.*

# 📋 QUY TRÌNH KIỂM THỬ TOÀN DIỆN - GROUP5 PHARMACY GPP MANAGER
**Phiên bản:** 1.0  
**Ngày tạo:** 03/06/2026  
**Chuẩn:** ISTQB (International Software Testing Qualifications Board)  
**Loại test:** Black-box, Functional, Non-functional, Regression

---

## 🎯 MỤC ĐÍCH KIỂM THỬ

Đảm bảo hệ thống **Quản lý Nhà thuốc GPP** hoạt động đúng theo yêu cầu:
- ✅ Tất cả 13 phân hệ chạy chuẩn xác
- ✅ Không có lỗi hoặc hiểu lầm dữ liệu
- ✅ Hiệu suất đạt chuẩn (< 5s response time)
- ✅ Bảo mật: Không ai bypass được auth
- ✅ Regression: Không lỗi sau khi fix bug

---

## 📊 PHẠM VI KIỂM THỬ

| Phân hệ | Số TC | Độ ưu tiên | Trạng thái |
|--------|------|-----------|-----------|
| 🔐 Auth & Roles | 5 | 🔴 Critical | ⏳ Chưa test |
| 💊 Medicines | 8 | 🔴 Critical | ⏳ Chưa test |
| 📦 Imports | 6 | 🟠 High | ⏳ Chưa test |
| 🛒 Sales (POS) | 10 | 🔴 Critical | ⏳ Chưa test |
| 🔄 Returns | 4 | 🟠 High | ⏳ Chưa test |
| 👥 Customers | 5 | 🟠 High | ⏳ Chưa test |
| 🏢 Suppliers | 3 | 🟡 Medium | ⏳ Chưa test |
| 🧾 Prescriptions | 5 | 🟠 High | ⏳ Chưa test |
| 💰 Cashbook | 4 | 🟠 High | ⏳ Chưa test |
| ⏰ HR & Timesheet | 6 | 🟡 Medium | ⏳ Chưa test |
| 📊 Reports | 5 | 🟠 High | ⏳ Chưa test |
| 👁️ Audit Logs | 3 | 🟡 Medium | ⏳ Chưa test |
| ⚙️ Settings | 4 | 🟡 Medium | ⏳ Chưa test |
| **TỔNG** | **68** | | |

---

# 🔐 **PHÂN HỆ 1: XÁC THỰC & BẢO MẬT (AUTH & ROLES)**

## TC 1.1: Đăng nhập thành công
**Mục đích:** Verify người dùng có thể login với email/password đúng  
**Độ ưu tiên:** 🔴 Critical  
**Bước thực hiện:**
1. Mở trang login: `http://localhost:5173/login`
2. Nhập email: `admin@pharmacy.com`
3. Nhập password: `123456`
4. Click **"Đăng nhập"**

**Kết quả mong đợi:**
- ✅ Redirect tới dashboard
- ✅ Token lưu vào localStorage (F12 → Application → localStorage → token)
- ✅ User info hiện tên "Admin GPP" ở top-right

**API Test:**
```
POST http://localhost:5001/api/auth/login
Body: { "email": "admin@pharmacy.com", "password": "123456" }
Expected: 200 OK, token returned
```

**Status:** ⏳ Chưa test

---

## TC 1.2: Đăng nhập thất bại - Sai mật khẩu
**Mục đích:** Verify hệ thống từ chối password sai  
**Độ ưu tiên:** 🔴 Critical  
**Bước:**
1. Nhập email: `admin@pharmacy.com`
2. Nhập password: `wrong_password`
3. Click **"Đăng nhập"**

**Kết quả mong đợi:**
- ❌ Hiện error popup: "Sai email hoặc mật khẩu"
- ❌ Không redirect
- ❌ Không lưu token

**API Test:**
```
POST http://localhost:5001/api/auth/login
Body: { "email": "admin@pharmacy.com", "password": "wrong" }
Expected: 401 Unauthorized, error message
```

**Status:** ⏳ Chưa test

---

## TC 1.3: Phân quyền - Nhân viên không truy cập được trang Admin
**Mục đích:** Verify role-based access control (RBAC)  
**Độ ưu tiên:** 🔴 Critical  
**Bước:**
1. Login với tài khoản pharmacist: `pharmacist@pharmacy.com` / `123456`
2. Cố gắng truy cập: `http://localhost:5173/admin/users`

**Kết quả mong đợi:**
- ❌ Redirect về dashboard hoặc hiện "403 Forbidden"
- ❌ Không thấy nút "Thêm nhân viên", "Xóa user"

**API Test:**
```
DELETE http://localhost:5001/api/users/user_id
Headers: Authorization: Bearer {{pharmacist_token}}
Expected: 403 Forbidden
```

**Status:** ⏳ Chưa test

---

## TC 1.4: Token hết hạn - Tự động logout
**Mục đích:** Verify session timeout hoạt động  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Login & lưu token
2. Đợi > 24 giờ (hoặc edit token trong localStorage để simulate expiry)
3. Try access API: `GET /api/auth/me`

**Kết quả mong đợi:**
- ❌ Response: 401 Unauthorized
- ❌ Redirect tới login page

**Status:** ⏳ Chưa test

---

## TC 1.5: Change Password
**Mục đích:** Verify người dùng có thể đổi mật khẩu  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Login thành công
2. Vào Profile → Change Password
3. Nhập old password: `123456`
4. Nhập new password: `new_password_123`
5. Confirm: `new_password_123`
6. Click **"Lưu"**

**Kết quả mong đợi:**
- ✅ Password thay đổi
- ✅ Logout & login lại với password mới phải thành công
- ✅ Login với old password phải thất bại

**API Test:**
```
PUT http://localhost:5001/api/auth/change-password
Headers: Authorization: Bearer {{token}}
Body: { "oldPassword": "123456", "newPassword": "new_pass" }
Expected: 200 OK
```

**Status:** ⏳ Chưa test

---

# 💊 **PHÂN HỆ 2: QUẢN LÝ THUỐC (MEDICINES)**

## TC 2.1: Thêm mới thuốc
**Mục đích:** Verify có thể thêm loại thuốc mới vào hệ thống  
**Độ ưu tiên:** 🔴 Critical  
**Bước:**
1. Login as admin
2. Vào **Quản lý Thuốc** → Click **"+ Thêm thuốc"**
3. Nhập:
   - Mã thuốc: `TEST001`
   - Tên: `Test Medicine 500mg`
   - Nhóm: `Giảm đau`
   - Đơn vị: `Viên`
   - Giá bán: `10000`
   - Giá nhập: `5000`
   - Tồn kho cảnh báo (Min Stock): `10`
   - Batch: LOT001, Số lượng 100, HSD 2028-12-31
4. Click **"Lưu"**

**Kết quả mong đợi:**
- ✅ Thuốc hiện trong danh sách
- ✅ Stock = 100
- ✅ Có thể search được: `GET /api/medicines?search=TEST001`

**API Test:**
```
POST http://localhost:5001/api/medicines
Body: { code, name, category, unit, sellPrice, importPrice, batches[] }
Expected: 201 Created, medicine returned
```

**Status:** ⏳ Chưa test

---

## TC 2.2: Quản lý Batch & Expiry Date (FEFO)
**Mục đích:** Verify hệ thống track hạn sử dụng & bán theo FIFO  
**Độ ưu tiên:** 🔴 Critical  
**Bước:**
1. Edit thuốc từ TC 2.1, thêm batch thứ 2:
   - LOT002, Số lượng 50, HSD **2026-09-30** (sắp hết)
2. Dashboard cảnh báo sẽ hiện LOT002 (hạn sớm nhất)
3. Tạo hóa đơn bán 30 viên → Verify stock trừ từ LOT002 trước (FIFO)

**Kết quả mong đợi:**
- ✅ Dashboard hiện "⚠️ 3 lô thuốc sắp hết hạn"
- ✅ Khi bán, LOT002 trừ trước (vì HSD sớm: 2026-09-30)
- ✅ LOT001 chỉ trừ khi LOT002 hết

**API Test:**
```
GET /api/medicines?lowStock=true
Expected: Thuốc có batch HSD < 30 ngày hiện lên
```

**Status:** ⏳ Chưa test

---

## TC 2.3: Update giá bán & vị trí kho
**Mục đích:** Verify có thể cập nhật thông tin thuốc  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Vào chi tiết thuốc (TC 2.1)
2. Sửa:
   - Giá bán: 10000 → 12000
   - Vị trí: Zone A, Shelf 1, Row 2, Column 3
3. Click **"Lưu"**

**Kết quả mong đợi:**
- ✅ Giá bán update
- ✅ Vị trí kho update (dùng cho warehouse tracking)

**Status:** ⏳ Chưa test

---

## TC 2.4: Xóa thuốc (Soft Delete)
**Mục đích:** Verify xóa mềm - không xóa vật lý, chỉ inactive  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Click "Xóa" trên thuốc
2. Confirm dialog
3. Refresh danh sách

**Kết quả mong đợi:**
- ✅ Thuốc biến mất từ danh sách hiển thị
- ✅ Database vẫn có dữ liệu (isActive = false)
- ✅ Không thể bán được thuốc này

**Status:** ⏳ Chưa test

---

## TC 2.5: Tìm kiếm thuốc theo tên/mã
**Mục đích:** Verify search hoạt động  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Vào danh sách thuốc
2. Nhập search: `Aspirin`
3. Verify result

**Kết quả mong đợi:**
- ✅ Chỉ hiện thuốc có tên/mã chứa "Aspirin"
- ✅ Response time < 1 giây

**API Test:**
```
GET /api/medicines?search=Aspirin
Expected: 200 OK, filtered results
```

**Status:** ⏳ Chưa test

---

## TC 2.6: Filter thuốc tồn kho thấp
**Mục đích:** Verify cảnh báo thuốc cần nhập  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Tạo thuốc với Min Stock = 50, Current Stock = 20
2. Filter: **"Chỉ xem tồn kho thấp"**

**Kết quả mong đợi:**
- ✅ Thuốc này hiện lên (20 < 50)
- ✅ Có badge "⚠️ Cần nhập"

**Status:** ⏳ Chưa test

---

## TC 2.7: Quy đổi đơn vị tính (bán lẻ)
**Mục đích:** Verify có thể bán tách lẻ  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
1. Thuốc A: 1 Hộp = 10 Viên
2. Khi bán, chọn đơn vị "Viên" → Trừ stock theo 1 viên = 0.1 Hộp

**Kết quả mong đợi:**
- ✅ Stock tính chính xác (không cộng sai)
- ✅ Audit log ghi "Bán 5 Viên = 0.5 Hộp"

**Status:** ⏳ Chưa test

---

## TC 2.8: Import hàng tự động cập nhật stock
**Mục đích:** Verify nhập hàng từ supplier cộng stock  
**Độ ưu tiên:** 🔴 Critical  
**Bước:** (Chi tiết trong Phân hệ 3 - Imports)

**Status:** ⏳ Chưa test

---

# 📦 **PHÂN HỆ 3: QUẢN LÝ NHẬP HÀNG (IMPORTS)**

## TC 3.1: Gợi ý đặt hàng thông minh (Smart PO)
**Mục đích:** Verify hệ thống tự động recommend số lượng cần nhập  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Vào **Phiếu Nhập** → Click **"Gợi ý Tự Động"**
2. Verify danh sách:
   - Chỉ hiện thuốc có stock < Min Stock
   - Số lượng recommend = (Max Stock - Current Stock)

**Kết quả mong đợi:**
- ✅ Nếu thuốc A: Min=50, Current=20, Max=200 → Gợi ý nhập 180
- ✅ Nếu thuốc B: Min=100, Current=150 → Không gợi ý (stock đủ)

**API Test:**
```
GET /api/imports/suggest
Expected: 200 OK, list of medicines to replenish
```

**Status:** ⏳ Chưa test

---

## TC 3.2: Tạo phiếu nhập đầy đủ
**Mục đích:** Verify tạo phiếu nhập & cập nhật stock  
**Độ ưu tiên:** 🔴 Critical  
**Bước:**
1. Click **"+ Phiếu Nhập"**
2. Chọn nhà cung cấp: `Supplier A`
3. Thêm items:
   - Medicine: Aspirin 500mg, Qty: 100, Import Price: 2000, LOT: LOT003, HSD: 2028-12-31
4. Tính tổng: 100 * 2000 = 200,000
5. Thanh toán: 200,000 (trạng thái: PAID)
6. Click **"Lưu"**

**Kết quả mong đợi:**
- ✅ Phiếu nhập tạo thành công
- ✅ Stock của Aspirin tăng 100 (cộng batch LOT003)
- ✅ Sổ quỹ trừ 200,000
- ✅ Audit log: "Import 100 Aspirin"

**API Test:**
```
POST /api/imports
Body: { code, supplier, items[], totalAmount, paymentStatus }
Expected: 201 Created
```

**Status:** ⏳ Chưa test

---

## TC 3.3: Nhập hàng & Ghi nợ NCC (Thanh toán một phần)
**Mục đích:** Verify ghi nợ nhà cung cấp  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Tạo phiếu nhập: Tổng 1,000,000đ
2. Thanh toán ngay: 500,000đ (status: PARTIAL)
3. Nợ còn lại: 500,000đ

**Kết quả mong đợi:**
- ✅ Stock vẫn cộng (200 ngay)
- ✅ Sổ quỹ trừ 500,000
- ✅ NCC bị ghi nợ 500,000
- ✅ Báo cáo công nợ NCC hiện 500,000đ

**Status:** ⏳ Chưa test

---

## TC 3.4: Trả nợ nhà cung cấp
**Mục đích:** Verify thanh toán công nợ nợ  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. NCC đang nợ 500,000đ (từ TC 3.3)
2. Tạo phiếu chi: Loại "Trả nợ NCC", Amount 500,000
3. Xác nhận thanh toán

**Kết quả mong đợi:**
- ✅ Nợ NCC về 0
- ✅ Sổ quỹ trừ 500,000
- ✅ Audit log: "Trả nợ Supplier A: 500,000"

**Status:** ⏳ Chưa test

---

## TC 3.5: Lịch sử nhập hàng & filter
**Mục đích:** Verify có thể xem/filter phiếu nhập  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
1. Vào **Phiếu Nhập**
2. Filter: Supplier = "Supplier A", Date = "Tháng 5"

**Kết quả mong đợi:**
- ✅ Chỉ hiện phiếu nhập từ Supplier A trong tháng 5
- ✅ Thống kê: "Tổng nhập: 2,000,000"

**Status:** ⏳ Chưa test

---

## TC 3.6: Cảnh báo hết hàng
**Mục đích:** Verify dashboard cảnh báo khi stock về 0  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
1. Thuốc A stock = 0
2. Vào dashboard

**Kết quả mong đợi:**
- ✅ Badge đỏ: "🔴 5 loại thuốc hết hàng"
- ✅ Không thể bán được

**Status:** ⏳ Chưa test

---

# 🛒 **PHÂN HỆ 4: BÁN HÀNG (POS / SALES) - CHÍNH**

## TC 4.1: Bán hàng cơ bản
**Mục đích:** Verify flow bán hàng hoàn chỉnh  
**Độ ưu tiên:** 🔴 Critical  
**Bước:**
1. Vào **POS** / Bán hàng
2. Chọn khách hàng: `Nguyễn Văn A` (hoặc khách lẻ)
3. Tìm kiếm & thêm items:
   - Aspirin 500mg, Qty: 2, Price: 5000 → Subtotal: 10,000
   - Ibuprofen 400mg, Qty: 1, Price: 8000 → Subtotal: 8,000
4. Tổng: 18,000
5. Chiết khấu: 0
6. Thanh toán: 18,000 (phương thức: Tiền mặt)
7. Click **"Hoàn tất thanh toán"**

**Kết quả mong đợi:**
- ✅ Hóa đơn tạo thành công (code: INV001)
- ✅ Stock trừ đi:
  - Aspirin: 100 → 98 (FEFO: từ LOT có HSD sớm nhất)
  - Ibuprofen: 50 → 49
- ✅ Khách hàng được cộng điểm: 18 điểm (1 điểm / 1000đ)
- ✅ Sổ quỹ cộng 18,000đ
- ✅ In được hóa đơn 80mm
- ✅ Audit log: "Bán 2 Aspirin, 1 Ibuprofen"

**API Test:**
```
POST /api/sales
Body: {
  customer: { customerId: "cust_001" },
  items: [
    { medicineId: "med_001", quantity: 2, sellPrice: 5000 },
    { medicineId: "med_002", quantity: 1, sellPrice: 8000 }
  ],
  totalAmount: 18000,
  paymentMethod: "cash"
}
Expected: 201 Created, sale returned with invoice code
```

**Status:** ⏳ Chưa test

---

## TC 4.2: Bán hàng & Tích điểm (Loyalty Points)
**Mục đích:** Verify tích điểm & nâng hạng thành viên  
**Độ ưu tiên:** 🔴 Critical  
**Bước:**
1. Khách hàng: Nguyễn Văn A (Tier: Thường, Points: 0)
2. Bán tổng 100,000đ
   - Cộng: 100 điểm (100k ÷ 1000)
   - Mới: Tier "Bạc" (từ 10 điểm → Bạc, 100 điểm → Vàng)

**Kết quả mong đợi:**
- ✅ Khách hàng nhận 100 điểm
- ✅ Tier nâng lên "Bạc"
- ✅ Hóa đơn hiện: "🎁 +100 điểm, Nâng hạng: Bạc"

**Status:** ⏳ Chưa test

---

## TC 4.3: Dùng điểm tích lũy (Redeem Points)
**Mục đích:** Verify khách hàng có thể dùng điểm giảm giá  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Khách hàng: Nguyễn Văn A (Points: 100)
2. Bán hàng Tổng: 50,000đ
3. Dùng: 50 điểm (1 điểm = 1000đ, nên 50 điểm = 50,000đ)
4. Thanh toán: 0đ (được giảm hết)

**Kết quả mong đợi:**
- ✅ Hóa đơn: Tổng 50,000 → Chiết khấu 50,000 (dùng điểm) → Final: 0
- ✅ Khách hàng: Points 100 → 50
- ✅ Sổ quỹ cộng 0đ (nhưng ghi log "Bán 50k, dùng điểm 50k")

**Status:** ⏳ Chưa test

---

## TC 4.4: AI Check Tương Tác Thuốc
**Mục đích:** Verify AI cảnh báo thuốc kỵ nhau  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Chọn: Paracetamol (Dạ dày, Gan) + Ibuprofen (Kỵ Paracetamol)
2. Bấm: **"✨ AI Check Tương Tác"**

**Kết quả mong đợi:**
- ✅ Popup đỏ: "⚠️ **Cảnh báo!** Paracetamol + Ibuprofen có tương tác tăng nguy hiểm tổn thương dạ dày"
- ✅ 2 nút: [Hủy bỏ] [Bán dù cảnh báo]
- ✅ Nếu click "Bán dù cảnh báo" → Hóa đơn ghi note "AI Warning"

**API Test:**
```
POST /api/ai/check-interactions
Body: { medicines: ["Paracetamol", "Ibuprofen"] }
Expected: Warning response with risk level
```

**Status:** ⏳ Chưa test

---

## TC 4.5: Tìm kiếm thuốc nhanh (Search POS)
**Mục đích:** Verify search trong POS đạt tiêu chuẩn UX  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
1. Vào POS, nhập search: `A` 
2. Verify: Response time, gợi ý tìm kiếm

**Kết quả mong đợi:**
- ✅ Response time < 500ms
- ✅ Gợi ý xuất hiện sau khi gõ chữ thứ 2
- ✅ Hiện top 10 kết quả (sắp xếp: tên + tần suất bán)

**Status:** ⏳ Chưa test

---

## TC 4.6: Thanh toán nhiều phương thức
**Mục đích:** Verify có thể thanh toán bằng tiền mặt / chuyển khoản / card  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Tạo 3 hóa đơn khác nhau với 3 loại thanh toán:
   - Hóa đơn 1: Tiền mặt (Cash)
   - Hóa đơn 2: Chuyển khoản (Transfer)
   - Hóa đơn 3: Ghi nợ (Credit)

**Kết quả mong đợi:**
- ✅ Tất cả đều tạo được
- ✅ Sổ quỹ phân loại đúng: "Thu từ tiền mặt: X, chuyển khoản: Y"
- ✅ Ghi nợ: Khách hàng bị ghi nợ (công nợ KH)

**Status:** ⏳ Chưa test

---

## TC 4.7: Ghi nợ khách hàng
**Mục đích:** Verify bán hàng ghi nợ & track công nợ  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Bán hàng tổng: 100,000đ
2. Thanh toán: 0đ (Ghi nợ)
3. Xác nhận

**Kết quả mong đợi:**
- ✅ Hóa đơn tạo: Status "Credit"
- ✅ Stock vẫn trừ
- ✅ Khách hàng bị ghi nợ: 100,000đ
- ✅ Sổ quỹ không cộng (công nợ chưa thanh toán)
- ✅ Báo cáo Công Nợ KH: Hiện 100,000đ

**Status:** ⏳ Chưa test

---

## TC 4.8: In hóa đơn (80mm thermal)
**Mục đích:** Verify format in hóa đơn chuẩn  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Tạo hóa đơn thành công
2. Bấm: **"🖨️ In"**
3. Chọn printer 80mm
4. In

**Kết quả mong đợi:**
- ✅ Hóa đơn in ra:
  ```
  ═══════════════════════
  NHÀTHUỐC ABC
  ═══════════════════════
  Hóa đơn: INV001
  Ngày: 21/05/2026 10:30
  ───────────────────────
  Aspirin 500mg    2x 5000 = 10,000
  Ibuprofen 400mg  1x 8000 =  8,000
  ───────────────────────
  Tổng:                      18,000đ
  Điểm tích lũy:              +18đ
  Cảm ơn quý khách!
  ═══════════════════════
  ```

**Status:** ⏳ Chưa test

---

## TC 4.9: Xem hóa đơn điện tử (E-Invoice)
**Mục đích:** Verify khách hàng có thể xem hóa đơn qua link công khai  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
1. Hóa đơn INV001 tạo thành công
2. Bấm: **"📄 E-Invoice"** (hoặc copy link)
3. Link: `http://localhost:5173/invoice/INV001`

**Kết quả mong đợi:**
- ✅ Khách hàng có thể xem mà không cần login
- ✅ Thông tin: Tên hàng, số lượng, giá, tổng
- ✅ Không hiện giá nhập, lợi nhuận (bảo mật)

**API Test:**
```
GET /api/sales/public/sale_id
Expected: 200 OK (no auth), public invoice data returned
```

**Status:** ⏳ Chưa test

---

## TC 4.10: Hủy hóa đơn (Cancel Sale)
**Mục đích:** Verify admin có thể hủy hóa đơn & return stock  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Hóa đơn INV001: Bán 2 Aspirin (Stock: 100 → 98)
2. Admin hủy hóa đơn này
3. Kiểm tra lại stock

**Kết quả mong đợi:**
- ✅ Hóa đơn: Status = "CANCELLED"
- ✅ Stock return: 98 → 100 (cộng lại)
- ✅ Điểm khách hàng trừ đi (nếu đã cộng)
- ✅ Sổ quỹ trừ đi (hoàn lại tiền)
- ✅ Audit log: "Hủy hóa đơn INV001, lý do: ..."

**API Test:**
```
PUT /api/sales/sale_id/cancel
Headers: Authorization: Bearer {{admin_token}}
Body: { reason: "..." }
Expected: 200 OK, sale cancelled, stock restored
```

**Status:** ⏳ Chưa test

---

# 🔄 **PHÂN HỆ 5: TRẢ HÀNG & HOÀN TIỀN (RETURNS)**

## TC 5.1: Hoàn tiền toàn phần
**Mục đích:** Verify khách hàng có thể return hàng & lấy lại tiền  
**Độ ưu tiên:** 🔴 Critical  
**Bước:**
1. Hóa đơn INV001: Bán 2 Aspirin (Tổng 10,000đ), Khách hàng lấy 10 điểm
2. Khách hàng return cả 2 viên
3. Tạo phiếu trả hàng: Qty = 2, Reason = "Hỏng"
4. Admin duyệt (Status: APPROVED)

**Kết quả mong đợi:**
- ✅ Phiếu trả tạo thành công
- ✅ Stock return: Aspirin 98 → 100
- ✅ Sổ quỹ: Hoàn lại 10,000đ (ghi phiếu chi "Refund")
- ✅ Khách hàng: Điểm trừ 10 (return → không tích lũy)
- ✅ Hóa đơn gốc: Ghi chú "Hoàn hàng toàn phần"

**API Test:**
```
POST /api/returns
Body: {
  saleId: "sale_001",
  items: [{ medicineId: "med_001", quantity: 2, reason: "defective" }],
  totalRefund: 10000
}
Expected: 201 Created, return created, stock + cashbook updated
```

**Status:** ⏳ Chưa test

---

## TC 5.2: Hoàn tiền một phần
**Mục đích:** Verify return một phần hàng  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Hóa đơn: Bán 2 Aspirin + 1 Ibuprofen (Tổng 18,000đ)
2. Khách return: 1 Aspirin (5,000đ)
3. Hoàn tiền: 5,000đ

**Kết quả mong đợi:**
- ✅ Hóa đơn gốc: 18,000đ → 13,000đ (giảm)
- ✅ Stock: 1 Aspirin return
- ✅ Điểm: Trừ 5 điểm (1 phần)
- ✅ Sổ quỹ: Hoàn 5,000đ

**Status:** ⏳ Chưa test

---

## TC 5.3: Lý do return & tracking
**Mục đích:** Verify ghi lý do & track trả hàng  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
1. Return with reason: "Dị ứng", "Hỏng", "Sai thuốc"
2. Xem danh sách return → filter by reason

**Kết quả mong đợi:**
- ✅ Danh sách hiện lý do
- ✅ Có thể filter/report: "Tháng 5 có 5 trường hợp hỏng"

**Status:** ⏳ Chưa test

---

## TC 5.4: Admin review & approve returns
**Mục đích:** Verify admin phải duyệt trước khi hoàn tiền  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Nhân viên tạo return
2. Admin vào **"Phiếu Trả Hàng"** → Danh sách "Chờ duyệt"
3. Click để xem chi tiết, Approve hoặc Reject

**Kết quả mong đợi:**
- ✅ Return status: PENDING → APPROVED (hoặc REJECTED)
- ✅ Chỉ khi APPROVED thì mới hoàn tiền & return stock
- ✅ Nếu REJECTED: Thông báo cho nhân viên

**Status:** ⏳ Chưa test

---

# 👥 **PHÂN HỆ 6: KHÁCH HÀNG (CUSTOMERS)**

## TC 6.1: Tạo hồ sơ khách hàng
**Mục đích:** Verify có thể thêm khách hàng mới  
**Độ ưu tiên:** 🔴 Critical  
**Bước:**
1. Vào **Khách Hàng** → **"+ Thêm"**
2. Nhập:
   - Tên: `Trần Thị B`
   - Phone: `0912345678` (unique)
   - Email: `tranb@gmail.com`
   - Địa chỉ: `456 Lý Tự Trọng, HCM`
   - Dị ứng: `Penicillin` (optional)
   - Bệnh nền: `Tiểu đường` (optional)
3. Click **"Lưu"**

**Kết quả mong đợi:**
- ✅ Khách hàng tạo thành công
- ✅ Tier = "Thường", Points = 0, Total Spent = 0
- ✅ Có thể bán hàng cho khách này

**Status:** ⏳ Chưa test

---

## TC 6.2: Xem lịch sử mua hàng
**Mục đích:** Verify có thể xem toàn bộ đơn mua của khách  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Click vào khách hàng "Nguyễn Văn A"
2. Tab **"📜 Lịch Sử Mua"**

**Kết quả mong đợi:**
- ✅ Hiện tất cả hóa đơn của khách (ngày, tổng tiền, hàng mua)
- ✅ Thống kê: "Tổng chi tiêu: 5M, Điểm tích lũy: 5000"
- ✅ Có thể export Excel

**Status:** ⏳ Chưa test

---

## TC 6.3: Quản lý công nợ khách hàng
**Mục đích:** Verify track công nợ & gợi ý thanh toán  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Khách hàng ghi nợ: 500,000đ (từ TC 4.7)
2. Xem chi tiết khách → Tab **"💰 Công Nợ"**

**Kết quả mong đợi:**
- ✅ Hiện công nợ: 500,000đ
- ✅ Ngày đáo hạn (nếu có)
- ✅ Nút: [Thanh toán toàn phần] [Thanh toán một phần]
- ✅ Báo cáo: Công nợ khách hàng

**Status:** ⏳ Chưa test

---

## TC 6.4: Tìm kiếm khách hàng
**Mục đích:** Verify search khách theo tên/phone  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
1. Vào Khách Hàng
2. Search: `0912345678` hoặc `Trần`

**Kết quả mong đợi:**
- ✅ Tìm được khách
- ✅ Response time < 500ms

**Status:** ⏳ Chưa test

---

## TC 6.5: Nâng hạng thành viên (Auto Tier Update)
**Mục đích:** Verify auto nâng hạng khi chi tiêu đủ  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
- Tier: "Thường" (0-50k) → "Bạc" (50-200k) → "Vàng" (200-500k) → "Kim cương" (500k+)
- Khách mua từng lần → Theo dõi tier

**Kết quả mong đợi:**
- ✅ Auto update tier (không cần manual)
- ✅ Popup: "🎉 Nâng hạng thành viên lên Vàng!"
- ✅ Quyền lợi: Giảm giá, quà tặng, ưu tiên

**Status:** ⏳ Chưa test

---

# 🏢 **PHÂN HỆ 7: NHÀ CUNG CẤP & DANH MỤC (SUPPLIERS)**

## TC 7.1: Thêm nhà cung cấp mới
**Mục đích:** Verify thêm supplier  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
1. Vào **Cấu hình** → **"Nhà Cung Cấp"** → **"+ Thêm"**
2. Nhập: Tên, Phone, Email, Địa chỉ, Người liên hệ

**Kết quả mong đợi:**
- ✅ Supplier thêm thành công
- ✅ Có thể chọn khi tạo phiếu nhập

**Status:** ⏳ Chưa test

---

## TC 7.2: Thanh toán công nợ NCC
**Mục đích:** Verify trả nợ nhà cung cấp (từ TC 3.4)  
**Độ ưu tiên:** 🟠 High  

**Status:** ⏳ Chưa test (chi tiết ở Phân hệ 3)

---

## TC 7.3: Quản lý danh mục thuốc (Categories)
**Mục đích:** Verify thêm/edit nhóm thuốc  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
1. Vào **Cấu hình** → **"Danh Mục Thuốc"**
2. Thêm: "Kháng sinh", "Vitamin", etc.

**Kết quả mong đợi:**
- ✅ Category thêm
- ✅ Có thể chọn khi tạo thuốc

**Status:** ⏳ Chưa test

---

# 🧾 **PHÂN HỆ 8: ĐƠN THUỐC MẪU & AI (PRESCRIPTIONS)**

## TC 8.1: Scan & OCR đơn thuốc (AI Vision)
**Mục đích:** Verify AI đọc hình ảnh đơn thuốc  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Vào **Đơn Thuốc** → **"Quét OCR"**
2. Chụp/tải ảnh đơn thuốc
3. Bấm **"🔍 Phân tích"**

**Kết quả mong đợi:**
- ✅ API Google Gemini nhận diện
- ✅ Response time < 5 giây
- ✅ Trích xuất: Tên bệnh nhân, Tên thuốc, Liều lượng, Số lần/ngày
- ✅ Map với database thuốc (nếu có)
- ✅ User có thể edit trước save

**API Test:**
```
POST /api/prescriptions/scan-ai
Headers: Authorization: Bearer {{token}}
Body: { imageBase64: "...", mimeType: "image/jpeg" }
Expected: 200 OK, extracted prescription data
```

**Status:** ⏳ Chưa test

---

## TC 8.2: Lưu đơn thuốc mẫu
**Mục đích:** Verify lưu đơn thuốc mẫu để tái sử dụng  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
1. Tạo đơn mẫu: "Cảm cúm trẻ em" (Aspirin 500mg + Ibuprofen 400mg)
2. Save

**Kết quả mong đợi:**
- ✅ Lần sau có thể load nhanh
- ✅ Có thể copy & tùy chỉnh

**Status:** ⏳ Chưa test

---

## TC 8.3: Kiểm tra tương tác thuốc (Drug Interaction AI)
**Mục đích:** Verify AI warning khi combo thuốc kỵ  
**Độ ưu tiên:** 🟠 High  

**Kết quả mong đợi:** (Chi tiết ở TC 4.4)

**Status:** ⏳ Chưa test

---

## TC 8.4: Quản lý đơn thuốc quốc gia (National Prescriptions DB)
**Mục đích:** Verify có database đơn mẫu quốc gia  
**Độ ưu tiên:** 🟡 Medium  

**Status:** ⏳ Chưa test

---

## TC 8.5: Ghi chú & Follow-up
**Mục đích:** Verify có thể ghi chú tư vấn  
**Độ ưu tiên:** 🟡 Medium  

**Status:** ⏳ Chưa test

---

# 💰 **PHÂN HỆ 9: TÀI CHÍNH KẾ TOÁN (CASHBOOK)**

## TC 9.1: Ghi thu thủ công
**Mục đích:** Verify tạo phiếu thu  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
1. Vào **Sổ Quỹ** → **"+ Thu"**
2. Nhập:
   - Loại: "Thu"
   - Danh mục: "Bán hàng"
   - Số tiền: 1,000,000
   - Phương thức: "Chuyển khoản"
   - Ghi chú: "Doanh thu ngày 21/5"
3. Lưu

**Kết quả mong đợi:**
- ✅ Phiếu thu tạo
- ✅ Sổ quỹ cộng 1,000,000đ

**Status:** ⏳ Chưa test

---

## TC 9.2: Ghi chi thủ công
**Mục đích:** Verify tạo phiếu chi  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
1. Vào **Sổ Quỹ** → **"+ Chi"**
2. Nhập:
   - Loại: "Chi"
   - Danh mục: "Điện nước"
   - Số tiền: 500,000
   - Phương thức: "Tiền mặt"
3. Lưu

**Kết quả mong đợi:**
- ✅ Phiếu chi tạo
- ✅ Sổ quỹ trừ 500,000đ

**Status:** ⏳ Chưa test

---

## TC 9.3: Tổng hợp Sổ quỹ tự động
**Mục đích:** Verify auto gom từ các transaction  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Vào **Sổ Quỹ**
2. Xem dashboard tháng 5

**Kết quả mong đợi:**
- ✅ Tự động gom:
  - Thu từ bán hàng (sales)
  - Thu từ khách ghi nợ trả
  - Chi từ trả hàng (refunds)
  - Chi từ thanh toán NCC
  - Chi từ lương nhân viên
  - Etc.
- ✅ Cân bằng: Thu - Chi = Lợi nhuận ròng

**Status:** ⏳ Chưa test

---

## TC 9.4: Báo cáo tài chính
**Mục đích:** Verify xuất báo cáo Cashbook  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Vào **Báo Cáo** → **"Tài Chính"**
2. Filter: Tháng 5, 2026

**Kết quả mong đợi:**
- ✅ Báo cáo chi tiết:
  - Thu theo danh mục
  - Chi theo danh mục
  - Tổng Thu, Tổng Chi
  - Lợi nhuận ròng
- ✅ Có thể export PDF/Excel

**Status:** ⏳ Chưa test

---

# ⏰ **PHÂN HỆ 10: NHÂN SỰ & CHẤM CÔNG (HR & TIMESHEET)**

## TC 10.1: Chấm công bằng mã PIN
**Mục đích:** Verify nhân viên check-in qua PIN  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Vào **Chấm Công**
2. Nhập PIN: `1234` (của admin)
3. Bấm **"Check-in"**

**Kết quả mong đợi:**
- ✅ Ghi nhận: Giờ check-in, Nhân viên
- ✅ Timesheet: Status = "Checked-in"
- ✅ Nếu gõ sai PIN 3 lần → Khóa 5 phút

**Status:** ⏳ Chưa test

---

## TC 10.2: Check-out & Tính giờ làm
**Mục đích:** Verify check-out & tính toán giờ  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Check-in: 08:00
2. Check-out: 17:00

**Kết quả mong đợi:**
- ✅ Giờ làm: 9 giờ
- ✅ Status: "Full day"
- ✅ Lương: Tính dựa trên hourly rate hoặc fixed

**Status:** ⏳ Chưa test

---

## TC 10.3: Xếp ca làm việc (Scheduling)
**Mục đích:** Verify admin xếp ca cho nhân viên  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Vào **Lịch Ca** → **"Xếp Ca"**
2. Chọn ngày, nhân viên, loại ca (Sáng/Chiều)

**Kết quả mong đợi:**
- ✅ Nhân viên nhận được schedule
- ✅ Có thể xem calendar

**Status:** ⏳ Chưa test

---

## TC 10.4: Đi trễ / Vắng mặt (Attendance Tracking)
**Mục đích:** Verify ghi nhận đi trễ/vắng  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
1. Xếp ca sáng: 08:00 - 12:00
2. Nhân viên check-in lúc: 08:30 (trễ 30 phút)

**Kết quả mong đợi:**
- ✅ Timesheet: Status = "Late" (+30 phút)
- ✅ Báo cáo: Ghi nhận đi muộn
- ✅ Tính lương: Có thể trừ đi (tùy policy)

**Status:** ⏳ Chưa test

---

## TC 10.5: Phép năm (Leave Management)
**Mục đích:** Verify quản lý phép/nghỉ  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
1. Nhân viên yêu cầu phép 1 ngày (2026-05-25)
2. Admin duyệt hoặc từ chối

**Kết quả mong đợi:**
- ✅ Nếu duyệt: Ngày đó không tính đi muộn, tính lương full
- ✅ Nếu từ chối: Vắng mặt

**Status:** ⏳ Chưa test

---

## TC 10.6: Tính lương (Payroll)
**Mục đích:** Verify tính toán lương nhân viên  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Nhân viên: Hourly rate 50,000đ/giờ
2. Tháng 5: Làm 20 ngày * 8 giờ = 160 giờ
3. Lương = 160 * 50,000 = 8,000,000

**Kết quả mong đợi:**
- ✅ Lương tính đúng
- ✅ Có thể có thêm allowances (phụ cấp, thưởng)
- ✅ Báo cáo Payroll

**Status:** ⏳ Chưa test

---

# 📊 **PHÂN HỆ 11: BÁO CÁO & DASHBOARD (REPORTS)**

## TC 11.1: Dashboard KPI tổng quan
**Mục đích:** Verify dashboard hiện chỉ số chính  
**Độ ưu tiên:** 🔴 Critical  
**Bước:**
1. Vào **Dashboard**
2. Xem tháng 5, 2026

**Kết quả mong đợi:**
- ✅ Hiện KPIs:
  - Doanh thu: 50M
  - Lợi nhuận: 3M
  - Tồn kho: 45M (giá trị)
  - Thuốc bán chạy: Top 10
  - Khách VIP: Top 5
  - Thuốc sắp hết hạn: 3 lô
  - Hết hàng: 5 loại

**Status:** ⏳ Chưa test

---

## TC 11.2: Báo cáo Doanh Thu (Revenue)
**Mục đích:** Verify báo cáo doanh thu chi tiết  
**Độ ưu tiên:** 🔴 Critical  
**Bước:**
1. Vào **Báo Cáo** → **"Doanh Thu"**
2. Chọn: Tháng 5, Năm 2026

**Kết quả mong đợi:**
- ✅ Biểu đồ doanh thu theo ngày
- ✅ Doanh thu theo phương thức thanh toán (tiền mặt/chuyển khoản)
- ✅ Doanh thu theo danh mục thuốc
- ✅ Thống kê: Tổng, Trung bình, Trend (+X%)

**Status:** ⏳ Chưa test

---

## TC 11.3: Báo cáo Thuốc Bán Chạy (Top Medicines)
**Mục đích:** Verify top 10 thuốc mang lợi nhuận cao  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Vào **Báo Cáo** → **"Top Thuốc"**

**Kết quả mong đợi:**
- ✅ Hiện top 10:
  - Tên thuốc
  - Số lượng bán
  - Doanh thu
  - Lợi nhuận
  - Margin %

**Status:** ⏳ Chưa test

---

## TC 11.4: Báo cáo Tồn Kho (Inventory)
**Mục đích:** Verify báo cáo tồn kho  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Vào **Báo Cáo** → **"Tồn Kho"**

**Kết quả mong đợi:**
- ✅ Tổng tồn kho (theo danh mục)
- ✅ Giá trị tồn kho
- ✅ Thuốc tồn kho thấp (< Min Stock)
- ✅ Thuốc sắp hết hạn
- ✅ Thuốc không bán được (slow moving)

**Status:** ⏳ Chưa test

---

## TC 11.5: Báo cáo Công Nợ (Debt Report)
**Mục đích:** Verify báo cáo công nợ khách/NCC  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Vào **Báo Cáo** → **"Công Nợ"**

**Kết quả mong đợi:**
- ✅ Công nợ khách hàng: Tên, số tiền, ngày đáo hạn
- ✅ Công nợ NCC: Tương tự
- ✅ Total: Tổng công nợ
- ✅ Có thể export để gửi nhắc nợ

**Status:** ⏳ Chưa test

---

# 👁️‍🗨️ **PHÂN HỆ 12: NHẬT KÝ HOẠT ĐỘNG (AUDIT LOGS)**

## TC 12.1: Truy vết hành vi xóa/sửa (Tracking)
**Mục đích:** Verify tất cả hoạt động đều bị ghi lại  
**Độ ưu tiên:** 🟠 High  
**Bước:**
1. Admin: Hủy hóa đơn INV001 (Admin GPP, 10:30, ngày 21/5)
2. Vào **Nhật Ký**

**Kết quả mong đợi:**
- ✅ Log ghi:
  - Người: Admin GPP
  - Hành động: Delete
  - Module: Sales
  - Target: INV001
  - Giờ: 21/05/2026 10:30:45
  - IP: 192.168.1.100
  - User-Agent: Chrome 120...

**Status:** ⏳ Chưa test

---

## TC 12.2: Filter & Search log
**Mục đích:** Verify có thể tìm log nhanh  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
1. Filter: Module = "Sales", Action = "Delete", User = "Admin GPP"

**Kết quả mong đợi:**
- ✅ Chỉ hiện log phù hợp
- ✅ Export PDF/Excel để kiểm toán

**Status:** ⏳ Chưa test

---

## TC 12.3: Compliance Report (Tuân thủ pháp luật)
**Mục đích:** Verify có thể sinh báo cáo audit cho cơ quan  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
1. Generate: Audit Report tháng 5

**Kết quả mong đợi:**
- ✅ Báo cáo đầy đủ:
  - Tất cả transactions
  - Tất cả đổi giá
  - Tất cả xóa dữ liệu
  - Signature: Giám đốc

**Status:** ⏳ Chưa test

---

# ⚙️ **PHÂN HỆ 13: CẤU HÌNH HỆ THỐNG (SETTINGS)**

## TC 13.1: Quản lý Đơn vị tính (Units)
**Mục đích:** Verify quy đổi đơn vị  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
1. Vào **Cấu Hình** → **"Đơn Vị Tính"**
2. Thêm: Vỉ (1 Vỉ = 10 Viên)

**Kết quả mong đợi:**
- ✅ Khi bán 1 Vỉ → Stock trừ 10 Viên
- ✅ Khi bán 5 Viên → Stock trừ 5

**Status:** ⏳ Chưa test

---

## TC 13.2: Quản lý Người dùng (Users)
**Mục đích:** Verify add/edit/delete users  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
1. Thêm user: `pharmacist_new`, role: `Pharmacist`
2. Edit: Đổi lương, PIN
3. Delete: Disable tài khoản

**Kết quả mong đợi:**
- ✅ User thêm/edit/delete thành công
- ✅ Soft delete: isActive = false

**Status:** ⏳ Chưa test

---

## TC 13.3: Cấu hình hệ thống (System Config)
**Mục đích:** Verify thiết lập cơ bản  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
1. Tên cửa hàng, Địa chỉ, SĐT, Email
2. Logo, Thuế GST, Discount policy

**Kết quả mong đợi:**
- ✅ Thông tin hiện trên hóa đơn in ra

**Status:** ⏳ Chưa test

---

## TC 13.4: Backup & Restore
**Mục đích:** Verify sao lưu dữ liệu  
**Độ ưu tiên:** 🟡 Medium  
**Bước:**
1. Click **"Backup"**
2. File được tải xuống

**Kết quả mong đợi:**
- ✅ File backup (.zip hoặc .sql)
- ✅ Có thể restore khi cần

**Status:** ⏳ Chưa test

---

# 📈 **TÓM TẮT & METRICS**

| Loại Test | Số TC | Trạng thái | Ghi chú |
|-----------|------|-----------|---------|
| 🔴 Critical | 15 | ⏳ Chưa | Ưu tiên test trước |
| 🟠 High | 35 | ⏳ Chưa | |
| 🟡 Medium | 18 | ⏳ Chưa | |
| **TỔNG** | **68** | | |

---

# 🎯 **CHIẾN LƯỢC KIỂM THỬ**

## Phase 1: Functional Testing (Tuần 1)
- ✅ Phân hệ 1-5 (Auth, Medicines, Imports, Sales, Returns)
- ✅ Test tất cả happy path
- ✅ Verify data accuracy

## Phase 2: Integration Testing (Tuần 2)
- ✅ Phân hệ 6-11 (Customers, Cashbook, Reports, etc.)
- ✅ Test flow bán → return → hoàn tiền
- ✅ Test report accuracy

## Phase 3: Non-Functional Testing (Tuần 3)
- ✅ Performance: Response time < 5s
- ✅ Security: Authorization checks
- ✅ Load testing: 100 concurrent users

## Phase 4: Regression Testing (Tuần 4)
- ✅ Test lại Bug fixes
- ✅ Smoke tests trên toàn bộ hệ thống
- ✅ UAT với khách hàng

---

# ✅ **TIÊU CHÍ PASS/FAIL**

**PASS:**
- ✅ Tất cả 68 TC pass ✓
- ✅ Không có Critical bugs
- ✅ Performance ✓
- ✅ Security ✓
- ✅ Compliance ✓

**FAIL:**
- ❌ > 5 TC fail
- ❌ Có 1+ Critical bugs
- ❌ Performance < 5s
- ❌ Authorization bypass

---

**Ngày cập nhật:** 03/06/2026  
**Version:** 1.0  
**Prepared by:** QA Team  


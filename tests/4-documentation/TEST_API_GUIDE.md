# 📚 HƯỚNG DẪN CHI TIẾT TEST APIs - GROUP5 PHARMACY GPP MANAGER

**🎯 Port: 5001 | Base URL: http://localhost:5001/api**

---

## 🔐 **PHẦN 1: AUTHENTICATION (Xác thực)**

### API 1.1: LOGIN - Đăng Nhập

**Mục đích:** Lấy JWT token để access các API khác

**Endpoint:**
```
POST http://localhost:5001/api/auth/login
```

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
    "username": "admin",
    "password": "123456"
}
```

**Expected Response (200 OK):**
```json
{
    "success": true,
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "5f7b1a8c9d4e2f3a1b9c0d1e",
        "username": "admin",
        "email": "admin@pharmacy.com",
        "role": "admin",
        "name": "Admin User"
    }
}
```

**Lưu ý:**
- ⭐ **LƯU TOKEN** từ response này để dùng cho các request tiếp theo
- Copy cả giá trị `token` (string dài)

**Postman:**
1. POST `{{baseUrl}}/auth/login`
2. Body → raw (JSON)
3. Paste request body trên
4. Click Send
5. Token tự lưu vào Environment (nhờ test script)

---

### API 1.2: GET CURRENT USER - Lấy Thông Tin User

**Mục đích:** Verify token & lấy thông tin user hiện tại

**Endpoint:**
```
GET http://localhost:5001/api/auth/me
```

**Headers:**
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Request Body:** (Empty)

**Expected Response (200 OK):**
```json
{
    "success": true,
    "user": {
        "_id": "5f7b1a8c9d4e2f3a1b9c0d1e",
        "username": "admin",
        "email": "admin@pharmacy.com",
        "role": "admin",
        "name": "Admin User",
        "clockInPin": "1234",
        "salaryConfig": {
            "type": "fixed",
            "amount": 5000000,
            "currency": "VND"
        }
    }
}
```

**Error Response (401 Unauthorized):**
```json
{
    "success": false,
    "error": "Token expired or invalid"
}
```

**Lưu ý:**
- ✅ Dùng token từ API 1.1
- ❌ Nếu 401 → Login lại (API 1.1)

---

## 💊 **PHẦN 2: MEDICINES (Quản lý Thuốc)**

### API 2.1: GET ALL MEDICINES - Lấy Danh Sách Thuốc

**Mục đích:** Xem toàn bộ danh sách thuốc trong hệ thống

**Endpoint:**
```
GET http://localhost:5001/api/medicines?page=1&limit=10
```

**Query Parameters (Optional):**
```
page=1          (trang, mặc định 1)
limit=10        (số item/trang, mặc định 20)
search=Aspirin  (tìm theo tên thuốc)
category=5f7b   (filter theo category ID)
lowStock=true   (chỉ xem thuốc tồn kho thấp)
```

**Headers:**
```
Authorization: Bearer {{token}}
```

**Request Body:** (Empty)

**Expected Response (200 OK):**
```json
{
    "success": true,
    "data": [
        {
            "_id": "med_001",
            "code": "ASP001",
            "name": "Aspirin 500mg",
            "category": "cat_001",
            "unit": "unit_001",
            "stock": 100,
            "minStock": 10,
            "maxStock": 500,
            "sellPrice": 5000,
            "importPrice": 2000,
            "batches": [
                {
                    "batchNumber": "LOT001",
                    "quantity": 100,
                    "expiryDate": "2027-12-31",
                    "importPrice": 2000
                }
            ],
            "location": {
                "zone": "A",
                "shelf": "1",
                "row": "2",
                "column": "3"
            },
            "isActive": true,
            "createdAt": "2026-01-15T10:00:00.000Z"
        },
        {
            "_id": "med_002",
            "code": "IBU001",
            "name": "Ibuprofen 400mg",
            "stock": 50,
            // ... fields khác
        }
        // ... more medicines
    ],
    "pagination": {
        "currentPage": 1,
        "totalPages": 5,
        "totalItems": 45
    }
}
```

**Test Variations:**

**Variation 2.1a: Filter thuốc tên "Aspirin"**
```
GET http://localhost:5001/api/medicines?search=Aspirin
```

**Variation 2.1b: Chỉ xem thuốc tồn kho thấp**
```
GET http://localhost:5001/api/medicines?lowStock=true
```

**Variation 2.1c: Lấy 5 items/trang, trang 2**
```
GET http://localhost:5001/api/medicines?page=2&limit=5
```

---

### API 2.2: GET MEDICINE DETAIL - Lấy Chi Tiết Thuốc

**Mục đích:** Xem thông tin chi tiết 1 loại thuốc

**Endpoint:**
```
GET http://localhost:5001/api/medicines/{medicineId}
```

**Ví dụ:**
```
GET http://localhost:5001/api/medicines/med_001
```

**Headers:**
```
Authorization: Bearer {{token}}
```

**Expected Response (200 OK):**
```json
{
    "success": true,
    "data": {
        "_id": "med_001",
        "code": "ASP001",
        "name": "Aspirin 500mg",
        "category": {
            "_id": "cat_001",
            "name": "Giảm đau"
        },
        "unit": {
            "_id": "unit_001",
            "name": "Viên"
        },
        "stock": 100,
        "minStock": 10,
        "maxStock": 500,
        "sellPrice": 5000,
        "importPrice": 2000,
        "description": "Thuốc giảm đau, hạ sốt",
        "batches": [
            {
                "batchNumber": "LOT001",
                "quantity": 100,
                "expiryDate": "2027-12-31T00:00:00.000Z",
                "importPrice": 2000
            },
            {
                "batchNumber": "LOT002",
                "quantity": 50,
                "expiryDate": "2027-06-30T00:00:00.000Z",
                "importPrice": 2100
            }
        ],
        "location": {
            "zone": "A",
            "shelf": "1",
            "row": "2",
            "column": "3"
        },
        "isActive": true,
        "createdAt": "2026-01-15T10:00:00.000Z",
        "updatedAt": "2026-05-20T15:30:00.000Z"
    }
}
```

**Error Response (404 Not Found):**
```json
{
    "success": false,
    "error": "Medicine not found"
}
```

**Lưu ý:**
- Batch tracking: Mỗi thuốc có nhiều lô hàng (LOT) với expiryDate khác nhau
- FEFO: Khi bán, hệ thống sẽ trừ từ lô hàng có expiryDate sớm nhất trước

---

### API 2.3: CREATE MEDICINE - Tạo Thuốc (Admin Only)

**Mục đích:** Thêm loại thuốc mới vào hệ thống

**Endpoint:**
```
POST http://localhost:5001/api/medicines
```

**Headers:**
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Request Body:**
```json
{
    "code": "ASP002",
    "name": "Aspirin 1000mg",
    "category": "cat_001",
    "unit": "unit_001",
    "sellPrice": 8000,
    "importPrice": 3500,
    "minStock": 20,
    "maxStock": 800,
    "description": "Thuốc giảm đau liều cao",
    "location": {
        "zone": "B",
        "shelf": "2",
        "row": "1",
        "column": "5"
    },
    "batches": [
        {
            "batchNumber": "LOT001",
            "quantity": 200,
            "expiryDate": "2028-12-31",
            "importPrice": 3500
        }
    ]
}
```

**Expected Response (201 Created):**
```json
{
    "success": true,
    "message": "Medicine created successfully",
    "data": {
        "_id": "med_003",
        "code": "ASP002",
        "name": "Aspirin 1000mg",
        "category": "cat_001",
        "stock": 200,
        // ... other fields
    }
}
```

**Error Responses:**

**400 Bad Request - Code already exists:**
```json
{
    "success": false,
    "error": "Medicine code must be unique"
}
```

**403 Forbidden - Not admin:**
```json
{
    "success": false,
    "error": "Unauthorized - Admin only"
}
```

**Lưu ý:**
- ⚠️ Chỉ admin mới tạo được thuốc
- `code` phải unique (không trùng)
- `batches` có thể để trống ban đầu (sẽ thêm qua import)

---

### API 2.4: UPDATE MEDICINE - Cập Nhật Thuốc (Admin Only)

**Mục đích:** Sửa thông tin thuốc (giá, vị trí kho, etc.)

**Endpoint:**
```
PUT http://localhost:5001/api/medicines/{medicineId}
```

**Ví dụ:**
```
PUT http://localhost:5001/api/medicines/med_001
```

**Headers:**
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Request Body (Có thể update một số fields):**
```json
{
    "name": "Aspirin 500mg - Bayer",
    "sellPrice": 5500,
    "minStock": 15,
    "location": {
        "zone": "A",
        "shelf": "1",
        "row": "3",
        "column": "1"
    }
}
```

**Expected Response (200 OK):**
```json
{
    "success": true,
    "message": "Medicine updated successfully",
    "data": {
        "_id": "med_001",
        "name": "Aspirin 500mg - Bayer",
        "sellPrice": 5500,
        "minStock": 15,
        // ... updated fields
    }
}
```

---

### API 2.5: DELETE MEDICINE - Xóa Thuốc (Admin Only - Soft Delete)

**Mục đích:** Xóa mềm (soft delete) - không xóa vật lý, chỉ đánh dấu inactive

**Endpoint:**
```
DELETE http://localhost:5001/api/medicines/{medicineId}
```

**Ví dụ:**
```
DELETE http://localhost:5001/api/medicines/med_001
```

**Headers:**
```
Authorization: Bearer {{token}}
```

**Request Body:** (Empty)

**Expected Response (200 OK):**
```json
{
    "success": true,
    "message": "Medicine deleted successfully"
}
```

**Lưu ý:**
- ⚠️ Soft delete: `isActive` đặt thành `false`
- Dữ liệu vẫn trong DB (không xóa vật lý)
- Get medicines sẽ không hiện thuốc này nữa

---

## 👥 **PHẦN 3: CUSTOMERS (Quản lý Khách Hàng)**

### API 3.1: GET ALL CUSTOMERS - Danh Sách Khách Hàng

**Endpoint:**
```
GET http://localhost:5001/api/customers?page=1&limit=10
```

**Headers:**
```
Authorization: Bearer {{token}}
```

**Expected Response (200 OK):**
```json
{
    "success": true,
    "data": [
        {
            "_id": "cust_001",
            "name": "Nguyễn Văn A",
            "phone": "0987654321",
            "email": "nguyenvana@example.com",
            "address": "123 Nguyễn Huệ, HCM",
            "allergies": ["Penicillin"],
            "chronicDiseases": ["Diabetes", "Hypertension"],
            "totalSpent": 5000000,
            "loyaltyPoints": 5000,
            "memberTier": "Vàng",
            "isActive": true,
            "createdAt": "2026-01-10T08:00:00.000Z"
        },
        // ... more customers
    ],
    "pagination": {
        "currentPage": 1,
        "totalPages": 3,
        "totalItems": 25
    }
}
```

---

### API 3.2: CREATE CUSTOMER - Tạo Khách Hàng

**Endpoint:**
```
POST http://localhost:5001/api/customers
```

**Headers:**
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Request Body:**
```json
{
    "name": "Trần Thị B",
    "phone": "0912345678",
    "email": "tranb@example.com",
    "address": "456 Lý Tự Trọng, HCM",
    "allergies": [],
    "chronicDiseases": ["Asthma"]
}
```

**Expected Response (201 Created):**
```json
{
    "success": true,
    "message": "Customer created successfully",
    "data": {
        "_id": "cust_002",
        "name": "Trần Thị B",
        "phone": "0912345678",
        "totalSpent": 0,
        "loyaltyPoints": 0,
        "memberTier": "Thường",
        // ... other fields
    }
}
```

**Lưu ý:**
- Phone phải unique
- memberTier tự động: "Thường" → "Bạc" → "Vàng" → "Kim cương" (theo totalSpent)

---

### API 3.3: GET CUSTOMER HISTORY - Lịch Mua Hàng

**Endpoint:**
```
GET http://localhost:5001/api/customers/{customerId}/history
```

**Headers:**
```
Authorization: Bearer {{token}}
```

**Expected Response (200 OK):**
```json
{
    "success": true,
    "data": {
        "customer": {
            "_id": "cust_001",
            "name": "Nguyễn Văn A",
            "phone": "0987654321"
        },
        "purchaseHistory": [
            {
                "_id": "sale_001",
                "code": "INV001",
                "date": "2026-05-20",
                "items": [
                    {
                        "medicineName": "Aspirin 500mg",
                        "quantity": 2,
                        "price": 5000,
                        "subtotal": 10000
                    }
                ],
                "totalAmount": 10000,
                "paymentMethod": "cash",
                "pointsEarned": 10
            },
            // ... more purchases
        ],
        "totalSpent": 5000000,
        "loyaltyPoints": 5000,
        "memberTier": "Vàng"
    }
}
```

---

## 🛒 **PHẦN 4: SALES / POS (Bán Hàng)**

### API 4.1: CREATE SALE - Tạo Hóa Đơn (POS)

**Mục đích:** Tạo hóa đơn bán hàng, trừ stock (FEFO)

**Endpoint:**
```
POST http://localhost:5001/api/sales
```

**Headers:**
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Request Body:**
```json
{
    "customer": {
        "customerId": "cust_001"
    },
    "items": [
        {
            "medicineId": "med_001",
            "quantity": 3,
            "sellPrice": 5000
        },
        {
            "medicineId": "med_002",
            "quantity": 2,
            "sellPrice": 8000
        }
    ],
    "totalAmount": 31000,
    "discount": 1000,
    "paymentMethod": "cash",
    "notes": "Thanh toán bằng tiền mặt"
}
```

**Expected Response (201 Created):**
```json
{
    "success": true,
    "message": "Sale created successfully",
    "data": {
        "_id": "sale_001",
        "code": "INV001",
        "customer": {
            "_id": "cust_001",
            "name": "Nguyễn Văn A"
        },
        "items": [
            {
                "medicine": "med_001",
                "medicineName": "Aspirin 500mg",
                "quantity": 3,
                "sellPrice": 5000,
                "subtotal": 15000
            },
            {
                "medicine": "med_002",
                "medicineName": "Ibuprofen 400mg",
                "quantity": 2,
                "sellPrice": 8000,
                "subtotal": 16000
            }
        ],
        "totalAmount": 31000,
        "discount": 1000,
        "finalAmount": 30000,
        "pointsEarned": 30,
        "paymentMethod": "cash",
        "status": "completed",
        "createdAt": "2026-05-21T10:30:00.000Z"
    }
}
```

**Behind the scenes (tự động):**
- ✅ Stock trừ theo FEFO (expiryDate sớm nhất trước)
- ✅ Loyalty points cộng vào customer
- ✅ Audit log ghi lại transaction
- ✅ Customer totalSpent cập nhật

**Error Response (400):**
```json
{
    "success": false,
    "error": "Insufficient stock for Aspirin 500mg"
}
```

---

### API 4.2: GET ALL SALES - Danh Sách Hóa Đơn

**Endpoint:**
```
GET http://localhost:5001/api/sales?page=1&limit=10
```

**Headers:**
```
Authorization: Bearer {{token}}
```

**Expected Response (200 OK):**
```json
{
    "success": true,
    "data": [
        {
            "_id": "sale_001",
            "code": "INV001",
            "customer": {
                "_id": "cust_001",
                "name": "Nguyễn Văn A"
            },
            "totalAmount": 30000,
            "pointsEarned": 30,
            "paymentMethod": "cash",
            "status": "completed",
            "createdAt": "2026-05-21T10:30:00.000Z"
        },
        // ... more sales
    ]
}
```

---

### API 4.3: GET SALE DETAIL - Chi Tiết Hóa Đơn

**Endpoint:**
```
GET http://localhost:5001/api/sales/{saleId}
```

**Headers:**
```
Authorization: Bearer {{token}}
```

**Expected Response (200 OK):**
```json
{
    "success": true,
    "data": {
        "_id": "sale_001",
        "code": "INV001",
        "customer": { /* full customer info */ },
        "items": [
            {
                "medicine": "med_001",
                "medicineName": "Aspirin 500mg",
                "quantity": 3,
                "sellPrice": 5000,
                "subtotal": 15000,
                "batchNumber": "LOT001",
                "expiryDate": "2027-12-31"
            }
        ],
        "totalAmount": 30000,
        "discount": 1000,
        "finalAmount": 29000,
        "pointsEarned": 29,
        "paymentMethod": "cash",
        "status": "completed",
        "createdBy": { /* user info */ },
        "createdAt": "2026-05-21T10:30:00.000Z"
    }
}
```

---

### API 4.4: GET PUBLIC INVOICE (E-Invoice) - Hóa Đơn Điện Tử

**Mục đích:** Lấy hóa đơn công khai (cho khách hàng, không cần auth)

**Endpoint:**
```
GET http://localhost:5001/api/sales/public/{saleId}
```

**Ví dụ:**
```
GET http://localhost:5001/api/sales/public/sale_001
```

**Headers:** (No auth required)
```
Content-Type: application/json
```

**Expected Response (200 OK):**
```json
{
    "success": true,
    "data": {
        "_id": "sale_001",
        "code": "INV001",
        "date": "2026-05-21",
        "items": [
            {
                "medicineName": "Aspirin 500mg",
                "quantity": 3,
                "price": 5000,
                "subtotal": 15000
            }
        ],
        "totalAmount": 30000,
        "discount": 1000,
        "finalAmount": 29000,
        "paymentMethod": "cash"
    }
}
```

---

## 📥 **PHẦN 5: IMPORTS (Đơn Nhập Kho)**

### API 5.1: CREATE IMPORT - Tạo Đơn Nhập

**Mục đích:** Tạo đơn nhập hàng từ nhà cung cấp

**Endpoint:**
```
POST http://localhost:5001/api/imports
```

**Headers:**
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Request Body:**
```json
{
    "code": "IMP001",
    "supplier": "supp_001",
    "items": [
        {
            "medicineId": "med_001",
            "quantity": 100,
            "importPrice": 2000,
            "batchNumber": "LOT003",
            "expiryDate": "2028-12-31"
        },
        {
            "medicineId": "med_002",
            "quantity": 50,
            "importPrice": 3500,
            "batchNumber": "LOT001",
            "expiryDate": "2028-06-30"
        }
    ],
    "totalAmount": 375000,
    "paymentStatus": "unpaid",
    "paymentDueDate": "2026-06-21"
}
```

**Expected Response (201 Created):**
```json
{
    "success": true,
    "message": "Import order created successfully",
    "data": {
        "_id": "imp_001",
        "code": "IMP001",
        "supplier": {
            "_id": "supp_001",
            "name": "Supplier A"
        },
        "items": [
            {
                "medicine": "med_001",
                "medicineName": "Aspirin 500mg",
                "quantity": 100,
                "importPrice": 2000,
                "batchNumber": "LOT003",
                "expiryDate": "2028-12-31",
                "subtotal": 200000
            }
        ],
        "totalAmount": 375000,
        "paymentStatus": "unpaid",
        "status": "received",
        "createdAt": "2026-05-21T11:00:00.000Z"
    }
}
```

**Behind the scenes:**
- ✅ Stock tăng cho từng medicine
- ✅ Batch tracking cập nhật
- ✅ Payment status: unpaid → paid (sau khi thanh toán)
- ✅ Audit log ghi nhận

---

### API 5.2: GET ALL IMPORTS - Danh Sách Đơn Nhập

**Endpoint:**
```
GET http://localhost:5001/api/imports?page=1&limit=10
```

**Headers:**
```
Authorization: Bearer {{token}}
```

**Expected Response (200 OK):**
```json
{
    "success": true,
    "data": [
        {
            "_id": "imp_001",
            "code": "IMP001",
            "supplier": {
                "_id": "supp_001",
                "name": "Supplier A"
            },
            "totalAmount": 375000,
            "paymentStatus": "unpaid",
            "status": "received",
            "createdAt": "2026-05-21T11:00:00.000Z"
        }
    ]
}
```

---

## 📊 **PHẦN 6: REPORTS (Báo Cáo)**

### API 6.1: GET DASHBOARD KPIs - Dashboard Tổng Quan

**Mục đích:** Lấy các chỉ số chính (revenue, expenses, top products)

**Endpoint:**
```
GET http://localhost:5001/api/reports/dashboard?period=month&month=5&year=2026
```

**Query Parameters:**
```
period=month   (month, quarter, year)
month=5        (1-12)
year=2026
```

**Headers:**
```
Authorization: Bearer {{token}}
```

**Expected Response (200 OK):**
```json
{
    "success": true,
    "data": {
        "period": "May 2026",
        "revenue": {
            "totalSales": 50000000,
            "avgPerDay": 1612903,
            "trend": "+12.5%"
        },
        "expenses": {
            "imports": 30000000,
            "salary": 15000000,
            "other": 2000000,
            "total": 47000000
        },
        "profit": {
            "grossProfit": 3000000,
            "netProfit": 2500000
        },
        "inventory": {
            "totalMedicines": 150,
            "lowStockItems": 12,
            "expiredItems": 3,
            "totalValue": 45000000
        },
        "topProducts": [
            {
                "medicineId": "med_001",
                "medicineName": "Aspirin 500mg",
                "quantitySold": 500,
                "revenue": 2500000
            },
            {
                "medicineId": "med_002",
                "medicineName": "Ibuprofen 400mg",
                "quantitySold": 300,
                "revenue": 2400000
            }
        ],
        "topCustomers": [
            {
                "customerId": "cust_001",
                "customerName": "Nguyễn Văn A",
                "totalSpent": 500000,
                "transactionCount": 15
            }
        ]
    }
}
```

---

### API 6.2: GET REVENUE REPORT - Báo Cáo Doanh Thu

**Endpoint:**
```
GET http://localhost:5001/api/reports/revenue?startDate=2026-05-01&endDate=2026-05-31
```

**Query Parameters:**
```
startDate=2026-05-01
endDate=2026-05-31
```

**Headers:**
```
Authorization: Bearer {{token}}
```

**Expected Response (200 OK):**
```json
{
    "success": true,
    "data": {
        "period": "2026-05-01 to 2026-05-31",
        "totalRevenue": 50000000,
        "byDate": [
            {
                "date": "2026-05-01",
                "revenue": 1500000,
                "transactions": 45
            },
            {
                "date": "2026-05-02",
                "revenue": 1800000,
                "transactions": 52
            }
        ],
        "byPaymentMethod": {
            "cash": 30000000,
            "card": 15000000,
            "transfer": 5000000
        },
        "byMedicineCategory": {
            "Giảm đau": 15000000,
            "Kháng sinh": 12000000,
            "Vitamin": 8000000
        }
    }
}
```

---

### API 6.3: GET INVENTORY REPORT - Báo Cáo Tồn Kho

**Endpoint:**
```
GET http://localhost:5001/api/reports/inventory
```

**Headers:**
```
Authorization: Bearer {{token}}
```

**Expected Response (200 OK):**
```json
{
    "success": true,
    "data": {
        "totalMedicines": 150,
        "totalStockValue": 45000000,
        "categories": [
            {
                "categoryName": "Giảm đau",
                "medicineCount": 25,
                "totalQuantity": 5000,
                "totalValue": 12000000
            }
        ],
        "lowStockItems": [
            {
                "medicineId": "med_005",
                "medicineName": "Paracetamol 500mg",
                "currentStock": 5,
                "minStock": 20
            }
        ],
        "expiringItems": [
            {
                "medicineId": "med_003",
                "medicineName": "Vitamin C 1000mg",
                "expiryDate": "2026-06-30",
                "batchNumber": "LOT002",
                "quantity": 50
            }
        ]
    }
}
```

---

## 🔍 **PHẦN 7: ACTIVITY LOGS (Audit Trail)**

### API 7.1: GET ACTIVITY LOGS - Lịch Sử Hoạt Động

**Mục đích:** Xem toàn bộ hoạt động của hệ thống (compliance tracking)

**Endpoint:**
```
GET http://localhost:5001/api/activity-logs?page=1&limit=20&module=sale
```

**Query Parameters:**
```
page=1
limit=20
module=sale          (auth, medicine, sale, import, customer, etc.)
action=create        (create, update, delete, login)
userId=user_001
startDate=2026-05-01
endDate=2026-05-31
```

**Headers:**
```
Authorization: Bearer {{token}}
```

**Expected Response (200 OK):**
```json
{
    "success": true,
    "data": [
        {
            "_id": "log_001",
            "user": {
                "_id": "user_001",
                "username": "admin",
                "email": "admin@pharmacy.com"
            },
            "action": "create",
            "module": "sale",
            "target": "sale_001",
            "targetName": "INV001",
            "changes": {
                "before": null,
                "after": {
                    "code": "INV001",
                    "totalAmount": 30000
                }
            },
            "ipAddress": "192.168.1.100",
            "userAgent": "Mozilla/5.0...",
            "status": "success",
            "timestamp": "2026-05-21T10:30:00.000Z"
        },
        {
            "_id": "log_002",
            "user": { /* admin user */ },
            "action": "login",
            "module": "auth",
            "ipAddress": "192.168.1.100",
            "status": "success",
            "timestamp": "2026-05-21T08:00:00.000Z"
        }
    ],
    "pagination": {
        "currentPage": 1,
        "totalPages": 5,
        "totalItems": 95
    }
}
```

---

## 💾 **PHẦN 8: CASHBOOK (Ghi Chép Tài Chính)**

### API 8.1: CREATE CASHBOOK TRANSACTION - Ghi Thu/Chi

**Endpoint:**
```
POST http://localhost:5001/api/cashbook
```

**Headers:**
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Request Body:**
```json
{
    "type": "thu",
    "category": "bán hàng",
    "amount": 10000000,
    "paymentMethod": "chuyển khoản",
    "description": "Doanh thu bán hàng ngày 21/5",
    "transactionDate": "2026-05-21",
    "relatedTo": "sale_001"
}
```

**Expected Response (201 Created):**
```json
{
    "success": true,
    "message": "Cashbook transaction created successfully",
    "data": {
        "_id": "cash_001",
        "type": "thu",
        "category": "bán hàng",
        "amount": 10000000,
        "paymentMethod": "chuyển khoản",
        "transactionDate": "2026-05-21",
        "createdBy": "user_001",
        "createdAt": "2026-05-21T11:30:00.000Z"
    }
}
```

---

## 🔄 **PHẦN 9: RETURNS (Trả Hàng & Hoàn Tiền)**

### API 9.1: Lấy Danh Sách Trả Hàng
**Endpoint:** `GET http://localhost:5001/api/returns`
**Headers:**
```
Authorization: Bearer <token>
```
**Mục đích:** Xem lịch sử khách hàng trả lại thuốc.

### API 9.2: Tạo Phiếu Trả Hàng
**Endpoint:** `POST http://localhost:5001/api/returns`
**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```
**Mục đích:** Hoàn tiền cho khách hàng, tự động cộng lại tồn kho và cập nhật sổ quỹ.
**Body:**
```json
{
  "saleId": "60d5ecb74d6bb892b0c1e4c7",
  "customerId": "60d5ecb74d6bb892b0c1e4c9",
  "items": [
    { 
      "medicine": "60d5ecb74d6bb892b0c1e4a1", 
      "quantity": 1, 
      "refundPrice": 50000, 
      "reason": "Dị ứng thuốc" 
    }
  ],
  "totalRefund": 50000,
  "refundMethod": "cash",
  "notes": "Khách hàng bị ngứa sau khi uống"
}
```

### API 9.3: Cập Nhật Trạng Thái (Dành Cho Admin)
**Endpoint:** `PUT http://localhost:5001/api/returns/:id/status`
**Headers:** `Authorization: Bearer <admin_token>`
**Body:** 
```json
{ "status": "completed" }
```

---

## 🏢 **PHẦN 10: SUPPLIERS & CATEGORIES (Nhà Cung Cấp & Danh Mục)**

*(Tích hợp trong Config Routes)*

### API 10.1: Quản Lý Nhà Cung Cấp
- **Lấy danh sách:** `GET http://localhost:5001/api/config/suppliers`
- **Thêm mới (Admin):** `POST http://localhost:5001/api/config/suppliers`
  **Body:**
  ```json
  { 
    "name": "Dược Hậu Giang", 
    "phone": "02923829777", 
    "address": "Cần Thơ", 
    "email": "dhg@dhgpharma.com.vn" 
  }
  ```
- **Cập nhật:** `PUT http://localhost:5001/api/config/suppliers/:id`
- **Xóa:** `DELETE http://localhost:5001/api/config/suppliers/:id`

### API 10.2: Quản Lý Nhóm Thuốc
- **Lấy danh sách:** `GET http://localhost:5001/api/config/categories`
- **Thêm mới (Admin):** `POST http://localhost:5001/api/config/categories`
  **Body:** 
  ```json
  { "name": "Thuốc Kháng Sinh", "description": "Nhóm kháng sinh kê đơn" }
  ```
- **Cập nhật / Xóa:** Dùng `PUT /:id` và `DELETE /:id` tương tự API Nhà cung cấp.

---

## 🧾 **PHẦN 11: PRESCRIPTIONS & AI (Đơn Thuốc & Trợ Lý AI)**

### API 11.1: Quét Đơn Thuốc Bằng AI (OCR Vision)
**Endpoint:** `POST http://localhost:5001/api/prescriptions/scan-ai`
**Headers:** `Authorization: Bearer <token>`
**Mục đích:** Dùng Google Gemini AI nhận diện hình ảnh đơn thuốc, trích xuất thành danh sách thuốc số hóa.
**Body:**
```json
{
  "imageBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA...",
  "mimeType": "image/jpeg"
}
```
**Response:** Dữ liệu chuẩn hóa gồm tên thuốc, liều lượng mà AI phân tích được.

### API 11.2: Kiểm Tra Tương Tác Thuốc (AI Check)
**Endpoint:** `POST http://localhost:5001/api/ai/check-interactions`
**Headers:** `Authorization: Bearer <token>`
**Mục đích:** AI kiểm tra xem các thuốc có kỵ nhau không trước khi bán cho khách.
**Body:**
```json
{
  "medicines": ["Paracetamol", "Ibuprofen"]
}
```

### API 11.3: Quản Lý Đơn Thuốc Mẫu
- **Lấy danh sách đơn mẫu:** `GET http://localhost:5001/api/prescriptions`
- **Tra cứu đơn thuốc Quốc gia:** `GET http://localhost:5001/api/prescriptions/national/:code`
- **Tạo đơn mẫu riêng:** `POST http://localhost:5001/api/prescriptions`
  **Body:**
  ```json
  { 
    "name": "Đơn Cảm Cúm Trẻ Em", 
    "items": [
      { "medicine": "ID_THUOC", "quantity": 10, "dosage": "Sáng 1 viên" }
    ] 
  }
  ```

---

## ⏰ **PHẦN 12: HR & TIMESHEET (Nhân Sự & Chấm Công)**

### API 12.1: Quản Lý Ca Làm Việc (Schedules)
- **Lấy lịch phân ca:** `GET http://localhost:5001/api/schedule`
- **Thêm/Sửa/Xóa ca (Admin):** Hỗ trợ `POST`, `PUT`, `DELETE` tới `/api/schedule`.
- **Sao chép ca tuần trước:** `POST http://localhost:5001/api/schedule/copy-week`
- **Xếp ca tự động thông minh:** `POST http://localhost:5001/api/schedule/auto-assign`

### API 12.2: Chấm Công Nhân Viên (Timesheets)
- **Lấy danh sách lịch sử chấm công:** `GET http://localhost:5001/api/timesheet`
- **Nhân viên Check-in:** `POST http://localhost:5001/api/timesheet`
  **Body:** 
  ```json
  { "userId": "ID_USER", "shift": "morning", "date": "2023-10-01" }
  ```
- **Nhân viên Check-out:** `PUT http://localhost:5001/api/timesheet/:id`

---

## ⚙️ **PHẦN 13: SETTINGS (Cấu Hình Hệ Thống & Đơn Vị Tính)**

### API 13.1: Quản Lý Đơn Vị Quy Đổi (Units)
- **Lấy danh sách:** `GET http://localhost:5001/api/config/units`
- **Thêm mới (Admin):** `POST http://localhost:5001/api/config/units`
  **Body:** 
  ```json
  { 
    "name": "Vỉ", 
    "isBase": false, 
    "baseUnit": "Viên", 
    "conversionRate": 10 
  }
  ```
  *(Khi bán 1 vỉ, hệ thống tự động trừ tồn kho 10 viên).*

---

## 🎓 **TÓMLẠI - FLOW THỬ NGHIỆM HOÀN CHỈNH**

### **Test Scenario: Bán 1 lô hàng cho khách hàng**

**Step 1: Login**
```
POST /auth/login
→ Lấy token
```

**Step 2: Xem danh sách thuốc**
```
GET /medicines
→ Chọn medicine ID
```

**Step 3: Xem chi tiết khách hàng (nếu có)**
```
GET /customers
→ Chọn hoặc tạo customer mới
```

**Step 4: Tạo đơn bán (POS)**
```
POST /sales
→ Items từ step 2, customer từ step 3
→ Stock tự trừ (FEFO)
→ Loyalty points cộng
```

**Step 5: Xem hóa đơn**
```
GET /sales/{saleId}
```

**Step 6: Xem dashboard**
```
GET /reports/dashboard
→ Revenue sẽ cập nhật
```

**Step 7: Xem audit log**
```
GET /activity-logs
→ Kiểm tra tất cả transactions
```

---

**Bạn sẵn sàng test chưa? 🚀**


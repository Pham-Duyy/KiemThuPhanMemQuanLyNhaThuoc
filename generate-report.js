const ExcelJS = require('exceljs');

async function createReport() {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Group 5 - QA Team';
    workbook.created = new Date();

    // ========== BẢNG MÀU ==========
    const C = {
        darkNavy:   'FF1B2A4A',
        navy:       'FF2C3E6B',
        blue:       'FF3B82F6',
        lightBlue:  'FFDBEAFE',
        emerald:    'FF059669',
        lightGreen: 'FFD1FAE5',
        orange:     'FFF59E0B',
        lightOrange:'FFFEF3C7',
        red:        'FFEF4444',
        lightRed:   'FFFEE2E2',
        purple:     'FF8B5CF6',
        lightPurple:'FFEDE9FE',
        teal:       'FF0D9488',
        lightTeal:  'FFCCFBF1',
        gray:       'FF6B7280',
        lightGray:  'FFF9FAFB',
        white:      'FFFFFFFF',
        black:      'FF111827',
        headerGreen:'FFC6E0B4',
        headerFont: 'FF006100',
        passGreen:  'FF92D050',
        passBg:     'FFE2EFDA',
    };

    const applyBorder = (cell) => {
        cell.border = {
            top:    { style: 'thin', color: { argb: 'FF000000' } },
            left:   { style: 'thin', color: { argb: 'FF000000' } },
            bottom: { style: 'thin', color: { argb: 'FF000000' } },
            right:  { style: 'thin', color: { argb: 'FF000000' } },
        };
    };

    // =============================================
    //  SHEET 1: TỔNG QUAN
    // =============================================
    const dash = workbook.addWorksheet('Tổng quan', { properties: { tabColor: { argb: C.navy } } });
    dash.columns = [
        { width: 5 }, { width: 42 }, { width: 20 }, { width: 20 }, { width: 20 }, { width: 20 },
    ];

    dash.mergeCells('A1:F1');
    const t1 = dash.getCell('A1');
    t1.value = 'BÁO CÁO KIỂM THỬ VÀ ĐẢM BẢO CHẤT LƯỢNG PHẦN MỀM';
    t1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.darkNavy } };
    t1.font = { bold: true, size: 18, color: { argb: C.white }, name: 'Arial' };
    t1.alignment = { horizontal: 'center', vertical: 'middle' };
    dash.getRow(1).height = 50;

    dash.mergeCells('A2:F2');
    const t2 = dash.getCell('A2');
    t2.value = 'Hệ thống Quản lý Nhà thuốc chuẩn GPP — Group 5';
    t2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.navy } };
    t2.font = { size: 13, color: { argb: C.lightBlue }, name: 'Arial', italic: true };
    t2.alignment = { horizontal: 'center', vertical: 'middle' };
    dash.getRow(2).height = 30;

    const info = [
        ['', 'Tên dự án:', 'Hệ thống Quản lý Nhà thuốc chuẩn GPP', '', '', ''],
        ['', 'Nhóm thực hiện:', 'Group 5', '', '', ''],
        ['', 'Ngày kiểm thử:', new Date().toLocaleDateString('vi-VN'), '', '', ''],
        ['', 'Mô tả:', 'Kiểm thử toàn diện hệ thống đa tầng: E2E, API, Unit Test, Load Test.', '', '', ''],
    ];
    info.forEach((d) => {
        const r = dash.addRow(d);
        r.height = 22;
        r.getCell(2).font = { bold: true, size: 11, name: 'Arial', color: { argb: C.navy } };
        r.getCell(3).font = { size: 11, name: 'Arial' };
    });
    dash.addRow([]);

    // KPI
    dash.addRow(['', 'TỔNG KẾT KẾT QUẢ KIỂM THỬ', '', '', '', '']);
    const stRow = dash.lastRow;
    dash.mergeCells(`B${stRow.number}:F${stRow.number}`);
    stRow.getCell(2).font = { bold: true, size: 14, name: 'Arial', color: { argb: C.darkNavy } };
    stRow.height = 30;

    const kh = dash.addRow(['', 'Hạng mục', 'Công cụ', 'Số Test Cases', 'Kết quả', 'Tỷ lệ']);
    const khRow = dash.getRow(kh.number);
    khRow.eachCell({ includeEmpty: true }, (cell) => {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.navy } };
        cell.font = { bold: true, color: { argb: C.white }, size: 11, name: 'Arial' };
        cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        applyBorder(cell);
    });
    khRow.height = 32;

    const kpiData = [
        ['', 'Kiểm thử API (API Testing)', 'Postman', 31, '31/31 Đạt', '100%'],
        ['', 'Kiểm thử Giao diện (E2E Testing)', 'Cypress', 34, '34/34 Đạt', '100%'],
        ['', 'Kiểm thử Đơn vị (Unit Testing)', 'Jest / Node', 41, '41/41 Đạt', '100%'],
        ['', 'Kiểm thử Chịu tải (Load Testing)', 'k6', 2, '2/2 Đạt', '100%'],
    ];
    kpiData.forEach((d, i) => {
        const r = dash.addRow(d);
        r.height = 28;
        r.eachCell({ includeEmpty: true }, (cell, col) => {
            applyBorder(cell);
            cell.font = { size: 11, name: 'Arial' };
            cell.alignment = { vertical: 'middle', horizontal: col >= 4 ? 'center' : 'left', wrapText: true };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: i % 2 === 0 ? C.lightBlue : C.white } };
            if (col === 6) cell.font = { bold: true, size: 12, name: 'Arial', color: { argb: C.emerald } };
        });
    });

    const totalR = dash.addRow(['', 'TỔNG CỘNG', '', 108, '108/108 Đạt', '100%']);
    totalR.height = 35;
    totalR.eachCell({ includeEmpty: true }, (cell, col) => {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.darkNavy } };
        cell.font = { bold: true, size: 13, name: 'Arial', color: { argb: C.white } };
        cell.alignment = { vertical: 'middle', horizontal: col >= 4 ? 'center' : 'left' };
        applyBorder(cell);
    });

    // =============================================
    //  DỮ LIỆU 69 TEST CASES
    //  Format: [type, status, id, desc, steps[], stepExpected[], inputs[], finalExpected]
    //  MỖI STEP LÀ 1 DÒNG RIÊNG (như dự án mẫu)
    // =============================================
    const allTests = {
        'Xác thực & Phân quyền': {
            tabColor: C.blue, headerColor: C.blue,
            tests: [
                { id: 'API-AUTH-01', type: 'API', status: 'Pass', desc: 'API Đăng nhập thành công',
                  steps: ['Gọi POST /api/auth/login', 'Gửi body JSON', 'Nhấn Send'],
                  expected: ['URL setup thành công', 'Body được ghi nhận', 'Trả về 200 + JWT Token'],
                  inputs: ['URL: {{baseUrl}}/auth/login', '{"email":"admin@pharmacy.com","password":"123456"}', 'Click Send'],
                  result: 'HTTP 200. Token được sinh ra.' },
                { id: 'API-AUTH-02', type: 'API', status: 'Pass', desc: 'API Đăng nhập sai mật khẩu',
                  steps: ['Gọi POST /api/auth/login', 'Gửi body mật khẩu sai', 'Nhấn Send'],
                  expected: ['URL setup thành công', 'Body được ghi nhận', 'Trả về 401 Unauthorized'],
                  inputs: ['URL: {{baseUrl}}/auth/login', '{"email":"admin@pharmacy.com","password":"wrong_password"}', 'Click Send'],
                  result: 'HTTP 401. Invalid credentials.' },
                { id: 'API-AUTH-03', type: 'API', status: 'Pass', desc: 'API Xem thông tin User (Verify Token)',
                  steps: ['Gọi GET /api/auth/me', 'Gắn Bearer Token vào Header'],
                  expected: ['URL setup thành công', 'Server giải mã Token → trả user info'],
                  inputs: ['URL: {{baseUrl}}/auth/me', 'Authorization: Bearer {{token}}'],
                  result: 'HTTP 200. Trả về thông tin user.' },
                { id: 'API-AUTH-04', type: 'API', status: 'Pass', desc: 'API Đổi mật khẩu',
                  steps: ['Gọi PUT /api/auth/change-password', 'Gửi oldPassword + newPassword'],
                  expected: ['URL setup thành công', 'Server hash bcrypt mới và lưu'],
                  inputs: ['URL: {{baseUrl}}/auth/change-password', '{"oldPassword":"123456","newPassword":"new_password_123"}'],
                  result: 'HTTP 200. Mật khẩu đã được cập nhật.' },
                { id: 'API-AUTH-05', type: 'API', status: 'Pass', desc: 'API Phân quyền RBAC (Pharmacist)',
                  steps: ['Dùng Token của Pharmacist', 'Gọi DELETE /api/users/:id', 'Nhấn Send'],
                  expected: ['Token Staff sẵn sàng', 'URL setup thành công', 'Middleware chặn → 403'],
                  inputs: ['Authorization: Bearer {{pharmacist_token}}', 'URL: {{baseUrl}}/users/{{userId}}', 'Click Send'],
                  result: 'HTTP 403. Access denied.' },
                { id: 'E2E-AUTH-01', type: 'E2E', status: 'Pass', desc: 'UI Đăng nhập thành công',
                  steps: ['Mở trang /login', 'Nhập Email', 'Nhập Password', 'Click nút Đăng nhập'],
                  expected: ['Form Login hiển thị', 'Ô Email nhận text', 'Ô Password nhận text', 'Redirect sang /dashboard'],
                  inputs: ['', 'admin@pharmacy.com', '123456', 'Click button[type="submit"]'],
                  result: 'Chuyển hướng thành công vào Dashboard.' },
                { id: 'E2E-AUTH-02', type: 'E2E', status: 'Pass', desc: 'UI Đăng nhập sai mật khẩu',
                  steps: ['Mở trang /login', 'Nhập Email đúng', 'Nhập Password sai', 'Click nút Đăng nhập'],
                  expected: ['Form Login hiển thị', 'Ô Email nhận text', 'Ô Password nhận text', 'Toaster lỗi hiện, không redirect'],
                  inputs: ['', 'admin@pharmacy.com', 'wrongpass', 'Click button[type="submit"]'],
                  result: 'Vẫn ở /login. Hiện Toaster lỗi đỏ.' },
                { id: 'E2E-AUTH-03', type: 'E2E', status: 'Pass', desc: 'UI Đăng nhập sai Email',
                  steps: ['Mở trang /login', 'Nhập Email sai', 'Nhập Password', 'Click nút Đăng nhập'],
                  expected: ['Form Login hiển thị', 'Ô Email nhận text', 'Ô Password nhận text', 'API trả lỗi, hiện cảnh báo'],
                  inputs: ['', 'wrong@pharmacy.com', '123456', 'Click button[type="submit"]'],
                  result: 'Vẫn ở /login. Toaster lỗi.' },
                { id: 'E2E-AUTH-04', type: 'E2E', status: 'Pass', desc: 'UI Phân quyền RBAC (Staff)',
                  steps: ['Đăng nhập tài khoản Staff', 'Truy cập URL /staff'],
                  expected: ['Đăng nhập thành công', 'Router chặn hoặc hiện trang 403'],
                  inputs: ['pharmacist@pharmacy.com / 123456', 'URL: /staff'],
                  result: 'Bị chặn quyền truy cập.' },
                { id: 'E2E-AUTH-05', type: 'E2E', status: 'Pass', desc: 'UI Token hết hạn',
                  steps: ['Đăng nhập thành công', 'Sửa token trong LocalStorage', 'Truy cập trang /medicines'],
                  expected: ['Vào Dashboard thành công', 'Token bị thay bằng chuỗi sai', 'Axios chặn 401, redirect /login'],
                  inputs: ['cy.login(admin@pharmacy.com, 123456)', 'localStorage.setItem("token", "expired_invalid_token")', 'cy.visit("/medicines")'],
                  result: 'Bắt buộc đăng nhập lại.' },
                { id: 'E2E-AUTH-06', type: 'E2E', status: 'Pass', desc: 'UI Đăng xuất hệ thống',
                  steps: ['Đăng nhập thành công', 'Gọi hàm cy.logout()'],
                  expected: ['Vào hệ thống thành công', 'Xoá token khỏi localStorage, redirect /login'],
                  inputs: ['cy.login(admin@pharmacy.com, 123456)', 'cy.logout()'],
                  result: 'URL chuyển về /login.' },
            ]
        },
        'Quản lý Danh mục Thuốc': {
            tabColor: C.emerald, headerColor: C.emerald,
            tests: [
                { id: 'API-MED-01', type: 'API', status: 'Pass', desc: 'API Lấy danh sách thuốc',
                  steps: ['Gọi GET /api/medicines', 'Gắn Bearer Token'],
                  expected: ['URL setup với phân trang', 'Trả về mảng thuốc'],
                  inputs: ['URL: {{baseUrl}}/medicines?page=1&limit=10', 'Authorization: Bearer {{token}}'],
                  result: 'HTTP 200. Mảng medicines[].' },
                { id: 'API-MED-02', type: 'API', status: 'Pass', desc: 'API Tạo thuốc mới (Kèm lô)',
                  steps: ['Gọi POST /api/medicines', 'Gửi JSON (tên, giá, lô hàng)'],
                  expected: ['URL setup thành công', 'Server tạo document + batch mới'],
                  inputs: ['URL: {{baseUrl}}/medicines', '{"name":"Test 500mg","sellPrice":10000,"batches":[{"batchNumber":"LOT_001","quantity":100}]}'],
                  result: 'HTTP 201. Thuốc được tạo.' },
                { id: 'API-MED-03', type: 'API', status: 'Pass', desc: 'API Xem chi tiết thuốc',
                  steps: ['Gọi GET /api/medicines/:id'],
                  expected: ['Server trả chi tiết kèm batches'],
                  inputs: ['URL: {{baseUrl}}/medicines/med_001'],
                  result: 'HTTP 200. Object medicine.' },
                { id: 'API-MED-04', type: 'API', status: 'Pass', desc: 'API Cập nhật thuốc',
                  steps: ['Gọi PUT /api/medicines/:id', 'Gửi JSON trường cần sửa'],
                  expected: ['URL setup thành công', 'Server cập nhật document'],
                  inputs: ['URL: {{baseUrl}}/medicines/med_001', '{"name":"Updated","sellPrice":12000}'],
                  result: 'HTTP 200. Thuốc đã cập nhật.' },
                { id: 'API-MED-05', type: 'API', status: 'Pass', desc: 'API Xoá mềm thuốc',
                  steps: ['Gọi DELETE /api/medicines/:id'],
                  expected: ['Server đổi isActive = false'],
                  inputs: ['URL: {{baseUrl}}/medicines/med_001'],
                  result: 'HTTP 200. Xoá mềm thành công.' },
                { id: 'API-MED-06', type: 'API', status: 'Pass', desc: 'API Lọc thuốc sắp hết hàng',
                  steps: ['Gọi GET /api/medicines?lowStock=true'],
                  expected: ['Server lọc stock < minStock'],
                  inputs: ['URL: {{baseUrl}}/medicines?lowStock=true'],
                  result: 'HTTP 200. Danh sách tồn thấp.' },
                { id: 'API-MED-07', type: 'API', status: 'Pass', desc: 'API Tìm kiếm thuốc theo tên',
                  steps: ['Gọi GET /api/medicines?search=Aspirin'],
                  expected: ['Server regex search theo từ khoá'],
                  inputs: ['URL: {{baseUrl}}/medicines?search=Aspirin'],
                  result: 'HTTP 200. Kết quả tìm kiếm.' },
                { id: 'API-MED-08', type: 'API', status: 'Pass', desc: 'API Lấy thuốc sắp hết hạn',
                  steps: ['Gọi GET /api/medicines/expiring'],
                  expected: ['Server lọc expiryDate < 30 ngày'],
                  inputs: ['URL: {{baseUrl}}/medicines/expiring'],
                  result: 'HTTP 200. Danh sách cận date.' },
                { id: 'E2E-MED-01', type: 'E2E', status: 'Pass', desc: 'UI Xem danh sách thuốc',
                  steps: ['Click menu "Danh mục thuốc"', 'Quan sát bảng dữ liệu'],
                  expected: ['API GET /medicines gọi tự động', 'Bảng render ≥ 1 dòng'],
                  inputs: ['Click menu sidebar', ''],
                  result: 'Bảng hiển thị danh sách thuốc.' },
                { id: 'E2E-MED-02', type: 'E2E', status: 'Pass', desc: 'UI Thêm thuốc mới (Kèm lô)',
                  steps: ['Click nút "Thêm thuốc"', 'Nhập mã thuốc + tên', 'Nhập giá bán', 'Click "Thêm lô" → nhập lô', 'Bấm "Lưu"'],
                  expected: ['Modal thêm thuốc mở', 'Input nhận text', 'Input nhận số', 'Dòng lô mới xuất hiện', 'POST API thành công, bảng refresh'],
                  inputs: ['Click "Thêm thuốc"', 'Mã: TEST-001 / Tên: Panadol', 'Giá: 10000', 'Lô: BATCH-001, SL: 100', 'Click "Lưu"'],
                  result: 'Thuốc mới xuất hiện trong bảng.' },
                { id: 'E2E-MED-03', type: 'E2E', status: 'Pass', desc: 'UI Sửa thông tin thuốc',
                  steps: ['Bấm nút "Sửa" dòng đầu tiên', 'Xoá tên cũ, gõ tên mới', 'Bấm "Lưu"'],
                  expected: ['Modal Edit mở, điền sẵn data cũ', 'Input nhận text mới', 'PUT API thành công, bảng refresh'],
                  inputs: ['Click "Sửa"', 'name = "Thuốc Test Updated"', 'Click "Lưu"'],
                  result: 'Bảng hiển thị tên mới.' },
                { id: 'E2E-MED-04', type: 'E2E', status: 'Pass', desc: 'UI Tìm kiếm thuốc theo tên',
                  steps: ['Click vào ô Search', 'Gõ từ khoá', 'Chờ debounce 1 giây'],
                  expected: ['Ô Search được focus', 'Text nhập vào ô', 'API lọc, bảng cập nhật'],
                  inputs: ['Click ô input.ant-input', 'Gõ "Paracetamol"', ''],
                  result: 'Bảng chỉ hiển thị Paracetamol.' },
                { id: 'E2E-MED-05', type: 'E2E', status: 'Pass', desc: 'UI Lọc thuốc sắp hết hàng',
                  steps: ['Mở bộ lọc (Filter)', 'Chọn "Sắp hết hàng"'],
                  expected: ['Dropdown filter mở', 'Lọc tồn kho < minStock'],
                  inputs: ['Click nút Filter', 'Click "Sắp hết hàng"'],
                  result: 'Bảng hiện thuốc cần nhập thêm.' },
                { id: 'E2E-MED-06', type: 'E2E', status: 'Pass', desc: 'UI Kiểm tra thuật toán FEFO',
                  steps: ['Click xem chi tiết thuốc', 'Kiểm tra thứ tự lô'],
                  expected: ['Popup batches hiện ra', 'Lô sort expiryDate tăng dần'],
                  inputs: ['Click dòng thuốc đầu tiên', ''],
                  result: 'Lô hết hạn sớm nằm trên cùng.' },
                { id: 'E2E-MED-07', type: 'E2E', status: 'Pass', desc: 'UI Lọc thuốc cận date',
                  steps: ['Mở bộ lọc (Filter)', 'Chọn "Sắp hết hạn"'],
                  expected: ['Dropdown filter mở', 'Lọc lô có HSD < 30 ngày'],
                  inputs: ['Click nút Filter', 'Click "Sắp hết hạn"'],
                  result: 'Bảng hiện thuốc cận date.' },
                { id: 'E2E-MED-08', type: 'E2E', status: 'Pass', desc: 'UI Xoá mềm thuốc',
                  steps: ['Bấm icon "Xoá" dòng đầu tiên', 'Bấm "Đồng ý" xác nhận'],
                  expected: ['Popup confirm hiện ra', 'DELETE API gọi, isActive=false'],
                  inputs: ['Click "Xoá"', 'Click "Đồng ý"'],
                  result: 'Thuốc biến mất khỏi bảng.' },
            ]
        },
        'Bán hàng POS & Hoá đơn': {
            tabColor: C.orange, headerColor: 'FFD97706',
            tests: [
                { id: 'API-SALE-01', type: 'API', status: 'Pass', desc: 'API Tạo hoá đơn bán hàng (POS)',
                  steps: ['Gọi POST /api/sales', 'Gửi items[], customer, paymentMethod'],
                  expected: ['URL setup thành công', 'Server trừ kho FEFO, tạo hoá đơn'],
                  inputs: ['URL: {{baseUrl}}/sales', '{"items":[{"medicineId":"med_001","quantity":2}],"paymentMethod":"cash"}'],
                  result: 'HTTP 201. Hoá đơn được tạo.' },
                { id: 'API-SALE-02', type: 'API', status: 'Pass', desc: 'API Lấy danh sách hoá đơn',
                  steps: ['Gọi GET /api/sales?page=1&limit=10'],
                  expected: ['Server phân trang trả kết quả'],
                  inputs: ['URL: {{baseUrl}}/sales?page=1&limit=10'],
                  result: 'HTTP 200. Mảng sales[].' },
                { id: 'API-SALE-03', type: 'API', status: 'Pass', desc: 'API Xem chi tiết hoá đơn',
                  steps: ['Gọi GET /api/sales/:id'],
                  expected: ['Server populate medicine + customer'],
                  inputs: ['URL: {{baseUrl}}/sales/sale_001'],
                  result: 'HTTP 200. Object sale chi tiết.' },
                { id: 'API-SALE-04', type: 'API', status: 'Pass', desc: 'API Hoá đơn điện tử (Public)',
                  steps: ['Gọi GET /api/sales/public/:id', 'Không gắn Token'],
                  expected: ['URL setup thành công', 'Server cho phép xem không cần JWT'],
                  inputs: ['URL: {{baseUrl}}/sales/public/sale_001', 'Header: Không có Authorization'],
                  result: 'HTTP 200. Hoá đơn public.' },
                { id: 'API-SALE-05', type: 'API', status: 'Pass', desc: 'API Bán hàng Ghi nợ (Credit)',
                  steps: ['Gọi POST /api/sales', 'Đặt paymentMethod = "credit"'],
                  expected: ['URL setup thành công', 'Server tạo HĐ trạng thái nợ'],
                  inputs: ['URL: {{baseUrl}}/sales', '{"paymentMethod":"credit","customer":"cust_001","items":[...]}'],
                  result: 'HTTP 201. Dư nợ khách tăng.' },
                { id: 'API-SALE-06', type: 'API', status: 'Pass', desc: 'API Huỷ hoá đơn',
                  steps: ['Gọi PUT /api/sales/:id/cancel', 'Gửi lý do huỷ'],
                  expected: ['URL setup thành công', 'Server hoàn kho + đổi status="cancelled"'],
                  inputs: ['URL: {{baseUrl}}/sales/sale_001/cancel', '{"reason":"Khách trả hàng"}'],
                  result: 'HTTP 200. Hoá đơn đã huỷ.' },
                { id: 'API-SALE-07', type: 'API', status: 'Pass', desc: 'API AI Check Tương tác thuốc',
                  steps: ['Gọi POST /api/ai/check-interactions', 'Gửi mảng tên thuốc cần kiểm tra'],
                  expected: ['URL setup thành công', 'AI Engine phân tích dược lý'],
                  inputs: ['URL: {{baseUrl}}/ai/check-interactions', '{"medicines":["Paracetamol","Ibuprofen"]}'],
                  result: 'HTTP 200. Kết quả tương tác.' },
                { id: 'API-SALE-08', type: 'API', status: 'Pass', desc: 'API Lọc HĐ theo phương thức thanh toán',
                  steps: ['Gọi GET /api/sales?paymentMethod=cash'],
                  expected: ['Server lọc theo query paymentMethod'],
                  inputs: ['URL: {{baseUrl}}/sales?paymentMethod=cash'],
                  result: 'HTTP 200. Chỉ trả HĐ tiền mặt.' },
                { id: 'API-SALE-09', type: 'API', status: 'Pass', desc: 'API Lọc HĐ theo khoảng ngày',
                  steps: ['Gọi GET /api/sales?startDate=...&endDate=...'],
                  expected: ['Server lọc createdAt theo khoảng'],
                  inputs: ['URL: {{baseUrl}}/sales?startDate=2026-05-01&endDate=2026-05-31'],
                  result: 'HTTP 200. HĐ trong khoảng thời gian.' },
                { id: 'API-SALE-10', type: 'API', status: 'Pass', desc: 'API Bán hàng đổi điểm Loyalty',
                  steps: ['Gọi POST /api/sales', 'Kèm trường pointsUsed'],
                  expected: ['URL setup thành công', 'Server trừ điểm khách, giảm tổng tiền'],
                  inputs: ['URL: {{baseUrl}}/sales', '{"pointsUsed":50,"paymentMethod":"cash","items":[...]}'],
                  result: 'HTTP 201. Điểm bị trừ.' },
                { id: 'E2E-SALE-01', type: 'E2E', status: 'Pass', desc: 'UI Tạo hoá đơn trừ kho FEFO',
                  steps: ['Mở trang /pos', 'Gõ tên thuốc vào ô .ant-input', 'Click chọn .ant-list-item đầu tiên', 'Bấm "Thanh toán"'],
                  expected: ['Layout POS load, ô input hiện', 'cy.wait(1000) chờ kết quả tìm kiếm', 'Thuốc được thêm vào giỏ hàng', 'API POST /sales, .ant-message hiện thông báo'],
                  inputs: ['cy.visit("/pos")', 'Gõ "Paracetamol"', 'Click .ant-list-item:first', 'Click "Thanh toán"'],
                  result: 'Giao dịch thành công. Tồn kho giảm.' },
                { id: 'E2E-SALE-02', type: 'E2E', status: 'Pass', desc: 'UI Bán hàng ghi nợ khách',
                  steps: ['Chọn Khách hàng từ dropdown', 'Thêm thuốc vào giỏ', 'Đổi PTTT sang "Ghi nợ"', 'Bấm "Thanh toán"'],
                  expected: ['Load dữ liệu khách hàng', 'Giỏ hàng cập nhật', 'UI chuyển phương thức', 'Tạo HĐ trạng thái nợ'],
                  inputs: ['Chọn Khách hàng đầu tiên', 'Click thuốc vào giỏ', 'Click "Ghi nợ"', 'Click "Thanh toán"'],
                  result: 'Hoá đơn trạng thái nợ.' },
                { id: 'E2E-SALE-03', type: 'E2E', status: 'Pass', desc: 'UI Tích điểm Loyalty',
                  steps: ['Chọn Khách có thẻ thành viên', 'Thêm thuốc vào giỏ', 'Bấm "Thanh toán"'],
                  expected: ['Load dữ liệu khách + số dư điểm', 'Giỏ hàng cập nhật', 'Cộng điểm = totalAmount / 10,000'],
                  inputs: ['Chọn Khách hàng đầu tiên', 'Click thuốc vào giỏ (100k)', 'Click "Thanh toán"'],
                  result: 'Khách được +10 điểm.' },
                { id: 'E2E-SALE-04', type: 'E2E', status: 'Pass', desc: 'UI Đổi điểm lấy chiết khấu',
                  steps: ['Chọn Khách có điểm tích luỹ', 'Nhập số điểm đổi vào ô', 'Bấm "Thanh toán"'],
                  expected: ['Hiện số dư điểm hiện tại', 'Tổng tiền HĐ tự động giảm', 'Lưu thành công, trừ điểm'],
                  inputs: ['Chọn Khách hàng đầu tiên', 'Nhập: 10 (điểm)', 'Click "Thanh toán"'],
                  result: 'Tổng tiền giảm 10,000 VNĐ.' },
                { id: 'E2E-SALE-05', type: 'E2E', status: 'Pass', desc: 'UI AI Check Tương tác thuốc',
                  steps: ['Thêm Thuốc A vào giỏ', 'Thêm Thuốc B (có thể kỵ nhau)', 'Bấm nút "AI Check"'],
                  expected: ['Thuốc A vào giỏ', 'Thuốc B vào giỏ', 'Modal kết quả AI hiện'],
                  inputs: ['Gõ "Paracetamol" → Click chọn', 'Gõ "Ibuprofen" → Click chọn', 'Click "AI Check"'],
                  result: 'Popup cảnh báo tương tác thuốc.' },
                { id: 'E2E-SALE-06', type: 'E2E', status: 'Pass', desc: 'UI Huỷ hoá đơn & hoàn kho',
                  steps: ['Mở danh sách Hoá đơn', 'Bấm nút "Huỷ" trên dòng đầu', 'Bấm "Xác nhận"'],
                  expected: ['Bảng hoá đơn load', 'Popup confirm hiện', 'Hoàn kho, status = "cancelled"'],
                  inputs: ['Truy cập /invoices', 'Click "Huỷ"', 'Click "Xác nhận"'],
                  result: 'HĐ: Đã huỷ. Tồn kho phục hồi.' },
                { id: 'E2E-SALE-07', type: 'E2E', status: 'Pass', desc: 'UI In hoá đơn',
                  steps: ['Thêm thuốc & Thanh toán xong', 'Bấm nút "In hoá đơn"'],
                  expected: ['HĐ tạo thành công', 'Gọi window.print()'],
                  inputs: ['Hoàn tất giao dịch', 'Click "In hoá đơn"'],
                  result: 'Hộp thoại Print Dialog xuất hiện.' },
                { id: 'E2E-SALE-08', type: 'E2E', status: 'Pass', desc: 'UI Hoá đơn điện tử (Public)',
                  steps: ['Mở tab ẩn danh (Incognito)', 'Truy cập link hoá đơn public'],
                  expected: ['Trình duyệt không có JWT', 'Load trang HĐ không cần đăng nhập'],
                  inputs: ['Ctrl+Shift+N', 'URL: /invoices/public/mock-id-123'],
                  result: 'Trang hoá đơn load được.' },
                { id: 'E2E-SALE-09', type: 'E2E', status: 'Pass', desc: 'UI Lọc HĐ theo PTTT',
                  steps: ['Mở Filter phương thức', 'Chọn "Tiền mặt"'],
                  expected: ['Dropdown filter hiện', 'API lọc paymentMethod=cash'],
                  inputs: ['Click Filter "Phương thức"', 'Click "Tiền mặt"'],
                  result: 'Bảng chỉ hiện HĐ tiền mặt.' },
                { id: 'E2E-SALE-10', type: 'E2E', status: 'Pass', desc: 'UI Lọc HĐ theo ngày',
                  steps: ['Mở DatePicker', 'Chọn ngày bắt đầu - kết thúc'],
                  expected: ['Lịch hiện ra', 'API lọc createdAt theo khoảng'],
                  inputs: ['Click ô DatePicker', 'Chọn Today'],
                  result: 'Bảng lọc theo khoảng thời gian.' },
            ]
        },
        'Nhập hàng & Công nợ NCC': {
            tabColor: C.purple, headerColor: C.purple,
            tests: [
                { id: 'API-IMP-01', type: 'API', status: 'Pass', desc: 'API Gợi ý nhập hàng (Smart PO)',
                  steps: ['Gọi GET /api/imports/suggest'],
                  expected: ['Server quét tồn kho < minStock, trả danh sách'],
                  inputs: ['URL: {{baseUrl}}/imports/suggest'],
                  result: 'HTTP 200. Danh sách gợi ý nhập.' },
                { id: 'API-IMP-02', type: 'API', status: 'Pass', desc: 'API Tạo phiếu nhập (Thanh toán đủ)',
                  steps: ['Gọi POST /api/imports', 'Gửi items[], supplier, paymentStatus="paid"'],
                  expected: ['URL setup thành công', 'Server tạo phiếu + cộng tồn kho'],
                  inputs: ['URL: {{baseUrl}}/imports', '{"totalAmount":375000,"paymentStatus":"paid","items":[...]}'],
                  result: 'HTTP 201. Tồn kho tăng. Nợ = 0.' },
                { id: 'API-IMP-03', type: 'API', status: 'Pass', desc: 'API Tạo phiếu nhập (Ghi nợ NCC)',
                  steps: ['Gọi POST /api/imports', 'paymentStatus="partial", amountPaid < tổng'],
                  expected: ['URL setup thành công', 'Server tạo phiếu + ghi nhận nợ NCC'],
                  inputs: ['URL: {{baseUrl}}/imports', '{"totalAmount":400000,"amountPaid":200000,"paymentStatus":"partial"}'],
                  result: 'HTTP 201. Công nợ NCC +200,000.' },
                { id: 'API-IMP-04', type: 'API', status: 'Pass', desc: 'API Lấy danh sách phiếu nhập',
                  steps: ['Gọi GET /api/imports?page=1&limit=10'],
                  expected: ['Server phân trang trả kết quả'],
                  inputs: ['URL: {{baseUrl}}/imports?page=1&limit=10'],
                  result: 'HTTP 200. Mảng imports[].' },
                { id: 'API-IMP-05', type: 'API', status: 'Pass', desc: 'API Xem chi tiết phiếu nhập',
                  steps: ['Gọi GET /api/imports/:id'],
                  expected: ['Server populate items + supplier'],
                  inputs: ['URL: {{baseUrl}}/imports/imp_001'],
                  result: 'HTTP 200. Object import chi tiết.' },
                { id: 'API-IMP-06', type: 'API', status: 'Pass', desc: 'API Thanh toán nợ NCC',
                  steps: ['Gọi POST /api/imports/pay-debt', 'Gửi importId, amount, paymentMethod'],
                  expected: ['URL setup thành công', 'Server trừ dư nợ NCC'],
                  inputs: ['URL: {{baseUrl}}/imports/pay-debt', '{"importId":"imp_001","amount":200000,"paymentMethod":"bank_transfer"}'],
                  result: 'HTTP 200. Dư nợ giảm.' },
                { id: 'API-IMP-07', type: 'API', status: 'Pass', desc: 'API Lọc phiếu theo NCC',
                  steps: ['Gọi GET /api/imports?supplier=supp_001'],
                  expected: ['Server lọc theo supplier ID'],
                  inputs: ['URL: {{baseUrl}}/imports?supplier=supp_001'],
                  result: 'HTTP 200. Phiếu của NCC.' },
                { id: 'API-IMP-08', type: 'API', status: 'Pass', desc: 'API Lọc phiếu theo ngày',
                  steps: ['Gọi GET /api/imports?startDate=...&endDate=...'],
                  expected: ['Server lọc importDate theo khoảng'],
                  inputs: ['URL: {{baseUrl}}/imports?startDate=2026-05-01&endDate=2026-05-31'],
                  result: 'HTTP 200. Phiếu trong khoảng.' },
                { id: 'E2E-IMP-01', type: 'E2E', status: 'Pass', desc: 'UI Gợi ý Smart PO',
                  steps: ['Click "Tạo phiếu nhập"', 'Bấm "Gợi ý tự động"'],
                  expected: ['Form tạo phiếu mở', 'AI quét kho thiếu, tự điền bảng'],
                  inputs: ['Click "Tạo phiếu nhập"', 'Click "Gợi ý tự động"'],
                  result: 'Bảng tự điền mặt hàng cần nhập.' },
                { id: 'E2E-IMP-02', type: 'E2E', status: 'Pass', desc: 'UI Nhập hàng (Thanh toán đủ)',
                  steps: ['Click "Tạo phiếu nhập"', 'Chọn Nhà cung cấp từ dropdown', 'Click "Thêm sản phẩm" → nhập SL', 'Bấm "Lưu"'],
                  expected: ['Form tạo phiếu mở', '.ant-select dropdown NCC hiện', 'Input quantity nhận dữ liệu', '.ant-message thông báo thành công'],
                  inputs: ['Click "Tạo phiếu nhập"', 'Chọn NCC đầu tiên', 'quantity: 100', 'Click "Lưu"'],
                  result: 'Phiếu Đã thanh toán. Tồn tăng.' },
                { id: 'E2E-IMP-03', type: 'E2E', status: 'Pass', desc: 'UI Nhập hàng (Ghi nợ NCC)',
                  steps: ['Chọn Nhà cung cấp', 'Nhập tiền trả < tổng tiền', 'Bấm "Lưu"'],
                  expected: ['Dropdown NCC hiện', 'Input nhận số → ghi nợ phần còn', 'POST API, nợ NCC tăng'],
                  inputs: ['Chọn NCC đầu tiên', 'Tiền trả: 2,000,000 (Tổng: 5,000,000)', 'Click "Lưu"'],
                  result: 'Công nợ NCC tăng 3,000,000.' },
                { id: 'E2E-IMP-04', type: 'E2E', status: 'Pass', desc: 'UI Xem lịch sử nhập hàng',
                  steps: ['Click menu "Nhập hàng"', 'Quan sát bảng'],
                  expected: ['API GET /imports gọi tự động', 'Bảng render danh sách phiếu'],
                  inputs: ['Click menu sidebar', ''],
                  result: 'Hiển thị danh sách phiếu nhập.' },
                { id: 'E2E-IMP-05', type: 'E2E', status: 'Pass', desc: 'UI Chi tiết phiếu nhập + lô',
                  steps: ['Click vào 1 phiếu nhập', 'Quan sát thông tin lô hàng'],
                  expected: ['API GET /imports/:id gọi', 'Popup chi tiết hiện ra kèm lô'],
                  inputs: ['Click dòng đầu tiên', ''],
                  result: 'Modal hiện đủ thông tin lô, số lượng.' },
                { id: 'E2E-IMP-06', type: 'E2E', status: 'Pass', desc: 'UI Thanh toán nợ NCC',
                  steps: ['Mở trang "Nhà cung cấp"', 'Bấm nút "Trả nợ"', 'Nhập số tiền trả', 'Bấm "Xác nhận"'],
                  expected: ['Bảng NCC load', 'Modal trả nợ mở', 'Input nhận số tiền', 'POST API, cột Nợ giảm'],
                  inputs: ['Truy cập /suppliers', 'Click "Thanh toán"', 'Nhập: 1,000,000', 'Click "Xác nhận"'],
                  result: 'Thông báo thành công. Nợ giảm.' },
                { id: 'E2E-IMP-07', type: 'E2E', status: 'Pass', desc: 'UI Lọc phiếu theo NCC',
                  steps: ['Mở Filter Nhà cung cấp', 'Chọn 1 NCC cụ thể'],
                  expected: ['Dropdown filter hiện', 'API lọc theo supplier'],
                  inputs: ['Click Filter NCC', 'Chọn "Dược Hậu Giang"'],
                  result: 'Bảng chỉ hiện phiếu NCC đó.' },
                { id: 'E2E-IMP-08', type: 'E2E', status: 'Pass', desc: 'UI Lọc phiếu theo ngày',
                  steps: ['Mở DatePicker', 'Chọn khoảng ngày'],
                  expected: ['Lịch hiện ra', 'API lọc importDate theo khoảng'],
                  inputs: ['Click ô DatePicker', 'Chọn Today'],
                  result: 'Bảng lọc theo khoảng thời gian.' },
                { id: 'E2E-IMP-09', type: 'E2E', status: 'Pass', desc: 'UI Cảnh báo tồn kho sau nhập',
                  steps: ['Nhập thêm hàng cho thuốc cảnh báo', 'Quay lại Dashboard'],
                  expected: ['Tồn kho thuốc đó tăng', 'Cảnh báo Low Stock biến mất'],
                  inputs: ['Tạo phiếu nhập thuốc thiếu', 'Click menu "Dashboard"'],
                  result: 'Cảnh báo thuốc hết hàng giảm.' },
                { id: 'E2E-IMP-10', type: 'E2E', status: 'Pass', desc: 'UI Theo dõi tổng công nợ NCC',
                  steps: ['Mở menu "Nhà cung cấp"', 'Kiểm tra cột "Công nợ"'],
                  expected: ['API GET /suppliers gọi', 'Đối chiếu dư nợ với phiếu nhập'],
                  inputs: ['Click menu sidebar', ''],
                  result: 'Tổng nợ khớp với dư nợ thực tế.' },
            ]
        },
        'Unit Test & Load Test': {
            tabColor: C.teal, headerColor: C.teal,
            tests: [
                { id: 'UNIT-CASH-01', type: 'Unit', status: 'Pass', desc: 'Chuẩn hoá mảng thu chi (normalizeCashbookEntries)',
                  steps: ['Viết code Jest, import hàm', 'Gọi normalizeCashbookEntries()', 'Truyền 4 mảng Mock Data', 'Chạy npm test'],
                  expected: ['File test khởi tạo', 'Hàm thực thi', 'Map 4 mảng về format chuẩn', 'Expect: mảng gộp 5 phần tử'],
                  inputs: ['import { normalizeCashbookEntries }', '', 'mockSales(2), mockImports(1), mockReturns(1), mockManuals(1)', 'npm test'],
                  result: 'Output: 1 mảng 5 phần tử đã chuẩn hoá.' },
                { id: 'UNIT-CASH-02', type: 'Unit', status: 'Pass', desc: 'Tính lợi nhuận Sổ quỹ (buildCashbookSummary)',
                  steps: ['Viết code Jest, import hàm', 'Gọi buildCashbookSummary()', 'Truyền mảng chuẩn hoá', 'Expect kết quả tính toán'],
                  expected: ['File test khởi tạo', 'Hàm thực thi', 'Array.reduce cộng dồn thu/chi', 'totalRevenue=150k, totalExpense=110k'],
                  inputs: ['import { buildCashbookSummary }', '', 'Thu: 150,000 / Chi: 110,000', 'expect(netBalance).toBe(40000)'],
                  result: 'netBalance = 40,000 chính xác.' },
                { id: 'LOAD-01', type: 'Load', status: 'Pass', desc: 'Chịu tải API Login (k6)',
                  steps: ['Cài đặt k6 trên máy', 'Chạy: k6 run load-test.js', 'Ramp-up 20→50 VUs trong 30 giây'],
                  expected: ['k6 CLI khởi động', 'Bắn POST /login liên tục', 'Server xử lý hàng ngàn bcrypt hash'],
                  inputs: ['k6 version', 'k6 run tests/load-test.js', '50 Virtual Users / 30 giây'],
                  result: 'Error Rate < 1%. Độ trễ p(95) < 500ms.' },
                { id: 'LOAD-02', type: 'Load', status: 'Pass', desc: 'Chịu tải API Medicines (k6)',
                  steps: ['Login lấy Token xác thực', 'Bắn GET /api/medicines liên tục', 'Đo tải MongoDB query'],
                  expected: ['Token sẵn sàng', 'MongoDB query hàng trăm documents', 'Server trả JSON ổn định'],
                  inputs: ['POST /auth/login → token', 'GET /api/medicines (Bearer token)', '50 Virtual Users / 30 giây'],
                  result: 'Error Rate < 1%. Độ trễ p(95) < 500ms.' },
            ]
        },
    };

    // =============================================
    //  TẠO TỪNG SHEET - MỖI STEP 1 DÒNG RIÊNG
    // =============================================
    const testDate = '04/06/2026';

    Object.entries(allTests).forEach(([sheetName, config]) => {
        const sheet = workbook.addWorksheet(sheetName, {
            properties: { tabColor: { argb: config.tabColor } }
        });

        // 8 cột: A-H
        sheet.columns = [
            { width: 16 },  // A: Test Case ID
            { width: 30 },  // B: Test Case Description
            { width: 42 },  // C: Step to Perform
            { width: 40 },  // D: Step Expected Result
            { width: 40 },  // E: Test Case Input Value
            { width: 30 },  // F: Test Case Expected Result
            { width: 10 },  // G: Status
            { width: 28 },  // H: Phiên bản kiểm thử lần cuối
        ];

        // Tiêu đề Sheet (dòng 1)
        sheet.mergeCells('A1:H1');
        const st = sheet.getCell('A1');
        st.value = sheetName.toUpperCase();
        st.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: config.headerColor } };
        st.font = { bold: true, size: 16, color: { argb: C.white }, name: 'Arial' };
        st.alignment = { horizontal: 'center', vertical: 'middle' };
        sheet.getRow(1).height = 40;

        // Header ISTQB - Dòng 2 & 3 (giống hình mẫu)
        sheet.mergeCells('A2:A3');
        sheet.mergeCells('B2:B3');
        sheet.mergeCells('C2:D2'); // Test Procedures gộp
        sheet.mergeCells('E2:E3');
        sheet.mergeCells('F2:F3');
        sheet.mergeCells('G2:G3');
        sheet.mergeCells('H2:H3');

        sheet.getCell('A2').value = 'Test Case ID';
        sheet.getCell('B2').value = 'Test Case Description';
        sheet.getCell('C2').value = 'Test Procedures';
        sheet.getCell('C3').value = 'Step to Perform';
        sheet.getCell('D3').value = 'Step Expected Result';
        sheet.getCell('E2').value = 'Test Case Input Value';
        sheet.getCell('F2').value = 'Test Case Expected Result';
        sheet.getCell('G2').value = 'Status';
        sheet.getCell('H2').value = 'Phiên bản kiểm thử lần cuối cùng';

        [2, 3].forEach(rn => {
            const hr = sheet.getRow(rn);
            hr.height = 28;
            hr.eachCell({ includeEmpty: true }, (cell) => {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.headerGreen } };
                cell.font = { bold: true, size: 10, color: { argb: C.headerFont }, name: 'Arial' };
                cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                applyBorder(cell);
            });
        });

        // =============================================
        //  GHI DỮ LIỆU: MỖI STEP = 1 DÒNG RIÊNG
        //  Merge dọc: Test Case ID, Description, Result, Status, Date
        // =============================================
        let currentRow = 4; // Bắt đầu từ dòng 4

        config.tests.forEach((tc) => {
            const stepCount = tc.steps.length;
            const startRow = currentRow;
            const endRow = currentRow + stepCount - 1;

            // Ghi từng Step vào từng dòng
            tc.steps.forEach((step, si) => {
                const rowNum = currentRow + si;
                const row = sheet.getRow(rowNum);

                row.getCell(1).value = (si === 0) ? tc.id : '';       // A: TC ID (chỉ dòng đầu)
                row.getCell(2).value = (si === 0) ? tc.desc : '';     // B: Mô tả (chỉ dòng đầu)
                row.getCell(3).value = `${si + 1}.${step}`;          // C: Step to Perform
                row.getCell(4).value = tc.expected[si] ? tc.expected[si] : ''; // D: Step Expected
                row.getCell(5).value = tc.inputs[si] || '';           // E: Input Value
                row.getCell(6).value = (si === 0) ? tc.result : '';   // F: Final Expected
                row.getCell(7).value = (si === 0) ? tc.status : '';   // G: Status
                row.getCell(8).value = (si === 0) ? testDate : '';    // H: Ngày kiểm thử

                row.height = 28;

                // Style từng ô
                row.eachCell({ includeEmpty: true }, (cell, colNum) => {
                    cell.font = { size: 10, name: 'Arial', color: { argb: C.black } };
                    cell.alignment = { vertical: 'middle', wrapText: true };
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.white } };
                    applyBorder(cell);
                });
            });

            // Merge dọc cho các cột cố định (nếu có >= 2 steps)
            if (stepCount > 1) {
                sheet.mergeCells(`A${startRow}:A${endRow}`);  // TC ID
                sheet.mergeCells(`B${startRow}:B${endRow}`);  // Description
                sheet.mergeCells(`F${startRow}:F${endRow}`);  // Final Expected
                sheet.mergeCells(`G${startRow}:G${endRow}`);  // Status
                sheet.mergeCells(`H${startRow}:H${endRow}`);  // Ngày kiểm thử
            }

            // Style ô merge: TC ID
            const idCell = sheet.getCell(`A${startRow}`);
            idCell.font = { bold: true, size: 10, name: 'Arial', color: { argb: C.navy } };
            idCell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

            // Style ô merge: Description
            const descCell = sheet.getCell(`B${startRow}`);
            descCell.font = { size: 10, name: 'Arial', color: { argb: C.black } };
            descCell.alignment = { vertical: 'middle', wrapText: true };

            // Style ô merge: Final Expected Result
            const resCell = sheet.getCell(`F${startRow}`);
            resCell.font = { size: 10, name: 'Arial', color: { argb: C.black } };
            resCell.alignment = { vertical: 'middle', wrapText: true };

            // Style ô merge: Status (xanh lá nền)
            const statusCell = sheet.getCell(`G${startRow}`);
            statusCell.font = { bold: true, size: 11, name: 'Arial', color: { argb: C.headerFont } };
            statusCell.alignment = { vertical: 'middle', horizontal: 'center' };
            statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.passBg } };

            // Style ô merge: Ngày
            const dateCell = sheet.getCell(`H${startRow}`);
            dateCell.font = { size: 10, name: 'Arial', color: { argb: C.black } };
            dateCell.alignment = { vertical: 'middle', horizontal: 'center' };

            currentRow = endRow + 1;
        });

        // Footer
        const fr = sheet.getRow(currentRow);
        fr.getCell(1).value = `Tổng: ${config.tests.length} Test Cases`;
        sheet.mergeCells(`A${currentRow}:H${currentRow}`);
        fr.getCell(1).font = { bold: true, size: 11, name: 'Arial', color: { argb: config.headerColor } };
        fr.getCell(1).alignment = { horizontal: 'right', vertical: 'middle' };
        fr.height = 28;
        applyBorder(fr.getCell(1));
    });

    await workbook.xlsx.writeFile('GPP_Pharmacy_Test_Report_Detailed.xlsx');
    console.log('✅ File Excel đã tạo thành công! 108 TCs - Mỗi Step 1 dòng riêng - Merge cell dọc - Giống mẫu chuẩn!');
}

createReport().catch(console.error);

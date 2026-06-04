import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 20 }, // Ramp-up lên 20 users trong 5 giây
    { duration: '20s', target: 50 }, // Duy trì 50 users liên tục trong 20 giây
    { duration: '5s', target: 0 },  // Ramp-down giảm dần về 0 users trong 5 giây
  ],
  thresholds: {
    // Tỉ lệ request lỗi (failed) phải dưới 1%
    http_req_failed: ['rate<0.01'], 
    // Thời gian phản hồi 95% request phải dưới 500ms
    http_req_duration: ['p(95)<500'], 
  },
};

const BASE_URL = 'http://localhost:5001/api';

export default function () {
  // 1. Thực hiện Đăng nhập lấy Token
  const loginPayload = JSON.stringify({
    email: 'admin@pharmacy.com',
    password: '123456',
  });

  const loginHeaders = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const loginRes = http.post(`${BASE_URL}/auth/login`, loginPayload, loginHeaders);
  
  check(loginRes, {
    '✅ Đăng nhập thành công (Status 200)': (r) => r.status === 200,
    '✅ Có trả về Token hợp lệ': (r) => r.json('token') !== undefined,
  });

  // Người dùng thực tế thường khựng lại một lát sau khi đăng nhập
  sleep(Math.random() * 0.5 + 0.5); 

  // 2. Lấy danh sách Thuốc (Giao dịch tần suất cao ở trang POS)
  if (loginRes.status === 200) {
    const token = loginRes.json('token');
    const authHeaders = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const medRes = http.get(`${BASE_URL}/medicines`, authHeaders);
    
    check(medRes, {
      '✅ Lấy danh sách thuốc thành công (Status 200)': (r) => r.status === 200,
    });
  }

  // Nghỉ 1 khoảng thời gian nhỏ trước khi tiếp tục lặp lại
  sleep(Math.random() * 0.5 + 0.5);
}

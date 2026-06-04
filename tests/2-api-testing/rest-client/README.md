# 📡 REST Client (VS Code)

## 📄 File: requests.http

Alternative to Postman - simpler, lighter weight, runs directly in VS Code

## ⚡ Quick Start

### 1. Install Extension
- Open VS Code Extensions (Ctrl+Shift+X)
- Search "REST Client" by Huachao Mao
- Install

### 2. Open requests.http
- Click file: `requests.http`
- You should see "Send Request" links above each request

### 3. Run Requests
- Click "Send Request" (or Ctrl+Alt+L)
- Response appears in sidebar

## 📝 Usage

### Example 1: Login
```http
POST http://localhost:5001/api/auth/login
Content-Type: application/json

{
  "email": "admin@pharmacy.com",
  "password": "123456"
}
```

**Click "Send Request"** → Token appears in response

### Example 2: Get Medicines
```http
GET http://localhost:5001/api/medicines?page=1&limit=10
Authorization: Bearer {{token}}
```

## 🎯 Benefits vs Postman

| Feature | REST Client | Postman |
|---------|-------------|---------|
| Setup | 2 minutes | 5 minutes |
| Collections | Not needed | Required |
| Environment | Simple | Complex |
| Free tier | ✅ Full | Limited |
| No login | ✅ Yes | Requires account |
| Lightweight | ✅ Yes | Heavy app |
| Script support | Limited | Full |

**👉 Recommendation**: Use REST Client for quick testing, Postman for CI/CD

## 📚 Full Request List

See `requests.http` file - includes 100+ endpoints:

```
✅ Auth (5 requests)
  - Login
  - Get current user
  - Change password
  - Logout
  - RBAC test

✅ Medicines (8 requests)
  - GET all
  - CREATE
  - GET detail
  - UPDATE
  - DELETE
  - Search
  - Low stock filter
  - Expiring medicines

✅ Customers (5 requests)
  - Create customer
  - Get list
  - Purchase history
  - Debt tracking
  - Auto tier upgrade

✅ Sales (10+ requests)
  - Create sale
  - Get all
  - Detail
  - Cancel/Refund
  - Loyalty points
  - E-Invoice
  - Date range filter
  - Payment method filter

✅ Imports (8 requests)
  - Smart PO
  - Create import
  - Partial payment
  - Pay debt
  - History
  - Filters

+ More...
```

## 🔐 Authentication

### Auto-token management

1. First request:
```http
### Login
POST http://localhost:5001/api/auth/login
Content-Type: application/json

{
  "email": "admin@pharmacy.com",
  "password": "123456"
}

> {%
  client.global.set("token", response.body.token);
  client.global.set("userId", response.body._id);
%}
```

2. Next requests use:
```http
Authorization: Bearer {{token}}
```

## 💡 Tips

### Tip 1: Copy cURL
```
Right-click request → Copy cURL
Paste to terminal to run outside VS Code
```

### Tip 2: Environment Variables
```
Can define in REST Client by:
@baseUrl = http://localhost:5001/api
@token = your_token_here
```

### Tip 3: Save Response
```
Response panel → Click "Save" icon
Saves response.json
```

## 🔗 Integration with Tests

Use REST Client to:
1. **Pre-test API** before E2E tests
2. **Debug failing tests** - re-run request manually
3. **Verify API responses** - compare with TEST_PLAN.md
4. **Check status codes** - all should be 200/201/204

## 📊 Performance

| Metric | Time |
|--------|------|
| Login → Get Token | ~1 sec |
| Per request | ~500ms-2sec |
| Full API suite (31 requests) | ~30-40 min |

## 🚀 Next Steps

1. Install REST Client extension
2. Open requests.http
3. Click "Send Request" above any endpoint
4. Update TEST_REPORT.md with results

## 🔗 See Also

- [postman/README.md](postman/README.md) - Postman guide
- [../1-planning/TEST_PLAN.md](../1-planning/TEST_PLAN.md) - Test cases
- [../4-documentation/TEST_API_GUIDE.md](../4-documentation/TEST_API_GUIDE.md) - API reference


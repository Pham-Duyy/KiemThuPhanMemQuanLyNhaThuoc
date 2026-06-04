# 🔌 API Testing

Choose your tool:

## 🎯 Option 1: Postman (Recommended)
- **When to use**: Full test suite, CI/CD, team collaboration
- **Setup time**: 5 minutes
- **Tests**: 31 requests
- **Guide**: [postman/README.md](postman/README.md)

**Quick Start**:
```
1. Open postman/
2. Read IMPORT_GUIDE.md
3. Import 5 JSON files
4. Select environment
5. Run TC 1.1 → Token auto-saves
6. Run all requests
```

## 📡 Option 2: REST Client
- **When to use**: Quick testing, debugging, lightweight
- **Setup time**: 2 minutes  
- **Tests**: 100+ requests
- **Guide**: [rest-client/README.md](rest-client/README.md)

**Quick Start**:
```
1. Install REST Client extension in VS Code
2. Open rest-client/requests.http
3. Click "Send Request"
4. View response in sidebar
```

## 📊 Comparison

| Aspect | Postman | REST Client |
|--------|---------|------------|
| **Setup** | 5 min | 2 min |
| **UI** | Web/Desktop | VS Code |
| **Collections** | ✅ Yes | ❌ No |
| **Environments** | ✅ Complex | ✅ Simple |
| **CI/CD** | ✅ Easy | ⚠️ Harder |
| **Team Share** | ✅ Easy | ⚠️ Git only |
| **Free Tier** | Limited | ✅ Full |
| **No Account** | ❌ Required | ✅ Yes |

## 🚀 Recommended Flow

```
Day 1: Quick API verification → Use REST Client
  ↓
Day 2-3: Full test suite → Use Postman
  ↓
Day 4+: Regression tests → Use Postman + CI/CD
```

## 📝 Test Coverage

Both tools cover:
- ✅ 31 API requests
- ✅ All 4 phán hệ (Auth, Medicines, Imports, Sales)
- ✅ FEFO logic validation
- ✅ Debt tracking
- ✅ Loyalty points
- ✅ RBAC checks
- ✅ Error handling

## 🎯 Next Steps

Choose one and start:

### 👉 Start with Postman?
[postman/IMPORT_GUIDE.md](postman/IMPORT_GUIDE.md)

### 👉 Start with REST Client?
[rest-client/README.md](rest-client/README.md)

---

## 📚 Reference

- [../1-planning/TEST_PLAN.md](../1-planning/TEST_PLAN.md) - Test case details
- [../4-documentation/TEST_API_GUIDE.md](../4-documentation/TEST_API_GUIDE.md) - API reference


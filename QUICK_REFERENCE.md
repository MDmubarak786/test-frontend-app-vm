# 🚀 Quick Reference - API Integration

## 📍 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5174 |
| Backend API | http://localhost:3000/api |

## 🔌 API Endpoints

```bash
# Welcome
curl http://localhost:3000/api

# About
curl http://localhost:3000/api/about

# My Name
curl http://localhost:3000/api/my-name
```

## 💻 Usage in Components

```typescript
import { apiService } from '../services/api.service';

// Get welcome
const welcome = await apiService.getWelcome();

// Get about
const about = await apiService.getAbout();

// Get name
const name = await apiService.getMyName();
```

## 🏃 Quick Start

```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd react-test-app
npm run dev
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/services/api.service.ts` | API calls |
| `src/types/api.types.ts` | TypeScript types |
| `src/pages/Home.tsx` | Welcome page |
| `src/pages/About.tsx` | About page |
| `src/pages/MyName.tsx` | Name page |
| `.env` | API configuration |

## 🔧 Environment Variables

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## ✅ Checklist

- [ ] Backend running on port 3000
- [ ] Frontend running on port 5174
- [ ] `.env` file configured
- [ ] All pages loading data
- [ ] No console errors

## 🐛 Quick Fixes

**Backend not responding?**
```bash
curl http://localhost:3000/api
```

**Frontend not loading?**
```bash
# Check if dev server is running
npm run dev
```

**CORS errors?**
- Backend has CORS enabled ✅
- Check browser console

**TypeScript errors?**
```bash
npm run build
```

## 📊 Response Examples

### Welcome Response
```json
{
  "message": "Welcome to Webster Test Backend API",
  "endpoints": [...]
}
```

### About Response
```json
{
  "success": true,
  "data": {
    "name": "Webster Test Backend API",
    "version": "1.0.0",
    "author": "Mohammed Mubarak",
    ...
  }
}
```

### Name Response
```json
{
  "success": true,
  "data": {
    "fullName": "Mohammed Mubarak",
    "firstName": "Mohammed",
    "lastName": "Mubarak",
    "initials": "MM"
  }
}
```

---

**Need more details?** See `API_INTEGRATION.md` or `INTEGRATION_SUMMARY.md`


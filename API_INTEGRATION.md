# 🚀 Backend API Integration Guide

This document explains how the React frontend is integrated with the NestJS backend API.

## 📁 Project Structure

```
src/
├── services/
│   └── api.service.ts       # API service with all backend endpoints
├── types/
│   └── api.types.ts         # TypeScript types for API responses
├── pages/
│   ├── Home.tsx             # Home page - displays welcome message
│   ├── About.tsx            # About page - displays app information
│   └── MyName.tsx           # My Name page - displays user information
└── App.tsx                  # Main app with routing
```

## 🔌 API Endpoints

All endpoints are prefixed with `/api`:

| Method | Endpoint | Description | Component |
|--------|----------|-------------|-----------|
| GET | `/api` | Welcome message with endpoint list | Home.tsx |
| GET | `/api/about` | Application information | About.tsx |
| GET | `/api/my-name` | User name information | MyName.tsx |

## 🛠️ Setup Instructions

### 1. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env
```

The `.env` file contains:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

**For production**, update this to your production API URL.

### 2. Start the Backend Server

Make sure your NestJS backend is running on port 3000:
```bash
cd ../backend  # or wherever your backend is located
npm run start:dev
```

### 3. Start the Frontend Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📝 How It Works

### API Service (`src/services/api.service.ts`)

The API service provides a centralized way to make API calls:

```typescript
import { apiService } from '../services/api.service';

// Get welcome message
const welcome = await apiService.getWelcome();

// Get about information
const about = await apiService.getAbout();

// Get name information
const name = await apiService.getMyName();
```

### Type Safety (`src/types/api.types.ts`)

All API responses are typed for TypeScript safety:

```typescript
interface WelcomeResponse {
  message: string;
  endpoints: string[];
}

interface AboutResponse {
  success: boolean;
  data: AboutData;
  timestamp: string;
}

interface NameResponse {
  success: boolean;
  data: NameData;
  timestamp: string;
}
```

### Component Pattern

Each page component follows this pattern:

1. **State Management**: Loading, error, and data states
2. **Data Fetching**: useEffect hook to fetch data on mount
3. **Error Handling**: Display error messages with retry button
4. **Loading State**: Show loading indicator while fetching
5. **Data Display**: Render the fetched data

Example:
```typescript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    setLoading(true);
    const response = await apiService.getAbout();
    setData(response.data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

## 🧪 Testing the Integration

### 1. Test with cURL

```bash
# Test Welcome endpoint
curl http://localhost:3000/api

# Test About endpoint
curl http://localhost:3000/api/about

# Test My Name endpoint
curl http://localhost:3000/api/my-name
```

### 2. Test in Browser

1. Navigate to `http://localhost:5173`
2. You should see the welcome message from the backend
3. Click on "About" to see application information
4. Click on "My Name" to see user information

### 3. Test Error Handling

1. Stop the backend server
2. Refresh the frontend
3. You should see error messages with retry buttons
4. Start the backend server
5. Click "Retry" to fetch data again

## 🔧 Customization

### Change API Base URL

Edit `.env`:
```env
VITE_API_BASE_URL=https://your-production-api.com/api
```

### Add New Endpoints

1. **Add types** in `src/types/api.types.ts`:
```typescript
export interface NewEndpointResponse {
  // your types here
}
```

2. **Add service method** in `src/services/api.service.ts`:
```typescript
export const apiService = {
  // ... existing methods
  
  getNewEndpoint: async (): Promise<NewEndpointResponse> => {
    return fetchAPI<NewEndpointResponse>('/new-endpoint');
  },
};
```

3. **Use in component**:
```typescript
const response = await apiService.getNewEndpoint();
```

## 🚨 Troubleshooting

### CORS Issues

If you see CORS errors, make sure your backend has CORS enabled:

```typescript
// In your NestJS main.ts
app.enableCors({
  origin: 'http://localhost:5173',
  credentials: true,
});
```

### Connection Refused

- Make sure the backend is running on port 3000
- Check that `VITE_API_BASE_URL` is correct in `.env`
- Verify the backend is accessible: `curl http://localhost:3000/api`

### TypeScript Errors

- Run `npm run build` to check for type errors
- Make sure all types in `api.types.ts` match the backend responses

## 📚 Additional Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [React Hooks](https://react.dev/reference/react)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## ✅ Features

- ✅ TypeScript type safety
- ✅ Centralized API service
- ✅ Error handling with retry functionality
- ✅ Loading states
- ✅ Environment variable configuration
- ✅ Clean component architecture
- ✅ Responsive UI

---

**Happy Coding! 🎉**


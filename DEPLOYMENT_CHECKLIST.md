# ✅ Deployment Checklist - Environment Variables

## 🎯 What You Need to Do Now

Your workflow file is updated! Now follow these steps to complete the setup:

---

## 📋 Step-by-Step Guide

### **Step 1: Add GitHub Secret** ⏳

1. **Go to your GitHub repository:**
   ```
   https://github.com/MDmubarak786/test-frontend-app-vm
   ```

2. **Navigate to Settings:**
   - Click **Settings** tab (top navigation)
   - Click **Secrets and variables** in left sidebar
   - Click **Actions**

3. **Add New Secret:**
   - Click **"New repository secret"** button
   - Enter the following:
     - **Name:** `VITE_API_BASE_URL`
     - **Secret:** Your backend API URL

4. **Choose Your Backend URL:**

   **Option A: If backend is on same EC2 server**
   ```
   http://YOUR_EC2_IP:3000/api
   ```
   Example: `http://54.123.45.67:3000/api`

   **Option B: If backend has a domain**
   ```
   http://api.yourdomain.com/api
   ```
   or
   ```
   https://api.yourdomain.com/api
   ```

   **Option C: If using same domain with proxy**
   ```
   /api
   ```
   (Relative URL - recommended if Nginx proxies to backend)

5. **Click "Add secret"**

---

### **Step 2: Commit and Push Changes** ⏳

```bash
# Add the updated workflow file
git add .github/workflows/deploy.yml

# Add the documentation
git add GITHUB_SECRETS_SETUP.md DEPLOYMENT_CHECKLIST.md

# Commit with descriptive message
git commit -m "feat: add VITE_API_BASE_URL environment variable to deployment workflow

- Update GitHub Actions workflow to inject API URL during build
- Add comprehensive documentation for GitHub Secrets setup
- Include deployment checklist and troubleshooting guide"

# Push to trigger deployment
git push origin main
```

---

### **Step 3: Monitor Deployment** ⏳

1. **Go to Actions tab:**
   ```
   https://github.com/MDmubarak786/test-frontend-app-vm/actions
   ```

2. **Watch the workflow run:**
   - Click on the latest workflow run
   - Expand the "Build" step
   - Verify no errors

3. **Check build logs:**
   - Look for: `VITE_API_BASE_URL` being used
   - Ensure build completes successfully

---

### **Step 4: Verify Deployment** ⏳

1. **Visit your deployed frontend**
   ```
   http://YOUR_EC2_IP
   ```

2. **Open Browser DevTools:**
   - Press `F12` or right-click → Inspect
   - Go to **Network** tab

3. **Test each page:**
   - Home page (`/`)
   - About page (`/about`)
   - My Name page (`/my-name`)

4. **Verify API calls:**
   - Check Network tab for API requests
   - Ensure they go to correct backend URL
   - Should NOT be `localhost:3000`

5. **Check for errors:**
   - Console tab should have no errors
   - No CORS errors
   - All data loads correctly

---

## 🔍 What to Look For

### **✅ Success Indicators:**
- [ ] GitHub Actions workflow completes successfully
- [ ] Build step shows no errors
- [ ] Deployment completes without issues
- [ ] Frontend loads on EC2
- [ ] API calls go to correct backend URL
- [ ] All pages display data from backend
- [ ] No console errors
- [ ] No CORS errors

### **❌ Common Issues:**

#### **Issue 1: API calls still going to localhost**
**Cause:** GitHub Secret not set or build didn't use it

**Fix:**
1. Verify secret is added in GitHub
2. Re-run the workflow
3. Clear browser cache

#### **Issue 2: CORS errors**
**Cause:** Backend not allowing frontend domain

**Fix:** Update backend CORS configuration:
```typescript
// In your NestJS backend main.ts
app.enableCors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://YOUR_EC2_IP',           // Add this
    'http://your-domain.com',       // Add this if you have domain
  ],
  credentials: true,
});
```

#### **Issue 3: 404 errors on API calls**
**Cause:** Incorrect API URL in secret

**Fix:**
1. Check backend is running: `curl http://YOUR_EC2_IP:3000/api`
2. Update GitHub Secret with correct URL
3. Re-run deployment

---

## 🎯 Quick Reference

### **Current Setup:**

**Workflow File:** `.github/workflows/deploy.yml`
```yaml
- name: Build
  env:
    VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
  run: npm run build
```

**Local Development:** `.env`
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

**Production:** GitHub Secret
```
Name: VITE_API_BASE_URL
Value: http://YOUR_BACKEND_URL/api
```

---

## 📝 Backend URL Examples

### **Example 1: Backend on Same EC2 (Different Port)**
```
VITE_API_BASE_URL=http://54.123.45.67:3000/api
```

### **Example 2: Backend with Domain**
```
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

### **Example 3: Nginx Proxy (Recommended)**
```
VITE_API_BASE_URL=/api
```

**Nginx Configuration:**
```nginx
location /api {
    proxy_pass http://localhost:3000/api;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

---

## 🚀 Next Steps After Deployment

1. **Test all functionality:**
   - [ ] Home page loads
   - [ ] About page shows backend data
   - [ ] My Name page shows user data
   - [ ] Refresh buttons work
   - [ ] Error handling works

2. **Set up monitoring:**
   - [ ] Check GitHub Actions for failed deployments
   - [ ] Monitor backend logs
   - [ ] Set up error tracking (optional)

3. **Document your setup:**
   - [ ] Note your backend URL
   - [ ] Document any custom configurations
   - [ ] Share with team members

---

## 📞 Need Help?

### **Check GitHub Actions Logs:**
```
https://github.com/MDmubarak786/test-frontend-app-vm/actions
```

### **Test Backend Directly:**
```bash
# Replace with your backend URL
curl http://YOUR_EC2_IP:3000/api
curl http://YOUR_EC2_IP:3000/api/about
curl http://YOUR_EC2_IP:3000/api/my-name
```

### **Check Frontend Build:**
```bash
# Locally test production build
npm run build
npm run preview
```

---

## ✅ Final Checklist

Before considering deployment complete:

- [ ] GitHub Secret `VITE_API_BASE_URL` added
- [ ] Workflow file committed and pushed
- [ ] GitHub Actions workflow runs successfully
- [ ] Frontend deployed to EC2
- [ ] API calls go to correct backend URL
- [ ] All pages load data correctly
- [ ] No console errors
- [ ] No CORS errors
- [ ] Backend CORS configured for frontend domain
- [ ] Documentation updated

---

## 🎊 Summary

**What's Done:**
- ✅ Workflow file updated with environment variable

**What You Need to Do:**
1. ⏳ Add `VITE_API_BASE_URL` secret in GitHub Settings
2. ⏳ Commit and push changes
3. ⏳ Verify deployment works

**After Setup:**
- ✅ Environment variable available during build
- ✅ Production builds use correct API URL
- ✅ No more localhost in production
- ✅ Secure secret management

---

**Ready to deploy? Follow the steps above!** 🚀


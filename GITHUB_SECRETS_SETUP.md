# 🔐 GitHub Secrets Setup Guide

## Overview

This guide explains how to set up the `VITE_API_BASE_URL` environment variable in GitHub Secrets so it's available during deployment.

---

## 🎯 Problem Solved

**Issue:** The `VITE_API_BASE_URL` environment variable from `.env` is not available during GitHub Actions deployment because:
1. `.env` file is in `.gitignore` (not committed to GitHub)
2. Environment variables need to be set in GitHub Secrets for CI/CD

**Solution:** Store the API URL as a GitHub Secret and inject it during the build step.

---

## ✅ What Was Changed

### **Updated File:** `.github/workflows/deploy.yml`

**Before:**
```yaml
- name: Build
  run: npm run build
```

**After:**
```yaml
- name: Build
  env:
    VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
  run: npm run build
```

Now the environment variable will be available during the build process in GitHub Actions!

---

## 🔧 How to Set Up GitHub Secret

### **Step 1: Go to Your Repository Settings**

1. Open your repository: https://github.com/MDmubarak786/test-frontend-app-vm
2. Click on **Settings** tab (top right)
3. In the left sidebar, click **Secrets and variables** → **Actions**

### **Step 2: Add New Repository Secret**

1. Click the **"New repository secret"** button
2. Fill in the details:
   - **Name:** `VITE_API_BASE_URL`
   - **Value:** Your production API URL (see options below)

### **Step 3: Choose Your API URL**

#### **Option 1: Production Backend URL**
If your backend is deployed on EC2 or another server:
```
http://your-backend-domain.com/api
```
or
```
http://your-ec2-ip-address:3000/api
```

#### **Option 2: Same Domain (Recommended)**
If frontend and backend are on the same server:
```
/api
```
This uses relative URLs, so it automatically works with your domain.

#### **Option 3: Localhost (Development Only)**
```
http://localhost:3000/api
```
⚠️ **Not recommended for production!**

### **Step 4: Save the Secret**

1. Click **"Add secret"**
2. The secret is now stored securely in GitHub

---

## 📋 Complete GitHub Secrets Checklist

Make sure you have all these secrets configured:

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `VITE_API_BASE_URL` | Backend API URL | `http://api.yourdomain.com/api` |
| `EC2_SSH_KEY` | SSH private key for EC2 | `-----BEGIN RSA PRIVATE KEY-----...` |
| `EC2_HOST` | EC2 server hostname/IP | `ec2-xx-xx-xx-xx.compute.amazonaws.com` |
| `EC2_USERNAME` | SSH username | `ubuntu` or `ec2-user` |

---

## 🚀 How It Works

### **1. Local Development**
```bash
# Uses .env file
VITE_API_BASE_URL=http://localhost:3000/api
```

### **2. GitHub Actions Deployment**
```yaml
# Uses GitHub Secret
env:
  VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
```

### **3. Build Process**
Vite reads the environment variable and embeds it in the built JavaScript files.

---

## 🧪 Testing the Setup

### **Step 1: Commit and Push**
```bash
git add .github/workflows/deploy.yml
git commit -m "feat: add VITE_API_BASE_URL to GitHub Actions deployment"
git push origin main
```

### **Step 2: Check GitHub Actions**
1. Go to your repository
2. Click **Actions** tab
3. Watch the deployment workflow run
4. Check the "Build" step logs - you should see the environment variable being used

### **Step 3: Verify Deployment**
1. Visit your deployed frontend
2. Open browser DevTools → Network tab
3. Navigate through the pages
4. Check that API calls are going to the correct URL

---

## 🔍 Troubleshooting

### **Issue: API calls still going to localhost**

**Cause:** GitHub Secret not set or incorrect value

**Solution:**
1. Check GitHub Secrets are configured correctly
2. Re-run the deployment workflow
3. Clear browser cache

### **Issue: Build fails with "VITE_API_BASE_URL is undefined"**

**Cause:** Secret name mismatch

**Solution:**
1. Ensure secret name is exactly: `VITE_API_BASE_URL`
2. Check for typos in workflow file
3. Re-add the secret if needed

### **Issue: CORS errors in production**

**Cause:** Backend not configured for production frontend URL

**Solution:**
Update your NestJS backend CORS configuration:
```typescript
// In your NestJS main.ts
app.enableCors({
  origin: [
    'http://localhost:5173',           // Local development
    'http://localhost:5174',           // Local development
    'http://your-frontend-domain.com', // Production
    'https://your-frontend-domain.com' // Production HTTPS
  ],
  credentials: true,
});
```

---

## 📝 Best Practices

### **1. Use Environment-Specific URLs**

**Development:**
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

**Production:**
```
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

### **2. Use HTTPS in Production**
```
VITE_API_BASE_URL=https://api.yourdomain.com/api
```
Not:
```
VITE_API_BASE_URL=http://api.yourdomain.com/api
```

### **3. Use Relative URLs When Possible**
If frontend and backend are on the same domain:
```
VITE_API_BASE_URL=/api
```

This automatically works with:
- `http://yourdomain.com/api`
- `https://yourdomain.com/api`

### **4. Never Commit Secrets**
- ✅ Use GitHub Secrets for CI/CD
- ✅ Use `.env` for local development
- ✅ Add `.env` to `.gitignore`
- ❌ Never commit `.env` to repository

---

## 🔄 Updating the Secret

If you need to change the API URL:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click on `VITE_API_BASE_URL`
3. Click **Update secret**
4. Enter new value
5. Click **Update secret**
6. Re-run the deployment workflow or push a new commit

---

## 📚 Additional Configuration

### **Multiple Environments**

If you want different URLs for staging and production:

**Option 1: Use Branches**
```yaml
- name: Build
  env:
    VITE_API_BASE_URL: ${{ github.ref == 'refs/heads/main' && secrets.PROD_API_URL || secrets.STAGING_API_URL }}
  run: npm run build
```

**Option 2: Separate Workflows**
- `.github/workflows/deploy-staging.yml`
- `.github/workflows/deploy-production.yml`

---

## ✅ Verification Checklist

After setting up, verify:

- [ ] GitHub Secret `VITE_API_BASE_URL` is created
- [ ] Workflow file updated with `env:` section
- [ ] Changes committed and pushed
- [ ] GitHub Actions workflow runs successfully
- [ ] Deployed app makes API calls to correct URL
- [ ] No CORS errors in browser console
- [ ] All pages load data correctly

---

## 🎯 Quick Setup Commands

```bash
# 1. Update workflow file (already done)
git add .github/workflows/deploy.yml

# 2. Commit changes
git commit -m "feat: add VITE_API_BASE_URL to GitHub Actions deployment"

# 3. Push to trigger deployment
git push origin main

# 4. Go to GitHub and add the secret:
# Settings → Secrets and variables → Actions → New repository secret
# Name: VITE_API_BASE_URL
# Value: http://your-backend-url.com/api
```

---

## 🎊 Summary

**What You Need to Do:**

1. ✅ Workflow file updated (already done)
2. ⏳ Add `VITE_API_BASE_URL` secret in GitHub
3. ⏳ Commit and push changes
4. ⏳ Verify deployment works

**After Setup:**
- ✅ Environment variable available during build
- ✅ API calls go to correct production URL
- ✅ No more localhost references in production
- ✅ Secure secret management

---

**Need help?** Check the troubleshooting section or GitHub Actions logs for details.


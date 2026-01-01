# Book Dashboard Deployment Guide

## 🚨 CRITICAL: Auth0 Configuration Fix

### Fix "Grant type 'authorization_code' not allowed" Error

The error you're seeing means your Auth0 application is not configured correctly. Follow these steps:

1. **Go to Auth0 Dashboard**: https://manage.auth0.com/
2. **Navigate to Applications** → Select your application
3. **Application Settings**:
   - **Application Type**: Single Page Application (SPA)
   - **Token Endpoint Authentication Method**: None
4. **Allowed Callback URLs**: Add your URLs:
   ```
   http://localhost:5173, https://your-vercel-app.vercel.app
   ```
5. **Allowed Logout URLs**: Add your URLs:
   ```
   http://localhost:5173, https://your-vercel-app.vercel.app
   ```
6. **Allowed Web Origins**: Add your URLs:
   ```
   http://localhost:5173, https://your-vercel-app.vercel.app
   ```
7. **Advanced Settings** → **Grant Types**: Ensure these are checked:
   - ✅ Authorization Code
   - ✅ Refresh Token
   - ✅ Implicit (for SPA)

**Save Changes** and test again.

## 🚀 Deployment Steps

### Step 1: Set Up Your Environment Files Locally

```bash
# Copy example files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Edit these files with your actual Auth0 credentials:
- Domain: `dev-6g2scdjmkku3pjvo.us.auth0.com`
- Client ID: `oSPM0lIKqEQAyNZRfpW9OUPjFktQSQpN`
- Audience: `https://book-management-api`

### Step 2: Deploy Backend to Railway

1. **Connect Railway**: Go to [railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub repo**
3. **Select your repository**: `Abdulrasaq1515/book-management`
4. **Configure Service**:
   - Service Name: `book-dashboard-backend`
   - Root Directory: Leave empty (uses Dockerfile)
5. **Set Environment Variables** in Railway dashboard:
   ```
   NODE_ENV=production
   PORT=4000
   AUTH0_DOMAIN=dev-6g2scdjmkku3pjvo.us.auth0.com
   AUTH0_AUDIENCE=https://book-management-api
   AUTH0_CLIENT_ID=oSPM0lIKqEQAyNZRfpW9OUPjFktQSQpN
   FRONTEND_URL=https://your-vercel-app.vercel.app
   DATABASE_PATH=database.sqlite
   ```

### Step 3: Deploy Frontend to Vercel

1. **Connect Vercel**: Go to [vercel.com](https://vercel.com)
2. **Import Project** → Select your GitHub repo
3. **Configure Project**:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Set Environment Variables** in Vercel dashboard:
   ```
   VITE_GRAPHQL_URL=https://your-railway-app.railway.app/graphql
   VITE_AUTH0_DOMAIN=dev-6g2scdjmkku3pjvo.us.auth0.com
   VITE_AUTH0_CLIENT_ID=oSPM0lIKqEQAyNZRfpW9OUPjFktQSQpN
   VITE_AUTH0_AUDIENCE=https://book-management-api
   ```

### Step 4: Update Auth0 with Production URLs

After deployment, update your Auth0 application settings:
- **Allowed Callback URLs**: Add your production URLs
- **Allowed Logout URLs**: Add your production URLs  
- **Allowed Web Origins**: Add your production URLs

## 🔧 Troubleshooting

### Railway Deployment Issues
- ✅ Uses Dockerfile (fixed monorepo structure)
- ✅ Proper npm workspace handling
- ✅ Environment variables set in Railway dashboard

### Auth0 Issues
- ✅ Application Type: Single Page Application (SPA)
- ✅ Grant Types: Authorization Code + Refresh Token + Implicit
- ✅ Callback URLs include both local and production URLs

### Common Errors
1. **"Grant type not allowed"** → Fix Auth0 application type to SPA
2. **"CORS error"** → Add your domain to Auth0 Allowed Web Origins
3. **"Cannot connect to backend"** → Check Railway environment variables
4. **"Build failed"** → Check Railway logs for missing dependencies

## 🎯 Quick Commands

```bash
# Test locally after setting up .env files
npm run dev

# Build for production
npm run build

# Test production build locally
npm run start:prod
```

## 🔐 Security Checklist

- ✅ Environment files removed from GitHub
- ✅ Secrets set in deployment platform dashboards
- ✅ Auth0 configured with proper application type
- ✅ Production URLs added to Auth0 settings
- ✅ Different credentials for development vs production (recommended)
# Book Dashboard Deployment Guide

## 🚀 Deployment Options

### Option 1: Vercel (Recommended for Frontend) + Railway/Render (Backend)

#### Frontend Deployment (Vercel)
1. **Push to GitHub**: Commit your code to a GitHub repository
2. **Connect Vercel**: Go to [vercel.com](https://vercel.com) and import your repository
3. **Configure Build Settings**:
   - Framework Preset: Vite
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/dist`
4. **Environment Variables** (in Vercel dashboard):
   ```
   VITE_GRAPHQL_URL=https://your-backend-url.com/graphql
   VITE_AUTH0_DOMAIN=dev-6g2scdjmkku3pjvo.us.auth0.com
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   VITE_AUTH0_AUDIENCE=https://book-management-api
   ```

#### Backend Deployment (Railway)
1. **Connect Railway**: Go to [railway.app](https://railway.app) and connect your GitHub repo
2. **Configure Service**:
   - Root Directory: `backend`
   - Build Command: `npm run build`
   - Start Command: `npm run start:prod`
3. **Environment Variables** (⚠️ NEVER commit these to GitHub):
   ```
   NODE_ENV=production
   PORT=4000
   AUTH0_DOMAIN=your-auth0-domain.auth0.com
   AUTH0_AUDIENCE=https://book-management-api
   AUTH0_CLIENT_ID=your-auth0-client-id
   FRONTEND_URL=https://your-vercel-app.vercel.app
   DATABASE_PATH=database.sqlite
   ```

## 🔐 Security Best Practices

### Environment Variables
- ❌ **NEVER** commit `.env`, `.env.production`, or any files with secrets to GitHub
- ✅ **ALWAYS** set environment variables directly in your deployment platform
- ✅ **ONLY** commit `.env.example` files with placeholder values
- ✅ Use your deployment platform's environment variable settings

### Auth0 Security
- Keep your Auth0 Client Secret secure
- Only add trusted domains to Auth0 callback URLs
- Use different Auth0 applications for development and production

## 📋 Environment Variables Summary

### Backend Environment Variables (Set in Railway/Render Dashboard)
```
NODE_ENV=production
PORT=4000
AUTH0_DOMAIN=your-auth0-domain.auth0.com
AUTH0_AUDIENCE=https://book-management-api
AUTH0_CLIENT_ID=your-auth0-client-id
FRONTEND_URL=https://your-frontend-domain.com
DATABASE_PATH=database.sqlite
```

### Frontend Environment Variables (Set in Vercel/Netlify Dashboard)
```
VITE_GRAPHQL_URL=https://your-backend-domain.com/graphql
VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=https://book-management-api
```

## 🚨 Important Security Notes

1. **Never commit environment files**: All `.env*` files are now in `.gitignore`
2. **Use platform environment variables**: Set secrets directly in Vercel/Railway dashboards
3. **Rotate secrets if exposed**: If you accidentally committed secrets, rotate them immediately
4. **Use different credentials for production**: Never use development credentials in production

## 🎯 Quick Deploy Commands

### Local Development
```bash
# Copy example files and fill in your values
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit the files with your actual values
# Then start development
npm run dev
```

### Build for Production
```bash
# Build both frontend and backend
npm run build
```
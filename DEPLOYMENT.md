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
   VITE_AUTH0_CLIENT_ID=oSPM0lIKqEQAyNZRfpW9OUPjFktQSQpN
   VITE_AUTH0_AUDIENCE=https://book-management-api
   ```

#### Backend Deployment (Railway)
1. **Connect Railway**: Go to [railway.app](https://railway.app) and connect your GitHub repo
2. **Configure Service**:
   - Root Directory: `backend`
   - Build Command: `npm run build`
   - Start Command: `npm run start:prod`
3. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=4000
   AUTH0_DOMAIN=dev-6g2scdjmkku3pjvo.us.auth0.com
   AUTH0_AUDIENCE=https://book-management-api
   AUTH0_CLIENT_ID=oSPM0lIKqEQAyNZRfpW9OUPjFktQSQpN
   FRONTEND_URL=https://your-vercel-app.vercel.app
   DATABASE_PATH=database.sqlite
   ```

### Option 2: Netlify (Frontend) + Heroku (Backend)

#### Frontend Deployment (Netlify)
1. **Connect Repository**: Link your GitHub repo to Netlify
2. **Build Settings**:
   - Base Directory: `frontend`
   - Build Command: `npm run build`
   - Publish Directory: `frontend/dist`
3. **Environment Variables**: Same as Vercel above

#### Backend Deployment (Heroku)
1. **Create Heroku App**: `heroku create your-app-name`
2. **Add Buildpack**: `heroku buildpacks:set heroku/nodejs`
3. **Configure Environment Variables**: Use `heroku config:set`
4. **Deploy**: `git push heroku main`

### Option 3: Docker Deployment

#### Backend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["npm", "run", "start:prod"]
```

#### Frontend Dockerfile
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔧 Pre-Deployment Checklist

### Auth0 Configuration
1. **Update Auth0 Application Settings**:
   - Add production URLs to Allowed Callback URLs
   - Add production URLs to Allowed Logout URLs
   - Add production URLs to Allowed Web Origins
   - Add production URLs to Allowed Origins (CORS)

### Database Considerations
- **Development**: SQLite (current setup)
- **Production**: Consider PostgreSQL or MySQL for better performance
- **Migration**: Update TypeORM configuration for production database

### Security
- [ ] Remove console.log statements from production code
- [ ] Set up proper error handling
- [ ] Configure rate limiting
- [ ] Set up monitoring and logging

## 📋 Environment Variables Summary

### Backend (.env.production)
```
NODE_ENV=production
PORT=4000
AUTH0_DOMAIN=dev-6g2scdjmkku3pjvo.us.auth0.com
AUTH0_AUDIENCE=https://book-management-api
AUTH0_CLIENT_ID=oSPM0lIKqEQAyNZRfpW9OUPjFktQSQpN
FRONTEND_URL=https://your-frontend-domain.com
DATABASE_PATH=database.sqlite
```

### Frontend (.env.production)
```
VITE_GRAPHQL_URL=https://your-backend-domain.com/graphql
VITE_AUTH0_DOMAIN=dev-6g2scdjmkku3pjvo.us.auth0.com
VITE_AUTH0_CLIENT_ID=oSPM0lIKqEQAyNZRfpW9OUPjFktQSQpN
VITE_AUTH0_AUDIENCE=https://book-management-api
```

## 🎯 Quick Deploy Commands

### Local Production Test
```bash
# Backend
cd backend
npm run build
npm run start:prod

# Frontend
cd frontend
npm run build
npm run preview
```

### Build for Production
```bash
# Root directory
npm run build:all
```

## 📞 Support

If you encounter issues during deployment:
1. Check environment variables are correctly set
2. Verify Auth0 configuration matches your domains
3. Ensure CORS settings allow your frontend domain
4. Check logs for specific error messages
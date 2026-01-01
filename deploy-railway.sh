#!/bin/bash

# Railway Deployment Script for Book Dashboard Backend

echo "🚀 Deploying Book Dashboard Backend to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Install it first:"
    echo "npm install -g @railway/cli"
    exit 1
fi

# Login to Railway (if not already logged in)
echo "🔐 Checking Railway authentication..."
railway login

# Deploy the project
echo "📦 Deploying to Railway..."
railway up

echo "✅ Deployment initiated!"
echo "📊 Check your Railway dashboard for deployment status"
echo "🔧 Don't forget to set your environment variables in the Railway dashboard:"
echo "   - NODE_ENV=production"
echo "   - PORT=4000"
echo "   - AUTH0_DOMAIN=dev-6g2scdjmkku3pjvo.us.auth0.com"
echo "   - AUTH0_AUDIENCE=https://book-management-api"
echo "   - AUTH0_CLIENT_ID=oSPM0lIKqEQAyNZRfpW9OUPjFktQSQpN"
echo "   - FRONTEND_URL=https://your-vercel-app.vercel.app"
echo "   - DATABASE_PATH=database.sqlite"
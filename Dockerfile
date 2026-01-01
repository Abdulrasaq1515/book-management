# Use Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy root package.json for workspace configuration
COPY package*.json ./

# Copy backend package files
COPY backend/package*.json ./backend/

# Install dependencies for the entire workspace
RUN npm install

# Copy backend source code
COPY backend/ ./backend/

# Build the backend application
RUN cd backend && npm run build

# Expose port
EXPOSE 4000

# Set working directory to backend
WORKDIR /app/backend

# Start the application
CMD ["npm", "run", "start:prod"]
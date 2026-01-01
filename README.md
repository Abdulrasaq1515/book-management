# 📚 Book Management Dashboard

A full-stack book management application built with React, NestJS, GraphQL, and Auth0 authentication.

## 🚀 Features

- **User Authentication**: Secure login/signup with Auth0
- **Book Management**: Create, read, update, delete books
- **User Isolation**: Each user sees only their own books
- **Real-time Updates**: GraphQL subscriptions for live data
- **Responsive Design**: Works on desktop and mobile
- **Modern Tech Stack**: React 18, NestJS, TypeScript, GraphQL

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Apollo Client** for GraphQL
- **Chakra UI** for components
- **Auth0 React SDK** for authentication

### Backend
- **NestJS** with TypeScript
- **GraphQL** with Apollo Server
- **TypeORM** with SQLite database
- **Auth0 JWT** authentication
- **Passport** for authentication middleware

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Auth0 account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abdulrasaq1515/book-management.git
   cd book-management
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   **Backend** (`backend/.env`):
   ```env
   PORT=4000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   DATABASE_PATH=database.sqlite
   AUTH0_DOMAIN=your-auth0-domain.auth0.com
   AUTH0_AUDIENCE=https://your-api-identifier
   AUTH0_CLIENT_ID=your-auth0-client-id
   ```

   **Frontend** (`frontend/.env`):
   ```env
   VITE_GRAPHQL_URL=http://localhost:4000/graphql
   VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   VITE_AUTH0_AUDIENCE=https://your-api-identifier
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This starts both frontend (http://localhost:5173) and backend (http://localhost:4000)

## 📦 Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm run start` - Start both frontend and backend in production mode
- `npm run test` - Run backend tests

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Options:
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Render, Heroku

## 🔧 Auth0 Configuration

1. Create an Auth0 application (Single Page Application)
2. Configure callback URLs:
   - Development: `http://localhost:5173`
   - Production: `https://your-domain.com`
3. Create an Auth0 API with identifier matching `AUTH0_AUDIENCE`

## 📁 Project Structure

```
book-management/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── graphql/
│   │   └── types/
│   └── package.json
├── backend/           # NestJS backend
│   ├── src/
│   │   ├── auth/
│   │   ├── books/
│   │   └── main.ts
│   └── package.json
├── package.json       # Root package.json
└── README.md
```

## 🎯 API Endpoints

### GraphQL Endpoint
- **Development**: http://localhost:4000/graphql
- **Playground**: http://localhost:4000/graphql (development only)

### Available Operations
- `books` - Get all user's books
- `book(id)` - Get specific book
- `createBook(input)` - Create new book
- `updateBook(input)` - Update existing book
- `removeBook(id)` - Delete book

## 🔐 Authentication

The application uses Auth0 for authentication:
- JWT tokens are automatically included in GraphQL requests
- Users can only access their own books
- Secure logout and token refresh

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run with coverage
npm run test:cov
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

If you encounter any issues:
1. Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
2. Verify Auth0 configuration
3. Check environment variables
4. Review console logs for errors

---

Built with ❤️ using modern web technologies
# Deployment Guide - Full-Stack Presentation Generator

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git (for version control)

### Development Setup

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd presentation-generator
   npm install
   cd server && npm install && cd ..
   ```

2. **Start Development Servers**
   ```bash
   # Option 1: Start both servers simultaneously
   npm run start:full
   
   # Option 2: Start servers separately
   # Terminal 1 - Backend
   npm run server:dev
   
   # Terminal 2 - Frontend
   npm run dev
   ```

3. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

## 🏗 Production Deployment

### Environment Variables

Create environment files for production:

**Frontend (.env.production)**
```bash
VITE_API_URL=https://your-api-domain.com/api
```

**Backend (server/.env)**
```bash
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-domain.com
```

### Build Process

```bash
# Build frontend
npm run build

# The dist/ folder contains the production build
```

### Deployment Options

#### Option 1: Single Server Deployment

Deploy both frontend and backend on the same server:

```bash
# Build frontend
npm run build

# Start production server (serves both API and static files)
cd server && NODE_ENV=production node index.js
```

#### Option 2: Separate Deployment

**Frontend (Netlify/Vercel/GitHub Pages)**
```bash
npm run build
# Deploy the dist/ folder
```

**Backend (Heroku/Railway/DigitalOcean)**
```bash
# Deploy the server/ folder with these files:
# - server/package.json
# - server/index.js
# - server/routes/
# - server/utils/
```

### Platform-Specific Instructions

#### Heroku Deployment

1. **Prepare Backend**
   ```bash
   # Create Procfile in server directory
   echo "web: node index.js" > server/Procfile
   
   # Set environment variables
   heroku config:set NODE_ENV=production
   heroku config:set FRONTEND_URL=https://your-frontend-url.com
   ```

2. **Deploy**
   ```bash
   cd server
   git init
   heroku create your-app-name
   git add .
   git commit -m "Initial deployment"
   git push heroku main
   ```

#### Railway Deployment

1. **Connect Repository**
   - Connect your GitHub repository to Railway
   - Select the `server` directory as the root

2. **Configure**
   - Railway will automatically detect the Node.js project
   - Set environment variables in the Railway dashboard

#### Netlify (Frontend Only)

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Environment Variables**
   - Add `VITE_API_URL` with your backend URL

## 🧪 Testing

### Manual Testing

1. **Backend API Testing**
   ```bash
   # Health check
   curl http://localhost:5000/health
   
   # Validation test
   curl -X POST -H "Content-Type: application/json" \
     -d '{"presentationData":[{"visuals":{"metadata":{"representationTechnique":"FourCardGrid"}},"title":"Test"}]}' \
     http://localhost:5000/api/presentations/validate
   ```

2. **Frontend Testing**
   - Open http://localhost:5173
   - Test JSON input with sample data
   - Navigate through slides
   - Test export functionality (will show mock files)

### Automated Testing

Run the provided test script:
```bash
node test-server.js
```

### Load Testing

For production environments, consider load testing:
```bash
# Install artillery for load testing
npm install -g artillery

# Create test config (artillery.yml)
artillery quick --count 10 --num 5 http://localhost:5000/health
```

## 📊 Monitoring and Logging

### Health Checks

The application provides several health check endpoints:

- `GET /health` - Basic server health
- `POST /api/presentations/validate` - Data validation
- `POST /api/presentations/info` - Presentation analysis

### Logging

The server logs important events:
- API requests and responses
- File generation progress
- Error details (in development)
- Performance metrics

### Error Handling

The application handles errors gracefully:
- Frontend: User-friendly error messages
- Backend: Detailed error logs (development) / Generic messages (production)
- API: Proper HTTP status codes and error responses

## 🔒 Security Considerations

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use HTTPS in production
- [ ] Configure proper CORS origins
- [ ] Implement rate limiting
- [ ] Validate and sanitize all inputs
- [ ] Use environment variables for sensitive data
- [ ] Regular security updates

### Rate Limiting

The server includes basic rate limiting:
```javascript
// Current settings (can be configured)
- Window: 15 minutes
- Max requests: 100 per window
- Applies to all API endpoints
```

### Input Validation

All presentation data is validated for:
- Structure integrity
- Required fields
- Data type validation
- Content sanitization
- Size limits

## 🚀 Performance Optimization

### Frontend Optimizations

1. **Code Splitting**
   ```javascript
   // Lazy load slide components
   const FourCardGrid = lazy(() => import('./PPT-Template-1-dark/FourCardGrid'));
   ```

2. **Bundle Analysis**
   ```bash
   npm install --save-dev vite-bundle-analyzer
   npm run build -- --analyze
   ```

### Backend Optimizations

1. **Caching**
   - Implement Redis for session storage
   - Cache generated presentations temporarily

2. **File Streaming**
   - Stream large files instead of loading in memory
   - Implement progressive file generation

### Database Considerations

For future enhancements:
- MongoDB for user presentations
- PostgreSQL for analytics
- Redis for caching and sessions

## 🔧 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 5000
   lsof -ti:5000 | xargs kill -9
   ```

2. **CORS Errors**
   - Check frontend URL in backend CORS configuration
   - Ensure API URL is correct in frontend

3. **Module Import Errors**
   - Verify all files use ES modules syntax
   - Check file extensions (.js) in import statements

4. **Build Failures**
   ```bash
   # Clear caches
   npm run build -- --force
   rm -rf node_modules package-lock.json
   npm install
   ```

### Debug Mode

Enable detailed logging:
```bash
DEBUG=* npm run server:dev
```

### Performance Issues

1. **Large Presentations**
   - Implement pagination for slide navigation
   - Lazy load slide components
   - Optimize image sizes

2. **Slow API Responses**
   - Implement request timeout handling
   - Add loading indicators
   - Consider background processing for large files

## 📈 Scaling Considerations

### Horizontal Scaling

1. **Load Balancer**
   - Use nginx or cloud load balancer
   - Session stickiness for file generation

2. **Multiple Instances**
   - Stateless server design
   - Shared file storage (S3, etc.)

### Vertical Scaling

1. **Resource Allocation**
   - Monitor CPU usage during file generation
   - Increase memory for large presentations
   - SSD storage for temporary files

### Microservices Architecture

For large-scale deployments:
- Separate file generation service
- User management service
- Analytics service
- Template management service

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run test
      - name: Deploy to production
        # Add deployment steps
```

### Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations (if applicable)
- [ ] Health checks working
- [ ] Monitoring configured
- [ ] Backup procedures in place

This deployment guide provides a comprehensive roadmap for taking the presentation generator from development to production, with considerations for scalability, security, and maintainability.
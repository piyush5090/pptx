# 📊 Full-Stack Presentation Generator

A modern, full-stack web application that transforms structured JSON data into professional presentations with dynamic slide templates and export capabilities.

## 🌟 Features

- **Dynamic Slide Rendering**: 9 different presentation templates
- **JSON Data Input**: Paste JSON or upload files
- **Interactive Navigation**: Keyboard shortcuts and slide controls
- **Export Capabilities**: Generate PowerPoint and PDF files
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Validation**: Instant feedback on data structure
- **Professional Themes**: Dark theme with modern styling

## 🎯 Supported Slide Templates

1. **FourCardGrid** - 2x2 grid of information cards
2. **TitledFeatureGrid** - Feature showcase with icons
3. **TitleTextAndImage** - Text content with image support
4. **TitledListWithFooter** - Bulleted lists with footer
5. **TitledIconGrid** - Icon-based information grid
6. **HorizontalBarList** - Progress bars and statistics
7. **ImageTextLayout** - Image and text combinations
8. **Timeline** - Chronological event display
9. **VerticalBarChart** - Data visualization charts

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd presentation-generator

# Install dependencies
npm install
cd server && npm install && cd ..

# Start development servers
npm run start:full
```

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 📚 Documentation

- **[Architecture Guide](./ARCHITECTURE.md)** - Detailed system architecture and design decisions
- **[Implementation Guide](./IMPLEMENTATION_GUIDE.md)** - Step-by-step development instructions
- **[Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Production deployment and scaling

## 🏗 Architecture Overview

### Frontend (React + Redux)
- **React 18**: Component-based UI with hooks
- **Redux Toolkit**: State management for presentation data
- **React Router**: Client-side navigation
- **Tailwind CSS**: Utility-first styling
- **Vite**: Fast development and build tooling

### Backend (Node.js + Express)
- **Express**: RESTful API server
- **ES Modules**: Modern JavaScript module system
- **File Generation**: PowerPoint and PDF creation
- **Data Validation**: Comprehensive input validation
- **Error Handling**: Graceful error management

## 🔧 API Endpoints

### Health Check
```http
GET /health
```

### Data Validation
```http
POST /api/presentations/validate
Content-Type: application/json

{
  "presentationData": [...]
}
```

### Generate PowerPoint
```http
POST /api/presentations/generate-pptx
Content-Type: application/json

{
  "presentationData": [...]
}
```

### Generate PDF
```http
POST /api/presentations/generate-pdf
Content-Type: application/json

{
  "presentationData": [...]
}
```

## 📝 JSON Data Format

```json
[
  {
    "visuals": {
      "metadata": {
        "representationTechnique": "FourCardGrid"
      }
    },
    "title": "Modern Leadership Paradigms",
    "pageNumber": 1,
    "cards": [
      {
        "id": 1,
        "title": "Servant Leadership",
        "text": "Focuses on the growth and well-being of people..."
      }
    ]
  }
]
```

## 🎮 Usage Examples

### 1. JSON Input Method
1. Navigate to the application
2. Select "Paste JSON" tab
3. Paste your presentation data
4. Click "Generate Presentation"

### 2. File Upload Method
1. Select "Upload File" tab
2. Drag and drop a .json file
3. Click "Generate Presentation"

### 3. Navigation
- **Arrow Keys**: Navigate between slides
- **Space/Enter**: Next slide
- **Escape**: Return to upload page
- **Home/End**: First/last slide

### 4. Export
- Click "PowerPoint" or "PDF" buttons
- Files download automatically
- Currently generates demonstration files

## 🧪 Testing

### Manual Testing
```bash
# Test API health
curl http://localhost:5000/health

# Test data validation
curl -X POST -H "Content-Type: application/json" \
  -d '{"presentationData":[...]}' \
  http://localhost:5000/api/presentations/validate

# Run automated tests
node test-server.js
```

### Sample Data
Use the "Load Sample Data" button in the JSON input for testing.

## 🔒 Security Features

- **Input Validation**: Comprehensive data structure validation
- **Sanitization**: XSS prevention and content cleaning
- **CORS Configuration**: Proper cross-origin resource sharing
- **Rate Limiting**: API abuse prevention
- **Error Handling**: No sensitive data in error messages

## 🚀 Performance

- **Code Splitting**: Lazy-loaded components
- **Optimized Bundles**: Tree-shaking and minification
- **Efficient Rendering**: React.memo and useMemo optimization
- **API Caching**: Request deduplication
- **File Streaming**: Memory-efficient file generation

## 🛠 Development Scripts

```bash
# Frontend development
npm run dev              # Start Vite dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Backend development
npm run server          # Start production server
npm run server:dev      # Start with nodemon
npm run start:full      # Start both frontend and backend

# Testing and utilities
node test-server.js     # Test API endpoints
npm run build -- --analyze  # Bundle analysis
```

## 📂 Project Structure

```
presentation-generator/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Route components
│   ├── store/             # Redux store and slices
│   ├── services/          # API services
│   └── PPT-Template-1-dark/  # Slide templates
├── server/                # Backend source code
│   ├── routes/            # Express routes
│   ├── utils/             # Utility functions
│   └── index.js           # Server entry point
├── public/                # Static assets
├── docs/                  # Documentation
└── dist/                  # Production build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the excellent React framework
- **Redux Toolkit Team** - For simplified state management
- **Tailwind CSS** - For utility-first CSS framework
- **Vite** - For fast development tooling
- **Express.js** - For the web framework

## 📞 Support

- **Documentation**: Check the guides in the docs folder
- **Issues**: Report bugs via GitHub issues
- **Discussions**: Use GitHub discussions for questions

## 🔮 Future Enhancements

- **Real PowerPoint Generation**: Integrate pptxgenjs library
- **PDF Generation**: Implement Puppeteer for PDF creation
- **User Authentication**: Add user accounts and saved presentations
- **Template Editor**: Visual template customization
- **Collaboration**: Real-time collaborative editing
- **Analytics**: Usage tracking and insights
- **Mobile App**: React Native mobile version

---

**Built with ❤️ using modern web technologies**
# AWS SAA Mock Test - React Frontend

A modern, glassmorphic React frontend for AWS Solutions Architect Associate certification mock tests. Features advanced UI design with multiple themes, particle effects, and responsive layout.

## 🎨 Design System

### **Architecture**
- **React 19.1.1**: Latest React with modern hooks and context API
- **Vite 7.1.2**: Fast development server and build tool
- **Tailwind CSS 4.1.12**: Utility-first CSS framework
- **Glassmorphism**: Advanced backdrop blur and transparency effects
- **Particle Effects**: Animated background orbs and grid patterns

### **Component Structure**
```
src/
├── components/
│   ├── ColorSchemeSelector.jsx  # Theme selection with 4 color schemes
│   ├── QuestionCard.jsx         # Question display with glassmorphic design
│   ├── Navigation.jsx           # Progress tracking and navigation
│   └── Results.jsx              # Comprehensive results dashboard
├── contexts/
│   ├── QuestionContext.jsx      # Question state management
│   └── ColorSchemeContext.jsx   # Theme persistence and switching
├── data/
│   └── questions.json           # AWS SAA sample questions
├── hooks/                       # Custom React hooks
└── utils/                       # Utility functions
```

## 🏗️ SOLID Principles Implementation

### **Single Responsibility**
- **QuestionCard**: Only displays questions and handles answer selection
- **ColorSchemeSelector**: Manages theme selection UI only
- **Navigation**: Handles progress tracking and navigation controls
- **Results**: Displays quiz results and performance analytics

### **Open/Closed**
- **Theme System**: Add new themes without modifying existing components
- **Question Sources**: Easy to extend from local JSON to API calls
- **Component Architecture**: Extend functionality through composition

### **Liskov Substitution**
- **Theme Interface**: All themes follow the same color scheme contract
- **Question Data Structure**: Any question source can provide the same structure
- **Component Props**: Components accept different implementations of the same interface

### **Interface Segregation**
- **Component Props**: Each component receives only the props it needs
- **Context APIs**: Separate contexts for different concerns
- **Event Handlers**: Specific handlers for specific interactions

### **Dependency Inversion**
- **Context-Component**: Components depend on context abstractions, not implementations
- **Data Source**: UI components don't know about data source implementation
- **Theme System**: Components depend on theme interface, not specific implementations

## 🚀 Features

### **Visual Design**
- 🎨 **4 Color Schemes**: Deep Cove, Cyber Blue, Neon Green, Claude Purple
- 🌙 **Dark Mode**: Optimized dark theme with glassmorphic effects
- ✨ **Particle Effects**: Animated background orbs and grid patterns
- 🔍 **3D Hover Effects**: Scale transforms and smooth transitions
- 📱 **Responsive Design**: Mobile-first with advanced breakpoints

### **Functionality**
- 📊 **Progress Tracking**: Dual-track progress bars with animated indicators
- 🎯 **Answer Validation**: Immediate feedback with modern UI elements
- 💾 **Theme Persistence**: localStorage integration for theme preferences
- 📈 **Performance Analytics**: Comprehensive results dashboard
- 🔄 **Navigation**: Previous/Next with progress indicators

## 🛠️ Development

### **Commands**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### **Development Setup**
```bash
cd aws-mock-fe
npm install
npm run dev
```

### **Dependencies**
- **React 19.1.1**: UI framework with modern features
- **Vite 7.1.2**: Fast build tool and dev server
- **Tailwind CSS 4.1.12**: Utility-first CSS framework
- **ESLint**: Code linting and quality

## 🐛 Troubleshooting

### **Common Issues**
- **Theme Not Applying**: Check localStorage permissions and browser console
- **Questions Not Loading**: Verify `questions.json` file exists and is properly formatted
- **Build Errors**: Run `npm install` to refresh dependencies
- **Linting Issues**: Run `npm run lint` and fix reported issues

### **Development Tips**
- Use React DevTools to inspect context state
- Test theme switching in different browsers
- Verify responsive design on mobile devices
- Check browser console for runtime errors

## 📈 Performance Metrics
- **Bundle Size**: Optimized with code splitting
- **Load Time**: < 2s for initial load
- **Runtime Performance**: Smooth 60fps animations
- **Memory Usage**: Efficient context and state management

## 🚀 Future Enhancements
- [ ] API integration with backend
- [ ] User authentication and progress tracking
- [ ] Timer functionality
- [ ] Question difficulty levels
- [ ] Search and filter functionality
- [ ] Advanced analytics and insights

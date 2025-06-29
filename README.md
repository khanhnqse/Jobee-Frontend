# Jobee - Frontend

# Jobee - AI-Powered CV Builder & Job Application Platform

Jobee is a modern web application that helps job seekers create professional CVs, get AI-powered resume feedback, and practice interviews with AI. Built with React and powered by intelligent features to enhance your job search experience.

## ✨ Features

### 🎨 CV Builder

- **Multiple Templates**: Choose from 8 professional CV layouts (Basic, Simple, Modern, Classic, etc.)
- **Real-time Preview**: See your CV update in real-time as you edit
- **PDF Export**: Download your CV as a high-quality PDF
- **Template Switching**: Easily switch between different layouts without losing data

### 🤖 AI-Powered Tools

- **Resume Grading**: Upload your PDF resume and get AI-powered feedback and scoring
- **Interview AI**: Practice interviews with AI-generated questions based on your resume
- **CV Review**: Get detailed suggestions to improve your resume

### 💼 Job Management

- **Application Tracking**: Track your job applications and their status
- **Profile Management**: Maintain detailed job seeker profiles
- **Admin Dashboard**: Comprehensive application management for employers

### 💳 Subscription & Payments

- **Flexible Plans**: Multiple subscription tiers to fit your needs
- **Payment Integration**: Secure payment processing with VNPay support
- **Plan Management**: Easy upgrade/downgrade options

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/solva-frontend.git
   cd solva-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   VITE_API_BASE_URL=https://jobeeapi.azurewebsites.net
   VITE_APP_ENVIRONMENT=development
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── CV Component/    # CV form components
│   ├── CV Form/         # CV creation utilities
│   ├── LayoutTemplate/  # CV template layouts
│   ├── Banner/          # Banner components
│   └── Checkout/        # Payment components
├── pages/               # Page components
│   ├── CV Maker Page/   # CV creation interface
│   ├── GradeResume/     # AI resume grading
│   ├── InterviewAI/     # AI interview practice
│   ├── Admin/           # Admin dashboard
│   └── PlayerVideo/     # Tutorial videos
├── context/             # React context providers
├── services/            # API service functions
├── utils/               # Utility functions
├── constant/            # App constants
├── routes/              # Routing configuration
└── store/               # State management
```

## 🛠️ Key Technologies

- **Frontend**: React 18, Vite, Ant Design
- **Styling**: Tailwind CSS, CSS Modules
- **State Management**: React Context, Redux Toolkit
- **Routing**: React Router DOM
- **PDF Generation**: jsPDF, html2canvas
- **File Upload**: Axios with progress tracking
- **UI Components**: Ant Design, Custom components

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Git Hooks
npm run prepare      # Setup Husky git hooks
```

## 🎯 Core Features Guide

### Creating a CV

1. Navigate to CV Maker
2. Fill in personal information, education, experience, etc.
3. Choose from 8 professional templates
4. Preview your CV in real-time
5. Download as PDF or save to your profile

### AI Resume Grading

1. Go to "Grade Resume" page
2. Upload your PDF resume
3. Wait for AI analysis
4. Receive detailed feedback and suggestions
5. Implement improvements based on AI recommendations

### Interview Practice

1. Visit "Interview AI" section
2. Upload your resume PDF
3. AI generates relevant interview questions
4. Practice with personalized questions
5. Improve your interview performance

## 🔧 Configuration

### API Endpoints

The app connects to the Jobee API at `https://jobeeapi.azurewebsites.net` for:

- User authentication
- CV data management
- AI-powered features
- Payment processing

### CV Templates

Templates are located in [`src/components/LayoutTemplate/`](src/components/LayoutTemplate/) and include:

- [`Layout1`](src/components/LayoutTemplate/Layout1.jsx) - Basic template
- [`Layout2`](src/components/LayoutTemplate/Layout2.jsx) - Simple template
- [`Layout3`](src/components/LayoutTemplate/Layout3.jsx) - Modern template
- [`Layout4`](src/components/LayoutTemplate/Layout4.jsx) - Classic template
- And more...

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

- Check the documentation
- Open an issue on GitHub
- Contact the development team

## 🏆 Acknowledgments

- Ant Design for the excellent UI component library
- React team for the amazing framework
- All contributors who made this project possible

---

Made with ❤️ by the Solva Team

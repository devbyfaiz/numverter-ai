# 🚀 **Numverter AI** - Intelligent Number Conversion Platform

> **Transform numbers between any base with AI-powered natural language processing, OCR scanning, voice input, and real-time currency conversion.**

[![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-38B2AC)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## ✨ **Features**

### 🔢 **Core Conversion Tools**
- **Number Converter**: Binary, Decimal, Hex, Octal, Roman numerals
- **Binary Calculator**: Advanced arithmetic operations
- **AI Convert**: Natural language processing for conversions
- **OCR Scanner**: Extract numbers from images
- **Voice Input**: Convert spoken numbers
- **Currency Converter**: Real-time exchange rates with AI insights

### 🤖 **AI-Powered Features**
- Natural language input → conversion logic
- Step-by-step conversion explanations
- Mathematical operation support
- Intelligent error handling
- Learning from user patterns

### 🎨 **Modern UI/UX**
- Responsive design with glass-morphism
- Light/Dark mode support
- Smooth animations with Framer Motion
- Mobile-first approach
- Accessibility compliant

### 🔐 **User Management**
- JWT authentication
- User history & favorites
- Premium subscription features
- Usage analytics

## 🏗️ **Architecture**

```
Numverter AI/
├── frontend/                 # Next.js React application
│   ├── app/                 # App router pages
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility functions
│   └── types/               # TypeScript definitions
├── backend/                 # Node.js Express server
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Auth & validation
│   │   ├── services/       # Business logic
│   │   └── utils/          # Helper functions
│   └── database/            # Database schemas
└── docs/                    # Documentation
```

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenAI API key
- Stripe account (for payments)

### **1. Clone & Install**

```bash
# Clone the repository
git clone https://github.com/yourusername/numverter-ai.git
cd numverter-ai

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### **2. Environment Setup**

```bash
# Frontend environment
cp env.example .env.local

# Backend environment
cd backend
cp env.example .env
cd ..
```

**Configure your `.env.local` file:**
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Currency API
EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Google AdSense
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=your_google_adsense_id
```

### **3. Database Setup (Supabase)**

1. Create a new Supabase project
2. Run the following SQL to create tables:

```sql
-- Users table
CREATE TABLE users (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Conversions table
CREATE TABLE conversions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  input_value TEXT NOT NULL,
  input_base INTEGER NOT NULL,
  output_value TEXT NOT NULL,
  output_base INTEGER NOT NULL,
  conversion_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Favorites table
CREATE TABLE favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  conversion_id UUID REFERENCES conversions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, conversion_id)
);

-- Usage logs table
CREATE TABLE usage_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own conversions" ON conversions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own conversions" ON conversions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own favorites" ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own favorites" ON favorites FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own usage logs" ON usage_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own usage logs" ON usage_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### **4. Run Development Servers**

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
cd backend
npm run dev
```

Visit `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.

## 🛠️ **Development**

### **Frontend Commands**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### **Backend Commands**
```bash
cd backend
npm run dev          # Start with nodemon
npm start            # Start production server
npm run lint         # Run ESLint
npm test             # Run tests
```

### **Code Structure**
- **Components**: Reusable UI components with TypeScript
- **Pages**: Next.js app router pages
- **API Routes**: Backend Express routes with middleware
- **Database**: Supabase PostgreSQL with RLS
- **State Management**: Zustand for global state
- **Styling**: TailwindCSS with custom components

## 🚀 **Deployment**

### **Frontend (Vercel)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Backend (Railway/Render)**
1. Push code to GitHub
2. Connect repository to Railway/Render
3. Set environment variables
4. Deploy automatically

### **Environment Variables for Production**
```env
NODE_ENV=production
FRONTEND_URL=https://your-domain.vercel.app
DATABASE_URL=your_supabase_connection_string
```

## 📱 **API Endpoints**

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token

### **Conversions**
- `POST /api/conversions/convert` - Basic number conversion
- `GET /api/conversions/history` - User conversion history
- `POST /api/conversions/favorite` - Add to favorites

### **AI Features**
- `POST /api/ai/convert` - AI-powered conversion
- `POST /api/ai/explain` - Get conversion explanation
- `POST /api/ai/calculate` - Mathematical operations

### **OCR & Voice**
- `POST /api/ocr/scan` - Extract numbers from images
- `POST /api/voice/convert` - Convert voice to text

### **Currency**
- `GET /api/currency/rates` - Get exchange rates
- `POST /api/currency/convert` - Convert currencies

## 🔒 **Security Features**

- JWT authentication with refresh tokens
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Helmet security headers
- Row Level Security (RLS) in database

## 💰 **Monetization**

### **Free Tier**
- Basic number conversions
- Limited AI requests (5/day)
- Google AdSense integration
- Community support

### **Premium Tier ($9.99/month)**
- Unlimited AI conversions
- Advanced OCR features
- Voice input processing
- Export conversion history
- Priority support
- No advertisements

### **API Access ($49/month)**
- REST API access
- Higher rate limits
- Webhook support
- Developer documentation

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Faizuddin** - Original Numverter creator
- **OpenAI** - AI capabilities
- **Supabase** - Backend-as-a-Service
- **Vercel** - Frontend hosting
- **TailwindCSS** - Utility-first CSS framework

## 📞 **Support**

- **Email**: devbyfaiz@outlook.com
- **Documentation**: [docs.numverter-ai.com](https://docs.numverter-ai.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/numverter-ai/issues)

---

**Made with ❤️ by [FAIZUDDIN](https://github.com/yourusername)**

*Transform numbers intelligently with the power of AI! 🚀*

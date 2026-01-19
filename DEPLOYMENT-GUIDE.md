# Deployment Guide

## ✅ Step 1: Git Repository (COMPLETED)
Your code has been committed to git with all changes.

## 📦 Step 2: Create GitHub Repository

### Option A: Using GitHub Website (Recommended)
1. Go to https://github.com/new
2. Fill in the details:
   - **Repository name**: `ai-portfolio-website`
   - **Description**: `AI-powered portfolio with RAG-enabled chat interface built with Next.js and Google Gemini 2.0 Flash`
   - **Visibility**: Public
   - ⚠️ **DO NOT** initialize with README, .gitignore, or license (we already have code)
3. Click "Create repository"

### Option B: Using GitHub CLI
If you have GitHub CLI installed:
```bash
gh repo create ai-portfolio-website --public --source=. --description="AI-powered portfolio with RAG-enabled chat interface" --push
```

## 🚀 Step 3: Push Code to GitHub

After creating the repository on GitHub, run these commands:

```bash
cd /Users/rithwik/Documents/Codebase_Portfolio/portfolio-website

# Add the GitHub remote (replace YOUR-USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/ai-portfolio-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🌐 Step 4: Deploy to Vercel

### Method 1: Vercel Dashboard (Easiest)
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository `ai-portfolio-website`
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

5. **Add Environment Variables** (CRITICAL):
   Click "Environment Variables" and add:
   ```
   GOOGLE_API_KEY=your_actual_gemini_api_key_here
   ```

6. Click "Deploy"
7. Wait 2-3 minutes for deployment to complete
8. Your site will be live at `https://ai-portfolio-website.vercel.app`

### Method 2: Vercel CLI
```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy
cd /Users/rithwik/Documents/Codebase_Portfolio/portfolio-website
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - What's your project's name? ai-portfolio-website
# - In which directory is your code located? ./
# - Want to override the settings? No

# Add environment variable
vercel env add GOOGLE_API_KEY

# Deploy to production
vercel --prod
```

## 🔐 Important: Environment Variables

Make sure to add your environment variables to Vercel:

1. **GOOGLE_API_KEY**: Your Google Gemini API key
   - Get it from: https://aistudio.google.com/app/apikey
   - Add it in Vercel Dashboard → Project Settings → Environment Variables

## ✅ Post-Deployment Checklist

After deployment, verify:
- [ ] Site loads correctly
- [ ] Chat interface is visible in Hero section
- [ ] Can send messages to the chat
- [ ] Featured Work section displays 2 project cards
- [ ] "View Full Case Study" button opens modal
- [ ] Skills section displays correctly
- [ ] Education section shows BITS Pilani logo
- [ ] Floating navigation is visible at bottom
- [ ] All 5 social CTAs work (Gmail, TopMate, Substack, LinkedIn, Calendly)

## 🔄 Future Updates

To deploy updates:
```bash
# Make your changes
git add .
git commit -m "Your commit message"
git push

# Vercel will automatically redeploy
```

## 📊 Project Structure
```
portfolio-website/
├── app/
│   ├── api/chat/route.ts       # RAG chat API endpoint
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page (Hero → Projects → Skills → Education)
├── components/
│   ├── Hero.tsx                # Hero with integrated ChatInterface
│   ├── ChatInterface.tsx       # RAG-powered chat component
│   ├── Projects.tsx            # Featured Work (2 cards, opens modal)
│   ├── CaseStudyModal.tsx      # Full-screen case study modal
│   ├── Skills.tsx              # Skills & Expertise (3 categories)
│   ├── Education.tsx           # Education & Learning with BITS logo
│   └── FloatingNav.tsx         # Bottom floating nav with 5 CTAs
├── lib/
│   ├── gemini.ts               # Google Gemini API integration
│   ├── embeddings.ts           # Text embeddings for RAG
│   ├── vector-db.ts            # In-memory vector database
│   └── load-knowledge-base.ts  # Knowledge base loader
├── content.json                # All portfolio content
├── knowledge-base.json         # RAG knowledge base
└── .env.local                  # Environment variables (not in git)
```

## 🎨 Features Implemented
✅ Hero section with integrated ChatInterface
✅ Featured Work with case study modal
✅ Skills & Expertise section
✅ Education & Learning with BITS Pilani logo
✅ Floating bottom navigation with 5 CTAs
✅ RAG-powered chat using Google Gemini 2.0 Flash
✅ Glassmorphic Material Design 3 aesthetic
✅ Responsive design
✅ Smooth animations and transitions

## 🔗 Custom Domain (Optional)

To add a custom domain in Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Wait for DNS propagation (5-60 minutes)

---

Built with ❤️ using Next.js, Google Gemini, and Tailwind CSS

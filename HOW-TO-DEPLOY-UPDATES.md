# How to Deploy Updates to Your Portfolio

## ✅ Changes Already Deployed!

I've just updated:
- ✅ Substack URL: `https://substack.com/@rithwik829825`
- ✅ Calendly URL: `https://calendly.com/rithwikmavuluri/30min`

These changes are now:
- ✅ Committed to git
- ✅ Pushed to GitHub
- 🚀 Deploying automatically to Vercel (takes 1-2 minutes)

---

## 🔄 How to Deploy Future Updates

Every time you want to deploy changes to your live website, follow these 3 simple steps:

### **Step 1: Make Your Changes**
Edit any files in your project (components, styles, content, etc.)

### **Step 2: Commit and Push to GitHub**
```bash
cd /Users/rithwik/Documents/Codebase_Portfolio/portfolio-website

# Stage all changes
git add -A

# Commit with a descriptive message
git commit -m "Brief description of what you changed"

# Push to GitHub
git push
```

### **Step 3: Wait for Automatic Deployment**
That's it! Vercel automatically:
1. Detects the push to GitHub
2. Builds your updated site
3. Deploys it to production
4. Usually takes **1-2 minutes** ⏱️

---

## 🎯 Real Example (What We Just Did)

```bash
# 1. Made changes to FloatingNav.tsx and content.json
# 2. Committed the changes
git add -A
git commit -m "Update social links: Substack and Calendly URLs"

# 3. Pushed to GitHub
git push

# 4. Vercel automatically deployed! 🎉
```

---

## 📊 How to Check Deployment Status

### **Option 1: Vercel Dashboard**
1. Go to https://vercel.com/dashboard
2. Click on your project: `ai-portfolio-website`
3. See deployment status in real-time
4. View build logs if needed

### **Option 2: GitHub**
1. Go to your repo: https://github.com/rithwikmavuluri/ai-portfolio-website
2. Look for the orange/green dot next to your latest commit
   - 🟠 Orange = Deploying
   - 🟢 Green = Deployed successfully
   - 🔴 Red = Deployment failed

---

## 🔧 Common Scenarios

### **Updating Content (text, images, data)**
```bash
# Edit content.json or any component
git add -A
git commit -m "Update project descriptions"
git push
```

### **Adding New Features**
```bash
# Create/edit components
git add -A
git commit -m "Add new contact form component"
git push
```

### **Fixing Bugs**
```bash
# Fix the bug in code
git add -A
git commit -m "Fix modal close button not working"
git push
```

### **Updating Styles**
```bash
# Edit CSS/Tailwind classes
git add -A
git commit -m "Update button hover effects"
git push
```

---

## ⚡ Quick Command Reference

```bash
# Check what files changed
git status

# See what changed in files
git diff

# Commit everything with message
git add -A && git commit -m "Your message here"

# Push to GitHub (triggers auto-deploy)
git push

# View commit history
git log --oneline

# Undo last commit (if you made a mistake)
git reset --soft HEAD~1
```

---

## 🚨 What If Deployment Fails?

If you see a red ❌ in Vercel:

1. **Check Vercel logs**:
   - Go to Vercel dashboard → Your project → Failed deployment
   - Click on the deployment to see error logs

2. **Common issues**:
   - **Build error**: Syntax error in your code → Fix and push again
   - **Missing env variable**: Add `GOOGLE_API_KEY` in Vercel settings
   - **Import error**: Check file paths and imports

3. **Fix and redeploy**:
   ```bash
   # Fix the issue in your code
   git add -A
   git commit -m "Fix deployment error"
   git push
   ```

---

## 🎨 Current Deployment Setup

- **GitHub Repo**: https://github.com/rithwikmavuluri/ai-portfolio-website
- **Vercel Project**: ai-portfolio-website
- **Live URL**: https://ai-portfolio-website.vercel.app (or your custom domain)
- **Auto-deploy Branch**: `main` (every push triggers deployment)

---

## 📝 Best Practices

1. **Test locally first**:
   ```bash
   npm run dev
   # Test at http://localhost:3000
   ```

2. **Write clear commit messages**:
   ```bash
   ✅ Good: "Update Calendly link in floating nav"
   ❌ Bad: "fixed stuff"
   ```

3. **Check deployment status** after pushing

4. **Keep environment variables secure** (never commit API keys)

---

## 🎉 Your Changes Are Live!

Your Substack and Calendly links have been updated and are deploying now!

Check your live site in 1-2 minutes:
- Visit your Vercel URL
- Click the Substack icon → Should go to https://substack.com/@rithwik829825
- Click the Calendly icon → Should go to https://calendly.com/rithwikmavuluri/30min

---

**Remember**: Every `git push` = Automatic deployment! 🚀

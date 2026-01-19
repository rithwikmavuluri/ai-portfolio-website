# Vercel Deployment Guide - Step by Step

## 🚀 Deploy Your Portfolio in 5 Minutes

### Step 1: Open Vercel Import Page
Click this link: **https://vercel.com/new**

### Step 2: Sign In (if needed)
- Click "Continue with GitHub"
- Authorize Vercel to access your GitHub account

### Step 3: Import Your Repository
1. You'll see a list of your GitHub repositories
2. Find: **`rithwikmavuluri/ai-portfolio-website`**
3. Click **"Import"** next to it

### Step 4: Configure Project
Vercel will auto-detect Next.js. You'll see:

```
Framework Preset: Next.js    ✅ (auto-detected)
Root Directory: ./           ✅ (leave as default)
Build Command: npm run build ✅ (leave as default)
Output Directory: .next      ✅ (leave as default)
Install Command: npm install ✅ (leave as default)
```

**Leave all these settings as default** - Vercel knows what to do!

### Step 5: Add Environment Variable (CRITICAL!)
This is the MOST IMPORTANT step:

1. Click on **"Environment Variables"** dropdown to expand it
2. You'll see two fields:
   - **Name**: Type `GOOGLE_API_KEY`
   - **Value**: Paste your Google Gemini API key
3. Click **"Add"** button
4. You should see it appear in the list below

**Your Google Gemini API Key:**
- If you don't have one: https://aistudio.google.com/app/apikey
- Copy the key that starts with something like: `AIzaSy...`

### Step 6: Deploy!
1. Click the big **"Deploy"** button
2. You'll see a deployment progress screen with logs
3. Wait 2-3 minutes (grab a coffee ☕)

### Step 7: Success! 🎉
Once deployment completes:
- You'll see **"Congratulations!"** with confetti 🎊
- Your live URL will be shown (something like `ai-portfolio-website.vercel.app`)
- Click **"Visit"** to see your live portfolio!

---

## ✅ Post-Deployment Checklist

Visit your live site and verify:
- [ ] Site loads with dark gradient background
- [ ] Hero section shows your name and chat interface
- [ ] Chat interface is functional (try asking a question)
- [ ] "Featured Work" section shows 2 project cards
- [ ] Clicking "View Full Case Study" opens the modal
- [ ] Skills section displays 3 categories
- [ ] Education section shows BITS Pilani logo
- [ ] Floating navigation is visible at bottom
- [ ] All 5 social links work (Gmail, TopMate, Substack, LinkedIn, Calendly)

---

## 🔧 If Something Goes Wrong

### Chat not working?
- Check that you added `GOOGLE_API_KEY` in environment variables
- Go to: Project Settings → Environment Variables
- Add it if missing, then click "Redeploy" button

### Deployment failed?
- Check the build logs for errors
- Most common issue: missing environment variable
- Click "Redeploy" after fixing

---

## 🌐 Custom Domain (Optional)

Want to use your own domain instead of `vercel.app`?

1. Go to Project Settings → Domains
2. Add your domain (e.g., `rithwikmavuluri.com`)
3. Update DNS records as instructed by Vercel
4. Wait 5-60 minutes for DNS propagation

---

## 🔄 Future Updates

Whenever you make changes to your portfolio:

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push

# Vercel automatically redeploys! 🚀
```

Every push to `main` branch triggers automatic redeployment.

---

## 📊 Your Live URLs

After deployment, you'll have:
- **Production**: `https://ai-portfolio-website.vercel.app`
- **GitHub Repo**: `https://github.com/rithwikmavuluri/ai-portfolio-website`
- **Local Dev**: `http://localhost:3000`

---

Built with ❤️ using Next.js, Google Gemini 2.0 Flash, and Tailwind CSS

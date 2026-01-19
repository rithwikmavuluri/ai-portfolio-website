# 🔧 Fix Chat Feature - API Key Leaked

## 🚨 Problem Found
Your Google Gemini API key was **leaked and disabled** by Google for security.

Error message:
```
Your API key was reported as leaked. Please use another API key.
```

## ✅ Solution (5 minutes)

### Step 1: Get a New API Key
1. Go to: **https://aistudio.google.com/app/apikey**
2. Click **"Create API Key"**
3. Select a Google Cloud project (or create new)
4. **Copy the new key** (starts with `AIzaSy...`)
5. ⚠️ **DO NOT share this key anywhere!**

### Step 2: Update Local Environment
```bash
cd /Users/rithwik/Documents/Codebase_Portfolio/portfolio-website

# Edit .env.local file
nano .env.local
```

Replace the old key with your new key:
```
GOOGLE_API_KEY=YOUR_NEW_KEY_HERE
```

Save and exit (Ctrl+X, then Y, then Enter)

### Step 3: Update Vercel Environment Variable
1. Go to: **https://vercel.com/dashboard**
2. Click your project: **ai-portfolio-website**
3. Go to: **Settings** → **Environment Variables**
4. Find: `GOOGLE_API_KEY`
5. Click the **three dots (⋯)** → **Edit**
6. Paste your **new API key**
7. Click **Save**
8. Click **"Redeploy"** button at the top

### Step 4: Restart Local Server
```bash
# Stop the current server (Ctrl+C in the terminal)
# Then restart it
npm run dev
```

### Step 5: Test the Chat
1. Visit: http://localhost:3000
2. Try asking: "What AI products have you shipped?"
3. You should get a response! ✅

---

## 🔐 Security Best Practices

### ✅ DO:
- Store API keys in `.env.local` (already in `.gitignore`)
- Use environment variables in Vercel
- Regenerate keys if leaked

### ❌ DON'T:
- Commit API keys to git
- Share keys in messages/screenshots
- Use the same key after it's leaked

---

## 🧪 Test Script

I've created a test script to verify the fix works:

```bash
# After updating the API key, run:
node test-chat-api.js
```

You should see:
```
✅ Test completed successfully!
📝 Total response length: XXX characters
```

---

## 📊 Verification Checklist

After fixing:
- [ ] New API key created
- [ ] `.env.local` updated with new key
- [ ] Vercel environment variable updated
- [ ] Vercel redeployed
- [ ] Local server restarted
- [ ] Chat works locally
- [ ] Chat works on live site

---

## 🆘 Still Not Working?

If chat still doesn't work after these steps:

1. **Check the console logs**:
   ```bash
   # Look for errors in terminal
   # Or check browser console (F12 → Console tab)
   ```

2. **Verify API key is valid**:
   ```bash
   node test-chat-api.js
   ```

3. **Check Vercel deployment logs**:
   - Go to Vercel dashboard
   - Click on latest deployment
   - View "Function Logs"

4. **Contact me** - I'll help debug further!

---

## Why Did This Happen?

API keys can get leaked when:
1. Committed to public git repositories
2. Shared in screenshots or messages
3. Exposed in browser DevTools
4. Left in logs or error messages

GitHub automatically scans for leaked keys and reports them to providers like Google for security.

---

**Quick Fix Time**: ~5 minutes
**Difficulty**: Easy

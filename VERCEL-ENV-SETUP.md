# Vercel Environment Variables Setup

## 🚨 CRITICAL: Add These to Vercel Now

Your analytics infrastructure has been deployed to GitHub, and Vercel is building now.
**However, it will fail without these environment variables!**

---

## 📋 Variables to Add

Go to: **https://vercel.com/dashboard** → Your Project → **Settings** → **Environment Variables**

Add ALL of these variables:

### 1. Google Gemini API (Already Added ✅)
```
GOOGLE_API_KEY=AIzaSyAWyUNKno44FbKKVrxhHaFSMDXT8WSU3WQ
```

### 2. Firebase Configuration (ADD THESE NOW 🔴)
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCF1SQtHZlJy64ighOz3LFrq4Ppwz6jZ-g
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=gen-lang-client-0017528127.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=gen-lang-client-0017528127
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=gen-lang-client-0017528127.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=418837561910
NEXT_PUBLIC_FIREBASE_APP_ID=1:418837561910:web:40205f7908512068eace97
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-1LE6TNEBSJ
```

### 3. Google Analytics 4 (ADD THIS NOW 🔴)
```
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-Z1RLPEVPMT
```

---

## ⚡ Quick Copy-Paste Format

For easier adding, here's the format Vercel accepts:

**Variable Name** | **Value**
```
NEXT_PUBLIC_FIREBASE_API_KEY | AIzaSyCF1SQtHZlJy64ighOz3LFrq4Ppwz6jZ-g
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN | gen-lang-client-0017528127.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID | gen-lang-client-0017528127
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET | gen-lang-client-0017528127.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID | 418837561910
NEXT_PUBLIC_FIREBASE_APP_ID | 1:418837561910:web:40205f7908512068eace97
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID | G-1LE6TNEBSJ
NEXT_PUBLIC_GA4_MEASUREMENT_ID | G-Z1RLPEVPMT
```

---

## 📝 Step-by-Step Instructions

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Click on your project: **ai-portfolio-website**

### Step 2: Navigate to Environment Variables
1. Click: **Settings** (in top navigation)
2. Click: **Environment Variables** (in left sidebar)

### Step 3: Add Each Variable
For EACH variable above:

1. Click **"Add New"** button
2. **Name**: Enter the variable name (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`)
3. **Value**: Paste the corresponding value
4. **Environment**: Select **ALL** (Production, Preview, Development)
5. Click **"Save"**

Repeat for all 8 variables!

### Step 4: Redeploy
1. After adding all variables, go to: **Deployments** tab
2. Click the **three dots (⋯)** next to the latest deployment
3. Click **"Redeploy"**
4. Wait 1-2 minutes for redeployment

---

## ✅ Verification

After redeployment:

1. **Visit your live site**
2. **Open browser console** (F12 → Console)
3. **Look for these messages**:
   ```
   ✅ 📊 Google Analytics 4 initialized: G-Z1RLPEVPMT
   ✅ 🔥 Initializing Firebase...
   ✅ 📊 Firebase Analytics initialized
   ✅ 🆔 New session created: session_...
   ```

4. **Test the chat** - send a message
5. **Check GA4 Realtime**: https://analytics.google.com/
   - Select Property: G-Z1RLPEVPMT
   - Go to: Reports → Realtime
   - You should see your active session!

6. **Check Firestore**: https://console.firebase.google.com/project/gen-lang-client-0017528127
   - Go to: Firestore Database
   - Look for `conversations` collection
   - Your session should appear!

---

## 🚨 Common Issues

### "Build failed" after pushing
➡️ **Cause**: Missing environment variables
➡️ **Fix**: Add ALL variables above, then redeploy

### "Firebase not initialized" in console
➡️ **Cause**: NEXT_PUBLIC_FIREBASE_* variables not set
➡️ **Fix**: Check you added ALL 7 Firebase variables

### "GA4 not tracking"
➡️ **Cause**: NEXT_PUBLIC_GA4_MEASUREMENT_ID not set
➡️ **Fix**: Add the GA4 variable, redeploy

---

## 🎯 Why NEXT_PUBLIC_ Prefix?

In Next.js:
- `NEXT_PUBLIC_*` variables are exposed to the browser
- Other variables (like `GOOGLE_API_KEY`) are server-side only
- Firebase and GA4 need browser access, so they use `NEXT_PUBLIC_*`

---

## 📊 What Happens After Setup

Once environment variables are added and deployed:

✅ **Page views tracked automatically**
✅ **Firebase initializes on site load**
✅ **GA4 starts collecting events**
✅ **Sessions logged to Firestore**
✅ **Ready for full analytics integration**

---

## 🔗 Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GA4 Console**: https://analytics.google.com/
- **Firebase Console**: https://console.firebase.google.com/project/gen-lang-client-0017528127
- **GitHub Repo**: https://github.com/rithwikmavuluri/ai-portfolio-website

---

**Add these variables NOW to get analytics working on production! 🚀**

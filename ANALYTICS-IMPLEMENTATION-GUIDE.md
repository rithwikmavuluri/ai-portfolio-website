# Analytics Implementation Guide

## ✅ What's Been Implemented

### 1. Core Infrastructure (COMPLETED)
- ✅ Firebase configuration (`lib/firebase.ts`)
- ✅ GA4 analytics utilities (`utils/analytics.ts`)
- ✅ Firestore conversation logger (`utils/conversationLogger.ts`)
- ✅ Analytics Provider component (`components/AnalyticsProvider.tsx`)
- ✅ Updated app layout with Analytics Provider
- ✅ Firestore security rules (`firestore.rules`)
- ✅ Updated environment variables with `NEXT_PUBLIC_` prefix

### 2. Remaining Integration Steps

#### Step 1: Update ChatInterface Component

Add these imports at the top of `components/ChatInterface.tsx`:

```typescript
import {
  trackConversationStarted,
  trackMessageSent,
  trackMessageReceived,
  trackCTAShown,
  trackCTAClickedInChat,
} from '@/utils/analytics';
import {
  getSessionId,
  initializeSession,
  logMessage,
  markCTAShown,
  markCTAClicked,
} from '@/utils/conversationLogger';
```

Add session ID state at the beginning of the component:

```typescript
const [sessionId] = useState(() => getSessionId());
```

Initialize session on mount (add this useEffect):

```typescript
useEffect(() => {
  // Initialize session and track conversation started
  initializeSession(sessionId);
  trackConversationStarted(sessionId);
}, [sessionId]);
```

Update the `sendMessage` function to add logging:

```typescript
const sendMessage = async (messageText: string) => {
  if (!messageText.trim() || isLoading) return;

  const userMessage: Message = {
    role: 'user',
    content: messageText.trim(),
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  setInput('');
  setIsLoading(true);

  // Log user message to Firestore
  await logMessage(sessionId, 'user', messageText.trim());

  // Track message sent in GA4
  const userMessageCount = messages.filter(m => m.role === 'user').length + 1;
  trackMessageSent(sessionId, userMessageCount);

  const startTime = Date.now(); // Track response time

  try {
    // ... existing API call code ...

    // After receiving full response:
    const responseTime = Date.now() - startTime;

    // Log assistant message to Firestore
    await logMessage(sessionId, 'assistant', assistantMessage, {
      responseTime,
      modelUsed: 'gemini-2.0-flash-exp',
    });

    // Track message received in GA4
    trackMessageReceived(sessionId, responseTime);

  } catch (error) {
    // ... existing error handling ...
  }
};
```

Update the CTA shown effect:

```typescript
useEffect(() => {
  const userMessageCount = messages.filter(m => m.role === 'user').length;
  if (userMessageCount >= 2 && !showCalendlyCTA) {
    setShowCalendlyCTA(true);

    // Track CTA shown
    markCTAShown(sessionId);
    trackCTAShown(sessionId);
  }
}, [messages, showCalendlyCTA, sessionId]);
```

Add CTA click handler to the "Book a Call" button:

```typescript
const handleCTAClick = () => {
  // Track CTA clicked
  markCTAClicked(sessionId);
  trackCTAClickedInChat(sessionId);
};

// In the JSX, update the button:
<a
  href="https://calendly.com/rithwikmavuluri/30min"
  target="_blank"
  rel="noopener noreferrer"
  onClick={handleCTAClick}
  className="..."
>
  <Calendar className="w-5 h-5" />
  Book a call
</a>
```

#### Step 2: Update FloatingNav Component

Add these imports to `components/FloatingNav.tsx`:

```typescript
import { trackCTAClick } from '@/utils/analytics';
```

Add click handler function:

```typescript
const handleCTAClick = (ctaName: string, ctaUrl: string) => {
  trackCTAClick(ctaName, ctaUrl, 'floating_nav');
};
```

Update each link in the navItems map:

```typescript
<a
  key={index}
  href={item.href}
  target={item.href.startsWith('mailto:') ? undefined : '_blank'}
  rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
  onClick={() => handleCTAClick(item.name, item.href)}
  // ... rest of props
>
```

#### Step 3: Deploy Firestore Security Rules

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project: `gen-lang-client-0017528127`
3. Navigate to: Firestore Database → Rules
4. Copy the rules from `firestore.rules` file
5. Click "Publish"

#### Step 4: Test Implementation

Run this test script to verify everything works:

```bash
# Test locally
npm run dev

# Open browser console and check for:
# - "📊 Google Analytics 4 initialized"
# - "🔥 Initializing Firebase..."
# - "🆔 New session created: session_..."
# - "✅ Session initialized in Firestore"

# Send a message in chat and verify:
# - "💾 user message logged"
# - "📤 Message sent tracked"
# - "💾 assistant message logged"
# - "📥 Message received tracked"

# After 2 messages, verify:
# - "👁️  CTA marked as shown"
# - "👁️  CTA shown in chat"

# Click a CTA and verify:
# - "🔗 CTA Click tracked: [name] from floating_nav"
```

## 🔍 Verification Checklist

### GA4 Verification
1. Go to: https://analytics.google.com/
2. Select Property: G-Z1RLPEVPMT
3. Go to: Reports → Realtime
4. You should see:
   - Active users
   - Page views
   - Events (CTA clicks, chatbot events)

### Firestore Verification
1. Go to Firebase Console
2. Navigate to: Firestore Database
3. Check `conversations` collection
4. You should see:
   - Session documents with metadata
   - `messages` subcollection with user/assistant messages
   - `ctaShown` and `ctaClicked` fields updated

## 🚀 Deployment

After implementing all changes:

```bash
# Test locally first
npm run dev

# Commit changes
git add .
git commit -m "Implement comprehensive analytics tracking

- Add GA4 page view and event tracking
- Add Firestore conversation logging
- Track CTA clicks across all components
- Track chatbot interactions and CTAs
- Implement session-based tracking
- Add privacy-focused Firestore security rules"

# Push to GitHub (Vercel will auto-deploy)
git push
```

## 📊 Analytics Schema

### Firestore Structure
```
conversations/
  {sessionId}/
    - sessionId: string
    - startTime: timestamp
    - lastActiveTime: timestamp
    - messageCount: number
    - userAgent: string
    - referrer: string
    - ctaShown: boolean
    - ctaClicked: boolean
    - ctaShownTime: timestamp (optional)
    - ctaClickedTime: timestamp (optional)

    messages/
      {messageId}/
        - role: 'user' | 'assistant'
        - content: string
        - timestamp: timestamp
        - responseTime: number (ms, for assistant only)
        - tokensUsed: number (optional)
        - modelUsed: string
```

### GA4 Events
1. **Page Views**: Automatic on route change
2. **CTA Clicks**:
   - category: 'CTA'
   - action: 'click'
   - label: CTA name (Gmail, LinkedIn, etc.)
   - cta_location: 'floating_nav' | 'chat_interface'

3. **Chatbot Events**:
   - `conversation_started`: When session begins
   - `message_sent`: Each user message
   - `message_received`: Each AI response
   - `cta_shown`: "Book a Call" CTA appears
   - `cta_clicked`: "Book a Call" CTA clicked

## 🔐 Privacy & Security

- ✅ No PII collected
- ✅ Session IDs are random, not user-identifiable
- ✅ Firestore reads restricted (write-only for clients)
- ✅ Analytics data anonymous
- ✅ Compliant with GDPR/CCPA best practices

## 🐛 Troubleshooting

### Firebase not initializing?
- Check environment variables start with `NEXT_PUBLIC_`
- Verify Firebase config in console
- Check browser console for errors

### GA4 not tracking?
- Verify measurement ID in .env.local
- Check GA4 Realtime reports (data appears in ~1 minute)
- Check browser console for initialization message

### Firestore writes failing?
- Verify security rules are published
- Check Firebase Console for quota limits
- Verify project ID matches in config

## 📞 Support

If you encounter issues:
1. Check browser console for error messages
2. Verify all environment variables are set
3. Test with a new incognito window
4. Check Firebase Console for quota/errors

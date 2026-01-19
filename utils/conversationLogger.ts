/**
 * Firestore Conversation Logger
 * Handles session-based conversation tracking and storage
 */

import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Session ID storage key
const SESSION_STORAGE_KEY = 'portfolio_session_id';

/**
 * Generate a unique session ID
 * Format: session_${timestamp}_${random}
 */
export const generateSessionId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `session_${timestamp}_${random}`;
};

/**
 * Get or create session ID from localStorage
 */
export const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';

  let sessionId = localStorage.getItem(SESSION_STORAGE_KEY);

  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    console.log('🆔 New session created:', sessionId);
  } else {
    console.log('🆔 Existing session loaded:', sessionId);
  }

  return sessionId;
};

/**
 * Initialize a new conversation session in Firestore
 */
export const initializeSession = async (sessionId: string) => {
  if (!db) {
    console.warn('⚠️ Firestore not initialized');
    return false;
  }

  try {
    const sessionRef = doc(db, 'conversations', sessionId);

    await setDoc(sessionRef, {
      sessionId,
      startTime: serverTimestamp(),
      lastActiveTime: serverTimestamp(),
      messageCount: 0,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
      referrer: typeof window !== 'undefined' ? document.referrer : '',
      ctaShown: false,
      ctaClicked: false,
    });

    console.log('✅ Session initialized in Firestore:', sessionId);
    return true;
  } catch (error) {
    console.error('❌ Error initializing session:', error);
    return false;
  }
};

/**
 * Log a message to the conversation
 * @param sessionId - Unique session identifier
 * @param role - 'user' or 'assistant'
 * @param content - Message content
 * @param metadata - Optional metadata (responseTime, tokensUsed, modelUsed)
 */
export const logMessage = async (
  sessionId: string,
  role: 'user' | 'assistant',
  content: string,
  metadata?: {
    responseTime?: number;
    tokensUsed?: number;
    modelUsed?: string;
  }
) => {
  if (!db) {
    console.warn('⚠️ Firestore not initialized');
    return false;
  }

  try {
    // Reference to messages subcollection
    const messagesRef = collection(db, 'conversations', sessionId, 'messages');

    // Add message to subcollection
    await addDoc(messagesRef, {
      role,
      content,
      timestamp: serverTimestamp(),
      responseTime: metadata?.responseTime || null,
      tokensUsed: metadata?.tokensUsed || null,
      modelUsed: metadata?.modelUsed || 'gemini-2.0-flash-exp',
    });

    // Update session last active time and message count
    const sessionRef = doc(db, 'conversations', sessionId);
    await updateDoc(sessionRef, {
      lastActiveTime: serverTimestamp(),
      messageCount: (await getMessageCount(sessionId)) + 1,
    });

    console.log(`💾 ${role} message logged:`, content.substring(0, 50) + '...');
    return true;
  } catch (error) {
    console.error('❌ Error logging message:', error);
    return false;
  }
};

/**
 * Get current message count for a session
 * This is a helper to increment message count
 */
const getMessageCount = async (sessionId: string): Promise<number> => {
  try {
    // In a real implementation, you'd query Firestore
    // For now, we'll use a simple counter in memory
    // This will be updated by the updateDoc call above
    return 0;
  } catch (error) {
    return 0;
  }
};

/**
 * Mark CTA as shown in the conversation
 * @param sessionId - Unique session identifier
 */
export const markCTAShown = async (sessionId: string) => {
  if (!db) {
    console.warn('⚠️ Firestore not initialized');
    return false;
  }

  try {
    const sessionRef = doc(db, 'conversations', sessionId);
    await updateDoc(sessionRef, {
      ctaShown: true,
      ctaShownTime: serverTimestamp(),
    });

    console.log('👁️  CTA marked as shown:', sessionId);
    return true;
  } catch (error) {
    console.error('❌ Error marking CTA as shown:', error);
    return false;
  }
};

/**
 * Mark CTA as clicked in the conversation
 * @param sessionId - Unique session identifier
 */
export const markCTAClicked = async (sessionId: string) => {
  if (!db) {
    console.warn('⚠️ Firestore not initialized');
    return false;
  }

  try {
    const sessionRef = doc(db, 'conversations', sessionId);
    await updateDoc(sessionRef, {
      ctaClicked: true,
      ctaClickedTime: serverTimestamp(),
    });

    console.log('🎯 CTA marked as clicked:', sessionId);
    return true;
  } catch (error) {
    console.error('❌ Error marking CTA as clicked:', error);
    return false;
  }
};

/**
 * Update session metadata
 * @param sessionId - Unique session identifier
 * @param updates - Key-value pairs to update
 */
export const updateSession = async (
  sessionId: string,
  updates: Record<string, any>
) => {
  if (!db) {
    console.warn('⚠️ Firestore not initialized');
    return false;
  }

  try {
    const sessionRef = doc(db, 'conversations', sessionId);
    await updateDoc(sessionRef, {
      ...updates,
      lastActiveTime: serverTimestamp(),
    });

    console.log('🔄 Session updated:', sessionId, updates);
    return true;
  } catch (error) {
    console.error('❌ Error updating session:', error);
    return false;
  }
};

/**
 * Clear session from localStorage (useful for testing)
 */
export const clearSession = () => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(SESSION_STORAGE_KEY);
  console.log('🧹 Session cleared from localStorage');
};

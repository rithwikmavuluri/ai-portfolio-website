/**
 * Google Analytics 4 (GA4) Tracking Utilities
 * Handles all GA4 event tracking for the portfolio
 */

import ReactGA from 'react-ga4';

// Initialize GA4
let isInitialized = false;

export const initGA = () => {
  if (typeof window === 'undefined') return;

  const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

  if (!measurementId) {
    console.warn('⚠️ GA4 Measurement ID not found in environment variables');
    return;
  }

  if (!isInitialized) {
    ReactGA.initialize(measurementId, {
      gaOptions: {
        send_page_view: false, // We'll handle this manually
      },
    });
    isInitialized = true;
    console.log('📊 Google Analytics 4 initialized:', measurementId);
  }
};

/**
 * Track page view
 */
export const trackPageView = (path?: string) => {
  if (!isInitialized) return;

  const pagePath = path || window.location.pathname + window.location.search;

  ReactGA.send({
    hitType: 'pageview',
    page: pagePath,
  });

  console.log('📄 Page view tracked:', pagePath);
};

/**
 * Track CTA clicks
 * @param ctaName - Name of the CTA (e.g., 'Gmail', 'LinkedIn', 'Calendly')
 * @param ctaUrl - URL of the CTA
 * @param location - Where the CTA was clicked (e.g., 'floating_nav', 'chat_interface')
 */
export const trackCTAClick = (
  ctaName: string,
  ctaUrl: string,
  location: string
) => {
  if (!isInitialized) return;

  ReactGA.event({
    category: 'CTA',
    action: 'click',
    label: ctaName,
    value: undefined,
    nonInteraction: false,
    transport: 'beacon',
    // Custom parameters
    cta_name: ctaName,
    cta_url: ctaUrl,
    cta_location: location,
  });

  console.log(`🔗 CTA Click tracked: ${ctaName} from ${location}`);
};

/**
 * Track chatbot conversation started
 */
export const trackConversationStarted = (sessionId: string) => {
  if (!isInitialized) return;

  ReactGA.event({
    category: 'Chatbot',
    action: 'conversation_started',
    label: sessionId,
    session_id: sessionId,
  });

  console.log('💬 Conversation started tracked:', sessionId);
};

/**
 * Track message sent by user
 * @param sessionId - Unique session identifier
 * @param messageCount - Number of messages in this session
 */
export const trackMessageSent = (sessionId: string, messageCount: number) => {
  if (!isInitialized) return;

  ReactGA.event({
    category: 'Chatbot',
    action: 'message_sent',
    label: `Session ${sessionId}`,
    value: messageCount,
    session_id: sessionId,
    message_count: messageCount,
  });

  console.log(`📤 Message sent tracked: ${messageCount} in session ${sessionId}`);
};

/**
 * Track message received from AI
 * @param sessionId - Unique session identifier
 * @param responseTime - Time taken to generate response (ms)
 */
export const trackMessageReceived = (
  sessionId: string,
  responseTime?: number
) => {
  if (!isInitialized) return;

  ReactGA.event({
    category: 'Chatbot',
    action: 'message_received',
    label: `Session ${sessionId}`,
    value: responseTime,
    session_id: sessionId,
    response_time_ms: responseTime,
  });

  console.log(
    `📥 Message received tracked: ${responseTime}ms in session ${sessionId}`
  );
};

/**
 * Track when "Book a Call" CTA is shown in chat
 * @param sessionId - Unique session identifier
 */
export const trackCTAShown = (sessionId: string) => {
  if (!isInitialized) return;

  ReactGA.event({
    category: 'Chatbot',
    action: 'cta_shown',
    label: 'Book a Call CTA',
    session_id: sessionId,
  });

  console.log('👁️  CTA shown in chat:', sessionId);
};

/**
 * Track when "Book a Call" CTA is clicked in chat
 * @param sessionId - Unique session identifier
 */
export const trackCTAClickedInChat = (sessionId: string) => {
  if (!isInitialized) return;

  ReactGA.event({
    category: 'Chatbot',
    action: 'cta_clicked',
    label: 'Book a Call CTA',
    session_id: sessionId,
  });

  console.log('🎯 CTA clicked in chat:', sessionId);
};

/**
 * Track custom event
 * @param category - Event category
 * @param action - Event action
 * @param label - Event label (optional)
 * @param value - Event value (optional)
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  if (!isInitialized) return;

  ReactGA.event({
    category,
    action,
    label,
    value,
  });

  console.log(`📊 Custom event tracked: ${category} - ${action}`);
};

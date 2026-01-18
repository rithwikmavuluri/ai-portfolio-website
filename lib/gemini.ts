import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI {
  if (!genAI) {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY environment variable is not set');
    }
    genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  }
  return genAI;
}

const SYSTEM_INSTRUCTION = `You are Rithwik Mavuluri's AI assistant, helping visitors learn about his experience as an AI Product Manager.

Core traits:
- Direct and concise (no fluff)
- Focus on impact and outcomes
- Use specific metrics when available
- Demonstrate both speed (shipping fast) and depth (thinking deeply)

Guidelines:
- Answer based ONLY on provided context
- If information isn't in context, say "I don't have specific information about that, but I can tell you..."
- Keep responses under 150 words unless asked for more detail
- Use bullet points for lists of 3+ items
- End with a relevant follow-up question when appropriate

Context about Rithwik:
- 5.5 years PM experience (Arka Energy, Mason, Zinnov)
- Shipped AI agent, roof detection (95% time reduction), mobile app
- Expertise: RAG, LangChain, Gemini, Computer Vision, Product Strategy
- Education: BITS Pilani (Dual Degree), Duke ML cert, Gen AI cert (in progress)`;

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Generate a response using Gemini 2.0 Flash with streaming
 * @param userMessage - User's question
 * @param context - Retrieved context from vector search
 * @param conversationHistory - Previous messages (optional)
 * @returns Async generator yielding text chunks
 */
export async function* generateStreamingResponse(
  userMessage: string,
  context: string,
  conversationHistory: ChatMessage[] = []
): AsyncGenerator<string, void, unknown> {
  try {
    const model = getGenAI().getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
        topP: 0.95,
      }
    });

    // Build chat history for Gemini format
    const history = conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({ history });

    // Build prompt with context
    const prompt = `Context from Rithwik's portfolio:\n${context}\n\nQuestion: ${userMessage}\n\nAnswer:`;

    const result = await chat.sendMessageStream(prompt);

    // Stream response chunks
    for await (const chunk of result.stream) {
      const text = chunk.text();
      yield text;
    }
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

/**
 * Generate a complete (non-streaming) response
 * @param userMessage - User's question
 * @param context - Retrieved context from vector search
 * @param conversationHistory - Previous messages (optional)
 * @returns Complete response text
 */
export async function generateResponse(
  userMessage: string,
  context: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  try {
    const model = getGenAI().getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
        topP: 0.95,
      }
    });

    const history = conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({ history });

    const prompt = `Context from Rithwik's portfolio:\n${context}\n\nQuestion: ${userMessage}\n\nAnswer:`;

    const result = await chat.sendMessage(prompt);
    const response = result.response;

    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

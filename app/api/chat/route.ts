import { NextRequest, NextResponse } from 'next/server';
import { searchSimilarChunks } from '@/lib/vector-db';
import { generateStreamingResponse, ChatMessage } from '@/lib/gemini';
import { loadKnowledgeBase } from '@/lib/load-knowledge-base';

export const runtime = 'nodejs'; // Use Node.js runtime for fs access

// Load knowledge base on cold start
loadKnowledgeBase();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, conversationHistory } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    console.log(`📩 Received message: "${message}"`);

    // 1. Search for relevant context using vector similarity
    const relevantChunks = await searchSimilarChunks(message, 5, 0.5);

    if (relevantChunks.length === 0) {
      console.warn('⚠️ No relevant chunks found. Responding with general context.');
    }

    // 2. Build context string from retrieved chunks
    const context = relevantChunks.length > 0
      ? relevantChunks
          .map((chunk, i) => `[Source ${i + 1}]: ${chunk.text}`)
          .join('\n\n---\n\n')
      : 'No specific context found. Provide general information about Rithwik Mavuluri as an AI Product Manager.';

    console.log(`🔍 Retrieved ${relevantChunks.length} relevant chunks`);

    // 3. Generate streaming response with Gemini
    const stream = generateStreamingResponse(
      message,
      context,
      (conversationHistory as ChatMessage[])?.slice(-6) || []
    );

    // 4. Create a ReadableStream to send chunks to the client
    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        } catch (error) {
          console.error('❌ Streaming error:', error);
          controller.error(error);
        }
      }
    });

    // 5. Return streaming response
    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      }
    });

  } catch (error) {
    console.error('❌ Chat API error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS (if needed)
export async function OPTIONS(req: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

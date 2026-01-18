import * as dotenv from 'dotenv';
import * as path from 'path';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function testGemini() {
  console.log('🧪 Testing Gemini API...\n');

  const apiKey = process.env.GOOGLE_API_KEY;
  console.log(`API Key loaded: ${apiKey ? apiKey.substring(0, 10) + '...' : 'NOT FOUND'}\n`);

  if (!apiKey) {
    console.error('❌ GOOGLE_API_KEY not found in environment variables');
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    // Test 1: Gemini Chat
    console.log('Test 1: Gemini 2.0 Flash Chat...');
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const result = await model.generateContent("Say hello in one word");
    console.log(`✅ Gemini Chat works! Response: ${result.response.text()}\n`);
  } catch (error) {
    console.error('❌ Gemini Chat failed:', error);
    console.log('');
  }

  try {
    // Test 2: Text Embedding
    console.log('Test 2: text-embedding-004...');
    const embedModel = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const embedResult = await embedModel.embedContent("Hello world");
    console.log(`✅ Embeddings work! Vector dimension: ${embedResult.embedding.values.length}\n`);
  } catch (error: any) {
    console.error('❌ Embeddings failed:', error.message);
    if (error.errorDetails) {
      console.error('Details:', JSON.stringify(error.errorDetails, null, 2));
    }
    console.log('\n⚠️  The embedding API might not be enabled or available for your API key.');
    console.log('   Try using Gemini 1.5 Pro which has embedContent method built-in.\n');
  }
}

testGemini().catch(console.error);

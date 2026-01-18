import * as dotenv from 'dotenv';
import * as path from 'path';
import { loadKnowledgeBase } from '../lib/load-knowledge-base';
import { searchSimilarChunks } from '../lib/vector-db';
import { generateResponse } from '../lib/gemini';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function testRAG() {
  console.log('🧪 Testing RAG Pipeline End-to-End\n');

  // Step 1: Load knowledge base
  console.log('Step 1: Loading knowledge base...');
  loadKnowledgeBase();
  console.log('');

  // Step 2: Test vector search
  console.log('Step 2: Testing vector search...');
  const testQuery = "What experience does Rithwik have with AI?";
  console.log(`Query: "${testQuery}"\n`);

  const results = await searchSimilarChunks(testQuery, 3, 0.5);

  console.log(`Found ${results.length} relevant chunks:\n`);
  results.forEach((chunk, i) => {
    console.log(`  ${i + 1}. [Similarity: ${chunk.similarity.toFixed(3)}]`);
    console.log(`     ${chunk.text.substring(0, 100)}...`);
    console.log(`     Source: ${chunk.metadata.source} | Category: ${chunk.metadata.category}\n`);
  });

  // Step 3: Test Gemini response generation
  console.log('Step 3: Testing Gemini response generation...');
  const context = results.map(r => r.text).join('\n\n---\n\n');

  try {
    const response = await generateResponse(testQuery, context);
    console.log('\n✅ Gemini Response:');
    console.log('─'.repeat(60));
    console.log(response);
    console.log('─'.repeat(60));
  } catch (error: any) {
    if (error.status === 429) {
      console.log('\n⚠️  Rate limit hit for Gemini (expected if you tested recently)');
      console.log('   The RAG pipeline is working! Embeddings and vector search succeeded.');
      console.log('   Wait a minute and the chat API will work fine.\n');
    } else {
      throw error;
    }
  }

  console.log('\n✅ RAG Pipeline Test Complete!');
  console.log('\nNext: Start the dev server and test the /api/chat endpoint');
  console.log('  npm run dev');
  console.log('  curl -X POST http://localhost:3000/api/chat \\');
  console.log('    -H "Content-Type: application/json" \\');
  console.log(`    -d '{"message": "${testQuery}"}'`);
}

testRAG().catch(console.error);

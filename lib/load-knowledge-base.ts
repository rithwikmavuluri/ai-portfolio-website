import * as fs from 'fs';
import * as path from 'path';
import { initializeVectorStore, Chunk } from './vector-db';

let isInitialized = false;

/**
 * Load knowledge base from knowledge-base.json file
 * This should be called when the server starts
 */
export function loadKnowledgeBase(): void {
  if (isInitialized) {
    console.log('ℹ️ Knowledge base already initialized');
    return;
  }

  try {
    const knowledgeBasePath = path.join(process.cwd(), 'knowledge-base.json');

    if (!fs.existsSync(knowledgeBasePath)) {
      console.warn('⚠️ knowledge-base.json not found. Please run: npx tsx scripts/build-knowledge-base.ts');
      console.warn('⚠️ Vector search will not work until knowledge base is generated.');
      return;
    }

    const data = fs.readFileSync(knowledgeBasePath, 'utf-8');
    const chunks: Chunk[] = JSON.parse(data);

    initializeVectorStore(chunks);
    isInitialized = true;

    console.log('✅ Knowledge base loaded successfully');
    console.log(`📚 Loaded ${chunks.length} chunks into vector store`);
  } catch (error) {
    console.error('❌ Error loading knowledge base:', error);
    throw error;
  }
}

/**
 * Check if knowledge base is initialized
 */
export function isKnowledgeBaseInitialized(): boolean {
  return isInitialized;
}

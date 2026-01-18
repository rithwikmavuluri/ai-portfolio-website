import { generateEmbedding, cosineSimilarity } from './embeddings';

export interface Chunk {
  id: string;
  text: string;
  embedding: number[];
  metadata: {
    source: string;
    category: string;
    section: string;
    timestamp: string;
  };
}

// In-memory vector store (simple implementation for MVP)
// In production, you'd use Firestore Vector Search or ChromaDB
let vectorStore: Chunk[] = [];

/**
 * Initialize or load the vector store from a data source
 * @param chunks - Array of chunks with embeddings
 */
export function initializeVectorStore(chunks: Chunk[]): void {
  vectorStore = chunks;
  console.log(`✅ Vector store initialized with ${chunks.length} chunks`);
}

/**
 * Add chunks to the vector store
 * @param chunks - Chunks to add
 */
export function addChunks(chunks: Chunk[]): void {
  vectorStore.push(...chunks);
  console.log(`✅ Added ${chunks.length} chunks to vector store`);
}

/**
 * Search for similar chunks using cosine similarity
 * @param queryText - User's query text
 * @param topK - Number of results to return
 * @param similarityThreshold - Minimum similarity score (0-1)
 * @returns Top K most similar chunks
 */
export async function searchSimilarChunks(
  queryText: string,
  topK: number = 5,
  similarityThreshold: number = 0.7
): Promise<Array<Chunk & { similarity: number }>> {
  if (vectorStore.length === 0) {
    console.warn('⚠️ Vector store is empty. Please initialize it first.');
    return [];
  }

  // Generate embedding for the query
  const queryEmbedding = await generateEmbedding(queryText);

  // Calculate similarity scores for all chunks
  const results = vectorStore.map(chunk => ({
    ...chunk,
    similarity: cosineSimilarity(queryEmbedding, chunk.embedding)
  }));

  // Filter by threshold and sort by similarity (descending)
  const filteredResults = results
    .filter(result => result.similarity >= similarityThreshold)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK);

  console.log(`🔍 Found ${filteredResults.length} similar chunks for query: "${queryText}"`);

  return filteredResults;
}

/**
 * Get the current vector store (for debugging/inspection)
 */
export function getVectorStore(): Chunk[] {
  return vectorStore;
}

/**
 * Clear the vector store
 */
export function clearVectorStore(): void {
  vectorStore = [];
  console.log('🗑️ Vector store cleared');
}

/**
 * Save vector store to a JSON file (for persistence)
 */
export function serializeVectorStore(): string {
  return JSON.stringify(vectorStore, null, 2);
}

/**
 * Load vector store from a JSON string
 */
export function deserializeVectorStore(data: string): void {
  vectorStore = JSON.parse(data);
  console.log(`✅ Vector store loaded with ${vectorStore.length} chunks`);
}

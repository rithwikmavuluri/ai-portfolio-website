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

export type TaskType = "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY";

/**
 * Generate embedding for a single text using Google's text-embedding-004 model
 * @param text - Text to embed
 * @param taskType - RETRIEVAL_DOCUMENT for storing, RETRIEVAL_QUERY for searching
 * @returns 768-dimensional embedding vector
 */
export async function generateEmbedding(
  text: string
): Promise<number[]> {
  try {
    const model = getGenAI().getGenerativeModel({ model: "text-embedding-004" });

    const result = await model.embedContent(text);

    return result.embedding.values; // 768-dimensional vector
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

/**
 * Generate embeddings for multiple texts in batches
 * @param texts - Array of texts to embed
 * @param taskType - RETRIEVAL_DOCUMENT for storing, RETRIEVAL_QUERY for searching
 * @returns Array of 768-dimensional embedding vectors
 */
export async function batchGenerateEmbeddings(
  texts: string[]
): Promise<number[][]> {
  const BATCH_SIZE = 100; // Google AI Studio limit
  const embeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);

    console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(texts.length / BATCH_SIZE)}`);

    const batchEmbeddings = await Promise.all(
      batch.map(text => generateEmbedding(text))
    );

    embeddings.push(...batchEmbeddings);

    // Rate limiting: wait between batches (Google AI Studio: 15 RPM free tier)
    if (i + BATCH_SIZE < texts.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return embeddings;
}

/**
 * Calculate cosine similarity between two vectors
 * @param vecA - First embedding vector
 * @param vecB - Second embedding vector
 * @returns Cosine similarity score (0 to 1)
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { generateEmbedding } from '../lib/embeddings';
import { Chunk } from '../lib/vector-db';

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

interface ContentChunk {
  text: string;
  metadata: {
    source: string;
    category: string;
    section: string;
    timestamp: string;
  };
}

/**
 * Chunk content from content.json into searchable pieces
 */
function chunkContent(content: any): ContentChunk[] {
  const chunks: ContentChunk[] = [];
  const timestamp = new Date().toISOString();

  // 1. Chunk personal info and summary
  if (content.personal) {
    chunks.push({
      text: `Rithwik Mavuluri is an AI Product Manager with ${content.personal.experience_years} years of experience. Tagline: ${content.personal.tagline}. Location: ${content.personal.location}. Email: ${content.personal.email}`,
      metadata: {
        source: 'personal',
        category: 'overview',
        section: 'intro',
        timestamp
      }
    });
  }

  // 2. Chunk work experience
  content.experience?.forEach((exp: any) => {
    // Company overview
    chunks.push({
      text: `${exp.company} (${exp.description}) - ${exp.role} from ${exp.start_date} to ${exp.end_date || 'Present'}. Location: ${exp.location}.`,
      metadata: {
        source: 'experience',
        category: 'work_history',
        section: exp.company,
        timestamp
      }
    });

    // Individual highlights
    exp.highlights?.forEach((highlight: string, idx: number) => {
      chunks.push({
        text: `At ${exp.company} as ${exp.role}: ${highlight}`,
        metadata: {
          source: 'experience',
          category: 'achievements',
          section: `${exp.company}_highlight_${idx}`,
          timestamp
        }
      });
    });
  });

  // 3. Chunk projects
  content.projects?.forEach((project: any) => {
    chunks.push({
      text: `Project: ${project.title}. ${project.short_description}. Technologies used: ${project.technologies.join(', ')}.`,
      metadata: {
        source: 'projects',
        category: 'technical',
        section: project.id,
        timestamp
      }
    });
  });

  // 4. Chunk case study (detailed sections)
  if (content.case_study) {
    const cs = content.case_study;

    chunks.push({
      text: `Case Study: ${cs.title}. Impact: ${cs.at_a_glance.impact}. Timeline: ${cs.at_a_glance.timeline}. Role: ${cs.at_a_glance.role}.`,
      metadata: {
        source: 'case_study',
        category: 'overview',
        section: 'roof_detection_summary',
        timestamp
      }
    });

    chunks.push({
      text: `Problem: ${cs.problem}`,
      metadata: {
        source: 'case_study',
        category: 'problem',
        section: 'roof_detection_problem',
        timestamp
      }
    });

    chunks.push({
      text: `Solution: ${cs.solution}`,
      metadata: {
        source: 'case_study',
        category: 'solution',
        section: 'roof_detection_solution',
        timestamp
      }
    });

    // My role details
    if (cs.my_role) {
      Object.entries(cs.my_role).forEach(([key, value]) => {
        chunks.push({
          text: `Role in roof detection project - ${key}: ${value}`,
          metadata: {
            source: 'case_study',
            category: 'role_details',
            section: `roof_detection_role_${key}`,
            timestamp
          }
        });
      });
    }

    // Impact metrics
    if (cs.impact) {
      Object.entries(cs.impact).forEach(([key, value]) => {
        chunks.push({
          text: `Impact on ${key}: ${value}`,
          metadata: {
            source: 'case_study',
            category: 'impact_metrics',
            section: `roof_detection_impact_${key}`,
            timestamp
          }
        });
      });
    }

    // Learnings
    cs.learnings?.forEach((learning: string, idx: number) => {
      chunks.push({
        text: `Key learning from roof detection project: ${learning}`,
        metadata: {
          source: 'case_study',
          category: 'learnings',
          section: `roof_detection_learning_${idx}`,
          timestamp
        }
      });
    });
  }

  // 5. Chunk skills
  Object.entries(content.skills || {}).forEach(([key, value]: [string, any]) => {
    chunks.push({
      text: `${value.category} skills: ${value.skills.join(', ')}`,
      metadata: {
        source: 'skills',
        category: key,
        section: 'expertise',
        timestamp
      }
    });
  });

  // 6. Chunk education
  if (content.education) {
    const edu = content.education;
    chunks.push({
      text: `Education: ${edu.degree} from ${edu.institution} (${edu.short_name}), ${edu.location}. Duration: ${edu.start_year} - ${edu.end_year}.`,
      metadata: {
        source: 'education',
        category: 'academic',
        section: 'degree',
        timestamp
      }
    });
  }

  // 7. Chunk certifications
  if (content.certifications) {
    Object.entries(content.certifications).forEach(([key, value]: [string, any]) => {
      value.items?.forEach((item: any) => {
        const status = item.status === 'Completed'
          ? `Completed ${item.date || ''}`
          : `In Progress, expected ${item.expected || ''}`;

        chunks.push({
          text: `Certification: ${item.name} from ${item.provider}. Status: ${status}.`,
          metadata: {
            source: 'certifications',
            category: key,
            section: item.name.toLowerCase().replace(/\s+/g, '_'),
            timestamp
          }
        });
      });
    });
  }

  return chunks;
}

/**
 * Main function to build the knowledge base
 */
async function main() {
  console.log('🚀 Building knowledge base from content.json...\n');

  // 1. Load content.json
  const contentPath = path.join(process.cwd(), 'content.json');

  if (!fs.existsSync(contentPath)) {
    throw new Error('content.json not found. Please ensure it exists in the project root.');
  }

  const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
  console.log('✅ Loaded content.json\n');

  // 2. Chunk content
  console.log('📝 Chunking content...');
  const chunks = chunkContent(content);
  console.log(`✅ Created ${chunks.length} chunks\n`);

  // 3. Generate embeddings
  console.log('🔢 Generating embeddings with Google text-embedding-004...');
  console.log('   (This may take a few minutes)\n');

  const chunksWithEmbeddings: Chunk[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];

    try {
      const embedding = await generateEmbedding(chunk.text);

      chunksWithEmbeddings.push({
        id: `chunk_${i}`,
        text: chunk.text,
        embedding,
        metadata: chunk.metadata
      });

      // Progress indicator
      if ((i + 1) % 5 === 0 || i === chunks.length - 1) {
        console.log(`   Progress: ${i + 1}/${chunks.length} chunks processed`);
      }

      // Rate limiting (Google AI Studio free tier: ~15 RPM)
      if (i < chunks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 250)); // 4 requests/second
      }
    } catch (error) {
      console.error(`❌ Error processing chunk ${i}:`, error);
      throw error;
    }
  }

  console.log(`\n✅ Generated ${chunksWithEmbeddings.length} embeddings\n`);

  // 4. Save to JSON file
  const outputPath = path.join(process.cwd(), 'knowledge-base.json');
  fs.writeFileSync(outputPath, JSON.stringify(chunksWithEmbeddings, null, 2));

  console.log(`💾 Saved knowledge base to: ${outputPath}`);
  console.log(`📊 Total size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB\n`);

  console.log('✅ Knowledge base ready!');
  console.log('\nNext steps:');
  console.log('1. The knowledge base is automatically loaded when the server starts');
  console.log('2. Start your dev server: npm run dev');
  console.log('3. Test the chat API: POST to /api/chat with a message');
}

// Run the script
main().catch(console.error);

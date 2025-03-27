/**
 * Analysis Agent
 *
 * This agent is responsible for parsing job descriptions using NLP,
 * extracting requirements and qualifications, and assessing match quality
 * against the user's profile.
 */

import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StructuredTool } from '@langchain/core/tools';
import { AgentExecutor, createOpenAIToolsAgent } from '@langchain/core/agents';
import { jobDescriptionParser, skillExtractor, matchCalculator } from './tools';

export class AnalysisAgent {
  private model: ChatOllama;
  private tools: StructuredTool[];
  private executor: AgentExecutor;

  constructor() {
    // Initialize LLM
    this.model = new ChatOllama({
      baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
      model: process.env.OLLAMA_MODEL_NAME || 'deepseek-coder-v2',
    });

    // Define tools for the agent
    this.tools = [
      jobDescriptionParser,
      skillExtractor,
      matchCalculator,
    ];

    // Create prompt template
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', `You are an Analysis Agent that processes job descriptions and extracts key information.
Your task is to parse job descriptions, identify required skills and qualifications,
and calculate a match score between the job requirements and the user's profile.

For each job, you should extract:
1. Required technical skills
2. Required soft skills
3. Required education
4. Required experience
5. Preferred qualifications
6. Key responsibilities
7. Company culture indicators

Then, compare these requirements against the user's profile to calculate a match score.
Provide detailed reasoning about why the job is or isn't a good match.`],
      ['human', '{input}'],
    ]);

    // Create the agent
    const agent = createOpenAIToolsAgent({
      llm: this.model,
      tools: this.tools,
      prompt,
    });

    // Create the executor
    this.executor = new AgentExecutor({
      agent,
      tools: this.tools,
      returnIntermediateSteps: true,
    });
  }

  /**
   * Invoke the Analysis Agent to process job descriptions
   */
  async invoke(input: {
    userId: string;
    jobs: any[];
    userProfile?: {
      skills: string[];
      experience: any[];
      education: any[];
    };
  }) {
    // TODO: Implement actual job analysis functionality
    console.log(`Analyzing ${input.jobs.length} jobs for user ${input.userId}`);

    // This is a stub implementation
    return input.jobs.map(job => ({
      ...job,
      analysis: {
        requiredSkills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
        requiredExperience: '5+ years in software development',
        requiredEducation: "Bachelor's degree in Computer Science or related field",
        keyResponsibilities: [
          'Develop and maintain web applications',
          'Collaborate with cross-functional teams',
          'Write clean, maintainable code'
        ],
        matchScore: 0.85,
        matchReasoning: 'The candidate has strong JavaScript and React skills, but less experience with Node.js than required. Overall a good match for the position.'
      }
    }));
  }
}
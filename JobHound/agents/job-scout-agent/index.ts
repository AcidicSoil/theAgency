/**
 * Job Scout Agent
 *
 * This agent is responsible for searching job listings based on user criteria,
 * filtering potential matches, and queuing promising opportunities for processing.
 */

import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StructuredTool } from '@langchain/core/tools';
import { AgentExecutor, createOpenAIToolsAgent } from '@langchain/core/agents';
import { jsonArrayOutputParser } from './parser';
import { searchIndeedJobs, searchLinkedInJobs, searchGlassdoorJobs } from './tools';

export class JobScoutAgent {
  private model: ChatOllama;
  private tools: StructuredTool[];
  private executor: AgentExecutor;

  constructor() {
    // Initialize LLM
    this.model = new ChatOllama({
      baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
      model: process.env.OLLAMA_MODEL_NAME || 'qwen2.5-coder',
    });

    // Define tools for the agent
    this.tools = [
      searchIndeedJobs,
      searchLinkedInJobs,
      searchGlassdoorJobs,
    ];

    // Create prompt template
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', `You are a Job Scout Agent that helps users find relevant job opportunities.
Your task is to search for jobs based on user criteria and return the most promising matches.

For each job, you should collect:
1. Job title
2. Company
3. Location
4. Salary (if available)
5. Job description
6. Required skills
7. Experience level
8. Application URL

Use the available tools to search multiple job platforms and combine the results.
Filter out jobs that don't match the user's criteria.
Return results as a JSON array of job objects.`],
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
      outputParser: jsonArrayOutputParser,
    });
  }

  /**
   * Invoke the Job Scout Agent to find job opportunities
   */
  async invoke(input: {
    userId: string;
    parameters: {
      jobTitle: string;
      location: string;
      skills?: string[];
      experienceLevel?: string;
      remote?: boolean;
      salary?: {
        min?: number;
        max?: number;
        currency?: string;
      };
      maxResults?: number;
    };
  }) {
    // TODO: Implement actual job searching functionality
    console.log(`Searching for jobs: ${input.parameters.jobTitle} in ${input.parameters.location}`);

    // This is a stub implementation
    return [
      {
        jobId: 'job-1',
        title: 'Senior Software Engineer',
        company: 'TechCorp',
        location: 'Remote',
        salary: '$120,000 - $150,000',
        description: 'We are looking for a senior software engineer to join our team...',
        requiredSkills: ['JavaScript', 'React', 'Node.js'],
        experienceLevel: '5+ years',
        applicationUrl: 'https://example.com/jobs/123',
        source: 'LinkedIn',
        matchScore: 0.92,
      },
      // More jobs would be returned here
    ];
  }
}
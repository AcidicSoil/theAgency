/**
 * Agentic Workflow System Entry Point
 *
 * This file serves as the main orchestrator for the JobHound agent system.
 * It initializes and coordinates all agents in the workflow.
 */

import { defineConfig } from '@langchain/core/utils/config';
import { initializeAgentSystem } from './orchestrator';
import { JobScoutAgent } from './job-scout-agent';
import { AnalysisAgent } from './analysis-agent';
import { DocumentPrepAgent } from './document-prep-agent';
import { ApplicationAgent } from './application-agent';
import { FollowUpAgent } from './follow-up-agent';

// Configure LangChain
defineConfig({
  langchainTracing: process.env.LANGCHAIN_TRACING === 'true',
  langSmithProjectName: process.env.LANGCHAIN_PROJECT || 'jobhound',
});

/**
 * Main function to initialize and run the agent system
 */
async function main() {
  console.log('Initializing JobHound Agentic Workflow System...');

  try {
    // Initialize all agents
    const jobScoutAgent = new JobScoutAgent();
    const analysisAgent = new AnalysisAgent();
    const documentPrepAgent = new DocumentPrepAgent();
    const applicationAgent = new ApplicationAgent();
    const followUpAgent = new FollowUpAgent();

    // Initialize the orchestrator with all agents
    const agentSystem = await initializeAgentSystem({
      jobScoutAgent,
      analysisAgent,
      documentPrepAgent,
      applicationAgent,
      followUpAgent,
    });

    // Example usage (to be replaced with actual implementation)
    // TODO: Implement proper integration with frontend or API
    const result = await agentSystem.invoke({
      userId: 'test-user',
      command: 'find-jobs',
      parameters: {
        jobTitle: 'Software Engineer',
        location: 'Remote',
        maxResults: 5,
      }
    });

    console.log('Agent workflow completed successfully');
    console.log('Result:', JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('Error in agent system:', error);
    process.exit(1);
  }
}

// Run the system if this file is executed directly
if (require.main === module) {
  main();
}

// Export components for use in the application
export {
  JobScoutAgent,
  AnalysisAgent,
  DocumentPrepAgent,
  ApplicationAgent,
  FollowUpAgent,
  initializeAgentSystem,
};
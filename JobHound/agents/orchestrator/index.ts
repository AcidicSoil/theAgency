/**
 * Agent Orchestration System
 *
 * This module handles the coordination between different agents using LangGraph.
 * It creates a directed acyclic graph (DAG) to manage the workflow of job applications.
 */

import { StateGraph, StateGraphArgs } from 'langgraph';
import { RunnableLambda } from '@langchain/core/runnables';
import { AgentExecutor } from '@langchain/core/agents';

// Types for state and agent input/output
interface WorkflowState {
  userId: string;
  command: string;
  parameters: Record<string, any>;
  jobScoutResults?: any[];
  analysisResults?: any[];
  documentResults?: any[];
  applicationResults?: any[];
  followUpResults?: any[];
  errors?: any[];
  status: 'in_progress' | 'completed' | 'failed';
}

interface AgentSystem {
  jobScoutAgent: AgentExecutor;
  analysisAgent: AgentExecutor;
  documentPrepAgent: AgentExecutor;
  applicationAgent: AgentExecutor;
  followUpAgent: AgentExecutor;
}

/**
 * Initialize the agent workflow system
 */
export async function initializeAgentSystem(agents: AgentSystem) {
  // Create a new state graph
  const workflow = new StateGraph<WorkflowState>({
    channels: {
      userId: {},
      command: {},
      parameters: {},
      jobScoutResults: {},
      analysisResults: {},
      documentResults: {},
      applicationResults: {},
      followUpResults: {},
      errors: {},
      status: {},
    }
  });

  // Add nodes for each agent
  workflow.addNode('jobScout', new RunnableLambda({
    func: async (state: WorkflowState) => {
      try {
        const results = await agents.jobScoutAgent.invoke(state);
        return { jobScoutResults: results };
      } catch (error) {
        return {
          errors: [...(state.errors || []), { agent: 'jobScout', error }],
          status: 'failed'
        };
      }
    }
  }));

  workflow.addNode('analysis', new RunnableLambda({
    func: async (state: WorkflowState) => {
      try {
        const results = await agents.analysisAgent.invoke({
          ...state,
          jobs: state.jobScoutResults
        });
        return { analysisResults: results };
      } catch (error) {
        return {
          errors: [...(state.errors || []), { agent: 'analysis', error }],
          status: 'failed'
        };
      }
    }
  }));

  workflow.addNode('documentPrep', new RunnableLambda({
    func: async (state: WorkflowState) => {
      try {
        const results = await agents.documentPrepAgent.invoke({
          ...state,
          jobAnalysis: state.analysisResults
        });
        return { documentResults: results };
      } catch (error) {
        return {
          errors: [...(state.errors || []), { agent: 'documentPrep', error }],
          status: 'failed'
        };
      }
    }
  }));

  workflow.addNode('application', new RunnableLambda({
    func: async (state: WorkflowState) => {
      try {
        const results = await agents.applicationAgent.invoke({
          ...state,
          documents: state.documentResults
        });
        return { applicationResults: results };
      } catch (error) {
        return {
          errors: [...(state.errors || []), { agent: 'application', error }],
          status: 'failed'
        };
      }
    }
  }));

  workflow.addNode('followUp', new RunnableLambda({
    func: async (state: WorkflowState) => {
      try {
        const results = await agents.followUpAgent.invoke({
          ...state,
          applications: state.applicationResults
        });
        return {
          followUpResults: results,
          status: 'completed'
        };
      } catch (error) {
        return {
          errors: [...(state.errors || []), { agent: 'followUp', error }],
          status: 'failed'
        };
      }
    }
  }));

  // Define the edges of the workflow graph
  workflow.addEdge('jobScout', 'analysis');
  workflow.addEdge('analysis', 'documentPrep');
  workflow.addEdge('documentPrep', 'application');
  workflow.addEdge('application', 'followUp');

  // Add conditional logic for error handling
  workflow.addConditionalEdges(
    'jobScout',
    (state: WorkflowState) => state.errors && state.errors.length > 0 ? 'end' : 'analysis'
  );

  workflow.addConditionalEdges(
    'analysis',
    (state: WorkflowState) => state.errors && state.errors.length > 0 ? 'end' : 'documentPrep'
  );

  // Compile the workflow
  const app = workflow.compile();

  // Return the compiled workflow
  return app;
}
---
description: 
globs: 
alwaysApply: true
---
---
description: 
globs: 
alwaysApply: true
---


for ANY question about LangGraph, use the langgraph-docs-mcp server to help answer -- 
+ call list_doc_sources tool to get the available llms.txt file
+ call fetch_docs tool to read it
+ reflect on the urls in llms.txt 
+ reflect on the input question 
+ call fetch_docs on any urls relevant to the question
+ use this to answer the question

check for running servers and make note of project current status. If not running, check for startup script, if no script, create one and/or start manually 

check toolbox for useful MCP tools currently configured and available for immiediate use


Enter relevant mode for the issue at hand:
- design mode :: implement fastest viable solution 
- engineering mode :: implement robust solution between backend & frontend

Reference relevant codebase for philosophy and guidelines.
Utilize MCP tools to monitor console logs and review pertinent documentation for proper implementation.

Before starting any new task:
1. Document "checkpoint" summary status in scratchpad (see .cursorrules) 
2. Review existing tasks and their status
3. Understand the big picture using knowledge graph context retrieval (if available)

Task Implementation Protocol:
- Attempt Threshold: 5
- If threshold exceeded, implement workaround and document proper solution in scratchpad
- include Test functions and edge cases for all code you write
- Document progress/learnings in scratchpad

When troubleshooting:
- Assume user needs error resolution unless specified otherwise
- Analyze context clues for complete project understanding
- Provide comprehensive solutions based on full project scope

Available MCP Resources:
- @tool-call-error-handler.mdc
- @tool-call-optimization.mdc
- @sovereign-ai-ecosystem-prd.mdc
- @master-prd.mdc
For missing MCP tools:
- Use web search to find appropriate tools
- Configure into current project
- Document additions and notify user of new tool capabilities
- Note prebuilt libraries for concepts where relevant

Prompt user with potential next steps and future improvement recommendations after task completion.
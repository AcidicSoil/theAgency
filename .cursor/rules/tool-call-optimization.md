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
---
description: 
globs: 
alwaysApply: true
---
# Tool Call Optimization Rule

This rule ensures you continue execution until reaching the maximum 25 tool call limit, optimizing value delivery within Cursor IDE constraints.

## Core Principles

1. **NEVER stop before tool call limit unless explicitly instructed**
2. **Maximize value delivery with each tool call**
3. **Always provide progress updates and clear continuation points**
4. **Prioritize operations based on importance and likelihood of success**
5. **Track remaining tool call capacity and adjust strategy accordingly**

## Implementation Requirements

### Execution Strategy

- Continue operation until 25 tool call limit is reached
- Batch similar operations into single tool calls when possible
- Execute most critical operations first in case the limit is reached
- Track tool call usage to manage remaining capacity
- Implement fallback mechanisms when approaching the limit
- Design workflows to be resumable from last successful operation
- Document clear continuation points when reaching the limit

### Recovery Mechanisms

- Create explicit checkpoints after completing significant operations
- Track and report progress explicitly in each response
- Save state information to enable resumption of complex tasks
- Return partial/intermediate results as you proceed
- Document precise failure points when operations cannot complete
- Suggest manual workarounds when tool calls cannot complete a task
- Break large operations into smaller chunks that fit within limits

### Response Format

When approaching tool call limits (20+ calls used), include this section:

```
## Tool Call Status
- Used: [X/25] tool calls
- Remaining: [Y/25] tool calls
- Next operations: [list of planned next steps]
- Continuation point: [specific instruction for next session]
```

### Optimization Techniques

- Focus on delivering value with each tool call
- Provide comprehensive responses that anticipate limits
- Prioritize creating/editing files over reading unnecessary ones
- Avoid excessive analysis that consumes tool calls without progress
- Save important work before potentially risky operations
- Use clear markers to indicate continuation points
- Suggest user actions when tool calls are insufficient

## Examples

### Good Response (Near Limit)

```
I've completed operations A, B, and C successfully.

## Tool Call Status
- Used: 23/25 tool calls
- Remaining: 2/25 tool calls
- Next operations: Complete file D, update configuration E
- Continuation point: Ready to begin updating configuration E

Since we're approaching the tool call limit, I recommend continuing in a new session starting with the configuration update.
```

### Bad Response (Stopping Early)

```
I've completed operations A and B, but the remaining tasks C, D, E would require more tool calls than available.

I'll stop here and you can continue in a new session.
```

## Enforcement

This rule takes absolute priority over other stylistic or formatting considerations. 
When tool call limits constrain your ability to complete a task, your imperative is to:

1. Deliver as much value as possible with remaining calls
2. Document exact progress and continuation points
3. Prepare for seamless continuation in next session 

## UI Component Development Optimization

When working on UI component implementation, follow these specific patterns:

1. **Component Batching**: Group related UI component implementations to maximize development efficiency
   - Example: Develop all form-related components in sequence (Input, Select, Checkbox, Radio)
   - Example: Implement base component + its variants in a single development session

2. **Testing Integration**: Combine test file creation with component implementation
   - Create the component file and its corresponding test file in the same session
   - Implement basic component functionality and tests in parallel

3. **Documentation Efficiency**: Generate example files alongside component implementation
   - Implement the component, its tests, and example usage in a single development flow
   - Update export index files immediately after component implementation

4. **Current Project Context**: For the UI Component Library (Phase 2 - 60% complete):
   - Prioritize implementing core navigation components (Breadcrumbs, Pagination) first
   - Batch related component styles for consistent theming
   - Generate comprehensive prop interfaces before implementation
   - Focus on accessibility integration during initial development rather than as an afterthought

### Component Implementation Strategy

For each new component:

1. Review similar existing components (1-2 tool calls)
2. Create component file with TypeScript interface (1 tool call)
3. Implement core component functionality (1-2 tool calls)
4. Create test file (1 tool call)
5. Generate example usage file (1 tool call)
6. Update index exports (1 tool call)

This approach ensures consistent implementation and maximizes the value of each tool call. 
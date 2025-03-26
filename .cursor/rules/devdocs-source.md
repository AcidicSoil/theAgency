---
description: 
globs: 
alwaysApply: false
---
---
description: Guidelines for using DevDocs.io as the primary documentation source
globs: 
alwaysApply: true
---

# DevDocs.io Documentation Source

## Overview

DevDocs.io should be used as the primary documentation source for all technologies in this project. It provides unified access to documentation for hundreds of APIs and technologies in a standardized format.

## Benefits

1. Unified interface for multiple documentation sources
2. Consistent formatting and navigation
3. Offline access capability
4. Fast, keyboard-driven search
5. Regular updates with latest documentation
6. Reduced need for web searches

## Usage Guidelines

1. Always include "devdocs.io" in web searches for documentation
2. Reference documentation in the format: "According to DevDocs.io/[technology]"
3. Use DevDocs.io before making API calls to external search engines
4. For local development, consider installing the DevDocs desktop app

## DevDocs Keyboard Shortcuts

- `/` - Focus the search box
- `Alt+1` to `Alt+9` - Jump to the n-th search result
- `↑` / `↓` - Select the previous/next search result
- `Enter` - Open the selected search result
- `Escape` - Clear the search and selection

## Documentation Sources

DevDocs.io provides documentation for numerous languages and frameworks including:

- JavaScript, TypeScript, Node.js
- React, Angular, Vue.js
- HTML, CSS, DOM
- Python, Django, Flask
- Ruby, Ruby on Rails
- PHP, WordPress
- SQL databases
- And many more

## Implementation

```typescript
// Example: Integrate DevDocs in your workflow
function checkDocumentation(technology: string, topic: string) {
  const devdocsUrl = `https://devdocs.io/${technology}/${topic}`;
  console.log(`Checking documentation at ${devdocsUrl}`);
  // Open documentation in browser or DevDocs app
}
```

## Web Search Optimization

When documentation searches are needed, use the following format to optimize results:

```
devdocs.io [technology] [feature] [example|tutorial|reference]
```

This format prioritizes DevDocs.io results while also providing focused results from the official documentation.

## URL
https://devdocs.io/

## Available Documentation
DevDocs.io provides documentation for numerous technologies including:

- JavaScript, TypeScript, Node.js
- Python, Django, Flask
- React, Vue, Angular
- HTML, CSS, DOM
- SQL, PostgreSQL, MySQL
- Docker, Kubernetes
- Git, Bash
- And many more...

## Integration with Development Workflow
- Use DevDocs.io for quick reference during development
- Leverage DevDocs.io keyboard shortcuts for efficient documentation navigation
- Consider installing the DevDocs desktop app for offline access
- Use DevDocs.io API for programmatic documentation access when needed

## Example Usage
When researching React hooks:
```
web_search("devdocs.io React hooks useEffect")
```

When looking up TypeScript interfaces:
```
web_search("devdocs.io TypeScript interfaces")
```

## Related Files
 - Contains the task for implementing this rule
- [terminal.md](mdc:Projects/terminal.md) - Terminal commands for development 
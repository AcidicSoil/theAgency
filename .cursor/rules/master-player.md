---
description: 
globs: 
alwaysApply: true
---
---
description: Strategic commands and prompts for efficient codebase navigation and task execution
globs: 
alwaysApply: true
---

# Master Player Guide - Fast Track Commands

This document contains the most efficient commands and strategies for common tasks in the project. Use these to quickly navigate complex situations and perform tasks with minimal effort.

## Todo Management

### Adding Todo Items


### Listing and Filtering Todos

## Development Mode Management

### Switching Development Modes

### Getting Mode Context

## Documentation Management

### Adding Documentation Tasks

## Project Navigation

### Finding Files

Find files using fuzzy search:

```bash
find . -type f -name "*<partial-name>*" | grep -v "node_modules" | grep -v ".git"
```

### Searching File Contents

Search in files recursively:

```bash
grep -r "<search-term>" --include="*.{js,ts,md,mdc}" . --color
```

## Note Management

### Creating Notes


### Listing Notes

## Emergency Codebase Analysis

## Command Error Prevention

### Common Mistakes to Avoid


### Key Rules (update on next visit ai)

1. 
2. 
3.
4. 
5. 
6. 


### Alternative Command Execution Methods


1. **Use Node scripts instead of Bash scripts**:
   ```bash
   # Instead of complex bash command
   node -e "console.log(require('fs').readdirSync('.').filter(f => f.endsWith('.md')))"
   ```

2. **Use PowerShell when available**:
   ```powershell
   # Launch PowerShell from Git Bash
   powershell -Command "Get-ChildItem -Filter *.md | Select-Object Name"
   ```

3. **Create single-line script files**:
   ```bash
   # Create a temporary script file
   echo 'find . -name "*.md" | grep -v node_modules' > temp_script.sh
   # Run it
   bash temp_script.sh
   # Clean up
   rm temp_script.sh
   ```


### Cross-Platform Command Equivalents

| Task | Unix/Bash | Windows/PowerShell | Node.js (Platform Independent) |
|------|-----------|-------------------|--------------------------------|
| List files | `ls -la` | `Get-ChildItem` | `node -e "console.log(require('fs').readdirSync('.'))"` |
| Find text | `grep -r "text" .` | `Get-ChildItem -Recurse | Select-String "text"` | `node -e "require('child_process').execSync('grep -r \"text\" .')"` |
| Create directory | `mkdir -p dir/subdir` | `New-Item -Path dir/subdir -ItemType Directory -Force` | `node -e "require('fs').mkdirSync('dir/subdir', {recursive: true})"` |
| Copy file | `cp file1 file2` | `Copy-Item file1 file2` | `node -e "require('fs').copyFileSync('file1', 'file2')"` |
| Append to file | `echo "text" >> file` | `Add-Content -Path file -Value "text"` | `node -e "require('fs').appendFileSync('file', 'text')"` |

## Creative Unconventional Approaches

When traditional methods fail, try these unorthodox techniques:



### Extreme Debugging

1. **Visual Execution Flow**:
   Create a visual map of command execution:
   ```javascript
   // Add this to your shell script to visualize flow
   function trace() {
     echo "⚙️ $1" | tee -a execution_flow.log
     echo "   └─ $(date +%H:%M:%S.%N | cut -b1-15)" | tee -a execution_flow.log
   }
   
   # Then use in scripts
   trace "Beginning task execution"
   # command here
   trace "Task complete"
   ```

2. **Neural Command Predictor**:
   Train a simple model to predict successful commands:
   ```javascript
   // Log successful and failed commands
   function logCommand(cmd, success) {
     fs.appendFileSync('command_history.jsonl', 
       JSON.stringify({command: cmd, success, timestamp: Date.now()}) + '\n'
     );
   }
   
   // Analyze past commands for patterns
   function suggestCommand(partialCommand) {
     const history = fs.readFileSync('command_history.jsonl', 'utf8')
       .split('\n')
       .filter(Boolean)
       .map(JSON.parse);
     
     // Find similar successful commands
     const matches = history
       .filter(entry => entry.success && entry.command.includes(partialCommand))
       .sort((a, b) => b.timestamp - a.timestamp);
     
     return matches.length > 0 ? matches[0].command : null;
   }
   ```

### Quantum Approach to Documentation

1. **Schrödinger's Documentation**:
   Update both code and docs simultaneously, neither is primary:
   ```javascript
   // Generate both implementation and docs in one operation
   function generateBoth(spec) {
     const implementation = generateCodeFromSpec(spec);
     const documentation = generateDocsFromSpec(spec);
     
     fs.writeFileSync('implementation.js', implementation);
     fs.writeFileSync('documentation.md', documentation);
     
     // Create bidirectional links
     insertDocsLink('implementation.js', 'documentation.md');
     insertCodeLink('documentation.md', 'implementation.js');
   }
   ```

2. **Documentation-Driven Debugging**:
   Debug by writing documentation about what should happen:
   ```javascript
   // Create a debugging document
   function documentDebug(problem) {
     const debugDoc = `
     # Debug Investigation: ${problem}
     
     ## Expected Behavior
     [Describe what should happen]
     
     ## Actual Behavior
     [Describe what actually happens]
     
     ## Investigation Steps
     1. [First step]
     2. [Second step]
     
     ## Findings
     [Document discoveries here]
     `;
     
     fs.writeFileSync(`debug-${Date.now()}.md`, debugDoc);
     // The act of writing this often reveals the solution!
   }
   ```

Remember: When conventional approaches fail, creative solutions often succeed. The best command is often the one that works in your specific environment, regardless of how unorthodox it might seem. 
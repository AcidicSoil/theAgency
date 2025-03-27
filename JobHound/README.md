# JobHound

## AI-Powered Job Application Automation System

JobHound is an advanced platform that streamlines the job search process by leveraging AI to automate job discovery, application creation, submission, and follow-up.

## Features

- **Intelligent Job Parsing**: Extract key requirements from job descriptions
- **Profile Matching**: Match your skills and experience to job requirements
- **Automated Document Generation**: Create tailored resumes and cover letters
- **Application Automation**: Submit applications to multiple platforms
- **Comprehensive Tracking**: Monitor application status and deadlines
- **Smart Follow-ups**: Get reminders for follow-up actions
- **Data-Driven Insights**: Improve your application strategy with analytics

## Technology Stack

- **Frontend**: React, TypeScript, Next.js, shadcn/ui, Tailwind CSS
- **Backend**: Mastra Framework
- **AI**: LLM integration via Ollama
- **Automation**: Playwright/Puppeteer for browser automation
- **Agents**: LangGraph-based agentic workflow system

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn
- Ollama (for local LLM integration)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/jobhound.git

# Navigate to the project directory
cd jobhound

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys and configuration

# Start the development server
npm run dev
```

## Project Structure

- `src/`: Frontend application code
- `agents/`: Agentic workflow system
- `api/`: Backend API
- `integration/`: Third-party service integrations

## License

[MIT](LICENSE)
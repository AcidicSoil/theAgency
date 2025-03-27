import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          JobHound <span className="text-accent">AI</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Automate your job search with AI-powered tools
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Find Opportunities</h2>
            <p className="text-muted-foreground">
              Discover relevant job listings tailored to your skills and preferences
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Apply Automatically</h2>
            <p className="text-muted-foreground">
              Generate customized resumes and cover letters for each application
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Track Progress</h2>
            <p className="text-muted-foreground">
              Monitor application status and schedule follow-ups
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/signin"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-medium"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
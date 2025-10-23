export default function InstallationPage() {
  return (
    <div className="flex-1 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Installation</h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Getting Started</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to the installation guide. Follow these steps to set up
              your project and get started quickly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Prerequisites</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Node.js 18.17 or later</li>
              <li>macOS, Windows, or Linux operating system</li>
              <li>A code editor (VS Code recommended)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Installation Steps</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  1. Create a new project
                </h3>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>npx create-next-app@latest my-app</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  2. Navigate to your project
                </h3>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>cd my-app</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  3. Start the development server
                </h3>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>npm run dev</code>
                </pre>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Next Steps</h2>
            <p className="text-muted-foreground leading-relaxed">
              Once installation is complete, check out the Project Structure
              page to understand how your application is organized.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function Docs() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-6">Documentation</h1>
      <p className="text-lg text-muted-foreground mb-4">
        Welcome to the documentation page. Here you&apos;ll find comprehensive
        guides and documentation to help you start working with our library as
        quickly as possible.
      </p>
      <div className="grid gap-6 mt-8">
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
          <p className="text-muted-foreground">
            Learn how to install and set up the library in your project.
          </p>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2">Core Concepts</h2>
          <p className="text-muted-foreground">
            Understand the fundamental concepts and principles of our library.
          </p>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2">API Reference</h2>
          <p className="text-muted-foreground">
            Detailed documentation for all components, hooks, and utilities.
          </p>
        </div>
      </div>
    </>
  );
}

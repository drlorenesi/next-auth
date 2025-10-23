export default function ProjectStructurePage() {
  return (
    <div className="flex-1 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Project Structure</h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              Understanding your project structure is essential for efficient
              development. This guide explains the organization of files and
              folders.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Directory Structure</h2>
            <pre className="bg-muted p-6 rounded-lg overflow-x-auto text-sm">
              {`app/
├── (auth)/              # Route group for authenticated pages
│   ├── layout.tsx       # Shared layout with sidebar
│   ├── page.tsx         # Home page
│   ├── installation/    # Installation page
│   └── project-structure/ # This page
├── layout.tsx           # Root layout
└── globals.css          # Global styles

components/
├── ui/                  # UI components (shadcn/ui)
│   ├── sidebar.tsx
│   ├── button.tsx
│   └── ...
└── app-sidebar.tsx      # Application sidebar

public/                  # Static assets
└── ...`}
            </pre>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Key Concepts</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">App Directory</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The <code className="bg-muted px-2 py-1 rounded">app</code>{" "}
                  directory uses Next.js App Router for file-based routing. Each
                  folder represents a route segment.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Route Groups</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Folders wrapped in parentheses like{" "}
                  <code className="bg-muted px-2 py-1 rounded">(auth)</code> are
                  route groups that don&apos;t affect the URL structure but
                  allow shared layouts.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Components</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Reusable React components are stored in the{" "}
                  <code className="bg-muted px-2 py-1 rounded">components</code>{" "}
                  directory, with UI primitives in the{" "}
                  <code className="bg-muted px-2 py-1 rounded">ui</code>{" "}
                  subfolder.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Best Practices</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Keep components small and focused on a single responsibility
              </li>
              <li>
                Use route groups to organize related pages without affecting
                URLs
              </li>
              <li>
                Place shared layouts at the appropriate level in the directory
                hierarchy
              </li>
              <li>Store static assets in the public directory</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

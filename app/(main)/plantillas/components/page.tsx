import { Button } from "@/components/ui/button";

export default function Components() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-6">Components</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Explore our collection of reusable components. Each component is
        designed to be accessible, customizable, and easy to integrate into your
        projects.
      </p>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Button</h2>
          <p className="text-muted-foreground mb-4">
            A clickable button component with various styles and states.
          </p>
          <div className="flex space-x-2">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Card</h2>
          <p className="text-muted-foreground mb-4">
            A versatile container for displaying content and actions.
          </p>
          <div className="border rounded-lg p-4 bg-card text-card-foreground">
            <h3 className="font-semibold">Card Title</h3>
            <p className="text-sm">This is a sample card component.</p>
          </div>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Input</h2>
          <p className="text-muted-foreground mb-4">
            A form input component for collecting user data.
          </p>
          <input
            type="text"
            placeholder="Enter text"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>
    </>
  );
}

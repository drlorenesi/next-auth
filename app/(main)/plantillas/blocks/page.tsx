export default function Blocks() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-6">Blocks</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Discover our pre-built blocks - larger, composable sections that you can
        use to quickly build your user interface.
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Hero Section</h2>
          <p className="text-muted-foreground mb-4">
            A prominent header section to showcase your main message or
            call-to-action.
          </p>
          <div className="bg-primary/10 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Welcome to Our Platform</h3>
            <p className="mb-4">
              Discover amazing features and boost your productivity.
            </p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
              Get Started
            </button>
          </div>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Feature List</h2>
          <p className="text-muted-foreground mb-4">
            A section to highlight key features or benefits of your product.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Easy to use
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Customizable
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Responsive design
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

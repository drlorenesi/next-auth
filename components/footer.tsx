import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto text-center px-4 py-6 md:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          Built with Next.js and shadcn/ui. The source code is available on{" "}
          <Link
            href="https://github.com/drlorenesi/next-froms"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

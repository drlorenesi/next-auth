import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Components
import { Toaster } from "react-hot-toast";
import { FaGithub } from "react-icons/fa6";
import Navigation from "./Navigation";

export const metadata = {
  title: "Dashboard Layout",
  description: "Generated by create next app",
};

export default async function DashboardLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    redirect("/login");
  }

  return (
    <body className="d-flex flex-column h-100">
      <header>
        <Navigation />
      </header>
      <main className="flex-shrink-0">
        <div className="container-fluid">
          {children}
          <Toaster />
        </div>
      </main>
      <footer className="footer mt-auto py-3 bg-body-tertiary text-center">
        <span className="text-body-secondary">
          <small>&copy; {new Date().getFullYear()} Company, Inc.</small>
        </span>
        <br />
        <a
          style={{ color: "#777" }}
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>{" "}
        <small>
          <span className="text-body-secondary">v0.2.0</span>
        </small>
      </footer>
    </body>
  );
}
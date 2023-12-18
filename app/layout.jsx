import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" className="h-100">
        {children}
      </html>
    </>
  );
}

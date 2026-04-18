import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Viðburðakerfi",
  description: "Hópverkefni 2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="is">
      <body>
        <header
          style={{
            background: "#222",
            color: "#fff",
            padding: "1rem 0",
          }}
        >
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 1rem",
            }}
          >
            <Link href="/" style={{ fontWeight: "bold" }}>
              Viðburðakerfi
            </Link>

            <nav style={{ display: "flex", gap: "0.5rem" }}>
              <Link className="nav-link" href="/">
                Forsíða
              </Link>
              <Link className="nav-link" href="/events">
                Viðburðir
              </Link>
              <Link className="nav-link" href="/login">
                Innskráning
              </Link>
              <Link className="nav-link" href="/upload">
                Myndaupload
              </Link>
            </nav>
          </div>
        </header>

        <main style={{ minHeight: "80vh", padding: "2rem 1rem" }}>{children}</main>

        <footer
          style={{
            background: "#222",
            color: "#fff",
            padding: "1rem",
            marginTop: "2rem",
          }}
        >
          <div className="container" style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ margin: 0 }}>© 2026 Hópur 10</p>
            <Link href="/login">Admin</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
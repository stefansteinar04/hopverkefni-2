import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Viðburðakerfi",
  description: "Vefforritun 2 Hópverkefni 2",
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
            padding: "1rem 2rem",
          }}
        >
          <nav
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Link href="/">Forsíða</Link>
            <Link href="/events">Viðburðir</Link>
            <Link href="/login">Innskráning</Link>
          </nav>
        </header>

        <div style={{ minHeight: "80vh", padding: "2rem" }}>{children}</div>

        <footer
          style={{
            background: "#222",
            color: "#fff",
            padding: "1rem 2rem",
            marginTop: "2rem",
          }}
        >
          <p>© 2026 Hópur 10</p>
          <Link href="/login">Admin</Link>
        </footer>
      </body>
    </html>
  );
}
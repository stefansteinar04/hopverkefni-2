import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container">
      <section
        className="card"
        style={{
          display: "grid",
          gap: "1rem",
        }}
      >
        <h1>Velkomin í viðburðakerfið</h1>
        <p>
          Hér er hægt að skoða viðburði, lesa nánar um hvern viðburð, skrá sig inn og vinna með myndir.
        </p>

        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80"
          alt="Viðburður"
          style={{ borderRadius: "10px", maxHeight: "420px", objectFit: "cover", width: "100%" }}
        />

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link className="button" href="/events">
            Skoða viðburði
          </Link>
          <Link className="button" href="/login">
            Innskráning
          </Link>
        </div>
      </section>
    </div>
  );
}
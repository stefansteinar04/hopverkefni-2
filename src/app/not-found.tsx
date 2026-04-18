import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="container">
      <div className="card">
        <h1>404</h1>
        <p>Síða fannst ekki.</p>
        <Link className="button" href="/">
          Fara á forsíðu
        </Link>
      </div>
    </div>
  );
}
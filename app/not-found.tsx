import Link from "next/link";

export default function NotFound() {
  return (
    <div className="error-page">
      <div className="container">
        <p className="mono" style={{ color: "var(--signal-ink)" }}>
          Error 404
        </p>
        <h1 className="display mt-2" style={{ maxWidth: "16ch" }}>
          This page is not on the map.
        </h1>
        <p className="lead mt-3">
          The address you followed does not exist. The links below will get you back to
          something that does.
        </p>
        <div className="btn-row mt-4">
          <Link href="/" className="btn btn--solid">
            Home <span aria-hidden="true">→</span>
          </Link>
          <Link href="/projects" className="btn">
            Projects
          </Link>
          <Link href="/contact" className="btn">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

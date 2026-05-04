import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">404</span>
      <h1>Page not found</h1>
      <p>The service page may have moved. Return to the catalogue and continue browsing.</p>
      <Link className="primary-action" href="/">
        <ArrowLeft size={18} />
        Back to Home
      </Link>
    </main>
  );
}

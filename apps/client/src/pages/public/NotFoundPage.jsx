import { Link } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import SEOHead from "../../components/shared/SEOHead.jsx";

export default function NotFoundPage() {
  return (
    <>
      <SEOHead title="Page not found" />
      <div className="flex flex-col items-center justify-center text-center px-6 py-32">
        <p className="font-mono text-emerald-400 mb-4">404</p>
        <h1 className="font-display text-3xl font-semibold mb-4">This page wandered off the shelf</h1>
        <p className="text-ink-500 mb-8 max-w-sm">The page you're looking for doesn't exist or may have moved.</p>
        <Button as={Link} to="/">Back to home</Button>
      </div>
    </>
  );
}

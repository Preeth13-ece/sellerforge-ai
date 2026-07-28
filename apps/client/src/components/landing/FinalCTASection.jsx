import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button.jsx";

export default function FinalCTASection() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
      <div className="glass-card p-12 bg-ember-glow">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">Ready to forge better listings?</h2>
        <p className="text-ink-300 mb-8 max-w-md mx-auto">Start free — 20 credits a month, no card required.</p>
        <Button as={Link} to="/signup" className="px-8 py-3.5">
          Start free <ArrowRight size={16} />
        </Button>
      </div>
    </section>
  );
}

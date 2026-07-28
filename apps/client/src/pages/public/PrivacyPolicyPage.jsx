import SEOHead from "../../components/shared/SEOHead.jsx";

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEOHead title="Privacy Policy" />
      <div className="mx-auto max-w-3xl px-6 py-20 space-y-6 text-ink-300 leading-relaxed">
        <span className="eyebrow">Legal</span>
        <h1 className="font-display text-4xl font-semibold mt-3 mb-6 text-ink-100">Privacy Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="font-display text-xl font-semibold text-ink-100 mt-8">Information we collect</h2>
        <p>
          We collect the information you provide when you create an account (name, email), use our tools
          (your inputs and generated outputs, stored in your History), and subscribe to our newsletter.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink-100 mt-8">How we use your information</h2>
        <p>
          We use your information to operate your account, generate tool results, send transactional emails
          (verification, password resets), and — only if you subscribe — send newsletter content.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink-100 mt-8">Third parties</h2>
        <p>
          We share data with service providers strictly to operate the product: our AI provider (to generate
          tool outputs), our email provider (to send transactional email), and our payment processor (to
          handle subscriptions). We do not sell your data.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink-100 mt-8">Your rights</h2>
        <p>
          You can update your profile, delete individual history items, unsubscribe from the newsletter, or
          delete your account entirely at any time from your dashboard.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink-100 mt-8">Contact</h2>
        <p>Questions about this policy can be sent through our Contact page.</p>
      </div>
    </>
  );
}

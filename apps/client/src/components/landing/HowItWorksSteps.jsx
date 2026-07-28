const steps = [
  { title: "Pick a tool", desc: "Choose from 11 tools built for each part of your listing workflow." },
  { title: "Add your product details", desc: "A few short fields — product type, materials, keywords." },
  { title: "Get results in seconds", desc: "Copy, save, or download outputs straight into your Etsy listing." },
];

export default function HowItWorksSteps() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-center mb-14">
        <span className="eyebrow">How it works</span>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mt-3">From blank listing to published in minutes</h2>
      </div>
      <div className="grid gap-8 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.title} className="relative">
            <span className="font-display text-5xl font-semibold text-forge-surface2 absolute -top-4 -left-1 -z-10">
              {i + 1}
            </span>
            <h3 className="font-display font-semibold text-lg mb-2 relative">{step.title}</h3>
            <p className="text-sm text-ink-500 relative">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

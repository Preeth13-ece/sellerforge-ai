import { useEffect } from "react";

const GUMROAD_URL_99 =
  "https://studentpack.gumroad.com/l/seltvu?wanted=true";

const GUMROAD_URL_199 =
  "https://studentpack.gumroad.com/l/nhzgh?wanted=true";

const GUMROAD_URL_299 =
  "https://studentpack.gumroad.com/l/qgmikk?wanted=true";

function track(name, params = {}) {
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    }
  } catch (e) {}

  try {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: name,
        ...params,
      });
    }
  } catch (e) {}

  try {
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", name, params);
    }
  } catch (e) {}
}

export default function LandingPage() {
  useEffect(() => {
    document.title =
      "Make Money Online: 100+ Legit Online Income Ideas | Online Money-Making Playbook";

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Explore practical online income opportunities including AI data work, freelancing, microtasks, digital products, content creation and more."
      );
    }

    const stickyBar = document.getElementById("stickybar");
    const hero = document.getElementById("top");
    const pricing = document.getElementById("pricing");

    if (!stickyBar || !hero || !pricing) return;

    let heroPassed = false;
    let pricingVisible = false;

    const syncBar = () => {
      const show = heroPassed && !pricingVisible;

      stickyBar.classList.toggle("is-visible", show);
      stickyBar.setAttribute("aria-hidden", show ? "false" : "true");
    };

    if ("IntersectionObserver" in window) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target === hero) {
              heroPassed = !entry.isIntersecting;
            }
          });

          syncBar();
        },
        { threshold: 0.08 }
      );

      const pricingObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target === pricing) {
              pricingVisible = entry.isIntersecting;

              if (entry.isIntersecting) {
                track("pricing_section_view");
              }
            }
          });

          syncBar();
        },
        { threshold: 0.12 }
      );

      heroObserver.observe(hero);
      pricingObserver.observe(pricing);

      return () => {
        heroObserver.disconnect();
        pricingObserver.disconnect();
      };
    }

    stickyBar.classList.add("is-visible");
    stickyBar.setAttribute("aria-hidden", "false");
  }, []);

  const handleCTA = (name, plan) => {
    track(name, plan ? {
      plan,
      value: Number(plan),
      currency: "INR",
    } : {});
  };

  return (
    <>
      <style>{`
        :root {
          color-scheme: light;
          --ink: #14202E;
          --ink-soft: #4B5A68;
          --ink-faint: #7A8794;
          --paper: #F3F5F4;
          --card: #FFFFFF;
          --line: #DCE3E0;
          --line-soft: #EAEEEC;
          --accent: #0E6F52;
          --accent-dark: #0A5540;
          --accent-wash: #E9F2EE;
          --amber: #B4700F;
          --flag-wash: #FBEDEA;
          --wrap: 1120px;
          --pad: clamp(18px, 5vw, 40px);
          --r-sm: 8px;
          --r-md: 14px;
          --r-lg: 20px;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
          scroll-padding-top: 24px;
        }

        body {
          margin: 0;
          background: var(--paper);
          color: var(--ink);
          font-family:
            "Inter Tight",
            Inter,
            system-ui,
            -apple-system,
            "Segoe UI",
            sans-serif;
          font-size: 16px;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        a {
          color: inherit;
        }

        img {
          max-width: 100%;
          display: block;
        }

        h1,
        h2,
        h3 {
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-weight: 500;
          letter-spacing: -0.012em;
          margin: 0;
        }

        h1 {
          font-size: clamp(2.2rem, 7vw, 4rem);
          line-height: 1.06;
        }

        h2 {
          font-size: clamp(1.7rem, 4.6vw, 2.5rem);
          line-height: 1.16;
        }

        h3 {
          font-size: 1.15rem;
          line-height: 1.3;
        }

        p {
          margin: 0 0 1em;
        }

        .wrap {
          max-width: var(--wrap);
          margin: auto;
          padding-left: var(--pad);
          padding-right: var(--pad);
        }

        .narrow {
          max-width: 760px;
        }

        .band {
          padding-top: clamp(52px, 8vw, 92px);
          padding-bottom: clamp(52px, 8vw, 92px);
        }

        .band--white {
          background: var(--card);
          border-top: 1px solid var(--line-soft);
          border-bottom: 1px solid var(--line-soft);
        }

        .lede {
          font-size: clamp(1rem, 2.4vw, 1.14rem);
          color: var(--ink-soft);
          max-width: 62ch;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 54px;
          padding: 14px 25px;
          font-weight: 700;
          border-radius: 999px;
          border: 1px solid transparent;
          text-decoration: none;
          cursor: pointer;
          text-align: center;
          transition:
            background-color 0.18s ease,
            color 0.18s ease,
            border-color 0.18s ease,
            transform 0.18s ease;
        }

        .btn:hover {
          transform: translateY(-1px);
        }

        .btn--primary {
          background: var(--accent);
          color: white;
        }

        .btn--primary:hover {
          background: var(--accent-dark);
        }

        .btn--outline {
          background: transparent;
          color: var(--ink);
          border-color: var(--line);
        }

        .btn--outline:hover {
          border-color: var(--ink);
        }

        .btn--block {
          width: 100%;
        }

        /* TOP BAR */

        .topbar {
          background: white;
          border-bottom: 1px solid var(--line-soft);
        }

        .topbar__in {
          min-height: 66px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .brand {
          font-family: Georgia, serif;
          font-size: 1.15rem;
          font-weight: 600;
          text-decoration: none;
        }

        .topbar .btn {
          min-height: 44px;
          padding: 9px 18px;
          font-size: 0.92rem;
        }

        /* HERO */

        .hero {
          background: white;
          padding-top: clamp(42px, 7vw, 78px);
          padding-bottom: clamp(48px, 7vw, 82px);
          border-bottom: 1px solid var(--line-soft);
        }

        .hero__grid {
          display: grid;
          gap: 38px;
        }

        .hero h1 {
          margin-bottom: 20px;
          max-width: 15ch;
        }

        .hero__sub {
          font-size: clamp(1.05rem, 2.6vw, 1.2rem);
          color: var(--ink-soft);
          max-width: 58ch;
        }

        .hero__note {
          color: var(--ink-soft);
          max-width: 58ch;
          margin-bottom: 26px;
        }

        .hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .hero__micro {
          margin-top: 16px;
          font-size: 0.9rem;
          color: var(--ink-faint);
        }

        .ladder {
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: var(--r-lg);
          padding: 24px;
          box-shadow:
            0 1px 2px rgba(20, 32, 46, 0.05),
            0 12px 30px rgba(20, 32, 46, 0.05);
        }

        .ladder__title {
          font-weight: 700;
          color: var(--ink-soft);
          margin-bottom: 14px;
        }

        .ladder__row {
          display: flex;
          align-items: baseline;
          gap: 14px;
          padding: 14px 0;
          border-top: 1px solid var(--line);
        }

        .ladder__row:first-of-type {
          border-top: 0;
          padding-top: 0;
        }

        .ladder__price {
          min-width: 64px;
          font-size: 1.3rem;
          font-weight: 800;
        }

        .ladder__what {
          font-size: 0.95rem;
          color: var(--ink-soft);
        }

        .ladder__foot {
          margin-top: 14px;
          color: var(--ink-faint);
          font-size: 0.84rem;
        }

        /* PROBLEM */

        .pains {
          list-style: none;
          padding: 0;
          margin: 28px 0 0;
          display: grid;
          gap: 11px;
        }

        .pains li {
          position: relative;
          padding-left: 25px;
          color: var(--ink-soft);
        }

        .pains li::before {
          content: "";
          position: absolute;
          left: 5px;
          top: 0.72em;
          width: 8px;
          height: 2px;
          background: var(--ink-faint);
        }

        .turn {
          margin-top: 34px;
          padding: 22px 24px;
          background: var(--accent-wash);
          border-radius: var(--r-md);
          font-size: 1.06rem;
          max-width: 64ch;
        }

        /* CONTENTS */

        .toc {
          margin-top: 36px;
        }

        .toc__item {
          padding: 22px 0;
          border-top: 1px solid var(--line);
        }

        .toc__item:last-child {
          border-bottom: 1px solid var(--line);
        }

        .toc__head {
          display: flex;
          align-items: baseline;
          gap: 14px;
        }

        .toc__num {
          color: var(--accent);
          font-family: Georgia, serif;
          min-width: 26px;
        }

        .toc__title {
          font-size: 1.35rem;
        }

        .toc__tags {
          margin: 12px 0 0 40px;
          padding: 0;
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .toc__tags li {
          font-size: 0.87rem;
          color: var(--ink-soft);
          background: var(--paper);
          border: 1px solid var(--line-soft);
          padding: 5px 11px;
          border-radius: 999px;
        }

        /* PATHS */

        .paths {
          display: grid;
          gap: 16px;
          margin-top: 34px;
        }

        .path {
          background: white;
          border: 1px solid var(--line);
          border-radius: var(--r-lg);
          padding: 23px;
          box-shadow: 0 1px 2px rgba(20, 32, 46, 0.05);
        }

        .path__icon {
          font-size: 1.5rem;
          margin-bottom: 12px;
        }

        .path h3 {
          margin-bottom: 10px;
        }

        .path ul {
          margin: 0;
          padding-left: 19px;
          color: var(--ink-soft);
        }

        /* PRICING */

        .plans {
          display: grid;
          gap: 18px;
          margin-top: 38px;
        }

        .plan {
          background: white;
          border: 1px solid var(--line);
          border-radius: var(--r-lg);
          padding: 27px 23px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 2px rgba(20, 32, 46, 0.05);
        }

        .plan--featured {
          border: 1.5px solid var(--accent);
          box-shadow:
            0 2px 10px rgba(20, 32, 46, 0.06),
            0 14px 34px -18px rgba(20, 32, 46, 0.18);
          position: relative;
        }

        .plan__badge {
          position: absolute;
          top: -13px;
          left: 22px;
          background: var(--accent);
          color: white;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          padding: 5px 12px;
          border-radius: 999px;
        }

        .plan__name {
          font-weight: 700;
          color: var(--ink-soft);
          margin-bottom: 6px;
        }

        .plan__price {
          font-size: 2.5rem;
          line-height: 1;
          font-weight: 800;
        }

        .plan__price span {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--ink-faint);
        }

        .plan__inherit {
          margin: 16px 0 10px;
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--accent);
        }

        .plan__list {
          list-style: none;
          margin: 16px 0 24px;
          padding: 0;
          display: grid;
          gap: 9px;
        }

        .plan__list li {
          position: relative;
          padding-left: 26px;
          font-size: 0.96rem;
          color: var(--ink-soft);
        }

        .plan__list li::before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--accent);
          font-weight: 800;
        }

        .plan .btn {
          margin-top: auto;
        }

        .plan__after {
          margin-top: 12px;
          font-size: 0.82rem;
          color: var(--ink-faint);
          text-align: center;
        }

        /* COMPARISON */

        .tablewrap {
          margin-top: 44px;
          overflow-x: auto;
          border: 1px solid var(--line);
          border-radius: var(--r-md);
          background: white;
        }

        table {
          border-collapse: collapse;
          width: 100%;
          min-width: 600px;
        }

        caption {
          text-align: left;
          padding: 18px 18px 0;
          color: var(--ink-soft);
        }

        th,
        td {
          padding: 12px 10px;
          border-top: 1px solid var(--line-soft);
          font-size: 0.93rem;
          text-align: center;
        }

        th[scope="row"] {
          text-align: left;
          font-weight: 500;
          color: var(--ink-soft);
          padding-left: 16px;
        }

        thead th {
          font-weight: 800;
          border-top: 0;
          padding-top: 16px;
        }

        thead th:first-child {
          text-align: left;
          padding-left: 16px;
          color: var(--ink-faint);
        }

        .yes {
          color: var(--accent);
          font-weight: 800;
        }

        .no {
          color: #c4ccca;
        }

        .col-hl {
          background: var(--accent-wash);
        }

        /* WHY */

        .why {
          display: grid;
          gap: 14px;
          margin-top: 32px;
          padding: 0;
        }

        .why li {
          list-style: none;
          padding-left: 28px;
          position: relative;
          color: var(--ink-soft);
        }

        .why li::before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--accent);
          font-weight: 800;
        }

        .why__closer {
          margin-top: 34px;
          font-family: Georgia, serif;
          font-size: 1.5rem;
          max-width: 24ch;
          line-height: 1.3;
        }

        /* AUTHOR */

        .author {
          display: grid;
          gap: 24px;
          align-items: center;
        }

        .author__photo {
          width: 168px;
          height: 168px;
          border-radius: var(--r-lg);
          background: var(--paper);
          border: 1px dashed var(--line);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 0.78rem;
          color: var(--ink-faint);
          padding: 12px;
        }

        .author__name {
          font-weight: 700;
          margin-top: 14px;
        }

        /* ROADMAP */

        .weeks {
          display: grid;
          gap: 14px;
          margin-top: 34px;
        }

        .week {
          background: white;
          border: 1px solid var(--line);
          border-radius: var(--r-md);
          padding: 20px;
        }

        .week__label {
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--accent);
          letter-spacing: 0.04em;
          margin-bottom: 8px;
        }

        .week__what {
          font-family: Georgia, serif;
          font-size: 1.2rem;
        }

        /* SCAM FLAGS */

        .flags {
          list-style: none;
          margin: 30px 0 0;
          padding: 0;
          display: grid;
          gap: 10px;
        }

        .flags li {
          background: var(--flag-wash);
          border-radius: var(--r-sm);
          padding: 13px 15px;
          font-size: 0.95rem;
          color: #6b2b1e;
        }

        /* TESTIMONIAL */

        .placeholder {
          margin-top: 28px;
          border: 1px dashed var(--line);
          border-radius: var(--r-md);
          padding: 26px;
          text-align: center;
          color: var(--ink-faint);
          background: white;
        }

        /* FAQ */

        .faq {
          margin-top: 30px;
          border-top: 1px solid var(--line);
        }

        .faq details {
          border-bottom: 1px solid var(--line);
        }

        .faq summary {
          list-style: none;
          cursor: pointer;
          padding: 18px 40px 18px 0;
          position: relative;
          font-weight: 700;
          min-height: 44px;
        }

        .faq summary::-webkit-details-marker {
          display: none;
        }

        .faq summary::after {
          content: "+";
          position: absolute;
          right: 6px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--accent);
        }

        .faq details[open] summary::after {
          content: "–";
        }

        .faq__a {
          padding: 0 0 20px;
          color: var(--ink-soft);
          max-width: 68ch;
        }

        /* FINAL */

        .final {
          background: var(--ink);
          color: #eaf0ed;
        }

        .final h2 {
          color: white;
        }

        .final p {
          color: #b9c6c0;
        }

        .final__lines {
          font-family: Georgia, serif;
          font-size: 1.18rem;
          color: #d7e2dd !important;
          line-height: 1.8;
        }

        .tiers {
          display: grid;
          gap: 12px;
          margin: 34px 0 30px;
        }

        .tier {
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: var(--r-md);
          padding: 18px;
        }

        .tier__price {
          font-size: 1.5rem;
          font-weight: 800;
          color: white !important;
        }

        .tier__what {
          font-size: 0.92rem;
          color: #a9b8b1 !important;
          margin-top: 4px;
        }

        .final .btn--primary {
          background: white;
          color: var(--ink);
        }

        .final .btn--primary:hover {
          background: #dce8e3;
        }

        /* DISCLAIMER */

        .disclaimer {
          font-size: 0.9rem;
          color: var(--ink-faint);
          max-width: 78ch;
        }

        /* FOOTER */

        .foot {
          border-top: 1px solid var(--line);
          padding: 26px 0;
          font-size: 0.88rem;
          color: var(--ink-faint);
        }

        .foot__in {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 20px;
          justify-content: space-between;
        }

        /* MOBILE CTA */

        .stickybar {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(8px);
          border-top: 1px solid var(--line);
          padding: 10px var(--pad);
          display: flex;
          gap: 12px;
          align-items: center;
          transform: translateY(120%);
          transition: transform 0.25s ease;
        }

        .stickybar.is-visible {
          transform: translateY(0);
        }

        .stickybar .btn {
          flex: 1;
          min-height: 50px;
          padding: 13px 18px;
          font-size: 1rem;
        }

        .stickybar__from {
          font-size: 0.8rem;
          color: var(--ink-faint);
          line-height: 1.25;
          max-width: 96px;
        }

        @media (min-width: 640px) {
          .paths {
            grid-template-columns: 1fr 1fr;
          }

          .weeks {
            grid-template-columns: repeat(2, 1fr);
          }

          .flags {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 720px) {
          .pains {
            grid-template-columns: 1fr 1fr;
          }

          .why {
            grid-template-columns: 1fr 1fr;
          }

          .author {
            grid-template-columns: 168px 1fr;
            gap: 34px;
          }
        }

        @media (min-width: 900px) {
          .hero__grid {
            grid-template-columns: minmax(0, 1.15fr) minmax(300px, 0.85fr);
            align-items: start;
            gap: 56px;
          }

          .plans {
            grid-template-columns: repeat(3, 1fr);
          }

          .weeks {
            grid-template-columns: repeat(4, 1fr);
          }

          .flags {
            grid-template-columns: repeat(4, 1fr);
          }

          .stickybar {
            display: none;
          }
        }

        @media (min-width: 1000px) {
          .paths {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 520px) {
          .topbar .btn {
            display: none;
          }

          .hero__actions {
            flex-direction: column;
          }

          .hero__actions .btn {
            width: 100%;
          }

          .ladder__row {
            align-items: flex-start;
          }

          .toc__tags {
            margin-left: 0;
          }
        }
      `}</style>

      <a
        href="#pricing"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
        }}
      >
        Skip to pricing
      </a>

      {/* TOP BAR */}
      <header className="topbar">
        <div className="wrap topbar__in">
          <a className="brand" href="#top">
            Online Money-Making Playbook
          </a>

          <a
            className="btn btn--primary"
            href="#pricing"
            onClick={() => handleCTA("nav_cta_click")}
          >
            See the plans
          </a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="top">
          <div className="wrap hero__grid">
            <div>
              <h1>
                100+ Legit Ways to Make Money Online — Start From ₹0
              </h1>

              <p className="hero__sub">
                One practical playbook covering AI data work, RWS-type
                opportunities, microtasks, freelancing, digital products,
                content creation and more.
              </p>

              <p className="hero__note">
                Stop jumping between random videos and earning apps.
                Discover the opportunities, understand what they require,
                and choose where to start.
              </p>

              <div className="hero__actions">
                <a
                  className="btn btn--primary"
                  href="#pricing"
                  onClick={() => handleCTA("hero_cta_click")}
                >
                  Explore the Plans →
                </a>

                <a
                  className="btn btn--outline"
                  href="#inside"
                  onClick={() => handleCTA("hero_secondary_click")}
                >
                  See what's inside
                </a>
              </div>

              <p className="hero__micro">
                Digital product • Beginner-friendly • One-time purchase
              </p>
            </div>

            <aside className="ladder">
              <p className="ladder__title">
                Three ways to start
              </p>

              <div className="ladder__row">
                <span className="ladder__price">₹99</span>
                <span className="ladder__what">
                  The complete ebook — 100+ opportunities, scam checklist,
                  30-day roadmap
                </span>
              </div>

              <div className="ladder__row">
                <span className="ladder__price">₹199</span>
                <span className="ladder__what">
                  Ebook + Notion kit to track applications, income and goals
                </span>
              </div>

              <div className="ladder__row">
                <span className="ladder__price">₹299</span>
                <span className="ladder__what">
                  Everything, plus checklists, templates and the 30-day
                  challenge
                </span>
              </div>

              <p className="ladder__foot">
                Payment and delivery are handled by Gumroad.
              </p>
            </aside>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="band">
          <div className="wrap">
            <h2 className="narrow">
              Making Money Online Shouldn't Mean Searching for Hours.
            </h2>

            <ul className="pains">
              <li>
                Hundreds of websites, all saying something different
              </li>
              <li>
                YouTube videos that end before the useful part
              </li>
              <li>
                Income claims that nobody can verify
              </li>
              <li>
                AI-data work that's hard to understand from the outside
              </li>
              <li>
                Freelancing platforms that feel overwhelming on day one
              </li>
              <li>
                No clear answer on what actually works with only a phone
              </li>
              <li>No obvious first step</li>
              <li>
                Scams and fake job offers mixed in with the real ones
              </li>
            </ul>

            <p className="turn">
              This playbook organizes the landscape into practical
              categories so you can choose a starting point.
            </p>
          </div>
        </section>

        {/* WHAT'S INSIDE */}
        <section className="band band--white" id="inside">
          <div className="wrap">
            <h2 className="narrow">
              What's inside the playbook
            </h2>

            <p
              className="lede"
              style={{ marginTop: "14px" }}
            >
              Six categories of online work, explained in plain language —
              what each one is, what it needs from you, and how beginners
              usually get in.
            </p>

            <div className="toc">
              <article className="toc__item">
                <div className="toc__head">
                  <span className="toc__num">01</span>
                  <h3 className="toc__title">
                    AI & data work
                  </h3>
                </div>

                <ul className="toc__tags">
                  <li>AI data collection</li>
                  <li>Data annotation</li>
                  <li>Image tasks</li>
                  <li>Video tasks</li>
                  <li>Audio tasks</li>
                  <li>AI evaluation</li>
                  <li>Search evaluation</li>
                  <li>RWS-type work</li>
                </ul>
              </article>

              <article className="toc__item">
                <div className="toc__head">
                  <span className="toc__num">02</span>
                  <h3 className="toc__title">
                    Freelancing
                  </h3>
                </div>

                <ul className="toc__tags">
                  <li>Fiverr</li>
                  <li>Direct clients</li>
                  <li>Website services</li>
                  <li>Coding</li>
                  <li>Research</li>
                  <li>AI-assisted services</li>
                </ul>
              </article>

              <article className="toc__item">
                <div className="toc__head">
                  <span className="toc__num">03</span>
                  <h3 className="toc__title">
                    Microtasks
                  </h3>
                </div>

                <ul className="toc__tags">
                  <li>Simple online tasks</li>
                  <li>Research tasks</li>
                  <li>Testing</li>
                  <li>Classification</li>
                  <li>Beginner opportunities</li>
                </ul>
              </article>

              <article className="toc__item">
                <div className="toc__head">
                  <span className="toc__num">04</span>
                  <h3 className="toc__title">
                    Digital products
                  </h3>
                </div>

                <ul className="toc__tags">
                  <li>Ebooks</li>
                  <li>Notion templates</li>
                  <li>Checklists</li>
                  <li>Guides</li>
                  <li>Printables</li>
                  <li>Templates</li>
                </ul>
              </article>

              <article className="toc__item">
                <div className="toc__head">
                  <span className="toc__num">05</span>
                  <h3 className="toc__title">
                    Content
                  </h3>
                </div>

                <ul className="toc__tags">
                  <li>YouTube Shorts</li>
                  <li>Faceless content</li>
                  <li>Instagram</li>
                  <li>Affiliate content</li>
                  <li>Audience building</li>
                </ul>
              </article>

              <article className="toc__item">
                <div className="toc__head">
                  <span className="toc__num">06</span>
                  <h3 className="toc__title">
                    Online businesses
                  </h3>
                </div>

                <ul className="toc__tags">
                  <li>Websites</li>
                  <li>Small tools</li>
                  <li>SaaS</li>
                  <li>AI-assisted services</li>
                  <li>Lead generation</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* PATHS */}
        <section className="band">
          <div className="wrap">
            <h2 className="narrow">
              Start from what you already have
            </h2>

            <p
              className="lede"
              style={{ marginTop: "14px" }}
            >
              You don't need to find one magical way to make money online.
              You need to understand your options, choose one that fits
              you, and start.
            </p>

            <div className="paths">
              <div className="path">
                <div className="path__icon">📱</div>
                <h3>Only have a phone?</h3>
                <ul>
                  <li>AI data</li>
                  <li>Microtasks</li>
                  <li>Content</li>
                  <li>Mobile-friendly opportunities</li>
                </ul>
              </div>

              <div className="path">
                <div className="path__icon">💻</div>
                <h3>Have a laptop?</h3>
                <ul>
                  <li>Freelancing</li>
                  <li>Coding</li>
                  <li>Research</li>
                  <li>Digital products</li>
                  <li>Websites</li>
                </ul>
              </div>

              <div className="path">
                <div className="path__icon">👩‍💻</div>
                <h3>Have technical skills?</h3>
                <ul>
                  <li>Web development</li>
                  <li>AI services</li>
                  <li>Automation</li>
                  <li>SaaS</li>
                </ul>
              </div>

              <div className="path">
                <div className="path__icon">🎨</div>
                <h3>Have creative skills?</h3>
                <ul>
                  <li>Content</li>
                  <li>Digital products</li>
                  <li>Design services</li>
                  <li>Social media services</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="band band--white" id="pricing">
          <div className="wrap">
            <h2 className="narrow">
              Choose your plan
            </h2>

            <p
              className="lede"
              style={{ marginTop: "14px" }}
            >
              One-time purchase. Checkout and delivery happen on Gumroad.
            </p>

            <div className="plans">
              {/* ₹99 */}
              <article className="plan">
                <p className="plan__name">
                  Online Money-Making Playbook
                </p>

                <p className="plan__price">
                  ₹99 <span>one-time</span>
                </p>

                <ul className="plan__list">
                  <li>Complete ebook</li>
                  <li>
                    100+ online income ideas and opportunities
                  </li>
                  <li>AI / data work section</li>
                  <li>RWS / search evaluation section</li>
                  <li>Microtask section</li>
                  <li>Freelancing section</li>
                  <li>Digital-product section</li>
                  <li>Content section</li>
                  <li>Scam checklist</li>
                  <li>30-day roadmap</li>
                </ul>

                <a
                  className="btn btn--outline btn--block"
                  href={GUMROAD_URL_99}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    handleCTA("pricing_cta_99_click", "99")
                  }
                >
                  Get the Ebook — ₹99
                </a>

                <p className="plan__after">
                  Secure checkout on Gumroad
                </p>
              </article>

              {/* ₹199 */}
              <article className="plan plan--featured">
                <span className="plan__badge">
                  MOST POPULAR
                </span>

                <p className="plan__name">
                  Playbook + Notion Kit
                </p>

                <p className="plan__price">
                  ₹199 <span>one-time</span>
                </p>

                <p className="plan__inherit">
                  Everything in ₹99, plus:
                </p>

                <ul className="plan__list">
                  <li>Income Tracker</li>
                  <li>Opportunity Tracker</li>
                  <li>Application Tracker</li>
                  <li>Freelance Client Tracker</li>
                  <li>Weekly Planner</li>
                  <li>Goal Tracker</li>
                  <li>Monthly Earnings Dashboard</li>
                  <li>Online Work Database</li>
                  <li>Scam Verification Checklist</li>
                </ul>

                <a
                  className="btn btn--primary btn--block"
                  href={GUMROAD_URL_199}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    handleCTA("pricing_cta_199_click", "199")
                  }
                >
                  Get the ₹199 Bundle
                </a>

                <p className="plan__after">
                  Secure checkout on Gumroad
                </p>
              </article>

              {/* ₹299 */}
              <article className="plan">
                <p className="plan__name">
                  Complete Online Income Starter Kit
                </p>

                <p className="plan__price">
                  ₹299 <span>one-time</span>
                </p>

                <p className="plan__inherit">
                  Everything in ₹199, plus:
                </p>

                <ul className="plan__list">
                  <li>30-Day Online Income Challenge</li>
                  <li>AI Data Work Checklist</li>
                  <li>Freelancing Starter Pack</li>
                  <li>Gig Creation Checklist</li>
                  <li>Client Outreach Templates</li>
                  <li>Digital Product Launch Checklist</li>
                  <li>Product Idea Worksheet</li>
                  <li>Content Planner</li>
                  <li>30 Faceless Content Ideas</li>
                  <li>First ₹1,000 Roadmap</li>
                  <li>Daily Action Sheet</li>
                </ul>

                <a
                  className="btn btn--outline btn--block"
                  href={GUMROAD_URL_299}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    handleCTA("pricing_cta_299_click", "299")
                  }
                >
                  Get the Complete Kit — ₹299
                </a>

                <p className="plan__after">
                  Secure checkout on Gumroad
                </p>
              </article>
            </div>

            {/* COMPARISON */}
            <div className="tablewrap">
              <table>
                <caption>
                  What's included in each plan
                </caption>

                <thead>
                  <tr>
                    <th>Included</th>
                    <th>₹99</th>
                    <th className="col-hl">₹199</th>
                    <th>₹299</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th scope="row">Main ebook</th>
                    <td className="yes">✓</td>
                    <td className="yes col-hl">✓</td>
                    <td className="yes">✓</td>
                  </tr>

                  <tr>
                    <th scope="row">AI / data guide</th>
                    <td className="yes">✓</td>
                    <td className="yes col-hl">✓</td>
                    <td className="yes">✓</td>
                  </tr>

                  <tr>
                    <th scope="row">Freelancing guide</th>
                    <td className="yes">✓</td>
                    <td className="yes col-hl">✓</td>
                    <td className="yes">✓</td>
                  </tr>

                  <tr>
                    <th scope="row">30-day roadmap</th>
                    <td className="yes">✓</td>
                    <td className="yes col-hl">✓</td>
                    <td className="yes">✓</td>
                  </tr>

                  <tr>
                    <th scope="row">Notion dashboard</th>
                    <td className="no">—</td>
                    <td className="yes col-hl">✓</td>
                    <td className="yes">✓</td>
                  </tr>

                  <tr>
                    <th scope="row">Income tracker</th>
                    <td className="no">—</td>
                    <td className="yes col-hl">✓</td>
                    <td className="yes">✓</td>
                  </tr>

                  <tr>
                    <th scope="row">Application tracker</th>
                    <td className="no">—</td>
                    <td className="yes col-hl">✓</td>
                    <td className="yes">✓</td>
                  </tr>

                  <tr>
                    <th scope="row">Freelance templates</th>
                    <td className="no">—</td>
                    <td className="no col-hl">—</td>
                    <td className="yes">✓</td>
                  </tr>

                  <tr>
                    <th scope="row">
                      Digital-product launch toolkit
                    </th>
                    <td className="no">—</td>
                    <td className="no col-hl">—</td>
                    <td className="yes">✓</td>
                  </tr>

                  <tr>
                    <th scope="row">Content planner</th>
                    <td className="no">—</td>
                    <td className="no col-hl">—</td>
                    <td className="yes">✓</td>
                  </tr>

                  <tr>
                    <th scope="row">First ₹1,000 roadmap</th>
                    <td className="no">—</td>
                    <td className="no col-hl">—</td>
                    <td className="yes">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* WHY BUY */}
        <section className="band">
          <div className="wrap">
            <h2 className="narrow">
              Not Another Get-Rich-Quick Ebook.
            </h2>

            <ul className="why">
              <li>No guaranteed-income promises</li>
              <li>No fake screenshots</li>
              <li>No overnight-success claims</li>
              <li>No magic formula</li>
              <li>Practical categories</li>
              <li>Beginner-friendly explanations</li>
              <li>Action-focused resources</li>
            </ul>

            <p className="why__closer">
              What you get is knowledge, direction and tools.
            </p>
          </div>
        </section>

        {/* AUTHOR */}
        <section className="band band--white">
          <div className="wrap author">
            <div className="author__photo">
              Your photo
            </div>

            <div>
              <h2>
                Built From Real-World Exploration
              </h2>

              <p
                style={{
                  marginTop: "14px",
                  maxWidth: "62ch",
                  color: "var(--ink-soft)",
                }}
              >
                This playbook was created from hands-on exploration
                of AI data collection, annotation, remote projects,
                freelancing, digital products, websites and other
                online work opportunities.
              </p>

              <p className="author__name">
                Your Name
              </p>
            </div>
          </div>
        </section>

        {/* ROADMAP */}
        <section className="band">
          <div className="wrap">
            <h2 className="narrow">
              Your first 30 days
            </h2>

            <div className="weeks">
              <div className="week">
                <p className="week__label">WEEK 1</p>
                <p className="week__what">
                  Explore + choose
                </p>
              </div>

              <div className="week">
                <p className="week__label">WEEK 2</p>
                <p className="week__what">
                  Apply + test
                </p>
              </div>

              <div className="week">
                <p className="week__label">WEEK 3</p>
                <p className="week__what">
                  Build a skill or service
                </p>
              </div>

              <div className="week">
                <p className="week__label">WEEK 4</p>
                <p className="week__what">
                  Launch + improve
                </p>
              </div>
            </div>

            <p style={{ marginTop: "26px" }}>
              <a
                className="btn btn--outline"
                href="#pricing"
                onClick={() =>
                  handleCTA("roadmap_cta_click")
                }
              >
                Get the complete roadmap inside
              </a>
            </p>
          </div>
        </section>

        {/* SCAM PROTECTION */}
        <section className="band band--white">
          <div className="wrap">
            <h2 className="narrow">
              Before You Send Anyone Money, Read This.
            </h2>

            <ul className="flags">
              <li>🚩 Registration fees</li>
              <li>🚩 Security deposits</li>
              <li>🚩 Guaranteed income claims</li>
              <li>🚩 Fake job offers</li>
              <li>🚩 OTP or password requests</li>
              <li>🚩 Remote-access requests</li>
              <li>🚩 Pay-to-unlock-task schemes</li>
              <li>🚩 Fake investment opportunities</li>
            </ul>

            <p
              style={{
                marginTop: "26px",
                color: "var(--ink-soft)",
                maxWidth: "62ch",
              }}
            >
              The playbook includes a scam checklist so you can
              learn how to protect yourself from common online
              earning scams before you hand over money or personal
              details.
            </p>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="band">
          <div className="wrap narrow">
            <h2>From readers</h2>

            <div className="placeholder">
              Your real customer testimonial will appear here.
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="band band--white" id="faq">
          <div className="wrap narrow">
            <h2>Questions</h2>

            <div className="faq">
              <details>
                <summary>
                  Is this for complete beginners?
                </summary>

                <div className="faq__a">
                  Yes. It assumes no prior experience and explains
                  each category from the ground up, including what
                  the work actually involves and what it asks of you.
                </div>
              </details>

              <details>
                <summary>
                  Do I need a laptop?
                </summary>

                <div className="faq__a">
                  Not for everything. Several categories — AI data
                  tasks, microtasks and content — are commonly done
                  on a phone. The playbook marks which options are
                  phone-friendly.
                </div>
              </details>

              <details>
                <summary>
                  Can I start with only a phone?
                </summary>

                <div className="faq__a">
                  Yes. There's a dedicated path for phone-only
                  readers so you don't waste time on options that
                  need a computer.
                </div>
              </details>

              <details>
                <summary>
                  Do I need to invest money?
                </summary>

                <div className="faq__a">
                  Most opportunities covered can be started without
                  paying anyone. Legitimate work does not ask you for
                  registration fees or deposits, and the scam checklist
                  covers this in detail.
                </div>
              </details>

              <details>
                <summary>
                  Will I definitely make money?
                </summary>

                <div className="faq__a">
                  No. No legitimate method can guarantee income.
                  Results vary depending on skills, effort, time,
                  location, platform availability and other factors.
                </div>
              </details>

              <details>
                <summary>
                  Is this a course?
                </summary>

                <div className="faq__a">
                  No. It's a digital playbook — an ebook, plus
                  trackers and checklists on the higher plans.
                  There are no live classes or videos.
                </div>
              </details>

              <details>
                <summary>
                  How do I receive the product?
                </summary>

                <div className="faq__a">
                  After completing payment through Gumroad, the
                  digital product will be delivered according to
                  the Gumroad product setup.
                </div>
              </details>

              <details>
                <summary>
                  Can I buy only the ebook?
                </summary>

                <div className="faq__a">
                  Yes. The ₹99 plan is the complete ebook on its
                  own. You can start there and upgrade later if you
                  want the trackers and templates.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="band final">
          <div className="wrap">
            <h2 className="narrow">
              Stop Searching. Start Exploring.
            </h2>

            <p className="final__lines" style={{ marginTop: "20px" }}>
              You don't need to try everything.
              <br />
              Pick one path.
              <br />
              Take the first step.
              <br />
              Learn what works.
              <br />
              Build from there.
            </p>

            <div className="tiers">
              <div className="tier">
                <p className="tier__price">₹99</p>
                <p className="tier__what">Learn</p>
              </div>

              <div className="tier">
                <p className="tier__price">₹199</p>
                <p className="tier__what">
                  Learn + organize
                </p>
              </div>

              <div className="tier">
                <p className="tier__price">₹299</p>
                <p className="tier__what">
                  Learn + organize + execute
                </p>
              </div>
            </div>

            <a
              className="btn btn--primary"
              href={GUMROAD_URL_99}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                handleCTA("final_cta_99_click", "99")
              }
            >
              Start With the ₹99 Playbook →
            </a>
          </div>
        </section>

        {/* DISCLAIMER */}
        <section
          className="band"
          style={{
            paddingTop: "44px",
            paddingBottom: "44px",
          }}
        >
          <div className="wrap">
            <p className="disclaimer">
              No income is guaranteed. Earnings vary based on
              skills, time, location, eligibility, platform
              availability, demand and other factors. Opportunities
              and platform policies can change. Always verify current
              requirements before participating.
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="foot">
        <div className="wrap foot__in">
          <span>
            © {new Date().getFullYear()} — Online Money-Making
            Playbook
          </span>

          <span>
            Payments and delivery handled by Gumroad
          </span>
        </div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div
        className="stickybar"
        id="stickybar"
        aria-hidden="true"
      >
        <span className="stickybar__from">
          From ₹99 one-time
        </span>

        <a
          className="btn btn--primary"
          href={GUMROAD_URL_99}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            handleCTA("sticky_cta_click", "99")
          }
        >
          Get the Playbook — ₹99
        </a>
      </div>
    </>
  );
}

import { Check } from "lucide-react";
import Button from "../ui/Button.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { subscriptionApi } from "../../services/api/subscriptionApi.js";
import { useToast } from "../../context/ToastContext.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    credits: "20 credits/mo",
    features: [
      "All 11 tools",
      "History & favorites",
      "Free calculators unlimited",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    credits: "500 credits/mo",
    features: [
      "Everything in Free",
      "Priority generation speed",
      "CSV export",
    ],
    highlighted: true,
  },
  {
    id: "business",
    name: "Business",
    price: 99,
    credits: "Unlimited credits",
    features: [
      "Everything in Pro",
      "Multiple shop profiles (soon)",
      "Priority support",
    ],
  },
];

export default function PricingTable() {
  const { isAuthenticated } = useAuthContext();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [loadingPlan, setLoadingPlan] = useState(null);

  async function handleSubscribe(plan) {
    if (plan.id === "free") {
      navigate("/signup");
      return;
    }

    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: { pathname: "/pricing" } },
      });
      return;
    }

    try {
      setLoadingPlan(plan.id);

      const { data } = await subscriptionApi.createCheckout(plan.id);

      const subscription = data.data.subscription;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        subscription_id: subscription.id,

        name: "SellerForge AI",

        description: `${plan.name} Subscription`,

        handler: function () {
          showToast(
            "Payment successful! Subscription activated.",
            "success"
          );

          navigate("/dashboard/subscription");
        },

        prefill: {
          name: subscription.notes?.userName || "",
        },

        theme: {
          color: "#10b981",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

    } catch (error) {
      showToast(
        error?.response?.data?.message ||
          "Unable to start checkout",
        "error"
      );
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-center mb-14">
        <span className="eyebrow">Pricing</span>

        <h2 className="font-display text-3xl sm:text-4xl font-semibold mt-3">
          Simple plans that scale with your shop
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">

        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`glass-card p-8 flex flex-col ${
              plan.highlighted
                ? "border-emerald-500/60 shadow-glow-emerald"
                : ""
            }`}
          >

            <h3 className="font-display font-semibold text-xl">
              {plan.name}
            </h3>

            <p className="mt-4">
              <span className="text-4xl font-display font-semibold">
                ${plan.price}
              </span>

              <span className="text-ink-500 text-sm">
                /mo
              </span>
            </p>

            <p className="text-xs text-emerald-400 font-mono mt-1">
              {plan.credits}
            </p>

            <ul className="mt-6 space-y-3 flex-1">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-ink-300"
                >
                  <Check
                    size={15}
                    className="text-emerald-400 shrink-0"
                  />

                  {feature}
                </li>
              ))}
            </ul>


            <Button
              onClick={() => handleSubscribe(plan)}
              disabled={loadingPlan === plan.id}
              variant={plan.highlighted ? "primary" : "secondary"}
              className="mt-8"
            >
              {loadingPlan === plan.id
                ? "Loading..."
                : plan.id === "free"
                ? "Get started"
                : "Subscribe"}
            </Button>

          </div>
        ))}

      </div>
    </section>
  );
}

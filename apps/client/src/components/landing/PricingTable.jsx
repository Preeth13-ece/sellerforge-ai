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
    price: 19,
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
    price: 49,
    credits: "Unlimited credits",
    features: [
      "Everything in Pro",
      "Multiple shop profiles",
      "Priority support",
    ],
  },
];

export default function PricingTable() {

  const { user } = useAuthContext();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [loadingPlan, setLoadingPlan] = useState(null);


  async function handleSubscribe(plan) {

    if (plan.id === "free") {
      navigate("/signup");
      return;
    }


    if (!user) {
      navigate("/login", {
        state: {
          from: "/pricing",
        },
      });
      return;
    }


    try {

      setLoadingPlan(plan.id);


      const response =
        await subscriptionApi.createCheckout(plan.id);


      const subscription =
        response.data.data.subscription;


      const options = {

        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        subscription_id: subscription.id,

        name: "SellerForge AI",

        description:
          `${plan.name} Monthly Subscription`,


        handler: () => {

          showToast(
            "Payment completed successfully",
            "success"
          );

          navigate("/dashboard/subscription");
        },


        prefill: {
          email: user.email,
          name: user.name || "",
        },


        theme: {
          color: "#10b981",
        },
      };


      const razorpay =
        new window.Razorpay(options);


      razorpay.open();


    } catch(error) {

      console.log(error);

      showToast(
        error?.response?.data?.message ||
        "Checkout failed",
        "error"
      );

    } finally {

      setLoadingPlan(null);

    }
  }



  return (
    <section className="mx-auto max-w-6xl px-6 py-20">

      <div className="grid gap-6 sm:grid-cols-3">

        {plans.map((plan)=>(

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


            <p className="text-xs text-emerald-400 mt-1">
              {plan.credits}
            </p>


            <ul className="mt-6 space-y-3 flex-1">

              {plan.features.map((feature)=>(

                <li
                  key={feature}
                  className="flex gap-2 text-sm"
                >

                  <Check size={15}
                    className="text-emerald-400"
                  />

                  {feature}

                </li>

              ))}

            </ul>


            <Button
              onClick={()=>handleSubscribe(plan)}
              disabled={loadingPlan===plan.id}
              variant={
                plan.highlighted
                ? "primary"
                : "secondary"
              }
              className="mt-8"
            >

              {
                loadingPlan===plan.id
                ? "Loading..."
                : plan.id==="free"
                ? "Get Started"
                : "Subscribe"
              }

            </Button>


          </div>

        ))}

      </div>

    </section>
  );
}

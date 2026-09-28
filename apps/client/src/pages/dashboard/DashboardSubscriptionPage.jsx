import { useEffect, useState } from "react";
import SubscriptionCard from "../../components/dashboard/SubscriptionCard.jsx";
import Button from "../../components/ui/Button.jsx";
import { dashboardApi } from "../../services/api/dashboardApi.js";
import { useToast } from "../../context/ToastContext.jsx";
import { getErrorMessage } from "../../services/api/axiosClient.js";

export default function DashboardSubscriptionPage() {
  const [subscription, setSubscription] = useState(null);
  const [plans, setPlans] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    dashboardApi
      .mySubscription()
      .then(({ data }) => setSubscription(data.data.subscription))
      .catch(() => {});

    dashboardApi
      .plans()
      .then(({ data }) => setPlans(data.data.plans))
      .catch(() => {});
  }, []);

  async function handleUpgrade(planId) {
    try {
      console.log("Selected plan:", planId);

      const { data } = await dashboardApi.checkout(planId);

      window.location.href = data.data.url;
    } catch (err) {
      showToast(getErrorMessage(err), "error");
    }
  }

  async function handleCancel() {
    try {
      await dashboardApi.cancelSubscription();

      showToast("Subscription cancelled", "success");

      const { data } = await dashboardApi.mySubscription();

      setSubscription(data.data.subscription);
    } catch (err) {
      showToast(getErrorMessage(err), "error");
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="font-display text-2xl font-semibold">
        Subscription
      </h1>

      {subscription && (
        <SubscriptionCard
          plan={subscription.plan}
          status={subscription.status}
          onUpgrade={() => handleUpgrade("pro")}
          onCancel={handleCancel}
        />
      )}

      <div>
        <h2 className="font-display text-lg font-semibold mb-4">
          Available plans
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.id} className="glass-card p-5">

              <h3 className="font-semibold capitalize mb-1">
                {plan.name}
              </h3>

              <p className="text-2xl font-display font-semibold mb-1">
                ${plan.priceMonthly}
                <span className="text-xs text-ink-500">
                  /mo
                </span>
              </p>

              <p className="text-xs text-emerald-400 font-mono mb-4">
                {plan.credits} credits
              </p>


              {plan.id !== "free" && (
                <Button
                  className="w-full text-sm"
                  onClick={() =>
                    handleUpgrade(plan.name.toLowerCase())
                  }
                >
                  Choose plan
                </Button>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
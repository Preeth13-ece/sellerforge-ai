import { Users, Mail, Wrench, TrendingUp } from "lucide-react";
import StatsCard from "../dashboard/StatsCard.jsx";

export default function AdminStatsGrid({ summary }) {
  if (!summary) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard label="Total users" value={summary.totalUsers} icon={Users} />
      <StatsCard label="New users (30d)" value={summary.newUsers30d} icon={TrendingUp} />
      <StatsCard label="Subscribers" value={summary.totalSubscribers} icon={Mail} />
      <StatsCard label="Tool runs (30d)" value={summary.toolRuns30d} icon={Wrench} />
    </div>
  );
}

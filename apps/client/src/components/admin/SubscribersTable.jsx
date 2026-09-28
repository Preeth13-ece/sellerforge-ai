import { Trash2 } from "lucide-react";

export default function SubscribersTable({ subscribers, onDelete }) {
  return (
    <div className="glass-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-forge-border text-left text-ink-500">
            <th className="p-4 font-medium">Email</th>
            <th className="p-4 font-medium">Source</th>
            <th className="p-4 font-medium">Status</th>
            <th className="p-4 font-medium">Subscribed</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((s) => (
            <tr key={s._id} className="border-b border-forge-border last:border-0">
              <td className="p-4">{s.email}</td>
              <td className="p-4 text-ink-500">{s.source}</td>
              <td className="p-4 text-ink-500 capitalize">{s.status}</td>
              <td className="p-4 text-ink-500">{new Date(s.subscribedAt).toLocaleDateString()}</td>
              <td className="p-4 text-right">
                <button onClick={() => onDelete(s._id)} className="text-ink-500 hover:text-red-400">
                  <Trash2 size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

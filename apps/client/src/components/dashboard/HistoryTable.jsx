import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function HistoryTable({ items, onDelete }) {
  return (
    <div className="glass-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-forge-border text-left text-ink-500">
            <th className="p-4 font-medium">Tool</th>
            <th className="p-4 font-medium">Date</th>
            <th className="p-4 font-medium">Credits</th>
            <th className="p-4 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="border-b border-forge-border last:border-0">
              <td className="p-4 font-medium">{item.toolName}</td>
              <td className="p-4 text-ink-500">{new Date(item.createdAt).toLocaleString()}</td>
              <td className="p-4 text-ink-500 font-mono">{item.creditsCost}</td>
              <td className="p-4 text-right">
                <button onClick={() => onDelete(item._id)} className="text-ink-500 hover:text-red-400">
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

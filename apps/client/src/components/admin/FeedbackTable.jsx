export default function FeedbackTable({ feedback, onStatusChange }) {
  return (
    <div className="glass-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-forge-border text-left text-ink-500">
            <th className="p-4 font-medium">Type</th>
            <th className="p-4 font-medium">Message</th>
            <th className="p-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {feedback.map((f) => (
            <tr key={f._id} className="border-b border-forge-border last:border-0 align-top">
              <td className="p-4 capitalize text-ink-500">{f.type}</td>
              <td className="p-4 max-w-md">{f.message}</td>
              <td className="p-4">
                <select
                  value={f.status}
                  onChange={(e) => onStatusChange(f._id, e.target.value)}
                  className="input-field py-1.5 text-xs w-32"
                >
                  <option value="open">open</option>
                  <option value="reviewed">reviewed</option>
                  <option value="resolved">resolved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

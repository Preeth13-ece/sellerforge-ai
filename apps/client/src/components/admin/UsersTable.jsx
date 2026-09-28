export default function UsersTable({ users, onRoleChange }) {
  return (
    <div className="glass-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-forge-border text-left text-ink-500">
            <th className="p-4 font-medium">Name</th>
            <th className="p-4 font-medium">Email</th>
            <th className="p-4 font-medium">Plan</th>
            <th className="p-4 font-medium">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b border-forge-border last:border-0">
              <td className="p-4">{u.name}</td>
              <td className="p-4 text-ink-500">{u.email}</td>
              <td className="p-4 capitalize text-ink-500">{u.plan}</td>
              <td className="p-4">
                <select
                  value={u.role}
                  onChange={(e) => onRoleChange(u._id, e.target.value)}
                  className="input-field py-1.5 text-xs w-28"
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

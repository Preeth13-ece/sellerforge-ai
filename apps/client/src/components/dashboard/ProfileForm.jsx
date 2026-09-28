import { useState } from "react";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";

export default function ProfileForm({ user, onSave, saving }) {
  const [name, setName] = useState(user?.name || "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ name });
      }}
      className="space-y-5 max-w-md"
    >
      <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input label="Email" value={user?.email || ""} disabled />
      <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button>
    </form>
  );
}

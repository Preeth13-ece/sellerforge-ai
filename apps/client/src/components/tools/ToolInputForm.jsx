import { useState } from "react";
import Input from "../ui/Input.jsx";
import TextArea from "../ui/TextArea.jsx";
import Select from "../ui/Select.jsx";
import Switch from "../ui/Switch.jsx";
import Button from "../ui/Button.jsx";
import { Sparkles } from "lucide-react";

export default function ToolInputForm({ fields, onSubmit, loading, submitLabel = "Generate" }) {
  const initial = Object.fromEntries(
    fields.map((f) => [f.name, f.type === "checkbox" ? !!f.defaultValue : f.defaultValue ?? ""])
  );
  const [values, setValues] = useState(initial);

  function update(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {fields.map((field) => {
        if (field.type === "textarea") {
          return (
            <TextArea
              key={field.name}
              label={field.label}
              required={field.required}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChange={(e) => update(field.name, e.target.value)}
            />
          );
        }
        if (field.type === "select") {
          return (
            <Select
              key={field.name}
              label={field.label}
              options={field.options}
              value={values[field.name] || field.options[0]}
              onChange={(e) => update(field.name, e.target.value)}
            />
          );
        }
        if (field.type === "checkbox") {
          return (
            <Switch
              key={field.name}
              label={field.label}
              checked={!!values[field.name]}
              onChange={(val) => update(field.name, val)}
            />
          );
        }
        return (
          <Input
            key={field.name}
            label={field.label}
            type={field.type}
            required={field.required}
            placeholder={field.placeholder}
            value={values[field.name]}
            onChange={(e) => update(field.name, field.type === "number" ? Number(e.target.value) : e.target.value)}
          />
        );
      })}

      <Button type="submit" disabled={loading} className="w-full">
        <Sparkles size={16} />
        {loading ? "Generating…" : submitLabel}
      </Button>
    </form>
  );
}

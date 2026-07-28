import { useState, useEffect } from "react";
import Button from "../ui/Button.jsx";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("sf-cookie-consent")) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("sf-cookie-consent", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl">
      <div className="glass-card flex flex-col sm:flex-row items-center gap-4 p-5">
        <p className="text-sm text-ink-300 flex-1">
          We use cookies to improve your experience and understand how the toolkit is used.
        </p>
        <Button onClick={accept} className="px-5 py-2 text-sm whitespace-nowrap">Got it</Button>
      </div>
    </div>
  );
}

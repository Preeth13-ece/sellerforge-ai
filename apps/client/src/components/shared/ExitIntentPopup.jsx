import { useExitIntent } from "../../hooks/useExitIntent.js";
import Modal from "../ui/Modal.jsx";
import NewsletterForm from "./NewsletterForm.jsx";

export default function ExitIntentPopup() {
  const [triggered, setTriggered] = useExitIntent();

  return (
    <Modal open={triggered} onClose={() => setTriggered(false)} title="Before you go — a free gift">
      <p className="text-sm text-ink-300 mb-5">
        Get our free "20 Etsy SEO Keywords That Convert" checklist, plus weekly seller tips.
      </p>
      <NewsletterForm source="exit_popup" />
    </Modal>
  );
}

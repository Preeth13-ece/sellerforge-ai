import { Twitter, Facebook, Link2 } from "lucide-react";
import { useToast } from "../../context/ToastContext.jsx";

export default function BlogShareButtons({ url, title }) {
  const { showToast } = useToast();

  function copyLink() {
    navigator.clipboard.writeText(url);
    showToast("Link copied", "success");
  }

  return (
    <div className="flex items-center gap-3">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank" rel="noreferrer"
        className="text-ink-500 hover:text-emerald-400"
      >
        <Twitter size={17} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank" rel="noreferrer"
        className="text-ink-500 hover:text-emerald-400"
      >
        <Facebook size={17} />
      </a>
      <button onClick={copyLink} className="text-ink-500 hover:text-emerald-400">
        <Link2 size={17} />
      </button>
    </div>
  );
}

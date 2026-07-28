import { useEffect, useState } from "react";

export function useExitIntent() {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("sf-exit-shown")) return;

    function handleMouseLeave(e) {
      if (e.clientY <= 0) {
        setTriggered(true);
        sessionStorage.setItem("sf-exit-shown", "1");
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    }
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  return [triggered, setTriggered];
}

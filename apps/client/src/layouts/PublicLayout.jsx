import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar.jsx";
import Footer from "../components/shared/Footer.jsx";
import CookieConsentBanner from "../components/shared/CookieConsentBanner.jsx";
import ExitIntentPopup from "../components/shared/ExitIntentPopup.jsx";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-forge-glow">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CookieConsentBanner />
      <ExitIntentPopup />
    </div>
  );
}

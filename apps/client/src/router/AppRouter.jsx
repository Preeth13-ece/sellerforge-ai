import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import ProtectedRoute from "../components/shared/ProtectedRoute.jsx";
import AdminRoute from "../components/shared/AdminRoute.jsx";
import ScrollToTop from "../components/shared/ScrollToTop.jsx";
import ErrorBoundary from "../components/shared/ErrorBoundary.jsx";

// Public pages
import LandingPage from "../pages/public/LandingPage.jsx";
import ToolsHubPage from "../pages/public/ToolsHubPage.jsx";
import ToolPage from "../pages/public/ToolPage.jsx";
import PricingPage from "../pages/public/PricingPage.jsx";
import BlogIndexPage from "../pages/public/BlogIndexPage.jsx";
import BlogPostPage from "../pages/public/BlogPostPage.jsx";
import AboutPage from "../pages/public/AboutPage.jsx";
import ContactPage from "../pages/public/ContactPage.jsx";
import FAQPage from "../pages/public/FAQPage.jsx";
import PrivacyPolicyPage from "../pages/public/PrivacyPolicyPage.jsx";
import TermsOfServicePage from "../pages/public/TermsOfServicePage.jsx";
import AffiliateDisclosurePage from "../pages/public/AffiliateDisclosurePage.jsx";
import DigitalProductsPage from "../pages/public/digitalproducts.jsx";
import NotFoundPage from "../pages/public/NotFoundPage.jsx";

// Auth pages
import LoginPage from "../pages/auth/LoginPage.jsx";
import SignupPage from "../pages/auth/SignupPage.jsx";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage.jsx";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.jsx";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage.jsx";

// Dashboard pages
import DashboardOverviewPage from "../pages/dashboard/DashboardOverviewPage.jsx";
import DashboardHistoryPage from "../pages/dashboard/DashboardHistoryPage.jsx";
import DashboardFavoritesPage from "../pages/dashboard/DashboardFavoritesPage.jsx";
import DashboardDownloadsPage from "../pages/dashboard/DashboardDownloadsPage.jsx";
import DashboardProfilePage from "../pages/dashboard/DashboardProfilePage.jsx";
import DashboardApiUsagePage from "../pages/dashboard/DashboardApiUsagePage.jsx";
import DashboardSubscriptionPage from "../pages/dashboard/DashboardSubscriptionPage.jsx";

// Admin pages
import AdminOverviewPage from "../pages/admin/AdminOverviewPage.jsx";
import AdminSubscribersPage from "../pages/admin/AdminSubscribersPage.jsx";
import AdminBlogListPage from "../pages/admin/AdminBlogListPage.jsx";
import AdminBlogEditorPage from "../pages/admin/AdminBlogEditorPage.jsx";
import AdminUsersPage from "../pages/admin/AdminUsersPage.jsx";
import AdminFeedbackPage from "../pages/admin/AdminFeedbackPage.jsx";
import AdminAffiliateClicksPage from "../pages/admin/AdminAffiliateClicksPage.jsx";

export default function AppRouter() {
  return (
    <ErrorBoundary>
      <ScrollToTop />

      <Routes>
        {/* ==================== PUBLIC PAGES ==================== */}
        <Route element={<PublicLayout />}>
          <Route index element={<LandingPage />} />

          <Route path="tools" element={<ToolsHubPage />} />
          <Route path="tools/:slug" element={<ToolPage />} />

          <Route path="pricing" element={<PricingPage />} />

          <Route path="blog" element={<BlogIndexPage />} />
          <Route
            path="blog/category/:categorySlug"
            element={<BlogIndexPage />}
          />
          <Route path="blog/:postSlug" element={<BlogPostPage />} />

          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />

          {/* Digital Products */}
          <Route
            path="digital-products"
            element={<DigitalProductsPage />}
          />

          <Route path="faq" element={<FAQPage />} />

          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms-of-service" element={<TermsOfServicePage />} />
          <Route
            path="affiliate-disclosure"
            element={<AffiliateDisclosurePage />}
          />

          {/* Auth */}
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="verify-email/:token" element={<VerifyEmailPage />} />

          {/* 404 */}
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* ==================== PROTECTED PAGES ==================== */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverviewPage />} />

            <Route path="history" element={<DashboardHistoryPage />} />
            <Route path="favorites" element={<DashboardFavoritesPage />} />
            <Route path="downloads" element={<DashboardDownloadsPage />} />
            <Route path="profile" element={<DashboardProfilePage />} />
            <Route path="api-usage" element={<DashboardApiUsagePage />} />
            <Route
              path="subscription"
              element={<DashboardSubscriptionPage />}
            />
          </Route>

          {/* ==================== ADMIN PAGES ==================== */}
          <Route element={<AdminRoute />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminOverviewPage />} />

              <Route
                path="subscribers"
                element={<AdminSubscribersPage />}
              />

              <Route path="blog" element={<AdminBlogListPage />} />

              <Route
                path="blog/new"
                element={<AdminBlogEditorPage />}
              />

              <Route
                path="blog/:id/edit"
                element={<AdminBlogEditorPage />}
              />

              <Route path="users" element={<AdminUsersPage />} />

              <Route path="feedback" element={<AdminFeedbackPage />} />

              <Route
                path="affiliate-clicks"
                element={<AdminAffiliateClicksPage />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}


import AnnouncementBanner from "@/pages/AnnouncementBanner";
import Footer from "@/pages/Footer";
import Navbar from "@/pages/Navbar";
import ScrollToTop from "@/pages/ScrollToTop";
import React, { useState, Suspense } from "react"; // 1. Import Suspense
import { Outlet, useLocation } from "react-router-dom";

function MainLayout() {
  const [showBanner, setShowBanner] = useState(true);
  const [bannerHeight, setBannerHeight] = useState(0);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <ScrollToTop />

      {!isAdminPage && showBanner && (
        <AnnouncementBanner
          onClose={() => setShowBanner(false)}
          onHeightChange={setBannerHeight}
        />
      )}

      {!isAdminPage && (
        <Navbar
          bannerHeight={showBanner ? bannerHeight : 0}
          offset={showBanner}
        />
      )}

      <main>
        {/* 2. Wrap Outlet with Suspense and a fallback */}
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>

      {!isAdminPage && <Footer />}
    </div>
  );
}

export default MainLayout;
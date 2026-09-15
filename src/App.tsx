import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import OurWork from "@/pages/OurWork";
import Services from "@/pages/Services";
import Downloads from "@/pages/Downloads";
import BeitHaSefer from "@/pages/BeitHaSefer";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/services" element={<Services />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/beit-hasefer" element={<BeitHaSefer />} />
        </Route>

        {/* Admin — deliberately outside the public Layout (no header/footer,
            not linked anywhere in the public nav). Reachable only at /admin. */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

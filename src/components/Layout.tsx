import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import IconSprite from "@/components/IconSprite";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useReveal } from "@/hooks/useReveal";

// Pages that have no dedicated CTA section put the #contact anchor directly
// on the footer's form instead (same as the static site's per-page markup).
const FOOTER_IS_CONTACT_ANCHOR = ["/downloads", "/beit-hasefer"];

export default function Layout() {
  const { pathname } = useLocation();
  const isBeit = pathname === "/beit-hasefer";

  useReveal([pathname]);

  useEffect(() => {
    document.body.classList.toggle("page-beit", isBeit);
  }, [isBeit]);

  return (
    <>
      <IconSprite />
      <SiteHeader variant={isBeit ? "light" : "dark"} />
      <Outlet />
      <SiteFooter id={FOOTER_IS_CONTACT_ANCHOR.includes(pathname) ? "contact" : undefined} />
    </>
  );
}

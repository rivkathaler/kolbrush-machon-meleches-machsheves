import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/our-work", label: "Our Work" },
  { href: "/services", label: "Services" },
  { href: "/downloads", label: "Downloads" },
];

export default function SiteHeader({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isStuck = useHeaderScroll();
  const { pathname } = useLocation();
  const [navOpen, setNavOpen] = useState(false);

  const logo = variant === "light" ? "/img/logo-maroon.svg" : "/img/logo-cream.svg";

  return (
    <header
      className={`site-header${variant === "light" ? " site-header--light" : ""}${isStuck ? " is-stuck" : ""}`}
      id="header"
    >
      <div className="shell header-inner">
        <Link className="brand" to="/" aria-label="Machon Meleches Machsheves — home">
          <img src={logo} alt="" width={119} height={116} />
        </Link>

        <nav className={`nav${navOpen ? " is-open" : ""}`} id="nav" aria-label="Main" onClick={() => setNavOpen(false)}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} to={link.href} aria-current={pathname === link.href ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
          <Link className="nav__beit" to="/beit-hasefer" aria-current={pathname === "/beit-hasefer" ? "page" : undefined}>
            <span className="nav__beit-label">Beit HaSefer</span>
            <span className="nav__beit-icon">
              <img src="/img/icon-building.svg" alt="" width={28} height={28} />
            </span>
          </Link>
        </nav>

        <button
          className="nav-toggle"
          id="navToggle"
          aria-label={navOpen ? "Close menu" : "Open menu"}
          aria-expanded={navOpen}
          aria-controls="nav"
          onClick={() => setNavOpen((v) => !v)}
        >
          <svg aria-hidden="true">
            <use href="#i-menu" />
          </svg>
        </button>
      </div>
    </header>
  );
}

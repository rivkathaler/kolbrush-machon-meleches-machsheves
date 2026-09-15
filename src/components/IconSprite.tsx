// Every icon symbol used anywhere on the site, rendered once (was duplicated
// inline in every static HTML page before). 24x24 grid, stroke only, round caps.
export default function IconSprite() {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <symbol id="i-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </symbol>
      <symbol id="i-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M6 13l6 6 6-6" />
      </symbol>
      <symbol id="i-arrow-dr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 7l10 10M17 11v6h-6" />
      </symbol>
      <symbol id="i-arrow-ur" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7M9 7h8v8" />
      </symbol>
      <symbol id="i-typing" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9.5 14h5" />
      </symbol>
      <symbol id="i-editing" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20h4L18.5 9.5a2.83 2.83 0 0 0-4-4L4 16v4z" />
        <path d="M13.5 6.5l4 4" />
      </symbol>
      <symbol id="i-typesetting" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M12 4v16" />
        <path d="M6 9h3M6 12.5h3M15 9h3M15 12.5h3" />
      </symbol>
      <symbol id="i-graphics" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21a9 9 0 1 1 0-18c4.97 0 9 3.58 9 8 0 2.21-1.79 4-4 4h-2a2 2 0 0 0-1.4 3.4 1 1 0 0 1-.7 1.6H12z" />
        <path d="M7.5 10.5h.01M12 7.5h.01M16.5 10.5h.01" strokeWidth="2.4" />
      </symbol>
      <symbol id="i-printing" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 9V3h10v6" />
        <path d="M7 18H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
        <rect x="7" y="14" width="10" height="7" rx="1" />
      </symbol>
      <symbol id="i-kollel" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17.5V5.5A2.5 2.5 0 0 1 7.5 3H19v14H7.5A2.5 2.5 0 0 0 5 19.5v0A2.5 2.5 0 0 1 7.5 17H19v4" />
        <path d="M9 7h6" />
      </symbol>
      <symbol id="i-book-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6.5C10.5 4.8 8.4 4 6 4H3v13h3c2.4 0 4.5.8 6 2.5" />
        <path d="M12 6.5C13.5 4.8 15.6 4 18 4h3v13h-3c-2.4 0-4.5.8-6 2.5" />
        <path d="M12 6.5v13" />
      </symbol>
      <symbol id="i-play" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M7 4.5v15l13-7.5z" />
      </symbol>
      <symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 7h16M4 12h16M4 17h16" />
      </symbol>
    </svg>
  );
}

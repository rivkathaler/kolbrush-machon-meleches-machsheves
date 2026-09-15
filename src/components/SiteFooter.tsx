import { Link } from "react-router-dom";
import { useMailtoForm } from "@/hooks/useMailtoForm";

export default function SiteFooter({ id }: { id?: string }) {
  const { note, handleSubmit } = useMailtoForm("Website enquiry");

  return (
    <footer className="site-footer" id={id}>
      <div className="shell">
        <Link className="footer__brand" to="/" aria-label="Machon Meleches Machsheves — home">
          <img src="/img/logo-cream.svg" alt="" width={174} height={169} />
        </Link>

        <div className="footer__contact">
          <h3>Contact us at</h3>
          <ul>
            <li><a href="tel:+972527611978">Israel: 052-761-1978</a></li>
            <li><a href="tel:+17737968800">USA: 773-796-8800</a></li>
            <li><a href="tel:+44203129515">England: 44-203-129-515</a></li>
            <li><a href="mailto:printyoursefer@gmail.com">printyoursefer@gmail.com</a></li>
          </ul>
        </div>

        <form className="footer__form" onSubmit={handleSubmit} noValidate>
          <textarea name="message" placeholder="Comment or Message" aria-label="Comment or message" required />
          <div className="footer__row">
            <label className="field"><input type="text" name="name" placeholder="Your name" aria-label="Your name" required /></label>
            <label className="field"><input type="email" name="email" placeholder="Your email, for an answer" aria-label="Your email" required /></label>
            <button className="footer__submit" type="submit" aria-label="Send message">
              <svg aria-hidden="true"><use href="#i-arrow" /></svg>
            </button>
          </div>
        </form>
        <p className="form-note" role="status">{note}</p>

        <nav className="footer__nav" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/our-work">Our work</Link>
          <Link to="/services">Services</Link>
          <Link to="/downloads">Downloads</Link>
          <Link to="/beit-hasefer">Beit HaSefer</Link>
        </nav>
      </div>
    </footer>
  );
}

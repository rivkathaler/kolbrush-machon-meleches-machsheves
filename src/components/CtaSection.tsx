import { useMailtoForm } from "@/hooks/useMailtoForm";

// Shared "What's with your sefer?" CTA — identical on Home, Our Work and
// Services. Only rendered when the page owns the #contact anchor itself
// (Downloads / Beit HaSefer put #contact on the footer instead).
export default function CtaSection() {
  const { note, handleSubmit } = useMailtoForm("Free consultation call request");

  return (
    <section className="cta" id="contact">
      <div className="shell">
        <div className="cta__inner reveal">
          <span className="icon-dot cta__badge">
            <svg aria-hidden="true"><use href="#i-book-open" /></svg>
          </span>
          <h2 className="cta__title">
            <span>What’s</span>
            <span>with your</span>
            <span>sefer?</span>
          </h2>
          <div className="cta__body">
            <p className="cta__text">
              Book a free 20 minute consultation call
              <br />
              we can talk, discuss, answer questions
              <br />
              and see how we can help you.
            </p>
            <form className="cta__form" onSubmit={handleSubmit} noValidate>
              <label className="field field--name"><input type="text" name="name" placeholder="Name" aria-label="Name" required /></label>
              <label className="field field--email"><input type="email" name="email" placeholder="Email" aria-label="Email" required /></label>
              <label className="field field--phone"><input type="tel" name="phone" placeholder="Phone number" aria-label="Phone number" required /></label>
              <button className="cta__submit" type="submit">
                <span className="cta__submit-label">Book a call</span>
                <span className="cta__submit-icon"><svg aria-hidden="true"><use href="#i-arrow-ur" /></svg></span>
              </button>
              <p className="form-note" role="status">{note}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

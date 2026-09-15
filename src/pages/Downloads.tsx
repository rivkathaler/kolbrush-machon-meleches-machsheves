import { useDocumentHead } from "@/hooks/useDocumentHead";
import { TESTIMONIALS_DOWNLOADS } from "@/data/testimonials";
import { DOWNLOAD_CARDS } from "@/data/downloads";
import Testimonials from "@/components/Testimonials";

const USEFUL_LINKS = [
  "Otzar HaChochma — the digital seforim library",
  "HebrewBooks — free scanned seforim",
  "Sefaria — texts, translations and sources",
  "Registering an ISBN for your sefer",
  "Depositing with the National Library of Israel",
  "Hebrew fonts and keyboard layouts",
];

export default function Downloads() {
  useDocumentHead(
    "Downloads — Machon Meleches Machsheves",
    "Publishing your sefer made simple. Tools and resources to make publishing easier — the Word add-on, typesetting samples, templates and checklists."
  );

  return (
    <>
      <section className="dl-hero" id="top">
        <div className="shell">
          <div className="dl-hero__panel" aria-hidden="true" />
          <span className="tag reveal">Downloads</span>
          <h1 className="dl-hero__title reveal">
            <span>Publishing your sefer</span>
            <span>made simple</span>
          </h1>
          <p className="dl-hero__note reveal">
            Tools and resources<br />to make publishing easier
          </p>
        </div>
      </section>

      <section className="addon" id="word-add-on">
        <div className="shell">
          <div className="addon__inner reveal">
            <div>
              <p className="eyebrow">Word add on</p>
              <h2 className="addon__title">Write your sefer inside Word</h2>
              <p className="addon__text">A free plug-in that turns Microsoft Word into a seforim editor. Install it once and your mekoros, roshei teivos and page layout are set correctly as you type — so the manuscript you send us is already close to print-ready.</p>
              <div className="addon__actions">
                <a className="pill pill--outline" href="#downloads-grid">
                  Download here
                  <span className="knob"><svg aria-hidden="true"><use href="#i-arrow-dr" /></svg></span>
                </a>
              </div>
            </div>
            <div className="addon__media">
              <p>Video or GIF showing how it looks and works</p>
            </div>
          </div>
        </div>
      </section>

      <section className="dl-grid" id="downloads-grid">
        <div className="shell">
          <div className="dl-grid__inner">
            {DOWNLOAD_CARDS.map((card) => (
              <article className="dl-card reveal" key={card.title}>
                <div className="dl-card__thumb"><img src={card.img} alt="" loading="lazy" /></div>
                <p className="dl-card__text">
                  {card.title.split("\n").map((line, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </p>
                <a className="dl-card__btn" href="#contact" aria-label={`Download the ${card.title.replace("\n", " ")}`}>
                  <svg aria-hidden="true"><use href="#i-arrow-dr" /></svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="links" id="useful-links">
        <div className="shell">
          <div className="links__layout">
            <div className="links__col-left reveal">
              <h2 className="links__title">Useful link list</h2>
              <p className="links__sub">Everything worth bookmarking</p>
              <figure className="links__media" style={{ margin: 0 }}>
                <img src="/books/book-6.jpg" alt="A sefer produced by Machon Meleches Machsheves" loading="lazy" />
              </figure>
            </div>

            <div className="links__list reveal">
              {USEFUL_LINKS.map((label) => (
                <a className="link-row" href="#contact" key={label}>
                  {label}
                  <span><svg aria-hidden="true"><use href="#i-arrow-dr" /></svg></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Testimonials items={TESTIMONIALS_DOWNLOADS} variant="downloads" sectionId="testimonials" />
    </>
  );
}

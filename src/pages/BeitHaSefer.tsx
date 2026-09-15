import { useDocumentHead } from "@/hooks/useDocumentHead";
import { useMailtoForm } from "@/hooks/useMailtoForm";

const CLASSES = [
  { img: "/samples/single-1.jpg", title: "Where to begin", sub: "Turning notes into a manuscript" },
  { img: "/samples/double-1.jpg", title: "Choosing a style", sub: "Single, double or multi-text" },
  { img: "/samples/multi-1.jpg", title: "Working with mekoros", sub: "Laying out a commentary" },
  { img: "/books/book-2.jpg", title: "The shaar blatt", sub: "Designing your title page" },
  { img: "/samples/single-3.jpg", title: "Proofreading", sub: "Catching what the eye misses" },
  { img: "/samples/double-4.jpg", title: "Print or digital", sub: "Deciding on your print run" },
  { img: "/books/book-6.jpg", title: "Soft or hard cover", sub: "Binding, paper and finish" },
  { img: "/samples/multi-4.jpg", title: "After the print", sub: "Distribution and hafatzah" },
];

export default function BeitHaSefer() {
  useDocumentHead(
    "Beit HaSefer — Machon Meleches Machsheves",
    "The Beit HaSefer: the digital classroom for the aspiring author. Short classes on preparing, editing, typesetting and printing your sefer."
  );

  const { note, handleSubmit } = useMailtoForm("Beit HaSefer — notify me about new classes");

  return (
    <>
      <section className="beit-hero" id="top">
        <div className="beit-hero__frame reveal">
          <img src="/img/beit-hero.jpg" alt="An open sefer on a table" />
          <div className="beit-hero__label">
            <span className="tag">Blog</span>
            <h1>Beit<br />HaSefer</h1>
          </div>
        </div>
      </section>

      <section className="beit-grid" id="classes">
        <div className="shell">
          <div className="beit-grid__inner">
            {CLASSES.map((c) => (
              <a className="beit-card reveal" href="#subscribe" key={c.title}>
                <div className="beit-card__thumb">
                  <img src={c.img} alt="" loading="lazy" />
                  <span className="beit-card__play"><svg aria-hidden="true"><use href="#i-play" /></svg></span>
                </div>
                <div className="beit-card__body">
                  <strong>{c.title}</strong>
                  <span>{c.sub}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="shell beit-news" id="subscribe">
        <h2 className="reveal">
          Be the first to know<br />
          when we post<br />
          a new class
        </h2>

        <form className="reveal" onSubmit={handleSubmit} noValidate>
          <label className="field"><input type="text" name="name" placeholder="Your name" aria-label="Your name" required /></label>
          <label className="field"><input type="email" name="email" placeholder="Your email," aria-label="Your email" required /></label>
          <button type="submit">Send</button>
          <p className="form-note" role="status">{note}</p>
        </form>
      </section>
    </>
  );
}

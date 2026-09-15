import { Fragment, useEffect, useRef } from "react";

import { useDocumentHead } from "@/hooks/useDocumentHead";
import { FAQ_ITEMS } from "@/data/faq";
import Carousel from "@/components/Carousel";
import CtaSection from "@/components/CtaSection";

const STEPS = [
  { id: "typing", label: "Typing", title: "Typing", text: "Machon Meleches Machsheves employs typists proficient even with difficult handwriting, coupled with unmatched speed and accuracy." },
  { id: "editing", label: "Editing", title: "Editing", text: "Machon Meleches Machsheves formed a hand-picked team of talmidei chochomim who painstakingly proofread and edit your sefer so that klal Yisroel can truly benefit from your work." },
  { id: "typesetting", label: "Typesetting", title: "Typesetting", text: "Utilizing the foremost programs available for seforim, our master typesetters are at the forefront of the profession, with deep understanding of the relevant styles for any given sefer." },
  { id: "graphics", label: "Graphics", title: "Graphics", text: "Machon Meleches Machsheves avails its clients with the finest graphic artists who specialize in seforim." },
  { id: "printing", label: "Printing", title: "Printing", text: "Machon Meleches Machsheves provides full printing services with top-notch results for both soft and hard cover." },
];

const singleImgs = ["single-1", "single-2", "single-3", "single-1", "single-2", "single-3", "single-1", "single-2"];
const doubleImgs = ["double-1", "double-2", "double-3", "double-4", "double-1", "double-2", "double-3", "double-4"];
const multiImgs = ["multi-1", "multi-2", "multi-3", "multi-4", "multi-1", "multi-2", "multi-3", "multi-4"];

function useServicesRailFill() {
  const railRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Record<string, HTMLElement | null>>({});
  const stepRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const svcRows = Object.values(rowRefs.current).filter(Boolean) as HTMLElement[];
    if (!svcRows.length) return;

    // highlight the row currently in view
    const rowIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            svcRows.forEach((r) => r.classList.toggle("is-active", r === entry.target));
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    svcRows.forEach((r) => rowIo.observe(r));

    const svcRail = railRef.current;
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
    const EASE = 0.14;

    let railTarget = 0, railCurrent = 0;
    const rowTarget = new Map<string, number>(svcRows.map((r) => [r.id, 0]));
    const rowCurrent = new Map<string, number>(svcRows.map((r) => [r.id, 0]));

    const readTargets = () => {
      if (svcRail) {
        const r = svcRail.getBoundingClientRect();
        railTarget = clamp01((window.innerHeight / 2 - r.top) / r.height);
      }
      svcRows.forEach((row) => {
        const r = row.getBoundingClientRect();
        rowTarget.set(row.id, clamp01((window.innerHeight * 0.6 - r.top) / r.height));
      });
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rafId: number | null = null;
    let onScrollResize: (() => void) | null = null;

    if (reducedMotion) {
      const applyImmediate = () => {
        readTargets();
        if (svcRail) svcRail.style.setProperty("--rail-fill", railTarget.toFixed(4));
        svcRows.forEach((row) => {
          const link = stepRefs.current[row.id];
          if (link) link.style.setProperty("--fill", (rowTarget.get(row.id)! * 100).toFixed(1) + "%");
        });
      };
      applyImmediate();
      onScrollResize = applyImmediate;
      window.addEventListener("scroll", applyImmediate, { passive: true });
      window.addEventListener("resize", applyImmediate, { passive: true });
    } else {
      const tick = () => {
        readTargets();
        railCurrent += (railTarget - railCurrent) * EASE;
        if (svcRail) svcRail.style.setProperty("--rail-fill", railCurrent.toFixed(4));

        svcRows.forEach((row) => {
          const id = row.id;
          const next = rowCurrent.get(id)! + (rowTarget.get(id)! - rowCurrent.get(id)!) * EASE;
          rowCurrent.set(id, next);
          const link = stepRefs.current[id];
          if (link) link.style.setProperty("--fill", (next * 100).toFixed(1) + "%");
        });

        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      rowIo.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (onScrollResize) {
        window.removeEventListener("scroll", onScrollResize);
        window.removeEventListener("resize", onScrollResize);
      }
    };
  }, []);

  return { railRef, rowRefs, stepRefs };
}

export default function Services() {
  useDocumentHead(
    "Services — Machon Meleches Machsheves",
    "Full A-Z support from manuscript to print: typing, editing, typesetting, graphics and printing for seforim, overseen by Rabbi Akiva Kulbersh in Yerushalayim."
  );

  const { railRef, rowRefs, stepRefs } = useServicesRailFill();

  return (
    <>
      <section className="page-hero svc-hero" id="top">
        <div className="shell">
          <h1 className="svc-hero__title reveal">
            <span>Full A-Z support</span>
            <span>from manuscript</span>
            <span>to print</span>
          </h1>
          <span className="tag svc-hero__tag reveal">Our services</span>

          <div className="stat stat--books">
            <b>68</b>
            <span>Sfarim published by<br />melechet machshevet</span>
          </div>
          <div className="stat stat--years">
            <b>14</b>
            <span>Years experience</span>
          </div>
          <div className="stat stat--typesetting">
            <b>4</b>
            <span>Typesetting styles</span>
          </div>
        </div>
      </section>

      <section className="kollel">
        <div className="shell">
          <div className="kollel__inner reveal">
            <div className="kollel__col">
              <h2 className="kollel__title">Kollel Kuntreisim</h2>
              <p className="kollel__text">
                A chaburah or a kollel writing up a short kuntress gets the same careful attention as a full-length sefer.<br />
                We handle the typing, editing, layout and printing on a fast turnaround,<br />
                so your work reaches the beis medrash on your schedule.
              </p>
              <a className="pill" href="#contact">
                Publish your kuntress today
                <span className="knob"><svg aria-hidden="true"><use href="#i-arrow-ur" /></svg></span>
              </a>
            </div>

            <div className="kollel__cards">
              <figure className="kollel__card"><img src="/books/book-2.jpg" alt="Kuntress produced for a kollel" loading="lazy" /></figure>
              <figure className="kollel__card"><img src="/books/book-9.jpg" alt="Short-run kuntress in a dark binding" loading="lazy" /></figure>
              <figure className="kollel__card"><img src="/books/book-10.jpg" alt="Kuntress with a burgundy cover" loading="lazy" /></figure>
            </div>
          </div>
        </div>
      </section>

      <section className="shell svc-detail" id="detail">
        <div className="svc-detail__intro reveal">
          <h2 className="svc-detail__title">Our Process</h2>
          <p className="svc-detail__sub">Five careful stages, one experienced team.</p>
          <img src="/img/services-book.png" alt="Sefer produced by Machon Meleches Machsheves" loading="lazy" />
        </div>

        <div className="svc-rail" ref={railRef}>
          {STEPS.map((s, i) => (
            <article
              className={`svc-row${i === 0 ? " is-active" : ""} reveal`}
              id={s.id}
              key={s.id}
              ref={(el) => { rowRefs.current[s.id] = el; }}
            >
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      <nav className="shell steps reveal" aria-label="Our process" id="stepsNav">
        {STEPS.map((s, i) => (
          <Fragment key={s.id}>
            <a
              href={`#${s.id}`}
              data-step={s.id}
              ref={(el) => { stepRefs.current[s.id] = el; }}
            >
              {s.label}
            </a>
            {i < STEPS.length - 1 && (
              <span className="steps__arrow">
                <svg aria-hidden="true"><use href="#i-arrow" /></svg>
              </span>
            )}
          </Fragment>
        ))}
      </nav>

      <section className="samples" id="samples">
        <div className="shell">
          <div className="sample-group sample-group--single reveal">
            <h3>Single Column Typesetting</h3>
            <Carousel
              labelPrefix="single-column"
              images={singleImgs.map((name, i) => ({ src: `/samples/${name}.jpg`, alt: `Single column typesetting sample ${i + 1}` }))}
            />
          </div>

          <div className="sample-group sample-group--double reveal">
            <h3>Double Column Typesetting</h3>
            <Carousel
              labelPrefix="double-column"
              images={doubleImgs.map((name, i) => ({ src: `/samples/${name}.jpg`, alt: `Double column typesetting sample ${i + 1}` }))}
            />
          </div>

          <div className="sample-group sample-group--multi reveal">
            <h3>Multi-Text Typesetting</h3>
            <Carousel
              labelPrefix="multi-text"
              images={multiImgs.map((name, i) => ({ src: `/samples/${name}.jpg`, alt: `Multi-text typesetting sample ${i + 1}` }))}
            />
          </div>
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="shell">
          <p className="eyebrow reveal">FAQ</p>
          <h2 className="section-title faq__title reveal">What people<br />wanted to know</h2>

          <div className="faq__list reveal">
            {FAQ_ITEMS.map((item) => (
              <details className="faq__item" key={item.q}>
                <summary>{item.q}</summary>
                <p className="faq__answer">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useDocumentHead } from "@/hooks/useDocumentHead";
import { cssVars } from "@/lib/cssVars";
import { TESTIMONIALS_HOME } from "@/data/testimonials";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";

const SERVICES = [
  { x: 274, y: 359, w: 367, icon: "i-typing", title: "Typing", text: "We convert handwritten or printed text into digital form, performed by skilled typists who accurately interpret difficult handwriting." },
  { x: 229, y: 630, w: 362, icon: "i-editing", title: "Editing", text: "We’re enhancing your book for clarity, accuracy, and quality for the Israeli community." },
  { x: 422, y: 898, w: 342, icon: "i-typesetting", title: "Typesetting", text: "We organize text on a page for better visual appeal and readability." },
  { x: 1251, y: 362, w: 309, icon: "i-printing", title: "Printing", text: "We print text and images on paper using different methods." },
  { x: 1296, y: 639, w: 448, icon: "i-graphics", title: "Graphics", text: "We design book covers that enhance information with eye-catching visuals. Our editing service refines graphics to make them appealing and clear." },
];

const WORK_TILES = [
  { x: 117, y: 308, h: 327, src: "/work/work-1.jpg", alt: "Bais Lechem Yehuda — published by Machon Meleches Machsheves", fade: false },
  { x: 453, y: 494, h: 350, src: "/work/work-2.jpg", alt: "Ohel Yaakov — published by Machon Meleches Machsheves", fade: false },
  { x: 808, y: 639, h: 350, src: "/work/work-3.jpg", alt: "Moreh Nevuchim — published by Machon Meleches Machsheves", fade: false },
  { x: 1154, y: 494, h: 350, src: "/work/work-4.jpg", alt: "Maamar HaChochma — published by Machon Meleches Machsheves", fade: false },
  { x: 1490, y: 310, h: 328, src: "/work/work-5.jpg", alt: "Mishnas Chovas HaTorah — published by Machon Meleches Machsheves", fade: false },
  { x: 117, y: 650, h: 327, src: "/work/work-6.jpg", alt: "Sichos Rav Yitzchok Tzvi — published by Machon Meleches Machsheves", fade: true },
  { x: 453, y: 860, h: 327, src: "/work/work-7.jpg", alt: "Derech Hashem — published by Machon Meleches Machsheves", fade: true },
  { x: 808, y: 1012, h: 327, src: "/work/work-8.jpg", alt: "Mishneh Itim — published by Machon Meleches Machsheves", fade: true },
  { x: 1154, y: 860, h: 327, src: "/work/work-9.jpg", alt: "Iyun HaBracha — published by Machon Meleches Machsheves", fade: true },
  { x: 1490, y: 650, h: 327, src: "/work/work-10.jpg", alt: "Maseches Horayos — published by Machon Meleches Machsheves", fade: true },
];

function useBookTilt() {
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const img = imgRef.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!stage || !img || !finePointer || reducedMotion) return;

    const MAX_TILT = 16;
    const LIFT = 40;
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0, lift = 0, targetLift = 0;
    let raf: number | null = null;

    const render = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      lift += (targetLift - lift) * 0.12;

      img.style.transform = `rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) translateZ(${lift.toFixed(1)}px)`;

      const settled =
        Math.abs(targetX - currentX) < 0.01 &&
        Math.abs(targetY - currentY) < 0.01 &&
        Math.abs(targetLift - lift) < 0.1;

      raf = settled ? null : requestAnimationFrame(render);
    };
    const kick = () => { if (raf === null) raf = requestAnimationFrame(render); };

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      targetY = px * MAX_TILT * 2;
      targetX = -py * MAX_TILT * 2;
      targetLift = LIFT;
      kick();
    };
    const onLeave = () => {
      targetX = targetY = targetLift = 0;
      kick();
    };

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return { stageRef, imgRef };
}

export default function Home() {
  useDocumentHead(
    "Machon Meleches Machsheves — Publishing Services for the Torah World",
    "Based in Yerushalayim, American owned and operated. Typing, editing, typesetting, graphics and printing for seforim — helping lomdei Torah bring their writing to klal Yisroel for over 14 years."
  );
  const { stageRef, imgRef } = useBookTilt();

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero" id="top">
        <div className="hero__bg" role="img" aria-label="A finished sefer produced by Machon Meleches Machsheves" />
        <div className="shell hero__grid">
          <div className="hero__lead reveal">
            <h1 className="hero__title">Your Sefer<br />Deserves Our<br />Expertise</h1>
          </div>
          <div className="hero__copy reveal">
            <p>
              Whether classic like the Turei Even,<br />
              the Sichos of R’ Noson Tzvi Finkel ztz”l<br />
              or a small kuntress for a bris,<br />
              we have produced hundreds of klal Yisroel’s finest works.
            </p>
            <a className="pill" href="#contact">
              Contact us
              <span className="knob"><svg aria-hidden="true"><use href="#i-arrow" /></svg></span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section className="about" id="about">
        <div className="shell">
          <p className="eyebrow reveal">About us</p>
          <h2 className="section-title about__title reveal">
            <span>Empowering</span>
            <span>Torah Scholars</span>
          </h2>
          <div className="about__body reveal">
            <p>
              Based in Yerushalayim, American owned and operated,<br />
              we have been helping lomdei Torah bring their writing<br />
              to klal Yisroel for over 14 years.
            </p>
            <p>
              Every project is overseen by Rabbi Akiva Kulbersh,<br />
              an expert in seforim, a Rosh Kollel, and a successful halachic author, who brings his vast experience and knowledge to provide personalized service coupled with comprehensive understanding.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="services" id="services">
        <div className="shell">
          <p className="eyebrow reveal">Our services</p>
          <h2 className="section-title services__title reveal">What we do</h2>

          <div className="services__stage reveal" ref={stageRef}>
            <img
              src="/img/services-book.png"
              alt="Sefer produced by Machon Meleches Machsheves"
              ref={imgRef}
              width={737}
              height={1000}
            />
          </div>

          {SERVICES.map((s) => (
            <article className="service reveal" key={s.title} style={cssVars({ "--x": s.x, "--y": s.y, "--w": s.w })}>
              <span className="icon-dot"><svg aria-hidden="true"><use href={`#${s.icon}`} /></svg></span>
              <div className="service__body">
                <h3 className="service__title">{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </article>
          ))}

          <article className="service service--kollel reveal" style={cssVars({ "--x": 1181, "--y": 912, "--w": 448 })}>
            <span className="service__pill">
              Kollel Kuntrest
              <span className="icon-dot"><svg aria-hidden="true"><use href="#i-kollel" /></svg></span>
            </span>
            <p>We design book covers that enhance information with eye-catching visuals. Our editing service refines graphics to make them appealing and clear.</p>
          </article>
        </div>
      </section>

      {/* ---------- Word add-on ---------- */}
      <section className="addon" id="downloads">
        <div className="shell">
          <div className="addon__inner reveal">
            <div>
              <p className="eyebrow">Word add on</p>
              <h2 className="addon__title">Write your sefer inside Word</h2>
              <p className="addon__text">A free plug-in that turns Microsoft Word into a seforim editor. Install it once and your mekoros, roshei teivos and page layout are set correctly as you type — so the manuscript you send us is already close to print-ready.</p>
              <div className="addon__actions">
                <a className="pill pill--outline" href="#contact">
                  Download here
                  <span className="knob"><svg aria-hidden="true"><use href="#i-arrow-dr" /></svg></span>
                </a>
                <a className="pill" href="#contact">
                  See more downloads
                  <span className="knob"><svg aria-hidden="true"><use href="#i-arrow-ur" /></svg></span>
                </a>
              </div>
            </div>
            <div className="addon__media">
              <p>Video or GIF showing how it looks and works</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Our work strip ---------- */}
      <section className="work" id="work">
        <div className="shell">
          <h2 className="section-title work__title reveal">Our work</h2>
          <Link className="pill work__more reveal" to="/our-work">
            See more work
            <span className="knob"><svg aria-hidden="true"><use href="#i-arrow-ur" /></svg></span>
          </Link>

          {WORK_TILES.map((t) => (
            <figure
              className={`wtile${t.fade ? " wtile--fade" : ""}`}
              key={t.src}
              style={cssVars({ "--x": t.x, "--y": t.y, "--h": t.h })}
            >
              <img src={t.src} alt={t.alt} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </section>

      <Testimonials items={TESTIMONIALS_HOME} variant="home" sectionId="beit-hasefer" />

      <CtaSection />
    </>
  );
}

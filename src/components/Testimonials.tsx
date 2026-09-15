import { useState } from "react";
import type { Testimonial } from "@/data/testimonials";

interface Props {
  items: Testimonial[];
  variant: "home" | "downloads";
  sectionId: string;
}

export default function Testimonials({ items, variant, sectionId }: Props) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <section className="testimonials" id={sectionId}>
      <div className="shell">
        <p className="eyebrow reveal">Testimonials</p>

        {variant === "home" ? (
          <h2 className="section-title testimonials__title reveal">
            <span>What</span>
            <span>People Say</span>
            <span></span>
            <span>About Us</span>
          </h2>
        ) : (
          <h2 className="section-title testimonials__title reveal">
            What people say
            <br />
            about us
          </h2>
        )}

        <div className={variant === "downloads" ? "testimonials__layout reveal" : undefined}>
          <div className="tlist" role="tablist" aria-label="Testimonials">
            {items.map((t, i) => (
              <button
                key={t.name}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={i === active ? "is-active" : undefined}
                onClick={() => setActive(i)}
              >
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </button>
            ))}
          </div>

          <div className="tmedia">
            <img src={current.img} alt={`Sefer produced for ${current.name}`} />
          </div>

          <div className="tquote">
            {variant === "home" && (
              <svg className="tquote__mark" viewBox="0 0 60 44" fill="currentColor" aria-hidden="true">
                <path d="M0 0h22v26c0 10-6 16-16 18v-8c5-2 7-5 7-10H0z" />
                <path d="M32 0h22v26c0 10-6 16-16 18v-8c5-2 7-5 7-10H32z" />
              </svg>
            )}
            <div className="tquote__body">
              {current.body.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
            <p className="tquote__author">
              {current.name}
              <span>{current.role}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

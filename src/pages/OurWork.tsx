import { useDocumentHead } from "@/hooks/useDocumentHead";
import DriftWall from "@/components/DriftWall";
import CtaSection from "@/components/CtaSection";

export default function OurWork() {
  useDocumentHead(
    "Our Work — Machon Meleches Machsheves",
    "Hundreds of seforim published for klal Yisroel. A selection of the seforim, kuntreisim and kollel series produced by Machon Meleches Machsheves."
  );

  return (
    <>
      <section className="page-hero work-hero" id="top">
        <div className="shell">
          <h1 className="page-hero__title reveal">
            <span>Hundreds of seforim</span>
            <span>published for klal Yisroel</span>
          </h1>
          <span className="tag reveal">Our work</span>
        </div>
      </section>

      <section className="dw-section">
        <div className="shell">
          <DriftWall />
        </div>
      </section>

      <CtaSection />
    </>
  );
}

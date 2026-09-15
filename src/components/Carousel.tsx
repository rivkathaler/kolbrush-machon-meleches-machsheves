import { useEffect, useRef, useState } from "react";

interface Props {
  images: { src: string; alt: string }[];
  labelPrefix: string;
}

export default function Carousel({ images, labelPrefix }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const sync = () => {
      setPrevDisabled(track.scrollLeft < 4);
      setNextDisabled(track.scrollLeft > track.scrollWidth - track.clientWidth - 4);
    };
    sync();
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth });
  };

  return (
    <div className="carousel">
      <button
        className="carousel__btn carousel__btn--prev"
        aria-label={`Previous ${labelPrefix} sample`}
        disabled={prevDisabled}
        onClick={() => step(-1)}
      >
        <svg aria-hidden="true"><use href="#i-arrow" /></svg>
      </button>
      <div className="carousel__track" ref={trackRef}>
        {images.map((img, i) => (
          <figure key={i}>
            <img src={img.src} alt={img.alt} loading="lazy" />
          </figure>
        ))}
      </div>
      <button
        className="carousel__btn carousel__btn--next"
        aria-label={`Next ${labelPrefix} sample`}
        disabled={nextDisabled}
        onClick={() => step(1)}
      >
        <svg aria-hidden="true"><use href="#i-arrow" /></svg>
      </button>
    </div>
  );
}

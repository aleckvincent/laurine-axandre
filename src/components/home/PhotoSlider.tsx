"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SLIDER_PHOTOS } from "@/lib/photos";
import { cn } from "@/lib/cn";

const AUTO_ADVANCE_MS = 5500;

export function PhotoSlider({ locale }: { locale: string }) {
  const t = useTranslations("home.slider");
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prefersReducedMotion = useRef(false);

  // Detect prefers-reduced-motion once on mount.
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const scrollToSlide = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    if (!slide) return;
    // scrollTo on the track element (horizontal only) — avoids page-level vertical scroll
    // that scrollIntoView can trigger when the carousel isn't fully in viewport.
    track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    scrollToSlide((current + 1) % SLIDER_PHOTOS.length);
  }, [current, scrollToSlide]);

  const prev = useCallback(() => {
    scrollToSlide(
      (current - 1 + SLIDER_PHOTOS.length) % SLIDER_PHOTOS.length,
    );
  }, [current, scrollToSlide]);

  // Auto-advance — paused on hover/focus/touch, disabled under reduced-motion.
  useEffect(() => {
    if (paused || prefersReducedMotion.current) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        const n = (c + 1) % SLIDER_PHOTOS.length;
        const track = trackRef.current;
        if (track) {
          const slide = track.children[n] as HTMLElement | undefined;
          if (slide) track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
        }
        return n;
      });
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  // Keyboard left/right.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!trackRef.current?.closest("[data-slider]")?.matches(":focus-within"))
        return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Sync current index when user scrolls manually (snap).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf: number;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!track) return;
        const scrollLeft = track.scrollLeft;
        const slideWidth = track.clientWidth;
        const idx = Math.round(scrollLeft / slideWidth);
        setCurrent(Math.min(idx, SLIDER_PHOTOS.length - 1));
      });
    }
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      data-slider
      role="region"
      aria-roledescription="carousel"
      aria-label={t("label")}
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* Slide track */}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-0 overflow-x-auto scroll-smooth scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {SLIDER_PHOTOS.map((photo, i) => (
          <div
            key={photo.id}
            className="w-full shrink-0 snap-start"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${SLIDER_PHOTOS.length}`}
          >
            <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
              <Image
                src={photo.src}
                alt={photo.alt[locale as "fr" | "de"] ?? photo.alt.fr}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next buttons */}
      <button
        type="button"
        onClick={prev}
        aria-label={t("previous")}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-border-gold bg-ivory/80 p-2 text-deep-gold shadow-sm backdrop-blur-sm transition-colors hover:bg-ivory"
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label={t("next")}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-border-gold bg-ivory/80 p-2 text-deep-gold shadow-sm backdrop-blur-sm transition-colors hover:bg-ivory"
      >
        <ChevronRight />
      </button>

      {/* Dot indicators */}
      <div className="mt-4 flex items-center justify-center gap-2" role="tablist">
        {SLIDER_PHOTOS.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            role="tab"
            aria-selected={i === current}
            aria-label={t("goToSlide", { number: i + 1 })}
            onClick={() => scrollToSlide(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === current
                ? "w-6 bg-accent-gold"
                : "w-2 bg-muted-gold/40 hover:bg-muted-gold/70",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4l-6 6 6 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4l6 6-6 6" />
    </svg>
  );
}

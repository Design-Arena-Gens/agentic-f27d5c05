import Link from "next/link";
import { slides } from "@/content/slides";

export default function Page() {
  return (
    <main className="px-6 lg:px-12 py-12">
      <header className="max-w-5xl mx-auto text-center mb-12">
        <p className="uppercase tracking-[0.3em] text-sm text-ink/60">
          English Literature
        </p>
        <h1 className="text-4xl md:text-5xl font-heading text-ink mt-3">
          How English Literature Helps Us in Daily Life
        </h1>
        <p className="text-lg md:text-xl text-ink/70 mt-4 leading-relaxed">
          A slide collection highlighting practical, everyday benefits of
          studying stories, poetry, and plays—from communication to creativity.
        </p>
        <div className="mt-6 flex justify-center gap-4 text-sm">
          <Link
            href="#slides"
            className="rounded-full border border-ink/10 bg-white px-4 py-2 shadow-sm hover:shadow-lg transition"
          >
            View Slides
          </Link>
          <Link
            href="/english-literature-daily-life.pdf"
            className="rounded-full bg-accent text-white px-4 py-2 shadow-sm hover:shadow-lg transition"
          >
            Download PDF
          </Link>
        </div>
      </header>
      <section
        id="slides"
        className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto pb-16"
      >
        {slides.map((slide, index) => (
          <article
            key={slide.id}
            className="rounded-3xl bg-white shadow-lg border border-ink/5 p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-ink/5 pointer-events-none" />
            <div className="relative">
              <span className="text-sm uppercase tracking-[0.25em] text-ink/40">
                Slide {index + 1}
              </span>
              <h2 className="text-2xl font-heading text-ink mt-2">
                {slide.title}
              </h2>
              {slide.tagline ? (
                <p className="mt-2 text-ink/70 italic">{slide.tagline}</p>
              ) : null}
              {slide.highlight ? (
                <p className="mt-3 rounded-lg bg-accent/10 border border-accent/20 px-4 py-3 text-ink/80">
                  {slide.highlight}
                </p>
              ) : null}
            </div>
            <ul className="relative mt-6 space-y-3 text-ink/80 leading-relaxed">
              {slide.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 items-start border-l-2 border-accent/40 pl-3"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent/60 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}

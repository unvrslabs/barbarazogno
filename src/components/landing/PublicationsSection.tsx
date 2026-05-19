import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Award, Languages, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

type BookLanguage = "it" | "en";

type BookEdition = {
  language: BookLanguage;
  cover: string;
  pages: number;
  asin: string;
  amazonUrl: string;
};

type Book = {
  id: string;
  titleKey: string;
  descKey: string;
  editions: BookEdition[];
};

const books: Book[] = [
  {
    id: "negotiation",
    titleKey: "publications.book.negotiation.title",
    descKey: "publications.book.negotiation.desc",
    editions: [
      {
        language: "it",
        cover: "/books/negoziazione-it.jpg",
        pages: 32,
        asin: "B0GTHGX2VF",
        amazonUrl:
          "https://www.amazon.it/TECNICHE-STRATEGIE-NEGOZIAZIONE-Negoziazione-Successo-ebook/dp/B0GTHGX2VF",
      },
      {
        language: "en",
        cover: "/books/negotiation-en.jpg",
        pages: 32,
        asin: "B0GTHXT1BW",
        amazonUrl:
          "https://www.amazon.it/Negotiation-Techniques-Strategies-Successful-House-ebook/dp/B0GTHXT1BW",
      },
    ],
  },
  {
    id: "rd",
    titleKey: "publications.book.rd.title",
    descKey: "publications.book.rd.desc",
    editions: [
      {
        language: "it",
        cover: "/books/rs-it.jpg",
        pages: 68,
        asin: "B0GV3VKD38",
        amazonUrl:
          "https://www.amazon.it/CONTRATTO-RICERCA-SVILUPPO-PROFESSIONISTI-OPERATORI-ebook/dp/B0GV3VKD38",
      },
      {
        language: "en",
        cover: "/books/rd-en.jpg",
        pages: 61,
        asin: "B0GXPQP8P7",
        amazonUrl:
          "https://www.amazon.it/RESEARCH-DEVELOPMENT-CONTRACT-Professionals-Legal4Tech-ebook/dp/B0GXPQP8P7",
      },
    ],
  },
  {
    id: "supply",
    titleKey: "publications.book.supply.title",
    descKey: "publications.book.supply.desc",
    editions: [
      {
        language: "it",
        cover: "/books/supply-distribution-it.jpg",
        pages: 69,
        asin: "B0GZ6V5YHK",
        amazonUrl:
          "https://www.amazon.it/Contratti-Fornitura-Distribuzione-principali-clausole/dp/B0GZ6V5YHK",
      },
      {
        language: "en",
        cover: "/books/supply-distribution-en.jpg",
        pages: 69,
        asin: "B0H1C5QWY1",
        amazonUrl:
          "https://www.amazon.com/Supply-Distribution-Contracts-Practical-Guidelines-ebook/dp/B0H1C5QWY1",
      },
    ],
  },
];

const BookCard = ({ book, index }: { book: Book; index: number }) => {
  const { language, t } = useLanguage();
  const defaultEdition =
    book.editions.find((e) => e.language === language) ?? book.editions[0];
  const [selectedLang, setSelectedLang] = useState<BookLanguage>(
    defaultEdition.language,
  );
  const edition =
    book.editions.find((e) => e.language === selectedLang) ?? book.editions[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex-shrink-0 w-[340px] md:w-[360px]"
      style={{ scrollSnapAlign: "start" }}
    >
      <div
        className="relative h-full rounded-2xl p-6 liquid-glass-card-sm flex flex-col gap-5 transition-all duration-500 hover:shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, hsl(0 0% 100% / 0.06) 0%, hsl(0 0% 100% / 0.02) 100%)",
        }}
      >
        {/* Cover */}
        <div className="flex-shrink-0 mx-auto">
          <motion.div
            whileHover={{ rotateY: 5, rotateX: -2 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            className="relative"
          >
            <div
              className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, hsl(43 74% 49% / 0.35) 0%, transparent 70%)",
              }}
            />
            <a
              href={edition.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t(book.titleKey)}
              className="relative block"
            >
              <img
                src={edition.cover}
                alt={t(book.titleKey)}
                loading="lazy"
                width={200}
                height={300}
                className="relative w-[200px] h-auto rounded-md shadow-2xl ring-1 ring-white/10"
              />
            </a>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge
              variant="outline"
              className="text-xs gap-1.5 border-primary/30 text-primary bg-primary/5"
            >
              <Award className="w-3 h-3" />
              {t("publications.category")}
            </Badge>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-foreground font-serif leading-tight mb-3 min-h-[56px]">
            {t(book.titleKey)}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4">
            {t(book.descKey)}
          </p>

          {/* Edition selector */}
          <div className="flex flex-wrap items-center gap-2 mb-4" role="group" aria-label={t("publications.selectEdition")}>
            <span className="text-xs uppercase tracking-wide text-muted-foreground/70">
              {t("publications.selectEdition")}:
            </span>
            {book.editions.map((ed) => {
              const isActive = ed.language === selectedLang;
              const flag = ed.language === "it" ? "🇮🇹" : "🇬🇧";
              const label =
                ed.language === "it"
                  ? t("publications.italianEdition")
                  : t("publications.englishEdition");
              return (
                <button
                  key={ed.language}
                  type="button"
                  onClick={() => setSelectedLang(ed.language)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors border ${
                    isActive
                      ? "border-primary/60 bg-primary/15 text-primary"
                      : "border-white/15 bg-white/[0.03] text-foreground/70 hover:border-white/30 hover:text-foreground"
                  }`}
                >
                  <span className="text-sm leading-none">{flag}</span>
                  {label}
                </button>
              );
            })}
          </div>

          <div className="mt-auto flex flex-col gap-2">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold gap-2"
            >
              <a href={edition.amazonUrl} target="_blank" rel="noopener noreferrer">
                <BookOpen className="w-4 h-4" />
                {t("publications.buyOnAmazon")}
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </Button>
            <span className="text-xs text-muted-foreground/70 tracking-wide uppercase text-center">
              {t("publications.kindleEdition")} · {edition.pages}{" "}
              {t("publications.pages")}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export const PublicationsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="pubblicazioni" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(43 74% 49% / 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg liquid-glass text-primary text-sm font-semibold mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <BookOpen className="w-4 h-4" />
            {t("publications.badge")}
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-serif">
            {t("publications.title1")}
            <br />
            <span className="gradient-text-gold">{t("publications.title2")}</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("publications.description")}
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <span>{t("publications.feat.experience")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-primary" />
              <span>{t("publications.feat.bilingual")}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>{t("publications.feat.kindle")}</span>
            </div>
          </div>
        </motion.div>

      </div>

      <div
        className="flex gap-6 px-4 md:px-8 overflow-x-auto scrollbar-hide py-4"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex-shrink-0 w-4 md:w-[calc((100vw-1280px)/2)]" />

        {books.map((book, index) => (
          <BookCard key={book.id} book={book} index={index} />
        ))}

        <div className="flex-shrink-0 w-8" />
      </div>

      {books.length > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-6"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
            <span>{t("contracts.scrollHint")}</span>
          </div>
        </motion.div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-muted-foreground/60 mt-10"
        >
          {t("publications.disclaimer")}
        </motion.p>
      </div>
    </section>
  );
};

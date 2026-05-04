"use client";

import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";

export type SearchCataloguePage = {
  slug: string;
  navLabel: string;
  accent: string;
  products?: string[];
};

type SearchableCatalogueProps = {
  pages: SearchCataloguePage[];
};

export function SearchableCatalogue({ pages }: SearchableCatalogueProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");

  const products = useMemo(
    () =>
      pages.flatMap((page) =>
        (page.products ?? []).slice(0, 12).map((product) => ({
          product,
          slug: page.slug,
          service: page.navLabel,
          accent: page.accent,
        })),
      ),
    [pages],
  );

  const visible = products.filter((item) => {
    const haystack = `${item.product} ${item.service}`.toLowerCase();
    const matchesQuery = haystack.includes(query.trim().toLowerCase());
    const matchesCategory = active === "All" || item.service === active;
    return matchesQuery && matchesCategory;
  });

  return (
    <section className="catalogue-panel" id="catalogue">
      <div className="section-heading">
        <span className="eyebrow">Print catalogue</span>
        <h2>Find a product, open its service page, and start a WhatsApp order.</h2>
      </div>

      <div className="catalogue-controls">
        <label className="search-box">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search business cards, vinyl, signages, trophies..."
          />
        </label>
        <div className="category-tabs" role="tablist" aria-label="Catalogue filters">
          {["All", ...pages.map((page) => page.navLabel)].map((label) => (
            <button
              className={active === label ? "active" : ""}
              key={label}
              onClick={() => setActive(label)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="catalogue-grid protected-content">
        {visible.slice(0, 24).map((item, index) => (
          <Link className="catalogue-card product-card" href={`/${item.slug}`} key={`${item.product}-${index}`}>
            <span className={`mini-preview accent-${item.accent}`} aria-hidden="true">
              <ShoppingBag size={22} />
            </span>
            <strong>{item.product}</strong>
            <small>{item.service}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}

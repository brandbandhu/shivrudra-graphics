"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  FolderOpen,
  Heart,
  HelpCircle,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { company, navLinks } from "@/lib/site-data";
import { defaultWhatsAppMessage } from "@/lib/whatsapp";

type MegaLink = {
  label: string;
  href: string;
  isNew?: boolean;
};

type MegaColumn = {
  title: string;
  links: MegaLink[];
};

type MegaCategory = {
  key: string;
  label: string;
  href: string;
  columns: MegaColumn[];
  seeAll: string;
};

const megaCategories: MegaCategory[] = [
  {
    key: "all",
    label: "View All",
    href: "/#categories",
    seeAll: "see all printing, branding & signage products",
    columns: [
      {
        title: "Most Popular",
        links: [
          { label: "Visiting Cards", href: "/offset-printing" },
          { label: "Letterheads", href: "/offset-printing" },
          { label: "Brochures", href: "/offset-printing" },
          { label: "Stickers", href: "/digital-printing" },
          { label: "LED Signages", href: "/signages" },
          { label: "Corporate Gifts", href: "/corporate-gifts" },
        ],
      },
      {
        title: "Design & Print",
        links: [
          { label: "Logo Design", href: "/designing" },
          { label: "Flyers", href: "/designing" },
          { label: "Posters", href: "/solvent-eco-solvent-printing" },
          { label: "Banners", href: "/solvent-eco-solvent-printing" },
          { label: "Product Labels", href: "/digital-printing" },
          { label: "Packaging Stickers", href: "/digital-printing" },
        ],
      },
      {
        title: "Industrial Solutions",
        links: [
          { label: "Safety Signages", href: "/premium-safety-signages" },
          { label: "Name Plates", href: "/trophies-medals-nameplates" },
          { label: "Ferrule Printing", href: "/laser-cnc-ferrule-printing" },
          { label: "Engraving & Marking", href: "/engraving-marking" },
          { label: "Laser & CNC Cutting", href: "/laser-cnc-ferrule-printing" },
          { label: "Fabrication", href: "/laser-cnc-ferrule-printing" },
        ],
      },
      {
        title: "Brand Accessories",
        links: [
          { label: "Badges", href: "/badges-stickers-keychains" },
          { label: "Keychains", href: "/badges-stickers-keychains" },
          { label: "Trophies", href: "/trophies-medals-nameplates" },
          { label: "Mug Printing", href: "/corporate-gifts" },
          { label: "T-shirt Printing", href: "/corporate-gifts" },
          { label: "Employee Welcome Kits", href: "/corporate-gifts", isNew: true },
        ],
      },
    ],
  },
  {
    key: "cards",
    label: "Visiting Cards",
    href: "/offset-printing",
    seeAll: "see all visiting cards",
    columns: [
      {
        title: "Business Cards",
        links: [
          { label: "Standard Visiting Cards", href: "/offset-printing" },
          { label: "Rounded Corner Visiting Cards", href: "/offset-printing" },
          { label: "Classic Visiting Cards", href: "/offset-printing" },
          { label: "Spot UV Visiting Cards", href: "/offset-printing" },
          { label: "Metal Business Cards", href: "/trophies-medals-nameplates", isNew: true },
        ],
      },
      {
        title: "Matching Stationery",
        links: [
          { label: "Letterhead Printing", href: "/offset-printing" },
          { label: "Envelope Printing", href: "/offset-printing" },
          { label: "Pocket Folders", href: "/offset-printing" },
          { label: "Note Pads", href: "/offset-printing" },
          { label: "Presentation Folders", href: "/offset-printing" },
        ],
      },
      {
        title: "Design Help",
        links: [
          { label: "Logo Design", href: "/designing" },
          { label: "Business Card Design", href: "/designing" },
          { label: "Calligraphy & Vector Art", href: "/designing" },
          { label: "Brand Identity", href: "/designing" },
        ],
      },
    ],
  },
  {
    key: "stationery",
    label: "Stationery, Letterheads & Notebooks",
    href: "/offset-printing",
    seeAll: "see all stationery, letterheads & notebooks",
    columns: [
      {
        title: "Stationery",
        links: [
          { label: "Letterheads", href: "/offset-printing" },
          { label: "Envelopes", href: "/offset-printing" },
          { label: "Note Pads", href: "/offset-printing" },
          { label: "Diaries", href: "/offset-printing" },
          { label: "Table Calendars", href: "/offset-printing" },
        ],
      },
      {
        title: "Books & Pads",
        links: [
          { label: "Notebooks", href: "/offset-printing" },
          { label: "Bill Books", href: "/offset-printing" },
          { label: "Receipt/DC Books", href: "/offset-printing" },
          { label: "Register Printing", href: "/offset-printing" },
          { label: "Book Printing", href: "/offset-printing" },
        ],
      },
      {
        title: "Folders & Files",
        links: [
          { label: "File Printing", href: "/offset-printing" },
          { label: "Hospital Files", href: "/offset-printing" },
          { label: "Pocket Folders", href: "/offset-printing" },
          { label: "Presentation Folders", href: "/offset-printing" },
          { label: "Report Printing", href: "/offset-printing" },
        ],
      },
    ],
  },
  {
    key: "stamps",
    label: "Stamps and Ink",
    href: "/stamps-screen-pad-printing",
    seeAll: "see all stamps and special printing",
    columns: [
      {
        title: "Stamps",
        links: [
          { label: "Plus Stamp", href: "/stamps-screen-pad-printing" },
          { label: "Sun Stamp", href: "/stamps-screen-pad-printing" },
          { label: "Trodat Stamp", href: "/stamps-screen-pad-printing" },
          { label: "Rubber Stamp", href: "/stamps-screen-pad-printing" },
          { label: "Stamp Pad", href: "/stamps-screen-pad-printing" },
        ],
      },
      {
        title: "Dater & Numbering",
        links: [
          { label: "Colop Dater Stamp", href: "/stamps-screen-pad-printing" },
          { label: "Colop Numbering Stamp", href: "/stamps-screen-pad-printing" },
          { label: "Dolphin Dater Stamp", href: "/stamps-screen-pad-printing" },
          { label: "Dolphin Numbering", href: "/stamps-screen-pad-printing" },
        ],
      },
      {
        title: "Special Printing",
        links: [
          { label: "Screen Printing", href: "/stamps-screen-pad-printing" },
          { label: "Pad Printing", href: "/stamps-screen-pad-printing" },
          { label: "Bottle Printing", href: "/stamps-screen-pad-printing" },
          { label: "Metal QR Code Tags", href: "/stamps-screen-pad-printing", isNew: true },
        ],
      },
    ],
  },
  {
    key: "signs",
    label: "Signs, Posters & Marketing Materials",
    href: "/signages",
    seeAll: "see all signs, posters & marketing materials",
    columns: [
      {
        title: "Signs and Posters",
        links: [
          { label: "Standees", href: "/signages" },
          { label: "Posters", href: "/solvent-eco-solvent-printing" },
          { label: "Bulk Posters", href: "/solvent-eco-solvent-printing" },
          { label: "Banners", href: "/solvent-eco-solvent-printing" },
          { label: "Tabletop Standees", href: "/signages" },
          { label: "Foam Boards", href: "/signages" },
          { label: "Acrylic Sign Holder", href: "/signages", isNew: true },
          { label: "Shop all Signs & Posters", href: "/signages" },
        ],
      },
      {
        title: "Marketing Materials",
        links: [
          { label: "Flyers", href: "/designing" },
          { label: "Presentation Folders", href: "/offset-printing" },
          { label: "Brochures", href: "/offset-printing" },
          { label: "Booklets", href: "/offset-printing" },
          { label: "Bulk Flyers", href: "/designing" },
          { label: "Postcards", href: "/digital-printing" },
          { label: "Customized Portable Backdrops", href: "/solvent-eco-solvent-printing", isNew: true },
          { label: "Promotional Canopy Tents", href: "/solvent-eco-solvent-printing", isNew: true },
        ],
      },
      {
        title: "More in Signs",
        links: [
          { label: "Acrylic Signs", href: "/signages" },
          { label: "Outdoor Signs", href: "/signages" },
          { label: "Plastic Signboards", href: "/signages" },
          { label: "Board Signs", href: "/signages" },
          { label: "Canvas Signs", href: "/solvent-eco-solvent-printing" },
          { label: "Magnetic Signs", href: "/signages" },
          { label: "LED Translite Sign Boards", href: "/signages", isNew: true },
          { label: "LED Lollipop Display", href: "/signages", isNew: true },
        ],
      },
      {
        title: "More in Marketing",
        links: [
          { label: "Custom Car Door Decals", href: "/solvent-eco-solvent-printing" },
          { label: "Customised Promo Tables", href: "/signages", isNew: true },
          { label: "Custom Logo Flags", href: "/signages", isNew: true },
          { label: "Menu Cards", href: "/digital-printing" },
          { label: "Foldable Pop Up Banners", href: "/signages", isNew: true },
          { label: "Loyalty Cards", href: "/digital-printing" },
          { label: "Button Badges", href: "/badges-stickers-keychains" },
          { label: "Paper Bags", href: "/offset-printing" },
        ],
      },
      {
        title: "Table Coverings",
        links: [
          { label: "Custom Tablecloths", href: "/solvent-eco-solvent-printing" },
          { label: "Table Runners", href: "/solvent-eco-solvent-printing" },
          { label: "Table Mats", href: "/digital-printing" },
          { label: "Place Mats", href: "/digital-printing" },
          { label: "Full-Print Paper Bags", href: "/offset-printing", isNew: true },
          { label: "Elegant Fabric Standees", href: "/signages", isNew: true },
          { label: "Customised QR Code Stand", href: "/signages" },
          { label: "LED Display Stands", href: "/signages" },
        ],
      },
      {
        title: "Flags",
        links: [
          { label: "Table Flags", href: "/signages", isNew: true },
          { label: "Cross Stand Table Flags", href: "/signages" },
          { label: "Exchange Flags", href: "/signages" },
          { label: "Tour Guide Flags", href: "/signages" },
          { label: "Pole Flags", href: "/signages" },
          { label: "Wall Mounted Flags", href: "/signages" },
          { label: "Rectangle Flags", href: "/signages" },
          { label: "Teardrop Flags", href: "/signages" },
        ],
      },
    ],
  },
  {
    key: "labels",
    label: "Labels, Stickers & Packaging",
    href: "/digital-printing",
    seeAll: "see all labels, stickers & packaging",
    columns: [
      {
        title: "Stickers",
        links: [
          { label: "Sheet Stickers", href: "/digital-printing" },
          { label: "Transparent Stickers", href: "/digital-printing" },
          { label: "Custom Shape Stickers", href: "/digital-printing" },
          { label: "Seal Stickers", href: "/digital-printing" },
          { label: "Redium Stickers", href: "/solvent-eco-solvent-printing" },
        ],
      },
      {
        title: "Labels",
        links: [
          { label: "Product Labels", href: "/digital-printing" },
          { label: "Roll Labels", href: "/digital-printing" },
          { label: "Barcode Stickers", href: "/digital-printing" },
          { label: "Bottle Neck Tags", href: "/digital-printing" },
          { label: "Industrial Labels", href: "/trophies-medals-nameplates" },
        ],
      },
      {
        title: "Packaging",
        links: [
          { label: "Packaging Stickers", href: "/digital-printing" },
          { label: "Packaging Sleeves", href: "/digital-printing" },
          { label: "Wrapping Paper", href: "/digital-printing" },
          { label: "Paper Bags", href: "/offset-printing" },
          { label: "Nonwoven Bags", href: "/offset-printing" },
        ],
      },
    ],
  },
  {
    key: "clothing",
    label: "Clothing, Caps & Bags",
    href: "/corporate-gifts",
    seeAll: "see all clothing, caps & bags",
    columns: [
      {
        title: "Clothing",
        links: [
          { label: "Custom Polo T-shirts", href: "/corporate-gifts" },
          { label: "Custom T-shirts", href: "/corporate-gifts" },
          { label: "Printed Polos - Multi Location", href: "/corporate-gifts" },
          { label: "Reflective Safety Printing", href: "/corporate-gifts" },
        ],
      },
      {
        title: "Caps",
        links: [
          { label: "Cap Printing", href: "/corporate-gifts" },
          { label: "Printed Caps", href: "/corporate-gifts" },
          { label: "Embroidered Caps", href: "/corporate-gifts", isNew: true },
        ],
      },
      {
        title: "Bags",
        links: [
          { label: "Nonwoven Bags", href: "/offset-printing" },
          { label: "Paper Bags", href: "/offset-printing" },
          { label: "Laptop Bags", href: "/corporate-gifts" },
          { label: "Employee Welcome Kits", href: "/corporate-gifts", isNew: true },
        ],
      },
    ],
  },
  {
    key: "gifts",
    label: "Mugs, Albums & Gifts",
    href: "/corporate-gifts",
    seeAll: "see all mugs, albums & gifts",
    columns: [
      {
        title: "Photo Gifts",
        links: [
          { label: "Mug Printing", href: "/corporate-gifts" },
          { label: "Photo Albums", href: "/corporate-gifts" },
          { label: "Canvas Prints", href: "/solvent-eco-solvent-printing" },
          { label: "Photo Frames", href: "/digital-printing" },
          { label: "Coaster Printing", href: "/trophies-medals-nameplates" },
        ],
      },
      {
        title: "Office Gifts",
        links: [
          { label: "Pen Printing", href: "/corporate-gifts" },
          { label: "Diaries", href: "/corporate-gifts" },
          { label: "Card Holder", href: "/corporate-gifts" },
          { label: "Mobile/Laptop Stand", href: "/corporate-gifts" },
        ],
      },
      {
        title: "Awards",
        links: [
          { label: "Trophies", href: "/trophies-medals-nameplates" },
          { label: "Medals", href: "/trophies-medals-nameplates" },
          { label: "Plaques", href: "/premium-safety-signages" },
          { label: "Awards", href: "/premium-safety-signages" },
        ],
      },
    ],
  },
  {
    key: "pens",
    label: "Personalised Pens",
    href: "/corporate-gifts",
    seeAll: "see all personalised pens",
    columns: [
      {
        title: "Writing",
        links: [
          { label: "Pen Printing", href: "/corporate-gifts" },
          { label: "Premium Pens", href: "/corporate-gifts" },
          { label: "Employee Pens", href: "/corporate-gifts" },
          { label: "Event Pens", href: "/corporate-gifts" },
        ],
      },
      {
        title: "Gift Sets",
        links: [
          { label: "Pen & Diary Sets", href: "/corporate-gifts" },
          { label: "Welcome Kit Pens", href: "/corporate-gifts", isNew: true },
          { label: "Corporate Gift Sets", href: "/corporate-gifts" },
        ],
      },
    ],
  },
  {
    key: "drinkware",
    label: "Drinkware",
    href: "/corporate-gifts",
    seeAll: "see all drinkware",
    columns: [
      {
        title: "Drinkware",
        links: [
          { label: "Mug Printing", href: "/corporate-gifts" },
          { label: "Flasks", href: "/corporate-gifts" },
          { label: "Tumblers", href: "/corporate-gifts" },
          { label: "Bottle Printing", href: "/stamps-screen-pad-printing" },
          { label: "Employee Drinkware Kits", href: "/corporate-gifts", isNew: true },
        ],
      },
      {
        title: "Related Branding",
        links: [
          { label: "Bottle Labels", href: "/digital-printing" },
          { label: "Transparent Labels", href: "/digital-printing" },
          { label: "Packaging Stickers", href: "/digital-printing" },
        ],
      },
    ],
  },
  {
    key: "polo",
    label: "Custom Polo T-shirts",
    href: "/corporate-gifts",
    seeAll: "see all custom polo t-shirts",
    columns: [
      {
        title: "Polo T-shirts",
        links: [
          { label: "Custom Polo T-shirts", href: "/corporate-gifts" },
          { label: "Premium Polo T-shirts", href: "/corporate-gifts" },
          { label: "Printed Polos - Multi Location", href: "/corporate-gifts" },
          { label: "Staff Uniform Polos", href: "/corporate-gifts" },
        ],
      },
      {
        title: "Branding Add-ons",
        links: [
          { label: "Logo Design", href: "/designing" },
          { label: "Name Badges", href: "/badges-stickers-keychains" },
          { label: "Welcome Kits", href: "/corporate-gifts", isNew: true },
        ],
      },
    ],
  },
  {
    key: "tshirts",
    label: "Custom T-Shirts",
    href: "/corporate-gifts",
    seeAll: "see all custom t-shirts",
    columns: [
      {
        title: "T-shirts",
        links: [
          { label: "Custom T-shirts", href: "/corporate-gifts" },
          { label: "Event T-shirts", href: "/corporate-gifts" },
          { label: "Women's Polo T-shirts", href: "/corporate-gifts" },
          { label: "Campaign T-shirts", href: "/corporate-gifts" },
        ],
      },
      {
        title: "More Apparel",
        links: [
          { label: "Caps", href: "/corporate-gifts" },
          { label: "Bags", href: "/corporate-gifts" },
          { label: "Reflective Safety Printing", href: "/corporate-gifts" },
          { label: "Employee Welcome Kit", href: "/corporate-gifts", isNew: true },
        ],
      },
    ],
  },
];

function newPill() {
  return <span className="mega-pill">NEW</span>;
}

function MegaMenu({
  category,
  onNavigate,
}: {
  category: MegaCategory;
  onNavigate: () => void;
}) {
  return (
    <div className="mega-menu" id={`mega-${category.key}`} role="menu">
      <div className="mega-columns">
        {category.columns.map((column) => (
          <section className="mega-column" key={`${category.key}-${column.title}`}>
            <h2>{column.title}</h2>
            {column.links.map((link) => (
              <Link href={link.href} key={`${column.title}-${link.label}`} onClick={onNavigate}>
                {link.label}
                {link.isNew ? newPill() : null}
              </Link>
            ))}
          </section>
        ))}
      </div>
      <Link className="mega-see-all" href={category.href} onClick={onNavigate}>
        {category.seeAll}
      </Link>
    </div>
  );
}

function categoryByKey(key: string) {
  return megaCategories.find((category) => category.key === key) ?? megaCategories[0];
}

export function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [pinnedKey, setPinnedKey] = useState<string | null>(null);
  const [mobileCategoryKey, setMobileCategoryKey] = useState<string | null>(null);
  const activeCategory = activeKey ? categoryByKey(activeKey) : null;

  const closeMenus = () => {
    setActiveKey(null);
    setPinnedKey(null);
    setMobileCategoryKey(null);
  };

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        closeMenus();
        setOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenus();
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`site-header ${activeCategory ? "mega-open" : ""}`}
      onMouseLeave={() => {
        if (!pinnedKey) {
          setActiveKey(null);
        }
      }}
    >
      <div className="header-main">
        <Link className="brand-lockup" href="/" aria-label="Shivrudra Graphics home">
          <span className="brand-mark" aria-hidden="true">
            {company.mark}
          </span>
          <span>
            <strong>{company.name}</strong>
            <small>{company.descriptor}</small>
          </span>
        </Link>

        <label className="header-search">
          <span className="sr-only">Search products</span>
          <input placeholder="Search" aria-label="Search products" />
          <Search size={28} strokeWidth={2.3} />
        </label>

        <div className="header-actions">
          <a
            className="header-utility help-utility"
            href={defaultWhatsAppMessage("Help request")}
            target="_blank"
            rel="noreferrer"
          >
            <HelpCircle size={26} />
            <span>
              Help is here
              <small>{company.phoneDisplay}</small>
            </span>
          </a>
          <Link className="header-utility" href="/contact">
            <FolderOpen size={26} />
            <span>My Projects</span>
          </Link>
          <Link className="header-utility" href="/clients">
            <Heart size={26} />
            <span>My Favorites</span>
          </Link>
          <Link className="header-utility" href="/contact">
            <UserRound size={26} />
            <span>Sign in</span>
          </Link>
          <Link className="header-utility" href="/contact">
            <ShoppingBag size={26} />
            <span>Cart</span>
          </Link>
          <button
            className="icon-button mobile-menu-button"
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <nav className="shop-nav" aria-label="Product categories">
        {megaCategories.map((category) => (
          <button
            type="button"
            className={`shop-nav-link ${
              activeKey === category.key || pathname === category.href ? "active" : ""
            }`}
            key={category.key}
            aria-controls={`mega-${category.key}`}
            aria-expanded={activeKey === category.key}
            onFocus={() => setActiveKey(category.key)}
            onMouseEnter={() => {
              setPinnedKey(null);
              setActiveKey(category.key);
            }}
            onClick={() => {
              const shouldClose = activeKey === category.key && pinnedKey === category.key;
              setActiveKey(shouldClose ? null : category.key);
              setPinnedKey(shouldClose ? null : category.key);
            }}
          >
            {category.label}
            <ChevronDown size={15} />
          </button>
        ))}
      </nav>

      {activeCategory ? (
        <MegaMenu
          category={activeCategory}
          onNavigate={() => {
            closeMenus();
            setOpen(false);
          }}
        />
      ) : null}

      <div className="top-strip">
        <span>Buy more, save more! Flat 5% off on orders Rs.10,000+</span>
        <span>Code: SAVE5</span>
      </div>

      <div className={`nav-drawer ${open ? "open" : ""}`}>
        {navLinks.map((link) => (
          <Link
            className={pathname === link.href ? "active" : ""}
            href={link.href}
            key={link.href}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        {megaCategories.map((category) => (
          <section className="mobile-category" key={`mobile-${category.key}`}>
            <button
              type="button"
              aria-expanded={mobileCategoryKey === category.key}
              onClick={() =>
                setMobileCategoryKey((current) =>
                  current === category.key ? null : category.key,
                )
              }
            >
              {category.label}
              <ChevronDown size={16} />
            </button>
            {mobileCategoryKey === category.key ? (
              <div className="mobile-category-panel">
                {category.columns.map((column) => (
                  <div key={`mobile-${category.key}-${column.title}`}>
                    <h2>{column.title}</h2>
                    {column.links.map((link) => (
                      <Link
                        href={link.href}
                        key={`mobile-${category.key}-${column.title}-${link.label}`}
                        onClick={() => {
                          closeMenus();
                          setOpen(false);
                        }}
                      >
                        {link.label}
                        {link.isNew ? newPill() : null}
                      </Link>
                    ))}
                  </div>
                ))}
                <Link
                  className="mobile-see-all"
                  href={category.href}
                  onClick={() => {
                    closeMenus();
                    setOpen(false);
                  }}
                >
                  {category.seeAll}
                </Link>
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </header>
  );
}

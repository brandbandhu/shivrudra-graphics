"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { company, navLinks } from "@/lib/site-data";

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

type ServiceMenuItem = {
  key: string;
  label: string;
  href: string;
  subtypes: string[];
};

const serviceMenu: ServiceMenuItem[] = [
  {
    key: "designing",
    label: "Designing",
    href: "/designing",
    subtypes: [
      "Logos (Brand Identity)",
      "Calligraphy & Vector Art",
      "Business Cards",
      "Letterhead Design",
      "Brochures Design",
      "Flyers Design",
      "Posters Design",
      "Banners Design",
      "Certificates Design",
      "Invitation Cards",
      "Car Wrap Design",
      "LED Signages Design",
      "Social Media Creatives",
      "Product Packaging Labels & Stickers Design",
    ],
  },
  {
    key: "solvent-eco-solvent-printing",
    label: "Solvent - Eco Solvent Printing",
    href: "/solvent-eco-solvent-printing",
    subtypes: [
      "Flex Printing",
      "Vinyl with Foam",
      "Black Back Flex",
      "Star Flex",
      "Flex With Wooden Frame",
      "Self-Adhesive Vinyl Prints",
      "Backlit Flex",
      "Glass Filming",
      "Frosted/Office Film",
      "Floor Graphics Printing",
      "Tabletop Printing",
      "Exhibition Backdrops",
      "Cutout Standees",
      "One Way Vision",
      "Redium Sticker",
      "UV Print",
      "Fabric Print",
      "Canvas Print",
      "Transparent Vinyl",
      "Retro Vinyl",
      "Vinyl Print & Cut",
      "Night Glow Vinyl",
      "Sunpack",
      "Canopy Stand",
      "Translit",
      "Rollup Standy",
      "Sunboard Standee",
      "Car Branding",
      "Wallpaper Printing",
      "Graffiti Wall Print",
      "Entry Gate",
      "MS Standy",
    ],
  },
  {
    key: "digital-printing",
    label: "Digital Printing",
    href: "/digital-printing",
    subtypes: [
      "12x18/A4 Print",
      "Transparent Sticker",
      "Texture Paper",
      "NT Paper & NT Sticker",
      "Sticker Paper + Half Cutting",
      "Product Label Printing",
      "Any Shape Full Die Cutting",
      "Tags Printing",
      "Coupon Printing",
      "Wristband Printing",
      "Certificate Printing",
      "Tent Cards",
      "Invitation Card Printing",
      "Menu Card",
      "Danglers Printing",
      "Barcode Sticker",
      "Safety Signage Posters",
      "Door Hangers",
      "Vehicle Parking Stickers",
      "Cable Tag Printing",
      "Roll Labels Printing",
      "Label Printing",
      "Pawati Book Printing",
      "Gift Voucher",
      "Packaging Sticker",
      "Packaging Sleeves",
      "Wrapping Paper",
      "Custom Car Stickers",
      "Seal Stickers",
      "Ticket Printing",
      "Rack Card",
      "Bookmark Printing",
      "PVC Cards",
      "ID Card Printing",
      "Lanyard Printing",
      "Header Cards",
      "Shelf Wobblers",
      "Bottle Neck Tags",
      "Ribbon Badge",
      "Tree Tag",
      "Swing Tags",
      "Photo Frame",
      "Cloth Tag",
      "Cutout",
    ],
  },
  {
    key: "offset-printing",
    label: "Offset Printing",
    href: "/offset-printing",
    subtypes: [
      "Business Card Printing",
      "Envelope Printing",
      "Brochure Printing",
      "Leaflet Printing",
      "Letterhead Printing",
      "Register Printing",
      "Bank Form Printing",
      "File Printing",
      "Hospital File Printing",
      "Pocket Folder",
      "Prescription Pad",
      "Calendar Printing",
      "Diary Printing",
      "Parking Valet Card",
      "Cardsheet Printing",
      "Bill Book Printing",
      "Receipt / DC Book Printing",
      "Notebooks",
      "Sticker Roll Printing",
      "Product Catalogue",
      "Nonwoven Bags",
      "Book Printing",
      "Table Calendar",
      "Paper Bag",
      "Catalogue Printing",
      "Note Pads Printing",
      "Synthetic Tags",
      "Report Printing",
    ],
  },
  {
    key: "stamp",
    label: "Stamp",
    href: "/stamps-screen-pad-printing",
    subtypes: [
      "Sun Stamp",
      "Plus Stamp",
      "Colop Numbering Stamp",
      "Colop Dater Stamp",
      "Dolphin Dater Stamp",
      "Dolphin Numbering",
      "Trodat Stamp",
      "Colop Mouse Stamp",
      "Small Rubber Stamp",
      "Big Rubber Stamp",
      "Stamp Pad",
    ],
  },
  {
    key: "screen-printing",
    label: "Screen Printing",
    href: "/stamps-screen-pad-printing",
    subtypes: [
      "Polycarbonate Labels & Sticker",
      "Metal QR Code Tags",
      "Sunpack Printing",
      "Bag Printing",
      "Aluminium Name Plates",
      "Vinyl Printing",
      "Bottle Printing",
      "MS/SS Screen Printing",
      "Plastic Crate",
      "Redium Printing",
      "Polyester Printing",
      "PP Box",
      "Corrugated Box",
      "Textile Printing",
      "Glass Printing",
      "Wooden Printing",
    ],
  },
  {
    key: "pad-printing",
    label: "Pad Printing",
    href: "/stamps-screen-pad-printing",
    subtypes: ["Various Industrial Objects (Automotive, Electrical, Cosmetics, Appliances)"],
  },
  {
    key: "badges-sticker-keychain",
    label: "Badges, Sticker & Keychain",
    href: "/badges-stickers-keychains",
    subtypes: [
      "Dome Sticker",
      "SS Dome Sticker",
      "Dome Keychain",
      "Acrylic Keychain",
      "Acrylic Shape Cut Epoxy Badges",
      "SS Metal Epoxy Badges",
      "Acrylic Epoxy Badges",
      "Aluminium Epoxy Badges",
      "Round Metal Epoxy Badges",
      "SS Keychain",
      "Keychain Badge",
      "Pin Button Badges",
      "Magnet Button Badges",
      "Name Badges",
      "Rexine Leather Keychain",
    ],
  },
  {
    key: "corporate-gifts",
    label: "Corporate Gifts",
    href: "/corporate-gifts",
    subtypes: [
      "Mug Printing",
      "Cap Printing",
      "T-shirt Printing",
      "Mousepad Printing",
      "Flasks (Bottle)",
      "Pen Printing",
      "Diaries",
      "Tumblers",
      "Card Holder",
      "Reflective Safety Printing",
      "Mobile/Laptop Stand",
      "Employee Welcome Kit",
    ],
  },
  {
    key: "engraving-marking",
    label: "Engraving & Marking",
    href: "/engraving-marking",
    subtypes: [
      "Gold / Silver Laser Etched Plates",
      "ABS Plastic Marking",
      "Anodised Aluminium Plates",
      "Automobile Parts",
      "Metal Parts Marking",
      "Ss Etching Plate",
      "Traffolite Signage",
      "Leather Marking",
      "QR Code",
      "Black Stainless Marking",
      "Bulb Marking",
      "Watch Case",
      "SS Marking",
      "Hardware Tool Marking",
      "Polymer Material",
    ],
  },
  {
    key: "signages",
    label: "Signages",
    href: "/signages",
    subtypes: [
      "Standee Signage",
      "Sunboard / Foam Board",
      "Foam Sign Board",
      "Fabric Signage",
      "Backlit Board Signage",
      "Aluminium Clip-on Frame",
      "Pylon Signage",
      "Night Glow Signage",
      "Acrylic Sandwich Frame",
      "White Board & Stand",
      "2D LED Signage",
      "Easel Stands",
      "Magnetic Signage",
      "3D LED Signage",
      "SS Letter Signage",
      "Acrylic Letter Signages",
      "Profile Bending Signage",
      "MS Letter Signage",
      "Sparkling/Crystal Signage",
      "Liquid Letter Signage",
      "Lobby Sign Signage",
      "Retro Sign Signage",
      "Industrial Display Signage",
      "Acrylic Folder Signage",
      "Scrolling Signage",
      "Acrylic Magnetic Folder",
      "Acrylic Name Board Signage",
      "Acrylic First Aid Box",
      "Acrylic Suggestion Box",
      "Acrylic Customized Box",
      "Acrylic Name Plate",
      "Neon Signage",
      "3D Acrylic LED Lamp",
      "Table Name Plate",
      "Acrylic Signage",
      "ACP Gate Signage",
      "QR Code Standee",
      "MS Frame + Backlight",
      "ACP Signage",
      "Reverse Printed Acrylic Frames",
      "LED Lamp",
      "Wooden Name Plate",
    ],
  },
  {
    key: "premium-signages",
    label: "Premium Signages",
    href: "/premium-safety-signages",
    subtypes: [
      "Way Finding Sign",
      "Free Hand Sign",
      "Directory Sign",
      "Table Top",
      "Flat (home) Nameplate",
      "Plaque",
      "Awards",
      "Hangers",
      "3D Signs",
      "2D Signs",
      "Acrylic Sign",
    ],
  },
  {
    key: "safety-signage",
    label: "Safety Signage",
    href: "/premium-safety-signages",
    subtypes: [
      "Mandatory Safety Signage",
      "Emergency Exit",
      "Mandatory Sign",
      "Recycle Signs",
      "Warning Signs",
      "Fire Signs",
      "Prohibition Sign",
      "Safety Floor Signs",
      "Road Signs",
      "Photoluminescent Signs",
      "No Parking Sign",
    ],
  },
  {
    key: "laser-cnc-cutting",
    label: "Laser & CNC Cutting",
    href: "/laser-cnc-ferrule-printing",
    subtypes: [
      "MDF Cutting",
      "MDF Engraving",
      "ACP Cutting",
      "Acrylic Jali Cutting",
      "MS/SS Cutting",
      "Acrylic Cutting",
      "Acrylic Engraving",
      "ACP Jali Cutting",
    ],
  },
  {
    key: "ferrule-printing",
    label: "Ferrule Printing",
    href: "/laser-cnc-ferrule-printing",
    subtypes: ["Pvc Tube", "Heat Shrink Tube", "Marking Strip"],
  },
  {
    key: "trophies-medals",
    label: "Trophies & Medals",
    href: "/trophies-medals-nameplates",
    subtypes: [
      "Acrylic Trophies",
      "Wooden Trophies",
      "Plastic Frames",
      "Metal Frame",
      "Foil Trophies",
      "Metal Trophies",
      "ABS Trophies",
      "Flag Trophies",
      "Cups",
      "Medals",
    ],
  },
  {
    key: "anodized-aluminium-name-plates",
    label: "Anodized Aluminium Name Plates",
    href: "/trophies-medals-nameplates",
    subtypes: ["Various Industrial Labels and Nameplates"],
  },
  {
    key: "aluminium-sublimation-marking",
    label: "Aluminium Sublimation & Marking",
    href: "/trophies-medals-nameplates",
    subtypes: [
      "Silver/Golden Certificate",
      "Sublimation Frame",
      "Industrial Label",
      "Metal Business Cards",
      "Danger Label",
      "Warning Signs",
    ],
  },
  {
    key: "fabrication",
    label: "Fabrication",
    href: "/laser-cnc-ferrule-printing",
    subtypes: ["In-shop Branding", "MS Stands"],
  },
  {
    key: "sublimation-printing",
    label: "Sublimation Printing",
    href: "/trophies-medals-nameplates",
    subtypes: ["Deskpads Printing", "Fabric Printing", "Coaster Printing"],
  },
];

function splitIntoColumns(item: ServiceMenuItem): MegaColumn[] {
  const maxColumns = Math.min(4, Math.ceil(item.subtypes.length / 10) || 1);
  const itemsPerColumn = Math.ceil(item.subtypes.length / maxColumns);

  return Array.from({ length: maxColumns }, (_, index) => {
    const links = item.subtypes.slice(index * itemsPerColumn, (index + 1) * itemsPerColumn);
    return {
      title: index === 0 ? item.label : `${item.label} ${index + 1}`,
      links: links.map((label) => ({ label, href: item.href })),
    };
  }).filter((column) => column.links.length);
}

const allServiceColumns: MegaColumn[] = [
  {
    title: "Design & Printing",
    links: serviceMenu.slice(0, 4).map((item) => ({ label: item.label, href: item.href })),
  },
  {
    title: "Special Printing",
    links: serviceMenu.slice(4, 9).map((item) => ({ label: item.label, href: item.href })),
  },
  {
    title: "Signage & Industrial",
    links: serviceMenu.slice(9, 15).map((item) => ({ label: item.label, href: item.href })),
  },
  {
    title: "Awards & Finishing",
    links: serviceMenu.slice(15).map((item) => ({ label: item.label, href: item.href })),
  },
];

const megaCategories: MegaCategory[] = [
  {
    key: "all",
    label: "View All",
    href: "/#categories",
    seeAll: "see all printing, branding & signage products",
    columns: allServiceColumns,
  },
  ...serviceMenu.map((item) => ({
    key: item.key,
    label: item.label,
    href: item.href,
    seeAll: `see all ${item.label.toLowerCase()}`,
    columns: splitIntoColumns(item),
  })),
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
          <img
            src="/images/home/logo.png"
            alt="Shivrudra Graphics logo"
            className="brand-logo"
          />
        </Link>

        <div className="header-search-row">
          <label className="header-search">
            <span className="sr-only">Search products</span>
            <input placeholder="Search" aria-label="Search products" />
            <Search size={28} strokeWidth={2.3} />
          </label>
          <Link className="header-order-now" href="/#order-form">
            Order Now
          </Link>
        </div>

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

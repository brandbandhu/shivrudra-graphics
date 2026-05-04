import Link from "next/link";
import {
  BookOpen,
  BriefcaseBusiness,
  Camera,
  ChevronRight,
  Contact,
  Gift,
  IdCard,
  Mail,
  MessageCircle,
  Package,
  Printer,
  Shirt,
  Sparkles,
  Stamp,
  Tag,
  Trophy,
} from "lucide-react";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";

type ProductKind =
  | "cards"
  | "shirt"
  | "cap"
  | "sign"
  | "stamp"
  | "album"
  | "sticker"
  | "folder"
  | "bag"
  | "board"
  | "qr"
  | "acrylic"
  | "canopy"
  | "book"
  | "bottle"
  | "gift";

type StoreProduct = {
  title: string;
  price: string;
  kind: ProductKind;
  href: string;
  tone?: string;
};

type Category = {
  title: string;
  href: string;
  kind: ProductKind;
};

const categories: Category[] = [
  { title: "Visiting Cards", href: "/offset-printing", kind: "cards" },
  { title: "Custom Polo T-shirts", href: "/corporate-gifts", kind: "shirt" },
  { title: "Custom Dress Shirts", href: "/corporate-gifts", kind: "shirt" },
  { title: "Custom T-shirts", href: "/corporate-gifts", kind: "shirt" },
  { title: "Custom Caps", href: "/corporate-gifts", kind: "cap" },
  { title: "Signs, Posters & Marketing Materials", href: "/signages", kind: "sign" },
  { title: "Custom Stamps & Ink", href: "/stamps-screen-pad-printing", kind: "stamp" },
  { title: "Photo Gifts", href: "/corporate-gifts", kind: "gift" },
];

const popular: StoreProduct[] = [
  { title: "Standard Visiting Cards", price: "BUY 100 @ Rs.200", kind: "cards", href: "/offset-printing" },
  { title: "Rounded Corner Visiting Cards", price: "BUY 100 @ Rs.250", kind: "cards", href: "/offset-printing", tone: "orange" },
  { title: "Letterheads", price: "BUY 50 @ Rs.250", kind: "folder", href: "/offset-printing" },
  { title: "Photo Albums", price: "BUY 1 @ Rs.650", kind: "album", href: "/corporate-gifts" },
  { title: "Stickers", price: "BUY 50 @ Rs.150", kind: "sticker", href: "/digital-printing", tone: "teal" },
  { title: "Men's Polo T-shirts", price: "BUY 1 @ Rs.570", kind: "shirt", href: "/corporate-gifts", tone: "red" },
];

const trending: StoreProduct[] = [
  { title: "Classic Visiting Cards", price: "BUY 100 @ Rs.200", kind: "cards", href: "/offset-printing", tone: "red" },
  { title: "Spot UV Visiting Cards", price: "BUY 100 @ Rs.500", kind: "cards", href: "/offset-printing", tone: "green" },
  { title: "Printed Caps", price: "BUY 1 @ Rs.350", kind: "cap", href: "/corporate-gifts" },
  { title: "Premium Polo T-shirts", price: "BUY 1 @ Rs.570", kind: "shirt", href: "/corporate-gifts", tone: "gray" },
  { title: "Printed Polos - Multi Location", price: "BUY 1 @ Rs.570", kind: "shirt", href: "/corporate-gifts", tone: "navy" },
  { title: "Women's Polo T-shirts", price: "BUY 1 @ Rs.570", kind: "shirt", href: "/corporate-gifts", tone: "black" },
];

const labels: StoreProduct[] = [
  { title: "Sheet Stickers", price: "BUY 24 @ Rs.150", kind: "sticker", href: "/digital-printing" },
  { title: "Product & Packaging Labels", price: "BUY 24 @ Rs.150", kind: "sticker", href: "/digital-printing", tone: "green" },
  { title: "Custom Shape Stickers", price: "BUY 10 @ Rs.190", kind: "sticker", href: "/digital-printing", tone: "black" },
  { title: "Sticker Singles", price: "BUY 50 @ Rs.265", kind: "sticker", href: "/digital-printing", tone: "yellow" },
  { title: "Self Adhesive Tapes", price: "BUY 6 @ Rs.6500", kind: "sticker", href: "/solvent-eco-solvent-printing", tone: "orange" },
  { title: "Transparent Labels", price: "BUY 40 @ Rs.400", kind: "bottle", href: "/digital-printing" },
];

const exploreMore: StoreProduct[] = [
  { title: "Booklets", price: "BUY 1 @ Rs.160", kind: "book", href: "/offset-printing" },
  { title: "Embroidered Laptop Bags", price: "BUY 1 @ Rs.1050", kind: "bag", href: "/corporate-gifts", tone: "black" },
  { title: "Premium Laptop Bags", price: "BUY 1 @ Rs.1350", kind: "bag", href: "/corporate-gifts", tone: "navy" },
  { title: "Presentation Folders", price: "BUY 10 @ Rs.520", kind: "folder", href: "/offset-printing", tone: "yellow" },
  { title: "Brochures", price: "BUY 25 @ Rs.370", kind: "book", href: "/offset-printing", tone: "brown" },
  { title: "Canvas Prints", price: "BUY 1 @ Rs.750", kind: "album", href: "/solvent-eco-solvent-printing" },
];

const arrivals: StoreProduct[] = [
  { title: "Adidas Duffle Bags", price: "BUY 1 @ Rs.1400", kind: "bag", href: "/corporate-gifts", tone: "navy" },
  { title: "Translite Board", price: "BUY 1 @ Rs.1500", kind: "board", href: "/signages", tone: "yellow" },
  { title: "Lollipop Board", price: "BUY 1 @ Rs.2600", kind: "sign", href: "/signages", tone: "orange" },
  { title: "Customised QR Code Stand", price: "BUY 1 @ Rs.220", kind: "qr", href: "/signages" },
  { title: "Acrylic Signs", price: "BUY 1 @ Rs.650", kind: "acrylic", href: "/signages", tone: "white" },
  { title: "Promotional Canopy Tents", price: "BUY 1 @ Rs.5750", kind: "canopy", href: "/solvent-eco-solvent-printing", tone: "brown" },
];

const iconMap = {
  cards: IdCard,
  shirt: Shirt,
  cap: Contact,
  sign: Printer,
  stamp: Stamp,
  album: Camera,
  sticker: Tag,
  folder: Mail,
  bag: BriefcaseBusiness,
  board: Printer,
  qr: Package,
  acrylic: Sparkles,
  canopy: Package,
  book: BookOpen,
  bottle: Gift,
  gift: Trophy,
};

function orderUrl(product: string) {
  return buildWhatsAppUrl(
    `Hello Shivrudra Graphics,\n\nI want to order/enquire about: ${product}\n\nQuantity:\nSize:\nMaterial:\nDeadline:\nDelivery/installation location:\n\nI will attach artwork/photos in WhatsApp.`,
  );
}

function ProductVisual({ kind, tone = "" }: { kind: ProductKind; tone?: string }) {
  const Icon = iconMap[kind];

  return (
    <div className={`vp-product-visual visual-${kind} tone-${tone}`} aria-hidden="true">
      <Icon size={38} />
      <span className="mock-shape one" />
      <span className="mock-shape two" />
      <span className="mock-shape three" />
    </div>
  );
}

function ProductRow({ title, items }: { title: string; items: StoreProduct[] }) {
  return (
    <section className="vp-product-section">
      <h2>{title}</h2>
      <div className="vp-card-row protected-content">
        {items.map((item) => (
          <a
            className="vp-product-card"
            href={orderUrl(item.title)}
            key={item.title}
            target="_blank"
            rel="noreferrer"
          >
            <span className="vp-price-badge">{item.price}</span>
            <ProductVisual kind={item.kind} tone={item.tone} />
            <strong>{item.title}</strong>
          </a>
        ))}
        <Link className="vp-row-arrow" href={items[0]?.href ?? "/contact"} aria-label={`View more ${title}`}>
          <ChevronRight size={22} />
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="vp-home">
      <section className="vp-hero-grid protected-content">
        <article className="vp-hero-panel hero-cards">
          <div className="vp-hero-mock office-light" aria-hidden="true">
            <div className="mock-person" />
            <div className="mock-card-stack">
              <span />
              <span />
            </div>
          </div>
          <div className="vp-hero-copy">
            <h1>Visiting Cards</h1>
            <p>100 Visiting Cards at Rs. 200</p>
            <a href={orderUrl("Visiting Cards")} target="_blank" rel="noreferrer">
              Shop Now
            </a>
          </div>
        </article>

        <article className="vp-hero-panel hero-apparel">
          <div className="vp-shirt-showcase" aria-hidden="true">
            <div className="shirt-model dark">SG</div>
            <div className="shirt-model light">A</div>
          </div>
          <div className="vp-hero-copy apparel-copy">
            <h2>Wear your brand with pride</h2>
            <p>Starting at Rs. 320</p>
            <div className="hero-button-row">
              <a href={orderUrl("Custom Polo T-shirts")} target="_blank" rel="noreferrer">
                Custom Polo T-shirts
              </a>
              <a href={orderUrl("Custom T-shirts")} target="_blank" rel="noreferrer">
                Custom T-shirts
              </a>
              <a href={orderUrl("Custom Caps")} target="_blank" rel="noreferrer">
                Caps
              </a>
            </div>
          </div>
        </article>
      </section>

      <section className="vp-product-section" id="categories">
        <h2>Explore all categories</h2>
        <div className="vp-card-row protected-content">
          {categories.map((item) => (
            <Link className="vp-category-card" href={item.href} key={item.title}>
              <ProductVisual kind={item.kind} />
              <strong>{item.title}</strong>
            </Link>
          ))}
          <Link className="vp-row-arrow" href="/digital-printing" aria-label="View more categories">
            <ChevronRight size={22} />
          </Link>
        </div>
      </section>

      <ProductRow title="Our Most Popular Products" items={popular} />
      <ProductRow title="Trending" items={trending} />
      <ProductRow title="Labels, Stickers and Packaging" items={labels} />

      <section className="vp-promo-grid protected-content">
        <article className="vp-promo-panel photo-promo">
          <div className="promo-photo-stack" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="vp-promo-card">
            <h2>Preserve your cherished moments</h2>
            <p>Starting at Rs. 650</p>
            <a href={orderUrl("Photo Albums")} target="_blank" rel="noreferrer">
              Photo Albums
            </a>
            <a href={orderUrl("Mug Printing")} target="_blank" rel="noreferrer">
              Mugs
            </a>
            <a href={orderUrl("Canvas Prints")} target="_blank" rel="noreferrer">
              Canvas Prints
            </a>
          </div>
        </article>
        <article className="vp-promo-panel stationery-promo">
          <div className="promo-desk" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="vp-promo-card">
            <h2>Custom Stationery</h2>
            <p>
              Create a cohesive brand look with personalised office supplies, printed in
              superior quality.
            </p>
            <a href={orderUrl("Letterheads")} target="_blank" rel="noreferrer">
              Letterheads
            </a>
            <a href={orderUrl("Notebooks")} target="_blank" rel="noreferrer">
              Notebooks
            </a>
            <a href={orderUrl("Diaries")} target="_blank" rel="noreferrer">
              Diaries
            </a>
          </div>
        </article>
      </section>

      <ProductRow title="Explore More" items={exploreMore} />
      <ProductRow title="New Arrivals" items={arrivals} />

      <section className="vp-subscribe-band">
        <div className="vp-sample-spread protected-media" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="vp-subscribe-copy">
          <h2>It&apos;s good to be on the list.</h2>
          <p>Get updates, offers and fast WhatsApp support for your next print order.</p>
          <a
            className="vp-subscribe-action"
            href={defaultWhatsAppMessage("Please add me to Shivrudra Graphics updates")}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            Join on WhatsApp
          </a>
        </div>
      </section>

      <section className="vp-info-grid">
        <article>
          <h2>Shivrudra Graphics: Your partner in custom printing</h2>
          <p>
            Since 2014, Shivrudra Graphics has helped businesses, entrepreneurs and
            institutions create commercial, industrial and corporate print products.
          </p>
        </article>
        <article>
          <h3>Even Low Quantities @ Best Prices</h3>
          <p>Order practical quantities across visiting cards, labels, signages and gifts.</p>
        </article>
        <article>
          <h3>High quality products and easy design</h3>
          <p>Send artwork, references or design requirements directly through WhatsApp.</p>
        </article>
        <article>
          <h3>Reliable support from enquiry to delivery</h3>
          <p>Our team helps with print, production, fabrication, delivery and installation.</p>
        </article>
      </section>
    </main>
  );
}

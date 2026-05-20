import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Camera,
  CheckCircle2,
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
  Truck,
} from "lucide-react";
import { ComplaintForm } from "@/components/ComplaintForm";
import { OrderForm } from "@/components/OrderForm";
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
  { title: "Standard Visiting Cards", kind: "cards", href: "/offset-printing" },
  { title: "Rounded Corner Visiting Cards", kind: "cards", href: "/offset-printing", tone: "orange" },
  { title: "Letterheads", kind: "folder", href: "/offset-printing" },
  { title: "Photo Albums", kind: "album", href: "/corporate-gifts" },
  { title: "Stickers", kind: "sticker", href: "/digital-printing", tone: "teal" },
  { title: "Men's Polo T-shirts", kind: "shirt", href: "/corporate-gifts", tone: "red" },
];

const trending: StoreProduct[] = [
  { title: "Classic Visiting Cards", kind: "cards", href: "/offset-printing", tone: "red" },
  { title: "Spot UV Visiting Cards", kind: "cards", href: "/offset-printing", tone: "green" },
  { title: "Printed Caps", kind: "cap", href: "/corporate-gifts" },
  { title: "Premium Polo T-shirts", kind: "shirt", href: "/corporate-gifts", tone: "gray" },
  { title: "Printed Polos - Multi Location", kind: "shirt", href: "/corporate-gifts", tone: "navy" },
  { title: "Women's Polo T-shirts", kind: "shirt", href: "/corporate-gifts", tone: "black" },
];

const labels: StoreProduct[] = [
  { title: "Sheet Stickers", kind: "sticker", href: "/digital-printing" },
  { title: "Product & Packaging Labels", kind: "sticker", href: "/digital-printing", tone: "green" },
  { title: "Custom Shape Stickers", kind: "sticker", href: "/digital-printing", tone: "black" },
  { title: "Sticker Singles", kind: "sticker", href: "/digital-printing", tone: "yellow" },
  { title: "Self Adhesive Tapes", kind: "sticker", href: "/solvent-eco-solvent-printing", tone: "orange" },
  { title: "Transparent Labels", kind: "bottle", href: "/digital-printing" },
];

const exploreMore: StoreProduct[] = [
  { title: "Booklets", kind: "book", href: "/offset-printing" },
  { title: "Embroidered Laptop Bags", kind: "bag", href: "/corporate-gifts", tone: "black" },
  { title: "Premium Laptop Bags", kind: "bag", href: "/corporate-gifts", tone: "navy" },
  { title: "Presentation Folders", kind: "folder", href: "/offset-printing", tone: "yellow" },
  { title: "Brochures", kind: "book", href: "/offset-printing", tone: "brown" },
  { title: "Canvas Prints", kind: "album", href: "/solvent-eco-solvent-printing" },
];

const arrivals: StoreProduct[] = [
  { title: "Adidas Duffle Bags", kind: "bag", href: "/corporate-gifts", tone: "navy" },
  { title: "Translite Board", kind: "board", href: "/signages", tone: "yellow" },
  { title: "Lollipop Board", kind: "sign", href: "/signages", tone: "orange" },
  { title: "Customised QR Code Stand", kind: "qr", href: "/signages" },
  { title: "Acrylic Signs", kind: "acrylic", href: "/signages", tone: "white" },
  { title: "Promotional Canopy Tents", kind: "canopy", href: "/solvent-eco-solvent-printing", tone: "brown" },
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
      <div className="vp-section-heading">
        <h2>{title}</h2>
        <Link href={items[0]?.href ?? "/contact"}>
          View all
          <ArrowRight size={16} />
        </Link>
      </div>
      <div className="vp-card-row protected-content">
        {items.map((item) => (
          <a
            className="vp-product-card"
            href={orderUrl(item.title)}
            key={item.title}
            target="_blank"
            rel="noreferrer"
          >
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
            <span className="vp-hero-kicker">Designing | Printing | Branding</span>
            <h1>Print material that makes your brand feel ready.</h1>
            <p>Business stationery, labels, signage, uniforms and gifts planned through one fast WhatsApp enquiry.</p>
            <a href={orderUrl("Custom Printing Requirement")} target="_blank" rel="noreferrer">
              Start a project
              <ArrowRight size={15} />
            </a>
          </div>
        </article>

        <article className="vp-hero-panel hero-apparel">
          <div className="vp-shirt-showcase" aria-hidden="true">
            <div className="shirt-model dark">SG</div>
            <div className="shirt-model light">A</div>
          </div>
          <div className="vp-hero-copy apparel-copy">
            <span className="vp-hero-kicker">Popular paths</span>
            <h2>What do you need today?</h2>
            <p>Pick a common requirement and send details directly.</p>
            <div className="hero-button-row">
              <a href={orderUrl("Visiting Cards")} target="_blank" rel="noreferrer">
                Visiting Cards
              </a>
              <a href={orderUrl("Labels and Stickers")} target="_blank" rel="noreferrer">
                Labels
              </a>
              <a href={orderUrl("Signage")} target="_blank" rel="noreferrer">
                Signage
              </a>
              <a href={orderUrl("Corporate Gifts")} target="_blank" rel="noreferrer">
                Gifts
              </a>
            </div>
          </div>
        </article>
      </section>

      <section className="vp-trust-strip" aria-label="Service highlights">
        <div>
          <CheckCircle2 size={18} />
          <span>Low quantity orders</span>
        </div>
        <div>
          <Printer size={18} />
          <span>Print, fabrication and gifts</span>
        </div>
        <div>
          <Truck size={18} />
          <span>Local delivery support</span>
        </div>
      </section>

      <section className="vp-product-section" id="categories">
        <div className="vp-section-heading">
          <h2>Explore all categories</h2>
          <Link href="/digital-printing">
            Browse services
            <ArrowRight size={16} />
          </Link>
        </div>
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

      <section className="vp-order-section" id="order-form">
        <div className="vp-order-copy">
          <h2>Place Your Order</h2>
          <p>
            Share product, quantity, deadline, and delivery details so our team can confirm pricing and production.
          </p>
        </div>
        <OrderForm />
      </section>

      <section className="vp-complaint-section" id="complaint-form">
        <div className="vp-complaint-copy">
          <h2>Complaint and Maintenance Support</h2>
          <p>
            Raise support issues with order reference, issue type, priority, and resolution needed.
          </p>
        </div>
        <ComplaintForm />
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

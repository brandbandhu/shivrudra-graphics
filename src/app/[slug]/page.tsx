import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Highlights,
  LeadSection,
  Materials,
  PageHero,
  Products,
  RelatedServices,
  SpecialSections,
} from "@/components/PageSections";
import { company, pages } from "@/lib/site-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = pages.find((item) => item.slug === slug);

  if (!page) {
    return {};
  }

  return {
    title: page.navLabel,
    description: `${page.summary} ${company.name}.`,
  };
}

export default async function CatalogueRoute({ params }: PageProps) {
  const { slug } = await params;
  const page = pages.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <main>
      <PageHero page={page} />
      <SpecialSections page={page} />
      <Highlights page={page} />
      <Materials page={page} />
      <Products page={page} />
      <LeadSection page={page} />
      <RelatedServices currentSlug={page.slug} />
    </main>
  );
}

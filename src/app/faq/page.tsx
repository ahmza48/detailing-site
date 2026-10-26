import type { Metadata } from "next";
import { ArrowLink, ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { FaqList } from "@/components/FaqList";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { faqGroups } from "@/lib/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Engineering Detailing & Outsourcing FAQs",
  description:
    "Answers on structural drafting, Tekla modelling, steel detailing, RCC and BBS, brownfield work, quotations, standards, responsibilities, software and confidentiality.",
  path: "/faq",
  image: "/images/drawings-qaqc.jpg",
});

const slug = (title: string) => title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function FaqPage() {
  return (
    <>
      <Hero
        eyebrow="FAQs"
        title="Engineering Detailing"
        accent="& Outsourcing FAQs"
        intro="Straight answers to the questions EPC contractors, engineering consultancies and fabricators ask before commissioning a drawing, model or detailing package."
        image="/images/drawings-qaqc.jpg"
        imageAlt="Engineering drawings on a desk with drafting pencils and a scale rule"
        crumbs={[{ name: "FAQs", path: "/faq" }]}
      >
        <ButtonLink href="/contact">Request a Quote</ButtonLink>
      </Hero>

      <nav aria-label="FAQ topics" className="border-b border-line bg-white">
        <ul className="container-site flex gap-x-6 overflow-x-auto py-2 text-xs font-bold tracking-[0.1em] whitespace-nowrap text-navy-900 uppercase">
          {faqGroups.map((group) => (
            <li key={group.title}>
              <a href={`#${slug(group.title)}`} className="inline-flex min-h-11 items-center transition-colors hover:text-teal-700">
                {group.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {faqGroups.map((group, i) => (
        <section key={group.title} id={slug(group.title)} className={`scroll-mt-20 ${i % 2 === 0 ? "bg-paper" : "bg-white"}`}>
          <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading slab title={group.title} />
            </div>
            <div className="lg:col-span-8">
              <FaqList faqs={group.faqs} surface={i % 2 === 0 ? "white" : "paper"} openFirst={false} />
            </div>
          </div>
        </section>
      ))}

      <section className="bg-white">
        <div className="container-site flex flex-wrap items-center justify-between gap-6 border-t border-line py-10">
          <p className="max-w-2xl text-base leading-7 text-ink">
            Service-specific questions are answered on each service page, alongside its scope, inputs and deliverables.
          </p>
          <ArrowLink href="/services">Explore technical services</ArrowLink>
        </div>
      </section>

      <CTASection
        title="Have a question"
        accent="about your package?"
        copy="Share your scope, drawings and required deliverables. We can review the information available and clarify the proposed production package."
      />
    </>
  );
}

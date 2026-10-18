import { ButtonLink } from "./ButtonLink";
import { ImageBand } from "./ImageBand";

type Props = {
  title?: string;
  accent?: string;
  copy?: string;
  /** Pre-selects the service in the enquiry form. */
  serviceSlug?: string;
};

export function CTASection({
  title = "Need structural delivery capacity",
  accent = "for your next energy project?",
  copy = "Discuss your scope with our team and explore how we can support your structural detailing, modelling and project-delivery requirements.",
  serviceSlug,
}: Props) {
  return (
    <ImageBand
      title={title}
      accent={accent}
      image="/images/contact-overview.jpg"
      imageAlt="Process towers and a crane under an evening sky"
      actions={<ButtonLink href={serviceSlug ? `/contact?service=${serviceSlug}` : "/contact"}>Discuss a Project</ButtonLink>}
    >
      <p>{copy}</p>
    </ImageBand>
  );
}

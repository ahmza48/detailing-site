import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  title: string;
  accent?: string;
  image: string;
  imageAlt: string;
  children: ReactNode;
  /** Buttons / links rendered under the copy. */
  actions?: ReactNode;
  id?: string;
};

/** Full-width photographic band with left-aligned copy over a navy wash. */
export function ImageBand({ title, accent, image, imageAlt, children, actions, id }: Props) {
  return (
    <section id={id} className="relative isolate overflow-hidden bg-navy-900 text-mist">
      <Image src={image} alt={imageAlt} fill sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-navy-900/90 via-navy-900/60 to-navy-900/10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-navy-900/55 md:bg-navy-900/20" />

      <div className="container-site flex min-h-[30rem] flex-col justify-center py-20 lg:min-h-[33rem]">
        <div data-reveal className="max-w-xl lg:ml-[6%]">
          <h2 className="display-lg text-balance text-mist">
            {title}
            {accent && <span className="block text-energy">{accent}</span>}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-7 font-normal text-mist">{children}</div>
          {actions && <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">{actions}</div>}
        </div>
      </div>
    </section>
  );
}

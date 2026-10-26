"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { ArrowRight, ChevronDown, CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { submitEnquiry } from "@/app/contact/actions";
import {
  ACCEPTED_FILE_EXTENSIONS,
  clientTypes,
  designStatusOptions,
  industryOptions,
  initialEnquiryState,
  mixedPackageOption,
  outsourcingOption,
  projectTypes,
  serviceOptions,
  technicalServiceOptions,
  type EnquiryField,
} from "@/lib/contact";
import { legacyServiceSlugs, services } from "@/lib/services";
import { buttonBase } from "./ButtonLink";

const controlClass =
  "mt-2 block min-h-12 w-full rounded-lg border border-navy-900/20 bg-white px-4 py-3 text-base text-ink transition-colors placeholder:text-muted hover:border-navy-900/50 focus:border-teal-700 focus:outline-2 focus:outline-offset-0 focus:outline-energy-deep aria-invalid:border-red-700";

type FieldProps = {
  name: EnquiryField;
  label: string;
  error?: string;
  optional?: boolean;
  hint?: string;
  className?: string;
  children: (props: { id: string; name: string; "aria-invalid": boolean; "aria-describedby"?: string }) => React.ReactNode;
};

function Field({ name, label, error, optional, hint, className = "", children }: FieldProps) {
  const id = `enquiry-${name}`;
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-bold text-navy-900">
        {label}
        {optional && <span className="ml-2 font-medium text-slate">Optional</span>}
      </label>
      {children({ id, name, "aria-invalid": Boolean(error), "aria-describedby": describedBy })}
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-xs leading-relaxed text-slate">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-semibold text-red-700">
          <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialEnquiryState);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const errors = state.errors ?? {};
  const values = state.values ?? {};

  // Pre-select the service when arriving from a service page (/contact?service=<slug>).
  // Older service slugs map to their successors; the matching technical line is ticked too.
  // "engineering-outsourcing" and "mixed" select the two non-service options.
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("service") ?? "";
    const slug: string = legacyServiceSlugs[raw] ?? raw;
    const title =
      slug === "engineering-outsourcing"
        ? outsourcingOption
        : slug === "mixed"
          ? mixedPackageOption
          : services.find((service) => service.slug === slug)?.title;
    if (!title || !serviceRef.current || serviceRef.current.value) return;
    serviceRef.current.value = title;
    const boxes = serviceRef.current.form?.querySelectorAll<HTMLInputElement>('input[name="technicalServices"]') ?? [];
    boxes.forEach((box) => {
      if (box.value === title) box.checked = true;
    });
  }, []);

  // Move focus to the outcome so keyboard and screen-reader users are not left at the button.
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-xl border-l-4 border-energy-deep bg-paper p-8 outline-none sm:p-10">
        <CircleCheck aria-hidden className="size-8 text-energy-ink" />
        <h2 className="display-md mt-5 text-navy-900 uppercase">Enquiry received</h2>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-slate">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      // Dispatching manually stops React resetting the fields after the action,
      // so a failed submission keeps everything the visitor entered (selects and file included).
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        startTransition(() => formAction(data));
      }}
      className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
      {state.status === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="flex gap-3 rounded-lg border-l-4 border-red-700 bg-red-50 p-5 text-sm font-semibold text-red-800 outline-none sm:col-span-2"
        >
          <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
          {state.message}
        </div>
      )}

      <Field name="name" label="Name" error={errors.name}>
        {(props) => <input {...props} type="text" required autoComplete="name" defaultValue={values.name} className={controlClass} />}
      </Field>
      <Field name="company" label="Organisation" error={errors.company}>
        {(props) => (
          <input {...props} type="text" required autoComplete="organization" defaultValue={values.company} className={controlClass} />
        )}
      </Field>
      <Field name="email" label="Work email" error={errors.email}>
        {(props) => (
          <input {...props} type="email" required autoComplete="email" inputMode="email" defaultValue={values.email} className={controlClass} />
        )}
      </Field>
      <Field name="phone" label="Phone" optional error={errors.phone}>
        {(props) => <input {...props} type="tel" autoComplete="tel" defaultValue={values.phone} className={controlClass} />}
      </Field>
      <Field name="clientType" label="Client type" optional>
        {(props) => (
          <select {...props} defaultValue={values.clientType ?? ""} className={controlClass}>
            <option value="">Select client type</option>
            {clientTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        )}
      </Field>
      <Field name="service" label="Service needed" error={errors.service}>
        {(props) => (
          <select {...props} ref={serviceRef} required defaultValue={values.service ?? ""} className={controlClass}>
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        )}
      </Field>

      <fieldset className="sm:col-span-2">
        <legend className="text-sm font-bold text-navy-900">
          Technical services involved<span className="ml-2 font-medium text-slate">Optional, tick any that apply</span>
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {technicalServiceOptions.map((option) => (
            <label
              key={option}
              className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-navy-900/15 bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-navy-900/40 has-checked:border-energy-deep has-checked:bg-paper"
            >
              <input
                type="checkbox"
                name="technicalServices"
                value={option}
                defaultChecked={values.technicalServices?.split(", ").includes(option)}
                className="size-4 accent-energy-deep"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <Field
        name="message"
        label="Scope summary"
        error={errors.message}
        hint="Describe the structures, the design inputs you have, the deliverables you need and your target schedule."
        className="sm:col-span-2"
      >
        {(props) => (
          <textarea {...props} required rows={6} minLength={20} maxLength={5000} defaultValue={values.message} className={`${controlClass} resize-y`} />
        )}
      </Field>

      <details
        className="group/details rounded-xl border border-line sm:col-span-2"
        open={Boolean(values.projectType || values.industry || values.software || values.deliverables)}
      >
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-sm font-bold text-navy-900 [&::-webkit-details-marker]:hidden">
          Technical details (optional)
          <ChevronDown aria-hidden className="size-4 text-energy-deep transition-transform group-open/details:rotate-180" />
        </summary>
        <div className="grid gap-x-6 gap-y-6 border-t border-line p-5 sm:grid-cols-2">
          <Field name="country" label="Country / project location" optional error={errors.country}>
            {(props) => <input {...props} type="text" autoComplete="country-name" defaultValue={values.country} className={controlClass} />}
          </Field>
          <Field name="industry" label="Industry" optional>
            {(props) => (
              <select {...props} defaultValue={values.industry ?? ""} className={controlClass}>
                <option value="">Select industry</option>
                {industryOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            )}
          </Field>
          <Field name="projectType" label="Project type" optional>
            {(props) => (
              <select {...props} defaultValue={values.projectType ?? ""} className={controlClass}>
                <option value="">Select project type</option>
                {projectTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            )}
          </Field>
          <Field name="designStatus" label="Design status" optional>
            {(props) => (
              <select {...props} defaultValue={values.designStatus ?? ""} className={controlClass}>
                <option value="">Select design status</option>
                {designStatusOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            )}
          </Field>
          <Field name="software" label="Required software and version" optional hint="For example Tekla Structures 2024, AutoCAD, native or IFC exchange.">
            {(props) => <input {...props} type="text" defaultValue={values.software} className={controlClass} />}
          </Field>
          <Field name="targetDate" label="Target start or milestone" optional>
            {(props) => <input {...props} type="text" defaultValue={values.targetDate} className={controlClass} />}
          </Field>
          <Field
            name="deliverables"
            label="Required deliverables and approximate quantity"
            optional
            hint="For example 40 shop drawings or BBS for 12 foundations, plus the codes and standards that apply."
            className="sm:col-span-2"
          >
            {(props) => <textarea {...props} rows={3} maxLength={600} defaultValue={values.deliverables} className={`${controlClass} resize-y`} />}
          </Field>
        </div>
      </details>

      <Field
        name="attachment"
        label="Non-confidential scope document"
        optional
        error={errors.attachment}
        hint={`One file up to 8 MB (${ACCEPTED_FILE_EXTENSIONS.join(", ")}). Please do not attach confidential drawings here; project files are exchanged after first contact, under an NDA if required.`}
        className="sm:col-span-2"
      >
        {(props) => (
          <input
            {...props}
            type="file"
            accept={ACCEPTED_FILE_EXTENSIONS.join(",")}
            className="mt-2 block w-full rounded-lg border border-dashed border-navy-900/30 bg-paper p-3 text-sm text-slate file:mr-4 file:min-h-10 file:cursor-pointer file:rounded-md file:border-0 file:bg-navy-900 file:px-4 file:text-xs file:font-bold file:tracking-[0.1em] file:text-white file:uppercase"
          />
        )}
      </Field>

      <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm text-ink sm:col-span-2">
        <input type="checkbox" name="nda" value="yes" defaultChecked={values.nda === "Yes"} className="mt-0.5 size-4 accent-energy-deep" />
        <span>
          <span className="font-bold text-navy-900">Please contact me about an NDA / secure file transfer before I send drawings</span>
          <span className="block text-slate">We will discuss confidentiality arrangements with you before asking for drawings or models.</span>
        </span>
      </label>

      {/* Honeypot: hidden from people and assistive technology */}
      <div aria-hidden className="hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="sm:col-span-2">
        <button type="submit" disabled={pending} className={`${buttonBase} w-full bg-energy-deep text-white hover:bg-energy-ink disabled:cursor-wait disabled:opacity-70 sm:w-auto`}>
          {pending ? (
            <>
              <LoaderCircle aria-hidden className="size-4 animate-spin motion-reduce:animate-none" />
              Sending…
            </>
          ) : (
            <>
              Submit Project Requirements
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </button>
        <p className="mt-4 text-xs leading-relaxed text-slate">
          Only name, organisation, work email, service and scope summary are required. Your details are used to respond to
          this enquiry and prepare any quotation; see our{" "}
          <Link href="/privacy-policy" className="font-semibold text-navy-900 underline underline-offset-2 hover:text-energy-ink">
            Privacy Policy
          </Link>
          . Please do not send confidential drawings until an NDA or approved file exchange is agreed.
        </p>
      </div>
    </form>
  );
}

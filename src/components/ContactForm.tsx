"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import { ArrowRight, CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { submitEnquiry } from "@/app/contact/actions";
import {
  ACCEPTED_FILE_EXTENSIONS,
  initialEnquiryState,
  projectTypes,
  serviceOptions,
  type EnquiryField,
} from "@/lib/contact";
import { services } from "@/lib/services";
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
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service");
    const match = services.find((service) => service.slug === slug);
    if (match && serviceRef.current && !serviceRef.current.value) serviceRef.current.value = match.title;
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
      <Field name="company" label="Company" error={errors.company}>
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
      <Field name="country" label="Country" error={errors.country}>
        {(props) => (
          <input {...props} type="text" required autoComplete="country-name" defaultValue={values.country} className={controlClass} />
        )}
      </Field>
      <Field name="projectType" label="Project type" error={errors.projectType}>
        {(props) => (
          <select {...props} required defaultValue={values.projectType ?? ""} className={controlClass}>
            <option value="" disabled>
              Select project type
            </option>
            {projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        )}
      </Field>
      <Field name="service" label="Service needed" error={errors.service} className="sm:col-span-2">
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
      <Field
        name="message"
        label="Message"
        error={errors.message}
        hint="Outline the structures, deliverables, software environment and schedule involved."
        className="sm:col-span-2"
      >
        {(props) => (
          <textarea {...props} required rows={6} minLength={20} maxLength={5000} defaultValue={values.message} className={`${controlClass} resize-y`} />
        )}
      </Field>
      <Field
        name="attachment"
        label="Drawings or scope document"
        optional
        error={errors.attachment}
        hint={`One file up to 8 MB (${ACCEPTED_FILE_EXTENSIONS.join(", ")}). Larger packages can be shared after first contact.`}
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
              Submit Project Enquiry
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </button>
        <p className="mt-4 text-xs leading-relaxed text-slate">
          Your details are used only to respond to this enquiry.
        </p>
      </div>
    </form>
  );
}

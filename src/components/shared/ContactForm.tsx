import { FormEvent, useEffect, useMemo, useState } from "react";
import { PROFILE } from "@/data/profile";

type FormStatus = "idle" | "sending" | "sent" | "error";
type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const baseFieldClassName =
  "w-full rounded-[18px] border border-[var(--border-subtle)] bg-[rgba(8,10,16,0.84)] px-4 py-3 text-sm text-[var(--f1-white)] outline-none transition-all duration-300 placeholder:text-[#8f8f94] focus:border-[var(--f1-red)] focus:ring-2 focus:ring-[rgba(232,0,45,0.25)] min-h-[44px]";

const labelClassName =
  "font-data text-[10px] uppercase tracking-[0.2em] text-[var(--f1-red)]";

const errorClassName = "mt-2 font-data text-[10px] uppercase tracking-[0.16em] text-[var(--f1-red)]";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const isValid = useMemo(
    () => name.trim().length > 0 && EMAIL_REGEX.test(email.trim()) && message.trim().length >= 10,
    [email, message, name],
  );

  useEffect(() => {
    if (status !== "sent") return;
    const timeout = window.setTimeout(() => setStatus("idle"), 3000);
    return () => window.clearTimeout(timeout);
  }, [status]);

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Driver name required";
    }

    if (!email.trim()) {
      nextErrors.email = "Frequency required";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      nextErrors.email = "Enter a valid email";
    }

    if (!message.trim()) {
      nextErrors.message = "Message required";
    } else if (message.trim().length < 10) {
      nextErrors.message = "Minimum 10 characters";
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || !isValid) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    const subject = encodeURIComponent(`Portfolio Contact from ${name.trim()}`);
    const body = encodeURIComponent(`Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`);

    if (typeof window !== "undefined") {
      window.open(`mailto:${PROFILE.contactEmail}?subject=${subject}&body=${body}`, "_self");
    }

    setStatus("sent");
  };

  const buttonLabel =
    status === "sent" ? "✓ TRANSMISSION SENT" : status === "sending" ? "TRANSMITTING..." : "▶ TRANSMIT MESSAGE";

  return (
    <div className="glass rounded-[28px] p-6 md:p-7">
      <div className="mb-6">
        <p className="font-data text-[11px] uppercase tracking-[0.28em] text-[var(--f1-muted)]">░ Transmission Panel</p>
        <div className="mt-3 h-px bg-gradient-to-r from-[var(--f1-red)]/80 via-white/15 to-transparent" />
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="contact-name" className={labelClassName}>
            Driver Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (status !== "idle") {
                setStatus("idle");
              }
              if (errors.name) {
                setErrors((current) => ({ ...current, name: undefined }));
              }
            }}
            placeholder="Your full name"
            className={`${baseFieldClassName} mt-2 ${errors.name ? "border-[var(--f1-red)]" : ""}`}
          />
          {errors.name ? (
            <p id="contact-name-error" className={errorClassName}>
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClassName}>
            Frequency (Email)
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status !== "idle") {
                setStatus("idle");
              }
              if (errors.email) {
                setErrors((current) => ({ ...current, email: undefined }));
              }
            }}
            placeholder="your@email.com"
            className={`${baseFieldClassName} mt-2 ${errors.email ? "border-[var(--f1-red)]" : ""}`}
          />
          {errors.email ? (
            <p id="contact-email-error" className={errorClassName}>
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClassName}>
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            aria-required="true"
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              if (status !== "idle") {
                setStatus("idle");
              }
              if (errors.message) {
                setErrors((current) => ({ ...current, message: undefined }));
              }
            }}
            placeholder="Your message..."
            rows={6}
            className={`${baseFieldClassName} mt-2 resize-none py-3 ${errors.message ? "border-[var(--f1-red)]" : ""}`}
          />
          {errors.message ? (
            <p id="contact-message-error" className={errorClassName}>
              {errors.message}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          className={`flex min-h-[48px] w-full items-center justify-center rounded-[18px] border px-4 py-3 font-data text-[11px] uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
            status === "sent"
              ? "border-[rgba(57,255,20,0.32)] bg-[rgba(57,255,20,0.18)] text-[var(--f1-green)]"
              : "border-[var(--f1-red)] bg-[var(--f1-red)] text-white hover:bg-[#ff1f4a]"
          }`}
        >
          {buttonLabel}
        </button>
      </form>

      <p aria-live="polite" className="mt-4 font-data text-[10px] text-[var(--f1-muted)]">
        ░ Signals routed to: {PROFILE.contactEmail}
      </p>
    </div>
  );
};

export default ContactForm;

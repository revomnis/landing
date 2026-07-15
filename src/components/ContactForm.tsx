import { useState, type FormEvent } from "react";
import { CONSULTATION_EMAIL, FORM_ACTION } from "../lib/constants";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const website = data.get("website") as string;
    const message = data.get("message") as string;
    const botField = data.get("_gotcha") as string;

    if (FORM_ACTION) {
      try {
        const res = await fetch(FORM_ACTION, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name,
            email,
            website,
            message,
            _gotcha: botField,
            _subject: `Consultation request from ${name || "website"}`,
          }),
        });
        if (!res.ok) throw new Error("Submission failed");
        setStatus("sent");
        form.reset();
      } catch {
        setStatus("error");
      }
      return;
    }

    const body = `Name: ${name}\nEmail: ${email}\nWebsite: ${website}\n\n${message}`;
    window.location.href = `mailto:${CONSULTATION_EMAIL}?subject=${encodeURIComponent("Consultation request")}&body=${encodeURIComponent(body)}`;
    setTimeout(() => {
      setStatus("sent");
      form.reset();
    }, 600);
  }

  if (status === "sent") {
    return (
      <div className="contact-form__success">
        <p className="contact-form__success-title">Request received.</p>
        <p className="contact-form__success-sub">
          We'll review your details and reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />
      <div className="contact-form__row">
        <div className="contact-form__field">
          <label htmlFor="cf-name" className="contact-form__label">
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            className="contact-form__input"
            placeholder="Your name"
            autoComplete="name"
          />
        </div>
        <div className="contact-form__field">
          <label htmlFor="cf-email" className="contact-form__label">
            Work email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            className="contact-form__input"
            placeholder="you@company.com"
            autoComplete="email"
          />
        </div>
      </div>
      <div className="contact-form__field">
        <label htmlFor="cf-website" className="contact-form__label">
          Company website
        </label>
        <input
          id="cf-website"
          name="website"
          type="url"
          required
          className="contact-form__input"
          placeholder="https://yourcompany.com"
          autoComplete="url"
        />
      </div>
      <div className="contact-form__field">
        <label htmlFor="cf-message" className="contact-form__label">
          What are you trying to build?
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          className="contact-form__textarea"
          placeholder="Who do you sell to, what does outbound look like today, and what are you trying to achieve?"
        />
      </div>
      <button
        type="submit"
        className="btn btn--primary btn--lg contact-form__submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending\u2026" : "Request a consultation"}
      </button>
      {status === "error" && (
        <p className="contact-form__error">
          Something went wrong. Please try again or email us directly at {CONSULTATION_EMAIL}.
        </p>
      )}
    </form>
  );
}

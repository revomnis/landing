import { ContactForm } from "../components/ContactForm";

export function FinalCta() {
  return (
    <section
      id="consultation"
      className="final-cta section"
      aria-labelledby="final-heading"
    >
      <div className="container final-cta__layout">
        <div className="final-cta__content">
          <p className="final-cta__eyebrow animate-in">NEXT STEP</p>
          <h2
            id="final-heading"
            className="final-cta__title animate-in animate-in--delay-1"
          >
            See if outbound makes sense for your market.
          </h2>
          <p className="final-cta__sub animate-in animate-in--delay-2">
            Share a few details about your offer, buyer profile, and outbound
            goals. Revomnis will review whether a serious email and LinkedIn
            motion makes sense before recommending scope.
          </p>
          <p className="final-cta__support animate-in animate-in--delay-3">
            No generic packages. No premature volume promises. Just a clear
            assessment of what the outbound system would require.
          </p>
        </div>
        <div className="final-cta__form-card animate-in animate-in--delay-2">
          <p className="final-cta__form-label">Consultation request</p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

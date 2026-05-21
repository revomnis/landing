import { FAQ_ITEMS } from "./faqData";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="faq section section--cool"
      aria-labelledby="faq-heading"
    >
      <div className="container">
        <div className="faq__header">
          <p className="section__title animate-in">FAQ</p>
          <h2
            id="faq-heading"
            className="faq__headline animate-in animate-in--delay-1"
          >
            Common questions before outbound starts.
          </h2>
        </div>

        <div className="faq__list animate-in animate-in--delay-3">
          {FAQ_ITEMS.map((item, i) => (
            <details key={item.q} className="faq__item" open={i === 0}>
              <summary className="faq__question">
                <span className="faq__question-text">{item.q}</span>
                <svg
                  className="faq__chevron"
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <div className="faq__body">
                <div>
                  <p className="faq__answer">{item.a}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

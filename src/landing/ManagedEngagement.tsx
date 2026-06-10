import { WORKSTREAMS } from "./managedEngagementData";

const MOBILE_PROCESS_STEPS = [
  {
    title: "Define the market",
    description:
      "Audience evidence, fit signals, exclusions, and segment logic.",
  },
  {
    title: "Build the outbound layer",
    description:
      "Infrastructure, message structure, and campaign foundations.",
  },
  {
    title: "Run coordinated outreach",
    description:
      "Email and LinkedIn operate around one audience logic.",
  },
  {
    title: "Handle replies",
    description: "Responses are reviewed, qualified, and moved forward.",
  },
] as const;

export function ManagedEngagement() {
  return (
    <section
      id="how-it-works"
      className="hiw section"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container">
        <div className="hiw__intro">
          <p className="section__title animate-in">HOW IT WORKS</p>
          <h2
            id="how-it-works-heading"
            className="hiw__headline animate-in animate-in--delay-1"
          >
            From market definition to booked meetings.
          </h2>
          <p className="hiw__sub animate-in animate-in--delay-2">
            Revomnis turns audience logic, infrastructure, outreach, and reply
            handling into one coordinated path from market definition to booked
            meetings.
          </p>
        </div>

        <div className="hiw__diagram animate-in animate-in--delay-3">
          <div className="hiw__columns">
            {WORKSTREAMS.map((ws) => (
              <div key={ws.id} className="hiw__col">
                <div className="hiw__col-header">
                  <h3 className="hiw__col-title">{ws.title}</h3>
                  <p className="hiw__col-intro">{ws.intro}</p>
                </div>

                <div className="hiw__chips hiw__chips--input">
                  {ws.inputChips.map((chip) => (
                    <span key={chip} className="hiw__chip hiw__chip--input">
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="hiw__inner-connector" aria-hidden="true">
                  <span className="hiw__inner-line" />
                </div>

                <div className="hiw__blocks">
                  {ws.blocks.map((block, i) => (
                    <div key={block.title}>
                      <div className="hiw__block">
                        <span className="hiw__block-num" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h4 className="hiw__block-title">{block.title}</h4>
                        <p className="hiw__block-desc">{block.description}</p>
                      </div>
                      {i < ws.blocks.length - 1 && (
                        <div
                          className="hiw__inner-connector"
                          aria-hidden="true"
                        >
                          <span className="hiw__inner-line" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="hiw__inner-connector" aria-hidden="true">
                  <span className="hiw__inner-line" />
                </div>

                <div className="hiw__chips hiw__chips--output">
                  {ws.outputChips.map((chip) => (
                    <span
                      key={chip.label}
                      className={`hiw__chip hiw__chip--${chip.color}`}
                    >
                      {chip.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="hiw__mobile-flow" aria-label="How It Works mobile flow">
            {MOBILE_PROCESS_STEPS.map((step, index) => (
              <article
                key={step.title}
                className="hiw__mobile-step"
              >
                <span className="hiw__mobile-step-num" aria-hidden="true">
                  {index + 1}
                </span>
                <div className="hiw__mobile-step-copy">
                  <h3 className="hiw__mobile-step-title">{step.title}</h3>
                  <p className="hiw__mobile-step-desc">{step.description}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Desktop convergence connector */}
          <div className="hiw__convergence" aria-hidden="true">
            <svg
              className="hiw__merge-svg"
              viewBox="0 0 1200 85"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Static connector paths */}
              <path
                className="hiw__merge-path"
                d="M200 0 L200 15 C200 40 400 45 600 45"
              />
              <path
                className="hiw__merge-path"
                d="M600 0 L600 45"
              />
              <path
                className="hiw__merge-path"
                d="M1000 0 L1000 15 C1000 40 800 45 600 45"
              />
              <path
                className="hiw__merge-path hiw__merge-path--post"
                d="M600 45 L600 85"
              />

              {/* Phase 1: Three impulses travel to merge point */}
              <circle className="hiw__impulse" r="4.5">
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  path="M200 0 L200 15 C200 40 400 45 600 45"
                  keyPoints="0;1;1"
                  keyTimes="0;0.38;1"
                  calcMode="linear"
                />
                <animate
                  attributeName="opacity"
                  dur="5s"
                  repeatCount="indefinite"
                  values="0;0.85;0.85;0;0"
                  keyTimes="0;0.05;0.33;0.42;1"
                />
              </circle>

              <circle className="hiw__impulse" r="4.5">
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  path="M600 0 L600 45"
                  keyPoints="0;1;1"
                  keyTimes="0;0.38;1"
                  calcMode="linear"
                />
                <animate
                  attributeName="opacity"
                  dur="5s"
                  repeatCount="indefinite"
                  values="0;0.85;0.85;0;0"
                  keyTimes="0;0.05;0.33;0.42;1"
                />
              </circle>

              <circle className="hiw__impulse" r="4.5">
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  path="M1000 0 L1000 15 C1000 40 800 45 600 45"
                  keyPoints="0;1;1"
                  keyTimes="0;0.38;1"
                  calcMode="linear"
                />
                <animate
                  attributeName="opacity"
                  dur="5s"
                  repeatCount="indefinite"
                  values="0;0.85;0.85;0;0"
                  keyTimes="0;0.05;0.33;0.42;1"
                />
              </circle>

              {/* Phase 2: Merged impulse travels from merge point to bottom */}
              <circle className="hiw__impulse hiw__impulse--merged" r="6">
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  path="M600 45 L600 85"
                  keyPoints="0;0;1;1"
                  keyTimes="0;0.42;0.72;1"
                  calcMode="linear"
                />
                <animate
                  attributeName="opacity"
                  dur="5s"
                  repeatCount="indefinite"
                  values="0;0;0.9;0.9;0;0"
                  keyTimes="0;0.40;0.45;0.68;0.76;1"
                />
              </circle>
            </svg>

            {/* Mobile: simple vertical connector */}
            <span className="hiw__mobile-connector">
              <span className="hiw__mobile-connector-line" />
            </span>
          </div>

          <div className="hiw__outcome">
            <span className="hiw__outcome-node" aria-hidden="true" />
            <span className="hiw__outcome-label">Booked meeting</span>
            <span className="hiw__outcome-sub">
              The right conversation reaches the calendar.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

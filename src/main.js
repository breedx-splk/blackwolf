import './styles.css';

const app = document.querySelector('#app');

const wizardMark = `
  <svg class="brand-mark" viewBox="0 0 112 112" role="img" aria-label="Blackwolf wizard mark">
    <path class="wizard-bone" d="M29 62 13 77m8-7-9-3m9 3-2 10m64-18 16 15m-8-7 9-3m-9 3 2 10" />
    <circle class="wizard-joint" cx="29" cy="62" r="5" />
    <circle class="wizard-joint" cx="83" cy="62" r="5" />
    <path class="wizard-cloak" d="M17 103c2-25 11-42 26-49h26c15 7 24 24 26 49H17Z" />
    <path class="wizard-head" d="M34 38C34 22 43 12 56 12s22 10 22 26l-7 18H41l-7-18Z" />
    <path class="wizard-brow" d="M35 35c8-7 15-7 21 0 6-7 13-7 21 0l-5 15H40l-5-15Z" />
    <path class="wizard-eye" d="m40 36 12 2-10 7-2-9Zm32 0-12 2 10 7 2-9Z" />
    <path class="wizard-beard" d="M41 58c5 2 10 2 15-2 5 4 10 4 15 2 1 17-2 31-8 41l-7-10-7 10c-6-10-9-24-8-41Z" />
    <path class="wizard-beard-line" d="M48 65c-1 10 2 18 8 24m8-24c1 10-2 18-8 24" />
    <path class="wizard-moustache" d="M55 53c-5-2-12 1-18 9 6-3 11 1 16 3l3-8-1-4Zm2 0c5-2 12 1 18 9-6-3-11 1-16 3l-3-8 1-4Z" />
    <path class="wizard-mouth" d="M51 67q5-7 10 0" />
    <path class="wizard-nose" d="M56 38 52 51c0 3 2 6 4 6s4-3 4-6l-4-13Z" />
  </svg>
`;

const appDynamicsMark = `
  <div class="appd-mark" aria-label="AppDynamics">
    <img src="./appdynamics-logo.png" alt="AppDynamics" />
  </div>
`;

const dualSignalDocsUrl =
  'https://help.splunk.com/en/appdynamics-on-premises/virtual-appliance-self-hosted/25.7.0/splunk-appdynamics-for-opentelemetry/instrument-applications-with-splunk-appdynamics-for-opentelemetry/enable-opentelemetry-in-the-java-agent/enable-dual-signal-mode';

function shell(content, step = '') {
  return `
    <main class="app-shell">
      <div class="aurora aurora-one" aria-hidden="true"></div>
      <div class="aurora aurora-two" aria-hidden="true"></div>
      <div class="unauthorized-watermark" aria-hidden="true">Unauthorized</div>
      <header class="brand" aria-label="Blackwolf">
        ${wizardMark}
        <div class="brand-copy">
          <span class="brand-name">blackwolf</span>
          <span class="tagline">AppD agent migration helper wizard</span>
        </div>
      </header>
      ${step}
      ${content}
      <footer>
        <span class="status-dot" aria-hidden="true"></span>
        Your answers stay in this browser
      </footer>
    </main>
  `;
}

function splash() {
  app.innerHTML = shell(`
    <section class="question-card splash-card" aria-labelledby="welcome-title">
      <span class="eyebrow">Migration, minus the guesswork</span>
      <h1 id="welcome-title">Make the move to<br /><em>OpenTelemetry.</em></h1>
      <p>
        Blackwolf guides you through migrating AppDynamics agents
        to Splunk OpenTelemetry agents -— one clear question at a time.
      </p>
      <div class="journey" aria-label="Migration journey">
        <span>AppDynamics</span>
        <svg viewBox="0 0 72 18" aria-hidden="true">
          <path d="M2 9h64M58 2l8 7-8 7" />
        </svg>
        <span>OpenTelemetry</span>
      </div>
    </section>
    <div class="actions">
      <button class="primary-button" id="begin-button" type="button">
        Journey forth
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
      </button>
    </div>
  `);

  document.querySelector('#begin-button').addEventListener('click', showAgentQuestion);
}

function focusCard() {
  document.querySelector('.question-card').focus({ preventScroll: true });
}

function showAgentQuestion() {
  app.innerHTML = shell(
    `
      <section class="question-card agent-question-card" aria-labelledby="agent-question-title" tabindex="-1">
        <span class="eyebrow">Your current setup</span>
        <div class="vendor-heading">
          ${appDynamicsMark}
        </div>
        <h1 id="agent-question-title">Is your application currently instrumented by an AppDynamics agent?</h1>
        <p>
          Choose the answer that best describes the application you’re preparing to migrate.
        </p>
      </section>
      <div class="actions answer-actions" aria-label="Choose an answer">
        <button class="primary-button answer-button" id="yes-button" type="button">
          Yes
        </button>
        <button class="primary-button answer-button" id="no-button" type="button">
          No
        </button>
      </div>
      <button class="text-button" id="back-button" type="button">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
        Back to introduction
      </button>
    `,
    '<div class="step-label" aria-label="Current step">Current setup <span>01</span></div>',
  );

  document.querySelector('#back-button').addEventListener('click', splash);
  document.querySelector('#no-button').addEventListener('click', showOpenTelemetryPath);
  document.querySelector('#yes-button').addEventListener('click', showAgentPath);
  focusCard();
}

function showOpenTelemetryPath() {
  app.innerHTML = shell(
    `
      <section class="question-card outcome-card" aria-labelledby="open-path-title" tabindex="-1">
        <div class="success-mark" aria-hidden="true">
          <svg viewBox="0 0 64 64">
            <path d="M21 29v-8c0-8 5-14 13-14 6 0 10 3 12 8" />
            <rect x="12" y="27" width="40" height="31" rx="7" />
            <path d="m25 42 5 5 10-11" />
          </svg>
        </div>
        <span class="eyebrow">The open path</span>
        <h1 id="open-path-title">No vendor lock-in.<br /><em>Nicely done.</em></h1>
        <p>
          Congratulations—there’s no AppDynamics agent configuration to untangle.
          You can <a href="https://opentelemetry.io/docs/getting-started/">head straight to OpenTelemetry</a>
          and start instrumenting your application.
        </p>
      </section>
      <div class="actions actions-split outcome-actions">
        <button class="secondary-button" id="back-button" type="button">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
          Back
        </button>
        <a
          class="primary-button"
          href="https://opentelemetry.io/docs/getting-started/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get started
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
        </a>
      </div>
    `,
    '<div class="step-label" aria-label="Current step">Your path <span>✓</span></div>',
  );

  document.querySelector('#back-button').addEventListener('click', showAgentQuestion);
  focusCard();
}

function showAgentPath() {
  app.innerHTML = shell(
    `
      <section class="question-card dual-signal-card" aria-labelledby="dual-signal-title" tabindex="-1">
        <span class="eyebrow">A safer transition</span>
        <h1 id="dual-signal-title">Have you enabled dual-signal mode?</h1>
        <p>
          It’s optional, but running AppDynamics and OpenTelemetry together gives you
          time to validate telemetry and rebuild dashboards, alerts, and workflows
          before you cut over.
        </p>
      </section>
      <div class="actions decision-actions" aria-label="Choose your dual-signal path">
        <button class="primary-button decision-button" id="dual-enabled-button" type="button">
          <span>Yes</span>
          <small>It’s already enabled</small>
        </button>
        <button class="primary-button decision-button" id="dual-guide-button" type="button">
          <span>Not yet</span>
          <small>Guide me through it</small>
        </button>
        <button class="primary-button decision-button" id="dual-skip-button" type="button">
          <span>Skip</span>
          <small>I’ll migrate directly</small>
        </button>
      </div>
      <button class="text-button" id="back-button" type="button">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
        Back to current setup
      </button>
    `,
    '<div class="step-label" aria-label="Current step">Transition strategy <span>02</span></div>',
  );

  document.querySelector('#back-button').addEventListener('click', showAgentQuestion);
  document
    .querySelector('#dual-enabled-button')
    .addEventListener('click', () => showNextMigrationStep('dual'));
  document.querySelector('#dual-guide-button').addEventListener('click', showDualSignalGuide);
  document
    .querySelector('#dual-skip-button')
    .addEventListener('click', () => showNextMigrationStep('direct'));
  focusCard();
}

function showDualSignalGuide() {
  app.innerHTML = shell(
    `
      <section class="question-card ready-card" aria-labelledby="dual-guide-title" tabindex="-1">
        <span class="eyebrow">Optional setup</span>
        <h1 id="dual-guide-title">Run both signals while you prepare.</h1>
        <p>
          Follow Splunk’s
          <a href="${dualSignalDocsUrl}" target="_blank" rel="noopener noreferrer">dual-signal mode guide</a>
          to emit AppDynamics and OpenTelemetry data side by side. When it’s ready,
          return here and continue.
        </p>
        <div class="callout">
          <span aria-hidden="true">i</span>
          <p>Dual-signal mode is helpful during a transition, but it isn’t required.</p>
        </div>
      </section>
      <div class="actions actions-split outcome-actions">
        <button class="secondary-button" id="back-button" type="button">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
          Back
        </button>
        <button class="primary-button" id="dual-ready-button" type="button">
          It’s enabled
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
        </button>
      </div>
      <button class="text-button" id="continue-direct-button" type="button">
        Continue without dual-signal mode
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
      </button>
    `,
    '<div class="step-label" aria-label="Current step">Dual-signal setup <span>02</span></div>',
  );

  document.querySelector('#back-button').addEventListener('click', showAgentPath);
  document
    .querySelector('#dual-ready-button')
    .addEventListener('click', () => showNextMigrationStep('dual'));
  document
    .querySelector('#continue-direct-button')
    .addEventListener('click', () => showNextMigrationStep('direct'));
  focusCard();
}

function showNextMigrationStep(strategy) {
  const isDualSignal = strategy === 'dual';
  const eyebrow = isDualSignal ? 'Dual-signal mode active' : 'Direct migration selected';
  const title = isDualSignal ? 'Side-by-side telemetry is ready.' : 'Straight to the migration.';
  const description = isDualSignal
    ? 'You can keep both data streams running while you validate the OpenTelemetry experience.'
    : 'We’ll continue without a dual-signal transition and focus on the direct migration path.';

  app.innerHTML = shell(
    `
      <section class="question-card ready-card" aria-labelledby="next-step-title" tabindex="-1">
        <span class="eyebrow">${eyebrow}</span>
        <h1 id="next-step-title">${title}</h1>
        <p>${description}</p>
        <div class="callout">
          <span aria-hidden="true">i</span>
          <p>The next migration question will be added in the next iteration.</p>
        </div>
      </section>
      <div class="actions actions-split">
        <button class="secondary-button" id="back-button" type="button">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
          Back
        </button>
        <button class="primary-button" type="button" disabled>Adventure onward</button>
      </div>
    `,
    '<div class="step-label" aria-label="Current step">Migration details <span>03</span></div>',
  );

  document.querySelector('#back-button').addEventListener('click', showAgentPath);
  focusCard();
}

splash();

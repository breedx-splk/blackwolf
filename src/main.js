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

function shell(content, step = '') {
  return `
    <main class="app-shell">
      <div class="aurora aurora-one" aria-hidden="true"></div>
      <div class="aurora aurora-two" aria-hidden="true"></div>
      <header class="brand" aria-label="Blackwolf">
        ${wizardMark}
        <div class="brand-copy">
          <span class="brand-name">blackwolf</span>
          <span class="tagline">AppD agent migration helper</span>
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
        Blackwolf guides you through migrating supported AppDynamics agent
        configuration to Splunk OpenTelemetry agents—one clear question at a time.
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
        Begin migration
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
      </button>
    </div>
  `);

  document.querySelector('#begin-button').addEventListener('click', showReadyScreen);
}

function showReadyScreen() {
  app.innerHTML = shell(
    `
      <section class="question-card ready-card" aria-labelledby="ready-title">
        <span class="eyebrow">Before we begin</span>
        <h1 id="ready-title">Let’s get oriented.</h1>
        <p>
          Next, Blackwolf will ask about your current AppDynamics agents and the
          configuration you want to carry forward. You won’t need to change anything yet.
        </p>
        <div class="callout">
          <span aria-hidden="true">i</span>
          <p>The guided migration questions will be added in the next iteration.</p>
        </div>
      </section>
      <div class="actions actions-split">
        <button class="secondary-button" id="back-button" type="button">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
          Back
        </button>
        <button class="primary-button" type="button" disabled>Start assessment</button>
      </div>
    `,
    '<div class="step-label" aria-label="Current step">Introduction <span>01</span></div>',
  );

  document.querySelector('#back-button').addEventListener('click', splash);
  document.querySelector('.question-card').focus({ preventScroll: true });
}

splash();

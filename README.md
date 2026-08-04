# blackwolf

An AppDynamics-to-Splunk OpenTelemetry agent migration helper.

## Run locally

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the local development server:

   ```sh
   npm run dev
   ```

   Vite will print the local URL (normally <http://localhost:5173>). Changes are
   reflected in the browser automatically.

## Production build

```sh
npm run build
npm run preview
```

The static site is written to `dist/`. Asset paths are relative so the build can
be hosted from a GitHub Pages project subpath such as `/blackwolf/`.

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds and publishes the
site whenever a commit lands on `main`. In the GitHub repository settings, set
**Pages → Build and deployment → Source** to **GitHub Actions** once before the
first deployment.

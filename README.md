# Arctic Environmental and Engineering Data + Design Support System

## Build Setup

Requires Node 24 (see `.nvmrc`; `nvm use` picks it up). Built with Nuxt 4.

```bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# for local development, you can bypass the API and use hardcoded mock data:
export MOCK_API=True # don't do this before a deploy!
npm run dev

# you can modify the upstream locations of the API / rasdaman servers
export SNAP_API_URL=http://localhost:5000
export RASDAMAN_URL=https://apollo.snap.uaf.edu/rasdaman/ows
npm run dev

# generate the static site into .output/public/ (with a dist symlink
# for compatibility) -- double-check all env vars before doing this.
npm run generate

# preview the generated site locally
npm run preview
```

Environment variables are read at build/generate time, so set them before
running `npm run generate`. `MOCK_API` and `EDS_SAFE_MODE` are
treated as booleans: any non-empty value turns them on.

### Playwright tests

To run the Playwright tests for this webapp, set any necessary environment variables, then run the webapp:

```
npm run dev
```

Make sure the local webapp is running as expected. Then, in another terminal window, run the following

```
npx playwright install # Install Playwright browsers
npx playwright test --ui
```

`npm test` runs the same suite headlessly.

Note that, due to intermittent timeouts from computationally-expensive Data API requests, especially if you are running this webapp locally against an uncached local Data API, it's very possible that some of the Playwright tests will fail even if there is nothing wrong with the code. This happens maybe ~25% of the time. If a test fails, remember that you can run the test over again individually without re-running the full suite of tests.

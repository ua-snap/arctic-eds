# Arctic Environmental and Engineering Data + Design Support System

## Build Setup

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

# build for production and launch server
npm run build
npm run start

# generate static project -- double-check all env vars before doing this.
npm run generate
```

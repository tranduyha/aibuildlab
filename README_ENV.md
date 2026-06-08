# Environment Files

Use `.env.local` for local secrets. Do not commit real API keys.

## Recommended Files

```txt
.env.example
.env.local
```

Rules:

1. Keep `.env.example` committed with empty placeholder values.
2. Copy `.env.example` to `.env.local`.
3. Put real local keys only in `.env.local`.
4. Ensure `.env.local` remains ignored by Git.
5. Never place real keys in docs, code, or sample files.

## Current Optional Keys

```txt
PEXELS_API_KEY
```

Used by:

```sh
npm run images:fetch
```

## Image Source Rules

Allowed image sources:

- Project-created images.
- Pexels API.
- Unsplash API.
- Wikimedia Commons API.
- eBay Browse API.
- Official affiliate/product feeds.
- Official press/media kits when the terms allow reuse.

Do not download images from Google Images.

Every downloaded image must have metadata in:

```txt
data/images/image-manifest.json
```


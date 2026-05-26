# AI Build Lab

Next.js starter organized after the layering pattern used by `anthupc`, with local
JSON files replacing the CMS/data API layer for now.

## Development

```sh
npm install
npm run dev
```

Open `http://localhost:3000`.

## Organization

- `app/(frontend)`: route group and frontend layouts/pages.
- `components`: reusable presentation components.
- `data`: JSON content used as the initial data source.
- `repositories`: reads and queries JSON data.
- `services`: application-facing use cases.
- `types`: shared domain types.
- `lib`: shared configuration and formatting helpers.

## Data boundary

Pages and components do not import JSON files directly. New data access should be
implemented through repositories and exposed through services:

```text
data/*.json -> repositories/* -> services/* -> app/components
```

Payload CMS is intentionally not included in this initial structure.

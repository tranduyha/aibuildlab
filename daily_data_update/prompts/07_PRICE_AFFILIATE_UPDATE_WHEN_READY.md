# 07 — Price and affiliate update when ready

Use this only after approved product/affiliate APIs or feeds exist.

Allowed examples:

- Amazon Product Advertising API
- eBay Browse API
- Newegg/B&H affiliate feeds
- official affiliate/product feed
- timestamped manual snapshot if explicitly allowed

Do not scrape random listings.
Do not use marketplace listings as primary hardware specs sources.

Output candidates to:

```txt
data/update-candidates/price-candidates.json
data/update-candidates/affiliate-product-candidates.json
```

Production price fields require timestamp, region, currency, source, and lastVerifiedAt.

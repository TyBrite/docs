# Galactic Core documentation

The public documentation for **Galactic Core** — programmable commerce infrastructure. Catalog,
cart, checkout, payments, tax, inventory, double-entry accounting, search, recommendations,
promotions, gift cards, returns, messaging, content and analytics, through one REST API and a typed
TypeScript SDK.

Published at **[docs.tybritelabs.com](https://docs.tybritelabs.com)**.

## The platform

| | |
|---|---|
| **[docs.tybritelabs.com](https://docs.tybritelabs.com)** | This documentation — guides, API reference, SDK reference and workflow examples |
| **[gc.tybritelabs.com](https://gc.tybritelabs.com)** | Galactic Core — sign in, manage a store, create API keys |
| **[anvil.tybritelabs.com](https://anvil.tybritelabs.com)** | Anvil — an autonomous storefront studio that builds a production storefront wired to a Galactic Core store |
| **[status.tybritelabs.com](https://status.tybritelabs.com)** | Live API status and incident history |
| **[@tybrite-labs/sdk](https://www.npmjs.com/package/@tybrite-labs/sdk)** | The TypeScript SDK on npm |
| **[api.tybritelabs.com/v1](https://api.tybritelabs.com/v1/health)** | The API itself — every endpoint is served under `/v1` |

## The API

**147 operations across 126 paths**, grouped into 29 services. The full specification is
[`openapi.yaml`](./openapi.yaml) in this repository, and the reference is generated from it.

**Commerce core** — Products (9), Taxonomy (4), Pricing (3), Cart & Wishlist (10), Orders (5),
Customers (7), Payments (3), Shipping (3), Promotions (4), Gift Cards (2), Tax (1)

**Discovery** — Search (3), Recommendations (1), Discovery (3), Events (1), Analytics (1)

**Post-purchase and support** — Returns (7), Reviews (5), Messaging (10), Disputes (6)

**Selling models** — Marketplace (7), B2B wholesale (12)

**Platform and integration** — Authentication (9), Webhooks (9), Ingestion (5), GC Connect (5),
CMS (5), Sandbox (4), System (3)

Every operation is reachable through the SDK as `client.<service>.<method>`.

## Quick start

```bash
npm install @tybrite-labs/sdk
```

```typescript
import { Tybrite } from '@tybrite-labs/sdk';

const client = new Tybrite({ apiKey: 'tybrite_pk_live_...' });

const { products } = await client.products.listProducts({ limit: 10 });
```

The SDK targets `https://api.tybritelabs.com` and prefixes `/v1` for you; calling the API directly, a
request looks like `GET https://api.tybritelabs.com/v1/products` with the key as a bearer token.

`GET /v1/health` needs no key, so it answers whether the API is reachable before anything else is
configured:

```bash
curl https://api.tybritelabs.com/v1/health
```

The same call runs in the browser from the
[health check reference](https://docs.tybritelabs.com/api-reference/system/health-check?playground=open),
where every endpoint can be tried against a real key.

Publishable keys (`pk`) are safe in a browser and cover reads plus the writes a shopper makes on
their own behalf. Secret keys (`sk`) are server-side only. Both have sandbox counterparts (`test`)
against isolated data. See
[Authentication](https://docs.tybritelabs.com/authentication).

## Questions this documentation answers

**Is Galactic Core for me?** It runs the commerce behind four kinds of business: a merchant selling
direct, a wholesaler whose buyers negotiate, an operator running a marketplace of many sellers, and an
agency or software company whose own customers are merchants.
[Deployment Modes](https://docs.tybritelabs.com/modes) covers what each one turns on.

**What do I have to build?** The storefront. Catalog, cart, checkout, payments, tax, inventory,
accounting, search, returns and analytics are the platform's side. One call places an order, and
stock, gift cards, the ledger and customer history update with it.

**Can I use my own front end?** Yes — web, mobile, an Anvil-built storefront, or a backend service.
The API is the contract; nothing assumes a particular client.

**Does it work with my payment processor?** Stripe, PayPal, Paystack and M-Pesa are built in, and any
other processor connects through an extension.
[Native Integrations](https://docs.tybritelabs.com/integrations) lists every provider by capability.

**Can I try it without touching real data?** Every key has a sandbox counterpart — the same key with
`test` in place of `live` — against isolated data, with time travel and webhook replay for testing.

**What happens when something fails?** Errors share one shape — `{ error: { code, message } }` — across
every endpoint. Order creation is idempotent, so a retried request cannot double-charge, and partial
failures after a successful order surface as `post_processing_warnings` rather than being swallowed.

**Who decides the price?** The server. Checkout recomputes every item price from the live catalog and
validates discounts against real entitlements, so a tampered payload is rejected rather than honoured.

## Conventions that hold everywhere

Learning these once covers every endpoint:

- **Keys** — a publishable key (`pk`) is safe in a browser; a secret key (`sk`) is server-side only,
  and `test` variants hit sandbox data. The prefix is the operator's: `tybrite_pk_live_*` on the
  platform, and an agency's own — `acme_pk_live_*` — for merchants on
  [an agency](https://docs.tybritelabs.com/agencies). Read the `pk`/`sk` and `live`/`test` segments
  rather than matching the whole string
- **Errors** — always `{ error: { code, message } }`, with `400` for a bad request, `401` for a bad key,
  `403` for the wrong key type, `404` for a missing resource, `409` for a conflict, `429` when
  throttled
- **Pagination** — cursor-based: feed `pagination.next_cursor` back as `cursor` rather than computing
  offsets
- **Sparse fields** — `fields=` trims a response to what a page actually renders
- **Idempotency** — an `Idempotency-Key` on order creation makes a retry safe
- **Money** — prices are decimal major units, and the currency rides on every priced response rather
  than being assumed

[Core Concepts](https://docs.tybritelabs.com/concepts) covers each in full.

## What is documented here

- **Getting started** — quickstart, core concepts, deployment modes, authentication, sandbox
- **How GC works** — request lifecycle, caching, data model, scaling and reliability, marketplaces at
  scale, security, guardrails
- **Build with AI** — Anvil, the in-app builder, and agentic commerce
- **Extend the platform** — custom extensions, bring-your-own compute, webhooks, catalog ingestion
- **Commerce capabilities** — accounting, tax, currency, advertising
- **Distribute** — GC Connect, agencies
- **Native integrations** — payment processors, ad platforms, catalog channels, shipping, accounting,
  messaging and tax providers
- **API reference** — every endpoint, generated from the specification
- **TypeScript SDK** — a page per service, with examples
- **Workflow examples** — complete flows: storefront checkout, search and discovery, returning
  customers, reviews and messaging, marketplace, catalog sync, webhook automation

## Working on the docs

```bash
npm i -g mint     # install the CLI
mint dev          # preview at localhost:3000
mint broken-links # check links before opening a pull request
```

Pages are MDX; navigation is configured in [`docs.json`](./docs.json). Changes merged to `main` deploy
automatically.

**Two directories are generated and must not be hand-edited:** `openapi.yaml` and `sdk-source/` are
produced upstream and copied in, so a local change is overwritten on the next sync.

## Contributing

Issues and pull requests are welcome — corrections, clearer examples, and gaps you hit while building
are all useful. See [CONTRIBUTING.md](./CONTRIBUTING.md).

For questions about using the platform rather than the documentation,
[docs.tybritelabs.com](https://docs.tybritelabs.com) is the place to start, and
[status.tybritelabs.com](https://status.tybritelabs.com) reports current API health.

---

Galactic Core and Anvil are built by **Tybrite Labs** (Tybrite Technologies Limited).

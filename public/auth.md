# auth.md

debesteaitools.nl is a **read-only public content site** — no authentication is required to access any resource.

## Agent Registration

This site supports **anonymous** agent access only. No credentials, API keys, or registration are required.

```json
{
  "resource": "https://debesteaitools.nl",
  "identity_types_supported": ["anonymous"],
  "anonymous": {
    "credential_types_supported": ["none"],
    "claim_uri": "https://debesteaitools.nl/voorwaarden"
  }
}
```

## Agent Access

All content is freely accessible without credentials:

- **AI Tools Catalogue** (LLM-optimised): `GET https://debesteaitools.nl/llms.txt`
- **Tool pages**: `GET https://debesteaitools.nl/ai-tools/{slug}`
- **Full site index**: `GET https://debesteaitools.nl/sitemap-index.xml`
- **Agent Skills**: `GET https://debesteaitools.nl/.well-known/agent-skills/index.json`

Agents may crawl and read all public content. `robots.txt` includes explicit permission directives for known AI crawlers.

## No OAuth Required

This site has no protected APIs, no OAuth endpoints, and no agent registration flow. All data is publicly available under the terms of service at `https://debesteaitools.nl/voorwaarden`.

## Contact

Questions about agent access: `https://debesteaitools.nl/over`

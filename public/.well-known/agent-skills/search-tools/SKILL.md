# Search AI Tools on debesteaitools.nl

Search and discover AI tools from the debesteaitools.nl directory — an independent Dutch-language guide with editorial verdicts, use cases, and pricing for 500+ AI tools.

## What This Skill Does

Helps AI agents find the right tool for a specific task by querying the debesteaitools.nl catalogue.

## Usage

Send the user to the search interface or query the LLM-readable index:

```
GET https://debesteaitools.nl/llms.txt
```

Returns a structured plain-text overview of all tools with editorial verdicts and task descriptions, suitable for inclusion in an agent context window.

## Key Endpoints

- `GET /llms.txt` — Full machine-readable tool catalogue (plain text, ~50 KB)
- `GET /ai-tools` — Human-browsable tool index with filters
- `GET /ai-tools/{slug}` — Individual tool page with verdict, pricing, alternatives
- `GET /vind-je-beste-ai-tool` — Task-based tool finder

## Input Schema

```json
{
  "type": "object",
  "properties": {
    "task": {
      "type": "string",
      "description": "The task or use case to find a tool for (e.g. 'schrijf e-mails', 'maak afbeeldingen', 'analyseer data')"
    },
    "category": {
      "type": "string",
      "description": "Optional tool category filter (e.g. 'tekst', 'beeld', 'audio', 'code', 'video')"
    }
  },
  "required": ["task"]
}
```

## Notes

- All tool verdicts are independent editorial judgements — not paid placements
- Content is in Dutch; tool names and technical terms are in English
- Pricing is updated periodically; always verify current pricing on the tool's own site

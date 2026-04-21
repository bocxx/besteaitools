# AI Tools Digest

Auto-generated daily digests produced by the **newsflux** pipeline
(`src/digest/tools_digest.py`). Each digest is a Dutch summary that
renders three upstream reports:

- `src/data/reports/launch_radar.json` — tool launches (rolling 7-day window)
- `src/data/reports/tool_feature_news.json` — LLM-curated feature updates
- `src/data/reports/tutorial_candidates.json` — deep-dive candidates

## Regenerate manually

From the newsflux repo:

```bash
python3 src/digest/tools_digest.py              # Default: 1 LLM call + hero image
python3 src/digest/tools_digest.py --no-llm     # Template-only
python3 src/digest/tools_digest.py --no-images  # Skip Leonardo hero
python3 src/digest/tools_digest.py --preview    # Stdout only
```

Or via the pipeline CLI:

```bash
python3 run.py tools-digest
python3 run.py tools-digest --no-images --no-llm
```

The digest stage also runs automatically inside `python3 run.py full`
after `stage_tools()` has refreshed the reports above.

## Schema

See `src/content.config.ts` → `digest` collection.

## Do not hand-edit

Files in this directory are overwritten each run. Hand-written articles
belong in `src/content/nieuws/` instead.

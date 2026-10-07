#!/usr/bin/env bash
# diorama-import.sh — importeer een al gemaakt hero-beeld (bijv. uit de
# ElevenLabs-connector) zonder API-call: cover-crop naar 1216×752, webp,
# frontmatter (heroImage/heroImageAlt) en generatie-log.
#   npm run images:import -- <slug> <pad/naar/beeld.png>
set -euo pipefail
if [[ $# -lt 2 ]]; then
  echo "Gebruik: npm run images:import -- <slug> <pad/naar/beeld>" >&2
  exit 1
fi
SLUG="$1"; SRC="$2"; shift 2
exec bash "$(dirname "${BASH_SOURCE[0]}")/diorama.sh" --slug "$SLUG" --import "$SRC" "$@"

#!/usr/bin/env bash
# diorama.sh — self-contained wrapper rond scripts/generate-diorama.py.
#
# Verzorgt alles wat de generator nodig heeft, zodat je nooit een pad naar
# newsflux of een handmatige venv-setup hoeft te onthouden:
#
#   1. sourcet ./.env (voor LEONARDO_API_KEY)
#   2. maakt ./venv aan + installeert scripts/requirements.txt bij de
#      eerste run (idempotent — daarna meteen door)
#   3. roept generate-diorama.py aan met alle doorgegeven flags
#
# Gebruik (meestal via npm):
#   npm run images:generate            # alle ontbrekende heroes
#   npm run images:one -- <slug>       # één artikel
#   npm run images:preview -- <slug>   # prompt tonen, geen API-call
#   npm run images:regen -- <slug>     # forceer opnieuw genereren
#
# Of direct:
#   scripts/diorama.sh --all
#   scripts/diorama.sh --slug <slug> --force --dry-run

set -euo pipefail

# ── Paden ───────────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
VENV="$ROOT/venv"
PY="$VENV/bin/python"
REQ="$SCRIPT_DIR/requirements.txt"
GEN="$SCRIPT_DIR/generate-diorama.py"

# ── 1. Env laden ────────────────────────────────────────────────────────────
if [[ -f "$ROOT/.env" ]]; then
  while IFS= read -r line; do
    [[ "$line" =~ ^LEONARDO_ ]] && export "$line"
  done < "$ROOT/.env"
fi

# --dry-run heeft geen key nodig; check alleen bij echte generatie.
if [[ -z "${LEONARDO_API_KEY:-}" && ! " $* " == *" --dry-run "* ]]; then
  echo "❌ LEONARDO_API_KEY niet gevonden." >&2
  echo "   Zet 'm in $ROOT/.env  (zie .env.example → Leonardo-blok)." >&2
  echo "   Of draai met --dry-run om alleen de prompt te previewen." >&2
  exit 1
fi

# ── 2. Venv bootstrappen (alleen eerste keer) ───────────────────────────────
PYBIN="$(command -v python3 || command -v python || true)"
if [[ -z "$PYBIN" ]]; then
  echo "❌ Geen python3 gevonden op dit systeem." >&2
  exit 1
fi

# Venv geldig als python draait én requests/Pillow importeerbaar zijn.
# Anders (ontbrekend, half-gebouwd, of van een ander OS) opnieuw bouwen.
venv_ok() {
  [[ -x "$PY" ]] && "$PY" -c "import requests, PIL" >/dev/null 2>&1
}

if ! venv_ok; then
  echo "🧰 Venv (her)opbouwen in $VENV …" >&2
  rm -rf "$VENV"
  "$PYBIN" -m venv "$VENV"
  "$PY" -m pip install --quiet --upgrade pip
  "$PY" -m pip install --quiet -r "$REQ"
  venv_ok || { echo "❌ Venv-setup mislukt. Check python3 + netwerk." >&2; exit 1; }
  echo "✓ Venv klaar." >&2
fi

# ── 3. Generator draaien ────────────────────────────────────────────────────
exec "$PY" "$GEN" "$@"

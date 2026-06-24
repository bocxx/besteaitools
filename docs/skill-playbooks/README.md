# Skill-playbooks (kopie in de repo)

Dit zijn **kopieën** van de `references/`-bestanden uit de skill-bundle, hierheen
gespiegeld zodat ze ook gelezen worden als de skill níet geladen is (bijv. een
agent die direct in de repo werkt). De skill-bundle blijft het werkende origineel
voor de runtime; dit is het lees-spoor in de repo.

## Bron

- Skill-repo: `/Users/nerd/Projects/claude-skills`
- Gespiegeld vanaf commit `98550de` (24 juni 2026)
- Mappen 1-op-1 = de skillnaam:
  - `dbat-nieuws-tutorial/` → tutorial-skill voor debesteaitools.nl
    (article-template, cross-domain, evergreen, fact-check, frontmatter,
    link-map, seo, style-guide, topic-discovery)

> De **hln-nieuws-article**- en **hln-social-posts**-playbooks beschrijven de
> zustersite **hetlaatsteainieuws.nl** en staan daarom in díe repo
> (`../../hetlaatsteainieuws-v2/docs/skill-playbooks/`), niet hier.

## ⚠️ Twee bronnen = driftrisico

Deze map is een **kopie**, geen single source of truth. Wijzig je een playbook in
de skill-bundle, **werk dan hier dezelfde wijziging bij** (en andersom). Hersync de
hele set met:

```sh
SRC=/Users/nerd/Projects/claude-skills
DST=docs/skill-playbooks
for s in dbat-nieuws-tutorial; do
  cp "$SRC/$s/references/"*.md "$DST/$s/"
done
```

Loopt de inhoud uiteen, dan is de **skill-bundle leidend** (dat is wat de runtime
daadwerkelijk uitvoert).

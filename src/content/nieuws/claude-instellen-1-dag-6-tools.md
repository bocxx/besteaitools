---
title: "Claude in één dag instellen: zes tools die hem laten werken als een collega"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Claude in één dag instellen: zes tools die hem laten werken als een collega'"
description: "Claude instellen voelt overweldigend tot je weet hoe je het stap voor stap doet. Zo richt je Claude Cowork in één dag in: zes tools, één checklist."
publishedAt: 2026-05-04
updatedAt: 2026-05-04
author: "Redactie"
category: "gids"
tags:
  - "claude"
  - "cowork"
  - "claude-projects"
  - "ruben-hassid"
  - "ai-setup"
  - "productiviteit"
  - "mkb"
toolSlug: "claude-cowork"
featured: true
readingTime: 12
keyTakeaways:
  - "Claude in één dag goed inrichten kost ongeveer twee tot vier uur, verdeeld over zes concrete bouwstenen — van een werkmap met brain file tot connectoren naar je apps."
  - "De kern: zonder structurele context begint Claude elk gesprek opnieuw. Met een vaste werkmap, een 'about-me'-bestand en de juiste connectoren krijg je een assistent die jou kent."
  - "Cowork is de centrale tool: een werkmap op je computer, een brain file met jouw context, en de discipline om Claude eerst te laten lezen voor hij iets doet."
  - "Voor teams blijft Projects op claude.ai een nuttige tweede route — gedeelde context en blijvende instructies per project, zonder lokale bestanden."
  - "Eén dag investering levert wekelijks uren op: Claude hoeft niet telkens opnieuw te leren wie je bent, wat je doet en hoe je schrijft."
faq:
  - q: "Hoe stel ik Claude in voor dagelijks gebruik?"
    a: "Begin met de Claude-desktopapp via claude.com/download en activeer Cowork. Maak één werkmap aan, plaats daarin een markdown-bestand `about-me.md` met wie je bent, wat je doet en hoe je werkt. Start elk gesprek met de instructie dat Claude eerst die map moet lezen voor hij iets uitvoert. Dat is de basis; connectoren, templates en skills bouw je daarna laag voor laag op."
  - q: "Wat is een brain file in Claude Cowork?"
    a: "Een brain file is een gewoon markdown-bestand — bijvoorbeeld about-me.md — waarin je alles zet wat Claude over jou moet weten: je beroep, je toon, je vakgebied, je terugkerende taken, je deadlines. Door dat bestand in een Cowork-werkmap te plaatsen en Claude te vragen het eerst te lezen, krijgt elk gesprek dezelfde startcontext. Je hoeft jezelf nooit meer opnieuw uit te leggen."
  - q: "Heb ik Claude Pro of Max nodig om Cowork te gebruiken?"
    a: "Voor Cowork wel — die feature draait alleen op betaalde plannen (Pro, Max, Team, Enterprise) op macOS of Windows. Projects via claude.ai werkt ook op het gratis abonnementsniveau, maar daar mis je de bestanden- en bash-toegang die Cowork zo krachtig maken. Wie serieus met deze setup wil werken, komt al snel uit op minimaal Pro."
  - q: "Wat is het verschil tussen Claude Cowork en Claude Projects?"
    a: "Cowork draait in de desktop-app en geeft Claude toegang tot een lokale werkmap, shell-commando's en connectoren. Projects draait in de browser op claude.ai en bewaart alleen instructies en geüploade bestanden. Voor solowerk is Cowork sneller en krachtiger. Voor teams die context willen delen, blijft Projects vaak praktischer omdat je het via een link kunt delen."
  - q: "Wat doe ik als Claude mijn brain file niet leest?"
    a: "Negen van de tien problemen zitten in één van drie dingen. Een: staat about-me.md in de exacte Cowork-werkmap die je hebt geselecteerd, en niet in een submap? Twee: heet het bestand letterlijk 'about-me.md' met kleine letters en de juiste .md-extensie? Drie: heb je je vaste startprompt gebruikt waarin je Claude expliciet vraagt eerst de bestanden te lezen voor hij iets doet? Lukt het na controle nog niet, dan helpt het opnieuw selecteren van de werkmap in de Cowork-instellingen meestal direct."
heroImage: "/images/articles/diorama-claude-instellen-1-dag-6-tools.webp"
---

Claude instellen voelt voor veel mensen overweldigend — je downloadt de app, je begint te chatten, en het stopt daar. Maar wie het stap voor stap aanpakt en zes simpele bouwstenen op de juiste plek zet, heeft geen chatbot meer; die heeft een digitale collega die jou kent. Hieronder loop je elke bouwsteen langs, met per stap precies wat je moet doen, in welke volgorde, en wat je daarna op je scherm zou moeten zien.

> **💡 Beginner-tip:** Nog nooit met Claude gewerkt? Begin dan eerst bij onze [vergelijking tussen Claude en ChatGPT](/nieuws/claude-vs-chatgpt-vergelijking-2026) om te zien of Claude bij jou past. Dit artikel gaat ervan uit dat je al een betaald abonnement hebt of overweegt.

<style>
.viz-tl{--tl-blue:var(--primary-bright);--tl-blue-soft:color-mix(in oklch,var(--primary-bright) 35%,transparent);--tl-ink:var(--text-primary);--tl-muted:var(--text-muted);--tl-line:4px;--tl-bg:var(--bg-surface);background:var(--tl-bg);border:1px solid var(--border-subtle);border-radius:16px;padding:clamp(32px,5vw,56px) clamp(20px,3vw,40px);margin:32px 0;font-family:var(--font-body);color:var(--tl-ink)}
.viz-tl-head{margin-bottom:clamp(40px,6vw,72px);max-width:720px}
.viz-tl-eyebrow{font-size:.75rem;letter-spacing:.18em;text-transform:uppercase;color:var(--tl-blue);font-weight:600;margin-bottom:8px;display:inline-flex;align-items:center;gap:12px}
.viz-tl-eyebrow::before{content:"";width:32px;height:var(--tl-line);background:var(--tl-blue);border-radius:999px}
.viz-tl-title{font-size:clamp(1.5rem,2.4vw,2rem);font-weight:600;letter-spacing:-.02em;line-height:1.2;margin:0}
.viz-tl-line{position:relative;display:grid;grid-template-columns:repeat(6,1fr);gap:clamp(8px,1.5vw,24px);padding:clamp(60px,8vw,96px) 0 0;list-style:none;margin:0}
.viz-tl-line::before{content:"";position:absolute;left:0;right:0;top:calc(clamp(60px,8vw,96px) + 28px);height:var(--tl-line);background:var(--tl-blue-soft);border-radius:999px;z-index:0}
.viz-tl-line::after{content:"";position:absolute;top:calc(clamp(60px,8vw,96px) + 22px);left:-6px;width:16px;height:16px;border:var(--tl-line) solid var(--tl-blue-soft);border-radius:999px;background:var(--tl-bg);box-sizing:border-box;z-index:1}
.viz-tl-step{position:relative;display:grid;grid-template-rows:1fr 56px 1fr;text-align:center;z-index:2}
.viz-tl-step-head{align-self:end;padding-bottom:20px;display:flex;flex-direction:column;align-items:center;gap:8px}
.viz-tl-step-head::after{content:"";width:var(--tl-line);height:18px;background:var(--tl-blue-soft);border-radius:999px;margin-top:6px}
.viz-tl-step-eye{font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;color:var(--tl-blue);font-weight:600}
.viz-tl-step-title{font-size:clamp(.9rem,1.1vw,1.05rem);font-weight:600;letter-spacing:-.01em;line-height:1.3;max-width:180px}
.viz-tl-step-circle{width:56px;height:56px;border-radius:999px;background:var(--tl-bg);border:var(--tl-line) solid var(--tl-blue);color:var(--tl-blue);display:grid;place-items:center;font-size:1.25rem;font-weight:600;margin:0 auto}
.viz-tl-step-body{padding-top:20px;display:flex;justify-content:center}
.viz-tl-step-desc{font-size:.88rem;line-height:1.5;color:var(--tl-muted);max-width:200px;margin:0}
@media (max-width:900px){
  .viz-tl-line{grid-template-columns:1fr;padding-top:0;gap:32px}
  .viz-tl-line::before{top:0;bottom:0;left:28px;right:auto;width:var(--tl-line);height:auto}
  .viz-tl-line::after{display:none}
  .viz-tl-step{grid-template-rows:none;grid-template-columns:56px 1fr;text-align:left;gap:20px;align-items:start}
  .viz-tl-step-head{order:2;align-self:start;padding:0;align-items:flex-start;gap:4px}
  .viz-tl-step-head::after{display:none}
  .viz-tl-step-title{max-width:none}
  .viz-tl-step-circle{grid-row:1 / span 2}
  .viz-tl-step-body{grid-column:2;padding:0;justify-content:flex-start}
  .viz-tl-step-desc{max-width:none;text-align:left}
}
</style>

<figure class="viz-tl" aria-labelledby="viz-tl-title">
  <header class="viz-tl-head">
    <div class="viz-tl-eyebrow">Onboarding · 6 stappen</div>
    <h2 id="viz-tl-title" class="viz-tl-title">Van leeg account naar werkende setup</h2>
  </header>
  <ol class="viz-tl-line" aria-label="Tijdlijn van zes stappen">
    <li class="viz-tl-step"><div class="viz-tl-step-head"><div class="viz-tl-step-eye">Stap 01</div><div class="viz-tl-step-title">Cowork + brain file</div></div><div class="viz-tl-step-circle" aria-hidden="true">1</div><div class="viz-tl-step-body"><p class="viz-tl-step-desc">Werkmap aanmaken en about-me.md plaatsen.</p></div></li>
    <li class="viz-tl-step"><div class="viz-tl-step-head"><div class="viz-tl-step-eye">Stap 02</div><div class="viz-tl-step-title">Outputs- en templates-mappen</div></div><div class="viz-tl-step-circle" aria-hidden="true">2</div><div class="viz-tl-step-body"><p class="viz-tl-step-desc">Submappen voor structuur en herbruikbare voorbeelden.</p></div></li>
    <li class="viz-tl-step"><div class="viz-tl-step-head"><div class="viz-tl-step-eye">Stap 03</div><div class="viz-tl-step-title">Connectoren</div></div><div class="viz-tl-step-circle" aria-hidden="true">3</div><div class="viz-tl-step-body"><p class="viz-tl-step-desc">Eén connector activeren — meestal Gmail of Drive.</p></div></li>
    <li class="viz-tl-step"><div class="viz-tl-step-head"><div class="viz-tl-step-eye">Stap 04</div><div class="viz-tl-step-title">Skills en plugins</div></div><div class="viz-tl-step-circle" aria-hidden="true">4</div><div class="viz-tl-step-body"><p class="viz-tl-step-desc">Skills schrijven voor terugkerende taken.</p></div></li>
    <li class="viz-tl-step"><div class="viz-tl-step-head"><div class="viz-tl-step-eye">Stap 05</div><div class="viz-tl-step-title">Vaste startprompt</div></div><div class="viz-tl-step-circle" aria-hidden="true">5</div><div class="viz-tl-step-body"><p class="viz-tl-step-desc">Eén openingsprompt op een sticky note.</p></div></li>
    <li class="viz-tl-step"><div class="viz-tl-step-head"><div class="viz-tl-step-eye">Stap 06</div><div class="viz-tl-step-title">Projects voor teams</div></div><div class="viz-tl-step-circle" aria-hidden="true">6</div><div class="viz-tl-step-body"><p class="viz-tl-step-desc">Project op claude.ai voor wie deelt met collega's.</p></div></li>
  </ol>
</figure>

## Waarom de meeste mensen Claude onderbenutten

De vraag is bijna altijd dezelfde: "Het werkt prima, maar ik moet elke keer opnieuw uitleggen wie ik ben en wat ik doe." Dat is geen Claude-probleem. Dat is een setup-probleem.

Stel je voor dat je elke ochtend een nieuwe stagiair krijgt. Slim, behulpzaam, leergierig — en zonder geheugen. Je legt uit wie je bent, wat je bedrijf doet, hoe je e-mails schrijft, welke klanten gevoelig liggen. Tegen lunchtijd is hij goed op stoom. Volgende dag: nieuwe stagiair, alles opnieuw. Dat is exact hoe de meeste mensen Claude gebruiken.

De diagnose is simpel: zonder structurele context werkt Claude bij elk gesprek vanaf nul. Geen geheugen, geen toon, geen werkstroom. Met een paar uur opzet verandert dat fundamenteel. Zodra Claude jouw bestanden, context en connectoren kent, voelt het minder als een chatbot en meer als een collega.

Eerlijk: de eerste keer dat we [Claude Cowork](/nieuws/claude-cowork-lancering) inrichtten, dachten we dat het overkill was voor solowerk. Pas na een week werd duidelijk hoeveel kleine herhalingen je elimineert — en dat is precies waar deze aanpak op leunt.

## Wat heb je nodig voor je begint?

Voordat je de eerste stap zet, drie praktische voorwaarden:

1. **Een betaald Claude-abonnement.** Cowork werkt alleen op Pro (vanaf 20 dollar per maand), Max, Team of Enterprise. De gratis versie heeft het niet. Heb je nog niets? Dan is Pro de logische start.
2. **Een Mac of Windows-pc.** Cowork draait sinds februari 2026 op beide besturingssystemen. Een Linux-versie staat nog niet op de roadmap.
3. **Ongeveer twee tot vier uur, verspreid over een dag.** Niet aan één stuk; veel stappen werken beter als je er even tussen weggaat en terugkomt om te beoordelen of het klopt.

Verder is geen technische voorkennis nodig. Je hoeft niet te kunnen programmeren, geen terminal te openen, en geen instellingen-bestanden te bewerken. Alles gebeurt via klikken en het invullen van een tekstbestand.

## Het jargon dat je gaat tegenkomen

Vier termen die in dit artikel telkens terugkomen — even kort uitgelegd zodat je niet hoeft te googelen:

- **Markdown** is een eenvoudig tekstformaat, te herkennen aan de extensie `.md`. Je opent het in elke teksteditor (Kladblok, TextEdit, VS Code). Geen opmaak-balkjes, geen lettertypes. Wel snel doorzoekbaar door Claude.
- **Brain file** is een populaire bijnaam voor een markdown-bestand waarin alles staat wat Claude over jou moet weten. Geen officiële Anthropic-term, wel ingeburgerd.
- **Connector** is een verbinding tussen Claude en een externe app (Gmail, Google Drive, Notion, een CRM). Eenmaal gekoppeld kan Claude data uit die app ophalen of erin schrijven.
- **Prompt** is gewoon de instructie die jij aan Claude geeft. "Schrijf een mail aan klant X" is een prompt.

Verder kom je af en toe woorden als *bash*, *shell* of *MCP* tegen — dat is technisch jargon waar je voor de basisinrichting niets mee hoeft. Voor wie wil weten wat het betekent: zie de Gevorderden-blockquotes verderop.

<!-- VIDEO-IDEE 1: 30-sec screencast — toon de mappenstructuur op Mac/Windows en open een .md-bestand in de standaardeditor. -->

## Tool 1: Cowork en je brain file

De basis. Hier zet je het fundament waar de andere vijf tools op leunen.

**Wat is het en waarom doe je het?**
Cowork is de modus binnen de Claude-desktopapp waarmee Claude een map op je computer mag lezen, bewerken en uitbreiden. De brain file in die map is jouw vaste introductie — Claude leest hem aan het begin van elk gesprek en weet daarna direct wie je bent en hoe je werkt.

**Wat je nu doet (stap voor stap):**

1. Ga naar [claude.com/download](https://claude.com/download) en download de desktopapp voor jouw besturingssysteem.
2. Installeer de app, log in met je betaalde Claude-account, en open hem.
3. In de linkerbovenhoek zie je drie tabbladen: **Chat**, **Cowork** en **Code**. Klik op **Cowork**.
4. Maak ergens op je computer een nieuwe map aan. Naam vrij — bijvoorbeeld "Claude Cowork" — als je 'm maar terug kunt vinden, op je bureaublad of in je Documents-map.
5. Selecteer die map binnen Cowork (de app vraagt erom bij eerste gebruik).
6. Open de map in Finder (Mac) of Verkenner (Windows). Maak daar een nieuw tekstbestand aan, hernoem het naar `about-me.md` (let op: kleine letters, en die `.md`-extensie aan het eind).
7. Open `about-me.md` met een eenvoudige editor en vul het in. Vier blokjes werken het best:

   - **Wie je bent**: rol, bedrijf, vakgebied, taal waarin je werkt.
   - **Wat je doet**: terugkerende taken, vaste klanten, lopende projecten.
   - **Hoe je werkt**: toon, schrijfstijl, voorkeuren in lengte en structuur.
   - **Wat je niet wilt**: jargon dat je vermijdt, frasen die je irriteren, stijlfiguren die je doodvermoeid bent.

8. Sla het bestand op. Ga terug naar Cowork.
9. Start een nieuw gesprek met deze prompt (kopieer letterlijk):

   > *"Read the files first. Then ask me questions before doing anything."*

   Vrij vertaald: lees de bestanden eerst, en stel me dan vragen voor je iets gaat doen. Deze ene zin dwingt Claude om te beginnen met begrijpen in plaats van met antwoorden.

**Resultaat:** Claude opent je `about-me.md`, leest het, en stelt je een paar vervolgvragen om de losse eindjes scherp te krijgen. Vanaf nu hoef je in dit gesprek (en in alle volgende gesprekken in deze map) nooit meer uit te leggen wie je bent.

<!-- VIDEO-IDEE 2: 60-sec screencast — installatie, Cowork-tab openen, werkmap kiezen, about-me.md aanmaken en eerste prompt verzenden. -->

> **⚡ Gevorderden:** De brain file is geen statisch document. Werk hem maandelijks bij — nieuwe klanten, veranderde stijlrichtlijnen, afgesloten projecten. Sommige gebruikers splitsen 'm in meerdere bestanden: `about-me.md`, `clients.md`, `tone-of-voice.md`, en een `anti-ai-writing-style.md` waarin je vastlegt welke AI-tells je expliciet wil vermijden. Onze gids [Klinkt jouw tekst nog als AI?](/nieuws/ai-tekst-herkennen-menselijker-schrijven) loopt die laatste in detail langs. Voor MKB'ers met meerdere petten op werkt die opsplitsing prettiger dan één lange file.

## Tool 2: Outputs- en templates-mappen voor structuur

Een werkmap is netter (en bruikbaarder voor Claude) als hij een paar vaste submappen heeft.

**Wat is het en waarom doe je het?**
Zonder structuur belandt al Claudes werk los in dezelfde map en weet je na een week niet meer welk bestand wat was. Met twee submappen voorkom je dat — én geef je Claude tegelijk concrete voorbeelden om uit te leren.

**Wat je nu doet:**

1. Open je Cowork-werkmap in Finder of Verkenner.
2. Maak twee submappen aan: `OUTPUTS` (waar Claude zijn werk neerzet) en `TEMPLATES` (jouw eigen voorbeeld-documenten).
3. Zoek twee of drie e-mails, rapporten of posts die je in het verleden goed vond — zoals jij het wilt klinken — en plak ze als losse `.md`-bestanden in `TEMPLATES`. Geen bewerking nodig; ruwe tekst is genoeg.
4. Update je `about-me.md` met één regel: *"Plaats al je output in /OUTPUTS. Gebruik /TEMPLATES als referentie voor mijn schrijfstijl."*

**Resultaat:** Claude weet nu waar dingen heen moeten, en je hebt een groeiend mapje voorbeelden waar je later naar kunt verwijzen ("schrijf in de stijl van TEMPLATES/klant-mail-juni.md").

<style>
.viz-fs{background:var(--bg-surface);border:1px solid var(--border-subtle);border-left:4px solid var(--primary-bright);border-radius:8px;padding:24px 28px;margin:32px 0;font-family:var(--font-mono);font-size:.92rem;line-height:1.7;color:var(--text-primary);overflow-x:auto}
.viz-fs pre{margin:0;font-family:inherit;background:none;padding:0;color:inherit}
.viz-fs-folder{color:var(--primary-bright);font-weight:600}
.viz-fs-file{color:var(--text-secondary)}
.viz-fs-comment{color:var(--text-muted);font-style:italic}
.viz-fs-tree{color:var(--text-muted)}
</style>

<figure class="viz-fs" aria-label="Mappenstructuur van een Claude Cowork-werkmap">
<pre><span class="viz-fs-folder">📁 Claude Cowork/</span>
<span class="viz-fs-tree">├──</span> <span class="viz-fs-file">📄 about-me.md</span>          <span class="viz-fs-comment">← jouw brain file</span>
<span class="viz-fs-tree">├──</span> <span class="viz-fs-folder">📁 OUTPUTS/</span>             <span class="viz-fs-comment">← waar Claude zijn werk neerzet</span>
<span class="viz-fs-tree">├──</span> <span class="viz-fs-folder">📁 TEMPLATES/</span>           <span class="viz-fs-comment">← jouw voorbeeld-documenten</span>
<span class="viz-fs-tree">│   ├──</span> <span class="viz-fs-file">📄 klantmail-stijl.md</span>
<span class="viz-fs-tree">│   └──</span> <span class="viz-fs-file">📄 nieuwsbrief-format.md</span>
<span class="viz-fs-tree">└──</span> <span class="viz-fs-folder">📁 SKILLS/</span>              <span class="viz-fs-comment">← optioneel, voor later</span>
<span class="viz-fs-tree">    └──</span> <span class="viz-fs-file">📄 weekrapport.md</span></pre>
</figure>

<!-- VIDEO-IDEE 3: 30-sec screencast — twee submappen aanmaken en een paar voorbeeld-bestanden er in slepen. -->

## Tool 3: Connectoren naar je apps

Hier wordt Cowork pas echt krachtig: Claude mag dingen ophalen uit en zetten in je bestaande apps.

**Wat is het en waarom doe je het?**
Een connector is een digitale brug tussen Claude en een externe app. Eenmaal gekoppeld kan Claude bijvoorbeeld een offerte uit Google Drive halen, hem aanpassen, en het resultaat terugzetten — zonder dat jij hoeft te kopiëren en plakken. De volledige lijst staat op [claude.com/connectors](https://claude.com/connectors); de meest gebruikte zijn Gmail, Google Drive, Notion, Google Calendar en CRM-systemen als HubSpot of Salesforce.

**Wat je nu doet:**

1. Open de Claude-desktopapp en ga naar **Instellingen → Connectoren** (of in het Cowork-tabblad: het rechter zijpaneel).
2. Bekijk de lijst en kies één app waarmee je dagelijks werkt en waarvan je vaak data naar Claude kopieert. Begin met één, niet vijf.
3. Klik op **Verbinden**. Je wordt naar de inlogpagina van die app gestuurd. Log in en geef toestemming voor de gevraagde rechten.
4. **Lees de gevraagde rechten goed door.** Sommige connectoren vragen alleen lezen ("Claude mag mijn mails inzien"), andere vragen schrijven ("Claude mag mails versturen namens mij"). Begin met alleen-lezen waar het kan.
5. Test de verbinding met een eenvoudige opdracht: *"Toon de drie meest recente e-mails van klant X."*

<style>
.viz-hub{background:linear-gradient(180deg,var(--bg-elevated) 0%,var(--bg-surface) 100%);border:1px solid var(--border-subtle);border-radius:16px;padding:clamp(32px,5vw,56px) clamp(20px,3vw,40px);margin:32px 0;font-family:var(--font-body);display:flex;flex-direction:column;align-items:center;gap:20px}
.viz-hub-row{display:flex;flex-wrap:wrap;justify-content:center;gap:14px}
.viz-hub-card{background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:12px;padding:14px 20px;font-size:.95rem;font-weight:500;color:var(--text-primary);display:flex;align-items:center;gap:10px}
.viz-hub-claude{background:var(--primary-bright);border:1px solid var(--primary-bright);color:var(--text-inverse);padding:22px 40px;font-size:1.4rem;font-weight:600;border-radius:16px;letter-spacing:-.01em}
.viz-hub-icon{width:24px;height:24px;display:inline-grid;place-items:center;background:color-mix(in oklch,var(--primary-bright) 16%,transparent);border-radius:6px;font-size:.85rem;color:var(--primary-bright);font-weight:700}
.viz-hub-claude .viz-hub-icon{background:color-mix(in oklch,var(--text-inverse) 22%,transparent);color:var(--text-inverse);font-size:1rem}
.viz-hub-cap{text-align:center;font-size:.85rem;color:var(--text-muted);margin-top:4px;max-width:480px}
</style>

<figure class="viz-hub" aria-label="Claude in het midden, omringd door connectoren naar veelgebruikte apps">
  <div class="viz-hub-row">
    <div class="viz-hub-card"><span class="viz-hub-icon" aria-hidden="true">G</span> Gmail</div>
    <div class="viz-hub-card"><span class="viz-hub-icon" aria-hidden="true">D</span> Google Drive</div>
    <div class="viz-hub-card"><span class="viz-hub-icon" aria-hidden="true">N</span> Notion</div>
  </div>
  <div class="viz-hub-card viz-hub-claude"><span class="viz-hub-icon" aria-hidden="true">●</span> Claude</div>
  <div class="viz-hub-row">
    <div class="viz-hub-card"><span class="viz-hub-icon" aria-hidden="true">H</span> HubSpot</div>
    <div class="viz-hub-card"><span class="viz-hub-icon" aria-hidden="true">S</span> Slack</div>
  </div>
  <div class="viz-hub-cap">De vijf meest gebruikte connectoren — claude.com/connectors heeft de volledige lijst.</div>
</figure>

**Welke connectoren als eerste?**
Voor de meeste kenniswerkers zijn dit de drie die direct waarde leveren:

- **Google Drive of OneDrive**: voor wie veel met documenten werkt.
- **Gmail of Outlook**: voor wie veel mailt.
- **Notion of een CRM**: voor wie klant- of projectinformatie centraal heeft.

> **💡 Beginner-tip:** Wees zuinig met connectoren die mogen schrijven. Een lees-connector kan hooguit data laten lekken naar het verkeerde antwoord; een schrijf-connector kan een mail versturen die je niet wilde versturen. Voor de eerste paar weken: alleen lezen, totdat je vertrouwt hoe Claude binnen jouw werk redeneert.

<!-- VIDEO-IDEE 4: 45-sec screencast — een connector toevoegen (bijv. Google Drive), inloggen, rechten goedkeuren, en een test-prompt versturen. -->

## Tool 4: Skills en plugins voor herhaaltaken

Wat je drie keer per maand op dezelfde manier doet, is een goede kandidaat om vast te leggen.

**Wat is het en waarom doe je het?**
Een skill (of plugin — de termen lopen door elkaar) is een vooraf geschreven instructieset voor één specifieke taak. In plaats van elke maandag uit te leggen *"maak een statusrapport van de Trello-kaarten van afgelopen week, gegroepeerd per stage, met opmerkingen onder elke kaart"*, sla je dat één keer op als skill. Daarna typ je `/weekrapport` en Claude weet wat je bedoelt.

**Wat je nu doet:**

1. Maak een lijstje van drie tot vijf taken die je elke week of maand op dezelfde manier doet. Niet alle taken; alleen de structureel-herhalende.
2. Bekijk eerst of er een bestaande skill is die past. Anthropic onderhoudt een [open-source repository met kenniswerk-plugins](https://github.com/anthropics/knowledge-work-plugins) — een soort gratis bibliotheek waar je kant-en-klare bundels per beroepsrol kunt downloaden (marketing, sales, finance, HR, engineering).
3. Vind je niets passends, dan schrijf je er zelf een. Maak in je Cowork-werkmap een submap `SKILLS` aan, en daarin een markdown-bestand per skill (bijvoorbeeld `weekrapport.md`). Schrijf in dat bestand exact wat Claude moet doen: welke bestanden lezen, welke connector raadplegen, welke output produceren.
4. Verwijs in je `about-me.md` naar de skills-map: *"In /SKILLS staan herbruikbare instructies. Pas ze toe als ik om een specifieke taak vraag."*

**Belangrijk:** je hoeft hier niet meteen mee te beginnen. Werk eerst een paar weken met Cowork voor je begint met skills. Zo weet je welke taken écht repetitief zijn en welke je gevoelsmatig herhaalt maar feitelijk maar één keer per kwartaal doet.

<!-- VIDEO-IDEE 5: 60-sec screencast — een bestaande plugin downloaden uit de GitHub-repo en activeren in Cowork. -->

## Tool 5: Een vaste startprompt die je discipline borgt

De kleinste tool van de zes, en de makkelijkst te vergeten. Maar zonder deze valt de hele setup uit elkaar.

**Wat is het en waarom doe je het?**
Een vaste startprompt is de zin (of paar zinnen) waarmee je elk werksessie opent. Hij wijst Claude exact op de bestanden die hij moet lezen, in welke volgorde, en wat hij eerst moet vragen voor hij begint. Zonder vaste startprompt valt Claude terug op standaardgedrag — en dan negeert hij geheid een deel van je context.

**Wat je nu doet:**

1. Open een notitie-app of een sticky note (digitaal of fysiek; sommige gebruikers plakken 'm letterlijk op hun monitor).
2. Schrijf je vaste startprompt op. Een werkend basisformaat:

   > *"Lees eerst /about-me.md, daarna alle bestanden in /TEMPLATES. Vat samen wat je begrijpt over hoe ik werk. Stel me dan twee verhelderende vragen voor je begint met de taak die ik je geef."*

3. Pas hem aan jouw situatie aan. Een marketeer wil misschien `/clients.md` toevoegen; een consultant `/projects.md`. Test, herzie, test opnieuw.
4. Plak de prompt waar je hem niet kunt missen. Letterlijk plakken werkt — uit het hoofd typen niet, want na drie dagen lat je een woord vallen en is je discipline weg.

**Resultaat:** elke sessie start hetzelfde, en Claude bouwt elke sessie op dezelfde context op. Dit klinkt klein, maar is exact het verschil tussen "die ene keer werkte het echt goed" en "het werkt elke keer goed".

<!-- VIDEO-IDEE 6: 20-sec screencast — sticky note met de prompt, kopiëren in Cowork, opening van een nieuwe sessie. -->

## Tool 6: Projects op claude.ai voor teams

De zesde tool draait niet op je desktop, maar in je browser — en is bedoeld voor wanneer je iets met collega's wilt delen.

**Wat is het en waarom doe je het?**
[Projects](https://claude.ai) is Claudes browser-gebaseerde omgeving waarbinnen je instructies en bestanden bewaart die voor elk gesprek in dat project beschikbaar blijven. Anders dan Cowork raakt Projects geen bestanden op je harde schijf aan — alles leeft in de browser. Het voordeel: één link delen en je collega heeft dezelfde context.

**Wat je nu doet:**

1. Ga naar [claude.ai](https://claude.ai) in je browser en log in.
2. Klik in het linker zijpaneel op **Projects** en daarna op **Nieuw project**.
3. Geef het project een naam (bijvoorbeeld "Klant Acme — campagne Q3").
4. In het instellingen-paneel rechts zie je twee velden: **Custom instructions** (vaste instructies voor dit project) en **Project knowledge** (bestanden die je uploadt). Vul beide.
5. Voor instructies: kopieer eventueel je startprompt uit Tool 5 plus eventuele klant-specifieke regels.
6. Voor bestanden: upload de `about-me.md` van het team plus relevante referentiedocumenten.
7. Deel de project-link met collega's die toegang nodig hebben.

**Wanneer kies je Projects boven Cowork?**

<style>
.viz-pick{background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:16px;padding:clamp(28px,4vw,40px) clamp(20px,3vw,32px);margin:32px 0;font-family:var(--font-body);color:var(--text-primary)}
.viz-pick-q{text-align:center;font-size:1.1rem;font-weight:600;margin:0 0 22px;color:var(--text-primary)}
.viz-pick-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}
.viz-pick-card{background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:12px;padding:18px 20px;display:flex;flex-direction:column;gap:12px}
.viz-pick-scenario{font-size:.93rem;color:var(--text-secondary);line-height:1.5;flex:1}
.viz-pick-arrow{font-size:1.3rem;color:var(--text-muted);text-align:center;line-height:1}
.viz-pick-choice{background:color-mix(in oklch,var(--color-success) 16%,var(--bg-surface));color:var(--color-success);font-weight:600;font-size:1.05rem;text-align:center;padding:10px;border-radius:8px;border:1px solid color-mix(in oklch,var(--color-success) 45%,transparent)}
.viz-pick-alt{background:color-mix(in oklch,var(--primary-bright) 14%,var(--bg-surface));color:var(--primary-bright);border-color:color-mix(in oklch,var(--primary-bright) 45%,transparent)}
</style>

<figure class="viz-pick" aria-label="Beslishulp: Cowork of Projects?">
  <p class="viz-pick-q">Cowork of Projects — wat past bij jou?</p>
  <div class="viz-pick-grid">
    <div class="viz-pick-card">
      <div class="viz-pick-scenario">Je werkt alleen en wilt dat Claude bestanden op je computer kan aanraken.</div>
      <div class="viz-pick-arrow" aria-hidden="true">↓</div>
      <div class="viz-pick-choice">Cowork</div>
    </div>
    <div class="viz-pick-card">
      <div class="viz-pick-scenario">Je werkt alleen, maar bestanden in de cloud bewaren is voldoende.</div>
      <div class="viz-pick-arrow" aria-hidden="true">↓</div>
      <div class="viz-pick-choice viz-pick-alt">Projects</div>
    </div>
    <div class="viz-pick-card">
      <div class="viz-pick-scenario">Je werkt met een team en wilt context delen via een link.</div>
      <div class="viz-pick-arrow" aria-hidden="true">↓</div>
      <div class="viz-pick-choice viz-pick-alt">Projects</div>
    </div>
  </div>
</figure>

Voor wie de details wil zien, hier de volledige vergelijking per situatie:

| Situatie | Beste keuze |
|----------|-------------|
| Je werkt alleen, op je eigen computer | Cowork |
| Je deelt context met één of meer collega's | Projects |
| Je wilt dat Claude scripts uitvoert of bestanden bewerkt | Cowork |
| Je werkt soms vanaf een tablet of een ander apparaat | Projects |
| Je werkt met gevoelige data die niet op cloud-servers mag | Cowork (lokale bestanden blijven lokaal) |

De vuistregel: voor solowerk is Cowork sneller en krachtiger; voor teams blijft Projects vaak de praktischere route. Cowork voor jou; Projects voor jullie.

## Wat dit oplevert in je werkweek

<style>
.viz-ba{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:32px 0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
.viz-ba-panel{border-radius:16px;padding:26px 24px;display:flex;flex-direction:column;gap:14px}
.viz-ba-before{background:color-mix(in oklch,var(--color-error) 10%,var(--bg-surface));border:1px solid color-mix(in oklch,var(--color-error) 35%,transparent)}
.viz-ba-after{background:color-mix(in oklch,var(--color-success) 10%,var(--bg-surface));border:1px solid color-mix(in oklch,var(--color-success) 35%,transparent)}
.viz-ba-icon{font-size:1.8rem;line-height:1}
.viz-ba-title{font-size:1.1rem;font-weight:600;margin:0;letter-spacing:-.01em}
.viz-ba-before .viz-ba-title{color:var(--color-error)}
.viz-ba-after .viz-ba-title{color:var(--color-success)}
.viz-ba-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
.viz-ba-list li{font-size:.92rem;line-height:1.5;display:flex;gap:10px;align-items:flex-start}
.viz-ba-list li::before{content:"";flex-shrink:0;width:6px;height:6px;border-radius:999px;margin-top:8px}
.viz-ba-before .viz-ba-list li::before{background:var(--color-error)}
.viz-ba-after .viz-ba-list li::before{background:var(--color-success)}
.viz-ba-before .viz-ba-list li{color:var(--text-secondary)}
.viz-ba-after .viz-ba-list li{color:var(--text-secondary)}
@media (max-width:720px){.viz-ba{grid-template-columns:1fr}}
</style>

<figure class="viz-ba" aria-label="Voor en na: Claude zonder en met setup">
  <div class="viz-ba-panel viz-ba-before">
    <div class="viz-ba-icon" aria-hidden="true">🌀</div>
    <h3 class="viz-ba-title">Zonder setup</h3>
    <ul class="viz-ba-list">
      <li>Elke sessie opnieuw uitleggen wie je bent</li>
      <li>Toon en stijl wisselen per gesprek</li>
      <li>Handmatig knippen-en-plakken tussen apps</li>
      <li>Geen vaste plek waar Claude zijn werk neerzet</li>
    </ul>
  </div>
  <div class="viz-ba-panel viz-ba-after">
    <div class="viz-ba-icon" aria-hidden="true">✨</div>
    <h3 class="viz-ba-title">Met setup</h3>
    <ul class="viz-ba-list">
      <li>Claude kent je rol, klanten en schrijfstijl</li>
      <li>Consistente toon over al je outputs</li>
      <li>Connectoren halen data zelf op uit je apps</li>
      <li>Vaste OUTPUTS-map met geordend resultaat</li>
    </ul>
  </div>
</figure>

Acht uur is veel, in een week waarin je toch al achterloopt. Maar reken het eens om. De gemiddelde kenniswerker chat één tot twee uur per dag met een AI-assistent — en daarvan gaat een serieus deel naar opnieuw context geven.

Stel je voor: een marketingmanager bij een MKB die elke maandag drie uur kwijt is aan dezelfde routinetaken — nieuwsbrief opzetten, LinkedIn-posts plannen, klantmail bijwerken. Met een goed ingerichte Cowork-werkmap, een brain file en de juiste templates wordt dat anderhalf uur. Twee maandagen later heb je je investering al terug.

Dezelfde logica geldt voor recruiters die wekelijks CV's screenen, accountants die maandelijkse rapportages schrijven, en consultants die per klant een aparte schrijfstijl moeten aanhouden. Niet sexy, maar wel echt.

Voor de bredere context over wat Anthropic met Cowork beoogt — de techniek onder de motorkap, de sandbox-veiligheid, de live artifacts — leest [onze launch-analyse over Claude Cowork](/nieuws/claude-cowork-lancering) als achtergrond. En als je Claude vooral inzet voor visuele taken, is [Claude Design](/nieuws/claude-design-opus) de logische volgende stap.

> **⚡ Gevorderden:** Het grootste risico van een goed ingerichte Cowork-setup is niet technisch maar gedragsmatig — je begint Claude steeds gevoeliger werk toe te vertrouwen. Houd de discipline vast: werk in een aparte map per klant, beperk connectoren met schrijf-rechten op productie-systemen, en lees de Anthropic-richtlijnen over [veilig werken met Cowork](https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork) door voordat je hem aan je Gmail of CRM hangt. *Sandbox* betekent in dit verband: een afgeschermde omgeving waarin scripts mogen draaien zonder bij de rest van je computer te kunnen.

## Wanneer Claude zo inrichten de moeite waard is

**Wel doen als:**

- Je dagelijks meer dan een uur met Claude werkt
- Je werk terugkerende structuur heeft (wekelijkse rapportages, klant-onboarding, content-kalenders)
- Je tussen drie of vier vaste apps schakelt (Gmail, Drive, Notion, CRM)
- Je merkt dat je jezelf telkens opnieuw uitlegt aan Claude

**Niet (nog) nodig als:**

- Je Claude losjes gebruikt voor brainstorms en losse vragen
- Je nog uitprobeert of een AI-assistent überhaupt iets voor je werk betekent
- Je werk te divers is om in één brain file vast te leggen

Voor zzp'ers, ondernemers en teams die dagelijks met AI werken, is dit geen nice-to-have meer. Het is de basis. En een basis bouw je één keer, niet elke maandag opnieuw.

## Checklist: ben je klaar met je setup?

Loop deze lijst af. Heb je alles afgevinkt, dan ben je klaar voor productie:

- [ ] Claude-desktopapp geïnstalleerd op Mac of Windows
- [ ] Ingelogd met een betaald abonnement (Pro, Max, Team of Enterprise)
- [ ] Werkmap aangemaakt en geselecteerd in Cowork
- [ ] `about-me.md` geschreven (rol, taken, toon, voorkeuren)
- [ ] Submappen `OUTPUTS` en `TEMPLATES` aangemaakt
- [ ] Twee tot drie eigen voorbeeld-documenten in `TEMPLATES` geplaatst
- [ ] Minstens één connector verbonden (begin met Gmail of Drive)
- [ ] Connector-rechten gecontroleerd (eerst alleen lezen waar mogelijk)
- [ ] Vaste startprompt opgeschreven en op een zichtbare plek geplakt
- [ ] Eerste echte taak uitgevoerd en de output beoordeeld
- [ ] (Optioneel) Project aangemaakt op claude.ai voor team-werk

Lukt iets niet? De [officiële setup-handleiding van Anthropic](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork) loopt elk struikelblok los na.

## Samenvatting — de 5-minuten-versie

- Claude wordt pas echt nuttig als je hem structurele context geeft via een vaste werkmap, een brain file en de juiste connectoren — anders begin je elk gesprek opnieuw.
- De kern is eenvoudig: Cowork plus één markdown-bestand (`about-me.md`) plus de discipline om Claude eerst te laten lezen voor hij iets doet.
- De zes tools zijn cumulatief, niet allemaal-tegelijk: brain file en outputs-map zijn essentieel, connectoren en skills volgen wanneer je merkt dat je dezelfde stappen vaak herhaalt.
- Projects op claude.ai blijft relevant voor teams; Cowork is krachtiger voor solowerk omdat het je bestanden en je shell echt aanraakt.
- Eerstvolgende stap: download de desktop-app, maak een Cowork-werkmap aan, schrijf een eerste `about-me.md` van vijf à tien regels en gebruik die bij je volgende drie sessies. De overige vijf tools voeg je later toe op basis van wat je dagelijks doet.
- Wil je de tool-capabilities later snel uitbreiden zonder per service API-keys te beheren? Lees onze launch-coverage van [zero.xyz — een gateway naar ~8.000 tools voor Claude Code en andere CLI-agents](/nieuws/zero-xyz-agent-tool-gateway). En voor wie security-werk wil automatiseren: [Strix is een open-source AI-pentester](/nieuws/strix-open-source-ai-pentester) die naast Claude prima draait.

## Bronnen

- [Anthropic — Cowork productpagina](https://claude.com/product/cowork) — officiële beschrijving van features, plannen en ondersteunde platforms
- [Anthropic — Get started with Claude Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork) — setup-handleiding van Anthropic zelf
- [Anthropic — Connectoren](https://claude.com/connectors) — overzicht van connectoren voor Gmail, Drive en meer
- [Anthropic — Knowledge work plugins (GitHub)](https://github.com/anthropics/knowledge-work-plugins) — open-source repository met plugins per rol
- [Ruben Hassid — Cowork-uitleg op Substack](https://ruben.substack.com/p/claude-cowork) — uitgebreide Cowork-handleiding van een AI-schrijver wiens werkwijze deze gids mede inspireerde

---
title: "In één weekend een live dashboard bouwen met Claude — zo doe je het"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'In één weekend een live dashboard bouwen met Claude — zo doe je het'"
description: "Een Reddit-gebruiker bouwde een 3D-nieuwsglobe met live-data en Claude als bouwpartner. Hoe doe je zoiets — ook als je geen programmeur bent? Stappenplan voor je eigen interactief dashboard."
publishedAt: 2026-07-02
updatedAt: 2026-07-03
author: "Redactie"
category: "gids"
tags:
  - "claude"
  - "dashboard"
  - "prototype"
  - "live-data"
  - "claude-fable-5"
  - "geen-code"
  - "web-app"
toolSlug: "claude"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-claude-interactief-dashboard-bouwen.webp"
heroScene: "A tiny glowing globe on a miniature wooden desk with small map pins on it, a tiny laptop beside it showing code, warm amber lighting, tilt-shift"
keyTakeaways:
  - "Claude (inclusief het nieuwe Fable 5) kan complete interactieve webapplicaties schrijven — ook als jij zelf geen code kent."
  - "De sleutel is een goede startprompt: beschrijf wat het moet doen, voor wie, en welke data het moet tonen."
  - "Begin klein: één kaart, één lijst, één grafiek. Claude itereert snel en je leert wat werkt door te doen."
  - "Voor live data heb je een API nodig — Claude helpt je ook bij het vinden en koppelen van gratis databronnen."
  - "Claude Fable 5 is bijzonder sterk in dit soort meerstaps-bouwwerk: het begint direct met uitvoering in plaats van eindeloos vragen te stellen."
faq:
  - q: "Heb ik programmeerkennis nodig om een dashboard te bouwen met Claude?"
    a: "Nee, maar een basisgevoel voor hoe browsers werken (HTML, een browser openen, een bestand opslaan) helpt. Claude schrijft alle code; jij kopieert die naar een bestand en opent het in je browser. Geen installaties, geen command line — tenzij je verder wilt gaan."
  - q: "Welke Claude-versie heb ik nodig?"
    a: "Claude.ai gratis werkt voor eenvoudige projecten. Voor complexere dashboards (meerdere databronnen, kaarten, interactiviteit) werkt Claude Pro of Fable 5 beter — het model houdt meer context bij en maakt minder fouten in lange codebases. Een Pro-abonnement kost €18/maand (excl. btw)."
  - q: "Kan Claude ook live data ophalen uit het internet?"
    a: "Claude zelf haalt geen live data op — maar het schrijft wel de code die jouw browser dat laat doen via publieke API's. Gratis API's met AI-nieuws, weer, aandelenkoersen en kaartdata zijn er genoeg; Claude helpt je ze te vinden en koppelen."
  - q: "Wat is het verschil tussen een prototype en een echte app?"
    a: "Een prototype is een werkend demo dat alleen jij (of een kleine groep) gebruikt — op je eigen computer, zonder server. Een echte app draait op een server, heeft gebruikersaccounts en is schaalbaar. Claude helpt je bij prototypes; voor een echte app heb je uiteindelijk technische hulp nodig."
  - q: "Hoe lang duurt het om een eenvoudig dashboard te bouwen met Claude?"
    a: "Een eerste werkend prototype — één kaart of één live-grafiek — lukt in een uur of twee. Een volledig uitgewerkt dashboard zoals de nieuwsglobe (met meerdere data-lagen, filters en zoekfunctie) kost een weekend itereren. Fable 5 maakt het tweede deel aanzienlijk sneller."
---

Vorige maand verscheen op Reddit een project dat veel aandacht trok: een 3D-globe die live breaking news, conflicten, rampen, vluchtdata en crypto-koersen toont. Klik op een pin en je krijgt een briefing met bronnen. Alles gebouwd met Claude als enige codeerpartner ([Bron: Reddit/r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/comments/1ucfstl/claude_is_helping_me_build_a_news_globe_that/)).

De maker had geen jarenlange programmeerervaring nodig. Wat hij had: een duidelijk idee van wat het moest doen, geduld om met Claude te itereren, en bereidheid om te leren van wat niet meteen werkte. Dat is het recept.

## Hoe werkt het: Claude als bouwpartner

Claude schrijft code. Dat is de kern. Als jij beschrijft wat je wilt bouwen, genereert Claude HTML, CSS en JavaScript die je in een bestand kunt plakken en in je browser kunt openen. Geen installaties. Geen server. Geen account bij een cloudprovider.

> **💡 Beginner-tip:** Je hebt alleen een teksteditor (Notepad, TextEdit of de gratis [VS Code](https://code.visualstudio.com/)) en een browser nodig. Maak een bestand `dashboard.html`, plak de code van Claude erin, open het bestand in Chrome of Firefox — klaar. Zo werkt het.

De kracht van Claude Fable 5 — het model dat op 1 juli is teruggekeerd na een Amerikaans exportverbod, [lees hier de achtergrond](https://hetlaatsteainieuws.nl/ai-nieuws/claude-fable-5-terug-export-controle) — zit in hoe het omgaat met complexe, meerstaps-opdrachten. Eerder moest je Claude bij elke stap exact vertellen wat het moest doen. Fable 5 begint directer met uitvoering en houdt een groter deel van je project in zijn hoofd, wat minder heen-en-weer gepraat betekent.

## Stap 1: Begin met een scherpe startprompt

De kwaliteit van je eindresultaat hangt voor 70% af van je eerste prompt. Vaag in = vaag uit. Gebruik deze structuur:

> *"Bouw een interactief HTML-dashboard dat [WAT HET DOET]. Het is voor [WIE]. Het moet [WELKE DATA] tonen, bij voorkeur als [KAART / GRAFIEK / TABEL]. Gebruik alleen HTML, CSS en JavaScript — geen externe frameworks die ik moet installeren. Houd alles in één bestand."*

Concreet voorbeeld voor een simpele nieuwskaart:

> *"Bouw een interactieve HTML-kaart van Nederland die de vijf meest besproken AI-nieuwsonderwerpen van vandaag toont als gekleurde bolletjes op de provincies waar de bedrijven of instellingen zitten die het nieuws maken. Gebruik Leaflet.js voor de kaart (via CDN, geen installatie). Data mag hardcoded zijn als placeholder. Alles in één HTML-bestand."*

Merk op: je geeft Claude al een keuze voor de tool (Leaflet.js) en een uitweg als live data nog niet werkt (placeholder). Dat voorkomt dat het project vastloopt op iets technisch voordat je het concept hebt kunnen zien.

## Stap 2: Itereer in kleine stappen

Maak niet de fout om te vragen naar het complete eindproduct in één prompt. Bouw op:

1. **Eerste prompt** → zichtbare basis (kaart, grafiek of lijst met placeholder-data)
2. **Tweede prompt** → stijl en layout ("maak het donker, grotere tekst, voeg een zoekbalk toe")
3. **Derde prompt** → live data koppelen ("vervang de placeholders door echte data van [API]")
4. **Vierde prompt** → details en bugfixes

> **⚡ Gevorderd:** Voor gratis live data zijn dit betrouwbare API's waarmee Claude direct kan werken: [NewsAPI](https://newsapi.org/) (nieuws, gratis tier beschikbaar), [Open-Meteo](https://open-meteo.com/) (weer, volledig gratis), [CoinGecko](https://www.coingecko.com/en/api) (crypto, gratis tier) en [OpenSky Network](https://opensky-network.org/) (vluchten, gratis). Vraag Claude: "Koppel de data aan [API-naam] en gebruik de gratis endpoint [URL]."

## Stap 3: Wanneer iets niet werkt

Dat gaat gebeuren. Stukjes code doen het niet, of het eindresultaat ziet er anders uit dan je bedoelde. Aanpak:

- **Kopieer de foutmelding** die je browser geeft (F12 → Console-tabblad → rode tekst) en plak die direct in Claude: *"Dit is de foutmelding: [fout]. Wat is er mis en hoe los ik het op?"*
- **Wees specifiek** over wat je ziet versus wat je verwachtte: *"De kaart laadt maar de bolletjes verschijnen niet — ik zie wel de kaartachtergrond."*
- **Vraag om uitleg** als je wilt begrijpen wat er mis ging — Claude legt graag uit.

## Wat je realistisch kunt bouwen

Met een weekend itereren en Claude Fable 5 zijn dit haalbare eindresultaten voor iemand zonder programmeerervaring:

- Een live kaart die nieuws of data per locatie toont
- Een persoonlijk dashboard met je favoriete data (aandelen, weer, nieuws)
- Een interactieve grafiek die automatisch bijwerkt
- Een eenvoudige zoekmachine over een verzameling teksten

De nieuwsglobe van de Reddit-maker was ambitieuzer dan dit — meerdere data-lagen, een watchlist, geplande notificaties. Dat kostte hem meerdere versies en weken itereren. Maar het begon exact zo: één werkende kaart met placeholder-data.

> **💡 Beginner-tip:** Sla elke werkende versie op als een apart bestand (`dashboard-v1.html`, `dashboard-v2.html`). Claude maakt soms een stap vooruit en twee stappen terug. Met versiegeschiedenis kun je altijd terugkeren naar een versie die wél werkte.

Wil je Claude uitproberen voor jouw eigen project? Start op [claude.ai](https://claude.ai) — gratis toegang is er voor eenvoudige projecten, Pro (€18/maand, excl. btw) voor de complexere bouw.

---

*Fact-check (2 juli 2026): de nieuwsglobe van Reddit-gebruiker r/ClaudeAI is het directe bronproject. Leaflet.js, NewsAPI, Open-Meteo, CoinGecko en OpenSky Network zijn bestaande gratis API's — links en gratis tiers geverifieerd. Claude Fable 5's directe uitvoeringsstijl is geverifieerd via Anthropic's eigen modeldocumentatie en de AWS-blogpost over Fable 5.*

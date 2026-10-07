---
title: "Goedkope GPT- en Claude-API: waarom 90% korting een valstrik is"
description: "Resellers bieden GPT- en Claude-API-toegang voor een fractie van de prijs. Wat er achter die korting zit, wat je riskeert en hoe je veilig en voordelig werkt."
publishedAt: 2026-10-07
updatedAt: 2026-10-07
author: "Redactie"
category: "gids"
tags:
  - "openrouter"
  - "ai-api"
  - "api-sleutels"
  - "veiligheid"
  - "chatgpt"
  - "claude"
toolSlug: "openrouter"
featured: false
draft: false
readingTime: 6
heroImage: "/images/articles/diorama-goedkope-ai-api-valstrik.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Goedkope GPT- en Claude-API: waarom 90% korting een valstrik is'"
heroScene: "A brass robot hangs a huge discount tag on a locked mailbox while a copper tube drains a safe"
evergreen: true
volatility: medium
factsCheckedAt: 2026-10-07
watch:
  - "openai-terms"
  - "anthropic-terms"
  - "openrouter-pricing"
keyTakeaways:
  - "Een API-reseller laat je één regel wijzigen, de base-URL. Vanaf dat moment loopt al je verkeer, inclusief code en sleutels, via een server die je niet kent."
  - "Onderzoekers testten in 2026 428 van zulke routers: 9 injecteerden kwaadaardige code, 17 raakten nep-AWS-sleutels aan en één haalde crypto van een testwallet."
  - "Een CISPA-studie zag dat een als Gemini-2.5 verkochte dienst op een medische test gemiddeld 37% scoorde, tegen 83,8% voor de officiële API."
  - "OpenAI verbiedt het kopen, verkopen en doorgeven van API-sleutels; Anthropic verbiedt doorverkoop zonder goedkeuring en het delen van je API-sleutel."
  - "Veilig besparen kan wel: officiële API met uitgavenlimiet, de grote cloudplatforms, of een gateway die prijzen en logbeleid openbaar maakt, zoals OpenRouter."
faq:
  - q: "Is goedkope ChatGPT- of Claude-API-toegang via een reseller legaal?"
    a: "Voor de reseller meestal niet toegestaan. De zakelijke voorwaarden van OpenAI verbieden het kopen, verkopen of overdragen van API-sleutels aan derden, en die van Anthropic verbieden doorverkoop zonder uitdrukkelijke goedkeuring. Jij hebt daarbij geen contract met OpenAI of Anthropic, alleen met de reseller. Wordt die toegang afgesloten, dan heb je weinig om op terug te vallen, zeker als de verkoper buiten de EU zit of via Telegram of een marktplaats werkt."
  - q: "Hoe herken ik een onbetrouwbare AI-API-proxy?"
    a: "Let op vier signalen: een prijs die structureel ver onder de officiële ligt, betaling via kanalen zonder kopersbescherming, geen controleerbaar bedrijf achter de dienst (KvK, adres, telefoonnummer) en geen openbaar beleid over wat er met je prompts gebeurt. Twee of meer van die signalen tegelijk is reden om af te haken. ACM ConsuWijzer heeft een algemene checklist voor onbekende webwinkels die je ook hier kunt toepassen."
  - q: "Ik heb mijn API-sleutel bij een proxy gebruikt. Wat nu?"
    a: "Trek de sleutel direct in bij de aanbieder en maak een nieuwe aan. Draaide er een coding-agent via de proxy, ga er dan van uit dat ook andere geheimen in die sessie zichtbaar waren, zoals cloudsleutels in je projectmap, en vervang die ook. Stel een uitgavenlimiet in en controleer je gebruik op onverklaarbare pieken. Ben je opgelicht, meld het dan bij de Fraudehelpdesk."
  - q: "Is OpenRouter ook een proxy?"
    a: "Ja, technisch is elke gateway een tussenpersoon die je verkeer ziet. Het verschil zit in transparantie: OpenRouter publiceert zijn prijzen per model, zegt geen marge op modelprijzen te rekenen en logt prompts naar eigen zeggen standaard niet. Je betaalt een vaste fee bij het opwaarderen van tegoed, zie Stand van zaken. Voor gevoelige code blijft rechtstreeks bij de modelmaker werken het eenvoudigste."
sources:
  - label: "Your Agent Is Mine: Measuring Malicious Intermediary Attacks on the LLM Supply Chain (arXiv)"
    url: "https://arxiv.org/abs/2604.08407"
  - label: "Real Money, Fake Models: Deceptive Model Claims in Shadow APIs (CISPA, arXiv)"
    url: "https://arxiv.org/html/2603.01919v1"
  - label: "Tom's Hardware — Chinese grey market sells Claude API access at 90% off"
    url: "https://www.tomshardware.com/tech-industry/artificial-intelligence/chinese-grey-market-sells-claude-api-access-at-90-percent-off-through-proxy-networks-that-harvest-user-data"
  - label: "OpenAI — Services Agreement"
    url: "https://openai.com/policies/services-agreement/"
  - label: "Anthropic — Commercial Terms of Service"
    url: "https://www.anthropic.com/legal/commercial-terms"
  - label: "Anthropic — Consumer Terms of Service"
    url: "https://www.anthropic.com/legal/consumer-terms"
  - label: "TechRepublic — Fake Claude Code install sites spread malware"
    url: "https://www.techrepublic.com/article/news-fake-claude-code-install-sites-malware/"
  - label: "ACM ConsuWijzer — Checklist veilig online winkelen"
    url: "https://consument.acm.nl/online-winkelen/checklist-veilig-online-winkelen"
  - label: "OpenRouter — FAQ"
    url: "https://openrouter.ai/docs/faq"
---

Wie een tijdje met de API van OpenAI of Anthropic werkt, komt ze vroeg of laat tegen: aanbieders die dezelfde modellen beloven voor een tiende van de officiële prijs. Zelfde code, zelfde antwoorden, je past alleen één regel aan. Dat het te mooi klinkt, weet je zelf ook. Deze gids legt uit waar de korting vandaan komt, wat onderzoekers in zulke diensten aantroffen en hoe je wél voordelig en veilig met AI-API's werkt.

## Hoe de truc werkt

Een API-proxy zet zich tussen jou en de echte AI-dienst. In je code verander je de *base-URL*, het adres waar je verzoeken naartoe gaan, van `api.openai.com` of `api.anthropic.com` naar het domein van de reseller. Verder lijkt alles hetzelfde. Maar elk verzoek gaat nu eerst langs hun server, en die kan alles lezen, opslaan, aanpassen of doorsturen naar een ander model. Er bestaat geen cryptografische controle tussen jou en het model erachter, schrijven de onderzoekers van de studie hieronder ([Bron: arXiv](https://arxiv.org/abs/2604.08407)).

Die base-URL wijzigen is op zich geen verdacht trucje. Ook gewone aanbieders werken zo, zoals in onze gids over [het GLM Coding Plan in Claude Code](/nieuws/z-ai-glm-coding-plan-claude-code-koppelen). Het verschil zit in wie er aan de andere kant zit.

## Waar de korting vandaan komt

Tom's Hardware beschreef een grijze markt van zogeheten 'transfer stations' die Claude-toegang voor zo'n 10% van de officiële prijs verkopen, openlijk via GitHub, Taobao en Telegram. Het aanbod komt uit massaal aangemaakte accounts met gratis starttegoed, gedeelde abonnementen en deels accounts die met gestolen creditcards zijn betaald ([Bron: Tom's Hardware](https://www.tomshardware.com/tech-industry/artificial-intelligence/chinese-grey-market-sells-claude-api-access-at-90-percent-off-through-proxy-networks-that-harvest-user-data)). Volgens ontwikkelaars die het artikel aanhaalt, is de lage prijs vooral klantenwerving: het geld zit in de prompts en antwoorden die worden gelogd en doorverkocht.

## Wat onderzoekers aantroffen

Een studie uit april 2026 testte 28 betaalde en 400 gratis AI-routers. Negen daarvan (één betaalde, acht gratis) injecteerden actief kwaadaardige code in antwoorden, 17 benaderden nep-AWS-sleutels die de onderzoekers als lokaas hadden klaargezet, en één router haalde ether weg van een wallet van de onderzoekers ([Bron: arXiv](https://arxiv.org/abs/2604.08407)).

Daarnaast krijg je lang niet altijd het model waarvoor je betaalt. Onderzoekers van het Duitse CISPA Helmholtz-centrum vonden 17 van zulke 'schaduw-API's' en lichtten er drie grondig door. Een dienst die als Gemini-2.5-flash werd verkocht, scoorde op een medische kennistest gemiddeld 37%, waar de officiële API 83,8% haalde. Van de 24 geteste endpoints zakte 45,8% voor een controle op de identiteit van het model ([Bron: CISPA via arXiv](https://arxiv.org/html/2603.01919v1)).

> **⚡ Gevorderden:** Het risico is het grootst bij een coding-agent. Dan stuur je geen losse vragen, maar repository-context, bestandspaden en soms geheimen uit je projectmap door een onbekende server, en die kan de code aanpassen voordat jouw agent hem uitvoert. Dezelfde zorg speelt bij nep-installers: sinds maart 2026 lokken valse 'Claude Code'-installatiepagina's via zoekadvertenties ontwikkelaars naar malware die onder meer API-sleutels en tokens steelt ([Bron: TechRepublic](https://www.techrepublic.com/article/news-fake-claude-code-install-sites-malware/)). Installeer alleen via de officiële documentatie.

## Wat de voorwaarden zeggen

De doorverkoop zelf botst met de regels van de modelmakers. De zakelijke voorwaarden van OpenAI verbieden het kopen, verkopen of overdragen van API-sleutels aan derden en het doorverkopen of verhuren van toegang tot een account ([Bron: OpenAI](https://openai.com/policies/services-agreement/)). Anthropic verbiedt doorverkoop van zijn diensten tenzij het daar uitdrukkelijk toestemming voor geeft ([Bron: Anthropic](https://www.anthropic.com/legal/commercial-terms)), en de consumentenvoorwaarden zeggen letterlijk dat je je API-sleutel met niemand mag delen ([Bron: Anthropic](https://www.anthropic.com/legal/consumer-terms)).

Voor jou betekent dat: je hebt geen contract met OpenAI of Anthropic, alleen met een partij die hun voorwaarden schendt. Valt de toegang weg, dan ben je je vooruitbetaalde tegoed waarschijnlijk kwijt.

## Je rechten als koper

Koop je als consument, dan helpt de checklist van ACM ConsuWijzer voor onbekende webwinkels ook hier: zoek de naam op met 'klacht' of 'review', controleer contactgegevens en KvK-inschrijving, en kies een betaalmethode met kopersbescherming, zoals een creditcard ([Bron: ACM ConsuWijzer](https://consument.acm.nl/online-winkelen/checklist-veilig-online-winkelen)). Een verkoper die alleen via Telegram of een buitenlandse marktplaats bereikbaar is, scoort op vrijwel elk punt slecht. Ben je opgelicht, dan is de Fraudehelpdesk het eerste meldpunt; die verwijst door naar onder meer politie en Slachtofferhulp ([Bron: Fraudehelpdesk](https://www.fraudehelpdesk.nl/)).

> **💡 Beginner-tip:** Gebruik je AI via een abonnement in de browser en heb je nooit een API-sleutel aangemaakt? Dan speelt dit voor jou nauwelijks. Wil je wel weten wat AI-gebruik écht kost, dan zet het stuk [Wat kost een AI-licentie in 2026?](https://www.hetlaatsteainieuws.nl/nieuws/chatgpt-duurder-dan-stagiair) op onze zustersite de bedragen op een rij.

## Zo bespaar je zonder valstrik

1. **Haal je sleutel bij de bron.** Maak API-sleutels aan in het dashboard van OpenAI of Anthropic zelf; zie *Stand van zaken* voor de adressen ([Bron: OpenAI](https://developers.openai.com/api/reference/overview)).
2. **Zet een uitgavenlimiet.** Beide aanbieders laten je een maandlimiet instellen, zodat een gelekte sleutel geen open rekening wordt ([Bron: Anthropic](https://platform.claude.com/docs/en/api/rate-limits)).
3. **Gebruik je bestaande cloud.** Claude draait ook op AWS, Google Cloud en Microsoft Azure, onder het contract dat je daar al hebt ([Bron: Anthropic](https://platform.claude.com/docs/en/api/overview)). Zie onze uitleg over [Claude in Microsoft Foundry](/nieuws/claude-microsoft-foundry-azure-beschikbaar).
4. **Kies een transparante gateway als je veel modellen wilt.** [OpenRouter](/ai-tools/openrouter) zegt de prijzen van de modelaanbieders zonder marge door te geven, rekent een vaste fee bij het opwaarderen en logt prompts standaard niet ([Bron: OpenRouter](https://openrouter.ai/docs/faq)). Ook dat blijft een tussenpersoon, dus voor gevoelige code werk je liever rechtstreeks.
5. **Behandel je sleutel als een wachtwoord.** Bewaar hem in een omgevingsvariabele, nooit in code die je deelt. Onze gids over [een fijnmazige Hugging Face-token](/nieuws/huggingface-fijnmazige-token-veilig-instellen) laat zien hoe je de schade beperkt als het toch misgaat, en voor agent-koppelingen helpen de [vijf checks voor een MCP-server](/nieuws/mcp-server-installeren-checks).

Een vuistregel die het samenvat: als een aanbieder niet kan uitleggen hoe hij onder de inkoopprijs verkoopt, ben jij de inkoopprijs.

## Stand van zaken — bijgewerkt 2026-10-07

De uitleg hierboven blijft staan. De gegevens hieronder veranderen en worden hier bijgewerkt.

| Onderwerp | Stand |
| --- | --- |
| Officieel OpenAI-endpoint | `https://api.openai.com/v1` ([Bron: OpenAI](https://developers.openai.com/api/reference/overview)) |
| Officieel Claude-endpoint | `https://api.anthropic.com`, sleutels via platform.claude.com ([Bron: Anthropic](https://platform.claude.com/docs/en/api/overview)) |
| OpenAI Services Agreement | Versie van 1 januari 2026, sectie 3.1 en 3.3 |
| Anthropic Commercial Terms | Versie van 17 juni 2025, sectie D.4 |
| Anthropic maandplafond per tier | Start $500, Build $1.000, Scale $200.000; eigen lagere limiet instelbaar |
| OpenRouter-fee bij opwaarderen | 5,5% (minimaal $0,80) per kaart, 5% bij crypto ([Bron: OpenRouter](https://openrouter.ai/docs/faq)) |

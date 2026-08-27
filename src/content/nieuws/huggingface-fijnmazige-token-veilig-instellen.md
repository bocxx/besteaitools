---
title: "Hugging Face-token: zo stel je een fijnmazige token veilig in"
description: "Een read-token geeft toegang tot al je private repo's. Een fijnmazige token tot precies één model. Zo maak je hem aan, waar bewaar je hem, en wat doe je bij een lek."
heroImage: "/images/articles/diorama-huggingface-fijnmazige-token-veilig-instellen.webp"
publishedAt: 2026-08-27
updatedAt: 2026-08-27
author: "Redactie"
category: "gids"
tags:
  - "huggingface"
  - "access-token"
  - "api-key"
  - "beveiliging"
  - "ci-cd"
  - "secrets"
toolSlug: "huggingface"
featured: false
draft: false
readingTime: 5
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Hugging Face-token: zo stel je een fijnmazige token veilig in'"
heroScene: "A small brass keyring on a workbench holding a single labelled key, a row of numbered lockers behind it"
keyTakeaways:
  - "Een read-token opent al je private repo's; een fijnmazige token alleen de repo's die je aanwijst."
  - "Maak één token per toepassing, zodat je er één kunt intrekken zonder de rest te breken."
  - "Bij een gelekte token: verwijderen of verversen in je instellingen, direct."
  - "Voor CI/CD hoef je helemaal geen token op te slaan; Trusted Publishers ruilt een OIDC-identiteit om voor een kortlevende token."
faq:
  - q: "Wat is het verschil tussen read, write en fine-grained?"
    a: "Een read-token geeft leesrechten op alles wat jij mag lezen: publieke repo's, je eigen private repo's en die van organisaties waar je lid van bent. Een write-token doet daar schrijfrechten bovenop. Een fijnmazige token werkt andersom: die geeft standaard niets en jij vinkt precies aan welk model, welke dataset of welke organisatie hij mag benaderen. Hugging Face raadt fijnmazige tokens aan voor alles wat in productie draait."
  - q: "Waarom één token per toepassing?"
    a: "Omdat je dan één ding kunt uitzetten zonder de rest om te gooien. Gebruik je overal dezelfde token, dan is intrekken na een lek een keuze tussen alles kapotmaken of het risico laten staan. Met een token voor je laptop, één voor je Colab-notebook en één voor je inferentieserver verwijder je de gelekte en draaien de andere twee gewoon door."
  - q: "Waar bewaar ik zo'n token?"
    a: "Niet in je code en niet in een container-image. Zet hem in een omgevingsvariabele of een secret manager, en vervang hem periodiek. In Python geef je hem door aan de bibliotheek in plaats van hem in het bestand te typen. Hugging Face scant repo's bovendien op per ongeluk gecommitte sleutels, maar reken daar niet op als vangnet."
  - q: "Ik heb een token van iemand anders gevonden. Wat nu?"
    a: "Die kun je zelf ongeldig maken, zonder enige rechten op dat account. Hugging Face heeft daarvoor het endpoint POST /api/credentials/revoke, waar je een of meer tokenwaardes in een lijst aanbiedt. Elke waarde die bestaat, stopt onmiddellijk met werken en de eigenaar krijgt een mail. Het endpoint antwoordt altijd met 202, ook als de token niet bestond, zodat niemand het kan misbruiken om te testen of een token geldig is."
  - q: "Mijn token blijft op 'pending' staan. Hoe kan dat?"
    a: "Dan hoor je bij een organisatie op een Team- of Enterprise-plan die goedkeuring vereist voor tokens. Een fijnmazige token die je op die organisatie richt, komt automatisch in de wacht tot een beheerder hem goedkeurt; je ziet dan een oranje zandloper bij de token. Wordt hij afgewezen, dan werkt hij nog wel voor alles buiten die organisatie, en tegen organisatie-resources krijg je een 403."
---

Een gelekte sleutel is nog altijd de saaiste en meest voorkomende manier waarop iemand ergens binnenkomt. Dat gold ook bij het [incident rond Hugging Face van afgelopen zomer](https://hetlaatsteainieuws.nl/nieuws/openai-veiligheidsmaatregelen-hugging-face-inbraak): inloggegevens die ergens rondslingerden, waren het eerste bruikbare houvast.

De rem daarop is niet ingewikkeld. Je zorgt dat elke token zo weinig mogelijk mag, en dat je er één kunt weggooien zonder de rest te breken. Hugging Face heeft daar een aparte tokensoort voor.

## De drie soorten, kort

Op [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) kies je bij het aanmaken uit drie rollen.

**Read** geeft leesrechten op alles wat jij mag lezen. Dus ook op je private repo's en op die van elke organisatie waar je lid van bent. Handig voor even snel een gated model downloaden, riskant zodra hij ergens blijft staan.

**Write** doet daar schrijfrechten bovenop, op alle repo's waar jij schrijfrechten hebt. Nodig als je modellen pusht of een model card aanpast.

**Fine-grained** begint bij niets. Jij vinkt aan welke specifieke repo's of organisaties de token mag benaderen en welke handelingen hij daar mag doen. Hugging Face noemt dit expliciet de aanbevolen vorm voor productie: lekt hij, dan is de schade beperkt tot wat je hebt aangevinkt.

## Zo maak je er een aan

1. Ga naar je instellingen en open het tabblad **Access Tokens**.
2. Klik op **New token** en kies rol **Fine-grained**.
3. Geef de token een naam die zegt wáár hij draait. Niet "token2", wel "prod-inference-server" of "colab-experimenten".
4. Vink alleen de repo's aan die deze toepassing echt nodig heeft. Draait er een productie-app op één gated model, dan is dat één vinkje.
5. Kopieer de waarde en plak hem meteen op zijn eindbestemming. Je krijgt hem niet nog een keer te zien.

Herhaal dit per toepassing. Je laptop, je notebook en je server krijgen elk een eigen token. Dat voelt omslachtig tot de eerste keer dat je er één moet intrekken.

## Waar je hem neerzet

Niet in je code, niet in een image, niet in een commit. Een omgevingsvariabele of een secret manager, en verder niks:

```python
import os
from transformers import AutoModel

model = AutoModel.from_pretrained(
    "jouw-org/jouw-model",
    token=os.environ["HF_TOKEN"],
)
```

Hugging Face scant repo's op per ongeluk gepubliceerde sleutels, maar dat is een vangnet en geen plan.

## Voor CI/CD: helemaal geen token

Draait je pipeline in GitHub Actions, GitLab CI of CircleCI, dan hoef je daar niets op te slaan. Met **Trusted Publishers** ruilt Hugging Face de OIDC-identiteit van je CI-provider bij elke run in voor een kortlevende token. Die kan repo-gebonden zijn, om modellen, datasets, Spaces of kernels te publiceren, of gebruikersgebonden, om gated repo's te lezen met jouw rate limits.

Het scheelt je een secret dat nooit verloopt en dat iedereen met toegang tot je CI-instellingen kan uitlezen.

## Als het misgaat

Is je eigen token gelekt, verwijder of ververs hem dan direct in het tabblad Access Tokens. Vind je die van iemand anders, dan kun je hem ook zelf ongeldig maken, zonder enige rechten op dat account:

```bash
curl -X POST "https://huggingface.co/api/credentials/revoke" \
  -H "Content-Type: application/json" \
  -d "{\"credentials\": [\"${LEAKED_HF_TOKEN}\"]}"
```

Je mag meerdere waardes tegelijk aanbieden, wat handig is voor een scanpijplijn die in batches meldt. Elke waarde die bestaat, werkt onmiddellijk nergens meer en de eigenaar krijgt bericht. Het endpoint antwoordt altijd met `202`, ook op een token die niet bestaat, zodat niemand het kan gebruiken om te raden of een sleutel geldig is. Zet de waarde in een variabele of bestand, zodat hij niet in je shell-geschiedenis achterblijft.

## Werk je binnen een organisatie

Op Team- en Enterprise-plannen kan een beheerder een tokenbeleid instellen, en dan gelden er extra regels. Een fijnmazige token die je op zo'n organisatie richt, komt eerst in de wacht te staan; in je tokenlijst zie je dan een oranje zandloper. Je krijgt een mail zodra hij is goedgekeurd of afgewezen. Afgewezen tokens blijven werken voor alles buiten die organisatie. Intrekken is definitief: dan maak je een nieuwe aan.

Staat het beleid op "alleen fijnmazige tokens", dan worden je oude read- en write-tokens tegen die organisatie geweigerd met een 403. Ook dat is een goede reden om nu al om te schakelen.

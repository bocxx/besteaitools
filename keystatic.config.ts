/**
 * Keystatic CMS — local-only mode
 *
 * Workflow:
 *   1. npm run dev
 *   2. Open http://localhost:4321/keystatic
 *   3. Edit tool profiles via the UI
 *   4. Save → JSON files in src/content/tools/ are updated
 *   5. Commit + push → auto-deploys to Cloudflare
 *
 * Not active in production builds (output: static).
 */
import { config, fields, collection } from '@keystatic/core';
import {
  toolCategories, pricingModels, difficultyLevels, businessFunctions,
  deploymentTypes, dataResidencyOptions, targetAudienceOptions,
  fundingStages, timeToFirstValueOptions, setupComplexityLevels,
  learningCurveLevels, qualityLevels, companySizeFitOptions, useCaseStages,
  reviewMethods, pricingCurrencies,
  // Matching-plan taxonomies
  segments, useCaseBuckets, jtbds, integrations as integrationsTax,
  dutchOutputQualityLevels, dataTrainingUseOptions, aiActRiskClasses,
  vendorLockInRisks, setupTimeBuckets,
} from './src/lib/tools-schema';

const categoryOptions = Object.entries(toolCategories).map(([value, category]) => ({
  label: category.name,
  value,
}));

const pricingOptions = Object.entries(pricingModels).map(([value, model]) => ({
  label: model.label,
  value,
}));

const difficultyOptions = Object.entries(difficultyLevels).map(([value, level]) => ({
  label: level.label,
  value,
}));

const businessFunctionOptions = Object.entries(businessFunctions).map(([value, fn]) => ({
  label: fn.name,
  value,
}));

const deploymentTypeOptions = Object.entries(deploymentTypes).map(([value, dt]) => ({
  label: dt.label,
  value,
}));

const dataResidencyOpts = Object.entries(dataResidencyOptions).map(([value, dr]) => ({
  label: dr.label,
  value,
}));

const targetAudienceOpts = Object.entries(targetAudienceOptions).map(([value, ta]) => ({
  label: ta.label,
  value,
}));

const fundingStageOpts = Object.entries(fundingStages).map(([value, fs]) => ({
  label: fs.label,
  value,
}));

const timeToFirstValueOpts = Object.entries(timeToFirstValueOptions).map(([value, t]) => ({
  label: t.label,
  value,
}));

const setupComplexityOpts = Object.entries(setupComplexityLevels).map(([value, s]) => ({
  label: s.label,
  value,
}));

const learningCurveOpts = Object.entries(learningCurveLevels).map(([value, l]) => ({
  label: l.label,
  value,
}));

const qualityLevelOpts = Object.entries(qualityLevels).map(([value, q]) => ({
  label: q.label,
  value,
}));

const companySizeFitOpts = Object.entries(companySizeFitOptions).map(([value, c]) => ({
  label: c.label,
  value,
}));

const useCaseStageOpts = Object.entries(useCaseStages).map(([value, u]) => ({
  label: u.label,
  value,
}));

const reviewMethodOpts = Object.entries(reviewMethods).map(([value, r]) => ({
  label: r.label,
  value,
}));

const pricingCurrencyOpts = Object.entries(pricingCurrencies).map(([value, c]) => ({
  label: c.label,
  value,
}));

// ── Matching-plan option arrays ────────────────────────
const segmentOpts = Object.entries(segments).map(([value, s]) => ({
  label: s.label,
  value,
}));

const useCaseBucketOpts = Object.entries(useCaseBuckets).map(([value, u]) => ({
  label: u.label,
  value,
}));

const jtbdOpts = Object.entries(jtbds).map(([value, j]) => ({
  label: `${j.label} · ${j.bucket}`,
  value,
}));

const integrationTaxOpts = Object.entries(integrationsTax).map(([value, i]) => ({
  label: `${i.label} · ${i.category}`,
  value,
}));

const dutchOutputQualityOpts = Object.entries(dutchOutputQualityLevels).map(([value, d]) => ({
  label: d.label,
  value,
}));

const dataTrainingUseOpts = Object.entries(dataTrainingUseOptions).map(([value, d]) => ({
  label: d.label,
  value,
}));

const aiActRiskOpts = Object.entries(aiActRiskClasses).map(([value, a]) => ({
  label: a.label,
  value,
}));

const vendorLockInOpts = Object.entries(vendorLockInRisks).map(([value, v]) => ({
  label: v.label,
  value,
}));

const setupTimeOpts = Object.entries(setupTimeBuckets).map(([value, s]) => ({
  label: s.label,
  value,
}));

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    tools: collection({
      label: 'Tools',
      path: 'src/content/tools/*',
      slugField: 'name',
      format: {
        data: 'json',
      },
      columns: ['name', 'category', 'draft'],
      schema: {
        name: fields.slug({
          name: { label: 'Naam' },
          slug: {
            label: 'Slug',
            description: 'Wordt gebruikt voor de URL en moet overeenkomen met newsflux.',
          },
        }),
        category: fields.select({
          label: 'Categorie',
          options: categoryOptions,
          defaultValue: 'chatbots',
        }),
        websiteUrl: fields.url({
          label: 'Website URL',
        }),
        shortDescription: fields.text({
          label: 'Korte beschrijving',
          multiline: true,
        }),
        longDescription: fields.text({
          label: 'Lange beschrijving',
          multiline: true,
        }),
        bestFor: fields.text({
          label: 'Beste voor',
          multiline: true,
        }),
        useCases: fields.array(
          fields.text({ label: 'Use case' }),
          {
            label: 'Use cases',
            itemLabel: (props) => props.value || 'Use case',
          },
        ),
        strengths: fields.array(
          fields.text({ label: 'Sterkte' }),
          {
            label: 'Sterktes',
            itemLabel: (props) => props.value || 'Sterkte',
          },
        ),
        limitations: fields.array(
          fields.text({ label: 'Beperking' }),
          {
            label: 'Beperkingen',
            itemLabel: (props) => props.value || 'Beperking',
          },
        ),
        pricing: fields.text({
          label: 'Prijsinfo',
          multiline: true,
        }),
        openSource: fields.checkbox({
          label: 'Open source',
          defaultValue: false,
        }),
        pricingModel: fields.select({
          label: 'Prijsmodel',
          options: pricingOptions,
          defaultValue: 'freemium',
        }),
        difficulty: fields.select({
          label: 'Moeilijkheid',
          options: difficultyOptions,
          defaultValue: 'beginner',
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value || 'Tag',
          },
        ),
        businessFunctions: fields.multiselect({
          label: 'Zakelijke functies',
          description: 'Voor welke bedrijfsfuncties is deze tool relevant?',
          options: businessFunctionOptions,
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Draft tools worden niet op de site getoond.',
          defaultValue: false,
        }),
        // Zakelijke metadata
        deploymentType: fields.select({
          label: 'Deployment type',
          description: 'Hoe wordt de tool aangeboden?',
          options: [
            { label: '— Niet ingevuld', value: '' },
            ...deploymentTypeOptions,
          ],
          defaultValue: '',
        }),
        dataResidency: fields.select({
          label: 'Data residency',
          description: 'Waar staat de data?',
          options: [
            { label: '— Niet ingevuld', value: '' },
            ...dataResidencyOpts,
          ],
          defaultValue: '',
        }),
        targetAudience: fields.multiselect({
          label: 'Doelgroep',
          description: 'Voor welk type organisatie is deze tool geschikt?',
          options: targetAudienceOpts,
        }),
        nlSupport: fields.checkbox({
          label: 'Nederlandse ondersteuning (legacy)',
          description: 'Legacy veld — gebruik de granulaire NL-velden hieronder.',
          defaultValue: false,
        }),
        integrations: fields.array(
          fields.text({ label: 'Integratie' }),
          {
            label: 'Integraties',
            description: 'Bekende koppelingen (Microsoft 365, Slack, HubSpot, etc.)',
            itemLabel: (props) => props.value || 'Integratie',
          },
        ),

        // ── Laag 1: Marktrijpheid ─────────────────────
        yearsActive: fields.integer({
          label: 'Jaren actief',
          description: 'Hoe lang is deze tool al op de markt?',
          validation: { min: 0 },
        }),
        notableCustomers: fields.array(
          fields.text({ label: 'Klant' }),
          {
            label: 'Bekende klanten',
            description: 'Herkenbare bedrijven die deze tool gebruiken.',
            itemLabel: (props) => props.value || 'Klant',
          },
        ),
        g2Rating: fields.number({
          label: 'G2 Rating',
          description: 'Score op G2 (0-5, bv. 4.6).',
          validation: { min: 0, max: 5 },
        }),
        g2ReviewCount: fields.integer({
          label: 'G2 Reviews',
          description: 'Aantal reviews op G2.',
          validation: { min: 0 },
        }),
        fundingStage: fields.select({
          label: 'Financieringsfase',
          description: 'In welke fase zit het bedrijf achter de tool?',
          options: [
            { label: '— Niet ingevuld', value: '' },
            ...fundingStageOpts,
          ],
          defaultValue: '',
        }),

        // ── Laag 2: Inzetbaarheid ─────────────────────
        timeToFirstValue: fields.select({
          label: 'Tijd tot eerste waarde',
          description: 'Hoe snel kan een team beginnen met deze tool?',
          options: [
            { label: '— Niet ingevuld', value: '' },
            ...timeToFirstValueOpts,
          ],
          defaultValue: '',
        }),
        setupComplexity: fields.select({
          label: 'Setup complexiteit',
          description: 'Hoe complex is de initiële setup?',
          options: [
            { label: '— Niet ingevuld', value: '' },
            ...setupComplexityOpts,
          ],
          defaultValue: '',
        }),
        requiresDeveloper: fields.checkbox({
          label: 'Developer vereist',
          description: 'Is een developer nodig voor setup of dagelijks gebruik?',
          defaultValue: false,
        }),
        freeTrialAvailable: fields.checkbox({
          label: 'Gratis proefperiode',
          description: 'Is er een gratis trial beschikbaar?',
          defaultValue: false,
        }),
        pilotFriendly: fields.checkbox({
          label: 'Pilot-vriendelijk',
          description: 'Kan de tool makkelijk als pilot worden ingezet?',
          defaultValue: false,
        }),

        // ── Laag 3: Governance & risico ───────────────
        gdprReady: fields.checkbox({
          label: 'GDPR-ready',
          description: 'Voldoet de tool aan GDPR/AVG?',
          defaultValue: false,
        }),
        euHostingAvailable: fields.checkbox({
          label: 'EU hosting beschikbaar',
          description: 'Kan data in de EU worden gehost?',
          defaultValue: false,
        }),
        dpaAvailable: fields.checkbox({
          label: 'DPA beschikbaar',
          description: 'Is er een Data Processing Agreement (verwerkersovereenkomst)?',
          defaultValue: false,
        }),
        soc2: fields.checkbox({
          label: 'SOC 2',
          description: 'Is de tool SOC 2 gecertificeerd?',
          defaultValue: false,
        }),
        sso: fields.checkbox({
          label: 'SSO',
          description: 'Ondersteunt de tool Single Sign-On?',
          defaultValue: false,
        }),
        auditLogs: fields.checkbox({
          label: 'Audit logs',
          description: 'Heeft de tool audit logging?',
          defaultValue: false,
        }),

        // ── Laag 4: UX & adoptie ──────────────────────
        easeOfUseScore: fields.integer({
          label: 'Gebruiksgemak (1-10)',
          description: 'Redactiescore voor gebruiksgemak.',
          validation: { min: 1, max: 10 },
        }),
        learningCurve: fields.select({
          label: 'Leercurve',
          description: 'Hoe steil is de leercurve voor nieuwe gebruikers?',
          options: [
            { label: '— Niet ingevuld', value: '' },
            ...learningCurveOpts,
          ],
          defaultValue: '',
        }),
        documentationQuality: fields.select({
          label: 'Documentatiekwaliteit',
          description: 'Hoe goed is de documentatie?',
          options: [
            { label: '— Niet ingevuld', value: '' },
            ...qualityLevelOpts,
          ],
          defaultValue: '',
        }),
        supportQuality: fields.select({
          label: 'Supportkwaliteit',
          description: 'Hoe goed is de klantenservice?',
          options: [
            { label: '— Niet ingevuld', value: '' },
            ...qualityLevelOpts,
          ],
          defaultValue: '',
        }),

        // ── Laag 5: Concrete fit ──────────────────────
        primaryJobsToBeDone: fields.array(
          fields.text({ label: 'Taak' }),
          {
            label: 'Primaire taken (Jobs to be Done)',
            description: 'Welke concrete taken lost deze tool op?',
            itemLabel: (props) => props.value || 'Taak',
          },
        ),
        companySizeFit: fields.multiselect({
          label: 'Bedrijfsgrootte',
          description: 'Voor welke bedrijfsgroottes past deze tool?',
          options: companySizeFitOpts,
        }),
        bestUseCaseStage: fields.select({
          label: 'Beste inzetfase',
          description: 'In welke fase van adoptie werkt deze tool het best?',
          options: [
            { label: '— Niet ingevuld', value: '' },
            ...useCaseStageOpts,
          ],
          defaultValue: '',
        }),
        antiUseCases: fields.array(
          fields.text({ label: 'Anti-use case' }),
          {
            label: 'Wanneer NIET gebruiken',
            description: 'Situaties waarin je deze tool juist níet moet kiezen.',
            itemLabel: (props) => props.value || 'Anti-use case',
          },
        ),
        replacementFor: fields.array(
          fields.text({ label: 'Vervangt' }),
          {
            label: 'Vervangt',
            description: 'Welke tools of processen kan deze tool vervangen?',
            itemLabel: (props) => props.value || 'Tool',
          },
        ),

        // ── Laag 6: Prijsvergelijking ───────────────────
        startingPriceMonthly: fields.number({
          label: 'Startprijs per maand',
          description: 'Laagste maandprijs (numeriek, voor vergelijking en filtering).',
          validation: { min: 0 },
        }),
        pricingCurrency: fields.select({
          label: 'Valuta',
          options: pricingCurrencyOpts,
          defaultValue: 'eur',
        }),
        hasFreePlan: fields.checkbox({
          label: 'Gratis plan beschikbaar',
          description: 'Is er een volledig gratis plan (niet alleen freemium)?',
          defaultValue: false,
        }),
        hasDemo: fields.checkbox({
          label: 'Demo beschikbaar',
          description: 'Is er een productdemo beschikbaar?',
          defaultValue: false,
        }),
        bookDemoRequired: fields.checkbox({
          label: 'Demo boeken verplicht',
          description: 'Moet je een demo boeken om de tool te proberen?',
          defaultValue: false,
        }),

        // ── Laag 7: Nederlandse ondersteuning (granulair) ─
        supportsDutchLanguage: fields.checkbox({
          label: 'Ondersteunt Nederlands (taal)',
          description: 'Produceert de tool Nederlandstalige output (chat, tekst, spraak)?',
          defaultValue: false,
        }),
        hasDutchUI: fields.checkbox({
          label: 'Nederlandse interface',
          description: 'Is de gebruikersinterface beschikbaar in het Nederlands?',
          defaultValue: false,
        }),
        offersDutchSupport: fields.checkbox({
          label: 'Nederlandstalige support',
          description: 'Biedt de tool klantenservice in het Nederlands?',
          defaultValue: false,
        }),

        // ── Laag 8: Concurrenten & positionering ──────
        mainCompetitors: fields.array(
          fields.text({ label: 'Concurrent (slug)' }),
          {
            label: 'Belangrijkste concurrenten',
            description: 'Slugs van concurrerende tools (bv. "chatgpt", "claude").',
            itemLabel: (props) => props.value || 'Concurrent',
          },
        ),
        whenToChoose: fields.text({
          label: 'Wanneer kiezen',
          description: 'Wanneer kies je déze tool boven de alternatieven?',
          multiline: true,
        }),

        // ── Laag 9: Praktische evaluatie ──────────────
        headlineValueProp: fields.text({
          label: 'Waardepropositie (1 zin)',
          description: 'Eén ultraheldere zin voor bovenaan de pagina, bv. "AI-klantenserviceplatform voor enterprise teams".',
          multiline: false,
        }),
        implementationTimeEstimate: fields.text({
          label: 'Implementatietijd',
          description: 'Geschatte implementatieduur, bv. "1–2 weken" of "Dezelfde dag".',
          multiline: false,
        }),
        screenshotUrls: fields.array(
          fields.text({ label: 'Screenshot URL' }),
          {
            label: 'Screenshots',
            description: 'URLs naar productscreenshots.',
            itemLabel: (props) => props.value || 'Screenshot',
          },
        ),
        demoUrl: fields.url({
          label: 'Demo URL',
          description: 'Link naar demo of trial-pagina.',
        }),
        exampleOutput: fields.text({
          label: 'Voorbeeld output',
          description: 'Beschrijving van typische output die de tool produceert.',
          multiline: true,
        }),
        exampleWorkflow: fields.text({
          label: 'Voorbeeld workflow',
          description: 'Beschrijving van een typische workflow met de tool.',
          multiline: true,
        }),

        // ── Redactionele laag ─────────────────────────
        testedByEditor: fields.checkbox({
          label: 'Getest door redactie',
          description: 'Heeft een redacteur deze tool persoonlijk getest?',
          defaultValue: false,
        }),
        reviewMethod: fields.select({
          label: 'Beoordelingsmethode',
          description: 'Hoe is deze tool beoordeeld?',
          options: [
            { label: '— Niet ingevuld', value: '' },
            ...reviewMethodOpts,
          ],
          defaultValue: '',
        }),
        lastReviewedAt: fields.text({
          label: 'Laatst beoordeeld op',
          description: 'ISO-datum van de laatste redactionele beoordeling (bv. 2026-04-15).',
          multiline: false,
        }),
        verdict: fields.text({
          label: 'Redactioneel oordeel',
          description: 'Kort oordeel in het Nederlands.',
          multiline: true,
        }),
        bestAlternative: fields.text({
          label: 'Beste alternatief (legacy)',
          description: 'Slug van de beste alternatieve tool — gebruik "Belangrijkste concurrenten" hierboven.',
        }),
        whyListed: fields.text({
          label: 'Waarom op de site',
          description: 'Waarom staat deze tool op debesteaitools.nl ondanks alternatieven?',
          multiline: true,
        }),

        // ── Laag 10: Functies (capabilities) ────────────────
        // ============================================
        // MATCHING-PLAN v2 VELDEN (§5b)
        // ============================================

        // ── Matching Laag 1: segment-fit ─────────────
        matchSegments: fields.multiselect({
          label: '[Match] Segmenten',
          description: 'Voor welke segmenten is deze tool geschikt? (intake Laag 1)',
          options: segmentOpts,
        }),
        idealTeamSize: fields.conditional(
          fields.checkbox({ label: '[Match] Ideale teamgrootte instellen', defaultValue: false }),
          {
            false: fields.empty(),
            true: fields.object({
              min: fields.integer({ label: 'Minimum teamgrootte', validation: { min: 1 } }),
              max: fields.integer({ label: 'Maximum teamgrootte', validation: { min: 1 } }),
            }),
          },
        ),

        // ── Matching Laag 2: use-cases & JTBDs ───────
        useCaseBuckets: fields.multiselect({
          label: '[Match] Use-case buckets',
          description: 'Top-level use-case categorieën (Laag 2 intake).',
          options: useCaseBucketOpts,
        }),
        matchJtbds: fields.multiselect({
          label: '[Match] Jobs-to-be-done (controlled)',
          description: 'Granulaire JTBDs; gekoppeld aan use-case buckets.',
          options: jtbdOpts,
        }),

        // ── Matching Laag 4: constraints ─────────────
        setupTime: fields.select({
          label: '[Match] Setup-tijd',
          description: 'Preferred over tijdToFirstValue + setupComplexity.',
          options: [{ label: '— Niet ingevuld', value: '' }, ...setupTimeOpts],
          defaultValue: '',
        }),
        outputLanguageQualityNl: fields.select({
          label: '[Match] Kwaliteit Nederlandse output',
          description: 'Hoe goed schrijft/spreekt de tool écht Nederlands?',
          options: [{ label: '— Niet beoordeeld', value: '' }, ...dutchOutputQualityOpts],
          defaultValue: '',
        }),
        dataUsedForTraining: fields.select({
          label: '[Match] Data gebruikt voor training?',
          description: 'AVG-kritisch: wordt klantdata gebruikt om het model te trainen?',
          options: [{ label: '— Onbekend', value: '' }, ...dataTrainingUseOpts],
          defaultValue: '',
        }),
        aiActRiskClass: fields.select({
          label: '[Match] AI Act risico-klasse',
          description: 'EU AI Act classificatie (voor overheid/HR).',
          options: [{ label: '— Niet ingevuld', value: '' }, ...aiActRiskOpts],
          defaultValue: '',
        }),
        vendorLockInRisk: fields.select({
          label: '[Match] Vendor lock-in risico',
          description: 'Hoe moeilijk is het om weg te migreren?',
          options: [{ label: '— Niet ingevuld', value: '' }, ...vendorLockInOpts],
          defaultValue: '',
        }),
        controlledIntegrations: fields.multiselect({
          label: '[Match] Integraties (controlled)',
          description: 'Controlled lijst; vrije-tekst "Integraties" blijft voor display.',
          options: integrationTaxOpts,
        }),

        // ── Matching Laag 5: pricing structure ───────
        priceTiers: fields.array(
          fields.object({
            name: fields.text({ label: 'Tier naam', description: 'Bv. "Starter", "Pro", "Business".' }),
            eurPerMonth: fields.number({ label: '€ per maand', validation: { min: 0 } }),
            perSeat: fields.checkbox({ label: 'Per gebruiker', defaultValue: false }),
            features: fields.array(
              fields.text({ label: 'Feature' }),
              { label: 'Features', itemLabel: (p) => p.value || 'Feature' },
            ),
          }),
          {
            label: '[Match] Prijs-tiers',
            description: 'Gestructureerd; vult gat tussen vrije-tekst "pricing" en numeriek "startingPriceMonthly".',
            itemLabel: (p) => p.fields.name.value || 'Tier',
          },
        ),
        freeTierLimits: fields.text({
          label: '[Match] Gratis-tier limieten (JSON)',
          description: 'Free-form JSON, bv. {"convs_per_day": 10, "export": false}. Laat leeg als n.v.t.',
          multiline: true,
        }),

        // ── Matching UX & adoptie ────────────────────
        beginnerFriendlyScore: fields.integer({
          label: '[Match] Beginner-vriendelijkheid (1-10)',
          description: 'Aparte score; gevorderden vinden Zapier easy, beginners niet.',
          validation: { min: 1, max: 10 },
        }),
        typicalWeeklyTimeSaved: fields.text({
          label: '[Match] Typische tijdwinst per week',
          description: 'Bv. "2-4 uur/week voor tekst-taken".',
          multiline: false,
        }),
        complementaryTools: fields.array(
          fields.text({ label: 'Slug' }),
          {
            label: '[Match] Aanvullende tools',
            description: 'Slugs van tools die goed samenwerken met deze.',
            itemLabel: (p) => p.value || 'Slug',
          },
        ),
        replacesTools: fields.array(
          fields.text({ label: 'Slug of naam' }),
          {
            label: '[Match] Vervangt tools',
            description: 'Tools die deze vervangt (sterke match-boost).',
            itemLabel: (p) => p.value || 'Tool',
          },
        ),

        // ── Vereniging-specifiek ─────────────────────
        verenigingSuitable: fields.checkbox({
          label: '[Match] Geschikt voor vereniging',
          description: 'Expliciet goedgekeurd voor vrijwilligersorganisaties.',
          defaultValue: false,
        }),
        verenigingNotes: fields.text({
          label: '[Match] Notities vereniging',
          description: 'Nuance bij de vereniging-flag.',
          multiline: true,
        }),

        // ── Introductievolgorde ──────────────────────
        toolIntroductionOrder: fields.text({
          label: '[Match] Introductievolgorde (JSON)',
          description: 'Per use-case bucket: volgorde (1 = start), bv. {"writing": 1, "images": 2}.',
          multiline: true,
        }),

        keyFeatures: fields.array(
          fields.object({
            title: fields.text({
              label: 'Functienaam',
              description: 'Korte naam van de functie (bv. "200k contextvenster").',
            }),
            description: fields.text({
              label: 'Beschrijving',
              description: 'Een één-zins uitleg van wat de functie doet.',
              multiline: true,
            }),
            group: fields.select({
              label: 'Groep',
              description: 'Optionele groepering op de detailpagina.',
              options: [
                { label: '— Niet ingevuld', value: '' },
                { label: 'Kern',         value: 'core' },
                { label: 'Invoer',       value: 'input' },
                { label: 'Uitvoer',      value: 'output' },
                { label: 'Integraties',  value: 'integration' },
                { label: 'Enterprise',   value: 'enterprise' },
                { label: 'Experimenteel', value: 'beta' },
              ],
              defaultValue: '',
            }),
            badge: fields.select({
              label: 'Badge',
              description: 'Optionele badge zoals "nieuw" of "beta".',
              options: [
                { label: '— Geen badge', value: '' },
                { label: 'Nieuw', value: 'nieuw' },
                { label: 'Beta',  value: 'beta' },
                { label: 'Pro',   value: 'pro' },
              ],
              defaultValue: '',
            }),
          }),
          {
            label: 'Functies',
            description: 'Concrete capabilities van de tool (wat kan het?).',
            itemLabel: (props) => props.fields.title.value || 'Functie',
          },
        ),
      },
    }),
  },
});

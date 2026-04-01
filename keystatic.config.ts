import { config, fields, collection } from '@keystatic/core';
import {
  toolCategories, pricingModels, difficultyLevels, businessFunctions,
  deploymentTypes, dataResidencyOptions, targetAudienceOptions,
  fundingStages, timeToFirstValueOptions, setupComplexityLevels,
  learningCurveLevels, qualityLevels, companySizeFitOptions, useCaseStages,
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
          label: 'Nederlandse ondersteuning',
          description: 'Ondersteunt de tool Nederlands (UI, chat of spraak)?',
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

        // ── Redactionele laag ─────────────────────────
        testedByEditor: fields.checkbox({
          label: 'Getest door redactie',
          description: 'Heeft een redacteur deze tool persoonlijk getest?',
          defaultValue: false,
        }),
        verdict: fields.text({
          label: 'Redactioneel oordeel',
          description: 'Kort oordeel in het Nederlands.',
          multiline: true,
        }),
        bestAlternative: fields.text({
          label: 'Beste alternatief',
          description: 'Slug van de beste alternatieve tool (bv. "chatgpt").',
        }),
        whyListed: fields.text({
          label: 'Waarom op de site',
          description: 'Waarom staat deze tool op debesteaitools.nl ondanks alternatieven?',
          multiline: true,
        }),
      },
    }),
  },
});

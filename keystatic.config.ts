import { config, fields, collection } from '@keystatic/core';
import {
  toolCategories, pricingModels, difficultyLevels, businessFunctions,
  deploymentTypes, dataResidencyOptions, targetAudienceOptions,
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
      },
    }),
  },
});

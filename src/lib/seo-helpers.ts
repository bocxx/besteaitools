/**
 * SEO Helpers
 *
 * Generates structured data (JSON-LD), meta titles/descriptions,
 * FAQ items, and content-freshness signals from tool data.
 */

import type { Tool } from '../types/tools-domain';
import {
  toolCategories, pricingModels, pricingCurrencies,
  setupComplexityLevels, timeToFirstValueOptions,
  companySizeFitOptions,
} from './tools-schema';
import type { ToolCategoryKey } from './tools-schema';

// ============================================
// META TITLE / DESCRIPTION
// ============================================

const CURRENT_YEAR = new Date().getFullYear();

/** Tool detail page meta title.
 *  Front-load tool-naam + commerciële modifiers (prijzen/alternatieven) die
 *  mensen daadwerkelijk intikken bij een tool-naam. De categorie als filler
 *  ("– X AI Tool") is geschrapt: die voegt voor de zoeker niets toe. */
export function toolMetaTitle(tool: Tool): string {
  return `${tool.name} review (${CURRENT_YEAR}): prijzen, functies & alternatieven | debesteaitools.nl`;
}

/** Tool detail page meta description */
export function toolMetaDescription(tool: Tool): string {
  const parts: string[] = [];
  parts.push(tool.shortDescription);
  if (tool.bestFor) parts.push(tool.bestFor);
  const base = parts.join(' · ').slice(0, 150);
  return `${base} — Vergelijk op prijs, functies en reviews.`;
}

/** Category overview page meta title */
export function categoryMetaTitle(categoryKey: ToolCategoryKey): string {
  const cat = toolCategories[categoryKey];
  return `Beste AI-tools voor ${cat.name} (${CURRENT_YEAR}) – Vergelijk & kies | debesteaitools.nl`;
}

/** Category overview page meta description */
export function categoryMetaDescription(categoryKey: ToolCategoryKey, count: number): string {
  const cat = toolCategories[categoryKey];
  return `Vergelijk ${count}+ ${cat.name.toLowerCase()} AI-tools op prijs, functies en reviews. Onafhankelijk gerankt – altijd up-to-date.`;
}

/** Comparison page meta title */
export function comparisonMetaTitle(nameA: string, nameB: string): string {
  return `${nameA} vs ${nameB} – Welke past bij jou? (${CURRENT_YEAR}) | debesteaitools.nl`;
}

/** Comparison page meta description */
export function comparisonMetaDescription(nameA: string, nameB: string): string {
  return `${nameA} of ${nameB}? Vergelijk functies, prijs, implementatie en reviews. Onafhankelijk advies om de beste keuze te maken.`;
}

// ============================================
// FAQ GENERATION
// ============================================

export interface FaqItem {
  question: string;
  answer: string;
}

/** Generate FAQ items from tool data for FAQPage schema */
export function generateToolFaqs(tool: Tool): FaqItem[] {
  const faqs: FaqItem[] = [];

  // For whom?
  if (tool.bestFor) {
    faqs.push({
      question: `Voor wie is ${tool.name} het meest geschikt?`,
      answer: tool.bestFor,
    });
  }

  // Pricing
  if (tool.pricing || tool.pricingModel) {
    const pricing = pricingModels[tool.pricingModel];
    const parts: string[] = [];
    parts.push(`${tool.name} hanteert een ${pricing.label.toLowerCase()} prijsmodel.`);
    if (tool.pricing) parts.push(tool.pricing);
    if (tool.hasFreePlan) parts.push('Er is een gratis plan beschikbaar.');
    if (tool.freeTrialAvailable) parts.push('Een gratis proefperiode is beschikbaar.');
    if (tool.startingPriceMonthly != null) {
      const curr = pricingCurrencies[tool.pricingCurrency ?? 'eur'];
      parts.push(`Prijzen starten vanaf ${curr.symbol}${tool.startingPriceMonthly}/maand.`);
    }
    faqs.push({
      question: `Wat kost ${tool.name}?`,
      answer: parts.join(' '),
    });
  }

  // GDPR / compliance
  const complianceParts: string[] = [];
  if (tool.gdprReady) complianceParts.push('voldoet aan GDPR/AVG');
  if (tool.euHostingAvailable) complianceParts.push('biedt EU-hosting');
  if (tool.dpaAvailable) complianceParts.push('heeft een verwerkersovereenkomst (DPA)');
  if (tool.soc2) complianceParts.push('is SOC 2 gecertificeerd');
  if (complianceParts.length > 0) {
    faqs.push({
      question: `Is ${tool.name} GDPR-compliant?`,
      answer: `Ja, ${tool.name} ${complianceParts.join(', ')}.`,
    });
  }

  // Implementation difficulty
  if (tool.setupComplexity || tool.timeToFirstValue || tool.requiresDeveloper != null) {
    const parts: string[] = [];
    if (tool.setupComplexity) {
      parts.push(`De setup is ${setupComplexityLevels[tool.setupComplexity].label.toLowerCase()}.`);
    }
    if (tool.timeToFirstValue) {
      parts.push(`Tijd tot eerste waarde: ${timeToFirstValueOptions[tool.timeToFirstValue].label.toLowerCase()}.`);
    }
    if (tool.implementationTimeEstimate) {
      parts.push(`Geschatte implementatietijd: ${tool.implementationTimeEstimate}.`);
    }
    if (tool.requiresDeveloper === false) {
      parts.push('Er is geen developer nodig.');
    } else if (tool.requiresDeveloper === true) {
      parts.push('Een developer is vereist voor de setup.');
    }
    faqs.push({
      question: `Hoe moeilijk is ${tool.name} te implementeren?`,
      answer: parts.join(' '),
    });
  }

  // Alternatives
  const altParts: string[] = [];
  if (tool.mainCompetitors?.length > 0) {
    altParts.push(`Vergelijkbare tools zijn: ${tool.mainCompetitors.join(', ')}.`);
  } else if (tool.bestAlternative) {
    altParts.push(`Een goed alternatief is ${tool.bestAlternative}.`);
  }
  if (tool.antiUseCases?.length > 0) {
    altParts.push(`Kies een alternatief als: ${tool.antiUseCases[0]}.`);
  }
  if (altParts.length > 0) {
    faqs.push({
      question: `Wat zijn de alternatieven voor ${tool.name}?`,
      answer: altParts.join(' '),
    });
  }

  // Company size fit
  if (tool.companySizeFit?.length > 0) {
    const sizes = tool.companySizeFit
      .map(s => companySizeFitOptions[s].label)
      .join(', ');
    faqs.push({
      question: `Voor welke bedrijfsgrootte is ${tool.name} geschikt?`,
      answer: `${tool.name} is geschikt voor: ${sizes}.`,
    });
  }

  return faqs;
}

// ============================================
// JSON-LD BUILDERS
// ============================================

/** Build SoftwareApplication JSON-LD */
export function buildSoftwareApplicationLd(tool: Tool, _siteUrl: string): Record<string, unknown> {
  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.shortDescription,
    url: tool.websiteUrl,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: 'nl',
  };

  // Offers — structured pricing when available
  if (tool.startingPriceMonthly != null) {
    const curr = (tool.pricingCurrency ?? 'eur').toUpperCase();
    ld.offers = {
      '@type': 'Offer',
      price: String(tool.startingPriceMonthly),
      priceCurrency: curr,
      ...(tool.pricing ? { description: tool.pricing } : {}),
    };
  } else if (tool.pricingModel === 'free' || tool.hasFreePlan) {
    ld.offers = { '@type': 'Offer', price: '0', priceCurrency: 'EUR' };
  } else if (tool.pricingModel === 'freemium') {
    ld.offers = {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      description: 'Gratis basisplan beschikbaar',
    };
  } else if (tool.pricing) {
    ld.offers = {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      description: tool.pricing,
    };
  }

  // Aggregate rating from G2
  if (tool.g2Rating != null) {
    ld.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: tool.g2Rating,
      bestRating: 5,
      worstRating: 1,
      ...(tool.g2ReviewCount ? { reviewCount: tool.g2ReviewCount } : {}),
    };
  }

  // Editorial review
  if (tool.verdict || tool.easeOfUseScore) {
    const review: Record<string, unknown> = {
      '@type': 'Review',
      author: { '@type': 'Organization', name: 'debesteaitools.nl' },
    };
    if (tool.easeOfUseScore) {
      review.reviewRating = {
        '@type': 'Rating',
        ratingValue: tool.easeOfUseScore,
        bestRating: 10,
        worstRating: 1,
      };
    }
    if (tool.verdict) {
      review.reviewBody = tool.verdict;
    }
    if (tool.lastReviewedAt) {
      review.datePublished = tool.lastReviewedAt;
    }
    ld.review = review;
  }

  return ld;
}

/** Build FAQPage JSON-LD from FAQ items */
export function buildFaqPageLd(faqs: FaqItem[]): Record<string, unknown> | null {
  if (faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/** Build BreadcrumbList JSON-LD */
export function buildBreadcrumbLd(tool: Tool, siteUrl: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'AI Tools Radar', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: tool.name, item: `${siteUrl}/ai-tools/${tool.slug}/` },
    ],
  };
}

// ============================================
// CONTENT FRESHNESS
// ============================================

/** Number of days since a date string (ISO format) */
export function daysSince(isoDate: string): number {
  const then = new Date(isoDate);
  const now = new Date();
  return Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
}

/** Whether a tool's review is considered stale (>90 days) */
export function isReviewStale(tool: Tool, thresholdDays = 90): boolean {
  if (!tool.lastReviewedAt) return true;
  return daysSince(tool.lastReviewedAt) > thresholdDays;
}

/** Human-readable "last reviewed" label */
export function reviewFreshnessLabel(tool: Tool): string | null {
  if (!tool.lastReviewedAt) return null;
  const days = daysSince(tool.lastReviewedAt);
  if (days <= 7) return 'Deze week bijgewerkt';
  if (days <= 30) return 'Deze maand bijgewerkt';
  if (days <= 90) return `Bijgewerkt ${days} dagen geleden`;
  return `Laatst bijgewerkt ${days} dagen geleden`;
}

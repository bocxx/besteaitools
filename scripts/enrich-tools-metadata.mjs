#!/usr/bin/env node
/**
 * One-time script: enrich existing tool JSON files with zakelijke metadata.
 * Adds deploymentType, dataResidency, targetAudience, nlSupport, integrations
 * and updates businessFunctions for hr/finance/legal where applicable.
 *
 * Run: node scripts/enrich-tools-metadata.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const TOOLS_DIR = join(import.meta.dirname, '..', 'src', 'content', 'tools');

// ── Per-tool metadata definitions ──────────────────────────────
// Keys are filenames without .json
const metadata = {
  // ─── Chatbots (breed inzetbaar) ──────────────────────────────
  'chatgpt': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['mkb', 'enterprise', 'solo', 'freelancer'],
    nlSupport: true,
    integrations: ['Microsoft 365', 'Slack', 'Zapier', 'Google Workspace'],
    addBusinessFunctions: ['hr', 'finance'],
  },
  'claude': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['mkb', 'enterprise', 'solo', 'freelancer'],
    nlSupport: true,
    integrations: ['Slack', 'Zapier', 'Google Workspace'],
    addBusinessFunctions: ['hr', 'finance'],
  },
  'gemini': {
    deploymentType: 'saas',
    dataResidency: 'global',
    targetAudience: ['mkb', 'enterprise', 'solo', 'freelancer'],
    nlSupport: true,
    integrations: ['Google Workspace', 'Android', 'Google Cloud'],
    addBusinessFunctions: ['hr', 'finance'],
  },
  'grok': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['solo', 'freelancer'],
    nlSupport: false,
    integrations: ['X / Twitter'],
  },
  'deepseek': {
    deploymentType: 'both',
    dataResidency: 'global',
    targetAudience: ['mkb', 'enterprise', 'solo'],
    nlSupport: false,
    integrations: [],
  },

  // ─── Coding tools ────────────────────────────────────────────
  'cursor': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['mkb', 'enterprise', 'solo', 'freelancer'],
    nlSupport: false,
    integrations: ['VS Code', 'GitHub', 'GitLab'],
  },
  'copilot': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['mkb', 'enterprise', 'solo', 'freelancer'],
    nlSupport: false,
    integrations: ['VS Code', 'JetBrains', 'GitHub', 'Azure DevOps'],
  },
  'claude-code': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['mkb', 'enterprise', 'solo'],
    nlSupport: false,
    integrations: ['Terminal', 'GitHub'],
  },
  'windsurf': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['mkb', 'solo', 'freelancer'],
    nlSupport: false,
    integrations: ['VS Code', 'GitHub'],
  },
  'aider': {
    deploymentType: 'self-hosted',
    dataResidency: 'eu', // runs locally, user controls data
    targetAudience: ['solo', 'freelancer'],
    nlSupport: false,
    integrations: ['Terminal', 'Git'],
  },
  'cline': {
    deploymentType: 'self-hosted',
    dataResidency: 'eu',
    targetAudience: ['solo', 'freelancer'],
    nlSupport: false,
    integrations: ['VS Code'],
  },
  'devin': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['enterprise', 'mkb'],
    nlSupport: false,
    integrations: ['GitHub', 'Slack', 'Jira'],
  },
  'replit': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['solo', 'freelancer', 'mkb'],
    nlSupport: false,
    integrations: ['GitHub'],
  },
  'v0': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['solo', 'freelancer', 'mkb'],
    nlSupport: false,
    integrations: ['Vercel', 'Next.js', 'GitHub'],
  },
  'bolt': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['solo', 'freelancer', 'mkb'],
    nlSupport: false,
    integrations: ['GitHub'],
  },
  'lovable': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['solo', 'freelancer', 'mkb'],
    nlSupport: false,
    integrations: ['GitHub', 'Supabase'],
  },

  // ─── Automation / agents ────────────────────────────────────
  'n8n': {
    deploymentType: 'both',
    dataResidency: 'eu', // EU cloud option + self-hosted
    targetAudience: ['mkb', 'enterprise', 'solo', 'freelancer'],
    nlSupport: false,
    integrations: ['Slack', 'Google Workspace', 'Microsoft 365', 'HubSpot', 'Salesforce', 'Notion', 'Airtable'],
    addBusinessFunctions: ['hr', 'finance'],
  },
  'autogpt': {
    deploymentType: 'self-hosted',
    dataResidency: 'eu',
    targetAudience: ['solo'],
    nlSupport: false,
    integrations: [],
  },
  'crewai': {
    deploymentType: 'both',
    dataResidency: 'us',
    targetAudience: ['mkb', 'enterprise'],
    nlSupport: false,
    integrations: [],
  },
  'dify': {
    deploymentType: 'both',
    dataResidency: 'global',
    targetAudience: ['mkb', 'enterprise'],
    nlSupport: false,
    integrations: ['Slack', 'API'],
  },
  'mcp': {
    deploymentType: 'self-hosted',
    dataResidency: 'eu',
    targetAudience: ['mkb', 'enterprise'],
    nlSupport: false,
    integrations: [],
  },

  // ─── Image ──────────────────────────────────────────────────
  'midjourney': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['solo', 'freelancer', 'mkb'],
    nlSupport: false,
    integrations: ['Discord'],
  },
  'dall-e': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['mkb', 'enterprise', 'solo', 'freelancer'],
    nlSupport: true,
    integrations: ['ChatGPT', 'Microsoft 365', 'API'],
  },
  'adobe-firefly': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['mkb', 'enterprise', 'freelancer'],
    nlSupport: false,
    integrations: ['Adobe Creative Cloud', 'Photoshop', 'Illustrator'],
  },
  'stable-diffusion': {
    deploymentType: 'both',
    dataResidency: 'eu',
    targetAudience: ['solo', 'freelancer', 'mkb'],
    nlSupport: false,
    integrations: ['ComfyUI', 'Automatic1111'],
  },
  'flux': {
    deploymentType: 'both',
    dataResidency: 'eu',
    targetAudience: ['solo', 'freelancer', 'mkb'],
    nlSupport: false,
    integrations: ['ComfyUI', 'Replicate'],
  },
  'leonardo': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['solo', 'freelancer', 'mkb'],
    nlSupport: false,
    integrations: ['API'],
  },

  // ─── Video ──────────────────────────────────────────────────
  'runway': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['freelancer', 'mkb'],
    nlSupport: false,
    integrations: ['API'],
  },
  'sora': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['solo', 'freelancer', 'mkb'],
    nlSupport: true,
    integrations: ['ChatGPT'],
  },
  'pika': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['solo', 'freelancer'],
    nlSupport: false,
    integrations: [],
  },
  'luma': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['solo', 'freelancer'],
    nlSupport: false,
    integrations: [],
  },
  'kling': {
    deploymentType: 'saas',
    dataResidency: 'global',
    targetAudience: ['solo', 'freelancer'],
    nlSupport: false,
    integrations: [],
  },

  // ─── Audio ──────────────────────────────────────────────────
  'elevenlabs': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['mkb', 'enterprise', 'freelancer'],
    nlSupport: true,
    integrations: ['API', 'Zapier'],
  },
  'whisper': {
    deploymentType: 'both',
    dataResidency: 'eu',
    targetAudience: ['mkb', 'enterprise', 'solo'],
    nlSupport: true,
    integrations: ['API', 'Python'],
    addBusinessFunctions: ['hr'],
  },

  // ─── Search / research ─────────────────────────────────────
  'perplexity': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['mkb', 'enterprise', 'solo', 'freelancer'],
    nlSupport: true,
    integrations: ['API'],
    addBusinessFunctions: ['hr', 'finance'],
  },
  'notebooklm': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['mkb', 'solo', 'freelancer'],
    nlSupport: true,
    integrations: ['Google Drive', 'Google Docs'],
    addBusinessFunctions: ['hr'],
  },

  // ─── Productivity ──────────────────────────────────────────
  'microsoft-copilot': {
    deploymentType: 'saas',
    dataResidency: 'eu', // EU data boundary option
    targetAudience: ['mkb', 'enterprise'],
    nlSupport: true,
    integrations: ['Microsoft 365', 'Teams', 'Outlook', 'SharePoint', 'Excel', 'PowerPoint', 'Word'],
    addBusinessFunctions: ['hr', 'finance', 'legal'],
  },

  // ─── Infrastructure / dev platforms ────────────────────────
  'ollama': {
    deploymentType: 'self-hosted',
    dataResidency: 'eu',
    targetAudience: ['solo', 'mkb'],
    nlSupport: false,
    integrations: ['Terminal', 'Open WebUI'],
  },
  'open-webui': {
    deploymentType: 'self-hosted',
    dataResidency: 'eu',
    targetAudience: ['mkb', 'solo'],
    nlSupport: true,
    integrations: ['Ollama', 'OpenAI API'],
  },
  'huggingface': {
    deploymentType: 'both',
    dataResidency: 'global',
    targetAudience: ['mkb', 'enterprise'],
    nlSupport: false,
    integrations: ['GitHub', 'Docker', 'AWS', 'Google Cloud'],
  },
  'groq': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['mkb', 'enterprise'],
    nlSupport: false,
    integrations: ['API', 'LangChain', 'LlamaIndex'],
  },
  'vllm': {
    deploymentType: 'self-hosted',
    dataResidency: 'eu',
    targetAudience: ['enterprise', 'mkb'],
    nlSupport: false,
    integrations: ['Docker', 'Kubernetes', 'API'],
  },
  'pinecone': {
    deploymentType: 'saas',
    dataResidency: 'us',
    targetAudience: ['mkb', 'enterprise'],
    nlSupport: false,
    integrations: ['LangChain', 'LlamaIndex', 'API'],
  },
  'langchain': {
    deploymentType: 'self-hosted',
    dataResidency: 'eu',
    targetAudience: ['mkb', 'enterprise'],
    nlSupport: false,
    integrations: ['Python', 'API'],
  },
  'llamaindex': {
    deploymentType: 'self-hosted',
    dataResidency: 'eu',
    targetAudience: ['mkb', 'enterprise'],
    nlSupport: false,
    integrations: ['Python', 'API'],
  },
  'llama': {
    deploymentType: 'both',
    dataResidency: 'eu',
    targetAudience: ['mkb', 'enterprise'],
    nlSupport: false,
    integrations: ['Ollama', 'vLLM', 'HuggingFace'],
  },
  'mistral': {
    deploymentType: 'both',
    dataResidency: 'eu', // French company, EU hosting
    targetAudience: ['mkb', 'enterprise'],
    nlSupport: true,
    integrations: ['API', 'Azure', 'AWS'],
  },
  'qwen': {
    deploymentType: 'both',
    dataResidency: 'global',
    targetAudience: ['mkb', 'enterprise'],
    nlSupport: false,
    integrations: ['Ollama', 'vLLM', 'HuggingFace'],
  },
};

// ── Process all tool files ─────────────────────────────────────
const files = readdirSync(TOOLS_DIR).filter(f => f.endsWith('.json'));
let updated = 0;

for (const file of files) {
  const slug = file.replace('.json', '');
  const filePath = join(TOOLS_DIR, file);
  const tool = JSON.parse(readFileSync(filePath, 'utf8'));
  const meta = metadata[slug];

  if (!meta) {
    console.log(`⚠ No metadata defined for ${slug}, adding defaults only`);
    // Add defaults for tools without specific metadata
    if (!tool.targetAudience) tool.targetAudience = [];
    if (tool.nlSupport === undefined) tool.nlSupport = false;
    if (!tool.integrations) tool.integrations = [];
    writeFileSync(filePath, JSON.stringify(tool, null, 2) + '\n');
    updated++;
    continue;
  }

  // Set new fields
  tool.deploymentType = meta.deploymentType;
  tool.dataResidency = meta.dataResidency;
  tool.targetAudience = meta.targetAudience;
  tool.nlSupport = meta.nlSupport;
  tool.integrations = meta.integrations;

  // Add extra business functions (merge, no dupes)
  if (meta.addBusinessFunctions) {
    const existing = new Set(tool.businessFunctions || []);
    for (const fn of meta.addBusinessFunctions) {
      existing.add(fn);
    }
    tool.businessFunctions = [...existing];
  }

  writeFileSync(filePath, JSON.stringify(tool, null, 2) + '\n');
  updated++;
  console.log(`✓ ${slug}`);
}

console.log(`\nDone — ${updated} tools updated.`);

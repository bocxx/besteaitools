# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

`nuchter.ai` is a lightweight Astro site that is being transformed into a reusable foundation for AI tool directories, AI landing pages, and future “nuchter AI kompas” products. The current repo should stay generic and reusable, with the existing dark design system preserved.

## Commands

```bash
npm run dev
npm run build
npm run preview
```

## Architecture

### Core structure

- `src/layouts/Layout.astro` — base HTML shell, metadata, fonts, shared header/footer
- `src/pages/index.astro` — current generic landing page
- `src/components/atoms/`, `molecules/`, `layout/` — reusable component layers
- `src/config/site.ts` — central identity, navigation, social, and footer config
- `src/config/categories.ts` — tool category definitions
- `src/content.config.ts` — Astro collection config for future tool content

### Design system

Keep the current visual system intact:
- existing dark palette
- current token names and gradients
- current spacing, typography, border radius, and glassmorphism patterns

Do not “refresh” the colors unless explicitly requested.

### Current direction

This repo is being prepared for:
- AI tools landing pages
- tool/category overviews
- future stats integration from external pipelines
- reusable white-label or multi-brand AI landing structures

Prefer generic naming and reusable abstractions over brand-locked page structures.

# TOOLPLANE

## Overview

TOOLPLANE is a developer-first platform offering a collection of fast, minimal, and production-grade tools for extracting, converting, and generating web data. It is designed as a versatile Swiss Army knife for modern web workflows, built using Next.js, React, and ShadCN UI.

## Features

* Scrapers for Amazon, Reddit, YouTube, Bing, Alibaba, and more
* Converters including article cleaners and markdown extractors
* Generators like QR codes and password creators
* Free API access for many tools
* Recent tool tracking and local persistence
* Mobile-first responsive design
* Zero analytics, zero ads, 100 percent privacy-first

## Tech Stack

* Framework: Next.js with App Router
* UI: TailwindCSS, ShadCN UI
* Icons: Lucide
* State: useState, useEffect, localStorage
* Fonts: Offside

## File Structure Highlights

* `components/ui`: Reusable UI primitives
* `lib/utils.ts`: Utility and style helpers
* `lib/fonts.ts`: Custom font imports
* `components/buy-me-a-coffee-button.tsx`: Support component

## Tool Metadata Structure

Each tool entry follows this interface:

```ts
interface Tool {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  category: string;
  tags?: string[];
  isNew?: boolean;
  hasFreeApi?: boolean;
}
```

## Categories

* Scrapers
* Converters
* Generators

## API Documentation

API docs are accessible via the "View API Docs" button on the landing page or directly from `/#api`.

## Getting Started

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Navigate to `http://localhost:3000`

## Deployment

Supports Vercel out-of-the-box. Simply connect your GitHub repository and deploy.

## License

MIT License. See `LICENSE` file for details.

## Author

Built and maintained by [Sarvagya Kumar](https://thesarvagyakumar.site).

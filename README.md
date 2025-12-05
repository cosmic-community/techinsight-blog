# TechInsight Blog

![TechInsight Blog](https://imgix.cosmicjs.com/d75154a0-d191-11f0-b49a-5535b7890621-photo-1579468118864-1b9ea3c0db4a-1764908476057.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive tech blog built with Next.js 16 and powered by Cosmic CMS. This application showcases blog posts about web development, artificial intelligence, and cloud computing with a beautiful, user-friendly interface.

## Features

- 📝 Dynamic blog post listing with featured images
- 🏷️ Category-based content organization
- 👤 Author profiles with social media links
- 📱 Fully responsive design for all devices
- 🎨 Modern UI with Tailwind CSS and Inter font
- ⚡ Fast server-side rendering with Next.js 16
- 🔍 SEO-optimized with proper meta tags
- 📖 Markdown content rendering
- 🖼️ Optimized image delivery via imgix

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69325d4b3584465d0a2f834c&clone_repository=69325ea53584465d0a2f837a)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a modern tech blog with posts, authors with bios, and categories"

### Code Generation Prompt

> Based on the content model I created for "Create a modern tech blog with posts, authors with bios, and categories", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless CMS for content management
- **React Markdown** - Markdown content rendering
- **Inter Font** - Modern, readable typography

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with the tech blog content model

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching All Posts

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Post by Slug

```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'post-slug' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Posts by Category

```typescript
const { objects: posts } = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.categories': categoryId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses the Cosmic SDK to fetch content from your Cosmic bucket. The content model includes:

- **Posts** - Blog articles with title, excerpt, content (markdown), featured image, publish date, author, and categories
- **Authors** - Author profiles with name, bio, avatar, and social media links (Twitter, LinkedIn, GitHub)
- **Categories** - Content categories with name, description, and cover image

All content is fetched server-side for optimal performance and SEO.

## Deployment Options

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above
2. Connect your repository
3. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Click the button above
2. Connect your repository
3. Add your environment variables in the Netlify dashboard
4. Deploy!

## Environment Variables

Set these environment variables in your hosting platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Homepage with post listing
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx    # Individual post pages
│   ├── categories/
│   │   └── [slug]/
│   │       └── page.tsx    # Category pages
│   ├── authors/
│   │   └── [slug]/
│   │       └── page.tsx    # Author profile pages
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── PostCard.tsx        # Post preview card
│   ├── CategoryBadge.tsx   # Category label
│   └── CosmicBadge.tsx     # Built with Cosmic badge
├── lib/
│   └── cosmic.ts           # Cosmic SDK configuration
├── types.ts                # TypeScript type definitions
└── public/
    └── dashboard-console-capture.js  # Console logging for dashboard
```

<!-- README_END -->
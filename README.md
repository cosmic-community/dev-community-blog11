# Dev Community Blog
![App Preview](https://imgix.cosmicjs.com/5ddce030-208d-11f1-9a50-ab66d4c1cf00-photo-1519389950473-47ba0277781c-1773592696314.jpg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, responsive blog experience that showcases posts, categories, and community comments with likes. Built to match your Cosmic content model for posts, categories, and comments.

## Features
- Responsive post grid with featured images
- Category pages for focused discovery
- Rich post detail view with markdown content
- Comments section with author name and likes count
- Engagement summary derived from comment likes
- Cosmic-powered content, fully server-rendered

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69b621053704c8f1904cba09&clone_repository=69b7257f3704c8f1904cca34)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "criar comentários dentro do post e likes em post e comentarios"

### Code Generation Prompt

> Based on the content model I created for "criar comentários dentro do post e likes em post e comentarios", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Cosmic SDK
- Marked (markdown rendering)

## Getting Started

### Prerequisites
- Bun installed locally
- A Cosmic bucket with the existing content model

### Installation
```bash
bun install
bun run dev
```

## Cosmic SDK Examples
```ts
import { cosmic } from '@/lib/cosmic'

const posts = await cosmic.objects
  .find({ type: 'posts' })
  .depth(1)
```

## Cosmic CMS Integration
This app connects directly to your Cosmic bucket and fetches:
- **posts** for the main content
- **categories** for navigation and filtering
- **comments** for engagement and discussion

Read more: https://www.cosmicjs.com/docs

## Deployment Options
- **Vercel**: Recommended for Next.js apps
- **Netlify**: Works with static builds
- Add your Cosmic environment variables in your hosting provider dashboard

<!-- README_END -->
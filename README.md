# IslamQA.Ref - Hadith Collection Website

A modern, responsive Hadith collection website built with Next.js 16, featuring authentic Prophetic traditions from major hadith collections.

## Features

- 📚 **Multiple Collections** - Sahih al-Bukhari, Sahih Muslim, Sunan Abu Dawud, and more
- 🔍 **Search Functionality** - Search across all hadiths with filters
- 📖 **Detailed Hadith View** - Arabic text, English translation, narrator chain, commentary
- 🏷️ **Topics** - Browse hadiths by topic categories
- 📱 **Fully Responsive** - Optimized for mobile and desktop
- ⚡ **Fast Performance** - Built with Next.js App Router and Turbopack
- 🎨 **Modern UI** - Clean design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Fonts**: Inter (Latin), Amiri (Arabic)
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Directory Structure

```
hadith-collection/
├── app/                          # Next.js App Router pages
│   ├── about/                    # About page (general)
│   │   └── page.tsx
│   ├── collections/              # Collections pages
│   │   ├── [slug]/               # Individual collection
│   │   │   ├── [book]/           # Book detail with hadiths
│   │   │   │   └── page.tsx
│   │   │   ├── about/            # Collection about page
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── page.tsx              # All collections list
│   ├── hadith/                   # Hadith detail pages
│   │   └── [collection]/
│   │       └── [number]/
│   │           └── page.tsx
│   ├── saved/                    # Saved hadiths page
│   │   └── page.tsx
│   ├── search/                   # Search page
│   │   └── page.tsx
│   ├── topics/                   # Topics pages
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
│
├── components/                   # React components
│   ├── collection/               # Collection-related components
│   │   ├── BookCard.tsx
│   │   └── CollectionCard.tsx
│   ├── hadith/                   # Hadith-related components
│   │   ├── GradeBadge.tsx
│   │   ├── HadithCard.tsx
│   │   ├── HadithDetail.tsx
│   │   └── HadithList.tsx
│   ├── layout/                   # Layout components
│   │   ├── Breadcrumb.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   ├── search/                   # Search components
│   │   ├── HeroSearch.tsx
│   │   ├── SearchBar.tsx
│   │   └── SearchFilters.tsx
│   └── ui/                       # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── DragScroll.tsx
│       └── Input.tsx
│
├── data/                         # JSON data files
│   ├── books.json                # Books within collections
│   ├── collection-details.json   # Detailed collection info
│   ├── collections.json          # Hadith collections
│   ├── hadiths.json              # Hadith data
│   └── topics.json               # Topic categories
│
├── hooks/                        # Custom React hooks
│   ├── useSearch.ts
│   └── useTheme.ts
│
├── lib/                          # Utility functions and types
│   ├── types.ts                  # TypeScript interfaces
│   └── utils.ts                  # Helper functions
│
├── public/                       # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Key Components

| Component | Description |
|-----------|-------------|
| `HadithDetail` | Full hadith view with Arabic, translation, chain, commentary |
| `HadithCard` | Compact hadith preview card |
| `Sidebar` | Navigation with collections and topics |
| `DragScroll` | Click-and-drag horizontal scrolling component |
| `Breadcrumb` | Navigation breadcrumbs (horizontally scrollable) |

## Data Models

- **Collection**: Hadith collection (e.g., Sahih al-Bukhari)
- **Book**: Book within a collection
- **Hadith**: Individual hadith with Arabic text, translation, narrator chain
- **Topic**: Topic category for organizing hadiths

## License

This project is for educational purposes.

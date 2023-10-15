# UX Style & Design Decisions - CommerceFlow

## Typography System
- **Heading Font**: `Outfit` (Google Fonts) - A bold, geometric sans-serif that gives the brand an elegant, premium tech look.
- **Body Font**: `Inter` (Google Fonts) - Clean, highly readable sans-serif that ensures spec tables, descriptions, and checkout forms are extremely easy to read.

## Theme Palette
We avoided browser default primary colors in favor of curated slate and indigo tones:
- **Primary**: Deep Indigo (`#4f46e5`) - Used for primary call-to-actions, buttons, and focused borders.
- **Secondary**: Electric Blue (`#0ea5e9`) - Highlights secondary elements.
- **Dark Neutral**: Deep Slate (`#0f172a`, `#1e293b`) - Dark slate backgrounds for slide titles, navbar items, and footers.
- **Light Neutral**: Slate Gray (`#f1f5f9`, `#f8fafc`) - Clean card backings and sidebar lists.

## Visual Accents
- **Glassmorphism**: Fixed navbar features `backdrop-filter: blur(12px)` and translucent border boundaries.
- **Micro-Animations**: Hover states feature smooth transitions (`all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`) for cards, buttons, and wishlist heart icons.
- **Shimmer Effects**: Catalog loaders use sliding linear-gradient animation keyframes (`@keyframes shimmer`) to simulate dynamic async API queries.

# CommerceFlow

CommerceFlow is a premium, production-quality E-Commerce storefront built from first principles using HTML5, CSS3, Bootstrap 5.3, and modular Vanilla ES6+ JavaScript. 

The project showcases layout aesthetics (dark modes, glassmorphism, responsive grids), client-side state caching (using `localStorage` for cart, wishlist, and session auth persistence), dynamic catalog querying (search matching, multiple category/brand filters, pricing sliders, star ratings, and sorting options), and advanced UX feedback (skeleton shimmers, animated floating toasts, and empty state layouts).

## Features

- **Dynamic Catalog**: Live text search with category, brand, price range, rating, and stock filters.
- **Interactive Cart & Wishlist**: Syncs instantly across pages with state caching.
- **Mock Authentication**: Local user registration, logins, session persistence, and profile address management.
- **Simulated Checkout**: 3-step billing, shipping courier rates, payment validation, and receipt confirmations.
- **Aesthetic UX**: Animated floating notification toasts, catalog skeleton screens, and clean layout illustrations.
- **QA Verification**: Integrated unit test runner displaying execution status in-browser.

## Installation & Setup

1. Clone this repository to your local system:
   ```bash
   git clone https://github.com/Self-Lakshh/E-Commerce-Website.git
   ```
2. Navigate to the project root and open `index.html` directly in your browser, or spin up the development server:
   ```bash
   npm install
   npm run dev
   ```
3. Visit the local URL (e.g., `http://localhost:5173`) to browse the storefront.
4. To execute the automated unit test suite, open the `tests/index.html` file in a browser.

## Testing Credentials

You can log in to the storefront immediately using the following test credentials:
- **Email**: `tester@example.com`
- **Password**: `password123`

---

## Roadmap

Check [ROADMAP.md](ROADMAP.md) for planned future features, and [CHANGELOG.md](CHANGELOG.md) to inspect release tags.

<!-- Commit tick 43: added sort dropdown selector to catalog -->
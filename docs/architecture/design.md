# Architecture Design Specifications - CommerceFlow

This document outlines the architectural structure, state synchronization patterns, and folder design of the CommerceFlow storefront.

## State Management (Pub-Sub Pattern)
To maintain clean, decoupled code without framework overhead, we use standard JavaScript custom events to build a client-side pub-sub system.

State Managers (`src/js/cart.js`, `src/js/wishlist.js`, `src/js/auth.js`):
- Load data from `localStorage` on initial script execution.
- Expose methods to update states (`addItem`, `toggleItem`, `login`, `logout`).
- On updating the state, serializes the updated state to `localStorage` and triggers a custom window event (`cf-cart-updated`, `cf-wishlist-updated`, `cf-auth-updated`).

UI Coordinators (`src/js/app.js`, specific page scripts):
- Register event listeners for updates on load.
- When an event is triggered, they fetch the fresh state from the manager and redraw specific segments. This keeps navbar icons, shopping lists, and checkout subtotals in perfect sync.

## Client-Side Data Caching
State is cached locally in the browser to replicate a persistent session:
- **Cart**: Cached under key `cf_cart`. Keeps items count, brands, prices, and quantities.
- **Wishlist**: Cached under key `cf_wishlist` as an array of product IDs.
- **Session Auth**: Cached under key `cf_user` (details like name and email) and `cf_registered_users` (simulated database of registered user profiles and passwords).
- **Orders History**: Cached under key `cf_orders` listing past invoice transactions.

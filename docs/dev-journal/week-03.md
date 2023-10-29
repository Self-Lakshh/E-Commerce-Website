# Dev Journal - Week 03

## Goals
- Formulate products database schema
- Seed mock products array list

## Work Completed
- Created `mock-data/products.json` sample.
- Built `src/js/products.js` seeding 120 products dynamically with titles, specs, price parameters, ratings, stock counts, and reviews.
- Defined `ProductEngine` object exposing query functions to return filters lists.

## Problems Encountered & Solutions
- *Problem*: Loading local JSON files directly via `fetch` caused browser CORS errors when opening HTML via file protocol.
- *Solution*: Expose product arrays as global variables on `window.PRODUCTS_DB` in a JS module.

## Lessons Learned
- Bypassing CORS is essential for pure client-side standalone builds that user may open locally.

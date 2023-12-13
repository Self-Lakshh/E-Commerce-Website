# Dev Journal - Week 08

## Goals
- Build shopping cart interface page
- Implement quantity adjusts and item removals

## Work Completed
- Created `cart.html` displaying items.
- Wired quantity adjust +/- click hooks.
- Implemented `CartManager` module with local storage sync.

## Problems Encountered & Solutions
- *Problem*: Cart quantities could exceed available store inventory.
- *Solution*: Added inventory limit checks checking `product.stock` values before increases.

## Lessons Learned
- Business rules (like stock limits) should be validated at the state manager level.

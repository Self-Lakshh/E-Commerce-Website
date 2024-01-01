# Dev Journal - Week 11

## Goals
- Build order receipts confirm pane
- Build user dashboard order log tabs

## Work Completed
- Added order placements clearing the cart.
- Created `dashboard.html` showing profile editors, addresses grid, and orders.
- Rendered line-item invoice descriptions in past orders list.

## Problems Encountered & Solutions
- *Problem*: Deleting saved addresses caused display errors when the deleted address was marked default.
- *Solution*: Implemented checks auto-marking the next available address as default on deletions.

## Lessons Learned
- Ensure fallback rules exist when deleting primary settings.

# Dev Journal - Week 10

## Goals
- Build checkout progress wizard
- Implement shipping address saves

## Work Completed
- Created `checkout.html` showing a 3-step progress bar wizard.
- Wired saved addresses check boxes matching profiles.
- Integrated optional address profile saves check box.

## Problems Encountered & Solutions
- *Problem*: Accessing checkout with empty cart allowed orders.
- *Solution*: Added guard checks redirecting users to cart.html if item count is 0.

## Lessons Learned
- Critical pages need page-load checks to enforce step rules.

# Dev Journal - Week 09

## Goals
- Implement promo coupon discounts
- Build login and registration portal

## Work Completed
- Added `SAVE10` and `WELCOME5` coupon checks.
- Created `auth.html` with login/register tabs.
- Created `AuthManager` seeding tester credentials (`tester@example.com` / `password123`).

## Problems Encountered & Solutions
- *Problem*: Coupon codes applied successfully but got lost on checkout redirections.
- *Solution*: Cached active promo codes in session storage.

## Lessons Learned
- Use sessionStorage for checkout lifecycle states that don't need permanent database storage.

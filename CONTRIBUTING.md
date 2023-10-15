# Contributing Guidelines

Thank you for contributing to CommerceFlow! Please follow these guidelines to keep our codebase clean, maintainable, and aligned with design guidelines.

## Branching Strategy
- Direct commits to `main` are restricted. Create feature branches off main: `feature/your-feature-name` or `bugfix/issue-description`.
- Merge code via pull requests requiring code reviews.

## Git Commit Style
We use descriptive, lower-case commit prefixes:
- `feat`: Addition of new client features (e.g. `feat: implement search debounce`)
- `fix`: Fixing codebase bugs (e.g. `fix: adjust flexwrap on mobile products card`)
- `docs`: Modifying documentation files (e.g. `docs: add week 8 journal entry`)
- `refactor`: Restructuring code files for clean abstractions without shifting features (e.g. `refactor: extract user login handler`)
- `perf`: Improving load times or performance metrics (e.g. `perf: lazy load non-critical catalog images`)

## Coding Standards
1. **HTML**: Use semantic tags (`<header>`, `<main>`, `<aside>`, `<article>`, `<footer>`). Ensure all interactive icons have unique descriptive `id` or `class` handles.
2. **CSS**: Restrict style additions to `src/css/style.css` matching design tokens. Restrict inline stylings.
3. **JS**: Write clean ES6 modular functions. Restrict direct global pollutions where possible, or document them clearly.
4. **State Management**: State managers must dispatch custom event alerts (e.g. `cf-cart-updated`) to notify other modules of value shifts.

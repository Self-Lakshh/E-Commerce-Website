# Dev Journal - Week 04

## Goals
- Build catalog results grid page
- Implement search text query filters

## Work Completed
- Created `catalog.html` with results grids.
- Wired header search box submits to redirect to catalog with parameters.
- Implemented `ProductEngine` text query matching in JS.

## Problems Encountered & Solutions
- *Problem*: Searching short phrases returned too few items or crashed on empty parameters.
- *Solution*: Trimmed whitespace and normalized comparisons to lower-case.

## Lessons Learned
- String comparisons should be normalized to avoid matching failures due to formatting.

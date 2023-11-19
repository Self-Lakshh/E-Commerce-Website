# Dev Journal - Week 05

## Goals
- Build catalog sidebar filters
- Implement sort order dropdown

## Work Completed
- Added Category and Brand checkbox sidebar inputs.
- Added Price range fields and Rating thresholds.
- Wired sorting drop-downs (Price Ascending, Price Descending, Top Rated).

## Problems Encountered & Solutions
- *Problem*: Combining multiple checkbox filters produced mathematical conflicts.
- *Solution*: Redefined the query filter process as an incremental pipeline executing filters sequentially.

## Lessons Learned
- Sequential pipeline patterns are cleaner than combining complex compound conditionals.

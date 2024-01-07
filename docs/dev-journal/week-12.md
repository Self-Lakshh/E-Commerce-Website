# Dev Journal - Week 12

## Goals
- Implement skeleton loader shimmers
- Implement floating toast alerts

## Work Completed
- Added shimmer cards displaying during dynamic data query lags.
- Added animated floating toast notification alerts for cart updates.
- Added illustration illustrations for empty list states.

## Problems Encountered & Solutions
- *Problem*: Toast alerts stacked on top of each other, overlapping.
- *Solution*: Created a absolute-positioned container `#toast-container` append-stacking new toast nodes.

## Lessons Learned
- Stacking visual notices requires a unified manager element.

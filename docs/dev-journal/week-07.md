# Dev Journal - Week 07

## Goals
- Implement product details gallery
- Build customer review submittals

## Work Completed
- Added thumbnail click hooks switching the main image.
- Implemented "Write a Review" form appending details arrays.
- Wired automatic star rating average recalculations.

## Problems Encountered & Solutions
- *Problem*: Writing reviews updated list context but didn't refresh average ratings immediately.
- *Solution*: Recalculated rating averages on form submits and triggered redrawing of details panels.

## Lessons Learned
- Recalculation math should update all related visual elements immediately on state changes.

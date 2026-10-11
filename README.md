# PhysiV-Lab research website

Static, buildless research project website for **R26-IT-150**.

## Local preview

```powershell
python -m http.server 4173 --directory dist
```

Open `http://localhost:4173`.

## Structure

- `dist/index.html` — project overview
- `dist/domain.html` — literature, gap, problem, objectives, methodology, technology
- `dist/milestones.html` — assessment timeline and reserved future milestones
- `dist/documents.html` — searchable research document archive
- `dist/presentations.html` — past and future presentation records
- `dist/team.html` — four individual contributions
- `dist/contact.html` — privacy-preserving enquiry template
- `dist/assets/` — shared styling, behaviour, and optimized project figures
- `dist/documents/` — lightweight PDF archive

The deployable `dist/` directory is kept below the 20 MB course-web limit. Large editable thesis drafts and original PowerPoint files remain in the project archive rather than the web package.

## Updating the milestone schedule

Replace the transparent `TBA` date and mark labels in `dist/milestones.html` only when the official IT4010 schedule and rubric are available.

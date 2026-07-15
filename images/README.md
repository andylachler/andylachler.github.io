# Images — how this works

One folder per project, named by its project id (the ids in `ProjectGrid.jsx` / `ArchivePage.jsx`):

```
images/
  feasibility/
    tile.jpg        → grid tile, nav dropdown, scroll carousel
    hero.jpg        → case-study page header (falls back to tile.jpg)
    01.jpg          → gallery, in numeric order
    02.png
    captions.json   → optional: { "01": "Caption for the first image" }
  ella/
    ...
```

After adding/removing files, regenerate the manifest:

```
node tools/build-image-manifest.js
```

(or just tell Claude — images get optimized in the same pass).

No image for a project = the SVG pattern/silhouette renders as before. Broken paths fall back to the pattern too. Keep files under ~600KB; the script warns if larger.

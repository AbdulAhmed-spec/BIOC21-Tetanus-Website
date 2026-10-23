# BIOC21 Tetanus Website

A static, responsive group project for grades 7–8. No build step or package installation is needed. GitHub Pages publishes from `main`, `/ (root)`.

## Preview and edit

Run `python3 -m http.server 8000` in this directory for a basic preview. For video seeking, use a static server with HTTP byte-range support, as GitHub Pages provides; Python’s basic server does not provide that support. Relative asset paths also support the GitHub Pages project URL.

- `index.html`: text, section order, sources, image paths and video paths.
- `styles.css`: the shared nervous-system theme. Midnight backgrounds, cornflower blue and cream accents, fine nerve patterns, rounded cards and consistent headings. The palette lives in `:root`.
- `script.js`: background playback and navigation highlighting.
- `assets/images`: simplified illustrations and posters extracted from the supplied videos. Illustrations are labeled and are not presented as micrographs. Original Canva images and the meme can replace the illustrations/remember card when supplied separately.
- `assets/fonts`: self-hosted Lilita One and Barlow Condensed with licenses.

## Local videos

Both videos are hosted as ordinary files; neither uses a YouTube embed, tracking script or iframe.

- `assets/videos/synaptic-background.mp4`: the supplied 19-second synaptic-transmission video. Audio was removed from the background copy and the MP4 was remuxed for fast startup; the video was not re-encoded. It loops silently only while the opening section is visible and the tab is active. A pause/play button is available. Reduced-motion preferences show a poster until the visitor opts to play. Portrait footage fills the opening section with `object-fit: cover`; its original framing remains in the video file.
- `assets/videos/wound-inflammation.mp4`: the supplied narrated 96-second wound video, with audio preserved, remuxed for fast startup. The native player supports play/pause, seeking, volume and fullscreen. It works without JavaScript. It shows **general wound inflammation**, not a tetanus-specific process. A captions file has not been supplied; add a WebVTT `<track kind="captions">` when an accurate transcript is available.

Credits and original links are in the Sources & Media section. The uploaded files remain unchanged in the attachments directory; only website copies were prepared. Each video is below GitHub's 100 MB per-file limit.

## Content notes

The new sections cover the toxin's route through nerves, symptoms and complications, affected tissues, prognosis, and project updates. The toxin affects nervous tissue; muscle symptoms follow disrupted nerve signals. The incubation wording uses the usual 3–21-day range. The screenshot's unsupported 75% fatality statistic was omitted because it needs a specific source and clinical context. General information links to CDC and WHO resources; those external sites could not be retrieved from this execution environment, so a live review of their pages was not performed. Have your group review references and final wording before presenting.

The "Stay in the loop" section says updates are coming soon. It does not collect email addresses or pretend to subscribe anyone. A working mailing list needs an actual service and endpoint. No additional brain video was supplied for the play icon in the new screenshot; the corresponding brain illustration is static.

## Validation

Chromium checks passed at 320, 390, 768 and 1320 pixels: no horizontal overflow, all images load, internal section links work, and navigation highlights update. Actual MP4 playback, pause and seeking were verified using a server with byte-range support. Background autoplay, manual pause/play, offscreen pause/resume, visibility-change handling, and reduced-motion opt-in passed. The page made no external media requests and reported no JavaScript errors. Content and the native player remain available without JavaScript.

# BIOC21 — Tetanus, up close

A static science website for grades 7–8. No build step or app dependencies. Make and review future changes locally; push or publish only when the user explicitly requests it.

## Style and information design

The former sequence of long, slide-like sections is now a five-topic explorer:

1. What is tetanus? — the bacterium, toxin, spores, and lockjaw.
2. What’s under the skin? — the wound animation and a personal observation to compare with a science note.
3. How does it work? — an inspectable wound-to-nerve pathway and comparison of usual and disrupted signals.
4. What does it do? — a body hotspot map connecting muscle symptoms to nerve control.
5. Can people recover? — a short care/recovery/prevention sequence leading into the case game.

Each topic starts with short, plain-language text and a visual. Scientific terms, the four tetanus forms, tissues, other symptoms, complications, and prognosis remain available in native “Go deeper” disclosures. The topic explorer is complemented by **The Case of the Locked Jaw**, a playable investigation linked from the main navigation and the game section.

The site remains full width. Midnight backgrounds, pale reading panels, sky blue, mint and lime accents, and consistent heading styles replace the presentation layout. Lilita One is used for headings and self-hosted DM Sans for readable body text. Font licenses are in `assets/fonts`.

## Editing

- `index.html`: content, illustrations, source links, and native video markup.
- `styles.css`: palette in `:root`, full-width layout, topic navigation, reading panels and media styles.
- `script.js`: topic selection, keyboard navigation, hash/deep-link handling, and video visibility logic.
- `activities.js`: the four information-panel activities and discovery progress, held only in page memory.
- `games/locked-jaw/`: the playable detective game, its styles, script, offline exporter, and documentation.
- `assets/images`: illustrations and posters. Drawings are labeled as illustrations rather than micrographs.
- `assets/videos`: the two previously supplied MP4 files, unchanged by this redesign.

Topic navigation is progressively enhanced: anchors become ARIA tabs with arrow, Home/End, Enter and Space support. One panel is shown at a time when JavaScript is available. All five articles are visible with ordinary document links when JavaScript is disabled. Details can be opened with a keyboard. Existing topic hashes, including `#tissues` and `#nervous-system`, reveal the correct article; direct links to details open their content.

## Preview

Use a static HTTP server in this directory. Python’s `python3 -m http.server 8000` provides a basic preview, but video seeking needs HTTP byte-range support, as GitHub Pages provides. Review screenshots are saved outside the repository under `/workspace/scratch/tetanus-style-review`.

When publication is explicitly requested, GitHub Pages uses `main`, `/ (root)`. The stylesheet and script have versioned URLs so a future publication does not reuse stale browser-cached assets.

## Videos and accessibility

Both videos use local files and no YouTube iframe or API. The muted synaptic background loops only while the hero is visible and the tab is active; visitors can pause it. Reduced-motion preferences leave it on its poster until the visitor opts in. The narrated video keeps native playback, seeking, sound and fullscreen controls, and pauses when the student leaves the Watch topic. It works without JavaScript.

The wound video shows general inflammation, not a tetanus-specific process. Credits and original links remain in Sources & Video Credits. Captions have not been supplied; add an accurate WebVTT track when available. A technical failure shows a message and a direct video link.

## Content and remaining work

The style revision preserves the major scientific explanations while shortening the initial reading. General information links to CDC and WHO resources. Unsupported fatality percentages remain omitted. Have the group review final medical wording and sources before presenting.

The Locked Jaw game includes clues, a nerve-signal comparison and a cause-and-effect evidence puzzle. No other games, quizzes or newsletter service have been added. Exact Ontario curriculum expectation mapping remains separate work: the official Ontario curriculum site returned HTTP 403 in this execution environment, so no unverified expectation codes or alignment claims have been added.

## Local validation

Chromium checks passed at 1366, 1920 and 2560 pixels, with a smaller-window regression check. All five topics select correctly, only one panel is visible, all illustration files load, disclosures open, keyboard tab selection works, and deep links reveal their destinations. The actual narrated MP4 plays and seeks on a byte-range server and pauses on leaving its panel. Background autoplay, manual pause/play, offscreen pause and reduced-motion behavior passed. No runtime errors, missing assets or external media requests were observed. All five articles and native video controls remain accessible without JavaScript.

## Game integration

The homepage’s “Play the game” navigation item and “Play the investigation” button open `games/locked-jaw/index.html` in the same tab. The game provides a “Back to website” link to `index.html#game`. Both pages use relative asset paths compatible with GitHub Pages project subdirectories. Progress remains in the game page’s memory and resets when it is reloaded. Make future changes locally and push only when the user explicitly requests it.

## Information-panel discoveries and flow

The information panels include four small, ungated activities. Make future changes locally and push only when the user explicitly requests it.

- Compare a spore, living bacterium, and toxin using a changing SVG model and role descriptions. Inspect all three to collect the specimen notes.
- Write a video observation, then reveal a scientific comparison. Free text is never automatically graded, inserted as HTML, stored, or sent anywhere.
- Select each stop of the toxin pathway to connect wound entry, bacterial growth/toxin production, nerve transport, and blocked inhibitory messages.
- Explore three muscle areas on a keyboard-accessible body hotspot map, with an explanation linking each effect to nerve control.

A discovery passport records four explorations. It is not a mastery score, does not award duplicate progress, and never blocks navigation. Progress and the observation note survive topic switching but clear on reload. All activities use native buttons or form controls with accessible labels, text feedback, and reduced-motion support. Without JavaScript, reading content, symptom descriptions, disclosures, native video controls, and contextual explanations remain available.

Topics now follow the story: microbe → wound → toxin journey → muscle symptoms → care and prevention → case game. Each topic ends with a short connecting paragraph and a descriptive link into the next concept. Existing topic hashes are preserved.

Local Chromium checks exercised SVG state changes, keyboard selection, unique discovery counting, whitespace handling, reflection without grading or HTML injection, pathway and body exploration, preserved state across tabs, the complete linking sequence through to the game, updated keyboard topic order, desktop/small-window layout, and no-JavaScript reading fallback. No runtime errors, missing resources or external requests were observed. Review screenshots are in `/workspace/scratch/tetanus-discoveries-review`.

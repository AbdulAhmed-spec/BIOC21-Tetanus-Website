# BIOC21 — Tetanus, up close

A static science website for grades 7–8. No build step or app dependencies. Make and review future changes locally; push or publish only when the user explicitly requests it.

## Style and information design

The former sequence of long, slide-like sections is now an eight-topic explorer, with an optional three-post science break:

1. What is tetanus? — the bacterium, toxin, spores, and lockjaw.
2. What’s inside a cell? — organelles, nerve-cell communication and cells → tissues → organs → organ systems → organism.
3. How does tetanus get in? — the wound animation and a personal observation to compare with a science note.
4. How does the toxin travel? — an inspectable wound-to-nerve pathway and comparison of usual and disrupted signals.
5. What are the symptoms? — a body hotspot map connecting muscle symptoms to nerve control.
6. Watch the patient story — a doctor–patient video and a question about the form of tetanus.
7. How do people recover? — a short care/recovery sequence.
8. How do vaccines help? — a group video, an immune-memory exploration, prevention takeaways, and a link into the case game.

Each topic starts with short, plain-language text and a visual. Scientific terms, the four tetanus forms, tissues, other symptoms, complications, and prognosis are visible as ordinary text sections inside their topics. Source credits and the optional skin diagram still use native disclosures. The topic explorer is complemented by **The Case of the Locked Jaw**, a playable investigation linked from the main navigation and the game section.

The site remains full width. Midnight backgrounds, pale reading panels, sky blue, mint and lime accents, and consistent heading styles replace the presentation layout. Lilita One is used for headings and self-hosted DM Sans for readable body text. Font licenses are in `assets/fonts`.

## Editing

- `index.html`: content, illustrations, source links, and native video markup.
- `styles.css`: palette in `:root`, full-width layout, topic navigation, reading panels and media styles.
- `script.js`: topic selection, keyboard navigation, hash/deep-link handling, and video visibility logic.
- `activities.js`: the five information-panel activities and discovery progress, held only in page memory.
- `reels.js`: the three-post science break, answer feedback, scrolling and keyboard navigation.
- `cells.js`: organelle selection on the sourced animal-cell diagram and a normal/toxin nerve-signalling comparison.
- `assets/memes`: the unchanged user-supplied meme images and provenance notes.
- `games/locked-jaw/`: the playable detective game, its styles, script, offline exporter, and documentation.
- `assets/images`: illustrations and posters. Drawings are labeled as illustrations rather than micrographs.
- `assets/videos`: the two previously supplied MP4 files plus the web-compatible MP4 prepared from the new vaccination MOV.

Topic navigation is progressively enhanced: anchors become ARIA tabs with arrow, Home/End, Enter and Space support. One panel is shown at a time when JavaScript is available. All eight science articles and the science break are visible with ordinary document links when JavaScript is disabled. Details can be opened with a keyboard. Existing topic hashes, including `#tissues` and `#nervous-system`, reveal the correct article; direct links to details open their content.

## Preview

Use a static HTTP server in this directory. Python’s `python3 -m http.server 8000` provides a basic preview, but video seeking needs HTTP byte-range support, as GitHub Pages provides. Review screenshots are saved outside the repository under `/workspace/scratch/tetanus-style-review`.

When publication is explicitly requested, GitHub Pages uses `main`, `/ (root)`. The stylesheet and script have versioned URLs so a future publication does not reuse stale browser-cached assets.

## Videos and accessibility

Both videos use local files and no YouTube iframe or API. The muted synaptic background loops only while the hero is visible and the tab is active; visitors can pause it. Reduced-motion preferences leave it on its poster until the visitor opts in. The narrated video keeps native playback, seeking, sound and fullscreen controls, and pauses when the student leaves the Watch topic. It works without JavaScript.

The wound video shows general inflammation, not a tetanus-specific process. Credits and original links remain in Sources & Video Credits. Captions have not been supplied; add an accurate WebVTT track when available. A technical failure shows a message and a direct video link.

## Content and remaining work

The style revision preserves the major scientific explanations while shortening the initial reading. General information links to CDC and WHO resources. Unsupported fatality percentages remain omitted. Have the group review final medical wording and sources before presenting.

The Locked Jaw game includes clues, a nerve-signal comparison and a cause-and-effect evidence puzzle. The science-break feed adds three user-supplied scenario questions; no other full games or newsletter service have been added. Exact Ontario curriculum expectation mapping remains separate work: the official Ontario curriculum site returned HTTP 403 in this execution environment, so no unverified expectation codes or alignment claims have been added.

## Local validation

Chromium checks passed at 1366, 1920 and 2560 pixels, with a smaller-window regression check. All five topics select correctly, only one panel is visible, all illustration files load, disclosures open, keyboard tab selection works, and deep links reveal their destinations. The actual narrated MP4 plays and seeks on a byte-range server and pauses on leaving its panel. Background autoplay, manual pause/play, offscreen pause and reduced-motion behavior passed. No runtime errors, missing assets or external media requests were observed. All six articles and native video controls remain accessible without JavaScript.

## Game integration

The homepage’s “Play the game” navigation item and “Play the investigation” button open `games/locked-jaw/index.html` in the same tab. The game provides a “Back to website” link to `index.html#game`. Both pages use relative asset paths compatible with GitHub Pages project subdirectories. Progress remains in the game page’s memory and resets when it is reloaded. Make future changes locally and push only when the user explicitly requests it.

## Information-panel discoveries and flow

The information panels include five small, ungated activities. Make future changes locally and push only when the user explicitly requests it.

- Compare a spore, living bacterium, and toxin using the supplied micrograph, observation markers and role descriptions. Inspect all three to collect the specimen notes.
- Write a video observation, then reveal a scientific comparison. Free text is never automatically graded, inserted as HTML, stored, or sent anywhere.
- Select each stop of the toxin pathway to connect wound entry, bacterial growth/toxin production, nerve transport, and blocked inhibitory messages.
- Explore three muscle areas on a keyboard-accessible body hotspot map, with an explanation linking each effect to nerve control.
- Explore toxoid practice, antibody/memory development, and booster reminders in the vaccination topic.

A discovery passport records five explorations. It is not a mastery score, does not award duplicate progress, and never blocks navigation. Progress and the observation note survive topic switching but clear on reload. All activities use native buttons or form controls with accessible labels, text feedback, and reduced-motion support. Without JavaScript, reading content, symptom descriptions, disclosures, native video controls, and contextual explanations remain available.

Topics now follow the story: microbe → wound → toxin journey → muscle symptoms → care and recovery → vaccination and prevention → case game. Each topic ends with a short connecting paragraph and a descriptive link into the next concept. Existing topic hashes are preserved.

Local Chromium checks exercised SVG state changes, keyboard selection, unique discovery counting, whitespace handling, reflection without grading or HTML injection, pathway and body exploration, preserved state across tabs, the complete linking sequence through to the game, updated keyboard topic order, desktop/small-window layout, and no-JavaScript reading fallback. No runtime errors, missing resources or external requests were observed. Review screenshots are in `/workspace/scratch/tetanus-discoveries-review`.

## Sourced images

The image update replaces the generated pathway images in topics 2–3 with original OpenStax skin, neuron and synapse JPGs, plus the existing still from the supplied 2014 wound animation. Topic 2 also offers a skin-layer diagram in an expandable explanation. Selecting a pathway stop reveals its full diagram with accurate scope, attribution, source, licence and a full-size image link. Original labels are preserved with `object-fit: contain`. See `assets/images/sourced/README.md` and `manifest.json` for source and licence details.

The exact user-selected micrograph for topic 1 has now been received as a ZIP and extracted unchanged as `assets/images/sourced/user-tetanus-micrograph.png`. It replaces the generated specimen pictures while preserving the three specimen explanations and discovery progress. Spore/bacterium markers are non-destructive CSS overlays; the toxin view clearly states that toxin is not visible in the photo. The user provided a source page, but original photographer/licence details were not independently verified and are not asserted to match the OpenStax licence. Existing drawings outside these three topics remain unchanged.

Local checks confirmed all replacement images load, generated pathway SVGs are no longer referenced, large-image and licence controls match each stop, the discovery activity still works, no horizontal overflow appears at desktop/small-window sizes, and no runtime errors or external media requests occur. Review screenshots are in `/workspace/scratch/tetanus-sourced-images-review`.

## Vaccination topic

A sixth topic, `#vaccination`, is linked from the main navigation and topic list. Recovery now transitions into vaccination; vaccination links into the Locked Jaw case. The section explains inactivated toxin (toxoid), antibodies and immune memory, booster reminders, and the need for vaccination after recovery. It gives a practical record-checking step with a trusted adult, clinician or public health unit. It does not prescribe an individual vaccination schedule or present vaccination as treatment for toxin already acting inside nerves.

The three-stage “Practice / Remember / Refresh” activity adds the fifth discovery. The total is derived from the discovery list to keep future additions consistent. All stages remain available in any order, and repeated exploration does not add duplicate progress. Short desktop viewports use a non-sticky sidebar so the longer navigation remains reachable.

`assets/videos/vaccination-conversation.mp4` is prepared from the supplied `copy_96CC9D27-E141-4A75-8D83-A764C94FCF16.mov`. It retains the complete 13.77-second portrait frame (480 × 854), sound and sequence. The original uploaded MOV remains unchanged. The web copy uses H.264/yuv420p in a fast-start MP4, with HLG/BT.2020 colour converted to standard Rec.709 for browser compatibility. Original AAC audio packets were copied and their hashes matched. The PNG poster comes from the converted clip at two seconds. No AI image generation or audio generation was used.

The clip is included as a project-supplied conversation starter, without unverified quotations or invented spoken captions. Spoken lines have been requested for an accurate caption/transcript addition; none were available when this draft was completed. Source medical explanations were checked against OpenStax Microbiology’s Vaccines and Tetanus sections. The current Canadian government page could not be retrieved from this environment (HTTP 403); current dose schedules are therefore not reproduced. Official Ontario/Canadian information links are provided.

The vaccination video has native controls, no autoplay, and preserves the entire portrait image. Both topic video players pause when their topic is left, and only one topic video is allowed to play at a time. Each has its own file-error message and direct file link. Without JavaScript, all six science articles, the science break and both native players remain available.

Chromium validation covered the new header link, deep link, keyboard topic selection, all three vaccine phases, idempotent discovery counting, completing all five discoveries, actual MP4 playback and seeking with sound enabled, pausing both topic videos on navigation, the recovery → vaccination → game flow, desktop/small-window layout, and no-JavaScript fallback. No runtime errors, missing resources or external media requests were observed. Review image: `/workspace/scratch/tetanus-vaccination-review/vaccination-section.png`.

Make future changes locally and push only when the user explicitly requests it.

## Reels-style science break

A finite three-post feed, `#reels`, is linked from the header and topic sidebar. Each post pairs one unchanged supplied meme with the corresponding user-written scenario and four answer choices. All three correct answers are option 2. Wrong choices have distinct, explanatory feedback; students can revise their answers without a timer or navigation lock.

The desktop layout places an uncropped meme in a portrait-style frame beside the question. The image is identified as a static meme, not a video. Native scrolling uses scroll snapping. Previous/Next controls, numbered post buttons and focused-feed Arrow Up/Down, Page Up/Down, Home/End keys offer alternatives. Radio groups retain their native keyboard interaction. The feed ends at post 3: no infinite scrolling, autoplay, real social account, engagement counts, third-party embeds or tracking.

Three contextual links place the break into the concept flow:

- Wound topic → `#reel-small-cut` → toxin pathway.
- Toxin pathway → `#reel-built-different` → symptoms.
- Vaccination topic → `#reel-vaccination` → Locked Jaw case.

Direct links select the correct outer panel and post. Students may skip the break or revisit another post. Current selections and checked feedback survive topic changes in the same page; refreshing clears them. “Answered” counts reflect checked current selections, not a grade or persisted score. This counter is separate from the five activity discoveries. Without JavaScript, all three posts and expandable answer explanations remain readable without a nested scroll area.

Asset notes are in `assets/memes/README.md`. The meme source bytes match the uploaded ZIP members. Original creators/licences were not supplied. The source files have not been altered; only CSS positioning and background blur are used.

Local Chromium checks covered all supplied image loads, wrong and correct answers, repeated submissions, answer changes, native radio keyboard behavior, feed keyboard and button navigation, real scroll positioning, deep links, saved choices when returning, all three topic handoffs and game launch, desktop/small-window layout, and no-JavaScript reading fallback. No runtime errors, missing resources or external requests were observed. Review screenshots: `/workspace/scratch/tetanus-reels-review`.

Make future changes locally and push only when the user explicitly requests publication.

## Doctor–patient conversation

The seventh science topic, `#doctor-patient`, connects symptoms to a doctor–patient conversation before care and recovery. The sidebar, topic numbers, deep links and connecting paragraphs include it. A short listening guide asks students to notice entry through a wound and the distribution of symptoms. The existing five-discovery passport is unchanged.

The four-choice question asks which type of tetanus the patient has. The group confirmed **generalized tetanus** as correct, followed by localized, cephalic and neonatal as the other choices. `doctor-case.js` provides choice-specific explanations, retries, keyboard-operable native radio buttons and live feedback. Selections survive topic changes and clear on refresh; they are not sent anywhere. The explanation connects generalized tetanus to nerve control and muscle effects without inventing patient dialogue or symptoms. A comparison disclosure and a no-JavaScript answer explanation remain readable.

The supplied replacement, `Sequence 01.mp4`, is saved unchanged as `assets/videos/doctor-patient-interaction.mp4` (24,373,435 bytes; source and repository SHA-256 hashes match). It contains 56.576 seconds of 1920 × 1080 H.264/yuv420p video and stereo AAC audio with its metadata already positioned for fast-start playback. No transcoding, cutting or audio changes were needed. The poster is a still at 12 seconds from the same clip. The original larger upload could not be transferred, so the supplied smaller version is the one used. No invented dialogue, spoken captions or unverified patient quotations have been added.

The native controlled player has no autoplay, preserves the full frame, includes a direct-file fallback and pauses when another topic is selected or another topic video begins. It remains available without JavaScript. The multiple-choice question follows the clip and can be revisited without replaying or waiting through the video.

Local Chromium checks passed for direct topic links, symptoms → conversation → recovery flow, all four answers, distinct feedback, retries, native radio keyboard controls, retained choices across topic switches and reset on refresh. Real video playback with sound enabled, metadata, seeking and pausing on topic changes or competing playback passed. The section fits 1920-, 1366- and 390-pixel viewports. The no-JavaScript reading/answer fallback was checked. No runtime errors or missing resources were observed. Review screenshot: `/workspace/scratch/tetanus-doctor-case-review/doctor-case.png`.

These changes are for local review. Push only when the user explicitly requests publication.


## Clearer navigation for grades 7–8

The existing format, scientific content, videos, memes, activities and game are preserved. Topic labels and instructions use direct language, and the existing end-of-topic bridges now offer consistent Back/Next links. The main route is microbe → wound → toxin pathway → symptoms → patient story → recovery → vaccination → game. Students can choose any topic from the same sidebar. The three memes remain available in their original feed and through clearly marked optional break links.

Start here and Start learning open the first topic. Selecting a sidebar topic scrolls to its heading; browser Back/Forward restores the previous topic. Discovery activities are explicitly labelled optional and never block Next. Science notes remain in their original topics with descriptive titles; the main text explanations are always visible. Original colours, fonts, cards, content arrangement and media files are unchanged. A sidebar that exceeds a typical viewport stays in the normal document scroll so all topics remain reachable.

Local Chromium checks passed for the full Next route without completing activities, each Back target, the three meme deep links and answer feedback, browser history, scroll position, optional discoveries, observation comparison, patient question retries, real video playback and pause on navigation, keyboard tabs and desktop/small-window layouts. All scientific introductions, fact cards, expanded explanations, body descriptions, recovery steps, vaccine explanations, meme scenarios and answer choices were compared with the published source and match. No JavaScript errors or missing local resources were observed. The no-JavaScript document still exposes all topics and navigation. Review output is in `/workspace/scratch/tetanus-clear-navigation-review`.

Changes remain local until publication is explicitly requested.


## Always-visible science explanations

Eight text disclosures are now ordinary labelled sections: tetanus types, the animation connection, affected tissues, science vocabulary, other symptoms and complications, the patient’s type reminder, recovery factors and personal vaccination. The wording, definition grids, colours, borders and spacing stay in their original locations. Heading bars have no plus/cross toggle, button role or click requirement. Nested symptom headings use the next heading level. The `#tissues` deep link is preserved. Source credits, the optional skin diagram and no-JavaScript quiz answer reveals stay collapsible.

Local browser checks confirmed all eight explanations appear without interaction when their topic is selected, all explanatory text matches the previous version, the tissue deep link works, and the layout fits desktop and smaller windows. Both example sections remain visible without JavaScript. No runtime errors occurred. Review screenshots are in `/workspace/scratch/tetanus-visible-notes-review`. Publish future changes only when explicitly requested.


## Cells and body organization

A new second topic, `#cells`, teaches cell theory; membrane/cytoplasm/nucleus/mitochondria/ribosomes/vacuole/ER/Golgi/lysosomes/vesicles/cytoskeleton functions; plant/animal/bacterial differences; specialized neurons; and the five organization levels from a cell to an organism. Ten selection buttons highlight structures on the unaltered OpenStax animal-cell diagram. The normal/toxin diagram views link vesicle fusion and inhibitory-messenger release to muscle symptoms. It explicitly avoids portraying every organelle as damaged by tetanus toxin.

The new diagram is the original OpenStax textbook illustration matching the user’s reference, with visible source/licence links and checksum provenance. All image labels are preserved. Only CSS selection outlines are added. No AI image generation or generative editing was used. See `assets/images/sourced/README.md` and `manifest.json`.

The student-facing curriculum callout and curriculum badge have been removed. Cell biology teaching and the organization sequence remain. `CURRICULUM.md` keeps the learning-goal mapping as repository notes, with the original verification limits; the website does not display that mapping or claim numbered expectations. Medical background was checked in the accessible OpenStax Microbiology source for nervous-system infections and bacterial virulence.

The main route now runs introduction → cells → wound → toxin → symptoms → patient → recovery → vaccination → game. Existing topic IDs and supplied content remain intact. The sidebar and topic numbers include the addition; the `#cell-organization` deep link reveals the new topic. The original five optional discoveries remain unchanged, and no extra completion requirement or score was added. Without JavaScript, all ten cell-part explanations, both signalling explanations and the organization sequence remain readable.

Local Chromium checks passed for all ten selections and outlines, native keyboard operation, reversible normal/toxin states, retained selections across topics, all five organization levels, Next/Back and deep links, all nine tabs at desktop/small-window sizes, no-JavaScript content and the image checksum. Existing fact cards, visible explanations, questions, answers and symptom/recovery/vaccine content match the previous revision. No runtime errors or missing local resources were observed. Screenshots and validation notes are in `/workspace/scratch/tetanus-cells-review`.

Keep changes local and push only when explicitly requested.


## Tetanus incorporated into the cell diagram

The original textbook diagram now has Normal cell jobs / With tetanus toxin controls above it. In toxin view, four clickable numbered markers identify cytoskeleton transport tracks, cytoplasm, vesicles and the cell membrane. Selecting a marker updates the adjacent normal-job and tetanus-connection explanation; all ten organelle selectors also update this panel. Entering toxin view starts with vesicles. The figure itself shows the whole-body consequence of reduced inhibitory signalling, with the molecular explanation and medical-source link under its caption. The separate signalling section and three-card model have been replaced by this integrated view.

Other organelles remain selectable for their normal functions and appropriate supporting context. They are not highlighted as toxin-damaged. The two contexts are nerve transport and action inside inhibitory neurons, not a claim that all stages occur in one generic animal cell. The original JPEG bytes, labels, source credits and licence remain unchanged. All normal jobs, neuron specialization, plant/bacterial comparisons, and five organization levels are retained.

Local Chromium checks passed for removal of the public curriculum section/badge, all ten cell-part jobs, four diagram hotspots, choice-specific explanations, reversible modes, native keyboard controls, retained choices across topic changes, desktop/small-window layout, no-JavaScript definitions and tetanus notes, and unchanged source-image checksum. No runtime errors or missing resources were observed. Actual review screenshots and validation notes are in `/workspace/scratch/tetanus-integrated-cell-review`. Keep these changes local until a push is explicitly requested.


## Pictures for cell organization

The five existing organization columns now include published drawings: a DBCLS neuron, OpenStax nervous tissue/spinal-cord cross-section/nervous-system illustrations, and Laura Dworatschek's OpenMoji person. Existing headings and descriptions are unchanged. Images are displayed in consistent frames, with illustration-only CSS views for the two textbook figures that also contain micrographs. The spinal cord is labelled as a cross-section, and a not-to-scale caption links to full source credits. Each picture opens its complete original in a new tab. No AI generation or generative editing was used.

Source files are self-hosted; pinned provenance, licences, clipping notes and hashes are in `assets/images/sourced/manifest.json` and its README. The OpenMoji licence copy is included. Pictures are lazy-loaded and remain available without JavaScript. Keep these changes local until a push is explicitly requested.

Local Chromium checks passed for all five image loads, unchanged headings/descriptions, illustration-only clipping, desktop/small-window layout, keyboard links to originals, the credits deep link, no-JavaScript image loading and source checksums. No runtime errors or missing resources were observed. Review screenshots are in `/workspace/scratch/tetanus-organization-pictures-review`.

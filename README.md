# BIOC21 Tetanus Website

A static, mobile-friendly group project for students in grades 7–8, based on our Canva layout. No build step or package installation is needed.

## Preview and publish

Open `index.html` to read the page, or run `python3 -m http.server 8000` from this directory to test the videos over HTTP. GitHub Pages should publish from `main`, `/ (root)`.

## Update the site

- `index.html`: section order, text, image paths, and links.
- `styles.css`: colours, layout, and spacing. Font files and their licenses are in `assets/fonts`.
- `script.js`: background playback and the standalone video source.
- `assets/images`: simplified SVG illustrations used until the original Canva images arrive. They are labeled as illustrations on the page; they are not micrographs or frames from the videos. Replace their paths in the HTML/CSS when original images are available, and update the alt text and captions.

The first supplied video (`https://www.youtube.com/shorts/2MG2WOAfL5A`) is a decorative, muted, looping YouTube background. It pauses when the opening section leaves view or the tab is hidden. Visitors can pause it manually. Reduced-motion preferences show a still illustration until the visitor chooses to play. This environment blocks YouTube, so real playback must still be checked in a browser with YouTube access. YouTube embedding permissions, browser autoplay rules, and connection availability can prevent playback; the illustration remains available.

The second supplied video (`https://www.youtube.com/watch?v=8NWHKJgNfdI`) is **not embedded through YouTube**. Its place currently says “Video coming soon.” To activate the native HTML player, put an original MP4 in `assets/videos` and set `EXPLAINER_VIDEO_SOURCE` in `script.js` to its relative path, or use a direct HTTPS video-file URL. A YouTube watch link does not work as a native player source. For large video files, use a video hosting service that provides a direct media URL. Add a WebVTT captions track when the video and transcript are available.

Remaining project slides and original images can be added as they arrive. Only the supplied sections have been implemented; no game or extra pages have been invented.

General health information links to the CDC. Review project wording and references with your group before presenting.

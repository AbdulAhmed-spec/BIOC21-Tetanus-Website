// Set an original MP4 path or a direct HTTPS video-file URL when available.
// Example: "assets/videos/tetanus-explainer.mp4". YouTube watch URLs cannot
// be used as HTML <video> sources.
const EXPLAINER_VIDEO_SOURCE = "";

const explainer = document.querySelector("#explainer-video");
const placeholder = document.querySelector("#video-placeholder");
const caption = document.querySelector("#watch-caption");
if (EXPLAINER_VIDEO_SOURCE) {
  explainer.src = EXPLAINER_VIDEO_SOURCE;
  explainer.hidden = false;
  placeholder.hidden = true;
  caption.textContent = "Press play and explore how tetanus enters the body.";
  explainer.addEventListener("error", () => {
    explainer.hidden = true;
    placeholder.hidden = false;
    placeholder.querySelector("h3").textContent = "Video unavailable";
    placeholder.querySelector("p").textContent = "We couldn’t load this video. Please try again later.";
    caption.textContent = "The video file could not be loaded.";
  });
}

const hero = document.querySelector(".hero");
const toggle = document.querySelector("#motion-toggle");
const status = document.querySelector("#background-status");
toggle.hidden = false;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let wantsPlayback = !reducedMotion.matches;
let heroVisible = false;
let player;
let ready = false;
let loading = false;
let loadTimeout;

function updateButton() {
  toggle.textContent = wantsPlayback ? "Pause background video" : "Play background video";
  toggle.setAttribute("aria-pressed", String(wantsPlayback));
}

function backgroundFailed() {
  clearTimeout(loadTimeout);
  wantsPlayback = false;
  loading = false;
  ready = false;
  if (player) {
    player.destroy();
    player = undefined;
  }
  const container = document.createElement("div");
  container.id = "background-player";
  document.querySelector(".hero-background").replaceChildren(container);
  hero.classList.remove("is-playing");
  status.textContent = "Background video unavailable. Showing an illustration.";
  updateButton();
}

function syncPlayback() {
  updateButton();
  if (wantsPlayback && heroVisible && !document.hidden) {
    if (!loading) loadBackground();
    if (ready) player.playVideo();
  } else if (ready) {
    player.pauseVideo();
  }
}

function loadBackground() {
  loading = true;
  status.textContent = "Loading background video…";
  loadTimeout = setTimeout(backgroundFailed, 18000);
  const createPlayer = () => {
    player = new YT.Player("background-player", {
      host: "https://www.youtube-nocookie.com",
      videoId: "2MG2WOAfL5A",
      playerVars: {
        autoplay: 0, mute: 1, controls: 0, playsinline: 1,
        loop: 1, playlist: "2MG2WOAfL5A", disablekb: 1,
        fs: 0, rel: 0, origin: window.location.origin
      },
      events: {
        onReady(event) {
          ready = true;
          clearTimeout(loadTimeout);
          status.textContent = "";
          event.target.mute();
          event.target.getIframe().setAttribute("tabindex", "-1");
          event.target.getIframe().setAttribute("title", "Decorative tetanus background video");
          syncPlayback();
        },
        onStateChange(event) {
          hero.classList.toggle("is-playing", event.data === YT.PlayerState.PLAYING);
          if (event.data === YT.PlayerState.PLAYING) {
            clearTimeout(loadTimeout);
            status.textContent = "";
          }
        },
        onAutoplayBlocked() {
          wantsPlayback = false;
          status.textContent = "Use Play background video to start the animation.";
          updateButton();
        },
        onError: backgroundFailed
      }
    });
  };
  if (window.YT?.Player) {
    createPlayer();
  } else {
    window.onYouTubeIframeAPIReady = createPlayer;
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.onerror = backgroundFailed;
    document.head.append(script);
  }
}

toggle.addEventListener("click", () => {
  wantsPlayback = !wantsPlayback;
  syncPlayback();
});
reducedMotion.addEventListener("change", () => {
  wantsPlayback = !reducedMotion.matches;
  syncPlayback();
});
document.addEventListener("visibilitychange", syncPlayback);
new IntersectionObserver(([entry]) => {
  heroVisible = entry.isIntersecting;
  syncPlayback();
}, { threshold: 0.15 }).observe(hero);

const navigationLinks = [...document.querySelectorAll("nav a")];
const sectionObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    navigationLinks.forEach(link => {
      if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
}, { rootMargin: "-10% 0px -55% 0px" });
document.querySelectorAll("#home, #about, #watch, #transmission").forEach(section => sectionObserver.observe(section));

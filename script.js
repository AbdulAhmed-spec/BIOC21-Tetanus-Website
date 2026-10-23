// The background uses the supplied local video. No YouTube embeds or API calls.
const hero = document.querySelector('.hero');
const background = document.querySelector('#background-video');
const toggle = document.querySelector('#motion-toggle');
const status = document.querySelector('#background-status');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let wantsPlayback = !reducedMotion.matches;
let heroVisible = false;
let playbackRequest = 0;

toggle.hidden = false;
background.muted = true;

function updateButton() {
  toggle.textContent = wantsPlayback ? 'Pause background video' : 'Play background video';
  toggle.setAttribute('aria-pressed', String(wantsPlayback));
}

async function syncPlayback() {
  const request = ++playbackRequest;
  updateButton();
  if (!wantsPlayback || !heroVisible || document.hidden) {
    background.pause();
    return;
  }
  if (!background.getAttribute('src')) background.src = background.dataset.src;
  try {
    await background.play();
    // An offscreen/pause event may arrive while the play promise is pending.
    if (request !== playbackRequest && (!wantsPlayback || !heroVisible || document.hidden)) background.pause();
    status.textContent = '';
  } catch (error) {
    if (request !== playbackRequest || error.name === 'AbortError') return;
    wantsPlayback = false;
    status.textContent = 'Use Play background video to start the animation.';
    updateButton();
  }
}

background.addEventListener('error', () => {
  wantsPlayback = false;
  status.textContent = 'Background video unavailable. Showing a still image.';
  updateButton();
});
toggle.addEventListener('click', () => {
  wantsPlayback = !wantsPlayback;
  syncPlayback();
});
reducedMotion.addEventListener('change', () => {
  wantsPlayback = !reducedMotion.matches;
  syncPlayback();
});
document.addEventListener('visibilitychange', syncPlayback);
new IntersectionObserver(([entry]) => {
  heroVisible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
  syncPlayback();
}, { threshold: [0, 0.15] }).observe(hero);
updateButton();

const explainer = document.querySelector('#explainer-video');
explainer.addEventListener('error', () => {
  document.querySelector('#explainer-error').hidden = false;
});
explainer.querySelector('source').addEventListener('error', () => {
  document.querySelector('#explainer-error').hidden = false;
});

// Highlight the current section in the navigation while scrolling.
const navigationLinks = [...document.querySelectorAll('nav a')];
const sectionObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    navigationLinks.forEach(link => {
      if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
}, { rootMargin: '-10% 0px -55% 0px' });
document.querySelectorAll('main > section[id]').forEach(section => sectionObserver.observe(section));

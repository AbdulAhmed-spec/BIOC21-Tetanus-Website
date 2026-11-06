// Enhance ordinary document links into an accessible topic explorer.
// Without JavaScript, every article stays visible and the links still work.
const topicNavigation = document.querySelector('.topic-navigation');
const topicLinks = [...document.querySelectorAll('[data-topic]')];
const panels = [...document.querySelectorAll('.topic-panel')];
const topicVideos = [...document.querySelectorAll('.topic-panel video')];

topicNavigation.setAttribute('role', 'tablist');
topicNavigation.setAttribute('aria-orientation', 'vertical');
topicLinks.forEach(link => {
  link.setAttribute('role', 'tab');
  link.setAttribute('aria-controls', link.dataset.topic);
});
panels.forEach(panel => {
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('aria-labelledby', `tab-${panel.id}`);
  panel.tabIndex = 0;
});

function selectTopic(id) {
  panels.forEach(panel => { panel.hidden = panel.id !== id; });
  topicLinks.forEach(link => {
    const selected = link.dataset.topic === id;
    link.setAttribute('aria-selected', String(selected));
    link.tabIndex = selected ? 0 : -1;
  });
  topicVideos.forEach(video => {
    if (video.closest('.topic-panel').id !== id) video.pause();
  });
}

function revealTarget(hash) {
  const target = document.getElementById(hash.slice(1));
  if (!target) return null;
  const panel = target.closest('.topic-panel');
  if (panel) selectTopic(panel.id);
  // Open deep-linked explanations and references before moving focus/scroll.
  for (let node = target; node; node = node.parentElement) {
    if (node.tagName === 'DETAILS') node.open = true;
  }
  return target;
}
selectTopic('about');
const initialTarget = revealTarget(window.location.hash);
if (initialTarget) requestAnimationFrame(() => initialTarget.scrollIntoView());

function navigateTopic(link) {
  const id = link.dataset.topic;
  selectTopic(id);
  history.replaceState(null, '', `#${id}`);
}

topicNavigation.addEventListener('click', event => {
  const link = event.target.closest('[data-topic]');
  if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  navigateTopic(link);
});
topicNavigation.addEventListener('keydown', event => {
  const current = topicLinks.indexOf(document.activeElement);
  if (current < 0) return;
  if (event.key === ' ') {
    event.preventDefault();
    navigateTopic(topicLinks[current]);
    return;
  }
  let next;
  if (['ArrowDown', 'ArrowRight'].includes(event.key)) next = (current + 1) % topicLinks.length;
  else if (['ArrowUp', 'ArrowLeft'].includes(event.key)) next = (current - 1 + topicLinks.length) % topicLinks.length;
  else if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = topicLinks.length - 1;
  else return;
  event.preventDefault();
  topicLinks[next].focus();
  navigateTopic(topicLinks[next]);
});
// Handle Next question, header and reference links, including links into hidden panels.
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || link.hasAttribute('data-topic') || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const target = revealTarget(link.hash);
  if (target?.classList.contains('topic-panel')) target.focus({ preventScroll: true });
});
window.addEventListener('hashchange', () => {
  const target = revealTarget(window.location.hash);
  if (target) target.scrollIntoView();
});

// Local background video. Respect motion preferences, manual pause, and visibility.
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
  if (!wantsPlayback || !heroVisible || document.hidden) { background.pause(); return; }
  if (!background.getAttribute('src')) background.src = background.dataset.src;
  try {
    await background.play();
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
toggle.addEventListener('click', () => { wantsPlayback = !wantsPlayback; syncPlayback(); });
reducedMotion.addEventListener('change', () => { wantsPlayback = !reducedMotion.matches; syncPlayback(); });
document.addEventListener('visibilitychange', syncPlayback);
new IntersectionObserver(([entry]) => {
  heroVisible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
  syncPlayback();
}, { threshold: [0, 0.15] }).observe(hero);
updateButton();
// Only the selected topic's video should be heard. Each player has its own error message.
topicVideos.forEach(video => {
  video.addEventListener('play', () => {
    topicVideos.forEach(other => { if (other !== video) other.pause(); });
  });
  const showError = () => { document.querySelector(video.dataset.errorTarget).hidden = false; };
  video.addEventListener('error', showError);
  video.querySelectorAll('source').forEach(source => source.addEventListener('error', showError));
});

// A finite, local three-post learning feed. No social-media SDKs, accounts or tracking.
(() => {
  const panel = document.querySelector('#reels');
  const feed = document.querySelector('#reels-feed');
  const posts = [...feed.querySelectorAll('[data-reel]')];
  const forms = [...feed.querySelectorAll('[data-reel-form]')];
  const previous = document.querySelector('#reels-previous');
  const next = document.querySelector('#reels-next');
  const jumps = [...document.querySelectorAll('[data-reel-jump]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let scrollFrame = 0;
  feed.classList.add('is-enhanced');
  document.querySelector('#reels-toolbar').hidden = false;
  document.querySelector('#reels-bottom-nav').hidden = false;

  const responses = {
    1: {
      correct:'Even a small puncture wound can let environmental spores enter. Rust itself is not the cause, and a wound does not automatically lead to tetanus. Tell a trusted adult and get appropriate advice about wound care and vaccination history.',
      wrong:{1:'A small wound can still provide an entry point for spores. Its size alone does not tell you whether it needs attention.',3:'Rust does not cause tetanus. Environmental spores can enter through a wound caused by many kinds of objects.',4:'Not every small cut causes tetanus. A possible risk is a reason to take sensible action, not proof that illness will happen.'}
    },
    2: {
      correct:'Feeling strong or healthy does not guarantee protection against tetanus. Children and adults can be affected. A contaminated wound deserves attention, and vaccination history matters. Risk does not mean every wound will cause illness.',
      wrong:{1:'Feeling healthy does not make someone completely immune to tetanus. Protection depends on factors including vaccination history, not confidence or athletic ability.',3:'People with healthy immune systems can also develop tetanus. A dirty puncture wound should not be ignored.',4:'Tetanus can affect children as well as adults. Age alone does not make a wound safe to ignore.'}
    },
    3: {
      correct:'Tetanus vaccination helps the immune system build protection against the toxin. Recommended doses and boosters help maintain that protection. It does not prevent every infection or replace appropriate care for a wound.',
      wrong:{1:'Tetanus protection is not based on one dose for an entire lifetime. A recommended vaccination series and booster doses help build and maintain protection.',3:'Vaccines target particular diseases or their effects. Tetanus vaccination helps protect against tetanus toxin; it does not make every infection impossible.',4:'Vaccination helps prepare protection before illness. Someone with suspected tetanus needs urgent medical care; vaccination does not replace that care.'}
    }
  };

  function updateNavigation(index, writeHash = false) {
    current = Math.max(0, Math.min(posts.length - 1, index));
    previous.disabled = current === 0;
    next.disabled = current === posts.length - 1;
    document.querySelector('#reels-position').textContent = `Post ${current + 1} of ${posts.length}`;
    jumps.forEach((button,i) => {
      if (i === current) button.setAttribute('aria-current','true');
      else button.removeAttribute('aria-current');
    });
    if (writeHash && !panel.hidden) history.replaceState(null,'',`#${posts[current].id}`);
  }
  function goTo(index, behavior = reduceMotion.matches ? 'auto' : 'smooth', writeHash = true) {
    updateNavigation(index,writeHash);
    feed.scrollTo({top:posts[current].offsetTop,behavior});
  }
  previous.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));
  jumps.forEach(button => button.addEventListener('click', () => goTo(Number(button.dataset.reelJump))));
  feed.addEventListener('keydown', event => {
    // Radio groups retain their native arrow-key behavior.
    if (event.target !== feed) return;
    let index;
    if (['ArrowDown','PageDown'].includes(event.key)) index = current + 1;
    else if (['ArrowUp','PageUp'].includes(event.key)) index = current - 1;
    else if (event.key === 'Home') index = 0;
    else if (event.key === 'End') index = posts.length - 1;
    else return;
    event.preventDefault();
    goTo(index);
  });
  feed.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      if (panel.hidden) return;
      let best = current, largestVisibleArea = 0;
      posts.forEach((post,index) => {
        const top = post.offsetTop;
        const visible = Math.max(0,Math.min(top + post.offsetHeight,feed.scrollTop + feed.clientHeight) - Math.max(top,feed.scrollTop));
        if (visible > largestVisibleArea) {largestVisibleArea=visible;best=index;}
      });
      if (largestVisibleArea > 0) updateNavigation(best,true);
    });
  },{passive:true});

  function showLinkedPost(hash) {
    if (hash === '#reels') {goTo(0,'auto',false);return;}
    const index = posts.findIndex(post => `#${post.id}` === hash);
    if (index >= 0) goTo(index,'auto',false);
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    showLinkedPost(link.hash);
  });
  window.addEventListener('hashchange', () => showLinkedPost(window.location.hash));
  updateNavigation(0);
  // The main topic script reveals the outer panel for deep links before this runs.
  requestAnimationFrame(() => showLinkedPost(window.location.hash));

  function updateAnsweredCount() {
    const answered = forms.filter(form => form.dataset.checked === 'true').length;
    document.querySelector('#reels-answered').textContent = `${answered} of ${posts.length} answered`;
    const correct = forms.filter(form => form.dataset.correct === 'true').length;
    document.querySelector('#reels-bottom-nav p').textContent = correct===posts.length
      ? 'Three science connections made. Keep exploring—or try the case game.'
      : answered===posts.length ? 'Three takes checked. Revisit any answer or keep exploring.'
      : 'No timer. Check a take, then keep exploring.';
  }
  forms.forEach(form => {
    const id = Number(form.dataset.reelForm);
    const post = form.closest('[data-reel]');
    const submit = form.querySelector('button[type="submit"]');
    const result = document.querySelector(`#reel-feedback-${id}`);
    const status = document.querySelector(`[data-answer-status="${id}"]`);
    form.querySelector('fieldset').disabled = false;
    submit.hidden = false;
    form.addEventListener('change', () => {
      submit.disabled = !form.querySelector('input:checked');
      form.dataset.checked = 'false';
      form.dataset.correct = 'false';
      result.hidden = true;
      result.replaceChildren();
      status.textContent = 'READY TO CHECK';
      status.classList.remove('correct','incorrect');
      form.querySelectorAll('.reel-choice').forEach(label => label.classList.remove('is-correct','is-incorrect'));
      updateAnsweredCount();
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      const selected = form.querySelector('input:checked');
      if (!selected) return;
      const answer = Number(selected.value);
      const correct = selected.value === post.dataset.correct;
      form.dataset.checked = 'true';
      form.dataset.correct = String(correct);
      result.classList.toggle('correct',correct);
      result.hidden = false;
      const heading = document.createElement('h4');
      heading.textContent = correct ? 'You’ve got it. Here’s the science.' : 'Not quite. Take another look.';
      const explanation = document.createElement('p');
      explanation.textContent = correct ? responses[id].correct : responses[id].wrong[answer];
      result.replaceChildren(heading,explanation);
      status.textContent = correct ? 'CHECKED · CORRECT' : 'TRY ANOTHER TAKE';
      status.classList.toggle('correct',correct);
      status.classList.toggle('incorrect',!correct);
      form.querySelectorAll('.reel-choice').forEach(label => label.classList.remove('is-correct','is-incorrect'));
      selected.closest('.reel-choice').classList.add(correct ? 'is-correct' : 'is-incorrect');
      updateAnsweredCount();
      result.scrollIntoView({block:'nearest',behavior:'auto'});
    });
  });
})();

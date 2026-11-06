// Small learning activities for the topic explorer. Everything stays in page memory.
// These record exploration, not correctness or mastery. They never lock navigation.
(() => {
  const completed = new Set();
  const visited = {microbe:new Set(), route:new Set(), body:new Set()};
  const passport = document.querySelector('#discovery-passport');
  passport.hidden = false;
  document.querySelector('.sidebar-note').hidden = true;
  function completeActivity(id) {
    if (completed.has(id)) return;
    completed.add(id);
    document.querySelector('#discovery-count').textContent = String(completed.size);
    document.querySelector('#discovery-meter').value = completed.size;
    document.querySelector(`[data-discovery="${id}"]`).classList.add('discovered');
    const badge = document.querySelector(`[data-activity-badge="${id}"]`);
    badge.textContent = 'EXPLORED';
    badge.classList.add('explored');
    const names = {microbe:'Specimen notes',observation:'Observation comparison',route:'Toxin pathway',body:'Muscle effects'};
    document.querySelector('#discovery-status').textContent = `${names[id]} explored. ${completed.size} of 4 activities explored.${completed.size===4?' Ready to connect the ideas in the Locked Jaw case?':''}`;
  }

  const specimens = {
    spore:{label:'THE SPORE',title:'A tough resting form',text:'This is a resting form of the bacterium—not a different organism. Spores can survive in the environment and enter through broken skin.',cue:'Look for the round blue terminal spores at the ends of the pink rods. The circle highlights one example.'},
    bacterium:{label:'THE BACTERIUM',title:'A tiny living cell',text:'Clostridium tetani can grow in low-oxygen areas of a wound and make toxin. The bacteria do not need to spread throughout the body for the toxin to cause effects.',cue:'Look for pink, rod-shaped bacterial cells. The outline highlights an example; the photograph is unchanged.'},
    toxin:{label:'THE TOXIN',title:'The travelling poison',text:'Tetanus toxin is a molecule made by the bacterium, not a living cell. It can travel along nerves toward the spinal cord and brainstem and disrupt inhibitory messages.',cue:'Toxin is a molecule and is not visible in this micrograph. The photo shows bacterial cells and spores, not toxin molecules.'}
  };
  document.querySelector('.specimen-controls').hidden = false;
  document.querySelectorAll('[data-specimen]').forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.specimen;
    const specimen = specimens[id];
    visited.microbe.add(id);
    document.querySelectorAll('[data-specimen]').forEach(control => control.setAttribute('aria-pressed',String(control===button)));
    document.querySelectorAll('[data-specimen-art]').forEach(art => { art.toggleAttribute('hidden',art.dataset.specimenArt!==id); });
    document.querySelector('#micrograph-cue').textContent = specimen.cue;
    const note = document.querySelector('#specimen-note');
    note.querySelector('.mini-label').textContent = specimen.label;
    note.querySelector('h3').textContent = specimen.title;
    note.querySelector('p').textContent = specimen.text;
    document.querySelector('#specimen-progress').textContent = `${visited.microbe.size} of 3 specimen notes collected.${visited.microbe.size===3?' The toxin is the one that carries effects away from the wound.':''}`;
    if (visited.microbe.size===3) completeActivity('microbe');
  }));

  const stops = [
    {label:'STOP 01 / ENTRY',title:'A break in the barrier',text:'Intact skin helps keep microbes out. A cut or puncture can let environmental spores enter. A wound does not automatically mean someone will develop tetanus.'},
    {label:'STOP 02 / AT THE WOUND',title:'The bacterium makes the toxin',text:'If conditions allow, spores become growing bacteria in a low-oxygen wound. The bacteria release toxin. This is where the organism and its travelling product part ways.'},
    {label:'STOP 03 / ALONG NERVES',title:'Follow the toxin—not the bacterium',text:'Toxin is taken into motor nerve endings and transported toward the spinal cord and brainstem. A hand injury and a tight jaw can be connected through the nervous system.'},
    {label:'STOP 04 / NERVE CONTROL',title:'The normal brake is disrupted',text:'The toxin prevents release of inhibitory chemical messengers. Without normal braking, motor output can become excessive. Muscles may stay tight or spasm.'}
  ];
  // These images are reproduced from documented human-created scientific sources.
  const routeImages = [
    {file:'assets/images/sourced/openstax-skin-layers.jpg',alt:'OpenStax diagram of intact skin, with labelled epidermis, dermis, underlying tissue, glands and nerves',caption:'Layers of Skin — OpenStax, Anatomy and Physiology 2e. This is intact skin; a wound creates a break in its barrier.',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/5-1-layers-of-the-skin',license:'https://creativecommons.org/licenses/by-nc-sa/4.0/'},
    {file:'assets/images/wound-poster.jpg',alt:'Still of damaged skin from Drew Berry’s Skin Wound Inflammation animation',caption:'Wound animation still — Drew Berry / WEHI.TV, 2014, from the supplied video. This shows general inflammation, not tetanus bacteria or toxin.',source:'https://www.youtube.com/watch?v=8NWHKJgNfdI',license:null},
    {file:'assets/images/sourced/openstax-neuron.jpg',alt:'OpenStax drawing of a neuron showing cell body, dendrites, axon, myelin and synapses',caption:'Parts of a Neuron — OpenStax, Anatomy and Physiology 2e. A general neuron diagram; the drawing does not depict tetanus toxin transport.',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/12-2-nervous-tissue',license:'https://creativecommons.org/licenses/by-nc-sa/4.0/'},
    {file:'assets/images/sourced/openstax-synapse.jpg',alt:'OpenStax diagram of a normal chemical synapse showing vesicles releasing neurotransmitters',caption:'The Synapse — OpenStax, Anatomy and Physiology 2e. This drawing shows normal messenger release. Tetanus toxin blocks release in inhibitory neurons.',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/12-5-communication-between-neurons',license:'https://creativecommons.org/licenses/by-nc-sa/4.0/'}
  ];
  document.querySelectorAll('[data-route-stop]').forEach(button => {
    button.disabled = false;
    button.addEventListener('click', () => {
      const index = Number(button.dataset.routeStop);
      const stop = stops[index];
      visited.route.add(index);
      document.querySelectorAll('[data-route-stop]').forEach(control => control.setAttribute('aria-pressed',String(control===button)));
      const note = document.querySelector('#route-note');
      note.querySelector('.mini-label').textContent = stop.label;
      note.querySelector('h3').textContent = stop.title;
      note.querySelector('p').textContent = stop.text;
      const artwork = routeImages[index];
      document.querySelector('#route-detail').hidden = false;
      const image = document.querySelector('#route-detail-image');
      image.src = artwork.file;
      image.alt = artwork.alt;
      document.querySelector('#route-detail-caption').textContent = artwork.caption;
      document.querySelector('#route-detail-source').href = artwork.source;
      document.querySelector('#route-detail-full').href = artwork.file;
      document.querySelector('#route-detail-license-wrapper').hidden = !artwork.license;
      const license = document.querySelector('#route-detail-license');
      if (artwork.license) license.href = artwork.license;
      else license.removeAttribute('href');

      document.querySelector('#route-progress').textContent = `${visited.route.size} of 4 stops inspected${visited.route.size===4?' — from a wound to a change in nerve control.':''}`;
      if (visited.route.size===4) completeActivity('route');
    });
  });

  const bodyNames = {jaw:'Jaw muscles',neck:'Neck and throat muscles',abdomen:'Abdominal muscles'};
  document.querySelector('.body-hotspots').hidden = false;
  document.querySelector('.symptom-visual').classList.add('is-interactive');
  // Leave one concise explanation visible; opening it initially does not award a discovery.
  document.querySelectorAll('[data-body-card]').forEach(card => { card.hidden=card.dataset.bodyCard!=='jaw'; });
  document.querySelectorAll('[data-body-area]').forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.bodyArea;
    visited.body.add(id);
    document.querySelectorAll('[data-body-area]').forEach(control => control.setAttribute('aria-pressed',String(control===button)));
    document.querySelectorAll('[data-body-card]').forEach(card => { card.hidden=card.dataset.bodyCard!==id; });
    document.querySelector('#body-progress').textContent = `${bodyNames[id]} explored. ${visited.body.size} of 3 muscle areas inspected.${visited.body.size===3?' Different symptoms, one link: disrupted nerve control.':''}`;
    if (visited.body.size===3) completeActivity('body');
  }));

  const form = document.querySelector('#observation-form');
  const input = document.querySelector('#observation-input');
  const compare = document.querySelector('#compare-observation');
  form.hidden = false;
  input.addEventListener('input', () => {
    compare.disabled = !input.value.trim();
    // A revised note can be compared again; never imply free text was graded.
    document.querySelector('#observation-comparison').hidden = true;
    document.querySelector('#observation-status').textContent = '';
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!input.value.trim()) return;
    document.querySelector('#observation-comparison').hidden = false;
    document.querySelector('#observation-status').textContent = 'Science note opened. Compare the ideas, then follow the toxin in the next topic. Your response has not been automatically graded.';
    completeActivity('observation');
  });
})();

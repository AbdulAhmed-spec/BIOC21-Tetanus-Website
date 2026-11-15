// Keep the textbook image intact; selectable annotations connect its structures to tetanus.
(() => {
  const panel = document.querySelector('#cells');
  if (!panel) return;
  const definitions = [...panel.querySelectorAll('[data-cell-part]')];
  const controls = panel.querySelector('#cell-part-controls');
  const highlights = panel.querySelector('#cell-highlights');
  const hotspots = panel.querySelector('#cell-tetanus-hotspots');
  const workspace = panel.querySelector('#cell-diagram-workspace');
  const signalButtons = [...panel.querySelectorAll('[data-cell-signal]')];
  const partButtons = [];
  const hotspotButtons = [];
  const relevantParts = ['cytoskeleton', 'cytoplasm', 'vesicles', 'membrane'];
  let signalMode = 'normal';
  let selectedPart = definitions[0];

  function selectPart(selected) {
    selectedPart = selected;
    definitions.forEach((definition, index) => {
      const active = definition === selected;
      definition.hidden = !active;
      partButtons[index].setAttribute('aria-pressed', String(active));
      definition.querySelector('.cell-tetanus-note').hidden = signalMode !== 'toxin';
    });
    hotspotButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.tetanusPart === selected.dataset.cellPart)));
    highlights.replaceChildren();
    selected.dataset.highlight.split(';').forEach(coordinates => {
      const [x, y, width, height] = coordinates.split(',').map(Number);
      const marker = document.createElement('span');
      marker.className = 'cell-highlight';
      marker.classList.toggle('is-tetanus', signalMode === 'toxin' && relevantParts.includes(selected.dataset.cellPart));
      marker.style.left = `${x}%`;
      marker.style.top = `${y}%`;
      marker.style.width = `${width}%`;
      marker.style.height = `${height}%`;
      highlights.append(marker);
    });
  }

  definitions.forEach(definition => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = definition.querySelector('dt').textContent;
    button.setAttribute('aria-controls', definition.id);
    button.addEventListener('click', () => selectPart(definition));
    controls.append(button);
    partButtons.push(button);
  });
  const hotspotNames = [
    'Cytoskeleton: toxin transport',
    'Cytoplasm: where the toxin cuts a protein',
    'Vesicles: blocked messenger release',
    'Cell membrane: vesicle fusion is disrupted'
  ];
  relevantParts.forEach((key, index) => {
    const definition = definitions.find(part => part.dataset.cellPart === key);
    const [x, y] = definition.dataset.highlight.split(';')[0].split(',').map(Number);
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = String(index + 1);
    button.dataset.tetanusPart = key;
    button.setAttribute('aria-label', `${index + 1}. ${hotspotNames[index]}`);
    button.setAttribute('aria-controls', definition.id);
    button.title = hotspotNames[index];
    button.style.left = `${x}%`;
    button.style.top = `${y}%`;
    button.addEventListener('click', () => selectPart(definition));
    hotspots.append(button);
    hotspotButtons.push(button);
  });
  selectPart(selectedPart);
  controls.hidden = false;

  signalButtons.forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.cellSignal;
    if (!['normal', 'toxin'].includes(key)) return;
    const enteringToxinView = signalMode !== 'toxin' && key === 'toxin';
    signalMode = key;
    workspace.dataset.signal = key;
    signalButtons.forEach(control => control.setAttribute('aria-pressed', String(control === button)));
    hotspots.hidden = key !== 'toxin';
    if (enteringToxinView) selectedPart = definitions.find(part => part.dataset.cellPart === 'vesicles');
    selectPart(selectedPart);
    panel.querySelector('#cell-diagram-result').textContent = key === 'toxin'
      ? 'With tetanus toxin: less inhibitory messenger is released from braking nerve cells. Motor nerve cells receive less braking, so muscles can stay tight or spasm.'
      : 'Normal nerve-cell signalling: vesicles release inhibitory messengers that help control motor nerve cells and allow muscles to relax.';
  }));
  panel.querySelector('#cell-signal-controls').hidden = false;
})();

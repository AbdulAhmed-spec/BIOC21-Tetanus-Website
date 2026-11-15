// Enhance the original textbook diagram; all organelle definitions remain readable without JS.
(() => {
  const panel = document.querySelector('#cells');
  if (!panel) return;
  const definitions = [...panel.querySelectorAll('[data-cell-part]')];
  const controls = panel.querySelector('#cell-part-controls');
  const highlights = panel.querySelector('#cell-highlights');
  const buttons = [];

  function selectPart(selected) {
    definitions.forEach((definition, index) => {
      const active = definition === selected;
      definition.hidden = !active;
      buttons[index].setAttribute('aria-pressed', String(active));
    });
    highlights.replaceChildren();
    selected.dataset.highlight.split(';').forEach(coordinates => {
      const [x, y, width, height] = coordinates.split(',').map(Number);
      const marker = document.createElement('span');
      marker.className = 'cell-highlight';
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
    buttons.push(button);
  });
  selectPart(definitions[0]);
  controls.hidden = false;

  const states = {
    normal: {
      label: 'INSIDE A BRAKING NERVE CELL · NORMAL SIGNALLING',
      steps: [
        ['Vesicle reaches the membrane', 'A packet carrying chemical messengers moves to the nerve ending’s outer membrane.'],
        ['Messenger is released', 'The vesicle joins with the membrane and releases messengers into the synapse, the gap between nerve cells.'],
        ['The brake message arrives', 'The next nerve cell receives an inhibitory message: a signal that reduces activity.']
      ],
      result: 'Body effect: braking signals help control motor nerve cells, allowing muscles to relax normally.'
    },
    toxin: {
      label: 'INSIDE A BRAKING NERVE CELL · WITH TETANUS TOXIN',
      steps: [
        ['Vesicle release machinery is damaged', 'Inside the nerve cell, toxin cuts a protein that vesicles need to join with the cell membrane.'],
        ['Messenger release is blocked', 'Vesicles cannot fuse normally with the membrane. Less inhibitory chemical messenger is released.'],
        ['Motor nerve cells receive less braking', 'With less braking, motor nerve cells can become too active.']
      ],
      result: 'Body effect: changed nerve signals can keep muscles tight or cause painful spasms. This connects an organelle-level process to muscle-tissue effects.'
    }
  };
  const signalButtons = [...panel.querySelectorAll('[data-cell-signal]')];
  signalButtons.forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.cellSignal;
    if (!Object.hasOwn(states, key)) return;
    const state = states[key];
    signalButtons.forEach(control => control.setAttribute('aria-pressed', String(control === button)));
    panel.querySelector('#cell-signal-model').dataset.signal = key;
    panel.querySelector('#cell-signal-label').textContent = state.label;
    state.steps.forEach(([title, text], index) => {
      panel.querySelector(`#cell-signal-step-${index + 1}`).textContent = title;
      panel.querySelector(`#cell-signal-text-${index + 1}`).textContent = text;
    });
    panel.querySelector('#cell-signal-result').textContent = state.result;
  }));
  panel.querySelector('#cell-signal-controls').hidden = false;
})();

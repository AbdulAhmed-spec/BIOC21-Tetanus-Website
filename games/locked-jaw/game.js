const workspace = document.querySelector('#workspace');
const notebook = document.querySelector('#notebook-content');
const feedback = document.querySelector('#feedback');
const stages = ['briefing', 'clues', 'lab', 'board'];
const arrow = '<svg class="button-arrow" aria-hidden="true" viewBox="0 0 20 20"><path d="M3 10h13m-5-5 5 5-5 5"/></svg>';
const makeState = () => ({stage:'briefing', unlocked:0, clues:new Set(), selectedClue:null, normal:false, toxin:false, condition:null, slots:Array(5).fill(null), selectedTile:null, history:[], boardFeedback:'', solved:false});
let state = makeState();
const clues = {
  wound: {title:'The garden incident', category:'FIELD REPORT / 8 DAYS EARLIER', note:'A wound can give environmental spores a way into the body.', text:'Alex cut their hand while helping in a garden. Soil touched the wound. Tetanus spores can be found in the environment and can enter through broken skin.', takeaway:'The wound is the doorway—not the whole explanation.'},
  microbe: {title:'A microscopic suspect', category:'MICROBE FILE / SIMPLIFIED ILLUSTRATION', note:'Bacteria can grow at the wound and make toxin.', text:'Clostridium tetani can grow in low-oxygen areas of a wound. The bacteria make a toxin, a type of poison. The bacteria and their toxin are not the same thing.', takeaway:'Look for something that can travel away from the wound.'},
  symptoms: {title:'A surprising connection', category:'OBSERVATION / 8 DAYS LATER', note:'A stiff jaw points to a problem with muscle control.', text:'Alex develops a stiff jaw and neck. A medical team is caring for them. The injury was in the hand, but the symptoms involve other muscles. Nerve messages control how those muscles move and relax.', takeaway:'Could a changed nerve message connect the hand to the jaw?'}
};
const evidence = {
  entry:{title:'Spores enter a wound', detail:'A break in the skin is a doorway.'},
  growth:{title:'Bacteria grow & make toxin', detail:'Low-oxygen conditions can allow growth.'},
  travel:{title:'Toxin travels along nerves', detail:'Toward the spinal cord and brainstem.'},
  block:{title:'Nerve “brakes” are blocked', detail:'Inhibitory messages cannot be released normally.'},
  muscle:{title:'Muscles stiffen & spasm', detail:'The normal balance of signals is disrupted.'}
};
const correctOrder = ['entry','growth','travel','block','muscle'];
const bankOrder = ['muscle','growth','block','entry','travel'];

function announce(message) { feedback.textContent = message; }
function header(label,title,description,badge) { return `<div class="scene-header"><div><span class="mini-label">${label}</span><h2>${title}</h2><p>${description}</p></div><span class="scene-badge">${badge}</span></div>`; }
function openStage(stage) {
  const index = stages.indexOf(stage);
  if (index < 0 || index > state.unlocked) return;
  state.stage = stage;
  announce('');
  render(true);
}
function render(focusWorkspace = false) {
  document.querySelectorAll('[data-stage]').forEach((button,index) => {
    button.disabled = index > state.unlocked;
    if (button.dataset.stage === state.stage) button.setAttribute('aria-current','step');
    else button.removeAttribute('aria-current');
    button.classList.toggle('complete', index < state.unlocked || state.solved);
  });
  if (state.stage === 'briefing') renderBriefing();
  else if (state.stage === 'clues') renderClues();
  else if (state.stage === 'lab') renderLab();
  else if (state.solved) renderClosedCase();
  else renderBoard();
  renderNotebook();
  if (focusWorkspace) workspace.focus({preventScroll:true});
}
function handArt() {
  return `<svg aria-label="Illustration of a hand with a small cut" role="img" viewBox="0 0 260 180"><path d="M85 165 70 120 45 88c-10-15 4-25 15-14l23 22-22-66c-5-16 12-21 18-7l23 53-7-63c-2-16 16-18 20-3l12 64 9-56c3-15 19-12 18 3l-3 63 19-40c6-13 22-6 17 7l-19 64-9 50" fill="#e2b79c" stroke="#a67b65" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="m106 111 19-7" stroke="#a95346" stroke-width="4" stroke-linecap="round"/><path d="m112 102 6 14" stroke="#f5d7c6" stroke-width="2"/><g fill="#71865d"><circle cx="44" cy="138" r="4"/><circle cx="196" cy="103" r="3"/><circle cx="209" cy="137" r="5"/></g><path d="M22 158h40m132 0h40" stroke="#98ac92" stroke-width="2" stroke-linecap="round"/></svg>`;
}
function symptomArt() {
  return `<svg class="clue-art" aria-label="Illustration of the jaw and nerves" role="img" viewBox="0 0 300 215"><path fill="#dce6df" d="M0 0h300v215H0z"/><path d="M108 191v-42c-39-12-50-49-33-80 21-40 82-47 111-12 14 17 17 36 10 50l18 16-20 9-6 29-37 3v27" fill="#d5b29a" stroke="#9e7d69" stroke-width="3" stroke-linejoin="round"/><path d="m139 133 32 14 17-10" fill="none" stroke="#9e7d69" stroke-width="3"/><g fill="none" stroke="#d3966b" stroke-width="3"><path d="m114 83 31 22 25 34m-25-34 33-24m-64 2-16 41m16-41 15-26"/></g><circle cx="173" cy="140" r="14" fill="#b3795d" fill-opacity=".3" stroke="#a9654f" stroke-width="2"/><path d="M211 153h38m-30 11h30m-22 11h22" fill="none" stroke="#8ea38a" stroke-width="3" stroke-linecap="round"/></svg>`;
}
function renderBriefing() {
  workspace.innerHTML = `<div class="scene-body"><div class="briefing-grid"><div class="briefing-copy"><span class="mini-label">YOUR FIRST ASSIGNMENT</span><h2>A small cut.<br>A stiff jaw.<br><span>One big mystery.</span></h2><p>Eight days after a gardening injury, Alex develops a tight jaw. Why would a cut on the hand affect muscles somewhere else?</p><p class="patient-care">Alex is already being cared for by a medical team. Your mission is to explain the science.</p><button class="primary" id="open-case" type="button">Open the case file ${arrow}</button><span class="duration">3 CLUES · 1 EXPERIMENT · YOUR EXPLANATION</span></div><div class="case-art"><span class="case-stamp">UNSOLVED</span><div class="paper case-photo">${handArt()}<div class="photo-caption">EVIDENCE A / GARDEN INJURY</div></div><div class="yellow-note"><span>DETECTIVE’S QUESTION</span>The wound is on the hand.<br>So why is the jaw stiff?</div></div></div><div class="mission-strip"><div><b>1</b>Inspect the evidence</div><div><b>2</b>Test the nerve signals</div><div><b>3</b>Connect the dots</div></div></div>`;
  document.querySelector('#open-case').onclick = () => {state.unlocked=Math.max(state.unlocked,1);openStage('clues');};
}
function renderClues() {
  const cards = [['wound', `<div class="clue-art">${handArt()}</div>`, 'A wound, a place, a timeline.'], ['microbe','<img src="../../assets/images/bacteria-closeup.svg" alt="Illustration of rod-shaped bacteria with round end spores">','Meet the microscopic suspect.'], ['symptoms',symptomArt(),'Something doesn’t add up.']].map(([id,art,caption],index)=>`<button class="clue-card" type="button" data-clue="${id}" aria-pressed="${state.selectedClue===id}">${state.clues.has(id)?'<span class="clue-check">INSPECTED</span>':''}${art}<span class="mini-label">EVIDENCE ${String.fromCharCode(65+index)}</span><h3>${clues[id].title}</h3><p>${caption}</p></button>`).join('');
  const selected = clues[state.selectedClue];
  workspace.innerHTML = header('STAGE 02 / EXAMINE THE EVIDENCE','What connects these clues?','Select each evidence card. Look for a link between the wound, the bacterium, and the symptoms.',`${state.clues.size} / 3 INSPECTED`)+`<div class="scene-body"><div class="clue-grid">${cards}</div><div class="clue-report" id="clue-report">${selected?`<span class="mini-label">${selected.category}</span><h3>${selected.title}</h3><p>${selected.text}</p><div class="fact-tag">${selected.takeaway}</div>`:'<span class="mini-label">YOUR NEXT MOVE</span><h3>Take a closer look.</h3><p>Choose an evidence card above to inspect it. Your discoveries will appear in the evidence log.</p>'}</div><div class="scene-actions"><p>${state.clues.size===3?'Three clues collected. Time to test the connection.':'Inspect all three clues to unlock the signal lab.'}</p><button type="button" class="primary" id="enter-lab" ${state.clues.size===3?'':'disabled'}>Enter the signal lab ${arrow}</button></div></div>`;
  document.querySelectorAll('[data-clue]').forEach(button=>button.onclick=()=>{
    const id=button.dataset.clue;state.selectedClue=id;state.clues.add(id);
    if(state.clues.size===3)state.unlocked=Math.max(state.unlocked,2);
    render();document.querySelector(`[data-clue="${id}"]`).focus({preventScroll:true});
    announce(`Evidence inspected: ${clues[id].title}. ${clues[id].note} ${state.clues.size} of 3 clues collected.`);
  });
  document.querySelector('#enter-lab').onclick=()=>openStage('lab');
}
function circuitArt(condition) {
  const toxin=condition==='toxin';
  return `<svg viewBox="0 0 760 340" role="img" aria-label="${toxin?'Tetanus toxin blocks inhibitory messenger release. The motor neuron keeps driving a tightened muscle.':'Normal circuit: a brake cell releases inhibitory messengers to reduce motor neuron output, allowing the muscle to relax.'}"><defs><marker id="arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="m0 0 10 5-10 5Z" fill="#a6d1f5"/></marker></defs><rect x="15" y="20" width="445" height="295" rx="15" fill="none" stroke="#a6d1f548" stroke-dasharray="5 6"/><text x="35" y="43" fill="#a6d1f5" font-size="9" letter-spacing="1.3">SPINAL CORD / SIMPLIFIED NERVE CIRCUIT</text><rect class="circuit-box" x="45" y="85" width="155" height="65" rx="10"/><text x="122" y="111" text-anchor="middle" fill="#f7f4e9" font-size="13" font-weight="600">Brake cell</text><text x="122" y="133" text-anchor="middle" fill="#b6c5d7" font-size="10">inhibitory neuron</text><path class="nerve-wire brake-wire" d="M200 117h150v76" marker-end="url(#arrowhead)"/><text x="220" y="88" fill="#83d8c1" font-size="9">${toxin?'MESSENGER RELEASE BLOCKED':'INHIBITORY MESSENGERS'}</text><g class="toxin-marker"><circle cx="267" cy="117" r="17" fill="#d99480"/><path d="m260 110 14 14m-14 0 14-14" stroke="#552d29" stroke-width="3" stroke-linecap="round"/></g><rect class="circuit-box" x="45" y="208" width="137" height="60" rx="10"/><text x="113" y="233" text-anchor="middle" fill="#f7f4e9" font-size="12">Activating</text><text x="113" y="252" text-anchor="middle" fill="#b6c5d7" font-size="11">message</text><path class="nerve-wire" d="M182 238h89" marker-end="url(#arrowhead)"/><rect class="circuit-box" x="273" y="204" width="155" height="65" rx="10"/><text x="350" y="231" text-anchor="middle" fill="#f7f4e9" font-size="13" font-weight="600">Motor neuron</text><text x="350" y="251" text-anchor="middle" fill="#b6c5d7" font-size="10">drives the muscle</text><path class="nerve-wire motor-wire" d="M428 238h148" marker-end="url(#arrowhead)"/><circle class="signal-pulse" cx="444" cy="238" r="5" fill="#fffce7" opacity="${condition?1:0}"/><text x="485" y="218" fill="#b6c5d7" font-size="9">MOTOR OUTPUT</text><g class="muscle-band"><path d="M582 238c18-10 23-36 65-36s48 26 67 36c-19 10-25 36-67 36s-47-26-65-36Z"/><g stroke="#66855d" stroke-width="2" opacity=".65"><path d="M624 217v42m12-48v54m12-57v60m12-56v53m12-45v37"/></g></g><text x="647" y="307" text-anchor="middle" fill="${toxin?'#edb49e':'#b5d79c'}" font-size="12" font-weight="600">${toxin?'STAYS TIGHT / CAN SPASM':condition?'ACTIVATES, THEN RELAXES':'MUSCLE TISSUE'}</text></svg>`;
}
function renderLab() {
  const normal=state.condition==='normal',toxin=state.condition==='toxin';
  const result=normal?['NORMAL SIGNALS','The brake works.','The activating message makes the muscle tighten. Inhibitory messages help reduce motor output so it can relax.']:toxin?['WITH TETANUS TOXIN','The brake is blocked.','The toxin prevents release of inhibitory messengers. The same activating drive can now produce excessive motor output, so muscles can stay tight and spasm.']:['LAB READY','Run a comparison.','Start with normal signals. Then introduce toxin into the model and watch what happens to the muscle.'];
  workspace.innerHTML=header('STAGE 03 / A VIRTUAL EXPERIMENT','What if the “brake” stops working?','Compare two model conditions. The activating drive stays the same; the release of inhibitory messages changes.',`${Number(state.normal)+Number(state.toxin)} / 2 TESTED`)+`<div class="scene-body"><div class="lab-controls"><button type="button" class="lab-control" id="run-normal" aria-pressed="${normal}"><span>A</span><div><strong>Run normal signals</strong><small>Activating drive + working brake</small></div></button><button type="button" class="lab-control toxin" id="run-toxin" aria-pressed="${toxin}" ${state.normal?'':'disabled'}><span>B</span><div><strong>Add toxin &amp; run</strong><small>Same drive + blocked brake</small></div></button></div><div class="lab-screen ${state.condition?'has-run':''} ${normal?'is-normal':''} ${toxin?'is-toxin':''}"><div class="lab-screen-heading"><span>THE NERVE–MUSCLE CONNECTION</span><span>${toxin?'CONDITION B':normal?'CONDITION A':'AWAITING INPUT'}</span></div>${circuitArt(state.condition)}</div><div class="lab-result"><div><span class="mini-label">${result[0]}</span><h3>${result[1]}</h3></div><p>${result[2]}</p></div><p class="model-note">A simplified model. Comparing conditions does not represent removing toxin from Alex or treating tetanus.</p><div class="scene-actions"><p>${state.normal&&state.toxin?'Both conditions observed. What explains the tight muscles?':'Test both conditions to unlock the evidence board.'}</p><button type="button" class="primary" id="open-board" ${state.normal&&state.toxin?'':'disabled'}>Connect the evidence ${arrow}</button></div></div>`;
  document.querySelector('#run-normal').onclick=()=>runCondition('normal');
  document.querySelector('#run-toxin').onclick=()=>runCondition('toxin');
  document.querySelector('#open-board').onclick=()=>openStage('board');
}
function runCondition(condition) {
  if(condition==='toxin'&&!state.normal)return;
  state.condition=condition;state[condition]=true;
  if(state.normal&&state.toxin)state.unlocked=Math.max(state.unlocked,3);
  render();document.querySelector(condition==='normal'?'#run-normal':'#run-toxin').focus({preventScroll:true});
  announce(condition==='normal'?'Normal signals tested: inhibitory messages help the muscle relax.':'Toxin condition tested: inhibitory messenger release is blocked and muscle output becomes excessive.');
}
function availableTiles(){return bankOrder.filter(id=>!state.slots.includes(id));}
function selectTile(id) {
  if(!availableTiles().includes(id))return;
  state.selectedTile=id;
  document.querySelectorAll('[data-tile]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.tile===id)));
}
function placeTile(id,index) {
  if(!availableTiles().includes(id)||state.slots[index])return;
  state.history.push([...state.slots]);state.slots[index]=id;state.selectedTile=null;state.boardFeedback='';
  render();document.querySelector(`[data-slot="${index}"]`).focus({preventScroll:true});
  announce(`${evidence[id].title} placed in position ${index+1}.`);
}
function renderBoard() {
  const tiles=availableTiles().map(id=>`<button type="button" class="evidence-tile" data-tile="${id}" draggable="true" aria-pressed="${state.selectedTile===id}">${evidence[id].title}</button>`).join('');
  const slots=state.slots.map((id,index)=>`<button type="button" class="slot ${id?'filled':''}" data-slot="${index}" aria-label="Position ${index+1}: ${id?evidence[id].title+'. Select to return this evidence to the tray.':'empty. Select to place your chosen evidence.'}"><span class="slot-number">${index+1}</span>${id?`<strong>${evidence[id].title}</strong><small>${evidence[id].detail}</small>`:'<span>Place evidence here</span>'}</button>`).join('');
  workspace.innerHTML=header('STAGE 04 / BUILD YOUR EXPLANATION','Now connect the dots.','Arrange the evidence into a cause-and-effect chain. Explain how a wound could lead to a stiff jaw.','THE EVIDENCE BOARD')+`<div class="scene-body"><div class="evidence-instructions"><strong>How to play:</strong> select an evidence tile, then an empty position. Or drag a tile into place. Select a filled position to return its tile.</div><div class="tile-bank" aria-label="Available evidence">${tiles||'<p class="bank-empty">All evidence placed. Check your explanation or select a position to change it.</p>'}</div><div class="evidence-chain" aria-label="Your cause-and-effect explanation">${slots}</div>${state.boardFeedback?`<p class="board-feedback" role="status">${state.boardFeedback}</p>`:''}<div class="scene-actions"><div><button type="button" class="secondary" id="undo-board" ${state.history.length?'':'disabled'}>Undo</button> <button type="button" class="secondary" id="clear-board">Clear board</button></div><button type="button" class="primary" id="check-board">Check my explanation ${arrow}</button></div></div>`;
  document.querySelectorAll('[data-tile]').forEach(button=>{
    button.onclick=()=>{selectTile(button.dataset.tile);announce(`Selected: ${evidence[button.dataset.tile].title}. Choose an empty position.`);};
    button.addEventListener('dragstart',event=>{selectTile(button.dataset.tile);event.dataTransfer.setData('text/plain',button.dataset.tile);event.dataTransfer.effectAllowed='move';});
  });
  document.querySelectorAll('[data-slot]').forEach(button=>{
    const index=Number(button.dataset.slot);
    button.onclick=()=>{
      if(state.slots[index]){const id=state.slots[index];state.history.push([...state.slots]);state.slots[index]=null;state.selectedTile=null;state.boardFeedback='';render();document.querySelector(`[data-slot="${index}"]`).focus({preventScroll:true});announce(`${evidence[id].title} returned to the evidence tray.`);}
      else if(state.selectedTile)placeTile(state.selectedTile,index);
      else announce('Choose an evidence tile from the tray first.');
    };
    button.addEventListener('dragover',event=>{if(!state.slots[index]){event.preventDefault();button.classList.add('drop-target');}});
    button.addEventListener('dragleave',()=>button.classList.remove('drop-target'));
    button.addEventListener('drop',event=>{event.preventDefault();button.classList.remove('drop-target');placeTile(event.dataTransfer.getData('text/plain'),index);});
  });
  document.querySelector('#undo-board').onclick=()=>{if(!state.history.length)return;state.slots=state.history.pop();state.selectedTile=null;state.boardFeedback='';render(true);announce('Last board change undone.');};
  document.querySelector('#clear-board').onclick=()=>{if(state.slots.some(Boolean))state.history.push([...state.slots]);state.slots=Array(5).fill(null);state.selectedTile=null;state.boardFeedback='';render(true);announce('Evidence board cleared. Your clues and lab results are still saved.');};
  document.querySelector('#check-board').onclick=checkBoard;
}
function checkBoard() {
  if(state.slots.some(id=>!id)){state.boardFeedback='Your explanation is not complete yet. Place all five evidence tiles, then check the chain.';render(true);announce(state.boardFeedback);return;}
  const mismatch=state.slots.findIndex((id,index)=>id!==correctOrder[index]);
  if(mismatch===-1){state.solved=true;announce('Case explained! You connected wound entry, bacterial growth, toxin travel, nerve effects and muscle symptoms.');render(true);return;}
  const hints=['Start with a way into the body: spores must enter a wound before bacteria can grow there.','Before the toxin can travel, bacteria need to grow and make it at the wound.','The toxin has to reach the nervous system before it can interfere with inhibitory messages.','Blocked nerve brakes come before the muscle symptoms they cause.','Muscle stiffness is the outcome of the disrupted signals.'];
  state.boardFeedback=`Good investigation—one link needs another look. ${hints[mismatch]} Change the chain and try again.`;render(true);announce(state.boardFeedback);
}
function renderClosedCase() {
  workspace.innerHTML=`<div class="closed-case"><span class="mini-label">CASE FILE 001 / EXPLANATION COMPLETE</span><div><span class="closed-badge">CASE EXPLAINED</span></div><h2>The wound was the doorway.<br>The toxin changed the messages.</h2><p>You connected a tiny bacterium to effects in nervous and muscle tissue. The bacteria can stay at the wound while their toxin travels.</p><div class="case-conclusion"><h3>Here’s what happened</h3><p>Spores entered a wound. In suitable low-oxygen conditions, bacteria grew and made toxin. The toxin travelled along nerves toward the spinal cord and brainstem and blocked the release of inhibitory messengers. Without that normal braking, motor output became excessive, causing stiffness and spasms.</p></div><p>This explains Alex’s fictional case. Real suspected tetanus needs urgent medical care. Vaccination helps prevent tetanus.</p><div class="scene-actions"><button type="button" class="secondary" id="revisit-lab">Revisit the signal lab</button><button type="button" class="primary" id="replay-case">Start a new investigation ${arrow}</button></div></div>`;
  document.querySelector('#revisit-lab').onclick=()=>openStage('lab');
  document.querySelector('#replay-case').onclick=restart;
}
function renderNotebook() {
  const entries=[];
  for(const id of state.clues){entries.push({label:'CLUE RECORDED',title:clues[id].title,text:clues[id].note});}
  if(state.normal)entries.push({label:'EXPERIMENT A',title:'Working brake',text:'Inhibitory messages help reduce motor output so muscles can relax.'});
  if(state.toxin)entries.push({label:'EXPERIMENT B',title:'Blocked brake',text:'Toxin blocks inhibitory messenger release. Muscles can stay tight and spasm.'});
  if(state.solved)entries.push({label:'CASE EXPLAINED',title:'From wound to muscle',text:'Your chain connects the cause to the tissue-level effects.'});
  notebook.innerHTML=entries.length?entries.map(entry=>`<div class="note-entry"><span class="note-index">${entry.label}</span><h3>${entry.title}</h3><p>${entry.text}</p></div>`).join(''):'<p class="empty-notes">Your notebook is empty.<br><br>Inspect clues and run experiments to record what you discover. No timer. No guessing race. Follow the science.</p>';
}
function restart(){state=makeState();announce('New investigation started. Your case notes have been cleared.');render(true);}
document.querySelectorAll('[data-stage]').forEach(button=>button.onclick=()=>openStage(button.dataset.stage));
document.querySelector('#restart-button').onclick=restart;
document.querySelector('#help-button').onclick=()=>{
  const hints={briefing:'Start with the question: how could a hand injury affect jaw muscles? Open the case file to investigate.',clues:'Inspect all three cards. One explains entry, one explains what bacteria make, and one points to nerve control.',lab:state.normal?'Now compare the toxin condition. Focus on the inhibitory message and the muscle response.':'Run normal signals first. Notice how the brake cell helps turn motor output down.',board:'Build a cause-and-effect chain. First comes entry, then the toxin must be made before it can travel and affect nerve signals.'};
  announce(hints[state.stage]);
};
render();

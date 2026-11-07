// The project group confirmed generalized tetanus as this video's answer.
// Feedback describes the four forms without inventing dialogue or patient details.
(() => {
  const form = document.querySelector('#doctor-case-form');
  if (!form) return;
  const submit = form.querySelector('button[type="submit"]');
  const choices = [...form.querySelectorAll('.doctor-case-choice')];
  const feedback = document.querySelector('#doctor-case-feedback > div');
  const heading = document.querySelector('#doctor-case-feedback-title');
  const explanation = document.querySelector('#doctor-case-feedback-text');
  const badge = document.querySelector('#doctor-case-badge');
  const responses = {
    generalized: 'Generalized tetanus is the answer for this case. This form involves stiffness and spasms across multiple body regions, often starting in the jaw and neck. The toxin disrupts nerve signals that help muscles relax.',
    localized: 'Localized tetanus causes stiffness and spasms near the wound. Compare that with a pattern involving several body regions. Listen again for where the symptoms occur, then try another answer.',
    cephalic: 'Cephalic tetanus is a rare form involving nerves in the head, often after a head injury. Lockjaw can also happen in generalized tetanus, so a stiff jaw alone does not identify the cephalic form. Try again.',
    neonatal: 'Neonatal tetanus affects newborn babies in their first 28 days of life. Compare that age group with the patient in the conversation, then try again.'
  };
  form.querySelector('fieldset').disabled = false;
  submit.hidden = false;
  form.addEventListener('change', () => {
    submit.disabled = !form.querySelector('input:checked');
    feedback.hidden = true;
    heading.textContent = '';
    explanation.textContent = '';
    badge.textContent = 'READY TO CHECK';
    badge.classList.remove('explored');
    choices.forEach(choice => choice.classList.remove('is-correct', 'is-incorrect'));
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const selected = form.querySelector('input:checked');
    if (!selected || !Object.hasOwn(responses, selected.value)) return;
    const correct = selected.value === 'generalized';
    choices.forEach(choice => choice.classList.remove('is-correct', 'is-incorrect'));
    selected.closest('.doctor-case-choice').classList.add(correct ? 'is-correct' : 'is-incorrect');
    heading.textContent = correct ? 'Correct — generalized tetanus.' : 'Not quite. Compare the clues.';
    explanation.textContent = responses[selected.value];
    feedback.classList.toggle('correct', correct);
    feedback.hidden = false;
    badge.textContent = correct ? 'CASE CONNECTED' : 'TRY AGAIN';
    badge.classList.toggle('explored', correct);
  });
})();

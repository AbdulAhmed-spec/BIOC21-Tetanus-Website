# The Case of the Locked Jaw — website game

This is the approved game integrated into the website. It is linked from the homepage navigation and game section. Make future changes locally and push or publish only when the user explicitly requests it.

## Play

Open `/workspace/scratch/locked-jaw-integrated-game.html` in a browser. This self-contained export includes the interface, script, illustration and font files with their licenses. It works offline, without installation, API keys or a server.

For the editable source, serve the repository root and open `/games/locked-jaw/index.html`. The page references the existing site font files and bacterial illustration. The game’s “Back to website” link returns to the homepage’s game section.

Rebuild the standalone file with:

```
python3 games/locked-jaw/export_preview.py /workspace/scratch/locked-jaw-integrated-game.html
```

## Included

- A fictional patient case and detective workbench.
- Three inspectable clues and an evidence notebook.
- A two-condition inhibitory nerve-signal experiment with a visible muscle response.
- A five-link cause-and-effect puzzle supporting drag-and-drop and click/keyboard placement.
- Helpful incorrect-answer feedback, undo, clear, hints, stage revisiting and restart.
- A case explanation and care/prevention takeaway.

Progress exists only in memory. Refreshing or choosing “Start a new investigation” clears it. There is no timer, diagnosis task, patient treatment simulation, multiplayer, drawing recognition or backend. No student data is collected or sent anywhere.

## Scientific model

The fictional patient is already receiving medical care; students explain the mechanism rather than choose treatment. The model places the motor neuron and inhibitory neuron in a simplified spinal-cord circuit. Tetanus toxin blocks release of inhibitory chemical messengers, causing excessive motor activity and muscle stiffness/spasms. Comparing normal and toxin conditions is an experiment in a model, not a representation of toxin removal or clinical recovery.

The evidence chain is spores entering a wound → bacterial growth and toxin production → toxin travel along nerves → inhibited release of nerve “brake” messengers → muscle effects. Bacteria and toxin are distinguished. Diagram proportions and circuit detail are simplified for the audience.

This game has not been mapped to verified Ontario expectation codes. That remains part of preparing a final educational release.

## Checks

Chromium checks covered stage locks, all clues, repeat-clue handling, both experiment conditions, incorrect and incomplete explanations, actual drag-and-drop, keyboard placement, undo, clearing, successful conclusion, revisiting stages, reset, and layout at desktop and smaller window sizes. No runtime errors, missing resources, or external requests were observed. Screenshots are outside the repository in `/workspace/scratch/locked-jaw-review`.

The self-contained export was also tested with networking disabled: all four stages, embedded fonts/illustration and the final explanation worked with no external requests. The managed test browser blocks direct `file://` navigation, so the exported document contents were loaded with Playwright `setContent` for this check; direct file opening in a normal user browser was not exercised here.

## Integration validation

The homepage navigation and launch button were tested from a repository subpath matching the GitHub Pages layout. The complete investigation finished successfully, both return and relaunch links worked, all game illustrations and fonts loaded, and the topic explorer continued to work. Desktop and small-window layouts passed with no horizontal overflow. No runtime errors or missing resources were observed. The relocated exporter was also exercised with networking disabled.

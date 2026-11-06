"""Export a self-contained, offline-playable HTML preview with bundled font licenses."""
import base64
import html
from pathlib import Path
import re
import sys

preview = Path(__file__).resolve().parent
root = preview.parent.parent
output = Path(sys.argv[1]) if len(sys.argv) > 1 else root.parent / 'scratch' / 'locked-jaw-preview.html'

def data_url(path, mime):
    encoded = base64.b64encode(path.read_bytes()).decode('ascii')
    return f'data:{mime};base64,{encoded}'

page = (preview / 'index.html').read_text()
css = (preview / 'game.css').read_text()
js = (preview / 'game.js').read_text()
css = re.sub(r"url\('([^']+\.woff2)'\)", lambda match: f"url('{data_url((preview / match[1]).resolve(), 'font/woff2')}')", css)
js = js.replace('../../assets/images/bacteria-closeup.svg', data_url(root / 'assets/images/bacteria-closeup.svg', 'image/svg+xml'))
page = page.replace('href="../../assets/images/icon.svg"', f'href="{data_url(root / "assets/images/icon.svg", "image/svg+xml")}"')
page = page.replace('href="../../index.html#game"', 'href="#workspace"')
page = page.replace('aria-label="BIOC21 website"', 'aria-label="Investigation workspace"')
page = page.replace('<a class="quiet-button back-link" href="#workspace">Back to website</a>', '')
page = page.replace('<link rel="stylesheet" href="game.css?v=locked-jaw-1">', f'<style>\n{css}\n</style>')
page = page.replace('<script src="game.js?v=locked-jaw-1" defer></script>', '')
licenses = '\n\n'.join((root / 'assets/fonts' / name).read_text() for name in ['dm-sans-LICENSE.txt', 'lilita-one-LICENSE.txt'])
page = page.replace('</body>', f'<template id="bundled-font-licenses"><pre>{html.escape(licenses)}</pre></template>\n<script>\n{js}\n</script>\n</body>')
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(page)
print(f'Exported offline preview: {output} ({output.stat().st_size:,} bytes)')

// Generates easy-to-read HTML versions of docs/internal/*.md (one self-contained file per page).
//
//   cd docs/internal/tools
//   npm install            # first time only
//   npm run build          # rewrites ../*.html from ../*.md
//
// Run it after editing any .md file so the HTML stays in step. Mermaid diagrams are drawn once,
// in headless Chrome, and embedded as SVG, so the pages open from disk with no internet.
// Set CHROME_PATH if Chrome is not in the default Windows location.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked, Renderer } from 'marked';
import puppeteer from 'puppeteer-core';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DOCS = path.resolve(HERE, '..');
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

// Page order in the sidebar. README.md becomes index.html.
const PAGES = [
  ['README.md', 'index.html', 'Start here'],
  ['setup.md', 'setup.html', 'Setup'],
  ['overview.md', 'overview.html', 'How it works'],
  ['component-diagram.md', 'component-diagram.html', 'Component diagrams'],
  ['database.md', 'database.html', 'Database'],
  ['gaps-and-quirks.md', 'gaps-and-quirks.html', 'Gaps & quirks'],
];
const htmlName = Object.fromEntries(PAGES.map(([md, html]) => [md, html]));
const pageLabel = Object.fromEntries(PAGES.map(([md, , label]) => [md, label]));

// GitHub-style heading anchors, so links written for GitHub (file.md#some-heading) keep working.
const slug = (text) =>
  text.toLowerCase().trim().replace(/<[^>]+>/g, '').replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-');
const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------------------------------------------------------------- draw the diagrams
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.setContent('<!doctype html><html><body></body></html>');
await page.addScriptTag({ path: path.join(HERE, 'node_modules/mermaid/dist/mermaid.min.js') });
await page.evaluate(() =>
  window.mermaid.initialize({
    startOnLoad: false,
    // draw at natural size; wide diagrams scroll sideways instead of shrinking to unreadable text
    flowchart: { useMaxWidth: false },
    sequence: { useMaxWidth: false },
    er: { useMaxWidth: false },
    theme: 'base',
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    themeVariables: {
      primaryColor: '#F3EEFF', primaryBorderColor: '#7C3AED', primaryTextColor: '#1A1A24',
      lineColor: '#6B6B7B', secondaryColor: '#F7F7F9', tertiaryColor: '#FFFFFF',
      clusterBkg: '#FAFAFC', clusterBorder: '#CFCFD8', fontSize: '14px',
    },
  }),
);
let diagramCount = 0;
async function drawDiagram(code) {
  const id = 'diagram' + ++diagramCount;
  const svg = await page.evaluate(async (id, code) => (await window.mermaid.render(id, code)).svg, id, code);
  // Fit the page width, but never shrink below 60% of natural size (text would be unreadable);
  // wider than that, the figure scrolls. Clicking a figure shows it full size (script in shell()).
  const width = Number(/viewBox="[-\d.]+ [-\d.]+ ([\d.]+)/.exec(svg)[1]);
  return svg.replace(/<svg([^>]*?) width="[\d.]+"([^>]*?) height="[\d.]+"/, (_, a, b) =>
    `<svg${a}${b} style="width:100%;max-width:${Math.round(width)}px;min-width:${Math.round(width * 0.6)}px;height:auto"`);
}

// ---------------------------------------------------------------- convert one page
async function convert(mdFile) {
  const src = fs.readFileSync(path.join(DOCS, mdFile), 'utf8').replace(/\r\n/g, '\n');
  const toc = [];
  const diagrams = [];
  let title = '';

  const marked = new Marked();
  marked.use({
    renderer: {
      heading({ tokens, depth, text }) {
        const inner = this.parser.parseInline(tokens);
        const id = slug(text.replace(/`/g, ''));
        if (depth === 1 && !title) title = inner.replace(/<[^>]+>/g, '');
        if (depth === 2 || depth === 3) toc.push({ depth, id, label: inner.replace(/<[^>]+>/g, '') });
        const anchor = depth > 1 ? `<a class="anchor" href="#${id}" aria-hidden="true">#</a>` : '';
        return `<h${depth} id="${id}">${inner}${anchor}</h${depth}>\n`;
      },
      code({ text, lang }) {
        if (lang === 'mermaid') {
          diagrams.push(text);
          return `<figure class="diagram">@@DIAGRAM${diagrams.length - 1}@@</figure>\n`;
        }
        return `<pre class="code"><code${lang ? ` data-lang="${lang}"` : ''}>${escapeHtml(text)}</code></pre>\n`;
      },
      link({ href, title: t, tokens }) {
        let inner = this.parser.parseInline(tokens);
        const [file, hash] = href.split('#');
        // a link whose text is just the file name reads better as the page's name
        if (htmlName[file] && inner.replace(/<[^>]+>/g, '') === file) inner = pageLabel[file];
        let target = href;
        if (htmlName[file]) target = htmlName[file] + (hash ? '#' + hash : '');
        const external = /^https?:/.test(href);
        return `<a href="${target}"${t ? ` title="${t}"` : ''}${external ? ' target="_blank" rel="noopener"' : ''}>${inner}</a>`;
      },
      table(token) {
        // default table output, wrapped so wide tables scroll instead of breaking the layout
        const html = Renderer.prototype.table.call(this, token);
        return `<div class="table-wrap">${html}</div>\n`;
      },
      blockquote({ tokens }) {
        const body = this.parser.parse(tokens);
        const kind = /<strong>How it works\.?<\/strong>/.test(body) ? 'explain' : /<strong>Branch note\.?<\/strong>/.test(body) ? 'warn' : 'note';
        return `<aside class="callout ${kind}">${body}</aside>\n`;
      },
    },
  });

  let body = marked.parse(src);
  for (let i = 0; i < diagrams.length; i++) body = body.replace(`@@DIAGRAM${i}@@`, await drawDiagram(diagrams[i]));
  return { title, toc, body };
}

// ---------------------------------------------------------------- page shell
const CSS = fs.readFileSync(path.join(HERE, 'docs.css'), 'utf8');
function shell({ title, toc, body }, current) {
  const nav = PAGES.map(([, html, label]) =>
    `<a class="page${html === current ? ' current' : ''}" href="${html}">${label}</a>`).join('');
  const onThisPage = toc.length
    ? `<div class="toc-title">On this page</div>` +
      toc.map((h) => `<a class="toc d${h.depth}" href="#${h.id}">${h.label}</a>`).join('')
    : '';
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)} · NexDrive internal docs</title>
<!-- Generated from ${PAGES.find(([, h]) => h === current)[0]} by docs/internal/tools/build-html.mjs. Edit the .md file, then rebuild. -->
<style>${CSS}</style>
</head>
<body>
<header class="topbar"><span class="brand"><b>NEX</b><i>Drive</i></span><span class="crumb">Internal developer docs</span></header>
<div class="layout">
  <nav class="sidebar">
    <div class="toc-title">Pages</div>${nav}
    <div class="sep"></div>${onThisPage}
  </nav>
  <main class="content">
${body}
    <footer class="foot">Generated from the Markdown source in <code>docs/internal/</code>. To update, edit the <code>.md</code> file and run <code>npm run build</code> in <code>docs/internal/tools</code>.</footer>
  </main>
</div>
<div class="zoom" hidden><button class="zoom-close" aria-label="Close">Close ✕</button><div class="zoom-body"></div></div>
<script>
// Click a diagram to see it full size; click again, press Esc or use Close to return.
(function () {
  var zoom = document.querySelector('.zoom'), body = zoom.querySelector('.zoom-body');
  function close() { zoom.hidden = true; body.innerHTML = ''; document.body.style.overflow = ''; }
  document.querySelectorAll('figure.diagram').forEach(function (fig) {
    fig.addEventListener('click', function () {
      var svg = fig.querySelector('svg').cloneNode(true);
      // keep the id: Mermaid's embedded styles are scoped to it
      svg.style.width = svg.style.maxWidth; svg.style.minWidth = '0'; svg.style.maxWidth = 'none';
      body.appendChild(svg); zoom.hidden = false; document.body.style.overflow = 'hidden';
    });
  });
  zoom.addEventListener('click', function (e) { if (e.target === zoom || e.target.classList.contains('zoom-close')) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !zoom.hidden) close(); });
})();
</script>
</body>
</html>
`;
}

for (const [md, html] of PAGES) {
  const doc = await convert(md);
  fs.writeFileSync(path.join(DOCS, html), shell(doc, html));
  console.log(`${md.padEnd(22)} -> ${html}`);
}
await browser.close();
console.log(`done: ${PAGES.length} pages, ${diagramCount} diagrams`);

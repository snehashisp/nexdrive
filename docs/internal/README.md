# NexDrive internal developer docs

Internal notes for engineers joining the project. They describe the code **as it is** (November 2026, branch `refactor/vite-react-ts`, which builds on `react-vite-jsx`), including the parts that are unfinished or unusual.

| Read | When |
| --- | --- |
| [setup.md](setup.md) | First. Get the app running locally and find your way around it in Chrome |
| [overview.md](overview.md) | How the codebase works, end to end. Includes a short primer on every framework and tool in use (React, JSX, Vite, Express, npm, service workers) for readers who know HTTP and backend coding but not the JavaScript ecosystem |
| [component-diagram.md](component-diagram.md) | Diagrams: the running system, the build pipeline, the React component tree, and how one click flows through the code |
| [database.md](database.md) | The PostgreSQL data model, how the database is meant to be used, and how that differs from what the front end does today |
| [gaps-and-quirks.md](gaps-and-quirks.md) | What is incomplete, and what is done in a non-standard way (flagged only, nothing changed) |

The older documents in the repository root (`README.md`, `DEPLOYMENT.md`, `DEVELOPER_HANDOVER.md`, `API_DOCUMENTATION.md`, `DATABASE_SETUP.md`) are the original handover pack. They are still the reference for the **planned** backend and API. Some of what they say about the front end is out of date; see [gaps-and-quirks.md](gaps-and-quirks.md#documentation-that-is-out-of-date).

## Reading these docs

- **In a browser (easiest):** open `docs/internal/index.html`. Double-clicking it works; it needs no server and no internet. Every page has a sidebar with all pages and the sections of the current page. Click a diagram to see it full size.
- **On GitHub or in an editor:** read the `.md` files. Diagrams are written in [Mermaid](https://mermaid.js.org/), which GitHub renders automatically. In VS Code, install the "Markdown Preview Mermaid Support" extension and open the Markdown preview.

The `.md` files are the source; the `.html` files are generated from them. After editing a `.md` file, regenerate the HTML. This needs Chrome; set `CHROME_PATH` if it is not in the default Windows location.

```bash
cd docs/internal/tools
npm install      # first time only
npm run build    # rewrites docs/internal/*.html
```

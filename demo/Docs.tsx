export default function Docs() {
  return (
    <section className="demo-docs">
      <h2>Documentation</h2>

      <p>
        A reusable React/TypeScript component that displays data as a{" "}
        <strong>bubble chart</strong>, <strong>bar chart</strong>, or{" "}
        <strong>pie chart</strong>, with animated morphing transitions between
        views, on hover, and on window resize.
      </p>

      <p>
        The layout and morphing algorithm — spiral-packed bubbles relaxed into a
        cluster, <code>clip-path</code>-based wedges for the pie, and CSS{" "}
        <code>transform</code> transitions shared across all three views — is a
        generalized port of the topic visualization on{" "}
        <a
          href="https://github.com/evoluteur/evoluteur-blog"
          target="_blank"
          rel="noreferrer"
        >
          evoluteur-blog
        </a>
        's <code>/topics</code> page.
      </p>

      <h3>Install</h3>
      <pre>
        <code>npm install react-morph-charts</code>
      </pre>

      <h3>Usage</h3>
      <pre>
        <code>{`import MorphCharts from "react-morph-charts";
import "react-morph-charts/style.css";

const data = [
  { id: "coffee", label: "Coffee", value: 4 },
  { id: "tea", label: "Tea", value: 6 },
  { id: "juice", label: "Juice", value: 2 },
  // ...
];

function App() {
  return (
    <MorphCharts
      data={data}
      onItemClick={(item) => console.log("clicked", item)}
    />
  );
}`}</code>
      </pre>

      <p>
        The component renders its own toolbar (a Bubbles/Bars/Pie view toggle
        and a light/dark/omg theme toggle) above the chart, so it works as a
        drop-in, self-contained widget.
      </p>

      <h3>Props</h3>
      <div className="demo-docs-table">
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>data</code>
              </td>
              <td>
                <code>{`Array<{ id?, label, value, color?, sublabel? }>`}</code>
              </td>
              <td>yes</td>
              <td>
                Items to display. <code>id</code> is optional; when omitted,{" "}
                <code>label</code> is used as the item's identity, so{" "}
                <code>label</code> should be unique. <code>value</code> drives
                bubble/bar size and pie slice angle.
              </td>
            </tr>
            <tr>
              <td>
                <code>disabled</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>no</td>
              <td>
                When <code>true</code>, dims the component and disables view
                toggling and <code>onItemClick</code>. Defaults to{" "}
                <code>false</code>.
              </td>
            </tr>
            <tr>
              <td>
                <code>className</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>no</td>
              <td>Extra class name(s) applied to the root element.</td>
            </tr>
            <tr>
              <td>
                <code>onItemClick</code>
              </td>
              <td>
                <code>{`(item, event) => void`}</code>
              </td>
              <td>no</td>
              <td>
                Called when an item is clicked or activated via keyboard. Also
                toggles the item's active/highlighted state.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4>Additional (optional) props</h4>
      <p>
        These have sensible defaults and don't need to be set for typical use:
      </p>
      <div className="demo-docs-table">
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>defaultView</code>
              </td>
              <td>
                <code>{`"bubbles" | "bars" | "pie"`}</code>
              </td>
              <td>
                <code>"bubbles"</code>
              </td>
              <td>Initial view.</td>
            </tr>
            <tr>
              <td>
                <code>view</code>
              </td>
              <td>
                <code>{`"bubbles" | "bars" | "pie"`}</code>
              </td>
              <td>—</td>
              <td>
                Controls the view externally. Omit to let the component manage
                its own view state (uncontrolled).
              </td>
            </tr>
            <tr>
              <td>
                <code>onViewChange</code>
              </td>
              <td>
                <code>{`(view) => void`}</code>
              </td>
              <td>—</td>
              <td>
                Called whenever the view changes (controlled or uncontrolled).
              </td>
            </tr>
            <tr>
              <td>
                <code>showViewToggle</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                <code>true</code>
              </td>
              <td>
                Set to <code>false</code> to hide the built-in Bubbles/Bars/Pie
                toggle.
              </td>
            </tr>
            <tr>
              <td>
                <code>formatValue</code>
              </td>
              <td>
                <code>{`(value: number) => string`}</code>
              </td>
              <td>
                <code>String</code>
              </td>
              <td>Formats each item's value shown under its label.</td>
            </tr>
            <tr>
              <td>
                <code>palette</code>
              </td>
              <td>
                <code>string[]</code>
              </td>
              <td>7-color default</td>
              <td>
                Colors cycled for items without an explicit <code>color</code>.
              </td>
            </tr>
            <tr>
              <td>
                <code>minSize</code>
              </td>
              <td>
                <code>number</code>
              </td>
              <td>
                <code>60</code>
              </td>
              <td>
                Baseline bubble diameter, in pixels, before <code>value</code>{" "}
                is added in.
              </td>
            </tr>
            <tr>
              <td>
                <code>barMinHeight</code>
              </td>
              <td>
                <code>number</code>
              </td>
              <td>
                <code>40</code>
              </td>
              <td>
                Minimum bar height, in pixels, before <code>value</code> is
                added in (bars view).
              </td>
            </tr>
            <tr>
              <td>
                <code>valueScale</code>
              </td>
              <td>
                <code>number</code>
              </td>
              <td>
                <code>40</code>
              </td>
              <td>
                Pixels added per unit of <code>value</code> to a bubble's
                diameter or a bar's height.
              </td>
            </tr>
            <tr>
              <td>
                <code>gap</code>
              </td>
              <td>
                <code>number</code>
              </td>
              <td>
                <code>6</code>
              </td>
              <td>Gap between bubbles, in pixels (bubbles view).</td>
            </tr>
            <tr>
              <td>
                <code>barGap</code>
              </td>
              <td>
                <code>number</code>
              </td>
              <td>
                <code>16</code>
              </td>
              <td>Gap between bars, in pixels (bars view).</td>
            </tr>
            <tr>
              <td>
                <code>barMaxWidth</code>
              </td>
              <td>
                <code>number</code>
              </td>
              <td>
                <code>80</code>
              </td>
              <td>Maximum bar width, in pixels (bars view).</td>
            </tr>
            <tr>
              <td>
                <code>pieMaxRadius</code>
              </td>
              <td>
                <code>number</code>
              </td>
              <td>
                <code>170</code>
              </td>
              <td>Maximum pie radius, in pixels (pie view).</td>
            </tr>
            <tr>
              <td>
                <code>theme</code>
              </td>
              <td>
                <code>{`"light" | "dark" | "omg"`}</code>
              </td>
              <td>—</td>
              <td>
                Controls the theme externally. Omit to let the component manage
                its own theme state (uncontrolled).
              </td>
            </tr>
            <tr>
              <td>
                <code>defaultTheme</code>
              </td>
              <td>
                <code>{`"light" | "dark" | "omg"`}</code>
              </td>
              <td>system preference</td>
              <td>
                Initial theme when uncontrolled and nothing is in{" "}
                <code>localStorage</code> yet.
              </td>
            </tr>
            <tr>
              <td>
                <code>onThemeChange</code>
              </td>
              <td>
                <code>{`(theme) => void`}</code>
              </td>
              <td>—</td>
              <td>
                Called whenever the theme changes (controlled or uncontrolled).
              </td>
            </tr>
            <tr>
              <td>
                <code>themeStorageKey</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>—</td>
              <td>
                When set, the chosen theme is persisted to{" "}
                <code>localStorage</code> under this key and restored on mount.
                Off by default so the component doesn't write to storage
                unasked.
              </td>
            </tr>
            <tr>
              <td>
                <code>showThemeToggle</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                <code>true</code>
              </td>
              <td>
                Set to <code>false</code> to hide the built-in theme toggle
                (e.g. if the host page drives <code>theme</code> itself).
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Theming</h3>
      <p>
        The component ships with three themes — <strong>light</strong>,{" "}
        <strong>dark</strong>, and <strong>omg</strong> — toggled with the same
        three-icon control (sun / moon / spiral) used by{" "}
        <a
          href="https://github.com/evoluteur/react-morph-table-cards"
          target="_blank"
          rel="noreferrer"
        >
          react-morph-table-cards
        </a>
        , rendered at the top right of the toolbar.
      </p>
      <p>
        Theming is scoped to the component via a <code>data-theme</code>{" "}
        attribute on the root <code>.rmc</code> element — it never touches{" "}
        <code>document.documentElement</code> — so it's safe to drop into a page
        that has its own theming system. Colors are driven by CSS custom
        properties (<code>--rmc-bg</code>, <code>--rmc-panel-bg</code>,{" "}
        <code>--rmc-text</code>, <code>--rmc-text-secondary</code>,{" "}
        <code>--rmc-border</code>, <code>--rmc-primary</code>,{" "}
        <code>--rmc-toggle-bg</code>), overridable per theme via{" "}
        <code>{`.rmc[data-theme="..."]`}</code> if you want to restyle or add a
        theme.
      </p>

      <h3>Styling</h3>
      <p>
        Each item's fill color comes from its own <code>color</code>, or
        otherwise cycles through the <code>palette</code> prop (a 7-color
        default, unaffected by theme). Override the <code>--rmc-accent</code>{" "}
        custom property per item, or pass a custom <code>palette</code>, to
        customize appearance.
      </p>

      <h3>Local development</h3>
      <pre>
        <code>{`npm install
npm run dev      # runs the demo app in ./demo
npm run build    # builds the library to ./dist`}</code>
      </pre>

      <h3>License</h3>
      <p>React-Morph-Charts is released under the MIT license.</p>
      <p>
        Encourage this project by becoming a{" "}
        <a
          href="https://github.com/sponsors/evoluteur"
          target="_blank"
          rel="noreferrer"
        >
          sponsor
        </a>
        .
      </p>

      <p>
        You may want to also check out{" "}
        <a
          href="https://github.com/evoluteur/react-morph-table-cards"
          target="_blank"
          rel="noreferrer"
        >
          React-Morph-Table-Cards
        </a>
        , a similar project for animated transitions between table and cards
        views.
      </p>

      <p>
        &#169; 2026{" "}
        <a href="https://evoluteur.github.io/" target="_blank" rel="noreferrer">
          Olivier Giulieri
        </a>
        .
      </p>
    </section>
  );
}

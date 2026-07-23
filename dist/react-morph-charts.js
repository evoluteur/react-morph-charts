import { jsx as u, jsxs as A } from "react/jsx-runtime";
import { useState as I, useMemo as Te, useRef as H, useLayoutEffect as Se, useEffect as ae } from "react";
const ue = ["light", "dark", "omg"], _e = {
  light: /* @__PURE__ */ u("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ u("path", { d: "M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z" }) }),
  dark: /* @__PURE__ */ u("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ u("path", { d: "M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z" }) }),
  omg: /* @__PURE__ */ u(
    "svg",
    {
      viewBox: "0 0 20 20",
      width: "18",
      height: "18",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.4",
      strokeLinecap: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ u("path", { d: "M10 10 10.18 10.07 10.28 10.25 10.26 10.5 10.09 10.74 9.78 10.91 9.37 10.93 8.93 10.75 8.55 10.37 8.32 9.81 8.33 9.15 8.61 8.47 9.17 7.91 9.96 7.56 10.89 7.53 11.83 7.86 12.63 8.55 13.16 9.55 13.29 10.74 12.98 11.96 12.2 13.03 11.04 13.8 9.61 14.11 8.1 13.87 6.72 13.08 5.67 11.79 5.13 10.15 5.21 8.36 5.95 6.65 7.31 5.28 9.12 4.44 11.18 4.31 13.21 4.93 14.95 6.28 16.12 8.22 16.54 10.51 16.11 12.87 14.83 14.98 12.83 16.54 10.34 17.3 7.68 17.13" })
    }
  )
};
function Ie() {
  return typeof window > "u" || !window.matchMedia ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function Ne({
  theme: r,
  defaultTheme: n,
  onThemeChange: l,
  storageKey: t
}) {
  const a = r !== void 0, [i, d] = I(() => {
    if (a) return r;
    if (t && typeof localStorage < "u") {
      const h = localStorage.getItem(t);
      if (h && ue.includes(h))
        return h;
    }
    return n ?? Ie();
  });
  return [a ? r : i, (h) => {
    a || (d(h), t && typeof localStorage < "u" && localStorage.setItem(t, h)), l == null || l(h);
  }];
}
function $e({ theme: r, onChange: n, disabled: l }) {
  return /* @__PURE__ */ u("div", { className: "rmc-theme-toggle", role: "radiogroup", "aria-label": "Theme", children: ue.map((t) => /* @__PURE__ */ A(
    "label",
    {
      className: t === r ? "rmc-theme-checked" : "",
      title: `Use ${t} theme`,
      children: [
        _e[t],
        /* @__PURE__ */ u(
          "input",
          {
            type: "radio",
            name: "rmc-theme-toggle",
            checked: t === r,
            value: t,
            disabled: l,
            "aria-label": `Use ${t} theme`,
            onChange: () => n(t)
          }
        )
      ]
    },
    t
  )) });
}
const Y = (r) => String(r.id ?? r.label), ke = [
  "#f44336",
  "#ff9800",
  "#ffc107",
  "#4caf50",
  "#00bcd4",
  "#3f51b5",
  "#9c27b0"
], Re = 60, De = 40, He = 40, Ue = 6, Be = 16, Pe = 80, Ve = 170, ce = 48, Fe = 300, ze = 0.012, Xe = 0.05;
function Oe(r, n, l) {
  const t = /* @__PURE__ */ new Map(), a = n.map((c, y) => {
    const w = l.minSize + c.value * l.valueScale, x = y * 2.4, M = 4 * Math.sqrt(y);
    return {
      key: c.key,
      r: w / 2,
      x: Math.cos(x) * M,
      y: Math.sin(x) * M
    };
  });
  if (a.length === 0) return { positions: t, height: 0 };
  for (let c = 0; c < Fe; c++) {
    a.forEach((y) => {
      y.x -= y.x * ze, y.y -= y.y * Xe;
    });
    for (let y = 0; y < a.length; y++)
      for (let w = y + 1; w < a.length; w++) {
        const x = a[y], M = a[w], U = M.x - x.x, B = M.y - x.y, T = Math.hypot(U, B) || 0.01, P = x.r + M.r + l.gap;
        if (T < P) {
          const V = P - T, S = x.r + M.r, F = U / T, N = B / T, p = V * (M.r / S), $ = V * (x.r / S);
          x.x -= F * p, x.y -= N * p, M.x += F * $, M.y += N * $;
        }
      }
  }
  let i = 1 / 0, d = -1 / 0, b = 1 / 0, g = -1 / 0;
  a.forEach((c) => {
    i = Math.min(i, c.x - c.r), d = Math.max(d, c.x + c.r), b = Math.min(b, c.y - c.r), g = Math.max(g, c.y + c.r);
  });
  const h = Math.max(d - i, 1), f = Math.min(1, (r - 20) / h), C = (r - h * f) / 2;
  return a.forEach((c) => {
    t.set(c.key, {
      x: C + (c.x - c.r - i) * f,
      y: (c.y - c.r - b) * f,
      w: c.r * 2 * f,
      h: c.r * 2 * f
    });
  }), { positions: t, height: (g - b) * f };
}
function We(r, n, l) {
  const t = /* @__PURE__ */ new Map(), a = Math.max(n.length, 1), i = Math.min(
    l.barMaxWidth,
    (r - l.barGap * (a - 1)) / a
  ), d = i * a + l.barGap * (a - 1), b = Math.max((r - d) / 2, 0), g = n.map(
    (f) => l.barMinHeight + f.value * l.valueScale
  ), h = Math.max(...g, l.barMinHeight);
  return n.forEach((f, C) => {
    const c = g[C];
    t.set(f.key, {
      x: b + C * (i + l.barGap),
      y: h - c,
      w: i,
      h: c
    });
  }), { positions: t, height: h };
}
function Ze(r, n, l) {
  const t = /* @__PURE__ */ new Map(), a = n.reduce((f, C) => f + C.value, 0) || 1, i = Math.max(Math.min(l.pieMaxRadius, r / 2 - 10), 60), d = i * 2, b = r / 2, g = i;
  let h = 0;
  return n.forEach((f) => {
    const C = f.value / a * 360;
    t.set(f.key, {
      x: b - i,
      y: g - i,
      w: d,
      h: d,
      startAngle: h,
      endAngle: h + C
    }), h += C;
  }), { positions: t, height: d };
}
function le(r, n) {
  const l = n * Math.PI / 180, t = Math.sin(l), a = -Math.cos(l);
  if (r === "rect") {
    const i = 50 / Math.max(Math.abs(t), Math.abs(a), 1e-4);
    return [50 + t * i, 50 + a * i];
  }
  return [50 + t * 50, 50 + a * 50];
}
function Ge(r, n, l, t) {
  const a = [];
  if (t)
    a.push("50% 50%");
  else {
    const [i, d] = le(r, n);
    a.push(`${i}% ${d}%`);
  }
  for (let i = 0; i <= ce; i++) {
    const d = n + (l - n) * i / ce, [b, g] = le(r, d);
    a.push(`${b}% ${g}%`);
  }
  return `polygon(${a.join(",")})`;
}
function je(r, n) {
  if (r.startAngle === void 0) return { dx: 0, dy: 0 };
  const t = (r.startAngle + (r.endAngle ?? 0)) / 2 * Math.PI / 180;
  return { dx: Math.sin(t) * n, dy: -Math.cos(t) * n };
}
function ie(r) {
  return `translate(${r.x}px, ${r.y}px)`;
}
const K = {
  bubbles: /* @__PURE__ */ u("svg", { viewBox: "0 0 24 24", width: "16", height: "16", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ u("path", { d: "M7.2,11.2C8.97,11.2 10.4,12.63 10.4,14.4C10.4,16.17 8.97,17.6 7.2,17.6C5.43,17.6 4,16.17 4,14.4C4,12.63 5.43,11.2 7.2,11.2M14.8,16A2,2 0 0,1 16.8,18A2,2 0 0,1 14.8,20A2,2 0 0,1 12.8,18A2,2 0 0,1 14.8,16M15.2,4A4.8,4.8 0 0,1 20,8.8C20,11.45 17.85,13.6 15.2,13.6A4.8,4.8 0 0,1 10.4,8.8C10.4,6.15 12.55,4 15.2,4Z" }) }),
  bars: /* @__PURE__ */ u("svg", { viewBox: "0 0 24 24", width: "16", height: "16", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ u("path", { d: "M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z" }) }),
  pie: /* @__PURE__ */ u("svg", { viewBox: "0 0 24 24", width: "16", height: "16", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ u("path", { d: "M11,2V22C5.9,21.5 2,17.2 2,12C2,6.8 5.9,2.5 11,2M13,2V11H22C21.5,6.2 17.8,2.5 13,2M13,13V22C17.7,21.5 21.5,17.8 22,13H13Z" }) })
};
function Je({
  data: r,
  disabled: n = !1,
  className: l = "",
  onItemClick: t,
  defaultView: a = "bubbles",
  view: i,
  onViewChange: d,
  showViewToggle: b = !0,
  formatValue: g = (S) => String(S),
  palette: h = ke,
  minSize: f = Re,
  barMinHeight: C = De,
  valueScale: c = He,
  gap: y = Ue,
  barGap: w = Be,
  barMaxWidth: x = Pe,
  pieMaxRadius: M = Ve,
  theme: U,
  defaultTheme: B,
  onThemeChange: T,
  themeStorageKey: P,
  showThemeToggle: V = !0
}) {
  const [S, F] = I(a), N = i !== void 0, p = N ? i : S, [$, he] = Ne({
    theme: U,
    defaultTheme: B,
    onThemeChange: T,
    storageKey: P
  }), [q, de] = I(null), [fe, me] = I(!1), [_, pe] = I("value"), [k, ye] = I(-1), J = Te(() => {
    const e = [...r];
    return _ === "value" ? e.sort((s, o) => k * (s.value - o.value)) : e.sort((s, o) => k * s.label.localeCompare(o.label)), e;
  }, [r, _, k]), z = H(null), R = H(/* @__PURE__ */ new Map()), X = H(/* @__PURE__ */ new Map()), O = H(/* @__PURE__ */ new Map()), Q = H(() => {
  });
  function ee() {
    const e = z.current;
    if (!e) return;
    const s = e.clientWidth, o = {
      minSize: f,
      barMinHeight: C,
      valueScale: c,
      gap: y,
      barGap: w,
      barMaxWidth: x,
      pieMaxRadius: M
    }, L = J.map((E) => ({
      key: Y(E),
      value: E.value
    }));
    let m;
    p === "bars" ? m = We(s, L, o) : p === "pie" ? m = Ze(s, L, o) : m = Oe(s, L, o);
    let G = 0;
    L.forEach((E) => {
      const v = m.positions.get(E.key), D = R.current.get(E.key);
      if (!v || !D) return;
      O.current.set(E.key, v), G = Math.max(G, v.y + v.h), D.style.width = `${v.w}px`, D.style.height = `${v.h}px`, D.style.transform = ie(v);
      const Ce = p === "bars" ? "rect" : "circle", Ae = v.startAngle ?? 0, Le = v.endAngle ?? 360;
      D.style.clipPath = Ge(Ce, Ae, Le, p === "pie");
      const j = X.current.get(E.key);
      if (j)
        if (p === "pie" && v.startAngle !== void 0) {
          const se = (v.startAngle + (v.endAngle ?? 0)) / 2 * Math.PI / 180, oe = v.w / 2, we = Math.sin(se) * oe * 0.62, Ee = -Math.cos(se) * oe * 0.62;
          j.style.transform = `translate(${we}px, ${Ee}px)`;
        } else
          j.style.transform = "translate(0px, 0px)";
    }), e.style.height = `${G}px`;
  }
  Q.current = ee, Se(() => {
    ee();
  }, [
    J,
    p,
    f,
    C,
    c,
    y,
    w,
    x,
    M
  ]), ae(() => {
    const e = z.current;
    if (!e) return;
    const s = new ResizeObserver(() => Q.current());
    return s.observe(e), () => s.disconnect();
  }, []), ae(() => {
    const e = requestAnimationFrame(() => me(!0));
    return () => cancelAnimationFrame(e);
  }, []);
  function be(e) {
    if (n) return;
    const s = R.current.get(e), o = O.current.get(e);
    if (!(!s || !o)) {
      if (p === "bubbles")
        s.style.transform = `translate(${o.x}px, ${o.y}px) scale(1.35)`, s.style.zIndex = "5";
      else if (p === "bars") {
        const m = o.h * 0.3999999999999999 / 2;
        s.style.transform = `translate(${o.x}px, ${o.y - m}px) scale(${1.4})`, s.style.zIndex = "5";
      } else if (p === "pie" && o.startAngle !== void 0) {
        const { dx: L, dy: m } = je(o, 20);
        s.style.transform = `translate(${o.x + L}px, ${o.y + m}px)`, s.style.zIndex = "5";
      }
    }
  }
  function ge(e) {
    const s = R.current.get(e), o = O.current.get(e);
    !s || !o || (s.style.transform = ie(o), s.style.zIndex = "");
  }
  function W(e) {
    n || e === p || (N || F(e), d == null || d(e));
  }
  function te(e) {
    n || (ye(e === _ ? -k : 1), pe(e));
  }
  function ne(e) {
    return _ !== e ? null : /* @__PURE__ */ u(
      "svg",
      {
        className: "rmc-sort-caret",
        viewBox: "0 0 10 6",
        width: "8",
        height: "8",
        "aria-hidden": "true",
        style: k === -1 ? { transform: "rotate(180deg)" } : void 0,
        children: /* @__PURE__ */ u("path", { d: "M5 0L10 6H0Z", fill: "currentColor" })
      }
    );
  }
  const Z = !n && typeof t == "function";
  function re(e) {
    const s = Y(e);
    de((o) => o === s ? null : s);
  }
  function xe(e, s) {
    n || (re(e), t == null || t(e, s));
  }
  function Me(e, s) {
    n || (s.key === "Enter" || s.key === " ") && (s.preventDefault(), re(e), t == null || t(e, s));
  }
  const ve = [
    "rmc",
    fe ? "rmc--ready" : "",
    n ? "rmc--disabled" : "",
    l
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ A("div", { className: ve, "data-theme": $, children: [
    /* @__PURE__ */ A("div", { className: "rmc-toolbar", children: [
      /* @__PURE__ */ A("div", { className: "rmc-controls", children: [
        /* @__PURE__ */ A("div", { className: "rmc-sort", role: "group", "aria-label": "Sort by", children: [
          /* @__PURE__ */ u("span", { className: "rmc-toolbar-label", children: "Sort:" }),
          /* @__PURE__ */ A(
            "button",
            {
              type: "button",
              disabled: n,
              "aria-pressed": _ === "label",
              onClick: () => te("label"),
              children: [
                "Label",
                ne("label")
              ]
            }
          ),
          /* @__PURE__ */ A(
            "button",
            {
              type: "button",
              disabled: n,
              "aria-pressed": _ === "value",
              onClick: () => te("value"),
              children: [
                "Value",
                ne("value")
              ]
            }
          )
        ] }),
        b && /* @__PURE__ */ A("div", { className: "rmc-view-toggle", role: "group", "aria-label": "Chart view", children: [
          /* @__PURE__ */ A(
            "button",
            {
              type: "button",
              disabled: n,
              "aria-pressed": p === "bubbles",
              onClick: () => W("bubbles"),
              children: [
                K.bubbles,
                " Bubbles"
              ]
            }
          ),
          /* @__PURE__ */ A(
            "button",
            {
              type: "button",
              disabled: n,
              "aria-pressed": p === "bars",
              onClick: () => W("bars"),
              children: [
                K.bars,
                " Bars"
              ]
            }
          ),
          /* @__PURE__ */ A(
            "button",
            {
              type: "button",
              disabled: n,
              "aria-pressed": p === "pie",
              onClick: () => W("pie"),
              children: [
                K.pie,
                " Pie"
              ]
            }
          )
        ] })
      ] }),
      V && /* @__PURE__ */ u($e, { theme: $, onChange: he, disabled: n })
    ] }),
    /* @__PURE__ */ u("div", { className: "rmc-viz", "data-view": p, ref: z, children: r.map((e, s) => {
      const o = Y(e), L = e.color ?? h[s % h.length];
      return /* @__PURE__ */ u(
        "div",
        {
          ref: (m) => {
            m ? R.current.set(o, m) : R.current.delete(o);
          },
          className: `rmc-item${o === q ? " rmc-item--active" : ""}`,
          style: { "--rmc-accent": L },
          onMouseEnter: () => be(o),
          onMouseLeave: () => ge(o),
          onClick: (m) => xe(e, m),
          onKeyDown: (m) => Me(e, m),
          role: Z ? "button" : void 0,
          tabIndex: Z ? 0 : void 0,
          "aria-disabled": n || void 0,
          "aria-pressed": Z ? o === q : void 0,
          children: /* @__PURE__ */ A(
            "div",
            {
              className: "rmc-label",
              ref: (m) => {
                m ? X.current.set(o, m) : X.current.delete(o);
              },
              children: [
                /* @__PURE__ */ u("span", { className: "rmc-name", children: /* @__PURE__ */ u("span", { className: "rmc-name-text", children: e.label }) }),
                /* @__PURE__ */ u("span", { className: "rmc-value", children: g(e.value) }),
                e.sublabel && /* @__PURE__ */ u("span", { className: "rmc-sublabel", children: e.sublabel })
              ]
            }
          )
        },
        o
      );
    }) })
  ] });
}
export {
  Je as MorphCharts,
  ue as THEMES,
  $e as ThemeToggle,
  Je as default,
  Ne as useThemeState
};

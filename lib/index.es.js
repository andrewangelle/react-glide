import d, { useState as I, useRef as b, useEffect as S, Children as h } from "react";
function k({ width: c }) {
  return d.createElement(
    "div",
    { style: {
      width: `${c}px`,
      height: `${parseInt(c.toString(), 10) / 66 * 50}px`
    } },
    d.createElement("div", { className: "loading-indicator" })
  );
}
function w({ interval: c = 2e3, skip: m = !1, resetOnExpire: l = !0, onExpire: v }) {
  const s = c / 1e3, [g, i] = I(s), a = b(v);
  function f() {
    i(s);
  }
  return S(() => {
    a.current = v;
  }), S(() => {
    let p;
    return m || (p = setInterval(() => {
      i((t) => t - 1);
    }, 1e3), g <= 0 && (a.current(), l && i(s))), m && clearInterval(p), () => {
      clearInterval(p);
    };
  }, [
    m,
    g,
    c,
    s,
    l,
    i,
    a
  ]), {
    reset: f
  };
}
function D(c) {
  const [m, l] = I(!0), [v, s] = I(!1), [g, i] = I(0), [a, f] = I([]);
  function p() {
    const e = t();
    e.length > 0 && e.forEach((o) => {
      const u = new Image();
      u.src = o, u.onload = y;
    }), e.length === 0 && (s(!0), l(!1));
  }
  function t() {
    let e = [];
    return h.map(c, (o, u) => {
      const N = E(o);
      e = [...e, ...N];
    }), f([...e]), e;
  }
  function E(e) {
    var o;
    const u = [];
    return e.type === "img" && u.push(e.props.src), !((o = e.props) === null || o === void 0) && o.children ? E(e.props.children) : u;
  }
  function y() {
    i((e) => e + 1);
  }
  return S(() => {
    p();
  }, []), S(() => {
    g === a.length && (s(!0), l(!1));
  }, [a, g, s, i]), {
    done: v,
    loading: m
  };
}
function P({ autoPlay: c, autoPlaySpeed: m = 5e3, infinite: l = !1, dots: v = !0, height: s, width: g, onSlideChange: i = () => null, children: a }) {
  const f = h.toArray(a), p = {
    skip: !c,
    interval: m,
    onExpire: u
  }, [t, E] = I(0), { loading: y, done: e } = D(f), { reset: o } = w(p);
  function u() {
    const r = f.length - 1;
    if (t === r && !l)
      return;
    const n = t === r ? 0 : t + 1;
    E((C) => n), o();
  }
  function N() {
    const r = f.length - 1, n = t === 0 ? r : t - 1;
    E((C) => n), o();
  }
  function x(r) {
    E((n) => r), o();
  }
  S(() => {
    t && i();
  }, [t]);
  const T = {
    height: s,
    width: g
  };
  return d.createElement(
    "div",
    { className: "glide--container", style: T, "data-testid": "glideContainer" },
    y && d.createElement(k, { width: g }),
    e && h.map(a, (r, n) => {
      const C = t === n ? "current" : "";
      return r && d.createElement(r.type, Object.assign({ key: n, className: `glide--item ${C}` }, t === n ? { "data-testid": "glideCurrentItem" } : {}, r.props));
    }),
    (l || t !== 0) && d.createElement("button", { className: "glide--prev-btn", "data-testid": "goToPrevSlide", onClick: N }, "\u276E"),
    (l || t !== f.length - 1) && d.createElement("button", { className: "glide--next-btn", "data-testid": "goToNextSlide", onClick: u }, "\u276F"),
    v && d.createElement("section", { className: "glide--dots" }, h.map(a, (r, n) => d.createElement("span", { key: n, role: "button", "data-testid": `glideDot-${n}`, className: t === n ? "active-dot" : "inactive-dot", tabIndex: 0, onClick: () => x(n), onKeyDown: (C) => {
      switch (C.key) {
        case " ":
        case "Enter":
          x(n);
      }
    } }, "\xB7")))
  );
}
export {
  P as Glide
};

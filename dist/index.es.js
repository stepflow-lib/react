import * as $ from "react";
import Kr, { createContext as bt, useState as Te, useCallback as Ft, useMemo as gt, useContext as j, useLayoutEffect as Mi, useEffect as Jt, useRef as Z, useInsertionEffect as _r, forwardRef as Yr, createElement as He, useId as ln, cloneElement as Di, Children as ki, isValidElement as Ri, memo as Li } from "react";
import { jsx as S, jsxs as ct, Fragment as Ei } from "react/jsx-runtime";
const qr = bt(void 0), ju = ({
  children: t,
  stepsCount: e
}) => {
  const [n, r] = Te(1), s = Ft(
    () => r((l) => Math.min(l + 1, e + 1)),
    [e]
  ), o = Ft(
    () => r((l) => Math.max(l - 1, 0)),
    []
  ), i = Ft(
    (l) => r(Math.min(Math.max(l, 0), e + 1)),
    [e]
  ), a = gt(
    () => ({
      currentStep: n,
      totalSteps: e + 2,
      next: s,
      prev: o,
      goToStep: i,
      setCurrentStep: r
    }),
    [n, e, s, o, i]
  );
  return /* @__PURE__ */ S(qr.Provider, { value: a, children: t });
};
function Xr() {
  const t = j(qr);
  if (t === void 0)
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  return t;
}
function Zr(t) {
  var e, n, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) for (e = 0; e < t.length; e++) t[e] && (n = Zr(t[e])) && (r && (r += " "), r += n);
  else for (e in t) t[e] && (r && (r += " "), r += e);
  return r;
}
function Bi() {
  for (var t, e, n = 0, r = ""; n < arguments.length; ) (t = arguments[n++]) && (e = Zr(t)) && (r && (r += " "), r += e);
  return r;
}
function Fi() {
  for (var t = 0, e, n, r = ""; t < arguments.length; )
    (e = arguments[t++]) && (n = Jr(e)) && (r && (r += " "), r += n);
  return r;
}
function Jr(t) {
  if (typeof t == "string")
    return t;
  for (var e, n = "", r = 0; r < t.length; r++)
    t[r] && (e = Jr(t[r])) && (n && (n += " "), n += e);
  return n;
}
var cn = "-";
function Oi(t) {
  var e = ji(t), n = t.conflictingClassGroups, r = t.conflictingClassGroupModifiers, s = r === void 0 ? {} : r;
  function o(a) {
    var l = a.split(cn);
    return l[0] === "" && l.length !== 1 && l.shift(), Qr(l, e) || Ii(a);
  }
  function i(a, l) {
    var c = n[a] || [];
    return l && s[a] ? [].concat(c, s[a]) : c;
  }
  return {
    getClassGroupId: o,
    getConflictingClassGroupIds: i
  };
}
function Qr(t, e) {
  var i;
  if (t.length === 0)
    return e.classGroupId;
  var n = t[0], r = e.nextPart.get(n), s = r ? Qr(t.slice(1), r) : void 0;
  if (s)
    return s;
  if (e.validators.length !== 0) {
    var o = t.join(cn);
    return (i = e.validators.find(function(a) {
      var l = a.validator;
      return l(o);
    })) == null ? void 0 : i.classGroupId;
  }
}
var On = /^\[(.+)\]$/;
function Ii(t) {
  if (On.test(t)) {
    var e = On.exec(t)[1], n = e == null ? void 0 : e.substring(0, e.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}
function ji(t) {
  var e = t.theme, n = t.prefix, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  }, s = zi(Object.entries(t.classGroups), n);
  return s.forEach(function(o) {
    var i = o[0], a = o[1];
    Ke(a, r, i, e);
  }), r;
}
function Ke(t, e, n, r) {
  t.forEach(function(s) {
    if (typeof s == "string") {
      var o = s === "" ? e : In(e, s);
      o.classGroupId = n;
      return;
    }
    if (typeof s == "function") {
      if (Ni(s)) {
        Ke(s(r), e, n, r);
        return;
      }
      e.validators.push({
        validator: s,
        classGroupId: n
      });
      return;
    }
    Object.entries(s).forEach(function(i) {
      var a = i[0], l = i[1];
      Ke(l, In(e, a), n, r);
    });
  });
}
function In(t, e) {
  var n = t;
  return e.split(cn).forEach(function(r) {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}
function Ni(t) {
  return t.isThemeGetter;
}
function zi(t, e) {
  return e ? t.map(function(n) {
    var r = n[0], s = n[1], o = s.map(function(i) {
      return typeof i == "string" ? e + i : typeof i == "object" ? Object.fromEntries(Object.entries(i).map(function(a) {
        var l = a[0], c = a[1];
        return [e + l, c];
      })) : i;
    });
    return [r, o];
  }) : t;
}
function Gi(t) {
  if (t < 1)
    return {
      get: function() {
      },
      set: function() {
      }
    };
  var e = 0, n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  function s(o, i) {
    n.set(o, i), e++, e > t && (e = 0, r = n, n = /* @__PURE__ */ new Map());
  }
  return {
    get: function(i) {
      var a = n.get(i);
      if (a !== void 0)
        return a;
      if ((a = r.get(i)) !== void 0)
        return s(i, a), a;
    },
    set: function(i, a) {
      n.has(i) ? n.set(i, a) : s(i, a);
    }
  };
}
var ts = "!";
function Ui(t) {
  var e = t.separator || ":", n = e.length === 1, r = e[0], s = e.length;
  return function(i) {
    for (var a = [], l = 0, c = 0, u, d = 0; d < i.length; d++) {
      var f = i[d];
      if (l === 0) {
        if (f === r && (n || i.slice(d, d + s) === e)) {
          a.push(i.slice(c, d)), c = d + s;
          continue;
        }
        if (f === "/") {
          u = d;
          continue;
        }
      }
      f === "[" ? l++ : f === "]" && l--;
    }
    var h = a.length === 0 ? i : i.substring(c), p = h.startsWith(ts), m = p ? h.substring(1) : h, v = u && u > c ? u - c : void 0;
    return {
      modifiers: a,
      hasImportantModifier: p,
      baseClassName: m,
      maybePostfixModifierPosition: v
    };
  };
}
function Wi(t) {
  if (t.length <= 1)
    return t;
  var e = [], n = [];
  return t.forEach(function(r) {
    var s = r[0] === "[";
    s ? (e.push.apply(e, n.sort().concat([r])), n = []) : n.push(r);
  }), e.push.apply(e, n.sort()), e;
}
function $i(t) {
  return {
    cache: Gi(t.cacheSize),
    splitModifiers: Ui(t),
    ...Oi(t)
  };
}
var Hi = /\s+/;
function Ki(t, e) {
  var n = e.splitModifiers, r = e.getClassGroupId, s = e.getConflictingClassGroupIds, o = /* @__PURE__ */ new Set();
  return t.trim().split(Hi).map(function(i) {
    var a = n(i), l = a.modifiers, c = a.hasImportantModifier, u = a.baseClassName, d = a.maybePostfixModifierPosition, f = r(d ? u.substring(0, d) : u), h = !!d;
    if (!f) {
      if (!d)
        return {
          isTailwindClass: !1,
          originalClassName: i
        };
      if (f = r(u), !f)
        return {
          isTailwindClass: !1,
          originalClassName: i
        };
      h = !1;
    }
    var p = Wi(l).join(":"), m = c ? p + ts : p;
    return {
      isTailwindClass: !0,
      modifierId: m,
      classGroupId: f,
      originalClassName: i,
      hasPostfixModifier: h
    };
  }).reverse().filter(function(i) {
    if (!i.isTailwindClass)
      return !0;
    var a = i.modifierId, l = i.classGroupId, c = i.hasPostfixModifier, u = a + l;
    return o.has(u) ? !1 : (o.add(u), s(l, c).forEach(function(d) {
      return o.add(a + d);
    }), !0);
  }).reverse().map(function(i) {
    return i.originalClassName;
  }).join(" ");
}
function _i() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  var r, s, o, i = a;
  function a(c) {
    var u = e[0], d = e.slice(1), f = d.reduce(function(h, p) {
      return p(h);
    }, u());
    return r = $i(f), s = r.cache.get, o = r.cache.set, i = l, l(c);
  }
  function l(c) {
    var u = s(c);
    if (u)
      return u;
    var d = Ki(c, r);
    return o(c, d), d;
  }
  return function() {
    return i(Fi.apply(null, arguments));
  };
}
function L(t) {
  var e = function(r) {
    return r[t] || [];
  };
  return e.isThemeGetter = !0, e;
}
var es = /^\[(?:([a-z-]+):)?(.+)\]$/i, Yi = /^\d+\/\d+$/, qi = /* @__PURE__ */ new Set(["px", "full", "screen"]), Xi = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Zi = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Ji = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
function tt(t) {
  return At(t) || qi.has(t) || Yi.test(t) || _e(t);
}
function _e(t) {
  return Mt(t, "length", so);
}
function Qi(t) {
  return Mt(t, "size", ns);
}
function to(t) {
  return Mt(t, "position", ns);
}
function eo(t) {
  return Mt(t, "url", io);
}
function oe(t) {
  return Mt(t, "number", At);
}
function At(t) {
  return !Number.isNaN(Number(t));
}
function no(t) {
  return t.endsWith("%") && At(t.slice(0, -1));
}
function zt(t) {
  return jn(t) || Mt(t, "number", jn);
}
function A(t) {
  return es.test(t);
}
function Gt() {
  return !0;
}
function dt(t) {
  return Xi.test(t);
}
function ro(t) {
  return Mt(t, "", oo);
}
function Mt(t, e, n) {
  var r = es.exec(t);
  return r ? r[1] ? r[1] === e : n(r[2]) : !1;
}
function so(t) {
  return Zi.test(t);
}
function ns() {
  return !1;
}
function io(t) {
  return t.startsWith("url(");
}
function jn(t) {
  return Number.isInteger(Number(t));
}
function oo(t) {
  return Ji.test(t);
}
function ao() {
  var t = L("colors"), e = L("spacing"), n = L("blur"), r = L("brightness"), s = L("borderColor"), o = L("borderRadius"), i = L("borderSpacing"), a = L("borderWidth"), l = L("contrast"), c = L("grayscale"), u = L("hueRotate"), d = L("invert"), f = L("gap"), h = L("gradientColorStops"), p = L("gradientColorStopPositions"), m = L("inset"), v = L("margin"), x = L("opacity"), y = L("padding"), g = L("saturate"), b = L("scale"), P = L("sepia"), D = L("skew"), k = L("space"), T = L("translate"), C = function() {
    return ["auto", "contain", "none"];
  }, N = function() {
    return ["auto", "hidden", "clip", "visible", "scroll"];
  }, et = function() {
    return ["auto", A, e];
  }, V = function() {
    return [A, e];
  }, _ = function() {
    return ["", tt];
  }, O = function() {
    return ["auto", At, A];
  }, st = function() {
    return ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  }, B = function() {
    return ["solid", "dashed", "dotted", "double", "none"];
  }, Q = function() {
    return ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"];
  }, it = function() {
    return ["start", "end", "center", "between", "around", "evenly", "stretch"];
  }, Y = function() {
    return ["", "0", A];
  }, jt = function() {
    return ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  }, M = function() {
    return [At, oe];
  }, nt = function() {
    return [At, A];
  };
  return {
    cacheSize: 500,
    theme: {
      colors: [Gt],
      spacing: [tt],
      blur: ["none", "", dt, A],
      brightness: M(),
      borderColor: [t],
      borderRadius: ["none", "", "full", dt, A],
      borderSpacing: V(),
      borderWidth: _(),
      contrast: M(),
      grayscale: Y(),
      hueRotate: nt(),
      invert: Y(),
      gap: V(),
      gradientColorStops: [t],
      gradientColorStopPositions: [no, _e],
      inset: et(),
      margin: et(),
      opacity: M(),
      padding: V(),
      saturate: M(),
      scale: M(),
      sepia: Y(),
      skew: nt(),
      space: V(),
      translate: V()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", A]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [dt]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": jt()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": jt()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [].concat(st(), [A])
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: N()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": N()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": N()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: C()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": C()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": C()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [m]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [m]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [m]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [m]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [m]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [m]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [m]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [m]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [m]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", zt]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: et()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", A]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: Y()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: Y()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", zt]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Gt]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", zt]
        }, A]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": O()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": O()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [Gt]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [zt]
        }, A]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": O()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": O()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", A]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", A]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [f]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [f]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [f]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal"].concat(it())
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal"].concat(it(), ["baseline"])
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [].concat(it(), ["baseline"])
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [y]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [y]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [y]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [y]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [y]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [y]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [y]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [y]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [y]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [v]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [v]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [v]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [v]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [v]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [v]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [v]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [v]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [v]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [k]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [k]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", A, e]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": ["min", "max", "fit", A, tt]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": ["0", "none", "full", "min", "max", "fit", "prose", {
          screen: [dt]
        }, dt, A]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [A, e, "auto", "min", "max", "fit"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["min", "max", "fit", A, tt]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [A, e, "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", dt, _e]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", oe]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Gt]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", A]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", At, oe]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", A, tt]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", A]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", A]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [t]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [x]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [t]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [x]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [].concat(B(), ["wavy"])
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", tt]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", A, tt]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [t]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: V()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", A]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", A]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [x]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [].concat(st(), [to])
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", Qi]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, eo]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [t]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [p]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [p]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [p]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [h]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [h]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [h]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [o]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [o]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [o]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [o]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [o]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [o]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [o]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [o]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [o]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [o]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [o]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [o]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [o]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [o]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [o]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [a]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [a]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [a]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [a]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [a]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [a]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [a]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [a]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [a]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [x]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [].concat(B(), ["hidden"])
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [a]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [a]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [x]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: B()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [s]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [s]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [s]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [s]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [s]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [s]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [s]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [s]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [""].concat(B())
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [A, tt]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [tt]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [t]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: _()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [t]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [x]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [tt]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [t]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", dt, ro]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Gt]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [x]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": Q()
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Q()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [n]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [r]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [l]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", dt, A]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [c]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [u]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [d]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [g]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [P]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [n]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [r]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [l]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [c]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [u]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [d]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [x]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [g]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [P]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [i]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [i]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [i]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", A]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: nt()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", A]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: nt()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", A]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [b]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [b]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [b]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [zt, A]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [T]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [T]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [D]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [D]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", A]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", t]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: ["appearance-none"],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", A]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [t]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": V()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": V()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": V()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": V()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": V()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": V()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": V()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": V()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": V()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": V()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": V()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": V()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": V()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": V()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": V()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": V()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": V()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": V()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "pinch-zoom", "manipulation", {
          pan: ["x", "left", "right", "y", "up", "down"]
        }]
      }],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", A]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [t, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [tt, oe]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [t, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}
var lo = /* @__PURE__ */ _i(ao);
function U(...t) {
  return lo(Bi(t));
}
const rs = bt({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
}), Se = bt({}), Ve = bt(null), Ae = typeof document < "u", un = Ae ? Mi : Jt, ss = bt({ strict: !1 }), dn = (t) => t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), co = "framerAppearId", is = "data-" + dn(co);
function uo(t, e, n, r) {
  const { visualElement: s } = j(Se), o = j(ss), i = j(Ve), a = j(rs).reducedMotion, l = Z();
  r = r || o.renderer, !l.current && r && (l.current = r(t, {
    visualState: e,
    parent: s,
    props: n,
    presenceContext: i,
    blockInitialAnimation: i ? i.initial === !1 : !1,
    reducedMotionConfig: a
  }));
  const c = l.current;
  _r(() => {
    c && c.update(n, i);
  });
  const u = Z(!!(n[is] && !window.HandoffComplete));
  return un(() => {
    c && (c.render(), u.current && c.animationState && c.animationState.animateChanges());
  }), Jt(() => {
    c && (c.updateFeatures(), !u.current && c.animationState && c.animationState.animateChanges(), u.current && (u.current = !1, window.HandoffComplete = !0));
  }), c;
}
function Rt(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function fo(t, e, n) {
  return Ft(
    (r) => {
      r && t.mount && t.mount(r), e && (r ? e.mount(r) : e.unmount()), n && (typeof n == "function" ? n(r) : Rt(n) && (n.current = r));
    },
    /**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */
    [e]
  );
}
function qt(t) {
  return typeof t == "string" || Array.isArray(t);
}
function Ce(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
const fn = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], hn = ["initial", ...fn];
function Me(t) {
  return Ce(t.animate) || hn.some((e) => qt(t[e]));
}
function os(t) {
  return !!(Me(t) || t.variants);
}
function ho(t, e) {
  if (Me(t)) {
    const { initial: n, animate: r } = t;
    return {
      initial: n === !1 || qt(n) ? n : void 0,
      animate: qt(r) ? r : void 0
    };
  }
  return t.inherit !== !1 ? e : {};
}
function po(t) {
  const { initial: e, animate: n } = ho(t, j(Se));
  return gt(() => ({ initial: e, animate: n }), [Nn(e), Nn(n)]);
}
function Nn(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const zn = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
}, Xt = {};
for (const t in zn)
  Xt[t] = {
    isEnabled: (e) => zn[t].some((n) => !!e[n])
  };
function mo(t) {
  for (const e in t)
    Xt[e] = {
      ...Xt[e],
      ...t[e]
    };
}
const pn = bt({}), as = bt({}), go = Symbol.for("motionComponentSymbol");
function yo({ preloadedFeatures: t, createVisualElement: e, useRender: n, useVisualState: r, Component: s }) {
  t && mo(t);
  function o(a, l) {
    let c;
    const u = {
      ...j(rs),
      ...a,
      layoutId: vo(a)
    }, { isStatic: d } = u, f = po(a), h = r(a, d);
    if (!d && Ae) {
      f.visualElement = uo(s, h, u, e);
      const p = j(as), m = j(ss).strict;
      f.visualElement && (c = f.visualElement.loadFeatures(
        // Note: Pass the full new combined props to correctly re-render dynamic feature components.
        u,
        m,
        t,
        p
      ));
    }
    return $.createElement(
      Se.Provider,
      { value: f },
      c && f.visualElement ? $.createElement(c, { visualElement: f.visualElement, ...u }) : null,
      n(s, a, fo(h, f.visualElement, l), h, d, f.visualElement)
    );
  }
  const i = Yr(o);
  return i[go] = s, i;
}
function vo({ layoutId: t }) {
  const e = j(pn).id;
  return e && t !== void 0 ? e + "-" + t : t;
}
function bo(t) {
  function e(r, s = {}) {
    return yo(t(r, s));
  }
  if (typeof Proxy > "u")
    return e;
  const n = /* @__PURE__ */ new Map();
  return new Proxy(e, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (r, s) => (n.has(s) || n.set(s, e(s)), n.get(s))
  });
}
const xo = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function mn(t) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof t != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    t.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(xo.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/.test(t))
    )
  );
}
const pe = {};
function wo(t) {
  Object.assign(pe, t);
}
const Qt = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], Dt = new Set(Qt);
function ls(t, { layout: e, layoutId: n }) {
  return Dt.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!pe[t] || t === "opacity");
}
const H = (t) => !!(t && t.getVelocity), Po = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, To = Qt.length;
function So(t, { enableHardwareAcceleration: e = !0, allowTransformNone: n = !0 }, r, s) {
  let o = "";
  for (let i = 0; i < To; i++) {
    const a = Qt[i];
    if (t[a] !== void 0) {
      const l = Po[a] || a;
      o += `${l}(${t[a]}) `;
    }
  }
  return e && !t.z && (o += "translateZ(0)"), o = o.trim(), s ? o = s(t, r ? "" : o) : n && r && (o = "none"), o;
}
const cs = (t) => (e) => typeof e == "string" && e.startsWith(t), us = cs("--"), Ye = cs("var(--"), Vo = /var\s*\(\s*--[\w-]+(\s*,\s*(?:(?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)+)?\s*\)/g, Ao = (t, e) => e && typeof t == "number" ? e.transform(t) : t, yt = (t, e, n) => Math.min(Math.max(n, t), e), kt = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, Ht = {
  ...kt,
  transform: (t) => yt(0, 1, t)
}, ae = {
  ...kt,
  default: 1
}, Kt = (t) => Math.round(t * 1e5) / 1e5, De = /(-)?([\d]*\.?[\d])+/g, ds = /(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi, Co = /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
function te(t) {
  return typeof t == "string";
}
const ee = (t) => ({
  test: (e) => te(e) && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), ft = ee("deg"), rt = ee("%"), w = ee("px"), Mo = ee("vh"), Do = ee("vw"), Gn = {
  ...rt,
  parse: (t) => rt.parse(t) / 100,
  transform: (t) => rt.transform(t * 100)
}, Un = {
  ...kt,
  transform: Math.round
}, fs = {
  // Border props
  borderWidth: w,
  borderTopWidth: w,
  borderRightWidth: w,
  borderBottomWidth: w,
  borderLeftWidth: w,
  borderRadius: w,
  radius: w,
  borderTopLeftRadius: w,
  borderTopRightRadius: w,
  borderBottomRightRadius: w,
  borderBottomLeftRadius: w,
  // Positioning props
  width: w,
  maxWidth: w,
  height: w,
  maxHeight: w,
  size: w,
  top: w,
  right: w,
  bottom: w,
  left: w,
  // Spacing props
  padding: w,
  paddingTop: w,
  paddingRight: w,
  paddingBottom: w,
  paddingLeft: w,
  margin: w,
  marginTop: w,
  marginRight: w,
  marginBottom: w,
  marginLeft: w,
  // Transform props
  rotate: ft,
  rotateX: ft,
  rotateY: ft,
  rotateZ: ft,
  scale: ae,
  scaleX: ae,
  scaleY: ae,
  scaleZ: ae,
  skew: ft,
  skewX: ft,
  skewY: ft,
  distance: w,
  translateX: w,
  translateY: w,
  translateZ: w,
  x: w,
  y: w,
  z: w,
  perspective: w,
  transformPerspective: w,
  opacity: Ht,
  originX: Gn,
  originY: Gn,
  originZ: w,
  // Misc
  zIndex: Un,
  // SVG
  fillOpacity: Ht,
  strokeOpacity: Ht,
  numOctaves: Un
};
function gn(t, e, n, r) {
  const { style: s, vars: o, transform: i, transformOrigin: a } = t;
  let l = !1, c = !1, u = !0;
  for (const d in e) {
    const f = e[d];
    if (us(d)) {
      o[d] = f;
      continue;
    }
    const h = fs[d], p = Ao(f, h);
    if (Dt.has(d)) {
      if (l = !0, i[d] = p, !u)
        continue;
      f !== (h.default || 0) && (u = !1);
    } else d.startsWith("origin") ? (c = !0, a[d] = p) : s[d] = p;
  }
  if (e.transform || (l || r ? s.transform = So(t.transform, n, u, r) : s.transform && (s.transform = "none")), c) {
    const { originX: d = "50%", originY: f = "50%", originZ: h = 0 } = a;
    s.transformOrigin = `${d} ${f} ${h}`;
  }
}
const yn = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function hs(t, e, n) {
  for (const r in e)
    !H(e[r]) && !ls(r, n) && (t[r] = e[r]);
}
function ko({ transformTemplate: t }, e, n) {
  return gt(() => {
    const r = yn();
    return gn(r, e, { enableHardwareAcceleration: !n }, t), Object.assign({}, r.vars, r.style);
  }, [e]);
}
function Ro(t, e, n) {
  const r = t.style || {}, s = {};
  return hs(s, r, t), Object.assign(s, ko(t, e, n)), t.transformValues ? t.transformValues(s) : s;
}
function Lo(t, e, n) {
  const r = {}, s = Ro(t, e, n);
  return t.drag && t.dragListener !== !1 && (r.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (r.tabIndex = 0), r.style = s, r;
}
const Eo = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "transformValues",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport"
]);
function me(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || Eo.has(t);
}
let ps = (t) => !me(t);
function Bo(t) {
  t && (ps = (e) => e.startsWith("on") ? !me(e) : t(e));
}
try {
  Bo(require("@emotion/is-prop-valid").default);
} catch {
}
function Fo(t, e, n) {
  const r = {};
  for (const s in t)
    s === "values" && typeof t.values == "object" || (ps(s) || n === !0 && me(s) || !e && !me(s) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && s.startsWith("onDrag")) && (r[s] = t[s]);
  return r;
}
function Wn(t, e, n) {
  return typeof t == "string" ? t : w.transform(e + n * t);
}
function Oo(t, e, n) {
  const r = Wn(e, t.x, t.width), s = Wn(n, t.y, t.height);
  return `${r} ${s}`;
}
const Io = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, jo = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function No(t, e, n = 1, r = 0, s = !0) {
  t.pathLength = 1;
  const o = s ? Io : jo;
  t[o.offset] = w.transform(-r);
  const i = w.transform(e), a = w.transform(n);
  t[o.array] = `${i} ${a}`;
}
function vn(t, {
  attrX: e,
  attrY: n,
  attrScale: r,
  originX: s,
  originY: o,
  pathLength: i,
  pathSpacing: a = 1,
  pathOffset: l = 0,
  // This is object creation, which we try to avoid per-frame.
  ...c
}, u, d, f) {
  if (gn(t, c, u, f), d) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: h, style: p, dimensions: m } = t;
  h.transform && (m && (p.transform = h.transform), delete h.transform), m && (s !== void 0 || o !== void 0 || p.transform) && (p.transformOrigin = Oo(m, s !== void 0 ? s : 0.5, o !== void 0 ? o : 0.5)), e !== void 0 && (h.x = e), n !== void 0 && (h.y = n), r !== void 0 && (h.scale = r), i !== void 0 && No(h, i, a, l, !1);
}
const ms = () => ({
  ...yn(),
  attrs: {}
}), bn = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function zo(t, e, n, r) {
  const s = gt(() => {
    const o = ms();
    return vn(o, e, { enableHardwareAcceleration: !1 }, bn(r), t.transformTemplate), {
      ...o.attrs,
      style: { ...o.style }
    };
  }, [e]);
  if (t.style) {
    const o = {};
    hs(o, t.style, t), s.style = { ...o, ...s.style };
  }
  return s;
}
function Go(t = !1) {
  return (n, r, s, { latestValues: o }, i) => {
    const l = (mn(n) ? zo : Lo)(r, o, i, n), u = {
      ...Fo(r, typeof n == "string", t),
      ...l,
      ref: s
    }, { children: d } = r, f = gt(() => H(d) ? d.get() : d, [d]);
    return He(n, {
      ...u,
      children: f
    });
  };
}
function gs(t, { style: e, vars: n }, r, s) {
  Object.assign(t.style, e, s && s.getProjectionStyles(r));
  for (const o in n)
    t.style.setProperty(o, n[o]);
}
const ys = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);
function vs(t, e, n, r) {
  gs(t, e, void 0, r);
  for (const s in e.attrs)
    t.setAttribute(ys.has(s) ? s : dn(s), e.attrs[s]);
}
function xn(t, e) {
  const { style: n } = t, r = {};
  for (const s in n)
    (H(n[s]) || e.style && H(e.style[s]) || ls(s, t)) && (r[s] = n[s]);
  return r;
}
function bs(t, e) {
  const n = xn(t, e);
  for (const r in t)
    if (H(t[r]) || H(e[r])) {
      const s = Qt.indexOf(r) !== -1 ? "attr" + r.charAt(0).toUpperCase() + r.substring(1) : r;
      n[s] = t[r];
    }
  return n;
}
function wn(t, e, n, r = {}, s = {}) {
  return typeof e == "function" && (e = e(n !== void 0 ? n : t.custom, r, s)), typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function" && (e = e(n !== void 0 ? n : t.custom, r, s)), e;
}
function xs(t) {
  const e = Z(null);
  return e.current === null && (e.current = t()), e.current;
}
const ge = (t) => Array.isArray(t), Uo = (t) => !!(t && typeof t == "object" && t.mix && t.toValue), Wo = (t) => ge(t) ? t[t.length - 1] || 0 : t;
function fe(t) {
  const e = H(t) ? t.get() : t;
  return Uo(e) ? e.toValue() : e;
}
function $o({ scrapeMotionValuesFromProps: t, createRenderState: e, onMount: n }, r, s, o) {
  const i = {
    latestValues: Ho(r, s, o, t),
    renderState: e()
  };
  return n && (i.mount = (a) => n(r, a, i)), i;
}
const ws = (t) => (e, n) => {
  const r = j(Se), s = j(Ve), o = () => $o(t, e, r, s);
  return n ? o() : xs(o);
};
function Ho(t, e, n, r) {
  const s = {}, o = r(t, {});
  for (const f in o)
    s[f] = fe(o[f]);
  let { initial: i, animate: a } = t;
  const l = Me(t), c = os(t);
  e && c && !l && t.inherit !== !1 && (i === void 0 && (i = e.initial), a === void 0 && (a = e.animate));
  let u = n ? n.initial === !1 : !1;
  u = u || i === !1;
  const d = u ? a : i;
  return d && typeof d != "boolean" && !Ce(d) && (Array.isArray(d) ? d : [d]).forEach((h) => {
    const p = wn(t, h);
    if (!p)
      return;
    const { transitionEnd: m, transition: v, ...x } = p;
    for (const y in x) {
      let g = x[y];
      if (Array.isArray(g)) {
        const b = u ? g.length - 1 : 0;
        g = g[b];
      }
      g !== null && (s[y] = g);
    }
    for (const y in m)
      s[y] = m[y];
  }), s;
}
const F = (t) => t;
class $n {
  constructor() {
    this.order = [], this.scheduled = /* @__PURE__ */ new Set();
  }
  add(e) {
    if (!this.scheduled.has(e))
      return this.scheduled.add(e), this.order.push(e), !0;
  }
  remove(e) {
    const n = this.order.indexOf(e);
    n !== -1 && (this.order.splice(n, 1), this.scheduled.delete(e));
  }
  clear() {
    this.order.length = 0, this.scheduled.clear();
  }
}
function Ko(t) {
  let e = new $n(), n = new $n(), r = 0, s = !1, o = !1;
  const i = /* @__PURE__ */ new WeakSet(), a = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (l, c = !1, u = !1) => {
      const d = u && s, f = d ? e : n;
      return c && i.add(l), f.add(l) && d && s && (r = e.order.length), l;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (l) => {
      n.remove(l), i.delete(l);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (l) => {
      if (s) {
        o = !0;
        return;
      }
      if (s = !0, [e, n] = [n, e], n.clear(), r = e.order.length, r)
        for (let c = 0; c < r; c++) {
          const u = e.order[c];
          u(l), i.has(u) && (a.schedule(u), t());
        }
      s = !1, o && (o = !1, a.process(l));
    }
  };
  return a;
}
const le = [
  "prepare",
  "read",
  "update",
  "preRender",
  "render",
  "postRender"
], _o = 40;
function Yo(t, e) {
  let n = !1, r = !0;
  const s = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, o = le.reduce((d, f) => (d[f] = Ko(() => n = !0), d), {}), i = (d) => o[d].process(s), a = () => {
    const d = performance.now();
    n = !1, s.delta = r ? 1e3 / 60 : Math.max(Math.min(d - s.timestamp, _o), 1), s.timestamp = d, s.isProcessing = !0, le.forEach(i), s.isProcessing = !1, n && e && (r = !1, t(a));
  }, l = () => {
    n = !0, r = !0, s.isProcessing || t(a);
  };
  return { schedule: le.reduce((d, f) => {
    const h = o[f];
    return d[f] = (p, m = !1, v = !1) => (n || l(), h.schedule(p, m, v)), d;
  }, {}), cancel: (d) => le.forEach((f) => o[f].cancel(d)), state: s, steps: o };
}
const { schedule: R, cancel: ut, state: G, steps: Ee } = Yo(typeof requestAnimationFrame < "u" ? requestAnimationFrame : F, !0), qo = {
  useVisualState: ws({
    scrapeMotionValuesFromProps: bs,
    createRenderState: ms,
    onMount: (t, e, { renderState: n, latestValues: r }) => {
      R.read(() => {
        try {
          n.dimensions = typeof e.getBBox == "function" ? e.getBBox() : e.getBoundingClientRect();
        } catch {
          n.dimensions = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          };
        }
      }), R.render(() => {
        vn(n, r, { enableHardwareAcceleration: !1 }, bn(e.tagName), t.transformTemplate), vs(e, n);
      });
    }
  })
}, Xo = {
  useVisualState: ws({
    scrapeMotionValuesFromProps: xn,
    createRenderState: yn
  })
};
function Zo(t, { forwardMotionProps: e = !1 }, n, r) {
  return {
    ...mn(t) ? qo : Xo,
    preloadedFeatures: n,
    useRender: Go(e),
    createVisualElement: r,
    Component: t
  };
}
function ot(t, e, n, r = { passive: !0 }) {
  return t.addEventListener(e, n, r), () => t.removeEventListener(e, n);
}
const Ps = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1;
function ke(t, e = "page") {
  return {
    point: {
      x: t[e + "X"],
      y: t[e + "Y"]
    }
  };
}
const Jo = (t) => (e) => Ps(e) && t(e, ke(e));
function at(t, e, n, r) {
  return ot(t, e, Jo(n), r);
}
const Qo = (t, e) => (n) => e(t(n)), pt = (...t) => t.reduce(Qo);
function Ts(t) {
  let e = null;
  return () => {
    const n = () => {
      e = null;
    };
    return e === null ? (e = t, n) : !1;
  };
}
const Hn = Ts("dragHorizontal"), Kn = Ts("dragVertical");
function Ss(t) {
  let e = !1;
  if (t === "y")
    e = Kn();
  else if (t === "x")
    e = Hn();
  else {
    const n = Hn(), r = Kn();
    n && r ? e = () => {
      n(), r();
    } : (n && n(), r && r());
  }
  return e;
}
function Vs() {
  const t = Ss(!0);
  return t ? (t(), !1) : !0;
}
class xt {
  constructor(e) {
    this.isMounted = !1, this.node = e;
  }
  update() {
  }
}
function _n(t, e) {
  const n = "pointer" + (e ? "enter" : "leave"), r = "onHover" + (e ? "Start" : "End"), s = (o, i) => {
    if (o.pointerType === "touch" || Vs())
      return;
    const a = t.getProps();
    t.animationState && a.whileHover && t.animationState.setActive("whileHover", e), a[r] && R.update(() => a[r](o, i));
  };
  return at(t.current, n, s, {
    passive: !t.getProps()[r]
  });
}
class ta extends xt {
  mount() {
    this.unmount = pt(_n(this.node, !0), _n(this.node, !1));
  }
  unmount() {
  }
}
class ea extends xt {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let e = !1;
    try {
      e = this.node.current.matches(":focus-visible");
    } catch {
      e = !0;
    }
    !e || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = pt(ot(this.node.current, "focus", () => this.onFocus()), ot(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
const As = (t, e) => e ? t === e ? !0 : As(t, e.parentElement) : !1;
function Be(t, e) {
  if (!e)
    return;
  const n = new PointerEvent("pointer" + t);
  e(n, ke(n));
}
class na extends xt {
  constructor() {
    super(...arguments), this.removeStartListeners = F, this.removeEndListeners = F, this.removeAccessibleListeners = F, this.startPointerPress = (e, n) => {
      if (this.isPressing)
        return;
      this.removeEndListeners();
      const r = this.node.getProps(), o = at(window, "pointerup", (a, l) => {
        if (!this.checkPressEnd())
          return;
        const { onTap: c, onTapCancel: u, globalTapTarget: d } = this.node.getProps();
        R.update(() => {
          !d && !As(this.node.current, a.target) ? u && u(a, l) : c && c(a, l);
        });
      }, { passive: !(r.onTap || r.onPointerUp) }), i = at(window, "pointercancel", (a, l) => this.cancelPress(a, l), { passive: !(r.onTapCancel || r.onPointerCancel) });
      this.removeEndListeners = pt(o, i), this.startPress(e, n);
    }, this.startAccessiblePress = () => {
      const e = (o) => {
        if (o.key !== "Enter" || this.isPressing)
          return;
        const i = (a) => {
          a.key !== "Enter" || !this.checkPressEnd() || Be("up", (l, c) => {
            const { onTap: u } = this.node.getProps();
            u && R.update(() => u(l, c));
          });
        };
        this.removeEndListeners(), this.removeEndListeners = ot(this.node.current, "keyup", i), Be("down", (a, l) => {
          this.startPress(a, l);
        });
      }, n = ot(this.node.current, "keydown", e), r = () => {
        this.isPressing && Be("cancel", (o, i) => this.cancelPress(o, i));
      }, s = ot(this.node.current, "blur", r);
      this.removeAccessibleListeners = pt(n, s);
    };
  }
  startPress(e, n) {
    this.isPressing = !0;
    const { onTapStart: r, whileTap: s } = this.node.getProps();
    s && this.node.animationState && this.node.animationState.setActive("whileTap", !0), r && R.update(() => r(e, n));
  }
  checkPressEnd() {
    return this.removeEndListeners(), this.isPressing = !1, this.node.getProps().whileTap && this.node.animationState && this.node.animationState.setActive("whileTap", !1), !Vs();
  }
  cancelPress(e, n) {
    if (!this.checkPressEnd())
      return;
    const { onTapCancel: r } = this.node.getProps();
    r && R.update(() => r(e, n));
  }
  mount() {
    const e = this.node.getProps(), n = at(e.globalTapTarget ? window : this.node.current, "pointerdown", this.startPointerPress, { passive: !(e.onTapStart || e.onPointerStart) }), r = ot(this.node.current, "focus", this.startAccessiblePress);
    this.removeStartListeners = pt(n, r);
  }
  unmount() {
    this.removeStartListeners(), this.removeEndListeners(), this.removeAccessibleListeners();
  }
}
const qe = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap(), ra = (t) => {
  const e = qe.get(t.target);
  e && e(t);
}, sa = (t) => {
  t.forEach(ra);
};
function ia({ root: t, ...e }) {
  const n = t || document;
  Fe.has(n) || Fe.set(n, {});
  const r = Fe.get(n), s = JSON.stringify(e);
  return r[s] || (r[s] = new IntersectionObserver(sa, { root: t, ...e })), r[s];
}
function oa(t, e, n) {
  const r = ia(e);
  return qe.set(t, n), r.observe(t), () => {
    qe.delete(t), r.unobserve(t);
  };
}
const aa = {
  some: 0,
  all: 1
};
class la extends xt {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: e = {} } = this.node.getProps(), { root: n, margin: r, amount: s = "some", once: o } = e, i = {
      root: n ? n.current : void 0,
      rootMargin: r,
      threshold: typeof s == "number" ? s : aa[s]
    }, a = (l) => {
      const { isIntersecting: c } = l;
      if (this.isInView === c || (this.isInView = c, o && !c && this.hasEnteredView))
        return;
      c && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", c);
      const { onViewportEnter: u, onViewportLeave: d } = this.node.getProps(), f = c ? u : d;
      f && f(l);
    };
    return oa(this.node.current, i, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: e, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(ca(e, n)) && this.startObserver();
  }
  unmount() {
  }
}
function ca({ viewport: t = {} }, { viewport: e = {} } = {}) {
  return (n) => t[n] !== e[n];
}
const ua = {
  inView: {
    Feature: la
  },
  tap: {
    Feature: na
  },
  focus: {
    Feature: ea
  },
  hover: {
    Feature: ta
  }
};
function Cs(t, e) {
  if (!Array.isArray(e))
    return !1;
  const n = e.length;
  if (n !== t.length)
    return !1;
  for (let r = 0; r < n; r++)
    if (e[r] !== t[r])
      return !1;
  return !0;
}
function da(t) {
  const e = {};
  return t.values.forEach((n, r) => e[r] = n.get()), e;
}
function fa(t) {
  const e = {};
  return t.values.forEach((n, r) => e[r] = n.getVelocity()), e;
}
function Re(t, e, n) {
  const r = t.getProps();
  return wn(r, e, n !== void 0 ? n : r.custom, da(t), fa(t));
}
let ne = F, J = F;
process.env.NODE_ENV !== "production" && (ne = (t, e) => {
  !t && typeof console < "u" && console.warn(e);
}, J = (t, e) => {
  if (!t)
    throw new Error(e);
});
const mt = (t) => t * 1e3, lt = (t) => t / 1e3, ha = {
  current: !1
}, Ms = (t) => Array.isArray(t) && typeof t[0] == "number";
function Ds(t) {
  return !!(!t || typeof t == "string" && ks[t] || Ms(t) || Array.isArray(t) && t.every(Ds));
}
const $t = ([t, e, n, r]) => `cubic-bezier(${t}, ${e}, ${n}, ${r})`, ks = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: $t([0, 0.65, 0.55, 1]),
  circOut: $t([0.55, 0, 1, 0.45]),
  backIn: $t([0.31, 0.01, 0.66, -0.59]),
  backOut: $t([0.33, 1.53, 0.69, 0.99])
};
function Rs(t) {
  if (t)
    return Ms(t) ? $t(t) : Array.isArray(t) ? t.map(Rs) : ks[t];
}
function pa(t, e, n, { delay: r = 0, duration: s, repeat: o = 0, repeatType: i = "loop", ease: a, times: l } = {}) {
  const c = { [e]: n };
  l && (c.offset = l);
  const u = Rs(a);
  return Array.isArray(u) && (c.easing = u), t.animate(c, {
    delay: r,
    duration: s,
    easing: Array.isArray(u) ? "linear" : u,
    fill: "both",
    iterations: o + 1,
    direction: i === "reverse" ? "alternate" : "normal"
  });
}
function ma(t, { repeat: e, repeatType: n = "loop" }) {
  const r = e && n !== "loop" && e % 2 === 1 ? 0 : t.length - 1;
  return t[r];
}
const Ls = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, ga = 1e-7, ya = 12;
function va(t, e, n, r, s) {
  let o, i, a = 0;
  do
    i = e + (n - e) / 2, o = Ls(i, r, s) - t, o > 0 ? n = i : e = i;
  while (Math.abs(o) > ga && ++a < ya);
  return i;
}
function re(t, e, n, r) {
  if (t === e && n === r)
    return F;
  const s = (o) => va(o, 0, 1, t, n);
  return (o) => o === 0 || o === 1 ? o : Ls(s(o), e, r);
}
const ba = re(0.42, 0, 1, 1), xa = re(0, 0, 0.58, 1), Es = re(0.42, 0, 0.58, 1), wa = (t) => Array.isArray(t) && typeof t[0] != "number", Bs = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, Fs = (t) => (e) => 1 - t(1 - e), Pn = (t) => 1 - Math.sin(Math.acos(t)), Os = Fs(Pn), Pa = Bs(Pn), Is = re(0.33, 1.53, 0.69, 0.99), Tn = Fs(Is), Ta = Bs(Tn), Sa = (t) => (t *= 2) < 1 ? 0.5 * Tn(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), Yn = {
  linear: F,
  easeIn: ba,
  easeInOut: Es,
  easeOut: xa,
  circIn: Pn,
  circInOut: Pa,
  circOut: Os,
  backIn: Tn,
  backInOut: Ta,
  backOut: Is,
  anticipate: Sa
}, qn = (t) => {
  if (Array.isArray(t)) {
    J(t.length === 4, "Cubic bezier arrays must contain four numerical values.");
    const [e, n, r, s] = t;
    return re(e, n, r, s);
  } else if (typeof t == "string")
    return J(Yn[t] !== void 0, `Invalid easing type '${t}'`), Yn[t];
  return t;
}, Sn = (t, e) => (n) => !!(te(n) && Co.test(n) && n.startsWith(t) || e && Object.prototype.hasOwnProperty.call(n, e)), js = (t, e, n) => (r) => {
  if (!te(r))
    return r;
  const [s, o, i, a] = r.match(De);
  return {
    [t]: parseFloat(s),
    [e]: parseFloat(o),
    [n]: parseFloat(i),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, Va = (t) => yt(0, 255, t), Oe = {
  ...kt,
  transform: (t) => Math.round(Va(t))
}, Ct = {
  test: Sn("rgb", "red"),
  parse: js("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: r = 1 }) => "rgba(" + Oe.transform(t) + ", " + Oe.transform(e) + ", " + Oe.transform(n) + ", " + Kt(Ht.transform(r)) + ")"
};
function Aa(t) {
  let e = "", n = "", r = "", s = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), r = t.substring(5, 7), s = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), r = t.substring(3, 4), s = t.substring(4, 5), e += e, n += n, r += r, s += s), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(r, 16),
    alpha: s ? parseInt(s, 16) / 255 : 1
  };
}
const Xe = {
  test: Sn("#"),
  parse: Aa,
  transform: Ct.transform
}, Lt = {
  test: Sn("hsl", "hue"),
  parse: js("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: r = 1 }) => "hsla(" + Math.round(t) + ", " + rt.transform(Kt(e)) + ", " + rt.transform(Kt(n)) + ", " + Kt(Ht.transform(r)) + ")"
}, W = {
  test: (t) => Ct.test(t) || Xe.test(t) || Lt.test(t),
  parse: (t) => Ct.test(t) ? Ct.parse(t) : Lt.test(t) ? Lt.parse(t) : Xe.parse(t),
  transform: (t) => te(t) ? t : t.hasOwnProperty("red") ? Ct.transform(t) : Lt.transform(t)
}, E = (t, e, n) => -n * t + n * e + t;
function Ie(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function Ca({ hue: t, saturation: e, lightness: n, alpha: r }) {
  t /= 360, e /= 100, n /= 100;
  let s = 0, o = 0, i = 0;
  if (!e)
    s = o = i = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e, l = 2 * n - a;
    s = Ie(l, a, t + 1 / 3), o = Ie(l, a, t), i = Ie(l, a, t - 1 / 3);
  }
  return {
    red: Math.round(s * 255),
    green: Math.round(o * 255),
    blue: Math.round(i * 255),
    alpha: r
  };
}
const je = (t, e, n) => {
  const r = t * t;
  return Math.sqrt(Math.max(0, n * (e * e - r) + r));
}, Ma = [Xe, Ct, Lt], Da = (t) => Ma.find((e) => e.test(t));
function Xn(t) {
  const e = Da(t);
  J(!!e, `'${t}' is not an animatable color. Use the equivalent color code instead.`);
  let n = e.parse(t);
  return e === Lt && (n = Ca(n)), n;
}
const Ns = (t, e) => {
  const n = Xn(t), r = Xn(e), s = { ...n };
  return (o) => (s.red = je(n.red, r.red, o), s.green = je(n.green, r.green, o), s.blue = je(n.blue, r.blue, o), s.alpha = E(n.alpha, r.alpha, o), Ct.transform(s));
};
function ka(t) {
  var e, n;
  return isNaN(t) && te(t) && (((e = t.match(De)) === null || e === void 0 ? void 0 : e.length) || 0) + (((n = t.match(ds)) === null || n === void 0 ? void 0 : n.length) || 0) > 0;
}
const zs = {
  regex: Vo,
  countKey: "Vars",
  token: "${v}",
  parse: F
}, Gs = {
  regex: ds,
  countKey: "Colors",
  token: "${c}",
  parse: W.parse
}, Us = {
  regex: De,
  countKey: "Numbers",
  token: "${n}",
  parse: kt.parse
};
function Ne(t, { regex: e, countKey: n, token: r, parse: s }) {
  const o = t.tokenised.match(e);
  o && (t["num" + n] = o.length, t.tokenised = t.tokenised.replace(e, r), t.values.push(...o.map(s)));
}
function ye(t) {
  const e = t.toString(), n = {
    value: e,
    tokenised: e,
    values: [],
    numVars: 0,
    numColors: 0,
    numNumbers: 0
  };
  return n.value.includes("var(--") && Ne(n, zs), Ne(n, Gs), Ne(n, Us), n;
}
function Ws(t) {
  return ye(t).values;
}
function $s(t) {
  const { values: e, numColors: n, numVars: r, tokenised: s } = ye(t), o = e.length;
  return (i) => {
    let a = s;
    for (let l = 0; l < o; l++)
      l < r ? a = a.replace(zs.token, i[l]) : l < r + n ? a = a.replace(Gs.token, W.transform(i[l])) : a = a.replace(Us.token, Kt(i[l]));
    return a;
  };
}
const Ra = (t) => typeof t == "number" ? 0 : t;
function La(t) {
  const e = Ws(t);
  return $s(t)(e.map(Ra));
}
const vt = {
  test: ka,
  parse: Ws,
  createTransformer: $s,
  getAnimatableNone: La
}, Hs = (t, e) => (n) => `${n > 0 ? e : t}`;
function Ks(t, e) {
  return typeof t == "number" ? (n) => E(t, e, n) : W.test(t) ? Ns(t, e) : t.startsWith("var(") ? Hs(t, e) : Ys(t, e);
}
const _s = (t, e) => {
  const n = [...t], r = n.length, s = t.map((o, i) => Ks(o, e[i]));
  return (o) => {
    for (let i = 0; i < r; i++)
      n[i] = s[i](o);
    return n;
  };
}, Ea = (t, e) => {
  const n = { ...t, ...e }, r = {};
  for (const s in n)
    t[s] !== void 0 && e[s] !== void 0 && (r[s] = Ks(t[s], e[s]));
  return (s) => {
    for (const o in r)
      n[o] = r[o](s);
    return n;
  };
}, Ys = (t, e) => {
  const n = vt.createTransformer(e), r = ye(t), s = ye(e);
  return r.numVars === s.numVars && r.numColors === s.numColors && r.numNumbers >= s.numNumbers ? pt(_s(r.values, s.values), n) : (ne(!0, `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`), Hs(t, e));
}, Zt = (t, e, n) => {
  const r = e - t;
  return r === 0 ? 1 : (n - t) / r;
}, Zn = (t, e) => (n) => E(t, e, n);
function Ba(t) {
  return typeof t == "number" ? Zn : typeof t == "string" ? W.test(t) ? Ns : Ys : Array.isArray(t) ? _s : typeof t == "object" ? Ea : Zn;
}
function Fa(t, e, n) {
  const r = [], s = n || Ba(t[0]), o = t.length - 1;
  for (let i = 0; i < o; i++) {
    let a = s(t[i], t[i + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[i] || F : e;
      a = pt(l, a);
    }
    r.push(a);
  }
  return r;
}
function qs(t, e, { clamp: n = !0, ease: r, mixer: s } = {}) {
  const o = t.length;
  if (J(o === e.length, "Both input and output ranges must be the same length"), o === 1)
    return () => e[0];
  t[0] > t[o - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const i = Fa(e, r, s), a = i.length, l = (c) => {
    let u = 0;
    if (a > 1)
      for (; u < t.length - 2 && !(c < t[u + 1]); u++)
        ;
    const d = Zt(t[u], t[u + 1], c);
    return i[u](d);
  };
  return n ? (c) => l(yt(t[0], t[o - 1], c)) : l;
}
function Oa(t, e) {
  const n = t[t.length - 1];
  for (let r = 1; r <= e; r++) {
    const s = Zt(0, e, r);
    t.push(E(n, 1, s));
  }
}
function Ia(t) {
  const e = [0];
  return Oa(e, t.length - 1), e;
}
function ja(t, e) {
  return t.map((n) => n * e);
}
function Na(t, e) {
  return t.map(() => e || Es).splice(0, t.length - 1);
}
function ve({ duration: t = 300, keyframes: e, times: n, ease: r = "easeInOut" }) {
  const s = wa(r) ? r.map(qn) : qn(r), o = {
    done: !1,
    value: e[0]
  }, i = ja(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : Ia(e),
    t
  ), a = qs(i, e, {
    ease: Array.isArray(s) ? s : Na(e, s)
  });
  return {
    calculatedDuration: t,
    next: (l) => (o.value = a(l), o.done = l >= t, o)
  };
}
function Xs(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const za = 5;
function Zs(t, e, n) {
  const r = Math.max(e - za, 0);
  return Xs(n - t(r), e - r);
}
const Jn = 1e-3, Ga = 0.01, Qn = 10, Ua = 0.05, Wa = 1;
function $a({ duration: t = 800, bounce: e = 0.25, velocity: n = 0, mass: r = 1 }) {
  let s, o;
  ne(t <= mt(Qn), "Spring duration must be 10 seconds or less");
  let i = 1 - e;
  i = yt(Ua, Wa, i), t = yt(Ga, Qn, lt(t)), i < 1 ? (s = (c) => {
    const u = c * i, d = u * t, f = u - n, h = Ze(c, i), p = Math.exp(-d);
    return Jn - f / h * p;
  }, o = (c) => {
    const d = c * i * t, f = d * n + n, h = Math.pow(i, 2) * Math.pow(c, 2) * t, p = Math.exp(-d), m = Ze(Math.pow(c, 2), i);
    return (-s(c) + Jn > 0 ? -1 : 1) * ((f - h) * p) / m;
  }) : (s = (c) => {
    const u = Math.exp(-c * t), d = (c - n) * t + 1;
    return -1e-3 + u * d;
  }, o = (c) => {
    const u = Math.exp(-c * t), d = (n - c) * (t * t);
    return u * d;
  });
  const a = 5 / t, l = Ka(s, o, a);
  if (t = mt(t), isNaN(l))
    return {
      stiffness: 100,
      damping: 10,
      duration: t
    };
  {
    const c = Math.pow(l, 2) * r;
    return {
      stiffness: c,
      damping: i * 2 * Math.sqrt(r * c),
      duration: t
    };
  }
}
const Ha = 12;
function Ka(t, e, n) {
  let r = n;
  for (let s = 1; s < Ha; s++)
    r = r - t(r) / e(r);
  return r;
}
function Ze(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const _a = ["duration", "bounce"], Ya = ["stiffness", "damping", "mass"];
function tr(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function qa(t) {
  let e = {
    velocity: 0,
    stiffness: 100,
    damping: 10,
    mass: 1,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!tr(t, Ya) && tr(t, _a)) {
    const n = $a(t);
    e = {
      ...e,
      ...n,
      mass: 1
    }, e.isResolvedFromDuration = !0;
  }
  return e;
}
function Js({ keyframes: t, restDelta: e, restSpeed: n, ...r }) {
  const s = t[0], o = t[t.length - 1], i = { done: !1, value: s }, { stiffness: a, damping: l, mass: c, duration: u, velocity: d, isResolvedFromDuration: f } = qa({
    ...r,
    velocity: -lt(r.velocity || 0)
  }), h = d || 0, p = l / (2 * Math.sqrt(a * c)), m = o - s, v = lt(Math.sqrt(a / c)), x = Math.abs(m) < 5;
  n || (n = x ? 0.01 : 2), e || (e = x ? 5e-3 : 0.5);
  let y;
  if (p < 1) {
    const g = Ze(v, p);
    y = (b) => {
      const P = Math.exp(-p * v * b);
      return o - P * ((h + p * v * m) / g * Math.sin(g * b) + m * Math.cos(g * b));
    };
  } else if (p === 1)
    y = (g) => o - Math.exp(-v * g) * (m + (h + v * m) * g);
  else {
    const g = v * Math.sqrt(p * p - 1);
    y = (b) => {
      const P = Math.exp(-p * v * b), D = Math.min(g * b, 300);
      return o - P * ((h + p * v * m) * Math.sinh(D) + g * m * Math.cosh(D)) / g;
    };
  }
  return {
    calculatedDuration: f && u || null,
    next: (g) => {
      const b = y(g);
      if (f)
        i.done = g >= u;
      else {
        let P = h;
        g !== 0 && (p < 1 ? P = Zs(y, g, b) : P = 0);
        const D = Math.abs(P) <= n, k = Math.abs(o - b) <= e;
        i.done = D && k;
      }
      return i.value = i.done ? o : b, i;
    }
  };
}
function er({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: r = 325, bounceDamping: s = 10, bounceStiffness: o = 500, modifyTarget: i, min: a, max: l, restDelta: c = 0.5, restSpeed: u }) {
  const d = t[0], f = {
    done: !1,
    value: d
  }, h = (T) => a !== void 0 && T < a || l !== void 0 && T > l, p = (T) => a === void 0 ? l : l === void 0 || Math.abs(a - T) < Math.abs(l - T) ? a : l;
  let m = n * e;
  const v = d + m, x = i === void 0 ? v : i(v);
  x !== v && (m = x - d);
  const y = (T) => -m * Math.exp(-T / r), g = (T) => x + y(T), b = (T) => {
    const C = y(T), N = g(T);
    f.done = Math.abs(C) <= c, f.value = f.done ? x : N;
  };
  let P, D;
  const k = (T) => {
    h(f.value) && (P = T, D = Js({
      keyframes: [f.value, p(f.value)],
      velocity: Zs(g, T, f.value),
      damping: s,
      stiffness: o,
      restDelta: c,
      restSpeed: u
    }));
  };
  return k(0), {
    calculatedDuration: null,
    next: (T) => {
      let C = !1;
      return !D && P === void 0 && (C = !0, b(T), k(T)), P !== void 0 && T > P ? D.next(T - P) : (!C && b(T), f);
    }
  };
}
const Xa = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: () => R.update(e, !0),
    stop: () => ut(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => G.isProcessing ? G.timestamp : performance.now()
  };
}, nr = 2e4;
function rr(t) {
  let e = 0;
  const n = 50;
  let r = t.next(e);
  for (; !r.done && e < nr; )
    e += n, r = t.next(e);
  return e >= nr ? 1 / 0 : e;
}
const Za = {
  decay: er,
  inertia: er,
  tween: ve,
  keyframes: ve,
  spring: Js
};
function be({ autoplay: t = !0, delay: e = 0, driver: n = Xa, keyframes: r, type: s = "keyframes", repeat: o = 0, repeatDelay: i = 0, repeatType: a = "loop", onPlay: l, onStop: c, onComplete: u, onUpdate: d, ...f }) {
  let h = 1, p = !1, m, v;
  const x = () => {
    v = new Promise((M) => {
      m = M;
    });
  };
  x();
  let y;
  const g = Za[s] || ve;
  let b;
  g !== ve && typeof r[0] != "number" && (process.env.NODE_ENV !== "production" && J(r.length === 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${r}`), b = qs([0, 100], r, {
    clamp: !1
  }), r = [0, 100]);
  const P = g({ ...f, keyframes: r });
  let D;
  a === "mirror" && (D = g({
    ...f,
    keyframes: [...r].reverse(),
    velocity: -(f.velocity || 0)
  }));
  let k = "idle", T = null, C = null, N = null;
  P.calculatedDuration === null && o && (P.calculatedDuration = rr(P));
  const { calculatedDuration: et } = P;
  let V = 1 / 0, _ = 1 / 0;
  et !== null && (V = et + i, _ = V * (o + 1) - i);
  let O = 0;
  const st = (M) => {
    if (C === null)
      return;
    h > 0 && (C = Math.min(C, M)), h < 0 && (C = Math.min(M - _ / h, C)), T !== null ? O = T : O = Math.round(M - C) * h;
    const nt = O - e * (h >= 0 ? 1 : -1), z = h >= 0 ? nt < 0 : nt > _;
    O = Math.max(nt, 0), k === "finished" && T === null && (O = _);
    let En = O, Bn = P;
    if (o) {
      const Le = Math.min(O, _) / V;
      let ie = Math.floor(Le), wt = Le % 1;
      !wt && Le >= 1 && (wt = 1), wt === 1 && ie--, ie = Math.min(ie, o + 1), !!(ie % 2) && (a === "reverse" ? (wt = 1 - wt, i && (wt -= i / V)) : a === "mirror" && (Bn = D)), En = yt(0, 1, wt) * V;
    }
    const Nt = z ? { done: !1, value: r[0] } : Bn.next(En);
    b && (Nt.value = b(Nt.value));
    let { done: Fn } = Nt;
    !z && et !== null && (Fn = h >= 0 ? O >= _ : O <= 0);
    const Ci = T === null && (k === "finished" || k === "running" && Fn);
    return d && d(Nt.value), Ci && it(), Nt;
  }, B = () => {
    y && y.stop(), y = void 0;
  }, Q = () => {
    k = "idle", B(), m(), x(), C = N = null;
  }, it = () => {
    k = "finished", u && u(), B(), m();
  }, Y = () => {
    if (p)
      return;
    y || (y = n(st));
    const M = y.now();
    l && l(), T !== null ? C = M - T : (!C || k === "finished") && (C = M), k === "finished" && x(), N = C, T = null, k = "running", y.start();
  };
  t && Y();
  const jt = {
    then(M, nt) {
      return v.then(M, nt);
    },
    get time() {
      return lt(O);
    },
    set time(M) {
      M = mt(M), O = M, T !== null || !y || h === 0 ? T = M : C = y.now() - M / h;
    },
    get duration() {
      const M = P.calculatedDuration === null ? rr(P) : P.calculatedDuration;
      return lt(M);
    },
    get speed() {
      return h;
    },
    set speed(M) {
      M === h || !y || (h = M, jt.time = lt(O));
    },
    get state() {
      return k;
    },
    play: Y,
    pause: () => {
      k = "paused", T = O;
    },
    stop: () => {
      p = !0, k !== "idle" && (k = "idle", c && c(), Q());
    },
    cancel: () => {
      N !== null && st(N), Q();
    },
    complete: () => {
      k = "finished";
    },
    sample: (M) => (C = 0, st(M))
  };
  return jt;
}
function Ja(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const Qa = Ja(() => Object.hasOwnProperty.call(Element.prototype, "animate")), tl = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform",
  "backgroundColor"
]), ce = 10, el = 2e4, nl = (t, e) => e.type === "spring" || t === "backgroundColor" || !Ds(e.ease);
function rl(t, e, { onUpdate: n, onComplete: r, ...s }) {
  if (!(Qa() && tl.has(e) && !s.repeatDelay && s.repeatType !== "mirror" && s.damping !== 0 && s.type !== "inertia"))
    return !1;
  let i = !1, a, l, c = !1;
  const u = () => {
    l = new Promise((g) => {
      a = g;
    });
  };
  u();
  let { keyframes: d, duration: f = 300, ease: h, times: p } = s;
  if (nl(e, s)) {
    const g = be({
      ...s,
      repeat: 0,
      delay: 0
    });
    let b = { done: !1, value: d[0] };
    const P = [];
    let D = 0;
    for (; !b.done && D < el; )
      b = g.sample(D), P.push(b.value), D += ce;
    p = void 0, d = P, f = D - ce, h = "linear";
  }
  const m = pa(t.owner.current, e, d, {
    ...s,
    duration: f,
    /**
     * This function is currently not called if ease is provided
     * as a function so the cast is safe.
     *
     * However it would be possible for a future refinement to port
     * in easing pregeneration from Motion One for browsers that
     * support the upcoming `linear()` easing function.
     */
    ease: h,
    times: p
  }), v = () => {
    c = !1, m.cancel();
  }, x = () => {
    c = !0, R.update(v), a(), u();
  };
  return m.onfinish = () => {
    c || (t.set(ma(d, s)), r && r(), x());
  }, {
    then(g, b) {
      return l.then(g, b);
    },
    attachTimeline(g) {
      return m.timeline = g, m.onfinish = null, F;
    },
    get time() {
      return lt(m.currentTime || 0);
    },
    set time(g) {
      m.currentTime = mt(g);
    },
    get speed() {
      return m.playbackRate;
    },
    set speed(g) {
      m.playbackRate = g;
    },
    get duration() {
      return lt(f);
    },
    play: () => {
      i || (m.play(), ut(v));
    },
    pause: () => m.pause(),
    stop: () => {
      if (i = !0, m.playState === "idle")
        return;
      const { currentTime: g } = m;
      if (g) {
        const b = be({
          ...s,
          autoplay: !1
        });
        t.setWithVelocity(b.sample(g - ce).value, b.sample(g).value, ce);
      }
      x();
    },
    complete: () => {
      c || m.finish();
    },
    cancel: x
  };
}
function sl({ keyframes: t, delay: e, onUpdate: n, onComplete: r }) {
  const s = () => (n && n(t[t.length - 1]), r && r(), {
    time: 0,
    speed: 1,
    duration: 0,
    play: F,
    pause: F,
    stop: F,
    then: (o) => (o(), Promise.resolve()),
    cancel: F,
    complete: F
  });
  return e ? be({
    keyframes: [0, 1],
    duration: 0,
    delay: e,
    onComplete: s
  }) : s();
}
const il = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, ol = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), al = {
  type: "keyframes",
  duration: 0.8
}, ll = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, cl = (t, { keyframes: e }) => e.length > 2 ? al : Dt.has(t) ? t.startsWith("scale") ? ol(e[1]) : il : ll, Je = (t, e) => t === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && // It's animatable if we have a string
(vt.test(e) || e === "0") && // And it contains numbers and/or colors
!e.startsWith("url(")), ul = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function dl(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [r] = n.match(De) || [];
  if (!r)
    return t;
  const s = n.replace(r, "");
  let o = ul.has(e) ? 1 : 0;
  return r !== n && (o *= 100), e + "(" + o + s + ")";
}
const fl = /([a-z-]*)\(.*?\)/g, Qe = {
  ...vt,
  getAnimatableNone: (t) => {
    const e = t.match(fl);
    return e ? e.map(dl).join(" ") : t;
  }
}, hl = {
  ...fs,
  // Color props
  color: W,
  backgroundColor: W,
  outlineColor: W,
  fill: W,
  stroke: W,
  // Border props
  borderColor: W,
  borderTopColor: W,
  borderRightColor: W,
  borderBottomColor: W,
  borderLeftColor: W,
  filter: Qe,
  WebkitFilter: Qe
}, Vn = (t) => hl[t];
function Qs(t, e) {
  let n = Vn(t);
  return n !== Qe && (n = vt), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const ti = (t) => /^0[^.\s]+$/.test(t);
function pl(t) {
  if (typeof t == "number")
    return t === 0;
  if (t !== null)
    return t === "none" || t === "0" || ti(t);
}
function ml(t, e, n, r) {
  const s = Je(e, n);
  let o;
  Array.isArray(n) ? o = [...n] : o = [null, n];
  const i = r.from !== void 0 ? r.from : t.get();
  let a;
  const l = [];
  for (let c = 0; c < o.length; c++)
    o[c] === null && (o[c] = c === 0 ? i : o[c - 1]), pl(o[c]) && l.push(c), typeof o[c] == "string" && o[c] !== "none" && o[c] !== "0" && (a = o[c]);
  if (s && l.length && a)
    for (let c = 0; c < l.length; c++) {
      const u = l[c];
      o[u] = Qs(e, a);
    }
  return o;
}
function gl({ when: t, delay: e, delayChildren: n, staggerChildren: r, staggerDirection: s, repeat: o, repeatType: i, repeatDelay: a, from: l, elapsed: c, ...u }) {
  return !!Object.keys(u).length;
}
function An(t, e) {
  return t[e] || t.default || t;
}
const yl = {
  skipAnimations: !1
}, Cn = (t, e, n, r = {}) => (s) => {
  const o = An(r, t) || {}, i = o.delay || r.delay || 0;
  let { elapsed: a = 0 } = r;
  a = a - mt(i);
  const l = ml(e, t, n, o), c = l[0], u = l[l.length - 1], d = Je(t, c), f = Je(t, u);
  ne(d === f, `You are trying to animate ${t} from "${c}" to "${u}". ${c} is not an animatable value - to enable this animation set ${c} to a value animatable to ${u} via the \`style\` property.`);
  let h = {
    keyframes: l,
    velocity: e.getVelocity(),
    ease: "easeOut",
    ...o,
    delay: -a,
    onUpdate: (p) => {
      e.set(p), o.onUpdate && o.onUpdate(p);
    },
    onComplete: () => {
      s(), o.onComplete && o.onComplete();
    }
  };
  if (gl(o) || (h = {
    ...h,
    ...cl(t, h)
  }), h.duration && (h.duration = mt(h.duration)), h.repeatDelay && (h.repeatDelay = mt(h.repeatDelay)), !d || !f || ha.current || o.type === !1 || yl.skipAnimations)
    return sl(h);
  if (
    /**
     * If this is a handoff animation, the optimised animation will be running via
     * WAAPI. Therefore, this animation must be JS to ensure it runs "under" the
     * optimised animation.
     */
    !r.isHandoff && e.owner && e.owner.current instanceof HTMLElement && /**
     * If we're outputting values to onUpdate then we can't use WAAPI as there's
     * no way to read the value from WAAPI every frame.
     */
    !e.owner.getProps().onUpdate
  ) {
    const p = rl(e, t, h);
    if (p)
      return p;
  }
  return be(h);
};
function xe(t) {
  return !!(H(t) && t.add);
}
const ei = (t) => /^\-?\d*\.?\d+$/.test(t);
function Mn(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function Dn(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
class kn {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return Mn(this.subscriptions, e), () => Dn(this.subscriptions, e);
  }
  notify(e, n, r) {
    const s = this.subscriptions.length;
    if (s)
      if (s === 1)
        this.subscriptions[0](e, n, r);
      else
        for (let o = 0; o < s; o++) {
          const i = this.subscriptions[o];
          i && i(e, n, r);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const sr = /* @__PURE__ */ new Set();
function Rn(t, e, n) {
  t || sr.has(e) || (console.warn(e), sr.add(e));
}
const vl = (t) => !isNaN(parseFloat(t));
class bl {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   *
   * @internal
   */
  constructor(e, n = {}) {
    this.version = "10.18.0", this.timeDelta = 0, this.lastUpdated = 0, this.canTrackVelocity = !1, this.events = {}, this.updateAndNotify = (r, s = !0) => {
      this.prev = this.current, this.current = r;
      const { delta: o, timestamp: i } = G;
      this.lastUpdated !== i && (this.timeDelta = o, this.lastUpdated = i, R.postRender(this.scheduleVelocityCheck)), this.prev !== this.current && this.events.change && this.events.change.notify(this.current), this.events.velocityChange && this.events.velocityChange.notify(this.getVelocity()), s && this.events.renderRequest && this.events.renderRequest.notify(this.current);
    }, this.scheduleVelocityCheck = () => R.postRender(this.velocityCheck), this.velocityCheck = ({ timestamp: r }) => {
      r !== this.lastUpdated && (this.prev = this.current, this.events.velocityChange && this.events.velocityChange.notify(this.getVelocity()));
    }, this.hasAnimated = !1, this.prev = this.current = e, this.canTrackVelocity = vl(this.current), this.owner = n.owner;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(e) {
    return process.env.NODE_ENV !== "production" && Rn(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", e);
  }
  on(e, n) {
    this.events[e] || (this.events[e] = new kn());
    const r = this.events[e].add(n);
    return e === "change" ? () => {
      r(), R.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : r;
  }
  clearListeners() {
    for (const e in this.events)
      this.events[e].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   *
   * @internal
   */
  attach(e, n) {
    this.passiveEffect = e, this.stopPassiveEffect = n;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(e, n = !0) {
    !n || !this.passiveEffect ? this.updateAndNotify(e, n) : this.passiveEffect(e, this.updateAndNotify);
  }
  setWithVelocity(e, n, r) {
    this.set(n), this.prev = e, this.timeDelta = r;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(e) {
    this.updateAndNotify(e), this.prev = e, this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    return this.canTrackVelocity ? (
      // These casts could be avoided if parseFloat would be typed better
      Xs(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta)
    ) : 0;
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   *
   * @internal
   */
  start(e) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = e(n), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Ot(t, e) {
  return new bl(t, e);
}
const ni = (t) => (e) => e.test(t), xl = {
  test: (t) => t === "auto",
  parse: (t) => t
}, ri = [kt, w, rt, ft, Do, Mo, xl], Ut = (t) => ri.find(ni(t)), wl = [...ri, W, vt], Pl = (t) => wl.find(ni(t));
function Tl(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, Ot(n));
}
function Sl(t, e) {
  const n = Re(t, e);
  let { transitionEnd: r = {}, transition: s = {}, ...o } = n ? t.makeTargetAnimatable(n, !1) : {};
  o = { ...o, ...r };
  for (const i in o) {
    const a = Wo(o[i]);
    Tl(t, i, a);
  }
}
function Vl(t, e, n) {
  var r, s;
  const o = Object.keys(e).filter((a) => !t.hasValue(a)), i = o.length;
  if (i)
    for (let a = 0; a < i; a++) {
      const l = o[a], c = e[l];
      let u = null;
      Array.isArray(c) && (u = c[0]), u === null && (u = (s = (r = n[l]) !== null && r !== void 0 ? r : t.readValue(l)) !== null && s !== void 0 ? s : e[l]), u != null && (typeof u == "string" && (ei(u) || ti(u)) ? u = parseFloat(u) : !Pl(u) && vt.test(c) && (u = Qs(l, c)), t.addValue(l, Ot(u, { owner: t })), n[l] === void 0 && (n[l] = u), u !== null && t.setBaseTarget(l, u));
    }
}
function Al(t, e) {
  return e ? (e[t] || e.default || e).from : void 0;
}
function Cl(t, e, n) {
  const r = {};
  for (const s in t) {
    const o = Al(s, e);
    if (o !== void 0)
      r[s] = o;
    else {
      const i = n.getValue(s);
      i && (r[s] = i.get());
    }
  }
  return r;
}
function Ml({ protectedKeys: t, needsAnimating: e }, n) {
  const r = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, r;
}
function Dl(t, e) {
  const n = t.get();
  if (Array.isArray(e)) {
    for (let r = 0; r < e.length; r++)
      if (e[r] !== n)
        return !0;
  } else
    return n !== e;
}
function si(t, e, { delay: n = 0, transitionOverride: r, type: s } = {}) {
  let { transition: o = t.getDefaultTransition(), transitionEnd: i, ...a } = t.makeTargetAnimatable(e);
  const l = t.getValue("willChange");
  r && (o = r);
  const c = [], u = s && t.animationState && t.animationState.getState()[s];
  for (const d in a) {
    const f = t.getValue(d), h = a[d];
    if (!f || h === void 0 || u && Ml(u, d))
      continue;
    const p = {
      delay: n,
      elapsed: 0,
      ...An(o || {}, d)
    };
    if (window.HandoffAppearAnimations) {
      const x = t.getProps()[is];
      if (x) {
        const y = window.HandoffAppearAnimations(x, d, f, R);
        y !== null && (p.elapsed = y, p.isHandoff = !0);
      }
    }
    let m = !p.isHandoff && !Dl(f, h);
    if (p.type === "spring" && (f.getVelocity() || p.velocity) && (m = !1), f.animation && (m = !1), m)
      continue;
    f.start(Cn(d, f, h, t.shouldReduceMotion && Dt.has(d) ? { type: !1 } : p));
    const v = f.animation;
    xe(l) && (l.add(d), v.then(() => l.remove(d))), c.push(v);
  }
  return i && Promise.all(c).then(() => {
    i && Sl(t, i);
  }), c;
}
function tn(t, e, n = {}) {
  const r = Re(t, e, n.custom);
  let { transition: s = t.getDefaultTransition() || {} } = r || {};
  n.transitionOverride && (s = n.transitionOverride);
  const o = r ? () => Promise.all(si(t, r, n)) : () => Promise.resolve(), i = t.variantChildren && t.variantChildren.size ? (l = 0) => {
    const { delayChildren: c = 0, staggerChildren: u, staggerDirection: d } = s;
    return kl(t, e, c + l, u, d, n);
  } : () => Promise.resolve(), { when: a } = s;
  if (a) {
    const [l, c] = a === "beforeChildren" ? [o, i] : [i, o];
    return l().then(() => c());
  } else
    return Promise.all([o(), i(n.delay)]);
}
function kl(t, e, n = 0, r = 0, s = 1, o) {
  const i = [], a = (t.variantChildren.size - 1) * r, l = s === 1 ? (c = 0) => c * r : (c = 0) => a - c * r;
  return Array.from(t.variantChildren).sort(Rl).forEach((c, u) => {
    c.notify("AnimationStart", e), i.push(tn(c, e, {
      ...o,
      delay: n + l(u)
    }).then(() => c.notify("AnimationComplete", e)));
  }), Promise.all(i);
}
function Rl(t, e) {
  return t.sortNodePosition(e);
}
function Ll(t, e, n = {}) {
  t.notify("AnimationStart", e);
  let r;
  if (Array.isArray(e)) {
    const s = e.map((o) => tn(t, o, n));
    r = Promise.all(s);
  } else if (typeof e == "string")
    r = tn(t, e, n);
  else {
    const s = typeof e == "function" ? Re(t, e, n.custom) : e;
    r = Promise.all(si(t, s, n));
  }
  return r.then(() => t.notify("AnimationComplete", e));
}
const El = [...fn].reverse(), Bl = fn.length;
function Fl(t) {
  return (e) => Promise.all(e.map(({ animation: n, options: r }) => Ll(t, n, r)));
}
function Ol(t) {
  let e = Fl(t);
  const n = jl();
  let r = !0;
  const s = (l, c) => {
    const u = Re(t, c);
    if (u) {
      const { transition: d, transitionEnd: f, ...h } = u;
      l = { ...l, ...h, ...f };
    }
    return l;
  };
  function o(l) {
    e = l(t);
  }
  function i(l, c) {
    const u = t.getProps(), d = t.getVariantContext(!0) || {}, f = [], h = /* @__PURE__ */ new Set();
    let p = {}, m = 1 / 0;
    for (let x = 0; x < Bl; x++) {
      const y = El[x], g = n[y], b = u[y] !== void 0 ? u[y] : d[y], P = qt(b), D = y === c ? g.isActive : null;
      D === !1 && (m = x);
      let k = b === d[y] && b !== u[y] && P;
      if (k && r && t.manuallyAnimateOnMount && (k = !1), g.protectedKeys = { ...p }, // If it isn't active and hasn't *just* been set as inactive
      !g.isActive && D === null || // If we didn't and don't have any defined prop for this animation type
      !b && !g.prevProp || // Or if the prop doesn't define an animation
      Ce(b) || typeof b == "boolean")
        continue;
      let C = Il(g.prevProp, b) || // If we're making this variant active, we want to always make it active
      y === c && g.isActive && !k && P || // If we removed a higher-priority variant (i is in reverse order)
      x > m && P, N = !1;
      const et = Array.isArray(b) ? b : [b];
      let V = et.reduce(s, {});
      D === !1 && (V = {});
      const { prevResolvedValues: _ = {} } = g, O = {
        ..._,
        ...V
      }, st = (B) => {
        C = !0, h.has(B) && (N = !0, h.delete(B)), g.needsAnimating[B] = !0;
      };
      for (const B in O) {
        const Q = V[B], it = _[B];
        if (p.hasOwnProperty(B))
          continue;
        let Y = !1;
        ge(Q) && ge(it) ? Y = !Cs(Q, it) : Y = Q !== it, Y ? Q !== void 0 ? st(B) : h.add(B) : Q !== void 0 && h.has(B) ? st(B) : g.protectedKeys[B] = !0;
      }
      g.prevProp = b, g.prevResolvedValues = V, g.isActive && (p = { ...p, ...V }), r && t.blockInitialAnimation && (C = !1), C && (!k || N) && f.push(...et.map((B) => ({
        animation: B,
        options: { type: y, ...l }
      })));
    }
    if (h.size) {
      const x = {};
      h.forEach((y) => {
        const g = t.getBaseTarget(y);
        g !== void 0 && (x[y] = g);
      }), f.push({ animation: x });
    }
    let v = !!f.length;
    return r && (u.initial === !1 || u.initial === u.animate) && !t.manuallyAnimateOnMount && (v = !1), r = !1, v ? e(f) : Promise.resolve();
  }
  function a(l, c, u) {
    var d;
    if (n[l].isActive === c)
      return Promise.resolve();
    (d = t.variantChildren) === null || d === void 0 || d.forEach((h) => {
      var p;
      return (p = h.animationState) === null || p === void 0 ? void 0 : p.setActive(l, c);
    }), n[l].isActive = c;
    const f = i(u, l);
    for (const h in n)
      n[h].protectedKeys = {};
    return f;
  }
  return {
    animateChanges: i,
    setActive: a,
    setAnimateFunction: o,
    getState: () => n
  };
}
function Il(t, e) {
  return typeof e == "string" ? e !== t : Array.isArray(e) ? !Cs(e, t) : !1;
}
function Pt(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function jl() {
  return {
    animate: Pt(!0),
    whileInView: Pt(),
    whileHover: Pt(),
    whileTap: Pt(),
    whileDrag: Pt(),
    whileFocus: Pt(),
    exit: Pt()
  };
}
class Nl extends xt {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(e) {
    super(e), e.animationState || (e.animationState = Ol(e));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    this.unmount(), Ce(e) && (this.unmount = e.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: e } = this.node.getProps(), { animate: n } = this.node.prevProps || {};
    e !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
  }
}
let zl = 0;
class Gl extends xt {
  constructor() {
    super(...arguments), this.id = zl++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: e, onExitComplete: n, custom: r } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || e === s)
      return;
    const o = this.node.animationState.setActive("exit", !e, { custom: r ?? this.node.getProps().custom });
    n && !e && o.then(() => n(this.id));
  }
  mount() {
    const { register: e } = this.node.presenceContext || {};
    e && (this.unmount = e(this.id));
  }
  unmount() {
  }
}
const Ul = {
  animation: {
    Feature: Nl
  },
  exit: {
    Feature: Gl
  }
}, ir = (t, e) => Math.abs(t - e);
function Wl(t, e) {
  const n = ir(t.x, e.x), r = ir(t.y, e.y);
  return Math.sqrt(n ** 2 + r ** 2);
}
class ii {
  constructor(e, n, { transformPagePoint: r, contextWindow: s, dragSnapToOrigin: o = !1 } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const d = Ge(this.lastMoveEventInfo, this.history), f = this.startEvent !== null, h = Wl(d.offset, { x: 0, y: 0 }) >= 3;
      if (!f && !h)
        return;
      const { point: p } = d, { timestamp: m } = G;
      this.history.push({ ...p, timestamp: m });
      const { onStart: v, onMove: x } = this.handlers;
      f || (v && v(this.lastMoveEvent, d), this.startEvent = this.lastMoveEvent), x && x(this.lastMoveEvent, d);
    }, this.handlePointerMove = (d, f) => {
      this.lastMoveEvent = d, this.lastMoveEventInfo = ze(f, this.transformPagePoint), R.update(this.updatePoint, !0);
    }, this.handlePointerUp = (d, f) => {
      this.end();
      const { onEnd: h, onSessionEnd: p, resumeAnimation: m } = this.handlers;
      if (this.dragSnapToOrigin && m && m(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const v = Ge(d.type === "pointercancel" ? this.lastMoveEventInfo : ze(f, this.transformPagePoint), this.history);
      this.startEvent && h && h(d, v), p && p(d, v);
    }, !Ps(e))
      return;
    this.dragSnapToOrigin = o, this.handlers = n, this.transformPagePoint = r, this.contextWindow = s || window;
    const i = ke(e), a = ze(i, this.transformPagePoint), { point: l } = a, { timestamp: c } = G;
    this.history = [{ ...l, timestamp: c }];
    const { onSessionStart: u } = n;
    u && u(e, Ge(a, this.history)), this.removeListeners = pt(at(this.contextWindow, "pointermove", this.handlePointerMove), at(this.contextWindow, "pointerup", this.handlePointerUp), at(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    this.removeListeners && this.removeListeners(), ut(this.updatePoint);
  }
}
function ze(t, e) {
  return e ? { point: e(t.point) } : t;
}
function or(t, e) {
  return { x: t.x - e.x, y: t.y - e.y };
}
function Ge({ point: t }, e) {
  return {
    point: t,
    delta: or(t, oi(e)),
    offset: or(t, $l(e)),
    velocity: Hl(e, 0.1)
  };
}
function $l(t) {
  return t[0];
}
function oi(t) {
  return t[t.length - 1];
}
function Hl(t, e) {
  if (t.length < 2)
    return { x: 0, y: 0 };
  let n = t.length - 1, r = null;
  const s = oi(t);
  for (; n >= 0 && (r = t[n], !(s.timestamp - r.timestamp > mt(e))); )
    n--;
  if (!r)
    return { x: 0, y: 0 };
  const o = lt(s.timestamp - r.timestamp);
  if (o === 0)
    return { x: 0, y: 0 };
  const i = {
    x: (s.x - r.x) / o,
    y: (s.y - r.y) / o
  };
  return i.x === 1 / 0 && (i.x = 0), i.y === 1 / 0 && (i.y = 0), i;
}
function K(t) {
  return t.max - t.min;
}
function en(t, e = 0, n = 0.01) {
  return Math.abs(t - e) <= n;
}
function ar(t, e, n, r = 0.5) {
  t.origin = r, t.originPoint = E(e.min, e.max, t.origin), t.scale = K(n) / K(e), (en(t.scale, 1, 1e-4) || isNaN(t.scale)) && (t.scale = 1), t.translate = E(n.min, n.max, t.origin) - t.originPoint, (en(t.translate) || isNaN(t.translate)) && (t.translate = 0);
}
function _t(t, e, n, r) {
  ar(t.x, e.x, n.x, r ? r.originX : void 0), ar(t.y, e.y, n.y, r ? r.originY : void 0);
}
function lr(t, e, n) {
  t.min = n.min + e.min, t.max = t.min + K(e);
}
function Kl(t, e, n) {
  lr(t.x, e.x, n.x), lr(t.y, e.y, n.y);
}
function cr(t, e, n) {
  t.min = e.min - n.min, t.max = t.min + K(e);
}
function Yt(t, e, n) {
  cr(t.x, e.x, n.x), cr(t.y, e.y, n.y);
}
function _l(t, { min: e, max: n }, r) {
  return e !== void 0 && t < e ? t = r ? E(e, t, r.min) : Math.max(t, e) : n !== void 0 && t > n && (t = r ? E(n, t, r.max) : Math.min(t, n)), t;
}
function ur(t, e, n) {
  return {
    min: e !== void 0 ? t.min + e : void 0,
    max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0
  };
}
function Yl(t, { top: e, left: n, bottom: r, right: s }) {
  return {
    x: ur(t.x, n, s),
    y: ur(t.y, e, r)
  };
}
function dr(t, e) {
  let n = e.min - t.min, r = e.max - t.max;
  return e.max - e.min < t.max - t.min && ([n, r] = [r, n]), { min: n, max: r };
}
function ql(t, e) {
  return {
    x: dr(t.x, e.x),
    y: dr(t.y, e.y)
  };
}
function Xl(t, e) {
  let n = 0.5;
  const r = K(t), s = K(e);
  return s > r ? n = Zt(e.min, e.max - r, t.min) : r > s && (n = Zt(t.min, t.max - s, e.min)), yt(0, 1, n);
}
function Zl(t, e) {
  const n = {};
  return e.min !== void 0 && (n.min = e.min - t.min), e.max !== void 0 && (n.max = e.max - t.min), n;
}
const nn = 0.35;
function Jl(t = nn) {
  return t === !1 ? t = 0 : t === !0 && (t = nn), {
    x: fr(t, "left", "right"),
    y: fr(t, "top", "bottom")
  };
}
function fr(t, e, n) {
  return {
    min: hr(t, e),
    max: hr(t, n)
  };
}
function hr(t, e) {
  return typeof t == "number" ? t : t[e] || 0;
}
const pr = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Et = () => ({
  x: pr(),
  y: pr()
}), mr = () => ({ min: 0, max: 0 }), I = () => ({
  x: mr(),
  y: mr()
});
function X(t) {
  return [t("x"), t("y")];
}
function ai({ top: t, left: e, right: n, bottom: r }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: r }
  };
}
function Ql({ x: t, y: e }) {
  return { top: e.min, right: t.max, bottom: e.max, left: t.min };
}
function tc(t, e) {
  if (!e)
    return t;
  const n = e({ x: t.left, y: t.top }), r = e({ x: t.right, y: t.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: r.y,
    right: r.x
  };
}
function Ue(t) {
  return t === void 0 || t === 1;
}
function rn({ scale: t, scaleX: e, scaleY: n }) {
  return !Ue(t) || !Ue(e) || !Ue(n);
}
function Tt(t) {
  return rn(t) || li(t) || t.z || t.rotate || t.rotateX || t.rotateY;
}
function li(t) {
  return gr(t.x) || gr(t.y);
}
function gr(t) {
  return t && t !== "0%";
}
function we(t, e, n) {
  const r = t - n, s = e * r;
  return n + s;
}
function yr(t, e, n, r, s) {
  return s !== void 0 && (t = we(t, s, r)), we(t, n, r) + e;
}
function sn(t, e = 0, n = 1, r, s) {
  t.min = yr(t.min, e, n, r, s), t.max = yr(t.max, e, n, r, s);
}
function ci(t, { x: e, y: n }) {
  sn(t.x, e.translate, e.scale, e.originPoint), sn(t.y, n.translate, n.scale, n.originPoint);
}
function ec(t, e, n, r = !1) {
  const s = n.length;
  if (!s)
    return;
  e.x = e.y = 1;
  let o, i;
  for (let a = 0; a < s; a++) {
    o = n[a], i = o.projectionDelta;
    const l = o.instance;
    l && l.style && l.style.display === "contents" || (r && o.options.layoutScroll && o.scroll && o !== o.root && Bt(t, {
      x: -o.scroll.offset.x,
      y: -o.scroll.offset.y
    }), i && (e.x *= i.x.scale, e.y *= i.y.scale, ci(t, i)), r && Tt(o.latestValues) && Bt(t, o.latestValues));
  }
  e.x = vr(e.x), e.y = vr(e.y);
}
function vr(t) {
  return Number.isInteger(t) || t > 1.0000000000001 || t < 0.999999999999 ? t : 1;
}
function ht(t, e) {
  t.min = t.min + e, t.max = t.max + e;
}
function br(t, e, [n, r, s]) {
  const o = e[s] !== void 0 ? e[s] : 0.5, i = E(t.min, t.max, o);
  sn(t, e[n], e[r], i, e.scale);
}
const nc = ["x", "scaleX", "originX"], rc = ["y", "scaleY", "originY"];
function Bt(t, e) {
  br(t.x, e, nc), br(t.y, e, rc);
}
function ui(t, e) {
  return ai(tc(t.getBoundingClientRect(), e));
}
function sc(t, e, n) {
  const r = ui(t, n), { scroll: s } = e;
  return s && (ht(r.x, s.offset.x), ht(r.y, s.offset.y)), r;
}
const di = ({ current: t }) => t ? t.ownerDocument.defaultView : null, ic = /* @__PURE__ */ new WeakMap();
class oc {
  constructor(e) {
    this.openGlobalLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = I(), this.visualElement = e;
  }
  start(e, { snapToCursor: n = !1 } = {}) {
    const { presenceContext: r } = this.visualElement;
    if (r && r.isPresent === !1)
      return;
    const s = (u) => {
      const { dragSnapToOrigin: d } = this.getProps();
      d ? this.pauseAnimation() : this.stopAnimation(), n && this.snapToCursor(ke(u, "page").point);
    }, o = (u, d) => {
      const { drag: f, dragPropagation: h, onDragStart: p } = this.getProps();
      if (f && !h && (this.openGlobalLock && this.openGlobalLock(), this.openGlobalLock = Ss(f), !this.openGlobalLock))
        return;
      this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), X((v) => {
        let x = this.getAxisMotionValue(v).get() || 0;
        if (rt.test(x)) {
          const { projection: y } = this.visualElement;
          if (y && y.layout) {
            const g = y.layout.layoutBox[v];
            g && (x = K(g) * (parseFloat(x) / 100));
          }
        }
        this.originPoint[v] = x;
      }), p && R.update(() => p(u, d), !1, !0);
      const { animationState: m } = this.visualElement;
      m && m.setActive("whileDrag", !0);
    }, i = (u, d) => {
      const { dragPropagation: f, dragDirectionLock: h, onDirectionLock: p, onDrag: m } = this.getProps();
      if (!f && !this.openGlobalLock)
        return;
      const { offset: v } = d;
      if (h && this.currentDirection === null) {
        this.currentDirection = ac(v), this.currentDirection !== null && p && p(this.currentDirection);
        return;
      }
      this.updateAxis("x", d.point, v), this.updateAxis("y", d.point, v), this.visualElement.render(), m && m(u, d);
    }, a = (u, d) => this.stop(u, d), l = () => X((u) => {
      var d;
      return this.getAnimationState(u) === "paused" && ((d = this.getAxisMotionValue(u).animation) === null || d === void 0 ? void 0 : d.play());
    }), { dragSnapToOrigin: c } = this.getProps();
    this.panSession = new ii(e, {
      onSessionStart: s,
      onStart: o,
      onMove: i,
      onSessionEnd: a,
      resumeAnimation: l
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: c,
      contextWindow: di(this.visualElement)
    });
  }
  stop(e, n) {
    const r = this.isDragging;
    if (this.cancel(), !r)
      return;
    const { velocity: s } = n;
    this.startAnimation(s);
    const { onDragEnd: o } = this.getProps();
    o && R.update(() => o(e, n));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: e, animationState: n } = this.visualElement;
    e && (e.isAnimationBlocked = !1), this.panSession && this.panSession.end(), this.panSession = void 0;
    const { dragPropagation: r } = this.getProps();
    !r && this.openGlobalLock && (this.openGlobalLock(), this.openGlobalLock = null), n && n.setActive("whileDrag", !1);
  }
  updateAxis(e, n, r) {
    const { drag: s } = this.getProps();
    if (!r || !ue(e, s, this.currentDirection))
      return;
    const o = this.getAxisMotionValue(e);
    let i = this.originPoint[e] + r[e];
    this.constraints && this.constraints[e] && (i = _l(i, this.constraints[e], this.elastic[e])), o.set(i);
  }
  resolveConstraints() {
    var e;
    const { dragConstraints: n, dragElastic: r } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : (e = this.visualElement.projection) === null || e === void 0 ? void 0 : e.layout, o = this.constraints;
    n && Rt(n) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : n && s ? this.constraints = Yl(s.layoutBox, n) : this.constraints = !1, this.elastic = Jl(r), o !== this.constraints && s && this.constraints && !this.hasMutatedConstraints && X((i) => {
      this.getAxisMotionValue(i) && (this.constraints[i] = Zl(s.layoutBox[i], this.constraints[i]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: n } = this.getProps();
    if (!e || !Rt(e))
      return !1;
    const r = e.current;
    J(r !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
    const { projection: s } = this.visualElement;
    if (!s || !s.layout)
      return !1;
    const o = sc(r, s.root, this.visualElement.getTransformPagePoint());
    let i = ql(s.layout.layoutBox, o);
    if (n) {
      const a = n(Ql(i));
      this.hasMutatedConstraints = !!a, a && (i = ai(a));
    }
    return i;
  }
  startAnimation(e) {
    const { drag: n, dragMomentum: r, dragElastic: s, dragTransition: o, dragSnapToOrigin: i, onDragTransitionEnd: a } = this.getProps(), l = this.constraints || {}, c = X((u) => {
      if (!ue(u, n, this.currentDirection))
        return;
      let d = l[u] || {};
      i && (d = { min: 0, max: 0 });
      const f = s ? 200 : 1e6, h = s ? 40 : 1e7, p = {
        type: "inertia",
        velocity: r ? e[u] : 0,
        bounceStiffness: f,
        bounceDamping: h,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...o,
        ...d
      };
      return this.startAxisValueAnimation(u, p);
    });
    return Promise.all(c).then(a);
  }
  startAxisValueAnimation(e, n) {
    const r = this.getAxisMotionValue(e);
    return r.start(Cn(e, r, 0, n));
  }
  stopAnimation() {
    X((e) => this.getAxisMotionValue(e).stop());
  }
  pauseAnimation() {
    X((e) => {
      var n;
      return (n = this.getAxisMotionValue(e).animation) === null || n === void 0 ? void 0 : n.pause();
    });
  }
  getAnimationState(e) {
    var n;
    return (n = this.getAxisMotionValue(e).animation) === null || n === void 0 ? void 0 : n.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(e) {
    const n = "_drag" + e.toUpperCase(), r = this.visualElement.getProps(), s = r[n];
    return s || this.visualElement.getValue(e, (r.initial ? r.initial[e] : void 0) || 0);
  }
  snapToCursor(e) {
    X((n) => {
      const { drag: r } = this.getProps();
      if (!ue(n, r, this.currentDirection))
        return;
      const { projection: s } = this.visualElement, o = this.getAxisMotionValue(n);
      if (s && s.layout) {
        const { min: i, max: a } = s.layout.layoutBox[n];
        o.set(e[n] - E(i, a, 0.5));
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: e, dragConstraints: n } = this.getProps(), { projection: r } = this.visualElement;
    if (!Rt(n) || !r || !this.constraints)
      return;
    this.stopAnimation();
    const s = { x: 0, y: 0 };
    X((i) => {
      const a = this.getAxisMotionValue(i);
      if (a) {
        const l = a.get();
        s[i] = Xl({ min: l, max: l }, this.constraints[i]);
      }
    });
    const { transformTemplate: o } = this.visualElement.getProps();
    this.visualElement.current.style.transform = o ? o({}, "") : "none", r.root && r.root.updateScroll(), r.updateLayout(), this.resolveConstraints(), X((i) => {
      if (!ue(i, e, null))
        return;
      const a = this.getAxisMotionValue(i), { min: l, max: c } = this.constraints[i];
      a.set(E(l, c, s[i]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    ic.set(this.visualElement, this);
    const e = this.visualElement.current, n = at(e, "pointerdown", (l) => {
      const { drag: c, dragListener: u = !0 } = this.getProps();
      c && u && this.start(l);
    }), r = () => {
      const { dragConstraints: l } = this.getProps();
      Rt(l) && (this.constraints = this.resolveRefConstraints());
    }, { projection: s } = this.visualElement, o = s.addEventListener("measure", r);
    s && !s.layout && (s.root && s.root.updateScroll(), s.updateLayout()), r();
    const i = ot(window, "resize", () => this.scalePositionWithinConstraints()), a = s.addEventListener("didUpdate", ({ delta: l, hasLayoutChanged: c }) => {
      this.isDragging && c && (X((u) => {
        const d = this.getAxisMotionValue(u);
        d && (this.originPoint[u] += l[u].translate, d.set(d.get() + l[u].translate));
      }), this.visualElement.render());
    });
    return () => {
      i(), n(), o(), a && a();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(), { drag: n = !1, dragDirectionLock: r = !1, dragPropagation: s = !1, dragConstraints: o = !1, dragElastic: i = nn, dragMomentum: a = !0 } = e;
    return {
      ...e,
      drag: n,
      dragDirectionLock: r,
      dragPropagation: s,
      dragConstraints: o,
      dragElastic: i,
      dragMomentum: a
    };
  }
}
function ue(t, e, n) {
  return (e === !0 || e === t) && (n === null || n === t);
}
function ac(t, e = 10) {
  let n = null;
  return Math.abs(t.y) > e ? n = "y" : Math.abs(t.x) > e && (n = "x"), n;
}
class lc extends xt {
  constructor(e) {
    super(e), this.removeGroupControls = F, this.removeListeners = F, this.controls = new oc(e);
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || F;
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const xr = (t) => (e, n) => {
  t && R.update(() => t(e, n));
};
class cc extends xt {
  constructor() {
    super(...arguments), this.removePointerDownListener = F;
  }
  onPointerDown(e) {
    this.session = new ii(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: di(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: n, onPan: r, onPanEnd: s } = this.node.getProps();
    return {
      onSessionStart: xr(e),
      onStart: xr(n),
      onMove: r,
      onEnd: (o, i) => {
        delete this.session, s && R.update(() => s(o, i));
      }
    };
  }
  mount() {
    this.removePointerDownListener = at(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
function uc() {
  const t = j(Ve);
  if (t === null)
    return [!0, null];
  const { isPresent: e, onExitComplete: n, register: r } = t, s = ln();
  return Jt(() => r(s), []), !e && n ? [!1, () => n && n(s)] : [!0];
}
const he = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
};
function wr(t, e) {
  return e.max === e.min ? 0 : t / (e.max - e.min) * 100;
}
const Wt = {
  correct: (t, e) => {
    if (!e.target)
      return t;
    if (typeof t == "string")
      if (w.test(t))
        t = parseFloat(t);
      else
        return t;
    const n = wr(t, e.target.x), r = wr(t, e.target.y);
    return `${n}% ${r}%`;
  }
}, dc = {
  correct: (t, { treeScale: e, projectionDelta: n }) => {
    const r = t, s = vt.parse(t);
    if (s.length > 5)
      return r;
    const o = vt.createTransformer(t), i = typeof s[0] != "number" ? 1 : 0, a = n.x.scale * e.x, l = n.y.scale * e.y;
    s[0 + i] /= a, s[1 + i] /= l;
    const c = E(a, l, 0.5);
    return typeof s[2 + i] == "number" && (s[2 + i] /= c), typeof s[3 + i] == "number" && (s[3 + i] /= c), o(s);
  }
};
class fc extends Kr.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: r, layoutId: s } = this.props, { projection: o } = e;
    wo(hc), o && (n.group && n.group.add(o), r && r.register && s && r.register(o), o.root.didUpdate(), o.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), o.setOptions({
      ...o.options,
      onExitComplete: () => this.safeToRemove()
    })), he.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: n, visualElement: r, drag: s, isPresent: o } = this.props, i = r.projection;
    return i && (i.isPresent = o, s || e.layoutDependency !== n || n === void 0 ? i.willUpdate() : this.safeToRemove(), e.isPresent !== o && (o ? i.promote() : i.relegate() || R.postRender(() => {
      const a = i.getStack();
      (!a || !a.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: e } = this.props.visualElement;
    e && (e.root.didUpdate(), queueMicrotask(() => {
      !e.currentAnimation && e.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: r } = this.props, { projection: s } = e;
    s && (s.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(s), r && r.deregister && r.deregister(s));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function fi(t) {
  const [e, n] = uc(), r = j(pn);
  return Kr.createElement(fc, { ...t, layoutGroup: r, switchLayoutGroup: j(as), isPresent: e, safeToRemove: n });
}
const hc = {
  borderRadius: {
    ...Wt,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Wt,
  borderTopRightRadius: Wt,
  borderBottomLeftRadius: Wt,
  borderBottomRightRadius: Wt,
  boxShadow: dc
}, hi = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], pc = hi.length, Pr = (t) => typeof t == "string" ? parseFloat(t) : t, Tr = (t) => typeof t == "number" || w.test(t);
function mc(t, e, n, r, s, o) {
  s ? (t.opacity = E(
    0,
    // TODO Reinstate this if only child
    n.opacity !== void 0 ? n.opacity : 1,
    gc(r)
  ), t.opacityExit = E(e.opacity !== void 0 ? e.opacity : 1, 0, yc(r))) : o && (t.opacity = E(e.opacity !== void 0 ? e.opacity : 1, n.opacity !== void 0 ? n.opacity : 1, r));
  for (let i = 0; i < pc; i++) {
    const a = `border${hi[i]}Radius`;
    let l = Sr(e, a), c = Sr(n, a);
    if (l === void 0 && c === void 0)
      continue;
    l || (l = 0), c || (c = 0), l === 0 || c === 0 || Tr(l) === Tr(c) ? (t[a] = Math.max(E(Pr(l), Pr(c), r), 0), (rt.test(c) || rt.test(l)) && (t[a] += "%")) : t[a] = c;
  }
  (e.rotate || n.rotate) && (t.rotate = E(e.rotate || 0, n.rotate || 0, r));
}
function Sr(t, e) {
  return t[e] !== void 0 ? t[e] : t.borderRadius;
}
const gc = pi(0, 0.5, Os), yc = pi(0.5, 0.95, F);
function pi(t, e, n) {
  return (r) => r < t ? 0 : r > e ? 1 : n(Zt(t, e, r));
}
function Vr(t, e) {
  t.min = e.min, t.max = e.max;
}
function q(t, e) {
  Vr(t.x, e.x), Vr(t.y, e.y);
}
function Ar(t, e, n, r, s) {
  return t -= e, t = we(t, 1 / n, r), s !== void 0 && (t = we(t, 1 / s, r)), t;
}
function vc(t, e = 0, n = 1, r = 0.5, s, o = t, i = t) {
  if (rt.test(e) && (e = parseFloat(e), e = E(i.min, i.max, e / 100) - i.min), typeof e != "number")
    return;
  let a = E(o.min, o.max, r);
  t === o && (a -= e), t.min = Ar(t.min, e, n, a, s), t.max = Ar(t.max, e, n, a, s);
}
function Cr(t, e, [n, r, s], o, i) {
  vc(t, e[n], e[r], e[s], e.scale, o, i);
}
const bc = ["x", "scaleX", "originX"], xc = ["y", "scaleY", "originY"];
function Mr(t, e, n, r) {
  Cr(t.x, e, bc, n ? n.x : void 0, r ? r.x : void 0), Cr(t.y, e, xc, n ? n.y : void 0, r ? r.y : void 0);
}
function Dr(t) {
  return t.translate === 0 && t.scale === 1;
}
function mi(t) {
  return Dr(t.x) && Dr(t.y);
}
function wc(t, e) {
  return t.x.min === e.x.min && t.x.max === e.x.max && t.y.min === e.y.min && t.y.max === e.y.max;
}
function gi(t, e) {
  return Math.round(t.x.min) === Math.round(e.x.min) && Math.round(t.x.max) === Math.round(e.x.max) && Math.round(t.y.min) === Math.round(e.y.min) && Math.round(t.y.max) === Math.round(e.y.max);
}
function kr(t) {
  return K(t.x) / K(t.y);
}
class Pc {
  constructor() {
    this.members = [];
  }
  add(e) {
    Mn(this.members, e), e.scheduleRender();
  }
  remove(e) {
    if (Dn(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(e) {
    const n = this.members.findIndex((s) => e === s);
    if (n === 0)
      return !1;
    let r;
    for (let s = n; s >= 0; s--) {
      const o = this.members[s];
      if (o.isPresent !== !1) {
        r = o;
        break;
      }
    }
    return r ? (this.promote(r), !0) : !1;
  }
  promote(e, n) {
    const r = this.lead;
    if (e !== r && (this.prevLead = r, this.lead = e, e.show(), r)) {
      r.instance && r.scheduleRender(), e.scheduleRender(), e.resumeFrom = r, n && (e.resumeFrom.preserveOpacity = !0), r.snapshot && (e.snapshot = r.snapshot, e.snapshot.latestValues = r.animationValues || r.latestValues), e.root && e.root.isUpdating && (e.isLayoutDirty = !0);
      const { crossfade: s } = e.options;
      s === !1 && r.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      const { options: n, resumingFrom: r } = e;
      n.onExitComplete && n.onExitComplete(), r && r.options.onExitComplete && r.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((e) => {
      e.instance && e.scheduleRender(!1);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function Rr(t, e, n) {
  let r = "";
  const s = t.x.translate / e.x, o = t.y.translate / e.y;
  if ((s || o) && (r = `translate3d(${s}px, ${o}px, 0) `), (e.x !== 1 || e.y !== 1) && (r += `scale(${1 / e.x}, ${1 / e.y}) `), n) {
    const { rotate: l, rotateX: c, rotateY: u } = n;
    l && (r += `rotate(${l}deg) `), c && (r += `rotateX(${c}deg) `), u && (r += `rotateY(${u}deg) `);
  }
  const i = t.x.scale * e.x, a = t.y.scale * e.y;
  return (i !== 1 || a !== 1) && (r += `scale(${i}, ${a})`), r || "none";
}
const Tc = (t, e) => t.depth - e.depth;
class Sc {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(e) {
    Mn(this.children, e), this.isDirty = !0;
  }
  remove(e) {
    Dn(this.children, e), this.isDirty = !0;
  }
  forEach(e) {
    this.isDirty && this.children.sort(Tc), this.isDirty = !1, this.children.forEach(e);
  }
}
function Vc(t, e) {
  const n = performance.now(), r = ({ timestamp: s }) => {
    const o = s - n;
    o >= e && (ut(r), t(o - e));
  };
  return R.read(r, !0), () => ut(r);
}
function Ac(t) {
  window.MotionDebug && window.MotionDebug.record(t);
}
function Cc(t) {
  return t instanceof SVGElement && t.tagName !== "svg";
}
function Mc(t, e, n) {
  const r = H(t) ? t : Ot(t);
  return r.start(Cn("", r, e, n)), r.animation;
}
const Lr = ["", "X", "Y", "Z"], Dc = { visibility: "hidden" }, Er = 1e3;
let kc = 0;
const St = {
  type: "projectionFrame",
  totalNodes: 0,
  resolvedTargetDeltas: 0,
  recalculatedProjection: 0
};
function yi({ attachResizeListener: t, defaultParent: e, measureScroll: n, checkIsScrollRoot: r, resetTransform: s }) {
  return class {
    constructor(i = {}, a = e == null ? void 0 : e()) {
      this.id = kc++, this.animationId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.updateScheduled = !1, this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, St.totalNodes = St.resolvedTargetDeltas = St.recalculatedProjection = 0, this.nodes.forEach(Ec), this.nodes.forEach(jc), this.nodes.forEach(Nc), this.nodes.forEach(Bc), Ac(St);
      }, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = i, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new Sc());
    }
    addEventListener(i, a) {
      return this.eventHandlers.has(i) || this.eventHandlers.set(i, new kn()), this.eventHandlers.get(i).add(a);
    }
    notifyListeners(i, ...a) {
      const l = this.eventHandlers.get(i);
      l && l.notify(...a);
    }
    hasListeners(i) {
      return this.eventHandlers.has(i);
    }
    /**
     * Lifecycles
     */
    mount(i, a = this.root.hasTreeAnimated) {
      if (this.instance)
        return;
      this.isSVG = Cc(i), this.instance = i;
      const { layoutId: l, layout: c, visualElement: u } = this.options;
      if (u && !u.current && u.mount(i), this.root.nodes.add(this), this.parent && this.parent.children.add(this), a && (c || l) && (this.isLayoutDirty = !0), t) {
        let d;
        const f = () => this.root.updateBlockedByResize = !1;
        t(i, () => {
          this.root.updateBlockedByResize = !0, d && d(), d = Vc(f, 250), he.hasAnimatedSinceResize && (he.hasAnimatedSinceResize = !1, this.nodes.forEach(Fr));
        });
      }
      l && this.root.registerSharedNode(l, this), this.options.animate !== !1 && u && (l || c) && this.addEventListener("didUpdate", ({ delta: d, hasLayoutChanged: f, hasRelativeTargetChanged: h, layout: p }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const m = this.options.transition || u.getDefaultTransition() || $c, { onLayoutAnimationStart: v, onLayoutAnimationComplete: x } = u.getProps(), y = !this.targetLayout || !gi(this.targetLayout, p) || h, g = !f && h;
        if (this.options.layoutRoot || this.resumeFrom && this.resumeFrom.instance || g || f && (y || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0), this.setAnimationOrigin(d, g);
          const b = {
            ...An(m, "layout"),
            onPlay: v,
            onComplete: x
          };
          (u.shouldReduceMotion || this.options.layoutRoot) && (b.delay = 0, b.type = !1), this.startAnimation(b);
        } else
          f || Fr(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = p;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const i = this.getStack();
      i && i.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, ut(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(zc), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: i } = this.options;
      return i && i.getProps().transformTemplate;
    }
    willUpdate(i = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (!this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let u = 0; u < this.path.length; u++) {
        const d = this.path[u];
        d.shouldResetTransform = !0, d.updateScroll("snapshot"), d.options.layoutRoot && d.willUpdate(!1);
      }
      const { layoutId: a, layout: l } = this.options;
      if (a === void 0 && !l)
        return;
      const c = this.getTransformTemplate();
      this.prevTransformTemplateValue = c ? c(this.latestValues, "") : void 0, this.updateSnapshot(), i && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Br);
        return;
      }
      this.isUpdating || this.nodes.forEach(Oc), this.isUpdating = !1, this.nodes.forEach(Ic), this.nodes.forEach(Rc), this.nodes.forEach(Lc), this.clearAllSnapshots();
      const a = performance.now();
      G.delta = yt(0, 1e3 / 60, a - G.timestamp), G.timestamp = a, G.isProcessing = !0, Ee.update.process(G), Ee.preRender.process(G), Ee.render.process(G), G.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, queueMicrotask(() => this.update()));
    }
    clearAllSnapshots() {
      this.nodes.forEach(Fc), this.sharedNodes.forEach(Gc);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, R.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      R.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure());
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++)
          this.path[l].updateScroll();
      const i = this.layout;
      this.layout = this.measure(!1), this.layoutCorrected = I(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: a } = this.options;
      a && a.notify("LayoutMeasure", this.layout.layoutBox, i ? i.layoutBox : void 0);
    }
    updateScroll(i = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === i && (a = !1), a && (this.scroll = {
        animationId: this.root.animationId,
        phase: i,
        isRoot: r(this.instance),
        offset: n(this.instance)
      });
    }
    resetTransform() {
      if (!s)
        return;
      const i = this.isLayoutDirty || this.shouldResetTransform, a = this.projectionDelta && !mi(this.projectionDelta), l = this.getTransformTemplate(), c = l ? l(this.latestValues, "") : void 0, u = c !== this.prevTransformTemplateValue;
      i && (a || Tt(this.latestValues) || u) && (s(this.instance, c), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(i = !0) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return i && (l = this.removeTransform(l)), Hc(l), {
        animationId: this.root.animationId,
        measuredBox: a,
        layoutBox: l,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: i } = this.options;
      if (!i)
        return I();
      const a = i.measureViewportBox(), { scroll: l } = this.root;
      return l && (ht(a.x, l.offset.x), ht(a.y, l.offset.y)), a;
    }
    removeElementScroll(i) {
      const a = I();
      q(a, i);
      for (let l = 0; l < this.path.length; l++) {
        const c = this.path[l], { scroll: u, options: d } = c;
        if (c !== this.root && u && d.layoutScroll) {
          if (u.isRoot) {
            q(a, i);
            const { scroll: f } = this.root;
            f && (ht(a.x, -f.offset.x), ht(a.y, -f.offset.y));
          }
          ht(a.x, u.offset.x), ht(a.y, u.offset.y);
        }
      }
      return a;
    }
    applyTransform(i, a = !1) {
      const l = I();
      q(l, i);
      for (let c = 0; c < this.path.length; c++) {
        const u = this.path[c];
        !a && u.options.layoutScroll && u.scroll && u !== u.root && Bt(l, {
          x: -u.scroll.offset.x,
          y: -u.scroll.offset.y
        }), Tt(u.latestValues) && Bt(l, u.latestValues);
      }
      return Tt(this.latestValues) && Bt(l, this.latestValues), l;
    }
    removeTransform(i) {
      const a = I();
      q(a, i);
      for (let l = 0; l < this.path.length; l++) {
        const c = this.path[l];
        if (!c.instance || !Tt(c.latestValues))
          continue;
        rn(c.latestValues) && c.updateSnapshot();
        const u = I(), d = c.measurePageBox();
        q(u, d), Mr(a, c.latestValues, c.snapshot ? c.snapshot.layoutBox : void 0, u);
      }
      return Tt(this.latestValues) && Mr(a, this.latestValues), a;
    }
    setTargetDelta(i) {
      this.targetDelta = i, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(i) {
      this.options = {
        ...this.options,
        ...i,
        crossfade: i.crossfade !== void 0 ? i.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== G.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(i = !1) {
      var a;
      const l = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = l.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = l.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = l.isSharedProjectionDirty);
      const c = !!this.resumingFrom || this !== l;
      if (!(i || c && this.isSharedProjectionDirty || this.isProjectionDirty || !((a = this.parent) === null || a === void 0) && a.isProjectionDirty || this.attemptToResolveRelativeTarget))
        return;
      const { layout: d, layoutId: f } = this.options;
      if (!(!this.layout || !(d || f))) {
        if (this.resolvedRelativeTargetAt = G.timestamp, !this.targetDelta && !this.relativeTarget) {
          const h = this.getClosestProjectingParent();
          h && h.layout && this.animationProgress !== 1 ? (this.relativeParent = h, this.forceRelativeParentToResolveTarget(), this.relativeTarget = I(), this.relativeTargetOrigin = I(), Yt(this.relativeTargetOrigin, this.layout.layoutBox, h.layout.layoutBox), q(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (this.target || (this.target = I(), this.targetWithTransforms = I()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), Kl(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : q(this.target, this.layout.layoutBox), ci(this.target, this.targetDelta)) : q(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget) {
            this.attemptToResolveRelativeTarget = !1;
            const h = this.getClosestProjectingParent();
            h && !!h.resumingFrom == !!this.resumingFrom && !h.options.layoutScroll && h.target && this.animationProgress !== 1 ? (this.relativeParent = h, this.forceRelativeParentToResolveTarget(), this.relativeTarget = I(), this.relativeTargetOrigin = I(), Yt(this.relativeTargetOrigin, this.target, h.target), q(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
          }
          St.resolvedTargetDeltas++;
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || rn(this.parent.latestValues) || li(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      var i;
      const a = this.getLead(), l = !!this.resumingFrom || this !== a;
      let c = !0;
      if ((this.isProjectionDirty || !((i = this.parent) === null || i === void 0) && i.isProjectionDirty) && (c = !1), l && (this.isSharedProjectionDirty || this.isTransformDirty) && (c = !1), this.resolvedRelativeTargetAt === G.timestamp && (c = !1), c)
        return;
      const { layout: u, layoutId: d } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(u || d))
        return;
      q(this.layoutCorrected, this.layout.layoutBox);
      const f = this.treeScale.x, h = this.treeScale.y;
      ec(this.layoutCorrected, this.treeScale, this.path, l), a.layout && !a.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (a.target = a.layout.layoutBox);
      const { target: p } = a;
      if (!p) {
        this.projectionTransform && (this.projectionDelta = Et(), this.projectionTransform = "none", this.scheduleRender());
        return;
      }
      this.projectionDelta || (this.projectionDelta = Et(), this.projectionDeltaWithTransform = Et());
      const m = this.projectionTransform;
      _t(this.projectionDelta, this.layoutCorrected, p, this.latestValues), this.projectionTransform = Rr(this.projectionDelta, this.treeScale), (this.projectionTransform !== m || this.treeScale.x !== f || this.treeScale.y !== h) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", p)), St.recalculatedProjection++;
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(i = !0) {
      if (this.options.scheduleRender && this.options.scheduleRender(), i) {
        const a = this.getStack();
        a && a.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    setAnimationOrigin(i, a = !1) {
      const l = this.snapshot, c = l ? l.latestValues : {}, u = { ...this.latestValues }, d = Et();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
      const f = I(), h = l ? l.source : void 0, p = this.layout ? this.layout.source : void 0, m = h !== p, v = this.getStack(), x = !v || v.members.length <= 1, y = !!(m && !x && this.options.crossfade === !0 && !this.path.some(Wc));
      this.animationProgress = 0;
      let g;
      this.mixTargetDelta = (b) => {
        const P = b / 1e3;
        Or(d.x, i.x, P), Or(d.y, i.y, P), this.setTargetDelta(d), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Yt(f, this.layout.layoutBox, this.relativeParent.layout.layoutBox), Uc(this.relativeTarget, this.relativeTargetOrigin, f, P), g && wc(this.relativeTarget, g) && (this.isProjectionDirty = !1), g || (g = I()), q(g, this.relativeTarget)), m && (this.animationValues = u, mc(u, c, this.latestValues, P, y, x)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = P;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(i) {
      this.notifyListeners("animationStart"), this.currentAnimation && this.currentAnimation.stop(), this.resumingFrom && this.resumingFrom.currentAnimation && this.resumingFrom.currentAnimation.stop(), this.pendingAnimation && (ut(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = R.update(() => {
        he.hasAnimatedSinceResize = !0, this.currentAnimation = Mc(0, Er, {
          ...i,
          onUpdate: (a) => {
            this.mixTargetDelta(a), i.onUpdate && i.onUpdate(a);
          },
          onComplete: () => {
            i.onComplete && i.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const i = this.getStack();
      i && i.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(Er), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const i = this.getLead();
      let { targetWithTransforms: a, target: l, layout: c, latestValues: u } = i;
      if (!(!a || !l || !c)) {
        if (this !== i && this.layout && c && vi(this.options.animationType, this.layout.layoutBox, c.layoutBox)) {
          l = this.target || I();
          const d = K(this.layout.layoutBox.x);
          l.x.min = i.target.x.min, l.x.max = l.x.min + d;
          const f = K(this.layout.layoutBox.y);
          l.y.min = i.target.y.min, l.y.max = l.y.min + f;
        }
        q(a, l), Bt(a, u), _t(this.projectionDeltaWithTransform, this.layoutCorrected, a, u);
      }
    }
    registerSharedNode(i, a) {
      this.sharedNodes.has(i) || this.sharedNodes.set(i, new Pc()), this.sharedNodes.get(i).add(a);
      const c = a.options.initialPromotionConfig;
      a.promote({
        transition: c ? c.transition : void 0,
        preserveFollowOpacity: c && c.shouldPreserveFollowOpacity ? c.shouldPreserveFollowOpacity(a) : void 0
      });
    }
    isLead() {
      const i = this.getStack();
      return i ? i.lead === this : !0;
    }
    getLead() {
      var i;
      const { layoutId: a } = this.options;
      return a ? ((i = this.getStack()) === null || i === void 0 ? void 0 : i.lead) || this : this;
    }
    getPrevLead() {
      var i;
      const { layoutId: a } = this.options;
      return a ? (i = this.getStack()) === null || i === void 0 ? void 0 : i.prevLead : void 0;
    }
    getStack() {
      const { layoutId: i } = this.options;
      if (i)
        return this.root.sharedNodes.get(i);
    }
    promote({ needsReset: i, transition: a, preserveFollowOpacity: l } = {}) {
      const c = this.getStack();
      c && c.promote(this, l), i && (this.projectionDelta = void 0, this.needsReset = !0), a && this.setOptions({ transition: a });
    }
    relegate() {
      const i = this.getStack();
      return i ? i.relegate(this) : !1;
    }
    resetRotation() {
      const { visualElement: i } = this.options;
      if (!i)
        return;
      let a = !1;
      const { latestValues: l } = i;
      if ((l.rotate || l.rotateX || l.rotateY || l.rotateZ) && (a = !0), !a)
        return;
      const c = {};
      for (let u = 0; u < Lr.length; u++) {
        const d = "rotate" + Lr[u];
        l[d] && (c[d] = l[d], i.setStaticValue(d, 0));
      }
      i.render();
      for (const u in c)
        i.setStaticValue(u, c[u]);
      i.scheduleRender();
    }
    getProjectionStyles(i) {
      var a, l;
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible)
        return Dc;
      const c = {
        visibility: ""
      }, u = this.getTransformTemplate();
      if (this.needsReset)
        return this.needsReset = !1, c.opacity = "", c.pointerEvents = fe(i == null ? void 0 : i.pointerEvents) || "", c.transform = u ? u(this.latestValues, "") : "none", c;
      const d = this.getLead();
      if (!this.projectionDelta || !this.layout || !d.target) {
        const m = {};
        return this.options.layoutId && (m.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, m.pointerEvents = fe(i == null ? void 0 : i.pointerEvents) || ""), this.hasProjected && !Tt(this.latestValues) && (m.transform = u ? u({}, "") : "none", this.hasProjected = !1), m;
      }
      const f = d.animationValues || d.latestValues;
      this.applyTransformsToTarget(), c.transform = Rr(this.projectionDeltaWithTransform, this.treeScale, f), u && (c.transform = u(f, c.transform));
      const { x: h, y: p } = this.projectionDelta;
      c.transformOrigin = `${h.origin * 100}% ${p.origin * 100}% 0`, d.animationValues ? c.opacity = d === this ? (l = (a = f.opacity) !== null && a !== void 0 ? a : this.latestValues.opacity) !== null && l !== void 0 ? l : 1 : this.preserveOpacity ? this.latestValues.opacity : f.opacityExit : c.opacity = d === this ? f.opacity !== void 0 ? f.opacity : "" : f.opacityExit !== void 0 ? f.opacityExit : 0;
      for (const m in pe) {
        if (f[m] === void 0)
          continue;
        const { correct: v, applyTo: x } = pe[m], y = c.transform === "none" ? f[m] : v(f[m], d);
        if (x) {
          const g = x.length;
          for (let b = 0; b < g; b++)
            c[x[b]] = y;
        } else
          c[m] = y;
      }
      return this.options.layoutId && (c.pointerEvents = d === this ? fe(i == null ? void 0 : i.pointerEvents) || "" : "none"), c;
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((i) => {
        var a;
        return (a = i.currentAnimation) === null || a === void 0 ? void 0 : a.stop();
      }), this.root.nodes.forEach(Br), this.root.sharedNodes.clear();
    }
  };
}
function Rc(t) {
  t.updateLayout();
}
function Lc(t) {
  var e;
  const n = ((e = t.resumeFrom) === null || e === void 0 ? void 0 : e.snapshot) || t.snapshot;
  if (t.isLead() && t.layout && n && t.hasListeners("didUpdate")) {
    const { layoutBox: r, measuredBox: s } = t.layout, { animationType: o } = t.options, i = n.source !== t.layout.source;
    o === "size" ? X((d) => {
      const f = i ? n.measuredBox[d] : n.layoutBox[d], h = K(f);
      f.min = r[d].min, f.max = f.min + h;
    }) : vi(o, n.layoutBox, r) && X((d) => {
      const f = i ? n.measuredBox[d] : n.layoutBox[d], h = K(r[d]);
      f.max = f.min + h, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[d].max = t.relativeTarget[d].min + h);
    });
    const a = Et();
    _t(a, r, n.layoutBox);
    const l = Et();
    i ? _t(l, t.applyTransform(s, !0), n.measuredBox) : _t(l, r, n.layoutBox);
    const c = !mi(a);
    let u = !1;
    if (!t.resumeFrom) {
      const d = t.getClosestProjectingParent();
      if (d && !d.resumeFrom) {
        const { snapshot: f, layout: h } = d;
        if (f && h) {
          const p = I();
          Yt(p, n.layoutBox, f.layoutBox);
          const m = I();
          Yt(m, r, h.layoutBox), gi(p, m) || (u = !0), d.options.layoutRoot && (t.relativeTarget = m, t.relativeTargetOrigin = p, t.relativeParent = d);
        }
      }
    }
    t.notifyListeners("didUpdate", {
      layout: r,
      snapshot: n,
      delta: l,
      layoutDelta: a,
      hasLayoutChanged: c,
      hasRelativeTargetChanged: u
    });
  } else if (t.isLead()) {
    const { onExitComplete: r } = t.options;
    r && r();
  }
  t.options.transition = void 0;
}
function Ec(t) {
  St.totalNodes++, t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function Bc(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function Fc(t) {
  t.clearSnapshot();
}
function Br(t) {
  t.clearMeasurements();
}
function Oc(t) {
  t.isLayoutDirty = !1;
}
function Ic(t) {
  const { visualElement: e } = t.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), t.resetTransform();
}
function Fr(t) {
  t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = !0;
}
function jc(t) {
  t.resolveTargetDelta();
}
function Nc(t) {
  t.calcProjection();
}
function zc(t) {
  t.resetRotation();
}
function Gc(t) {
  t.removeLeadSnapshot();
}
function Or(t, e, n) {
  t.translate = E(e.translate, 0, n), t.scale = E(e.scale, 1, n), t.origin = e.origin, t.originPoint = e.originPoint;
}
function Ir(t, e, n, r) {
  t.min = E(e.min, n.min, r), t.max = E(e.max, n.max, r);
}
function Uc(t, e, n, r) {
  Ir(t.x, e.x, n.x, r), Ir(t.y, e.y, n.y, r);
}
function Wc(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const $c = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, jr = (t) => typeof navigator < "u" && navigator.userAgent.toLowerCase().includes(t), Nr = jr("applewebkit/") && !jr("chrome/") ? Math.round : F;
function zr(t) {
  t.min = Nr(t.min), t.max = Nr(t.max);
}
function Hc(t) {
  zr(t.x), zr(t.y);
}
function vi(t, e, n) {
  return t === "position" || t === "preserve-aspect" && !en(kr(e), kr(n), 0.2);
}
const Kc = yi({
  attachResizeListener: (t, e) => ot(t, "resize", e),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => !0
}), We = {
  current: void 0
}, bi = yi({
  measureScroll: (t) => ({
    x: t.scrollLeft,
    y: t.scrollTop
  }),
  defaultParent: () => {
    if (!We.current) {
      const t = new Kc({});
      t.mount(window), t.setOptions({ layoutScroll: !0 }), We.current = t;
    }
    return We.current;
  },
  resetTransform: (t, e) => {
    t.style.transform = e !== void 0 ? e : "none";
  },
  checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed"
}), _c = {
  pan: {
    Feature: cc
  },
  drag: {
    Feature: lc,
    ProjectionNode: bi,
    MeasureLayout: fi
  }
}, Yc = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function qc(t) {
  const e = Yc.exec(t);
  if (!e)
    return [,];
  const [, n, r] = e;
  return [n, r];
}
const Xc = 4;
function on(t, e, n = 1) {
  J(n <= Xc, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`);
  const [r, s] = qc(t);
  if (!r)
    return;
  const o = window.getComputedStyle(e).getPropertyValue(r);
  if (o) {
    const i = o.trim();
    return ei(i) ? parseFloat(i) : i;
  } else return Ye(s) ? on(s, e, n + 1) : s;
}
function Zc(t, { ...e }, n) {
  const r = t.current;
  if (!(r instanceof Element))
    return { target: e, transitionEnd: n };
  n && (n = { ...n }), t.values.forEach((s) => {
    const o = s.get();
    if (!Ye(o))
      return;
    const i = on(o, r);
    i && s.set(i);
  });
  for (const s in e) {
    const o = e[s];
    if (!Ye(o))
      continue;
    const i = on(o, r);
    i && (e[s] = i, n || (n = {}), n[s] === void 0 && (n[s] = o));
  }
  return { target: e, transitionEnd: n };
}
const Jc = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  "x",
  "y",
  "translateX",
  "translateY"
]), xi = (t) => Jc.has(t), Qc = (t) => Object.keys(t).some(xi), de = (t) => t === kt || t === w, Gr = (t, e) => parseFloat(t.split(", ")[e]), Ur = (t, e) => (n, { transform: r }) => {
  if (r === "none" || !r)
    return 0;
  const s = r.match(/^matrix3d\((.+)\)$/);
  if (s)
    return Gr(s[1], e);
  {
    const o = r.match(/^matrix\((.+)\)$/);
    return o ? Gr(o[1], t) : 0;
  }
}, tu = /* @__PURE__ */ new Set(["x", "y", "z"]), eu = Qt.filter((t) => !tu.has(t));
function nu(t) {
  const e = [];
  return eu.forEach((n) => {
    const r = t.getValue(n);
    r !== void 0 && (e.push([n, r.get()]), r.set(n.startsWith("scale") ? 1 : 0));
  }), e.length && t.render(), e;
}
const It = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  // Transform
  x: Ur(4, 13),
  y: Ur(5, 14)
};
It.translateX = It.x;
It.translateY = It.y;
const ru = (t, e, n) => {
  const r = e.measureViewportBox(), s = e.current, o = getComputedStyle(s), { display: i } = o, a = {};
  i === "none" && e.setStaticValue("display", t.display || "block"), n.forEach((c) => {
    a[c] = It[c](r, o);
  }), e.render();
  const l = e.measureViewportBox();
  return n.forEach((c) => {
    const u = e.getValue(c);
    u && u.jump(a[c]), t[c] = It[c](l, o);
  }), t;
}, su = (t, e, n = {}, r = {}) => {
  e = { ...e }, r = { ...r };
  const s = Object.keys(e).filter(xi);
  let o = [], i = !1;
  const a = [];
  if (s.forEach((l) => {
    const c = t.getValue(l);
    if (!t.hasValue(l))
      return;
    let u = n[l], d = Ut(u);
    const f = e[l];
    let h;
    if (ge(f)) {
      const p = f.length, m = f[0] === null ? 1 : 0;
      u = f[m], d = Ut(u);
      for (let v = m; v < p && f[v] !== null; v++)
        h ? J(Ut(f[v]) === h, "All keyframes must be of the same type") : (h = Ut(f[v]), J(h === d || de(d) && de(h), "Keyframes must be of the same dimension as the current value"));
    } else
      h = Ut(f);
    if (d !== h)
      if (de(d) && de(h)) {
        const p = c.get();
        typeof p == "string" && c.set(parseFloat(p)), typeof f == "string" ? e[l] = parseFloat(f) : Array.isArray(f) && h === w && (e[l] = f.map(parseFloat));
      } else d != null && d.transform && (h != null && h.transform) && (u === 0 || f === 0) ? u === 0 ? c.set(h.transform(u)) : e[l] = d.transform(f) : (i || (o = nu(t), i = !0), a.push(l), r[l] = r[l] !== void 0 ? r[l] : e[l], c.jump(f));
  }), a.length) {
    const l = a.indexOf("height") >= 0 ? window.pageYOffset : null, c = ru(e, t, a);
    return o.length && o.forEach(([u, d]) => {
      t.getValue(u).set(d);
    }), t.render(), Ae && l !== null && window.scrollTo({ top: l }), { target: c, transitionEnd: r };
  } else
    return { target: e, transitionEnd: r };
};
function iu(t, e, n, r) {
  return Qc(e) ? su(t, e, n, r) : { target: e, transitionEnd: r };
}
const ou = (t, e, n, r) => {
  const s = Zc(t, e, r);
  return e = s.target, r = s.transitionEnd, iu(t, e, n, r);
}, an = { current: null }, wi = { current: !1 };
function au() {
  if (wi.current = !0, !!Ae)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => an.current = t.matches;
      t.addListener(e), e();
    } else
      an.current = !1;
}
function lu(t, e, n) {
  const { willChange: r } = e;
  for (const s in e) {
    const o = e[s], i = n[s];
    if (H(o))
      t.addValue(s, o), xe(r) && r.add(s), process.env.NODE_ENV === "development" && Rn(o.version === "10.18.0", `Attempting to mix Framer Motion versions ${o.version} with 10.18.0 may not work as expected.`);
    else if (H(i))
      t.addValue(s, Ot(o, { owner: t })), xe(r) && r.remove(s);
    else if (i !== o)
      if (t.hasValue(s)) {
        const a = t.getValue(s);
        !a.hasAnimated && a.set(o);
      } else {
        const a = t.getStaticValue(s);
        t.addValue(s, Ot(a !== void 0 ? a : o, { owner: t }));
      }
  }
  for (const s in n)
    e[s] === void 0 && t.removeValue(s);
  return e;
}
const Wr = /* @__PURE__ */ new WeakMap(), Pi = Object.keys(Xt), cu = Pi.length, $r = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
], uu = hn.length;
class du {
  constructor({ parent: e, props: n, presenceContext: r, reducedMotionConfig: s, visualState: o }, i = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.scheduleRender = () => R.render(this.render, !1, !0);
    const { latestValues: a, renderState: l } = o;
    this.latestValues = a, this.baseTarget = { ...a }, this.initialValues = n.initial ? { ...a } : {}, this.renderState = l, this.parent = e, this.props = n, this.presenceContext = r, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = s, this.options = i, this.isControllingVariants = Me(n), this.isVariantNode = os(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: c, ...u } = this.scrapeMotionValuesFromProps(n, {});
    for (const d in u) {
      const f = u[d];
      a[d] !== void 0 && H(f) && (f.set(a[d], !1), xe(c) && c.add(d));
    }
  }
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(e, n) {
    return {};
  }
  mount(e) {
    this.current = e, Wr.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, r) => this.bindToMotionValue(r, n)), wi.current || au(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : an.current, process.env.NODE_ENV !== "production" && Rn(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected."), this.parent && this.parent.children.add(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    Wr.delete(this.current), this.projection && this.projection.unmount(), ut(this.notifyUpdate), ut(this.render), this.valueSubscriptions.forEach((e) => e()), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent && this.parent.children.delete(this);
    for (const e in this.events)
      this.events[e].clear();
    for (const e in this.features)
      this.features[e].unmount();
    this.current = null;
  }
  bindToMotionValue(e, n) {
    const r = Dt.has(e), s = n.on("change", (i) => {
      this.latestValues[e] = i, this.props.onUpdate && R.update(this.notifyUpdate, !1, !0), r && this.projection && (this.projection.isTransformDirty = !0);
    }), o = n.on("renderRequest", this.scheduleRender);
    this.valueSubscriptions.set(e, () => {
      s(), o();
    });
  }
  sortNodePosition(e) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
  }
  loadFeatures({ children: e, ...n }, r, s, o) {
    let i, a;
    if (process.env.NODE_ENV !== "production" && s && r) {
      const l = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
      n.ignoreStrict ? ne(!1, l) : J(!1, l);
    }
    for (let l = 0; l < cu; l++) {
      const c = Pi[l], { isEnabled: u, Feature: d, ProjectionNode: f, MeasureLayout: h } = Xt[c];
      f && (i = f), u(n) && (!this.features[c] && d && (this.features[c] = new d(this)), h && (a = h));
    }
    if ((this.type === "html" || this.type === "svg") && !this.projection && i) {
      this.projection = new i(this.latestValues, this.parent && this.parent.projection);
      const { layoutId: l, layout: c, drag: u, dragConstraints: d, layoutScroll: f, layoutRoot: h } = n;
      this.projection.setOptions({
        layoutId: l,
        layout: c,
        alwaysMeasureLayout: !!u || d && Rt(d),
        visualElement: this,
        scheduleRender: () => this.scheduleRender(),
        /**
         * TODO: Update options in an effect. This could be tricky as it'll be too late
         * to update by the time layout animations run.
         * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
         * ensuring it gets called if there's no potential layout animations.
         *
         */
        animationType: typeof c == "string" ? c : "both",
        initialPromotionConfig: o,
        layoutScroll: f,
        layoutRoot: h
      });
    }
    return a;
  }
  updateFeatures() {
    for (const e in this.features) {
      const n = this.features[e];
      n.isMounted ? n.update() : (n.mount(), n.isMounted = !0);
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.options, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : I();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, n) {
    this.latestValues[e] = n;
  }
  /**
   * Make a target animatable by Popmotion. For instance, if we're
   * trying to animate width from 100px to 100vw we need to measure 100vw
   * in pixels to determine what we really need to animate to. This is also
   * pluggable to support Framer's custom value types like Color,
   * and CSS variables.
   */
  makeTargetAnimatable(e, n = !0) {
    return this.makeTargetAnimatableFromInstance(e, this.props, n);
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(e, n) {
    (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let r = 0; r < $r.length; r++) {
      const s = $r[r];
      this.propEventSubscriptions[s] && (this.propEventSubscriptions[s](), delete this.propEventSubscriptions[s]);
      const o = e["on" + s];
      o && (this.propEventSubscriptions[s] = this.on(s, o));
    }
    this.prevMotionValues = lu(this, this.scrapeMotionValuesFromProps(e, this.prevProps), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  getVariantContext(e = !1) {
    if (e)
      return this.parent ? this.parent.getVariantContext() : void 0;
    if (!this.isControllingVariants) {
      const r = this.parent ? this.parent.getVariantContext() || {} : {};
      return this.props.initial !== void 0 && (r.initial = this.props.initial), r;
    }
    const n = {};
    for (let r = 0; r < uu; r++) {
      const s = hn[r], o = this.props[s];
      (qt(o) || o === !1) && (n[s] = o);
    }
    return n;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(e) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(e), () => n.variantChildren.delete(e);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(e, n) {
    n !== this.values.get(e) && (this.removeValue(e), this.bindToMotionValue(e, n)), this.values.set(e, n), this.latestValues[e] = n.get();
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(e) {
    this.values.delete(e);
    const n = this.valueSubscriptions.get(e);
    n && (n(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, n) {
    if (this.props.values && this.props.values[e])
      return this.props.values[e];
    let r = this.values.get(e);
    return r === void 0 && n !== void 0 && (r = Ot(n, { owner: this }), this.addValue(e, r)), r;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e) {
    var n;
    return this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : (n = this.getBaseTargetFromProps(this.props, e)) !== null && n !== void 0 ? n : this.readValueFromInstance(this.current, e, this.options);
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(e, n) {
    this.baseTarget[e] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(e) {
    var n;
    const { initial: r } = this.props, s = typeof r == "string" || typeof r == "object" ? (n = wn(this.props, r)) === null || n === void 0 ? void 0 : n[e] : void 0;
    if (r && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, e);
    return o !== void 0 && !H(o) ? o : this.initialValues[e] !== void 0 && s === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new kn()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
}
class Ti extends du {
  sortInstanceNodePosition(e, n) {
    return e.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, n) {
    return e.style ? e.style[n] : void 0;
  }
  removeValueFromRenderState(e, { vars: n, style: r }) {
    delete n[e], delete r[e];
  }
  makeTargetAnimatableFromInstance({ transition: e, transitionEnd: n, ...r }, { transformValues: s }, o) {
    let i = Cl(r, e || {}, this);
    if (s && (n && (n = s(n)), r && (r = s(r)), i && (i = s(i))), o) {
      Vl(this, r, i);
      const a = ou(this, r, i, n);
      n = a.transitionEnd, r = a.target;
    }
    return {
      transition: e,
      transitionEnd: n,
      ...r
    };
  }
}
function fu(t) {
  return window.getComputedStyle(t);
}
class hu extends Ti {
  constructor() {
    super(...arguments), this.type = "html";
  }
  readValueFromInstance(e, n) {
    if (Dt.has(n)) {
      const r = Vn(n);
      return r && r.default || 0;
    } else {
      const r = fu(e), s = (us(n) ? r.getPropertyValue(n) : r[n]) || 0;
      return typeof s == "string" ? s.trim() : s;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return ui(e, n);
  }
  build(e, n, r, s) {
    gn(e, n, r, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n) {
    return xn(e, n);
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    H(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
  renderInstance(e, n, r, s) {
    gs(e, n, r, s);
  }
}
class pu extends Ti {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1;
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (Dt.has(n)) {
      const r = Vn(n);
      return r && r.default || 0;
    }
    return n = ys.has(n) ? n : dn(n), e.getAttribute(n);
  }
  measureInstanceViewportBox() {
    return I();
  }
  scrapeMotionValuesFromProps(e, n) {
    return bs(e, n);
  }
  build(e, n, r, s) {
    vn(e, n, r, this.isSVGTag, s.transformTemplate);
  }
  renderInstance(e, n, r, s) {
    vs(e, n, r, s);
  }
  mount(e) {
    this.isSVGTag = bn(e.tagName), super.mount(e);
  }
}
const mu = (t, e) => mn(t) ? new pu(e, { enableHardwareAcceleration: !1 }) : new hu(e, { enableHardwareAcceleration: !0 }), gu = {
  layout: {
    ProjectionNode: bi,
    MeasureLayout: fi
  }
}, yu = {
  ...Ul,
  ...ua,
  ..._c,
  ...gu
}, Pe = /* @__PURE__ */ bo((t, e) => Zo(t, e, yu, mu));
function Si() {
  const t = Z(!1);
  return un(() => (t.current = !0, () => {
    t.current = !1;
  }), []), t;
}
function vu() {
  const t = Si(), [e, n] = Te(0), r = Ft(() => {
    t.current && n(e + 1);
  }, [e]);
  return [Ft(() => R.postRender(r), [r]), e];
}
class bu extends $.Component {
  getSnapshotBeforeUpdate(e) {
    const n = this.props.childRef.current;
    if (n && e.isPresent && !this.props.isPresent) {
      const r = this.props.sizeRef.current;
      r.height = n.offsetHeight || 0, r.width = n.offsetWidth || 0, r.top = n.offsetTop, r.left = n.offsetLeft;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function xu({ children: t, isPresent: e }) {
  const n = ln(), r = Z(null), s = Z({
    width: 0,
    height: 0,
    top: 0,
    left: 0
  });
  return _r(() => {
    const { width: o, height: i, top: a, left: l } = s.current;
    if (e || !r.current || !o || !i)
      return;
    r.current.dataset.motionPopId = n;
    const c = document.createElement("style");
    return document.head.appendChild(c), c.sheet && c.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${o}px !important;
            height: ${i}px !important;
            top: ${a}px !important;
            left: ${l}px !important;
          }
        `), () => {
      document.head.removeChild(c);
    };
  }, [e]), $.createElement(bu, { isPresent: e, childRef: r, sizeRef: s }, $.cloneElement(t, { ref: r }));
}
const $e = ({ children: t, initial: e, isPresent: n, onExitComplete: r, custom: s, presenceAffectsLayout: o, mode: i }) => {
  const a = xs(wu), l = ln(), c = gt(
    () => ({
      id: l,
      initial: e,
      isPresent: n,
      custom: s,
      onExitComplete: (u) => {
        a.set(u, !0);
        for (const d of a.values())
          if (!d)
            return;
        r && r();
      },
      register: (u) => (a.set(u, !1), () => a.delete(u))
    }),
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */
    o ? void 0 : [n]
  );
  return gt(() => {
    a.forEach((u, d) => a.set(d, !1));
  }, [n]), $.useEffect(() => {
    !n && !a.size && r && r();
  }, [n]), i === "popLayout" && (t = $.createElement(xu, { isPresent: n }, t)), $.createElement(Ve.Provider, { value: c }, t);
};
function wu() {
  return /* @__PURE__ */ new Map();
}
function Pu(t) {
  return Jt(() => () => t(), []);
}
const Vt = (t) => t.key || "";
function Tu(t, e) {
  t.forEach((n) => {
    const r = Vt(n);
    e.set(r, n);
  });
}
function Su(t) {
  const e = [];
  return ki.forEach(t, (n) => {
    Ri(n) && e.push(n);
  }), e;
}
const Ln = ({ children: t, custom: e, initial: n = !0, onExitComplete: r, exitBeforeEnter: s, presenceAffectsLayout: o = !0, mode: i = "sync" }) => {
  J(!s, "Replace exitBeforeEnter with mode='wait'");
  const a = j(pn).forceRender || vu()[0], l = Si(), c = Su(t);
  let u = c;
  const d = Z(/* @__PURE__ */ new Map()).current, f = Z(u), h = Z(/* @__PURE__ */ new Map()).current, p = Z(!0);
  if (un(() => {
    p.current = !1, Tu(c, h), f.current = u;
  }), Pu(() => {
    p.current = !0, h.clear(), d.clear();
  }), p.current)
    return $.createElement($.Fragment, null, u.map((y) => $.createElement($e, { key: Vt(y), isPresent: !0, initial: n ? void 0 : !1, presenceAffectsLayout: o, mode: i }, y)));
  u = [...u];
  const m = f.current.map(Vt), v = c.map(Vt), x = m.length;
  for (let y = 0; y < x; y++) {
    const g = m[y];
    v.indexOf(g) === -1 && !d.has(g) && d.set(g, void 0);
  }
  return i === "wait" && d.size && (u = []), d.forEach((y, g) => {
    if (v.indexOf(g) !== -1)
      return;
    const b = h.get(g);
    if (!b)
      return;
    const P = m.indexOf(g);
    let D = y;
    if (!D) {
      const k = () => {
        d.delete(g);
        const T = Array.from(h.keys()).filter((C) => !v.includes(C));
        if (T.forEach((C) => h.delete(C)), f.current = c.filter((C) => {
          const N = Vt(C);
          return (
            // filter out the node exiting
            N === g || // filter out the leftover children
            T.includes(N)
          );
        }), !d.size) {
          if (l.current === !1)
            return;
          a(), r && r();
        }
      };
      D = $.createElement($e, { key: Vt(b), isPresent: !1, onExitComplete: k, custom: e, presenceAffectsLayout: o, mode: i }, b), d.set(g, D);
    }
    u.splice(P, 0, D);
  }), u = u.map((y) => {
    const g = y.key;
    return d.has(g) ? y : $.createElement($e, { key: Vt(y), isPresent: !0, presenceAffectsLayout: o, mode: i }, y);
  }), process.env.NODE_ENV !== "production" && i === "wait" && u.length > 1 && console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`), $.createElement($.Fragment, null, d.size ? u : u.map((y) => Di(y)));
}, Vi = {
  duration: 0.3,
  ease: "easeInOut",
  direction: "horizontal"
}, Vu = {
  initial: {
    opacity: 0,
    x: 20
  },
  animate: {
    opacity: 1,
    x: 0
  },
  exit: {
    opacity: 0,
    x: -20
  }
}, Au = {
  config: Vi,
  variants: Vu
}, zu = ({
  steps: t,
  customAnimationConfig: e,
  customAnimationVariants: n
}) => {
  const { currentStep: r } = Xr(), { config: s, variants: o } = e || n ? {
    config: e,
    variants: n
  } : Au, i = () => r >= 0 && r < t.length ? t[r - 1].component : r === t.length ? t[t.length - 1].component : null;
  return /* @__PURE__ */ S(Ln, { mode: "wait", children: /* @__PURE__ */ S(
    Pe.div,
    {
      variants: o,
      initial: "initial",
      animate: "animate",
      className: "w-full",
      exit: "exit",
      transition: {
        duration: s == null ? void 0 : s.duration,
        ease: s == null ? void 0 : s.ease
      },
      children: i()
    },
    r
  ) });
};
var Cu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const Mu = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Ai = (t, e) => {
  const n = Yr(
    ({ color: r = "currentColor", size: s = 24, strokeWidth: o = 2, absoluteStrokeWidth: i, children: a, ...l }, c) => He(
      "svg",
      {
        ref: c,
        ...Cu,
        width: s,
        height: s,
        stroke: r,
        strokeWidth: i ? Number(o) * 24 / Number(s) : o,
        className: `lucide lucide-${Mu(t)}`,
        ...l
      },
      [
        ...e.map(([u, d]) => He(u, d)),
        ...(Array.isArray(a) ? a : [a]) || []
      ]
    )
  );
  return n.displayName = `${t}`, n;
}, Du = Ai("Check", [
  ["polyline", { points: "20 6 9 17 4 12", key: "10jjfj" }]
]), ku = Ai("ChevronDown", [
  ["polyline", { points: "6 9 12 15 18 9", key: "1do0m2" }]
]);
function Ru({
  step: t,
  isActive: e,
  isCompleted: n,
  animationConfig: r
}) {
  const s = U(
    "relative flex items-center justify-center w-10 h-10 rounded-full transition-all",
    e ? "bg-primary outline outline-4 outline-primary/20 text-primary-foreground" : n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted-foreground/10"
  ), o = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
    transition: { duration: r.duration }
  }, i = gt(
    () => n ? /* @__PURE__ */ S(
      Pe.div,
      {
        className: "relative z-20 bg-green",
        ...o,
        children: /* @__PURE__ */ S(Du, { className: "w-5 h-5" })
      },
      "check"
    ) : /* @__PURE__ */ S(Pe.span, { className: "relative z-20", ...o, children: t }, "step"),
    [n, t, r.duration]
  );
  return /* @__PURE__ */ S(
    "div",
    {
      className: `${s} onboarding-step-circle`,
      style: { transitionDuration: `${r.duration}s` },
      children: /* @__PURE__ */ S(Ln, { mode: "wait", children: i })
    }
  );
}
function Gu({
  totalSteps: t,
  className: e,
  customAnimationConfig: n
}) {
  const { currentStep: r } = Xr(), s = Vi;
  return /* @__PURE__ */ S("div", { className: U("flex items-center justify-between", e), children: Array.from({ length: t }).map((o, i) => /* @__PURE__ */ ct(Ei, { children: [
    /* @__PURE__ */ S(
      Ru,
      {
        step: i + 1,
        isActive: i + 1 === r,
        isCompleted: i + 1 < r,
        animationConfig: s
      }
    ),
    i < t - 1 && /* @__PURE__ */ S(
      Lu,
      {
        index: i,
        currentStep: r,
        animationConfig: s
      }
    )
  ] }, i)) });
}
const Lu = ({
  index: t,
  currentStep: e,
  animationConfig: n
}) => /* @__PURE__ */ S("div", { className: "flex-1 h-0.5 onboarding-divider-outer mx-2 bg-border ", children: /* @__PURE__ */ S(
  "div",
  {
    className: "h-full transition-all ease-in-out bg-primary onboarding-divider-inner",
    style: {
      width: `${t + 1 < e ? 100 : 0}%`,
      transitionDuration: `${n.duration}s`
    }
  }
) }), Uu = Li(
  ({
    children: t,
    className: e
  }) => /* @__PURE__ */ S("div", { className: U("flex flex-col gap-12 w-full max-w-2xl", e), children: t })
), Wu = ({ title: t }) => /* @__PURE__ */ S("div", { className: "text-2xl font-bold", children: t }), Eu = ({ className: t }) => /* @__PURE__ */ ct(
  "svg",
  {
    className: U("w-5 h-5 mr-3 -ml-1 animate-spin", t),
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    children: [
      /* @__PURE__ */ S(
        "circle",
        {
          className: "opacity-25",
          cx: "12",
          cy: "12",
          r: "10",
          stroke: "currentColor",
          strokeWidth: "4"
        }
      ),
      /* @__PURE__ */ S(
        "path",
        {
          className: "opacity-75",
          fill: "currentColor",
          d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        }
      )
    ]
  }
), $u = ({
  className: t,
  variant: e = "primary",
  size: n = "md",
  loading: r = !1,
  children: s,
  disabled: o,
  ...i
}) => {
  const a = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background", l = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground ",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  }, c = {
    sm: "h-9 px-3",
    md: "h-10 py-2 px-4",
    lg: "h-11 px-8"
  };
  return /* @__PURE__ */ ct(
    "button",
    {
      className: U(
        a,
        l[e],
        c[n],
        t
      ),
      disabled: r || o,
      ...i,
      children: [
        r && /* @__PURE__ */ S(Eu, { className: "mr-2" }),
        s
      ]
    }
  );
}, Hr = ({
  label: t,
  id: e,
  className: n,
  inputClassName: r,
  labelClassName: s,
  required: o,
  // New prop to determine if field is required
  errorMessage: i,
  // Error message for invalid field
  ...a
}) => {
  const [l, c] = Te(!1), u = o && l && !a.value;
  return /* @__PURE__ */ ct("div", { className: U("space-y-2", n), children: [
    /* @__PURE__ */ S(
      "label",
      {
        htmlFor: e,
        className: U(
          "block text-sm font-medium text-secondary-foreground",
          s
        ),
        children: t
      }
    ),
    /* @__PURE__ */ ct("div", { className: "relative", children: [
      /* @__PURE__ */ S(
        "input",
        {
          id: e,
          className: U(
            "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            r,
            u && "border-red-500"
            // Apply red border if invalid
          ),
          ...a,
          onBlur: () => c(!0)
        }
      ),
      u && /* @__PURE__ */ S("span", { className: "absolute right-0 text-xs text-red-500 -translate-y-full -top-2.5", children: u ? i || "This field is required" : i })
    ] })
  ] });
}, Hu = ({ label: t, ...e }) => t ? /* @__PURE__ */ S(Hr, { label: t, ...e }) : /* @__PURE__ */ S(Hr, { label: "", ...e });
function Ku({
  name: t,
  children: e,
  checked: n,
  onChange: r,
  className: s
}) {
  return /* @__PURE__ */ ct(
    "label",
    {
      htmlFor: t,
      className: U(
        "flex gap-4 text-[14px] items-center font-medium  list-none rounded cursor-pointer",
        s
      ),
      children: [
        /* @__PURE__ */ S("div", { className: "inline-flex items-center", children: /* @__PURE__ */ ct(
          "label",
          {
            className: "relative flex items-center rounded-full cursor-pointer",
            htmlFor: t,
            children: [
              /* @__PURE__ */ S(
                "input",
                {
                  type: "checkbox",
                  name: t,
                  id: t,
                  checked: n,
                  onChange: (o) => r(o.target.checked),
                  className: "before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-input transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-8 before:w-8 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-primary/10 before:opacity-0 hover:before:opacity-10 checked:border-primary checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                }
              ),
              /* @__PURE__ */ S("span", { className: "absolute transition-opacity opacity-0 pointer-events-none text-primary-foreground top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100", children: /* @__PURE__ */ S(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  className: "h-3.5 w-3.5",
                  viewBox: "0 0 20 20",
                  fill: "currentColor",
                  stroke: "currentColor",
                  strokeWidth: "1",
                  children: /* @__PURE__ */ S(
                    "path",
                    {
                      fillRule: "evenodd",
                      d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                      clipRule: "evenodd"
                    }
                  )
                }
              ) })
            ]
          }
        ) }),
        e
      ]
    }
  );
}
const Bu = (t, e) => {
  Jt(() => {
    const n = (r) => {
      !t.current || t.current.contains(r.target) || e(r);
    };
    return document.addEventListener("mousedown", n), document.addEventListener("touchstart", n), () => {
      document.removeEventListener("mousedown", n), document.removeEventListener("touchstart", n);
    };
  }, [t, e]);
}, se = bt(
  void 0
);
function _u({
  children: t,
  value: e,
  setValue: n,
  className: r
}) {
  const [s, o] = Te(!1), i = Z(null);
  return Bu(i, () => o(!1)), /* @__PURE__ */ S(se.Provider, { value: { isOpen: s, setIsOpen: o, value: e, setValue: n }, children: /* @__PURE__ */ S("div", { ref: i, className: U("relative w-full", r), children: t }) });
}
function Yu({ children: t, className: e }) {
  const { isOpen: n, setIsOpen: r } = j(se);
  return /* @__PURE__ */ ct(
    "button",
    {
      type: "button",
      onClick: () => r(!n),
      className: U(
        "flex items-center justify-between w-full px-3 py-2 text-left bg-background border border-input rounded-md hover:bg-primary-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
        e,
        n ? "ring-2 ring-primary" : ""
      ),
      "aria-haspopup": "listbox",
      "aria-expanded": n,
      children: [
        t,
        /* @__PURE__ */ S(
          ku,
          {
            className: U(
              "w-5 h-5 transition-transform duration-200",
              n ? "transform rotate-180" : ""
            )
          }
        )
      ]
    }
  );
}
function qu({ children: t, className: e }) {
  const { isOpen: n } = j(se), r = Z(null);
  return /* @__PURE__ */ S(Ln, { children: n && /* @__PURE__ */ S(
    Pe.ul,
    {
      ref: r,
      initial: { opacity: 0, y: -10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      transition: { duration: 0.2 },
      className: U(
        "absolute z-10 flex flex-col w-full gap-1 p-2 mt-1 overflow-auto border rounded-md shadow-lg bg-background border-input max-h-60 focus:outline-none",
        e
      ),
      role: "listbox",
      children: t
    }
  ) });
}
function Xu({
  value: t,
  children: e,
  onClick: n,
  className: r
}) {
  const {
    setIsOpen: s,
    value: o,
    setValue: i
  } = j(se), a = () => {
    i(t), s(!1), n == null || n();
  };
  return /* @__PURE__ */ ct(
    "li",
    {
      className: U(
        "relative rounded-sm py-2 pl-3 pr-9 cursor-pointer select-none hover:bg-muted focus:outline-none focus:bg-muted",
        r,
        o === t ? "bg-primary/10" : ""
      ),
      onClick: a,
      role: "option",
      "aria-selected": o === t,
      children: [
        /* @__PURE__ */ S("span", { className: "block truncate", children: e }),
        o === t && /* @__PURE__ */ S("span", { className: "absolute inset-y-0 right-0 flex items-center pr-4", children: /* @__PURE__ */ S("svg", { className: "w-5 h-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ S(
          "path",
          {
            fillRule: "evenodd",
            d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
            clipRule: "evenodd"
          }
        ) }) })
      ]
    }
  );
}
function Zu({ children: t, className: e }) {
  const { value: n } = j(se);
  return /* @__PURE__ */ S("span", { className: U("block truncate", e), children: n ? t : "Select an option" });
}
function Ju({ text: t, className: e }) {
  return /* @__PURE__ */ S("div", { className: U("block text-sm font-medium mb-1", e), children: t });
}
export {
  $u as Button,
  Ku as Checkbox,
  _u as Dropdown,
  qu as DropdownContent,
  Xu as DropdownItem,
  Zu as DropdownLabel,
  Yu as DropdownTrigger,
  Hr as FormField,
  Hu as Input,
  Wu as OnboardingHeader,
  ju as OnboardingProvider,
  Ru as OnboardingStepCircle,
  Gu as OnboardingStepIndicator,
  Uu as OnboardingStepWrapper,
  zu as OnboardingSteps,
  Ju as TextLabel,
  U as cn,
  Xr as useOnboarding
};

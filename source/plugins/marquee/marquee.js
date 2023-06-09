function t(t, s = document) {
  return s.getElementsByClassName(t);
}
function s(t, s, i) {
  for (let e = 0, h = t.length; e < h; e++) s.call(i, t[e], e);
}
function i(t, s, i, e) {
  t.addEventListener(s, i, e);
}
function e(t, s, i, e) {
  t.removeEventListener(s, i, e);
}
function h(t, s) {
  return t.getAttribute(s);
}
function n(t, s, i) {
  t.setAttribute(s, i);
}
const a = {
  css3easing: "linear",
  delayBeforeStart: 1e3,
  direction: "left",
  duplicated: !1,
  duration: 5e3,
  gap: 20,
  pauseOnHover: !1,
  recalcResize: !1,
  speed: 0,
  startVisible: !1,
};
let r = 0;
class Marquee {
  constructor(s, e) {
    if (void 0 === s) throw new Error("el cannot be undefined");
    if ("string" == typeof s) throw new Error("el cannot be just a selector");
    if (null === s) throw new Error("el cannot be null");
    (e = { ...a, ...e }), (this.t = s), (this.i = 3);
    for (const t in a) {
      let i = h(s, `data-${a[t]}`);
      null !== i &&
        "" !== i &&
        (("true" !== i && "false" !== i) || (i = Boolean(i)), (e[t] = i));
    }
    e.speed && (e.duration = (parseInt(s.clientWidth) / e.speed) * 1e3),
      (e.gap = e.duplicated ? parseInt(e.gap) : 0),
      (s.innerHTML = `<div class="js-marquee">${s.innerHTML}</div>`);
    const n = t("js-marquee", s)[0];
    (n.style.marginRight = `${e.gap}px`),
      (n.style.willChange = "transform"),
      (n.style.float = "left"),
      e.duplicated && s.appendChild(n.cloneNode(!0)),
      (s.innerHTML = `<div style="width:100000px" class="js-marquee-wrapper">${s.innerHTML}</div>`);
    const o = t("js-marquee-wrapper", s)[0],
      u = "up" === e.direction || "down" === e.direction;
    (this.h = o), (this.o = u), (this.u = e.duration), (this.l = e), this.p();
    const l = `marqueeAnimation-${Math.floor(1e7 * Math.random())}`,
      p = this.m(l, e.duration / 1e3, e.delayBeforeStart / 1e3, "infinite");
    (this.$ = l),
      (this.v = p),
      e.duplicated
        ? (u
            ? e.startVisible
              ? (this.h.style.transform = "translateY(0px)")
              : (this.h.style.transform = `translateY(${
                  "up" === e.direction ? this.g : -1 * (2 * this.I - e.gap)
                }px)`)
            : e.startVisible
            ? (this.h.style.transform = "translateX(0px)")
            : (this.h.style.transform = `translateX(${
                "left" === e.direction ? this.q : -1 * (2 * this.j - e.gap)
              }px)`),
          e.startVisible || (this.i = 1))
        : e.startVisible
        ? (this.i = 2)
        : u
        ? this.S()
        : this.X(),
      i(this.t, "pause", this.pause.bind(this)),
      i(this.t, "resume", this.resume.bind(this)),
      e.pauseOnHover &&
        (i(this.t, "mouseover", this.pause.bind(this)),
        i(this.t, "mouseout", this.resume.bind(this))),
      (this.Y = () => {
        this._(u), this.t.dispatchEvent(new CustomEvent("finished"));
      }),
      (this.C = r),
      r++,
      this._(u),
      e.recalcResize && i(window, "resize", this.B.bind(this));
  }
  m(t = "", s = 0, i = 0, e = "") {
    return `${t} ${s}s ${i}s ${e} ${this.l.css3easing}`;
  }
  _(e = !1) {
    const h = this.l;
    if (h.duplicated) {
      if (1 === this.i) {
        let t = h.duration;
        (t = e
          ? "up" === h.direction
            ? t + this.g / (this.I / t)
            : 2 * t
          : "left" === h.direction
          ? t + this.q / (this.j / t)
          : 2 * t),
          (this.v = this.m(this.$, t / 1e3, h.delayBeforeStart / 1e3));
      } else
        2 === this.i &&
          ((this.$ = `${this.$}0`),
          (this.v = this.m(this.$, h.duration / 1e3, 0, "infinite")));
      this.i++;
    }
    let a = "";
    e
      ? h.duplicated
        ? (this.i > 2 &&
            (this.h.style.transform = `translateY(${
              "up" === h.direction ? 0 : -1 * this.I
            }px)`),
          (a = `translateY(${"up" === h.direction ? -1 * this.I : 0}px)`))
        : h.startVisible
        ? 2 === this.i
          ? ((this.v = this.m(
              this.$,
              h.duration / 1e3,
              h.delayBeforeStart / 1e3
            )),
            (a = `translateY(${
              "up" === h.direction ? -1 * this.I : this.g
            }px)`),
            this.i++)
          : 3 === this.i &&
            ((this.$ = `${this.$}0`),
            (this.v = this.m(this.$, this.H / 1e3, 0, "infinite")),
            this.S())
        : (this.S(),
          (a = `translateY(${
            "up" === h.direction ? -1 * this.h.clientHeight : this.g
          }px)`))
      : h.duplicated
      ? (this.i > 2 &&
          (this.h.style.transform = `translateX(${
            "left" === h.direction ? 0 : -1 * this.j
          }px)`),
        (a = `translateX(${"left" === h.direction ? -1 * this.j : 0}px)`))
      : h.startVisible
      ? 2 === this.i
        ? ((this.v = this.m(
            this.$,
            h.duration / 1e3,
            h.delayBeforeStart / 1e3
          )),
          (a = `translateX(${
            "left" === h.direction ? -1 * this.j : this.q
          }px)`),
          this.i++)
        : 3 === this.i &&
          ((this.$ = `${this.$}0`),
          (this.v = this.m(this.$, h.duration / 1e3, 0, "infinite")),
          this.X())
      : (this.X(),
        (a = `translateX(${"left" === h.direction ? -1 * this.j : this.q}px)`)),
      this.t.dispatchEvent(new CustomEvent("beforeStarting")),
      (this.h.style.animation = this.v);
    const r = `@keyframes ${this.$} {\n        100% {\n          transform: ${a};\n        }\n      }`,
      o = (function (t, s = document) {
        return s.querySelectorAll(t);
      })("style", this.h);
    if (o.length) o[o.length - 1].innerHTML = r;
    else if (t(`marq-wrap-style-${this.C}`).length)
      t(`marq-wrap-style-${this.C}`)[0].innerHTML = r;
    else {
      const t = document.createElement("style");
      !(function (t, ...i) {
        function e(t, ...s) {
          s.forEach((s) => {
            t.classList.add(s);
          });
        }
        void 0 === t.length
          ? e(t, ...i)
          : s(t, (t) => {
              e(t, ...i);
            });
      })(t, `marq-wrap-style-${this.C}`),
        (t.innerHTML = r),
        (function (t, s = document) {
          return s.querySelector(t);
        })("head").appendChild(t);
    }
    i(this.h, "animationiteration", this.M.bind(this), { once: !0 }),
      i(this.h, "animationend", this.Y.bind(this), { once: !0 }),
      (this.R = "running"),
      n(this.t, "data-runningStatus", "resumed");
  }
  M() {
    this.t.dispatchEvent(new CustomEvent("finished"));
  }
  S() {
    this.h.style.transform = `translateY(${
      "up" === this.l.direction ? this.g : -1 * this.I
    }px)`;
  }
  X() {
    this.h.style.transform = `translateX(${
      "left" === this.l.direction ? this.q : -1 * this.j
    }px)`;
  }
  p() {
    const i = this.t,
      e = this.l;
    if (this.o) {
      const h = i.clientHeight;
      (this.g = h),
        (function (t, s) {
          t.removeAttribute(s);
        })(this.h, "style"),
        (i.style.clientHeight = `${h}px`);
      const n = t("js-marquee", i),
        a = n.length - 1;
      s(n, (t, s) => {
        (t.style.float = "none"),
          (t.style.marginRight = "0px"),
          e.duplicated && s === a
            ? (t.style.marginBottom = "0px")
            : (t.style.marginBottom = `${e.gap}px`);
      });
      const r = parseInt(n[0].clientHeight + e.gap);
      (this.I = r),
        e.startVisible && !e.duplicated
          ? ((this.H = ((r + h) / parseInt(h)) * this.u),
            (e.duration = (r / parseInt(h)) * this.u))
          : (e.duration = (r / parseInt(h) / parseInt(h)) * this.u);
    } else {
      const s = parseInt(t("js-marquee", i)[0].clientWidth + e.gap),
        h = i.clientWidth;
      (this.q = h),
        (this.j = s),
        e.startVisible && !e.duplicated
          ? ((this.H = ((s + h) / parseInt(h)) * this.u),
            (e.duration = (s / parseInt(h)) * this.u))
          : (e.duration = ((s + parseInt(h)) / parseInt(h)) * this.u);
    }
    e.duplicated && (e.duration = e.duration / 2);
  }
  B() {
    this.p(), (this.i = 2), this.Y();
  }
  pause() {
    (this.h.style.animationPlayState = "paused"),
      (this.R = "paused"),
      n(this.t, "data-runningStatus", "paused"),
      this.t.dispatchEvent(new CustomEvent("paused"));
  }
  resume() {
    (this.h.style.animationPlayState = "running"),
      (this.R = "running"),
      n(this.t, "data-runningStatus", "resumed"),
      this.t.dispatchEvent(new CustomEvent("resumed"));
  }
  toggle() {
    "paused" === this.R ? this.resume() : "running" === this.R && this.pause();
  }
  V() {
    e(this.t, "pause", this.pause.bind(this)),
      e(this.t, "resume", this.resume.bind(this)),
      this.l.pauseOnHover &&
        (e(this.t, "mouseover", this.pause.bind(this)),
        e(this.t, "mouseout", this.resume.bind(this))),
      e(this.h, "animationiteration", this.M.bind(this), { once: !0 }),
      e(this.h, "animationend", this.Y.bind(this), { once: !0 }),
      this.l.recalcResize && e(window, "resize", this.B.bind(this));
  }
  refresh() {
    this.B();
  }
}

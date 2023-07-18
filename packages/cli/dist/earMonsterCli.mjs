
function _e(s) {
  if (s.__esModule)
    return s;
  var e = s.default;
  if (typeof e == "function") {
    var t = function n() {
      if (this instanceof n) {
        var i = [null];
        i.push.apply(i, arguments);
        var r = Function.bind.apply(e, i);
        return new r();
      }
      return e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(s).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(s, n);
    Object.defineProperty(t, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return s[n];
      }
    });
  }), t;
}
var T = {}, ve = {
  get exports() {
    return T;
  },
  set exports(s) {
    T = s;
  }
}, H = {}, $ = {};
let Z = class extends Error {
  /**
   * Constructs the CommanderError class
   * @param {number} exitCode suggested exit code which could be used with process.exit
   * @param {string} code an id string representing the error
   * @param {string} message human-readable description of the error
   * @constructor
   */
  constructor(e, t, n) {
    super(n), Error.captureStackTrace(this, this.constructor), this.name = this.constructor.name, this.code = t, this.exitCode = e, this.nestedError = void 0;
  }
}, Oe = class extends Z {
  /**
   * Constructs the InvalidArgumentError class
   * @param {string} [message] explanation of why argument is invalid
   * @constructor
   */
  constructor(e) {
    super(1, "commander.invalidArgument", e), Error.captureStackTrace(this, this.constructor), this.name = this.constructor.name;
  }
};
$.CommanderError = Z;
$.InvalidArgumentError = Oe;
const { InvalidArgumentError: be } = $;
let Ce = class {
  /**
   * Initialize a new command argument with the given name and description.
   * The default is that the argument is required, and you can explicitly
   * indicate this with <> around the name. Put [] around the name for an optional argument.
   *
   * @param {string} name
   * @param {string} [description]
   */
  constructor(e, t) {
    switch (this.description = t || "", this.variadic = !1, this.parseArg = void 0, this.defaultValue = void 0, this.defaultValueDescription = void 0, this.argChoices = void 0, e[0]) {
      case "<":
        this.required = !0, this._name = e.slice(1, -1);
        break;
      case "[":
        this.required = !1, this._name = e.slice(1, -1);
        break;
      default:
        this.required = !0, this._name = e;
        break;
    }
    this._name.length > 3 && this._name.slice(-3) === "..." && (this.variadic = !0, this._name = this._name.slice(0, -3));
  }
  /**
   * Return argument name.
   *
   * @return {string}
   */
  name() {
    return this._name;
  }
  /**
   * @api private
   */
  _concatValue(e, t) {
    return t === this.defaultValue || !Array.isArray(t) ? [e] : t.concat(e);
  }
  /**
   * Set the default value, and optionally supply the description to be displayed in the help.
   *
   * @param {any} value
   * @param {string} [description]
   * @return {Argument}
   */
  default(e, t) {
    return this.defaultValue = e, this.defaultValueDescription = t, this;
  }
  /**
   * Set the custom handler for processing CLI command arguments into argument values.
   *
   * @param {Function} [fn]
   * @return {Argument}
   */
  argParser(e) {
    return this.parseArg = e, this;
  }
  /**
   * Only allow argument value to be one of choices.
   *
   * @param {string[]} values
   * @return {Argument}
   */
  choices(e) {
    return this.argChoices = e.slice(), this.parseArg = (t, n) => {
      if (!this.argChoices.includes(t))
        throw new be(`Allowed choices are ${this.argChoices.join(", ")}.`);
      return this.variadic ? this._concatValue(t, n) : t;
    }, this;
  }
  /**
   * Make argument required.
   */
  argRequired() {
    return this.required = !0, this;
  }
  /**
   * Make argument optional.
   */
  argOptional() {
    return this.required = !1, this;
  }
};
function we(s) {
  const e = s.name() + (s.variadic === !0 ? "..." : "");
  return s.required ? "<" + e + ">" : "[" + e + "]";
}
H.Argument = Ce;
H.humanReadableArgName = we;
var ee = {}, N = {}, Ae = {
  get exports() {
    return N;
  },
  set exports(s) {
    N = s;
  }
}, E = typeof Reflect == "object" ? Reflect : null, K = E && typeof E.apply == "function" ? E.apply : function(e, t, n) {
  return Function.prototype.apply.call(e, t, n);
}, L;
E && typeof E.ownKeys == "function" ? L = E.ownKeys : Object.getOwnPropertySymbols ? L = function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : L = function(e) {
  return Object.getOwnPropertyNames(e);
};
function ye(s) {
  console && console.warn && console.warn(s);
}
var te = Number.isNaN || function(e) {
  return e !== e;
};
function c() {
  c.init.call(this);
}
Ae.exports = c;
N.once = Se;
c.EventEmitter = c;
c.prototype._events = void 0;
c.prototype._eventsCount = 0;
c.prototype._maxListeners = void 0;
var J = 10;
function k(s) {
  if (typeof s != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof s);
}
Object.defineProperty(c, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return J;
  },
  set: function(s) {
    if (typeof s != "number" || s < 0 || te(s))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + s + ".");
    J = s;
  }
});
c.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
c.prototype.setMaxListeners = function(e) {
  if (typeof e != "number" || e < 0 || te(e))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
  return this._maxListeners = e, this;
};
function ne(s) {
  return s._maxListeners === void 0 ? c.defaultMaxListeners : s._maxListeners;
}
c.prototype.getMaxListeners = function() {
  return ne(this);
};
c.prototype.emit = function(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t.push(arguments[n]);
  var i = e === "error", r = this._events;
  if (r !== void 0)
    i = i && r.error === void 0;
  else if (!i)
    return !1;
  if (i) {
    var o;
    if (t.length > 0 && (o = t[0]), o instanceof Error)
      throw o;
    var u = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
    throw u.context = o, u;
  }
  var a = r[e];
  if (a === void 0)
    return !1;
  if (typeof a == "function")
    K(a, this, t);
  else
    for (var l = a.length, h = ae(a, l), n = 0; n < l; ++n)
      K(h[n], this, t);
  return !0;
};
function ie(s, e, t, n) {
  var i, r, o;
  if (k(t), r = s._events, r === void 0 ? (r = s._events = /* @__PURE__ */ Object.create(null), s._eventsCount = 0) : (r.newListener !== void 0 && (s.emit(
    "newListener",
    e,
    t.listener ? t.listener : t
  ), r = s._events), o = r[e]), o === void 0)
    o = r[e] = t, ++s._eventsCount;
  else if (typeof o == "function" ? o = r[e] = n ? [t, o] : [o, t] : n ? o.unshift(t) : o.push(t), i = ne(s), i > 0 && o.length > i && !o.warned) {
    o.warned = !0;
    var u = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    u.name = "MaxListenersExceededWarning", u.emitter = s, u.type = e, u.count = o.length, ye(u);
  }
  return s;
}
c.prototype.addListener = function(e, t) {
  return ie(this, e, t, !1);
};
c.prototype.on = c.prototype.addListener;
c.prototype.prependListener = function(e, t) {
  return ie(this, e, t, !0);
};
function Ee() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function re(s, e, t) {
  var n = { fired: !1, wrapFn: void 0, target: s, type: e, listener: t }, i = Ee.bind(n);
  return i.listener = t, n.wrapFn = i, i;
}
c.prototype.once = function(e, t) {
  return k(t), this.on(e, re(this, e, t)), this;
};
c.prototype.prependOnceListener = function(e, t) {
  return k(t), this.prependListener(e, re(this, e, t)), this;
};
c.prototype.removeListener = function(e, t) {
  var n, i, r, o, u;
  if (k(t), i = this._events, i === void 0)
    return this;
  if (n = i[e], n === void 0)
    return this;
  if (n === t || n.listener === t)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, n.listener || t));
  else if (typeof n != "function") {
    for (r = -1, o = n.length - 1; o >= 0; o--)
      if (n[o] === t || n[o].listener === t) {
        u = n[o].listener, r = o;
        break;
      }
    if (r < 0)
      return this;
    r === 0 ? n.shift() : xe(n, r), n.length === 1 && (i[e] = n[0]), i.removeListener !== void 0 && this.emit("removeListener", e, u || t);
  }
  return this;
};
c.prototype.off = c.prototype.removeListener;
c.prototype.removeAllListeners = function(e) {
  var t, n, i;
  if (n = this._events, n === void 0)
    return this;
  if (n.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : n[e] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete n[e]), this;
  if (arguments.length === 0) {
    var r = Object.keys(n), o;
    for (i = 0; i < r.length; ++i)
      o = r[i], o !== "removeListener" && this.removeAllListeners(o);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (t = n[e], typeof t == "function")
    this.removeListener(e, t);
  else if (t !== void 0)
    for (i = t.length - 1; i >= 0; i--)
      this.removeListener(e, t[i]);
  return this;
};
function se(s, e, t) {
  var n = s._events;
  if (n === void 0)
    return [];
  var i = n[e];
  return i === void 0 ? [] : typeof i == "function" ? t ? [i.listener || i] : [i] : t ? $e(i) : ae(i, i.length);
}
c.prototype.listeners = function(e) {
  return se(this, e, !0);
};
c.prototype.rawListeners = function(e) {
  return se(this, e, !1);
};
c.listenerCount = function(s, e) {
  return typeof s.listenerCount == "function" ? s.listenerCount(e) : oe.call(s, e);
};
c.prototype.listenerCount = oe;
function oe(s) {
  var e = this._events;
  if (e !== void 0) {
    var t = e[s];
    if (typeof t == "function")
      return 1;
    if (t !== void 0)
      return t.length;
  }
  return 0;
}
c.prototype.eventNames = function() {
  return this._eventsCount > 0 ? L(this._events) : [];
};
function ae(s, e) {
  for (var t = new Array(e), n = 0; n < e; ++n)
    t[n] = s[n];
  return t;
}
function xe(s, e) {
  for (; e + 1 < s.length; e++)
    s[e] = s[e + 1];
  s.pop();
}
function $e(s) {
  for (var e = new Array(s.length), t = 0; t < e.length; ++t)
    e[t] = s[t].listener || s[t];
  return e;
}
function Se(s, e) {
  return new Promise(function(t, n) {
    function i(o) {
      s.removeListener(e, r), n(o);
    }
    function r() {
      typeof s.removeListener == "function" && s.removeListener("error", i), t([].slice.call(arguments));
    }
    ue(s, e, r, { once: !0 }), e !== "error" && He(s, i, { once: !0 });
  });
}
function He(s, e, t) {
  typeof s.on == "function" && ue(s, "error", e, t);
}
function ue(s, e, t, n) {
  if (typeof s.on == "function")
    n.once ? s.once(e, t) : s.on(e, t);
  else if (typeof s.addEventListener == "function")
    s.addEventListener(e, function i(r) {
      n.once && s.removeEventListener(e, i), t(r);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof s);
}
const P = {}, Ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: P
}, Symbol.toStringTag, { value: "Module" })), U = /* @__PURE__ */ _e(Ve);
var W = {}, Le = {
  get exports() {
    return W;
  },
  set exports(s) {
    W = s;
  }
}, m = Le.exports = {}, _, v;
function R() {
  throw new Error("setTimeout has not been defined");
}
function q() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? _ = setTimeout : _ = R;
  } catch {
    _ = R;
  }
  try {
    typeof clearTimeout == "function" ? v = clearTimeout : v = q;
  } catch {
    v = q;
  }
})();
function le(s) {
  if (_ === setTimeout)
    return setTimeout(s, 0);
  if ((_ === R || !_) && setTimeout)
    return _ = setTimeout, setTimeout(s, 0);
  try {
    return _(s, 0);
  } catch {
    try {
      return _.call(null, s, 0);
    } catch {
      return _.call(this, s, 0);
    }
  }
}
function Fe(s) {
  if (v === clearTimeout)
    return clearTimeout(s);
  if ((v === q || !v) && clearTimeout)
    return v = clearTimeout, clearTimeout(s);
  try {
    return v(s);
  } catch {
    try {
      return v.call(null, s);
    } catch {
      return v.call(this, s);
    }
  }
}
var b = [], x = !1, y, F = -1;
function Te() {
  !x || !y || (x = !1, y.length ? b = y.concat(b) : F = -1, b.length && he());
}
function he() {
  if (!x) {
    var s = le(Te);
    x = !0;
    for (var e = b.length; e; ) {
      for (y = b, b = []; ++F < e; )
        y && y[F].run();
      F = -1, e = b.length;
    }
    y = null, x = !1, Fe(s);
  }
}
m.nextTick = function(s) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var t = 1; t < arguments.length; t++)
      e[t - 1] = arguments[t];
  b.push(new ce(s, e)), b.length === 1 && !x && le(he);
};
function ce(s, e) {
  this.fun = s, this.array = e;
}
ce.prototype.run = function() {
  this.fun.apply(null, this.array);
};
m.title = "browser";
m.browser = !0;
m.env = {};
m.argv = [];
m.version = "";
m.versions = {};
function C() {
}
m.on = C;
m.addListener = C;
m.once = C;
m.off = C;
m.removeListener = C;
m.removeAllListeners = C;
m.emit = C;
m.prependListener = C;
m.prependOnceListener = C;
m.listeners = function(s) {
  return [];
};
m.binding = function(s) {
  throw new Error("process.binding is not supported");
};
m.cwd = function() {
  return "/";
};
m.chdir = function(s) {
  throw new Error("process.chdir is not supported");
};
m.umask = function() {
  return 0;
};
var G = {};
const { humanReadableArgName: Ne } = H;
let ke = class {
  constructor() {
    this.helpWidth = void 0, this.sortSubcommands = !1, this.sortOptions = !1, this.showGlobalOptions = !1;
  }
  /**
   * Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
   *
   * @param {Command} cmd
   * @returns {Command[]}
   */
  visibleCommands(e) {
    const t = e.commands.filter((n) => !n._hidden);
    if (e._hasImplicitHelpCommand()) {
      const [, n, i] = e._helpCommandnameAndArgs.match(/([^ ]+) *(.*)/), r = e.createCommand(n).helpOption(!1);
      r.description(e._helpCommandDescription), i && r.arguments(i), t.push(r);
    }
    return this.sortSubcommands && t.sort((n, i) => n.name().localeCompare(i.name())), t;
  }
  /**
   * Compare options for sort.
   *
   * @param {Option} a
   * @param {Option} b
   * @returns number
   */
  compareOptions(e, t) {
    const n = (i) => i.short ? i.short.replace(/^-/, "") : i.long.replace(/^--/, "");
    return n(e).localeCompare(n(t));
  }
  /**
   * Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
   *
   * @param {Command} cmd
   * @returns {Option[]}
   */
  visibleOptions(e) {
    const t = e.options.filter((r) => !r.hidden), n = e._hasHelpOption && e._helpShortFlag && !e._findOption(e._helpShortFlag), i = e._hasHelpOption && !e._findOption(e._helpLongFlag);
    if (n || i) {
      let r;
      n ? i ? r = e.createOption(e._helpFlags, e._helpDescription) : r = e.createOption(e._helpShortFlag, e._helpDescription) : r = e.createOption(e._helpLongFlag, e._helpDescription), t.push(r);
    }
    return this.sortOptions && t.sort(this.compareOptions), t;
  }
  /**
   * Get an array of the visible global options. (Not including help.)
   *
   * @param {Command} cmd
   * @returns {Option[]}
   */
  visibleGlobalOptions(e) {
    if (!this.showGlobalOptions)
      return [];
    const t = [];
    for (let n = e.parent; n; n = n.parent) {
      const i = n.options.filter((r) => !r.hidden);
      t.push(...i);
    }
    return this.sortOptions && t.sort(this.compareOptions), t;
  }
  /**
   * Get an array of the arguments if any have a description.
   *
   * @param {Command} cmd
   * @returns {Argument[]}
   */
  visibleArguments(e) {
    return e._argsDescription && e._args.forEach((t) => {
      t.description = t.description || e._argsDescription[t.name()] || "";
    }), e._args.find((t) => t.description) ? e._args : [];
  }
  /**
   * Get the command term to show in the list of subcommands.
   *
   * @param {Command} cmd
   * @returns {string}
   */
  subcommandTerm(e) {
    const t = e._args.map((n) => Ne(n)).join(" ");
    return e._name + (e._aliases[0] ? "|" + e._aliases[0] : "") + (e.options.length ? " [options]" : "") + // simplistic check for non-help option
    (t ? " " + t : "");
  }
  /**
   * Get the option term to show in the list of options.
   *
   * @param {Option} option
   * @returns {string}
   */
  optionTerm(e) {
    return e.flags;
  }
  /**
   * Get the argument term to show in the list of arguments.
   *
   * @param {Argument} argument
   * @returns {string}
   */
  argumentTerm(e) {
    return e.name();
  }
  /**
   * Get the longest command term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */
  longestSubcommandTermLength(e, t) {
    return t.visibleCommands(e).reduce((n, i) => Math.max(n, t.subcommandTerm(i).length), 0);
  }
  /**
   * Get the longest option term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */
  longestOptionTermLength(e, t) {
    return t.visibleOptions(e).reduce((n, i) => Math.max(n, t.optionTerm(i).length), 0);
  }
  /**
   * Get the longest global option term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */
  longestGlobalOptionTermLength(e, t) {
    return t.visibleGlobalOptions(e).reduce((n, i) => Math.max(n, t.optionTerm(i).length), 0);
  }
  /**
   * Get the longest argument term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */
  longestArgumentTermLength(e, t) {
    return t.visibleArguments(e).reduce((n, i) => Math.max(n, t.argumentTerm(i).length), 0);
  }
  /**
   * Get the command usage to be displayed at the top of the built-in help.
   *
   * @param {Command} cmd
   * @returns {string}
   */
  commandUsage(e) {
    let t = e._name;
    e._aliases[0] && (t = t + "|" + e._aliases[0]);
    let n = "";
    for (let i = e.parent; i; i = i.parent)
      n = i.name() + " " + n;
    return n + t + " " + e.usage();
  }
  /**
   * Get the description for the command.
   *
   * @param {Command} cmd
   * @returns {string}
   */
  commandDescription(e) {
    return e.description();
  }
  /**
   * Get the subcommand summary to show in the list of subcommands.
   * (Fallback to description for backwards compatibility.)
   *
   * @param {Command} cmd
   * @returns {string}
   */
  subcommandDescription(e) {
    return e.summary() || e.description();
  }
  /**
   * Get the option description to show in the list of options.
   *
   * @param {Option} option
   * @return {string}
   */
  optionDescription(e) {
    const t = [];
    return e.argChoices && t.push(
      // use stringify to match the display of the default value
      `choices: ${e.argChoices.map((n) => JSON.stringify(n)).join(", ")}`
    ), e.defaultValue !== void 0 && (e.required || e.optional || e.isBoolean() && typeof e.defaultValue == "boolean") && t.push(`default: ${e.defaultValueDescription || JSON.stringify(e.defaultValue)}`), e.presetArg !== void 0 && e.optional && t.push(`preset: ${JSON.stringify(e.presetArg)}`), e.envVar !== void 0 && t.push(`env: ${e.envVar}`), t.length > 0 ? `${e.description} (${t.join(", ")})` : e.description;
  }
  /**
   * Get the argument description to show in the list of arguments.
   *
   * @param {Argument} argument
   * @return {string}
   */
  argumentDescription(e) {
    const t = [];
    if (e.argChoices && t.push(
      // use stringify to match the display of the default value
      `choices: ${e.argChoices.map((n) => JSON.stringify(n)).join(", ")}`
    ), e.defaultValue !== void 0 && t.push(`default: ${e.defaultValueDescription || JSON.stringify(e.defaultValue)}`), t.length > 0) {
      const n = `(${t.join(", ")})`;
      return e.description ? `${e.description} ${n}` : n;
    }
    return e.description;
  }
  /**
   * Generate the built-in help text.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {string}
   */
  formatHelp(e, t) {
    const n = t.padWidth(e, t), i = t.helpWidth || 80, r = 2, o = 2;
    function u(d, w) {
      if (w) {
        const D = `${d.padEnd(n + o)}${w}`;
        return t.wrap(D, i - r, n + o);
      }
      return d;
    }
    function a(d) {
      return d.join(`
`).replace(/^/gm, " ".repeat(r));
    }
    let l = [`Usage: ${t.commandUsage(e)}`, ""];
    const h = t.commandDescription(e);
    h.length > 0 && (l = l.concat([t.wrap(h, i, 0), ""]));
    const f = t.visibleArguments(e).map((d) => u(t.argumentTerm(d), t.argumentDescription(d)));
    f.length > 0 && (l = l.concat(["Arguments:", a(f), ""]));
    const g = t.visibleOptions(e).map((d) => u(t.optionTerm(d), t.optionDescription(d)));
    if (g.length > 0 && (l = l.concat(["Options:", a(g), ""])), this.showGlobalOptions) {
      const d = t.visibleGlobalOptions(e).map((w) => u(t.optionTerm(w), t.optionDescription(w)));
      d.length > 0 && (l = l.concat(["Global Options:", a(d), ""]));
    }
    const A = t.visibleCommands(e).map((d) => u(t.subcommandTerm(d), t.subcommandDescription(d)));
    return A.length > 0 && (l = l.concat(["Commands:", a(A), ""])), l.join(`
`);
  }
  /**
   * Calculate the pad width from the maximum term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */
  padWidth(e, t) {
    return Math.max(
      t.longestOptionTermLength(e, t),
      t.longestGlobalOptionTermLength(e, t),
      t.longestSubcommandTermLength(e, t),
      t.longestArgumentTermLength(e, t)
    );
  }
  /**
   * Wrap the given string to width characters per line, with lines after the first indented.
   * Do not wrap if insufficient room for wrapping (minColumnWidth), or string is manually formatted.
   *
   * @param {string} str
   * @param {number} width
   * @param {number} indent
   * @param {number} [minColumnWidth=40]
   * @return {string}
   *
   */
  wrap(e, t, n, i = 40) {
    const r = " \\f\\t\\v   -   　\uFEFF", o = new RegExp(`[\\n][${r}]+`);
    if (e.match(o))
      return e;
    const u = t - n;
    if (u < i)
      return e;
    const a = e.slice(0, n), l = e.slice(n).replace(`\r
`, `
`), h = " ".repeat(n), g = "\\s​", A = new RegExp(`
|.{1,${u - 1}}([${g}]|$)|[^${g}]+?([${g}]|$)`, "g"), d = l.match(A) || [];
    return a + d.map((w, D) => w === `
` ? "" : (D > 0 ? h : "") + w.trimEnd()).join(`
`);
  }
};
G.Help = ke;
var V = {};
const { InvalidArgumentError: Pe } = $;
let De = class {
  /**
   * Initialize a new `Option` with the given `flags` and `description`.
   *
   * @param {string} flags
   * @param {string} [description]
   */
  constructor(e, t) {
    this.flags = e, this.description = t || "", this.required = e.includes("<"), this.optional = e.includes("["), this.variadic = /\w\.\.\.[>\]]$/.test(e), this.mandatory = !1;
    const n = fe(e);
    this.short = n.shortFlag, this.long = n.longFlag, this.negate = !1, this.long && (this.negate = this.long.startsWith("--no-")), this.defaultValue = void 0, this.defaultValueDescription = void 0, this.presetArg = void 0, this.envVar = void 0, this.parseArg = void 0, this.hidden = !1, this.argChoices = void 0, this.conflictsWith = [], this.implied = void 0;
  }
  /**
   * Set the default value, and optionally supply the description to be displayed in the help.
   *
   * @param {any} value
   * @param {string} [description]
   * @return {Option}
   */
  default(e, t) {
    return this.defaultValue = e, this.defaultValueDescription = t, this;
  }
  /**
   * Preset to use when option used without option-argument, especially optional but also boolean and negated.
   * The custom processing (parseArg) is called.
   *
   * @example
   * new Option('--color').default('GREYSCALE').preset('RGB');
   * new Option('--donate [amount]').preset('20').argParser(parseFloat);
   *
   * @param {any} arg
   * @return {Option}
   */
  preset(e) {
    return this.presetArg = e, this;
  }
  /**
   * Add option name(s) that conflict with this option.
   * An error will be displayed if conflicting options are found during parsing.
   *
   * @example
   * new Option('--rgb').conflicts('cmyk');
   * new Option('--js').conflicts(['ts', 'jsx']);
   *
   * @param {string | string[]} names
   * @return {Option}
   */
  conflicts(e) {
    return this.conflictsWith = this.conflictsWith.concat(e), this;
  }
  /**
   * Specify implied option values for when this option is set and the implied options are not.
   *
   * The custom processing (parseArg) is not called on the implied values.
   *
   * @example
   * program
   *   .addOption(new Option('--log', 'write logging information to file'))
   *   .addOption(new Option('--trace', 'log extra details').implies({ log: 'trace.txt' }));
   *
   * @param {Object} impliedOptionValues
   * @return {Option}
   */
  implies(e) {
    let t = e;
    return typeof e == "string" && (t = { [e]: !0 }), this.implied = Object.assign(this.implied || {}, t), this;
  }
  /**
   * Set environment variable to check for option value.
   *
   * An environment variable is only used if when processed the current option value is
   * undefined, or the source of the current value is 'default' or 'config' or 'env'.
   *
   * @param {string} name
   * @return {Option}
   */
  env(e) {
    return this.envVar = e, this;
  }
  /**
   * Set the custom handler for processing CLI option arguments into option values.
   *
   * @param {Function} [fn]
   * @return {Option}
   */
  argParser(e) {
    return this.parseArg = e, this;
  }
  /**
   * Whether the option is mandatory and must have a value after parsing.
   *
   * @param {boolean} [mandatory=true]
   * @return {Option}
   */
  makeOptionMandatory(e = !0) {
    return this.mandatory = !!e, this;
  }
  /**
   * Hide option in help.
   *
   * @param {boolean} [hide=true]
   * @return {Option}
   */
  hideHelp(e = !0) {
    return this.hidden = !!e, this;
  }
  /**
   * @api private
   */
  _concatValue(e, t) {
    return t === this.defaultValue || !Array.isArray(t) ? [e] : t.concat(e);
  }
  /**
   * Only allow option value to be one of choices.
   *
   * @param {string[]} values
   * @return {Option}
   */
  choices(e) {
    return this.argChoices = e.slice(), this.parseArg = (t, n) => {
      if (!this.argChoices.includes(t))
        throw new Pe(`Allowed choices are ${this.argChoices.join(", ")}.`);
      return this.variadic ? this._concatValue(t, n) : t;
    }, this;
  }
  /**
   * Return option name.
   *
   * @return {string}
   */
  name() {
    return this.long ? this.long.replace(/^--/, "") : this.short.replace(/^-/, "");
  }
  /**
   * Return option name, in a camelcase format that can be used
   * as a object attribute key.
   *
   * @return {string}
   * @api private
   */
  attributeName() {
    return je(this.name().replace(/^no-/, ""));
  }
  /**
   * Check if `arg` matches the short or long flag.
   *
   * @param {string} arg
   * @return {boolean}
   * @api private
   */
  is(e) {
    return this.short === e || this.long === e;
  }
  /**
   * Return whether a boolean option.
   *
   * Options are one of boolean, negated, required argument, or optional argument.
   *
   * @return {boolean}
   * @api private
   */
  isBoolean() {
    return !this.required && !this.optional && !this.negate;
  }
}, Ie = class {
  /**
   * @param {Option[]} options
   */
  constructor(e) {
    this.positiveOptions = /* @__PURE__ */ new Map(), this.negativeOptions = /* @__PURE__ */ new Map(), this.dualOptions = /* @__PURE__ */ new Set(), e.forEach((t) => {
      t.negate ? this.negativeOptions.set(t.attributeName(), t) : this.positiveOptions.set(t.attributeName(), t);
    }), this.negativeOptions.forEach((t, n) => {
      this.positiveOptions.has(n) && this.dualOptions.add(n);
    });
  }
  /**
   * Did the value come from the option, and not from possible matching dual option?
   *
   * @param {any} value
   * @param {Option} option
   * @returns {boolean}
   */
  valueFromOption(e, t) {
    const n = t.attributeName();
    if (!this.dualOptions.has(n))
      return !0;
    const i = this.negativeOptions.get(n).presetArg, r = i !== void 0 ? i : !1;
    return t.negate === (r === e);
  }
};
function je(s) {
  return s.split("-").reduce((e, t) => e + t[0].toUpperCase() + t.slice(1));
}
function fe(s) {
  let e, t;
  const n = s.split(/[ |,]+/);
  return n.length > 1 && !/^[[<]/.test(n[1]) && (e = n.shift()), t = n.shift(), !e && /^-[^-]$/.test(t) && (e = t, t = void 0), { shortFlag: e, longFlag: t };
}
V.Option = De;
V.splitOptionFlags = fe;
V.DualOptions = Ie;
var pe = {};
const me = 3;
function Me(s, e) {
  if (Math.abs(s.length - e.length) > me)
    return Math.max(s.length, e.length);
  const t = [];
  for (let n = 0; n <= s.length; n++)
    t[n] = [n];
  for (let n = 0; n <= e.length; n++)
    t[0][n] = n;
  for (let n = 1; n <= e.length; n++)
    for (let i = 1; i <= s.length; i++) {
      let r = 1;
      s[i - 1] === e[n - 1] ? r = 0 : r = 1, t[i][n] = Math.min(
        t[i - 1][n] + 1,
        // deletion
        t[i][n - 1] + 1,
        // insertion
        t[i - 1][n - 1] + r
        // substitution
      ), i > 1 && n > 1 && s[i - 1] === e[n - 2] && s[i - 2] === e[n - 1] && (t[i][n] = Math.min(t[i][n], t[i - 2][n - 2] + 1));
    }
  return t[s.length][e.length];
}
function We(s, e) {
  if (!e || e.length === 0)
    return "";
  e = Array.from(new Set(e));
  const t = s.startsWith("--");
  t && (s = s.slice(2), e = e.map((o) => o.slice(2)));
  let n = [], i = me;
  const r = 0.4;
  return e.forEach((o) => {
    if (o.length <= 1)
      return;
    const u = Me(s, o), a = Math.max(s.length, o.length);
    (a - u) / a > r && (u < i ? (i = u, n = [o]) : u === i && n.push(o));
  }), n.sort((o, u) => o.localeCompare(u)), t && (n = n.map((o) => `--${o}`)), n.length > 1 ? `
(Did you mean one of ${n.join(", ")}?)` : n.length === 1 ? `
(Did you mean ${n[0]}?)` : "";
}
pe.suggestSimilar = We;
const Re = N.EventEmitter, I = U, O = U, j = U, p = W, { Argument: qe, humanReadableArgName: Ue } = H, { CommanderError: M } = $, { Help: Ge } = G, { Option: z, splitOptionFlags: Be, DualOptions: Ke } = V, { suggestSimilar: Q } = pe;
let Je = class de extends Re {
  /**
   * Initialize a new `Command`.
   *
   * @param {string} [name]
   */
  constructor(e) {
    super(), this.commands = [], this.options = [], this.parent = null, this._allowUnknownOption = !1, this._allowExcessArguments = !0, this._args = [], this.args = [], this.rawArgs = [], this.processedArgs = [], this._scriptPath = null, this._name = e || "", this._optionValues = {}, this._optionValueSources = {}, this._storeOptionsAsProperties = !1, this._actionHandler = null, this._executableHandler = !1, this._executableFile = null, this._executableDir = null, this._defaultCommandName = null, this._exitCallback = null, this._aliases = [], this._combineFlagAndOptionalValue = !0, this._description = "", this._summary = "", this._argsDescription = void 0, this._enablePositionalOptions = !1, this._passThroughOptions = !1, this._lifeCycleHooks = {}, this._showHelpAfterError = !1, this._showSuggestionAfterError = !0, this._outputConfiguration = {
      writeOut: (t) => p.stdout.write(t),
      writeErr: (t) => p.stderr.write(t),
      getOutHelpWidth: () => p.stdout.isTTY ? p.stdout.columns : void 0,
      getErrHelpWidth: () => p.stderr.isTTY ? p.stderr.columns : void 0,
      outputError: (t, n) => n(t)
    }, this._hidden = !1, this._hasHelpOption = !0, this._helpFlags = "-h, --help", this._helpDescription = "display help for command", this._helpShortFlag = "-h", this._helpLongFlag = "--help", this._addImplicitHelpCommand = void 0, this._helpCommandName = "help", this._helpCommandnameAndArgs = "help [command]", this._helpCommandDescription = "display help for command", this._helpConfiguration = {};
  }
  /**
   * Copy settings that are useful to have in common across root command and subcommands.
   *
   * (Used internally when adding a command using `.command()` so subcommands inherit parent settings.)
   *
   * @param {Command} sourceCommand
   * @return {Command} `this` command for chaining
   */
  copyInheritedSettings(e) {
    return this._outputConfiguration = e._outputConfiguration, this._hasHelpOption = e._hasHelpOption, this._helpFlags = e._helpFlags, this._helpDescription = e._helpDescription, this._helpShortFlag = e._helpShortFlag, this._helpLongFlag = e._helpLongFlag, this._helpCommandName = e._helpCommandName, this._helpCommandnameAndArgs = e._helpCommandnameAndArgs, this._helpCommandDescription = e._helpCommandDescription, this._helpConfiguration = e._helpConfiguration, this._exitCallback = e._exitCallback, this._storeOptionsAsProperties = e._storeOptionsAsProperties, this._combineFlagAndOptionalValue = e._combineFlagAndOptionalValue, this._allowExcessArguments = e._allowExcessArguments, this._enablePositionalOptions = e._enablePositionalOptions, this._showHelpAfterError = e._showHelpAfterError, this._showSuggestionAfterError = e._showSuggestionAfterError, this;
  }
  /**
   * Define a command.
   *
   * There are two styles of command: pay attention to where to put the description.
   *
   * @example
   * // Command implemented using action handler (description is supplied separately to `.command`)
   * program
   *   .command('clone <source> [destination]')
   *   .description('clone a repository into a newly created directory')
   *   .action((source, destination) => {
   *     console.log('clone command called');
   *   });
   *
   * // Command implemented using separate executable file (description is second parameter to `.command`)
   * program
   *   .command('start <service>', 'start named service')
   *   .command('stop [service]', 'stop named service, or all if no name supplied');
   *
   * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
   * @param {Object|string} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
   * @param {Object} [execOpts] - configuration options (for executable)
   * @return {Command} returns new command for action handler, or `this` for executable command
   */
  command(e, t, n) {
    let i = t, r = n;
    typeof i == "object" && i !== null && (r = i, i = null), r = r || {};
    const [, o, u] = e.match(/([^ ]+) *(.*)/), a = this.createCommand(o);
    return i && (a.description(i), a._executableHandler = !0), r.isDefault && (this._defaultCommandName = a._name), a._hidden = !!(r.noHelp || r.hidden), a._executableFile = r.executableFile || null, u && a.arguments(u), this.commands.push(a), a.parent = this, a.copyInheritedSettings(this), i ? this : a;
  }
  /**
   * Factory routine to create a new unattached command.
   *
   * See .command() for creating an attached subcommand, which uses this routine to
   * create the command. You can override createCommand to customise subcommands.
   *
   * @param {string} [name]
   * @return {Command} new command
   */
  createCommand(e) {
    return new de(e);
  }
  /**
   * You can customise the help with a subclass of Help by overriding createHelp,
   * or by overriding Help properties using configureHelp().
   *
   * @return {Help}
   */
  createHelp() {
    return Object.assign(new Ge(), this.configureHelp());
  }
  /**
   * You can customise the help by overriding Help properties using configureHelp(),
   * or with a subclass of Help by overriding createHelp().
   *
   * @param {Object} [configuration] - configuration options
   * @return {Command|Object} `this` command for chaining, or stored configuration
   */
  configureHelp(e) {
    return e === void 0 ? this._helpConfiguration : (this._helpConfiguration = e, this);
  }
  /**
   * The default output goes to stdout and stderr. You can customise this for special
   * applications. You can also customise the display of errors by overriding outputError.
   *
   * The configuration properties are all functions:
   *
   *     // functions to change where being written, stdout and stderr
   *     writeOut(str)
   *     writeErr(str)
   *     // matching functions to specify width for wrapping help
   *     getOutHelpWidth()
   *     getErrHelpWidth()
   *     // functions based on what is being written out
   *     outputError(str, write) // used for displaying errors, and not used for displaying help
   *
   * @param {Object} [configuration] - configuration options
   * @return {Command|Object} `this` command for chaining, or stored configuration
   */
  configureOutput(e) {
    return e === void 0 ? this._outputConfiguration : (Object.assign(this._outputConfiguration, e), this);
  }
  /**
   * Display the help or a custom message after an error occurs.
   *
   * @param {boolean|string} [displayHelp]
   * @return {Command} `this` command for chaining
   */
  showHelpAfterError(e = !0) {
    return typeof e != "string" && (e = !!e), this._showHelpAfterError = e, this;
  }
  /**
   * Display suggestion of similar commands for unknown commands, or options for unknown options.
   *
   * @param {boolean} [displaySuggestion]
   * @return {Command} `this` command for chaining
   */
  showSuggestionAfterError(e = !0) {
    return this._showSuggestionAfterError = !!e, this;
  }
  /**
   * Add a prepared subcommand.
   *
   * See .command() for creating an attached subcommand which inherits settings from its parent.
   *
   * @param {Command} cmd - new subcommand
   * @param {Object} [opts] - configuration options
   * @return {Command} `this` command for chaining
   */
  addCommand(e, t) {
    if (!e._name)
      throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
    return t = t || {}, t.isDefault && (this._defaultCommandName = e._name), (t.noHelp || t.hidden) && (e._hidden = !0), this.commands.push(e), e.parent = this, this;
  }
  /**
   * Factory routine to create a new unattached argument.
   *
   * See .argument() for creating an attached argument, which uses this routine to
   * create the argument. You can override createArgument to return a custom argument.
   *
   * @param {string} name
   * @param {string} [description]
   * @return {Argument} new argument
   */
  createArgument(e, t) {
    return new qe(e, t);
  }
  /**
   * Define argument syntax for command.
   *
   * The default is that the argument is required, and you can explicitly
   * indicate this with <> around the name. Put [] around the name for an optional argument.
   *
   * @example
   * program.argument('<input-file>');
   * program.argument('[output-file]');
   *
   * @param {string} name
   * @param {string} [description]
   * @param {Function|*} [fn] - custom argument processing function
   * @param {*} [defaultValue]
   * @return {Command} `this` command for chaining
   */
  argument(e, t, n, i) {
    const r = this.createArgument(e, t);
    return typeof n == "function" ? r.default(i).argParser(n) : r.default(n), this.addArgument(r), this;
  }
  /**
   * Define argument syntax for command, adding multiple at once (without descriptions).
   *
   * See also .argument().
   *
   * @example
   * program.arguments('<cmd> [env]');
   *
   * @param {string} names
   * @return {Command} `this` command for chaining
   */
  arguments(e) {
    return e.trim().split(/ +/).forEach((t) => {
      this.argument(t);
    }), this;
  }
  /**
   * Define argument syntax for command, adding a prepared argument.
   *
   * @param {Argument} argument
   * @return {Command} `this` command for chaining
   */
  addArgument(e) {
    const t = this._args.slice(-1)[0];
    if (t && t.variadic)
      throw new Error(`only the last argument can be variadic '${t.name()}'`);
    if (e.required && e.defaultValue !== void 0 && e.parseArg === void 0)
      throw new Error(`a default value for a required argument is never used: '${e.name()}'`);
    return this._args.push(e), this;
  }
  /**
   * Override default decision whether to add implicit help command.
   *
   *    addHelpCommand() // force on
   *    addHelpCommand(false); // force off
   *    addHelpCommand('help [cmd]', 'display help for [cmd]'); // force on with custom details
   *
   * @return {Command} `this` command for chaining
   */
  addHelpCommand(e, t) {
    return e === !1 ? this._addImplicitHelpCommand = !1 : (this._addImplicitHelpCommand = !0, typeof e == "string" && (this._helpCommandName = e.split(" ")[0], this._helpCommandnameAndArgs = e), this._helpCommandDescription = t || this._helpCommandDescription), this;
  }
  /**
   * @return {boolean}
   * @api private
   */
  _hasImplicitHelpCommand() {
    return this._addImplicitHelpCommand === void 0 ? this.commands.length && !this._actionHandler && !this._findCommand("help") : this._addImplicitHelpCommand;
  }
  /**
   * Add hook for life cycle event.
   *
   * @param {string} event
   * @param {Function} listener
   * @return {Command} `this` command for chaining
   */
  hook(e, t) {
    const n = ["preSubcommand", "preAction", "postAction"];
    if (!n.includes(e))
      throw new Error(`Unexpected value for event passed to hook : '${e}'.
Expecting one of '${n.join("', '")}'`);
    return this._lifeCycleHooks[e] ? this._lifeCycleHooks[e].push(t) : this._lifeCycleHooks[e] = [t], this;
  }
  /**
   * Register callback to use as replacement for calling process.exit.
   *
   * @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
   * @return {Command} `this` command for chaining
   */
  exitOverride(e) {
    return e ? this._exitCallback = e : this._exitCallback = (t) => {
      if (t.code !== "commander.executeSubCommandAsync")
        throw t;
    }, this;
  }
  /**
   * Call process.exit, and _exitCallback if defined.
   *
   * @param {number} exitCode exit code for using with process.exit
   * @param {string} code an id string representing the error
   * @param {string} message human-readable description of the error
   * @return never
   * @api private
   */
  _exit(e, t, n) {
    this._exitCallback && this._exitCallback(new M(e, t, n)), p.exit(e);
  }
  /**
   * Register callback `fn` for the command.
   *
   * @example
   * program
   *   .command('serve')
   *   .description('start service')
   *   .action(function() {
   *      // do work here
   *   });
   *
   * @param {Function} fn
   * @return {Command} `this` command for chaining
   */
  action(e) {
    const t = (n) => {
      const i = this._args.length, r = n.slice(0, i);
      return this._storeOptionsAsProperties ? r[i] = this : r[i] = this.opts(), r.push(this), e.apply(this, r);
    };
    return this._actionHandler = t, this;
  }
  /**
   * Factory routine to create a new unattached option.
   *
   * See .option() for creating an attached option, which uses this routine to
   * create the option. You can override createOption to return a custom option.
   *
   * @param {string} flags
   * @param {string} [description]
   * @return {Option} new option
   */
  createOption(e, t) {
    return new z(e, t);
  }
  /**
   * Add an option.
   *
   * @param {Option} option
   * @return {Command} `this` command for chaining
   */
  addOption(e) {
    const t = e.name(), n = e.attributeName();
    if (e.negate) {
      const r = e.long.replace(/^--no-/, "--");
      this._findOption(r) || this.setOptionValueWithSource(n, e.defaultValue === void 0 ? !0 : e.defaultValue, "default");
    } else
      e.defaultValue !== void 0 && this.setOptionValueWithSource(n, e.defaultValue, "default");
    this.options.push(e);
    const i = (r, o, u) => {
      r == null && e.presetArg !== void 0 && (r = e.presetArg);
      const a = this.getOptionValue(n);
      if (r !== null && e.parseArg)
        try {
          r = e.parseArg(r, a);
        } catch (l) {
          if (l.code === "commander.invalidArgument") {
            const h = `${o} ${l.message}`;
            this.error(h, { exitCode: l.exitCode, code: l.code });
          }
          throw l;
        }
      else
        r !== null && e.variadic && (r = e._concatValue(r, a));
      r == null && (e.negate ? r = !1 : e.isBoolean() || e.optional ? r = !0 : r = ""), this.setOptionValueWithSource(n, r, u);
    };
    return this.on("option:" + t, (r) => {
      const o = `error: option '${e.flags}' argument '${r}' is invalid.`;
      i(r, o, "cli");
    }), e.envVar && this.on("optionEnv:" + t, (r) => {
      const o = `error: option '${e.flags}' value '${r}' from env '${e.envVar}' is invalid.`;
      i(r, o, "env");
    }), this;
  }
  /**
   * Internal implementation shared by .option() and .requiredOption()
   *
   * @api private
   */
  _optionEx(e, t, n, i, r) {
    if (typeof t == "object" && t instanceof z)
      throw new Error("To add an Option object use addOption() instead of option() or requiredOption()");
    const o = this.createOption(t, n);
    if (o.makeOptionMandatory(!!e.mandatory), typeof i == "function")
      o.default(r).argParser(i);
    else if (i instanceof RegExp) {
      const u = i;
      i = (a, l) => {
        const h = u.exec(a);
        return h ? h[0] : l;
      }, o.default(r).argParser(i);
    } else
      o.default(i);
    return this.addOption(o);
  }
  /**
   * Define option with `flags`, `description` and optional
   * coercion `fn`.
   *
   * The `flags` string contains the short and/or long flags,
   * separated by comma, a pipe or space. The following are all valid
   * all will output this way when `--help` is used.
   *
   *     "-p, --pepper"
   *     "-p|--pepper"
   *     "-p --pepper"
   *
   * @example
   * // simple boolean defaulting to undefined
   * program.option('-p, --pepper', 'add pepper');
   *
   * program.pepper
   * // => undefined
   *
   * --pepper
   * program.pepper
   * // => true
   *
   * // simple boolean defaulting to true (unless non-negated option is also defined)
   * program.option('-C, --no-cheese', 'remove cheese');
   *
   * program.cheese
   * // => true
   *
   * --no-cheese
   * program.cheese
   * // => false
   *
   * // required argument
   * program.option('-C, --chdir <path>', 'change the working directory');
   *
   * --chdir /tmp
   * program.chdir
   * // => "/tmp"
   *
   * // optional argument
   * program.option('-c, --cheese [type]', 'add cheese [marble]');
   *
   * @param {string} flags
   * @param {string} [description]
   * @param {Function|*} [fn] - custom option processing function or default value
   * @param {*} [defaultValue]
   * @return {Command} `this` command for chaining
   */
  option(e, t, n, i) {
    return this._optionEx({}, e, t, n, i);
  }
  /**
  * Add a required option which must have a value after parsing. This usually means
  * the option must be specified on the command line. (Otherwise the same as .option().)
  *
  * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
  *
  * @param {string} flags
  * @param {string} [description]
  * @param {Function|*} [fn] - custom option processing function or default value
  * @param {*} [defaultValue]
  * @return {Command} `this` command for chaining
  */
  requiredOption(e, t, n, i) {
    return this._optionEx({ mandatory: !0 }, e, t, n, i);
  }
  /**
   * Alter parsing of short flags with optional values.
   *
   * @example
   * // for `.option('-f,--flag [value]'):
   * program.combineFlagAndOptionalValue(true);  // `-f80` is treated like `--flag=80`, this is the default behaviour
   * program.combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
   *
   * @param {Boolean} [combine=true] - if `true` or omitted, an optional value can be specified directly after the flag.
   */
  combineFlagAndOptionalValue(e = !0) {
    return this._combineFlagAndOptionalValue = !!e, this;
  }
  /**
   * Allow unknown options on the command line.
   *
   * @param {Boolean} [allowUnknown=true] - if `true` or omitted, no error will be thrown
   * for unknown options.
   */
  allowUnknownOption(e = !0) {
    return this._allowUnknownOption = !!e, this;
  }
  /**
   * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
   *
   * @param {Boolean} [allowExcess=true] - if `true` or omitted, no error will be thrown
   * for excess arguments.
   */
  allowExcessArguments(e = !0) {
    return this._allowExcessArguments = !!e, this;
  }
  /**
   * Enable positional options. Positional means global options are specified before subcommands which lets
   * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
   * The default behaviour is non-positional and global options may appear anywhere on the command line.
   *
   * @param {Boolean} [positional=true]
   */
  enablePositionalOptions(e = !0) {
    return this._enablePositionalOptions = !!e, this;
  }
  /**
   * Pass through options that come after command-arguments rather than treat them as command-options,
   * so actual command-options come before command-arguments. Turning this on for a subcommand requires
   * positional options to have been enabled on the program (parent commands).
   * The default behaviour is non-positional and options may appear before or after command-arguments.
   *
   * @param {Boolean} [passThrough=true]
   * for unknown options.
   */
  passThroughOptions(e = !0) {
    if (this._passThroughOptions = !!e, this.parent && e && !this.parent._enablePositionalOptions)
      throw new Error("passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)");
    return this;
  }
  /**
    * Whether to store option values as properties on command object,
    * or store separately (specify false). In both cases the option values can be accessed using .opts().
    *
    * @param {boolean} [storeAsProperties=true]
    * @return {Command} `this` command for chaining
    */
  storeOptionsAsProperties(e = !0) {
    if (this._storeOptionsAsProperties = !!e, this.options.length)
      throw new Error("call .storeOptionsAsProperties() before adding options");
    return this;
  }
  /**
   * Retrieve option value.
   *
   * @param {string} key
   * @return {Object} value
   */
  getOptionValue(e) {
    return this._storeOptionsAsProperties ? this[e] : this._optionValues[e];
  }
  /**
   * Store option value.
   *
   * @param {string} key
   * @param {Object} value
   * @return {Command} `this` command for chaining
   */
  setOptionValue(e, t) {
    return this.setOptionValueWithSource(e, t, void 0);
  }
  /**
    * Store option value and where the value came from.
    *
    * @param {string} key
    * @param {Object} value
    * @param {string} source - expected values are default/config/env/cli/implied
    * @return {Command} `this` command for chaining
    */
  setOptionValueWithSource(e, t, n) {
    return this._storeOptionsAsProperties ? this[e] = t : this._optionValues[e] = t, this._optionValueSources[e] = n, this;
  }
  /**
    * Get source of option value.
    * Expected values are default | config | env | cli | implied
    *
    * @param {string} key
    * @return {string}
    */
  getOptionValueSource(e) {
    return this._optionValueSources[e];
  }
  /**
    * Get source of option value. See also .optsWithGlobals().
    * Expected values are default | config | env | cli | implied
    *
    * @param {string} key
    * @return {string}
    */
  getOptionValueSourceWithGlobals(e) {
    let t;
    return S(this).forEach((n) => {
      n.getOptionValueSource(e) !== void 0 && (t = n.getOptionValueSource(e));
    }), t;
  }
  /**
   * Get user arguments from implied or explicit arguments.
   * Side-effects: set _scriptPath if args included script. Used for default program name, and subcommand searches.
   *
   * @api private
   */
  _prepareUserArgs(e, t) {
    if (e !== void 0 && !Array.isArray(e))
      throw new Error("first parameter to parse must be array or undefined");
    t = t || {}, e === void 0 && (e = p.argv, p.versions && p.versions.electron && (t.from = "electron")), this.rawArgs = e.slice();
    let n;
    switch (t.from) {
      case void 0:
      case "node":
        this._scriptPath = e[1], n = e.slice(2);
        break;
      case "electron":
        p.defaultApp ? (this._scriptPath = e[1], n = e.slice(2)) : n = e.slice(1);
        break;
      case "user":
        n = e.slice(0);
        break;
      default:
        throw new Error(`unexpected parse option { from: '${t.from}' }`);
    }
    return !this._name && this._scriptPath && this.nameFromFilename(this._scriptPath), this._name = this._name || "program", n;
  }
  /**
   * Parse `argv`, setting options and invoking commands when defined.
   *
   * The default expectation is that the arguments are from node and have the application as argv[0]
   * and the script being run in argv[1], with user parameters after that.
   *
   * @example
   * program.parse(process.argv);
   * program.parse(); // implicitly use process.argv and auto-detect node vs electron conventions
   * program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
   *
   * @param {string[]} [argv] - optional, defaults to process.argv
   * @param {Object} [parseOptions] - optionally specify style of options with from: node/user/electron
   * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
   * @return {Command} `this` command for chaining
   */
  parse(e, t) {
    const n = this._prepareUserArgs(e, t);
    return this._parseCommand([], n), this;
  }
  /**
   * Parse `argv`, setting options and invoking commands when defined.
   *
   * Use parseAsync instead of parse if any of your action handlers are async. Returns a Promise.
   *
   * The default expectation is that the arguments are from node and have the application as argv[0]
   * and the script being run in argv[1], with user parameters after that.
   *
   * @example
   * await program.parseAsync(process.argv);
   * await program.parseAsync(); // implicitly use process.argv and auto-detect node vs electron conventions
   * await program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
   *
   * @param {string[]} [argv]
   * @param {Object} [parseOptions]
   * @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
   * @return {Promise}
   */
  async parseAsync(e, t) {
    const n = this._prepareUserArgs(e, t);
    return await this._parseCommand([], n), this;
  }
  /**
   * Execute a sub-command executable.
   *
   * @api private
   */
  _executeSubCommand(e, t) {
    t = t.slice();
    let n = !1;
    const i = [".js", ".ts", ".tsx", ".mjs", ".cjs"];
    function r(h, f) {
      const g = O.resolve(h, f);
      if (j.existsSync(g))
        return g;
      if (i.includes(O.extname(f)))
        return;
      const A = i.find((d) => j.existsSync(`${g}${d}`));
      if (A)
        return `${g}${A}`;
    }
    this._checkForMissingMandatoryOptions(), this._checkForConflictingOptions();
    let o = e._executableFile || `${this._name}-${e._name}`, u = this._executableDir || "";
    if (this._scriptPath) {
      let h;
      try {
        h = j.realpathSync(this._scriptPath);
      } catch {
        h = this._scriptPath;
      }
      u = O.resolve(O.dirname(h), u);
    }
    if (u) {
      let h = r(u, o);
      if (!h && !e._executableFile && this._scriptPath) {
        const f = O.basename(this._scriptPath, O.extname(this._scriptPath));
        f !== this._name && (h = r(u, `${f}-${e._name}`));
      }
      o = h || o;
    }
    n = i.includes(O.extname(o));
    let a;
    p.platform !== "win32" ? n ? (t.unshift(o), t = X(p.execArgv).concat(t), a = I.spawn(p.argv[0], t, { stdio: "inherit" })) : a = I.spawn(o, t, { stdio: "inherit" }) : (t.unshift(o), t = X(p.execArgv).concat(t), a = I.spawn(p.execPath, t, { stdio: "inherit" })), a.killed || ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"].forEach((f) => {
      p.on(f, () => {
        a.killed === !1 && a.exitCode === null && a.kill(f);
      });
    });
    const l = this._exitCallback;
    l ? a.on("close", () => {
      l(new M(p.exitCode || 0, "commander.executeSubCommandAsync", "(close)"));
    }) : a.on("close", p.exit.bind(p)), a.on("error", (h) => {
      if (h.code === "ENOENT") {
        const f = u ? `searched for local subcommand relative to directory '${u}'` : "no directory for search for local subcommand, use .executableDir() to supply a custom directory", g = `'${o}' does not exist
 - if '${e._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${f}`;
        throw new Error(g);
      } else if (h.code === "EACCES")
        throw new Error(`'${o}' not executable`);
      if (!l)
        p.exit(1);
      else {
        const f = new M(1, "commander.executeSubCommandAsync", "(error)");
        f.nestedError = h, l(f);
      }
    }), this.runningCommand = a;
  }
  /**
   * @api private
   */
  _dispatchSubcommand(e, t, n) {
    const i = this._findCommand(e);
    i || this.help({ error: !0 });
    let r;
    return r = this._chainOrCallSubCommandHook(r, i, "preSubcommand"), r = this._chainOrCall(r, () => {
      if (i._executableHandler)
        this._executeSubCommand(i, t.concat(n));
      else
        return i._parseCommand(t, n);
    }), r;
  }
  /**
   * Invoke help directly if possible, or dispatch if necessary.
   * e.g. help foo
   *
   * @api private
   */
  _dispatchHelpCommand(e) {
    e || this.help();
    const t = this._findCommand(e);
    return t && !t._executableHandler && t.help(), this._dispatchSubcommand(e, [], [this._helpLongFlag]);
  }
  /**
   * Check this.args against expected this._args.
   *
   * @api private
   */
  _checkNumberOfArguments() {
    this._args.forEach((e, t) => {
      e.required && this.args[t] == null && this.missingArgument(e.name());
    }), !(this._args.length > 0 && this._args[this._args.length - 1].variadic) && this.args.length > this._args.length && this._excessArguments(this.args);
  }
  /**
   * Process this.args using this._args and save as this.processedArgs!
   *
   * @api private
   */
  _processArguments() {
    const e = (n, i, r) => {
      let o = i;
      if (i !== null && n.parseArg)
        try {
          o = n.parseArg(i, r);
        } catch (u) {
          if (u.code === "commander.invalidArgument") {
            const a = `error: command-argument value '${i}' is invalid for argument '${n.name()}'. ${u.message}`;
            this.error(a, { exitCode: u.exitCode, code: u.code });
          }
          throw u;
        }
      return o;
    };
    this._checkNumberOfArguments();
    const t = [];
    this._args.forEach((n, i) => {
      let r = n.defaultValue;
      n.variadic ? i < this.args.length ? (r = this.args.slice(i), n.parseArg && (r = r.reduce((o, u) => e(n, u, o), n.defaultValue))) : r === void 0 && (r = []) : i < this.args.length && (r = this.args[i], n.parseArg && (r = e(n, r, n.defaultValue))), t[i] = r;
    }), this.processedArgs = t;
  }
  /**
   * Once we have a promise we chain, but call synchronously until then.
   *
   * @param {Promise|undefined} promise
   * @param {Function} fn
   * @return {Promise|undefined}
   * @api private
   */
  _chainOrCall(e, t) {
    return e && e.then && typeof e.then == "function" ? e.then(() => t()) : t();
  }
  /**
   *
   * @param {Promise|undefined} promise
   * @param {string} event
   * @return {Promise|undefined}
   * @api private
   */
  _chainOrCallHooks(e, t) {
    let n = e;
    const i = [];
    return S(this).reverse().filter((r) => r._lifeCycleHooks[t] !== void 0).forEach((r) => {
      r._lifeCycleHooks[t].forEach((o) => {
        i.push({ hookedCommand: r, callback: o });
      });
    }), t === "postAction" && i.reverse(), i.forEach((r) => {
      n = this._chainOrCall(n, () => r.callback(r.hookedCommand, this));
    }), n;
  }
  /**
   *
   * @param {Promise|undefined} promise
   * @param {Command} subCommand
   * @param {string} event
   * @return {Promise|undefined}
   * @api private
   */
  _chainOrCallSubCommandHook(e, t, n) {
    let i = e;
    return this._lifeCycleHooks[n] !== void 0 && this._lifeCycleHooks[n].forEach((r) => {
      i = this._chainOrCall(i, () => r(this, t));
    }), i;
  }
  /**
   * Process arguments in context of this command.
   * Returns action result, in case it is a promise.
   *
   * @api private
   */
  _parseCommand(e, t) {
    const n = this.parseOptions(t);
    if (this._parseOptionsEnv(), this._parseOptionsImplied(), e = e.concat(n.operands), t = n.unknown, this.args = e.concat(t), e && this._findCommand(e[0]))
      return this._dispatchSubcommand(e[0], e.slice(1), t);
    if (this._hasImplicitHelpCommand() && e[0] === this._helpCommandName)
      return this._dispatchHelpCommand(e[1]);
    if (this._defaultCommandName)
      return Y(this, t), this._dispatchSubcommand(this._defaultCommandName, e, t);
    this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName && this.help({ error: !0 }), Y(this, n.unknown), this._checkForMissingMandatoryOptions(), this._checkForConflictingOptions();
    const i = () => {
      n.unknown.length > 0 && this.unknownOption(n.unknown[0]);
    }, r = `command:${this.name()}`;
    if (this._actionHandler) {
      i(), this._processArguments();
      let o;
      return o = this._chainOrCallHooks(o, "preAction"), o = this._chainOrCall(o, () => this._actionHandler(this.processedArgs)), this.parent && (o = this._chainOrCall(o, () => {
        this.parent.emit(r, e, t);
      })), o = this._chainOrCallHooks(o, "postAction"), o;
    }
    if (this.parent && this.parent.listenerCount(r))
      i(), this._processArguments(), this.parent.emit(r, e, t);
    else if (e.length) {
      if (this._findCommand("*"))
        return this._dispatchSubcommand("*", e, t);
      this.listenerCount("command:*") ? this.emit("command:*", e, t) : this.commands.length ? this.unknownCommand() : (i(), this._processArguments());
    } else
      this.commands.length ? (i(), this.help({ error: !0 })) : (i(), this._processArguments());
  }
  /**
   * Find matching command.
   *
   * @api private
   */
  _findCommand(e) {
    if (e)
      return this.commands.find((t) => t._name === e || t._aliases.includes(e));
  }
  /**
   * Return an option matching `arg` if any.
   *
   * @param {string} arg
   * @return {Option}
   * @api private
   */
  _findOption(e) {
    return this.options.find((t) => t.is(e));
  }
  /**
   * Display an error message if a mandatory option does not have a value.
   * Called after checking for help flags in leaf subcommand.
   *
   * @api private
   */
  _checkForMissingMandatoryOptions() {
    for (let e = this; e; e = e.parent)
      e.options.forEach((t) => {
        t.mandatory && e.getOptionValue(t.attributeName()) === void 0 && e.missingMandatoryOptionValue(t);
      });
  }
  /**
   * Display an error message if conflicting options are used together in this.
   *
   * @api private
   */
  _checkForConflictingLocalOptions() {
    const e = this.options.filter(
      (n) => {
        const i = n.attributeName();
        return this.getOptionValue(i) === void 0 ? !1 : this.getOptionValueSource(i) !== "default";
      }
    );
    e.filter(
      (n) => n.conflictsWith.length > 0
    ).forEach((n) => {
      const i = e.find(
        (r) => n.conflictsWith.includes(r.attributeName())
      );
      i && this._conflictingOption(n, i);
    });
  }
  /**
   * Display an error message if conflicting options are used together.
   * Called after checking for help flags in leaf subcommand.
   *
   * @api private
   */
  _checkForConflictingOptions() {
    for (let e = this; e; e = e.parent)
      e._checkForConflictingLocalOptions();
  }
  /**
   * Parse options from `argv` removing known options,
   * and return argv split into operands and unknown arguments.
   *
   * Examples:
   *
   *     argv => operands, unknown
   *     --known kkk op => [op], []
   *     op --known kkk => [op], []
   *     sub --unknown uuu op => [sub], [--unknown uuu op]
   *     sub -- --unknown uuu op => [sub --unknown uuu op], []
   *
   * @param {String[]} argv
   * @return {{operands: String[], unknown: String[]}}
   */
  parseOptions(e) {
    const t = [], n = [];
    let i = t;
    const r = e.slice();
    function o(a) {
      return a.length > 1 && a[0] === "-";
    }
    let u = null;
    for (; r.length; ) {
      const a = r.shift();
      if (a === "--") {
        i === n && i.push(a), i.push(...r);
        break;
      }
      if (u && !o(a)) {
        this.emit(`option:${u.name()}`, a);
        continue;
      }
      if (u = null, o(a)) {
        const l = this._findOption(a);
        if (l) {
          if (l.required) {
            const h = r.shift();
            h === void 0 && this.optionMissingArgument(l), this.emit(`option:${l.name()}`, h);
          } else if (l.optional) {
            let h = null;
            r.length > 0 && !o(r[0]) && (h = r.shift()), this.emit(`option:${l.name()}`, h);
          } else
            this.emit(`option:${l.name()}`);
          u = l.variadic ? l : null;
          continue;
        }
      }
      if (a.length > 2 && a[0] === "-" && a[1] !== "-") {
        const l = this._findOption(`-${a[1]}`);
        if (l) {
          l.required || l.optional && this._combineFlagAndOptionalValue ? this.emit(`option:${l.name()}`, a.slice(2)) : (this.emit(`option:${l.name()}`), r.unshift(`-${a.slice(2)}`));
          continue;
        }
      }
      if (/^--[^=]+=/.test(a)) {
        const l = a.indexOf("="), h = this._findOption(a.slice(0, l));
        if (h && (h.required || h.optional)) {
          this.emit(`option:${h.name()}`, a.slice(l + 1));
          continue;
        }
      }
      if (o(a) && (i = n), (this._enablePositionalOptions || this._passThroughOptions) && t.length === 0 && n.length === 0) {
        if (this._findCommand(a)) {
          t.push(a), r.length > 0 && n.push(...r);
          break;
        } else if (a === this._helpCommandName && this._hasImplicitHelpCommand()) {
          t.push(a), r.length > 0 && t.push(...r);
          break;
        } else if (this._defaultCommandName) {
          n.push(a), r.length > 0 && n.push(...r);
          break;
        }
      }
      if (this._passThroughOptions) {
        i.push(a), r.length > 0 && i.push(...r);
        break;
      }
      i.push(a);
    }
    return { operands: t, unknown: n };
  }
  /**
   * Return an object containing local option values as key-value pairs.
   *
   * @return {Object}
   */
  opts() {
    if (this._storeOptionsAsProperties) {
      const e = {}, t = this.options.length;
      for (let n = 0; n < t; n++) {
        const i = this.options[n].attributeName();
        e[i] = i === this._versionOptionName ? this._version : this[i];
      }
      return e;
    }
    return this._optionValues;
  }
  /**
   * Return an object containing merged local and global option values as key-value pairs.
   *
   * @return {Object}
   */
  optsWithGlobals() {
    return S(this).reduce(
      (e, t) => Object.assign(e, t.opts()),
      {}
    );
  }
  /**
   * Display error message and exit (or call exitOverride).
   *
   * @param {string} message
   * @param {Object} [errorOptions]
   * @param {string} [errorOptions.code] - an id string representing the error
   * @param {number} [errorOptions.exitCode] - used with process.exit
   */
  error(e, t) {
    this._outputConfiguration.outputError(`${e}
`, this._outputConfiguration.writeErr), typeof this._showHelpAfterError == "string" ? this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`) : this._showHelpAfterError && (this._outputConfiguration.writeErr(`
`), this.outputHelp({ error: !0 }));
    const n = t || {}, i = n.exitCode || 1, r = n.code || "commander.error";
    this._exit(i, r, e);
  }
  /**
   * Apply any option related environment variables, if option does
   * not have a value from cli or client code.
   *
   * @api private
   */
  _parseOptionsEnv() {
    this.options.forEach((e) => {
      if (e.envVar && e.envVar in p.env) {
        const t = e.attributeName();
        (this.getOptionValue(t) === void 0 || ["default", "config", "env"].includes(this.getOptionValueSource(t))) && (e.required || e.optional ? this.emit(`optionEnv:${e.name()}`, p.env[e.envVar]) : this.emit(`optionEnv:${e.name()}`));
      }
    });
  }
  /**
   * Apply any implied option values, if option is undefined or default value.
   *
   * @api private
   */
  _parseOptionsImplied() {
    const e = new Ke(this.options), t = (n) => this.getOptionValue(n) !== void 0 && !["default", "implied"].includes(this.getOptionValueSource(n));
    this.options.filter((n) => n.implied !== void 0 && t(n.attributeName()) && e.valueFromOption(this.getOptionValue(n.attributeName()), n)).forEach((n) => {
      Object.keys(n.implied).filter((i) => !t(i)).forEach((i) => {
        this.setOptionValueWithSource(i, n.implied[i], "implied");
      });
    });
  }
  /**
   * Argument `name` is missing.
   *
   * @param {string} name
   * @api private
   */
  missingArgument(e) {
    const t = `error: missing required argument '${e}'`;
    this.error(t, { code: "commander.missingArgument" });
  }
  /**
   * `Option` is missing an argument.
   *
   * @param {Option} option
   * @api private
   */
  optionMissingArgument(e) {
    const t = `error: option '${e.flags}' argument missing`;
    this.error(t, { code: "commander.optionMissingArgument" });
  }
  /**
   * `Option` does not have a value, and is a mandatory option.
   *
   * @param {Option} option
   * @api private
   */
  missingMandatoryOptionValue(e) {
    const t = `error: required option '${e.flags}' not specified`;
    this.error(t, { code: "commander.missingMandatoryOptionValue" });
  }
  /**
   * `Option` conflicts with another option.
   *
   * @param {Option} option
   * @param {Option} conflictingOption
   * @api private
   */
  _conflictingOption(e, t) {
    const n = (o) => {
      const u = o.attributeName(), a = this.getOptionValue(u), l = this.options.find((f) => f.negate && u === f.attributeName()), h = this.options.find((f) => !f.negate && u === f.attributeName());
      return l && (l.presetArg === void 0 && a === !1 || l.presetArg !== void 0 && a === l.presetArg) ? l : h || o;
    }, i = (o) => {
      const u = n(o), a = u.attributeName();
      return this.getOptionValueSource(a) === "env" ? `environment variable '${u.envVar}'` : `option '${u.flags}'`;
    }, r = `error: ${i(e)} cannot be used with ${i(t)}`;
    this.error(r, { code: "commander.conflictingOption" });
  }
  /**
   * Unknown option `flag`.
   *
   * @param {string} flag
   * @api private
   */
  unknownOption(e) {
    if (this._allowUnknownOption)
      return;
    let t = "";
    if (e.startsWith("--") && this._showSuggestionAfterError) {
      let i = [], r = this;
      do {
        const o = r.createHelp().visibleOptions(r).filter((u) => u.long).map((u) => u.long);
        i = i.concat(o), r = r.parent;
      } while (r && !r._enablePositionalOptions);
      t = Q(e, i);
    }
    const n = `error: unknown option '${e}'${t}`;
    this.error(n, { code: "commander.unknownOption" });
  }
  /**
   * Excess arguments, more than expected.
   *
   * @param {string[]} receivedArgs
   * @api private
   */
  _excessArguments(e) {
    if (this._allowExcessArguments)
      return;
    const t = this._args.length, n = t === 1 ? "" : "s", r = `error: too many arguments${this.parent ? ` for '${this.name()}'` : ""}. Expected ${t} argument${n} but got ${e.length}.`;
    this.error(r, { code: "commander.excessArguments" });
  }
  /**
   * Unknown command.
   *
   * @api private
   */
  unknownCommand() {
    const e = this.args[0];
    let t = "";
    if (this._showSuggestionAfterError) {
      const i = [];
      this.createHelp().visibleCommands(this).forEach((r) => {
        i.push(r.name()), r.alias() && i.push(r.alias());
      }), t = Q(e, i);
    }
    const n = `error: unknown command '${e}'${t}`;
    this.error(n, { code: "commander.unknownCommand" });
  }
  /**
   * Set the program version to `str`.
   *
   * This method auto-registers the "-V, --version" flag
   * which will print the version number when passed.
   *
   * You can optionally supply the  flags and description to override the defaults.
   *
   * @param {string} str
   * @param {string} [flags]
   * @param {string} [description]
   * @return {this | string} `this` command for chaining, or version string if no arguments
   */
  version(e, t, n) {
    if (e === void 0)
      return this._version;
    this._version = e, t = t || "-V, --version", n = n || "output the version number";
    const i = this.createOption(t, n);
    return this._versionOptionName = i.attributeName(), this.options.push(i), this.on("option:" + i.name(), () => {
      this._outputConfiguration.writeOut(`${e}
`), this._exit(0, "commander.version", e);
    }), this;
  }
  /**
   * Set the description.
   *
   * @param {string} [str]
   * @param {Object} [argsDescription]
   * @return {string|Command}
   */
  description(e, t) {
    return e === void 0 && t === void 0 ? this._description : (this._description = e, t && (this._argsDescription = t), this);
  }
  /**
   * Set the summary. Used when listed as subcommand of parent.
   *
   * @param {string} [str]
   * @return {string|Command}
   */
  summary(e) {
    return e === void 0 ? this._summary : (this._summary = e, this);
  }
  /**
   * Set an alias for the command.
   *
   * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
   *
   * @param {string} [alias]
   * @return {string|Command}
   */
  alias(e) {
    if (e === void 0)
      return this._aliases[0];
    let t = this;
    if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler && (t = this.commands[this.commands.length - 1]), e === t._name)
      throw new Error("Command alias can't be the same as its name");
    return t._aliases.push(e), this;
  }
  /**
   * Set aliases for the command.
   *
   * Only the first alias is shown in the auto-generated help.
   *
   * @param {string[]} [aliases]
   * @return {string[]|Command}
   */
  aliases(e) {
    return e === void 0 ? this._aliases : (e.forEach((t) => this.alias(t)), this);
  }
  /**
   * Set / get the command usage `str`.
   *
   * @param {string} [str]
   * @return {String|Command}
   */
  usage(e) {
    if (e === void 0) {
      if (this._usage)
        return this._usage;
      const t = this._args.map((n) => Ue(n));
      return [].concat(
        this.options.length || this._hasHelpOption ? "[options]" : [],
        this.commands.length ? "[command]" : [],
        this._args.length ? t : []
      ).join(" ");
    }
    return this._usage = e, this;
  }
  /**
   * Get or set the name of the command.
   *
   * @param {string} [str]
   * @return {string|Command}
   */
  name(e) {
    return e === void 0 ? this._name : (this._name = e, this);
  }
  /**
   * Set the name of the command from script filename, such as process.argv[1],
   * or require.main.filename, or __filename.
   *
   * (Used internally and public although not documented in README.)
   *
   * @example
   * program.nameFromFilename(require.main.filename);
   *
   * @param {string} filename
   * @return {Command}
   */
  nameFromFilename(e) {
    return this._name = O.basename(e, O.extname(e)), this;
  }
  /**
   * Get or set the directory for searching for executable subcommands of this command.
   *
   * @example
   * program.executableDir(__dirname);
   * // or
   * program.executableDir('subcommands');
   *
   * @param {string} [path]
   * @return {string|Command}
   */
  executableDir(e) {
    return e === void 0 ? this._executableDir : (this._executableDir = e, this);
  }
  /**
   * Return program help documentation.
   *
   * @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
   * @return {string}
   */
  helpInformation(e) {
    const t = this.createHelp();
    return t.helpWidth === void 0 && (t.helpWidth = e && e.error ? this._outputConfiguration.getErrHelpWidth() : this._outputConfiguration.getOutHelpWidth()), t.formatHelp(this, t);
  }
  /**
   * @api private
   */
  _getHelpContext(e) {
    e = e || {};
    const t = { error: !!e.error };
    let n;
    return t.error ? n = (i) => this._outputConfiguration.writeErr(i) : n = (i) => this._outputConfiguration.writeOut(i), t.write = e.write || n, t.command = this, t;
  }
  /**
   * Output help information for this command.
   *
   * Outputs built-in help, and custom text added using `.addHelpText()`.
   *
   * @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
   */
  outputHelp(e) {
    let t;
    typeof e == "function" && (t = e, e = void 0);
    const n = this._getHelpContext(e);
    S(this).reverse().forEach((r) => r.emit("beforeAllHelp", n)), this.emit("beforeHelp", n);
    let i = this.helpInformation(n);
    if (t && (i = t(i), typeof i != "string" && !Buffer.isBuffer(i)))
      throw new Error("outputHelp callback must return a string or a Buffer");
    n.write(i), this.emit(this._helpLongFlag), this.emit("afterHelp", n), S(this).forEach((r) => r.emit("afterAllHelp", n));
  }
  /**
   * You can pass in flags and a description to override the help
   * flags and help description for your command. Pass in false to
   * disable the built-in help option.
   *
   * @param {string | boolean} [flags]
   * @param {string} [description]
   * @return {Command} `this` command for chaining
   */
  helpOption(e, t) {
    if (typeof e == "boolean")
      return this._hasHelpOption = e, this;
    this._helpFlags = e || this._helpFlags, this._helpDescription = t || this._helpDescription;
    const n = Be(this._helpFlags);
    return this._helpShortFlag = n.shortFlag, this._helpLongFlag = n.longFlag, this;
  }
  /**
   * Output help information and exit.
   *
   * Outputs built-in help, and custom text added using `.addHelpText()`.
   *
   * @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
   */
  help(e) {
    this.outputHelp(e);
    let t = p.exitCode || 0;
    t === 0 && e && typeof e != "function" && e.error && (t = 1), this._exit(t, "commander.help", "(outputHelp)");
  }
  /**
   * Add additional text to be displayed with the built-in help.
   *
   * Position is 'before' or 'after' to affect just this command,
   * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
   *
   * @param {string} position - before or after built-in help
   * @param {string | Function} text - string to add, or a function returning a string
   * @return {Command} `this` command for chaining
   */
  addHelpText(e, t) {
    const n = ["beforeAll", "before", "after", "afterAll"];
    if (!n.includes(e))
      throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${n.join("', '")}'`);
    const i = `${e}Help`;
    return this.on(i, (r) => {
      let o;
      typeof t == "function" ? o = t({ error: r.error, command: r.command }) : o = t, o && r.write(`${o}
`);
    }), this;
  }
};
function Y(s, e) {
  s._hasHelpOption && e.find((n) => n === s._helpLongFlag || n === s._helpShortFlag) && (s.outputHelp(), s._exit(0, "commander.helpDisplayed", "(outputHelp)"));
}
function X(s) {
  return s.map((e) => {
    if (!e.startsWith("--inspect"))
      return e;
    let t, n = "127.0.0.1", i = "9229", r;
    return (r = e.match(/^(--inspect(-brk)?)$/)) !== null ? t = r[1] : (r = e.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null ? (t = r[1], /^\d+$/.test(r[3]) ? i = r[3] : n = r[3]) : (r = e.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null && (t = r[1], n = r[3], i = r[4]), t && i !== "0" ? `${t}=${n}:${parseInt(i) + 1}` : e;
  });
}
function S(s) {
  const e = [];
  for (let t = s; t; t = t.parent)
    e.push(t);
  return e;
}
ee.Command = Je;
(function(s, e) {
  const { Argument: t } = H, { Command: n } = ee, { CommanderError: i, InvalidArgumentError: r } = $, { Help: o } = G, { Option: u } = V;
  e = s.exports = new n(), e.program = e, e.Argument = t, e.Command = n, e.CommanderError = i, e.Help = o, e.InvalidArgumentError = r, e.InvalidOptionArgumentError = r, e.Option = u;
})(ve, T);
const ze = T, {
  program: rt,
  createCommand: st,
  createArgument: ot,
  createOption: at,
  CommanderError: ut,
  InvalidArgumentError: lt,
  InvalidOptionArgumentError: ht,
  // deprecated old name
  Command: Qe,
  Argument: ct,
  Option: ft,
  Help: pt
} = ze, Ye = JSON.parse(P.readFileSync(__dirname, "utf-8")), ge = Ye.version;
process.env.VANT_CLI_VERSION = ge;
P.resolve(__dirname, "../template/");
P.resolve(process.cwd(), "./");
const B = new Qe();
B.version(`@ear/cli ${ge}`);
B.command("init").description("Generate a new empty project").option("-P,--pc", "use pc template").option("-H,--h5", "use h5 template").action(async (s) => {
});
B.parse();

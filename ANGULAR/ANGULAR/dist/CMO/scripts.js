/*!
 * Materialize v1.0.0 (http://materializecss.com)
 * Copyright 2014-2017 Materialize
 * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)
 */
var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*! cash-dom 1.3.5, https://github.com/kenwheeler/cash @license MIT */
(function (factory) {
  window.cash = factory();
})(function () {
  var doc = document,
      win = window,
      ArrayProto = Array.prototype,
      slice = ArrayProto.slice,
      filter = ArrayProto.filter,
      push = ArrayProto.push;

  var noop = function () {},
      isFunction = function (item) {
    // @see https://crbug.com/568448
    return typeof item === typeof noop && item.call;
  },
      isString = function (item) {
    return typeof item === typeof "";
  };

  var idMatch = /^#[\w-]*$/,
      classMatch = /^\.[\w-]*$/,
      htmlMatch = /<.+>/,
      singlet = /^\w+$/;

  function find(selector, context) {
    context = context || doc;
    var elems = classMatch.test(selector) ? context.getElementsByClassName(selector.slice(1)) : singlet.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector);
    return elems;
  }

  var frag;
  function parseHTML(str) {
    if (!frag) {
      frag = doc.implementation.createHTMLDocument(null);
      var base = frag.createElement("base");
      base.href = doc.location.href;
      frag.head.appendChild(base);
    }

    frag.body.innerHTML = str;

    return frag.body.childNodes;
  }

  function onReady(fn) {
    if (doc.readyState !== "loading") {
      fn();
    } else {
      doc.addEventListener("DOMContentLoaded", fn);
    }
  }

  function Init(selector, context) {
    if (!selector) {
      return this;
    }

    // If already a cash collection, don't do any further processing
    if (selector.cash && selector !== win) {
      return selector;
    }

    var elems = selector,
        i = 0,
        length;

    if (isString(selector)) {
      elems = idMatch.test(selector) ?
      // If an ID use the faster getElementById check
      doc.getElementById(selector.slice(1)) : htmlMatch.test(selector) ?
      // If HTML, parse it into real elements
      parseHTML(selector) :
      // else use `find`
      find(selector, context);

      // If function, use as shortcut for DOM ready
    } else if (isFunction(selector)) {
      onReady(selector);return this;
    }

    if (!elems) {
      return this;
    }

    // If a single DOM element is passed in or received via ID, return the single element
    if (elems.nodeType || elems === win) {
      this[0] = elems;
      this.length = 1;
    } else {
      // Treat like an array and loop through each item.
      length = this.length = elems.length;
      for (; i < length; i++) {
        this[i] = elems[i];
      }
    }

    return this;
  }

  function cash(selector, context) {
    return new Init(selector, context);
  }

  var fn = cash.fn = cash.prototype = Init.prototype = { // jshint ignore:line
    cash: true,
    length: 0,
    push: push,
    splice: ArrayProto.splice,
    map: ArrayProto.map,
    init: Init
  };

  Object.defineProperty(fn, "constructor", { value: cash });

  cash.parseHTML = parseHTML;
  cash.noop = noop;
  cash.isFunction = isFunction;
  cash.isString = isString;

  cash.extend = fn.extend = function (target) {
    target = target || {};

    var args = slice.call(arguments),
        length = args.length,
        i = 1;

    if (args.length === 1) {
      target = this;
      i = 0;
    }

    for (; i < length; i++) {
      if (!args[i]) {
        continue;
      }
      for (var key in args[i]) {
        if (args[i].hasOwnProperty(key)) {
          target[key] = args[i][key];
        }
      }
    }

    return target;
  };

  function each(collection, callback) {
    var l = collection.length,
        i = 0;

    for (; i < l; i++) {
      if (callback.call(collection[i], collection[i], i, collection) === false) {
        break;
      }
    }
  }

  function matches(el, selector) {
    var m = el && (el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector);
    return !!m && m.call(el, selector);
  }

  function getCompareFunction(selector) {
    return (
      /* Use browser's `matches` function if string */
      isString(selector) ? matches :
      /* Match a cash element */
      selector.cash ? function (el) {
        return selector.is(el);
      } :
      /* Direct comparison */
      function (el, selector) {
        return el === selector;
      }
    );
  }

  function unique(collection) {
    return cash(slice.call(collection).filter(function (item, index, self) {
      return self.indexOf(item) === index;
    }));
  }

  cash.extend({
    merge: function (first, second) {
      var len = +second.length,
          i = first.length,
          j = 0;

      for (; j < len; i++, j++) {
        first[i] = second[j];
      }

      first.length = i;
      return first;
    },

    each: each,
    matches: matches,
    unique: unique,
    isArray: Array.isArray,
    isNumeric: function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

  });

  var uid = cash.uid = "_cash" + Date.now();

  function getDataCache(node) {
    return node[uid] = node[uid] || {};
  }

  function setData(node, key, value) {
    return getDataCache(node)[key] = value;
  }

  function getData(node, key) {
    var c = getDataCache(node);
    if (c[key] === undefined) {
      c[key] = node.dataset ? node.dataset[key] : cash(node).attr("data-" + key);
    }
    return c[key];
  }

  function removeData(node, key) {
    var c = getDataCache(node);
    if (c) {
      delete c[key];
    } else if (node.dataset) {
      delete node.dataset[key];
    } else {
      cash(node).removeAttr("data-" + name);
    }
  }

  fn.extend({
    data: function (name, value) {
      if (isString(name)) {
        return value === undefined ? getData(this[0], name) : this.each(function (v) {
          return setData(v, name, value);
        });
      }

      for (var key in name) {
        this.data(key, name[key]);
      }

      return this;
    },

    removeData: function (key) {
      return this.each(function (v) {
        return removeData(v, key);
      });
    }

  });

  var notWhiteMatch = /\S+/g;

  function getClasses(c) {
    return isString(c) && c.match(notWhiteMatch);
  }

  function hasClass(v, c) {
    return v.classList ? v.classList.contains(c) : new RegExp("(^| )" + c + "( |$)", "gi").test(v.className);
  }

  function addClass(v, c, spacedName) {
    if (v.classList) {
      v.classList.add(c);
    } else if (spacedName.indexOf(" " + c + " ")) {
      v.className += " " + c;
    }
  }

  function removeClass(v, c) {
    if (v.classList) {
      v.classList.remove(c);
    } else {
      v.className = v.className.replace(c, "");
    }
  }

  fn.extend({
    addClass: function (c) {
      var classes = getClasses(c);

      return classes ? this.each(function (v) {
        var spacedName = " " + v.className + " ";
        each(classes, function (c) {
          addClass(v, c, spacedName);
        });
      }) : this;
    },

    attr: function (name, value) {
      if (!name) {
        return undefined;
      }

      if (isString(name)) {
        if (value === undefined) {
          return this[0] ? this[0].getAttribute ? this[0].getAttribute(name) : this[0][name] : undefined;
        }

        return this.each(function (v) {
          if (v.setAttribute) {
            v.setAttribute(name, value);
          } else {
            v[name] = value;
          }
        });
      }

      for (var key in name) {
        this.attr(key, name[key]);
      }

      return this;
    },

    hasClass: function (c) {
      var check = false,
          classes = getClasses(c);
      if (classes && classes.length) {
        this.each(function (v) {
          check = hasClass(v, classes[0]);
          return !check;
        });
      }
      return check;
    },

    prop: function (name, value) {
      if (isString(name)) {
        return value === undefined ? this[0][name] : this.each(function (v) {
          v[name] = value;
        });
      }

      for (var key in name) {
        this.prop(key, name[key]);
      }

      return this;
    },

    removeAttr: function (name) {
      return this.each(function (v) {
        if (v.removeAttribute) {
          v.removeAttribute(name);
        } else {
          delete v[name];
        }
      });
    },

    removeClass: function (c) {
      if (!arguments.length) {
        return this.attr("class", "");
      }
      var classes = getClasses(c);
      return classes ? this.each(function (v) {
        each(classes, function (c) {
          removeClass(v, c);
        });
      }) : this;
    },

    removeProp: function (name) {
      return this.each(function (v) {
        delete v[name];
      });
    },

    toggleClass: function (c, state) {
      if (state !== undefined) {
        return this[state ? "addClass" : "removeClass"](c);
      }
      var classes = getClasses(c);
      return classes ? this.each(function (v) {
        var spacedName = " " + v.className + " ";
        each(classes, function (c) {
          if (hasClass(v, c)) {
            removeClass(v, c);
          } else {
            addClass(v, c, spacedName);
          }
        });
      }) : this;
    } });

  fn.extend({
    add: function (selector, context) {
      return unique(cash.merge(this, cash(selector, context)));
    },

    each: function (callback) {
      each(this, callback);
      return this;
    },

    eq: function (index) {
      return cash(this.get(index));
    },

    filter: function (selector) {
      if (!selector) {
        return this;
      }

      var comparator = isFunction(selector) ? selector : getCompareFunction(selector);

      return cash(filter.call(this, function (e) {
        return comparator(e, selector);
      }));
    },

    first: function () {
      return this.eq(0);
    },

    get: function (index) {
      if (index === undefined) {
        return slice.call(this);
      }
      return index < 0 ? this[index + this.length] : this[index];
    },

    index: function (elem) {
      var child = elem ? cash(elem)[0] : this[0],
          collection = elem ? this : cash(child).parent().children();
      return slice.call(collection).indexOf(child);
    },

    last: function () {
      return this.eq(-1);
    }

  });

  var camelCase = function () {
    var camelRegex = /(?:^\w|[A-Z]|\b\w)/g,
        whiteSpace = /[\s-_]+/g;
    return function (str) {
      return str.replace(camelRegex, function (letter, index) {
        return letter[index === 0 ? "toLowerCase" : "toUpperCase"]();
      }).replace(whiteSpace, "");
    };
  }();

  var getPrefixedProp = function () {
    var cache = {},
        doc = document,
        div = doc.createElement("div"),
        style = div.style;

    return function (prop) {
      prop = camelCase(prop);
      if (cache[prop]) {
        return cache[prop];
      }

      var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
          prefixes = ["webkit", "moz", "ms", "o"],
          props = (prop + " " + prefixes.join(ucProp + " ") + ucProp).split(" ");

      each(props, function (p) {
        if (p in style) {
          cache[p] = prop = cache[prop] = p;
          return false;
        }
      });

      return cache[prop];
    };
  }();

  cash.prefixedProp = getPrefixedProp;
  cash.camelCase = camelCase;

  fn.extend({
    css: function (prop, value) {
      if (isString(prop)) {
        prop = getPrefixedProp(prop);
        return arguments.length > 1 ? this.each(function (v) {
          return v.style[prop] = value;
        }) : win.getComputedStyle(this[0])[prop];
      }

      for (var key in prop) {
        this.css(key, prop[key]);
      }

      return this;
    }

  });

  function compute(el, prop) {
    return parseInt(win.getComputedStyle(el[0], null)[prop], 10) || 0;
  }

  each(["Width", "Height"], function (v) {
    var lower = v.toLowerCase();

    fn[lower] = function () {
      return this[0].getBoundingClientRect()[lower];
    };

    fn["inner" + v] = function () {
      return this[0]["client" + v];
    };

    fn["outer" + v] = function (margins) {
      return this[0]["offset" + v] + (margins ? compute(this, "margin" + (v === "Width" ? "Left" : "Top")) + compute(this, "margin" + (v === "Width" ? "Right" : "Bottom")) : 0);
    };
  });

  function registerEvent(node, eventName, callback) {
    var eventCache = getData(node, "_cashEvents") || setData(node, "_cashEvents", {});
    eventCache[eventName] = eventCache[eventName] || [];
    eventCache[eventName].push(callback);
    node.addEventListener(eventName, callback);
  }

  function removeEvent(node, eventName, callback) {
    var events = getData(node, "_cashEvents"),
        eventCache = events && events[eventName],
        index;

    if (!eventCache) {
      return;
    }

    if (callback) {
      node.removeEventListener(eventName, callback);
      index = eventCache.indexOf(callback);
      if (index >= 0) {
        eventCache.splice(index, 1);
      }
    } else {
      each(eventCache, function (event) {
        node.removeEventListener(eventName, event);
      });
      eventCache = [];
    }
  }

  fn.extend({
    off: function (eventName, callback) {
      return this.each(function (v) {
        return removeEvent(v, eventName, callback);
      });
    },

    on: function (eventName, delegate, callback, runOnce) {
      // jshint ignore:line
      var originalCallback;
      if (!isString(eventName)) {
        for (var key in eventName) {
          this.on(key, delegate, eventName[key]);
        }
        return this;
      }

      if (isFunction(delegate)) {
        callback = delegate;
        delegate = null;
      }

      if (eventName === "ready") {
        onReady(callback);
        return this;
      }

      if (delegate) {
        originalCallback = callback;
        callback = function (e) {
          var t = e.target;
          while (!matches(t, delegate)) {
            if (t === this || t === null) {
              return t = false;
            }

            t = t.parentNode;
          }

          if (t) {
            originalCallback.call(t, e);
          }
        };
      }

      return this.each(function (v) {
        var finalCallback = callback;
        if (runOnce) {
          finalCallback = function () {
            callback.apply(this, arguments);
            removeEvent(v, eventName, finalCallback);
          };
        }
        registerEvent(v, eventName, finalCallback);
      });
    },

    one: function (eventName, delegate, callback) {
      return this.on(eventName, delegate, callback, true);
    },

    ready: onReady,

    /**
     * Modified
     * Triggers browser event
     * @param String eventName
     * @param Object data - Add properties to event object
     */
    trigger: function (eventName, data) {
      if (document.createEvent) {
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent(eventName, true, false);
        evt = this.extend(evt, data);
        return this.each(function (v) {
          return v.dispatchEvent(evt);
        });
      }
    }

  });

  function encode(name, value) {
    return "&" + encodeURIComponent(name) + "=" + encodeURIComponent(value).replace(/%20/g, "+");
  }

  function getSelectMultiple_(el) {
    var values = [];
    each(el.options, function (o) {
      if (o.selected) {
        values.push(o.value);
      }
    });
    return values.length ? values : null;
  }

  function getSelectSingle_(el) {
    var selectedIndex = el.selectedIndex;
    return selectedIndex >= 0 ? el.options[selectedIndex].value : null;
  }

  function getValue(el) {
    var type = el.type;
    if (!type) {
      return null;
    }
    switch (type.toLowerCase()) {
      case "select-one":
        return getSelectSingle_(el);
      case "select-multiple":
        return getSelectMultiple_(el);
      case "radio":
        return el.checked ? el.value : null;
      case "checkbox":
        return el.checked ? el.value : null;
      default:
        return el.value ? el.value : null;
    }
  }

  fn.extend({
    serialize: function () {
      var query = "";

      each(this[0].elements || this, function (el) {
        if (el.disabled || el.tagName === "FIELDSET") {
          return;
        }
        var name = el.name;
        switch (el.type.toLowerCase()) {
          case "file":
          case "reset":
          case "submit":
          case "button":
            break;
          case "select-multiple":
            var values = getValue(el);
            if (values !== null) {
              each(values, function (value) {
                query += encode(name, value);
              });
            }
            break;
          default:
            var value = getValue(el);
            if (value !== null) {
              query += encode(name, value);
            }
        }
      });

      return query.substr(1);
    },

    val: function (value) {
      if (value === undefined) {
        return getValue(this[0]);
      }

      return this.each(function (v) {
        return v.value = value;
      });
    }

  });

  function insertElement(el, child, prepend) {
    if (prepend) {
      var first = el.childNodes[0];
      el.insertBefore(child, first);
    } else {
      el.appendChild(child);
    }
  }

  function insertContent(parent, child, prepend) {
    var str = isString(child);

    if (!str && child.length) {
      each(child, function (v) {
        return insertContent(parent, v, prepend);
      });
      return;
    }

    each(parent, str ? function (v) {
      return v.insertAdjacentHTML(prepend ? "afterbegin" : "beforeend", child);
    } : function (v, i) {
      return insertElement(v, i === 0 ? child : child.cloneNode(true), prepend);
    });
  }

  fn.extend({
    after: function (selector) {
      cash(selector).insertAfter(this);
      return this;
    },

    append: function (content) {
      insertContent(this, content);
      return this;
    },

    appendTo: function (parent) {
      insertContent(cash(parent), this);
      return this;
    },

    before: function (selector) {
      cash(selector).insertBefore(this);
      return this;
    },

    clone: function () {
      return cash(this.map(function (v) {
        return v.cloneNode(true);
      }));
    },

    empty: function () {
      this.html("");
      return this;
    },

    html: function (content) {
      if (content === undefined) {
        return this[0].innerHTML;
      }
      var source = content.nodeType ? content[0].outerHTML : content;
      return this.each(function (v) {
        return v.innerHTML = source;
      });
    },

    insertAfter: function (selector) {
      var _this = this;

      cash(selector).each(function (el, i) {
        var parent = el.parentNode,
            sibling = el.nextSibling;
        _this.each(function (v) {
          parent.insertBefore(i === 0 ? v : v.cloneNode(true), sibling);
        });
      });

      return this;
    },

    insertBefore: function (selector) {
      var _this2 = this;
      cash(selector).each(function (el, i) {
        var parent = el.parentNode;
        _this2.each(function (v) {
          parent.insertBefore(i === 0 ? v : v.cloneNode(true), el);
        });
      });
      return this;
    },

    prepend: function (content) {
      insertContent(this, content, true);
      return this;
    },

    prependTo: function (parent) {
      insertContent(cash(parent), this, true);
      return this;
    },

    remove: function () {
      return this.each(function (v) {
        if (!!v.parentNode) {
          return v.parentNode.removeChild(v);
        }
      });
    },

    text: function (content) {
      if (content === undefined) {
        return this[0].textContent;
      }
      return this.each(function (v) {
        return v.textContent = content;
      });
    }

  });

  var docEl = doc.documentElement;

  fn.extend({
    position: function () {
      var el = this[0];
      return {
        left: el.offsetLeft,
        top: el.offsetTop
      };
    },

    offset: function () {
      var rect = this[0].getBoundingClientRect();
      return {
        top: rect.top + win.pageYOffset - docEl.clientTop,
        left: rect.left + win.pageXOffset - docEl.clientLeft
      };
    },

    offsetParent: function () {
      return cash(this[0].offsetParent);
    }

  });

  fn.extend({
    children: function (selector) {
      var elems = [];
      this.each(function (el) {
        push.apply(elems, el.children);
      });
      elems = unique(elems);

      return !selector ? elems : elems.filter(function (v) {
        return matches(v, selector);
      });
    },

    closest: function (selector) {
      if (!selector || this.length < 1) {
        return cash();
      }
      if (this.is(selector)) {
        return this.filter(selector);
      }
      return this.parent().closest(selector);
    },

    is: function (selector) {
      if (!selector) {
        return false;
      }

      var match = false,
          comparator = getCompareFunction(selector);

      this.each(function (el) {
        match = comparator(el, selector);
        return !match;
      });

      return match;
    },

    find: function (selector) {
      if (!selector || selector.nodeType) {
        return cash(selector && this.has(selector).length ? selector : null);
      }

      var elems = [];
      this.each(function (el) {
        push.apply(elems, find(selector, el));
      });

      return unique(elems);
    },

    has: function (selector) {
      var comparator = isString(selector) ? function (el) {
        return find(selector, el).length !== 0;
      } : function (el) {
        return el.contains(selector);
      };

      return this.filter(comparator);
    },

    next: function () {
      return cash(this[0].nextElementSibling);
    },

    not: function (selector) {
      if (!selector) {
        return this;
      }

      var comparator = getCompareFunction(selector);

      return this.filter(function (el) {
        return !comparator(el, selector);
      });
    },

    parent: function () {
      var result = [];

      this.each(function (item) {
        if (item && item.parentNode) {
          result.push(item.parentNode);
        }
      });

      return unique(result);
    },

    parents: function (selector) {
      var last,
          result = [];

      this.each(function (item) {
        last = item;

        while (last && last.parentNode && last !== doc.body.parentNode) {
          last = last.parentNode;

          if (!selector || selector && matches(last, selector)) {
            result.push(last);
          }
        }
      });

      return unique(result);
    },

    prev: function () {
      return cash(this[0].previousElementSibling);
    },

    siblings: function (selector) {
      var collection = this.parent().children(selector),
          el = this[0];

      return collection.filter(function (i) {
        return i !== el;
      });
    }

  });

  return cash;
});
;
var Component = function () {
  /**
   * Generic constructor for all components
   * @constructor
   * @param {Element} el
   * @param {Object} options
   */
  function Component(classDef, el, options) {
    _classCallCheck(this, Component);

    // Display error if el is valid HTML Element
    if (!(el instanceof Element)) {
      console.error(Error(el + ' is not an HTML Element'));
    }

    // If exists, destroy and reinitialize in child
    var ins = classDef.getInstance(el);
    if (!!ins) {
      ins.destroy();
    }

    this.el = el;
    this.$el = cash(el);
  }

  /**
   * Initializes components
   * @param {class} classDef
   * @param {Element | NodeList | jQuery} els
   * @param {Object} options
   */


  _createClass(Component, null, [{
    key: "init",
    value: function init(classDef, els, options) {
      var instances = null;
      if (els instanceof Element) {
        instances = new classDef(els, options);
      } else if (!!els && (els.jquery || els.cash || els instanceof NodeList)) {
        var instancesArr = [];
        for (var i = 0; i < els.length; i++) {
          instancesArr.push(new classDef(els[i], options));
        }
        instances = instancesArr;
      }

      return instances;
    }
  }]);

  return Component;
}();

; // Required for Meteor package, the use of window prevents export by Meteor
(function (window) {
  if (window.Package) {
    M = {};
  } else {
    window.M = {};
  }

  // Check for jQuery
  M.jQueryLoaded = !!window.jQuery;
})(window);

// AMD
if (typeof define === 'function' && define.amd) {
  define('M', [], function () {
    return M;
  });

  // Common JS
} else if (typeof exports !== 'undefined' && !exports.nodeType) {
  if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
    exports = module.exports = M;
  }
  exports.default = M;
}

M.version = '1.0.0';

M.keys = {
  TAB: 9,
  ENTER: 13,
  ESC: 27,
  ARROW_UP: 38,
  ARROW_DOWN: 40
};

/**
 * TabPress Keydown handler
 */
M.tabPressed = false;
M.keyDown = false;
var docHandleKeydown = function (e) {
  M.keyDown = true;
  if (e.which === M.keys.TAB || e.which === M.keys.ARROW_DOWN || e.which === M.keys.ARROW_UP) {
    M.tabPressed = true;
  }
};
var docHandleKeyup = function (e) {
  M.keyDown = false;
  if (e.which === M.keys.TAB || e.which === M.keys.ARROW_DOWN || e.which === M.keys.ARROW_UP) {
    M.tabPressed = false;
  }
};
var docHandleFocus = function (e) {
  if (M.keyDown) {
    document.body.classList.add('keyboard-focused');
  }
};
var docHandleBlur = function (e) {
  document.body.classList.remove('keyboard-focused');
};
document.addEventListener('keydown', docHandleKeydown, true);
document.addEventListener('keyup', docHandleKeyup, true);
document.addEventListener('focus', docHandleFocus, true);
document.addEventListener('blur', docHandleBlur, true);

/**
 * Initialize jQuery wrapper for plugin
 * @param {Class} plugin  javascript class
 * @param {string} pluginName  jQuery plugin name
 * @param {string} classRef  Class reference name
 */
M.initializeJqueryWrapper = function (plugin, pluginName, classRef) {
  jQuery.fn[pluginName] = function (methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (plugin.prototype[methodOrOptions]) {
      var params = Array.prototype.slice.call(arguments, 1);

      // Getter methods
      if (methodOrOptions.slice(0, 3) === 'get') {
        var instance = this.first()[0][classRef];
        return instance[methodOrOptions].apply(instance, params);
      }

      // Void methods
      return this.each(function () {
        var instance = this[classRef];
        instance[methodOrOptions].apply(instance, params);
      });

      // Initialize plugin if options or no argument is passed in
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      plugin.init(this, arguments[0]);
      return this;
    }

    // Return error if an unrecognized  method name is passed in
    jQuery.error("Method " + methodOrOptions + " does not exist on jQuery." + pluginName);
  };
};

/**
 * Automatically initialize components
 * @param {Element} context  DOM Element to search within for components
 */
M.AutoInit = function (context) {
  // Use document.body if no context is given
  var root = !!context ? context : document.body;

  var registry = {
    Autocomplete: root.querySelectorAll('.autocomplete:not(.no-autoinit)'),
    Carousel: root.querySelectorAll('.carousel:not(.no-autoinit)'),
    Chips: root.querySelectorAll('.chips:not(.no-autoinit)'),
    Collapsible: root.querySelectorAll('.collapsible:not(.no-autoinit)'),
    Datepicker: root.querySelectorAll('.datepicker:not(.no-autoinit)'),
    Dropdown: root.querySelectorAll('.dropdown-trigger:not(.no-autoinit)'),
    Materialbox: root.querySelectorAll('.materialboxed:not(.no-autoinit)'),
    Modal: root.querySelectorAll('.modal:not(.no-autoinit)'),
    Parallax: root.querySelectorAll('.parallax:not(.no-autoinit)'),
    Pushpin: root.querySelectorAll('.pushpin:not(.no-autoinit)'),
    ScrollSpy: root.querySelectorAll('.scrollspy:not(.no-autoinit)'),
    FormSelect: root.querySelectorAll('select:not(.no-autoinit)'),
    Sidenav: root.querySelectorAll('.sidenav:not(.no-autoinit)'),
    Tabs: root.querySelectorAll('.tabs:not(.no-autoinit)'),
    TapTarget: root.querySelectorAll('.tap-target:not(.no-autoinit)'),
    Timepicker: root.querySelectorAll('.timepicker:not(.no-autoinit)'),
    Tooltip: root.querySelectorAll('.tooltipped:not(.no-autoinit)'),
    FloatingActionButton: root.querySelectorAll('.fixed-action-btn:not(.no-autoinit)')
  };

  for (var pluginName in registry) {
    var plugin = M[pluginName];
    plugin.init(registry[pluginName]);
  }
};

/**
 * Generate approximated selector string for a jQuery object
 * @param {jQuery} obj  jQuery object to be parsed
 * @returns {string}
 */
M.objectSelectorString = function (obj) {
  var tagStr = obj.prop('tagName') || '';
  var idStr = obj.attr('id') || '';
  var classStr = obj.attr('class') || '';
  return (tagStr + idStr + classStr).replace(/\s/g, '');
};

// Unique Random ID
M.guid = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };
}();

/**
 * Escapes hash from special characters
 * @param {string} hash  String returned from this.hash
 * @returns {string}
 */
M.escapeHash = function (hash) {
  return hash.replace(/(:|\.|\[|\]|,|=|\/)/g, '\\$1');
};

M.elementOrParentIsFixed = function (element) {
  var $element = $(element);
  var $checkElements = $element.add($element.parents());
  var isFixed = false;
  $checkElements.each(function () {
    if ($(this).css('position') === 'fixed') {
      isFixed = true;
      return false;
    }
  });
  return isFixed;
};

/**
 * @typedef {Object} Edges
 * @property {Boolean} top  If the top edge was exceeded
 * @property {Boolean} right  If the right edge was exceeded
 * @property {Boolean} bottom  If the bottom edge was exceeded
 * @property {Boolean} left  If the left edge was exceeded
 */

/**
 * @typedef {Object} Bounding
 * @property {Number} left  left offset coordinate
 * @property {Number} top  top offset coordinate
 * @property {Number} width
 * @property {Number} height
 */

/**
 * Escapes hash from special characters
 * @param {Element} container  Container element that acts as the boundary
 * @param {Bounding} bounding  element bounding that is being checked
 * @param {Number} offset  offset from edge that counts as exceeding
 * @returns {Edges}
 */
M.checkWithinContainer = function (container, bounding, offset) {
  var edges = {
    top: false,
    right: false,
    bottom: false,
    left: false
  };

  var containerRect = container.getBoundingClientRect();
  // If body element is smaller than viewport, use viewport height instead.
  var containerBottom = container === document.body ? Math.max(containerRect.bottom, window.innerHeight) : containerRect.bottom;

  var scrollLeft = container.scrollLeft;
  var scrollTop = container.scrollTop;

  var scrolledX = bounding.left - scrollLeft;
  var scrolledY = bounding.top - scrollTop;

  // Check for container and viewport for each edge
  if (scrolledX < containerRect.left + offset || scrolledX < offset) {
    edges.left = true;
  }

  if (scrolledX + bounding.width > containerRect.right - offset || scrolledX + bounding.width > window.innerWidth - offset) {
    edges.right = true;
  }

  if (scrolledY < containerRect.top + offset || scrolledY < offset) {
    edges.top = true;
  }

  if (scrolledY + bounding.height > containerBottom - offset || scrolledY + bounding.height > window.innerHeight - offset) {
    edges.bottom = true;
  }

  return edges;
};

M.checkPossibleAlignments = function (el, container, bounding, offset) {
  var canAlign = {
    top: true,
    right: true,
    bottom: true,
    left: true,
    spaceOnTop: null,
    spaceOnRight: null,
    spaceOnBottom: null,
    spaceOnLeft: null
  };

  var containerAllowsOverflow = getComputedStyle(container).overflow === 'visible';
  var containerRect = container.getBoundingClientRect();
  var containerHeight = Math.min(containerRect.height, window.innerHeight);
  var containerWidth = Math.min(containerRect.width, window.innerWidth);
  var elOffsetRect = el.getBoundingClientRect();

  var scrollLeft = container.scrollLeft;
  var scrollTop = container.scrollTop;

  var scrolledX = bounding.left - scrollLeft;
  var scrolledYTopEdge = bounding.top - scrollTop;
  var scrolledYBottomEdge = bounding.top + elOffsetRect.height - scrollTop;

  // Check for container and viewport for left
  canAlign.spaceOnRight = !containerAllowsOverflow ? containerWidth - (scrolledX + bounding.width) : window.innerWidth - (elOffsetRect.left + bounding.width);
  if (canAlign.spaceOnRight < 0) {
    canAlign.left = false;
  }

  // Check for container and viewport for Right
  canAlign.spaceOnLeft = !containerAllowsOverflow ? scrolledX - bounding.width + elOffsetRect.width : elOffsetRect.right - bounding.width;
  if (canAlign.spaceOnLeft < 0) {
    canAlign.right = false;
  }

  // Check for container and viewport for Top
  canAlign.spaceOnBottom = !containerAllowsOverflow ? containerHeight - (scrolledYTopEdge + bounding.height + offset) : window.innerHeight - (elOffsetRect.top + bounding.height + offset);
  if (canAlign.spaceOnBottom < 0) {
    canAlign.top = false;
  }

  // Check for container and viewport for Bottom
  canAlign.spaceOnTop = !containerAllowsOverflow ? scrolledYBottomEdge - (bounding.height - offset) : elOffsetRect.bottom - (bounding.height + offset);
  if (canAlign.spaceOnTop < 0) {
    canAlign.bottom = false;
  }

  return canAlign;
};

M.getOverflowParent = function (element) {
  if (element == null) {
    return null;
  }

  if (element === document.body || getComputedStyle(element).overflow !== 'visible') {
    return element;
  }

  return M.getOverflowParent(element.parentElement);
};

/**
 * Gets id of component from a trigger
 * @param {Element} trigger  trigger
 * @returns {string}
 */
M.getIdFromTrigger = function (trigger) {
  var id = trigger.getAttribute('data-target');
  if (!id) {
    id = trigger.getAttribute('href');
    if (id) {
      id = id.slice(1);
    } else {
      id = '';
    }
  }
  return id;
};

/**
 * Multi browser support for document scroll top
 * @returns {Number}
 */
M.getDocumentScrollTop = function () {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
};

/**
 * Multi browser support for document scroll left
 * @returns {Number}
 */
M.getDocumentScrollLeft = function () {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
};

/**
 * @typedef {Object} Edges
 * @property {Boolean} top  If the top edge was exceeded
 * @property {Boolean} right  If the right edge was exceeded
 * @property {Boolean} bottom  If the bottom edge was exceeded
 * @property {Boolean} left  If the left edge was exceeded
 */

/**
 * @typedef {Object} Bounding
 * @property {Number} left  left offset coordinate
 * @property {Number} top  top offset coordinate
 * @property {Number} width
 * @property {Number} height
 */

/**
 * Get time in ms
 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
 * @type {function}
 * @return {number}
 */
var getTime = Date.now || function () {
  return new Date().getTime();
};

/**
 * Returns a function, that, when invoked, will only be triggered at most once
 * during a given window of time. Normally, the throttled function will run
 * as much as it can, without ever going more than once per `wait` duration;
 * but if you'd like to disable the execution on the leading edge, pass
 * `{leading: false}`. To disable execution on the trailing edge, ditto.
 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
 * @param {function} func
 * @param {number} wait
 * @param {Object=} options
 * @returns {Function}
 */
M.throttle = function (func, wait, options) {
  var context = void 0,
      args = void 0,
      result = void 0;
  var timeout = null;
  var previous = 0;
  options || (options = {});
  var later = function () {
    previous = options.leading === false ? 0 : getTime();
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };
  return function () {
    var now = getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};
; /*
  v2.2.0
  2017 Julian Garnier
  Released under the MIT license
  */
var $jscomp = { scope: {} };$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (e, r, p) {
  if (p.get || p.set) throw new TypeError("ES3 does not support getters and setters.");e != Array.prototype && e != Object.prototype && (e[r] = p.value);
};$jscomp.getGlobal = function (e) {
  return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e;
};$jscomp.global = $jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
  $jscomp.initSymbol = function () {};$jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};$jscomp.symbolCounter_ = 0;$jscomp.Symbol = function (e) {
  return $jscomp.SYMBOL_PREFIX + (e || "") + $jscomp.symbolCounter_++;
};
$jscomp.initSymbolIterator = function () {
  $jscomp.initSymbol();var e = $jscomp.global.Symbol.iterator;e || (e = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));"function" != typeof Array.prototype[e] && $jscomp.defineProperty(Array.prototype, e, { configurable: !0, writable: !0, value: function () {
      return $jscomp.arrayIterator(this);
    } });$jscomp.initSymbolIterator = function () {};
};$jscomp.arrayIterator = function (e) {
  var r = 0;return $jscomp.iteratorPrototype(function () {
    return r < e.length ? { done: !1, value: e[r++] } : { done: !0 };
  });
};
$jscomp.iteratorPrototype = function (e) {
  $jscomp.initSymbolIterator();e = { next: e };e[$jscomp.global.Symbol.iterator] = function () {
    return this;
  };return e;
};$jscomp.array = $jscomp.array || {};$jscomp.iteratorFromArray = function (e, r) {
  $jscomp.initSymbolIterator();e instanceof String && (e += "");var p = 0,
      m = { next: function () {
      if (p < e.length) {
        var u = p++;return { value: r(u, e[u]), done: !1 };
      }m.next = function () {
        return { done: !0, value: void 0 };
      };return m.next();
    } };m[Symbol.iterator] = function () {
    return m;
  };return m;
};
$jscomp.polyfill = function (e, r, p, m) {
  if (r) {
    p = $jscomp.global;e = e.split(".");for (m = 0; m < e.length - 1; m++) {
      var u = e[m];u in p || (p[u] = {});p = p[u];
    }e = e[e.length - 1];m = p[e];r = r(m);r != m && null != r && $jscomp.defineProperty(p, e, { configurable: !0, writable: !0, value: r });
  }
};$jscomp.polyfill("Array.prototype.keys", function (e) {
  return e ? e : function () {
    return $jscomp.iteratorFromArray(this, function (e) {
      return e;
    });
  };
}, "es6-impl", "es3");var $jscomp$this = this;
(function (r) {
  M.anime = r();
})(function () {
  function e(a) {
    if (!h.col(a)) try {
      return document.querySelectorAll(a);
    } catch (c) {}
  }function r(a, c) {
    for (var d = a.length, b = 2 <= arguments.length ? arguments[1] : void 0, f = [], n = 0; n < d; n++) {
      if (n in a) {
        var k = a[n];c.call(b, k, n, a) && f.push(k);
      }
    }return f;
  }function p(a) {
    return a.reduce(function (a, d) {
      return a.concat(h.arr(d) ? p(d) : d);
    }, []);
  }function m(a) {
    if (h.arr(a)) return a;
    h.str(a) && (a = e(a) || a);return a instanceof NodeList || a instanceof HTMLCollection ? [].slice.call(a) : [a];
  }function u(a, c) {
    return a.some(function (a) {
      return a === c;
    });
  }function C(a) {
    var c = {},
        d;for (d in a) {
      c[d] = a[d];
    }return c;
  }function D(a, c) {
    var d = C(a),
        b;for (b in a) {
      d[b] = c.hasOwnProperty(b) ? c[b] : a[b];
    }return d;
  }function z(a, c) {
    var d = C(a),
        b;for (b in c) {
      d[b] = h.und(a[b]) ? c[b] : a[b];
    }return d;
  }function T(a) {
    a = a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (a, c, d, k) {
      return c + c + d + d + k + k;
    });var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
    a = parseInt(c[1], 16);var d = parseInt(c[2], 16),
        c = parseInt(c[3], 16);return "rgba(" + a + "," + d + "," + c + ",1)";
  }function U(a) {
    function c(a, c, b) {
      0 > b && (b += 1);1 < b && --b;return b < 1 / 6 ? a + 6 * (c - a) * b : .5 > b ? c : b < 2 / 3 ? a + (c - a) * (2 / 3 - b) * 6 : a;
    }var d = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(a);a = parseInt(d[1]) / 360;var b = parseInt(d[2]) / 100,
        f = parseInt(d[3]) / 100,
        d = d[4] || 1;if (0 == b) f = b = a = f;else {
      var n = .5 > f ? f * (1 + b) : f + b - f * b,
          k = 2 * f - n,
          f = c(k, n, a + 1 / 3),
          b = c(k, n, a);a = c(k, n, a - 1 / 3);
    }return "rgba(" + 255 * f + "," + 255 * b + "," + 255 * a + "," + d + ")";
  }function y(a) {
    if (a = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(a)) return a[2];
  }function V(a) {
    if (-1 < a.indexOf("translate") || "perspective" === a) return "px";if (-1 < a.indexOf("rotate") || -1 < a.indexOf("skew")) return "deg";
  }function I(a, c) {
    return h.fnc(a) ? a(c.target, c.id, c.total) : a;
  }function E(a, c) {
    if (c in a.style) return getComputedStyle(a).getPropertyValue(c.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()) || "0";
  }function J(a, c) {
    if (h.dom(a) && u(W, c)) return "transform";if (h.dom(a) && (a.getAttribute(c) || h.svg(a) && a[c])) return "attribute";if (h.dom(a) && "transform" !== c && E(a, c)) return "css";if (null != a[c]) return "object";
  }function X(a, c) {
    var d = V(c),
        d = -1 < c.indexOf("scale") ? 1 : 0 + d;a = a.style.transform;if (!a) return d;for (var b = [], f = [], n = [], k = /(\w+)\((.+?)\)/g; b = k.exec(a);) {
      f.push(b[1]), n.push(b[2]);
    }a = r(n, function (a, b) {
      return f[b] === c;
    });return a.length ? a[0] : d;
  }function K(a, c) {
    switch (J(a, c)) {case "transform":
        return X(a, c);case "css":
        return E(a, c);case "attribute":
        return a.getAttribute(c);}return a[c] || 0;
  }function L(a, c) {
    var d = /^(\*=|\+=|-=)/.exec(a);if (!d) return a;var b = y(a) || 0;c = parseFloat(c);a = parseFloat(a.replace(d[0], ""));switch (d[0][0]) {case "+":
        return c + a + b;case "-":
        return c - a + b;case "*":
        return c * a + b;}
  }function F(a, c) {
    return Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2));
  }function M(a) {
    a = a.points;for (var c = 0, d, b = 0; b < a.numberOfItems; b++) {
      var f = a.getItem(b);0 < b && (c += F(d, f));d = f;
    }return c;
  }function N(a) {
    if (a.getTotalLength) return a.getTotalLength();switch (a.tagName.toLowerCase()) {case "circle":
        return 2 * Math.PI * a.getAttribute("r");case "rect":
        return 2 * a.getAttribute("width") + 2 * a.getAttribute("height");case "line":
        return F({ x: a.getAttribute("x1"), y: a.getAttribute("y1") }, { x: a.getAttribute("x2"), y: a.getAttribute("y2") });case "polyline":
        return M(a);case "polygon":
        var c = a.points;return M(a) + F(c.getItem(c.numberOfItems - 1), c.getItem(0));}
  }function Y(a, c) {
    function d(b) {
      b = void 0 === b ? 0 : b;return a.el.getPointAtLength(1 <= c + b ? c + b : 0);
    }var b = d(),
        f = d(-1),
        n = d(1);switch (a.property) {case "x":
        return b.x;case "y":
        return b.y;
      case "angle":
        return 180 * Math.atan2(n.y - f.y, n.x - f.x) / Math.PI;}
  }function O(a, c) {
    var d = /-?\d*\.?\d+/g,
        b;b = h.pth(a) ? a.totalLength : a;if (h.col(b)) {
      if (h.rgb(b)) {
        var f = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(b);b = f ? "rgba(" + f[1] + ",1)" : b;
      } else b = h.hex(b) ? T(b) : h.hsl(b) ? U(b) : void 0;
    } else f = (f = y(b)) ? b.substr(0, b.length - f.length) : b, b = c && !/\s/g.test(b) ? f + c : f;b += "";return { original: b, numbers: b.match(d) ? b.match(d).map(Number) : [0], strings: h.str(a) || c ? b.split(d) : [] };
  }function P(a) {
    a = a ? p(h.arr(a) ? a.map(m) : m(a)) : [];return r(a, function (a, d, b) {
      return b.indexOf(a) === d;
    });
  }function Z(a) {
    var c = P(a);return c.map(function (a, b) {
      return { target: a, id: b, total: c.length };
    });
  }function aa(a, c) {
    var d = C(c);if (h.arr(a)) {
      var b = a.length;2 !== b || h.obj(a[0]) ? h.fnc(c.duration) || (d.duration = c.duration / b) : a = { value: a };
    }return m(a).map(function (a, b) {
      b = b ? 0 : c.delay;a = h.obj(a) && !h.pth(a) ? a : { value: a };h.und(a.delay) && (a.delay = b);return a;
    }).map(function (a) {
      return z(a, d);
    });
  }function ba(a, c) {
    var d = {},
        b;for (b in a) {
      var f = I(a[b], c);h.arr(f) && (f = f.map(function (a) {
        return I(a, c);
      }), 1 === f.length && (f = f[0]));d[b] = f;
    }d.duration = parseFloat(d.duration);d.delay = parseFloat(d.delay);return d;
  }function ca(a) {
    return h.arr(a) ? A.apply(this, a) : Q[a];
  }function da(a, c) {
    var d;return a.tweens.map(function (b) {
      b = ba(b, c);var f = b.value,
          e = K(c.target, a.name),
          k = d ? d.to.original : e,
          k = h.arr(f) ? f[0] : k,
          w = L(h.arr(f) ? f[1] : f, k),
          e = y(w) || y(k) || y(e);b.from = O(k, e);b.to = O(w, e);b.start = d ? d.end : a.offset;b.end = b.start + b.delay + b.duration;b.easing = ca(b.easing);b.elasticity = (1E3 - Math.min(Math.max(b.elasticity, 1), 999)) / 1E3;b.isPath = h.pth(f);b.isColor = h.col(b.from.original);b.isColor && (b.round = 1);return d = b;
    });
  }function ea(a, c) {
    return r(p(a.map(function (a) {
      return c.map(function (b) {
        var c = J(a.target, b.name);if (c) {
          var d = da(b, a);b = { type: c, property: b.name, animatable: a, tweens: d, duration: d[d.length - 1].end, delay: d[0].delay };
        } else b = void 0;return b;
      });
    })), function (a) {
      return !h.und(a);
    });
  }function R(a, c, d, b) {
    var f = "delay" === a;return c.length ? (f ? Math.min : Math.max).apply(Math, c.map(function (b) {
      return b[a];
    })) : f ? b.delay : d.offset + b.delay + b.duration;
  }function fa(a) {
    var c = D(ga, a),
        d = D(S, a),
        b = Z(a.targets),
        f = [],
        e = z(c, d),
        k;for (k in a) {
      e.hasOwnProperty(k) || "targets" === k || f.push({ name: k, offset: e.offset, tweens: aa(a[k], d) });
    }a = ea(b, f);return z(c, { children: [], animatables: b, animations: a, duration: R("duration", a, c, d), delay: R("delay", a, c, d) });
  }function q(a) {
    function c() {
      return window.Promise && new Promise(function (a) {
        return p = a;
      });
    }function d(a) {
      return g.reversed ? g.duration - a : a;
    }function b(a) {
      for (var b = 0, c = {}, d = g.animations, f = d.length; b < f;) {
        var e = d[b],
            k = e.animatable,
            h = e.tweens,
            n = h.length - 1,
            l = h[n];n && (l = r(h, function (b) {
          return a < b.end;
        })[0] || l);for (var h = Math.min(Math.max(a - l.start - l.delay, 0), l.duration) / l.duration, w = isNaN(h) ? 1 : l.easing(h, l.elasticity), h = l.to.strings, p = l.round, n = [], m = void 0, m = l.to.numbers.length, t = 0; t < m; t++) {
          var x = void 0,
              x = l.to.numbers[t],
              q = l.from.numbers[t],
              x = l.isPath ? Y(l.value, w * x) : q + w * (x - q);p && (l.isColor && 2 < t || (x = Math.round(x * p) / p));n.push(x);
        }if (l = h.length) for (m = h[0], w = 0; w < l; w++) {
          p = h[w + 1], t = n[w], isNaN(t) || (m = p ? m + (t + p) : m + (t + " "));
        } else m = n[0];ha[e.type](k.target, e.property, m, c, k.id);e.currentValue = m;b++;
      }if (b = Object.keys(c).length) for (d = 0; d < b; d++) {
        H || (H = E(document.body, "transform") ? "transform" : "-webkit-transform"), g.animatables[d].target.style[H] = c[d].join(" ");
      }g.currentTime = a;g.progress = a / g.duration * 100;
    }function f(a) {
      if (g[a]) g[a](g);
    }function e() {
      g.remaining && !0 !== g.remaining && g.remaining--;
    }function k(a) {
      var k = g.duration,
          n = g.offset,
          w = n + g.delay,
          r = g.currentTime,
          x = g.reversed,
          q = d(a);if (g.children.length) {
        var u = g.children,
            v = u.length;
        if (q >= g.currentTime) for (var G = 0; G < v; G++) {
          u[G].seek(q);
        } else for (; v--;) {
          u[v].seek(q);
        }
      }if (q >= w || !k) g.began || (g.began = !0, f("begin")), f("run");if (q > n && q < k) b(q);else if (q <= n && 0 !== r && (b(0), x && e()), q >= k && r !== k || !k) b(k), x || e();f("update");a >= k && (g.remaining ? (t = h, "alternate" === g.direction && (g.reversed = !g.reversed)) : (g.pause(), g.completed || (g.completed = !0, f("complete"), "Promise" in window && (p(), m = c()))), l = 0);
    }a = void 0 === a ? {} : a;var h,
        t,
        l = 0,
        p = null,
        m = c(),
        g = fa(a);g.reset = function () {
      var a = g.direction,
          c = g.loop;g.currentTime = 0;g.progress = 0;g.paused = !0;g.began = !1;g.completed = !1;g.reversed = "reverse" === a;g.remaining = "alternate" === a && 1 === c ? 2 : c;b(0);for (a = g.children.length; a--;) {
        g.children[a].reset();
      }
    };g.tick = function (a) {
      h = a;t || (t = h);k((l + h - t) * q.speed);
    };g.seek = function (a) {
      k(d(a));
    };g.pause = function () {
      var a = v.indexOf(g);-1 < a && v.splice(a, 1);g.paused = !0;
    };g.play = function () {
      g.paused && (g.paused = !1, t = 0, l = d(g.currentTime), v.push(g), B || ia());
    };g.reverse = function () {
      g.reversed = !g.reversed;t = 0;l = d(g.currentTime);
    };g.restart = function () {
      g.pause();
      g.reset();g.play();
    };g.finished = m;g.reset();g.autoplay && g.play();return g;
  }var ga = { update: void 0, begin: void 0, run: void 0, complete: void 0, loop: 1, direction: "normal", autoplay: !0, offset: 0 },
      S = { duration: 1E3, delay: 0, easing: "easeOutElastic", elasticity: 500, round: 0 },
      W = "translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective".split(" "),
      H,
      h = { arr: function (a) {
      return Array.isArray(a);
    }, obj: function (a) {
      return -1 < Object.prototype.toString.call(a).indexOf("Object");
    },
    pth: function (a) {
      return h.obj(a) && a.hasOwnProperty("totalLength");
    }, svg: function (a) {
      return a instanceof SVGElement;
    }, dom: function (a) {
      return a.nodeType || h.svg(a);
    }, str: function (a) {
      return "string" === typeof a;
    }, fnc: function (a) {
      return "function" === typeof a;
    }, und: function (a) {
      return "undefined" === typeof a;
    }, hex: function (a) {
      return (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)
      );
    }, rgb: function (a) {
      return (/^rgb/.test(a)
      );
    }, hsl: function (a) {
      return (/^hsl/.test(a)
      );
    }, col: function (a) {
      return h.hex(a) || h.rgb(a) || h.hsl(a);
    } },
      A = function () {
    function a(a, d, b) {
      return (((1 - 3 * b + 3 * d) * a + (3 * b - 6 * d)) * a + 3 * d) * a;
    }return function (c, d, b, f) {
      if (0 <= c && 1 >= c && 0 <= b && 1 >= b) {
        var e = new Float32Array(11);if (c !== d || b !== f) for (var k = 0; 11 > k; ++k) {
          e[k] = a(.1 * k, c, b);
        }return function (k) {
          if (c === d && b === f) return k;if (0 === k) return 0;if (1 === k) return 1;for (var h = 0, l = 1; 10 !== l && e[l] <= k; ++l) {
            h += .1;
          }--l;var l = h + (k - e[l]) / (e[l + 1] - e[l]) * .1,
              n = 3 * (1 - 3 * b + 3 * c) * l * l + 2 * (3 * b - 6 * c) * l + 3 * c;if (.001 <= n) {
            for (h = 0; 4 > h; ++h) {
              n = 3 * (1 - 3 * b + 3 * c) * l * l + 2 * (3 * b - 6 * c) * l + 3 * c;if (0 === n) break;var m = a(l, c, b) - k,
                  l = l - m / n;
            }k = l;
          } else if (0 === n) k = l;else {
            var l = h,
                h = h + .1,
                g = 0;do {
              m = l + (h - l) / 2, n = a(m, c, b) - k, 0 < n ? h = m : l = m;
            } while (1e-7 < Math.abs(n) && 10 > ++g);k = m;
          }return a(k, d, f);
        };
      }
    };
  }(),
      Q = function () {
    function a(a, b) {
      return 0 === a || 1 === a ? a : -Math.pow(2, 10 * (a - 1)) * Math.sin(2 * (a - 1 - b / (2 * Math.PI) * Math.asin(1)) * Math.PI / b);
    }var c = "Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),
        d = { In: [[.55, .085, .68, .53], [.55, .055, .675, .19], [.895, .03, .685, .22], [.755, .05, .855, .06], [.47, 0, .745, .715], [.95, .05, .795, .035], [.6, .04, .98, .335], [.6, -.28, .735, .045], a], Out: [[.25, .46, .45, .94], [.215, .61, .355, 1], [.165, .84, .44, 1], [.23, 1, .32, 1], [.39, .575, .565, 1], [.19, 1, .22, 1], [.075, .82, .165, 1], [.175, .885, .32, 1.275], function (b, c) {
        return 1 - a(1 - b, c);
      }], InOut: [[.455, .03, .515, .955], [.645, .045, .355, 1], [.77, 0, .175, 1], [.86, 0, .07, 1], [.445, .05, .55, .95], [1, 0, 0, 1], [.785, .135, .15, .86], [.68, -.55, .265, 1.55], function (b, c) {
        return .5 > b ? a(2 * b, c) / 2 : 1 - a(-2 * b + 2, c) / 2;
      }] },
        b = { linear: A(.25, .25, .75, .75) },
        f = {},
        e;for (e in d) {
      f.type = e, d[f.type].forEach(function (a) {
        return function (d, f) {
          b["ease" + a.type + c[f]] = h.fnc(d) ? d : A.apply($jscomp$this, d);
        };
      }(f)), f = { type: f.type };
    }return b;
  }(),
      ha = { css: function (a, c, d) {
      return a.style[c] = d;
    }, attribute: function (a, c, d) {
      return a.setAttribute(c, d);
    }, object: function (a, c, d) {
      return a[c] = d;
    }, transform: function (a, c, d, b, f) {
      b[f] || (b[f] = []);b[f].push(c + "(" + d + ")");
    } },
      v = [],
      B = 0,
      ia = function () {
    function a() {
      B = requestAnimationFrame(c);
    }function c(c) {
      var b = v.length;if (b) {
        for (var d = 0; d < b;) {
          v[d] && v[d].tick(c), d++;
        }a();
      } else cancelAnimationFrame(B), B = 0;
    }return a;
  }();q.version = "2.2.0";q.speed = 1;q.running = v;q.remove = function (a) {
    a = P(a);for (var c = v.length; c--;) {
      for (var d = v[c], b = d.animations, f = b.length; f--;) {
        u(a, b[f].animatable.target) && (b.splice(f, 1), b.length || d.pause());
      }
    }
  };q.getValue = K;q.path = function (a, c) {
    var d = h.str(a) ? e(a)[0] : a,
        b = c || 100;return function (a) {
      return { el: d, property: a, totalLength: N(d) * (b / 100) };
    };
  };q.setDashoffset = function (a) {
    var c = N(a);a.setAttribute("stroke-dasharray", c);return c;
  };q.bezier = A;q.easings = Q;q.timeline = function (a) {
    var c = q(a);c.pause();c.duration = 0;c.add = function (d) {
      c.children.forEach(function (a) {
        a.began = !0;a.completed = !0;
      });m(d).forEach(function (b) {
        var d = z(b, D(S, a || {}));d.targets = d.targets || a.targets;b = c.duration;var e = d.offset;d.autoplay = !1;d.direction = c.direction;d.offset = h.und(e) ? b : L(e, b);c.began = !0;c.completed = !0;c.seek(d.offset);d = q(d);d.began = !0;d.completed = !0;d.duration > b && (c.duration = d.duration);c.children.push(d);
      });c.seek(0);c.reset();c.autoplay && c.restart();return c;
    };return c;
  };q.random = function (a, c) {
    return Math.floor(Math.random() * (c - a + 1)) + a;
  };return q;
});
;(function ($, anim) {
  'use strict';

  var _defaults = {
    accordion: true,
    onOpenStart: undefined,
    onOpenEnd: undefined,
    onCloseStart: undefined,
    onCloseEnd: undefined,
    inDuration: 300,
    outDuration: 300
  };

  /**
   * @class
   *
   */

  var Collapsible = function (_Component) {
    _inherits(Collapsible, _Component);

    /**
     * Construct Collapsible instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Collapsible(el, options) {
      _classCallCheck(this, Collapsible);

      var _this3 = _possibleConstructorReturn(this, (Collapsible.__proto__ || Object.getPrototypeOf(Collapsible)).call(this, Collapsible, el, options));

      _this3.el.M_Collapsible = _this3;

      /**
       * Options for the collapsible
       * @member Collapsible#options
       * @prop {Boolean} [accordion=false] - Type of the collapsible
       * @prop {Function} onOpenStart - Callback function called before collapsible is opened
       * @prop {Function} onOpenEnd - Callback function called after collapsible is opened
       * @prop {Function} onCloseStart - Callback function called before collapsible is closed
       * @prop {Function} onCloseEnd - Callback function called after collapsible is closed
       * @prop {Number} inDuration - Transition in duration in milliseconds.
       * @prop {Number} outDuration - Transition duration in milliseconds.
       */
      _this3.options = $.extend({}, Collapsible.defaults, options);

      // Setup tab indices
      _this3.$headers = _this3.$el.children('li').children('.collapsible-header');
      _this3.$headers.attr('tabindex', 0);

      _this3._setupEventHandlers();

      // Open first active
      var $activeBodies = _this3.$el.children('li.active').children('.collapsible-body');
      if (_this3.options.accordion) {
        // Handle Accordion
        $activeBodies.first().css('display', 'block');
      } else {
        // Handle Expandables
        $activeBodies.css('display', 'block');
      }
      return _this3;
    }

    _createClass(Collapsible, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_Collapsible = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this4 = this;

        this._handleCollapsibleClickBound = this._handleCollapsibleClick.bind(this);
        this._handleCollapsibleKeydownBound = this._handleCollapsibleKeydown.bind(this);
        this.el.addEventListener('click', this._handleCollapsibleClickBound);
        this.$headers.each(function (header) {
          header.addEventListener('keydown', _this4._handleCollapsibleKeydownBound);
        });
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this5 = this;

        this.el.removeEventListener('click', this._handleCollapsibleClickBound);
        this.$headers.each(function (header) {
          header.removeEventListener('keydown', _this5._handleCollapsibleKeydownBound);
        });
      }

      /**
       * Handle Collapsible Click
       * @param {Event} e
       */

    }, {
      key: "_handleCollapsibleClick",
      value: function _handleCollapsibleClick(e) {
        var $header = $(e.target).closest('.collapsible-header');
        if (e.target && $header.length) {
          var $collapsible = $header.closest('.collapsible');
          if ($collapsible[0] === this.el) {
            var $collapsibleLi = $header.closest('li');
            var $collapsibleLis = $collapsible.children('li');
            var isActive = $collapsibleLi[0].classList.contains('active');
            var index = $collapsibleLis.index($collapsibleLi);

            if (isActive) {
              this.close(index);
            } else {
              this.open(index);
            }
          }
        }
      }

      /**
       * Handle Collapsible Keydown
       * @param {Event} e
       */

    }, {
      key: "_handleCollapsibleKeydown",
      value: function _handleCollapsibleKeydown(e) {
        if (e.keyCode === 13) {
          this._handleCollapsibleClickBound(e);
        }
      }

      /**
       * Animate in collapsible slide
       * @param {Number} index - 0th index of slide
       */

    }, {
      key: "_animateIn",
      value: function _animateIn(index) {
        var _this6 = this;

        var $collapsibleLi = this.$el.children('li').eq(index);
        if ($collapsibleLi.length) {
          var $body = $collapsibleLi.children('.collapsible-body');

          anim.remove($body[0]);
          $body.css({
            display: 'block',
            overflow: 'hidden',
            height: 0,
            paddingTop: '',
            paddingBottom: ''
          });

          var pTop = $body.css('padding-top');
          var pBottom = $body.css('padding-bottom');
          var finalHeight = $body[0].scrollHeight;
          $body.css({
            paddingTop: 0,
            paddingBottom: 0
          });

          anim({
            targets: $body[0],
            height: finalHeight,
            paddingTop: pTop,
            paddingBottom: pBottom,
            duration: this.options.inDuration,
            easing: 'easeInOutCubic',
            complete: function (anim) {
              $body.css({
                overflow: '',
                paddingTop: '',
                paddingBottom: '',
                height: ''
              });

              // onOpenEnd callback
              if (typeof _this6.options.onOpenEnd === 'function') {
                _this6.options.onOpenEnd.call(_this6, $collapsibleLi[0]);
              }
            }
          });
        }
      }

      /**
       * Animate out collapsible slide
       * @param {Number} index - 0th index of slide to open
       */

    }, {
      key: "_animateOut",
      value: function _animateOut(index) {
        var _this7 = this;

        var $collapsibleLi = this.$el.children('li').eq(index);
        if ($collapsibleLi.length) {
          var $body = $collapsibleLi.children('.collapsible-body');
          anim.remove($body[0]);
          $body.css('overflow', 'hidden');
          anim({
            targets: $body[0],
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            duration: this.options.outDuration,
            easing: 'easeInOutCubic',
            complete: function () {
              $body.css({
                height: '',
                overflow: '',
                padding: '',
                display: ''
              });

              // onCloseEnd callback
              if (typeof _this7.options.onCloseEnd === 'function') {
                _this7.options.onCloseEnd.call(_this7, $collapsibleLi[0]);
              }
            }
          });
        }
      }

      /**
       * Open Collapsible
       * @param {Number} index - 0th index of slide
       */

    }, {
      key: "open",
      value: function open(index) {
        var _this8 = this;

        var $collapsibleLi = this.$el.children('li').eq(index);
        if ($collapsibleLi.length && !$collapsibleLi[0].classList.contains('active')) {
          // onOpenStart callback
          if (typeof this.options.onOpenStart === 'function') {
            this.options.onOpenStart.call(this, $collapsibleLi[0]);
          }

          // Handle accordion behavior
          if (this.options.accordion) {
            var $collapsibleLis = this.$el.children('li');
            var $activeLis = this.$el.children('li.active');
            $activeLis.each(function (el) {
              var index = $collapsibleLis.index($(el));
              _this8.close(index);
            });
          }

          // Animate in
          $collapsibleLi[0].classList.add('active');
          this._animateIn(index);
        }
      }

      /**
       * Close Collapsible
       * @param {Number} index - 0th index of slide
       */

    }, {
      key: "close",
      value: function close(index) {
        var $collapsibleLi = this.$el.children('li').eq(index);
        if ($collapsibleLi.length && $collapsibleLi[0].classList.contains('active')) {
          // onCloseStart callback
          if (typeof this.options.onCloseStart === 'function') {
            this.options.onCloseStart.call(this, $collapsibleLi[0]);
          }

          // Animate out
          $collapsibleLi[0].classList.remove('active');
          this._animateOut(index);
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Collapsible.__proto__ || Object.getPrototypeOf(Collapsible), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Collapsible;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Collapsible;
  }(Component);

  M.Collapsible = Collapsible;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Collapsible, 'collapsible', 'M_Collapsible');
  }
})(cash, M.anime);
;(function ($, anim) {
  'use strict';

  var _defaults = {
    alignment: 'left',
    autoFocus: true,
    constrainWidth: true,
    container: null,
    coverTrigger: true,
    closeOnClick: true,
    hover: false,
    inDuration: 150,
    outDuration: 250,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    onItemClick: null
  };

  /**
   * @class
   */

  var Dropdown = function (_Component2) {
    _inherits(Dropdown, _Component2);

    function Dropdown(el, options) {
      _classCallCheck(this, Dropdown);

      var _this9 = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, Dropdown, el, options));

      _this9.el.M_Dropdown = _this9;
      Dropdown._dropdowns.push(_this9);

      _this9.id = M.getIdFromTrigger(el);
      _this9.dropdownEl = document.getElementById(_this9.id);
      _this9.$dropdownEl = $(_this9.dropdownEl);

      /**
       * Options for the dropdown
       * @member Dropdown#options
       * @prop {String} [alignment='left'] - Edge which the dropdown is aligned to
       * @prop {Boolean} [autoFocus=true] - Automatically focus dropdown el for keyboard
       * @prop {Boolean} [constrainWidth=true] - Constrain width to width of the button
       * @prop {Element} container - Container element to attach dropdown to (optional)
       * @prop {Boolean} [coverTrigger=true] - Place dropdown over trigger
       * @prop {Boolean} [closeOnClick=true] - Close on click of dropdown item
       * @prop {Boolean} [hover=false] - Open dropdown on hover
       * @prop {Number} [inDuration=150] - Duration of open animation in ms
       * @prop {Number} [outDuration=250] - Duration of close animation in ms
       * @prop {Function} onOpenStart - Function called when dropdown starts opening
       * @prop {Function} onOpenEnd - Function called when dropdown finishes opening
       * @prop {Function} onCloseStart - Function called when dropdown starts closing
       * @prop {Function} onCloseEnd - Function called when dropdown finishes closing
       */
      _this9.options = $.extend({}, Dropdown.defaults, options);

      /**
       * Describes open/close state of dropdown
       * @type {Boolean}
       */
      _this9.isOpen = false;

      /**
       * Describes if dropdown content is scrollable
       * @type {Boolean}
       */
      _this9.isScrollable = false;

      /**
       * Describes if touch moving on dropdown content
       * @type {Boolean}
       */
      _this9.isTouchMoving = false;

      _this9.focusedIndex = -1;
      _this9.filterQuery = [];

      // Move dropdown-content after dropdown-trigger
      if (!!_this9.options.container) {
        $(_this9.options.container).append(_this9.dropdownEl);
      } else {
        _this9.$el.after(_this9.dropdownEl);
      }

      _this9._makeDropdownFocusable();
      _this9._resetFilterQueryBound = _this9._resetFilterQuery.bind(_this9);
      _this9._handleDocumentClickBound = _this9._handleDocumentClick.bind(_this9);
      _this9._handleDocumentTouchmoveBound = _this9._handleDocumentTouchmove.bind(_this9);
      _this9._handleDropdownClickBound = _this9._handleDropdownClick.bind(_this9);
      _this9._handleDropdownKeydownBound = _this9._handleDropdownKeydown.bind(_this9);
      _this9._handleTriggerKeydownBound = _this9._handleTriggerKeydown.bind(_this9);
      _this9._setupEventHandlers();
      return _this9;
    }

    _createClass(Dropdown, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._resetDropdownStyles();
        this._removeEventHandlers();
        Dropdown._dropdowns.splice(Dropdown._dropdowns.indexOf(this), 1);
        this.el.M_Dropdown = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        // Trigger keydown handler
        this.el.addEventListener('keydown', this._handleTriggerKeydownBound);

        // Item click handler
        this.dropdownEl.addEventListener('click', this._handleDropdownClickBound);

        // Hover event handlers
        if (this.options.hover) {
          this._handleMouseEnterBound = this._handleMouseEnter.bind(this);
          this.el.addEventListener('mouseenter', this._handleMouseEnterBound);
          this._handleMouseLeaveBound = this._handleMouseLeave.bind(this);
          this.el.addEventListener('mouseleave', this._handleMouseLeaveBound);
          this.dropdownEl.addEventListener('mouseleave', this._handleMouseLeaveBound);

          // Click event handlers
        } else {
          this._handleClickBound = this._handleClick.bind(this);
          this.el.addEventListener('click', this._handleClickBound);
        }
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('keydown', this._handleTriggerKeydownBound);
        this.dropdownEl.removeEventListener('click', this._handleDropdownClickBound);

        if (this.options.hover) {
          this.el.removeEventListener('mouseenter', this._handleMouseEnterBound);
          this.el.removeEventListener('mouseleave', this._handleMouseLeaveBound);
          this.dropdownEl.removeEventListener('mouseleave', this._handleMouseLeaveBound);
        } else {
          this.el.removeEventListener('click', this._handleClickBound);
        }
      }
    }, {
      key: "_setupTemporaryEventHandlers",
      value: function _setupTemporaryEventHandlers() {
        // Use capture phase event handler to prevent click
        document.body.addEventListener('click', this._handleDocumentClickBound, true);
        document.body.addEventListener('touchend', this._handleDocumentClickBound);
        document.body.addEventListener('touchmove', this._handleDocumentTouchmoveBound);
        this.dropdownEl.addEventListener('keydown', this._handleDropdownKeydownBound);
      }
    }, {
      key: "_removeTemporaryEventHandlers",
      value: function _removeTemporaryEventHandlers() {
        // Use capture phase event handler to prevent click
        document.body.removeEventListener('click', this._handleDocumentClickBound, true);
        document.body.removeEventListener('touchend', this._handleDocumentClickBound);
        document.body.removeEventListener('touchmove', this._handleDocumentTouchmoveBound);
        this.dropdownEl.removeEventListener('keydown', this._handleDropdownKeydownBound);
      }
    }, {
      key: "_handleClick",
      value: function _handleClick(e) {
        e.preventDefault();
        this.open();
      }
    }, {
      key: "_handleMouseEnter",
      value: function _handleMouseEnter() {
        this.open();
      }
    }, {
      key: "_handleMouseLeave",
      value: function _handleMouseLeave(e) {
        var toEl = e.toElement || e.relatedTarget;
        var leaveToDropdownContent = !!$(toEl).closest('.dropdown-content').length;
        var leaveToActiveDropdownTrigger = false;

        var $closestTrigger = $(toEl).closest('.dropdown-trigger');
        if ($closestTrigger.length && !!$closestTrigger[0].M_Dropdown && $closestTrigger[0].M_Dropdown.isOpen) {
          leaveToActiveDropdownTrigger = true;
        }

        // Close hover dropdown if mouse did not leave to either active dropdown-trigger or dropdown-content
        if (!leaveToActiveDropdownTrigger && !leaveToDropdownContent) {
          this.close();
        }
      }
    }, {
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(e) {
        var _this10 = this;

        var $target = $(e.target);
        if (this.options.closeOnClick && $target.closest('.dropdown-content').length && !this.isTouchMoving) {
          // isTouchMoving to check if scrolling on mobile.
          setTimeout(function () {
            _this10.close();
          }, 0);
        } else if ($target.closest('.dropdown-trigger').length || !$target.closest('.dropdown-content').length) {
          setTimeout(function () {
            _this10.close();
          }, 0);
        }
        this.isTouchMoving = false;
      }
    }, {
      key: "_handleTriggerKeydown",
      value: function _handleTriggerKeydown(e) {
        // ARROW DOWN OR ENTER WHEN SELECT IS CLOSED - open Dropdown
        if ((e.which === M.keys.ARROW_DOWN || e.which === M.keys.ENTER) && !this.isOpen) {
          e.preventDefault();
          this.open();
        }
      }

      /**
       * Handle Document Touchmove
       * @param {Event} e
       */

    }, {
      key: "_handleDocumentTouchmove",
      value: function _handleDocumentTouchmove(e) {
        var $target = $(e.target);
        if ($target.closest('.dropdown-content').length) {
          this.isTouchMoving = true;
        }
      }

      /**
       * Handle Dropdown Click
       * @param {Event} e
       */

    }, {
      key: "_handleDropdownClick",
      value: function _handleDropdownClick(e) {
        // onItemClick callback
        if (typeof this.options.onItemClick === 'function') {
          var itemEl = $(e.target).closest('li')[0];
          this.options.onItemClick.call(this, itemEl);
        }
      }

      /**
       * Handle Dropdown Keydown
       * @param {Event} e
       */

    }, {
      key: "_handleDropdownKeydown",
      value: function _handleDropdownKeydown(e) {
        if (e.which === M.keys.TAB) {
          e.preventDefault();
          this.close();

          // Navigate down dropdown list
        } else if ((e.which === M.keys.ARROW_DOWN || e.which === M.keys.ARROW_UP) && this.isOpen) {
          e.preventDefault();
          var direction = e.which === M.keys.ARROW_DOWN ? 1 : -1;
          var newFocusedIndex = this.focusedIndex;
          var foundNewIndex = false;
          do {
            newFocusedIndex = newFocusedIndex + direction;

            if (!!this.dropdownEl.children[newFocusedIndex] && this.dropdownEl.children[newFocusedIndex].tabIndex !== -1) {
              foundNewIndex = true;
              break;
            }
          } while (newFocusedIndex < this.dropdownEl.children.length && newFocusedIndex >= 0);

          if (foundNewIndex) {
            this.focusedIndex = newFocusedIndex;
            this._focusFocusedItem();
          }

          // ENTER selects choice on focused item
        } else if (e.which === M.keys.ENTER && this.isOpen) {
          // Search for <a> and <button>
          var focusedElement = this.dropdownEl.children[this.focusedIndex];
          var $activatableElement = $(focusedElement).find('a, button').first();

          // Click a or button tag if exists, otherwise click li tag
          if (!!$activatableElement.length) {
            $activatableElement[0].click();
          } else if (!!focusedElement) {
            focusedElement.click();
          }

          // Close dropdown on ESC
        } else if (e.which === M.keys.ESC && this.isOpen) {
          e.preventDefault();
          this.close();
        }

        // CASE WHEN USER TYPE LETTERS
        var letter = String.fromCharCode(e.which).toLowerCase(),
            nonLetters = [9, 13, 27, 38, 40];
        if (letter && nonLetters.indexOf(e.which) === -1) {
          this.filterQuery.push(letter);

          var string = this.filterQuery.join(''),
              newOptionEl = $(this.dropdownEl).find('li').filter(function (el) {
            return $(el).text().toLowerCase().indexOf(string) === 0;
          })[0];

          if (newOptionEl) {
            this.focusedIndex = $(newOptionEl).index();
            this._focusFocusedItem();
          }
        }

        this.filterTimeout = setTimeout(this._resetFilterQueryBound, 1000);
      }

      /**
       * Setup dropdown
       */

    }, {
      key: "_resetFilterQuery",
      value: function _resetFilterQuery() {
        this.filterQuery = [];
      }
    }, {
      key: "_resetDropdownStyles",
      value: function _resetDropdownStyles() {
        this.$dropdownEl.css({
          display: '',
          width: '',
          height: '',
          left: '',
          top: '',
          'transform-origin': '',
          transform: '',
          opacity: ''
        });
      }
    }, {
      key: "_makeDropdownFocusable",
      value: function _makeDropdownFocusable() {
        // Needed for arrow key navigation
        this.dropdownEl.tabIndex = 0;

        // Only set tabindex if it hasn't been set by user
        $(this.dropdownEl).children().each(function (el) {
          if (!el.getAttribute('tabindex')) {
            el.setAttribute('tabindex', 0);
          }
        });
      }
    }, {
      key: "_focusFocusedItem",
      value: function _focusFocusedItem() {
        if (this.focusedIndex >= 0 && this.focusedIndex < this.dropdownEl.children.length && this.options.autoFocus) {
          this.dropdownEl.children[this.focusedIndex].focus();
        }
      }
    }, {
      key: "_getDropdownPosition",
      value: function _getDropdownPosition() {
        var offsetParentBRect = this.el.offsetParent.getBoundingClientRect();
        var triggerBRect = this.el.getBoundingClientRect();
        var dropdownBRect = this.dropdownEl.getBoundingClientRect();

        var idealHeight = dropdownBRect.height;
        var idealWidth = dropdownBRect.width;
        var idealXPos = triggerBRect.left - dropdownBRect.left;
        var idealYPos = triggerBRect.top - dropdownBRect.top;

        var dropdownBounds = {
          left: idealXPos,
          top: idealYPos,
          height: idealHeight,
          width: idealWidth
        };

        // Countainer here will be closest ancestor with overflow: hidden
        var closestOverflowParent = !!this.dropdownEl.offsetParent ? this.dropdownEl.offsetParent : this.dropdownEl.parentNode;

        var alignments = M.checkPossibleAlignments(this.el, closestOverflowParent, dropdownBounds, this.options.coverTrigger ? 0 : triggerBRect.height);

        var verticalAlignment = 'top';
        var horizontalAlignment = this.options.alignment;
        idealYPos += this.options.coverTrigger ? 0 : triggerBRect.height;

        // Reset isScrollable
        this.isScrollable = false;

        if (!alignments.top) {
          if (alignments.bottom) {
            verticalAlignment = 'bottom';
          } else {
            this.isScrollable = true;

            // Determine which side has most space and cutoff at correct height
            if (alignments.spaceOnTop > alignments.spaceOnBottom) {
              verticalAlignment = 'bottom';
              idealHeight += alignments.spaceOnTop;
              idealYPos -= alignments.spaceOnTop;
            } else {
              idealHeight += alignments.spaceOnBottom;
            }
          }
        }

        // If preferred horizontal alignment is possible
        if (!alignments[horizontalAlignment]) {
          var oppositeAlignment = horizontalAlignment === 'left' ? 'right' : 'left';
          if (alignments[oppositeAlignment]) {
            horizontalAlignment = oppositeAlignment;
          } else {
            // Determine which side has most space and cutoff at correct height
            if (alignments.spaceOnLeft > alignments.spaceOnRight) {
              horizontalAlignment = 'right';
              idealWidth += alignments.spaceOnLeft;
              idealXPos -= alignments.spaceOnLeft;
            } else {
              horizontalAlignment = 'left';
              idealWidth += alignments.spaceOnRight;
            }
          }
        }

        if (verticalAlignment === 'bottom') {
          idealYPos = idealYPos - dropdownBRect.height + (this.options.coverTrigger ? triggerBRect.height : 0);
        }
        if (horizontalAlignment === 'right') {
          idealXPos = idealXPos - dropdownBRect.width + triggerBRect.width;
        }
        return {
          x: idealXPos,
          y: idealYPos,
          verticalAlignment: verticalAlignment,
          horizontalAlignment: horizontalAlignment,
          height: idealHeight,
          width: idealWidth
        };
      }

      /**
       * Animate in dropdown
       */

    }, {
      key: "_animateIn",
      value: function _animateIn() {
        var _this11 = this;

        anim.remove(this.dropdownEl);
        anim({
          targets: this.dropdownEl,
          opacity: {
            value: [0, 1],
            easing: 'easeOutQuad'
          },
          scaleX: [0.3, 1],
          scaleY: [0.3, 1],
          duration: this.options.inDuration,
          easing: 'easeOutQuint',
          complete: function (anim) {
            if (_this11.options.autoFocus) {
              _this11.dropdownEl.focus();
            }

            // onOpenEnd callback
            if (typeof _this11.options.onOpenEnd === 'function') {
              _this11.options.onOpenEnd.call(_this11, _this11.el);
            }
          }
        });
      }

      /**
       * Animate out dropdown
       */

    }, {
      key: "_animateOut",
      value: function _animateOut() {
        var _this12 = this;

        anim.remove(this.dropdownEl);
        anim({
          targets: this.dropdownEl,
          opacity: {
            value: 0,
            easing: 'easeOutQuint'
          },
          scaleX: 0.3,
          scaleY: 0.3,
          duration: this.options.outDuration,
          easing: 'easeOutQuint',
          complete: function (anim) {
            _this12._resetDropdownStyles();

            // onCloseEnd callback
            if (typeof _this12.options.onCloseEnd === 'function') {
              _this12.options.onCloseEnd.call(_this12, _this12.el);
            }
          }
        });
      }

      /**
       * Place dropdown
       */

    }, {
      key: "_placeDropdown",
      value: function _placeDropdown() {
        // Set width before calculating positionInfo
        var idealWidth = this.options.constrainWidth ? this.el.getBoundingClientRect().width : this.dropdownEl.getBoundingClientRect().width;
        this.dropdownEl.style.width = idealWidth + 'px';

        var positionInfo = this._getDropdownPosition();
        this.dropdownEl.style.left = positionInfo.x + 'px';
        this.dropdownEl.style.top = positionInfo.y + 'px';
        this.dropdownEl.style.height = positionInfo.height + 'px';
        this.dropdownEl.style.width = positionInfo.width + 'px';
        this.dropdownEl.style.transformOrigin = (positionInfo.horizontalAlignment === 'left' ? '0' : '100%') + " " + (positionInfo.verticalAlignment === 'top' ? '0' : '100%');
      }

      /**
       * Open Dropdown
       */

    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }
        this.isOpen = true;

        // onOpenStart callback
        if (typeof this.options.onOpenStart === 'function') {
          this.options.onOpenStart.call(this, this.el);
        }

        // Reset styles
        this._resetDropdownStyles();
        this.dropdownEl.style.display = 'block';

        this._placeDropdown();
        this._animateIn();
        this._setupTemporaryEventHandlers();
      }

      /**
       * Close Dropdown
       */

    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        this.isOpen = false;
        this.focusedIndex = -1;

        // onCloseStart callback
        if (typeof this.options.onCloseStart === 'function') {
          this.options.onCloseStart.call(this, this.el);
        }

        this._animateOut();
        this._removeTemporaryEventHandlers();

        if (this.options.autoFocus) {
          this.el.focus();
        }
      }

      /**
       * Recalculate dimensions
       */

    }, {
      key: "recalculateDimensions",
      value: function recalculateDimensions() {
        if (this.isOpen) {
          this.$dropdownEl.css({
            width: '',
            height: '',
            left: '',
            top: '',
            'transform-origin': ''
          });
          this._placeDropdown();
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Dropdown.__proto__ || Object.getPrototypeOf(Dropdown), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Dropdown;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Dropdown;
  }(Component);

  /**
   * @static
   * @memberof Dropdown
   */


  Dropdown._dropdowns = [];

  M.Dropdown = Dropdown;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Dropdown, 'dropdown', 'M_Dropdown');
  }
})(cash, M.anime);
;(function ($, anim) {
  'use strict';

  var _defaults = {
    opacity: 0.5,
    inDuration: 250,
    outDuration: 250,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    preventScrolling: true,
    dismissible: true,
    startingTop: '4%',
    endingTop: '10%'
  };

  /**
   * @class
   *
   */

  var Modal = function (_Component3) {
    _inherits(Modal, _Component3);

    /**
     * Construct Modal instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Modal(el, options) {
      _classCallCheck(this, Modal);

      var _this13 = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, Modal, el, options));

      _this13.el.M_Modal = _this13;

      /**
       * Options for the modal
       * @member Modal#options
       * @prop {Number} [opacity=0.5] - Opacity of the modal overlay
       * @prop {Number} [inDuration=250] - Length in ms of enter transition
       * @prop {Number} [outDuration=250] - Length in ms of exit transition
       * @prop {Function} onOpenStart - Callback function called before modal is opened
       * @prop {Function} onOpenEnd - Callback function called after modal is opened
       * @prop {Function} onCloseStart - Callback function called before modal is closed
       * @prop {Function} onCloseEnd - Callback function called after modal is closed
       * @prop {Boolean} [dismissible=true] - Allow modal to be dismissed by keyboard or overlay click
       * @prop {String} [startingTop='4%'] - startingTop
       * @prop {String} [endingTop='10%'] - endingTop
       */
      _this13.options = $.extend({}, Modal.defaults, options);

      /**
       * Describes open/close state of modal
       * @type {Boolean}
       */
      _this13.isOpen = false;

      _this13.id = _this13.$el.attr('id');
      _this13._openingTrigger = undefined;
      _this13.$overlay = $('<div class="modal-overlay"></div>');
      _this13.el.tabIndex = 0;
      _this13._nthModalOpened = 0;

      Modal._count++;
      _this13._setupEventHandlers();
      return _this13;
    }

    _createClass(Modal, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        Modal._count--;
        this._removeEventHandlers();
        this.el.removeAttribute('style');
        this.$overlay.remove();
        this.el.M_Modal = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleOverlayClickBound = this._handleOverlayClick.bind(this);
        this._handleModalCloseClickBound = this._handleModalCloseClick.bind(this);

        if (Modal._count === 1) {
          document.body.addEventListener('click', this._handleTriggerClick);
        }
        this.$overlay[0].addEventListener('click', this._handleOverlayClickBound);
        this.el.addEventListener('click', this._handleModalCloseClickBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (Modal._count === 0) {
          document.body.removeEventListener('click', this._handleTriggerClick);
        }
        this.$overlay[0].removeEventListener('click', this._handleOverlayClickBound);
        this.el.removeEventListener('click', this._handleModalCloseClickBound);
      }

      /**
       * Handle Trigger Click
       * @param {Event} e
       */

    }, {
      key: "_handleTriggerClick",
      value: function _handleTriggerClick(e) {
        var $trigger = $(e.target).closest('.modal-trigger');
        if ($trigger.length) {
          var modalId = M.getIdFromTrigger($trigger[0]);
          var modalInstance = document.getElementById(modalId).M_Modal;
          if (modalInstance) {
            modalInstance.open($trigger);
          }
          e.preventDefault();
        }
      }

      /**
       * Handle Overlay Click
       */

    }, {
      key: "_handleOverlayClick",
      value: function _handleOverlayClick() {
        if (this.options.dismissible) {
          this.close();
        }
      }

      /**
       * Handle Modal Close Click
       * @param {Event} e
       */

    }, {
      key: "_handleModalCloseClick",
      value: function _handleModalCloseClick(e) {
        var $closeTrigger = $(e.target).closest('.modal-close');
        if ($closeTrigger.length) {
          this.close();
        }
      }

      /**
       * Handle Keydown
       * @param {Event} e
       */

    }, {
      key: "_handleKeydown",
      value: function _handleKeydown(e) {
        // ESC key
        if (e.keyCode === 27 && this.options.dismissible) {
          this.close();
        }
      }

      /**
       * Handle Focus
       * @param {Event} e
       */

    }, {
      key: "_handleFocus",
      value: function _handleFocus(e) {
        // Only trap focus if this modal is the last model opened (prevents loops in nested modals).
        if (!this.el.contains(e.target) && this._nthModalOpened === Modal._modalsOpen) {
          this.el.focus();
        }
      }

      /**
       * Animate in modal
       */

    }, {
      key: "_animateIn",
      value: function _animateIn() {
        var _this14 = this;

        // Set initial styles
        $.extend(this.el.style, {
          display: 'block',
          opacity: 0
        });
        $.extend(this.$overlay[0].style, {
          display: 'block',
          opacity: 0
        });

        // Animate overlay
        anim({
          targets: this.$overlay[0],
          opacity: this.options.opacity,
          duration: this.options.inDuration,
          easing: 'easeOutQuad'
        });

        // Define modal animation options
        var enterAnimOptions = {
          targets: this.el,
          duration: this.options.inDuration,
          easing: 'easeOutCubic',
          // Handle modal onOpenEnd callback
          complete: function () {
            if (typeof _this14.options.onOpenEnd === 'function') {
              _this14.options.onOpenEnd.call(_this14, _this14.el, _this14._openingTrigger);
            }
          }
        };

        // Bottom sheet animation
        if (this.el.classList.contains('bottom-sheet')) {
          $.extend(enterAnimOptions, {
            bottom: 0,
            opacity: 1
          });
          anim(enterAnimOptions);

          // Normal modal animation
        } else {
          $.extend(enterAnimOptions, {
            top: [this.options.startingTop, this.options.endingTop],
            opacity: 1,
            scaleX: [0.8, 1],
            scaleY: [0.8, 1]
          });
          anim(enterAnimOptions);
        }
      }

      /**
       * Animate out modal
       */

    }, {
      key: "_animateOut",
      value: function _animateOut() {
        var _this15 = this;

        // Animate overlay
        anim({
          targets: this.$overlay[0],
          opacity: 0,
          duration: this.options.outDuration,
          easing: 'easeOutQuart'
        });

        // Define modal animation options
        var exitAnimOptions = {
          targets: this.el,
          duration: this.options.outDuration,
          easing: 'easeOutCubic',
          // Handle modal ready callback
          complete: function () {
            _this15.el.style.display = 'none';
            _this15.$overlay.remove();

            // Call onCloseEnd callback
            if (typeof _this15.options.onCloseEnd === 'function') {
              _this15.options.onCloseEnd.call(_this15, _this15.el);
            }
          }
        };

        // Bottom sheet animation
        if (this.el.classList.contains('bottom-sheet')) {
          $.extend(exitAnimOptions, {
            bottom: '-100%',
            opacity: 0
          });
          anim(exitAnimOptions);

          // Normal modal animation
        } else {
          $.extend(exitAnimOptions, {
            top: [this.options.endingTop, this.options.startingTop],
            opacity: 0,
            scaleX: 0.8,
            scaleY: 0.8
          });
          anim(exitAnimOptions);
        }
      }

      /**
       * Open Modal
       * @param {cash} [$trigger]
       */

    }, {
      key: "open",
      value: function open($trigger) {
        if (this.isOpen) {
          return;
        }

        this.isOpen = true;
        Modal._modalsOpen++;
        this._nthModalOpened = Modal._modalsOpen;

        // Set Z-Index based on number of currently open modals
        this.$overlay[0].style.zIndex = 1000 + Modal._modalsOpen * 2;
        this.el.style.zIndex = 1000 + Modal._modalsOpen * 2 + 1;

        // Set opening trigger, undefined indicates modal was opened by javascript
        this._openingTrigger = !!$trigger ? $trigger[0] : undefined;

        // onOpenStart callback
        if (typeof this.options.onOpenStart === 'function') {
          this.options.onOpenStart.call(this, this.el, this._openingTrigger);
        }

        if (this.options.preventScrolling) {
          document.body.style.overflow = 'hidden';
        }

        this.el.classList.add('open');
        this.el.insertAdjacentElement('afterend', this.$overlay[0]);

        if (this.options.dismissible) {
          this._handleKeydownBound = this._handleKeydown.bind(this);
          this._handleFocusBound = this._handleFocus.bind(this);
          document.addEventListener('keydown', this._handleKeydownBound);
          document.addEventListener('focus', this._handleFocusBound, true);
        }

        anim.remove(this.el);
        anim.remove(this.$overlay[0]);
        this._animateIn();

        // Focus modal
        this.el.focus();

        return this;
      }

      /**
       * Close Modal
       */

    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        this.isOpen = false;
        Modal._modalsOpen--;
        this._nthModalOpened = 0;

        // Call onCloseStart callback
        if (typeof this.options.onCloseStart === 'function') {
          this.options.onCloseStart.call(this, this.el);
        }

        this.el.classList.remove('open');

        // Enable body scrolling only if there are no more modals open.
        if (Modal._modalsOpen === 0) {
          document.body.style.overflow = '';
        }

        if (this.options.dismissible) {
          document.removeEventListener('keydown', this._handleKeydownBound);
          document.removeEventListener('focus', this._handleFocusBound, true);
        }

        anim.remove(this.el);
        anim.remove(this.$overlay[0]);
        this._animateOut();
        return this;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Modal.__proto__ || Object.getPrototypeOf(Modal), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Modal;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Modal;
  }(Component);

  /**
   * @static
   * @memberof Modal
   */


  Modal._modalsOpen = 0;

  /**
   * @static
   * @memberof Modal
   */
  Modal._count = 0;

  M.Modal = Modal;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Modal, 'modal', 'M_Modal');
  }
})(cash, M.anime);
;(function ($, anim) {
  'use strict';

  var _defaults = {
    inDuration: 275,
    outDuration: 200,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null
  };

  /**
   * @class
   *
   */

  var Materialbox = function (_Component4) {
    _inherits(Materialbox, _Component4);

    /**
     * Construct Materialbox instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Materialbox(el, options) {
      _classCallCheck(this, Materialbox);

      var _this16 = _possibleConstructorReturn(this, (Materialbox.__proto__ || Object.getPrototypeOf(Materialbox)).call(this, Materialbox, el, options));

      _this16.el.M_Materialbox = _this16;

      /**
       * Options for the modal
       * @member Materialbox#options
       * @prop {Number} [inDuration=275] - Length in ms of enter transition
       * @prop {Number} [outDuration=200] - Length in ms of exit transition
       * @prop {Function} onOpenStart - Callback function called before materialbox is opened
       * @prop {Function} onOpenEnd - Callback function called after materialbox is opened
       * @prop {Function} onCloseStart - Callback function called before materialbox is closed
       * @prop {Function} onCloseEnd - Callback function called after materialbox is closed
       */
      _this16.options = $.extend({}, Materialbox.defaults, options);

      _this16.overlayActive = false;
      _this16.doneAnimating = true;
      _this16.placeholder = $('<div></div>').addClass('material-placeholder');
      _this16.originalWidth = 0;
      _this16.originalHeight = 0;
      _this16.originInlineStyles = _this16.$el.attr('style');
      _this16.caption = _this16.el.getAttribute('data-caption') || '';

      // Wrap
      _this16.$el.before(_this16.placeholder);
      _this16.placeholder.append(_this16.$el);

      _this16._setupEventHandlers();
      return _this16;
    }

    _createClass(Materialbox, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_Materialbox = undefined;

        // Unwrap image
        $(this.placeholder).after(this.el).remove();

        this.$el.removeAttr('style');
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleMaterialboxClickBound = this._handleMaterialboxClick.bind(this);
        this.el.addEventListener('click', this._handleMaterialboxClickBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('click', this._handleMaterialboxClickBound);
      }

      /**
       * Handle Materialbox Click
       * @param {Event} e
       */

    }, {
      key: "_handleMaterialboxClick",
      value: function _handleMaterialboxClick(e) {
        // If already modal, return to original
        if (this.doneAnimating === false || this.overlayActive && this.doneAnimating) {
          this.close();
        } else {
          this.open();
        }
      }

      /**
       * Handle Window Scroll
       */

    }, {
      key: "_handleWindowScroll",
      value: function _handleWindowScroll() {
        if (this.overlayActive) {
          this.close();
        }
      }

      /**
       * Handle Window Resize
       */

    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        if (this.overlayActive) {
          this.close();
        }
      }

      /**
       * Handle Window Resize
       * @param {Event} e
       */

    }, {
      key: "_handleWindowEscape",
      value: function _handleWindowEscape(e) {
        // ESC key
        if (e.keyCode === 27 && this.doneAnimating && this.overlayActive) {
          this.close();
        }
      }

      /**
       * Find ancestors with overflow: hidden; and make visible
       */

    }, {
      key: "_makeAncestorsOverflowVisible",
      value: function _makeAncestorsOverflowVisible() {
        this.ancestorsChanged = $();
        var ancestor = this.placeholder[0].parentNode;
        while (ancestor !== null && !$(ancestor).is(document)) {
          var curr = $(ancestor);
          if (curr.css('overflow') !== 'visible') {
            curr.css('overflow', 'visible');
            if (this.ancestorsChanged === undefined) {
              this.ancestorsChanged = curr;
            } else {
              this.ancestorsChanged = this.ancestorsChanged.add(curr);
            }
          }
          ancestor = ancestor.parentNode;
        }
      }

      /**
       * Animate image in
       */

    }, {
      key: "_animateImageIn",
      value: function _animateImageIn() {
        var _this17 = this;

        var animOptions = {
          targets: this.el,
          height: [this.originalHeight, this.newHeight],
          width: [this.originalWidth, this.newWidth],
          left: M.getDocumentScrollLeft() + this.windowWidth / 2 - this.placeholder.offset().left - this.newWidth / 2,
          top: M.getDocumentScrollTop() + this.windowHeight / 2 - this.placeholder.offset().top - this.newHeight / 2,
          duration: this.options.inDuration,
          easing: 'easeOutQuad',
          complete: function () {
            _this17.doneAnimating = true;

            // onOpenEnd callback
            if (typeof _this17.options.onOpenEnd === 'function') {
              _this17.options.onOpenEnd.call(_this17, _this17.el);
            }
          }
        };

        // Override max-width or max-height if needed
        this.maxWidth = this.$el.css('max-width');
        this.maxHeight = this.$el.css('max-height');
        if (this.maxWidth !== 'none') {
          animOptions.maxWidth = this.newWidth;
        }
        if (this.maxHeight !== 'none') {
          animOptions.maxHeight = this.newHeight;
        }

        anim(animOptions);
      }

      /**
       * Animate image out
       */

    }, {
      key: "_animateImageOut",
      value: function _animateImageOut() {
        var _this18 = this;

        var animOptions = {
          targets: this.el,
          width: this.originalWidth,
          height: this.originalHeight,
          left: 0,
          top: 0,
          duration: this.options.outDuration,
          easing: 'easeOutQuad',
          complete: function () {
            _this18.placeholder.css({
              height: '',
              width: '',
              position: '',
              top: '',
              left: ''
            });

            // Revert to width or height attribute
            if (_this18.attrWidth) {
              _this18.$el.attr('width', _this18.attrWidth);
            }
            if (_this18.attrHeight) {
              _this18.$el.attr('height', _this18.attrHeight);
            }

            _this18.$el.removeAttr('style');
            _this18.originInlineStyles && _this18.$el.attr('style', _this18.originInlineStyles);

            // Remove class
            _this18.$el.removeClass('active');
            _this18.doneAnimating = true;

            // Remove overflow overrides on ancestors
            if (_this18.ancestorsChanged.length) {
              _this18.ancestorsChanged.css('overflow', '');
            }

            // onCloseEnd callback
            if (typeof _this18.options.onCloseEnd === 'function') {
              _this18.options.onCloseEnd.call(_this18, _this18.el);
            }
          }
        };

        anim(animOptions);
      }

      /**
       * Update open and close vars
       */

    }, {
      key: "_updateVars",
      value: function _updateVars() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.caption = this.el.getAttribute('data-caption') || '';
      }

      /**
       * Open Materialbox
       */

    }, {
      key: "open",
      value: function open() {
        var _this19 = this;

        this._updateVars();
        this.originalWidth = this.el.getBoundingClientRect().width;
        this.originalHeight = this.el.getBoundingClientRect().height;

        // Set states
        this.doneAnimating = false;
        this.$el.addClass('active');
        this.overlayActive = true;

        // onOpenStart callback
        if (typeof this.options.onOpenStart === 'function') {
          this.options.onOpenStart.call(this, this.el);
        }

        // Set positioning for placeholder
        this.placeholder.css({
          width: this.placeholder[0].getBoundingClientRect().width + 'px',
          height: this.placeholder[0].getBoundingClientRect().height + 'px',
          position: 'relative',
          top: 0,
          left: 0
        });

        this._makeAncestorsOverflowVisible();

        // Set css on origin
        this.$el.css({
          position: 'absolute',
          'z-index': 1000,
          'will-change': 'left, top, width, height'
        });

        // Change from width or height attribute to css
        this.attrWidth = this.$el.attr('width');
        this.attrHeight = this.$el.attr('height');
        if (this.attrWidth) {
          this.$el.css('width', this.attrWidth + 'px');
          this.$el.removeAttr('width');
        }
        if (this.attrHeight) {
          this.$el.css('width', this.attrHeight + 'px');
          this.$el.removeAttr('height');
        }

        // Add overlay
        this.$overlay = $('<div id="materialbox-overlay"></div>').css({
          opacity: 0
        }).one('click', function () {
          if (_this19.doneAnimating) {
            _this19.close();
          }
        });

        // Put before in origin image to preserve z-index layering.
        this.$el.before(this.$overlay);

        // Set dimensions if needed
        var overlayOffset = this.$overlay[0].getBoundingClientRect();
        this.$overlay.css({
          width: this.windowWidth + 'px',
          height: this.windowHeight + 'px',
          left: -1 * overlayOffset.left + 'px',
          top: -1 * overlayOffset.top + 'px'
        });

        anim.remove(this.el);
        anim.remove(this.$overlay[0]);

        // Animate Overlay
        anim({
          targets: this.$overlay[0],
          opacity: 1,
          duration: this.options.inDuration,
          easing: 'easeOutQuad'
        });

        // Add and animate caption if it exists
        if (this.caption !== '') {
          if (this.$photocaption) {
            anim.remove(this.$photoCaption[0]);
          }
          this.$photoCaption = $('<div class="materialbox-caption"></div>');
          this.$photoCaption.text(this.caption);
          $('body').append(this.$photoCaption);
          this.$photoCaption.css({ display: 'inline' });

          anim({
            targets: this.$photoCaption[0],
            opacity: 1,
            duration: this.options.inDuration,
            easing: 'easeOutQuad'
          });
        }

        // Resize Image
        var ratio = 0;
        var widthPercent = this.originalWidth / this.windowWidth;
        var heightPercent = this.originalHeight / this.windowHeight;
        this.newWidth = 0;
        this.newHeight = 0;

        if (widthPercent > heightPercent) {
          ratio = this.originalHeight / this.originalWidth;
          this.newWidth = this.windowWidth * 0.9;
          this.newHeight = this.windowWidth * 0.9 * ratio;
        } else {
          ratio = this.originalWidth / this.originalHeight;
          this.newWidth = this.windowHeight * 0.9 * ratio;
          this.newHeight = this.windowHeight * 0.9;
        }

        this._animateImageIn();

        // Handle Exit triggers
        this._handleWindowScrollBound = this._handleWindowScroll.bind(this);
        this._handleWindowResizeBound = this._handleWindowResize.bind(this);
        this._handleWindowEscapeBound = this._handleWindowEscape.bind(this);

        window.addEventListener('scroll', this._handleWindowScrollBound);
        window.addEventListener('resize', this._handleWindowResizeBound);
        window.addEventListener('keyup', this._handleWindowEscapeBound);
      }

      /**
       * Close Materialbox
       */

    }, {
      key: "close",
      value: function close() {
        var _this20 = this;

        this._updateVars();
        this.doneAnimating = false;

        // onCloseStart callback
        if (typeof this.options.onCloseStart === 'function') {
          this.options.onCloseStart.call(this, this.el);
        }

        anim.remove(this.el);
        anim.remove(this.$overlay[0]);

        if (this.caption !== '') {
          anim.remove(this.$photoCaption[0]);
        }

        // disable exit handlers
        window.removeEventListener('scroll', this._handleWindowScrollBound);
        window.removeEventListener('resize', this._handleWindowResizeBound);
        window.removeEventListener('keyup', this._handleWindowEscapeBound);

        anim({
          targets: this.$overlay[0],
          opacity: 0,
          duration: this.options.outDuration,
          easing: 'easeOutQuad',
          complete: function () {
            _this20.overlayActive = false;
            _this20.$overlay.remove();
          }
        });

        this._animateImageOut();

        // Remove Caption + reset css settings on image
        if (this.caption !== '') {
          anim({
            targets: this.$photoCaption[0],
            opacity: 0,
            duration: this.options.outDuration,
            easing: 'easeOutQuad',
            complete: function () {
              _this20.$photoCaption.remove();
            }
          });
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Materialbox.__proto__ || Object.getPrototypeOf(Materialbox), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Materialbox;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Materialbox;
  }(Component);

  M.Materialbox = Materialbox;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Materialbox, 'materialbox', 'M_Materialbox');
  }
})(cash, M.anime);
;(function ($) {
  'use strict';

  var _defaults = {
    responsiveThreshold: 0 // breakpoint for swipeable
  };

  var Parallax = function (_Component5) {
    _inherits(Parallax, _Component5);

    function Parallax(el, options) {
      _classCallCheck(this, Parallax);

      var _this21 = _possibleConstructorReturn(this, (Parallax.__proto__ || Object.getPrototypeOf(Parallax)).call(this, Parallax, el, options));

      _this21.el.M_Parallax = _this21;

      /**
       * Options for the Parallax
       * @member Parallax#options
       * @prop {Number} responsiveThreshold
       */
      _this21.options = $.extend({}, Parallax.defaults, options);
      _this21._enabled = window.innerWidth > _this21.options.responsiveThreshold;

      _this21.$img = _this21.$el.find('img').first();
      _this21.$img.each(function () {
        var el = this;
        if (el.complete) $(el).trigger('load');
      });

      _this21._updateParallax();
      _this21._setupEventHandlers();
      _this21._setupStyles();

      Parallax._parallaxes.push(_this21);
      return _this21;
    }

    _createClass(Parallax, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        Parallax._parallaxes.splice(Parallax._parallaxes.indexOf(this), 1);
        this.$img[0].style.transform = '';
        this._removeEventHandlers();

        this.$el[0].M_Parallax = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleImageLoadBound = this._handleImageLoad.bind(this);
        this.$img[0].addEventListener('load', this._handleImageLoadBound);

        if (Parallax._parallaxes.length === 0) {
          Parallax._handleScrollThrottled = M.throttle(Parallax._handleScroll, 5);
          window.addEventListener('scroll', Parallax._handleScrollThrottled);

          Parallax._handleWindowResizeThrottled = M.throttle(Parallax._handleWindowResize, 5);
          window.addEventListener('resize', Parallax._handleWindowResizeThrottled);
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.$img[0].removeEventListener('load', this._handleImageLoadBound);

        if (Parallax._parallaxes.length === 0) {
          window.removeEventListener('scroll', Parallax._handleScrollThrottled);
          window.removeEventListener('resize', Parallax._handleWindowResizeThrottled);
        }
      }
    }, {
      key: "_setupStyles",
      value: function _setupStyles() {
        this.$img[0].style.opacity = 1;
      }
    }, {
      key: "_handleImageLoad",
      value: function _handleImageLoad() {
        this._updateParallax();
      }
    }, {
      key: "_updateParallax",
      value: function _updateParallax() {
        var containerHeight = this.$el.height() > 0 ? this.el.parentNode.offsetHeight : 500;
        var imgHeight = this.$img[0].offsetHeight;
        var parallaxDist = imgHeight - containerHeight;
        var bottom = this.$el.offset().top + containerHeight;
        var top = this.$el.offset().top;
        var scrollTop = M.getDocumentScrollTop();
        var windowHeight = window.innerHeight;
        var windowBottom = scrollTop + windowHeight;
        var percentScrolled = (windowBottom - top) / (containerHeight + windowHeight);
        var parallax = parallaxDist * percentScrolled;

        if (!this._enabled) {
          this.$img[0].style.transform = '';
        } else if (bottom > scrollTop && top < scrollTop + windowHeight) {
          this.$img[0].style.transform = "translate3D(-50%, " + parallax + "px, 0)";
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Parallax.__proto__ || Object.getPrototypeOf(Parallax), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Parallax;
      }
    }, {
      key: "_handleScroll",
      value: function _handleScroll() {
        for (var i = 0; i < Parallax._parallaxes.length; i++) {
          var parallaxInstance = Parallax._parallaxes[i];
          parallaxInstance._updateParallax.call(parallaxInstance);
        }
      }
    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        for (var i = 0; i < Parallax._parallaxes.length; i++) {
          var parallaxInstance = Parallax._parallaxes[i];
          parallaxInstance._enabled = window.innerWidth > parallaxInstance.options.responsiveThreshold;
        }
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Parallax;
  }(Component);

  /**
   * @static
   * @memberof Parallax
   */


  Parallax._parallaxes = [];

  M.Parallax = Parallax;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Parallax, 'parallax', 'M_Parallax');
  }
})(cash);
;(function ($, anim) {
  'use strict';

  var _defaults = {
    duration: 300,
    onShow: null,
    swipeable: false,
    responsiveThreshold: Infinity // breakpoint for swipeable
  };

  /**
   * @class
   *
   */

  var Tabs = function (_Component6) {
    _inherits(Tabs, _Component6);

    /**
     * Construct Tabs instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Tabs(el, options) {
      _classCallCheck(this, Tabs);

      var _this22 = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, Tabs, el, options));

      _this22.el.M_Tabs = _this22;

      /**
       * Options for the Tabs
       * @member Tabs#options
       * @prop {Number} duration
       * @prop {Function} onShow
       * @prop {Boolean} swipeable
       * @prop {Number} responsiveThreshold
       */
      _this22.options = $.extend({}, Tabs.defaults, options);

      // Setup
      _this22.$tabLinks = _this22.$el.children('li.tab').children('a');
      _this22.index = 0;
      _this22._setupActiveTabLink();

      // Setup tabs content
      if (_this22.options.swipeable) {
        _this22._setupSwipeableTabs();
      } else {
        _this22._setupNormalTabs();
      }

      // Setup tabs indicator after content to ensure accurate widths
      _this22._setTabsAndTabWidth();
      _this22._createIndicator();

      _this22._setupEventHandlers();
      return _this22;
    }

    _createClass(Tabs, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._indicator.parentNode.removeChild(this._indicator);

        if (this.options.swipeable) {
          this._teardownSwipeableTabs();
        } else {
          this._teardownNormalTabs();
        }

        this.$el[0].M_Tabs = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleWindowResizeBound = this._handleWindowResize.bind(this);
        window.addEventListener('resize', this._handleWindowResizeBound);

        this._handleTabClickBound = this._handleTabClick.bind(this);
        this.el.addEventListener('click', this._handleTabClickBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        window.removeEventListener('resize', this._handleWindowResizeBound);
        this.el.removeEventListener('click', this._handleTabClickBound);
      }

      /**
       * Handle window Resize
       */

    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        this._setTabsAndTabWidth();

        if (this.tabWidth !== 0 && this.tabsWidth !== 0) {
          this._indicator.style.left = this._calcLeftPos(this.$activeTabLink) + 'px';
          this._indicator.style.right = this._calcRightPos(this.$activeTabLink) + 'px';
        }
      }

      /**
       * Handle tab click
       * @param {Event} e
       */

    }, {
      key: "_handleTabClick",
      value: function _handleTabClick(e) {
        var _this23 = this;

        var tab = $(e.target).closest('li.tab');
        var tabLink = $(e.target).closest('a');

        // Handle click on tab link only
        if (!tabLink.length || !tabLink.parent().hasClass('tab')) {
          return;
        }

        if (tab.hasClass('disabled')) {
          e.preventDefault();
          return;
        }

        // Act as regular link if target attribute is specified.
        if (!!tabLink.attr('target')) {
          return;
        }

        // Make the old tab inactive.
        this.$activeTabLink.removeClass('active');
        var $oldContent = this.$content;

        // Update the variables with the new link and content
        this.$activeTabLink = tabLink;
        this.$content = $(M.escapeHash(tabLink[0].hash));
        this.$tabLinks = this.$el.children('li.tab').children('a');

        // Make the tab active.
        this.$activeTabLink.addClass('active');
        var prevIndex = this.index;
        this.index = Math.max(this.$tabLinks.index(tabLink), 0);

        // Swap content
        if (this.options.swipeable) {
          if (this._tabsCarousel) {
            this._tabsCarousel.set(this.index, function () {
              if (typeof _this23.options.onShow === 'function') {
                _this23.options.onShow.call(_this23, _this23.$content[0]);
              }
            });
          }
        } else {
          if (this.$content.length) {
            this.$content[0].style.display = 'block';
            this.$content.addClass('active');
            if (typeof this.options.onShow === 'function') {
              this.options.onShow.call(this, this.$content[0]);
            }

            if ($oldContent.length && !$oldContent.is(this.$content)) {
              $oldContent[0].style.display = 'none';
              $oldContent.removeClass('active');
            }
          }
        }

        // Update widths after content is swapped (scrollbar bugfix)
        this._setTabsAndTabWidth();

        // Update indicator
        this._animateIndicator(prevIndex);

        // Prevent the anchor's default click action
        e.preventDefault();
      }

      /**
       * Generate elements for tab indicator.
       */

    }, {
      key: "_createIndicator",
      value: function _createIndicator() {
        var _this24 = this;

        var indicator = document.createElement('li');
        indicator.classList.add('indicator');

        this.el.appendChild(indicator);
        this._indicator = indicator;

        setTimeout(function () {
          _this24._indicator.style.left = _this24._calcLeftPos(_this24.$activeTabLink) + 'px';
          _this24._indicator.style.right = _this24._calcRightPos(_this24.$activeTabLink) + 'px';
        }, 0);
      }

      /**
       * Setup first active tab link.
       */

    }, {
      key: "_setupActiveTabLink",
      value: function _setupActiveTabLink() {
        // If the location.hash matches one of the links, use that as the active tab.
        this.$activeTabLink = $(this.$tabLinks.filter('[href="' + location.hash + '"]'));

        // If no match is found, use the first link or any with class 'active' as the initial active tab.
        if (this.$activeTabLink.length === 0) {
          this.$activeTabLink = this.$el.children('li.tab').children('a.active').first();
        }
        if (this.$activeTabLink.length === 0) {
          this.$activeTabLink = this.$el.children('li.tab').children('a').first();
        }

        this.$tabLinks.removeClass('active');
        this.$activeTabLink[0].classList.add('active');

        this.index = Math.max(this.$tabLinks.index(this.$activeTabLink), 0);

        if (this.$activeTabLink.length) {
          this.$content = $(M.escapeHash(this.$activeTabLink[0].hash));
          this.$content.addClass('active');
        }
      }

      /**
       * Setup swipeable tabs
       */

    }, {
      key: "_setupSwipeableTabs",
      value: function _setupSwipeableTabs() {
        var _this25 = this;

        // Change swipeable according to responsive threshold
        if (window.innerWidth > this.options.responsiveThreshold) {
          this.options.swipeable = false;
        }

        var $tabsContent = $();
        this.$tabLinks.each(function (link) {
          var $currContent = $(M.escapeHash(link.hash));
          $currContent.addClass('carousel-item');
          $tabsContent = $tabsContent.add($currContent);
        });

        var $tabsWrapper = $('<div class="tabs-content carousel carousel-slider"></div>');
        $tabsContent.first().before($tabsWrapper);
        $tabsWrapper.append($tabsContent);
        $tabsContent[0].style.display = '';

        // Keep active tab index to set initial carousel slide
        var activeTabIndex = this.$activeTabLink.closest('.tab').index();

        this._tabsCarousel = M.Carousel.init($tabsWrapper[0], {
          fullWidth: true,
          noWrap: true,
          onCycleTo: function (item) {
            var prevIndex = _this25.index;
            _this25.index = $(item).index();
            _this25.$activeTabLink.removeClass('active');
            _this25.$activeTabLink = _this25.$tabLinks.eq(_this25.index);
            _this25.$activeTabLink.addClass('active');
            _this25._animateIndicator(prevIndex);
            if (typeof _this25.options.onShow === 'function') {
              _this25.options.onShow.call(_this25, _this25.$content[0]);
            }
          }
        });

        // Set initial carousel slide to active tab
        this._tabsCarousel.set(activeTabIndex);
      }

      /**
       * Teardown normal tabs.
       */

    }, {
      key: "_teardownSwipeableTabs",
      value: function _teardownSwipeableTabs() {
        var $tabsWrapper = this._tabsCarousel.$el;
        this._tabsCarousel.destroy();

        // Unwrap
        $tabsWrapper.after($tabsWrapper.children());
        $tabsWrapper.remove();
      }

      /**
       * Setup normal tabs.
       */

    }, {
      key: "_setupNormalTabs",
      value: function _setupNormalTabs() {
        // Hide Tabs Content
        this.$tabLinks.not(this.$activeTabLink).each(function (link) {
          if (!!link.hash) {
            var $currContent = $(M.escapeHash(link.hash));
            if ($currContent.length) {
              $currContent[0].style.display = 'none';
            }
          }
        });
      }

      /**
       * Teardown normal tabs.
       */

    }, {
      key: "_teardownNormalTabs",
      value: function _teardownNormalTabs() {
        // show Tabs Content
        this.$tabLinks.each(function (link) {
          if (!!link.hash) {
            var $currContent = $(M.escapeHash(link.hash));
            if ($currContent.length) {
              $currContent[0].style.display = '';
            }
          }
        });
      }

      /**
       * set tabs and tab width
       */

    }, {
      key: "_setTabsAndTabWidth",
      value: function _setTabsAndTabWidth() {
        this.tabsWidth = this.$el.width();
        this.tabWidth = Math.max(this.tabsWidth, this.el.scrollWidth) / this.$tabLinks.length;
      }

      /**
       * Finds right attribute for indicator based on active tab.
       * @param {cash} el
       */

    }, {
      key: "_calcRightPos",
      value: function _calcRightPos(el) {
        return Math.ceil(this.tabsWidth - el.position().left - el[0].getBoundingClientRect().width);
      }

      /**
       * Finds left attribute for indicator based on active tab.
       * @param {cash} el
       */

    }, {
      key: "_calcLeftPos",
      value: function _calcLeftPos(el) {
        return Math.floor(el.position().left);
      }
    }, {
      key: "updateTabIndicator",
      value: function updateTabIndicator() {
        this._setTabsAndTabWidth();
        this._animateIndicator(this.index);
      }

      /**
       * Animates Indicator to active tab.
       * @param {Number} prevIndex
       */

    }, {
      key: "_animateIndicator",
      value: function _animateIndicator(prevIndex) {
        var leftDelay = 0,
            rightDelay = 0;

        if (this.index - prevIndex >= 0) {
          leftDelay = 90;
        } else {
          rightDelay = 90;
        }

        // Animate
        var animOptions = {
          targets: this._indicator,
          left: {
            value: this._calcLeftPos(this.$activeTabLink),
            delay: leftDelay
          },
          right: {
            value: this._calcRightPos(this.$activeTabLink),
            delay: rightDelay
          },
          duration: this.options.duration,
          easing: 'easeOutQuad'
        };
        anim.remove(this._indicator);
        anim(animOptions);
      }

      /**
       * Select tab.
       * @param {String} tabId
       */

    }, {
      key: "select",
      value: function select(tabId) {
        var tab = this.$tabLinks.filter('[href="#' + tabId + '"]');
        if (tab.length) {
          tab.trigger('click');
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Tabs.__proto__ || Object.getPrototypeOf(Tabs), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Tabs;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Tabs;
  }(Component);

  M.Tabs = Tabs;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Tabs, 'tabs', 'M_Tabs');
  }
})(cash, M.anime);
;(function ($, anim) {
  'use strict';

  var _defaults = {
    exitDelay: 200,
    enterDelay: 0,
    html: null,
    margin: 5,
    inDuration: 250,
    outDuration: 200,
    position: 'bottom',
    transitionMovement: 10
  };

  /**
   * @class
   *
   */

  var Tooltip = function (_Component7) {
    _inherits(Tooltip, _Component7);

    /**
     * Construct Tooltip instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Tooltip(el, options) {
      _classCallCheck(this, Tooltip);

      var _this26 = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, Tooltip, el, options));

      _this26.el.M_Tooltip = _this26;
      _this26.options = $.extend({}, Tooltip.defaults, options);

      _this26.isOpen = false;
      _this26.isHovered = false;
      _this26.isFocused = false;
      _this26._appendTooltipEl();
      _this26._setupEventHandlers();
      return _this26;
    }

    _createClass(Tooltip, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        $(this.tooltipEl).remove();
        this._removeEventHandlers();
        this.el.M_Tooltip = undefined;
      }
    }, {
      key: "_appendTooltipEl",
      value: function _appendTooltipEl() {
        var tooltipEl = document.createElement('div');
        tooltipEl.classList.add('material-tooltip');
        this.tooltipEl = tooltipEl;

        var tooltipContentEl = document.createElement('div');
        tooltipContentEl.classList.add('tooltip-content');
        tooltipContentEl.innerHTML = this.options.html;
        tooltipEl.appendChild(tooltipContentEl);
        document.body.appendChild(tooltipEl);
      }
    }, {
      key: "_updateTooltipContent",
      value: function _updateTooltipContent() {
        this.tooltipEl.querySelector('.tooltip-content').innerHTML = this.options.html;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleMouseEnterBound = this._handleMouseEnter.bind(this);
        this._handleMouseLeaveBound = this._handleMouseLeave.bind(this);
        this._handleFocusBound = this._handleFocus.bind(this);
        this._handleBlurBound = this._handleBlur.bind(this);
        this.el.addEventListener('mouseenter', this._handleMouseEnterBound);
        this.el.addEventListener('mouseleave', this._handleMouseLeaveBound);
        this.el.addEventListener('focus', this._handleFocusBound, true);
        this.el.addEventListener('blur', this._handleBlurBound, true);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('mouseenter', this._handleMouseEnterBound);
        this.el.removeEventListener('mouseleave', this._handleMouseLeaveBound);
        this.el.removeEventListener('focus', this._handleFocusBound, true);
        this.el.removeEventListener('blur', this._handleBlurBound, true);
      }
    }, {
      key: "open",
      value: function open(isManual) {
        if (this.isOpen) {
          return;
        }
        isManual = isManual === undefined ? true : undefined; // Default value true
        this.isOpen = true;
        // Update tooltip content with HTML attribute options
        this.options = $.extend({}, this.options, this._getAttributeOptions());
        this._updateTooltipContent();
        this._setEnterDelayTimeout(isManual);
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        this.isHovered = false;
        this.isFocused = false;
        this.isOpen = false;
        this._setExitDelayTimeout();
      }

      /**
       * Create timeout which delays when the tooltip closes
       */

    }, {
      key: "_setExitDelayTimeout",
      value: function _setExitDelayTimeout() {
        var _this27 = this;

        clearTimeout(this._exitDelayTimeout);

        this._exitDelayTimeout = setTimeout(function () {
          if (_this27.isHovered || _this27.isFocused) {
            return;
          }

          _this27._animateOut();
        }, this.options.exitDelay);
      }

      /**
       * Create timeout which delays when the toast closes
       */

    }, {
      key: "_setEnterDelayTimeout",
      value: function _setEnterDelayTimeout(isManual) {
        var _this28 = this;

        clearTimeout(this._enterDelayTimeout);

        this._enterDelayTimeout = setTimeout(function () {
          if (!_this28.isHovered && !_this28.isFocused && !isManual) {
            return;
          }

          _this28._animateIn();
        }, this.options.enterDelay);
      }
    }, {
      key: "_positionTooltip",
      value: function _positionTooltip() {
        var origin = this.el,
            tooltip = this.tooltipEl,
            originHeight = origin.offsetHeight,
            originWidth = origin.offsetWidth,
            tooltipHeight = tooltip.offsetHeight,
            tooltipWidth = tooltip.offsetWidth,
            newCoordinates = void 0,
            margin = this.options.margin,
            targetTop = void 0,
            targetLeft = void 0;

        this.xMovement = 0, this.yMovement = 0;

        targetTop = origin.getBoundingClientRect().top + M.getDocumentScrollTop();
        targetLeft = origin.getBoundingClientRect().left + M.getDocumentScrollLeft();

        if (this.options.position === 'top') {
          targetTop += -tooltipHeight - margin;
          targetLeft += originWidth / 2 - tooltipWidth / 2;
          this.yMovement = -this.options.transitionMovement;
        } else if (this.options.position === 'right') {
          targetTop += originHeight / 2 - tooltipHeight / 2;
          targetLeft += originWidth + margin;
          this.xMovement = this.options.transitionMovement;
        } else if (this.options.position === 'left') {
          targetTop += originHeight / 2 - tooltipHeight / 2;
          targetLeft += -tooltipWidth - margin;
          this.xMovement = -this.options.transitionMovement;
        } else {
          targetTop += originHeight + margin;
          targetLeft += originWidth / 2 - tooltipWidth / 2;
          this.yMovement = this.options.transitionMovement;
        }

        newCoordinates = this._repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
        $(tooltip).css({
          top: newCoordinates.y + 'px',
          left: newCoordinates.x + 'px'
        });
      }
    }, {
      key: "_repositionWithinScreen",
      value: function _repositionWithinScreen(x, y, width, height) {
        var scrollLeft = M.getDocumentScrollLeft();
        var scrollTop = M.getDocumentScrollTop();
        var newX = x - scrollLeft;
        var newY = y - scrollTop;

        var bounding = {
          left: newX,
          top: newY,
          width: width,
          height: height
        };

        var offset = this.options.margin + this.options.transitionMovement;
        var edges = M.checkWithinContainer(document.body, bounding, offset);

        if (edges.left) {
          newX = offset;
        } else if (edges.right) {
          newX -= newX + width - window.innerWidth;
        }

        if (edges.top) {
          newY = offset;
        } else if (edges.bottom) {
          newY -= newY + height - window.innerHeight;
        }

        return {
          x: newX + scrollLeft,
          y: newY + scrollTop
        };
      }
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        this._positionTooltip();
        this.tooltipEl.style.visibility = 'visible';
        anim.remove(this.tooltipEl);
        anim({
          targets: this.tooltipEl,
          opacity: 1,
          translateX: this.xMovement,
          translateY: this.yMovement,
          duration: this.options.inDuration,
          easing: 'easeOutCubic'
        });
      }
    }, {
      key: "_animateOut",
      value: function _animateOut() {
        anim.remove(this.tooltipEl);
        anim({
          targets: this.tooltipEl,
          opacity: 0,
          translateX: 0,
          translateY: 0,
          duration: this.options.outDuration,
          easing: 'easeOutCubic'
        });
      }
    }, {
      key: "_handleMouseEnter",
      value: function _handleMouseEnter() {
        this.isHovered = true;
        this.isFocused = false; // Allows close of tooltip when opened by focus.
        this.open(false);
      }
    }, {
      key: "_handleMouseLeave",
      value: function _handleMouseLeave() {
        this.isHovered = false;
        this.isFocused = false; // Allows close of tooltip when opened by focus.
        this.close();
      }
    }, {
      key: "_handleFocus",
      value: function _handleFocus() {
        if (M.tabPressed) {
          this.isFocused = true;
          this.open(false);
        }
      }
    }, {
      key: "_handleBlur",
      value: function _handleBlur() {
        this.isFocused = false;
        this.close();
      }
    }, {
      key: "_getAttributeOptions",
      value: function _getAttributeOptions() {
        var attributeOptions = {};
        var tooltipTextOption = this.el.getAttribute('data-tooltip');
        var positionOption = this.el.getAttribute('data-position');

        if (tooltipTextOption) {
          attributeOptions.html = tooltipTextOption;
        }

        if (positionOption) {
          attributeOptions.position = positionOption;
        }
        return attributeOptions;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Tooltip.__proto__ || Object.getPrototypeOf(Tooltip), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Tooltip;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Tooltip;
  }(Component);

  M.Tooltip = Tooltip;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Tooltip, 'tooltip', 'M_Tooltip');
  }
})(cash, M.anime);
; /*!
  * Waves v0.6.4
  * http://fian.my.id/Waves
  *
  * Copyright 2014 Alfiana E. Sibuea and other contributors
  * Released under the MIT license
  * https://github.com/fians/Waves/blob/master/LICENSE
  */

;(function (window) {
  'use strict';

  var Waves = Waves || {};
  var $$ = document.querySelectorAll.bind(document);

  // Find exact position of element
  function isWindow(obj) {
    return obj !== null && obj === obj.window;
  }

  function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }

  function offset(elem) {
    var docElem,
        win,
        box = { top: 0, left: 0 },
        doc = elem && elem.ownerDocument;

    docElem = doc.documentElement;

    if (typeof elem.getBoundingClientRect !== typeof undefined) {
      box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  }

  function convertStyle(obj) {
    var style = '';

    for (var a in obj) {
      if (obj.hasOwnProperty(a)) {
        style += a + ':' + obj[a] + ';';
      }
    }

    return style;
  }

  var Effect = {

    // Effect delay
    duration: 750,

    show: function (e, element) {

      // Disable right click
      if (e.button === 2) {
        return false;
      }

      var el = element || this;

      // Create ripple
      var ripple = document.createElement('div');
      ripple.className = 'waves-ripple';
      el.appendChild(ripple);

      // Get click coordinate and element witdh
      var pos = offset(el);
      var relativeY = e.pageY - pos.top;
      var relativeX = e.pageX - pos.left;
      var scale = 'scale(' + el.clientWidth / 100 * 10 + ')';

      // Support for touch devices
      if ('touches' in e) {
        relativeY = e.touches[0].pageY - pos.top;
        relativeX = e.touches[0].pageX - pos.left;
      }

      // Attach data to element
      ripple.setAttribute('data-hold', Date.now());
      ripple.setAttribute('data-scale', scale);
      ripple.setAttribute('data-x', relativeX);
      ripple.setAttribute('data-y', relativeY);

      // Set ripple position
      var rippleStyle = {
        'top': relativeY + 'px',
        'left': relativeX + 'px'
      };

      ripple.className = ripple.className + ' waves-notransition';
      ripple.setAttribute('style', convertStyle(rippleStyle));
      ripple.className = ripple.className.replace('waves-notransition', '');

      // Scale the ripple
      rippleStyle['-webkit-transform'] = scale;
      rippleStyle['-moz-transform'] = scale;
      rippleStyle['-ms-transform'] = scale;
      rippleStyle['-o-transform'] = scale;
      rippleStyle.transform = scale;
      rippleStyle.opacity = '1';

      rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['-moz-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['-o-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['transition-duration'] = Effect.duration + 'ms';

      rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['-moz-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['-o-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

      ripple.setAttribute('style', convertStyle(rippleStyle));
    },

    hide: function (e) {
      TouchHandler.touchup(e);

      var el = this;
      var width = el.clientWidth * 1.4;

      // Get first ripple
      var ripple = null;
      var ripples = el.getElementsByClassName('waves-ripple');
      if (ripples.length > 0) {
        ripple = ripples[ripples.length - 1];
      } else {
        return false;
      }

      var relativeX = ripple.getAttribute('data-x');
      var relativeY = ripple.getAttribute('data-y');
      var scale = ripple.getAttribute('data-scale');

      // Get delay beetween mousedown and mouse leave
      var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
      var delay = 350 - diff;

      if (delay < 0) {
        delay = 0;
      }

      // Fade out ripple after delay
      setTimeout(function () {
        var style = {
          'top': relativeY + 'px',
          'left': relativeX + 'px',
          'opacity': '0',

          // Duration
          '-webkit-transition-duration': Effect.duration + 'ms',
          '-moz-transition-duration': Effect.duration + 'ms',
          '-o-transition-duration': Effect.duration + 'ms',
          'transition-duration': Effect.duration + 'ms',
          '-webkit-transform': scale,
          '-moz-transform': scale,
          '-ms-transform': scale,
          '-o-transform': scale,
          'transform': scale
        };

        ripple.setAttribute('style', convertStyle(style));

        setTimeout(function () {
          try {
            el.removeChild(ripple);
          } catch (e) {
            return false;
          }
        }, Effect.duration);
      }, delay);
    },

    // Little hack to make <input> can perform waves effect
    wrapInput: function (elements) {
      for (var a = 0; a < elements.length; a++) {
        var el = elements[a];

        if (el.tagName.toLowerCase() === 'input') {
          var parent = el.parentNode;

          // If input already have parent just pass through
          if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
            continue;
          }

          // Put element class and style to the specified parent
          var wrapper = document.createElement('i');
          wrapper.className = el.className + ' waves-input-wrapper';

          var elementStyle = el.getAttribute('style');

          if (!elementStyle) {
            elementStyle = '';
          }

          wrapper.setAttribute('style', elementStyle);

          el.className = 'waves-button-input';
          el.removeAttribute('style');

          // Put element as child
          parent.replaceChild(wrapper, el);
          wrapper.appendChild(el);
        }
      }
    }
  };

  /**
   * Disable mousedown event for 500ms during and after touch
   */
  var TouchHandler = {
    /* uses an integer rather than bool so there's no issues with
     * needing to clear timeouts if another touch event occurred
     * within the 500ms. Cannot mouseup between touchstart and
     * touchend, nor in the 500ms after touchend. */
    touches: 0,
    allowEvent: function (e) {
      var allow = true;

      if (e.type === 'touchstart') {
        TouchHandler.touches += 1; //push
      } else if (e.type === 'touchend' || e.type === 'touchcancel') {
        setTimeout(function () {
          if (TouchHandler.touches > 0) {
            TouchHandler.touches -= 1; //pop after 500ms
          }
        }, 500);
      } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
        allow = false;
      }

      return allow;
    },
    touchup: function (e) {
      TouchHandler.allowEvent(e);
    }
  };

  /**
   * Delegated click handler for .waves-effect element.
   * returns null when .waves-effect element not in "click tree"
   */
  function getWavesEffectElement(e) {
    if (TouchHandler.allowEvent(e) === false) {
      return null;
    }

    var element = null;
    var target = e.target || e.srcElement;

    while (target.parentNode !== null) {
      if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
        element = target;
        break;
      }
      target = target.parentNode;
    }
    return element;
  }

  /**
   * Bubble the click and show effect if .waves-effect elem was found
   */
  function showEffect(e) {
    var element = getWavesEffectElement(e);

    if (element !== null) {
      Effect.show(e, element);

      if ('ontouchstart' in window) {
        element.addEventListener('touchend', Effect.hide, false);
        element.addEventListener('touchcancel', Effect.hide, false);
      }

      element.addEventListener('mouseup', Effect.hide, false);
      element.addEventListener('mouseleave', Effect.hide, false);
      element.addEventListener('dragend', Effect.hide, false);
    }
  }

  Waves.displayEffect = function (options) {
    options = options || {};

    if ('duration' in options) {
      Effect.duration = options.duration;
    }

    //Wrap input inside <i> tag
    Effect.wrapInput($$('.waves-effect'));

    if ('ontouchstart' in window) {
      document.body.addEventListener('touchstart', showEffect, false);
    }

    document.body.addEventListener('mousedown', showEffect, false);
  };

  /**
   * Attach Waves to an input element (or any element which doesn't
   * bubble mouseup/mousedown events).
   *   Intended to be used with dynamically loaded forms/inputs, or
   * where the user doesn't want a delegated click handler.
   */
  Waves.attach = function (element) {
    //FUTURE: automatically add waves classes and allow users
    // to specify them with an options param? Eg. light/classic/button
    if (element.tagName.toLowerCase() === 'input') {
      Effect.wrapInput([element]);
      element = element.parentNode;
    }

    if ('ontouchstart' in window) {
      element.addEventListener('touchstart', showEffect, false);
    }

    element.addEventListener('mousedown', showEffect, false);
  };

  window.Waves = Waves;

  document.addEventListener('DOMContentLoaded', function () {
    Waves.displayEffect();
  }, false);
})(window);
;(function ($, anim) {
  'use strict';

  var _defaults = {
    html: '',
    displayLength: 4000,
    inDuration: 300,
    outDuration: 375,
    classes: '',
    completeCallback: null,
    activationPercent: 0.8
  };

  var Toast = function () {
    function Toast(options) {
      _classCallCheck(this, Toast);

      /**
       * Options for the toast
       * @member Toast#options
       */
      this.options = $.extend({}, Toast.defaults, options);
      this.message = this.options.html;

      /**
       * Describes current pan state toast
       * @type {Boolean}
       */
      this.panning = false;

      /**
       * Time remaining until toast is removed
       */
      this.timeRemaining = this.options.displayLength;

      if (Toast._toasts.length === 0) {
        Toast._createContainer();
      }

      // Create new toast
      Toast._toasts.push(this);
      var toastElement = this._createToast();
      toastElement.M_Toast = this;
      this.el = toastElement;
      this.$el = $(toastElement);
      this._animateIn();
      this._setTimer();
    }

    _createClass(Toast, [{
      key: "_createToast",


      /**
       * Create toast and append it to toast container
       */
      value: function _createToast() {
        var toast = document.createElement('div');
        toast.classList.add('toast');

        // Add custom classes onto toast
        if (!!this.options.classes.length) {
          $(toast).addClass(this.options.classes);
        }

        // Set content
        if (typeof HTMLElement === 'object' ? this.message instanceof HTMLElement : this.message && typeof this.message === 'object' && this.message !== null && this.message.nodeType === 1 && typeof this.message.nodeName === 'string') {
          toast.appendChild(this.message);

          // Check if it is jQuery object
        } else if (!!this.message.jquery) {
          $(toast).append(this.message[0]);

          // Insert as html;
        } else {
          toast.innerHTML = this.message;
        }

        // Append toasft
        Toast._container.appendChild(toast);
        return toast;
      }

      /**
       * Animate in toast
       */

    }, {
      key: "_animateIn",
      value: function _animateIn() {
        // Animate toast in
        anim({
          targets: this.el,
          top: 0,
          opacity: 1,
          duration: this.options.inDuration,
          easing: 'easeOutCubic'
        });
      }

      /**
       * Create setInterval which automatically removes toast when timeRemaining >= 0
       * has been reached
       */

    }, {
      key: "_setTimer",
      value: function _setTimer() {
        var _this29 = this;

        if (this.timeRemaining !== Infinity) {
          this.counterInterval = setInterval(function () {
            // If toast is not being dragged, decrease its time remaining
            if (!_this29.panning) {
              _this29.timeRemaining -= 20;
            }

            // Animate toast out
            if (_this29.timeRemaining <= 0) {
              _this29.dismiss();
            }
          }, 20);
        }
      }

      /**
       * Dismiss toast with animation
       */

    }, {
      key: "dismiss",
      value: function dismiss() {
        var _this30 = this;

        window.clearInterval(this.counterInterval);
        var activationDistance = this.el.offsetWidth * this.options.activationPercent;

        if (this.wasSwiped) {
          this.el.style.transition = 'transform .05s, opacity .05s';
          this.el.style.transform = "translateX(" + activationDistance + "px)";
          this.el.style.opacity = 0;
        }

        anim({
          targets: this.el,
          opacity: 0,
          marginTop: -40,
          duration: this.options.outDuration,
          easing: 'easeOutExpo',
          complete: function () {
            // Call the optional callback
            if (typeof _this30.options.completeCallback === 'function') {
              _this30.options.completeCallback();
            }
            // Remove toast from DOM
            _this30.$el.remove();
            Toast._toasts.splice(Toast._toasts.indexOf(_this30), 1);
            if (Toast._toasts.length === 0) {
              Toast._removeContainer();
            }
          }
        });
      }
    }], [{
      key: "getInstance",


      /**
       * Get Instance
       */
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Toast;
      }

      /**
       * Append toast container and add event handlers
       */

    }, {
      key: "_createContainer",
      value: function _createContainer() {
        var container = document.createElement('div');
        container.setAttribute('id', 'toast-container');

        // Add event handler
        container.addEventListener('touchstart', Toast._onDragStart);
        container.addEventListener('touchmove', Toast._onDragMove);
        container.addEventListener('touchend', Toast._onDragEnd);

        container.addEventListener('mousedown', Toast._onDragStart);
        document.addEventListener('mousemove', Toast._onDragMove);
        document.addEventListener('mouseup', Toast._onDragEnd);

        document.body.appendChild(container);
        Toast._container = container;
      }

      /**
       * Remove toast container and event handlers
       */

    }, {
      key: "_removeContainer",
      value: function _removeContainer() {
        // Add event handler
        document.removeEventListener('mousemove', Toast._onDragMove);
        document.removeEventListener('mouseup', Toast._onDragEnd);

        $(Toast._container).remove();
        Toast._container = null;
      }

      /**
       * Begin drag handler
       * @param {Event} e
       */

    }, {
      key: "_onDragStart",
      value: function _onDragStart(e) {
        if (e.target && $(e.target).closest('.toast').length) {
          var $toast = $(e.target).closest('.toast');
          var toast = $toast[0].M_Toast;
          toast.panning = true;
          Toast._draggedToast = toast;
          toast.el.classList.add('panning');
          toast.el.style.transition = '';
          toast.startingXPos = Toast._xPos(e);
          toast.time = Date.now();
          toast.xPos = Toast._xPos(e);
        }
      }

      /**
       * Drag move handler
       * @param {Event} e
       */

    }, {
      key: "_onDragMove",
      value: function _onDragMove(e) {
        if (!!Toast._draggedToast) {
          e.preventDefault();
          var toast = Toast._draggedToast;
          toast.deltaX = Math.abs(toast.xPos - Toast._xPos(e));
          toast.xPos = Toast._xPos(e);
          toast.velocityX = toast.deltaX / (Date.now() - toast.time);
          toast.time = Date.now();

          var totalDeltaX = toast.xPos - toast.startingXPos;
          var activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
          toast.el.style.transform = "translateX(" + totalDeltaX + "px)";
          toast.el.style.opacity = 1 - Math.abs(totalDeltaX / activationDistance);
        }
      }

      /**
       * End drag handler
       */

    }, {
      key: "_onDragEnd",
      value: function _onDragEnd() {
        if (!!Toast._draggedToast) {
          var toast = Toast._draggedToast;
          toast.panning = false;
          toast.el.classList.remove('panning');

          var totalDeltaX = toast.xPos - toast.startingXPos;
          var activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
          var shouldBeDismissed = Math.abs(totalDeltaX) > activationDistance || toast.velocityX > 1;

          // Remove toast
          if (shouldBeDismissed) {
            toast.wasSwiped = true;
            toast.dismiss();

            // Animate toast back to original position
          } else {
            toast.el.style.transition = 'transform .2s, opacity .2s';
            toast.el.style.transform = '';
            toast.el.style.opacity = '';
          }
          Toast._draggedToast = null;
        }
      }

      /**
       * Get x position of mouse or touch event
       * @param {Event} e
       */

    }, {
      key: "_xPos",
      value: function _xPos(e) {
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return e.targetTouches[0].clientX;
        }
        // mouse event
        return e.clientX;
      }

      /**
       * Remove all toasts
       */

    }, {
      key: "dismissAll",
      value: function dismissAll() {
        for (var toastIndex in Toast._toasts) {
          Toast._toasts[toastIndex].dismiss();
        }
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Toast;
  }();

  /**
   * @static
   * @memberof Toast
   * @type {Array.<Toast>}
   */


  Toast._toasts = [];

  /**
   * @static
   * @memberof Toast
   */
  Toast._container = null;

  /**
   * @static
   * @memberof Toast
   * @type {Toast}
   */
  Toast._draggedToast = null;

  M.Toast = Toast;
  M.toast = function (options) {
    return new Toast(options);
  };
})(cash, M.anime);
;(function ($, anim) {
  'use strict';

  var _defaults = {
    edge: 'left',
    draggable: true,
    inDuration: 250,
    outDuration: 200,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    preventScrolling: true
  };

  /**
   * @class
   */

  var Sidenav = function (_Component8) {
    _inherits(Sidenav, _Component8);

    /**
     * Construct Sidenav instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Sidenav(el, options) {
      _classCallCheck(this, Sidenav);

      var _this31 = _possibleConstructorReturn(this, (Sidenav.__proto__ || Object.getPrototypeOf(Sidenav)).call(this, Sidenav, el, options));

      _this31.el.M_Sidenav = _this31;
      _this31.id = _this31.$el.attr('id');

      /**
       * Options for the Sidenav
       * @member Sidenav#options
       * @prop {String} [edge='left'] - Side of screen on which Sidenav appears
       * @prop {Boolean} [draggable=true] - Allow swipe gestures to open/close Sidenav
       * @prop {Number} [inDuration=250] - Length in ms of enter transition
       * @prop {Number} [outDuration=200] - Length in ms of exit transition
       * @prop {Function} onOpenStart - Function called when sidenav starts entering
       * @prop {Function} onOpenEnd - Function called when sidenav finishes entering
       * @prop {Function} onCloseStart - Function called when sidenav starts exiting
       * @prop {Function} onCloseEnd - Function called when sidenav finishes exiting
       */
      _this31.options = $.extend({}, Sidenav.defaults, options);

      /**
       * Describes open/close state of Sidenav
       * @type {Boolean}
       */
      _this31.isOpen = false;

      /**
       * Describes if Sidenav is fixed
       * @type {Boolean}
       */
      _this31.isFixed = _this31.el.classList.contains('sidenav-fixed');

      /**
       * Describes if Sidenav is being draggeed
       * @type {Boolean}
       */
      _this31.isDragged = false;

      // Window size variables for window resize checks
      _this31.lastWindowWidth = window.innerWidth;
      _this31.lastWindowHeight = window.innerHeight;

      _this31._createOverlay();
      _this31._createDragTarget();
      _this31._setupEventHandlers();
      _this31._setupClasses();
      _this31._setupFixed();

      Sidenav._sidenavs.push(_this31);
      return _this31;
    }

    _createClass(Sidenav, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._enableBodyScrolling();
        this._overlay.parentNode.removeChild(this._overlay);
        this.dragTarget.parentNode.removeChild(this.dragTarget);
        this.el.M_Sidenav = undefined;
        this.el.style.transform = '';

        var index = Sidenav._sidenavs.indexOf(this);
        if (index >= 0) {
          Sidenav._sidenavs.splice(index, 1);
        }
      }
    }, {
      key: "_createOverlay",
      value: function _createOverlay() {
        var overlay = document.createElement('div');
        this._closeBound = this.close.bind(this);
        overlay.classList.add('sidenav-overlay');

        overlay.addEventListener('click', this._closeBound);

        document.body.appendChild(overlay);
        this._overlay = overlay;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        if (Sidenav._sidenavs.length === 0) {
          document.body.addEventListener('click', this._handleTriggerClick);
        }

        this._handleDragTargetDragBound = this._handleDragTargetDrag.bind(this);
        this._handleDragTargetReleaseBound = this._handleDragTargetRelease.bind(this);
        this._handleCloseDragBound = this._handleCloseDrag.bind(this);
        this._handleCloseReleaseBound = this._handleCloseRelease.bind(this);
        this._handleCloseTriggerClickBound = this._handleCloseTriggerClick.bind(this);

        this.dragTarget.addEventListener('touchmove', this._handleDragTargetDragBound);
        this.dragTarget.addEventListener('touchend', this._handleDragTargetReleaseBound);
        this._overlay.addEventListener('touchmove', this._handleCloseDragBound);
        this._overlay.addEventListener('touchend', this._handleCloseReleaseBound);
        this.el.addEventListener('touchmove', this._handleCloseDragBound);
        this.el.addEventListener('touchend', this._handleCloseReleaseBound);
        this.el.addEventListener('click', this._handleCloseTriggerClickBound);

        // Add resize for side nav fixed
        if (this.isFixed) {
          this._handleWindowResizeBound = this._handleWindowResize.bind(this);
          window.addEventListener('resize', this._handleWindowResizeBound);
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (Sidenav._sidenavs.length === 1) {
          document.body.removeEventListener('click', this._handleTriggerClick);
        }

        this.dragTarget.removeEventListener('touchmove', this._handleDragTargetDragBound);
        this.dragTarget.removeEventListener('touchend', this._handleDragTargetReleaseBound);
        this._overlay.removeEventListener('touchmove', this._handleCloseDragBound);
        this._overlay.removeEventListener('touchend', this._handleCloseReleaseBound);
        this.el.removeEventListener('touchmove', this._handleCloseDragBound);
        this.el.removeEventListener('touchend', this._handleCloseReleaseBound);
        this.el.removeEventListener('click', this._handleCloseTriggerClickBound);

        // Remove resize for side nav fixed
        if (this.isFixed) {
          window.removeEventListener('resize', this._handleWindowResizeBound);
        }
      }

      /**
       * Handle Trigger Click
       * @param {Event} e
       */

    }, {
      key: "_handleTriggerClick",
      value: function _handleTriggerClick(e) {
        var $trigger = $(e.target).closest('.sidenav-trigger');
        if (e.target && $trigger.length) {
          var sidenavId = M.getIdFromTrigger($trigger[0]);

          var sidenavInstance = document.getElementById(sidenavId).M_Sidenav;
          if (sidenavInstance) {
            sidenavInstance.open($trigger);
          }
          e.preventDefault();
        }
      }

      /**
       * Set variables needed at the beggining of drag
       * and stop any current transition.
       * @param {Event} e
       */

    }, {
      key: "_startDrag",
      value: function _startDrag(e) {
        var clientX = e.targetTouches[0].clientX;
        this.isDragged = true;
        this._startingXpos = clientX;
        this._xPos = this._startingXpos;
        this._time = Date.now();
        this._width = this.el.getBoundingClientRect().width;
        this._overlay.style.display = 'block';
        this._initialScrollTop = this.isOpen ? this.el.scrollTop : M.getDocumentScrollTop();
        this._verticallyScrolling = false;
        anim.remove(this.el);
        anim.remove(this._overlay);
      }

      /**
       * Set variables needed at each drag move update tick
       * @param {Event} e
       */

    }, {
      key: "_dragMoveUpdate",
      value: function _dragMoveUpdate(e) {
        var clientX = e.targetTouches[0].clientX;
        var currentScrollTop = this.isOpen ? this.el.scrollTop : M.getDocumentScrollTop();
        this.deltaX = Math.abs(this._xPos - clientX);
        this._xPos = clientX;
        this.velocityX = this.deltaX / (Date.now() - this._time);
        this._time = Date.now();
        if (this._initialScrollTop !== currentScrollTop) {
          this._verticallyScrolling = true;
        }
      }

      /**
       * Handles Dragging of Sidenav
       * @param {Event} e
       */

    }, {
      key: "_handleDragTargetDrag",
      value: function _handleDragTargetDrag(e) {
        // Check if draggable
        if (!this.options.draggable || this._isCurrentlyFixed() || this._verticallyScrolling) {
          return;
        }

        // If not being dragged, set initial drag start variables
        if (!this.isDragged) {
          this._startDrag(e);
        }

        // Run touchmove updates
        this._dragMoveUpdate(e);

        // Calculate raw deltaX
        var totalDeltaX = this._xPos - this._startingXpos;

        // dragDirection is the attempted user drag direction
        var dragDirection = totalDeltaX > 0 ? 'right' : 'left';

        // Don't allow totalDeltaX to exceed Sidenav width or be dragged in the opposite direction
        totalDeltaX = Math.min(this._width, Math.abs(totalDeltaX));
        if (this.options.edge === dragDirection) {
          totalDeltaX = 0;
        }

        /**
         * transformX is the drag displacement
         * transformPrefix is the initial transform placement
         * Invert values if Sidenav is right edge
         */
        var transformX = totalDeltaX;
        var transformPrefix = 'translateX(-100%)';
        if (this.options.edge === 'right') {
          transformPrefix = 'translateX(100%)';
          transformX = -transformX;
        }

        // Calculate open/close percentage of sidenav, with open = 1 and close = 0
        this.percentOpen = Math.min(1, totalDeltaX / this._width);

        // Set transform and opacity styles
        this.el.style.transform = transformPrefix + " translateX(" + transformX + "px)";
        this._overlay.style.opacity = this.percentOpen;
      }

      /**
       * Handle Drag Target Release
       */

    }, {
      key: "_handleDragTargetRelease",
      value: function _handleDragTargetRelease() {
        if (this.isDragged) {
          if (this.percentOpen > 0.2) {
            this.open();
          } else {
            this._animateOut();
          }

          this.isDragged = false;
          this._verticallyScrolling = false;
        }
      }

      /**
       * Handle Close Drag
       * @param {Event} e
       */

    }, {
      key: "_handleCloseDrag",
      value: function _handleCloseDrag(e) {
        if (this.isOpen) {
          // Check if draggable
          if (!this.options.draggable || this._isCurrentlyFixed() || this._verticallyScrolling) {
            return;
          }

          // If not being dragged, set initial drag start variables
          if (!this.isDragged) {
            this._startDrag(e);
          }

          // Run touchmove updates
          this._dragMoveUpdate(e);

          // Calculate raw deltaX
          var totalDeltaX = this._xPos - this._startingXpos;

          // dragDirection is the attempted user drag direction
          var dragDirection = totalDeltaX > 0 ? 'right' : 'left';

          // Don't allow totalDeltaX to exceed Sidenav width or be dragged in the opposite direction
          totalDeltaX = Math.min(this._width, Math.abs(totalDeltaX));
          if (this.options.edge !== dragDirection) {
            totalDeltaX = 0;
          }

          var transformX = -totalDeltaX;
          if (this.options.edge === 'right') {
            transformX = -transformX;
          }

          // Calculate open/close percentage of sidenav, with open = 1 and close = 0
          this.percentOpen = Math.min(1, 1 - totalDeltaX / this._width);

          // Set transform and opacity styles
          this.el.style.transform = "translateX(" + transformX + "px)";
          this._overlay.style.opacity = this.percentOpen;
        }
      }

      /**
       * Handle Close Release
       */

    }, {
      key: "_handleCloseRelease",
      value: function _handleCloseRelease() {
        if (this.isOpen && this.isDragged) {
          if (this.percentOpen > 0.8) {
            this._animateIn();
          } else {
            this.close();
          }

          this.isDragged = false;
          this._verticallyScrolling = false;
        }
      }

      /**
       * Handles closing of Sidenav when element with class .sidenav-close
       */

    }, {
      key: "_handleCloseTriggerClick",
      value: function _handleCloseTriggerClick(e) {
        var $closeTrigger = $(e.target).closest('.sidenav-close');
        if ($closeTrigger.length && !this._isCurrentlyFixed()) {
          this.close();
        }
      }

      /**
       * Handle Window Resize
       */

    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        // Only handle horizontal resizes
        if (this.lastWindowWidth !== window.innerWidth) {
          if (window.innerWidth > 992) {
            this.open();
          } else {
            this.close();
          }
        }

        this.lastWindowWidth = window.innerWidth;
        this.lastWindowHeight = window.innerHeight;
      }
    }, {
      key: "_setupClasses",
      value: function _setupClasses() {
        if (this.options.edge === 'right') {
          this.el.classList.add('right-aligned');
          this.dragTarget.classList.add('right-aligned');
        }
      }
    }, {
      key: "_removeClasses",
      value: function _removeClasses() {
        this.el.classList.remove('right-aligned');
        this.dragTarget.classList.remove('right-aligned');
      }
    }, {
      key: "_setupFixed",
      value: function _setupFixed() {
        if (this._isCurrentlyFixed()) {
          this.open();
        }
      }
    }, {
      key: "_isCurrentlyFixed",
      value: function _isCurrentlyFixed() {
        return this.isFixed && window.innerWidth > 992;
      }
    }, {
      key: "_createDragTarget",
      value: function _createDragTarget() {
        var dragTarget = document.createElement('div');
        dragTarget.classList.add('drag-target');
        document.body.appendChild(dragTarget);
        this.dragTarget = dragTarget;
      }
    }, {
      key: "_preventBodyScrolling",
      value: function _preventBodyScrolling() {
        var body = document.body;
        body.style.overflow = 'hidden';
      }
    }, {
      key: "_enableBodyScrolling",
      value: function _enableBodyScrolling() {
        var body = document.body;
        body.style.overflow = '';
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen === true) {
          return;
        }

        this.isOpen = true;

        // Run onOpenStart callback
        if (typeof this.options.onOpenStart === 'function') {
          this.options.onOpenStart.call(this, this.el);
        }

        // Handle fixed Sidenav
        if (this._isCurrentlyFixed()) {
          anim.remove(this.el);
          anim({
            targets: this.el,
            translateX: 0,
            duration: 0,
            easing: 'easeOutQuad'
          });
          this._enableBodyScrolling();
          this._overlay.style.display = 'none';

          // Handle non-fixed Sidenav
        } else {
          if (this.options.preventScrolling) {
            this._preventBodyScrolling();
          }

          if (!this.isDragged || this.percentOpen != 1) {
            this._animateIn();
          }
        }
      }
    }, {
      key: "close",
      value: function close() {
        if (this.isOpen === false) {
          return;
        }

        this.isOpen = false;

        // Run onCloseStart callback
        if (typeof this.options.onCloseStart === 'function') {
          this.options.onCloseStart.call(this, this.el);
        }

        // Handle fixed Sidenav
        if (this._isCurrentlyFixed()) {
          var transformX = this.options.edge === 'left' ? '-105%' : '105%';
          this.el.style.transform = "translateX(" + transformX + ")";

          // Handle non-fixed Sidenav
        } else {
          this._enableBodyScrolling();

          if (!this.isDragged || this.percentOpen != 0) {
            this._animateOut();
          } else {
            this._overlay.style.display = 'none';
          }
        }
      }
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        this._animateSidenavIn();
        this._animateOverlayIn();
      }
    }, {
      key: "_animateSidenavIn",
      value: function _animateSidenavIn() {
        var _this32 = this;

        var slideOutPercent = this.options.edge === 'left' ? -1 : 1;
        if (this.isDragged) {
          slideOutPercent = this.options.edge === 'left' ? slideOutPercent + this.percentOpen : slideOutPercent - this.percentOpen;
        }

        anim.remove(this.el);
        anim({
          targets: this.el,
          translateX: [slideOutPercent * 100 + "%", 0],
          duration: this.options.inDuration,
          easing: 'easeOutQuad',
          complete: function () {
            // Run onOpenEnd callback
            if (typeof _this32.options.onOpenEnd === 'function') {
              _this32.options.onOpenEnd.call(_this32, _this32.el);
            }
          }
        });
      }
    }, {
      key: "_animateOverlayIn",
      value: function _animateOverlayIn() {
        var start = 0;
        if (this.isDragged) {
          start = this.percentOpen;
        } else {
          $(this._overlay).css({
            display: 'block'
          });
        }

        anim.remove(this._overlay);
        anim({
          targets: this._overlay,
          opacity: [start, 1],
          duration: this.options.inDuration,
          easing: 'easeOutQuad'
        });
      }
    }, {
      key: "_animateOut",
      value: function _animateOut() {
        this._animateSidenavOut();
        this._animateOverlayOut();
      }
    }, {
      key: "_animateSidenavOut",
      value: function _animateSidenavOut() {
        var _this33 = this;

        var endPercent = this.options.edge === 'left' ? -1 : 1;
        var slideOutPercent = 0;
        if (this.isDragged) {
          slideOutPercent = this.options.edge === 'left' ? endPercent + this.percentOpen : endPercent - this.percentOpen;
        }

        anim.remove(this.el);
        anim({
          targets: this.el,
          translateX: [slideOutPercent * 100 + "%", endPercent * 105 + "%"],
          duration: this.options.outDuration,
          easing: 'easeOutQuad',
          complete: function () {
            // Run onOpenEnd callback
            if (typeof _this33.options.onCloseEnd === 'function') {
              _this33.options.onCloseEnd.call(_this33, _this33.el);
            }
          }
        });
      }
    }, {
      key: "_animateOverlayOut",
      value: function _animateOverlayOut() {
        var _this34 = this;

        anim.remove(this._overlay);
        anim({
          targets: this._overlay,
          opacity: 0,
          duration: this.options.outDuration,
          easing: 'easeOutQuad',
          complete: function () {
            $(_this34._overlay).css('display', 'none');
          }
        });
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Sidenav.__proto__ || Object.getPrototypeOf(Sidenav), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Sidenav;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Sidenav;
  }(Component);

  /**
   * @static
   * @memberof Sidenav
   * @type {Array.<Sidenav>}
   */


  Sidenav._sidenavs = [];

  M.Sidenav = Sidenav;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Sidenav, 'sidenav', 'M_Sidenav');
  }
})(cash, M.anime);
;(function ($, anim) {
  'use strict';

  var _defaults = {
    throttle: 100,
    scrollOffset: 200, // offset - 200 allows elements near bottom of page to scroll
    activeClass: 'active',
    getActiveElement: function (id) {
      return 'a[href="#' + id + '"]';
    }
  };

  /**
   * @class
   *
   */

  var ScrollSpy = function (_Component9) {
    _inherits(ScrollSpy, _Component9);

    /**
     * Construct ScrollSpy instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function ScrollSpy(el, options) {
      _classCallCheck(this, ScrollSpy);

      var _this35 = _possibleConstructorReturn(this, (ScrollSpy.__proto__ || Object.getPrototypeOf(ScrollSpy)).call(this, ScrollSpy, el, options));

      _this35.el.M_ScrollSpy = _this35;

      /**
       * Options for the modal
       * @member Modal#options
       * @prop {Number} [throttle=100] - Throttle of scroll handler
       * @prop {Number} [scrollOffset=200] - Offset for centering element when scrolled to
       * @prop {String} [activeClass='active'] - Class applied to active elements
       * @prop {Function} [getActiveElement] - Used to find active element
       */
      _this35.options = $.extend({}, ScrollSpy.defaults, options);

      // setup
      ScrollSpy._elements.push(_this35);
      ScrollSpy._count++;
      ScrollSpy._increment++;
      _this35.tickId = -1;
      _this35.id = ScrollSpy._increment;
      _this35._setupEventHandlers();
      _this35._handleWindowScroll();
      return _this35;
    }

    _createClass(ScrollSpy, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        ScrollSpy._elements.splice(ScrollSpy._elements.indexOf(this), 1);
        ScrollSpy._elementsInView.splice(ScrollSpy._elementsInView.indexOf(this), 1);
        ScrollSpy._visibleElements.splice(ScrollSpy._visibleElements.indexOf(this.$el), 1);
        ScrollSpy._count--;
        this._removeEventHandlers();
        $(this.options.getActiveElement(this.$el.attr('id'))).removeClass(this.options.activeClass);
        this.el.M_ScrollSpy = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var throttledResize = M.throttle(this._handleWindowScroll, 200);
        this._handleThrottledResizeBound = throttledResize.bind(this);
        this._handleWindowScrollBound = this._handleWindowScroll.bind(this);
        if (ScrollSpy._count === 1) {
          window.addEventListener('scroll', this._handleWindowScrollBound);
          window.addEventListener('resize', this._handleThrottledResizeBound);
          document.body.addEventListener('click', this._handleTriggerClick);
        }
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (ScrollSpy._count === 0) {
          window.removeEventListener('scroll', this._handleWindowScrollBound);
          window.removeEventListener('resize', this._handleThrottledResizeBound);
          document.body.removeEventListener('click', this._handleTriggerClick);
        }
      }

      /**
       * Handle Trigger Click
       * @param {Event} e
       */

    }, {
      key: "_handleTriggerClick",
      value: function _handleTriggerClick(e) {
        var $trigger = $(e.target);
        for (var i = ScrollSpy._elements.length - 1; i >= 0; i--) {
          var scrollspy = ScrollSpy._elements[i];
          if ($trigger.is('a[href="#' + scrollspy.$el.attr('id') + '"]')) {
            e.preventDefault();
            var offset = scrollspy.$el.offset().top + 1;

            anim({
              targets: [document.documentElement, document.body],
              scrollTop: offset - scrollspy.options.scrollOffset,
              duration: 400,
              easing: 'easeOutCubic'
            });
            break;
          }
        }
      }

      /**
       * Handle Window Scroll
       */

    }, {
      key: "_handleWindowScroll",
      value: function _handleWindowScroll() {
        // unique tick id
        ScrollSpy._ticks++;

        // viewport rectangle
        var top = M.getDocumentScrollTop(),
            left = M.getDocumentScrollLeft(),
            right = left + window.innerWidth,
            bottom = top + window.innerHeight;

        // determine which elements are in view
        var intersections = ScrollSpy._findElements(top, right, bottom, left);
        for (var i = 0; i < intersections.length; i++) {
          var scrollspy = intersections[i];
          var lastTick = scrollspy.tickId;
          if (lastTick < 0) {
            // entered into view
            scrollspy._enter();
          }

          // update tick id
          scrollspy.tickId = ScrollSpy._ticks;
        }

        for (var _i = 0; _i < ScrollSpy._elementsInView.length; _i++) {
          var _scrollspy = ScrollSpy._elementsInView[_i];
          var _lastTick = _scrollspy.tickId;
          if (_lastTick >= 0 && _lastTick !== ScrollSpy._ticks) {
            // exited from view
            _scrollspy._exit();
            _scrollspy.tickId = -1;
          }
        }

        // remember elements in view for next tick
        ScrollSpy._elementsInView = intersections;
      }

      /**
       * Find elements that are within the boundary
       * @param {number} top
       * @param {number} right
       * @param {number} bottom
       * @param {number} left
       * @return {Array.<ScrollSpy>}   A collection of elements
       */

    }, {
      key: "_enter",
      value: function _enter() {
        ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function (value) {
          return value.height() != 0;
        });

        if (ScrollSpy._visibleElements[0]) {
          $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).removeClass(this.options.activeClass);
          if (ScrollSpy._visibleElements[0][0].M_ScrollSpy && this.id < ScrollSpy._visibleElements[0][0].M_ScrollSpy.id) {
            ScrollSpy._visibleElements.unshift(this.$el);
          } else {
            ScrollSpy._visibleElements.push(this.$el);
          }
        } else {
          ScrollSpy._visibleElements.push(this.$el);
        }

        $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).addClass(this.options.activeClass);
      }
    }, {
      key: "_exit",
      value: function _exit() {
        var _this36 = this;

        ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function (value) {
          return value.height() != 0;
        });

        if (ScrollSpy._visibleElements[0]) {
          $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).removeClass(this.options.activeClass);

          ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function (el) {
            return el.attr('id') != _this36.$el.attr('id');
          });
          if (ScrollSpy._visibleElements[0]) {
            // Check if empty
            $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).addClass(this.options.activeClass);
          }
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(ScrollSpy.__proto__ || Object.getPrototypeOf(ScrollSpy), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_ScrollSpy;
      }
    }, {
      key: "_findElements",
      value: function _findElements(top, right, bottom, left) {
        var hits = [];
        for (var i = 0; i < ScrollSpy._elements.length; i++) {
          var scrollspy = ScrollSpy._elements[i];
          var currTop = top + scrollspy.options.scrollOffset || 200;

          if (scrollspy.$el.height() > 0) {
            var elTop = scrollspy.$el.offset().top,
                elLeft = scrollspy.$el.offset().left,
                elRight = elLeft + scrollspy.$el.width(),
                elBottom = elTop + scrollspy.$el.height();

            var isIntersect = !(elLeft > right || elRight < left || elTop > bottom || elBottom < currTop);

            if (isIntersect) {
              hits.push(scrollspy);
            }
          }
        }
        return hits;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return ScrollSpy;
  }(Component);

  /**
   * @static
   * @memberof ScrollSpy
   * @type {Array.<ScrollSpy>}
   */


  ScrollSpy._elements = [];

  /**
   * @static
   * @memberof ScrollSpy
   * @type {Array.<ScrollSpy>}
   */
  ScrollSpy._elementsInView = [];

  /**
   * @static
   * @memberof ScrollSpy
   * @type {Array.<cash>}
   */
  ScrollSpy._visibleElements = [];

  /**
   * @static
   * @memberof ScrollSpy
   */
  ScrollSpy._count = 0;

  /**
   * @static
   * @memberof ScrollSpy
   */
  ScrollSpy._increment = 0;

  /**
   * @static
   * @memberof ScrollSpy
   */
  ScrollSpy._ticks = 0;

  M.ScrollSpy = ScrollSpy;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(ScrollSpy, 'scrollSpy', 'M_ScrollSpy');
  }
})(cash, M.anime);
;(function ($) {
  'use strict';

  var _defaults = {
    data: {}, // Autocomplete data set
    limit: Infinity, // Limit of results the autocomplete shows
    onAutocomplete: null, // Callback for when autocompleted
    minLength: 1, // Min characters before autocomplete starts
    sortFunction: function (a, b, inputString) {
      // Sort function for sorting autocomplete results
      return a.indexOf(inputString) - b.indexOf(inputString);
    }
  };

  /**
   * @class
   *
   */

  var Autocomplete = function (_Component10) {
    _inherits(Autocomplete, _Component10);

    /**
     * Construct Autocomplete instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Autocomplete(el, options) {
      _classCallCheck(this, Autocomplete);

      var _this37 = _possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).call(this, Autocomplete, el, options));

      _this37.el.M_Autocomplete = _this37;

      /**
       * Options for the autocomplete
       * @member Autocomplete#options
       * @prop {Number} duration
       * @prop {Number} dist
       * @prop {number} shift
       * @prop {number} padding
       * @prop {Boolean} fullWidth
       * @prop {Boolean} indicators
       * @prop {Boolean} noWrap
       * @prop {Function} onCycleTo
       */
      _this37.options = $.extend({}, Autocomplete.defaults, options);

      // Setup
      _this37.isOpen = false;
      _this37.count = 0;
      _this37.activeIndex = -1;
      _this37.oldVal;
      _this37.$inputField = _this37.$el.closest('.input-field');
      _this37.$active = $();
      _this37._mousedown = false;
      _this37._setupDropdown();

      _this37._setupEventHandlers();
      return _this37;
    }

    _createClass(Autocomplete, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._removeDropdown();
        this.el.M_Autocomplete = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleInputBlurBound = this._handleInputBlur.bind(this);
        this._handleInputKeyupAndFocusBound = this._handleInputKeyupAndFocus.bind(this);
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        this._handleContainerMousedownAndTouchstartBound = this._handleContainerMousedownAndTouchstart.bind(this);
        this._handleContainerMouseupAndTouchendBound = this._handleContainerMouseupAndTouchend.bind(this);

        this.el.addEventListener('blur', this._handleInputBlurBound);
        this.el.addEventListener('keyup', this._handleInputKeyupAndFocusBound);
        this.el.addEventListener('focus', this._handleInputKeyupAndFocusBound);
        this.el.addEventListener('keydown', this._handleInputKeydownBound);
        this.el.addEventListener('click', this._handleInputClickBound);
        this.container.addEventListener('mousedown', this._handleContainerMousedownAndTouchstartBound);
        this.container.addEventListener('mouseup', this._handleContainerMouseupAndTouchendBound);

        if (typeof window.ontouchstart !== 'undefined') {
          this.container.addEventListener('touchstart', this._handleContainerMousedownAndTouchstartBound);
          this.container.addEventListener('touchend', this._handleContainerMouseupAndTouchendBound);
        }
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('blur', this._handleInputBlurBound);
        this.el.removeEventListener('keyup', this._handleInputKeyupAndFocusBound);
        this.el.removeEventListener('focus', this._handleInputKeyupAndFocusBound);
        this.el.removeEventListener('keydown', this._handleInputKeydownBound);
        this.el.removeEventListener('click', this._handleInputClickBound);
        this.container.removeEventListener('mousedown', this._handleContainerMousedownAndTouchstartBound);
        this.container.removeEventListener('mouseup', this._handleContainerMouseupAndTouchendBound);

        if (typeof window.ontouchstart !== 'undefined') {
          this.container.removeEventListener('touchstart', this._handleContainerMousedownAndTouchstartBound);
          this.container.removeEventListener('touchend', this._handleContainerMouseupAndTouchendBound);
        }
      }

      /**
       * Setup dropdown
       */

    }, {
      key: "_setupDropdown",
      value: function _setupDropdown() {
        var _this38 = this;

        this.container = document.createElement('ul');
        this.container.id = "autocomplete-options-" + M.guid();
        $(this.container).addClass('autocomplete-content dropdown-content');
        this.$inputField.append(this.container);
        this.el.setAttribute('data-target', this.container.id);

        this.dropdown = M.Dropdown.init(this.el, {
          autoFocus: false,
          closeOnClick: false,
          coverTrigger: false,
          onItemClick: function (itemEl) {
            _this38.selectOption($(itemEl));
          }
        });

        // Sketchy removal of dropdown click handler
        this.el.removeEventListener('click', this.dropdown._handleClickBound);
      }

      /**
       * Remove dropdown
       */

    }, {
      key: "_removeDropdown",
      value: function _removeDropdown() {
        this.container.parentNode.removeChild(this.container);
      }

      /**
       * Handle Input Blur
       */

    }, {
      key: "_handleInputBlur",
      value: function _handleInputBlur() {
        if (!this._mousedown) {
          this.close();
          this._resetAutocomplete();
        }
      }

      /**
       * Handle Input Keyup and Focus
       * @param {Event} e
       */

    }, {
      key: "_handleInputKeyupAndFocus",
      value: function _handleInputKeyupAndFocus(e) {
        if (e.type === 'keyup') {
          Autocomplete._keydown = false;
        }

        this.count = 0;
        var val = this.el.value.toLowerCase();

        // Don't capture enter or arrow key usage.
        if (e.keyCode === 13 || e.keyCode === 38 || e.keyCode === 40) {
          return;
        }

        // Check if the input isn't empty
        // Check if focus triggered by tab
        if (this.oldVal !== val && (M.tabPressed || e.type !== 'focus')) {
          this.open();
        }

        // Update oldVal
        this.oldVal = val;
      }

      /**
       * Handle Input Keydown
       * @param {Event} e
       */

    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        Autocomplete._keydown = true;

        // Arrow keys and enter key usage
        var keyCode = e.keyCode,
            liElement = void 0,
            numItems = $(this.container).children('li').length;

        // select element on Enter
        if (keyCode === M.keys.ENTER && this.activeIndex >= 0) {
          liElement = $(this.container).children('li').eq(this.activeIndex);
          if (liElement.length) {
            this.selectOption(liElement);
            e.preventDefault();
          }
          return;
        }

        // Capture up and down key
        if (keyCode === M.keys.ARROW_UP || keyCode === M.keys.ARROW_DOWN) {
          e.preventDefault();

          if (keyCode === M.keys.ARROW_UP && this.activeIndex > 0) {
            this.activeIndex--;
          }

          if (keyCode === M.keys.ARROW_DOWN && this.activeIndex < numItems - 1) {
            this.activeIndex++;
          }

          this.$active.removeClass('active');
          if (this.activeIndex >= 0) {
            this.$active = $(this.container).children('li').eq(this.activeIndex);
            this.$active.addClass('active');
          }
        }
      }

      /**
       * Handle Input Click
       * @param {Event} e
       */

    }, {
      key: "_handleInputClick",
      value: function _handleInputClick(e) {
        this.open();
      }

      /**
       * Handle Container Mousedown and Touchstart
       * @param {Event} e
       */

    }, {
      key: "_handleContainerMousedownAndTouchstart",
      value: function _handleContainerMousedownAndTouchstart(e) {
        this._mousedown = true;
      }

      /**
       * Handle Container Mouseup and Touchend
       * @param {Event} e
       */

    }, {
      key: "_handleContainerMouseupAndTouchend",
      value: function _handleContainerMouseupAndTouchend(e) {
        this._mousedown = false;
      }

      /**
       * Highlight partial match
       */

    }, {
      key: "_highlight",
      value: function _highlight(string, $el) {
        var img = $el.find('img');
        var matchStart = $el.text().toLowerCase().indexOf('' + string.toLowerCase() + ''),
            matchEnd = matchStart + string.length - 1,
            beforeMatch = $el.text().slice(0, matchStart),
            matchText = $el.text().slice(matchStart, matchEnd + 1),
            afterMatch = $el.text().slice(matchEnd + 1);
        $el.html("<span>" + beforeMatch + "<span class='highlight'>" + matchText + "</span>" + afterMatch + "</span>");
        if (img.length) {
          $el.prepend(img);
        }
      }

      /**
       * Reset current element position
       */

    }, {
      key: "_resetCurrentElement",
      value: function _resetCurrentElement() {
        this.activeIndex = -1;
        this.$active.removeClass('active');
      }

      /**
       * Reset autocomplete elements
       */

    }, {
      key: "_resetAutocomplete",
      value: function _resetAutocomplete() {
        $(this.container).empty();
        this._resetCurrentElement();
        this.oldVal = null;
        this.isOpen = false;
        this._mousedown = false;
      }

      /**
       * Select autocomplete option
       * @param {Element} el  Autocomplete option list item element
       */

    }, {
      key: "selectOption",
      value: function selectOption(el) {
        var text = el.text().trim();
        this.el.value = text;
        this.$el.trigger('change');
        this._resetAutocomplete();
        this.close();

        // Handle onAutocomplete callback.
        if (typeof this.options.onAutocomplete === 'function') {
          this.options.onAutocomplete.call(this, text);
        }
      }

      /**
       * Render dropdown content
       * @param {Object} data  data set
       * @param {String} val  current input value
       */

    }, {
      key: "_renderDropdown",
      value: function _renderDropdown(data, val) {
        var _this39 = this;

        this._resetAutocomplete();

        var matchingData = [];

        // Gather all matching data
        for (var key in data) {
          if (data.hasOwnProperty(key) && key.toLowerCase().indexOf(val) !== -1) {
            // Break if past limit
            if (this.count >= this.options.limit) {
              break;
            }

            var entry = {
              data: data[key],
              key: key
            };
            matchingData.push(entry);

            this.count++;
          }
        }

        // Sort
        if (this.options.sortFunction) {
          var sortFunctionBound = function (a, b) {
            return _this39.options.sortFunction(a.key.toLowerCase(), b.key.toLowerCase(), val.toLowerCase());
          };
          matchingData.sort(sortFunctionBound);
        }

        // Render
        for (var i = 0; i < matchingData.length; i++) {
          var _entry = matchingData[i];
          var $autocompleteOption = $('<li></li>');
          if (!!_entry.data) {
            $autocompleteOption.append("<img src=\"" + _entry.data + "\" class=\"right circle\"><span>" + _entry.key + "</span>");
          } else {
            $autocompleteOption.append('<span>' + _entry.key + '</span>');
          }

          $(this.container).append($autocompleteOption);
          this._highlight(val, $autocompleteOption);
        }
      }

      /**
       * Open Autocomplete Dropdown
       */

    }, {
      key: "open",
      value: function open() {
        var val = this.el.value.toLowerCase();

        this._resetAutocomplete();

        if (val.length >= this.options.minLength) {
          this.isOpen = true;
          this._renderDropdown(this.options.data, val);
        }

        // Open dropdown
        if (!this.dropdown.isOpen) {
          this.dropdown.open();
        } else {
          // Recalculate dropdown when its already open
          this.dropdown.recalculateDimensions();
        }
      }

      /**
       * Close Autocomplete Dropdown
       */

    }, {
      key: "close",
      value: function close() {
        this.dropdown.close();
      }

      /**
       * Update Data
       * @param {Object} data
       */

    }, {
      key: "updateData",
      value: function updateData(data) {
        var val = this.el.value.toLowerCase();
        this.options.data = data;

        if (this.isOpen) {
          this._renderDropdown(data, val);
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Autocomplete;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Autocomplete;
  }(Component);

  /**
   * @static
   * @memberof Autocomplete
   */


  Autocomplete._keydown = false;

  M.Autocomplete = Autocomplete;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Autocomplete, 'autocomplete', 'M_Autocomplete');
  }
})(cash);
;(function ($) {
  // Function to update labels of text fields
  M.updateTextFields = function () {
    var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea';
    $(input_selector).each(function (element, index) {
      var $this = $(this);
      if (element.value.length > 0 || $(element).is(':focus') || element.autofocus || $this.attr('placeholder') !== null) {
        $this.siblings('label').addClass('active');
      } else if (element.validity) {
        $this.siblings('label').toggleClass('active', element.validity.badInput === true);
      } else {
        $this.siblings('label').removeClass('active');
      }
    });
  };

  M.validate_field = function (object) {
    var hasLength = object.attr('data-length') !== null;
    var lenAttr = parseInt(object.attr('data-length'));
    var len = object[0].value.length;

    if (len === 0 && object[0].validity.badInput === false && !object.is(':required')) {
      if (object.hasClass('validate')) {
        object.removeClass('valid');
        object.removeClass('invalid');
      }
    } else {
      if (object.hasClass('validate')) {
        // Check for character counter attributes
        if (object.is(':valid') && hasLength && len <= lenAttr || object.is(':valid') && !hasLength) {
          object.removeClass('invalid');
          object.addClass('valid');
        } else {
          object.removeClass('valid');
          object.addClass('invalid');
        }
      }
    }
  };

  M.textareaAutoResize = function ($textarea) {
    // Wrap if native element
    if ($textarea instanceof Element) {
      $textarea = $($textarea);
    }

    if (!$textarea.length) {
      console.error('No textarea element found');
      return;
    }

    // Textarea Auto Resize
    var hiddenDiv = $('.hiddendiv').first();
    if (!hiddenDiv.length) {
      hiddenDiv = $('<div class="hiddendiv common"></div>');
      $('body').append(hiddenDiv);
    }

    // Set font properties of hiddenDiv
    var fontFamily = $textarea.css('font-family');
    var fontSize = $textarea.css('font-size');
    var lineHeight = $textarea.css('line-height');

    // Firefox can't handle padding shorthand.
    var paddingTop = $textarea.css('padding-top');
    var paddingRight = $textarea.css('padding-right');
    var paddingBottom = $textarea.css('padding-bottom');
    var paddingLeft = $textarea.css('padding-left');

    if (fontSize) {
      hiddenDiv.css('font-size', fontSize);
    }
    if (fontFamily) {
      hiddenDiv.css('font-family', fontFamily);
    }
    if (lineHeight) {
      hiddenDiv.css('line-height', lineHeight);
    }
    if (paddingTop) {
      hiddenDiv.css('padding-top', paddingTop);
    }
    if (paddingRight) {
      hiddenDiv.css('padding-right', paddingRight);
    }
    if (paddingBottom) {
      hiddenDiv.css('padding-bottom', paddingBottom);
    }
    if (paddingLeft) {
      hiddenDiv.css('padding-left', paddingLeft);
    }

    // Set original-height, if none
    if (!$textarea.data('original-height')) {
      $textarea.data('original-height', $textarea.height());
    }

    if ($textarea.attr('wrap') === 'off') {
      hiddenDiv.css('overflow-wrap', 'normal').css('white-space', 'pre');
    }

    hiddenDiv.text($textarea[0].value + '\n');
    var content = hiddenDiv.html().replace(/\n/g, '<br>');
    hiddenDiv.html(content);

    // When textarea is hidden, width goes crazy.
    // Approximate with half of window size

    if ($textarea[0].offsetWidth > 0 && $textarea[0].offsetHeight > 0) {
      hiddenDiv.css('width', $textarea.width() + 'px');
    } else {
      hiddenDiv.css('width', window.innerWidth / 2 + 'px');
    }

    /**
     * Resize if the new height is greater than the
     * original height of the textarea
     */
    if ($textarea.data('original-height') <= hiddenDiv.innerHeight()) {
      $textarea.css('height', hiddenDiv.innerHeight() + 'px');
    } else if ($textarea[0].value.length < $textarea.data('previous-length')) {
      /**
       * In case the new height is less than original height, it
       * means the textarea has less text than before
       * So we set the height to the original one
       */
      $textarea.css('height', $textarea.data('original-height') + 'px');
    }
    $textarea.data('previous-length', $textarea[0].value.length);
  };

  $(document).ready(function () {
    // Text based inputs
    var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea';

    // Add active if form auto complete
    $(document).on('change', input_selector, function () {
      if (this.value.length !== 0 || $(this).attr('placeholder') !== null) {
        $(this).siblings('label').addClass('active');
      }
      M.validate_field($(this));
    });

    // Add active if input element has been pre-populated on document ready
    $(document).ready(function () {
      M.updateTextFields();
    });

    // HTML DOM FORM RESET handling
    $(document).on('reset', function (e) {
      var formReset = $(e.target);
      if (formReset.is('form')) {
        formReset.find(input_selector).removeClass('valid').removeClass('invalid');
        formReset.find(input_selector).each(function (e) {
          if (this.value.length) {
            $(this).siblings('label').removeClass('active');
          }
        });

        // Reset select (after native reset)
        setTimeout(function () {
          formReset.find('select').each(function () {
            // check if initialized
            if (this.M_FormSelect) {
              $(this).trigger('change');
            }
          });
        }, 0);
      }
    });

    /**
     * Add active when element has focus
     * @param {Event} e
     */
    document.addEventListener('focus', function (e) {
      if ($(e.target).is(input_selector)) {
        $(e.target).siblings('label, .prefix').addClass('active');
      }
    }, true);

    /**
     * Remove active when element is blurred
     * @param {Event} e
     */
    document.addEventListener('blur', function (e) {
      var $inputElement = $(e.target);
      if ($inputElement.is(input_selector)) {
        var selector = '.prefix';

        if ($inputElement[0].value.length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === null) {
          selector += ', label';
        }
        $inputElement.siblings(selector).removeClass('active');
        M.validate_field($inputElement);
      }
    }, true);

    // Radio and Checkbox focus class
    var radio_checkbox = 'input[type=radio], input[type=checkbox]';
    $(document).on('keyup', radio_checkbox, function (e) {
      // TAB, check if tabbing to radio or checkbox.
      if (e.which === M.keys.TAB) {
        $(this).addClass('tabbed');
        var $this = $(this);
        $this.one('blur', function (e) {
          $(this).removeClass('tabbed');
        });
        return;
      }
    });

    var text_area_selector = '.materialize-textarea';
    $(text_area_selector).each(function () {
      var $textarea = $(this);
      /**
       * Resize textarea on document load after storing
       * the original height and the original length
       */
      $textarea.data('original-height', $textarea.height());
      $textarea.data('previous-length', this.value.length);
      M.textareaAutoResize($textarea);
    });

    $(document).on('keyup', text_area_selector, function () {
      M.textareaAutoResize($(this));
    });
    $(document).on('keydown', text_area_selector, function () {
      M.textareaAutoResize($(this));
    });

    // File Input Path
    $(document).on('change', '.file-field input[type="file"]', function () {
      var file_field = $(this).closest('.file-field');
      var path_input = file_field.find('input.file-path');
      var files = $(this)[0].files;
      var file_names = [];
      for (var i = 0; i < files.length; i++) {
        file_names.push(files[i].name);
      }
      path_input[0].value = file_names.join(', ');
      path_input.trigger('change');
    });
  }); // End of $(document).ready
})(cash);
;(function ($, anim) {
  'use strict';

  var _defaults = {
    indicators: true,
    height: 400,
    duration: 500,
    interval: 6000
  };

  /**
   * @class
   *
   */

  var Slider = function (_Component11) {
    _inherits(Slider, _Component11);

    /**
     * Construct Slider instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Slider(el, options) {
      _classCallCheck(this, Slider);

      var _this40 = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, Slider, el, options));

      _this40.el.M_Slider = _this40;

      /**
       * Options for the modal
       * @member Slider#options
       * @prop {Boolean} [indicators=true] - Show indicators
       * @prop {Number} [height=400] - height of slider
       * @prop {Number} [duration=500] - Length in ms of slide transition
       * @prop {Number} [interval=6000] - Length in ms of slide interval
       */
      _this40.options = $.extend({}, Slider.defaults, options);

      // setup
      _this40.$slider = _this40.$el.find('.slides');
      _this40.$slides = _this40.$slider.children('li');
      _this40.activeIndex = _this40.$slides.filter(function (item) {
        return $(item).hasClass('active');
      }).first().index();
      if (_this40.activeIndex != -1) {
        _this40.$active = _this40.$slides.eq(_this40.activeIndex);
      }

      _this40._setSliderHeight();

      // Set initial positions of captions
      _this40.$slides.find('.caption').each(function (el) {
        _this40._animateCaptionIn(el, 0);
      });

      // Move img src into background-image
      _this40.$slides.find('img').each(function (el) {
        var placeholderBase64 = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        if ($(el).attr('src') !== placeholderBase64) {
          $(el).css('background-image', 'url("' + $(el).attr('src') + '")');
          $(el).attr('src', placeholderBase64);
        }
      });

      _this40._setupIndicators();

      // Show active slide
      if (_this40.$active) {
        _this40.$active.css('display', 'block');
      } else {
        _this40.$slides.first().addClass('active');
        anim({
          targets: _this40.$slides.first()[0],
          opacity: 1,
          duration: _this40.options.duration,
          easing: 'easeOutQuad'
        });

        _this40.activeIndex = 0;
        _this40.$active = _this40.$slides.eq(_this40.activeIndex);

        // Update indicators
        if (_this40.options.indicators) {
          _this40.$indicators.eq(_this40.activeIndex).addClass('active');
        }
      }

      // Adjust height to current slide
      _this40.$active.find('img').each(function (el) {
        anim({
          targets: _this40.$active.find('.caption')[0],
          opacity: 1,
          translateX: 0,
          translateY: 0,
          duration: _this40.options.duration,
          easing: 'easeOutQuad'
        });
      });

      _this40._setupEventHandlers();

      // auto scroll
      _this40.start();
      return _this40;
    }

    _createClass(Slider, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this.pause();
        this._removeIndicators();
        this._removeEventHandlers();
        this.el.M_Slider = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this41 = this;

        this._handleIntervalBound = this._handleInterval.bind(this);
        this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this);

        if (this.options.indicators) {
          this.$indicators.each(function (el) {
            el.addEventListener('click', _this41._handleIndicatorClickBound);
          });
        }
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this42 = this;

        if (this.options.indicators) {
          this.$indicators.each(function (el) {
            el.removeEventListener('click', _this42._handleIndicatorClickBound);
          });
        }
      }

      /**
       * Handle indicator click
       * @param {Event} e
       */

    }, {
      key: "_handleIndicatorClick",
      value: function _handleIndicatorClick(e) {
        var currIndex = $(e.target).index();
        this.set(currIndex);
      }

      /**
       * Handle Interval
       */

    }, {
      key: "_handleInterval",
      value: function _handleInterval() {
        var newActiveIndex = this.$slider.find('.active').index();
        if (this.$slides.length === newActiveIndex + 1) newActiveIndex = 0;
        // loop to start
        else newActiveIndex += 1;

        this.set(newActiveIndex);
      }

      /**
       * Animate in caption
       * @param {Element} caption
       * @param {Number} duration
       */

    }, {
      key: "_animateCaptionIn",
      value: function _animateCaptionIn(caption, duration) {
        var animOptions = {
          targets: caption,
          opacity: 0,
          duration: duration,
          easing: 'easeOutQuad'
        };

        if ($(caption).hasClass('center-align')) {
          animOptions.translateY = -100;
        } else if ($(caption).hasClass('right-align')) {
          animOptions.translateX = 100;
        } else if ($(caption).hasClass('left-align')) {
          animOptions.translateX = -100;
        }

        anim(animOptions);
      }

      /**
       * Set height of slider
       */

    }, {
      key: "_setSliderHeight",
      value: function _setSliderHeight() {
        // If fullscreen, do nothing
        if (!this.$el.hasClass('fullscreen')) {
          if (this.options.indicators) {
            // Add height if indicators are present
            this.$el.css('height', this.options.height + 40 + 'px');
          } else {
            this.$el.css('height', this.options.height + 'px');
          }
          this.$slider.css('height', this.options.height + 'px');
        }
      }

      /**
       * Setup indicators
       */

    }, {
      key: "_setupIndicators",
      value: function _setupIndicators() {
        var _this43 = this;

        if (this.options.indicators) {
          this.$indicators = $('<ul class="indicators"></ul>');
          this.$slides.each(function (el, index) {
            var $indicator = $('<li class="indicator-item"></li>');
            _this43.$indicators.append($indicator[0]);
          });
          this.$el.append(this.$indicators[0]);
          this.$indicators = this.$indicators.children('li.indicator-item');
        }
      }

      /**
       * Remove indicators
       */

    }, {
      key: "_removeIndicators",
      value: function _removeIndicators() {
        this.$el.find('ul.indicators').remove();
      }

      /**
       * Cycle to nth item
       * @param {Number} index
       */

    }, {
      key: "set",
      value: function set(index) {
        var _this44 = this;

        // Wrap around indices.
        if (index >= this.$slides.length) index = 0;else if (index < 0) index = this.$slides.length - 1;

        // Only do if index changes
        if (this.activeIndex != index) {
          this.$active = this.$slides.eq(this.activeIndex);
          var $caption = this.$active.find('.caption');
          this.$active.removeClass('active');

          anim({
            targets: this.$active[0],
            opacity: 0,
            duration: this.options.duration,
            easing: 'easeOutQuad',
            complete: function () {
              _this44.$slides.not('.active').each(function (el) {
                anim({
                  targets: el,
                  opacity: 0,
                  translateX: 0,
                  translateY: 0,
                  duration: 0,
                  easing: 'easeOutQuad'
                });
              });
            }
          });

          this._animateCaptionIn($caption[0], this.options.duration);

          // Update indicators
          if (this.options.indicators) {
            this.$indicators.eq(this.activeIndex).removeClass('active');
            this.$indicators.eq(index).addClass('active');
          }

          anim({
            targets: this.$slides.eq(index)[0],
            opacity: 1,
            duration: this.options.duration,
            easing: 'easeOutQuad'
          });

          anim({
            targets: this.$slides.eq(index).find('.caption')[0],
            opacity: 1,
            translateX: 0,
            translateY: 0,
            duration: this.options.duration,
            delay: this.options.duration,
            easing: 'easeOutQuad'
          });

          this.$slides.eq(index).addClass('active');
          this.activeIndex = index;

          // Reset interval
          this.start();
        }
      }

      /**
       * Pause slider interval
       */

    }, {
      key: "pause",
      value: function pause() {
        clearInterval(this.interval);
      }

      /**
       * Start slider interval
       */

    }, {
      key: "start",
      value: function start() {
        clearInterval(this.interval);
        this.interval = setInterval(this._handleIntervalBound, this.options.duration + this.options.interval);
      }

      /**
       * Move to next slide
       */

    }, {
      key: "next",
      value: function next() {
        var newIndex = this.activeIndex + 1;

        // Wrap around indices.
        if (newIndex >= this.$slides.length) newIndex = 0;else if (newIndex < 0) newIndex = this.$slides.length - 1;

        this.set(newIndex);
      }

      /**
       * Move to previous slide
       */

    }, {
      key: "prev",
      value: function prev() {
        var newIndex = this.activeIndex - 1;

        // Wrap around indices.
        if (newIndex >= this.$slides.length) newIndex = 0;else if (newIndex < 0) newIndex = this.$slides.length - 1;

        this.set(newIndex);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Slider.__proto__ || Object.getPrototypeOf(Slider), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Slider;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Slider;
  }(Component);

  M.Slider = Slider;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Slider, 'slider', 'M_Slider');
  }
})(cash, M.anime);
;(function ($, anim) {
  $(document).on('click', '.card', function (e) {
    if ($(this).children('.card-reveal').length) {
      var $card = $(e.target).closest('.card');
      if ($card.data('initialOverflow') === undefined) {
        $card.data('initialOverflow', $card.css('overflow') === undefined ? '' : $card.css('overflow'));
      }
      var $cardReveal = $(this).find('.card-reveal');
      if ($(e.target).is($('.card-reveal .card-title')) || $(e.target).is($('.card-reveal .card-title i'))) {
        // Make Reveal animate down and display none
        anim({
          targets: $cardReveal[0],
          translateY: 0,
          duration: 225,
          easing: 'easeInOutQuad',
          complete: function (anim) {
            var el = anim.animatables[0].target;
            $(el).css({ display: 'none' });
            $card.css('overflow', $card.data('initialOverflow'));
          }
        });
      } else if ($(e.target).is($('.card .activator')) || $(e.target).is($('.card .activator i'))) {
        $card.css('overflow', 'hidden');
        $cardReveal.css({ display: 'block' });
        anim({
          targets: $cardReveal[0],
          translateY: '-100%',
          duration: 300,
          easing: 'easeInOutQuad'
        });
      }
    }
  });
})(cash, M.anime);
;(function ($) {
  'use strict';

  var _defaults = {
    data: [],
    placeholder: '',
    secondaryPlaceholder: '',
    autocompleteOptions: {},
    limit: Infinity,
    onChipAdd: null,
    onChipSelect: null,
    onChipDelete: null
  };

  /**
   * @typedef {Object} chip
   * @property {String} tag  chip tag string
   * @property {String} [image]  chip avatar image string
   */

  /**
   * @class
   *
   */

  var Chips = function (_Component12) {
    _inherits(Chips, _Component12);

    /**
     * Construct Chips instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Chips(el, options) {
      _classCallCheck(this, Chips);

      var _this45 = _possibleConstructorReturn(this, (Chips.__proto__ || Object.getPrototypeOf(Chips)).call(this, Chips, el, options));

      _this45.el.M_Chips = _this45;

      /**
       * Options for the modal
       * @member Chips#options
       * @prop {Array} data
       * @prop {String} placeholder
       * @prop {String} secondaryPlaceholder
       * @prop {Object} autocompleteOptions
       */
      _this45.options = $.extend({}, Chips.defaults, options);

      _this45.$el.addClass('chips input-field');
      _this45.chipsData = [];
      _this45.$chips = $();
      _this45._setupInput();
      _this45.hasAutocomplete = Object.keys(_this45.options.autocompleteOptions).length > 0;

      // Set input id
      if (!_this45.$input.attr('id')) {
        _this45.$input.attr('id', M.guid());
      }

      // Render initial chips
      if (_this45.options.data.length) {
        _this45.chipsData = _this45.options.data;
        _this45._renderChips(_this45.chipsData);
      }

      // Setup autocomplete if needed
      if (_this45.hasAutocomplete) {
        _this45._setupAutocomplete();
      }

      _this45._setPlaceholder();
      _this45._setupLabel();
      _this45._setupEventHandlers();
      return _this45;
    }

    _createClass(Chips, [{
      key: "getData",


      /**
       * Get Chips Data
       */
      value: function getData() {
        return this.chipsData;
      }

      /**
       * Teardown component
       */

    }, {
      key: "destroy",
      value: function destroy() {
        this._removeEventHandlers();
        this.$chips.remove();
        this.el.M_Chips = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleChipClickBound = this._handleChipClick.bind(this);
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputFocusBound = this._handleInputFocus.bind(this);
        this._handleInputBlurBound = this._handleInputBlur.bind(this);

        this.el.addEventListener('click', this._handleChipClickBound);
        document.addEventListener('keydown', Chips._handleChipsKeydown);
        document.addEventListener('keyup', Chips._handleChipsKeyup);
        this.el.addEventListener('blur', Chips._handleChipsBlur, true);
        this.$input[0].addEventListener('focus', this._handleInputFocusBound);
        this.$input[0].addEventListener('blur', this._handleInputBlurBound);
        this.$input[0].addEventListener('keydown', this._handleInputKeydownBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('click', this._handleChipClickBound);
        document.removeEventListener('keydown', Chips._handleChipsKeydown);
        document.removeEventListener('keyup', Chips._handleChipsKeyup);
        this.el.removeEventListener('blur', Chips._handleChipsBlur, true);
        this.$input[0].removeEventListener('focus', this._handleInputFocusBound);
        this.$input[0].removeEventListener('blur', this._handleInputBlurBound);
        this.$input[0].removeEventListener('keydown', this._handleInputKeydownBound);
      }

      /**
       * Handle Chip Click
       * @param {Event} e
       */

    }, {
      key: "_handleChipClick",
      value: function _handleChipClick(e) {
        var $chip = $(e.target).closest('.chip');
        var clickedClose = $(e.target).is('.close');
        if ($chip.length) {
          var index = $chip.index();
          if (clickedClose) {
            // delete chip
            this.deleteChip(index);
            this.$input[0].focus();
          } else {
            // select chip
            this.selectChip(index);
          }

          // Default handle click to focus on input
        } else {
          this.$input[0].focus();
        }
      }

      /**
       * Handle Chips Keydown
       * @param {Event} e
       */

    }, {
      key: "_handleInputFocus",


      /**
       * Handle Input Focus
       */
      value: function _handleInputFocus() {
        this.$el.addClass('focus');
      }

      /**
       * Handle Input Blur
       */

    }, {
      key: "_handleInputBlur",
      value: function _handleInputBlur() {
        this.$el.removeClass('focus');
      }

      /**
       * Handle Input Keydown
       * @param {Event} e
       */

    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        Chips._keydown = true;

        // enter
        if (e.keyCode === 13) {
          // Override enter if autocompleting.
          if (this.hasAutocomplete && this.autocomplete && this.autocomplete.isOpen) {
            return;
          }

          e.preventDefault();
          this.addChip({
            tag: this.$input[0].value
          });
          this.$input[0].value = '';

          // delete or left
        } else if ((e.keyCode === 8 || e.keyCode === 37) && this.$input[0].value === '' && this.chipsData.length) {
          e.preventDefault();
          this.selectChip(this.chipsData.length - 1);
        }
      }

      /**
       * Render Chip
       * @param {chip} chip
       * @return {Element}
       */

    }, {
      key: "_renderChip",
      value: function _renderChip(chip) {
        if (!chip.tag) {
          return;
        }

        var renderedChip = document.createElement('div');
        var closeIcon = document.createElement('i');
        renderedChip.classList.add('chip');
        renderedChip.textContent = chip.tag;
        renderedChip.setAttribute('tabindex', 0);
        $(closeIcon).addClass('material-icons close');
        closeIcon.textContent = 'close';

        // attach image if needed
        if (chip.image) {
          var img = document.createElement('img');
          img.setAttribute('src', chip.image);
          renderedChip.insertBefore(img, renderedChip.firstChild);
        }

        renderedChip.appendChild(closeIcon);
        return renderedChip;
      }

      /**
       * Render Chips
       */

    }, {
      key: "_renderChips",
      value: function _renderChips() {
        this.$chips.remove();
        for (var i = 0; i < this.chipsData.length; i++) {
          var chipEl = this._renderChip(this.chipsData[i]);
          this.$el.append(chipEl);
          this.$chips.add(chipEl);
        }

        // move input to end
        this.$el.append(this.$input[0]);
      }

      /**
       * Setup Autocomplete
       */

    }, {
      key: "_setupAutocomplete",
      value: function _setupAutocomplete() {
        var _this46 = this;

        this.options.autocompleteOptions.onAutocomplete = function (val) {
          _this46.addChip({
            tag: val
          });
          _this46.$input[0].value = '';
          _this46.$input[0].focus();
        };

        this.autocomplete = M.Autocomplete.init(this.$input[0], this.options.autocompleteOptions);
      }

      /**
       * Setup Input
       */

    }, {
      key: "_setupInput",
      value: function _setupInput() {
        this.$input = this.$el.find('input');
        if (!this.$input.length) {
          this.$input = $('<input></input>');
          this.$el.append(this.$input);
        }

        this.$input.addClass('input');
      }

      /**
       * Setup Label
       */

    }, {
      key: "_setupLabel",
      value: function _setupLabel() {
        this.$label = this.$el.find('label');
        if (this.$label.length) {
          this.$label.setAttribute('for', this.$input.attr('id'));
        }
      }

      /**
       * Set placeholder
       */

    }, {
      key: "_setPlaceholder",
      value: function _setPlaceholder() {
        if (this.chipsData !== undefined && !this.chipsData.length && this.options.placeholder) {
          $(this.$input).prop('placeholder', this.options.placeholder);
        } else if ((this.chipsData === undefined || !!this.chipsData.length) && this.options.secondaryPlaceholder) {
          $(this.$input).prop('placeholder', this.options.secondaryPlaceholder);
        }
      }

      /**
       * Check if chip is valid
       * @param {chip} chip
       */

    }, {
      key: "_isValid",
      value: function _isValid(chip) {
        if (chip.hasOwnProperty('tag') && chip.tag !== '') {
          var exists = false;
          for (var i = 0; i < this.chipsData.length; i++) {
            if (this.chipsData[i].tag === chip.tag) {
              exists = true;
              break;
            }
          }
          return !exists;
        }

        return false;
      }

      /**
       * Add chip
       * @param {chip} chip
       */

    }, {
      key: "addChip",
      value: function addChip(chip) {
        if (!this._isValid(chip) || this.chipsData.length >= this.options.limit) {
          return;
        }

        var renderedChip = this._renderChip(chip);
        this.$chips.add(renderedChip);
        this.chipsData.push(chip);
        $(this.$input).before(renderedChip);
        this._setPlaceholder();

        // fire chipAdd callback
        if (typeof this.options.onChipAdd === 'function') {
          this.options.onChipAdd.call(this, this.$el, renderedChip);
        }
      }

      /**
       * Delete chip
       * @param {Number} chip
       */

    }, {
      key: "deleteChip",
      value: function deleteChip(chipIndex) {
        var $chip = this.$chips.eq(chipIndex);
        this.$chips.eq(chipIndex).remove();
        this.$chips = this.$chips.filter(function (el) {
          return $(el).index() >= 0;
        });
        this.chipsData.splice(chipIndex, 1);
        this._setPlaceholder();

        // fire chipDelete callback
        if (typeof this.options.onChipDelete === 'function') {
          this.options.onChipDelete.call(this, this.$el, $chip[0]);
        }
      }

      /**
       * Select chip
       * @param {Number} chip
       */

    }, {
      key: "selectChip",
      value: function selectChip(chipIndex) {
        var $chip = this.$chips.eq(chipIndex);
        this._selectedChip = $chip;
        $chip[0].focus();

        // fire chipSelect callback
        if (typeof this.options.onChipSelect === 'function') {
          this.options.onChipSelect.call(this, this.$el, $chip[0]);
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Chips.__proto__ || Object.getPrototypeOf(Chips), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Chips;
      }
    }, {
      key: "_handleChipsKeydown",
      value: function _handleChipsKeydown(e) {
        Chips._keydown = true;

        var $chips = $(e.target).closest('.chips');
        var chipsKeydown = e.target && $chips.length;

        // Don't handle keydown inputs on input and textarea
        if ($(e.target).is('input, textarea') || !chipsKeydown) {
          return;
        }

        var currChips = $chips[0].M_Chips;

        // backspace and delete
        if (e.keyCode === 8 || e.keyCode === 46) {
          e.preventDefault();

          var selectIndex = currChips.chipsData.length;
          if (currChips._selectedChip) {
            var index = currChips._selectedChip.index();
            currChips.deleteChip(index);
            currChips._selectedChip = null;

            // Make sure selectIndex doesn't go negative
            selectIndex = Math.max(index - 1, 0);
          }

          if (currChips.chipsData.length) {
            currChips.selectChip(selectIndex);
          }

          // left arrow key
        } else if (e.keyCode === 37) {
          if (currChips._selectedChip) {
            var _selectIndex = currChips._selectedChip.index() - 1;
            if (_selectIndex < 0) {
              return;
            }
            currChips.selectChip(_selectIndex);
          }

          // right arrow key
        } else if (e.keyCode === 39) {
          if (currChips._selectedChip) {
            var _selectIndex2 = currChips._selectedChip.index() + 1;

            if (_selectIndex2 >= currChips.chipsData.length) {
              currChips.$input[0].focus();
            } else {
              currChips.selectChip(_selectIndex2);
            }
          }
        }
      }

      /**
       * Handle Chips Keyup
       * @param {Event} e
       */

    }, {
      key: "_handleChipsKeyup",
      value: function _handleChipsKeyup(e) {
        Chips._keydown = false;
      }

      /**
       * Handle Chips Blur
       * @param {Event} e
       */

    }, {
      key: "_handleChipsBlur",
      value: function _handleChipsBlur(e) {
        if (!Chips._keydown) {
          var $chips = $(e.target).closest('.chips');
          var currChips = $chips[0].M_Chips;

          currChips._selectedChip = null;
        }
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Chips;
  }(Component);

  /**
   * @static
   * @memberof Chips
   */


  Chips._keydown = false;

  M.Chips = Chips;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Chips, 'chips', 'M_Chips');
  }

  $(document).ready(function () {
    // Handle removal of static chips.
    $(document.body).on('click', '.chip .close', function () {
      var $chips = $(this).closest('.chips');
      if ($chips.length && $chips[0].M_Chips) {
        return;
      }
      $(this).closest('.chip').remove();
    });
  });
})(cash);
;(function ($) {
  'use strict';

  var _defaults = {
    top: 0,
    bottom: Infinity,
    offset: 0,
    onPositionChange: null
  };

  /**
   * @class
   *
   */

  var Pushpin = function (_Component13) {
    _inherits(Pushpin, _Component13);

    /**
     * Construct Pushpin instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Pushpin(el, options) {
      _classCallCheck(this, Pushpin);

      var _this47 = _possibleConstructorReturn(this, (Pushpin.__proto__ || Object.getPrototypeOf(Pushpin)).call(this, Pushpin, el, options));

      _this47.el.M_Pushpin = _this47;

      /**
       * Options for the modal
       * @member Pushpin#options
       */
      _this47.options = $.extend({}, Pushpin.defaults, options);

      _this47.originalOffset = _this47.el.offsetTop;
      Pushpin._pushpins.push(_this47);
      _this47._setupEventHandlers();
      _this47._updatePosition();
      return _this47;
    }

    _createClass(Pushpin, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this.el.style.top = null;
        this._removePinClasses();
        this._removeEventHandlers();

        // Remove pushpin Inst
        var index = Pushpin._pushpins.indexOf(this);
        Pushpin._pushpins.splice(index, 1);
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        document.addEventListener('scroll', Pushpin._updateElements);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        document.removeEventListener('scroll', Pushpin._updateElements);
      }
    }, {
      key: "_updatePosition",
      value: function _updatePosition() {
        var scrolled = M.getDocumentScrollTop() + this.options.offset;

        if (this.options.top <= scrolled && this.options.bottom >= scrolled && !this.el.classList.contains('pinned')) {
          this._removePinClasses();
          this.el.style.top = this.options.offset + "px";
          this.el.classList.add('pinned');

          // onPositionChange callback
          if (typeof this.options.onPositionChange === 'function') {
            this.options.onPositionChange.call(this, 'pinned');
          }
        }

        // Add pin-top (when scrolled position is above top)
        if (scrolled < this.options.top && !this.el.classList.contains('pin-top')) {
          this._removePinClasses();
          this.el.style.top = 0;
          this.el.classList.add('pin-top');

          // onPositionChange callback
          if (typeof this.options.onPositionChange === 'function') {
            this.options.onPositionChange.call(this, 'pin-top');
          }
        }

        // Add pin-bottom (when scrolled position is below bottom)
        if (scrolled > this.options.bottom && !this.el.classList.contains('pin-bottom')) {
          this._removePinClasses();
          this.el.classList.add('pin-bottom');
          this.el.style.top = this.options.bottom - this.originalOffset + "px";

          // onPositionChange callback
          if (typeof this.options.onPositionChange === 'function') {
            this.options.onPositionChange.call(this, 'pin-bottom');
          }
        }
      }
    }, {
      key: "_removePinClasses",
      value: function _removePinClasses() {
        // IE 11 bug (can't remove multiple classes in one line)
        this.el.classList.remove('pin-top');
        this.el.classList.remove('pinned');
        this.el.classList.remove('pin-bottom');
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Pushpin.__proto__ || Object.getPrototypeOf(Pushpin), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Pushpin;
      }
    }, {
      key: "_updateElements",
      value: function _updateElements() {
        for (var elIndex in Pushpin._pushpins) {
          var pInstance = Pushpin._pushpins[elIndex];
          pInstance._updatePosition();
        }
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Pushpin;
  }(Component);

  /**
   * @static
   * @memberof Pushpin
   */


  Pushpin._pushpins = [];

  M.Pushpin = Pushpin;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Pushpin, 'pushpin', 'M_Pushpin');
  }
})(cash);
;(function ($, anim) {
  'use strict';

  var _defaults = {
    direction: 'top',
    hoverEnabled: true,
    toolbarEnabled: false
  };

  $.fn.reverse = [].reverse;

  /**
   * @class
   *
   */

  var FloatingActionButton = function (_Component14) {
    _inherits(FloatingActionButton, _Component14);

    /**
     * Construct FloatingActionButton instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function FloatingActionButton(el, options) {
      _classCallCheck(this, FloatingActionButton);

      var _this48 = _possibleConstructorReturn(this, (FloatingActionButton.__proto__ || Object.getPrototypeOf(FloatingActionButton)).call(this, FloatingActionButton, el, options));

      _this48.el.M_FloatingActionButton = _this48;

      /**
       * Options for the fab
       * @member FloatingActionButton#options
       * @prop {Boolean} [direction] - Direction fab menu opens
       * @prop {Boolean} [hoverEnabled=true] - Enable hover vs click
       * @prop {Boolean} [toolbarEnabled=false] - Enable toolbar transition
       */
      _this48.options = $.extend({}, FloatingActionButton.defaults, options);

      _this48.isOpen = false;
      _this48.$anchor = _this48.$el.children('a').first();
      _this48.$menu = _this48.$el.children('ul').first();
      _this48.$floatingBtns = _this48.$el.find('ul .btn-floating');
      _this48.$floatingBtnsReverse = _this48.$el.find('ul .btn-floating').reverse();
      _this48.offsetY = 0;
      _this48.offsetX = 0;

      _this48.$el.addClass("direction-" + _this48.options.direction);
      if (_this48.options.direction === 'top') {
        _this48.offsetY = 40;
      } else if (_this48.options.direction === 'right') {
        _this48.offsetX = -40;
      } else if (_this48.options.direction === 'bottom') {
        _this48.offsetY = -40;
      } else {
        _this48.offsetX = 40;
      }
      _this48._setupEventHandlers();
      return _this48;
    }

    _createClass(FloatingActionButton, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_FloatingActionButton = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleFABClickBound = this._handleFABClick.bind(this);
        this._handleOpenBound = this.open.bind(this);
        this._handleCloseBound = this.close.bind(this);

        if (this.options.hoverEnabled && !this.options.toolbarEnabled) {
          this.el.addEventListener('mouseenter', this._handleOpenBound);
          this.el.addEventListener('mouseleave', this._handleCloseBound);
        } else {
          this.el.addEventListener('click', this._handleFABClickBound);
        }
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (this.options.hoverEnabled && !this.options.toolbarEnabled) {
          this.el.removeEventListener('mouseenter', this._handleOpenBound);
          this.el.removeEventListener('mouseleave', this._handleCloseBound);
        } else {
          this.el.removeEventListener('click', this._handleFABClickBound);
        }
      }

      /**
       * Handle FAB Click
       */

    }, {
      key: "_handleFABClick",
      value: function _handleFABClick() {
        if (this.isOpen) {
          this.close();
        } else {
          this.open();
        }
      }

      /**
       * Handle Document Click
       * @param {Event} e
       */

    }, {
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(e) {
        if (!$(e.target).closest(this.$menu).length) {
          this.close();
        }
      }

      /**
       * Open FAB
       */

    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }

        if (this.options.toolbarEnabled) {
          this._animateInToolbar();
        } else {
          this._animateInFAB();
        }
        this.isOpen = true;
      }

      /**
       * Close FAB
       */

    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        if (this.options.toolbarEnabled) {
          window.removeEventListener('scroll', this._handleCloseBound, true);
          document.body.removeEventListener('click', this._handleDocumentClickBound, true);
          this._animateOutToolbar();
        } else {
          this._animateOutFAB();
        }
        this.isOpen = false;
      }

      /**
       * Classic FAB Menu open
       */

    }, {
      key: "_animateInFAB",
      value: function _animateInFAB() {
        var _this49 = this;

        this.$el.addClass('active');

        var time = 0;
        this.$floatingBtnsReverse.each(function (el) {
          anim({
            targets: el,
            opacity: 1,
            scale: [0.4, 1],
            translateY: [_this49.offsetY, 0],
            translateX: [_this49.offsetX, 0],
            duration: 275,
            delay: time,
            easing: 'easeInOutQuad'
          });
          time += 40;
        });
      }

      /**
       * Classic FAB Menu close
       */

    }, {
      key: "_animateOutFAB",
      value: function _animateOutFAB() {
        var _this50 = this;

        this.$floatingBtnsReverse.each(function (el) {
          anim.remove(el);
          anim({
            targets: el,
            opacity: 0,
            scale: 0.4,
            translateY: _this50.offsetY,
            translateX: _this50.offsetX,
            duration: 175,
            easing: 'easeOutQuad',
            complete: function () {
              _this50.$el.removeClass('active');
            }
          });
        });
      }

      /**
       * Toolbar transition Menu open
       */

    }, {
      key: "_animateInToolbar",
      value: function _animateInToolbar() {
        var _this51 = this;

        var scaleFactor = void 0;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var btnRect = this.el.getBoundingClientRect();
        var backdrop = $('<div class="fab-backdrop"></div>');
        var fabColor = this.$anchor.css('background-color');
        this.$anchor.append(backdrop);

        this.offsetX = btnRect.left - windowWidth / 2 + btnRect.width / 2;
        this.offsetY = windowHeight - btnRect.bottom;
        scaleFactor = windowWidth / backdrop[0].clientWidth;
        this.btnBottom = btnRect.bottom;
        this.btnLeft = btnRect.left;
        this.btnWidth = btnRect.width;

        // Set initial state
        this.$el.addClass('active');
        this.$el.css({
          'text-align': 'center',
          width: '100%',
          bottom: 0,
          left: 0,
          transform: 'translateX(' + this.offsetX + 'px)',
          transition: 'none'
        });
        this.$anchor.css({
          transform: 'translateY(' + -this.offsetY + 'px)',
          transition: 'none'
        });
        backdrop.css({
          'background-color': fabColor
        });

        setTimeout(function () {
          _this51.$el.css({
            transform: '',
            transition: 'transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s'
          });
          _this51.$anchor.css({
            overflow: 'visible',
            transform: '',
            transition: 'transform .2s'
          });

          setTimeout(function () {
            _this51.$el.css({
              overflow: 'hidden',
              'background-color': fabColor
            });
            backdrop.css({
              transform: 'scale(' + scaleFactor + ')',
              transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
            });
            _this51.$menu.children('li').children('a').css({
              opacity: 1
            });

            // Scroll to close.
            _this51._handleDocumentClickBound = _this51._handleDocumentClick.bind(_this51);
            window.addEventListener('scroll', _this51._handleCloseBound, true);
            document.body.addEventListener('click', _this51._handleDocumentClickBound, true);
          }, 100);
        }, 0);
      }

      /**
       * Toolbar transition Menu close
       */

    }, {
      key: "_animateOutToolbar",
      value: function _animateOutToolbar() {
        var _this52 = this;

        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var backdrop = this.$el.find('.fab-backdrop');
        var fabColor = this.$anchor.css('background-color');

        this.offsetX = this.btnLeft - windowWidth / 2 + this.btnWidth / 2;
        this.offsetY = windowHeight - this.btnBottom;

        // Hide backdrop
        this.$el.removeClass('active');
        this.$el.css({
          'background-color': 'transparent',
          transition: 'none'
        });
        this.$anchor.css({
          transition: 'none'
        });
        backdrop.css({
          transform: 'scale(0)',
          'background-color': fabColor
        });
        this.$menu.children('li').children('a').css({
          opacity: ''
        });

        setTimeout(function () {
          backdrop.remove();

          // Set initial state.
          _this52.$el.css({
            'text-align': '',
            width: '',
            bottom: '',
            left: '',
            overflow: '',
            'background-color': '',
            transform: 'translate3d(' + -_this52.offsetX + 'px,0,0)'
          });
          _this52.$anchor.css({
            overflow: '',
            transform: 'translate3d(0,' + _this52.offsetY + 'px,0)'
          });

          setTimeout(function () {
            _this52.$el.css({
              transform: 'translate3d(0,0,0)',
              transition: 'transform .2s'
            });
            _this52.$anchor.css({
              transform: 'translate3d(0,0,0)',
              transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
            });
          }, 20);
        }, 200);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(FloatingActionButton.__proto__ || Object.getPrototypeOf(FloatingActionButton), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_FloatingActionButton;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return FloatingActionButton;
  }(Component);

  M.FloatingActionButton = FloatingActionButton;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(FloatingActionButton, 'floatingActionButton', 'M_FloatingActionButton');
  }
})(cash, M.anime);
;(function ($) {
  'use strict';

  var _defaults = {
    // Close when date is selected
    autoClose: false,

    // the default output format for the input field value
    format: 'mmm dd, yyyy',

    // Used to create date object from current input string
    parse: null,

    // The initial date to view when first opened
    defaultDate: null,

    // Make the `defaultDate` the initial selected value
    setDefaultDate: false,

    disableWeekends: false,

    disableDayFn: null,

    // First day of week (0: Sunday, 1: Monday etc)
    firstDay: 0,

    // The earliest date that can be selected
    minDate: null,
    // Thelatest date that can be selected
    maxDate: null,

    // Number of years either side, or array of upper/lower range
    yearRange: 10,

    // used internally (don't config outside)
    minYear: 0,
    maxYear: 9999,
    minMonth: undefined,
    maxMonth: undefined,

    startRange: null,
    endRange: null,

    isRTL: false,

    // Render the month after year in the calendar title
    showMonthAfterYear: false,

    // Render days of the calendar grid that fall in the next or previous month
    showDaysInNextAndPreviousMonths: false,

    // Specify a DOM element to render the calendar in
    container: null,

    // Show clear button
    showClearBtn: false,

    // internationalization
    i18n: {
      cancel: 'Cancel',
      clear: 'Clear',
      done: 'Ok',
      previousMonth: '‹',
      nextMonth: '›',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weekdaysAbbrev: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    },

    // events array
    events: [],

    // callback function
    onSelect: null,
    onOpen: null,
    onClose: null,
    onDraw: null
  };

  /**
   * @class
   *
   */

  var Datepicker = function (_Component15) {
    _inherits(Datepicker, _Component15);

    /**
     * Construct Datepicker instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Datepicker(el, options) {
      _classCallCheck(this, Datepicker);

      var _this53 = _possibleConstructorReturn(this, (Datepicker.__proto__ || Object.getPrototypeOf(Datepicker)).call(this, Datepicker, el, options));

      _this53.el.M_Datepicker = _this53;

      _this53.options = $.extend({}, Datepicker.defaults, options);

      // make sure i18n defaults are not lost when only few i18n option properties are passed
      if (!!options && options.hasOwnProperty('i18n') && typeof options.i18n === 'object') {
        _this53.options.i18n = $.extend({}, Datepicker.defaults.i18n, options.i18n);
      }

      // Remove time component from minDate and maxDate options
      if (_this53.options.minDate) _this53.options.minDate.setHours(0, 0, 0, 0);
      if (_this53.options.maxDate) _this53.options.maxDate.setHours(0, 0, 0, 0);

      _this53.id = M.guid();

      _this53._setupVariables();
      _this53._insertHTMLIntoDOM();
      _this53._setupModal();

      _this53._setupEventHandlers();

      if (!_this53.options.defaultDate) {
        _this53.options.defaultDate = new Date(Date.parse(_this53.el.value));
      }

      var defDate = _this53.options.defaultDate;
      if (Datepicker._isDate(defDate)) {
        if (_this53.options.setDefaultDate) {
          _this53.setDate(defDate, true);
          _this53.setInputValue();
        } else {
          _this53.gotoDate(defDate);
        }
      } else {
        _this53.gotoDate(new Date());
      }

      /**
       * Describes open/close state of datepicker
       * @type {Boolean}
       */
      _this53.isOpen = false;
      return _this53;
    }

    _createClass(Datepicker, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.modal.destroy();
        $(this.modalEl).remove();
        this.destroySelects();
        this.el.M_Datepicker = undefined;
      }
    }, {
      key: "destroySelects",
      value: function destroySelects() {
        var oldYearSelect = this.calendarEl.querySelector('.orig-select-year');
        if (oldYearSelect) {
          M.FormSelect.getInstance(oldYearSelect).destroy();
        }
        var oldMonthSelect = this.calendarEl.querySelector('.orig-select-month');
        if (oldMonthSelect) {
          M.FormSelect.getInstance(oldMonthSelect).destroy();
        }
      }
    }, {
      key: "_insertHTMLIntoDOM",
      value: function _insertHTMLIntoDOM() {
        if (this.options.showClearBtn) {
          $(this.clearBtn).css({ visibility: '' });
          this.clearBtn.innerHTML = this.options.i18n.clear;
        }

        this.doneBtn.innerHTML = this.options.i18n.done;
        this.cancelBtn.innerHTML = this.options.i18n.cancel;

        if (this.options.container) {
          this.$modalEl.appendTo(this.options.container);
        } else {
          this.$modalEl.insertBefore(this.el);
        }
      }
    }, {
      key: "_setupModal",
      value: function _setupModal() {
        var _this54 = this;

        this.modalEl.id = 'modal-' + this.id;
        this.modal = M.Modal.init(this.modalEl, {
          onCloseEnd: function () {
            _this54.isOpen = false;
          }
        });
      }
    }, {
      key: "toString",
      value: function toString(format) {
        var _this55 = this;

        format = format || this.options.format;
        if (!Datepicker._isDate(this.date)) {
          return '';
        }

        var formatArray = format.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g);
        var formattedDate = formatArray.map(function (label) {
          if (_this55.formats[label]) {
            return _this55.formats[label]();
          }

          return label;
        }).join('');
        return formattedDate;
      }
    }, {
      key: "setDate",
      value: function setDate(date, preventOnSelect) {
        if (!date) {
          this.date = null;
          this._renderDateDisplay();
          return this.draw();
        }
        if (typeof date === 'string') {
          date = new Date(Date.parse(date));
        }
        if (!Datepicker._isDate(date)) {
          return;
        }

        var min = this.options.minDate,
            max = this.options.maxDate;

        if (Datepicker._isDate(min) && date < min) {
          date = min;
        } else if (Datepicker._isDate(max) && date > max) {
          date = max;
        }

        this.date = new Date(date.getTime());

        this._renderDateDisplay();

        Datepicker._setToStartOfDay(this.date);
        this.gotoDate(this.date);

        if (!preventOnSelect && typeof this.options.onSelect === 'function') {
          this.options.onSelect.call(this, this.date);
        }
      }
    }, {
      key: "setInputValue",
      value: function setInputValue() {
        this.el.value = this.toString();
        this.$el.trigger('change', { firedBy: this });
      }
    }, {
      key: "_renderDateDisplay",
      value: function _renderDateDisplay() {
        var displayDate = Datepicker._isDate(this.date) ? this.date : new Date();
        var i18n = this.options.i18n;
        var day = i18n.weekdaysShort[displayDate.getDay()];
        var month = i18n.monthsShort[displayDate.getMonth()];
        var date = displayDate.getDate();
        this.yearTextEl.innerHTML = displayDate.getFullYear();
        this.dateTextEl.innerHTML = day + ", " + month + " " + date;
      }

      /**
       * change view to a specific date
       */

    }, {
      key: "gotoDate",
      value: function gotoDate(date) {
        var newCalendar = true;

        if (!Datepicker._isDate(date)) {
          return;
        }

        if (this.calendars) {
          var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
              lastVisibleDate = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1),
              visibleDate = date.getTime();
          // get the end of the month
          lastVisibleDate.setMonth(lastVisibleDate.getMonth() + 1);
          lastVisibleDate.setDate(lastVisibleDate.getDate() - 1);
          newCalendar = visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate;
        }

        if (newCalendar) {
          this.calendars = [{
            month: date.getMonth(),
            year: date.getFullYear()
          }];
        }

        this.adjustCalendars();
      }
    }, {
      key: "adjustCalendars",
      value: function adjustCalendars() {
        this.calendars[0] = this.adjustCalendar(this.calendars[0]);
        this.draw();
      }
    }, {
      key: "adjustCalendar",
      value: function adjustCalendar(calendar) {
        if (calendar.month < 0) {
          calendar.year -= Math.ceil(Math.abs(calendar.month) / 12);
          calendar.month += 12;
        }
        if (calendar.month > 11) {
          calendar.year += Math.floor(Math.abs(calendar.month) / 12);
          calendar.month -= 12;
        }
        return calendar;
      }
    }, {
      key: "nextMonth",
      value: function nextMonth() {
        this.calendars[0].month++;
        this.adjustCalendars();
      }
    }, {
      key: "prevMonth",
      value: function prevMonth() {
        this.calendars[0].month--;
        this.adjustCalendars();
      }
    }, {
      key: "render",
      value: function render(year, month, randId) {
        var opts = this.options,
            now = new Date(),
            days = Datepicker._getDaysInMonth(year, month),
            before = new Date(year, month, 1).getDay(),
            data = [],
            row = [];
        Datepicker._setToStartOfDay(now);
        if (opts.firstDay > 0) {
          before -= opts.firstDay;
          if (before < 0) {
            before += 7;
          }
        }
        var previousMonth = month === 0 ? 11 : month - 1,
            nextMonth = month === 11 ? 0 : month + 1,
            yearOfPreviousMonth = month === 0 ? year - 1 : year,
            yearOfNextMonth = month === 11 ? year + 1 : year,
            daysInPreviousMonth = Datepicker._getDaysInMonth(yearOfPreviousMonth, previousMonth);
        var cells = days + before,
            after = cells;
        while (after > 7) {
          after -= 7;
        }
        cells += 7 - after;
        var isWeekSelected = false;
        for (var i = 0, r = 0; i < cells; i++) {
          var day = new Date(year, month, 1 + (i - before)),
              isSelected = Datepicker._isDate(this.date) ? Datepicker._compareDates(day, this.date) : false,
              isToday = Datepicker._compareDates(day, now),
              hasEvent = opts.events.indexOf(day.toDateString()) !== -1 ? true : false,
              isEmpty = i < before || i >= days + before,
              dayNumber = 1 + (i - before),
              monthNumber = month,
              yearNumber = year,
              isStartRange = opts.startRange && Datepicker._compareDates(opts.startRange, day),
              isEndRange = opts.endRange && Datepicker._compareDates(opts.endRange, day),
              isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
              isDisabled = opts.minDate && day < opts.minDate || opts.maxDate && day > opts.maxDate || opts.disableWeekends && Datepicker._isWeekend(day) || opts.disableDayFn && opts.disableDayFn(day);

          if (isEmpty) {
            if (i < before) {
              dayNumber = daysInPreviousMonth + dayNumber;
              monthNumber = previousMonth;
              yearNumber = yearOfPreviousMonth;
            } else {
              dayNumber = dayNumber - days;
              monthNumber = nextMonth;
              yearNumber = yearOfNextMonth;
            }
          }

          var dayConfig = {
            day: dayNumber,
            month: monthNumber,
            year: yearNumber,
            hasEvent: hasEvent,
            isSelected: isSelected,
            isToday: isToday,
            isDisabled: isDisabled,
            isEmpty: isEmpty,
            isStartRange: isStartRange,
            isEndRange: isEndRange,
            isInRange: isInRange,
            showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths
          };

          row.push(this.renderDay(dayConfig));

          if (++r === 7) {
            data.push(this.renderRow(row, opts.isRTL, isWeekSelected));
            row = [];
            r = 0;
            isWeekSelected = false;
          }
        }
        return this.renderTable(opts, data, randId);
      }
    }, {
      key: "renderDay",
      value: function renderDay(opts) {
        var arr = [];
        var ariaSelected = 'false';
        if (opts.isEmpty) {
          if (opts.showDaysInNextAndPreviousMonths) {
            arr.push('is-outside-current-month');
            arr.push('is-selection-disabled');
          } else {
            return '<td class="is-empty"></td>';
          }
        }
        if (opts.isDisabled) {
          arr.push('is-disabled');
        }

        if (opts.isToday) {
          arr.push('is-today');
        }
        if (opts.isSelected) {
          arr.push('is-selected');
          ariaSelected = 'true';
        }
        if (opts.hasEvent) {
          arr.push('has-event');
        }
        if (opts.isInRange) {
          arr.push('is-inrange');
        }
        if (opts.isStartRange) {
          arr.push('is-startrange');
        }
        if (opts.isEndRange) {
          arr.push('is-endrange');
        }
        return "<td data-day=\"" + opts.day + "\" class=\"" + arr.join(' ') + "\" aria-selected=\"" + ariaSelected + "\">" + ("<button class=\"datepicker-day-button\" type=\"button\" data-year=\"" + opts.year + "\" data-month=\"" + opts.month + "\" data-day=\"" + opts.day + "\">" + opts.day + "</button>") + '</td>';
      }
    }, {
      key: "renderRow",
      value: function renderRow(days, isRTL, isRowSelected) {
        return '<tr class="datepicker-row' + (isRowSelected ? ' is-selected' : '') + '">' + (isRTL ? days.reverse() : days).join('') + '</tr>';
      }
    }, {
      key: "renderTable",
      value: function renderTable(opts, data, randId) {
        return '<div class="datepicker-table-wrapper"><table cellpadding="0" cellspacing="0" class="datepicker-table" role="grid" aria-labelledby="' + randId + '">' + this.renderHead(opts) + this.renderBody(data) + '</table></div>';
      }
    }, {
      key: "renderHead",
      value: function renderHead(opts) {
        var i = void 0,
            arr = [];
        for (i = 0; i < 7; i++) {
          arr.push("<th scope=\"col\"><abbr title=\"" + this.renderDayName(opts, i) + "\">" + this.renderDayName(opts, i, true) + "</abbr></th>");
        }
        return '<thead><tr>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</tr></thead>';
      }
    }, {
      key: "renderBody",
      value: function renderBody(rows) {
        return '<tbody>' + rows.join('') + '</tbody>';
      }
    }, {
      key: "renderTitle",
      value: function renderTitle(instance, c, year, month, refYear, randId) {
        var i = void 0,
            j = void 0,
            arr = void 0,
            opts = this.options,
            isMinYear = year === opts.minYear,
            isMaxYear = year === opts.maxYear,
            html = '<div id="' + randId + '" class="datepicker-controls" role="heading" aria-live="assertive">',
            monthHtml = void 0,
            yearHtml = void 0,
            prev = true,
            next = true;

        for (arr = [], i = 0; i < 12; i++) {
          arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' + (i === month ? ' selected="selected"' : '') + (isMinYear && i < opts.minMonth || isMaxYear && i > opts.maxMonth ? 'disabled="disabled"' : '') + '>' + opts.i18n.months[i] + '</option>');
        }

        monthHtml = '<select class="datepicker-select orig-select-month" tabindex="-1">' + arr.join('') + '</select>';

        if ($.isArray(opts.yearRange)) {
          i = opts.yearRange[0];
          j = opts.yearRange[1] + 1;
        } else {
          i = year - opts.yearRange;
          j = 1 + year + opts.yearRange;
        }

        for (arr = []; i < j && i <= opts.maxYear; i++) {
          if (i >= opts.minYear) {
            arr.push("<option value=\"" + i + "\" " + (i === year ? 'selected="selected"' : '') + ">" + i + "</option>");
          }
        }

        yearHtml = "<select class=\"datepicker-select orig-select-year\" tabindex=\"-1\">" + arr.join('') + "</select>";

        var leftArrow = '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/><path d="M0-.5h24v24H0z" fill="none"/></svg>';
        html += "<button class=\"month-prev" + (prev ? '' : ' is-disabled') + "\" type=\"button\">" + leftArrow + "</button>";

        html += '<div class="selects-container">';
        if (opts.showMonthAfterYear) {
          html += yearHtml + monthHtml;
        } else {
          html += monthHtml + yearHtml;
        }
        html += '</div>';

        if (isMinYear && (month === 0 || opts.minMonth >= month)) {
          prev = false;
        }

        if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
          next = false;
        }

        var rightArrow = '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/><path d="M0-.25h24v24H0z" fill="none"/></svg>';
        html += "<button class=\"month-next" + (next ? '' : ' is-disabled') + "\" type=\"button\">" + rightArrow + "</button>";

        return html += '</div>';
      }

      /**
       * refresh the HTML
       */

    }, {
      key: "draw",
      value: function draw(force) {
        if (!this.isOpen && !force) {
          return;
        }
        var opts = this.options,
            minYear = opts.minYear,
            maxYear = opts.maxYear,
            minMonth = opts.minMonth,
            maxMonth = opts.maxMonth,
            html = '',
            randId = void 0;

        if (this._y <= minYear) {
          this._y = minYear;
          if (!isNaN(minMonth) && this._m < minMonth) {
            this._m = minMonth;
          }
        }
        if (this._y >= maxYear) {
          this._y = maxYear;
          if (!isNaN(maxMonth) && this._m > maxMonth) {
            this._m = maxMonth;
          }
        }

        randId = 'datepicker-title-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);

        for (var c = 0; c < 1; c++) {
          this._renderDateDisplay();
          html += this.renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year, randId) + this.render(this.calendars[c].year, this.calendars[c].month, randId);
        }

        this.destroySelects();

        this.calendarEl.innerHTML = html;

        // Init Materialize Select
        var yearSelect = this.calendarEl.querySelector('.orig-select-year');
        var monthSelect = this.calendarEl.querySelector('.orig-select-month');
        M.FormSelect.init(yearSelect, {
          classes: 'select-year',
          dropdownOptions: { container: document.body, constrainWidth: false }
        });
        M.FormSelect.init(monthSelect, {
          classes: 'select-month',
          dropdownOptions: { container: document.body, constrainWidth: false }
        });

        // Add change handlers for select
        yearSelect.addEventListener('change', this._handleYearChange.bind(this));
        monthSelect.addEventListener('change', this._handleMonthChange.bind(this));

        if (typeof this.options.onDraw === 'function') {
          this.options.onDraw(this);
        }
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        this._handleInputChangeBound = this._handleInputChange.bind(this);
        this._handleCalendarClickBound = this._handleCalendarClick.bind(this);
        this._finishSelectionBound = this._finishSelection.bind(this);
        this._handleMonthChange = this._handleMonthChange.bind(this);
        this._closeBound = this.close.bind(this);

        this.el.addEventListener('click', this._handleInputClickBound);
        this.el.addEventListener('keydown', this._handleInputKeydownBound);
        this.el.addEventListener('change', this._handleInputChangeBound);
        this.calendarEl.addEventListener('click', this._handleCalendarClickBound);
        this.doneBtn.addEventListener('click', this._finishSelectionBound);
        this.cancelBtn.addEventListener('click', this._closeBound);

        if (this.options.showClearBtn) {
          this._handleClearClickBound = this._handleClearClick.bind(this);
          this.clearBtn.addEventListener('click', this._handleClearClickBound);
        }
      }
    }, {
      key: "_setupVariables",
      value: function _setupVariables() {
        var _this56 = this;

        this.$modalEl = $(Datepicker._template);
        this.modalEl = this.$modalEl[0];

        this.calendarEl = this.modalEl.querySelector('.datepicker-calendar');

        this.yearTextEl = this.modalEl.querySelector('.year-text');
        this.dateTextEl = this.modalEl.querySelector('.date-text');
        if (this.options.showClearBtn) {
          this.clearBtn = this.modalEl.querySelector('.datepicker-clear');
        }
        this.doneBtn = this.modalEl.querySelector('.datepicker-done');
        this.cancelBtn = this.modalEl.querySelector('.datepicker-cancel');

        this.formats = {
          d: function () {
            return _this56.date.getDate();
          },
          dd: function () {
            var d = _this56.date.getDate();
            return (d < 10 ? '0' : '') + d;
          },
          ddd: function () {
            return _this56.options.i18n.weekdaysShort[_this56.date.getDay()];
          },
          dddd: function () {
            return _this56.options.i18n.weekdays[_this56.date.getDay()];
          },
          m: function () {
            return _this56.date.getMonth() + 1;
          },
          mm: function () {
            var m = _this56.date.getMonth() + 1;
            return (m < 10 ? '0' : '') + m;
          },
          mmm: function () {
            return _this56.options.i18n.monthsShort[_this56.date.getMonth()];
          },
          mmmm: function () {
            return _this56.options.i18n.months[_this56.date.getMonth()];
          },
          yy: function () {
            return ('' + _this56.date.getFullYear()).slice(2);
          },
          yyyy: function () {
            return _this56.date.getFullYear();
          }
        };
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('click', this._handleInputClickBound);
        this.el.removeEventListener('keydown', this._handleInputKeydownBound);
        this.el.removeEventListener('change', this._handleInputChangeBound);
        this.calendarEl.removeEventListener('click', this._handleCalendarClickBound);
      }
    }, {
      key: "_handleInputClick",
      value: function _handleInputClick() {
        this.open();
      }
    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        if (e.which === M.keys.ENTER) {
          e.preventDefault();
          this.open();
        }
      }
    }, {
      key: "_handleCalendarClick",
      value: function _handleCalendarClick(e) {
        if (!this.isOpen) {
          return;
        }

        var $target = $(e.target);
        if (!$target.hasClass('is-disabled')) {
          if ($target.hasClass('datepicker-day-button') && !$target.hasClass('is-empty') && !$target.parent().hasClass('is-disabled')) {
            this.setDate(new Date(e.target.getAttribute('data-year'), e.target.getAttribute('data-month'), e.target.getAttribute('data-day')));
            if (this.options.autoClose) {
              this._finishSelection();
            }
          } else if ($target.closest('.month-prev').length) {
            this.prevMonth();
          } else if ($target.closest('.month-next').length) {
            this.nextMonth();
          }
        }
      }
    }, {
      key: "_handleClearClick",
      value: function _handleClearClick() {
        this.date = null;
        this.setInputValue();
        this.close();
      }
    }, {
      key: "_handleMonthChange",
      value: function _handleMonthChange(e) {
        this.gotoMonth(e.target.value);
      }
    }, {
      key: "_handleYearChange",
      value: function _handleYearChange(e) {
        this.gotoYear(e.target.value);
      }

      /**
       * change view to a specific month (zero-index, e.g. 0: January)
       */

    }, {
      key: "gotoMonth",
      value: function gotoMonth(month) {
        if (!isNaN(month)) {
          this.calendars[0].month = parseInt(month, 10);
          this.adjustCalendars();
        }
      }

      /**
       * change view to a specific full year (e.g. "2012")
       */

    }, {
      key: "gotoYear",
      value: function gotoYear(year) {
        if (!isNaN(year)) {
          this.calendars[0].year = parseInt(year, 10);
          this.adjustCalendars();
        }
      }
    }, {
      key: "_handleInputChange",
      value: function _handleInputChange(e) {
        var date = void 0;

        // Prevent change event from being fired when triggered by the plugin
        if (e.firedBy === this) {
          return;
        }
        if (this.options.parse) {
          date = this.options.parse(this.el.value, this.options.format);
        } else {
          date = new Date(Date.parse(this.el.value));
        }

        if (Datepicker._isDate(date)) {
          this.setDate(date);
        }
      }
    }, {
      key: "renderDayName",
      value: function renderDayName(opts, day, abbr) {
        day += opts.firstDay;
        while (day >= 7) {
          day -= 7;
        }
        return abbr ? opts.i18n.weekdaysAbbrev[day] : opts.i18n.weekdays[day];
      }

      /**
       * Set input value to the selected date and close Datepicker
       */

    }, {
      key: "_finishSelection",
      value: function _finishSelection() {
        this.setInputValue();
        this.close();
      }

      /**
       * Open Datepicker
       */

    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }

        this.isOpen = true;
        if (typeof this.options.onOpen === 'function') {
          this.options.onOpen.call(this);
        }
        this.draw();
        this.modal.open();
        return this;
      }

      /**
       * Close Datepicker
       */

    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        this.isOpen = false;
        if (typeof this.options.onClose === 'function') {
          this.options.onClose.call(this);
        }
        this.modal.close();
        return this;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Datepicker.__proto__ || Object.getPrototypeOf(Datepicker), "init", this).call(this, this, els, options);
      }
    }, {
      key: "_isDate",
      value: function _isDate(obj) {
        return (/Date/.test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime())
        );
      }
    }, {
      key: "_isWeekend",
      value: function _isWeekend(date) {
        var day = date.getDay();
        return day === 0 || day === 6;
      }
    }, {
      key: "_setToStartOfDay",
      value: function _setToStartOfDay(date) {
        if (Datepicker._isDate(date)) date.setHours(0, 0, 0, 0);
      }
    }, {
      key: "_getDaysInMonth",
      value: function _getDaysInMonth(year, month) {
        return [31, Datepicker._isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
      }
    }, {
      key: "_isLeapYear",
      value: function _isLeapYear(year) {
        // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      }
    }, {
      key: "_compareDates",
      value: function _compareDates(a, b) {
        // weak date comparison (use setToStartOfDay(date) to ensure correct result)
        return a.getTime() === b.getTime();
      }
    }, {
      key: "_setToStartOfDay",
      value: function _setToStartOfDay(date) {
        if (Datepicker._isDate(date)) date.setHours(0, 0, 0, 0);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Datepicker;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Datepicker;
  }(Component);

  Datepicker._template = ['<div class= "modal datepicker-modal">', '<div class="modal-content datepicker-container">', '<div class="datepicker-date-display">', '<span class="year-text"></span>', '<span class="date-text"></span>', '</div>', '<div class="datepicker-calendar-container">', '<div class="datepicker-calendar"></div>', '<div class="datepicker-footer">', '<button class="btn-flat datepicker-clear waves-effect" style="visibility: hidden;" type="button"></button>', '<div class="confirmation-btns">', '<button class="btn-flat datepicker-cancel waves-effect" type="button"></button>', '<button class="btn-flat datepicker-done waves-effect" type="button"></button>', '</div>', '</div>', '</div>', '</div>', '</div>'].join('');

  M.Datepicker = Datepicker;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Datepicker, 'datepicker', 'M_Datepicker');
  }
})(cash);
;(function ($) {
  'use strict';

  var _defaults = {
    dialRadius: 135,
    outerRadius: 105,
    innerRadius: 70,
    tickRadius: 20,
    duration: 350,
    container: null,
    defaultTime: 'now', // default time, 'now' or '13:14' e.g.
    fromNow: 0, // Millisecond offset from the defaultTime
    showClearBtn: false,

    // internationalization
    i18n: {
      cancel: 'Cancel',
      clear: 'Clear',
      done: 'Ok'
    },

    autoClose: false, // auto close when minute is selected
    twelveHour: true, // change to 12 hour AM/PM clock from 24 hour
    vibrate: true, // vibrate the device when dragging clock hand

    // Callbacks
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    onSelect: null
  };

  /**
   * @class
   *
   */

  var Timepicker = function (_Component16) {
    _inherits(Timepicker, _Component16);

    function Timepicker(el, options) {
      _classCallCheck(this, Timepicker);

      var _this57 = _possibleConstructorReturn(this, (Timepicker.__proto__ || Object.getPrototypeOf(Timepicker)).call(this, Timepicker, el, options));

      _this57.el.M_Timepicker = _this57;

      _this57.options = $.extend({}, Timepicker.defaults, options);

      _this57.id = M.guid();
      _this57._insertHTMLIntoDOM();
      _this57._setupModal();
      _this57._setupVariables();
      _this57._setupEventHandlers();

      _this57._clockSetup();
      _this57._pickerSetup();
      return _this57;
    }

    _createClass(Timepicker, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.modal.destroy();
        $(this.modalEl).remove();
        this.el.M_Timepicker = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        this._handleClockClickStartBound = this._handleClockClickStart.bind(this);
        this._handleDocumentClickMoveBound = this._handleDocumentClickMove.bind(this);
        this._handleDocumentClickEndBound = this._handleDocumentClickEnd.bind(this);

        this.el.addEventListener('click', this._handleInputClickBound);
        this.el.addEventListener('keydown', this._handleInputKeydownBound);
        this.plate.addEventListener('mousedown', this._handleClockClickStartBound);
        this.plate.addEventListener('touchstart', this._handleClockClickStartBound);

        $(this.spanHours).on('click', this.showView.bind(this, 'hours'));
        $(this.spanMinutes).on('click', this.showView.bind(this, 'minutes'));
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('click', this._handleInputClickBound);
        this.el.removeEventListener('keydown', this._handleInputKeydownBound);
      }
    }, {
      key: "_handleInputClick",
      value: function _handleInputClick() {
        this.open();
      }
    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        if (e.which === M.keys.ENTER) {
          e.preventDefault();
          this.open();
        }
      }
    }, {
      key: "_handleClockClickStart",
      value: function _handleClockClickStart(e) {
        e.preventDefault();
        var clockPlateBR = this.plate.getBoundingClientRect();
        var offset = { x: clockPlateBR.left, y: clockPlateBR.top };

        this.x0 = offset.x + this.options.dialRadius;
        this.y0 = offset.y + this.options.dialRadius;
        this.moved = false;
        var clickPos = Timepicker._Pos(e);
        this.dx = clickPos.x - this.x0;
        this.dy = clickPos.y - this.y0;

        // Set clock hands
        this.setHand(this.dx, this.dy, false);

        // Mousemove on document
        document.addEventListener('mousemove', this._handleDocumentClickMoveBound);
        document.addEventListener('touchmove', this._handleDocumentClickMoveBound);

        // Mouseup on document
        document.addEventListener('mouseup', this._handleDocumentClickEndBound);
        document.addEventListener('touchend', this._handleDocumentClickEndBound);
      }
    }, {
      key: "_handleDocumentClickMove",
      value: function _handleDocumentClickMove(e) {
        e.preventDefault();
        var clickPos = Timepicker._Pos(e);
        var x = clickPos.x - this.x0;
        var y = clickPos.y - this.y0;
        this.moved = true;
        this.setHand(x, y, false, true);
      }
    }, {
      key: "_handleDocumentClickEnd",
      value: function _handleDocumentClickEnd(e) {
        var _this58 = this;

        e.preventDefault();
        document.removeEventListener('mouseup', this._handleDocumentClickEndBound);
        document.removeEventListener('touchend', this._handleDocumentClickEndBound);
        var clickPos = Timepicker._Pos(e);
        var x = clickPos.x - this.x0;
        var y = clickPos.y - this.y0;
        if (this.moved && x === this.dx && y === this.dy) {
          this.setHand(x, y);
        }

        if (this.currentView === 'hours') {
          this.showView('minutes', this.options.duration / 2);
        } else if (this.options.autoClose) {
          $(this.minutesView).addClass('timepicker-dial-out');
          setTimeout(function () {
            _this58.done();
          }, this.options.duration / 2);
        }

        if (typeof this.options.onSelect === 'function') {
          this.options.onSelect.call(this, this.hours, this.minutes);
        }

        // Unbind mousemove event
        document.removeEventListener('mousemove', this._handleDocumentClickMoveBound);
        document.removeEventListener('touchmove', this._handleDocumentClickMoveBound);
      }
    }, {
      key: "_insertHTMLIntoDOM",
      value: function _insertHTMLIntoDOM() {
        this.$modalEl = $(Timepicker._template);
        this.modalEl = this.$modalEl[0];
        this.modalEl.id = 'modal-' + this.id;

        // Append popover to input by default
        var containerEl = document.querySelector(this.options.container);
        if (this.options.container && !!containerEl) {
          this.$modalEl.appendTo(containerEl);
        } else {
          this.$modalEl.insertBefore(this.el);
        }
      }
    }, {
      key: "_setupModal",
      value: function _setupModal() {
        var _this59 = this;

        this.modal = M.Modal.init(this.modalEl, {
          onOpenStart: this.options.onOpenStart,
          onOpenEnd: this.options.onOpenEnd,
          onCloseStart: this.options.onCloseStart,
          onCloseEnd: function () {
            if (typeof _this59.options.onCloseEnd === 'function') {
              _this59.options.onCloseEnd.call(_this59);
            }
            _this59.isOpen = false;
          }
        });
      }
    }, {
      key: "_setupVariables",
      value: function _setupVariables() {
        this.currentView = 'hours';
        this.vibrate = navigator.vibrate ? 'vibrate' : navigator.webkitVibrate ? 'webkitVibrate' : null;

        this._canvas = this.modalEl.querySelector('.timepicker-canvas');
        this.plate = this.modalEl.querySelector('.timepicker-plate');

        this.hoursView = this.modalEl.querySelector('.timepicker-hours');
        this.minutesView = this.modalEl.querySelector('.timepicker-minutes');
        this.spanHours = this.modalEl.querySelector('.timepicker-span-hours');
        this.spanMinutes = this.modalEl.querySelector('.timepicker-span-minutes');
        this.spanAmPm = this.modalEl.querySelector('.timepicker-span-am-pm');
        this.footer = this.modalEl.querySelector('.timepicker-footer');
        this.amOrPm = 'PM';
      }
    }, {
      key: "_pickerSetup",
      value: function _pickerSetup() {
        var $clearBtn = $("<button class=\"btn-flat timepicker-clear waves-effect\" style=\"visibility: hidden;\" type=\"button\" tabindex=\"" + (this.options.twelveHour ? '3' : '1') + "\">" + this.options.i18n.clear + "</button>").appendTo(this.footer).on('click', this.clear.bind(this));
        if (this.options.showClearBtn) {
          $clearBtn.css({ visibility: '' });
        }

        var confirmationBtnsContainer = $('<div class="confirmation-btns"></div>');
        $('<button class="btn-flat timepicker-close waves-effect" type="button" tabindex="' + (this.options.twelveHour ? '3' : '1') + '">' + this.options.i18n.cancel + '</button>').appendTo(confirmationBtnsContainer).on('click', this.close.bind(this));
        $('<button class="btn-flat timepicker-close waves-effect" type="button" tabindex="' + (this.options.twelveHour ? '3' : '1') + '">' + this.options.i18n.done + '</button>').appendTo(confirmationBtnsContainer).on('click', this.done.bind(this));
        confirmationBtnsContainer.appendTo(this.footer);
      }
    }, {
      key: "_clockSetup",
      value: function _clockSetup() {
        if (this.options.twelveHour) {
          this.$amBtn = $('<div class="am-btn">AM</div>');
          this.$pmBtn = $('<div class="pm-btn">PM</div>');
          this.$amBtn.on('click', this._handleAmPmClick.bind(this)).appendTo(this.spanAmPm);
          this.$pmBtn.on('click', this._handleAmPmClick.bind(this)).appendTo(this.spanAmPm);
        }

        this._buildHoursView();
        this._buildMinutesView();
        this._buildSVGClock();
      }
    }, {
      key: "_buildSVGClock",
      value: function _buildSVGClock() {
        // Draw clock hands and others
        var dialRadius = this.options.dialRadius;
        var tickRadius = this.options.tickRadius;
        var diameter = dialRadius * 2;

        var svg = Timepicker._createSVGEl('svg');
        svg.setAttribute('class', 'timepicker-svg');
        svg.setAttribute('width', diameter);
        svg.setAttribute('height', diameter);
        var g = Timepicker._createSVGEl('g');
        g.setAttribute('transform', 'translate(' + dialRadius + ',' + dialRadius + ')');
        var bearing = Timepicker._createSVGEl('circle');
        bearing.setAttribute('class', 'timepicker-canvas-bearing');
        bearing.setAttribute('cx', 0);
        bearing.setAttribute('cy', 0);
        bearing.setAttribute('r', 4);
        var hand = Timepicker._createSVGEl('line');
        hand.setAttribute('x1', 0);
        hand.setAttribute('y1', 0);
        var bg = Timepicker._createSVGEl('circle');
        bg.setAttribute('class', 'timepicker-canvas-bg');
        bg.setAttribute('r', tickRadius);
        g.appendChild(hand);
        g.appendChild(bg);
        g.appendChild(bearing);
        svg.appendChild(g);
        this._canvas.appendChild(svg);

        this.hand = hand;
        this.bg = bg;
        this.bearing = bearing;
        this.g = g;
      }
    }, {
      key: "_buildHoursView",
      value: function _buildHoursView() {
        var $tick = $('<div class="timepicker-tick"></div>');
        // Hours view
        if (this.options.twelveHour) {
          for (var i = 1; i < 13; i += 1) {
            var tick = $tick.clone();
            var radian = i / 6 * Math.PI;
            var radius = this.options.outerRadius;
            tick.css({
              left: this.options.dialRadius + Math.sin(radian) * radius - this.options.tickRadius + 'px',
              top: this.options.dialRadius - Math.cos(radian) * radius - this.options.tickRadius + 'px'
            });
            tick.html(i === 0 ? '00' : i);
            this.hoursView.appendChild(tick[0]);
            // tick.on(mousedownEvent, mousedown);
          }
        } else {
          for (var _i2 = 0; _i2 < 24; _i2 += 1) {
            var _tick = $tick.clone();
            var _radian = _i2 / 6 * Math.PI;
            var inner = _i2 > 0 && _i2 < 13;
            var _radius = inner ? this.options.innerRadius : this.options.outerRadius;
            _tick.css({
              left: this.options.dialRadius + Math.sin(_radian) * _radius - this.options.tickRadius + 'px',
              top: this.options.dialRadius - Math.cos(_radian) * _radius - this.options.tickRadius + 'px'
            });
            _tick.html(_i2 === 0 ? '00' : _i2);
            this.hoursView.appendChild(_tick[0]);
            // tick.on(mousedownEvent, mousedown);
          }
        }
      }
    }, {
      key: "_buildMinutesView",
      value: function _buildMinutesView() {
        var $tick = $('<div class="timepicker-tick"></div>');
        // Minutes view
        for (var i = 0; i < 60; i += 5) {
          var tick = $tick.clone();
          var radian = i / 30 * Math.PI;
          tick.css({
            left: this.options.dialRadius + Math.sin(radian) * this.options.outerRadius - this.options.tickRadius + 'px',
            top: this.options.dialRadius - Math.cos(radian) * this.options.outerRadius - this.options.tickRadius + 'px'
          });
          tick.html(Timepicker._addLeadingZero(i));
          this.minutesView.appendChild(tick[0]);
        }
      }
    }, {
      key: "_handleAmPmClick",
      value: function _handleAmPmClick(e) {
        var $btnClicked = $(e.target);
        this.amOrPm = $btnClicked.hasClass('am-btn') ? 'AM' : 'PM';
        this._updateAmPmView();
      }
    }, {
      key: "_updateAmPmView",
      value: function _updateAmPmView() {
        if (this.options.twelveHour) {
          this.$amBtn.toggleClass('text-primary', this.amOrPm === 'AM');
          this.$pmBtn.toggleClass('text-primary', this.amOrPm === 'PM');
        }
      }
    }, {
      key: "_updateTimeFromInput",
      value: function _updateTimeFromInput() {
        // Get the time
        var value = ((this.el.value || this.options.defaultTime || '') + '').split(':');
        if (this.options.twelveHour && !(typeof value[1] === 'undefined')) {
          if (value[1].toUpperCase().indexOf('AM') > 0) {
            this.amOrPm = 'AM';
          } else {
            this.amOrPm = 'PM';
          }
          value[1] = value[1].replace('AM', '').replace('PM', '');
        }
        if (value[0] === 'now') {
          var now = new Date(+new Date() + this.options.fromNow);
          value = [now.getHours(), now.getMinutes()];
          if (this.options.twelveHour) {
            this.amOrPm = value[0] >= 12 && value[0] < 24 ? 'PM' : 'AM';
          }
        }
        this.hours = +value[0] || 0;
        this.minutes = +value[1] || 0;
        this.spanHours.innerHTML = this.hours;
        this.spanMinutes.innerHTML = Timepicker._addLeadingZero(this.minutes);

        this._updateAmPmView();
      }
    }, {
      key: "showView",
      value: function showView(view, delay) {
        if (view === 'minutes' && $(this.hoursView).css('visibility') === 'visible') {
          // raiseCallback(this.options.beforeHourSelect);
        }
        var isHours = view === 'hours',
            nextView = isHours ? this.hoursView : this.minutesView,
            hideView = isHours ? this.minutesView : this.hoursView;
        this.currentView = view;

        $(this.spanHours).toggleClass('text-primary', isHours);
        $(this.spanMinutes).toggleClass('text-primary', !isHours);

        // Transition view
        hideView.classList.add('timepicker-dial-out');
        $(nextView).css('visibility', 'visible').removeClass('timepicker-dial-out');

        // Reset clock hand
        this.resetClock(delay);

        // After transitions ended
        clearTimeout(this.toggleViewTimer);
        this.toggleViewTimer = setTimeout(function () {
          $(hideView).css('visibility', 'hidden');
        }, this.options.duration);
      }
    }, {
      key: "resetClock",
      value: function resetClock(delay) {
        var view = this.currentView,
            value = this[view],
            isHours = view === 'hours',
            unit = Math.PI / (isHours ? 6 : 30),
            radian = value * unit,
            radius = isHours && value > 0 && value < 13 ? this.options.innerRadius : this.options.outerRadius,
            x = Math.sin(radian) * radius,
            y = -Math.cos(radian) * radius,
            self = this;

        if (delay) {
          $(this.canvas).addClass('timepicker-canvas-out');
          setTimeout(function () {
            $(self.canvas).removeClass('timepicker-canvas-out');
            self.setHand(x, y);
          }, delay);
        } else {
          this.setHand(x, y);
        }
      }
    }, {
      key: "setHand",
      value: function setHand(x, y, roundBy5) {
        var _this60 = this;

        var radian = Math.atan2(x, -y),
            isHours = this.currentView === 'hours',
            unit = Math.PI / (isHours || roundBy5 ? 6 : 30),
            z = Math.sqrt(x * x + y * y),
            inner = isHours && z < (this.options.outerRadius + this.options.innerRadius) / 2,
            radius = inner ? this.options.innerRadius : this.options.outerRadius;

        if (this.options.twelveHour) {
          radius = this.options.outerRadius;
        }

        // Radian should in range [0, 2PI]
        if (radian < 0) {
          radian = Math.PI * 2 + radian;
        }

        // Get the round value
        var value = Math.round(radian / unit);

        // Get the round radian
        radian = value * unit;

        // Correct the hours or minutes
        if (this.options.twelveHour) {
          if (isHours) {
            if (value === 0) value = 12;
          } else {
            if (roundBy5) value *= 5;
            if (value === 60) value = 0;
          }
        } else {
          if (isHours) {
            if (value === 12) {
              value = 0;
            }
            value = inner ? value === 0 ? 12 : value : value === 0 ? 0 : value + 12;
          } else {
            if (roundBy5) {
              value *= 5;
            }
            if (value === 60) {
              value = 0;
            }
          }
        }

        // Once hours or minutes changed, vibrate the device
        if (this[this.currentView] !== value) {
          if (this.vibrate && this.options.vibrate) {
            // Do not vibrate too frequently
            if (!this.vibrateTimer) {
              navigator[this.vibrate](10);
              this.vibrateTimer = setTimeout(function () {
                _this60.vibrateTimer = null;
              }, 100);
            }
          }
        }

        this[this.currentView] = value;
        if (isHours) {
          this['spanHours'].innerHTML = value;
        } else {
          this['spanMinutes'].innerHTML = Timepicker._addLeadingZero(value);
        }

        // Set clock hand and others' position
        var cx1 = Math.sin(radian) * (radius - this.options.tickRadius),
            cy1 = -Math.cos(radian) * (radius - this.options.tickRadius),
            cx2 = Math.sin(radian) * radius,
            cy2 = -Math.cos(radian) * radius;
        this.hand.setAttribute('x2', cx1);
        this.hand.setAttribute('y2', cy1);
        this.bg.setAttribute('cx', cx2);
        this.bg.setAttribute('cy', cy2);
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }

        this.isOpen = true;
        this._updateTimeFromInput();
        this.showView('hours');

        this.modal.open();
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        this.isOpen = false;
        this.modal.close();
      }

      /**
       * Finish timepicker selection.
       */

    }, {
      key: "done",
      value: function done(e, clearValue) {
        // Set input value
        var last = this.el.value;
        var value = clearValue ? '' : Timepicker._addLeadingZero(this.hours) + ':' + Timepicker._addLeadingZero(this.minutes);
        this.time = value;
        if (!clearValue && this.options.twelveHour) {
          value = value + " " + this.amOrPm;
        }
        this.el.value = value;

        // Trigger change event
        if (value !== last) {
          this.$el.trigger('change');
        }

        this.close();
        this.el.focus();
      }
    }, {
      key: "clear",
      value: function clear() {
        this.done(null, true);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Timepicker.__proto__ || Object.getPrototypeOf(Timepicker), "init", this).call(this, this, els, options);
      }
    }, {
      key: "_addLeadingZero",
      value: function _addLeadingZero(num) {
        return (num < 10 ? '0' : '') + num;
      }
    }, {
      key: "_createSVGEl",
      value: function _createSVGEl(name) {
        var svgNS = 'http://www.w3.org/2000/svg';
        return document.createElementNS(svgNS, name);
      }

      /**
       * @typedef {Object} Point
       * @property {number} x The X Coordinate
       * @property {number} y The Y Coordinate
       */

      /**
       * Get x position of mouse or touch event
       * @param {Event} e
       * @return {Point} x and y location
       */

    }, {
      key: "_Pos",
      value: function _Pos(e) {
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY };
        }
        // mouse event
        return { x: e.clientX, y: e.clientY };
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Timepicker;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Timepicker;
  }(Component);

  Timepicker._template = ['<div class= "modal timepicker-modal">', '<div class="modal-content timepicker-container">', '<div class="timepicker-digital-display">', '<div class="timepicker-text-container">', '<div class="timepicker-display-column">', '<span class="timepicker-span-hours text-primary"></span>', ':', '<span class="timepicker-span-minutes"></span>', '</div>', '<div class="timepicker-display-column timepicker-display-am-pm">', '<div class="timepicker-span-am-pm"></div>', '</div>', '</div>', '</div>', '<div class="timepicker-analog-display">', '<div class="timepicker-plate">', '<div class="timepicker-canvas"></div>', '<div class="timepicker-dial timepicker-hours"></div>', '<div class="timepicker-dial timepicker-minutes timepicker-dial-out"></div>', '</div>', '<div class="timepicker-footer"></div>', '</div>', '</div>', '</div>'].join('');

  M.Timepicker = Timepicker;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Timepicker, 'timepicker', 'M_Timepicker');
  }
})(cash);
;(function ($) {
  'use strict';

  var _defaults = {};

  /**
   * @class
   *
   */

  var CharacterCounter = function (_Component17) {
    _inherits(CharacterCounter, _Component17);

    /**
     * Construct CharacterCounter instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function CharacterCounter(el, options) {
      _classCallCheck(this, CharacterCounter);

      var _this61 = _possibleConstructorReturn(this, (CharacterCounter.__proto__ || Object.getPrototypeOf(CharacterCounter)).call(this, CharacterCounter, el, options));

      _this61.el.M_CharacterCounter = _this61;

      /**
       * Options for the character counter
       */
      _this61.options = $.extend({}, CharacterCounter.defaults, options);

      _this61.isInvalid = false;
      _this61.isValidLength = false;
      _this61._setupCounter();
      _this61._setupEventHandlers();
      return _this61;
    }

    _createClass(CharacterCounter, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.CharacterCounter = undefined;
        this._removeCounter();
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleUpdateCounterBound = this.updateCounter.bind(this);

        this.el.addEventListener('focus', this._handleUpdateCounterBound, true);
        this.el.addEventListener('input', this._handleUpdateCounterBound, true);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('focus', this._handleUpdateCounterBound, true);
        this.el.removeEventListener('input', this._handleUpdateCounterBound, true);
      }

      /**
       * Setup counter element
       */

    }, {
      key: "_setupCounter",
      value: function _setupCounter() {
        this.counterEl = document.createElement('span');
        $(this.counterEl).addClass('character-counter').css({
          float: 'right',
          'font-size': '12px',
          height: 1
        });

        this.$el.parent().append(this.counterEl);
      }

      /**
       * Remove counter element
       */

    }, {
      key: "_removeCounter",
      value: function _removeCounter() {
        $(this.counterEl).remove();
      }

      /**
       * Update counter
       */

    }, {
      key: "updateCounter",
      value: function updateCounter() {
        var maxLength = +this.$el.attr('data-length'),
            actualLength = this.el.value.length;
        this.isValidLength = actualLength <= maxLength;
        var counterString = actualLength;

        if (maxLength) {
          counterString += '/' + maxLength;
          this._validateInput();
        }

        $(this.counterEl).html(counterString);
      }

      /**
       * Add validation classes
       */

    }, {
      key: "_validateInput",
      value: function _validateInput() {
        if (this.isValidLength && this.isInvalid) {
          this.isInvalid = false;
          this.$el.removeClass('invalid');
        } else if (!this.isValidLength && !this.isInvalid) {
          this.isInvalid = true;
          this.$el.removeClass('valid');
          this.$el.addClass('invalid');
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(CharacterCounter.__proto__ || Object.getPrototypeOf(CharacterCounter), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_CharacterCounter;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return CharacterCounter;
  }(Component);

  M.CharacterCounter = CharacterCounter;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(CharacterCounter, 'characterCounter', 'M_CharacterCounter');
  }
})(cash);
;(function ($) {
  'use strict';

  var _defaults = {
    duration: 200, // ms
    dist: -100, // zoom scale TODO: make this more intuitive as an option
    shift: 0, // spacing for center image
    padding: 0, // Padding between non center items
    numVisible: 5, // Number of visible items in carousel
    fullWidth: false, // Change to full width styles
    indicators: false, // Toggle indicators
    noWrap: false, // Don't wrap around and cycle through items.
    onCycleTo: null // Callback for when a new slide is cycled to.
  };

  /**
   * @class
   *
   */

  var Carousel = function (_Component18) {
    _inherits(Carousel, _Component18);

    /**
     * Construct Carousel instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Carousel(el, options) {
      _classCallCheck(this, Carousel);

      var _this62 = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, Carousel, el, options));

      _this62.el.M_Carousel = _this62;

      /**
       * Options for the carousel
       * @member Carousel#options
       * @prop {Number} duration
       * @prop {Number} dist
       * @prop {Number} shift
       * @prop {Number} padding
       * @prop {Number} numVisible
       * @prop {Boolean} fullWidth
       * @prop {Boolean} indicators
       * @prop {Boolean} noWrap
       * @prop {Function} onCycleTo
       */
      _this62.options = $.extend({}, Carousel.defaults, options);

      // Setup
      _this62.hasMultipleSlides = _this62.$el.find('.carousel-item').length > 1;
      _this62.showIndicators = _this62.options.indicators && _this62.hasMultipleSlides;
      _this62.noWrap = _this62.options.noWrap || !_this62.hasMultipleSlides;
      _this62.pressed = false;
      _this62.dragged = false;
      _this62.offset = _this62.target = 0;
      _this62.images = [];
      _this62.itemWidth = _this62.$el.find('.carousel-item').first().innerWidth();
      _this62.itemHeight = _this62.$el.find('.carousel-item').first().innerHeight();
      _this62.dim = _this62.itemWidth * 2 + _this62.options.padding || 1; // Make sure dim is non zero for divisions.
      _this62._autoScrollBound = _this62._autoScroll.bind(_this62);
      _this62._trackBound = _this62._track.bind(_this62);

      // Full Width carousel setup
      if (_this62.options.fullWidth) {
        _this62.options.dist = 0;
        _this62._setCarouselHeight();

        // Offset fixed items when indicators.
        if (_this62.showIndicators) {
          _this62.$el.find('.carousel-fixed-item').addClass('with-indicators');
        }
      }

      // Iterate through slides
      _this62.$indicators = $('<ul class="indicators"></ul>');
      _this62.$el.find('.carousel-item').each(function (el, i) {
        _this62.images.push(el);
        if (_this62.showIndicators) {
          var $indicator = $('<li class="indicator-item"></li>');

          // Add active to first by default.
          if (i === 0) {
            $indicator[0].classList.add('active');
          }

          _this62.$indicators.append($indicator);
        }
      });
      if (_this62.showIndicators) {
        _this62.$el.append(_this62.$indicators);
      }
      _this62.count = _this62.images.length;

      // Cap numVisible at count
      _this62.options.numVisible = Math.min(_this62.count, _this62.options.numVisible);

      // Setup cross browser string
      _this62.xform = 'transform';
      ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
        var e = prefix + 'Transform';
        if (typeof document.body.style[e] !== 'undefined') {
          _this62.xform = e;
          return false;
        }
        return true;
      });

      _this62._setupEventHandlers();
      _this62._scroll(_this62.offset);
      return _this62;
    }

    _createClass(Carousel, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_Carousel = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this63 = this;

        this._handleCarouselTapBound = this._handleCarouselTap.bind(this);
        this._handleCarouselDragBound = this._handleCarouselDrag.bind(this);
        this._handleCarouselReleaseBound = this._handleCarouselRelease.bind(this);
        this._handleCarouselClickBound = this._handleCarouselClick.bind(this);

        if (typeof window.ontouchstart !== 'undefined') {
          this.el.addEventListener('touchstart', this._handleCarouselTapBound);
          this.el.addEventListener('touchmove', this._handleCarouselDragBound);
          this.el.addEventListener('touchend', this._handleCarouselReleaseBound);
        }

        this.el.addEventListener('mousedown', this._handleCarouselTapBound);
        this.el.addEventListener('mousemove', this._handleCarouselDragBound);
        this.el.addEventListener('mouseup', this._handleCarouselReleaseBound);
        this.el.addEventListener('mouseleave', this._handleCarouselReleaseBound);
        this.el.addEventListener('click', this._handleCarouselClickBound);

        if (this.showIndicators && this.$indicators) {
          this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this);
          this.$indicators.find('.indicator-item').each(function (el, i) {
            el.addEventListener('click', _this63._handleIndicatorClickBound);
          });
        }

        // Resize
        var throttledResize = M.throttle(this._handleResize, 200);
        this._handleThrottledResizeBound = throttledResize.bind(this);

        window.addEventListener('resize', this._handleThrottledResizeBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this64 = this;

        if (typeof window.ontouchstart !== 'undefined') {
          this.el.removeEventListener('touchstart', this._handleCarouselTapBound);
          this.el.removeEventListener('touchmove', this._handleCarouselDragBound);
          this.el.removeEventListener('touchend', this._handleCarouselReleaseBound);
        }
        this.el.removeEventListener('mousedown', this._handleCarouselTapBound);
        this.el.removeEventListener('mousemove', this._handleCarouselDragBound);
        this.el.removeEventListener('mouseup', this._handleCarouselReleaseBound);
        this.el.removeEventListener('mouseleave', this._handleCarouselReleaseBound);
        this.el.removeEventListener('click', this._handleCarouselClickBound);

        if (this.showIndicators && this.$indicators) {
          this.$indicators.find('.indicator-item').each(function (el, i) {
            el.removeEventListener('click', _this64._handleIndicatorClickBound);
          });
        }

        window.removeEventListener('resize', this._handleThrottledResizeBound);
      }

      /**
       * Handle Carousel Tap
       * @param {Event} e
       */

    }, {
      key: "_handleCarouselTap",
      value: function _handleCarouselTap(e) {
        // Fixes firefox draggable image bug
        if (e.type === 'mousedown' && $(e.target).is('img')) {
          e.preventDefault();
        }
        this.pressed = true;
        this.dragged = false;
        this.verticalDragged = false;
        this.reference = this._xpos(e);
        this.referenceY = this._ypos(e);

        this.velocity = this.amplitude = 0;
        this.frame = this.offset;
        this.timestamp = Date.now();
        clearInterval(this.ticker);
        this.ticker = setInterval(this._trackBound, 100);
      }

      /**
       * Handle Carousel Drag
       * @param {Event} e
       */

    }, {
      key: "_handleCarouselDrag",
      value: function _handleCarouselDrag(e) {
        var x = void 0,
            y = void 0,
            delta = void 0,
            deltaY = void 0;
        if (this.pressed) {
          x = this._xpos(e);
          y = this._ypos(e);
          delta = this.reference - x;
          deltaY = Math.abs(this.referenceY - y);
          if (deltaY < 30 && !this.verticalDragged) {
            // If vertical scrolling don't allow dragging.
            if (delta > 2 || delta < -2) {
              this.dragged = true;
              this.reference = x;
              this._scroll(this.offset + delta);
            }
          } else if (this.dragged) {
            // If dragging don't allow vertical scroll.
            e.preventDefault();
            e.stopPropagation();
            return false;
          } else {
            // Vertical scrolling.
            this.verticalDragged = true;
          }
        }

        if (this.dragged) {
          // If dragging don't allow vertical scroll.
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }

      /**
       * Handle Carousel Release
       * @param {Event} e
       */

    }, {
      key: "_handleCarouselRelease",
      value: function _handleCarouselRelease(e) {
        if (this.pressed) {
          this.pressed = false;
        } else {
          return;
        }

        clearInterval(this.ticker);
        this.target = this.offset;
        if (this.velocity > 10 || this.velocity < -10) {
          this.amplitude = 0.9 * this.velocity;
          this.target = this.offset + this.amplitude;
        }
        this.target = Math.round(this.target / this.dim) * this.dim;

        // No wrap of items.
        if (this.noWrap) {
          if (this.target >= this.dim * (this.count - 1)) {
            this.target = this.dim * (this.count - 1);
          } else if (this.target < 0) {
            this.target = 0;
          }
        }
        this.amplitude = this.target - this.offset;
        this.timestamp = Date.now();
        requestAnimationFrame(this._autoScrollBound);

        if (this.dragged) {
          e.preventDefault();
          e.stopPropagation();
        }
        return false;
      }

      /**
       * Handle Carousel CLick
       * @param {Event} e
       */

    }, {
      key: "_handleCarouselClick",
      value: function _handleCarouselClick(e) {
        // Disable clicks if carousel was dragged.
        if (this.dragged) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        } else if (!this.options.fullWidth) {
          var clickedIndex = $(e.target).closest('.carousel-item').index();
          var diff = this._wrap(this.center) - clickedIndex;

          // Disable clicks if carousel was shifted by click
          if (diff !== 0) {
            e.preventDefault();
            e.stopPropagation();
          }
          this._cycleTo(clickedIndex);
        }
      }

      /**
       * Handle Indicator CLick
       * @param {Event} e
       */

    }, {
      key: "_handleIndicatorClick",
      value: function _handleIndicatorClick(e) {
        e.stopPropagation();

        var indicator = $(e.target).closest('.indicator-item');
        if (indicator.length) {
          this._cycleTo(indicator.index());
        }
      }

      /**
       * Handle Throttle Resize
       * @param {Event} e
       */

    }, {
      key: "_handleResize",
      value: function _handleResize(e) {
        if (this.options.fullWidth) {
          this.itemWidth = this.$el.find('.carousel-item').first().innerWidth();
          this.imageHeight = this.$el.find('.carousel-item.active').height();
          this.dim = this.itemWidth * 2 + this.options.padding;
          this.offset = this.center * 2 * this.itemWidth;
          this.target = this.offset;
          this._setCarouselHeight(true);
        } else {
          this._scroll();
        }
      }

      /**
       * Set carousel height based on first slide
       * @param {Booleam} imageOnly - true for image slides
       */

    }, {
      key: "_setCarouselHeight",
      value: function _setCarouselHeight(imageOnly) {
        var _this65 = this;

        var firstSlide = this.$el.find('.carousel-item.active').length ? this.$el.find('.carousel-item.active').first() : this.$el.find('.carousel-item').first();
        var firstImage = firstSlide.find('img').first();
        if (firstImage.length) {
          if (firstImage[0].complete) {
            // If image won't trigger the load event
            var imageHeight = firstImage.height();
            if (imageHeight > 0) {
              this.$el.css('height', imageHeight + 'px');
            } else {
              // If image still has no height, use the natural dimensions to calculate
              var naturalWidth = firstImage[0].naturalWidth;
              var naturalHeight = firstImage[0].naturalHeight;
              var adjustedHeight = this.$el.width() / naturalWidth * naturalHeight;
              this.$el.css('height', adjustedHeight + 'px');
            }
          } else {
            // Get height when image is loaded normally
            firstImage.one('load', function (el, i) {
              _this65.$el.css('height', el.offsetHeight + 'px');
            });
          }
        } else if (!imageOnly) {
          var slideHeight = firstSlide.height();
          this.$el.css('height', slideHeight + 'px');
        }
      }

      /**
       * Get x position from event
       * @param {Event} e
       */

    }, {
      key: "_xpos",
      value: function _xpos(e) {
        // touch event
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return e.targetTouches[0].clientX;
        }

        // mouse event
        return e.clientX;
      }

      /**
       * Get y position from event
       * @param {Event} e
       */

    }, {
      key: "_ypos",
      value: function _ypos(e) {
        // touch event
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return e.targetTouches[0].clientY;
        }

        // mouse event
        return e.clientY;
      }

      /**
       * Wrap index
       * @param {Number} x
       */

    }, {
      key: "_wrap",
      value: function _wrap(x) {
        return x >= this.count ? x % this.count : x < 0 ? this._wrap(this.count + x % this.count) : x;
      }

      /**
       * Tracks scrolling information
       */

    }, {
      key: "_track",
      value: function _track() {
        var now = void 0,
            elapsed = void 0,
            delta = void 0,
            v = void 0;

        now = Date.now();
        elapsed = now - this.timestamp;
        this.timestamp = now;
        delta = this.offset - this.frame;
        this.frame = this.offset;

        v = 1000 * delta / (1 + elapsed);
        this.velocity = 0.8 * v + 0.2 * this.velocity;
      }

      /**
       * Auto scrolls to nearest carousel item.
       */

    }, {
      key: "_autoScroll",
      value: function _autoScroll() {
        var elapsed = void 0,
            delta = void 0;

        if (this.amplitude) {
          elapsed = Date.now() - this.timestamp;
          delta = this.amplitude * Math.exp(-elapsed / this.options.duration);
          if (delta > 2 || delta < -2) {
            this._scroll(this.target - delta);
            requestAnimationFrame(this._autoScrollBound);
          } else {
            this._scroll(this.target);
          }
        }
      }

      /**
       * Scroll to target
       * @param {Number} x
       */

    }, {
      key: "_scroll",
      value: function _scroll(x) {
        var _this66 = this;

        // Track scrolling state
        if (!this.$el.hasClass('scrolling')) {
          this.el.classList.add('scrolling');
        }
        if (this.scrollingTimeout != null) {
          window.clearTimeout(this.scrollingTimeout);
        }
        this.scrollingTimeout = window.setTimeout(function () {
          _this66.$el.removeClass('scrolling');
        }, this.options.duration);

        // Start actual scroll
        var i = void 0,
            half = void 0,
            delta = void 0,
            dir = void 0,
            tween = void 0,
            el = void 0,
            alignment = void 0,
            zTranslation = void 0,
            tweenedOpacity = void 0,
            centerTweenedOpacity = void 0;
        var lastCenter = this.center;
        var numVisibleOffset = 1 / this.options.numVisible;

        this.offset = typeof x === 'number' ? x : this.offset;
        this.center = Math.floor((this.offset + this.dim / 2) / this.dim);
        delta = this.offset - this.center * this.dim;
        dir = delta < 0 ? 1 : -1;
        tween = -dir * delta * 2 / this.dim;
        half = this.count >> 1;

        if (this.options.fullWidth) {
          alignment = 'translateX(0)';
          centerTweenedOpacity = 1;
        } else {
          alignment = 'translateX(' + (this.el.clientWidth - this.itemWidth) / 2 + 'px) ';
          alignment += 'translateY(' + (this.el.clientHeight - this.itemHeight) / 2 + 'px)';
          centerTweenedOpacity = 1 - numVisibleOffset * tween;
        }

        // Set indicator active
        if (this.showIndicators) {
          var diff = this.center % this.count;
          var activeIndicator = this.$indicators.find('.indicator-item.active');
          if (activeIndicator.index() !== diff) {
            activeIndicator.removeClass('active');
            this.$indicators.find('.indicator-item').eq(diff)[0].classList.add('active');
          }
        }

        // center
        // Don't show wrapped items.
        if (!this.noWrap || this.center >= 0 && this.center < this.count) {
          el = this.images[this._wrap(this.center)];

          // Add active class to center item.
          if (!$(el).hasClass('active')) {
            this.$el.find('.carousel-item').removeClass('active');
            el.classList.add('active');
          }
          var transformString = alignment + " translateX(" + -delta / 2 + "px) translateX(" + dir * this.options.shift * tween * i + "px) translateZ(" + this.options.dist * tween + "px)";
          this._updateItemStyle(el, centerTweenedOpacity, 0, transformString);
        }

        for (i = 1; i <= half; ++i) {
          // right side
          if (this.options.fullWidth) {
            zTranslation = this.options.dist;
            tweenedOpacity = i === half && delta < 0 ? 1 - tween : 1;
          } else {
            zTranslation = this.options.dist * (i * 2 + tween * dir);
            tweenedOpacity = 1 - numVisibleOffset * (i * 2 + tween * dir);
          }
          // Don't show wrapped items.
          if (!this.noWrap || this.center + i < this.count) {
            el = this.images[this._wrap(this.center + i)];
            var _transformString = alignment + " translateX(" + (this.options.shift + (this.dim * i - delta) / 2) + "px) translateZ(" + zTranslation + "px)";
            this._updateItemStyle(el, tweenedOpacity, -i, _transformString);
          }

          // left side
          if (this.options.fullWidth) {
            zTranslation = this.options.dist;
            tweenedOpacity = i === half && delta > 0 ? 1 - tween : 1;
          } else {
            zTranslation = this.options.dist * (i * 2 - tween * dir);
            tweenedOpacity = 1 - numVisibleOffset * (i * 2 - tween * dir);
          }
          // Don't show wrapped items.
          if (!this.noWrap || this.center - i >= 0) {
            el = this.images[this._wrap(this.center - i)];
            var _transformString2 = alignment + " translateX(" + (-this.options.shift + (-this.dim * i - delta) / 2) + "px) translateZ(" + zTranslation + "px)";
            this._updateItemStyle(el, tweenedOpacity, -i, _transformString2);
          }
        }

        // center
        // Don't show wrapped items.
        if (!this.noWrap || this.center >= 0 && this.center < this.count) {
          el = this.images[this._wrap(this.center)];
          var _transformString3 = alignment + " translateX(" + -delta / 2 + "px) translateX(" + dir * this.options.shift * tween + "px) translateZ(" + this.options.dist * tween + "px)";
          this._updateItemStyle(el, centerTweenedOpacity, 0, _transformString3);
        }

        // onCycleTo callback
        var $currItem = this.$el.find('.carousel-item').eq(this._wrap(this.center));
        if (lastCenter !== this.center && typeof this.options.onCycleTo === 'function') {
          this.options.onCycleTo.call(this, $currItem[0], this.dragged);
        }

        // One time callback
        if (typeof this.oneTimeCallback === 'function') {
          this.oneTimeCallback.call(this, $currItem[0], this.dragged);
          this.oneTimeCallback = null;
        }
      }

      /**
       * Cycle to target
       * @param {Element} el
       * @param {Number} opacity
       * @param {Number} zIndex
       * @param {String} transform
       */

    }, {
      key: "_updateItemStyle",
      value: function _updateItemStyle(el, opacity, zIndex, transform) {
        el.style[this.xform] = transform;
        el.style.zIndex = zIndex;
        el.style.opacity = opacity;
        el.style.visibility = 'visible';
      }

      /**
       * Cycle to target
       * @param {Number} n
       * @param {Function} callback
       */

    }, {
      key: "_cycleTo",
      value: function _cycleTo(n, callback) {
        var diff = this.center % this.count - n;

        // Account for wraparound.
        if (!this.noWrap) {
          if (diff < 0) {
            if (Math.abs(diff + this.count) < Math.abs(diff)) {
              diff += this.count;
            }
          } else if (diff > 0) {
            if (Math.abs(diff - this.count) < diff) {
              diff -= this.count;
            }
          }
        }

        this.target = this.dim * Math.round(this.offset / this.dim);
        // Next
        if (diff < 0) {
          this.target += this.dim * Math.abs(diff);

          // Prev
        } else if (diff > 0) {
          this.target -= this.dim * diff;
        }

        // Set one time callback
        if (typeof callback === 'function') {
          this.oneTimeCallback = callback;
        }

        // Scroll
        if (this.offset !== this.target) {
          this.amplitude = this.target - this.offset;
          this.timestamp = Date.now();
          requestAnimationFrame(this._autoScrollBound);
        }
      }

      /**
       * Cycle to next item
       * @param {Number} [n]
       */

    }, {
      key: "next",
      value: function next(n) {
        if (n === undefined || isNaN(n)) {
          n = 1;
        }

        var index = this.center + n;
        if (index >= this.count || index < 0) {
          if (this.noWrap) {
            return;
          }

          index = this._wrap(index);
        }
        this._cycleTo(index);
      }

      /**
       * Cycle to previous item
       * @param {Number} [n]
       */

    }, {
      key: "prev",
      value: function prev(n) {
        if (n === undefined || isNaN(n)) {
          n = 1;
        }

        var index = this.center - n;
        if (index >= this.count || index < 0) {
          if (this.noWrap) {
            return;
          }

          index = this._wrap(index);
        }

        this._cycleTo(index);
      }

      /**
       * Cycle to nth item
       * @param {Number} [n]
       * @param {Function} callback
       */

    }, {
      key: "set",
      value: function set(n, callback) {
        if (n === undefined || isNaN(n)) {
          n = 0;
        }

        if (n > this.count || n < 0) {
          if (this.noWrap) {
            return;
          }

          n = this._wrap(n);
        }

        this._cycleTo(n, callback);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Carousel.__proto__ || Object.getPrototypeOf(Carousel), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Carousel;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Carousel;
  }(Component);

  M.Carousel = Carousel;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Carousel, 'carousel', 'M_Carousel');
  }
})(cash);
;(function ($) {
  'use strict';

  var _defaults = {
    onOpen: undefined,
    onClose: undefined
  };

  /**
   * @class
   *
   */

  var TapTarget = function (_Component19) {
    _inherits(TapTarget, _Component19);

    /**
     * Construct TapTarget instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function TapTarget(el, options) {
      _classCallCheck(this, TapTarget);

      var _this67 = _possibleConstructorReturn(this, (TapTarget.__proto__ || Object.getPrototypeOf(TapTarget)).call(this, TapTarget, el, options));

      _this67.el.M_TapTarget = _this67;

      /**
       * Options for the select
       * @member TapTarget#options
       * @prop {Function} onOpen - Callback function called when feature discovery is opened
       * @prop {Function} onClose - Callback function called when feature discovery is closed
       */
      _this67.options = $.extend({}, TapTarget.defaults, options);

      _this67.isOpen = false;

      // setup
      _this67.$origin = $('#' + _this67.$el.attr('data-target'));
      _this67._setup();

      _this67._calculatePositioning();
      _this67._setupEventHandlers();
      return _this67;
    }

    _createClass(TapTarget, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.TapTarget = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleDocumentClickBound = this._handleDocumentClick.bind(this);
        this._handleTargetClickBound = this._handleTargetClick.bind(this);
        this._handleOriginClickBound = this._handleOriginClick.bind(this);

        this.el.addEventListener('click', this._handleTargetClickBound);
        this.originEl.addEventListener('click', this._handleOriginClickBound);

        // Resize
        var throttledResize = M.throttle(this._handleResize, 200);
        this._handleThrottledResizeBound = throttledResize.bind(this);

        window.addEventListener('resize', this._handleThrottledResizeBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('click', this._handleTargetClickBound);
        this.originEl.removeEventListener('click', this._handleOriginClickBound);
        window.removeEventListener('resize', this._handleThrottledResizeBound);
      }

      /**
       * Handle Target Click
       * @param {Event} e
       */

    }, {
      key: "_handleTargetClick",
      value: function _handleTargetClick(e) {
        this.open();
      }

      /**
       * Handle Origin Click
       * @param {Event} e
       */

    }, {
      key: "_handleOriginClick",
      value: function _handleOriginClick(e) {
        this.close();
      }

      /**
       * Handle Resize
       * @param {Event} e
       */

    }, {
      key: "_handleResize",
      value: function _handleResize(e) {
        this._calculatePositioning();
      }

      /**
       * Handle Resize
       * @param {Event} e
       */

    }, {
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(e) {
        if (!$(e.target).closest('.tap-target-wrapper').length) {
          this.close();
          e.preventDefault();
          e.stopPropagation();
        }
      }

      /**
       * Setup Tap Target
       */

    }, {
      key: "_setup",
      value: function _setup() {
        // Creating tap target
        this.wrapper = this.$el.parent()[0];
        this.waveEl = $(this.wrapper).find('.tap-target-wave')[0];
        this.originEl = $(this.wrapper).find('.tap-target-origin')[0];
        this.contentEl = this.$el.find('.tap-target-content')[0];

        // Creating wrapper
        if (!$(this.wrapper).hasClass('.tap-target-wrapper')) {
          this.wrapper = document.createElement('div');
          this.wrapper.classList.add('tap-target-wrapper');
          this.$el.before($(this.wrapper));
          this.wrapper.append(this.el);
        }

        // Creating content
        if (!this.contentEl) {
          this.contentEl = document.createElement('div');
          this.contentEl.classList.add('tap-target-content');
          this.$el.append(this.contentEl);
        }

        // Creating foreground wave
        if (!this.waveEl) {
          this.waveEl = document.createElement('div');
          this.waveEl.classList.add('tap-target-wave');

          // Creating origin
          if (!this.originEl) {
            this.originEl = this.$origin.clone(true, true);
            this.originEl.addClass('tap-target-origin');
            this.originEl.removeAttr('id');
            this.originEl.removeAttr('style');
            this.originEl = this.originEl[0];
            this.waveEl.append(this.originEl);
          }

          this.wrapper.append(this.waveEl);
        }
      }

      /**
       * Calculate positioning
       */

    }, {
      key: "_calculatePositioning",
      value: function _calculatePositioning() {
        // Element or parent is fixed position?
        var isFixed = this.$origin.css('position') === 'fixed';
        if (!isFixed) {
          var parents = this.$origin.parents();
          for (var i = 0; i < parents.length; i++) {
            isFixed = $(parents[i]).css('position') == 'fixed';
            if (isFixed) {
              break;
            }
          }
        }

        // Calculating origin
        var originWidth = this.$origin.outerWidth();
        var originHeight = this.$origin.outerHeight();
        var originTop = isFixed ? this.$origin.offset().top - M.getDocumentScrollTop() : this.$origin.offset().top;
        var originLeft = isFixed ? this.$origin.offset().left - M.getDocumentScrollLeft() : this.$origin.offset().left;

        // Calculating screen
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var centerX = windowWidth / 2;
        var centerY = windowHeight / 2;
        var isLeft = originLeft <= centerX;
        var isRight = originLeft > centerX;
        var isTop = originTop <= centerY;
        var isBottom = originTop > centerY;
        var isCenterX = originLeft >= windowWidth * 0.25 && originLeft <= windowWidth * 0.75;

        // Calculating tap target
        var tapTargetWidth = this.$el.outerWidth();
        var tapTargetHeight = this.$el.outerHeight();
        var tapTargetTop = originTop + originHeight / 2 - tapTargetHeight / 2;
        var tapTargetLeft = originLeft + originWidth / 2 - tapTargetWidth / 2;
        var tapTargetPosition = isFixed ? 'fixed' : 'absolute';

        // Calculating content
        var tapTargetTextWidth = isCenterX ? tapTargetWidth : tapTargetWidth / 2 + originWidth;
        var tapTargetTextHeight = tapTargetHeight / 2;
        var tapTargetTextTop = isTop ? tapTargetHeight / 2 : 0;
        var tapTargetTextBottom = 0;
        var tapTargetTextLeft = isLeft && !isCenterX ? tapTargetWidth / 2 - originWidth : 0;
        var tapTargetTextRight = 0;
        var tapTargetTextPadding = originWidth;
        var tapTargetTextAlign = isBottom ? 'bottom' : 'top';

        // Calculating wave
        var tapTargetWaveWidth = originWidth > originHeight ? originWidth * 2 : originWidth * 2;
        var tapTargetWaveHeight = tapTargetWaveWidth;
        var tapTargetWaveTop = tapTargetHeight / 2 - tapTargetWaveHeight / 2;
        var tapTargetWaveLeft = tapTargetWidth / 2 - tapTargetWaveWidth / 2;

        // Setting tap target
        var tapTargetWrapperCssObj = {};
        tapTargetWrapperCssObj.top = isTop ? tapTargetTop + 'px' : '';
        tapTargetWrapperCssObj.right = isRight ? windowWidth - tapTargetLeft - tapTargetWidth + 'px' : '';
        tapTargetWrapperCssObj.bottom = isBottom ? windowHeight - tapTargetTop - tapTargetHeight + 'px' : '';
        tapTargetWrapperCssObj.left = isLeft ? tapTargetLeft + 'px' : '';
        tapTargetWrapperCssObj.position = tapTargetPosition;
        $(this.wrapper).css(tapTargetWrapperCssObj);

        // Setting content
        $(this.contentEl).css({
          width: tapTargetTextWidth + 'px',
          height: tapTargetTextHeight + 'px',
          top: tapTargetTextTop + 'px',
          right: tapTargetTextRight + 'px',
          bottom: tapTargetTextBottom + 'px',
          left: tapTargetTextLeft + 'px',
          padding: tapTargetTextPadding + 'px',
          verticalAlign: tapTargetTextAlign
        });

        // Setting wave
        $(this.waveEl).css({
          top: tapTargetWaveTop + 'px',
          left: tapTargetWaveLeft + 'px',
          width: tapTargetWaveWidth + 'px',
          height: tapTargetWaveHeight + 'px'
        });
      }

      /**
       * Open TapTarget
       */

    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }

        // onOpen callback
        if (typeof this.options.onOpen === 'function') {
          this.options.onOpen.call(this, this.$origin[0]);
        }

        this.isOpen = true;
        this.wrapper.classList.add('open');

        document.body.addEventListener('click', this._handleDocumentClickBound, true);
        document.body.addEventListener('touchend', this._handleDocumentClickBound);
      }

      /**
       * Close Tap Target
       */

    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        // onClose callback
        if (typeof this.options.onClose === 'function') {
          this.options.onClose.call(this, this.$origin[0]);
        }

        this.isOpen = false;
        this.wrapper.classList.remove('open');

        document.body.removeEventListener('click', this._handleDocumentClickBound, true);
        document.body.removeEventListener('touchend', this._handleDocumentClickBound);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(TapTarget.__proto__ || Object.getPrototypeOf(TapTarget), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_TapTarget;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return TapTarget;
  }(Component);

  M.TapTarget = TapTarget;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(TapTarget, 'tapTarget', 'M_TapTarget');
  }
})(cash);
;(function ($) {
  'use strict';

  var _defaults = {
    classes: '',
    dropdownOptions: {}
  };

  /**
   * @class
   *
   */

  var FormSelect = function (_Component20) {
    _inherits(FormSelect, _Component20);

    /**
     * Construct FormSelect instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function FormSelect(el, options) {
      _classCallCheck(this, FormSelect);

      // Don't init if browser default version
      var _this68 = _possibleConstructorReturn(this, (FormSelect.__proto__ || Object.getPrototypeOf(FormSelect)).call(this, FormSelect, el, options));

      if (_this68.$el.hasClass('browser-default')) {
        return _possibleConstructorReturn(_this68);
      }

      _this68.el.M_FormSelect = _this68;

      /**
       * Options for the select
       * @member FormSelect#options
       */
      _this68.options = $.extend({}, FormSelect.defaults, options);

      _this68.isMultiple = _this68.$el.prop('multiple');

      // Setup
      _this68.el.tabIndex = -1;
      _this68._keysSelected = {};
      _this68._valueDict = {}; // Maps key to original and generated option element.
      _this68._setupDropdown();

      _this68._setupEventHandlers();
      return _this68;
    }

    _createClass(FormSelect, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._removeDropdown();
        this.el.M_FormSelect = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this69 = this;

        this._handleSelectChangeBound = this._handleSelectChange.bind(this);
        this._handleOptionClickBound = this._handleOptionClick.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);

        $(this.dropdownOptions).find('li:not(.optgroup)').each(function (el) {
          el.addEventListener('click', _this69._handleOptionClickBound);
        });
        this.el.addEventListener('change', this._handleSelectChangeBound);
        this.input.addEventListener('click', this._handleInputClickBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this70 = this;

        $(this.dropdownOptions).find('li:not(.optgroup)').each(function (el) {
          el.removeEventListener('click', _this70._handleOptionClickBound);
        });
        this.el.removeEventListener('change', this._handleSelectChangeBound);
        this.input.removeEventListener('click', this._handleInputClickBound);
      }

      /**
       * Handle Select Change
       * @param {Event} e
       */

    }, {
      key: "_handleSelectChange",
      value: function _handleSelectChange(e) {
        this._setValueToInput();
      }

      /**
       * Handle Option Click
       * @param {Event} e
       */

    }, {
      key: "_handleOptionClick",
      value: function _handleOptionClick(e) {
        e.preventDefault();
        var option = $(e.target).closest('li')[0];
        var key = option.id;
        if (!$(option).hasClass('disabled') && !$(option).hasClass('optgroup') && key.length) {
          var selected = true;

          if (this.isMultiple) {
            // Deselect placeholder option if still selected.
            var placeholderOption = $(this.dropdownOptions).find('li.disabled.selected');
            if (placeholderOption.length) {
              placeholderOption.removeClass('selected');
              placeholderOption.find('input[type="checkbox"]').prop('checked', false);
              this._toggleEntryFromArray(placeholderOption[0].id);
            }
            selected = this._toggleEntryFromArray(key);
          } else {
            $(this.dropdownOptions).find('li').removeClass('selected');
            $(option).toggleClass('selected', selected);
          }

          // Set selected on original select option
          // Only trigger if selected state changed
          var prevSelected = $(this._valueDict[key].el).prop('selected');
          if (prevSelected !== selected) {
            $(this._valueDict[key].el).prop('selected', selected);
            this.$el.trigger('change');
          }
        }

        e.stopPropagation();
      }

      /**
       * Handle Input Click
       */

    }, {
      key: "_handleInputClick",
      value: function _handleInputClick() {
        if (this.dropdown && this.dropdown.isOpen) {
          this._setValueToInput();
          this._setSelectedStates();
        }
      }

      /**
       * Setup dropdown
       */

    }, {
      key: "_setupDropdown",
      value: function _setupDropdown() {
        var _this71 = this;

        this.wrapper = document.createElement('div');
        $(this.wrapper).addClass('select-wrapper ' + this.options.classes);
        this.$el.before($(this.wrapper));
        this.wrapper.appendChild(this.el);

        if (this.el.disabled) {
          this.wrapper.classList.add('disabled');
        }

        // Create dropdown
        this.$selectOptions = this.$el.children('option, optgroup');
        this.dropdownOptions = document.createElement('ul');
        this.dropdownOptions.id = "select-options-" + M.guid();
        $(this.dropdownOptions).addClass('dropdown-content select-dropdown ' + (this.isMultiple ? 'multiple-select-dropdown' : ''));

        // Create dropdown structure.
        if (this.$selectOptions.length) {
          this.$selectOptions.each(function (el) {
            if ($(el).is('option')) {
              // Direct descendant option.
              var optionEl = void 0;
              if (_this71.isMultiple) {
                optionEl = _this71._appendOptionWithIcon(_this71.$el, el, 'multiple');
              } else {
                optionEl = _this71._appendOptionWithIcon(_this71.$el, el);
              }

              _this71._addOptionToValueDict(el, optionEl);
            } else if ($(el).is('optgroup')) {
              // Optgroup.
              var selectOptions = $(el).children('option');
              $(_this71.dropdownOptions).append($('<li class="optgroup"><span>' + el.getAttribute('label') + '</span></li>')[0]);

              selectOptions.each(function (el) {
                var optionEl = _this71._appendOptionWithIcon(_this71.$el, el, 'optgroup-option');
                _this71._addOptionToValueDict(el, optionEl);
              });
            }
          });
        }

        this.$el.after(this.dropdownOptions);

        // Add input dropdown
        this.input = document.createElement('input');
        $(this.input).addClass('select-dropdown dropdown-trigger');
        this.input.setAttribute('type', 'text');
        this.input.setAttribute('readonly', 'true');
        this.input.setAttribute('data-target', this.dropdownOptions.id);
        if (this.el.disabled) {
          $(this.input).prop('disabled', 'true');
        }

        this.$el.before(this.input);
        this._setValueToInput();

        // Add caret
        var dropdownIcon = $('<svg class="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
        this.$el.before(dropdownIcon[0]);

        // Initialize dropdown
        if (!this.el.disabled) {
          var dropdownOptions = $.extend({}, this.options.dropdownOptions);

          // Add callback for centering selected option when dropdown content is scrollable
          dropdownOptions.onOpenEnd = function (el) {
            var selectedOption = $(_this71.dropdownOptions).find('.selected').first();

            if (selectedOption.length) {
              // Focus selected option in dropdown
              M.keyDown = true;
              _this71.dropdown.focusedIndex = selectedOption.index();
              _this71.dropdown._focusFocusedItem();
              M.keyDown = false;

              // Handle scrolling to selected option
              if (_this71.dropdown.isScrollable) {
                var scrollOffset = selectedOption[0].getBoundingClientRect().top - _this71.dropdownOptions.getBoundingClientRect().top; // scroll to selected option
                scrollOffset -= _this71.dropdownOptions.clientHeight / 2; // center in dropdown
                _this71.dropdownOptions.scrollTop = scrollOffset;
              }
            }
          };

          if (this.isMultiple) {
            dropdownOptions.closeOnClick = false;
          }
          this.dropdown = M.Dropdown.init(this.input, dropdownOptions);
        }

        // Add initial selections
        this._setSelectedStates();
      }

      /**
       * Add option to value dict
       * @param {Element} el  original option element
       * @param {Element} optionEl  generated option element
       */

    }, {
      key: "_addOptionToValueDict",
      value: function _addOptionToValueDict(el, optionEl) {
        var index = Object.keys(this._valueDict).length;
        var key = this.dropdownOptions.id + index;
        var obj = {};
        optionEl.id = key;

        obj.el = el;
        obj.optionEl = optionEl;
        this._valueDict[key] = obj;
      }

      /**
       * Remove dropdown
       */

    }, {
      key: "_removeDropdown",
      value: function _removeDropdown() {
        $(this.wrapper).find('.caret').remove();
        $(this.input).remove();
        $(this.dropdownOptions).remove();
        $(this.wrapper).before(this.$el);
        $(this.wrapper).remove();
      }

      /**
       * Setup dropdown
       * @param {Element} select  select element
       * @param {Element} option  option element from select
       * @param {String} type
       * @return {Element}  option element added
       */

    }, {
      key: "_appendOptionWithIcon",
      value: function _appendOptionWithIcon(select, option, type) {
        // Add disabled attr if disabled
        var disabledClass = option.disabled ? 'disabled ' : '';
        var optgroupClass = type === 'optgroup-option' ? 'optgroup-option ' : '';
        var multipleCheckbox = this.isMultiple ? "<label><input type=\"checkbox\"" + disabledClass + "\"/><span>" + option.innerHTML + "</span></label>" : option.innerHTML;
        var liEl = $('<li></li>');
        var spanEl = $('<span></span>');
        spanEl.html(multipleCheckbox);
        liEl.addClass(disabledClass + " " + optgroupClass);
        liEl.append(spanEl);

        // add icons
        var iconUrl = option.getAttribute('data-icon');
        if (!!iconUrl) {
          var imgEl = $("<img alt=\"\" src=\"" + iconUrl + "\">");
          liEl.prepend(imgEl);
        }

        // Check for multiple type.
        $(this.dropdownOptions).append(liEl[0]);
        return liEl[0];
      }

      /**
       * Toggle entry from option
       * @param {String} key  Option key
       * @return {Boolean}  if entry was added or removed
       */

    }, {
      key: "_toggleEntryFromArray",
      value: function _toggleEntryFromArray(key) {
        var notAdded = !this._keysSelected.hasOwnProperty(key);
        var $optionLi = $(this._valueDict[key].optionEl);

        if (notAdded) {
          this._keysSelected[key] = true;
        } else {
          delete this._keysSelected[key];
        }

        $optionLi.toggleClass('selected', notAdded);

        // Set checkbox checked value
        $optionLi.find('input[type="checkbox"]').prop('checked', notAdded);

        // use notAdded instead of true (to detect if the option is selected or not)
        $optionLi.prop('selected', notAdded);

        return notAdded;
      }

      /**
       * Set text value to input
       */

    }, {
      key: "_setValueToInput",
      value: function _setValueToInput() {
        var values = [];
        var options = this.$el.find('option');

        options.each(function (el) {
          if ($(el).prop('selected')) {
            var text = $(el).text();
            values.push(text);
          }
        });

        if (!values.length) {
          var firstDisabled = this.$el.find('option:disabled').eq(0);
          if (firstDisabled.length && firstDisabled[0].value === '') {
            values.push(firstDisabled.text());
          }
        }

        this.input.value = values.join(', ');
      }

      /**
       * Set selected state of dropdown to match actual select element
       */

    }, {
      key: "_setSelectedStates",
      value: function _setSelectedStates() {
        this._keysSelected = {};

        for (var key in this._valueDict) {
          var option = this._valueDict[key];
          var optionIsSelected = $(option.el).prop('selected');
          $(option.optionEl).find('input[type="checkbox"]').prop('checked', optionIsSelected);
          if (optionIsSelected) {
            this._activateOption($(this.dropdownOptions), $(option.optionEl));
            this._keysSelected[key] = true;
          } else {
            $(option.optionEl).removeClass('selected');
          }
        }
      }

      /**
       * Make option as selected and scroll to selected position
       * @param {jQuery} collection  Select options jQuery element
       * @param {Element} newOption  element of the new option
       */

    }, {
      key: "_activateOption",
      value: function _activateOption(collection, newOption) {
        if (newOption) {
          if (!this.isMultiple) {
            collection.find('li.selected').removeClass('selected');
          }
          var option = $(newOption);
          option.addClass('selected');
        }
      }

      /**
       * Get Selected Values
       * @return {Array}  Array of selected values
       */

    }, {
      key: "getSelectedValues",
      value: function getSelectedValues() {
        var selectedValues = [];
        for (var key in this._keysSelected) {
          selectedValues.push(this._valueDict[key].el.value);
        }
        return selectedValues;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(FormSelect.__proto__ || Object.getPrototypeOf(FormSelect), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_FormSelect;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return FormSelect;
  }(Component);

  M.FormSelect = FormSelect;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(FormSelect, 'formSelect', 'M_FormSelect');
  }
})(cash);
;(function ($, anim) {
  'use strict';

  var _defaults = {};

  /**
   * @class
   *
   */

  var Range = function (_Component21) {
    _inherits(Range, _Component21);

    /**
     * Construct Range instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Range(el, options) {
      _classCallCheck(this, Range);

      var _this72 = _possibleConstructorReturn(this, (Range.__proto__ || Object.getPrototypeOf(Range)).call(this, Range, el, options));

      _this72.el.M_Range = _this72;

      /**
       * Options for the range
       * @member Range#options
       */
      _this72.options = $.extend({}, Range.defaults, options);

      _this72._mousedown = false;

      // Setup
      _this72._setupThumb();

      _this72._setupEventHandlers();
      return _this72;
    }

    _createClass(Range, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._removeThumb();
        this.el.M_Range = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleRangeChangeBound = this._handleRangeChange.bind(this);
        this._handleRangeMousedownTouchstartBound = this._handleRangeMousedownTouchstart.bind(this);
        this._handleRangeInputMousemoveTouchmoveBound = this._handleRangeInputMousemoveTouchmove.bind(this);
        this._handleRangeMouseupTouchendBound = this._handleRangeMouseupTouchend.bind(this);
        this._handleRangeBlurMouseoutTouchleaveBound = this._handleRangeBlurMouseoutTouchleave.bind(this);

        this.el.addEventListener('change', this._handleRangeChangeBound);

        this.el.addEventListener('mousedown', this._handleRangeMousedownTouchstartBound);
        this.el.addEventListener('touchstart', this._handleRangeMousedownTouchstartBound);

        this.el.addEventListener('input', this._handleRangeInputMousemoveTouchmoveBound);
        this.el.addEventListener('mousemove', this._handleRangeInputMousemoveTouchmoveBound);
        this.el.addEventListener('touchmove', this._handleRangeInputMousemoveTouchmoveBound);

        this.el.addEventListener('mouseup', this._handleRangeMouseupTouchendBound);
        this.el.addEventListener('touchend', this._handleRangeMouseupTouchendBound);

        this.el.addEventListener('blur', this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.addEventListener('mouseout', this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.addEventListener('touchleave', this._handleRangeBlurMouseoutTouchleaveBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('change', this._handleRangeChangeBound);

        this.el.removeEventListener('mousedown', this._handleRangeMousedownTouchstartBound);
        this.el.removeEventListener('touchstart', this._handleRangeMousedownTouchstartBound);

        this.el.removeEventListener('input', this._handleRangeInputMousemoveTouchmoveBound);
        this.el.removeEventListener('mousemove', this._handleRangeInputMousemoveTouchmoveBound);
        this.el.removeEventListener('touchmove', this._handleRangeInputMousemoveTouchmoveBound);

        this.el.removeEventListener('mouseup', this._handleRangeMouseupTouchendBound);
        this.el.removeEventListener('touchend', this._handleRangeMouseupTouchendBound);

        this.el.removeEventListener('blur', this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.removeEventListener('mouseout', this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.removeEventListener('touchleave', this._handleRangeBlurMouseoutTouchleaveBound);
      }

      /**
       * Handle Range Change
       * @param {Event} e
       */

    }, {
      key: "_handleRangeChange",
      value: function _handleRangeChange() {
        $(this.value).html(this.$el.val());

        if (!$(this.thumb).hasClass('active')) {
          this._showRangeBubble();
        }

        var offsetLeft = this._calcRangeOffset();
        $(this.thumb).addClass('active').css('left', offsetLeft + 'px');
      }

      /**
       * Handle Range Mousedown and Touchstart
       * @param {Event} e
       */

    }, {
      key: "_handleRangeMousedownTouchstart",
      value: function _handleRangeMousedownTouchstart(e) {
        // Set indicator value
        $(this.value).html(this.$el.val());

        this._mousedown = true;
        this.$el.addClass('active');

        if (!$(this.thumb).hasClass('active')) {
          this._showRangeBubble();
        }

        if (e.type !== 'input') {
          var offsetLeft = this._calcRangeOffset();
          $(this.thumb).addClass('active').css('left', offsetLeft + 'px');
        }
      }

      /**
       * Handle Range Input, Mousemove and Touchmove
       */

    }, {
      key: "_handleRangeInputMousemoveTouchmove",
      value: function _handleRangeInputMousemoveTouchmove() {
        if (this._mousedown) {
          if (!$(this.thumb).hasClass('active')) {
            this._showRangeBubble();
          }

          var offsetLeft = this._calcRangeOffset();
          $(this.thumb).addClass('active').css('left', offsetLeft + 'px');
          $(this.value).html(this.$el.val());
        }
      }

      /**
       * Handle Range Mouseup and Touchend
       */

    }, {
      key: "_handleRangeMouseupTouchend",
      value: function _handleRangeMouseupTouchend() {
        this._mousedown = false;
        this.$el.removeClass('active');
      }

      /**
       * Handle Range Blur, Mouseout and Touchleave
       */

    }, {
      key: "_handleRangeBlurMouseoutTouchleave",
      value: function _handleRangeBlurMouseoutTouchleave() {
        if (!this._mousedown) {
          var paddingLeft = parseInt(this.$el.css('padding-left'));
          var marginLeft = 7 + paddingLeft + 'px';

          if ($(this.thumb).hasClass('active')) {
            anim.remove(this.thumb);
            anim({
              targets: this.thumb,
              height: 0,
              width: 0,
              top: 10,
              easing: 'easeOutQuad',
              marginLeft: marginLeft,
              duration: 100
            });
          }
          $(this.thumb).removeClass('active');
        }
      }

      /**
       * Setup dropdown
       */

    }, {
      key: "_setupThumb",
      value: function _setupThumb() {
        this.thumb = document.createElement('span');
        this.value = document.createElement('span');
        $(this.thumb).addClass('thumb');
        $(this.value).addClass('value');
        $(this.thumb).append(this.value);
        this.$el.after(this.thumb);
      }

      /**
       * Remove dropdown
       */

    }, {
      key: "_removeThumb",
      value: function _removeThumb() {
        $(this.thumb).remove();
      }

      /**
       * morph thumb into bubble
       */

    }, {
      key: "_showRangeBubble",
      value: function _showRangeBubble() {
        var paddingLeft = parseInt($(this.thumb).parent().css('padding-left'));
        var marginLeft = -7 + paddingLeft + 'px'; // TODO: fix magic number?
        anim.remove(this.thumb);
        anim({
          targets: this.thumb,
          height: 30,
          width: 30,
          top: -30,
          marginLeft: marginLeft,
          duration: 300,
          easing: 'easeOutQuint'
        });
      }

      /**
       * Calculate the offset of the thumb
       * @return {Number}  offset in pixels
       */

    }, {
      key: "_calcRangeOffset",
      value: function _calcRangeOffset() {
        var width = this.$el.width() - 15;
        var max = parseFloat(this.$el.attr('max')) || 100; // Range default max
        var min = parseFloat(this.$el.attr('min')) || 0; // Range default min
        var percent = (parseFloat(this.$el.val()) - min) / (max - min);
        return percent * width;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Range.__proto__ || Object.getPrototypeOf(Range), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Range;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Range;
  }(Component);

  M.Range = Range;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Range, 'range', 'M_Range');
  }

  Range.init($('input[type=range]'));
})(cash, M.anime);

;(function(){var a="' of type ",l="SCRIPT",p="Uneven number of arguments",q="array",t="function",aa="google.charts.load",ba="hasOwnProperty",u="number",v="object",x="pre-45",ca="propertyIsEnumerable",y="string",da="text/javascript",ea="toLocaleString";function A(){return function(b){return b}}function B(){return function(){}}function D(b){return function(){return this[b]}}function E(b){return function(){return b}}var F,G=G||{};G.scope={};
G.Tk=function(b){var c=0;return function(){return c<b.length?{done:!1,value:b[c++]}:{done:!0}}};G.Sk=function(b){return{next:G.Tk(b)}};G.Dd=function(b){var c="undefined"!=typeof Symbol&&Symbol.iterator&&b[Symbol.iterator];return c?c.call(b):G.Sk(b)};G.Rk=function(b){for(var c,d=[];!(c=b.next()).done;)d.push(c.value);return d};G.ve=function(b){return b instanceof Array?b:G.Rk(G.Dd(b))};
G.$t=function(b,c,d){b instanceof String&&(b=String(b));for(var e=b.length,f=0;f<e;f++){var g=b[f];if(c.call(d,g,f,b))return{Bm:f,Oo:g}}return{Bm:-1,Oo:void 0}};G.Aj=!1;G.hp=!1;G.ip=!1;G.Nr=!1;G.defineProperty=G.Aj||typeof Object.defineProperties==t?Object.defineProperty:function(b,c,d){b!=Array.prototype&&b!=Object.prototype&&(b[c]=d.value)};G.fm=function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global&&null!=global?global:b};G.global=G.fm(this);
G.Pc=function(b,c){if(c){var d=G.global;b=b.split(".");for(var e=0;e<b.length-1;e++){var f=b[e];f in d||(d[f]={});d=d[f]}b=b[b.length-1];e=d[b];c=c(e);c!=e&&null!=c&&G.defineProperty(d,b,{configurable:!0,writable:!0,value:c})}};G.Rg=function(b,c,d){if(null==b)throw new TypeError("The 'this' value for String.prototype."+d+" must not be null or undefined");if(c instanceof RegExp)throw new TypeError("First argument to String.prototype."+d+" must not be a regular expression");return b+""};
G.Pc("String.prototype.repeat",function(b){return b?b:function(c){var d=G.Rg(this,null,"repeat");if(0>c||1342177279<c)throw new RangeError("Invalid count value");c|=0;for(var e="";c;)if(c&1&&(e+=d),c>>>=1)d+=d;return e}});G.$j=!1;
G.Pc("Promise",function(b){function c(k){this.qa=g.$a;this.Ia=void 0;this.ic=[];var m=this.De();try{k(m.resolve,m.reject)}catch(n){m.reject(n)}}function d(){this.pb=null}function e(k){return k instanceof c?k:new c(function(m){m(k)})}if(b&&!G.$j)return b;d.prototype.Ig=function(k){if(null==this.pb){this.pb=[];var m=this;this.Jg(function(){m.Ol()})}this.pb.push(k)};var f=G.global.setTimeout;d.prototype.Jg=function(k){f(k,0)};d.prototype.Ol=function(){for(;this.pb&&this.pb.length;){var k=this.pb;this.pb=
[];for(var m=0;m<k.length;++m){var n=k[m];k[m]=null;try{n()}catch(r){this.el(r)}}}this.pb=null};d.prototype.el=function(k){this.Jg(function(){throw k;})};var g={$a:0,nb:1,Ja:2};c.prototype.De=function(){function k(r){return function(w){n||(n=!0,r.call(m,w))}}var m=this,n=!1;return{resolve:k(this.Qn),reject:k(this.sf)}};c.prototype.Qn=function(k){if(k===this)this.sf(new TypeError("A Promise cannot resolve to itself"));else if(k instanceof c)this.no(k);else{a:switch(typeof k){case v:var m=null!=k;break a;
case t:m=!0;break a;default:m=!1}m?this.Pn(k):this.qh(k)}};c.prototype.Pn=function(k){var m=void 0;try{m=k.then}catch(n){this.sf(n);return}typeof m==t?this.oo(m,k):this.qh(k)};c.prototype.sf=function(k){this.aj(g.Ja,k)};c.prototype.qh=function(k){this.aj(g.nb,k)};c.prototype.aj=function(k,m){if(this.qa!=g.$a)throw Error("Cannot settle("+k+", "+m+"): Promise already settled in state"+this.qa);this.qa=k;this.Ia=m;this.Ql()};c.prototype.Ql=function(){if(null!=this.ic){for(var k=0;k<this.ic.length;++k)h.Ig(this.ic[k]);
this.ic=null}};var h=new d;c.prototype.no=function(k){var m=this.De();k.dd(m.resolve,m.reject)};c.prototype.oo=function(k,m){var n=this.De();try{k.call(m,n.resolve,n.reject)}catch(r){n.reject(r)}};c.prototype.then=function(k,m){function n(z,C){return typeof z==t?function(U){try{r(z(U))}catch(V){w(V)}}:C}var r,w,W=new c(function(z,C){r=z;w=C});this.dd(n(k,r),n(m,w));return W};c.prototype["catch"]=function(k){return this.then(void 0,k)};c.prototype.dd=function(k,m){function n(){switch(r.qa){case g.nb:k(r.Ia);
break;case g.Ja:m(r.Ia);break;default:throw Error("Unexpected state: "+r.qa);}}var r=this;null==this.ic?h.Ig(n):this.ic.push(n)};c.resolve=e;c.reject=function(k){return new c(function(m,n){n(k)})};c.race=function(k){return new c(function(m,n){for(var r=G.Dd(k),w=r.next();!w.done;w=r.next())e(w.value).dd(m,n)})};c.all=function(k){var m=G.Dd(k),n=m.next();return n.done?e([]):new c(function(r,w){function W(U){return function(V){z[U]=V;C--;0==C&&r(z)}}var z=[],C=0;do z.push(void 0),C++,e(n.value).dd(W(z.length-
1),w),n=m.next();while(!n.done)})};return c});G.Pc("Object.is",function(b){return b?b:function(c,d){return c===d?0!==c||1/c===1/d:c!==c&&d!==d}});G.Pc("Array.prototype.includes",function(b){return b?b:function(c,d){var e=this;e instanceof String&&(e=String(e));var f=e.length;d=d||0;for(0>d&&(d=Math.max(d+f,0));d<f;d++){var g=e[d];if(g===c||Object.is(g,c))return!0}return!1}});G.Pc("String.prototype.includes",function(b){return b?b:function(c,d){return-1!==G.Rg(this,c,"includes").indexOf(c,d||0)}});
var H=H||{};H.global=this||self;H.ca=function(b){return void 0!==b};H.L=function(b){return typeof b==y};H.Em=function(b){return"boolean"==typeof b};H.Bb=function(b){return typeof b==u};H.ih=function(b,c,d){b=b.split(".");d=d||H.global;b[0]in d||"undefined"==typeof d.execScript||d.execScript("var "+b[0]);for(var e;b.length&&(e=b.shift());)!b.length&&H.ca(c)?d[e]=c:d=d[e]&&d[e]!==Object.prototype[e]?d[e]:d[e]={}};H.define=function(b,c){return c};H.eq=2012;H.sa=!0;H.S="en";H.pe=!0;H.Ck=!1;H.Vj=!H.sa;
H.Yp=!1;H.kw=function(b){if(H.mi())throw Error("goog.provide cannot be used within a module.");H.Wg(b)};H.Wg=function(b,c){H.ih(b,c)};H.Sh=function(){null===H.Ee&&(H.Ee=H.km());return H.Ee};H.kk=/^[\w+/_-]+[=]{0,2}$/;H.Ee=null;H.km=function(){var b=H.global.document;return(b=b.querySelector&&b.querySelector("script[nonce]"))&&(b=b.nonce||b.getAttribute("nonce"))&&H.kk.test(b)?b:""};H.Jk=/^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
H.pf=function(b){if(!H.L(b)||!b||-1==b.search(H.Jk))throw Error("Invalid module identifier");if(!H.li())throw Error("Module "+b+" has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
if(H.Fa.Mc)throw Error("goog.module may only be called once per module.");H.Fa.Mc=b};H.pf.get=E(null);H.pf.Au=E(null);H.rc={bg:"es6",je:"goog"};H.Fa=null;H.mi=function(){return H.li()||H.Lm()};H.li=function(){return!!H.Fa&&H.Fa.type==H.rc.je};H.Lm=function(){if(H.Fa&&H.Fa.type==H.rc.bg)return!0;var b=H.global.$jscomp;return b?typeof b.Ne!=t?!1:!!b.Ne():!1};H.pf.Fe=function(){H.Fa.Fe=!0};
H.Jt=function(b){if(H.Fa)H.Fa.Mc=b;else{var c=H.global.$jscomp;if(!c||typeof c.Ne!=t)throw Error('Module with namespace "'+b+'" has been loaded incorrectly.');c=c.Nn(c.Ne());H.Ei[b]={Sl:c,type:H.rc.bg,un:b}}};H.dx=function(b){if(H.Vj)throw b=b||"",Error("Importing test-only code into non-debug environment"+(b?": "+b:"."));};H.fu=B();H.wb=function(b){b=b.split(".");for(var c=H.global,d=0;d<b.length;d++)if(c=c[b[d]],!H.zb(c))return null;return c};
H.Qu=function(b,c){c=c||H.global;for(var d in b)c[d]=b[d]};H.As=B();H.Gx=!1;H.Zp=!0;H.Fi=function(b){H.global.console&&H.global.console.error(b)};H.Nn=B();H.vw=function(){return{}};H.hl="";H.Rb=B();H.ys=function(){throw Error("unimplemented abstract method");};H.Bs=B();H.bv=[];H.Wq=!0;H.yk=H.sa;H.Ei={};H.Kp=!1;H.ls="detect";H.gp=!1;H.ms="";H.Ek="transpile.js";H.$e=null;
H.Mo=function(){if(null==H.$e){try{var b=!eval('"use strict";let x = 1; function f() { return typeof x; };f() == "number";')}catch(c){b=!1}H.$e=b}return H.$e};H.Ro=function(b){return"(function(){"+b+"\n;})();\n"};
H.Pv=function(b){var c=H.Fa;try{H.Fa={Mc:"",Fe:!1,type:H.rc.je};if(H.Wa(b))var d=b.call(void 0,{});else if(H.L(b))H.Mo()&&(b=H.Ro(b)),d=H.gn.call(void 0,b);else throw Error("Invalid module definition");var e=H.Fa.Mc;if(H.L(e)&&e)H.Fa.Fe?H.Wg(e,d):H.yk&&Object.seal&&typeof d==v&&null!=d&&Object.seal(d),H.Ei[e]={Sl:d,type:H.rc.je,un:H.Fa.Mc};else throw Error('Invalid module name "'+e+'"');}finally{H.Fa=c}};H.gn=function(b){eval(b);return{}};
H.$v=function(b){b=b.split("/");for(var c=0;c<b.length;)"."==b[c]?b.splice(c,1):c&&".."==b[c]&&b[c-1]&&".."!=b[c-1]?b.splice(--c,2):c++;return b.join("/")};H.cn=function(b){if(H.global.Oj)return H.global.Oj(b);try{var c=new H.global.XMLHttpRequest;c.open("get",b,!1);c.send();return 0==c.status||200==c.status?c.responseText:null}catch(d){return null}};
H.Ax=function(b,c,d){var e=H.global.$jscomp;e||(H.global.$jscomp=e={});var f=e.Gf;if(!f){var g=H.hl+H.Ek,h=H.cn(g);if(h){(function(){(0,eval)(h+"\n//# sourceURL="+g)}).call(H.global);if(H.global.$gwtExport&&H.global.$gwtExport.$jscomp&&!H.global.$gwtExport.$jscomp.transpile)throw Error('The transpiler did not properly export the "transpile" method. $gwtExport: '+JSON.stringify(H.global.$gwtExport));H.global.$jscomp.Gf=H.global.$gwtExport.$jscomp.transpile;e=H.global.$jscomp;f=e.Gf}}if(!f){var k=" requires transpilation but no transpiler was found.";
k+=' Please add "//javascript/closure:transpiler" as a data dependency to ensure it is included.';f=e.Gf=function(m,n){H.Fi(n+k);return m}}return f(b,c,d)};
H.ra=function(b){var c=typeof b;if(c==v)if(b){if(b instanceof Array)return q;if(b instanceof Object)return c;var d=Object.prototype.toString.call(b);if("[object Window]"==d)return v;if("[object Array]"==d||typeof b.length==u&&"undefined"!=typeof b.splice&&"undefined"!=typeof b.propertyIsEnumerable&&!b.propertyIsEnumerable("splice"))return q;if("[object Function]"==d||"undefined"!=typeof b.call&&"undefined"!=typeof b.propertyIsEnumerable&&!b.propertyIsEnumerable("call"))return t}else return"null";
else if(c==t&&"undefined"==typeof b.call)return v;return c};H.zv=function(b){return null===b};H.zb=function(b){return null!=b};H.isArray=function(b){return H.ra(b)==q};H.ma=function(b){var c=H.ra(b);return c==q||c==v&&typeof b.length==u};H.kv=function(b){return H.Da(b)&&typeof b.getFullYear==t};H.Wa=function(b){return H.ra(b)==t};H.Da=function(b){var c=typeof b;return c==v&&null!=b||c==t};H.Uh=function(b){return b[H.Gb]||(b[H.Gb]=++H.Eo)};H.Vu=function(b){return!!b[H.Gb]};
H.Mn=function(b){null!==b&&"removeAttribute"in b&&b.removeAttribute(H.Gb);try{delete b[H.Gb]}catch(c){}};H.Gb="closure_uid_"+(1E9*Math.random()>>>0);H.Eo=0;H.yu=H.Uh;H.qw=H.Mn;H.ul=function(b){var c=H.ra(b);if(c==v||c==q){if(typeof b.clone===t)return b.clone();c=c==q?[]:{};for(var d in b)c[d]=H.ul(b[d]);return c}return b};H.jl=function(b,c,d){return b.call.apply(b.bind,arguments)};
H.il=function(b,c,d){if(!b)throw Error();if(2<arguments.length){var e=Array.prototype.slice.call(arguments,2);return function(){var f=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(f,e);return b.apply(c,f)}}return function(){return b.apply(c,arguments)}};H.bind=function(b,c,d){H.bind=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?H.jl:H.il;return H.bind.apply(null,arguments)};
H.Sb=function(b,c){var d=Array.prototype.slice.call(arguments,1);return function(){var e=d.slice();e.push.apply(e,arguments);return b.apply(this,e)}};H.Vv=function(b,c){for(var d in c)b[d]=c[d]};H.now=H.pe&&Date.now||function(){return+new Date};
H.Pu=function(b){if(H.global.execScript)H.global.execScript(b,"JavaScript");else if(H.global.eval){if(null==H.nd){try{H.global.eval("var _evalTest_ = 1;")}catch(e){}if("undefined"!=typeof H.global._evalTest_){try{delete H.global._evalTest_}catch(e){}H.nd=!0}else H.nd=!1}if(H.nd)H.global.eval(b);else{var c=H.global.document,d=c.createElement(l);d.type=da;d.defer=!1;d.appendChild(c.createTextNode(b));c.head.appendChild(d);c.head.removeChild(d)}}else throw Error("goog.globalEval not available");};
H.nd=null;H.vu=function(b,c){function d(g){g=g.split("-");for(var h=[],k=0;k<g.length;k++)h.push(e(g[k]));return h.join("-")}function e(g){return H.ah[g]||g}if("."==String(b).charAt(0))throw Error('className passed in goog.getCssName must not start with ".". You passed: '+b);var f=H.ah?"BY_WHOLE"==H.Bl?e:d:A();b=c?b+"-"+f(c):f(b);return H.global.Nj?H.global.Nj(b):b};H.Lw=function(b,c){H.ah=b;H.Bl=c};
H.Bu=function(b,c,d){d&&d.b&&(b=b.replace(/</g,"&lt;"));c&&(b=b.replace(/\{\$([^}]+)}/g,function(e,f){return null!=c&&f in c?c[f]:e}));return b};H.Cu=A();H.Dc=function(b,c){H.ih(b,c,void 0)};H.Wt=function(b,c,d){b[c]=d};H.yb=function(b,c){function d(){}d.prototype=c.prototype;b.gj=c.prototype;b.prototype=new d;b.prototype.constructor=b;b.gl=function(e,f,g){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return c.prototype[f].apply(e,h)}};
H.gl=function(b,c,d){var e=arguments.callee.caller;if(H.Ck||H.sa&&!e)throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");if("undefined"!==typeof e.gj){for(var f=Array(arguments.length-1),g=1;g<arguments.length;g++)f[g-1]=arguments[g];return e.gj.constructor.apply(b,f)}if(typeof c!=y&&"symbol"!=typeof c)throw Error("method names provided to goog.base must be a string or a symbol");f=Array(arguments.length-
2);for(g=2;g<arguments.length;g++)f[g-2]=arguments[g];g=!1;for(var h=b.constructor.prototype;h;h=Object.getPrototypeOf(h))if(h[c]===e)g=!0;else if(g)return h[c].apply(b,f);if(b[c]===e)return b.constructor.prototype[c].apply(b,f);throw Error("goog.base called from a method of one name to a method of a different name");};H.scope=function(b){if(H.mi())throw Error("goog.scope is not supported within a module.");b.call(H.global)};
H.La=function(b,c){var d=c.constructor,e=c.to;d&&d!=Object.prototype.constructor||(d=function(){throw Error("cannot instantiate an interface (no constructor defined).");});d=H.La.xl(d,b);b&&H.yb(d,b);delete c.constructor;delete c.to;H.La.Fg(d.prototype,c);null!=e&&(e instanceof Function?e(d):H.La.Fg(d,e));return d};H.La.xk=H.sa;
H.La.xl=function(b,c){function d(){var f=b.apply(this,arguments)||this;f[H.Gb]=f[H.Gb];this.constructor===d&&e&&Object.seal instanceof Function&&Object.seal(f);return f}if(!H.La.xk)return b;var e=!H.La.Wm(c);return d};H.La.Wm=function(b){return b&&b.prototype&&b.prototype[H.Gk]};H.La.ng=["constructor",ba,"isPrototypeOf",ca,ea,"toString","valueOf"];
H.La.Fg=function(b,c){for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(b[d]=c[d]);for(var e=0;e<H.La.ng.length;e++)d=H.La.ng[e],Object.prototype.hasOwnProperty.call(c,d)&&(b[d]=c[d])};H.tx=B();H.Gk="goog_defineClass_legacy_unsealable";H.ad="";H.Ad=A();H.$g=function(b){var c=null;if("undefined"===typeof TrustedTypes||!TrustedTypes.createPolicy)return c;try{c=TrustedTypes.createPolicy(b,{createHTML:H.Ad,createScript:H.Ad,createScriptURL:H.Ad,createURL:H.Ad})}catch(d){H.Fi(d.message)}return c};
H.os=H.ad?H.$g(H.ad+"#base"):null;H.debug={};H.debug.Error=function(b){if(Error.captureStackTrace)Error.captureStackTrace(this,H.debug.Error);else{var c=Error().stack;c&&(this.stack=c)}b&&(this.message=String(b))};H.yb(H.debug.Error,Error);H.debug.Error.prototype.name="CustomError";H.a={};H.a.ua={mb:1,jp:2,$c:3,yp:4,aq:5,$p:6,zr:7,Fp:8,Uc:9,Sp:10,Wj:11,lr:12};H.m={};H.m.za=H.sa;H.m.oc=function(b,c){H.debug.Error.call(this,H.m.vo(b,c))};H.yb(H.m.oc,H.debug.Error);H.m.oc.prototype.name="AssertionError";H.m.Sj=function(b){throw b;};H.m.Ge=H.m.Sj;H.m.vo=function(b,c){b=b.split("%s");for(var d="",e=b.length-1,f=0;f<e;f++)d+=b[f]+(f<c.length?c[f]:"%s");return d+b[e]};H.m.Ta=function(b,c,d,e){var f="Assertion failed";if(d){f+=": "+d;var g=e}else b&&(f+=": "+b,g=c);b=new H.m.oc(""+f,g||[]);H.m.Ge(b)};H.m.Pw=function(b){H.m.za&&(H.m.Ge=b)};
H.m.assert=function(b,c,d){H.m.za&&!b&&H.m.Ta("",null,c,Array.prototype.slice.call(arguments,2));return b};H.m.Ms=function(b,c,d){H.m.za&&null==b&&H.m.Ta("Expected to exist: %s.",[b],c,Array.prototype.slice.call(arguments,2));return b};H.m.xa=function(b,c){H.m.za&&H.m.Ge(new H.m.oc("Failure"+(b?": "+b:""),Array.prototype.slice.call(arguments,1)))};H.m.Us=function(b,c,d){H.m.za&&!H.Bb(b)&&H.m.Ta("Expected number but got %s: %s.",[H.ra(b),b],c,Array.prototype.slice.call(arguments,2));return b};
H.m.Xs=function(b,c,d){H.m.za&&!H.L(b)&&H.m.Ta("Expected string but got %s: %s.",[H.ra(b),b],c,Array.prototype.slice.call(arguments,2));return b};H.m.Os=function(b,c,d){H.m.za&&!H.Wa(b)&&H.m.Ta("Expected function but got %s: %s.",[H.ra(b),b],c,Array.prototype.slice.call(arguments,2));return b};H.m.Vs=function(b,c,d){H.m.za&&!H.Da(b)&&H.m.Ta("Expected object but got %s: %s.",[H.ra(b),b],c,Array.prototype.slice.call(arguments,2));return b};
H.m.Js=function(b,c,d){H.m.za&&!H.isArray(b)&&H.m.Ta("Expected array but got %s: %s.",[H.ra(b),b],c,Array.prototype.slice.call(arguments,2));return b};H.m.Ks=function(b,c,d){H.m.za&&!H.Em(b)&&H.m.Ta("Expected boolean but got %s: %s.",[H.ra(b),b],c,Array.prototype.slice.call(arguments,2));return b};H.m.Ls=function(b,c,d){!H.m.za||H.Da(b)&&b.nodeType==H.a.ua.mb||H.m.Ta("Expected Element but got %s: %s.",[H.ra(b),b],c,Array.prototype.slice.call(arguments,2));return b};
H.m.Ps=function(b,c,d,e){!H.m.za||b instanceof c||H.m.Ta("Expected instanceof %s but got %s.",[H.m.Th(c),H.m.Th(b)],d,Array.prototype.slice.call(arguments,3));return b};H.m.Ns=function(b,c,d){!H.m.za||typeof b==u&&isFinite(b)||H.m.Ta("Expected %s to be a finite number but it is not.",[b],c,Array.prototype.slice.call(arguments,2));return b};H.m.Ws=function(){for(var b in Object.prototype)H.m.xa(b+" should not be enumerable in Object.prototype.")};
H.m.Th=function(b){return b instanceof Function?b.displayName||b.name||"unknown type name":b instanceof Object?b.constructor.displayName||b.constructor.name||Object.prototype.toString.call(b):null===b?"null":typeof b};H.g={};H.fb=H.pe;H.g.cb=!1;H.g.zn=function(b){return b[b.length-1]};H.g.Lv=H.g.zn;H.g.indexOf=H.fb&&(H.g.cb||Array.prototype.indexOf)?function(b,c,d){return Array.prototype.indexOf.call(b,c,d)}:function(b,c,d){d=null==d?0:0>d?Math.max(0,b.length+d):d;if(H.L(b))return H.L(c)&&1==c.length?b.indexOf(c,d):-1;for(;d<b.length;d++)if(d in b&&b[d]===c)return d;return-1};
H.g.lastIndexOf=H.fb&&(H.g.cb||Array.prototype.lastIndexOf)?function(b,c,d){return Array.prototype.lastIndexOf.call(b,c,null==d?b.length-1:d)}:function(b,c,d){d=null==d?b.length-1:d;0>d&&(d=Math.max(0,b.length+d));if(H.L(b))return H.L(c)&&1==c.length?b.lastIndexOf(c,d):-1;for(;0<=d;d--)if(d in b&&b[d]===c)return d;return-1};
H.g.forEach=H.fb&&(H.g.cb||Array.prototype.forEach)?function(b,c,d){Array.prototype.forEach.call(b,c,d)}:function(b,c,d){for(var e=b.length,f=H.L(b)?b.split(""):b,g=0;g<e;g++)g in f&&c.call(d,f[g],g,b)};H.g.ph=function(b,c){var d=b.length,e=H.L(b)?b.split(""):b;for(--d;0<=d;--d)d in e&&c.call(void 0,e[d],d,b)};
H.g.filter=H.fb&&(H.g.cb||Array.prototype.filter)?function(b,c,d){return Array.prototype.filter.call(b,c,d)}:function(b,c,d){for(var e=b.length,f=[],g=0,h=H.L(b)?b.split(""):b,k=0;k<e;k++)if(k in h){var m=h[k];c.call(d,m,k,b)&&(f[g++]=m)}return f};H.g.map=H.fb&&(H.g.cb||Array.prototype.map)?function(b,c,d){return Array.prototype.map.call(b,c,d)}:function(b,c,d){for(var e=b.length,f=Array(e),g=H.L(b)?b.split(""):b,h=0;h<e;h++)h in g&&(f[h]=c.call(d,g[h],h,b));return f};
H.g.reduce=H.fb&&(H.g.cb||Array.prototype.reduce)?function(b,c,d,e){e&&(c=H.bind(c,e));return Array.prototype.reduce.call(b,c,d)}:function(b,c,d,e){var f=d;H.g.forEach(b,function(g,h){f=c.call(e,f,g,h,b)});return f};H.g.reduceRight=H.fb&&(H.g.cb||Array.prototype.reduceRight)?function(b,c,d,e){e&&(c=H.bind(c,e));return Array.prototype.reduceRight.call(b,c,d)}:function(b,c,d,e){var f=d;H.g.ph(b,function(g,h){f=c.call(e,f,g,h,b)});return f};
H.g.some=H.fb&&(H.g.cb||Array.prototype.some)?function(b,c,d){return Array.prototype.some.call(b,c,d)}:function(b,c,d){for(var e=b.length,f=H.L(b)?b.split(""):b,g=0;g<e;g++)if(g in f&&c.call(d,f[g],g,b))return!0;return!1};H.g.every=H.fb&&(H.g.cb||Array.prototype.every)?function(b,c,d){return Array.prototype.every.call(b,c,d)}:function(b,c,d){for(var e=b.length,f=H.L(b)?b.split(""):b,g=0;g<e;g++)if(g in f&&!c.call(d,f[g],g,b))return!1;return!0};
H.g.count=function(b,c,d){var e=0;H.g.forEach(b,function(f,g,h){c.call(d,f,g,h)&&++e},d);return e};H.g.find=function(b,c,d){c=H.g.findIndex(b,c,d);return 0>c?null:H.L(b)?b.charAt(c):b[c]};H.g.findIndex=function(b,c,d){for(var e=b.length,f=H.L(b)?b.split(""):b,g=0;g<e;g++)if(g in f&&c.call(d,f[g],g,b))return g;return-1};H.g.au=function(b,c,d){c=H.g.Tl(b,c,d);return 0>c?null:H.L(b)?b.charAt(c):b[c]};
H.g.Tl=function(b,c,d){var e=b.length,f=H.L(b)?b.split(""):b;for(--e;0<=e;e--)if(e in f&&c.call(d,f[e],e,b))return e;return-1};H.g.contains=function(b,c){return 0<=H.g.indexOf(b,c)};H.g.Ca=function(b){return 0==b.length};H.g.clear=function(b){if(!H.isArray(b))for(var c=b.length-1;0<=c;c--)delete b[c];b.length=0};H.g.Zu=function(b,c){H.g.contains(b,c)||b.push(c)};H.g.bi=function(b,c,d){H.g.splice(b,d,0,c)};H.g.av=function(b,c,d){H.Sb(H.g.splice,b,d,0).apply(null,c)};
H.g.insertBefore=function(b,c,d){var e;2==arguments.length||0>(e=H.g.indexOf(b,d))?b.push(c):H.g.bi(b,c,e)};H.g.remove=function(b,c){c=H.g.indexOf(b,c);var d;(d=0<=c)&&H.g.kc(b,c);return d};H.g.sw=function(b,c){c=H.g.lastIndexOf(b,c);return 0<=c?(H.g.kc(b,c),!0):!1};H.g.kc=function(b,c){return 1==Array.prototype.splice.call(b,c,1).length};H.g.rw=function(b,c,d){c=H.g.findIndex(b,c,d);return 0<=c?(H.g.kc(b,c),!0):!1};
H.g.pw=function(b,c,d){var e=0;H.g.ph(b,function(f,g){c.call(d,f,g,b)&&H.g.kc(b,g)&&e++});return e};H.g.concat=function(b){return Array.prototype.concat.apply([],arguments)};H.g.join=function(b){return Array.prototype.concat.apply([],arguments)};H.g.jb=function(b){var c=b.length;if(0<c){for(var d=Array(c),e=0;e<c;e++)d[e]=b[e];return d}return[]};H.g.clone=H.g.jb;
H.g.extend=function(b,c){for(var d=1;d<arguments.length;d++){var e=arguments[d];if(H.ma(e)){var f=b.length||0,g=e.length||0;b.length=f+g;for(var h=0;h<g;h++)b[f+h]=e[h]}else b.push(e)}};H.g.splice=function(b,c,d,e){return Array.prototype.splice.apply(b,H.g.slice(arguments,1))};H.g.slice=function(b,c,d){return 2>=arguments.length?Array.prototype.slice.call(b,c):Array.prototype.slice.call(b,c,d)};
H.g.Jn=function(b,c){c=c||b;for(var d={},e=0,f=0;f<b.length;){var g=b[f++];var h=g;h=H.Da(h)?"o"+H.Uh(h):(typeof h).charAt(0)+h;Object.prototype.hasOwnProperty.call(d,h)||(d[h]=!0,c[e++]=g)}c.length=e};H.g.Kg=function(b,c,d){return H.g.Lg(b,d||H.g.sb,!1,c)};H.g.at=function(b,c,d){return H.g.Lg(b,c,!0,void 0,d)};H.g.Lg=function(b,c,d,e,f){for(var g=0,h=b.length,k;g<h;){var m=g+h>>1;var n=d?c.call(f,b[m],m,b):c(e,b[m]);0<n?g=m+1:(h=m,k=!n)}return k?g:~g};H.g.sort=function(b,c){b.sort(c||H.g.sb)};
H.g.mx=function(b,c){for(var d=Array(b.length),e=0;e<b.length;e++)d[e]={index:e,value:b[e]};var f=c||H.g.sb;H.g.sort(d,function(g,h){return f(g.value,h.value)||g.index-h.index});for(e=0;e<b.length;e++)b[e]=d[e].value};H.g.qo=function(b,c,d){var e=d||H.g.sb;H.g.sort(b,function(f,g){return e(c(f),c(g))})};H.g.jx=function(b,c,d){H.g.qo(b,function(e){return e[c]},d)};H.g.wi=function(b){for(var c=H.g.sb,d=1;d<b.length;d++)if(0<c(b[d-1],b[d]))return!1;return!0};
H.g.Ob=function(b,c){if(!H.ma(b)||!H.ma(c)||b.length!=c.length)return!1;for(var d=b.length,e=H.g.eh,f=0;f<d;f++)if(!e(b[f],c[f]))return!1;return!0};H.g.nt=function(b,c,d){d=d||H.g.sb;for(var e=Math.min(b.length,c.length),f=0;f<e;f++){var g=d(b[f],c[f]);if(0!=g)return g}return H.g.sb(b.length,c.length)};H.g.sb=function(b,c){return b>c?1:b<c?-1:0};H.g.dv=function(b,c){return-H.g.sb(b,c)};H.g.eh=function(b,c){return b===c};H.g.Zs=function(b,c,d){d=H.g.Kg(b,c,d);return 0>d?(H.g.bi(b,c,-(d+1)),!0):!1};
H.g.$s=function(b,c,d){c=H.g.Kg(b,c,d);return 0<=c?H.g.kc(b,c):!1};H.g.ct=function(b,c,d){for(var e={},f=0;f<b.length;f++){var g=b[f],h=c.call(d,g,f,b);H.ca(h)&&(e[h]||(e[h]=[])).push(g)}return e};H.g.Ao=function(b,c,d){var e={};H.g.forEach(b,function(f,g){e[c.call(d,f,g,b)]=f});return e};H.g.Qd=function(b,c,d){var e=[],f=0,g=b;d=d||1;void 0!==c&&(f=b,g=c);if(0>d*(g-f))return[];if(0<d)for(b=f;b<g;b+=d)e.push(b);else for(b=f;b>g;b+=d)e.push(b);return e};
H.g.repeat=function(b,c){for(var d=[],e=0;e<c;e++)d[e]=b;return d};H.g.flatten=function(b){for(var c=[],d=0;d<arguments.length;d++){var e=arguments[d];if(H.isArray(e))for(var f=0;f<e.length;f+=8192){var g=H.g.slice(e,f,f+8192);g=H.g.flatten.apply(null,g);for(var h=0;h<g.length;h++)c.push(g[h])}else c.push(e)}return c};H.g.rotate=function(b,c){b.length&&(c%=b.length,0<c?Array.prototype.unshift.apply(b,b.splice(-c,c)):0>c&&Array.prototype.push.apply(b,b.splice(0,-c)));return b};
H.g.Xv=function(b,c,d){c=Array.prototype.splice.call(b,c,1);Array.prototype.splice.call(b,d,0,c[0])};H.g.uj=function(b){if(!arguments.length)return[];for(var c=[],d=arguments[0].length,e=1;e<arguments.length;e++)arguments[e].length<d&&(d=arguments[e].length);for(e=0;e<d;e++){for(var f=[],g=0;g<arguments.length;g++)f.push(arguments[g][e]);c.push(f)}return c};H.g.ix=function(b,c){c=c||Math.random;for(var d=b.length-1;0<d;d--){var e=Math.floor(c()*(d+1)),f=b[d];b[d]=b[e];b[e]=f}};
H.g.tt=function(b,c){var d=[];H.g.forEach(c,function(e){d.push(b[e])});return d};H.g.qt=function(b,c,d){return H.g.concat.apply([],H.g.map(b,c,d))};H.async={};H.async.Wc=function(b,c,d){this.bn=d;this.Al=b;this.On=c;this.Fd=0;this.zd=null};H.async.Wc.prototype.get=function(){if(0<this.Fd){this.Fd--;var b=this.zd;this.zd=b.next;b.next=null}else b=this.Al();return b};H.async.Wc.prototype.put=function(b){this.On(b);this.Fd<this.bn&&(this.Fd++,b.next=this.zd,this.zd=b)};H.debug.pa={};H.debug.bq=B();H.debug.pa.jc=[];H.debug.pa.qf=[];H.debug.pa.Mi=!1;H.debug.pa.register=function(b){H.debug.pa.jc[H.debug.pa.jc.length]=b;if(H.debug.pa.Mi)for(var c=H.debug.pa.qf,d=0;d<c.length;d++)b(H.bind(c[d].So,c[d]))};H.debug.pa.Wv=function(b){H.debug.pa.Mi=!0;for(var c=H.bind(b.So,b),d=0;d<H.debug.pa.jc.length;d++)H.debug.pa.jc[d](c);H.debug.pa.qf.push(b)};H.debug.pa.Fx=function(b){var c=H.debug.pa.qf;b=H.bind(b.K,b);for(var d=0;d<H.debug.pa.jc.length;d++)H.debug.pa.jc[d](b);c.length--};H.a.m={};H.a.m.we=function(b){if(H.m.za){var c=H.a.m.ec(b);c&&(!b||!(b instanceof c.Location)&&b instanceof c.Element)&&H.m.xa("Argument is not a Location (or a non-Element mock); got: %s",H.a.m.dh(b))}};H.a.m.Aa=function(b,c){if(H.m.za){var d=H.a.m.ec(b);d&&"undefined"!=typeof d[c]&&(b&&(b instanceof d[c]||!(b instanceof d.Location||b instanceof d.Element))||H.m.xa("Argument is not a %s (or a non-Element, non-Location mock); got: %s",c,H.a.m.dh(b)))}return b};H.a.m.Uk=function(b){H.a.m.Aa(b,"HTMLAnchorElement")};
H.a.m.Wk=function(b){return H.a.m.Aa(b,"HTMLButtonElement")};H.a.m.bl=function(b){H.a.m.Aa(b,"HTMLLinkElement")};H.a.m.$k=function(b){H.a.m.Aa(b,"HTMLImageElement")};H.a.m.Vk=function(b){H.a.m.Aa(b,"HTMLAudioElement")};H.a.m.dl=function(b){H.a.m.Aa(b,"HTMLVideoElement")};H.a.m.al=function(b){return H.a.m.Aa(b,"HTMLInputElement")};H.a.m.Rs=function(b){return H.a.m.Aa(b,"HTMLTextAreaElement")};H.a.m.Qs=function(b){return H.a.m.Aa(b,"HTMLCanvasElement")};H.a.m.Xk=function(b){H.a.m.Aa(b,"HTMLEmbedElement")};
H.a.m.Yk=function(b){return H.a.m.Aa(b,"HTMLFormElement")};H.a.m.Zk=function(b){H.a.m.Aa(b,"HTMLFrameElement")};H.a.m.Gg=function(b){H.a.m.Aa(b,"HTMLIFrameElement")};H.a.m.cl=function(b){H.a.m.Aa(b,"HTMLObjectElement")};H.a.m.Hg=function(b){H.a.m.Aa(b,"HTMLScriptElement")};H.a.m.dh=function(b){if(H.Da(b))try{return b.constructor.displayName||b.constructor.name||Object.prototype.toString.call(b)}catch(c){return"<object could not be stringified>"}else return void 0===b?"undefined":null===b?"null":typeof b};
H.a.m.ec=function(b){try{var c=b&&b.ownerDocument,d=c&&(c.defaultView||c.parentWindow);d=d||H.global;if(d.Element&&d.Location)return d}catch(e){}return null};H.V={};H.V.Vg=function(b){return function(){return b}};H.V.cq=E(!1);H.V.ns=E(!0);H.V.mr=E(null);H.V.ai=A();H.V.error=function(b){return function(){throw Error(b);}};H.V.xa=function(b){return function(){throw b;}};H.V.lock=function(b,c){c=c||0;return function(){return b.apply(this,Array.prototype.slice.call(arguments,0,c))}};H.V.cw=function(b){return function(){return arguments[b]}};
H.V.iw=function(b,c){var d=Array.prototype.slice.call(arguments,1);return function(){var e=Array.prototype.slice.call(arguments);e.push.apply(e,d);return b.apply(this,e)}};H.V.Jx=function(b,c){return H.V.fo(b,H.V.Vg(c))};H.V.Ut=function(b,c){return function(d){return c?b==d:b===d}};H.V.ot=function(b,c){var d=arguments,e=d.length;return function(){var f;e&&(f=d[e-1].apply(this,arguments));for(var g=e-2;0<=g;g--)f=d[g].call(this,f);return f}};
H.V.fo=function(b){var c=arguments,d=c.length;return function(){for(var e,f=0;f<d;f++)e=c[f].apply(this,arguments);return e}};H.V.and=function(b){var c=arguments,d=c.length;return function(){for(var e=0;e<d;e++)if(!c[e].apply(this,arguments))return!1;return!0}};H.V.or=function(b){var c=arguments,d=c.length;return function(){for(var e=0;e<d;e++)if(c[e].apply(this,arguments))return!0;return!1}};H.V.xn=function(b){return function(){return!b.apply(this,arguments)}};
H.V.create=function(b,c){function d(){}d.prototype=b.prototype;var e=new d;b.apply(e,Array.prototype.slice.call(arguments,1));return e};H.V.Jj=!0;H.V.ol=function(b){var c=!1,d;return function(){if(!H.V.Jj)return b();c||(d=b(),c=!0);return d}};H.V.once=function(b){var c=b;return function(){if(c){var d=c;c=null;d()}}};H.V.It=function(b,c,d){var e=0;return function(f){H.global.clearTimeout(e);var g=arguments;e=H.global.setTimeout(function(){b.apply(d,g)},c)}};
H.V.vx=function(b,c,d){function e(){g=H.global.setTimeout(f,c);b.apply(d,k)}function f(){g=0;h&&(h=!1,e())}var g=0,h=!1,k=[];return function(m){k=arguments;g?h=!0:e()}};H.V.mw=function(b,c,d){function e(){f=0}var f=0;return function(g){f||(f=H.global.setTimeout(e,c),b.apply(d,arguments))}};H.a.zq=B();H.a.f=function(b){this.wo=b};H.a.f.prototype.toString=D("wo");H.a.f.Uo=new H.a.f("A");H.a.f.Vo=new H.a.f("ABBR");H.a.f.Xo=new H.a.f("ACRONYM");H.a.f.Yo=new H.a.f("ADDRESS");H.a.f.bp=new H.a.f("APPLET");H.a.f.cp=new H.a.f("AREA");H.a.f.ep=new H.a.f("ARTICLE");H.a.f.fp=new H.a.f("ASIDE");H.a.f.kp=new H.a.f("AUDIO");H.a.f.lp=new H.a.f("B");H.a.f.mp=new H.a.f("BASE");H.a.f.np=new H.a.f("BASEFONT");H.a.f.op=new H.a.f("BDI");H.a.f.pp=new H.a.f("BDO");H.a.f.sp=new H.a.f("BIG");H.a.f.tp=new H.a.f("BLOCKQUOTE");
H.a.f.up=new H.a.f("BODY");H.a.f.Xf=new H.a.f("BR");H.a.f.vp=new H.a.f("BUTTON");H.a.f.wp=new H.a.f("CANVAS");H.a.f.xp=new H.a.f("CAPTION");H.a.f.zp=new H.a.f("CENTER");H.a.f.Ap=new H.a.f("CITE");H.a.f.Bp=new H.a.f("CODE");H.a.f.Cp=new H.a.f("COL");H.a.f.Dp=new H.a.f("COLGROUP");H.a.f.Ep=new H.a.f("COMMAND");H.a.f.Gp=new H.a.f("DATA");H.a.f.Hp=new H.a.f("DATALIST");H.a.f.Ip=new H.a.f("DD");H.a.f.Jp=new H.a.f("DEL");H.a.f.Lp=new H.a.f("DETAILS");H.a.f.Mp=new H.a.f("DFN");H.a.f.Np=new H.a.f("DIALOG");
H.a.f.Op=new H.a.f("DIR");H.a.f.Pp=new H.a.f("DIV");H.a.f.Qp=new H.a.f("DL");H.a.f.Tp=new H.a.f("DT");H.a.f.Wp=new H.a.f("EM");H.a.f.Xp=new H.a.f("EMBED");H.a.f.fq=new H.a.f("FIELDSET");H.a.f.gq=new H.a.f("FIGCAPTION");H.a.f.hq=new H.a.f("FIGURE");H.a.f.iq=new H.a.f("FONT");H.a.f.jq=new H.a.f("FOOTER");H.a.f.kq=new H.a.f("FORM");H.a.f.lq=new H.a.f("FRAME");H.a.f.mq=new H.a.f("FRAMESET");H.a.f.oq=new H.a.f("H1");H.a.f.pq=new H.a.f("H2");H.a.f.qq=new H.a.f("H3");H.a.f.rq=new H.a.f("H4");H.a.f.sq=new H.a.f("H5");
H.a.f.tq=new H.a.f("H6");H.a.f.uq=new H.a.f("HEAD");H.a.f.vq=new H.a.f("HEADER");H.a.f.wq=new H.a.f("HGROUP");H.a.f.xq=new H.a.f("HR");H.a.f.yq=new H.a.f("HTML");H.a.f.Aq=new H.a.f("I");H.a.f.Dq=new H.a.f("IFRAME");H.a.f.Eq=new H.a.f("IMG");H.a.f.Fq=new H.a.f("INPUT");H.a.f.Gq=new H.a.f("INS");H.a.f.Lq=new H.a.f("ISINDEX");H.a.f.Oq=new H.a.f("KBD");H.a.f.Pq=new H.a.f("KEYGEN");H.a.f.Qq=new H.a.f("LABEL");H.a.f.Sq=new H.a.f("LEGEND");H.a.f.Tq=new H.a.f("LI");H.a.f.Uq=new H.a.f("LINK");H.a.f.Yq=new H.a.f("MAIN");
H.a.f.Zq=new H.a.f("MAP");H.a.f.$q=new H.a.f("MARK");H.a.f.ar=new H.a.f("MATH");H.a.f.cr=new H.a.f("MENU");H.a.f.dr=new H.a.f("MENUITEM");H.a.f.er=new H.a.f("META");H.a.f.fr=new H.a.f("METER");H.a.f.ir=new H.a.f("NAV");H.a.f.jr=new H.a.f("NOFRAMES");H.a.f.kr=new H.a.f("NOSCRIPT");H.a.f.nr=new H.a.f("OBJECT");H.a.f.qr=new H.a.f("OL");H.a.f.rr=new H.a.f("OPTGROUP");H.a.f.sr=new H.a.f("OPTION");H.a.f.tr=new H.a.f("OUTPUT");H.a.f.ur=new H.a.f("P");H.a.f.vr=new H.a.f("PARAM");H.a.f.wr=new H.a.f("PICTURE");
H.a.f.yr=new H.a.f("PRE");H.a.f.Ar=new H.a.f("PROGRESS");H.a.f.Q=new H.a.f("Q");H.a.f.Br=new H.a.f("RP");H.a.f.Cr=new H.a.f("RT");H.a.f.Dr=new H.a.f("RTC");H.a.f.Er=new H.a.f("RUBY");H.a.f.Gr=new H.a.f("S");H.a.f.Jr=new H.a.f("SAMP");H.a.f.Kr=new H.a.f(l);H.a.f.Lr=new H.a.f("SECTION");H.a.f.Mr=new H.a.f("SELECT");H.a.f.Or=new H.a.f("SMALL");H.a.f.Pr=new H.a.f("SOURCE");H.a.f.Qr=new H.a.f("SPAN");H.a.f.Rr=new H.a.f("STRIKE");H.a.f.Sr=new H.a.f("STRONG");H.a.f.Tr=new H.a.f("STYLE");H.a.f.Ur=new H.a.f("SUB");
H.a.f.Vr=new H.a.f("SUMMARY");H.a.f.Wr=new H.a.f("SUP");H.a.f.Xr=new H.a.f("SVG");H.a.f.Yr=new H.a.f("TABLE");H.a.f.Zr=new H.a.f("TBODY");H.a.f.$r=new H.a.f("TD");H.a.f.bs=new H.a.f("TEMPLATE");H.a.f.cs=new H.a.f("TEXTAREA");H.a.f.ds=new H.a.f("TFOOT");H.a.f.es=new H.a.f("TH");H.a.f.fs=new H.a.f("THEAD");H.a.f.gs=new H.a.f("TIME");H.a.f.hs=new H.a.f("TITLE");H.a.f.js=new H.a.f("TR");H.a.f.ks=new H.a.f("TRACK");H.a.f.ps=new H.a.f("TT");H.a.f.rs=new H.a.f("U");H.a.f.ss=new H.a.f("UL");H.a.f.ts=new H.a.f("VAR");
H.a.f.us=new H.a.f("VIDEO");H.a.f.vs=new H.a.f("WBR");H.object={};H.object.is=function(b,c){return b===c?0!==b||1/b===1/c:b!==b&&c!==c};H.object.forEach=function(b,c,d){for(var e in b)c.call(d,b[e],e,b)};H.object.filter=function(b,c,d){var e={},f;for(f in b)c.call(d,b[f],f,b)&&(e[f]=b[f]);return e};H.object.map=function(b,c,d){var e={},f;for(f in b)e[f]=c.call(d,b[f],f,b);return e};H.object.some=function(b,c,d){for(var e in b)if(c.call(d,b[e],e,b))return!0;return!1};H.object.every=function(b,c,d){for(var e in b)if(!c.call(d,b[e],e,b))return!1;return!0};
H.object.ub=function(b){var c=0,d;for(d in b)c++;return c};H.object.tu=function(b){for(var c in b)return c};H.object.uu=function(b){for(var c in b)return b[c]};H.object.contains=function(b,c){return H.object.Mb(b,c)};H.object.ga=function(b){var c=[],d=0,e;for(e in b)c[d++]=b[e];return c};H.object.la=function(b){var c=[],d=0,e;for(e in b)c[d++]=e;return c};H.object.Ou=function(b,c){var d=H.ma(c),e=d?c:arguments;for(d=d?0:1;d<e.length;d++){if(null==b)return;b=b[e[d]]}return b};
H.object.Lb=function(b,c){return null!==b&&c in b};H.object.Mb=function(b,c){for(var d in b)if(b[d]==c)return!0;return!1};H.object.Ul=function(b,c,d){for(var e in b)if(c.call(d,b[e],e,b))return e};H.object.bu=function(b,c,d){return(c=H.object.Ul(b,c,d))&&b[c]};H.object.Ca=function(b){for(var c in b)return!1;return!0};H.object.clear=function(b){for(var c in b)delete b[c]};H.object.remove=function(b,c){var d;(d=c in b)&&delete b[c];return d};
H.object.add=function(b,c,d){if(null!==b&&c in b)throw Error('The object already contains the key "'+c+'"');H.object.set(b,c,d)};H.object.get=function(b,c,d){return null!==b&&c in b?b[c]:d};H.object.set=function(b,c,d){b[c]=d};H.object.Tw=function(b,c,d){return c in b?b[c]:b[c]=d};H.object.hx=function(b,c,d){if(c in b)return b[c];d=d();return b[c]=d};H.object.Ob=function(b,c){for(var d in b)if(!(d in c)||b[d]!==c[d])return!1;for(var e in c)if(!(e in b))return!1;return!0};
H.object.clone=function(b){var c={},d;for(d in b)c[d]=b[d];return c};H.object.Jo=function(b){var c=H.ra(b);if(c==v||c==q){if(H.Wa(b.clone))return b.clone();c=c==q?[]:{};for(var d in b)c[d]=H.object.Jo(b[d]);return c}return b};H.object.Co=function(b){var c={},d;for(d in b)c[b[d]]=d;return c};H.object.qg=["constructor",ba,"isPrototypeOf",ca,ea,"toString","valueOf"];
H.object.extend=function(b,c){for(var d,e,f=1;f<arguments.length;f++){e=arguments[f];for(d in e)b[d]=e[d];for(var g=0;g<H.object.qg.length;g++)d=H.object.qg[g],Object.prototype.hasOwnProperty.call(e,d)&&(b[d]=e[d])}};H.object.create=function(b){var c=arguments.length;if(1==c&&H.isArray(arguments[0]))return H.object.create.apply(null,arguments[0]);if(c%2)throw Error(p);for(var d={},e=0;e<c;e+=2)d[arguments[e]]=arguments[e+1];return d};
H.object.yl=function(b){var c=arguments.length;if(1==c&&H.isArray(arguments[0]))return H.object.yl.apply(null,arguments[0]);for(var d={},e=0;e<c;e++)d[arguments[e]]=!0;return d};H.object.zt=function(b){var c=b;Object.isFrozen&&!Object.isFrozen(b)&&(c=Object.create(b),Object.freeze(c));return c};H.object.pv=function(b){return!!Object.isFrozen&&Object.isFrozen(b)};
H.object.su=function(b,c,d){if(!b)return[];if(!Object.getOwnPropertyNames||!Object.getPrototypeOf)return H.object.la(b);for(var e={};b&&(b!==Object.prototype||c)&&(b!==Function.prototype||d);){for(var f=Object.getOwnPropertyNames(b),g=0;g<f.length;g++)e[f[g]]=!0;b=Object.getPrototypeOf(b)}return H.object.la(e)};H.object.Nu=function(b){return(b=Object.getPrototypeOf(b.prototype))&&b.constructor};H.a.tags={};H.a.tags.Nk={area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0};H.a.tags.Ym=function(b){return!0===H.a.tags.Nk[b]};H.b={};H.b.Ya={};H.b.Ya.ab=H.ad?H.$g(H.ad+"#html"):null;H.c={};H.c.qs=B();H.c.M=function(b,c){this.Ef=b===H.c.M.fg&&c||"";this.Dk=H.c.M.wg};H.c.M.prototype.Va=!0;H.c.M.prototype.Ga=D("Ef");H.c.M.prototype.toString=function(){return"Const{"+this.Ef+"}"};H.c.M.K=function(b){if(b instanceof H.c.M&&b.constructor===H.c.M&&b.Dk===H.c.M.wg)return b.Ef;H.m.xa("expected object of type Const, got '"+b+"'");return"type_error:Const"};H.c.M.from=function(b){return new H.c.M(H.c.M.fg,b)};H.c.M.wg={};H.c.M.fg={};H.c.M.EMPTY=H.c.M.from("");H.b.W=function(){this.Jd="";this.tk=H.b.W.wa};H.b.W.prototype.Va=!0;H.b.W.wa={};H.b.W.Fc=function(b){b=H.c.M.K(b);return 0===b.length?H.b.W.EMPTY:H.b.W.uc(b)};H.b.W.hu=function(b,c){for(var d=[],e=1;e<arguments.length;e++)d.push(H.b.W.ej(arguments[e]));return H.b.W.uc("("+H.c.M.K(b)+")("+d.join(", ")+");")};H.b.W.ku=function(b){return H.b.W.uc(H.b.W.ej(b))};H.b.W.prototype.Ga=function(){return this.Jd.toString()};H.sa&&(H.b.W.prototype.toString=function(){return"SafeScript{"+this.Jd+"}"});
H.b.W.K=function(b){return H.b.W.pj(b).toString()};H.b.W.pj=function(b){if(b instanceof H.b.W&&b.constructor===H.b.W&&b.tk===H.b.W.wa)return b.Jd;H.m.xa("expected object of type SafeScript, got '"+b+a+H.ra(b));return"type_error:SafeScript"};H.b.W.ej=function(b){return JSON.stringify(b).replace(/</g,"\\x3c")};H.b.W.uc=function(b){return(new H.b.W).Qb(b)};H.b.W.prototype.Qb=function(b){this.Jd=H.b.Ya.ab?H.b.Ya.ab.createScript(b):b;return this};H.b.W.EMPTY=H.b.W.uc("");H.Ua={};H.Ua.url={};H.Ua.url.wl=function(b){return H.Ua.url.Vh().createObjectURL(b)};H.Ua.url.yw=function(b){H.Ua.url.Vh().revokeObjectURL(b)};H.Ua.url.Vh=function(){var b=H.Ua.url.nh();if(null!=b)return b;throw Error("This browser doesn't seem to support blob URLs");};H.Ua.url.nh=function(){return H.ca(H.global.URL)&&H.ca(H.global.URL.createObjectURL)?H.global.URL:H.ca(H.global.webkitURL)&&H.ca(H.global.webkitURL.createObjectURL)?H.global.webkitURL:H.ca(H.global.createObjectURL)?H.global:null};
H.Ua.url.bt=function(){return null!=H.Ua.url.nh()};H.i={};H.i.j={};H.i.j.ak=!1;
H.i.j.jg=H.i.j.ak||("ar"==H.S.substring(0,2).toLowerCase()||"fa"==H.S.substring(0,2).toLowerCase()||"he"==H.S.substring(0,2).toLowerCase()||"iw"==H.S.substring(0,2).toLowerCase()||"ps"==H.S.substring(0,2).toLowerCase()||"sd"==H.S.substring(0,2).toLowerCase()||"ug"==H.S.substring(0,2).toLowerCase()||"ur"==H.S.substring(0,2).toLowerCase()||"yi"==H.S.substring(0,2).toLowerCase())&&(2==H.S.length||"-"==H.S.substring(2,3)||"_"==H.S.substring(2,3))||3<=H.S.length&&"ckb"==H.S.substring(0,3).toLowerCase()&&
(3==H.S.length||"-"==H.S.substring(3,4)||"_"==H.S.substring(3,4))||7<=H.S.length&&("-"==H.S.substring(2,3)||"_"==H.S.substring(2,3))&&("adlm"==H.S.substring(3,7).toLowerCase()||"arab"==H.S.substring(3,7).toLowerCase()||"hebr"==H.S.substring(3,7).toLowerCase()||"nkoo"==H.S.substring(3,7).toLowerCase()||"rohg"==H.S.substring(3,7).toLowerCase()||"thaa"==H.S.substring(3,7).toLowerCase())||8<=H.S.length&&("-"==H.S.substring(3,4)||"_"==H.S.substring(3,4))&&("adlm"==H.S.substring(4,8).toLowerCase()||"arab"==
H.S.substring(4,8).toLowerCase()||"hebr"==H.S.substring(4,8).toLowerCase()||"nkoo"==H.S.substring(4,8).toLowerCase()||"rohg"==H.S.substring(4,8).toLowerCase()||"thaa"==H.S.substring(4,8).toLowerCase());H.i.j.Wb={gk:"\u202a",pk:"\u202b",pg:"\u202c",hk:"\u200e",qk:"\u200f"};H.i.j.aa={Eb:1,Fb:-1,Za:0};H.i.j.Zc="right";H.i.j.Xc="left";H.i.j.Cq=H.i.j.jg?H.i.j.Xc:H.i.j.Zc;H.i.j.Bq=H.i.j.jg?H.i.j.Zc:H.i.j.Xc;
H.i.j.zo=function(b){return typeof b==u?0<b?H.i.j.aa.Eb:0>b?H.i.j.aa.Fb:H.i.j.aa.Za:null==b?null:b?H.i.j.aa.Fb:H.i.j.aa.Eb};H.i.j.gc="A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";H.i.j.lc="\u0591-\u06ef\u06fa-\u08ff\u200f\ud802-\ud803\ud83a-\ud83b\ufb1d-\ufdff\ufe70-\ufefc";H.i.j.Am=/<[^>]*>|&[^;]+;/g;H.i.j.Cb=function(b,c){return c?b.replace(H.i.j.Am,""):b};
H.i.j.Tn=new RegExp("["+H.i.j.lc+"]");H.i.j.kn=new RegExp("["+H.i.j.gc+"]");H.i.j.Ze=function(b,c){return H.i.j.Tn.test(H.i.j.Cb(b,c))};H.i.j.Uu=H.i.j.Ze;H.i.j.Zh=function(b){return H.i.j.kn.test(H.i.j.Cb(b,void 0))};H.i.j.nn=new RegExp("^["+H.i.j.gc+"]");H.i.j.Yn=new RegExp("^["+H.i.j.lc+"]");H.i.j.Tm=function(b){return H.i.j.Yn.test(b)};H.i.j.Pm=function(b){return H.i.j.nn.test(b)};H.i.j.xv=function(b){return!H.i.j.Pm(b)&&!H.i.j.Tm(b)};H.i.j.ln=new RegExp("^[^"+H.i.j.lc+"]*["+H.i.j.gc+"]");
H.i.j.Vn=new RegExp("^[^"+H.i.j.gc+"]*["+H.i.j.lc+"]");H.i.j.cj=function(b,c){return H.i.j.Vn.test(H.i.j.Cb(b,c))};H.i.j.Ev=H.i.j.cj;H.i.j.so=function(b,c){return H.i.j.ln.test(H.i.j.Cb(b,c))};H.i.j.vv=H.i.j.so;H.i.j.ui=/^http:\/\/.*/;H.i.j.yv=function(b,c){b=H.i.j.Cb(b,c);return H.i.j.ui.test(b)||!H.i.j.Zh(b)&&!H.i.j.Ze(b)};H.i.j.mn=new RegExp("["+H.i.j.gc+"][^"+H.i.j.lc+"]*$");H.i.j.Wn=new RegExp("["+H.i.j.lc+"][^"+H.i.j.gc+"]*$");H.i.j.Ll=function(b,c){return H.i.j.mn.test(H.i.j.Cb(b,c))};
H.i.j.uv=H.i.j.Ll;H.i.j.Ml=function(b,c){return H.i.j.Wn.test(H.i.j.Cb(b,c))};H.i.j.Cv=H.i.j.Ml;H.i.j.Xn=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;H.i.j.Dv=function(b){return H.i.j.Xn.test(b)};H.i.j.ll=/(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;H.i.j.Su=function(b,c){c=(void 0===c?H.i.j.Ze(b):c)?H.i.j.Wb.qk:H.i.j.Wb.hk;return b.replace(H.i.j.ll,c+"$&"+c)};
H.i.j.Rt=function(b){return"<"==b.charAt(0)?b.replace(/<\w+/,"$& dir=rtl"):"\n<span dir=rtl>"+b+"</span>"};H.i.j.St=function(b){return H.i.j.Wb.pk+b+H.i.j.Wb.pg};H.i.j.Pt=function(b){return"<"==b.charAt(0)?b.replace(/<\w+/,"$& dir=ltr"):"\n<span dir=ltr>"+b+"</span>"};H.i.j.Qt=function(b){return H.i.j.Wb.gk+b+H.i.j.Wb.pg};H.i.j.Hl=/:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;H.i.j.$m=/left/gi;H.i.j.Sn=/right/gi;H.i.j.xo=/%%%%/g;
H.i.j.Uv=function(b){return b.replace(H.i.j.Hl,":$1 $4 $3 $2").replace(H.i.j.$m,"%%%%").replace(H.i.j.Sn,H.i.j.Xc).replace(H.i.j.xo,H.i.j.Zc)};H.i.j.Jl=/([\u0591-\u05f2])"/g;H.i.j.po=/([\u0591-\u05f2])'/g;H.i.j.Zv=function(b){return b.replace(H.i.j.Jl,"$1\u05f4").replace(H.i.j.po,"$1\u05f3")};H.i.j.Qo=/\s+/;H.i.j.ym=/[\d\u06f0-\u06f9]/;H.i.j.Un=.4;
H.i.j.hh=function(b,c){var d=0,e=0,f=!1;b=H.i.j.Cb(b,c).split(H.i.j.Qo);for(c=0;c<b.length;c++){var g=b[c];H.i.j.cj(g)?(d++,e++):H.i.j.ui.test(g)?f=!0:H.i.j.Zh(g)?e++:H.i.j.ym.test(g)&&(f=!0)}return 0==e?f?H.i.j.aa.Eb:H.i.j.aa.Za:d/e>H.i.j.Un?H.i.j.aa.Fb:H.i.j.aa.Eb};H.i.j.Kt=function(b,c){return H.i.j.hh(b,c)==H.i.j.aa.Fb};H.i.j.Mw=function(b,c){b&&(c=H.i.j.zo(c))&&(b.style.textAlign=c==H.i.j.aa.Fb?H.i.j.Zc:H.i.j.Xc,b.dir=c==H.i.j.aa.Fb?"rtl":"ltr")};
H.i.j.Nw=function(b,c){switch(H.i.j.hh(c)){case H.i.j.aa.Eb:b.dir="ltr";break;case H.i.j.aa.Fb:b.dir="rtl";break;default:b.removeAttribute("dir")}};H.i.j.Up=B();H.b.H=function(){this.Nd="";this.Hf=null;this.Fk=H.b.H.wa};H.b.H.prototype.Va=!0;H.b.H.prototype.Ga=function(){return this.Nd.toString()};H.b.H.prototype.af=!0;H.b.H.prototype.vb=function(){return H.i.j.aa.Eb};H.sa&&(H.b.H.prototype.toString=function(){return"TrustedResourceUrl{"+this.Nd+"}"});H.b.H.K=function(b){return H.b.H.Zd(b).toString()};
H.b.H.Zd=function(b){if(b instanceof H.b.H&&b.constructor===H.b.H&&b.Fk===H.b.H.wa)return b.Nd;H.m.xa("expected object of type TrustedResourceUrl, got '"+b+a+H.ra(b));return"type_error:TrustedResourceUrl"};H.b.H.na=function(b){return b.Hf?b.Hf:H.b.H.K(b)};
H.b.H.format=function(b,c){var d=H.c.M.K(b);if(!H.b.H.Hj.test(d))throw Error("Invalid TrustedResourceUrl format: "+d);b=d.replace(H.b.H.bk,function(e,f){if(!Object.prototype.hasOwnProperty.call(c,f))throw Error('Found marker, "'+f+'", in format string, "'+d+'", but no valid label mapping found in args: '+JSON.stringify(c));e=c[f];return e instanceof H.c.M?H.c.M.K(e):encodeURIComponent(String(e))});return H.b.H.xc(b)};H.b.H.bk=/%{(\w+)}/g;H.b.H.Hj=/^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i;
H.b.H.Ik=/^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/;H.b.H.eu=function(b,c,d,e){b=H.b.H.format(b,c);b=H.b.H.K(b);b=H.b.H.Ik.exec(b);c=b[3]||"";return H.b.H.xc(b[1]+H.b.H.dj("?",b[2]||"",d)+H.b.H.dj("#",c,e))};H.b.H.Fc=function(b){return H.b.H.xc(H.c.M.K(b))};H.b.H.iu=function(b){for(var c="",d=0;d<b.length;d++)c+=H.c.M.K(b[d]);return H.b.H.xc(c)};H.b.H.wa={};H.b.H.xc=function(b){var c=new H.b.H;c.Nd=H.b.Ya.ab?H.b.Ya.ab.createScriptURL(b):b;H.b.Ya.ab&&(c.Hf=H.b.Ya.ab.createURL(b));return c};
H.b.H.dj=function(b,c,d){if(null==d)return c;if(H.L(d))return d?b+encodeURIComponent(d):"";for(var e in d){var f=d[e];f=H.isArray(f)?f:[f];for(var g=0;g<f.length;g++){var h=f[g];null!=h&&(c||(c=b),c+=(c.length>b.length?"&":"")+encodeURIComponent(e)+"="+encodeURIComponent(String(h)))}}return c};H.c.A={};H.c.A.startsWith=function(b,c){return 0==b.lastIndexOf(c,0)};H.c.A.endsWith=function(b,c){var d=b.length-c.length;return 0<=d&&b.indexOf(c,d)==d};H.c.A.Ib=function(b,c){return 0==H.c.A.ed(c,b.substr(0,c.length))};H.c.A.Og=function(b,c){return 0==H.c.A.ed(c,b.substr(b.length-c.length,c.length))};H.c.A.Pg=function(b,c){return b.toLowerCase()==c.toLowerCase()};H.c.A.Lc=function(b){return/^[\s\xa0]*$/.test(b)};H.c.A.trim=H.pe&&String.prototype.trim?function(b){return b.trim()}:function(b){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(b)[1]};
H.c.A.ed=function(b,c){b=String(b).toLowerCase();c=String(c).toLowerCase();return b<c?-1:b==c?0:1};H.c.A.Nc=function(b,c){return b.replace(/(\r\n|\r|\n)/g,c?"<br />":"<br>")};
H.c.A.Ha=function(b,c){if(c)b=b.replace(H.c.A.Lf,"&amp;").replace(H.c.A.kg,"&lt;").replace(H.c.A.gg,"&gt;").replace(H.c.A.rg,"&quot;").replace(H.c.A.tg,"&#39;").replace(H.c.A.mg,"&#0;");else{if(!H.c.A.yj.test(b))return b;-1!=b.indexOf("&")&&(b=b.replace(H.c.A.Lf,"&amp;"));-1!=b.indexOf("<")&&(b=b.replace(H.c.A.kg,"&lt;"));-1!=b.indexOf(">")&&(b=b.replace(H.c.A.gg,"&gt;"));-1!=b.indexOf('"')&&(b=b.replace(H.c.A.rg,"&quot;"));-1!=b.indexOf("'")&&(b=b.replace(H.c.A.tg,"&#39;"));-1!=b.indexOf("\x00")&&
(b=b.replace(H.c.A.mg,"&#0;"))}return b};H.c.A.Lf=/&/g;H.c.A.kg=/</g;H.c.A.gg=/>/g;H.c.A.rg=/"/g;H.c.A.tg=/'/g;H.c.A.mg=/\x00/g;H.c.A.yj=/[\x00&<>"']/;H.c.A.sj=function(b){return H.c.A.Nc(b.replace(/  /g," &#160;"),void 0)};H.c.A.contains=function(b,c){return-1!=b.indexOf(c)};H.c.A.fd=function(b,c){return H.c.A.contains(b.toLowerCase(),c.toLowerCase())};
H.c.A.Kb=function(b,c){var d=0;b=H.c.A.trim(String(b)).split(".");c=H.c.A.trim(String(c)).split(".");for(var e=Math.max(b.length,c.length),f=0;0==d&&f<e;f++){var g=b[f]||"",h=c[f]||"";do{g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];h=/(\d*)(\D*)(.*)/.exec(h)||["","","",""];if(0==g[0].length&&0==h[0].length)break;d=H.c.A.Ae(0==g[1].length?0:parseInt(g[1],10),0==h[1].length?0:parseInt(h[1],10))||H.c.A.Ae(0==g[2].length,0==h[2].length)||H.c.A.Ae(g[2],h[2]);g=g[3];h=h[3]}while(0==d)}return d};
H.c.A.Ae=function(b,c){return b<c?-1:b>c?1:0};H.b.s=function(){this.Md="";this.wk=H.b.s.wa};H.b.s.ta="about:invalid#zClosurez";H.b.s.prototype.Va=!0;H.b.s.prototype.Ga=function(){return this.Md.toString()};H.b.s.prototype.af=!0;H.b.s.prototype.vb=function(){return H.i.j.aa.Eb};H.sa&&(H.b.s.prototype.toString=function(){return"SafeUrl{"+this.Md+"}"});H.b.s.K=function(b){return H.b.s.na(b).toString()};
H.b.s.na=function(b){if(b instanceof H.b.s&&b.constructor===H.b.s&&b.wk===H.b.s.wa)return b.Md;H.m.xa("expected object of type SafeUrl, got '"+b+a+H.ra(b));return"type_error:SafeUrl"};H.b.s.Fc=function(b){return H.b.s.Ba(H.c.M.K(b))};H.b.ne=/^(?:audio\/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-wav|wav|webm)|image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|text\/csv|video\/(?:mpeg|mp4|ogg|webm|quicktime))(?:;\w+=(?:\w+|"[\w;=]+"))*$/i;H.b.s.Gv=function(b){return H.b.ne.test(b)};
H.b.s.gu=function(b){b=H.b.ne.test(b.type)?H.Ua.url.wl(b):H.b.s.ta;return H.b.s.Ba(b)};H.b.Rj=/^data:([^,]*);base64,[a-z0-9+\/]+=*$/i;H.b.s.Wl=function(b){b=b.replace(/(%0A|%0D)/g,"");var c=b.match(H.b.Rj);c=c&&H.b.ne.test(c[1]);return H.b.s.Ba(c?b:H.b.s.ta)};H.b.s.pu=function(b){H.c.A.Ib(b,"tel:")||(b=H.b.s.ta);return H.b.s.Ba(b)};H.b.Ak=/^sip[s]?:[+a-z0-9_.!$%&'*\/=^`{|}~-]+@([a-z0-9-]+\.)+[a-z0-9]{2,63}$/i;H.b.s.mu=function(b){H.b.Ak.test(decodeURIComponent(b))||(b=H.b.s.ta);return H.b.s.Ba(b)};
H.b.s.ju=function(b){H.c.A.Ib(b,"fb-messenger://share")||(b=H.b.s.ta);return H.b.s.Ba(b)};H.b.s.ru=function(b){H.c.A.Ib(b,"whatsapp://send")||(b=H.b.s.ta);return H.b.s.Ba(b)};H.b.s.nu=function(b){H.c.A.Ib(b,"sms:")&&H.b.s.Um(b)||(b=H.b.s.ta);return H.b.s.Ba(b)};H.b.s.Um=function(b){var c=b.indexOf("#");0<c&&(b=b.substring(0,c));c=b.match(/[?&]body=/gi);if(!c)return!0;if(1<c.length)return!1;b=b.match(/[?&]body=([^&]*)/)[1];if(!b)return!0;try{decodeURIComponent(b)}catch(d){return!1}return/^(?:[a-z0-9\-_.~]|%[0-9a-f]{2})+$/i.test(b)};
H.b.s.ou=function(b){H.c.A.Ib(b,"ssh://")||(b=H.b.s.ta);return H.b.s.Ba(b)};H.b.s.Fw=function(b,c){return H.b.s.uf(/^chrome-extension:\/\/([^\/]+)\//,b,c)};H.b.s.Hw=function(b,c){return H.b.s.uf(/^moz-extension:\/\/([^\/]+)\//,b,c)};H.b.s.Gw=function(b,c){return H.b.s.uf(/^ms-browser-extension:\/\/([^\/]+)\//,b,c)};H.b.s.uf=function(b,c,d){(b=b.exec(c))?(b=b[1],-1==(d instanceof H.c.M?[H.c.M.K(d)]:d.map(function(e){return H.c.M.K(e)})).indexOf(b)&&(c=H.b.s.ta)):c=H.b.s.ta;return H.b.s.Ba(c)};
H.b.s.qu=function(b){return H.b.s.Ba(H.b.H.K(b))};H.b.oe=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;H.b.s.Ir=H.b.oe;H.b.s.Td=function(b){if(b instanceof H.b.s)return b;b=typeof b==v&&b.Va?b.Ga():String(b);H.b.oe.test(b)||(b=H.b.s.ta);return H.b.s.Ba(b)};H.b.s.Pa=function(b,c){if(b instanceof H.b.s)return b;b=typeof b==v&&b.Va?b.Ga():String(b);if(c&&/^data:/i.test(b)&&(c=H.b.s.Wl(b),c.Ga()==b))return c;H.b.oe.test(b)||(b=H.b.s.ta);return H.b.s.Ba(b)};H.b.s.wa={};
H.b.s.Ba=function(b){var c=new H.b.s;c.Md=H.b.Ya.ab?H.b.Ya.ab.createURL(b):b;return c};H.b.s.Wo=H.b.s.Ba("about:blank");H.b.D=function(){this.Ld="";this.vk=H.b.D.wa};H.b.D.prototype.Va=!0;H.b.D.wa={};H.b.D.Fc=function(b){b=H.c.M.K(b);return 0===b.length?H.b.D.EMPTY:H.b.D.vc(b)};H.b.D.prototype.Ga=D("Ld");H.sa&&(H.b.D.prototype.toString=function(){return"SafeStyle{"+this.Ld+"}"});H.b.D.K=function(b){if(b instanceof H.b.D&&b.constructor===H.b.D&&b.vk===H.b.D.wa)return b.Ld;H.m.xa("expected object of type SafeStyle, got '"+b+a+H.ra(b));return"type_error:SafeStyle"};H.b.D.vc=function(b){return(new H.b.D).Qb(b)};
H.b.D.prototype.Qb=function(b){this.Ld=b;return this};H.b.D.EMPTY=H.b.D.vc("");H.b.D.ta="zClosurez";H.b.D.create=function(b){var c="",d;for(d in b){if(!/^[-_a-zA-Z0-9]+$/.test(d))throw Error("Name allows only [-_a-zA-Z0-9], got: "+d);var e=b[d];null!=e&&(e=H.isArray(e)?H.g.map(e,H.b.D.Vi).join(" "):H.b.D.Vi(e),c+=d+":"+e+";")}return c?H.b.D.vc(c):H.b.D.EMPTY};
H.b.D.Vi=function(b){if(b instanceof H.b.s)return'url("'+H.b.s.K(b).replace(/</g,"%3c").replace(/[\\"]/g,"\\$&")+'")';b=b instanceof H.c.M?H.c.M.K(b):H.b.D.bo(String(b));if(/[{;}]/.test(b))throw new H.m.oc("Value does not allow [{;}], got: %s.",[b]);return b};
H.b.D.bo=function(b){var c=b.replace(H.b.D.eg,"$1").replace(H.b.D.eg,"$1").replace(H.b.D.xg,"url");if(H.b.D.Kk.test(c)){if(H.b.D.Pj.test(b))return H.m.xa("String value disallows comments, got: "+b),H.b.D.ta;if(!H.b.D.um(b))return H.m.xa("String value requires balanced quotes, got: "+b),H.b.D.ta;if(!H.b.D.vm(b))return H.m.xa("String value requires balanced square brackets and one identifier per pair of brackets, got: "+b),H.b.D.ta}else return H.m.xa("String value allows only "+H.b.D.Ag+" and simple functions, got: "+
b),H.b.D.ta;return H.b.D.co(b)};H.b.D.um=function(b){for(var c=!0,d=!0,e=0;e<b.length;e++){var f=b.charAt(e);"'"==f&&d?c=!c:'"'==f&&c&&(d=!d)}return c&&d};H.b.D.vm=function(b){for(var c=!0,d=/^[-_a-zA-Z0-9]$/,e=0;e<b.length;e++){var f=b.charAt(e);if("]"==f){if(c)return!1;c=!0}else if("["==f){if(!c)return!1;c=!1}else if(!c&&!d.test(f))return!1}return c};H.b.D.Ag="[-,.\"'%_!# a-zA-Z0-9\\[\\]]";H.b.D.Kk=new RegExp("^"+H.b.D.Ag+"+$");H.b.D.xg=/\b(url\([ \t\n]*)('[ -&(-\[\]-~]*'|"[ !#-\[\]-~]*"|[!#-&*-\[\]-~]*)([ \t\n]*\))/g;
H.b.D.eg=/\b(hsl|hsla|rgb|rgba|matrix|calc|minmax|fit-content|repeat|(rotate|scale|translate)(X|Y|Z|3d)?)\([-+*/0-9a-z.%\[\], ]+\)/g;H.b.D.Pj=/\/\*/;H.b.D.co=function(b){return b.replace(H.b.D.xg,function(c,d,e,f){var g="";e=e.replace(/^(['"])(.*)\1$/,function(h,k,m){g=k;return m});c=H.b.s.Td(e).Ga();return d+g+c+g+f})};H.b.D.concat=function(b){function c(e){H.isArray(e)?H.g.forEach(e,c):d+=H.b.D.K(e)}var d="";H.g.forEach(arguments,c);return d?H.b.D.vc(d):H.b.D.EMPTY};H.b.Y=function(){this.Kd="";this.uk=H.b.Y.wa};H.b.Y.prototype.Va=!0;H.b.Y.wa={};
H.b.Y.Bt=function(b,c){if(H.c.A.contains(b,"<"))throw Error("Selector does not allow '<', got: "+b);var d=b.replace(/('|")((?!\1)[^\r\n\f\\]|\\[\s\S])*\1/g,"");if(!/^[-_a-zA-Z0-9#.:* ,>+~[\]()=^$|]+$/.test(d))throw Error("Selector allows only [-_a-zA-Z0-9#.:* ,>+~[\\]()=^$|] and strings, got: "+b);if(!H.b.Y.tm(d))throw Error("() and [] in selector must be balanced, got: "+b);c instanceof H.b.D||(c=H.b.D.create(c));b=b+"{"+H.b.D.K(c).replace(/</g,"\\3C ")+"}";return H.b.Y.wc(b)};
H.b.Y.tm=function(b){for(var c={"(":")","[":"]"},d=[],e=0;e<b.length;e++){var f=b[e];if(c[f])d.push(c[f]);else if(H.object.contains(c,f)&&d.pop()!=f)return!1}return 0==d.length};H.b.Y.concat=function(b){function c(e){H.isArray(e)?H.g.forEach(e,c):d+=H.b.Y.K(e)}var d="";H.g.forEach(arguments,c);return H.b.Y.wc(d)};H.b.Y.Fc=function(b){b=H.c.M.K(b);return 0===b.length?H.b.Y.EMPTY:H.b.Y.wc(b)};H.b.Y.prototype.Ga=D("Kd");H.sa&&(H.b.Y.prototype.toString=function(){return"SafeStyleSheet{"+this.Kd+"}"});
H.b.Y.K=function(b){if(b instanceof H.b.Y&&b.constructor===H.b.Y&&b.uk===H.b.Y.wa)return b.Kd;H.m.xa("expected object of type SafeStyleSheet, got '"+b+a+H.ra(b));return"type_error:SafeStyleSheet"};H.b.Y.wc=function(b){return(new H.b.Y).Qb(b)};H.b.Y.prototype.Qb=function(b){this.Kd=b;return this};H.b.Y.EMPTY=H.b.Y.wc("");H.h={};H.h.userAgent={};H.h.userAgent.F={};H.h.userAgent.F.Fh=function(){var b=H.h.userAgent.F.hm();return b&&(b=b.userAgent)?b:""};H.h.userAgent.F.hm=function(){return H.global.navigator};H.h.userAgent.F.qj=H.h.userAgent.F.Fh();H.h.userAgent.F.fx=function(b){H.h.userAgent.F.qj=b||H.h.userAgent.F.Fh()};H.h.userAgent.F.cc=function(){return H.h.userAgent.F.qj};H.h.userAgent.F.T=function(b){return H.c.A.contains(H.h.userAgent.F.cc(),b)};
H.h.userAgent.F.nf=function(b){return H.c.A.fd(H.h.userAgent.F.cc(),b)};H.h.userAgent.F.jh=function(b){for(var c=/(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g,d=[],e;e=c.exec(b);)d.push([e[1],e[2],e[3]||void 0]);return d};H.h.userAgent.B={};H.h.userAgent.B.Ii=function(){return H.h.userAgent.F.T("Opera")};H.h.userAgent.B.sn=function(){return H.h.userAgent.F.T("Trident")||H.h.userAgent.F.T("MSIE")};H.h.userAgent.B.lf=function(){return H.h.userAgent.F.T("Edge")};H.h.userAgent.B.Gi=function(){return H.h.userAgent.F.T("Edg/")};H.h.userAgent.B.Hi=function(){return H.h.userAgent.F.T("OPR")};H.h.userAgent.B.mf=function(){return H.h.userAgent.F.T("Firefox")||H.h.userAgent.F.T("FxiOS")};
H.h.userAgent.B.Ji=function(){return H.h.userAgent.F.T("Safari")&&!(H.h.userAgent.B.jf()||H.h.userAgent.B.kf()||H.h.userAgent.B.Ii()||H.h.userAgent.B.lf()||H.h.userAgent.B.Gi()||H.h.userAgent.B.Hi()||H.h.userAgent.B.mf()||H.h.userAgent.B.vi()||H.h.userAgent.F.T("Android"))};H.h.userAgent.B.kf=function(){return H.h.userAgent.F.T("Coast")};
H.h.userAgent.B.tn=function(){return(H.h.userAgent.F.T("iPad")||H.h.userAgent.F.T("iPhone"))&&!H.h.userAgent.B.Ji()&&!H.h.userAgent.B.jf()&&!H.h.userAgent.B.kf()&&!H.h.userAgent.B.mf()&&H.h.userAgent.F.T("AppleWebKit")};H.h.userAgent.B.jf=function(){return(H.h.userAgent.F.T("Chrome")||H.h.userAgent.F.T("CriOS"))&&!H.h.userAgent.B.lf()};H.h.userAgent.B.rn=function(){return H.h.userAgent.F.T("Android")&&!(H.h.userAgent.B.hi()||H.h.userAgent.B.Im()||H.h.userAgent.B.ff()||H.h.userAgent.B.vi())};
H.h.userAgent.B.ff=H.h.userAgent.B.Ii;H.h.userAgent.B.Bd=H.h.userAgent.B.sn;H.h.userAgent.B.Ab=H.h.userAgent.B.lf;H.h.userAgent.B.Gm=H.h.userAgent.B.Gi;H.h.userAgent.B.Bv=H.h.userAgent.B.Hi;H.h.userAgent.B.Im=H.h.userAgent.B.mf;H.h.userAgent.B.Fv=H.h.userAgent.B.Ji;H.h.userAgent.B.jv=H.h.userAgent.B.kf;H.h.userAgent.B.sv=H.h.userAgent.B.tn;H.h.userAgent.B.hi=H.h.userAgent.B.jf;H.h.userAgent.B.gv=H.h.userAgent.B.rn;H.h.userAgent.B.vi=function(){return H.h.userAgent.F.T("Silk")};
H.h.userAgent.B.Hc=function(){function b(f){f=H.g.find(f,e);return d[f]||""}var c=H.h.userAgent.F.cc();if(H.h.userAgent.B.Bd())return H.h.userAgent.B.gm(c);c=H.h.userAgent.F.jh(c);var d={};H.g.forEach(c,function(f){d[f[0]]=f[1]});var e=H.Sb(H.object.Lb,d);return H.h.userAgent.B.ff()?b(["Version","Opera"]):H.h.userAgent.B.Ab()?b(["Edge"]):H.h.userAgent.B.Gm()?b(["Edg"]):H.h.userAgent.B.hi()?b(["Chrome","CriOS"]):(c=c[2])&&c[1]||""};
H.h.userAgent.B.Xa=function(b){return 0<=H.c.A.Kb(H.h.userAgent.B.Hc(),b)};H.h.userAgent.B.gm=function(b){var c=/rv: *([\d\.]*)/.exec(b);if(c&&c[1])return c[1];c="";var d=/MSIE +([\d\.]+)/.exec(b);if(d&&d[1])if(b=/Trident\/(\d.\d)/.exec(b),"7.0"==d[1])if(b&&b[1])switch(b[1]){case "4.0":c="8.0";break;case "5.0":c="9.0";break;case "6.0":c="10.0";break;case "7.0":c="11.0"}else c="7.0";else c=d[1];return c};H.b.u=function(){this.Id="";this.sk=H.b.u.wa;this.md=null};H.b.u.prototype.af=!0;H.b.u.prototype.vb=D("md");H.b.u.prototype.Va=!0;H.b.u.prototype.Ga=function(){return this.Id.toString()};H.sa&&(H.b.u.prototype.toString=function(){return"SafeHtml{"+this.Id+"}"});H.b.u.K=function(b){return H.b.u.Db(b).toString()};H.b.u.Db=function(b){if(b instanceof H.b.u&&b.constructor===H.b.u&&b.sk===H.b.u.wa)return b.Id;H.m.xa("expected object of type SafeHtml, got '"+b+a+H.ra(b));return"type_error:SafeHtml"};
H.b.u.Ha=function(b){if(b instanceof H.b.u)return b;var c=typeof b==v,d=null;c&&b.af&&(d=b.vb());return H.b.u.Sa(H.c.A.Ha(c&&b.Va?b.Ga():String(b)),d)};H.b.u.Xu=function(b){if(b instanceof H.b.u)return b;b=H.b.u.Ha(b);return H.b.u.Sa(H.c.A.Nc(H.b.u.K(b)),b.vb())};H.b.u.Yu=function(b){if(b instanceof H.b.u)return b;b=H.b.u.Ha(b);return H.b.u.Sa(H.c.A.sj(H.b.u.K(b)),b.vb())};H.b.u.from=H.b.u.Ha;H.b.u.zg=/^[a-zA-Z0-9-]+$/;
H.b.u.Hk={action:!0,cite:!0,data:!0,formaction:!0,href:!0,manifest:!0,poster:!0,src:!0};H.b.u.lk={APPLET:!0,BASE:!0,EMBED:!0,IFRAME:!0,LINK:!0,MATH:!0,META:!0,OBJECT:!0,SCRIPT:!0,STYLE:!0,SVG:!0,TEMPLATE:!0};H.b.u.create=function(b,c,d){H.b.u.Po(String(b));return H.b.u.Nb(String(b),c,d)};H.b.u.Po=function(b){if(!H.b.u.zg.test(b))throw Error("Invalid tag name <"+b+">.");if(b.toUpperCase()in H.b.u.lk)throw Error("Tag name <"+b+"> is not allowed for SafeHtml.");};
H.b.u.xt=function(b,c,d,e){b&&H.b.H.K(b);var f={};f.src=b||null;f.srcdoc=c&&H.b.u.K(c);b=H.b.u.hd(f,{sandbox:""},d);return H.b.u.Nb("iframe",b,e)};H.b.u.Ct=function(b,c,d,e){if(!H.b.u.pl())throw Error("The browser does not support sandboxed iframes.");var f={};f.src=b?H.b.s.K(H.b.s.Td(b)):null;f.srcdoc=c||null;f.sandbox="";b=H.b.u.hd(f,{},d);return H.b.u.Nb("iframe",b,e)};H.b.u.pl=function(){return H.global.HTMLIFrameElement&&"sandbox"in H.global.HTMLIFrameElement.prototype};
H.b.u.Dt=function(b,c){H.b.H.K(b);b=H.b.u.hd({src:b},{},c);return H.b.u.Nb("script",b)};H.b.u.createScript=function(b,c){for(var d in c){var e=d.toLowerCase();if("language"==e||"src"==e||"text"==e||"type"==e)throw Error('Cannot set "'+e+'" attribute');}d="";b=H.g.concat(b);for(e=0;e<b.length;e++)d+=H.b.W.K(b[e]);b=H.b.u.Sa(d,H.i.j.aa.Za);return H.b.u.Nb("script",c,b)};
H.b.u.Et=function(b,c){c=H.b.u.hd({type:"text/css"},{},c);var d="";b=H.g.concat(b);for(var e=0;e<b.length;e++)d+=H.b.Y.K(b[e]);b=H.b.u.Sa(d,H.i.j.aa.Za);return H.b.u.Nb("style",c,b)};H.b.u.At=function(b,c){b=H.b.s.K(H.b.s.Td(b));(H.h.userAgent.B.Bd()||H.h.userAgent.B.Ab())&&H.c.A.contains(b,";")&&(b="'"+b.replace(/'/g,"%27")+"'");return H.b.u.Nb("meta",{"http-equiv":"refresh",content:(c||0)+"; url="+b})};
H.b.u.Yl=function(b,c,d){if(d instanceof H.c.M)d=H.c.M.K(d);else if("style"==c.toLowerCase())d=H.b.u.nm(d);else{if(/^on/i.test(c))throw Error('Attribute "'+c+'" requires goog.string.Const value, "'+d+'" given.');if(c.toLowerCase()in H.b.u.Hk)if(d instanceof H.b.H)d=H.b.H.K(d);else if(d instanceof H.b.s)d=H.b.s.K(d);else if(H.L(d))d=H.b.s.Td(d).Ga();else throw Error('Attribute "'+c+'" on tag "'+b+'" requires goog.html.SafeUrl, goog.string.Const, or string, value "'+d+'" given.');}d.Va&&(d=d.Ga());
return c+'="'+H.c.A.Ha(String(d))+'"'};H.b.u.nm=function(b){if(!H.Da(b))throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, '+typeof b+" given: "+b);b instanceof H.b.D||(b=H.b.D.create(b));return H.b.D.K(b)};H.b.u.Gt=function(b,c,d,e){c=H.b.u.create(c,d,e);c.md=b;return c};
H.b.u.join=function(b,c){function d(g){H.isArray(g)?H.g.forEach(g,d):(g=H.b.u.Ha(g),f.push(H.b.u.K(g)),g=g.vb(),e==H.i.j.aa.Za?e=g:g!=H.i.j.aa.Za&&e!=g&&(e=null))}b=H.b.u.Ha(b);var e=b.vb(),f=[];H.g.forEach(c,d);return H.b.u.Sa(f.join(H.b.u.K(b)),e)};H.b.u.concat=function(b){return H.b.u.join(H.b.u.EMPTY,Array.prototype.slice.call(arguments))};H.b.u.rt=function(b,c){var d=H.b.u.concat(H.g.slice(arguments,1));d.md=b;return d};H.b.u.wa={};H.b.u.Sa=function(b,c){return(new H.b.u).Qb(b,c)};
H.b.u.prototype.Qb=function(b,c){this.Id=H.b.Ya.ab?H.b.Ya.ab.createHTML(b):b;this.md=c;return this};H.b.u.Nb=function(b,c,d){var e=null;var f="<"+b+H.b.u.uo(b,c);H.zb(d)?H.isArray(d)||(d=[d]):d=[];H.a.tags.Ym(b.toLowerCase())?f+=">":(e=H.b.u.concat(d),f+=">"+H.b.u.K(e)+"</"+b+">",e=e.vb());(b=c&&c.dir)&&(e=/^(ltr|rtl|auto)$/i.test(b)?H.i.j.aa.Za:null);return H.b.u.Sa(f,e)};
H.b.u.uo=function(b,c){var d="";if(c)for(var e in c){if(!H.b.u.zg.test(e))throw Error('Invalid attribute name "'+e+'".');var f=c[e];H.zb(f)&&(d+=" "+H.b.u.Yl(b,e,f))}return d};H.b.u.hd=function(b,c,d){var e={},f;for(f in b)e[f]=b[f];for(f in c)e[f]=c[f];for(f in d){var g=f.toLowerCase();if(g in b)throw Error('Cannot override "'+g+'" attribute, got "'+f+'" with value "'+d[f]+'"');g in c&&delete e[g];e[f]=d[f]}return e};H.b.u.Rp=H.b.u.Sa("<!DOCTYPE html>",H.i.j.aa.Za);H.b.u.EMPTY=H.b.u.Sa("",H.i.j.aa.Za);
H.b.u.Xf=H.b.u.Sa("<br>",H.i.j.aa.Za);H.b.kb={};H.b.kb.Si=function(b,c){return H.b.u.Sa(c,null)};H.b.kb.Cw=function(b,c){return H.b.W.uc(c)};H.b.kb.Dw=function(b,c){return H.b.D.vc(c)};H.b.kb.Ew=function(b,c){return H.b.Y.wc(c)};H.b.kb.$n=function(b,c){return H.b.s.Ba(c)};H.b.kb.Cx=function(b,c){return H.b.H.xc(c)};H.a.O={};H.a.O.Mq={Zo:"afterbegin",$o:"afterend",qp:"beforebegin",rp:"beforeend"};H.a.O.$u=function(b,c,d){b.insertAdjacentHTML(c,H.b.u.Db(d))};H.a.O.zk={MATH:!0,SCRIPT:!0,STYLE:!0,SVG:!0,TEMPLATE:!0};H.a.O.Mm=H.V.ol(function(){if(H.sa&&"undefined"===typeof document)return!1;var b=document.createElement("div"),c=document.createElement("div");c.appendChild(document.createElement("div"));b.appendChild(c);if(H.sa&&!b.firstChild)return!1;c=b.firstChild.firstChild;b.innerHTML=H.b.u.Db(H.b.u.EMPTY);return!c.parentElement});
H.a.O.Ko=function(b,c){if(H.a.O.Mm())for(;b.lastChild;)b.removeChild(b.lastChild);b.innerHTML=H.b.u.Db(c)};H.a.O.xf=function(b,c){if(H.m.za&&H.a.O.zk[b.tagName.toUpperCase()])throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of "+b.tagName+".");H.a.O.Ko(b,c)};H.a.O.Zw=function(b,c){b.outerHTML=H.b.u.Db(c)};H.a.O.Qw=function(b,c){c=c instanceof H.b.s?c:H.b.s.Pa(c);H.a.m.Yk(b).action=H.b.s.na(c)};H.a.O.Kw=function(b,c){c=c instanceof H.b.s?c:H.b.s.Pa(c);H.a.m.Wk(b).formAction=H.b.s.na(c)};
H.a.O.Vw=function(b,c){c=c instanceof H.b.s?c:H.b.s.Pa(c);H.a.m.al(b).formAction=H.b.s.na(c)};H.a.O.cx=function(b,c){b.style.cssText=H.b.D.K(c)};H.a.O.Il=function(b){b.write(H.b.u.Db(H.b.u.EMPTY))};H.a.O.Iw=function(b,c){H.a.m.Uk(b);c=c instanceof H.b.s?c:H.b.s.Pa(c);b.href=H.b.s.na(c)};H.a.O.io=function(b,c){H.a.m.$k(b);c=c instanceof H.b.s?c:H.b.s.Pa(c,/^data:image\//i.test(c));b.src=H.b.s.na(c)};
H.a.O.Jw=function(b,c){H.a.m.Vk(b);c=c instanceof H.b.s?c:H.b.s.Pa(c,/^data:audio\//i.test(c));b.src=H.b.s.na(c)};H.a.O.gx=function(b,c){H.a.m.dl(b);c=c instanceof H.b.s?c:H.b.s.Pa(c,/^data:video\//i.test(c));b.src=H.b.s.na(c)};H.a.O.Ow=function(b,c){H.a.m.Xk(b);b.src=H.b.H.Zd(c)};H.a.O.Sw=function(b,c){H.a.m.Zk(b);b.src=H.b.H.na(c)};H.a.O.ho=function(b){var c=H.b.H.Fc(H.c.M.EMPTY);H.a.m.Gg(b);b.src=H.b.H.na(c)};H.a.O.Uw=function(b,c){H.a.m.Gg(b);b.srcdoc=H.b.u.Db(c)};
H.a.O.Ww=function(b,c,d){H.a.m.bl(b);b.rel=d;H.c.A.fd(d,"stylesheet")?b.href=H.b.H.na(c):b.href=c instanceof H.b.H?H.b.H.na(c):c instanceof H.b.s?H.b.s.na(c):H.b.s.na(H.b.s.Pa(c))};H.a.O.Yw=function(b,c){H.a.m.cl(b);b.data=H.b.H.Zd(c)};H.a.O.mo=function(b,c){H.a.m.Hg(b);b.src=H.b.H.Zd(c);(c=H.Sh())&&b.setAttribute("nonce",c)};H.a.O.bx=function(b,c){H.a.m.Hg(b);b.text=H.b.W.pj(c);(c=H.Sh())&&b.setAttribute("nonce",c)};H.a.O.Xw=function(b,c){H.a.m.we(b);c=c instanceof H.b.s?c:H.b.s.Pa(c);b.href=H.b.s.na(c)};
H.a.O.Ys=function(b,c){H.a.m.we(b);c=c instanceof H.b.s?c:H.b.s.Pa(c);b.assign(H.b.s.na(c))};H.a.O.uw=function(b,c){H.a.m.we(b);c=c instanceof H.b.s?c:H.b.s.Pa(c);b.replace(H.b.s.na(c))};H.a.O.fw=function(b,c,d,e,f){b=b instanceof H.b.s?b:H.b.s.Pa(b);return(c||H.global).open(H.b.s.na(b),d?H.c.M.K(d):"",e,f)};H.a.O.hw=function(b,c){return H.a.O.parseFromString(b,c,"text/html")};H.a.O.parseFromString=function(b,c,d){return b.parseFromString(H.b.u.Db(c),d)};
H.a.O.yt=function(b){if(!/^image\/.*/g.test(b.type))throw Error("goog.dom.safe.createImageFromBlob only accepts MIME type image/.*.");var c=H.global.URL.createObjectURL(b);b=new H.global.Image;b.onload=function(){H.global.URL.revokeObjectURL(c)};H.a.O.io(b,H.b.kb.$n(H.c.M.from("Image blob URL."),c));return b};H.c.Uj=!1;H.c.Zj=!1;H.c.yg={lg:"\u00a0"};H.c.startsWith=H.c.A.startsWith;H.c.endsWith=H.c.A.endsWith;H.c.Ib=H.c.A.Ib;H.c.Og=H.c.A.Og;H.c.Pg=H.c.A.Pg;H.c.sx=function(b,c){for(var d=b.split("%s"),e="",f=Array.prototype.slice.call(arguments,1);f.length&&1<d.length;)e+=d.shift()+f.shift();return e+d.join("%s")};H.c.kt=function(b){return b.replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"")};H.c.Lc=H.c.A.Lc;H.c.nv=function(b){return 0==b.length};H.c.Ca=H.c.Lc;H.c.Hm=function(b){return H.c.Lc(H.c.on(b))};
H.c.mv=H.c.Hm;H.c.hv=function(b){return!/[^\t\n\r ]/.test(b)};H.c.ev=function(b){return!/[^a-zA-Z]/.test(b)};H.c.Av=function(b){return!/[^0-9]/.test(b)};H.c.fv=function(b){return!/[^a-zA-Z0-9]/.test(b)};H.c.Hv=function(b){return" "==b};H.c.Iv=function(b){return 1==b.length&&" "<=b&&"~">=b||"\u0080"<=b&&"\ufffd">=b};H.c.qx=function(b){return b.replace(/(\r\n|\r|\n)+/g," ")};H.c.rl=function(b){return b.replace(/(\r\n|\r|\n)/g,"\n")};H.c.bw=function(b){return b.replace(/\xa0|\s/g," ")};
H.c.aw=function(b){return b.replace(/\xa0|[ \t]+/g," ")};H.c.jt=function(b){return b.replace(/[\t\r\n ]+/g," ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g,"")};H.c.trim=H.c.A.trim;H.c.trimLeft=function(b){return b.replace(/^[\s\xa0]+/,"")};H.c.trimRight=function(b){return b.replace(/[\s\xa0]+$/,"")};H.c.ed=H.c.A.ed;
H.c.Ni=function(b,c,d){if(b==c)return 0;if(!b)return-1;if(!c)return 1;for(var e=b.toLowerCase().match(d),f=c.toLowerCase().match(d),g=Math.min(e.length,f.length),h=0;h<g;h++){d=e[h];var k=f[h];if(d!=k)return b=parseInt(d,10),!isNaN(b)&&(c=parseInt(k,10),!isNaN(c)&&b-c)?b-c:d<k?-1:1}return e.length!=f.length?e.length-f.length:b<c?-1:1};H.c.cv=function(b,c){return H.c.Ni(b,c,/\d+|\D+/g)};H.c.Vl=function(b,c){return H.c.Ni(b,c,/\d+|\.\d+|\D+/g)};H.c.dw=H.c.Vl;H.c.Rc=function(b){return encodeURIComponent(String(b))};
H.c.$d=function(b){return decodeURIComponent(b.replace(/\+/g," "))};H.c.Nc=H.c.A.Nc;H.c.Ha=function(b,c){b=H.c.A.Ha(b,c);H.c.Uj&&(b=b.replace(H.c.Yj,"&#101;"));return b};H.c.Yj=/e/g;H.c.nj=function(b){return H.c.contains(b,"&")?!H.c.Zj&&"document"in H.global?H.c.oj(b):H.c.Ho(b):b};H.c.Dx=function(b,c){return H.c.contains(b,"&")?H.c.oj(b,c):b};
H.c.oj=function(b,c){var d={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"'};var e=c?c.createElement("div"):H.global.document.createElement("div");return b.replace(H.c.dk,function(f,g){var h=d[f];if(h)return h;"#"==g.charAt(0)&&(g=Number("0"+g.substr(1)),isNaN(g)||(h=String.fromCharCode(g)));h||(H.a.O.xf(e,H.b.kb.Si(H.c.M.from("Single HTML entity."),f+" ")),h=e.firstChild.nodeValue.slice(0,-1));return d[f]=h})};
H.c.Ho=function(b){return b.replace(/&([^;]+);/g,function(c,d){switch(d){case "amp":return"&";case "lt":return"<";case "gt":return">";case "quot":return'"';default:return"#"!=d.charAt(0)||(d=Number("0"+d.substr(1)),isNaN(d))?c:String.fromCharCode(d)}})};H.c.dk=/&([^;\s<&]+);?/g;H.c.sj=function(b){return H.c.Nc(b.replace(/  /g," &#160;"),void 0)};H.c.jw=function(b){return b.replace(/(^|[\n ]) /g,"$1"+H.c.yg.lg)};
H.c.rx=function(b,c){for(var d=c.length,e=0;e<d;e++){var f=1==d?c:c.charAt(e);if(b.charAt(0)==f&&b.charAt(b.length-1)==f)return b.substring(1,b.length-1)}return b};H.c.truncate=function(b,c,d){d&&(b=H.c.nj(b));b.length>c&&(b=b.substring(0,c-3)+"...");d&&(b=H.c.Ha(b));return b};H.c.Bx=function(b,c,d,e){d&&(b=H.c.nj(b));e&&b.length>c?(e>c&&(e=c),b=b.substring(0,c-e)+"..."+b.substring(b.length-e)):b.length>c&&(e=Math.floor(c/2),b=b.substring(0,e+c%2)+"..."+b.substring(b.length-e));d&&(b=H.c.Ha(b));return b};
H.c.Bf={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\","<":"\\u003C"};H.c.Cd={"'":"\\'"};H.c.quote=function(b){b=String(b);for(var c=['"'],d=0;d<b.length;d++){var e=b.charAt(d),f=e.charCodeAt(0);c[d+1]=H.c.Bf[e]||(31<f&&127>f?e:H.c.gh(e))}c.push('"');return c.join("")};H.c.Vt=function(b){for(var c=[],d=0;d<b.length;d++)c[d]=H.c.gh(b.charAt(d));return c.join("")};
H.c.gh=function(b){if(b in H.c.Cd)return H.c.Cd[b];if(b in H.c.Bf)return H.c.Cd[b]=H.c.Bf[b];var c=b.charCodeAt(0);if(31<c&&127>c)var d=b;else{if(256>c){if(d="\\x",16>c||256<c)d+="0"}else d="\\u",4096>c&&(d+="0");d+=c.toString(16).toUpperCase()}return H.c.Cd[b]=d};H.c.contains=H.c.A.contains;H.c.fd=H.c.A.fd;H.c.ut=function(b,c){return b&&c?b.split(c).length-1:0};H.c.kc=A();H.c.remove=function(b,c){return b.replace(c,"")};H.c.ow=function(b,c){c=new RegExp(H.c.rf(c),"g");return b.replace(c,"")};
H.c.tw=function(b,c,d){c=new RegExp(H.c.rf(c),"g");return b.replace(c,d.replace(/\$/g,"$$$$"))};H.c.rf=function(b){return String(b).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")};H.c.repeat=String.prototype.repeat?function(b,c){return b.repeat(c)}:function(b,c){return Array(c+1).join(b)};H.c.gw=function(b,c,d){b=H.ca(d)?b.toFixed(d):String(b);d=b.indexOf(".");-1==d&&(d=b.length);return H.c.repeat("0",Math.max(0,c-d))+b};H.c.on=function(b){return null==b?"":String(b)};
H.c.nl=function(b){return Array.prototype.join.call(arguments,"")};H.c.Ph=function(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^H.now()).toString(36)};H.c.Kb=H.c.A.Kb;H.c.Wu=function(b){for(var c=0,d=0;d<b.length;++d)c=31*c+b.charCodeAt(d)>>>0;return c};H.c.Io=2147483648*Math.random()|0;H.c.Ft=function(){return"goog_"+H.c.Io++};H.c.xx=function(b){var c=Number(b);return 0==c&&H.c.Lc(b)?NaN:c};H.c.tv=function(b){return/^[a-z]+([A-Z][a-z]*)*$/.test(b)};
H.c.Jv=function(b){return/^([A-Z][a-z]*)+$/.test(b)};H.c.wx=function(b){return String(b).replace(/\-([a-z])/g,function(c,d){return d.toUpperCase()})};H.c.yx=function(b){return String(b).replace(/([A-Z])/g,"-$1").toLowerCase()};H.c.zx=function(b,c){c=H.L(c)?H.c.rf(c):"\\s";return b.replace(new RegExp("(^"+(c?"|["+c+"]+":"")+")([a-z])","g"),function(d,e,f){return e+f.toUpperCase()})};H.c.ft=function(b){return String(b.charAt(0)).toUpperCase()+String(b.substr(1)).toLowerCase()};
H.c.parseInt=function(b){isFinite(b)&&(b=String(b));return H.L(b)?/^\s*-?0x/i.test(b)?parseInt(b,16):parseInt(b,10):NaN};H.c.kx=function(b,c,d){b=b.split(c);for(var e=[];0<d&&b.length;)e.push(b.shift()),d--;b.length&&e.push(b.join(c));return e};H.c.Mv=function(b,c){if(c)typeof c==y&&(c=[c]);else return b;for(var d=-1,e=0;e<c.length;e++)if(""!=c[e]){var f=b.lastIndexOf(c[e]);f>d&&(d=f)}return-1==d?b:b.slice(d+1)};
H.c.Ot=function(b,c){var d=[],e=[];if(b==c)return 0;if(!b.length||!c.length)return Math.max(b.length,c.length);for(var f=0;f<c.length+1;f++)d[f]=f;for(f=0;f<b.length;f++){e[0]=f+1;for(var g=0;g<c.length;g++)e[g+1]=Math.min(e[g]+1,d[g+1]+1,d[g]+Number(b[f]!=c[g]));for(g=0;g<d.length;g++)d[g]=e[g]}return e[c.length]};H.h.userAgent.ea={};H.h.userAgent.ea.Rm=function(){return H.h.userAgent.F.T("Presto")};H.h.userAgent.ea.Vm=function(){return H.h.userAgent.F.T("Trident")||H.h.userAgent.F.T("MSIE")};H.h.userAgent.ea.Ab=function(){return H.h.userAgent.F.T("Edge")};H.h.userAgent.ea.yi=function(){return H.h.userAgent.F.nf("WebKit")&&!H.h.userAgent.ea.Ab()};H.h.userAgent.ea.Jm=function(){return H.h.userAgent.F.T("Gecko")&&!H.h.userAgent.ea.yi()&&!H.h.userAgent.ea.Vm()&&!H.h.userAgent.ea.Ab()};
H.h.userAgent.ea.Hc=function(){var b=H.h.userAgent.F.cc();if(b){b=H.h.userAgent.F.jh(b);var c=H.h.userAgent.ea.dm(b);if(c)return"Gecko"==c[0]?H.h.userAgent.ea.rm(b):c[1];b=b[0];var d;if(b&&(d=b[2])&&(d=/Trident\/([^\s;]+)/.exec(d)))return d[1]}return""};H.h.userAgent.ea.dm=function(b){if(!H.h.userAgent.ea.Ab())return b[1];for(var c=0;c<b.length;c++){var d=b[c];if("Edge"==d[0])return d}};H.h.userAgent.ea.Xa=function(b){return 0<=H.c.Kb(H.h.userAgent.ea.Hc(),b)};
H.h.userAgent.ea.rm=function(b){return(b=H.g.find(b,function(c){return"Firefox"==c[0]}))&&b[1]||""};H.async.jj=function(b){H.global.setTimeout(function(){throw b;},0)};H.async.Na=function(b,c,d){var e=b;c&&(e=H.bind(b,c));e=H.async.Na.tj(e);H.Wa(H.global.setImmediate)&&(d||H.async.Na.No())?H.global.setImmediate(e):(H.async.Na.Zi||(H.async.Na.Zi=H.async.Na.mm()),H.async.Na.Zi(e))};H.async.Na.No=function(){return H.global.Window&&H.global.Window.prototype&&!H.h.userAgent.B.Ab()&&H.global.Window.prototype.setImmediate==H.global.setImmediate?!1:!0};
H.async.Na.mm=function(){var b=H.global.MessageChannel;"undefined"===typeof b&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!H.h.userAgent.ea.Rm()&&(b=function(){var f=document.createElement("IFRAME");f.style.display="none";H.a.O.ho(f);document.documentElement.appendChild(f);var g=f.contentWindow;f=g.document;f.open();H.a.O.Il(f);f.close();var h="callImmediate"+Math.random(),k="file:"==g.location.protocol?"*":g.location.protocol+"//"+g.location.host;f=H.bind(function(m){if(("*"==
k||m.origin==k)&&m.data==h)this.port1.onmessage()},this);g.addEventListener("message",f,!1);this.port1={};this.port2={postMessage:function(){g.postMessage(h,k)}}});if("undefined"!==typeof b&&!H.h.userAgent.B.Bd()){var c=new b,d={},e=d;c.port1.onmessage=function(){if(H.ca(d.next)){d=d.next;var f=d.Qg;d.Qg=null;f()}};return function(f){e.next={Qg:f};e=e.next;c.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement(l)?function(f){var g=document.createElement(l);
g.onreadystatechange=function(){g.onreadystatechange=null;g.parentNode.removeChild(g);g=null;f();f=null};document.documentElement.appendChild(g)}:function(f){H.global.setTimeout(f,0)}};H.async.Na.tj=H.V.ai;H.debug.pa.register(function(b){H.async.Na.tj=b});H.async.gb=function(){this.be=this.nc=null};H.async.gb.ge=100;H.async.gb.Ec=new H.async.Wc(function(){return new H.async.re},function(b){b.reset()},H.async.gb.ge);H.async.gb.prototype.add=function(b,c){var d=H.async.gb.Ec.get();d.set(b,c);this.be?this.be.next=d:this.nc=d;this.be=d};H.async.gb.prototype.remove=function(){var b=null;this.nc&&(b=this.nc,this.nc=this.nc.next,this.nc||(this.be=null),b.next=null);return b};H.async.re=function(){this.next=this.scope=this.Je=null};
H.async.re.prototype.set=function(b,c){this.Je=b;this.scope=c;this.next=null};H.async.re.prototype.reset=function(){this.next=this.scope=this.Je=null};H.Dj=!1;H.async.X=function(b,c){H.async.X.Ud||H.async.X.Dm();H.async.X.ae||(H.async.X.Ud(),H.async.X.ae=!0);H.async.X.Jf.add(b,c)};H.async.X.Dm=function(){if(H.Dj||H.global.Promise&&H.global.Promise.resolve){var b=H.global.Promise.resolve(void 0);H.async.X.Ud=function(){b.then(H.async.X.Od)}}else H.async.X.Ud=function(){H.async.Na(H.async.X.Od)}};H.async.X.du=function(b){H.async.X.Ud=function(){H.async.Na(H.async.X.Od);b&&b(H.async.X.Od)}};H.async.X.ae=!1;H.async.X.Jf=new H.async.gb;
H.sa&&(H.async.X.xw=function(){H.async.X.ae=!1;H.async.X.Jf=new H.async.gb});H.async.X.Od=function(){for(var b;b=H.async.X.Jf.remove();){try{b.Je.call(b.scope)}catch(c){H.async.jj(c)}H.async.gb.Ec.put(b)}H.async.X.ae=!1};H.h.userAgent.platform={};H.h.userAgent.platform.gi=function(){return H.h.userAgent.F.T("Android")};H.h.userAgent.platform.ri=function(){return H.h.userAgent.F.T("iPod")};H.h.userAgent.platform.pi=function(){return H.h.userAgent.F.T("iPhone")&&!H.h.userAgent.F.T("iPod")&&!H.h.userAgent.F.T("iPad")};H.h.userAgent.platform.oi=function(){return H.h.userAgent.F.T("iPad")};H.h.userAgent.platform.ni=function(){return H.h.userAgent.platform.pi()||H.h.userAgent.platform.oi()||H.h.userAgent.platform.ri()};
H.h.userAgent.platform.ti=function(){return H.h.userAgent.F.T("Macintosh")};H.h.userAgent.platform.Om=function(){return H.h.userAgent.F.T("Linux")};H.h.userAgent.platform.Bi=function(){return H.h.userAgent.F.T("Windows")};H.h.userAgent.platform.ii=function(){return H.h.userAgent.F.T("CrOS")};H.h.userAgent.platform.iv=function(){return H.h.userAgent.F.T("CrKey")};H.h.userAgent.platform.si=function(){return H.h.userAgent.F.nf("KaiOS")};H.h.userAgent.platform.Km=function(){return H.h.userAgent.F.nf("GAFP")};
H.h.userAgent.platform.Hc=function(){var b=H.h.userAgent.F.cc(),c="";H.h.userAgent.platform.Bi()?(c=/Windows (?:NT|Phone) ([0-9.]+)/,c=(b=c.exec(b))?b[1]:"0.0"):H.h.userAgent.platform.ni()?(c=/(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/,c=(b=c.exec(b))&&b[1].replace(/_/g,".")):H.h.userAgent.platform.ti()?(c=/Mac OS X ([0-9_.]+)/,c=(b=c.exec(b))?b[1].replace(/_/g,"."):"10"):H.h.userAgent.platform.si()?(c=/(?:KaiOS)\/(\S+)/i,c=(b=c.exec(b))&&b[1]):H.h.userAgent.platform.gi()?(c=/Android\s+([^\);]+)(\)|;)/,
c=(b=c.exec(b))&&b[1]):H.h.userAgent.platform.ii()&&(c=/(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/,c=(b=c.exec(b))&&b[1]);return c||""};H.h.userAgent.platform.Xa=function(b){return 0<=H.c.Kb(H.h.userAgent.platform.Hc(),b)};H.ib={};H.ib.object=function(b,c){return c};H.ib.Af=function(b){H.ib.Af[" "](b);return b};H.ib.Af[" "]=H.Rb;H.ib.dt=function(b,c){try{return H.ib.Af(b[c]),!0}catch(d){}return!1};H.ib.cache=function(b,c,d,e){e=e?e(c):c;return Object.prototype.hasOwnProperty.call(b,e)?b[e]:b[e]=d(c)};H.userAgent={};H.userAgent.Pf=!1;H.userAgent.Nf=!1;H.userAgent.Of=!1;H.userAgent.Uf=!1;H.userAgent.fe=!1;H.userAgent.Sf=!1;H.userAgent.zj=!1;H.userAgent.pc=H.userAgent.Pf||H.userAgent.Nf||H.userAgent.Of||H.userAgent.fe||H.userAgent.Uf||H.userAgent.Sf;H.userAgent.pm=function(){return H.h.userAgent.F.cc()};H.userAgent.We=function(){return H.global.navigator||null};H.userAgent.Du=function(){return H.userAgent.We()};H.userAgent.og=H.userAgent.pc?H.userAgent.Sf:H.h.userAgent.B.ff();
H.userAgent.oa=H.userAgent.pc?H.userAgent.Pf:H.h.userAgent.B.Bd();H.userAgent.ag=H.userAgent.pc?H.userAgent.Nf:H.h.userAgent.ea.Ab();H.userAgent.Vp=H.userAgent.ag||H.userAgent.oa;H.userAgent.he=H.userAgent.pc?H.userAgent.Of:H.h.userAgent.ea.Jm();H.userAgent.sc=H.userAgent.pc?H.userAgent.Uf||H.userAgent.fe:H.h.userAgent.ea.yi();H.userAgent.Qm=function(){return H.userAgent.sc&&H.h.userAgent.F.T("Mobile")};H.userAgent.gr=H.userAgent.fe||H.userAgent.Qm();H.userAgent.Hr=H.userAgent.sc;
H.userAgent.Fl=function(){var b=H.userAgent.We();return b&&b.platform||""};H.userAgent.xr=H.userAgent.Fl();H.userAgent.Rf=!1;H.userAgent.Vf=!1;H.userAgent.Qf=!1;H.userAgent.Wf=!1;H.userAgent.Mf=!1;H.userAgent.de=!1;H.userAgent.ce=!1;H.userAgent.ee=!1;H.userAgent.Cj=!1;H.userAgent.Bj=!1;H.userAgent.Ra=H.userAgent.Rf||H.userAgent.Vf||H.userAgent.Qf||H.userAgent.Wf||H.userAgent.Mf||H.userAgent.de||H.userAgent.ce||H.userAgent.ee;H.userAgent.Xq=H.userAgent.Ra?H.userAgent.Rf:H.h.userAgent.platform.ti();
H.userAgent.ws=H.userAgent.Ra?H.userAgent.Vf:H.h.userAgent.platform.Bi();H.userAgent.Nm=function(){return H.h.userAgent.platform.Om()||H.h.userAgent.platform.ii()};H.userAgent.Vq=H.userAgent.Ra?H.userAgent.Qf:H.userAgent.Nm();H.userAgent.Zm=function(){var b=H.userAgent.We();return!!b&&H.c.contains(b.appVersion||"","X11")};H.userAgent.xs=H.userAgent.Ra?H.userAgent.Wf:H.userAgent.Zm();H.userAgent.ap=H.userAgent.Ra?H.userAgent.Mf:H.h.userAgent.platform.gi();
H.userAgent.Jq=H.userAgent.Ra?H.userAgent.de:H.h.userAgent.platform.pi();H.userAgent.Iq=H.userAgent.Ra?H.userAgent.ce:H.h.userAgent.platform.oi();H.userAgent.Kq=H.userAgent.Ra?H.userAgent.ee:H.h.userAgent.platform.ri();H.userAgent.Hq=H.userAgent.Ra?H.userAgent.de||H.userAgent.ce||H.userAgent.ee:H.h.userAgent.platform.ni();H.userAgent.Nq=H.userAgent.Ra?H.userAgent.Cj:H.h.userAgent.platform.si();H.userAgent.nq=H.userAgent.Ra?H.userAgent.Bj:H.h.userAgent.platform.Km();
H.userAgent.Gl=function(){var b="",c=H.userAgent.sm();c&&(b=c?c[1]:"");return H.userAgent.oa&&(c=H.userAgent.xh(),null!=c&&c>parseFloat(b))?String(c):b};H.userAgent.sm=function(){var b=H.userAgent.pm();if(H.userAgent.he)return/rv:([^\);]+)(\)|;)/.exec(b);if(H.userAgent.ag)return/Edge\/([\d\.]+)/.exec(b);if(H.userAgent.oa)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(b);if(H.userAgent.sc)return/WebKit\/(\S+)/.exec(b);if(H.userAgent.og)return/(?:Version)[ \/]?(\S+)/.exec(b)};
H.userAgent.xh=function(){var b=H.global.document;return b?b.documentMode:void 0};H.userAgent.VERSION=H.userAgent.Gl();H.userAgent.compare=function(b,c){return H.c.Kb(b,c)};H.userAgent.Xm={};H.userAgent.Xa=function(b){return H.userAgent.zj||H.ib.cache(H.userAgent.Xm,b,function(){return 0<=H.c.Kb(H.userAgent.VERSION,b)})};H.userAgent.Kv=H.userAgent.Xa;H.userAgent.Kc=function(b){return Number(H.userAgent.Xj)>=b};H.userAgent.lv=H.userAgent.Kc;var fa;
fa=H.global.document&&H.userAgent.oa?H.userAgent.xh():void 0;H.userAgent.Xj=fa;H.a.ha={};H.a.ha.Ej=!1;H.a.ha.Fj=!1;H.a.ha.El=function(){try{return!!(new self.OffscreenCanvas(0,0)).getContext("2d")}catch(b){}return!1};H.a.ha.pr=!H.a.ha.Ej&&(H.a.ha.Fj||H.a.ha.El());H.a.ha.Kj=!H.userAgent.oa||H.userAgent.Kc(9);H.a.ha.Lj=!H.userAgent.he&&!H.userAgent.oa||H.userAgent.oa&&H.userAgent.Kc(9)||H.userAgent.he&&H.userAgent.Xa("1.9.1");H.a.ha.Yf=H.userAgent.oa&&!H.userAgent.Xa("9");H.a.ha.Mj=H.userAgent.oa||H.userAgent.og||H.userAgent.sc;H.a.ha.ek=H.userAgent.oa;
H.a.ha.Rq=H.userAgent.oa&&!H.userAgent.Kc(9);H.C={};H.C.lw=function(b){return Math.floor(Math.random()*b)};H.C.Ex=function(b,c){return b+Math.random()*(c-b)};H.C.ht=function(b,c,d){return Math.min(Math.max(b,c),d)};H.C.Li=function(b,c){b%=c;return 0>b*c?b+c:b};H.C.Nv=function(b,c,d){return b+d*(c-b)};H.C.Yv=function(b,c,d){return Math.abs(b-c)<=(d||1E-6)};H.C.Df=function(b){return H.C.Li(b,360)};H.C.nx=function(b){return H.C.Li(b,2*Math.PI)};H.C.mj=function(b){return b*Math.PI/180};H.C.yo=function(b){return 180*b/Math.PI};
H.C.Es=function(b,c){return c*Math.cos(H.C.mj(b))};H.C.Fs=function(b,c){return c*Math.sin(H.C.mj(b))};H.C.angle=function(b,c,d,e){return H.C.Df(H.C.yo(Math.atan2(e-c,d-b)))};H.C.Ds=function(b,c){b=H.C.Df(c)-H.C.Df(b);180<b?b-=360:-180>=b&&(b=360+b);return b};H.C.sign=function(b){return 0<b?1:0>b?-1:b};
H.C.Rv=function(b,c,d,e){d=d||function(r,w){return r==w};e=e||function(r){return b[r]};for(var f=b.length,g=c.length,h=[],k=0;k<f+1;k++)h[k]=[],h[k][0]=0;for(var m=0;m<g+1;m++)h[0][m]=0;for(k=1;k<=f;k++)for(m=1;m<=g;m++)d(b[k-1],c[m-1])?h[k][m]=h[k-1][m-1]+1:h[k][m]=Math.max(h[k-1][m],h[k][m-1]);var n=[];k=f;for(m=g;0<k&&0<m;)d(b[k-1],c[m-1])?(n.unshift(e(k-1,m-1)),k--,m--):h[k-1][m]>h[k][m-1]?k--:m--;return n};H.C.Ff=function(b){return H.g.reduce(arguments,function(c,d){return c+d},0)};
H.C.fl=function(b){return H.C.Ff.apply(null,arguments)/arguments.length};H.C.ao=function(b){var c=arguments.length;if(2>c)return 0;var d=H.C.fl.apply(null,arguments);return H.C.Ff.apply(null,H.g.map(arguments,function(e){return Math.pow(e-d,2)}))/(c-1)};H.C.ox=function(b){return Math.sqrt(H.C.ao.apply(null,arguments))};H.C.rv=function(b){return isFinite(b)&&0==b%1};H.C.ov=function(b){return isFinite(b)};H.C.wv=function(b){return 0==b&&0>1/b};
H.C.Qv=function(b){if(0<b){var c=Math.round(Math.log(b)*Math.LOG10E);return c-(parseFloat("1e"+c)>b?1:0)}return 0==b?-Infinity:NaN};H.C.Aw=function(b,c){return Math.floor(b+(c||2E-15))};H.C.zw=function(b,c){return Math.ceil(b-(c||2E-15))};H.C.ia=function(b,c){this.x=H.ca(b)?b:0;this.y=H.ca(c)?c:0};H.C.ia.prototype.clone=function(){return new H.C.ia(this.x,this.y)};H.sa&&(H.C.ia.prototype.toString=function(){return"("+this.x+", "+this.y+")"});H.C.ia.prototype.Ob=function(b){return b instanceof H.C.ia&&H.C.ia.Ob(this,b)};H.C.ia.Ob=function(b,c){return b==c?!0:b&&c?b.x==c.x&&b.y==c.y:!1};H.C.ia.Mt=function(b,c){var d=b.x-c.x;b=b.y-c.y;return Math.sqrt(d*d+b*b)};H.C.ia.Sv=function(b){return Math.sqrt(b.x*b.x+b.y*b.y)};
H.C.ia.azimuth=function(b){return H.C.angle(0,0,b.x,b.y)};H.C.ia.lx=function(b,c){var d=b.x-c.x;b=b.y-c.y;return d*d+b*b};H.C.ia.Lt=function(b,c){return new H.C.ia(b.x-c.x,b.y-c.y)};H.C.ia.Ff=function(b,c){return new H.C.ia(b.x+c.x,b.y+c.y)};F=H.C.ia.prototype;F.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};F.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};F.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};
F.translate=function(b,c){b instanceof H.C.ia?(this.x+=b.x,this.y+=b.y):(this.x+=Number(b),H.Bb(c)&&(this.y+=c));return this};F.scale=function(b,c){c=H.Bb(c)?c:b;this.x*=b;this.y*=c;return this};H.C.Yb=function(b,c){this.width=b;this.height=c};H.C.Yb.Ob=function(b,c){return b==c?!0:b&&c?b.width==c.width&&b.height==c.height:!1};H.C.Yb.prototype.clone=function(){return new H.C.Yb(this.width,this.height)};H.sa&&(H.C.Yb.prototype.toString=function(){return"("+this.width+" x "+this.height+")"});F=H.C.Yb.prototype;F.aspectRatio=function(){return this.width/this.height};F.Ca=function(){return!(this.width*this.height)};
F.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};F.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};F.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};F.scale=function(b,c){c=H.Bb(c)?c:b;this.width*=b;this.height*=c;return this};H.a.Gj=!1;H.a.Tf=!1;H.a.Qj=H.a.Gj||H.a.Tf;H.a.Qe=function(b){return b?new H.a.Vb(H.a.xb(b)):H.a.Cl||(H.a.Cl=new H.a.Vb)};H.a.Zl=function(){return document};H.a.Re=function(b){return H.a.Ue(document,b)};H.a.Ue=function(b,c){return H.L(c)?b.getElementById(c):c};H.a.jm=function(b){return H.a.Rh(document,b)};H.a.Rh=function(b,c){return H.a.Ue(b,c)};H.a.vj=H.a.Re;H.a.getElementsByTagName=function(b,c){return(c||document).getElementsByTagName(String(b))};
H.a.Ve=function(b,c,d){return H.a.qd(document,b,c,d)};H.a.cm=function(b,c,d){return H.a.Te(document,b,c,d)};H.a.Ah=function(b,c){var d=c||document;return H.a.ze(d)?d.querySelectorAll("."+b):H.a.qd(document,"*",b,c)};H.a.Se=function(b,c){var d=c||document;return(d.getElementsByClassName?d.getElementsByClassName(b)[0]:H.a.Te(document,"*",b,c))||null};H.a.Qh=function(b,c){return H.a.Se(b,c)};H.a.ze=function(b){return!(!b.querySelectorAll||!b.querySelector)};
H.a.qd=function(b,c,d,e){b=e||b;c=c&&"*"!=c?String(c).toUpperCase():"";if(H.a.ze(b)&&(c||d))return b.querySelectorAll(c+(d?"."+d:""));if(d&&b.getElementsByClassName){b=b.getElementsByClassName(d);if(c){e={};for(var f=0,g=0,h;h=b[g];g++)c==h.nodeName&&(e[f++]=h);e.length=f;return e}return b}b=b.getElementsByTagName(c||"*");if(d){e={};for(g=f=0;h=b[g];g++)c=h.className,typeof c.split==t&&H.g.contains(c.split(/\s+/),d)&&(e[f++]=h);e.length=f;return e}return b};
H.a.Te=function(b,c,d,e){var f=e||b,g=c&&"*"!=c?String(c).toUpperCase():"";return H.a.ze(f)&&(g||d)?f.querySelector(g+(d?"."+d:"")):H.a.qd(b,c,d,e)[0]||null};H.a.wj=H.a.Ve;H.a.Wd=function(b,c){H.object.forEach(c,function(d,e){d&&typeof d==v&&d.Va&&(d=d.Ga());"style"==e?b.style.cssText=d:"class"==e?b.className=d:"for"==e?b.htmlFor=d:H.a.$f.hasOwnProperty(e)?b.setAttribute(H.a.$f[e],d):H.c.startsWith(e,"aria-")||H.c.startsWith(e,"data-")?b.setAttribute(e,d):b[e]=d})};
H.a.$f={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};H.a.Wh=function(b){return H.a.Xh(b||window)};H.a.Xh=function(b){b=b.document;b=H.a.Jc(b)?b.documentElement:b.body;return new H.C.Yb(b.clientWidth,b.clientHeight)};H.a.$l=function(){return H.a.Oe(window)};H.a.wu=function(b){return H.a.Oe(b)};
H.a.Oe=function(b){var c=b.document,d=0;if(c){d=c.body;var e=c.documentElement;if(!e||!d)return 0;b=H.a.Xh(b).height;if(H.a.Jc(c)&&e.scrollHeight)d=e.scrollHeight!=b?e.scrollHeight:e.offsetHeight;else{c=e.scrollHeight;var f=e.offsetHeight;e.clientHeight!=f&&(c=d.scrollHeight,f=d.offsetHeight);d=c>b?c>f?c:f:c<f?c:f}}return d};H.a.Fu=function(b){return H.a.Qe((b||H.global||window).document).yh()};H.a.yh=function(){return H.a.zh(document)};
H.a.zh=function(b){var c=H.a.Pe(b);b=H.a.ec(b);return H.userAgent.oa&&H.userAgent.Xa("10")&&b.pageYOffset!=c.scrollTop?new H.C.ia(c.scrollLeft,c.scrollTop):new H.C.ia(b.pageXOffset||c.scrollLeft,b.pageYOffset||c.scrollTop)};H.a.am=function(){return H.a.Pe(document)};H.a.Pe=function(b){return b.scrollingElement?b.scrollingElement:!H.userAgent.sc&&H.a.Jc(b)?b.documentElement:b.body||b.documentElement};H.a.dc=function(b){return b?H.a.ec(b):window};H.a.ec=function(b){return b.parentWindow||b.defaultView};
H.a.Ce=function(b,c,d){return H.a.Yg(document,arguments)};H.a.Yg=function(b,c){var d=String(c[0]),e=c[1];if(!H.a.ha.Kj&&e&&(e.name||e.type)){d=["<",d];e.name&&d.push(' name="',H.c.Ha(e.name),'"');if(e.type){d.push(' type="',H.c.Ha(e.type),'"');var f={};H.object.extend(f,e);delete f.type;e=f}d.push(">");d=d.join("")}d=b.createElement(d);e&&(H.L(e)?d.className=e:H.isArray(e)?d.className=e.join(" "):H.a.Wd(d,e));2<c.length&&H.a.Eg(b,d,c,2);return d};
H.a.Eg=function(b,c,d,e){function f(h){h&&c.appendChild(H.L(h)?b.createTextNode(h):h)}for(;e<d.length;e++){var g=d[e];H.ma(g)&&!H.a.df(g)?H.g.forEach(H.a.ef(g)?H.g.jb(g):g,f):f(g)}};H.a.xj=H.a.Ce;H.a.createElement=function(b){return H.a.rb(document,b)};H.a.rb=function(b,c){return b.createElement(String(c))};H.a.createTextNode=function(b){return document.createTextNode(String(b))};H.a.zl=function(b,c,d){return H.a.Zg(document,b,c,!!d)};
H.a.Zg=function(b,c,d,e){for(var f=H.a.rb(b,"TABLE"),g=f.appendChild(H.a.rb(b,"TBODY")),h=0;h<c;h++){for(var k=H.a.rb(b,"TR"),m=0;m<d;m++){var n=H.a.rb(b,"TD");e&&H.a.yf(n,H.c.yg.lg);k.appendChild(n)}g.appendChild(k)}return f};H.a.st=function(b){var c=H.g.map(arguments,H.c.M.K);c=H.b.kb.Si(H.c.M.from("Constant HTML string, that gets turned into a Node later, so it will be automatically balanced."),c.join(""));return H.a.Ti(c)};H.a.Ti=function(b){return H.a.Ui(document,b)};
H.a.Ui=function(b,c){var d=H.a.rb(b,"DIV");H.a.ha.ek?(H.a.O.xf(d,H.b.u.concat(H.b.u.Xf,c)),d.removeChild(d.firstChild)):H.a.O.xf(d,c);return H.a.tl(b,d)};H.a.tl=function(b,c){if(1==c.childNodes.length)return c.removeChild(c.firstChild);for(b=b.createDocumentFragment();c.firstChild;)b.appendChild(c.firstChild);return b};H.a.Fm=function(){return H.a.Jc(document)};H.a.Jc=function(b){return H.a.Qj?H.a.Tf:"CSS1Compat"==b.compatMode};H.a.canHaveChildren=function(b){if(b.nodeType!=H.a.ua.mb)return!1;switch(b.tagName){case "APPLET":case "AREA":case "BASE":case "BR":case "COL":case "COMMAND":case "EMBED":case "FRAME":case "HR":case "IMG":case "INPUT":case "IFRAME":case "ISINDEX":case "KEYGEN":case "LINK":case "NOFRAMES":case "NOSCRIPT":case "META":case "OBJECT":case "PARAM":case l:case "SOURCE":case "STYLE":case "TRACK":case "WBR":return!1}return!0};
H.a.appendChild=function(b,c){b.appendChild(c)};H.a.append=function(b,c){H.a.Eg(H.a.xb(b),b,arguments,1)};H.a.tf=function(b){for(var c;c=b.firstChild;)b.removeChild(c)};H.a.ei=function(b,c){c.parentNode&&c.parentNode.insertBefore(b,c)};H.a.di=function(b,c){c.parentNode&&c.parentNode.insertBefore(b,c.nextSibling)};H.a.ci=function(b,c,d){b.insertBefore(c,b.childNodes[d]||null)};H.a.removeNode=function(b){return b&&b.parentNode?b.parentNode.removeChild(b):null};
H.a.Ri=function(b,c){var d=c.parentNode;d&&d.replaceChild(b,c)};H.a.oh=function(b){var c,d=b.parentNode;if(d&&d.nodeType!=H.a.ua.Wj){if(b.removeNode)return b.removeNode(!1);for(;c=b.firstChild;)d.insertBefore(c,b);return H.a.removeNode(b)}};H.a.vh=function(b){return H.a.ha.Lj&&void 0!=b.children?b.children:H.g.filter(b.childNodes,function(c){return c.nodeType==H.a.ua.mb})};H.a.Bh=function(b){return H.ca(b.firstElementChild)?b.firstElementChild:H.a.sd(b.firstChild,!0)};
H.a.Eh=function(b){return H.ca(b.lastElementChild)?b.lastElementChild:H.a.sd(b.lastChild,!1)};H.a.Gh=function(b){return H.ca(b.nextElementSibling)?b.nextElementSibling:H.a.sd(b.nextSibling,!0)};H.a.Nh=function(b){return H.ca(b.previousElementSibling)?b.previousElementSibling:H.a.sd(b.previousSibling,!1)};H.a.sd=function(b,c){for(;b&&b.nodeType!=H.a.ua.mb;)b=c?b.nextSibling:b.previousSibling;return b};
H.a.Hh=function(b){if(!b)return null;if(b.firstChild)return b.firstChild;for(;b&&!b.nextSibling;)b=b.parentNode;return b?b.nextSibling:null};H.a.Oh=function(b){if(!b)return null;if(!b.previousSibling)return b.parentNode;for(b=b.previousSibling;b&&b.lastChild;)b=b.lastChild;return b};H.a.df=function(b){return H.Da(b)&&0<b.nodeType};H.a.bf=function(b){return H.Da(b)&&b.nodeType==H.a.ua.mb};H.a.zi=function(b){return H.Da(b)&&b.window==b};
H.a.Mh=function(b){var c;if(H.a.ha.Mj&&!(H.userAgent.oa&&H.userAgent.Xa("9")&&!H.userAgent.Xa("10")&&H.global.SVGElement&&b instanceof H.global.SVGElement)&&(c=b.parentElement))return c;c=b.parentNode;return H.a.bf(c)?c:null};H.a.contains=function(b,c){if(!b||!c)return!1;if(b.contains&&c.nodeType==H.a.ua.mb)return b==c||b.contains(c);if("undefined"!=typeof b.compareDocumentPosition)return b==c||!!(b.compareDocumentPosition(c)&16);for(;c&&b!=c;)c=c.parentNode;return c==b};
H.a.Sg=function(b,c){if(b==c)return 0;if(b.compareDocumentPosition)return b.compareDocumentPosition(c)&2?1:-1;if(H.userAgent.oa&&!H.userAgent.Kc(9)){if(b.nodeType==H.a.ua.Uc)return-1;if(c.nodeType==H.a.ua.Uc)return 1}if("sourceIndex"in b||b.parentNode&&"sourceIndex"in b.parentNode){var d=b.nodeType==H.a.ua.mb,e=c.nodeType==H.a.ua.mb;if(d&&e)return b.sourceIndex-c.sourceIndex;var f=b.parentNode,g=c.parentNode;return f==g?H.a.Ug(b,c):!d&&H.a.contains(f,c)?-1*H.a.Tg(b,c):!e&&H.a.contains(g,b)?H.a.Tg(c,
b):(d?b.sourceIndex:f.sourceIndex)-(e?c.sourceIndex:g.sourceIndex)}e=H.a.xb(b);d=e.createRange();d.selectNode(b);d.collapse(!0);b=e.createRange();b.selectNode(c);b.collapse(!0);return d.compareBoundaryPoints(H.global.Range.START_TO_END,b)};H.a.Tg=function(b,c){var d=b.parentNode;if(d==c)return-1;for(;c.parentNode!=d;)c=c.parentNode;return H.a.Ug(c,b)};H.a.Ug=function(b,c){for(;c=c.previousSibling;)if(c==b)return-1;return 1};
H.a.kh=function(b){var c,d=arguments.length;if(!d)return null;if(1==d)return arguments[0];var e=[],f=Infinity;for(c=0;c<d;c++){for(var g=[],h=arguments[c];h;)g.unshift(h),h=h.parentNode;e.push(g);f=Math.min(f,g.length)}g=null;for(c=0;c<f;c++){h=e[0][c];for(var k=1;k<d;k++)if(h!=e[k][c])return g;g=h}return g};H.a.qv=function(b){return 16==(b.ownerDocument.compareDocumentPosition(b)&16)};H.a.xb=function(b){return b.nodeType==H.a.ua.Uc?b:b.ownerDocument||b.document};
H.a.Ch=function(b){return b.contentDocument||b.contentWindow.document};H.a.Dh=function(b){try{return b.contentWindow||(b.contentDocument?H.a.dc(b.contentDocument):null)}catch(c){}return null};H.a.yf=function(b,c){if("textContent"in b)b.textContent=c;else if(b.nodeType==H.a.ua.$c)b.data=String(c);else if(b.firstChild&&b.firstChild.nodeType==H.a.ua.$c){for(;b.lastChild!=b.firstChild;)b.removeChild(b.lastChild);b.firstChild.data=String(c)}else H.a.tf(b),b.appendChild(H.a.xb(b).createTextNode(String(c)))};
H.a.Lh=function(b){if("outerHTML"in b)return b.outerHTML;var c=H.a.rb(H.a.xb(b),"DIV");c.appendChild(b.cloneNode(!0));return c.innerHTML};H.a.lh=function(b,c){var d=[];return H.a.Ie(b,c,d,!0)?d[0]:void 0};H.a.mh=function(b,c){var d=[];H.a.Ie(b,c,d,!1);return d};H.a.Ie=function(b,c,d,e){if(null!=b)for(b=b.firstChild;b;){if(c(b)&&(d.push(b),e)||H.a.Ie(b,c,d,e))return!0;b=b.nextSibling}return!1};
H.a.Yt=function(b,c){for(b=H.a.wh(b);0<b.length;){var d=b.pop();if(c(d))return d;for(d=d.lastElementChild;d;d=d.previousElementSibling)b.push(d)}return null};H.a.Zt=function(b,c){var d=[];for(b=H.a.wh(b);0<b.length;){var e=b.pop();c(e)&&d.push(e);for(e=e.lastElementChild;e;e=e.previousElementSibling)b.push(e)}return d};H.a.wh=function(b){if(b.nodeType==H.a.ua.Uc)return[b.documentElement];var c=[];for(b=b.lastElementChild;b;b=b.previousElementSibling)c.push(b);return c};
H.a.vg={SCRIPT:1,STYLE:1,HEAD:1,IFRAME:1,OBJECT:1};H.a.Yc={IMG:" ",BR:"\n"};H.a.cf=function(b){return H.a.$h(b)&&H.a.xi(b)};H.a.Yi=function(b,c){c?b.tabIndex=0:(b.tabIndex=-1,b.removeAttribute("tabIndex"))};H.a.ji=function(b){var c;return(c=H.a.vn(b)?!b.disabled&&(!H.a.$h(b)||H.a.xi(b)):H.a.cf(b))&&H.userAgent.oa?H.a.xm(b):c};H.a.$h=function(b){return H.userAgent.oa&&!H.userAgent.Xa("9")?(b=b.getAttributeNode("tabindex"),H.zb(b)&&b.specified):b.hasAttribute("tabindex")};
H.a.xi=function(b){b=b.tabIndex;return H.Bb(b)&&0<=b&&32768>b};H.a.vn=function(b){return"A"==b.tagName&&b.hasAttribute("href")||"INPUT"==b.tagName||"TEXTAREA"==b.tagName||"SELECT"==b.tagName||"BUTTON"==b.tagName};H.a.xm=function(b){b=!H.Wa(b.getBoundingClientRect)||H.userAgent.oa&&null==b.parentElement?{height:b.offsetHeight,width:b.offsetWidth}:b.getBoundingClientRect();return H.zb(b)&&0<b.height&&0<b.width};
H.a.ud=function(b){if(H.a.ha.Yf&&null!==b&&"innerText"in b)b=H.c.rl(b.innerText);else{var c=[];H.a.Ye(b,c,!0);b=c.join("")}b=b.replace(/ \xAD /g," ").replace(/\xAD/g,"");b=b.replace(/\u200B/g,"");H.a.ha.Yf||(b=b.replace(/ +/g," "));" "!=b&&(b=b.replace(/^\s*/,""));return b};H.a.Ku=function(b){var c=[];H.a.Ye(b,c,!1);return c.join("")};
H.a.Ye=function(b,c,d){if(!(b.nodeName in H.a.vg))if(b.nodeType==H.a.ua.$c)d?c.push(String(b.nodeValue).replace(/(\r\n|\r|\n)/g,"")):c.push(b.nodeValue);else if(b.nodeName in H.a.Yc)c.push(H.a.Yc[b.nodeName]);else for(b=b.firstChild;b;)H.a.Ye(b,c,d),b=b.nextSibling};H.a.Jh=function(b){return H.a.ud(b).length};H.a.Kh=function(b,c){c=c||H.a.xb(b).body;for(var d=[];b&&b!=c;){for(var e=b;e=e.previousSibling;)d.unshift(H.a.ud(e));b=b.parentNode}return H.c.trimLeft(d.join("")).replace(/ +/g," ").length};
H.a.Ih=function(b,c,d){b=[b];for(var e=0,f=null;0<b.length&&e<c;)if(f=b.pop(),!(f.nodeName in H.a.vg))if(f.nodeType==H.a.ua.$c){var g=f.nodeValue.replace(/(\r\n|\r|\n)/g,"").replace(/ +/g," ");e+=g.length}else if(f.nodeName in H.a.Yc)e+=H.a.Yc[f.nodeName].length;else for(g=f.childNodes.length-1;0<=g;g--)b.push(f.childNodes[g]);H.Da(d)&&(d.nw=f?f.nodeValue.length+c-e-1:0,d.node=f);return f};
H.a.ef=function(b){if(b&&typeof b.length==u){if(H.Da(b))return typeof b.item==t||typeof b.item==y;if(H.Wa(b))return typeof b.item==t}return!1};H.a.Me=function(b,c,d,e){if(!c&&!d)return null;var f=c?String(c).toUpperCase():null;return H.a.Le(b,function(g){return(!f||g.nodeName==f)&&(!d||H.L(g.className)&&H.g.contains(g.className.split(/\s+/),d))},!0,e)};H.a.sh=function(b,c,d){return H.a.Me(b,null,c,d)};
H.a.Le=function(b,c,d,e){b&&!d&&(b=b.parentNode);for(d=0;b&&(null==e||d<=e);){if(c(b))return b;b=b.parentNode;d++}return null};H.a.rh=function(b){try{var c=b&&b.activeElement;return c&&c.nodeName?c:null}catch(d){return null}};H.a.Ju=function(){var b=H.a.dc();return H.ca(b.devicePixelRatio)?b.devicePixelRatio:b.matchMedia?H.a.Ed(3)||H.a.Ed(2)||H.a.Ed(1.5)||H.a.Ed(1)||.75:1};
H.a.Ed=function(b){return H.a.dc().matchMedia("(min-resolution: "+b+"dppx),(min--moz-device-pixel-ratio: "+b+"),(min-resolution: "+96*b+"dpi)").matches?b:0};H.a.uh=function(b){return b.getContext("2d")};H.a.Vb=function(b){this.ka=b||H.global.document||document};F=H.a.Vb.prototype;F.Qe=H.a.Qe;F.Zl=D("ka");F.Re=function(b){return H.a.Ue(this.ka,b)};F.jm=function(b){return H.a.Rh(this.ka,b)};F.vj=H.a.Vb.prototype.Re;F.getElementsByTagName=function(b,c){return(c||this.ka).getElementsByTagName(String(b))};
F.Ve=function(b,c,d){return H.a.qd(this.ka,b,c,d)};F.cm=function(b,c,d){return H.a.Te(this.ka,b,c,d)};F.Ah=function(b,c){return H.a.Ah(b,c||this.ka)};F.Se=function(b,c){return H.a.Se(b,c||this.ka)};F.Qh=function(b,c){return H.a.Qh(b,c||this.ka)};F.wj=H.a.Vb.prototype.Ve;F.Wd=H.a.Wd;F.Wh=function(b){return H.a.Wh(b||this.dc())};F.$l=function(){return H.a.Oe(this.dc())};F.Ce=function(b,c,d){return H.a.Yg(this.ka,arguments)};F.xj=H.a.Vb.prototype.Ce;
F.createElement=function(b){return H.a.rb(this.ka,b)};F.createTextNode=function(b){return this.ka.createTextNode(String(b))};F.zl=function(b,c,d){return H.a.Zg(this.ka,b,c,!!d)};F.Ti=function(b){return H.a.Ui(this.ka,b)};F.Fm=function(){return H.a.Jc(this.ka)};F.dc=function(){return H.a.ec(this.ka)};F.am=function(){return H.a.Pe(this.ka)};F.yh=function(){return H.a.zh(this.ka)};F.rh=function(b){return H.a.rh(b||this.ka)};F.appendChild=H.a.appendChild;F.append=H.a.append;F.canHaveChildren=H.a.canHaveChildren;
F.tf=H.a.tf;F.ei=H.a.ei;F.di=H.a.di;F.ci=H.a.ci;F.removeNode=H.a.removeNode;F.Ri=H.a.Ri;F.oh=H.a.oh;F.vh=H.a.vh;F.Bh=H.a.Bh;F.Eh=H.a.Eh;F.Gh=H.a.Gh;F.Nh=H.a.Nh;F.Hh=H.a.Hh;F.Oh=H.a.Oh;F.df=H.a.df;F.bf=H.a.bf;F.zi=H.a.zi;F.Mh=H.a.Mh;F.contains=H.a.contains;F.Sg=H.a.Sg;F.kh=H.a.kh;F.xb=H.a.xb;F.Ch=H.a.Ch;F.Dh=H.a.Dh;F.yf=H.a.yf;F.Lh=H.a.Lh;F.lh=H.a.lh;F.mh=H.a.mh;F.cf=H.a.cf;F.Yi=H.a.Yi;F.ji=H.a.ji;F.ud=H.a.ud;F.Jh=H.a.Jh;F.Kh=H.a.Kh;F.Ih=H.a.Ih;F.ef=H.a.ef;F.Me=H.a.Me;F.sh=H.a.sh;F.Le=H.a.Le;
F.uh=H.a.uh;H.o={};H.o.va="StopIteration"in H.global?H.global.StopIteration:{message:"StopIteration",stack:""};H.o.Iterator=B();H.o.Iterator.prototype.next=function(){throw H.o.va;};H.o.Iterator.prototype.se=function(){return this};H.o.fa=function(b){if(b instanceof H.o.Iterator)return b;if(typeof b.se==t)return b.se(!1);if(H.ma(b)){var c=0,d=new H.o.Iterator;d.next=function(){for(;;){if(c>=b.length)throw H.o.va;if(c in b)return b[c++];c++}};return d}throw Error("Not implemented");};
H.o.forEach=function(b,c,d){if(H.ma(b))try{H.g.forEach(b,c,d)}catch(e){if(e!==H.o.va)throw e;}else{b=H.o.fa(b);try{for(;;)c.call(d,b.next(),void 0,b)}catch(e){if(e!==H.o.va)throw e;}}};H.o.filter=function(b,c,d){var e=H.o.fa(b);b=new H.o.Iterator;b.next=function(){for(;;){var f=e.next();if(c.call(d,f,void 0,e))return f}};return b};H.o.Xt=function(b,c,d){return H.o.filter(b,H.V.xn(c),d)};
H.o.Qd=function(b,c,d){var e=0,f=b,g=d||1;1<arguments.length&&(e=b,f=+c);if(0==g)throw Error("Range step argument must not be zero");var h=new H.o.Iterator;h.next=function(){if(0<g&&e>=f||0>g&&e<=f)throw H.o.va;var k=e;e+=g;return k};return h};H.o.join=function(b,c){return H.o.jb(b).join(c)};H.o.map=function(b,c,d){var e=H.o.fa(b);b=new H.o.Iterator;b.next=function(){var f=e.next();return c.call(d,f,void 0,e)};return b};
H.o.reduce=function(b,c,d,e){var f=d;H.o.forEach(b,function(g){f=c.call(e,f,g)});return f};H.o.some=function(b,c,d){b=H.o.fa(b);try{for(;;)if(c.call(d,b.next(),void 0,b))return!0}catch(e){if(e!==H.o.va)throw e;}return!1};H.o.every=function(b,c,d){b=H.o.fa(b);try{for(;;)if(!c.call(d,b.next(),void 0,b))return!1}catch(e){if(e!==H.o.va)throw e;}return!0};H.o.gt=function(b){return H.o.sl(arguments)};
H.o.sl=function(b){var c=H.o.fa(b);b=new H.o.Iterator;var d=null;b.next=function(){for(;;){if(null==d){var e=c.next();d=H.o.fa(e)}try{return d.next()}catch(f){if(f!==H.o.va)throw f;d=null}}};return b};H.o.Nt=function(b,c,d){var e=H.o.fa(b);b=new H.o.Iterator;var f=!0;b.next=function(){for(;;){var g=e.next();if(!f||!c.call(d,g,void 0,e))return f=!1,g}};return b};
H.o.ux=function(b,c,d){var e=H.o.fa(b);b=new H.o.Iterator;b.next=function(){var f=e.next();if(c.call(d,f,void 0,e))return f;throw H.o.va;};return b};H.o.jb=function(b){if(H.ma(b))return H.g.jb(b);b=H.o.fa(b);var c=[];H.o.forEach(b,function(d){c.push(d)});return c};H.o.Ob=function(b,c){b=H.o.To({},b,c);var d=H.g.eh;return H.o.every(b,function(e){return d(e[0],e[1])})};H.o.wn=function(b){try{H.o.fa(b).next()}catch(c){if(c!=H.o.va)throw c;}};
H.o.product=function(b){if(H.g.some(arguments,function(f){return!f.length})||!arguments.length)return new H.o.Iterator;var c=new H.o.Iterator,d=arguments,e=H.g.repeat(0,d.length);c.next=function(){if(e){for(var f=H.g.map(e,function(h,k){return d[k][h]}),g=e.length-1;0<=g;g--){if(e[g]<d[g].length-1){e[g]++;break}if(0==g){e=null;break}e[g]=0}return f}throw H.o.va;};return c};
H.o.Ht=function(b){var c=H.o.fa(b),d=[],e=0;b=new H.o.Iterator;var f=!1;b.next=function(){var g=null;if(!f)try{return g=c.next(),d.push(g),g}catch(h){if(h!=H.o.va||H.g.Ca(d))throw h;f=!0}g=d[e];e=(e+1)%d.length;return g};return b};H.o.count=function(b,c){var d=b||0,e=H.ca(c)?c:1;b=new H.o.Iterator;b.next=function(){var f=d;d+=e;return f};return b};H.o.repeat=function(b){var c=new H.o.Iterator;c.next=H.V.Vg(b);return c};
H.o.zs=function(b){var c=H.o.fa(b),d=0;b=new H.o.Iterator;b.next=function(){return d+=c.next()};return b};H.o.uj=function(b){var c=arguments,d=new H.o.Iterator;if(0<c.length){var e=H.g.map(c,H.o.fa);d.next=function(){return H.g.map(e,function(f){return f.next()})}}return d};
H.o.To=function(b,c){var d=H.g.slice(arguments,1),e=new H.o.Iterator;if(0<d.length){var f=H.g.map(d,H.o.fa);e.next=function(){var g=!1,h=H.g.map(f,function(k){try{var m=k.next();g=!0}catch(n){if(n!==H.o.va)throw n;m=b}return m});if(!g)throw H.o.va;return h}}return e};H.o.pt=function(b,c){var d=H.o.fa(c);return H.o.filter(b,function(){return!!d.next()})};H.o.ke=function(b,c){this.iterator=H.o.fa(b);this.Di=c||H.V.ai};H.yb(H.o.ke,H.o.Iterator);
H.o.ke.prototype.next=function(){for(;this.yc==this.hj;)this.kd=this.iterator.next(),this.yc=this.Di(this.kd);for(var b=this.hj=this.yc,c=this.hj,d=[];this.yc==c;){d.push(this.kd);try{this.kd=this.iterator.next()}catch(e){if(e!==H.o.va)throw e;break}this.yc=this.Di(this.kd)}return[b,d]};H.o.Ru=function(b,c){return new H.o.ke(b,c)};H.o.px=function(b,c,d){var e=H.o.fa(b);b=new H.o.Iterator;b.next=function(){var f=H.o.jb(e.next());return c.apply(d,H.g.concat(f,void 0,e))};return b};
H.o.tee=function(b,c){function d(){var g=e.next();H.g.forEach(f,function(h){h.push(g)})}var e=H.o.fa(b),f=H.g.map(H.g.Qd(H.Bb(c)?c:2),function(){return[]});return H.g.map(f,function(g){var h=new H.o.Iterator;h.next=function(){H.g.Ca(g)&&d();return g.shift()};return h})};H.o.Tt=function(b,c){return H.o.uj(H.o.count(c),b)};H.o.an=function(b,c){var d=H.o.fa(b);b=new H.o.Iterator;var e=c;b.next=function(){if(0<e--)return d.next();throw H.o.va;};return b};
H.o.vl=function(b,c){for(b=H.o.fa(b);0<c--;)H.o.wn(b);return b};H.o.slice=function(b,c,d){b=H.o.vl(b,c);H.Bb(d)&&(b=H.o.an(b,d-c));return b};H.o.wm=function(b){var c=[];H.g.Jn(b,c);return b.length!=c.length};H.o.An=function(b,c){b=H.o.jb(b);c=H.g.repeat(b,H.Bb(c)?c:b.length);c=H.o.product.apply(void 0,c);return H.o.filter(c,function(d){return!H.o.wm(d)})};
H.o.lt=function(b,c){function d(g){return e[g]}var e=H.o.jb(b);b=H.o.Qd(e.length);c=H.o.An(b,c);var f=H.o.filter(c,function(g){return H.g.wi(g)});c=new H.o.Iterator;c.next=function(){return H.g.map(f.next(),d)};return c};H.o.mt=function(b,c){function d(g){return e[g]}var e=H.o.jb(b);b=H.g.Qd(e.length);c=H.g.repeat(b,c);c=H.o.product.apply(void 0,c);var f=H.o.filter(c,function(g){return H.g.wi(g)});c=new H.o.Iterator;c.next=function(){return H.g.map(f.next(),d)};return c};H.Pd={};H.Pd.Fr=B();H.Thenable=B();H.Thenable.prototype.then=B();H.Thenable.hg="$goog_Thenable";H.Thenable.Cg=function(b){b.prototype[H.Thenable.hg]=!0};H.Thenable.ki=function(b){if(!b)return!1;try{return!!b[H.Thenable.hg]}catch(c){return!1}};H.Promise=function(b,c){this.qa=H.Promise.ba.$a;this.Ia=void 0;this.Zb=this.qb=this.ya=null;this.He=!1;0<H.Promise.Hb?this.Yd=0:0==H.Promise.Hb&&(this.wd=!1);H.Promise.eb&&(this.Cf=[],I(this,Error("created")),this.bh=0);if(b!=H.Rb)try{var d=this;b.call(c,function(e){J(d,H.Promise.ba.nb,e)},function(e){if(H.sa&&!(e instanceof H.Promise.Ub))try{if(e instanceof Error)throw e;throw Error("Promise rejected.");}catch(f){}J(d,H.Promise.ba.Ja,e)})}catch(e){J(this,H.Promise.ba.Ja,e)}};H.Promise.eb=!1;
H.Promise.Hb=0;H.Promise.ba={$a:0,Ij:1,nb:2,Ja:3};H.Promise.Zf=function(){this.next=this.context=this.hc=this.Oc=this.Jb=null;this.bd=!1};H.Promise.Zf.prototype.reset=function(){this.context=this.hc=this.Oc=this.Jb=null;this.bd=!1};H.Promise.ge=100;H.Promise.Ec=new H.async.Wc(function(){return new H.Promise.Zf},function(b){b.reset()},H.Promise.ge);H.Promise.th=function(b,c,d){var e=H.Promise.Ec.get();e.Oc=b;e.hc=c;e.context=d;return e};H.Promise.Rn=function(b){H.Promise.Ec.put(b)};
H.Promise.resolve=function(b){if(b instanceof H.Promise)return b;var c=new H.Promise(H.Rb);J(c,H.Promise.ba.nb,b);return c};H.Promise.reject=function(b){return new H.Promise(function(c,d){d(b)})};H.Promise.Rd=function(b,c,d){H.Promise.Ki(b,c,d,null)||H.async.X(H.Sb(c,b))};H.Promise.race=function(b){return new H.Promise(function(c,d){b.length||c(void 0);for(var e=0,f;e<b.length;e++)f=b[e],H.Promise.Rd(f,c,d)})};
H.Promise.all=function(b){return new H.Promise(function(c,d){var e=b.length,f=[];if(e)for(var g=function(n,r){e--;f[n]=r;0==e&&c(f)},h=function(n){d(n)},k=0,m;k<b.length;k++)m=b[k],H.Promise.Rd(m,H.Sb(g,k),h);else c(f)})};H.Promise.Cs=function(b){return new H.Promise(function(c){var d=b.length,e=[];if(d)for(var f=function(k,m,n){d--;e[k]=m?{Xl:!0,value:n}:{Xl:!1,reason:n};0==d&&c(e)},g=0,h;g<b.length;g++)h=b[g],H.Promise.Rd(h,H.Sb(f,g,!0),H.Sb(f,g,!1));else c(e)})};
H.Promise.cu=function(b){return new H.Promise(function(c,d){var e=b.length,f=[];if(e)for(var g=function(n){c(n)},h=function(n,r){e--;f[n]=r;0==e&&d(f)},k=0,m;k<b.length;k++)m=b[k],H.Promise.Rd(m,g,H.Sb(h,k));else c(void 0)})};H.Promise.Ix=function(){var b,c,d=new H.Promise(function(e,f){b=e;c=f});return new H.Promise.rk(d,b,c)};H.Promise.prototype.then=function(b,c,d){H.Promise.eb&&I(this,Error("then"));return ha(this,H.Wa(b)?b:null,H.Wa(c)?c:null,d)};H.Thenable.Cg(H.Promise);
H.Promise.prototype.cancel=function(b){this.qa==H.Promise.ba.$a&&H.async.X(function(){var c=new H.Promise.Ub(b);ia(this,c)},this)};function ia(b,c){if(b.qa==H.Promise.ba.$a)if(b.ya){var d=b.ya;if(d.qb){for(var e=0,f=null,g=null,h=d.qb;h&&(h.bd||(e++,h.Jb==b&&(f=h),!(f&&1<e)));h=h.next)f||(g=h);f&&(d.qa==H.Promise.ba.$a&&1==e?ia(d,c):(g?(e=g,e.next==d.Zb&&(d.Zb=e),e.next=e.next.next):ja(d),ka(d,f,H.Promise.ba.Ja,c)))}b.ya=null}else J(b,H.Promise.ba.Ja,c)}
function la(b,c){b.qb||b.qa!=H.Promise.ba.nb&&b.qa!=H.Promise.ba.Ja||ma(b);b.Zb?b.Zb.next=c:b.qb=c;b.Zb=c}function ha(b,c,d,e){var f=H.Promise.th(null,null,null);f.Jb=new H.Promise(function(g,h){f.Oc=c?function(k){try{var m=c.call(e,k);g(m)}catch(n){h(n)}}:g;f.hc=d?function(k){try{var m=d.call(e,k);!H.ca(m)&&k instanceof H.Promise.Ub?h(k):g(m)}catch(n){h(n)}}:h});f.Jb.ya=b;la(b,f);return f.Jb}H.Promise.prototype.Fo=function(b){this.qa=H.Promise.ba.$a;J(this,H.Promise.ba.nb,b)};
H.Promise.prototype.Go=function(b){this.qa=H.Promise.ba.$a;J(this,H.Promise.ba.Ja,b)};function J(b,c,d){b.qa==H.Promise.ba.$a&&(b===d&&(c=H.Promise.ba.Ja,d=new TypeError("Promise cannot resolve to itself")),b.qa=H.Promise.ba.Ij,H.Promise.Ki(d,b.Fo,b.Go,b)||(b.Ia=d,b.qa=c,b.ya=null,ma(b),c!=H.Promise.ba.Ja||d instanceof H.Promise.Ub||H.Promise.Ok(b,d)))}
H.Promise.Ki=function(b,c,d,e){if(b instanceof H.Promise)return H.Promise.eb&&I(b,Error("then")),la(b,H.Promise.th(c||H.Rb,d||null,e)),!0;if(H.Thenable.ki(b))return b.then(c,d,e),!0;if(H.Da(b))try{var f=b.then;if(H.Wa(f))return H.Promise.Do(b,f,c,d,e),!0}catch(g){return d.call(e,g),!0}return!1};H.Promise.Do=function(b,c,d,e,f){function g(m){k||(k=!0,e.call(f,m))}function h(m){k||(k=!0,d.call(f,m))}var k=!1;try{c.call(b,h,g)}catch(m){g(m)}};function ma(b){b.He||(b.He=!0,H.async.X(b.Pl,b))}
function ja(b){var c=null;b.qb&&(c=b.qb,b.qb=c.next,c.next=null);b.qb||(b.Zb=null);return c}H.Promise.prototype.Pl=function(){for(var b;b=ja(this);)H.Promise.eb&&this.bh++,ka(this,b,this.qa,this.Ia);this.He=!1};
function ka(b,c,d,e){if(d==H.Promise.ba.Ja&&c.hc&&!c.bd)if(0<H.Promise.Hb)for(;b&&b.Yd;b=b.ya)H.global.clearTimeout(b.Yd),b.Yd=0;else if(0==H.Promise.Hb)for(;b&&b.wd;b=b.ya)b.wd=!1;if(c.Jb)c.Jb.ya=null,H.Promise.fi(c,d,e);else try{c.bd?c.Oc.call(c.context):H.Promise.fi(c,d,e)}catch(f){H.Promise.xd.call(null,f)}H.Promise.Rn(c)}H.Promise.fi=function(b,c,d){c==H.Promise.ba.nb?b.Oc.call(b.context,d):b.hc&&b.hc.call(b.context,d)};
function I(b,c){if(H.Promise.eb&&H.L(c.stack)){var d=c.stack.split("\n",4)[3];c=c.message;c+=Array(11-c.length).join(" ");b.Cf.push(c+d)}}function na(b,c){if(H.Promise.eb&&c&&H.L(c.stack)&&b.Cf.length){for(var d=["Promise trace:"],e=b;e;e=e.ya){for(var f=b.bh;0<=f;f--)d.push(e.Cf[f]);d.push("Value: ["+(e.qa==H.Promise.ba.Ja?"REJECTED":"FULFILLED")+"] <"+String(e.Ia)+">")}c.stack+="\n\n"+d.join("\n")}}
H.Promise.Ok=function(b,c){0<H.Promise.Hb?b.Yd=H.global.setTimeout(function(){na(b,c);H.Promise.xd.call(null,c)},H.Promise.Hb):0==H.Promise.Hb&&(b.wd=!0,H.async.X(function(){b.wd&&(na(b,c),H.Promise.xd.call(null,c))}))};H.Promise.xd=H.async.jj;H.Promise.ex=function(b){H.Promise.xd=b};H.Promise.Ub=function(b){H.debug.Error.call(this,b)};H.yb(H.Promise.Ub,H.debug.Error);H.Promise.Ub.prototype.name="cancel";H.Promise.rk=function(b,c,d){this.Pd=b;this.resolve=c;this.reject=d};/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
H.async.I=function(b,c){this.Vd=[];this.Oi=b;this.fh=c||null;this.fc=this.$b=!1;this.Ia=void 0;this.zf=this.kl=this.xe=!1;this.Xd=0;this.ya=null;this.cd=0;H.async.I.eb&&(this.Be=null,Error.captureStackTrace&&(b={stack:""},Error.captureStackTrace(b,H.async.I),typeof b.stack==y&&(this.Be=b.stack.replace(/^[^\n]*\n/,""))))};H.async.I.Bk=!1;H.async.I.eb=!1;F=H.async.I.prototype;
F.cancel=function(b){if(this.$b)this.Ia instanceof H.async.I&&this.Ia.cancel();else{if(this.ya){var c=this.ya;delete this.ya;b?c.cancel(b):(c.cd--,0>=c.cd&&c.cancel())}this.Oi?this.Oi.call(this.fh,this):this.zf=!0;this.$b||this.tb(new H.async.I.Tb(this))}};F.Xg=function(b,c){this.xe=!1;K(this,b,c)};function K(b,c,d){b.$b=!0;b.Ia=d;b.fc=!c;oa(b)}function pa(b){if(b.$b){if(!b.zf)throw new H.async.I.Tc(b);b.zf=!1}}F.tc=function(b){pa(this);K(this,!0,b)};
F.tb=function(b){pa(this);qa(this,b);K(this,!1,b)};function qa(b,c){H.async.I.eb&&b.Be&&H.Da(c)&&c.stack&&/^[^\n]+(\n   [^\n]+)+/.test(c.stack)&&(c.stack=c.stack+"\nDEFERRED OPERATION:\n"+b.Be)}function L(b,c,d){return M(b,c,null,d)}function ra(b,c){M(b,null,c,void 0)}function M(b,c,d,e){b.Vd.push([c,d,e]);b.$b&&oa(b);return b}F.then=function(b,c,d){var e,f,g=new H.Promise(function(h,k){e=h;f=k});M(this,e,function(h){h instanceof H.async.I.Tb?g.cancel():f(h)});return g.then(b,c,d)};H.Thenable.Cg(H.async.I);
H.async.I.prototype.ml=function(){var b=new H.async.I;M(this,b.tc,b.tb,b);b.ya=this;this.cd++;return b};function sa(b){return H.g.some(b.Vd,function(c){return H.Wa(c[1])})}
function oa(b){b.Xd&&b.$b&&sa(b)&&(H.async.I.Lo(b.Xd),b.Xd=0);b.ya&&(b.ya.cd--,delete b.ya);for(var c=b.Ia,d=!1,e=!1;b.Vd.length&&!b.xe;){var f=b.Vd.shift(),g=f[0],h=f[1];f=f[2];if(g=b.fc?h:g)try{var k=g.call(f||b.fh,c);H.ca(k)&&(b.fc=b.fc&&(k==c||k instanceof Error),b.Ia=c=k);if(H.Thenable.ki(c)||typeof H.global.Promise===t&&c instanceof H.global.Promise)e=!0,b.xe=!0}catch(m){c=m,b.fc=!0,qa(b,c),sa(b)||(d=!0)}}b.Ia=c;e?(e=H.bind(b.Xg,b,!0),k=H.bind(b.Xg,b,!1),c instanceof H.async.I?(M(c,e,k),c.kl=
!0):c.then(e,k)):H.async.I.Bk&&c instanceof Error&&!(c instanceof H.async.I.Tb)&&(d=b.fc=!0);d&&(b.Xd=H.async.I.eo(c))}H.async.I.fj=function(b){var c=new H.async.I;c.tc(b);return c};H.async.I.lu=function(b){var c=new H.async.I;b.then(function(d){c.tc(d)},function(d){c.tb(d)});return c};H.async.I.xa=function(b){var c=new H.async.I;c.tb(b);return c};H.async.I.et=function(){var b=new H.async.I;b.cancel();return b};
H.async.I.Hx=function(b,c,d){return b instanceof H.async.I?L(b.ml(),c,d):L(H.async.I.fj(b),c,d)};H.async.I.Tc=function(){H.debug.Error.call(this)};H.yb(H.async.I.Tc,H.debug.Error);H.async.I.Tc.prototype.message="Deferred has already fired";H.async.I.Tc.prototype.name="AlreadyCalledError";H.async.I.Tb=function(){H.debug.Error.call(this)};H.yb(H.async.I.Tb,H.debug.Error);H.async.I.Tb.prototype.message="Deferred was canceled";H.async.I.Tb.prototype.name="CanceledError";
H.async.I.cg=function(b){this.Ic=H.global.setTimeout(H.bind(this.ij,this),0);this.Nl=b};H.async.I.cg.prototype.ij=function(){delete H.async.I.Cc[this.Ic];throw this.Nl;};H.async.I.Cc={};H.async.I.eo=function(b){b=new H.async.I.cg(b);H.async.I.Cc[b.Ic]=b;return b.Ic};H.async.I.Lo=function(b){var c=H.async.I.Cc[b];c&&(H.global.clearTimeout(c.Ic),delete H.async.I.Cc[b])};H.async.I.Ss=function(){var b=H.async.I.Cc,c;for(c in b){var d=b[c];H.global.clearTimeout(d.Ic);d.ij()}};H.N={};H.N.P={};H.N.P.ie="closure_verification";H.N.P.Tj=5E3;H.N.P.vf=[];H.N.P.Zn=function(b,c){function d(){var f=b.shift();f=H.N.P.Sd(f,c);b.length&&M(f,d,d,void 0);return f}if(!b.length)return H.async.I.fj(null);var e=H.N.P.vf.length;H.g.extend(H.N.P.vf,b);if(e)return H.N.P.Wi;b=H.N.P.vf;H.N.P.Wi=d();return H.N.P.Wi};
H.N.P.Sd=function(b,c){var d=c||{};c=d.document||document;var e=H.b.H.K(b),f=H.a.createElement(l),g={Xi:f,lj:void 0},h=new H.async.I(H.N.P.ql,g),k=null,m=H.zb(d.timeout)?d.timeout:H.N.P.Tj;0<m&&(k=window.setTimeout(function(){H.N.P.gd(f,!0);h.tb(new H.N.P.Error(H.N.P.Vc.TIMEOUT,"Timeout reached for loading script "+e))},m),g.lj=k);f.onload=f.onreadystatechange=function(){f.readyState&&"loaded"!=f.readyState&&"complete"!=f.readyState||(H.N.P.gd(f,d.it||!1,k),h.tc(null))};f.onerror=function(){H.N.P.gd(f,
!0,k);h.tb(new H.N.P.Error(H.N.P.Vc.fk,"Error while loading script "+e))};g=d.attributes||{};H.object.extend(g,{type:da,charset:"UTF-8"});H.a.Wd(f,g);H.a.O.mo(f,b);H.N.P.lm(c).appendChild(f);return h};
H.N.P.Bw=function(b,c,d){H.global[H.N.P.ie]||(H.global[H.N.P.ie]={});var e=H.global[H.N.P.ie],f=H.b.H.K(b);if(H.ca(e[c]))return H.async.I.xa(new H.N.P.Error(H.N.P.Vc.Mk,"Verification object "+c+" already defined."));b=H.N.P.Sd(b,d);var g=new H.async.I(H.bind(b.cancel,b));L(b,function(){var h=e[c];H.ca(h)?(g.tc(h),delete e[c]):g.tb(new H.N.P.Error(H.N.P.Vc.Lk,"Script "+f+" loaded, but verification object "+c+" was not defined."))});ra(b,function(h){H.ca(e[c])&&delete e[c];g.tb(h)});return g};
H.N.P.lm=function(b){var c=H.a.getElementsByTagName("HEAD",b);return!c||H.g.Ca(c)?b.documentElement:c[0]};H.N.P.ql=function(){if(this&&this.Xi){var b=this.Xi;b&&b.tagName==l&&H.N.P.gd(b,!0,this.lj)}};H.N.P.gd=function(b,c,d){H.zb(d)&&H.global.clearTimeout(d);b.onload=H.Rb;b.onerror=H.Rb;b.onreadystatechange=H.Rb;c&&window.setTimeout(function(){H.a.removeNode(b)},0)};H.N.P.Vc={fk:0,TIMEOUT:1,Lk:2,Mk:3};
H.N.P.Error=function(b,c){var d="Jsloader error (code #"+b+")";c&&(d+=": "+c);H.debug.Error.call(this,d);this.code=b};H.yb(H.N.P.Error,H.debug.Error);H.R={};H.R.Map=function(b,c){this.Ea={};this.$=[];this.Sc=this.Z=0;var d=arguments.length;if(1<d){if(d%2)throw Error(p);for(var e=0;e<d;e+=2)this.set(arguments[e],arguments[e+1])}else b&&this.addAll(b)};F=H.R.Map.prototype;F.ub=D("Z");F.ga=function(){N(this);for(var b=[],c=0;c<this.$.length;c++)b.push(this.Ea[this.$[c]]);return b};F.la=function(){N(this);return this.$.concat()};F.Lb=function(b){return H.R.Map.Pb(this.Ea,b)};
F.Mb=function(b){for(var c=0;c<this.$.length;c++){var d=this.$[c];if(H.R.Map.Pb(this.Ea,d)&&this.Ea[d]==b)return!0}return!1};F.Ob=function(b,c){if(this===b)return!0;if(this.Z!=b.ub())return!1;c=c||H.R.Map.Dl;N(this);for(var d,e=0;d=this.$[e];e++)if(!c(this.get(d),b.get(d)))return!1;return!0};H.R.Map.Dl=function(b,c){return b===c};F=H.R.Map.prototype;F.Ca=function(){return 0==this.Z};F.clear=function(){this.Ea={};this.Sc=this.Z=this.$.length=0};
F.remove=function(b){return H.R.Map.Pb(this.Ea,b)?(delete this.Ea[b],this.Z--,this.Sc++,this.$.length>2*this.Z&&N(this),!0):!1};function N(b){if(b.Z!=b.$.length){for(var c=0,d=0;c<b.$.length;){var e=b.$[c];H.R.Map.Pb(b.Ea,e)&&(b.$[d++]=e);c++}b.$.length=d}if(b.Z!=b.$.length){var f={};for(d=c=0;c<b.$.length;)e=b.$[c],H.R.Map.Pb(f,e)||(b.$[d++]=e,f[e]=1),c++;b.$.length=d}}F.get=function(b,c){return H.R.Map.Pb(this.Ea,b)?this.Ea[b]:c};
F.set=function(b,c){H.R.Map.Pb(this.Ea,b)||(this.Z++,this.$.push(b),this.Sc++);this.Ea[b]=c};F.addAll=function(b){if(b instanceof H.R.Map)for(var c=b.la(),d=0;d<c.length;d++)this.set(c[d],b.get(c[d]));else for(c in b)this.set(c,b[c])};F.forEach=function(b,c){for(var d=this.la(),e=0;e<d.length;e++){var f=d[e],g=this.get(f);b.call(c,g,f,this)}};F.clone=function(){return new H.R.Map(this)};F.Co=function(){for(var b=new H.R.Map,c=0;c<this.$.length;c++){var d=this.$[c];b.set(this.Ea[d],d)}return b};
F.Ao=function(){N(this);for(var b={},c=0;c<this.$.length;c++){var d=this.$[c];b[d]=this.Ea[d]}return b};F.se=function(b){N(this);var c=0,d=this.Sc,e=this,f=new H.o.Iterator;f.next=function(){if(d!=e.Sc)throw Error("The map has changed since the iterator was created");if(c>=e.$.length)throw H.o.va;var g=e.$[c++];return b?g:e.Ea[g]};return f};H.R.Map.Pb=function(b,c){return Object.prototype.hasOwnProperty.call(b,c)};H.R.ub=function(b){return b.ub&&typeof b.ub==t?b.ub():H.ma(b)||H.L(b)?b.length:H.object.ub(b)};H.R.ga=function(b){if(b.ga&&typeof b.ga==t)return b.ga();if(H.L(b))return b.split("");if(H.ma(b)){for(var c=[],d=b.length,e=0;e<d;e++)c.push(b[e]);return c}return H.object.ga(b)};H.R.la=function(b){if(b.la&&typeof b.la==t)return b.la();if(!b.ga||typeof b.ga!=t){if(H.ma(b)||H.L(b)){var c=[];b=b.length;for(var d=0;d<b;d++)c.push(d);return c}return H.object.la(b)}};
H.R.contains=function(b,c){return b.contains&&typeof b.contains==t?b.contains(c):b.Mb&&typeof b.Mb==t?b.Mb(c):H.ma(b)||H.L(b)?H.g.contains(b,c):H.object.Mb(b,c)};H.R.Ca=function(b){return b.Ca&&typeof b.Ca==t?b.Ca():H.ma(b)||H.L(b)?H.g.Ca(b):H.object.Ca(b)};H.R.clear=function(b){b.clear&&typeof b.clear==t?b.clear():H.ma(b)?H.g.clear(b):H.object.clear(b)};
H.R.forEach=function(b,c,d){if(b.forEach&&typeof b.forEach==t)b.forEach(c,d);else if(H.ma(b)||H.L(b))H.g.forEach(b,c,d);else for(var e=H.R.la(b),f=H.R.ga(b),g=f.length,h=0;h<g;h++)c.call(d,f[h],e&&e[h],b)};H.R.filter=function(b,c,d){if(typeof b.filter==t)return b.filter(c,d);if(H.ma(b)||H.L(b))return H.g.filter(b,c,d);var e=H.R.la(b),f=H.R.ga(b),g=f.length;if(e){var h={};for(var k=0;k<g;k++)c.call(d,f[k],e[k],b)&&(h[e[k]]=f[k])}else for(h=[],k=0;k<g;k++)c.call(d,f[k],void 0,b)&&h.push(f[k]);return h};
H.R.map=function(b,c,d){if(typeof b.map==t)return b.map(c,d);if(H.ma(b)||H.L(b))return H.g.map(b,c,d);var e=H.R.la(b),f=H.R.ga(b),g=f.length;if(e){var h={};for(var k=0;k<g;k++)h[e[k]]=c.call(d,f[k],e[k],b)}else for(h=[],k=0;k<g;k++)h[k]=c.call(d,f[k],void 0,b);return h};H.R.some=function(b,c,d){if(typeof b.some==t)return b.some(c,d);if(H.ma(b)||H.L(b))return H.g.some(b,c,d);for(var e=H.R.la(b),f=H.R.ga(b),g=f.length,h=0;h<g;h++)if(c.call(d,f[h],e&&e[h],b))return!0;return!1};
H.R.every=function(b,c,d){if(typeof b.every==t)return b.every(c,d);if(H.ma(b)||H.L(b))return H.g.every(b,c,d);for(var e=H.R.la(b),f=H.R.ga(b),g=f.length,h=0;h<g;h++)if(!c.call(d,f[h],e&&e[h],b))return!1;return!0};H.uri={};H.uri.l={};H.uri.l.qc={Kf:38,EQUAL:61,ck:35,mk:63};H.uri.l.ye=function(b,c,d,e,f,g,h){var k="";b&&(k+=b+":");d&&(k+="//",c&&(k+=c+"@"),k+=d,e&&(k+=":"+e));f&&(k+=f);g&&(k+="?"+g);h&&(k+="#"+h);return k};H.uri.l.ro=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;H.uri.l.U={Xb:1,qe:2,lb:3,ob:4,le:5,me:6,dg:7};H.uri.l.split=function(b){return b.match(H.uri.l.ro)};
H.uri.l.ld=function(b,c){return b?c?decodeURI(b):decodeURIComponent(b):b};H.uri.l.ac=function(b,c){return H.uri.l.split(c)[b]||null};H.uri.l.Gc=function(b){return H.uri.l.ac(H.uri.l.U.Xb,b)};H.uri.l.xu=function(b){b=H.uri.l.Gc(b);!b&&H.global.self&&H.global.self.location&&(b=H.global.self.location.protocol,b=b.substr(0,b.length-1));return b?b.toLowerCase():""};H.uri.l.qm=function(){return H.uri.l.ac(H.uri.l.U.qe,void 0)};H.uri.l.vd=function(){return H.uri.l.ld(H.uri.l.qm())};
H.uri.l.bm=function(){return H.uri.l.ac(H.uri.l.U.lb,void 0)};H.uri.l.pd=function(){return H.uri.l.ld(H.uri.l.bm(),!0)};H.uri.l.td=function(){return Number(H.uri.l.ac(H.uri.l.U.ob,void 0))||null};H.uri.l.im=function(){return H.uri.l.ac(H.uri.l.U.le,void 0)};H.uri.l.bc=function(){return H.uri.l.ld(H.uri.l.im(),!0)};H.uri.l.Xe=function(){return H.uri.l.ac(H.uri.l.U.me,void 0)};H.uri.l.em=function(){var b=(void 0).indexOf("#");return 0>b?null:(void 0).substr(b+1)};
H.uri.l.Rw=function(b,c){return H.uri.l.Kn(b)+(c?"#"+c:"")};H.uri.l.rd=function(){return H.uri.l.ld(H.uri.l.em())};H.uri.l.zu=function(b){b=H.uri.l.split(b);return H.uri.l.ye(b[H.uri.l.U.Xb],b[H.uri.l.U.qe],b[H.uri.l.U.lb],b[H.uri.l.U.ob])};H.uri.l.Eu=function(b){b=H.uri.l.split(b);return H.uri.l.ye(b[H.uri.l.U.Xb],null,b[H.uri.l.U.lb],b[H.uri.l.U.ob])};H.uri.l.Iu=function(b){b=H.uri.l.split(b);return H.uri.l.ye(null,null,null,null,b[H.uri.l.U.le],b[H.uri.l.U.me],b[H.uri.l.U.dg])};
H.uri.l.Kn=function(b){var c=b.indexOf("#");return 0>c?b:b.substr(0,c)};H.uri.l.zm=function(b,c){b=H.uri.l.split(b);c=H.uri.l.split(c);return b[H.uri.l.U.lb]==c[H.uri.l.U.lb]&&b[H.uri.l.U.Xb]==c[H.uri.l.U.Xb]&&b[H.uri.l.U.ob]==c[H.uri.l.U.ob]};H.uri.l.Ts=B();H.uri.l.yn=function(b,c){if(b){b=b.split("&");for(var d=0;d<b.length;d++){var e=b[d].indexOf("="),f=null;if(0<=e){var g=b[d].substring(0,e);f=b[d].substring(e+1)}else g=b[d];c(g,f?H.c.$d(f):"")}}};
H.uri.l.bj=function(b){var c=b.indexOf("#");0>c&&(c=b.length);var d=b.indexOf("?");if(0>d||d>c){d=c;var e=""}else e=b.substring(d+1,c);return[b.substr(0,d),e,b.substr(c)]};H.uri.l.Ci=function(b){return b[0]+(b[1]?"?"+b[1]:"")+b[2]};H.uri.l.Dg=function(b,c){return c?b?b+"&"+c:c:b};H.uri.l.ue=function(b,c){if(!c)return b;b=H.uri.l.bj(b);b[1]=H.uri.l.Dg(b[1],c);return H.uri.l.Ci(b)};
H.uri.l.te=function(b,c,d){if(H.isArray(c))for(var e=0;e<c.length;e++)H.uri.l.te(b,String(c[e]),d);else null!=c&&d.push(b+(""===c?"":"="+H.c.Rc(c)))};H.uri.l.Mg=function(b,c){var d=[];for(c=c||0;c<b.length;c+=2)H.uri.l.te(b[c],b[c+1],d);return d.join("&")};H.uri.l.Ng=function(b){var c=[],d;for(d in b)H.uri.l.te(d,b[d],c);return c.join("&")};H.uri.l.Gs=function(b,c){var d=2==arguments.length?H.uri.l.Mg(arguments[1],0):H.uri.l.Mg(arguments,1);return H.uri.l.ue(b,d)};
H.uri.l.Hs=function(b,c){c=H.uri.l.Ng(c);return H.uri.l.ue(b,c)};H.uri.l.Pk=function(b,c,d){d=H.zb(d)?"="+H.c.Rc(d):"";return H.uri.l.ue(b,c+d)};H.uri.l.od=function(b,c,d,e){for(var f=d.length;0<=(c=b.indexOf(d,c))&&c<e;){var g=b.charCodeAt(c-1);if(g==H.uri.l.qc.Kf||g==H.uri.l.qc.mk)if(g=b.charCodeAt(c+f),!g||g==H.uri.l.qc.EQUAL||g==H.uri.l.qc.Kf||g==H.uri.l.qc.ck)return c;c+=f+1}return-1};H.uri.l.yd=/#|$/;H.uri.l.Tu=function(b,c){return 0<=H.uri.l.od(b,0,c,b.search(H.uri.l.yd))};
H.uri.l.Gu=function(b,c){var d=b.search(H.uri.l.yd),e=H.uri.l.od(b,0,c,d);if(0>e)return null;var f=b.indexOf("&",e);if(0>f||f>d)f=d;e+=c.length+1;return H.c.$d(b.substr(e,f-e))};H.uri.l.Hu=function(b,c){for(var d=b.search(H.uri.l.yd),e=0,f,g=[];0<=(f=H.uri.l.od(b,e,c,d));){e=b.indexOf("&",f);if(0>e||e>d)e=d;f+=c.length+1;g.push(H.c.$d(b.substr(f,e-f)))}return g};H.uri.l.Bo=/[?&]($|#)/;
H.uri.l.Ln=function(b,c){for(var d=b.search(H.uri.l.yd),e=0,f,g=[];0<=(f=H.uri.l.od(b,e,c,d));)g.push(b.substring(e,f)),e=Math.min(b.indexOf("&",f)+1||d,d);g.push(b.substr(e));return g.join("").replace(H.uri.l.Bo,"$1")};H.uri.l.ko=function(b){var c=H.uri.l.ug.sg,d=H.c.Ph();return H.uri.l.Pk(H.uri.l.Ln(b,c),c,d)};
H.uri.l.$w=function(b,c){b=H.uri.l.bj(b);var d=b[1],e=[];d&&H.g.forEach(d.split("&"),function(f){var g=f.indexOf("=");c.hasOwnProperty(0<=g?f.substr(0,g):f)||e.push(f)});b[1]=H.uri.l.Dg(e.join("&"),H.uri.l.Ng(c));return H.uri.l.Ci(b)};H.uri.l.Is=function(b,c){H.c.endsWith(b,"/")&&(b=b.substr(0,b.length-1));H.c.startsWith(c,"/")&&(c=c.substr(1));return H.c.nl(b,"/",c)};H.uri.l.Qc=function(b){H.uri.l.split(b)};H.uri.l.ug={sg:"zx"};H.uri.l.pn=function(b){return H.uri.l.ko(b)};H.G=function(b,c){this.Ac=this.If=this.mc="";this.Hd=null;this.Ke=this.Gd="";this.Ma=this.Sm=!1;var d;b instanceof H.G?(this.Ma=H.ca(c)?c:b.Ma,O(this,b.Gc()),P(this,b.vd()),Q(this,b.pd()),R(this,b.td()),this.Qc(b.bc()),S(this,b.Xe().clone()),T(this,b.rd())):b&&(d=H.uri.l.split(String(b)))?(this.Ma=!!c,O(this,d[H.uri.l.U.Xb]||"",!0),P(this,d[H.uri.l.U.qe]||"",!0),Q(this,d[H.uri.l.U.lb]||"",!0),R(this,d[H.uri.l.U.ob]),this.Qc(d[H.uri.l.U.le]||"",!0),S(this,d[H.uri.l.U.me]||"",!0),T(this,d[H.uri.l.U.dg]||
"",!0)):(this.Ma=!!c,this.Oa=new H.G.bb(null,this.Ma))};H.G.nk=H.uri.l.ug.sg;F=H.G.prototype;
F.toString=function(){var b=[],c=this.Gc();c&&b.push(H.G.Bc(c,H.G.Pi,!0),":");var d=this.pd();if(d||"file"==c)b.push("//"),(c=this.vd())&&b.push(H.G.Bc(c,H.G.Pi,!0),"@"),b.push(H.G.Qi(H.c.Rc(d))),d=this.td(),null!=d&&b.push(":",String(d));if(d=this.bc())this.Ac&&"/"!=d.charAt(0)&&b.push("/"),b.push(H.G.Bc(d,"/"==d.charAt(0)?H.G.En:H.G.Hn,!0));(d=this.Oa.toString())&&b.push("?",d);(d=this.rd())&&b.push("#",H.G.Bc(d,H.G.Fn));return b.join("")};
F.resolve=function(b){var c=this.clone(),d=!!b.mc;d?O(c,b.Gc()):d=!!b.If;d?P(c,b.vd()):d=!!b.Ac;d?Q(c,b.pd()):d=null!=b.Hd;var e=b.bc();if(d)R(c,b.td());else if(d=!!b.Gd){if("/"!=e.charAt(0))if(this.Ac&&!this.Gd)e="/"+e;else{var f=c.bc().lastIndexOf("/");-1!=f&&(e=c.bc().substr(0,f+1)+e)}e=H.G.In(e)}d?c.Qc(e):d=""!==b.Oa.toString();d?S(c,b.Xe().clone()):d=!!b.Ke;d&&T(c,b.rd());return c};F.clone=function(){return new H.G(this)};F.Gc=D("mc");
function O(b,c,d){X(b);b.mc=d?H.G.zc(c,!0):c;b.mc&&(b.mc=b.mc.replace(/:$/,""))}F.vd=D("If");function P(b,c,d){X(b);b.If=d?H.G.zc(c):c}F.pd=D("Ac");function Q(b,c,d){X(b);b.Ac=d?H.G.zc(c,!0):c}F.td=D("Hd");function R(b,c){X(b);if(c){c=Number(c);if(isNaN(c)||0>c)throw Error("Bad port number "+c);b.Hd=c}else b.Hd=null}F.bc=D("Gd");F.Qc=function(b,c){X(this);this.Gd=c?H.G.zc(b,!0):b};function S(b,c,d){X(b);c instanceof H.G.bb?(b.Oa=c,b.Oa.wf(b.Ma)):(d||(c=H.G.Bc(c,H.G.Gn)),b.Oa=new H.G.bb(c,b.Ma))}
F.Xe=D("Oa");F.getQuery=function(){return this.Oa.toString()};F.rd=D("Ke");function T(b,c,d){X(b);b.Ke=d?H.G.zc(c):c}F.pn=function(){X(this);var b=H.G.nk,c=H.c.Ph();X(this);this.Oa.set(b,c);return this};F.removeParameter=function(b){X(this);this.Oa.remove(b);return this};function X(b){if(b.Sm)throw Error("Tried to modify a read-only Uri");}F.wf=function(b){this.Ma=b;this.Oa&&this.Oa.wf(b)};H.G.parse=function(b,c){return b instanceof H.G?b.clone():new H.G(b,c)};
H.G.create=function(b,c,d,e,f,g,h,k){k=new H.G(null,k);b&&O(k,b);c&&P(k,c);d&&Q(k,d);e&&R(k,e);f&&k.Qc(f);g&&S(k,g);h&&T(k,h);return k};H.G.resolve=function(b,c){b instanceof H.G||(b=H.G.parse(b));c instanceof H.G||(c=H.G.parse(c));return b.resolve(c)};
H.G.In=function(b){if(".."==b||"."==b)return"";if(H.c.contains(b,"./")||H.c.contains(b,"/.")){var c=H.c.startsWith(b,"/");b=b.split("/");for(var d=[],e=0;e<b.length;){var f=b[e++];"."==f?c&&e==b.length&&d.push(""):".."==f?((1<d.length||1==d.length&&""!=d[0])&&d.pop(),c&&e==b.length&&d.push("")):(d.push(f),c=!0)}return d.join("/")}return b};H.G.zc=function(b,c){return b?c?decodeURI(b.replace(/%25/g,"%2525")):decodeURIComponent(b):""};
H.G.Bc=function(b,c,d){return H.L(b)?(b=encodeURI(b).replace(c,H.G.Kl),d&&(b=H.G.Qi(b)),b):null};H.G.Kl=function(b){b=b.charCodeAt(0);return"%"+(b>>4&15).toString(16)+(b&15).toString(16)};H.G.Qi=function(b){return b.replace(/%25([0-9a-fA-F]{2})/g,"%$1")};H.G.Pi=/[#\/\?@]/g;H.G.Hn=/[#\?:]/g;H.G.En=/[#\?]/g;H.G.Gn=/[#\?@]/g;H.G.Fn=/#/g;H.G.zm=function(b,c){b=H.uri.l.split(b);c=H.uri.l.split(c);return b[H.uri.l.U.lb]==c[H.uri.l.U.lb]&&b[H.uri.l.U.ob]==c[H.uri.l.U.ob]};
H.G.bb=function(b,c){this.Z=this.da=null;this.Ka=b||null;this.Ma=!!c};function Y(b){b.da||(b.da=new H.R.Map,b.Z=0,b.Ka&&H.uri.l.yn(b.Ka,function(c,d){b.add(H.c.$d(c),d)}))}H.G.bb.wt=function(b,c,d){c=H.R.la(b);if("undefined"==typeof c)throw Error("Keys are undefined");d=new H.G.bb(null,d);b=H.R.ga(b);for(var e=0;e<c.length;e++){var f=c[e],g=b[e];H.isArray(g)?ta(d,f,g):d.add(f,g)}return d};
H.G.bb.vt=function(b,c,d,e){if(b.length!=c.length)throw Error("Mismatched lengths for keys/values");d=new H.G.bb(null,e);for(e=0;e<b.length;e++)d.add(b[e],c[e]);return d};F=H.G.bb.prototype;F.ub=function(){Y(this);return this.Z};F.add=function(b,c){Y(this);this.Ka=null;b=Z(this,b);var d=this.da.get(b);d||this.da.set(b,d=[]);d.push(c);this.Z+=1;return this};F.remove=function(b){Y(this);b=Z(this,b);return this.da.Lb(b)?(this.Ka=null,this.Z-=this.da.get(b).length,this.da.remove(b)):!1};
F.clear=function(){this.da=this.Ka=null;this.Z=0};F.Ca=function(){Y(this);return 0==this.Z};F.Lb=function(b){Y(this);b=Z(this,b);return this.da.Lb(b)};F.Mb=function(b){var c=this.ga();return H.g.contains(c,b)};F.forEach=function(b,c){Y(this);this.da.forEach(function(d,e){H.g.forEach(d,function(f){b.call(c,f,e,this)},this)},this)};F.la=function(){Y(this);for(var b=this.da.ga(),c=this.da.la(),d=[],e=0;e<c.length;e++)for(var f=b[e],g=0;g<f.length;g++)d.push(c[e]);return d};
F.ga=function(b){Y(this);var c=[];if(H.L(b))this.Lb(b)&&(c=H.g.concat(c,this.da.get(Z(this,b))));else{b=this.da.ga();for(var d=0;d<b.length;d++)c=H.g.concat(c,b[d])}return c};F.set=function(b,c){Y(this);this.Ka=null;b=Z(this,b);this.Lb(b)&&(this.Z-=this.da.get(b).length);this.da.set(b,[c]);this.Z+=1;return this};F.get=function(b,c){if(!b)return c;b=this.ga(b);return 0<b.length?String(b[0]):c};function ta(b,c,d){b.remove(c);0<d.length&&(b.Ka=null,b.da.set(Z(b,c),H.g.clone(d)),b.Z+=d.length)}
F.toString=function(){if(this.Ka)return this.Ka;if(!this.da)return"";for(var b=[],c=this.da.la(),d=0;d<c.length;d++){var e=c[d],f=H.c.Rc(e);e=this.ga(e);for(var g=0;g<e.length;g++){var h=f;""!==e[g]&&(h+="="+H.c.Rc(e[g]));b.push(h)}}return this.Ka=b.join("&")};F.clone=function(){var b=new H.G.bb;b.Ka=this.Ka;this.da&&(b.da=this.da.clone(),b.Z=this.Z);return b};function Z(b,c){c=String(c);b.Ma&&(c=c.toLowerCase());return c}
F.wf=function(b){b&&!this.Ma&&(Y(this),this.Ka=null,this.da.forEach(function(c,d){var e=d.toLowerCase();d!=e&&(this.remove(d),ta(this,e,c))},this));this.Ma=b};F.extend=function(b){for(var c=0;c<arguments.length;c++)H.R.forEach(arguments[c],function(d,e){this.add(e,d)},this)};var google={v:{}};google.v.w={};google.v.w.ja={};google.v.w.ja.Ai=function(){return new Promise(function(b){if("undefined"==typeof window||"complete"===document.readyState)b();else if(window.addEventListener)document.addEventListener("DOMContentLoaded",b,!0),window.addEventListener("load",b,!0);else if(window.attachEvent)window.attachEvent("onload",b);else{var c=window.onload;H.Wa(c)?window.onload=function(d){c(d);b()}:window.onload=b}})};H.Dc("google.charts.loader.Utils.isWindowLoaded",google.v.w.ja.Ai);
google.v.w.ja.hb={};google.v.w.ja.ww=function(){google.v.w.ja.hb={}};google.v.w.ja.Mu=function(b){return google.v.w.ja.hb[b]&&google.v.w.ja.hb[b].Pd};google.v.w.ja.Lu=function(b){return google.v.w.ja.hb[b]&&google.v.w.ja.hb[b].loaded};google.v.w.ja.ax=function(b,c){google.v.w.ja.hb[b]={Pd:c,loaded:!1}};google.v.w.ja.lo=function(b){google.v.w.ja.hb[b]||(google.v.w.ja.hb[b]={loaded:!1});google.v.w.ja.hb[b].loaded=!0};google.v.w.Qa={};google.v.w.Qa.kj=3E4;google.v.w.Qa.Tv=function(b,c){return{format:b,Qk:c}};google.v.w.Qa.om=function(b){return H.b.H.format(b.format,b.Qk)};google.v.w.Qa.load=function(b,c){var d=H.b.H.format(b,c),e=H.N.P.Sd(d,{timeout:google.v.w.Qa.kj,attributes:{async:!1,defer:!1}});return new Promise(function(f){google.v.w.ja.lo(d.toString());L(e,f)})};
google.v.w.Qa.Ov=function(b){b=H.g.map(b,google.v.w.Qa.om);if(H.g.Ca(b))return Promise.resolve();var c={timeout:google.v.w.Qa.kj,attributes:{async:!1,defer:!1}},d=[];!H.userAgent.oa||H.userAgent.Xa(11)?H.g.forEach(b,function(e){d.push(H.N.P.Sd(e,c))}):d.push(H.N.P.Zn(b,c));return Promise.all(H.g.map(d,function(e){return new Promise(function(f){return L(e,f)})}))};google.v.w.Bg={1:"1.0","1.0":"current","1.1":"upcoming",41:x,42:x,43:x,44:x,46:"46.1","46.1":"46.2",previous:"45.2",current:"46",upcoming:"46.2"};google.v.w.J={};google.v.w.J.Cm=function(){google.v.w.J.gf=null;google.v.w.J.jd=null;google.v.w.J.rj=null};H.wb(aa)?console.warn("Google Charts loader.js should only be loaded once."):google.v.w.J.Cm();google.v.w.J.qn=function(b){var c=b,d=b.match(/^testing-/);d&&(c=c.replace(/^testing-/,""));b=c;do{if(c===google.v.w.Bg[c])throw Error("Infinite loop in version mapping: "+c);var e=google.v.w.Bg[c];e&&(c=e)}while(e);d=(d?"testing-":"")+c;return{version:c==x?b:d,jn:d}};
google.v.w.J.hn=function(b){var c=google.v.w.J.qn(b),d=H.c.M.from("https://www.gstatic.com/charts/%{version}/loader.js");return google.v.w.Qa.load(d,{version:c.jn}).then(function(){var e=H.wb("google.charts.loader.VersionSpecific.load")||H.wb("google.charts.loader.publicLoad")||H.wb("google.charts.versionSpecific.load");if(!e)throw Error("Bad version: "+b);google.v.w.J.rj=function(f){f=e(c.version,f);if(null==f||null==f.then){var g=H.wb("google.charts.loader.publicSetOnLoadCallback")||H.wb("google.charts.versionSpecific.setOnLoadCallback");
f=new Promise(function(h){g(h)});f.then=g}return f}})};google.v.w.J.en=function(b,c){if(!google.v.w.J.gf){if(c.enableUrlSettings&&window.URLSearchParams)try{b=(new URLSearchParams(top.location.search)).get("charts-version")||b}catch(d){console.info("Failed to get charts-version from top URL",d)}google.v.w.J.gf=google.v.w.J.hn(b)}return google.v.w.J.jd=google.v.w.J.gf.then(function(){return google.v.w.J.rj(c)})};
google.v.w.J.jo=function(b){if(!google.v.w.J.jd)throw Error("Must call google.charts.load before google.charts.setOnLoadCallback");return b?google.v.w.J.jd.then(b):google.v.w.J.jd};google.v.load=function(b){for(var c=[],d=0;d<arguments.length;++d)c[d-0]=arguments[d];d=0;"visualization"===c[d]&&d++;var e="current";H.L(c[d])&&(e=c[d],d++);var f={};H.Da(c[d])&&(f=c[d]);return google.v.w.J.en(e,f)};H.Dc(aa,google.v.load);google.v.$i=google.v.w.J.jo;H.Dc("google.charts.setOnLoadCallback",google.v.$i);
google.v.w.J.ik=H.c.M.from("https://maps.googleapis.com/maps/api/js?jsapiRedirect=true&key=%{key}&v=%{version}&libraries=%{libraries}");google.v.w.J.jk=H.c.M.from("https://maps-api-ssl.google.com/maps?jsapiRedirect=true&file=googleapi&key=%{key}&v=%{version}&libraries=%{libraries}");
google.v.w.J.fn=function(b,c,d){console.warn("Loading Maps API with the jsapi loader is deprecated.");d=d||{};b=google.v.w.J.hf(d.callback);google.v.w.Qa.load("2"===c?google.v.w.J.jk:google.v.w.J.ik,{key:d.key||d.client||"",version:c||"",libraries:d.libraries||""}).then(b)};google.v.w.J.ig=H.c.M.from("https://www.gstatic.com/inputtools/js/ita/inputtools_3.js");
google.v.w.J.dn=function(b,c,d){H.Da(d)&&d.packages?(H.isArray(d.packages)?d.packages:[d.packages]).includes("inputtools")?(console.warn("Loading Input Tools with the jsapi loader is deprecated.\nPlease load "+google.v.w.J.ig+" directly."),b=google.v.w.J.hf(d.callback),google.v.w.Qa.load(google.v.w.J.ig,{}).then(b)):console.error("Loading elements other than inputtools with the jsapi loader is unsupported."):console.error("google.load of elements was invoked without specifying packages")};
google.v.w.J.hf=function(b){return function(){if(H.L(b)&&""!==b)try{H.wb(b)()}catch(c){throw Error("Callback failed with: "+c);}}};google.v.w.J.Yh=function(b){for(var c=[],d=0;d<arguments.length;++d)c[d-0]=arguments[d];switch(c[0]){case "maps":google.v.w.J.fn.apply(google.v.w.J,G.ve(c));return;case "elements":google.v.w.J.dn.apply(google.v.w.J,G.ve(c));return}if("visualization"!==c[0])throw Error('Module "'+c[0]+'" is not supported.');google.v.load.apply(google.v,G.ve(c))};
google.v.w.J.Cn=function(b){H.L(b)&&(b=google.v.w.J.hf(b),google.v.w.ja.Ai().then(b))};google.v.w.J.Bn=function(b){if(H.L(b))try{if(""!==b)for(var c=JSON.parse(b).modules,d=G.Dd(c),e=d.next();!e.done;e=d.next()){var f=e.value;google.v.w.J.Yh(f.name,f.version,f)}}catch(g){throw Error("Autoload failed with: "+g);}};google.v.w.J.Rl=function(){H.wb("google.load")||(H.Dc("google.load",google.v.w.J.Yh),H.Dc("google.setOnLoadCallback",google.v.$i))};
google.v.w.J.Dn=function(){google.v.w.J.Rl();var b=document.getElementsByTagName("script");b=b[b.length-1].getAttribute("src");b=(new H.G(b)).Oa.toString();b=new H.G.bb(b);google.v.w.J.Cn(b.get("callback"));google.v.w.J.Bn(b.get("autoload"))};google.v.w.J.Dn();}).call(this);

;
//# sourceMappingURL=scripts.js.map
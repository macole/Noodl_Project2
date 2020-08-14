/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/bezier-easing/src/index.js":
/*!*************************************************!*\
  !*** ./node_modules/bezier-easing/src/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */
// These values are established by empiricism with tests (tradeoff: performance VS precision)
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;
var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
var float32ArraySupported = typeof Float32Array === 'function';

function A(aA1, aA2) {
  return 1.0 - 3.0 * aA2 + 3.0 * aA1;
}

function B(aA1, aA2) {
  return 3.0 * aA2 - 6.0 * aA1;
}

function C(aA1) {
  return 3.0 * aA1;
} // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.


function calcBezier(aT, aA1, aA2) {
  return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
} // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.


function getSlope(aT, aA1, aA2) {
  return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
}

function binarySubdivide(aX, aA, aB, mX1, mX2) {
  var currentX,
      currentT,
      i = 0;

  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;

    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);

  return currentT;
}

function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
  for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
    var currentSlope = getSlope(aGuessT, mX1, mX2);

    if (currentSlope === 0.0) {
      return aGuessT;
    }

    var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
    aGuessT -= currentX / currentSlope;
  }

  return aGuessT;
}

function LinearEasing(x) {
  return x;
}

module.exports = function bezier(mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error('bezier x values must be in [0, 1] range');
  }

  if (mX1 === mY1 && mX2 === mY2) {
    return LinearEasing;
  } // Precompute samples table


  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);

  for (var i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }

  function getTForX(aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }

    --currentSample; // Interpolate to provide an initial guess for t

    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;
    var initialSlope = getSlope(guessForT, mX1, mX2);

    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function BezierEasing(x) {
    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
    if (x === 0) {
      return 0;
    }

    if (x === 1) {
      return 1;
    }

    return calcBezier(getTForX(x), mY1, mY2);
  };
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BezierEasing = __webpack_require__(/*! bezier-easing */ "./node_modules/bezier-easing/src/index.js");

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return s4() + s4() + s4() + s4() + s4() + s4();
}

var _pageStacks = {};

var Transition = /*#__PURE__*/function () {
  function Transition() {
    _classCallCheck(this, Transition);

    this._frame = this.frame.bind(this);
  }

  _createClass(Transition, [{
    key: "start",
    value: function start(args) {
      this.cb = args.end;
      this.transitionForward = !args.back;
      this.startTime = window.performance.now();
      requestAnimationFrame(this._frame);
    }
  }, {
    key: "frame",
    value: function frame() {
      var t = (window.performance.now() - (this.startTime + this.timing.delay)) / this.timing.dur;

      var _t = Math.max(0, Math.min(t, 1));

      this.transitionForward ? this.forward(_t) : this.back(_t);
      if (window.performance.now() <= this.startTime + this.timing.dur + this.timing.delay) requestAnimationFrame(this._frame);else this.end();
    }
  }, {
    key: "end",
    value: function end() {
      this.cb && this.cb();
    }
  }]);

  return Transition;
}(); // ----------------------------------------------------------------------------------------------------
// None Transition
// ----------------------------------------------------------------------------------------------------


var NoneTransition = /*#__PURE__*/function (_Transition) {
  _inherits(NoneTransition, _Transition);

  var _super = _createSuper(NoneTransition);

  function NoneTransition(from, to, params) {
    var _this2;

    _classCallCheck(this, NoneTransition);

    _this2 = _super.call(this);
    _this2.from = from;
    _this2.to = to;
    _this2.timing = {
      dur: 0,
      delay: 0
    };
    return _this2;
  }

  _createClass(NoneTransition, [{
    key: "update",
    value: function update(t) {}
  }, {
    key: "forward",
    value: function forward(t) {}
  }, {
    key: "back",
    value: function back(t) {}
  }]);

  return NoneTransition;
}(Transition);

NoneTransition.ports = function (parameters) {
  return [];
}; // ----------------------------------------------------------------------------------------------------
// Push Transition
// ----------------------------------------------------------------------------------------------------


var PushTransition = /*#__PURE__*/function (_Transition2) {
  _inherits(PushTransition, _Transition2);

  var _super2 = _createSuper(PushTransition);

  function PushTransition(from, to, params) {
    var _this3;

    _classCallCheck(this, PushTransition);

    _this3 = _super2.call(this);
    _this3.from = from;
    _this3.to = to;
    _this3.timing = params.timing || {
      curve: [0.0, 0.0, 0.58, 1.0],
      dur: 300,
      delay: 0
    };
    _this3.distance = params.shift || {
      value: 25,
      unit: '%'
    };
    if (typeof _this3.distance === 'number') _this3.distance = {
      value: _this3.distance,
      unit: '%'
    };
    _this3.direction = params.direction || 'Right';
    _this3.timing.curve[0] = Math.min(1, Math.max(0, _this3.timing.curve[0]));
    _this3.timing.curve[2] = Math.min(1, Math.max(0, _this3.timing.curve[2]));
    _this3.ease = BezierEasing.apply(null, _this3.timing.curve);
    _this3.crossfade = params.crossfade === undefined ? true : params.crossfade;
    _this3.zoom = params.zoom || {
      value: 25,
      unit: '%'
    };
    if (typeof _this3.zoom === 'number') _this3.zoom = {
      value: _this3.zoom,
      unit: '%'
    };
    return _this3;
  }

  _createClass(PushTransition, [{
    key: "update",
    value: function update(t) {
      if (this.direction === 'In' || this.direction === 'Out') {
        var zoom = this.zoom.value / 100;
        zoom = this.direction === 'Out' ? -zoom : zoom;
        this.from.setStyle({
          transform: 'scale(' + (1 + zoom * t) + ')',
          opacity: this.crossfade ? 1 - t : 1
        });
        this.to.setStyle({
          transform: 'scale(' + (1 - zoom * (1 - t)) + ')',
          opacity: this.crossfade ? t : 1
        });
      } else {
        var dist = this.distance.value;
        var unit = this.distance.unit;
        var targets = {
          'Up': {
            x: 0,
            y: -1
          },
          'Down': {
            x: 0,
            y: 1
          },
          'Left': {
            x: -1,
            y: 0
          },
          'Right': {
            x: 1,
            y: 0
          }
        };
        var target = {
          x: targets[this.direction].x * dist,
          y: targets[this.direction].y * dist
        };
        this.from.setStyle({
          transform: 'translate(' + target.x * t + unit + ',' + target.y * t + unit + ')',
          opacity: this.crossfade ? 1 - t : 1
        });
        this.to.setStyle({
          transform: 'translate(' + target.x * (t - 1) + unit + ',' + target.y * (t - 1) + unit + ')',
          opacity: this.crossfade ? t : 1
        });
      }
    }
  }, {
    key: "forward",
    value: function forward(t) {
      var _t = this.ease(t);

      this.update(_t);
    }
  }, {
    key: "back",
    value: function back(t) {
      var _t = this.ease(t);

      this.update(1 - _t);
    }
  }]);

  return PushTransition;
}(Transition);

PushTransition.ports = function (parameters) {
  var ports = [];
  ports.push({
    name: 'tr-direction',
    displayName: 'Direction',
    group: 'Transition',
    type: {
      name: 'enum',
      enums: ['Right', 'Left', 'Up', 'Down', 'In', 'Out']
    },
    "default": 'Right',
    plug: 'input'
  });

  if (parameters['tr-direction'] === 'In' || parameters['tr-direction'] === 'Out') {
    ports.push({
      name: 'tr-zoom',
      displayName: 'Zoom',
      group: 'Transition',
      type: {
        name: 'number',
        units: ['%']
      },
      "default": {
        value: 25,
        unit: '%'
      },
      plug: 'input'
    });
  } else {
    ports.push({
      name: 'tr-shift',
      displayName: 'Shift Distance',
      group: 'Transition',
      type: {
        name: 'number',
        units: ['%', 'px']
      },
      "default": {
        value: 25,
        unit: '%'
      },
      plug: 'input'
    });
  }

  ports.push({
    name: 'tr-crossfade',
    displayName: 'Crossfade',
    group: 'Transition',
    type: 'boolean',
    "default": true,
    plug: 'input'
  });
  ports.push({
    name: 'tr-timing',
    displayName: 'Timing',
    group: 'Transition',
    type: 'curve',
    plug: 'input'
  });
  return ports;
}; // ----------------------------------------------------------------------------------------------------
// Popup Transition
// ----------------------------------------------------------------------------------------------------


var PopupTransition = /*#__PURE__*/function (_Transition3) {
  _inherits(PopupTransition, _Transition3);

  var _super3 = _createSuper(PopupTransition);

  function PopupTransition(from, to, params) {
    var _this4;

    _classCallCheck(this, PopupTransition);

    _this4 = _super3.call(this);
    _this4.from = from;
    _this4.to = to;
    _this4.timing = params.timing || {
      curve: [0.0, 0.0, 0.58, 1.0],
      dur: 300,
      delay: 0
    };
    _this4.distance = params.shift || {
      value: 25,
      unit: '%'
    };
    if (typeof _this4.distance === 'number') _this4.distance = {
      value: _this4.distance,
      unit: '%'
    };
    _this4.direction = params.direction || 'Right';
    _this4.timing.curve[0] = Math.min(1, Math.max(0, _this4.timing.curve[0]));
    _this4.timing.curve[2] = Math.min(1, Math.max(0, _this4.timing.curve[2]));
    _this4.ease = BezierEasing.apply(null, _this4.timing.curve);
    _this4.fadein = params.fadein === undefined ? false : params.fadein;
    _this4.zoom = params.zoom || {
      value: 25,
      unit: '%'
    };
    if (typeof _this4.zoom === 'number') _this4.zoom = {
      value: _this4.zoom,
      unit: '%'
    };
    return _this4;
  }

  _createClass(PopupTransition, [{
    key: "update",
    value: function update(t) {
      if (this.direction === 'In' || this.direction === 'Out') {
        var zoom = this.zoom.value / 100;
        zoom = this.direction === 'Out' ? -zoom : zoom;
        this.to.setStyle({
          transform: 'scale(' + (1 - zoom * (1 - t)) + ')',
          opacity: this.crossfade ? t : 1
        });
      } else {
        var dist = this.distance.value;
        var unit = this.distance.unit;
        var targets = {
          'Up': {
            x: 0,
            y: -1
          },
          'Down': {
            x: 0,
            y: 1
          },
          'Left': {
            x: -1,
            y: 0
          },
          'Right': {
            x: 1,
            y: 0
          }
        };
        var target = {
          x: targets[this.direction].x * dist,
          y: targets[this.direction].y * dist
        };
        this.to.setStyle({
          transform: 'translate(' + target.x * (t - 1) + unit + ',' + target.y * (t - 1) + unit + ')',
          opacity: this.fadein ? t : 1
        });
      }
    }
  }, {
    key: "forward",
    value: function forward(t) {
      var _t = this.ease(t);

      this.update(_t);
    }
  }, {
    key: "back",
    value: function back(t) {
      var _t = this.ease(t);

      this.update(1 - _t);
    }
  }]);

  return PopupTransition;
}(Transition);

PopupTransition.ports = function (parameters) {
  var ports = [];
  ports.push({
    name: 'tr-direction',
    displayName: 'Direction',
    group: 'Transition',
    type: {
      name: 'enum',
      enums: ['Right', 'Left', 'Up', 'Down', 'In', 'Out']
    },
    "default": 'Right',
    plug: 'input'
  });

  if (parameters['tr-direction'] === 'In' || parameters['tr-direction'] === 'Out') {
    ports.push({
      name: 'tr-zoom',
      displayName: 'Zoom',
      group: 'Transition',
      type: {
        name: 'number',
        units: ['%']
      },
      "default": {
        value: 25,
        unit: '%'
      },
      plug: 'input'
    });
  } else {
    ports.push({
      name: 'tr-shift',
      displayName: 'Shift Distance',
      group: 'Transition',
      type: {
        name: 'number',
        units: ['%', 'px']
      },
      "default": {
        value: 25,
        unit: '%'
      },
      plug: 'input'
    });
  }

  ports.push({
    name: 'tr-fadein',
    displayName: 'Face In',
    group: 'Transition',
    type: 'boolean',
    "default": false,
    plug: 'input'
  });
  ports.push({
    name: 'tr-timing',
    displayName: 'Timing',
    group: 'Transition',
    type: 'curve',
    plug: 'input'
  });
  return ports;
};

var Transitions = {
  'None': NoneTransition,
  'Push': PushTransition,
  'Popup': PopupTransition
};
var Navigate = {
  node: {
    name: 'PageStackNavigate',
    displayNodeName: 'Navigate',
    category: 'Navigation',
    initialize: function initialize() {
      this._internal.transitionParams = {};
      this._internal.pageParams = {};
    },
    inputs: {
      stack: {
        type: {
          name: 'string',
          identifierOf: 'PackStack'
        },
        "default": 'Default',
        displayName: 'Stack',
        group: 'General',
        set: function set(value) {
          this._internal.stack = value;
        }
      },
      target: {
        type: 'component',
        displayName: 'Target',
        group: 'General',
        set: function set(value) {
          this._internal.target = value;
        }
      },
      transition: {
        type: {
          name: 'enum',
          enums: Object.keys(Transitions)
        },
        "default": 'Push',
        displayName: 'Transition',
        group: 'Transition',
        set: function set(value) {
          this._internal.transition = value;
        }
      },
      navigate: {
        displayName: 'Navigate',
        group: 'Actions',
        valueChangedToTrue: function valueChangedToTrue() {
          this.scheduleNavigate();
        }
      },
      parameters: {
        group: 'Parameters',
        type: {
          name: 'stringlist',
          allowEditOnly: true
        },
        set: function set() {// Just used to generate ports
        }
      }
    },
    methods: {
      scheduleNavigate: function scheduleNavigate() {
        var _this = this;

        var internal = this._internal;

        if (!internal.hasScheduledNavigate) {
          internal.hasScheduledNavigate = true;
          this.scheduleAfterInputsHaveUpdated(function () {
            internal.hasScheduledNavigate = false;

            _this.navigate();
          });
        }
      },
      navigate: function navigate() {
        var pageStack;
        if (!this._internal.stack || this._internal.stack === 'Default') pageStack = _defaultPageStack;else pageStack = _pageStacks[this._internal.stack];

        if (!pageStack) {
          console.log('No page stack found');
          return;
        }

        pageStack.navigate({
          target: this._internal.target,
          transition: _objectSpread(_objectSpread({}, {
            type: this._internal.transition
          }), this._internal.transitionParams),
          params: this._internal.pageParams
        });
      },
      setTransitionParam: function setTransitionParam(param, value, unit) {
        this._internal.transitionParams[param] = unit !== undefined ? {
          value: value,
          unit: unit
        } : value;
      },
      setPageParam: function setPageParam(param, value) {
        this._internal.pageParams[param] = value;
      },
      registerInputIfNeeded: function registerInputIfNeeded(name) {
        if (this.hasInput(name)) {
          return;
        }

        if (name.startsWith('tr-')) return this.registerInput(name, {
          set: this.setTransitionParam.bind(this, name.substring('tr-'.length))
        });
        if (name.startsWith('pm-')) return this.registerInput(name, {
          set: this.setPageParam.bind(this, name.substring('pm-'.length))
        });
      }
    }
  },
  setup: function setup(context, graphModel) {
    if (!context.editorConnection || !context.editorConnection.isRunningLocally()) {
      return;
    }

    graphModel.on("nodeAdded.PageStackNavigate", function (node) {
      function _updatePorts() {
        var ports = [];
        var transition = node.parameters['transition'] || 'Push';
        if (Transitions[transition]) ports = ports.concat(Transitions[transition].ports(node.parameters));

        if (node.parameters['parameters']) {
          var params = node.parameters['parameters'].split(',');
          params.forEach(function (p) {
            ports.push({
              name: 'pm-' + p,
              displayName: p,
              group: 'Parameters',
              plug: 'input',
              type: '*'
            });
          });
        }

        context.editorConnection.sendDynamicPorts(node.id, ports);
      }

      _updatePorts();

      node.on('parameterUpdated', function (ev) {
        if (ev.name === 'parameters' || ev.name === 'transition' || ev.name.startsWith('tr-')) _updatePorts();
      });
    });
  }
};
var NavigateBack = {
  node: {
    name: 'PageStackNavigateBack',
    displayNodeName: 'Navigate Back',
    category: 'Navigation',
    inputs: {
      stack: {
        type: {
          name: 'string',
          identifierOf: 'PackStack'
        },
        "default": 'Default',
        displayName: 'Stack',
        group: 'General',
        set: function set(value) {
          this._internal.stack = value;
        }
      },
      navigate: {
        displayName: 'Navigate',
        group: 'Actions',
        valueChangedToTrue: function valueChangedToTrue() {
          this.scheduleNavigate();
        }
      }
    },
    methods: {
      scheduleNavigate: function scheduleNavigate() {
        var _this = this;

        var internal = this._internal;

        if (!internal.hasScheduledNavigate) {
          internal.hasScheduledNavigate = true;
          this.scheduleAfterInputsHaveUpdated(function () {
            internal.hasScheduledNavigate = false;

            _this.navigate();
          });
        }
      },
      navigate: function navigate() {
        var pageStack;
        if (!this._internal.stack || this._internal.stack === 'Default') pageStack = _defaultPageStack;else pageStack = _pageStacks[this._internal.stack];

        if (!pageStack) {
          console.log('No page stack found');
          return;
        }

        pageStack.back();
      }
    }
  },
  setup: function setup(context, graphModel) {
    if (!context.editorConnection || !context.editorConnection.isRunningLocally()) {
      return;
    }
  }
};
var PageStack = {
  name: 'Page Stack',
  displayNodeName: 'Navigation Stack',
  category: 'Visuals',
  initialize: function initialize() {
    this._internal.stack = [];
  },
  getReactComponent: function getReactComponent() {
    var _this = this;

    return function (props) {
      var style = {
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: _this._internal.backgroundColor
      };
      return /*#__PURE__*/React.createElement("div", {
        style: style
      }, props.children);
    };
  },
  inputs: {
    name: {
      type: {
        name: 'string',
        identifierOf: 'PackStack'
      },
      displayName: 'Name',
      group: 'General',
      set: function set(value) {
        this._internal.name = value;
        _pageStacks[this._internal.name] = this;
      }
    },
    startPage: {
      type: 'component',
      displayName: 'Start Page',
      group: 'General',
      set: function set(value) {
        this._internal.startPage = value;
        this.scheduleReset();
      }
    },
    backgroundColor: {
      type: 'color',
      displayName: 'Background Color',
      group: 'Style',
      set: function set(value) {
        this._internal.backgroundColor = value;
      }
    }
  },
  methods: {
    scheduleReset: function scheduleReset() {
      var _this = this;

      var internal = this._internal;

      if (!internal.hasScheduledReset) {
        internal.hasScheduledReset = true;
        this.scheduleAfterInputsHaveUpdated(function () {
          internal.hasScheduledReset = false;

          _this.reset();
        });
      }
    },
    reset: function reset(content) {
      var children = this.getChildren();

      for (var i in children) {
        var c = children[i];
        this.removeChild(c);
      }

      var group = this.nodeScope.createNode('Group', guid());
      group.setInputValue('flexDirection', 'none');
      if (!content) content = this.nodeScope.createNode(this._internal.startPage, guid());
      group.addChild(content);
      this.addChild(group);
      this._internal.stack = [{
        from: null,
        page: group
      }];
    },
    navigate: function navigate(args) {
      var _this5 = this;

      if (this._internal.isTransitioning) return;
      var group = this.nodeScope.createNode('Group', guid());
      group.setInputValue('flexDirection', 'none');
      var content = this.nodeScope.createNode(args.target, guid());

      for (var key in args.params) {
        content.setInputValue(key, args.params[key]);
      }

      group.addChild(content);
      var top = this._internal.stack[this._internal.stack.length - 1];
      var newTop = {
        from: top.page,
        page: group,
        transition: new Transitions[args.transition.type || 'Push'](top.page, group, args.transition)
      };

      this._internal.stack.push(newTop);

      newTop.transition.forward(0);
      this._internal.isTransitioning = true;
      newTop.transition.start({
        end: function end() {
          _this5._internal.isTransitioning = false;
        }
      });
      this.addChild(group);
    },
    back: function back() {
      var _this6 = this;

      if (this._internal.stack.length <= 1) return;
      if (this._internal.isTransitioning) return;
      var top = this._internal.stack[this._internal.stack.length - 1];
      this._internal.isTransitioning = true;
      top.transition.start({
        end: function end() {
          _this6._internal.isTransitioning = false;

          _this6.removeChild(top.page);

          _this6._internal.stack.pop();
        },
        back: true
      });
    }
  }
};

var _defaultPageStack;

Noodl.defineModule({
  reactNodes: [PageStack],
  nodes: [Navigate, NavigateBack],
  settings: [{
    type: 'color',
    name: 'navigationBackgroundColor',
    displayName: 'Background Color',
    group: 'Navigation',
    plug: 'input'
  }],
  setup: function setup() {//this is called once on startup
  },
  _injectRootRender: function _injectRootRender(rootComponent) {
    if (!_defaultPageStack) {
      _defaultPageStack = rootComponent.nodeScope.createNode('Page Stack');

      _defaultPageStack.setInputValue('backgroundColor', Noodl.getProjectSettings().navigationBackgroundColor);
    }

    _defaultPageStack.reset(rootComponent);

    return _defaultPageStack;
  }
});

/***/ })

/******/ });
//# sourceMappingURL=index.js.map
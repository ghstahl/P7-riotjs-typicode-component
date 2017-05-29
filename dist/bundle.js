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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = riot;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(6);

__webpack_require__(7);

__webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouteContributer = function () {
  function RouteContributer() {
    _classCallCheck(this, RouteContributer);

    var self = this;

    riot.observable(self);
    self.name = 'RouteContributer';
    self._initializeViewSet();

    this.initialize();
  }

  RouteContributer.prototype._initializeViewSet = function _initializeViewSet() {
    var self = this;

    self._viewsSet = new Set();
    var s = self._viewsSet;

    s.add('home');
    s.add('my-component-page');
    s.add('typicode-user-detail');
    self.views = Array.from(s);
    self.defaultRoute = '/my-component-page/home';
  };

  RouteContributer.prototype.uninitialize = function uninitialize() {};

  RouteContributer.prototype.initialize = function initialize() {};

  RouteContributer.prototype.contributeRoutes = function contributeRoutes(r) {
    var self = this;

    console.log(self.name, riot.EVT.router.out.contributeRoutes, r);
    r('/my-component-page/typicode-user-detail?id=*', function () {
      console.log('route handler of /my-component-page/typicode-user-detail');
      riot.control.trigger(riot.EVT.routeStore.in.riotRouteLoadView, 'mpc-typicode-user-detail');
    });

    r('/my-component-page/*', function (name) {
      console.log('route handler of /my-component-page/' + name);
      var view = name;

      if (self.views.indexOf(view) === -1) {
        riot.control.trigger(riot.EVT.routeStore.in.routeDispatch, self.defaultRoute);
      } else {
        riot.control.trigger(riot.EVT.routeStore.in.riotRouteLoadView, 'mpc-' + view);
      }
    });
    r('/my-component-page..', function () {
      console.log('route handler of /my-component-page..');
      riot.control.trigger(riot.EVT.routeStore.in.routeDispatch, self.defaultRoute);
    });
  };

  return RouteContributer;
}();

exports.default = RouteContributer;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var userCache = 'typicodeUserCache';

var TypicodeUserStore = function () {
  function TypicodeUserStore() {
    _classCallCheck(this, TypicodeUserStore);

    riot.observable(this); // Riot provides our event emitter.
    this.name = 'TypicodeUserStore';
    riot.EVT.typicodeUserStore = {
      in: {
        typicodeInit: 'typicode-init',
        typicodeUninit: 'typicode-uninit',
        typicodeUsersFetchResult: 'typicode-users-fetch-result',
        typicodeUsersFetch: 'typicode-users-fetch',
        typicodeUserFetch: 'typicode-user-fetch'
      },
      out: {
        typicodeUsersChanged: 'typicode-users-changed',
        typicodeUserChanged: 'typicode-user-changed'
      }
    };

    this.fetchException = null;
    this.bound = false;
    this.initialize();
  }

  TypicodeUserStore.prototype._onTypicodeUsersFetch = function _onTypicodeUsersFetch(query) {
    console.log(riot.EVT.typicodeUserStore.in.typicodeUsersFetch);
    var url = 'https://jsonplaceholder.typicode.com/users';
    var trigger = {
      name: riot.EVT.typicodeUserStore.in.typicodeUsersFetchResult
    };

    if (query) {
      trigger.query = query;
    }

    riot.control.trigger(riot.EVT.fetchStore.in.fetch, url, null, trigger);
  };

  TypicodeUserStore.prototype._onTypicodeUserFetch = function _onTypicodeUserFetch(query) {
    console.log(riot.EVT.typicodeUserStore.in.typicodeUserFetch);
    var restoredSession = JSON.parse(localStorage.getItem(userCache));

    var id = parseInt(query.id, 10); // query.id is a string

    if (restoredSession) {
      var result = restoredSession.filter(function (obj) {
        var found = obj.id === id;

        return found;
      });

      if (result && result.length > 0) {
        this.trigger(riot.EVT.typicodeUserStore.out.typicodeUserChanged, result[0]);
      }
    } else {
      // need to fetch.
      var myQuery = {
        type: 'riotControlTrigger',
        evt: riot.EVT.typicodeUserStore.in.typicodeUserFetch,
        query: query
      };

      riot.control.trigger(riot.EVT.typicodeUserStore.in.typicodeUsersFetch, myQuery);
    }
  };

  TypicodeUserStore.prototype.uninitialize = function uninitialize() {
    if (this.bound === true) {
      this.off(riot.EVT.typicodeUserStore.in.typicodeUsersFetch, this._onTypicodeUsersFetch);
      this.off(riot.EVT.typicodeUserStore.in.typicodeUserFetch, this._onTypicodeUserFetch);
      this.off(riot.EVT.typicodeUserStore.in.typicodeUsersFetchResult, this._onUsersResult);

      this.bound = !this.bound;
    }
  };

  TypicodeUserStore.prototype.initialize = function initialize() {
    if (this.bound === false) {
      this.on(riot.EVT.typicodeUserStore.in.typicodeUsersFetchResult, this._onUsersResult);
      this.on(riot.EVT.typicodeUserStore.in.typicodeUsersFetch, this._onTypicodeUsersFetch);
      this.on(riot.EVT.typicodeUserStore.in.typicodeUserFetch, this._onTypicodeUserFetch);

      this.bound = !this.bound;
    }
  };

  /**
     * Reset tag attributes to hide the errors and cleaning the results list
     */


  TypicodeUserStore.prototype._resetData = function _resetData() {
    this.fetchException = null;
  };

  TypicodeUserStore.prototype._onUsersResult = function _onUsersResult(result, myTrigger) {
    console.log(riot.EVT.typicodeUserStore.in.typicodeUsersFetchResult, result, myTrigger);
    if (result.error == null && result.response.ok && result.json) {
      // good
      var data = result.json;

      riot.control.trigger(riot.EVT.localStorageStore.in.localstorageSet, { key: userCache, data: data });
      this.trigger(riot.EVT.typicodeUserStore.out.typicodeUsersChanged, data);
      if (myTrigger.query) {
        var query = myTrigger.query;

        if (query.type === 'riotControlTrigger') {
          riot.control.trigger(query.evt, query.query);
        }
      }
    } else {
      // Bad.. Wipe the local storage
      riot.control.trigger(riot.EVT.localStorageStore.in.localstorageRemove, { key: userCache });
      riot.control.trigger('ErrorStore:error-catch-all', { code: 'typeicode-143523' });
    }
  };

  return TypicodeUserStore;
}();

exports.default = TypicodeUserStore;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

__webpack_require__(3);

var _typicodeUserStore = __webpack_require__(2);

var _typicodeUserStore2 = _interopRequireDefault(_typicodeUserStore);

var _routeContributer = __webpack_require__(1);

var _routeContributer2 = _interopRequireDefault(_routeContributer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rcs = new _routeContributer2.default();
var registerRecord = {
  name: 'typicode-component',
  stores: [{ store: new _typicodeUserStore2.default() }],
  registrants: {
    routeContributer: rcs
  },
  postLoadEvents: [{ event: 'typicode-init', data: {} }],
  preUnloadEvents: [{ event: 'typicode-uninit', data: {} }]
};

riot.control.trigger('plugin-registration', registerRecord);
riot.control.trigger('component-load-complete', registerRecord.name);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var riot = __webpack_require__(0);
riot.tag2('mpc-home', '<div class="panel panel-default"> <div class="panel-heading">My Component</div> <div class="panel-body"> <div class="well"> I am located in a prebuilt bundle.js. I am a full blown SPA as far as I am concerned, as I just had to follow a few rules that the hosting SPA required. </div> </div> </div> <a href="#my-component-page/my-component-page" class="btn btn-default">TypiCode Users</a>', '', '', function (opts) {});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var riot = __webpack_require__(0);
riot.tag2('mpc-my-component-page', '<div class="panel panel-default"> <div class="panel-heading">TypiCode Users</div> <div class="panel-body"> <div class="well"> This pulls users from https://jsonplaceholder.typicode.com/ </div> <table class="table table-striped table-hover "> <thead> <tr> <th>id</th> <th>username</th> <th>name</th> <th>email</th> <th>phone</th> <th>details</th> </tr> </thead> <tbody> <tr each="{this.results}"> <td>{this.id}</td> <td>{this.username}</td> <td>{this.name}</td> <td>{this.email}</td> <td>{this.phone}</td> <td><a onclick="{parent.route}">More...</a></td> </tr> </tbody> </table> </div> </div>', '', '', function (opts) {
  var self = this;
  self.error = false;
  self.results = [];

  self.resetData = function () {
    self.results = [];
    self.error = false;
  };

  self.on('mount', function () {
    console.log('typicode-users mount');
    riot.control.on(riot.EVT.typicodeUserStore.out.typicodeUsersChanged, self.onTypicodeUsersChanged);
    riot.control.trigger(riot.EVT.typicodeUserStore.in.typicodeUsersFetch);
  });
  self.on('unmount', function () {
    console.log('typicode-users unmount');
    riot.control.off(riot.EVT.typicodeUserStore.out.typicodeUsersChanged, self.onTypicodeUsersChanged);
  });
  self.onTypicodeUsersChanged = function (result) {
    console.log(riot.EVT.typicodeUserStore.out.typicodeUsersChanged);
    self.results = result;
    console.log(self.results);
    self.update();
  };
  self.route = function (evt) {
    riot.control.trigger('riot-route-dispatch', 'my-component-page/typicode-user-detail?id=' + evt.item.id);
  };
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var riot = __webpack_require__(0);
riot.tag2('mpc-typicode-user-detail', '<div if="{result != null}" class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">{result.name}</h3> </div> <div class="panel-body"> <form class="form-horizontal"> <fieldset> <legend>User Details</legend> <div class="form-group"> <label class="col-sm-2 control-label">Name</label> <div class="col-sm-10"> <p class="form-control-static">{result.name}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Email</label> <div class="col-sm-10"> <p class="form-control-static">{result.email}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Phone</label> <div class="col-sm-10"> <p class="form-control-static">{result.phone}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">User Name</label> <div class="col-sm-10"> <p class="form-control-static">{result.username}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Web Site</label> <div class="col-sm-10"> <p class="form-control-static">{result.website}</p> </div> </div> </fieldset> </form> <form class="form-horizontal"> <fieldset> <legend>Address</legend> <div class="form-group"> <label class="col-sm-2 control-label">Suite</label> <div class="col-sm-10"> <p class="form-control-static">{result.address.suite}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Street</label> <div class="col-sm-10"> <p class="form-control-static">{result.address.street}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">City</label> <div class="col-sm-10"> <p class="form-control-static">{result.address.city}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Zip Code</label> <div class="col-sm-10"> <p class="form-control-static">{result.address.zipcode}</p> </div> </div> </fieldset> </form> <form class="form-horizontal"> <fieldset> <legend>Company</legend> <div class="form-group"> <label class="col-sm-2 control-label">Name</label> <div class="col-sm-10"> <p class="form-control-static">{result.company.name}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Catch Phrase</label> <div class="col-sm-10"> <p class="form-control-static">{result.company.catchPhrase}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Business Statement</label> <div class="col-sm-10"> <p class="form-control-static">{result.company.bs}</p> </div> </div> </fieldset> </form> </div> </div>', '', '', function (opts) {
    var self = this;

    self.result = null;
    self.onUserChanged = function (user) {
        self.result = user;
        console.log(self.result);
        self.update();
    };

    self.on('mount', function () {
        var q = riot.route.query();
        console.log('on mount: typicode-user-detail', q);
        riot.control.on(riot.EVT.typicodeUserStore.out.typicodeUserChanged, self.onUserChanged);

        riot.control.trigger(riot.EVT.typicodeUserStore.in.typicodeUserFetch, { id: q.id });
    });

    self.on('unmount', function () {
        console.log('on unmount:');
        riot.control.off(riot.EVT.typicodeUserStore.out.typicodeUserChanged, self.onUserChanged);
    });
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
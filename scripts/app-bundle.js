define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'Aurelia';
      config.map([{ route: ['welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'Welcome' }, { route: 'users', name: 'users', moduleId: 'users', nav: true, title: 'Github Users' }, { route: 'grid', name: 'grid', moduleId: 'grid', nav: true, title: 'Grid' }, { route: 'button-test', name: 'button-test', moduleId: 'button-test', nav: true, title: 'Button Test' }, { route: 'dreamfactorytester', name: 'dreamfactorytester', moduleId: 'dreamfactorytester', nav: true, title: 'Dream Factory Tester' }, { route: ['', 'gridremote'], name: 'gridremote', moduleId: 'gridremote', nav: true, title: 'Grid Remote' }, { route: 'child-router', name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }]);

      this.router = router;
    };

    return App;
  }();
});
define('blur-image',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.BlurImageCustomAttribute = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var BlurImageCustomAttribute = exports.BlurImageCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = function () {
		function BlurImageCustomAttribute(element) {
			_classCallCheck(this, BlurImageCustomAttribute);

			this.element = element;
		}

		BlurImageCustomAttribute.prototype.valueChanged = function valueChanged(newImage) {
			var _this = this;

			if (newImage.complete) {
				drawBlur(this.element, newImage);
			} else {
				newImage.onload = function () {
					return drawBlur(_this.element, newImage);
				};
			}
		};

		return BlurImageCustomAttribute;
	}()) || _class);


	var mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];

	var shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];

	var BLUR_RADIUS = 40;

	function stackBlurCanvasRGBA(canvas, top_x, top_y, width, height, radius) {
		if (isNaN(radius) || radius < 1) return;
		radius |= 0;

		var context = canvas.getContext("2d");
		var imageData;

		try {
			imageData = context.getImageData(top_x, top_y, width, height);
		} catch (e) {
			throw new Error("unable to access image data: " + e);
		}

		var pixels = imageData.data;

		var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;

		var div = radius + radius + 1;
		var w4 = width << 2;
		var widthMinus1 = width - 1;
		var heightMinus1 = height - 1;
		var radiusPlus1 = radius + 1;
		var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

		var stackStart = new BlurStack();
		var stack = stackStart;
		for (i = 1; i < div; i++) {
			stack = stack.next = new BlurStack();
			if (i == radiusPlus1) var stackEnd = stack;
		}
		stack.next = stackStart;
		var stackIn = null;
		var stackOut = null;

		yw = yi = 0;

		var mul_sum = mul_table[radius];
		var shg_sum = shg_table[radius];

		for (y = 0; y < height; y++) {
			r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

			r_out_sum = radiusPlus1 * (pr = pixels[yi]);
			g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
			b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
			a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

			r_sum += sumFactor * pr;
			g_sum += sumFactor * pg;
			b_sum += sumFactor * pb;
			a_sum += sumFactor * pa;

			stack = stackStart;

			for (i = 0; i < radiusPlus1; i++) {
				stack.r = pr;
				stack.g = pg;
				stack.b = pb;
				stack.a = pa;
				stack = stack.next;
			}

			for (i = 1; i < radiusPlus1; i++) {
				p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
				r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
				g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
				b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
				a_sum += (stack.a = pa = pixels[p + 3]) * rbs;

				r_in_sum += pr;
				g_in_sum += pg;
				b_in_sum += pb;
				a_in_sum += pa;

				stack = stack.next;
			}

			stackIn = stackStart;
			stackOut = stackEnd;
			for (x = 0; x < width; x++) {
				pixels[yi + 3] = pa = a_sum * mul_sum >> shg_sum;
				if (pa != 0) {
					pa = 255 / pa;
					pixels[yi] = (r_sum * mul_sum >> shg_sum) * pa;
					pixels[yi + 1] = (g_sum * mul_sum >> shg_sum) * pa;
					pixels[yi + 2] = (b_sum * mul_sum >> shg_sum) * pa;
				} else {
					pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
				}

				r_sum -= r_out_sum;
				g_sum -= g_out_sum;
				b_sum -= b_out_sum;
				a_sum -= a_out_sum;

				r_out_sum -= stackIn.r;
				g_out_sum -= stackIn.g;
				b_out_sum -= stackIn.b;
				a_out_sum -= stackIn.a;

				p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;

				r_in_sum += stackIn.r = pixels[p];
				g_in_sum += stackIn.g = pixels[p + 1];
				b_in_sum += stackIn.b = pixels[p + 2];
				a_in_sum += stackIn.a = pixels[p + 3];

				r_sum += r_in_sum;
				g_sum += g_in_sum;
				b_sum += b_in_sum;
				a_sum += a_in_sum;

				stackIn = stackIn.next;

				r_out_sum += pr = stackOut.r;
				g_out_sum += pg = stackOut.g;
				b_out_sum += pb = stackOut.b;
				a_out_sum += pa = stackOut.a;

				r_in_sum -= pr;
				g_in_sum -= pg;
				b_in_sum -= pb;
				a_in_sum -= pa;

				stackOut = stackOut.next;

				yi += 4;
			}
			yw += width;
		}

		for (x = 0; x < width; x++) {
			g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

			yi = x << 2;
			r_out_sum = radiusPlus1 * (pr = pixels[yi]);
			g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
			b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
			a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

			r_sum += sumFactor * pr;
			g_sum += sumFactor * pg;
			b_sum += sumFactor * pb;
			a_sum += sumFactor * pa;

			stack = stackStart;

			for (i = 0; i < radiusPlus1; i++) {
				stack.r = pr;
				stack.g = pg;
				stack.b = pb;
				stack.a = pa;
				stack = stack.next;
			}

			yp = width;

			for (i = 1; i <= radius; i++) {
				yi = yp + x << 2;

				r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
				g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
				b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
				a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;

				r_in_sum += pr;
				g_in_sum += pg;
				b_in_sum += pb;
				a_in_sum += pa;

				stack = stack.next;

				if (i < heightMinus1) {
					yp += width;
				}
			}

			yi = x;
			stackIn = stackStart;
			stackOut = stackEnd;
			for (y = 0; y < height; y++) {
				p = yi << 2;
				pixels[p + 3] = pa = a_sum * mul_sum >> shg_sum;
				if (pa > 0) {
					pa = 255 / pa;
					pixels[p] = (r_sum * mul_sum >> shg_sum) * pa;
					pixels[p + 1] = (g_sum * mul_sum >> shg_sum) * pa;
					pixels[p + 2] = (b_sum * mul_sum >> shg_sum) * pa;
				} else {
					pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
				}

				r_sum -= r_out_sum;
				g_sum -= g_out_sum;
				b_sum -= b_out_sum;
				a_sum -= a_out_sum;

				r_out_sum -= stackIn.r;
				g_out_sum -= stackIn.g;
				b_out_sum -= stackIn.b;
				a_out_sum -= stackIn.a;

				p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;

				r_sum += r_in_sum += stackIn.r = pixels[p];
				g_sum += g_in_sum += stackIn.g = pixels[p + 1];
				b_sum += b_in_sum += stackIn.b = pixels[p + 2];
				a_sum += a_in_sum += stackIn.a = pixels[p + 3];

				stackIn = stackIn.next;

				r_out_sum += pr = stackOut.r;
				g_out_sum += pg = stackOut.g;
				b_out_sum += pb = stackOut.b;
				a_out_sum += pa = stackOut.a;

				r_in_sum -= pr;
				g_in_sum -= pg;
				b_in_sum -= pb;
				a_in_sum -= pa;

				stackOut = stackOut.next;

				yi += width;
			}
		}

		context.putImageData(imageData, top_x, top_y);
	}

	function BlurStack() {
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.a = 0;
		this.next = null;
	}

	function drawBlur(canvas, image) {
		var w = canvas.width;
		var h = canvas.height;
		var canvasContext = canvas.getContext('2d');
		canvasContext.drawImage(image, 0, 0, w, h);
		stackBlurCanvasRGBA(canvas, 0, 0, w, h, BLUR_RADIUS);
	};
});
define('button-test',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var MyButton = exports.MyButton = function () {
    function MyButton() {
      _classCallCheck(this, MyButton);

      this.normalBtnValue = 'normal';
      this.smallBtnValue = 'small';
      this.miniBtnValue = 'mini';
      this.mediumBtnValue = 'medium';
      this.largeBtnValue = 'large';
      this.roundedCorner = true;
    }

    MyButton.prototype.attached = function attached() {
      $("#button11").ejButton({
        size: "normal",
        showRoundedCorner: true,
        contentType: "imageonly",
        prefixIcon: "e-icon e-uiLight e-handup"
      });

      $("#button21").ejButton({
        showRoundedCorner: true,
        size: "mini"
      });

      $("#button31").ejButton({
        showRoundedCorner: true,
        size: "small"
      });

      $("#button41").ejButton({
        showRoundedCorner: true,
        size: "medium"
      });

      $("#button51").ejButton({
        size: "large",
        showRoundedCorner: true,
        contentType: "textandimage",
        prefixIcon: "e-icon e-uiLight e-handup"
      });
    };

    return MyButton;
  }();
});
define('child-router',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ChildRouter = exports.ChildRouter = function () {
    function ChildRouter() {
      _classCallCheck(this, ChildRouter);

      this.heading = 'Child Router';
    }

    ChildRouter.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'Welcome' }, { route: 'users', name: 'users', moduleId: 'users', nav: true, title: 'Github Users' }, { route: 'child-router', name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }]);

      this.router = router;
    };

    return ChildRouter;
  }();
});
define('dreamfactory-api',['exports', 'aurelia-fetch-client', 'aurelia-framework', './utils', './dreamfactoryconfig'], function (exports, _aureliaFetchClient, _aureliaFramework, _utils, _dreamfactoryconfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DreamFactoryApi = undefined;

  var _utils2 = _interopRequireDefault(_utils);

  var _dreamfactoryconfig2 = _interopRequireDefault(_dreamfactoryconfig);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var httpClient = new _aureliaFetchClient.HttpClient();
  httpClient.configure(function (config) {
    config.useStandardConfiguration();
  });

  var DreamFactoryApi = exports.DreamFactoryApi = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function DreamFactoryApi(http) {
      _classCallCheck(this, DreamFactoryApi);

      this.http = http;
    }

    DreamFactoryApi.prototype.login = function login() {
      var that = this;
      this.http.fetch(_dreamfactoryconfig2.default.loginurl(), {
        method: "POST",
        body: (0, _aureliaFetchClient.json)(_dreamfactoryconfig2.default.credentials())
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.hasOwnProperty('session_token')) {
          _utils2.default.setToken(_dreamfactoryconfig2.default.tokenKey, data.session_token);
          console.log(data);
          that.getdata();
        }
      });
    };

    DreamFactoryApi.prototype.getdata = function getdata() {
      var token = _utils2.default.getToken(_dreamfactoryconfig2.default.tokenKey);
      this.http.fetch(_dreamfactoryconfig2.default.dataurl(), {
        method: "POST",
        body: (0, _aureliaFetchClient.json)(_dreamfactoryconfig2.default.credentials()),
        headers: new Headers({
          "X-DreamFactory-API-Key": _dreamfactoryconfig2.default.APP_API_KEY,
          "X-DreamFactory-Session-Token": token
        })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
      });
    };

    return DreamFactoryApi;
  }()) || _class);
});
define('dreamfactoryconfig',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    INSTANCE_URL: 'https://api.ageektech.com',
    APP_API_KEY: 'db1f5534d2ce698bdb15d25a9f5e665e62abf2ee7b940878bba19a95fe3ed39b',
    email: 'support@ageektech.com',
    password: 'test12345',
    api: '/api/v2/',
    db: 'northwind/',
    service: '_table/',
    serviceObject: 'customers',
    tokenKey: 'token',
    overrideMethod: '?method=GET',
    dataurl: function dataurl() {
      return this.INSTANCE_URL + this.api + this.db + this.service + this.serviceObject + this.overrideMethod;
    },
    loginurl: function loginurl() {
      return this.INSTANCE_URL + '/api/v2/user/session';
    },
    credentials: function credentials() {
      return { email: this.email, password: this.password };
    }
  };
});
define('dreamfactorytester',['exports', 'aurelia-framework', './dreamfactory-api'], function (exports, _aureliaFramework, _dreamfactoryApi) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DreamfactoryTester = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var DreamfactoryTester = exports.DreamfactoryTester = (_dec = (0, _aureliaFramework.inject)(_dreamfactoryApi.DreamFactoryApi), _dec(_class = function () {
    function DreamfactoryTester(dfapi) {
      _classCallCheck(this, DreamfactoryTester);

      this.dfapi = dfapi;
    }

    DreamfactoryTester.prototype.login = function login() {
      this.dfapi.login();
    };

    return DreamfactoryTester;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('grid',['exports', './jsondata'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Grid = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Grid = exports.Grid = function Grid() {
    _classCallCheck(this, Grid);

    this.OrdersList = ej.DataManager(window.gridData).executeLocal(ej.Query().take(8));
    this.page = { pageSize: 4 };
  };
});
define('gridremote',['exports', 'aurelia-fetch-client', './utils', './dreamfactoryconfig', 'aurelia-framework'], function (exports, _aureliaFetchClient, _utils, _dreamfactoryconfig, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GridRemote = undefined;

  var _dreamfactoryconfig2 = _interopRequireDefault(_dreamfactoryconfig);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var httpClient = new _aureliaFetchClient.HttpClient();
  httpClient.configure(function (config) {
    config.useStandardConfiguration();
  });

  var GridRemote = exports.GridRemote = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function GridRemote(http) {
      _classCallCheck(this, GridRemote);

      this.http = http;
    }

    GridRemote.prototype.created = function created() {
      this.login();
    };

    GridRemote.prototype.login = function login() {
      var that = this;
      this.http.fetch(_dreamfactoryconfig2.default.loginurl(), {
        method: "POST",
        body: (0, _aureliaFetchClient.json)(_dreamfactoryconfig2.default.credentials())
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.hasOwnProperty('session_token')) {
          _utils.Utils.setToken(_dreamfactoryconfig2.default.tokenKey, data.session_token);
          console.log(data);
          var dataManager = ej.DataManager({
            url: _dreamfactoryconfig2.default.dataurl,
            adaptor: new syncfusionDreamFactoryAdapter(),
            headers: [{ "X-DreamFactory-API-Key": _dreamfactoryconfig2.default.APP_API_KEY, "X-DreamFactory-Session-Token": _utils.Utils.getToken(_dreamfactoryconfig2.default.tokenKey) }]
          });
          $("#Grid").ejGrid({
            dataSource: dataManager,
            allowPaging: true,
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { showPredicate: true, filterType: "menu", enableCaseSensitivity: true },
            searchSettings: { ignoreCase: false },


            columns: [{ field: "id", headerText: "ID" }, { field: "first_name", headerText: "First Nmae" }, { field: "last_name", headerText: "Last Name" }]
          });
        }
      });
    };

    return GridRemote;
  }()) || _class);
});
define('jsondata',[], function () {
  "use strict";

  window.gridData = [{
    OrderID: 10248, CustomerID: "VINET", EmployeeID: 5, OrderDate: new Date(8364186e5), ShipName: "Vins et alcools Chevalier", ShipCity: "Reims", ShipAddress: "59 rue de Abbaye", ShipRegion: null, ShipPostalCode: "51100", ShipCountry: "France", Freight: 32.38, Verified: !0
  }, {
    OrderID: 10249, CustomerID: "TOMSP", EmployeeID: 6, OrderDate: new Date(836505e6), ShipName: "Chop suey Chinese", ShipCity: "Monster", ShipAddress: "Luisenstr. 48", ShipRegion: null, ShipPostalCode: "44087", ShipCountry: "Germany", Freight: 11.61, Verified: !1
  }, {
    OrderID: 10250, CustomerID: "HANAR", EmployeeID: 4, OrderDate: new Date(8367642e5), ShipName: "Hanari Carnes", ShipCity: "Rio de Janeiro", ShipAddress: "Kirchgasse 6", ShipRegion: "RJ", ShipPostalCode: "05454-876", ShipCountry: "Brazil", Freight: 65.83, Verified: !0
  }, {
    OrderID: 10251, CustomerID: "VICTE", EmployeeID: 3, OrderDate: new Date(8367642e5), ShipName: "Victuailles en stock", ShipCity: "Lyon", ShipAddress: "2, rue du Commerce", ShipRegion: null, ShipPostalCode: "69004", ShipCountry: "France", Freight: 41.34, Verified: !0
  }, {
    OrderID: 10252, CustomerID: "SUPRD", EmployeeID: 4, OrderDate: new Date(8368506e5), ShipName: "Ernst Handel", ShipCity: "Charleroi", ShipAddress: "Boulevard Tirou, 255", ShipRegion: null, ShipPostalCode: "B-6000", ShipCountry: "Belgium", Freight: 51.3, Verified: !0
  }, {
    OrderID: 10253, CustomerID: "HANAR", EmployeeID: 3, OrderDate: new Date(836937e6), ShipName: "Hanari Carnes", ShipCity: "Rio de Janeiro", ShipAddress: "Rua do Paco, 67", ShipRegion: "RJ", ShipPostalCode: "05454-876", ShipCountry: "Brazil", Freight: 58.17, Verified: !0
  }, {
    OrderID: 10254, CustomerID: "CHOPS", EmployeeID: 5, OrderDate: new Date(8370234e5), ShipName: "Chop suey Chinese", ShipCity: "Bern", ShipAddress: "Hauptstr. 31", ShipRegion: null, ShipPostalCode: "3012", ShipCountry: "Switzerland", Freight: 22.98, Verified: !1
  }, {
    OrderID: 10255, CustomerID: "RICSU", EmployeeID: 9, OrderDate: new Date(8371098e5), ShipName: "Richter Supermarkt", ShipCity: "Albuquerque", ShipAddress: "Starenweg 5", ShipRegion: null, ShipPostalCode: "1204", ShipCountry: "Switzerland", Freight: 148.33, Verified: !0
  }, {
    OrderID: 10256, CustomerID: "WELLI", EmployeeID: 3, OrderDate: new Date(837369e6), ShipName: "Wellington Importadora", ShipCity: "Resende", ShipAddress: "Rua do Mercado, 12", ShipRegion: "SP", ShipPostalCode: "08737-363", ShipCountry: "Brazil", Freight: 13.97, Verified: !1
  }, {
    OrderID: 10257, CustomerID: "HILAA", EmployeeID: 4, OrderDate: new Date(8374554e5), ShipName: "HILARION-Abastos", ShipCity: "Strasbourg", ShipAddress: "Carrera 22 con Ave. Carlos Soublette #8-35", ShipRegion: "NM", ShipPostalCode: "5022", ShipCountry: "Venezuela", Freight: 81.91, Verified: !0
  }, {
    OrderID: 10258, CustomerID: "ERNSH", EmployeeID: 1, OrderDate: new Date(8375418e5), ShipName: "Ernst Handel", ShipCity: "Graz", ShipAddress: "Kirchgasse 6", ShipRegion: null, ShipPostalCode: "8010", ShipCountry: "Austria", Freight: 140.51, Verified: !0
  }, {
    OrderID: 10259, CustomerID: "WARTH", EmployeeID: 3, OrderDate: new Date(8383194e5), ShipName: "Wartian Herkku", ShipCity: "Oulu", ShipAddress: "Torikatu 38", ShipRegion: null, ShipPostalCode: "90110", ShipCountry: "Finland", Freight: 25.73, Verified: !1
  }, {
    OrderID: 10260, CustomerID: "ROMEY", EmployeeID: 4, OrderDate: new Date(839961e6), ShipName: "Romero y tomillo", ShipCity: "Madrid", ShipAddress: "Magazinweg 7", ShipRegion: null, ShipPostalCode: "28001", ShipCountry: "Spain", Freight: 2.94, Verified: !1
  }, {
    OrderID: 10261, CustomerID: "QUEDE", EmployeeID: 4, OrderDate: new Date(8377146e5), ShipName: "Vins et alcools Chevalier", ShipCity: "Rio de Janeiro", ShipAddress: "Rua da Panificadora, 12", ShipRegion: "RJ", ShipPostalCode: "02389-673", ShipCountry: "Brazil", Freight: 3.05, Verified: !1
  }, {
    OrderID: 10262, CustomerID: "RATTC", EmployeeID: 8, OrderDate: new Date(8379738e5), ShipName: "Rattlesnake Canyon Grocery", ShipCity: "Albuquerque", ShipAddress: "2817 Milton Dr.", ShipRegion: "NM", ShipPostalCode: "87110", ShipCountry: "USA", Freight: 48.29, Verified: !0
  }, {
    OrderID: 10263, CustomerID: "ERNSH", EmployeeID: 9, OrderDate: new Date(8380602e5), ShipName: "Ernst Handel", ShipCity: "Graz", ShipAddress: "Kirchgasse 6", ShipRegion: null, ShipPostalCode: "8010", ShipCountry: "Austria", Freight: 146.06, Verified: !0
  }, {
    OrderID: 10264, CustomerID: "FOLKO", EmployeeID: 6, OrderDate: new Date(8381466e5), ShipName: "LILA-Supermercado", ShipCity: "Tsawassen", ShipAddress: "23 Tsawassen Blvd.", ShipRegion: null, ShipPostalCode: "S-844 67", ShipCountry: "Sweden", Freight: 3.67, Verified: !1
  }, {
    OrderID: 10265, CustomerID: "BLONP", EmployeeID: 2, OrderDate: new Date(838233e6), ShipName: "Magazzini Alimentari Riuniti", ShipCity: "Strasbourg", ShipAddress: "Avda. Azteca 123", ShipRegion: null, ShipPostalCode: "67000", ShipCountry: "France", Freight: 55.28, Verified: !0
  }, {
    OrderID: 10267, CustomerID: "FRANK", EmployeeID: 4, OrderDate: new Date(8385786e5), ShipName: "Frankenversand", ShipCity: "Leipzig", ShipAddress: "Berliner Platz 43", ShipRegion: null, ShipPostalCode: "80805", ShipCountry: "Germany", Freight: 208.58, Verified: !0
  }, {
    OrderID: 10268, CustomerID: "GROSR", EmployeeID: 8, OrderDate: new Date(838665e6), ShipName: "GROSELLA-Restaurante", ShipCity: "Caracas", ShipAddress: "Avda. Azteca 123", ShipRegion: "DF", ShipPostalCode: "1081", ShipCountry: "Venezuela", Freight: 66.29, Verified: !0
  }, {
    OrderID: 10269, CustomerID: "WHITC", EmployeeID: 5, OrderDate: new Date(8387514e5), ShipName: "White Clover Markets", ShipCity: "Seattle", ShipAddress: "1029 - 12th Ave. S.", ShipRegion: "WA", ShipPostalCode: "98124", ShipCountry: "USA", Freight: 4.56, Verified: !1
  }, {
    OrderID: 10270, CustomerID: "WARTH", EmployeeID: 1, OrderDate: new Date(8388378e5), ShipName: "Wartian Herkku", ShipCity: "Oulu", ShipAddress: "Torikatu 38", ShipRegion: null, ShipPostalCode: "90110", ShipCountry: "Finland", Freight: 136.54, Verified: !0
  }, {
    OrderID: 10271, CustomerID: "SPLIR", EmployeeID: 6, OrderDate: new Date(8388378e5), ShipName: "Split Rail Beer & Ale", ShipCity: "Lander", ShipAddress: "P.O. Box 555", ShipRegion: "WY", ShipPostalCode: "82520", ShipCountry: "USA", Freight: 4.54, Verified: !1
  }, {
    OrderID: 10272, CustomerID: "RATTC", EmployeeID: 6, OrderDate: new Date(8389242e5), ShipName: "Rattlesnake Canyon Grocery", ShipCity: "Albuquerque", ShipAddress: "2817 Milton Dr.", ShipRegion: "NM", ShipPostalCode: "87110", ShipCountry: "USA", Freight: 98.03, Verified: !0
  }, {
    OrderID: 10273, CustomerID: "QUICK", EmployeeID: 3, OrderDate: new Date(8391834e5), ShipName: "QUICK-Stop", ShipCity: "Cunewalde", ShipAddress: "Av. Copacabana, 267", ShipRegion: null, ShipPostalCode: "01307", ShipCountry: "Germany", Freight: 76.07, Verified: !0
  }, {
    OrderID: 10274, CustomerID: "VINET", EmployeeID: 6, OrderDate: new Date(8392698e5), ShipName: "Vins et alcools Chevalier", ShipCity: "Reims", ShipAddress: "59 rue de Abbaye", ShipRegion: null, ShipPostalCode: "51100", ShipCountry: "France", Freight: 6.01, Verified: !1
  }, {
    OrderID: 10275, CustomerID: "MAGAA", EmployeeID: 1, OrderDate: new Date(8393562e5), ShipName: "Magazzini Alimentari Riuniti", ShipCity: "Bergamo", ShipAddress: "Via Ludovico il Moro 22", ShipRegion: null, ShipPostalCode: "24100", ShipCountry: "Italy", Freight: 26.93, Verified: !1
  }], window.employeeView = [{
    EmployeeID: 1,
    LastName: "Davolio",
    FirstName: "Nancy",
    Title: "Sales Representative",
    TitleOfCourtesy: "Ms.",
    BirthDate: new Date(-6647328e5),
    HireDate: new Date(7047036e5),
    Address: "507 - 20th Ave. E.\r\nApt. 2A",
    City: "Seattle",
    Region: "WA",
    PostalCode: "98122",
    Country: "USA",
    HomePhone: "(206) 555-9857",
    Extension: "5467",
    Photo: {
      Length: 21626
    },
    Notes: 'Education includes a BA in psychology from Colorado State University in 1970.  She also completed "The Art of the Cold Call."  Nancy is a member of Toastmasters International.',
    ReportsTo: 2,
    PhotoPath: "http://accweb/emmployees/davolio.bmp"
  }, {
    EmployeeID: 2,
    LastName: "Fuller",
    FirstName: "Andrew",
    Title: "Vice President, Sales",
    TitleOfCourtesy: "Dr.",
    BirthDate: new Date(-5638176e5),
    HireDate: new Date(7137756e5),
    Address: "908 W. Capital Way",
    City: "Tacoma",
    Region: "WA",
    PostalCode: "98401",
    Country: "USA",
    HomePhone: "(206) 555-9482",
    Extension: "3457",
    Photo: {
      Length: 21626
    },
    Notes: "Andrew received his BTS commercial in 1974 and a Ph.D. in international marketing from the University of Dallas in 1981.  He is fluent in French and Italian and reads German.  He joined the company as a sales representative, was promoted to sales manager in January 1992 and to vice president of sales in March 1993.  Andrew is a member of the Sales Management Roundtable, the Seattle Chamber of Commerce, and the Pacific Rim Importers Association.",
    ReportsTo: null,
    PhotoPath: "http://accweb/emmployees/fuller.bmp"
  }, {
    EmployeeID: 3,
    LastName: "Leverling",
    FirstName: "Janet",
    Title: "Sales Representative",
    TitleOfCourtesy: "Ms.",
    BirthDate: new Date(-2000772e5),
    HireDate: new Date(7021152e5),
    Address: "722 Moss Bay Blvd.",
    City: "Kirkland",
    Region: "WA",
    PostalCode: "98033",
    Country: "USA",
    HomePhone: "(206) 555-3412",
    Extension: "3355",
    Photo: {
      Length: 21722
    },

    Notes: "Janet has a BS degree in chemistry from Boston College (1984).  She has also completed a certificate program in food retailing management.  Janet was hired as a sales associate in 1991 and promoted to sales representative in February 1992.",
    ReportsTo: 2,
    PhotoPath: "http://accweb/emmployees/leverling.bmp"
  }, {
    EmployeeID: 4,
    LastName: "Peacock",
    FirstName: "Margaret",
    Title: "Sales Representative",
    TitleOfCourtesy: "Mrs.",
    BirthDate: new Date(-10188036e5),
    HireDate: new Date(7364124e5),
    Address: "4110 Old Redmond Rd.",
    City: "Redmond",
    Region: "WA",
    PostalCode: "98052",
    Country: "USA",
    HomePhone: "(206) 555-8122",
    Extension: "5176",
    Photo: {
      Length: 21626
    },

    Notes: "Margaret holds a BA in English literature from Concordia College (1958) and an MA from the American Institute of Culinary Arts (1966).  She was assigned to the London office temporarily from July through November 1992.",
    ReportsTo: 2,
    PhotoPath: "http://accweb/emmployees/peacock.bmp"
  }, {
    EmployeeID: 5,
    LastName: "Buchanan",
    FirstName: "Steven",
    Title: "Sales Manager",
    TitleOfCourtesy: "Mr.",
    BirthDate: new Date(-468e9),
    HireDate: new Date(7508412e5),
    Address: "14 Garrett Hill",
    City: "London",
    Region: null,
    PostalCode: "SW1 8JR",
    Country: "UK",
    HomePhone: "(71) 555-4848",
    Extension: "3453",
    Photo: {
      Length: 21626
    },

    Notes: 'Steven Buchanan graduated from St. Andrews University, Scotland, with a BSC degree in 1976.  Upon joining the company as a sales representative in 1992, he spent 6 months in an orientation program at the Seattle office and then returned to his permanent post in London.  He was promoted to sales manager in March 1993.  Mr. Buchanan has completed the courses "Successful Telemarketing" and "International Sales Management."  He is fluent in French.',
    ReportsTo: 2,
    PhotoPath: "http://accweb/emmployees/buchanan.bmp"
  }, {
    EmployeeID: 6,
    LastName: "Suyama",
    FirstName: "Michael",
    Title: "Sales Representative",
    TitleOfCourtesy: "Mr.",
    BirthDate: new Date(-2051748e5),
    HireDate: new Date(7508412e5),
    Address: "Coventry House\r\nMiner Rd.",
    City: "London",
    Region: null,
    PostalCode: "EC2 7JR",
    Country: "UK",
    HomePhone: "(71) 555-7773",
    Extension: "428",
    Photo: {
      Length: 21626
    },

    Notes: 'Michael is a graduate of Sussex University (MA, economics, 1983) and the University of California at Los Angeles (MBA, marketing, 1986).  He has also taken the courses "Multi-Cultural Selling" and "Time Management for the Sales Professional."  He is fluent in Japanese and can read and write French, Portuguese, and Spanish.',
    ReportsTo: 5,
    PhotoPath: "http://accweb/emmployees/davolio.bmp"
  }, {
    EmployeeID: 7,
    LastName: "King",
    FirstName: "Robert",
    Title: "Sales Representative",
    TitleOfCourtesy: "Mr.",
    BirthDate: new Date(-3027204e5),
    HireDate: new Date(7574976e5),
    Address: "Edgeham Hollow\r\nWinchester Way",
    City: "London",
    Region: null,
    PostalCode: "RG1 9SP",
    Country: "UK",
    HomePhone: "(71) 555-5598",
    Extension: "465",
    Photo: {
      Length: 21626
    },

    Notes: 'Robert King served in the Peace Corps and traveled extensively before completing his degree in English at the University of Michigan in 1992, the year he joined the company.  After completing a course entitled "Selling in Europe," he was transferred to the London office in March 1993.',
    ReportsTo: 5,
    PhotoPath: "http://accweb/emmployees/davolio.bmp"
  }, {
    EmployeeID: 8,
    LastName: "Callahan",
    FirstName: "Laura",
    Title: "Inside Sales Coordinator",
    TitleOfCourtesy: "Ms.",
    BirthDate: new Date(-3779712e5),
    HireDate: new Date(7628544e5),
    Address: "4726 - 11th Ave. N.E.",
    City: "Seattle",
    Region: "WA",
    PostalCode: "98105",
    Country: "USA",
    HomePhone: "(206) 555-1189",
    Extension: "2344",
    Photo: {
      Length: 21626
    },

    Notes: "Laura received a BA in psychology from the University of Washington.  She has also completed a course in business French.  She reads and writes French.",
    ReportsTo: 2,
    PhotoPath: "http://accweb/emmployees/davolio.bmp"
  }, {
    EmployeeID: 9,
    LastName: "Dodsworth",
    FirstName: "Anne",
    Title: "Sales Representative",
    TitleOfCourtesy: "Ms.",
    BirthDate: new Date(-1239552e5),
    HireDate: new Date(7848864e5),
    Address: "7 Houndstooth Rd.",
    City: "London",
    Region: null,
    PostalCode: "WG2 7LT",
    Country: "UK",
    HomePhone: "(71) 555-4444",
    Extension: "452",
    Photo: {
      Length: 21626
    },

    Notes: "Anne has a BA degree in English from St. Lawrence College.  She is fluent in French and German.",
    ReportsTo: 5,
    PhotoPath: "http://accweb/emmployees/davolio.bmp"
  }], window.ordersView = [{
    OrderID: 10280, CustomerID: "BERGS", EmployeeID: 2, OrderDate: new Date(840006e6), RequiredDate: new Date(8424252e5), ShippedDate: new Date(8425116e5), ShipVia: 1, Freight: 8.98, ShipName: "Consolidated Holdings", ShipAddress: "Berguvsvagen  8", ShipCity: "London", ShipRegion: null, ShipPostalCode: "S-958 22", ShipCountry: "Sweden", CompanyName: "Consolidated Holdings", Address: "Berkeley Gardens 12  Brewery", City: "Buenos Aires", Region: null, PostalCode: "S-958 22", Country: "Sweden"
  }, {
    OrderID: 10265, CustomerID: "BLONP", EmployeeID: 2, OrderDate: new Date(838278e6), RequiredDate: new Date(8406972e5), ShippedDate: new Date(8398332e5), ShipVia: 1, Freight: 55.28, ShipName: "Du monde entier", ShipAddress: "24, place Kleber", ShipCity: "Strasbourg", ShipRegion: null, ShipPostalCode: "67000", ShipCountry: "France", CompanyName: "Du monde entier", Address: "Cerrito 333", City: "Strasbourg", Region: null, PostalCode: "67000", Country: "France"
  }, {
    OrderID: 10663, CustomerID: "BONAP", EmployeeID: 2, OrderDate: new Date(8738748e5), RequiredDate: new Date(8750844e5), ShippedDate: new Date(875862e6), ShipVia: 2, Freight: 113.15, ShipName: "Bon app'", ShipAddress: "12, rue des Bouchers", ShipCity: "Marseille", ShipRegion: null, ShipPostalCode: "13008", ShipCountry: "France", CompanyName: "Bon app'", Address: "12, rue des Bouchers", City: "Marseille", Region: null, PostalCode: "13008", Country: "France"
  }, {
    OrderID: 10949, CustomerID: "BOTTM", EmployeeID: 2, OrderDate: new Date(889776e6), RequiredDate: new Date(8921916e5), ShippedDate: new Date(8901216e5), ShipVia: 3, Freight: 74.44, ShipName: "Bottom-Dollar Markets", ShipAddress: "23 Tsawassen Blvd.", ShipCity: "Tsawassen", ShipRegion: "BC", ShipPostalCode: "T2F 8M4", ShipCountry: "Canada", CompanyName: "Bottom-Dollar Markets", Address: "23 Tsawassen Blvd.", City: "Tsawassen", Region: "BC", PostalCode: "T2F 8M4", Country: "Canada"
  }, {
    OrderID: 10982, CustomerID: "BOTTM", EmployeeID: 2, OrderDate: new Date(8909856e5), RequiredDate: new Date(8934012e5), ShippedDate: new Date(8920188e5), ShipVia: 1, Freight: 14.01, ShipName: "Bottom-Dollar Markets", ShipAddress: "23 Tsawassen Blvd.", ShipCity: "Tsawassen", ShipRegion: "BC", ShipPostalCode: "T2F 8M4", ShipCountry: "Canada", CompanyName: "Bottom-Dollar Markets", Address: "23 Tsawassen Blvd.", City: "Tsawassen", Region: "BC", PostalCode: "T2F 8M4", Country: "Canada"
  }, {
    OrderID: 10471, CustomerID: "BSBEV", EmployeeID: 2, OrderDate: new Date(8580672e5), RequiredDate: new Date(8604828e5), ShippedDate: new Date(858672e6), ShipVia: 3, Freight: 45.59, ShipName: "B's Beverages", ShipAddress: "Fauntleroy Circus", ShipCity: "London", ShipRegion: null, ShipPostalCode: "EC2 5NT", ShipCountry: "UK", CompanyName: "B's Beverages", Address: "Fauntleroy Circus", City: "London", Region: null, PostalCode: "EC2 5NT", Country: "UK"
  }, {
    OrderID: 10819, CustomerID: "CACTU", EmployeeID: 2, OrderDate: new Date(88416e7), RequiredDate: new Date(8865792e5), ShippedDate: new Date(8849376e5), ShipVia: 3, Freight: 19.76, ShipName: "Cactus Comidas para llevar", ShipAddress: "Cerrito 333", ShipCity: "Buenos Aires", ShipRegion: null, ShipPostalCode: "1010", ShipCountry: "Argentina", CompanyName: "Cactus Comidas para llevar", Address: "Cerrito 333", City: "Buenos Aires", Region: null, PostalCode: "1010", Country: "Argentina"
  }, {
    OrderID: 11042, CustomerID: "COMMI", EmployeeID: 2, OrderDate: new Date(8932284e5), RequiredDate: new Date(894438e6), ShippedDate: new Date(894006e6), ShipVia: 1, Freight: 29.99, ShipName: "Comercio Mineiro", ShipAddress: "Av. dos Lusiadas, 23", ShipCity: "Sao Paulo", ShipRegion: "SP", ShipPostalCode: "05432-043", ShipCountry: "Brazil", CompanyName: "Comercio Mineiro", Address: "Mataderos  2312", City: "Sao Paulo", Region: "SP", PostalCode: "05432-043", Country: "Brazil"
  }, {
    OrderID: 10462, CustomerID: "CONSH", EmployeeID: 2, OrderDate: new Date(857376e6), RequiredDate: new Date(8597952e5), ShippedDate: new Date(858672e6), ShipVia: 1, Freight: 6.17, ShipName: "Consolidated Holdings", ShipAddress: "Berkeley Gardens 12  Brewery", ShipCity: "London", ShipRegion: null, ShipPostalCode: "WX1 6LT", ShipCountry: "UK", CompanyName: "Consolidated Holdings", Address: "Berkeley Gardens 12  Brewery", City: "London", Region: null, PostalCode: "WX1 6LT", Country: "UK"
  }, {
    OrderID: 10683, CustomerID: "DUMON", EmployeeID: 2, OrderDate: new Date(8752572e5), RequiredDate: new Date(8776764e5), ShippedDate: new Date(8756892e5), ShipVia: 1, Freight: 4.4, ShipName: "Du monde entier", ShipAddress: "67, rue des Cinquante Otages", ShipCity: "Nantes", ShipRegion: null, ShipPostalCode: "44000", ShipCountry: "France", CompanyName: "Du monde entier", Address: "67, rue des Cinquante Otages", City: "Nantes", Region: null, PostalCode: "44000", Country: "France"
  }, {
    OrderID: 10595, CustomerID: "ERNSH", EmployeeID: 2, OrderDate: new Date(868518e6), RequiredDate: new Date(8709372e5), ShippedDate: new Date(8688636e5), ShipVia: 1, Freight: 96.78, ShipName: "Ernst Handel", ShipAddress: "Kirchgasse 6", ShipCity: "Graz", ShipRegion: null, ShipPostalCode: "8010", ShipCountry: "Austria", CompanyName: "Ernst Handel", Address: "Kirchgasse 6", City: "Graz", Region: null, PostalCode: "8010", Country: "Austria"
  }, {
    OrderID: 10368, CustomerID: "ERNSH", EmployeeID: 2, OrderDate: new Date(8492544e5), RequiredDate: new Date(8516736e5), ShippedDate: new Date(8495136e5), ShipVia: 2, Freight: 101.95, ShipName: "Ernst Handel", ShipAddress: "Kirchgasse 6", ShipCity: "Graz", ShipRegion: null, ShipPostalCode: "8010", ShipCountry: "Austria", CompanyName: "Ernst Handel", Address: "Kirchgasse 6", City: "Graz", Region: null, PostalCode: "8010", Country: "Austria"
  }, {
    OrderID: 10835, CustomerID: "ALFKI", EmployeeID: 1, OrderDate: new Date(8848512e5), RequiredDate: new Date(8872704e5), ShippedDate: new Date(8853696e5), ShipVia: 3, Freight: 69.53, ShipName: "Alfred's Futterkiste", ShipAddress: "Obere Str. 57", ShipCity: "Berlin", ShipRegion: null, ShipPostalCode: "12209", ShipCountry: "Germany", CompanyName: "Alfreds Futterkiste", Address: "Obere Str. 57", City: "Berlin", Region: null, PostalCode: "12209", Country: "Germany"
  }, {
    OrderID: 10952, CustomerID: "ALFKI", EmployeeID: 1, OrderDate: new Date(8900352e5), RequiredDate: new Date(8936604e5), ShippedDate: new Date(8907264e5), ShipVia: 1, Freight: 40.42, ShipName: "Alfred's Futterkiste", ShipAddress: "Obere Str. 57", ShipCity: "Berlin", ShipRegion: null, ShipPostalCode: "12209", ShipCountry: "Germany", CompanyName: "Alfreds Futterkiste", Address: "Obere Str. 57", City: "Berlin", Region: null, PostalCode: "12209", Country: "Germany"
  }, {
    OrderID: 10677, CustomerID: "ANTON", EmployeeID: 1, OrderDate: new Date(8749116e5), RequiredDate: new Date(8773308e5), ShippedDate: new Date(8752572e5), ShipVia: 3, Freight: 4.03, ShipName: "Antonio Moreno Taqueria", ShipAddress: "Mataderos  2312", ShipCity: "Mexico D.F.", ShipRegion: null, ShipPostalCode: "05023", ShipCountry: "Mexico", CompanyName: "Antonio Moreno Taqueria", Address: "Mataderos  2312", City: "Mexico D.F.", Region: null, PostalCode: "05023", Country: "Mexico"
  }, {
    OrderID: 10558, CustomerID: "AROUT", EmployeeID: 1, OrderDate: new Date(8654076e5), RequiredDate: new Date(8678268e5), ShippedDate: new Date(865926e6), ShipVia: 2, Freight: 72.97, ShipName: "Around the Horn", ShipAddress: "Brook Farm Stratford St. Mary", ShipCity: "Colchester", ShipRegion: "Essex", ShipPostalCode: "CO7 6JX", ShipCountry: "UK", CompanyName: "Around the Horn", Address: "120 Hanover Sq.", City: "London", Region: null, PostalCode: "WA1 1DP", Country: "UK"
  }, {
    OrderID: 10453, CustomerID: "AROUT", EmployeeID: 1, OrderDate: new Date(856512e6), RequiredDate: new Date(8589312e5), ShippedDate: new Date(856944e6), ShipVia: 2, Freight: 25.36, ShipName: "Around the Horn", ShipAddress: "Brook Farm Stratford St. Mary", ShipCity: "Colchester", ShipRegion: "Essex", ShipPostalCode: "CO7 6JX", ShipCountry: "UK", CompanyName: "Around the Horn", Address: "120 Hanover Sq.", City: "London", Region: null, PostalCode: "WA1 1DP", Country: "UK"
  }, {
    OrderID: 10743, CustomerID: "AROUT", EmployeeID: 1, OrderDate: new Date(8797536e5), RequiredDate: new Date(8821728e5), ShippedDate: new Date(8800992e5), ShipVia: 2, Freight: 23.72, ShipName: "Around the Horn", ShipAddress: "Brook Farm Stratford St. Mary", ShipCity: "Colchester", ShipRegion: "Essex", ShipPostalCode: "CO7 6JX", ShipCountry: "UK", CompanyName: "Around the Horn", Address: "120 Hanover Sq.", City: "London", Region: null, PostalCode: "WA1 1DP", Country: "UK"
  }, {
    OrderID: 10733, CustomerID: "BERGS", EmployeeID: 1, OrderDate: new Date(8788896e5), RequiredDate: new Date(8813088e5), ShippedDate: new Date(8791488e5), ShipVia: 3, Freight: 110.11, ShipName: "Berglunds snabbkop", ShipAddress: "Berguvsvagen  8", ShipCity: "Lulea", ShipRegion: null, ShipPostalCode: "S-958 22", ShipCountry: "Sweden", CompanyName: "Berglunds snabbkop", Address: "Berguvsvagen  8", City: "Lulea", Region: null, PostalCode: "S-958 22", Country: "Sweden"
  }, {
    OrderID: 10524, CustomerID: "BERGS", EmployeeID: 1, OrderDate: new Date(86247e7), RequiredDate: new Date(8648892e5), ShippedDate: new Date(8629884e5), ShipVia: 2, Freight: 244.79, ShipName: "Berglunds snabbkop", ShipAddress: "Berguvsvagen  8", ShipCity: "Lulea", ShipRegion: null, ShipPostalCode: "S-958 22", ShipCountry: "Sweden", CompanyName: "Berglunds snabbkop", Address: "Berguvsvagen  8", City: "Lulea", Region: null, PostalCode: "S-958 22", Country: "Sweden"
  }, {
    OrderID: 10626, CustomerID: "BERGS", EmployeeID: 1, OrderDate: new Date(8712828e5), RequiredDate: new Date(873702e6), ShippedDate: new Date(8720604e5), ShipVia: 2, Freight: 138.69, ShipName: "Berglunds snabbkop", ShipAddress: "Berguvsvagen  8", ShipCity: "Lulea", ShipRegion: null, ShipPostalCode: "S-958 22", ShipCountry: "Sweden", CompanyName: "Berglunds snabbkop", Address: "Berguvsvagen  8", City: "Lulea", Region: null, PostalCode: "S-958 22", Country: "Sweden"
  }, {
    OrderID: 10689, CustomerID: "BERGS", EmployeeID: 1, OrderDate: new Date(8756892e5), RequiredDate: new Date(878112e6), ShippedDate: new Date(8762076e5), ShipVia: 2, Freight: 13.42, ShipName: "Berglunds snabbkop", ShipAddress: "Berguvsvagen  8", ShipCity: "Lulea", ShipRegion: null, ShipPostalCode: "S-958 22", ShipCountry: "Sweden", CompanyName: "Berglunds snabbkop", Address: "Berguvsvagen  8", City: "Lulea", Region: null, PostalCode: "S-958 22", Country: "Sweden"
  }, {
    OrderID: 10525, CustomerID: "BONAP", EmployeeID: 1, OrderDate: new Date(8625564e5), RequiredDate: new Date(8649756e5), ShippedDate: new Date(8643708e5), ShipVia: 2, Freight: 11.06, ShipName: "Bon app'", ShipAddress: "12, rue des Bouchers", ShipCity: "Marseille", ShipRegion: null, ShipPostalCode: "13008", ShipCountry: "France", CompanyName: "Bon app'", Address: "12, rue des Bouchers", City: "Marseille", Region: null, PostalCode: "13008", Country: "France"
  }];
});
define('main',['exports', './environment', 'bootstrap', 'ejButton', 'ejCheckBox'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('syncfusionDreamFactoryAdapter',[], function () {
  "use strict";

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var syncfusiondmSymbols = {};
  syncfusiondmSymbols.operatorSymbols = {
    "=": "equal",
    "is not null": "notnull",
    "is null": "isnull",
    "is not in": "notin",
    "is in": "in"
  };

  ej.data.fnOperators.like = function (actual, expected, ignoreCase) {
    if (ignoreCase) return actual && "LIKE" && expected;

    return actual > expected;
  };
  ej.data.fnOperators.notin = function (actual, expected, ignoreCase) {
    if (ignoreCase) return actual && "NOT IN " && expected;

    return actual > expected;
  };

  ej.data.fnOperators.in = function (actual, expected, ignoreCase) {
    if (ignoreCase) return actual && "IN" && expected;

    return actual > expected;
  };

  $.extend(ej.data.operatorSymbols, syncfusiondmSymbols.operatorSymbols);

  var syncfusionDreamFactoryAdapter = new ej.ODataAdaptor().extend({
    options: {
      from: "table",
      requestType: "json",
      sortBy: "order",
      select: "fields",
      skip: "skip",
      group: "group",
      take: "limit",
      search: "search",
      count: "count",
      where: "filter",
      aggregates: "aggregates"
    },
    dreamFactoryodBiOperator: {
      "<": " < ",
      ">": " > ",
      "<=": " <= ",
      ">=": " >= ",
      "==": " = ",
      "=": " = ",
      "!=": " != ",
      "lessthan": " < ",
      "lessthanorequal": " <= ",
      "greaterthan": " > ",
      "greaterthanorequal": " >= ",
      "equal": " = ",
      "notequal": " != ",
      "like": " LIKE ",
      "notnull": " IS NOT NULL ",
      "isnull": " IS NULL",
      "IS NOT NULL": " IS NOT NULL ",
      "IS NULL": " IS NULL ",
      "contains": " CONTAINS ",
      "endswith": " ENDS WITH ",
      "startswith": " STARTS WITH "
    },
    dreamFactoryUniOperator: {
      "in": " IN ",
      "notin": " NOT IN ",
      "IS NOT IN": " IS NOT IN ",
      "IS IN": " IS IN "
    },
    onPredicate: function onPredicate(pred, query, requiresCast) {
      var returnValue = "",
          operator,
          guid,
          val = pred.value,
          type = typeof val === "undefined" ? "undefined" : _typeof(val),
          field = this._p(pred.field);

      if (val instanceof Date) {
        val = "datetime'" + p.replacer(val).toJSON() + "'";
      }

      operator = this.dreamFactoryodBiOperator[pred.operator];
      if (operator) {
        returnValue += field;
        returnValue += operator;
        if (guid) returnValue += guid;
        return returnValue + val;
      }

      operator = this.dreamFactoryUniOperator[pred.operator];

      if (!operator || type !== "string") return "";

      returnValue += field;
      returnValue += operator + "(";

      if (guid) returnValue += guid;
      returnValue += val + ")";

      return returnValue;
    },
    processResponse: function processResponse(data, ds, query, xhr, request, changes) {

      var count = null,
          aggregateResult = {};

      if (query && query._requiresCount) {
        if (data.meta) count = data.meta.count;
      }

      data = data.resource;
      return isNull(count) ? data : { result: data, count: count };
    },
    onCount: function onCount(e) {
      return e === true ? true : "";
    },
    beforeSend: function beforeSend(dm, request, settings) {

      var table = "",
          count = "",
          data = ej.parseJSON(settings.data);

      if (data.table) table = data.table;
      if (data.count === true) {
        delete data.count;
        count = 'include_count=true';
      }
      settings.contentType = "application/json; charset=utf-8";
      settings.url = settings.url + table + '?method=GET&' + count + '';

      delete data.params;
      delete data.requiresCounts;
      settings.data = JSON.stringify(data);
    }

  });

  var isNull = function isNull(val) {
    return val === undefined || val === null;
  };
});
define('testadapter',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var TestAdapter = exports.TestAdapter = function () {
    function TestAdapter() {
      _classCallCheck(this, TestAdapter);
    }

    TestAdapter.getadapter = function getadapter() {
      var syncfusiondmSymbols = {};
      syncfusiondmSymbols.operatorSymbols = {
        "=": "equal",
        "is not null": "notnull",
        "is null": "isnull",
        "is not in": "notin",
        "is in": "in"
      };

      ej.data.fnOperators.like = function (actual, expected, ignoreCase) {
        if (ignoreCase) return actual && "LIKE" && expected;

        return actual > expected;
      };
      ej.data.fnOperators.notin = function (actual, expected, ignoreCase) {
        if (ignoreCase) return actual && "NOT IN " && expected;

        return actual > expected;
      };

      ej.data.fnOperators.in = function (actual, expected, ignoreCase) {
        if (ignoreCase) return actual && "IN" && expected;

        return actual > expected;
      };

      $.extend(ej.data.operatorSymbols, syncfusiondmSymbols.operatorSymbols);
      var isNull = function isNull(val) {
        return val === undefined || val === null;
      };

      var syncfusionDreamFactoryAdapter = new ej.ODataAdaptor().extend({
        options: {
          from: "table",
          requestType: "json",
          sortBy: "order",
          select: "fields",
          skip: "skip",
          group: "group",
          take: "limit",
          search: "search",
          count: "count",
          where: "filter",
          aggregates: "aggregates"
        },
        dreamFactoryodBiOperator: {
          "<": " < ",
          ">": " > ",
          "<=": " <= ",
          ">=": " >= ",
          "==": " = ",
          "=": " = ",
          "!=": " != ",
          "lessthan": " < ",
          "lessthanorequal": " <= ",
          "greaterthan": " > ",
          "greaterthanorequal": " >= ",
          "equal": " = ",
          "notequal": " != ",
          "like": " LIKE ",
          "notnull": " IS NOT NULL ",
          "isnull": " IS NULL",
          "IS NOT NULL": " IS NOT NULL ",
          "IS NULL": " IS NULL ",
          "contains": " CONTAINS ",
          "endswith": " ENDS WITH ",
          "startswith": " STARTS WITH "
        },
        dreamFactoryUniOperator: {
          "in": " IN ",
          "notin": " NOT IN ",
          "IS NOT IN": " IS NOT IN ",
          "IS IN": " IS IN "
        },
        onPredicate: function onPredicate(pred, query, requiresCast) {
          var returnValue = "";

          var operator = void 0;
          var guid = void 0;
          var val = pred.value;
          var type = typeof val === "undefined" ? "undefined" : _typeof(val);
          var field = this._p(pred.field);

          if (val instanceof Date) {
            val = "datetime'" + p.replacer(val).toJSON() + "'";
          }

          operator = this.dreamFactoryodBiOperator[pred.operator];
          if (operator) {
            returnValue += field;
            returnValue += operator;
            if (guid) returnValue += guid;
            return returnValue + val;
          }

          operator = this.dreamFactoryUniOperator[pred.operator];

          if (!operator || type !== "string") return "";

          returnValue += field;
          returnValue += operator + "(";

          if (guid) returnValue += guid;
          returnValue += val + ")";

          return returnValue;
        },
        processResponse: function processResponse(data, ds, query, xhr, request, changes) {
          var count = null;
          var aggregateResult = {};

          if (query && query._requiresCount) {
            if (data.meta) count = data.meta.count;
          }

          data = data.resource;
          return isNull(count) ? data : { result: data, count: count };
        },
        onCount: function onCount(e) {
          return e === true ? true : "";
        },
        beforeSend: function beforeSend(dm, request, settings) {
          var table = "";
          var count = "";
          var data = ej.parseJSON(settings.data);

          if (data.table) table = data.table;
          if (data.count === true) {
            delete data.count;
            count = 'include_count=true';
          }
          settings.contentType = "application/json; charset=utf-8";
          settings.url = settings.url + table + "?method=GET&" + count;

          delete data.params;
          delete data.requiresCounts;
          settings.data = JSON.stringify(data);
        }
      });
      return syncfusionDreamFactoryAdapter;
    };

    return TestAdapter;
  }();
});
define('users',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Users = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function Users(http) {
      _classCallCheck(this, Users);

      this.heading = 'Github Users';
      this.users = [];

      http.configure(function (config) {
        config.useStandardConfiguration().withBaseUrl('https://api.github.com/');
      });

      this.http = http;
    }

    Users.prototype.activate = function activate() {
      var _this = this;

      return this.http.fetch('users').then(function (response) {
        return response.json();
      }).then(function (users) {
        return _this.users = users;
      });
    };

    return Users;
  }()) || _class);
});
define('utils',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Utils = exports.Utils = function () {
    function Utils() {
      _classCallCheck(this, Utils);
    }

    Utils.setToken = function setToken(key, value) {
      sessionStorage.setItem(key, value);
    };

    Utils.getToken = function getToken(key) {
      return sessionStorage.getItem(key);
    };

    Utils.prototype.removeToken = function removeToken(key) {
      $.api.logout(function (data) {
        if (data.success) {
          sessionStorage.removeItem(key);
        } else {
          var response = parseResponse(data);
          messageBox(response.code, response.message, response.error);
        }
      });
    };

    return Utils;
  }();
});
define('welcome',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Welcome = exports.Welcome = function () {
    function Welcome() {
      _classCallCheck(this, Welcome);

      this.heading = 'Welcome to the Aurelia Navigation App!';
      this.firstName = 'John';
      this.lastName = 'Doe';
      this.previousValue = this.fullName;
    }

    Welcome.prototype.submit = function submit() {
      this.previousValue = this.fullName;
      alert('Welcome, ' + this.fullName + '!');
    };

    Welcome.prototype.canDeactivate = function canDeactivate() {
      if (this.fullName !== this.previousValue) {
        return confirm('Are you sure you want to leave?');
      }
    };

    _createClass(Welcome, [{
      key: 'fullName',
      get: function get() {
        return this.firstName + ' ' + this.lastName;
      }
    }]);

    return Welcome;
  }();

  var UpperValueConverter = exports.UpperValueConverter = function () {
    function UpperValueConverter() {
      _classCallCheck(this, UpperValueConverter);
    }

    UpperValueConverter.prototype.toView = function toView(value) {
      return value && value.toUpperCase();
    };

    return UpperValueConverter;
  }();
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('common/widget-base',['exports', './events', '../common/util', '../common/decorators'], function (exports, _events, _util, _decorators) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.WidgetBase = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _class;

  var firstValue = {};
  var WidgetBase = exports.WidgetBase = (_dec = (0, _decorators.delayed)(), (_class = function () {
    function WidgetBase() {
      _classCallCheck(this, WidgetBase);
    }

    WidgetBase.prototype.createWidget = function createWidget(option) {
      var _this = this;

      this.allOption = this.getWidgetOptions(option.element);
      if (!this.ejOptions && !this.isEditor) {
        this.createTwoWays();
      }
      this.widget = jQuery($(option.element))[this.controlName](this.allOption).data(this.controlName);
      if (this.templateProcessor) {
        this.templateProcessor.initWidgetDependancies();
      }
      if (this.isEditor) {
        this.widget.model._change = function (evt) {
          if ('eValue' in _this) {
            _this[_this.util.getBindablePropertyName('value')] = evt.value;
          }
        };
      }
    };

    WidgetBase.prototype.createTwoWays = function createTwoWays() {
      var model = this.allOption;
      var twoWays = this.twoWays;
      var len = twoWays.length;
      for (var i = 0; i < len; i++) {
        var prop = twoWays[i];
        ej.createObject(prop, this.addTwoways(prop), model);
      }
    };

    WidgetBase.prototype.addTwoways = function addTwoways(prop) {
      var model = this;
      var value = firstValue;
      return function (newVal, isApp) {
        if (value === firstValue) {
          var viewModelProp = model.util.getBindablePropertyName(prop);
          value = model[viewModelProp];
          if (value === undefined) {
            value = this.defaults[prop];
          }
          return value;
        }
        if (newVal === undefined) {
          return value;
        }
        if (value === newVal) {
          return null;
        }
        value = newVal;
        if (!isApp && model.util.hasValue(newVal)) {
          var _viewModelProp = model.util.getBindablePropertyName(prop);
          model[_viewModelProp] = newVal;
        }
        return null;
      };
    };

    WidgetBase.prototype.getWidgetOptions = function getWidgetOptions(element) {
      var propOptions = void 0;
      if (this.ejOptions) {
        propOptions = this.ejOptions;
      } else {
        propOptions = this.util.getOptions(this, this.controlProperties);
      }
      var eventOption = (0, _events.getEventOption)(element);
      if (this.hasChildProperty) {
        this.getChildProperties(propOptions);
      }
      return Object.assign({}, propOptions, eventOption);
    };

    WidgetBase.prototype.getChildProperties = function getChildProperties(options) {
      var PropertyName = this.childPropertyName;
      var childCollection = this[PropertyName];
      var len = childCollection.length;
      if (len) {
        options[PropertyName] = [];
        var childProperties = childCollection[0].controlProperties;
        for (var i = 0; i < len; i++) {
          options[PropertyName].push(this.util.getOptions(childCollection[i], childProperties));
        }
      }
    };

    WidgetBase.prototype.attached = function attached() {
      if (this.templateProcessor) {
        this[this.childPropertyName].forEach(function (template) {
          return template.setTemplates();
        });
      }
      this.util = new _util.Util();
      this.createWidget({ element: this.element });
    };

    WidgetBase.prototype.propertyChanged = function propertyChanged(property, newValue, oldValue) {
      if (this.widget) {
        var modelValue = void 0;
        var prop = this.util.getControlPropertyName(this, property);
        if (prop) {
          if (prop !== 'options') {
            modelValue = this.widget.model[prop];
            var isTwoway = typeof modelValue === 'function';
            if (isTwoway) {
              modelValue = modelValue();
            }
            if (modelValue !== newValue) {
              if (isTwoway) {
                newValue = this.addTwoways(prop);
              }
              this.widget.option(prop, newValue);
            }
          } else {
            this.widget.option(newValue);
          }
        }
      }
    };

    WidgetBase.prototype.detached = function detached() {
      if (this.templateProcessor) {
        this.templateProcessor.clearTempalte();
      }
      if (this.widget) {
        this.widget.destroy();
      }
    };

    return WidgetBase;
  }(), (_applyDecoratedDescriptor(_class.prototype, 'attached', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'attached'), _class.prototype)), _class));
});
define('common/events',['exports', './util', 'aurelia-dependency-injection', './constants'], function (exports, _util, _aureliaDependencyInjection, _constants) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getEventOption = getEventOption;
  exports.fireEvent = fireEvent;
  function getEventOption(element) {
    var name = void 0;
    var attr = void 0;
    var attributes = element.attributes;
    var option = {};
    var container = _aureliaDependencyInjection.Container.instance || new _aureliaDependencyInjection.Container();
    var util = container.get(_util.Util);

    var _loop = function _loop(i, len) {
      attr = attributes[i];
      name = attr.name;
      if (!name.startsWith(_constants.constants.eventPrefix)) {
        return 'continue';
      }
      var actualEventName = name.split('.')[0];
      var eventName = util._unhyphenate(actualEventName.split(_constants.constants.eventPrefix)[1]);
      option[eventName] = function (e) {
        return fireEvent(element, actualEventName, e);
      };
    };

    for (var i = 0, len = attributes.length; i < len; i++) {
      var _ret = _loop(i, len);

      if (_ret === 'continue') continue;
    }
    return option;
  }
  function fireEvent(element, name) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var event = new CustomEvent(name, {
      detail: data,
      bubbles: true
    });
    element.dispatchEvent(event);
    return event;
  }
});
define('common/util',['exports', './constants'], function (exports, _constants) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Util = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Util = exports.Util = function () {
    function Util() {
      _classCallCheck(this, Util);
    }

    Util.prototype.getBindablePropertyName = function getBindablePropertyName(propertyName) {
      var name = '' + _constants.constants.bindablePrefix + propertyName;
      return this._unhyphenate(name);
    };

    Util.prototype._unhyphenate = function _unhyphenate(name) {
      return name.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });
    };

    Util.prototype.getOptions = function getOptions(model, properties) {
      var bindableproperites = {};
      var value = void 0;
      for (var _iterator = properties, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var prop = _ref;

        if (model.abbrevProperties && prop in model.abbrevProperties) {
          value = model[this.getBindablePropertyName(model.abbrevProperties[prop])];
        } else {
          value = model[this.getBindablePropertyName(prop)];
        }
        if (this.hasValue(value)) {
          if (typeof value === 'string') {
            value = this.processData(value);
          }
          bindableproperites[prop] = value;
        }
      }
      return bindableproperites;
    };

    Util.prototype.getControlPropertyName = function getControlPropertyName(options, propertyName) {
      var property = void 0;
      for (var _iterator2 = options.controlProperties, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var prop = _ref2;

        if (propertyName === this.getBindablePropertyName(prop)) {
          property = prop;
          break;
        }
      }
      return property;
    };

    Util.prototype.hasValue = function hasValue(prop) {
      return typeof prop !== 'undefined' && prop !== null;
    };

    Util.prototype.processData = function processData(value) {
      if (value === 'true') {
        return true;
      } else if (value === 'false') {
        return false;
      } else if (+value + '' === value) {
        return +value;
      }
      return value;
    };

    return Util;
  }();
});
define('common/constants',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var constants = exports.constants = {
    eventPrefix: 'e-on-',
    bindablePrefix: 'e-',
    attributePrefix: 'ej-',
    elementPrefix: 'ej-',
    aureliaTemplateString: '<template><slot></slot></template>'
  };
});
define('common/decorators',['exports', 'aurelia-templating', 'aurelia-dependency-injection', 'aurelia-metadata', 'aurelia-task-queue', './util'], function (exports, _aureliaTemplating, _aureliaDependencyInjection, _aureliaMetadata, _aureliaTaskQueue, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.generateBindables = generateBindables;
  exports.delayed = delayed;
  function generateBindables(controlName, inputs, twoWayProperties, abbrevProperties) {
    return function (target, key, descriptor) {
      var behaviorResource = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, _aureliaTemplating.HtmlBehaviorResource, target);
      var container = _aureliaDependencyInjection.Container.instance || new _aureliaDependencyInjection.Container();
      var util = container.get(_util.Util);
      inputs.push('options');
      var len = inputs.length;
      target.prototype.controlName = controlName;
      target.prototype.twoWays = twoWayProperties ? twoWayProperties : [];
      target.prototype.abbrevProperties = abbrevProperties ? abbrevProperties : [];
      if (len) {
        target.prototype.controlProperties = inputs;
        for (var i = 0; i < len; i++) {
          var option = inputs[i];
          if (abbrevProperties && option in abbrevProperties) {
            option = abbrevProperties[option];
          }
          var nameOrConfigOrTarget = {
            name: util.getBindablePropertyName(option)
          };
          var prop = new _aureliaTemplating.BindableProperty(nameOrConfigOrTarget);
          prop.registerWith(target, behaviorResource, descriptor);
        }
      }
    };
  }

  function delayed() {
    return function (target, key, descriptor) {
      var taskQueue = (_aureliaDependencyInjection.Container.instance || new _aureliaDependencyInjection.Container()).get(_aureliaTaskQueue.TaskQueue);
      var ptr = descriptor.value;

      descriptor.value = function () {
        var _this = this;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (this.childPropertyName) {
          taskQueue.queueTask(function () {
            return ptr.apply(_this, args);
          });
        } else {
          ptr.apply(this, args);
        }
      };

      return descriptor;
    };
  }
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"nav-bar.html\"></require>\n  <require from=\"styles/styles.css\"></require>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n   <nav-bar router.bind=\"router\"></nav-bar>\n  <div class=\"page-host\">\n    <router-view></router-view>\n  </div>\n</template>\n"; });
define('text!button-test.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"syncfusion/Content/ej/web/ej.widgets.core.min.css\"></require>\n  <require from=\"syncfusion/Content/ej/web/bootstrap-theme/ej.theme.min.css\"></require>\n\n  <div class=\"content-container-fluid\">\n    <div class=\"row\">\n      <div class=\"cols-sample-area\">\n        <div class=\"frame\">\n          <div class=\"control\">\n            <table>\n              <tr>\n                <th colspan=\"2\" style=\"padding-left:30px\"> Button </th>\n              </tr>\n              <tr>\n                <td> Normal</td>\n                <td class=\"btnsht\">\n                  <button id=\"button11\">login</button>\n                </td>\n              </tr>\n              <tr>\n                <td> Mini</td>\n                <td class=\"btnsht\">\n                  <button id=\"button21\">login</button>\n                </td>\n              </tr>\n\n              <tr>\n                <td> Small</td>\n                <td class=\"btnsht\">\n                  <button id=\"button31\">login</button>\n                </td>\n              </tr>\n              <tr>\n                <td> Medium</td>\n                <td class=\"btnsht\">\n                  <button id=\"button41\">login</button>\n                </td>\n              </tr>\n\n              <tr>\n                <td> Large</td>\n                <td class=\"btnsht\">\n                  <button id=\"button51\">login</button>\n                </td>\n              </tr>\n            </table>\n          </div>\n        </div>\n      </div>\n    </div>\n    <style>\n      .e-bgdefault:hover .e-buttondiv .e-icon.e-uiLight, .e-bgdefault:active .e-buttondiv .e-icon.e-uiLight {\n        background-image: url('../content/ejthemes/common-images/icons-white.png');\n      }\n      .control{\n        padding: 30px;\n      }\n      td{\n        padding:5px;\n      }\n      .frame{\n        padding: 0 20px;\n      }\n\n    </style>\n</template>\n"; });
define('text!child-router.html', ['module'], function(module) { module.exports = "<template>\n  <section class=\"au-animate\">\n    <h2>${heading}</h2>\n    <div>\n      <div class=\"col-md-2\">\n        <ul class=\"well nav nav-pills nav-stacked\">\n          <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n            <a href.bind=\"row.href\">${row.title}</a>\n          </li>\n        </ul>\n      </div>\n      <div class=\"col-md-10\" style=\"padding: 0\">\n        <router-view></router-view>\n      </div>\n    </div>\n  </section>\n</template>\n"; });
define('text!dreamfactorytester.html', ['module'], function(module) { module.exports = "<template>\n<button click.delegate = \"login()\">POST</button>\n</template>\n"; });
define('text!grid.html', ['module'], function(module) { module.exports = "<template>\r\n  <div>\r\n    <ej-grid e-data-source.bind=\"OrdersList\" e-allow-paging=true e-allow-sorting=true>\r\n      <ej-column e-field=\"OrderID\" e-header-text=\"Order ID\" e-text-align=\"right\"></ej-column>\r\n      <ej-column e-field=\"CustomerID\" e-header-text=\"Customer ID\"></ej-column>\r\n      <ej-column e-field=\"EmployeeID\" e-header-text=\"Employee ID\" e-text-align=\"right\"></ej-column>\r\n        <ej-column e-field=\"OrderDate\" e-header-text=\"Order Date\" e-format=\"{0:MM/dd/yyyy}\" e-text-align=\"right\"></ej-column>\r\n    </ej-grid>\r\n  </div>\r\n</template>\r\n"; });
define('text!gridremote.html', ['module'], function(module) { module.exports = "\n<template>\n  <div id=\"Grid\"></div>\n</template>\n"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\n  <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#skeleton-navigation-navbar-collapse\">\n        <span class=\"sr-only\">Toggle Navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" href=\"#\">\n        <i class=\"fa fa-home\"></i>\n        <span>${router.title}</span>\n      </a>\n    </div>\n\n    <div class=\"collapse navbar-collapse\" id=\"skeleton-navigation-navbar-collapse\">\n      <ul class=\"nav navbar-nav\">\n        <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n          <a data-toggle=\"collapse\" data-target=\"#skeleton-navigation-navbar-collapse.in\" href.bind=\"row.href\">${row.title}</a>\n        </li>\n      </ul>\n\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li class=\"loader\" if.bind=\"router.isNavigating\">\n          <i class=\"fa fa-spinner fa-spin fa-2x\"></i>\n        </li>\n      </ul>\n    </div>\n  </nav>\n</template>\n"; });
define('text!users.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"blur-image\"></require>\n\n  <section class=\"au-animate\">\n    <h2>${heading}</h2>\n    <div class=\"row au-stagger\">\n      <div class=\"col-sm-6 col-md-3 card-container au-animate\" repeat.for=\"user of users\">\n        <div class=\"card\">\n          <canvas class=\"header-bg\" width=\"250\" height=\"70\" blur-image.bind=\"image\"></canvas>\n          <div class=\"avatar\">\n            <img src.bind=\"user.avatar_url\" crossorigin ref=\"image\"/>\n          </div>\n          <div class=\"content\">\n            <p class=\"name\">${user.login}</p>\n            <p><a target=\"_blank\" class=\"btn btn-default\" href.bind=\"user.html_url\">Contact</a></p>\n          </div>\n        </div>\n      </div>\n    </div>\n  </section>\n</template>\n"; });
define('text!welcome.html', ['module'], function(module) { module.exports = "<template>\n  <section class=\"au-animate\">\n    <h2>${heading}</h2>\n    <form role=\"form\" submit.delegate=\"submit()\">\n      <div class=\"form-group\">\n        <label for=\"fn\">First Name</label>\n        <input type=\"text\" value.bind=\"firstName\" class=\"form-control\" id=\"fn\" placeholder=\"first name\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"ln\">Last Name</label>\n        <input type=\"text\" value.bind=\"lastName\" class=\"form-control\" id=\"ln\" placeholder=\"last name\">\n      </div>\n      <div class=\"form-group\">\n        <label>Full Name</label>\n        <p class=\"help-block\">${fullName | upper}</p>\n      </div>\n      <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n    </form>\n  </section>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map
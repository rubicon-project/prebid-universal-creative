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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export triggerPixel */
/* unused harmony export createTrackPixelHtml */
/* unused harmony export writeAdUrl */
/* unused harmony export sendRequest */
/* unused harmony export getUUID */
/* unused harmony export loadScript */
/* unused harmony export getCreativeComment */
/* unused harmony export getCreativeCommentMarkup */
/* harmony export (immutable) */ __webpack_exports__["b"] = transformAuctionTargetingData;
/* harmony export (immutable) */ __webpack_exports__["a"] = parseUrl;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__domHelper__ = __webpack_require__(1);

/**
 * Inserts an image pixel with the specified `url` for cookie sync
 * @param {string} url URL string of the image pixel to load
 * @param  {function} [done] an optional exit callback, used when this usersync pixel is added during an async process
 */

function triggerPixel(url, done) {
  var img = new Image();

  if (done && typeof done === 'function') {
    img.addEventListener('load', done);
    img.addEventListener('error', done);
  }

  img.src = url;
}
function createTrackPixelHtml(url) {
  if (!url) {
    return '';
  }

  var escapedUrl = encodeURI(url);
  var img = "<div style=\"position:absolute;left:0px;top:0px;visibility:hidden;\"><img src=\"".concat(escapedUrl, "\"></div>");
  return img;
}
function writeAdUrl(adUrl, width, height) {
  var iframe = __WEBPACK_IMPORTED_MODULE_0__domHelper__["a" /* getEmptyIframe */](height, width);
  iframe.src = adUrl;
  document.body.appendChild(iframe);
}
function sendRequest(url, callback) {
  function reqListener() {
    callback(oReq.responseText);
  }

  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', reqListener);
  oReq.open('GET', url);
  oReq.send();
}
function getUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
  return uuid;
}
;
function loadScript(currentWindow, tagSrc, successCallback, errorCallback) {
  var doc = currentWindow.document;
  var scriptTag = doc.createElement('script');
  scriptTag.type = 'text/javascript'; // Execute success callback if necessary

  if (successCallback && typeof successCallback === 'function') {
    if (scriptTag.readyState) {
      scriptTag.onreadystatechange = function () {
        if (scriptTag.readyState === 'loaded' || scriptTag.readyState === 'complete') {
          scriptTag.onreadystatechange = null;
          successCallback();
        }
      };
    } else {
      scriptTag.onload = function () {
        successCallback();
      };
    }
  } // Execute error callback if necessary


  if (errorCallback && typeof errorCallback === 'function') {
    scriptTag.onerror = function () {
      errorCallback();
    };
  }

  scriptTag.src = tagSrc; //add the new script tag to the page

  var elToAppend = doc.getElementsByTagName('head');
  elToAppend = elToAppend.length ? elToAppend : doc.getElementsByTagName('body');

  if (elToAppend.length) {
    elToAppend = elToAppend[0];
    elToAppend.insertBefore(scriptTag, elToAppend.firstChild);
  }

  return scriptTag;
}
;
/**
 * Return comment element
 * @param {*} bid
 */

function getCreativeComment(bid) {
  return document.createComment("Creative ".concat(bid.crid, " served by Prebid.js Header Bidding"));
}
/**
 * Returns comment element markup
 * @param {*} bid
 */

function getCreativeCommentMarkup(bid) {
  var creativeComment = getCreativeComment(bid);
  var wrapper = document.createElement('div');
  wrapper.appendChild(creativeComment);
  return wrapper.innerHTML;
}
function transformAuctionTargetingData(tagData) {
  // this map object translates the Prebid.js auction keys to their equivalent Prebid Universal Creative keys
  // when the publisher uses their adserver's generic macro that provides all targeting keys (ie tagData.targetingMap), we need to convert the keys
  var auctionKeyMap = {
    hb_adid: 'adId',
    hb_cache_host: 'cacheHost',
    hb_cache_path: 'cachePath',
    hb_cache_id: 'uuid',
    hb_format: 'mediaType',
    hb_env: 'env',
    hb_size: 'size',
    hb_pb: 'hbPb'
  };
  /**
   * Determine if the supplied property of the tagData object exists and is populated with its own values/properties according to its type
   * @param {string} paramName name of the property to check (eg tagData.targetingMap)
   * @returns true/false
   */

  function isMacroPresent(paramName) {
    return !!(tagData[paramName] && (isPlainObject(tagData[paramName]) && Object.keys(tagData[paramName]).length > 0 || isStr(tagData[paramName]) && tagData[paramName] !== ''));
  }
  /**
   * Converts the specifically formatted object of keypairs to a more generalized structure
   * It specifically extracts the keyvalue from an array and stores it as a normal string
   * @param {object} tarMap object of keys with the keyvalue stored in an array; eg {"hb_adid":["26566ee8c7f251"], ...}
   * @returns {object} result is an object map like the following: {"hb_cache_id":"123456", "other_key":"other_value", ...}
   */


  function convertTargetingMapToNormalMap(tarMap) {
    var newTarMap = {};
    Object.keys(tarMap).forEach(function (key) {
      if (Array.isArray(tarMap[key]) && tarMap[key].length > 0) {
        newTarMap[key] = tarMap[key][0];
      }
    });
    return newTarMap;
  }
  /**
   * Converts a specifically formatted string of keypairs to a specifically formatted object map
   * @param {String} keywordsStr string of keypairs; eg "hb_cache_id:123456,other_key:other_value"
   * @returns {object} result is an object map like the following: {"hb_cache_id":"123456", "other_key":"other_value", ...}
   */


  function convertKeyPairStringToMap(keywordsStr) {
    var keywordsMap = {};
    var keywordsArr = keywordsStr.split(',');

    if (keywordsArr.length > 0) {
      keywordsArr.forEach(function (keyPairStr) {
        var keyPairArr = keyPairStr.split(':');

        if (keyPairArr.length === 2) {
          var k = keyPairArr[0];
          var v = keyPairArr[1];
          keywordsMap[k] = v;
        }
      });
    }

    return keywordsMap;
  }
  /**
   * Rename key if it's part of the auctionKeyMap object; if not, leave key as is
   * Store the resultant keypair in the auctionData object for later use in renderingManager.renderAd()
   * @param {object} adServerKeyMap incoming object map of the auction keys from the UC tag; eg {'key1':'value1', 'key2':'value2', ...}
   */


  function renameKnownAuctionKeys(adServerKeyMap) {
    Object.keys(adServerKeyMap).forEach(function (key) {
      var internalKey = auctionKeyMap[key] || key;
      auctionData[internalKey] = adServerKeyMap[key];
    });
  }

  var auctionData = {};
  var formattedKeyMap = {};

  if (isMacroPresent('targetingMap')) {
    formattedKeyMap = convertTargetingMapToNormalMap(tagData.targetingMap);
  } else if (isMacroPresent('targetingKeywords')) {
    formattedKeyMap = convertKeyPairStringToMap(tagData.targetingKeywords);
  }

  renameKnownAuctionKeys(formattedKeyMap); // set keys not in defined map macros (eg targetingMap) and/or the keys setup within a non-DFP adserver

  Object.keys(tagData).forEach(function (key) {
    if (key !== 'targetingMap' && key !== 'targetingKeywords' && isStr(tagData[key]) && tagData[key] !== '') {
      auctionData[key] = tagData[key];
    }
  });
  return auctionData;
}
function parseUrl(url) {
  var parsed = document.createElement('a');
  parsed.href = decodeURIComponent(url);
  return {
    href: parsed.href,
    protocol: (parsed.protocol || '').replace(/:$/, ''),
    hostname: parsed.hostname,
    port: +parsed.port,
    pathname: parsed.pathname.replace(/^(?!\/)/, '/'),
    hash: (parsed.hash || '').replace(/^#/, ''),
    host: (parsed.host || window.location.host).replace(/:(443|80)$/, '')
  };
}

function isA(object, _t) {
  return Object.prototype.toString.call(object) === '[object ' + _t + ']';
}

;

function isPlainObject(object) {
  return isA(object, 'Object');
}

function isStr(object) {
  return isA(object, 'String');
}

;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getEmptyIframe;
/* harmony export (immutable) */ __webpack_exports__["b"] = insertElement;
/**
 * domHelper: a collection of helpful dom things
 */

/**
 * returns a empty iframe element with specified height/width
 * @param {Number} height height iframe set to 
 * @param {Number} width width iframe set to
 * @returns {Element} iframe DOM element 
 */
function getEmptyIframe(height, width) {
  var frame = document.createElement('iframe');
  frame.setAttribute('frameborder', 0);
  frame.setAttribute('scrolling', 'no');
  frame.setAttribute('marginheight', 0);
  frame.setAttribute('marginwidth', 0);
  frame.setAttribute('TOPMARGIN', 0);
  frame.setAttribute('LEFTMARGIN', 0);
  frame.setAttribute('allowtransparency', 'true');
  frame.setAttribute('width', width);
  frame.setAttribute('height', height);
  return frame;
}
/**
* Insert element to passed target
* @param {object} elm
* @param {object} doc
* @param {string} target
*/

function insertElement(elm, doc, target) {
  doc = doc || document;
  var elToAppend;

  if (target) {
    elToAppend = doc.getElementsByTagName(target);
  } else {
    elToAppend = doc.getElementsByTagName('head');
  }

  try {
    elToAppend = elToAppend.length ? elToAppend : doc.getElementsByTagName('body');

    if (elToAppend.length) {
      elToAppend = elToAppend[0];
      elToAppend.insertBefore(elm, elToAppend.firstChild);
    }
  } catch (e) {}
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__renderingManager__ = __webpack_require__(3);
/**
 * creative.js
 *
 * This file is inserted into the prebid creative as a placeholder for the winning prebid creative. It should support the following formats:
 * - Banner
 * - Outstream Video
 * - All safeFrame creatives
 */

window.ucTag = window.ucTag || {};
window.ucTag.renderAd = __WEBPACK_IMPORTED_MODULE_0__renderingManager__["a" /* renderBannerOrDisplayAd */];

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = renderBannerOrDisplayAd;
/* unused harmony export renderLegacy */
/* unused harmony export renderCrossDomain */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environment__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__domHelper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__messaging_js__ = __webpack_require__(5);




function renderBannerOrDisplayAd(doc, dataObject) {
  var targetingData = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* transformAuctionTargetingData */])(dataObject);

  if (!Object(__WEBPACK_IMPORTED_MODULE_1__environment__["a" /* canLocatePrebid */])(window)) {
    renderCrossDomain(window, targetingData.adId, targetingData.adServerDomain, targetingData.pubUrl);
  } else {
    renderLegacy(doc, targetingData.adId);
  }
}
/**
 * Calls prebid.js renderAd function to render ad
 * @param {Object} doc Document
 * @param {string} adId Id of creative to render
 */

function renderLegacy(doc, adId) {
  var w = window;

  for (var i = 0; i < 10; i++) {
    w = w.parent;

    if (w.pbjs) {
      try {
        w.pbjs.renderAd(doc, adId);
        break;
      } catch (e) {
        continue;
      }
    }
  }
}
/**
 * Render ad in safeframe using postmessage
 * @param {string} adId Id of creative to render
 * @param {string} pubAdServerDomain publisher adserver domain name
 * @param {string} pubUrl Url of publisher page
 */

function renderCrossDomain(win, adId) {
  var pubAdServerDomain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var pubUrl = arguments.length > 3 ? arguments[3] : undefined;
  var windowLocation = win.location;
  var adServerDomain = pubAdServerDomain || win.location.hostname;
  var fullAdServerDomain = windowLocation.protocol + '//' + adServerDomain;
  var sendMessage = Object(__WEBPACK_IMPORTED_MODULE_3__messaging_js__["a" /* prebidMessenger */])(pubUrl, win);

  function renderAd(ev) {
    var key = ev.message ? "message" : "data";
    var adObject = {};

    try {
      adObject = JSON.parse(ev[key]);
    } catch (e) {
      return;
    }

    if (adObject.message && adObject.message === "Prebid Response" && adObject.adId === adId) {
      try {
        var body = win.document.body;
        var ad = adObject.ad;
        var url = adObject.adUrl;
        var width = adObject.width;
        var height = adObject.height;

        if (adObject.mediaType === "video") {
          signalRenderResult(false, {
            reason: "preventWritingOnMainDocument",
            message: "Cannot render video ad ".concat(adId)
          });
          console.log("Error trying to write ad.");
        } else if (ad) {
          var iframe = Object(__WEBPACK_IMPORTED_MODULE_2__domHelper__["a" /* getEmptyIframe */])(adObject.height, adObject.width);
          body.appendChild(iframe);
          iframe.contentDocument.open();
          iframe.contentDocument.write(ad);
          iframe.contentDocument.close();
          signalRenderResult(true);
        } else if (url) {
          var _iframe = Object(__WEBPACK_IMPORTED_MODULE_2__domHelper__["a" /* getEmptyIframe */])(height, width);

          _iframe.style.display = "inline";
          _iframe.style.overflow = "hidden";
          _iframe.src = url;
          Object(__WEBPACK_IMPORTED_MODULE_2__domHelper__["b" /* insertElement */])(_iframe, document, "body");
          signalRenderResult(true);
        } else {
          signalRenderResult(false, {
            reason: "noAd",
            message: "No ad for ".concat(adId)
          });
          console.log("Error trying to write ad. No ad markup or adUrl for ".concat(adId));
        }
      } catch (e) {
        signalRenderResult(false, {
          reason: "exception",
          message: e.message
        });
        console.log("Error in rendering ad", e);
      }
    }

    function signalRenderResult(success) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          reason = _ref.reason,
          message = _ref.message;

      var payload = {
        message: "Prebid Event",
        adId: adId,
        event: success ? "adRenderSucceeded" : "adRenderFailed"
      };

      if (!success) {
        payload.info = {
          reason: reason,
          message: message
        };
      }

      sendMessage(payload);
    }
  }

  function requestAdFromPrebid() {
    var message = {
      message: 'Prebid Request',
      adId: adId,
      adServerDomain: fullAdServerDomain
    };
    sendMessage(message, renderAd);
  }

  requestAdFromPrebid();
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isAmp */
/* unused harmony export isSafeFrame */
/* unused harmony export isCrossDomain */
/* unused harmony export canInspectWindow */
/* harmony export (immutable) */ __webpack_exports__["a"] = canLocatePrebid;
/* unused harmony export isMobileApp */
/***************************************
 * Detect Environment Helper Functions
 ***************************************/

/**
 * Functions to detect below environments:
 *  Amp: google Accelerate Mobile Pages ampproject.org
 *  SafeFrame: SafeFrame
 *  CrossDomain: An iframe that can't get to the top window
 *  Mobile App: function to detect mobile app environment
 */

/**
 * @param {String} uuid key value from auction, contains the cache id of the winning bid stored in prebid cache
 * @returns true if there is an AMP context object
 */
function isAmp(uuid, win) {
  // TODO Use amp context once it is available in cross domain
  // https://github.com/ampproject/amphtml/issues/6829
  return typeof uuid === 'string' && uuid !== "" && isCrossDomain(win);
}
/**
 * @returns true if the environment is a SafeFrame.
 */

function isSafeFrame(win) {
  return !!(win.$sf && win.$sf.ext);
}
/**
  * Return true if we are in an iframe and can't access the top window.
  * @returns true if the environment is a Cross Domain
  */

function isCrossDomain(win) {
  return win.top !== win && !canInspectWindow(win);
}
/**
 * Returns true if win's properties can be accessed and win is defined.
 * This functioned is used to determine if a window is cross-domained
 * from the perspective of the current window.
 * @param {!Window} win
 * @return {boolean}
 */

function canInspectWindow(win) {
  try {
    // force an exception in x-domain environments. #1509
    win.top.location.toString();
    return true;
  } catch (e) {
    return false;
  }
}
/**
 * Returns true if we can find the prebid global object (eg pbjs) as we
 * climb the accessible windows.  Return false if it's not found.
 * @returns {boolean}
 */

function canLocatePrebid(win) {
  var result = false;
  var currentWindow = win;

  while (!result) {
    try {
      if (currentWindow.pbjs) {
        result = true;
        break;
      }
    } catch (e) {}

    if (currentWindow === window.top) break;
    currentWindow = currentWindow.parent;
  }

  return result;
}
/**
 * @param {String} env key value from auction, indicates the environment where tag is served
 * @returns true if env exists and is equal to the string 'mobile-app'
 */

function isMobileApp(env) {
  return env && env === 'mobile-app';
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = prebidMessenger;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);

function prebidMessenger(publisherURL) {
  var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

  var prebidDomain = function () {
    if (publisherURL == null) {
      return null;
    }

    var parsedUrl = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["a" /* parseUrl */])(publisherURL);
    return parsedUrl.protocol + '://' + parsedUrl.host;
  }();

  return function sendMessage(message, onResponse) {
    if (prebidDomain == null) {
      throw new Error('Missing pubUrl');
    }

    message = JSON.stringify(message);
    var messagePort;

    if (onResponse == null) {
      win.parent.postMessage(message, prebidDomain);
    } else {
      var channel = new MessageChannel();
      messagePort = channel.port1;
      messagePort.onmessage = onResponse;
      win.addEventListener('message', windowListener);
      win.parent.postMessage(message, prebidDomain, [channel.port2]);
    }

    return function stopListening() {
      if (messagePort != null) {
        win.removeEventListener('message', windowListener);
        messagePort.onmessage = null;
        messagePort = null;
      }
    };

    function windowListener(ev) {
      if ((ev.origin || ev.originalEvent && ev.originalEvent.origin) === prebidDomain) {
        onResponse(ev);
      }
    }
  };
}

/***/ })
/******/ ]);
//# sourceMappingURL=banner.js.map
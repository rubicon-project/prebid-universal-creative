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
/* harmony export (immutable) */ __webpack_exports__["e"] = triggerPixel;
/* unused harmony export createTrackPixelHtml */
/* unused harmony export writeAdUrl */
/* harmony export (immutable) */ __webpack_exports__["c"] = sendRequest;
/* unused harmony export getUUID */
/* harmony export (immutable) */ __webpack_exports__["a"] = loadScript;
/* unused harmony export getCreativeComment */
/* unused harmony export getCreativeCommentMarkup */
/* harmony export (immutable) */ __webpack_exports__["d"] = transformAuctionTargetingData;
/* harmony export (immutable) */ __webpack_exports__["b"] = parseUrl;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__domHelper__ = __webpack_require__(4);

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
/* harmony export (immutable) */ __webpack_exports__["a"] = prebidMessenger;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);

function prebidMessenger(publisherURL) {
  var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

  var prebidDomain = function () {
    if (publisherURL == null) {
      return null;
    }

    var parsedUrl = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["b" /* parseUrl */])(publisherURL);
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

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nativeTrackerManager__ = __webpack_require__(3);

window.pbNativeTag = window.pbNativeTag || {};
var nativeTrackerManager = Object(__WEBPACK_IMPORTED_MODULE_0__nativeTrackerManager__["a" /* newNativeTrackerManager */])(window);
window.pbNativeTag.startTrackers = nativeTrackerManager.startTrackers;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = newNativeTrackerManager;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nativeAssetManager__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__messaging_js__ = __webpack_require__(1);
/*
 * Script to handle firing impression and click trackers from native teamplates
 */



var AD_ANCHOR_CLASS_NAME = 'pb-click';
var AD_DATA_ADID_ATTRIBUTE = 'pbAdId';
function newNativeTrackerManager(win) {
  var sendMessage;

  function findAdElements(className) {
    var adElements = win.document.getElementsByClassName(className);
    return adElements || [];
  }

  function readAdIdFromElement(adElements) {
    var adId = adElements.length > 0 && adElements[0].attributes && adElements[0].attributes[AD_DATA_ADID_ATTRIBUTE] && adElements[0].attributes[AD_DATA_ADID_ATTRIBUTE].value;
    return adId || '';
  }

  function readAdIdFromSingleElement(adElement) {
    var adId = adElement.attributes && adElement.attributes[AD_DATA_ADID_ATTRIBUTE] && adElement.attributes[AD_DATA_ADID_ATTRIBUTE].value;
    return adId || '';
  }

  function loadClickTrackers(event, adId) {
    fireTracker(adId, 'click');
  }

  function loadImpTrackers(adElements) {
    for (var i = 0; i < adElements.length; i++) {
      var adId = readAdIdFromSingleElement(adElements[i]);
      fireTracker(adId, 'impression');
    }
  }

  function attachClickListeners(adElements) {
    var listener = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : loadClickTrackers;
    adElements = adElements || findAdElements(AD_ANCHOR_CLASS_NAME);

    var _loop = function _loop(i) {
      var adId = readAdIdFromSingleElement(adElements[i]);
      adElements[i].addEventListener('click', function (event) {
        listener(event, adId);
      }, true);
    };

    for (var i = 0; i < adElements.length; i++) {
      _loop(i);
    }
  }

  function fireTracker(adId, action) {
    if (adId === '') {
      console.warn('Prebid tracking event was missing \'adId\'.  Was adId macro set in the HTML attribute ' + AD_DATA_ADID_ATTRIBUTE + 'on the ad\'s anchor element');
    } else {
      var message = {
        message: 'Prebid Native',
        adId: adId
      }; // fires click trackers when called via link

      if (action === 'click') {
        message.action = 'click';
      }

      sendMessage(message);
    }
  } // START OF MAIN CODE


  var startTrackers = function startTrackers(dataObject) {
    var targetingData = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* transformAuctionTargetingData */])(dataObject);
    sendMessage = Object(__WEBPACK_IMPORTED_MODULE_2__messaging_js__["a" /* prebidMessenger */])(targetingData.pubUrl, win);
    var nativeAssetManager = Object(__WEBPACK_IMPORTED_MODULE_1__nativeAssetManager__["a" /* newNativeAssetManager */])(window, targetingData.pubUrl);

    if (targetingData && targetingData.env === 'mobile-app') {
      var cb = function cb() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            clickTrackers = _ref.clickTrackers,
            impTrackers = _ref.impTrackers;

        function loadMobileClickTrackers(clickTrackers) {
          (clickTrackers || []).forEach(__WEBPACK_IMPORTED_MODULE_0__utils__["e" /* triggerPixel */]);
        }

        var boundedLoadMobileClickTrackers = loadMobileClickTrackers.bind(null, clickTrackers);
        attachClickListeners(false, boundedLoadMobileClickTrackers);
        (impTrackers || []).forEach(__WEBPACK_IMPORTED_MODULE_0__utils__["e" /* triggerPixel */]);
      };

      nativeAssetManager.loadMobileAssets(targetingData, cb);
    } else {
      var adElements = findAdElements(AD_ANCHOR_CLASS_NAME);
      nativeAssetManager.loadAssets(readAdIdFromElement(adElements), attachClickListeners);
      attachClickListeners(adElements, loadClickTrackers); // fires native impressions on creative load

      if (adElements.length > 0) {
        loadImpTrackers(adElements);
      }
    }
  };

  return {
    startTrackers: startTrackers
  };
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getEmptyIframe;
/* unused harmony export insertElement */
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = newNativeAssetManager;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__messaging_js__ = __webpack_require__(1);
/**
 * Handles postMessage requests and responses for replacing native placeholder
 * values in native creative templates.
 */


/*
 * Native asset->key mapping from Prebid.js/src/constants.json
 * https://github.com/prebid/Prebid.js/blob/8635c91942de9df4ec236672c39b19448545a812/src/constants.json#L67
 */

var NATIVE_KEYS = {
  title: 'hb_native_title',
  body: 'hb_native_body',
  body2: 'hb_native_body2',
  privacyLink: 'hb_native_privacy',
  sponsoredBy: 'hb_native_brand',
  image: 'hb_native_image',
  icon: 'hb_native_icon',
  clickUrl: 'hb_native_linkurl',
  displayUrl: 'hb_native_displayurl',
  cta: 'hb_native_cta',
  rating: 'hb_native_rating',
  address: 'hb_native_address',
  downloads: 'hb_native_downloads',
  likes: 'hb_native_likes',
  phone: 'hb_native_phone',
  price: 'hb_native_price',
  salePrice: 'hb_native_saleprice',
  rendererUrl: 'hb_renderer_url'
}; // Asset type mapping as per Native IAB spec 1.2
// https://www.iab.com/wp-content/uploads/2017/04/OpenRTB-Native-Ads-Specification-Draft_1.2_2017-04.pdf#page=40

var assetTypeMapping = {
  'image': {
    1: 'icon',
    3: 'image'
  },
  'data': {
    1: 'sponsoredBy',
    2: 'body',
    3: 'rating',
    4: 'likes',
    5: 'downloads',
    6: 'price',
    7: 'salePrice',
    8: 'phone',
    9: 'address',
    10: 'body2',
    11: 'displayUrl',
    12: 'cta'
  }
};
var DEFAULT_CACHE_HOST = 'prebid.adnxs.com';
var DEFAULT_CACHE_PATH = '/pbc/v1/cache';
function newNativeAssetManager(win, pubUrl) {
  var sendMessage = Object(__WEBPACK_IMPORTED_MODULE_1__messaging_js__["a" /* prebidMessenger */])(pubUrl, win);
  var callback;
  var errorCountEscapeHatch = 0;
  var cancelMessageListener;

  function stopListening() {
    if (cancelMessageListener != null) {
      cancelMessageListener();
      cancelMessageListener = null;
    }
  }

  function getCacheEndpoint(cacheHost, cachePath) {
    var host = typeof cacheHost === 'undefined' || cacheHost === "" ? DEFAULT_CACHE_HOST : cacheHost;
    var path = typeof cachePath === 'undefined' || cachePath === "" ? DEFAULT_CACHE_PATH : cachePath;
    return "https://".concat(host).concat(path);
  }

  function parseResponse(response) {
    var bidObject;

    try {
      bidObject = JSON.parse(response);
    } catch (error) {
      console.log("Error parsing response from cache host: ".concat(error));
    }

    return bidObject;
  }

  function transformToPrebidKeys(adMarkup) {
    var assets = [];
    var clicktrackers;
    var assetsFromMarkup = adMarkup.assets;
    assetsFromMarkup.forEach(function (asset) {
      if (asset.img) {
        if (assetTypeMapping['image'][asset.img.type]) {
          assets.push({
            'key': assetTypeMapping['image'][asset.img.type],
            'value': asset.img.url
          });
        } else {
          console.log('ERROR: Invalid image type for image asset');
        }
      } else if (asset.data) {
        if (assetTypeMapping['data'][asset.data.type]) {
          assets.push({
            'key': assetTypeMapping['data'][asset.data.type],
            'value': asset.data.value
          });
        } else {
          console.log('ERROR: Invalid data type for data asset');
        }
      } else if (asset.title) {
        assets.push({
          'key': 'title',
          'value': asset.title.text
        });
      }
    });

    if (adMarkup.link) {
      if (adMarkup.link.clicktrackers) {
        clicktrackers = adMarkup.link.clicktrackers;
      }

      assets.push({
        'key': 'clickUrl',
        'value': adMarkup.link.url
      });
    }

    return {
      assets: assets,
      clicktrackers: clicktrackers,
      'imptrackers': adMarkup.imptrackers
    };
  }

  function requestAssetsFromCache(tagData) {
    var ajaxCallback = function ajaxCallback(response) {
      var bidResponse = parseResponse(response);

      if (bidResponse && bidResponse.adm) {
        var markup = parseResponse(bidResponse.adm);

        if (markup && markup.assets) {
          var data = transformToPrebidKeys(markup);
          var body = win.document.body.innerHTML;
          var newHtml = replace(body, data);
          win.document.body.innerHTML = newHtml;
          callback && callback({
            clickTrackers: data.clicktrackers,
            impTrackers: data.imptrackers
          });
        } else {// TODO Shall we just write the markup in the page
        }
      }
    };

    var uuid = tagData.uuid;
    var adUrl = "".concat(getCacheEndpoint(tagData.cacheHost, tagData.cachePath), "?uuid=").concat(uuid);
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* sendRequest */])(adUrl, ajaxCallback);
  }

  function loadMobileAssets(tagData, cb) {
    var placeholders = scanForPlaceholders();

    if (placeholders.length > 0) {
      callback = cb;
      requestAssetsFromCache(tagData);
    }
  }
  /*
   * Entry point to search for placeholderes and set up postmessage roundtrip
   * to retrieve native assets. Looks for placeholders for the given adId and
   * fires a callback after the native html is updated. If no placeholders found
   * and requestAllAssets flag is set in the tag, postmessage roundtrip
   * to retrieve native assets that have a value on the corresponding bid
   */


  function loadAssets(adId, cb) {
    var placeholders = scanForPlaceholders(adId),
        flag = typeof win.pbNativeData !== 'undefined';

    if (flag && win.pbNativeData.hasOwnProperty('assetsToReplace')) {
      win.pbNativeData.assetsToReplace.forEach(function (asset) {
        var key = asset.match(/hb_native_/i) ? asset : NATIVE_KEYS[asset];

        if (key) {
          placeholders.push(key);
        }
      });
    }

    if (flag && win.pbNativeData.hasOwnProperty('requestAllAssets') && win.pbNativeData.requestAllAssets) {
      callback = cb;
      cancelMessageListener = requestAllAssets(adId);
    } else if (placeholders.length > 0) {
      callback = cb;
      cancelMessageListener = requestAssets(adId, placeholders);
    }
  }
  /*
   * Searches the DOM for placeholder values sent in by Prebid Native
   */


  function scanForPlaceholders(adId) {
    var placeholders = [];
    var doc = win.document;
    var flag = typeof win.pbNativeData !== 'undefined';
    Object.keys(NATIVE_KEYS).forEach(function (key) {
      var placeholderKey = NATIVE_KEYS[key];
      var placeholder = adId && !flag ? "".concat(placeholderKey, ":").concat(adId) : "".concat(placeholderKey);
      var placeholderIndex = ~doc.body.innerHTML.indexOf(placeholder) ? doc.body.innerHTML.indexOf(placeholder) : doc.head.innerHTML && doc.head.innerHTML.indexOf(placeholder);

      if (~placeholderIndex) {
        placeholders.push(placeholderKey);
      }
    });
    return placeholders;
  }
  /*
   * Sends postmessage to Prebid for asset placeholders found in the native
   * creative template, and setups up a listener for when Prebid responds.
   */


  function requestAssets(adId, assets) {
    var message = {
      message: 'Prebid Native',
      action: 'assetRequest',
      adId: adId,
      assets: assets
    };
    return sendMessage(message, replaceAssets);
  }
  /*
   * Sends postmessage to Prebid for asset placeholders found in the native
   * creative template, and setups up a listener for when Prebid responds.
   */


  function requestAllAssets(adId) {
    var message = {
      message: 'Prebid Native',
      action: 'allAssetRequest',
      adId: adId
    };
    return sendMessage(message, replaceAssets);
  }
  /*
   * Sends postmessage to Prebid for native resize
   */


  function requestHeightResize(adId, height) {
    var message = {
      message: 'Prebid Native',
      action: 'resizeNativeHeight',
      adId: adId,
      height: height
    };
    sendMessage(message);
  }
  /*
   * Postmessage listener for when Prebid responds with requested native assets.
   */


  function replaceAssets(event) {
    var data = {};

    try {
      data = JSON.parse(event.data);
    } catch (e) {
      if (errorCountEscapeHatch++ > 10) {
        /*
         * if for some reason Prebid never responds with the native assets,
         * get rid of this listener because other messages won't stop coming
         */
        stopListening();
      }

      return;
    }

    if (data.message === 'assetResponse') {
      var body = win.document.body.innerHTML;
      var head = win.document.head.innerHTML;
      var flag = typeof win.pbNativeData !== 'undefined';
      if (flag && data.adId !== win.pbNativeData.adId) return;
      if (head) win.document.head.innerHTML = replace(head, data);
      var assets = data.assets || data.ortb;

      if (data.hasOwnProperty('rendererUrl') && data.rendererUrl || flag && win.pbNativeData.hasOwnProperty('rendererUrl')) {
        if (win.renderAd) {
          var newHtml = win.renderAd && win.renderAd(assets) || '';
          win.document.body.innerHTML = body + newHtml;
          callback && callback();
          stopListening();
          requestHeightResize(data.adId, document.body.clientHeight || document.body.offsetHeight);
        } else if (document.getElementById('pb-native-renderer')) {
          document.getElementById('pb-native-renderer').addEventListener('load', function () {
            var newHtml = win.renderAd && win.renderAd(assets) || '';
            win.document.body.innerHTML = body + newHtml;
            callback && callback();
            stopListening();
            requestHeightResize(data.adId, document.body.clientHeight || document.body.offsetHeight);
          });
        } else {
          Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* loadScript */])(win, flag && win.pbNativeData.hasOwnProperty('rendererUrl') && win.pbNativeData.rendererUrl || data.rendererUrl, function () {
            var newHtml = win.renderAd && win.renderAd(assets) || '';
            win.document.body.innerHTML = body + newHtml;
            callback && callback();
            stopListening();
            requestHeightResize(data.adId, document.body.clientHeight || document.body.offsetHeight);
          });
        }
      } else if (data.hasOwnProperty('adTemplate') && data.adTemplate || flag && win.pbNativeData.hasOwnProperty('adTemplate')) {
        var template = flag && win.pbNativeData.hasOwnProperty('adTemplate') && win.pbNativeData.adTemplate || data.adTemplate;

        var _newHtml = replace(template, data);

        win.document.body.innerHTML = body + _newHtml;
        callback && callback();
        stopListening();
        requestHeightResize(data.adId, document.body.clientHeight || document.body.offsetHeight);
      } else {
        var _newHtml2 = replace(body, data);

        win.document.body.innerHTML = _newHtml2;
        callback && callback();
        stopListening();
      }
    }
  }
  /**
   * Replaces occurrences of native placeholder values with their actual values
   * in the given document.
   */


  function replace(document, _ref) {
    var assets = _ref.assets,
        adId = _ref.adId;
    var html = document;
    (assets || []).forEach(function (asset) {
      var flag = typeof win.pbNativeData !== 'undefined';
      var searchString = adId && !flag ? "".concat(NATIVE_KEYS[asset.key], ":").concat(adId) : flag ? '##' + "".concat(NATIVE_KEYS[asset.key]) + '##' : "".concat(NATIVE_KEYS[asset.key]);
      var searchStringRegex = new RegExp(searchString, 'g');
      html = html.replace(searchStringRegex, asset.value);
    });
    return html;
  }

  return {
    loadAssets: loadAssets,
    loadMobileAssets: loadMobileAssets
  };
}

/***/ })
/******/ ]);
//# sourceMappingURL=native-trk.js.map
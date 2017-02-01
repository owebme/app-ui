(function(app, utils){

	utils.init = function(namespace){
		if (!namespace) return;

		var parts = namespace.split("."),
	        component = app,
	        i;

	    for (i = 0; i < parts.length; i++) {
	        component = component[parts[i]];
	    }

		if (component && typeof component.init === "function"){
			component.init();
			utils.log("Initialize: <" + namespace + "> ready");
		}
		else {
			utils.log("ERROR: <" + namespace + "> initialize");
		}
	};

	utils.is = function(namespace, callback){
		if (!namespace) return;

		var parts = namespace.split("."),
	        component = app,
	        i;

	    for (i = 0; i < parts.length; i++) {
	        component = component[parts[i]];
	    }

		if (component){
			if (callback && typeof callback === "function"){
				callback();
			}
		}
		else {
			utils.log("NOT found: <" + namespace + ">");
		}
	};

	utils.log = function(data){
		if (!data) return;

		if (typeof data === "object"){
			console.dir(data);
		}
		else {
			console.log(data);
		}
	};

	utils.logger = function(event, data){
		if (!event || !data) return;

		if (event === "init") utils.log("Initialize: <" + data + "> ready");
		else if (event === "open") utils.log("OPEN: <" + data + ">");
		else if (event === "close") utils.log("CLOSE: <" + data + ">");
		else utils.log(event + ": <" + data + ">");
	};

	utils.random = function(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	};

	utils.template = function(name, data, node){

		if (!app.templates[name]) {
			utils.log("NOT found: <" + name + "> template");
			return;
		}

		var tpl = Mustache.render(app.templates[name](), data ? data : {}),
			result = $(tpl).appendTo(node ? node : app.$dom.root);

		return result;
	};

	utils.copyArray = function(arr) {
	  var newObj = arr === null ? null : (!utils.isObject(arr) ? [] : {});
	  for (var i in arr) {
	    if (typeof(arr[i]) === 'object' && i !== 'prototype') {
	      newObj[i] = utils.copyArray(arr[i]);
	    } else {
	      newObj[i] = arr[i];
	    }
	  }
	  return newObj;
    };

	utils.sortArray = function(arr, field, direction){
		var data = _.sortBy(arr, function(item){
			return item[field];
		});
		if (direction === "desc"){
			return data.reverse();
		}
		else {
			return data;
		}
	};

	utils.sortByDate = function(arr, field, direction){
		if (!window.moment) return arr;
		var data = _.sortBy(arr, function(item){
			return moment(item[field]).format("X");
		});
		if (direction === "desc"){
			return data.reverse();
		}
		else {
			return data;
		}
	};

	utils.isArray = function(arr){
		if (arr && Object.prototype.toString.call(arr) === '[object Array]'){
		    return true;
		}
	};

	utils.isFunction = function(fn){
		if (fn && typeof fn === 'function'){
		    return true;
		}
	};

	utils.fixTouchScroll = function($container, $scroll){
		var touchY = null,
			scrollY = null;

		$container.on('touchmove MSPointerMove', function(e){
			if (scrollY === 0){
				var lastTouchY = e.changedTouches[0].clientY;
				if (lastTouchY < touchY){
					touchY = 0;
					e.preventDefault();
				}
				else {
					if (app.device && app.device.isIOS){
						setTimeout(function(){
							touchY = lastTouchY;
						}, 1000);
					}
					else {
						touchY = lastTouchY;
					}
				}
			}
		});

		$scroll.on('scroll', function(){
			scrollY = this.scrollTop;
		});
	};

	utils.raf = function(callback){
		var func = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame;
		if (func) {
			return func(callback);
		} else {
			return window.setTimeout(callback, 1000 / 60);
		}
	};

	utils.caf = function(frame){
		var func = window.cancelAnimationFrame ||
			window.webkitCancelRequestAnimationFrame ||
			window.mozCancelRequestAnimationFrame ||
			window.oCancelRequestAnimationFrame ||
			window.msCancelRequestAnimationFrame ||
			clearTimeout;
		func(frame);
		frame = null;
	};

	utils.support = {transitions: Modernizr.csstransitions},
	utils.transEndEventNames = {'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend'};
	utils.transEndEventName = utils.transEndEventNames[Modernizr.prefixed('transition')];
	utils.animEndEventNames = {'WebkitAnimation': 'webkitAnimationEnd', 'MozAnimation': 'animationend', 'OAnimation': 'oAnimationEnd', 'msAnimation': 'MSAnimationEnd', 'animation': 'animationend'};
	utils.animEndEventName = utils.animEndEventNames[Modernizr.prefixed('animation')];

	utils.onEndTransition = function(el, callback){
		var onEndCallbackFn = function( ev ) {
			if ( utils.support.transitions ) {
				if( ev.target != this ) return;
				this.removeEventListener( utils.transEndEventName, onEndCallbackFn );
			}
			if( callback && typeof callback === 'function' ) { callback.call(this); }
		};
		if( utils.support.transitions ) {
			el.addEventListener( utils.transEndEventName, onEndCallbackFn );
		}
		else {
			onEndCallbackFn();
		}
	};

	utils.onEndAnimation = function(el, callback){
		var onEndCallbackFn = function( ev ) {
			if ( utils.support.transitions ) {
				if( ev.target != this ) return;
				this.removeEventListener( utils.animEndEventName, onEndCallbackFn );
			}
			if( callback && typeof callback === 'function' ) { callback.call(this); }
		};
		if( utils.support.transitions ) {
			el.addEventListener( utils.animEndEventName, onEndCallbackFn );
		}
		else {
			onEndCallbackFn();
		}
	};

	utils.onLoadImage = function(url, callback) {
		var img = new Image(),
			loaded = false;

	    function loadHandler() {
	        if (loaded) return;
	        loaded = true;
			callback(true);
	    }
		function errHandler() {
	        callback(false);
	    }
		img.src = url;
		img.onerror = errHandler;
		img.onload = loadHandler;
	    if (img.complete) loadHandler();
	};

	utils.getSizeImage = function(url, callback) {
	    var img = new Image(),
			loaded = false;

	    function loadHandler() {
	        if (loaded) return;
	        loaded = true;
			callback(img.naturalWidth, img.naturalHeight);
	    }
		function errHandler() {
	        callback(false);
	    }
		img.src = url;
		img.onerror = errHandler;
		img.onload = loadHandler;
	    if (img.complete) loadHandler();
	};

	utils.getScroll = function(scroll) {
        var x = scroll.x * -1,
            y = scroll.y * -1,
			maxX = scroll.maxScrollX * -1,
			maxY = scroll.maxScrollY * -1;
        return {x: x, y: y, maxX: maxX, maxY: maxY};
    };

	utils.throttle = function(fn, delay) {
		var allowSample = true;

		return function(e) {
			if (allowSample) {
				allowSample = false;
				setTimeout(function() { allowSample = true; }, delay);
				fn(e);
			}
		};
	};

	utils.debounce = function(fn, timeout, invokeAsap, ctx) {
		if (arguments.length == 3 && typeof invokeAsap != 'boolean') {
			ctx = invokeAsap;
			invokeAsap = false;
		}

		var timer;

		return function() {

			var args = arguments;
            ctx = ctx || this;

			invokeAsap && !timer && fn.apply(ctx, args);

			clearTimeout(timer);

			timer = setTimeout(function() {
				!invokeAsap && fn.apply(ctx, args);
				timer = null;
			}, timeout);

		};
	};

	utils.indexOf = function(arr, value, from) {
		for (var i = from || 0, l = (arr || []).length; i < l; i++) {
			if (arr[i] == value) return i;
		}
		return -1;
  	};

	utils.inArray = function(arr, value) {
		return utils.indexOf(arr, value) != -1;
	};

	utils.trim = function(text) {
		return (text && String(text) || '').replace(/^\s+|\s+$/g, '');
	};

	utils.underscored = function(str) {
		return utils.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
	};

	utils.deepExtend = function(target, source) {
	    for (var prop in source) {
	        if (source.hasOwnProperty(prop)) {
	            if (target[prop] && typeof source[prop] === 'object') {
	                utils.deepExtend(target[prop], source[prop]);
	            }
	            else {
	                target[prop] = source[prop];
	            }
	        }
	    }
	    return target;
	};

	utils.numberFormat = function(number, dec, dsep, tsep) {
		if (isNaN(number) || number == null) return '';

		number = parseInt(number).toFixed(~~dec);
		tsep = typeof tsep == 'string' ? tsep : ',';

		var parts = number.split('.'),
			fnums = parts[0],
			decimals = parts[1] ? (dsep || '.') + parts[1] : '';

		return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
	};

	utils.clean = function(field, def) {
		field = _.escape(utils.trim(field));
		return field ? field : (def !== undefined ? def : null);
	};

	utils.isObject = function(obj) { return Object.prototype.toString.call(obj) === '[object Object]'};

	utils.isEmail = function(str){
		return str.match(/.+@.+\..+/i);
	};

	utils.newId = function(){
		return String(Math.round(new Date().getTime() / 1000));
	};

	utils.getDateNow = function(){
		var d = new Date();
		var hour = d.getHours();
		var minute = d.getMinutes();
		var seconds = d.getSeconds();
		var month = d.getMonth() + 1;
		var day = d.getDate();
		var year = d.getFullYear();
		if (hour < 10) hour = "0"+hour;
		if (minute < 10) minute = "0"+minute;
		if (seconds < 10) seconds = "0"+seconds;
		if (month < 10) month = "0"+month;
		if (day < 10) day = "0"+day;

		return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+seconds;
	};

	utils.supportClipboard = function(){
		if (window.clipboardData && window.clipboardData.setData || document.queryCommandSupported && document.queryCommandSupported("copy")) {
			return true;
		}
		else {
			return false;
		}
	};

	utils.copyToClip = function(text){
	    if (window.clipboardData && window.clipboardData.setData) {
	        // IE specific code path to prevent textarea being shown while dialog is visible.
	        return clipboardData.setData("Text", text);

	    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
	        var textarea = document.createElement("textarea");
	        textarea.textContent = text;
	        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
	        document.body.appendChild(textarea);
	        textarea.select();
	        try {
	            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
	        } catch (ex) {
	            console.warn("Copy to clipboard failed.", ex);
	            return false;
	        } finally {
	            document.body.removeChild(textarea);
	        }
	    }
	};

	utils.bbUpdate = function(obj, callback){
		obj.on("update", function(e){
	        var prop = e.data && e.data.transaction && e.data.transaction.length && e.data.transaction[0].path ? e.data.transaction[0].path[0] : null,
	            value = e.data && e.data.transaction && e.data.transaction.length ? e.data.transaction[0].value : null;

	        callback(prop, value, e);
		});
    };

	if (window._) _.extend(_, utils);
	else window._ = utils;

	app.utils = window._;

})(app, app.utils);

(function($){

	var device = {},
		$dom = {
			body: $('body'),
			html: $('html'),
			window: $(window)
		};

	/* --- Mobile --- */
	device.support = Modernizr;

	/* --- Mobile --- */
	device.isMobile = device.support.touch;
	$dom.html.addClass(device.isMobile ? 'd-mobile' : 'd-no-mobile');

	/* --- Retina --- */
	device.isRetina = (window.devicePixelRatio && window.devicePixelRatio>1);
	$dom.html.addClass(device.isRetina ? 'd-retina' : 'd-no-retina');

	/* --- sizeCheck --- */
	var sizeCheck = function(){
		var width = $dom.window.width();
		device.isPhone = (width < 768);
		device.isTablet = (width < 1025 && width > 767);
		device.orientation = (device.isTablet && width < 1025 && width > 991 || device.isPhone && width > 480 ? "landscape" : "portrait");
		$dom.html
		.addClass(device.isPhone ? 'd-phone' : 'd-no-phone')
		.removeClass(device.isPhone ? 'd-no-phone' : 'd-phone')
		.addClass(device.isTablet ? 'd-tablet' : 'd-no-tablet')
		.removeClass(device.isTablet ? 'd-no-tablet' : 'd-tablet')
		.addClass(device.orientation === "landscape" ? 'r-landscape' : 'r-portrait')
		.removeClass(device.orientation !== "landscape" ? 'r-landscape' : 'r-portrait');
	};
	$dom.window.on('resize.sizeCheck', sizeCheck);
	sizeCheck();

	if (navigator.userAgent.match(/(iPhone)/i)) device.isPhone = true;

	/* --- iOS --- */
	if (navigator.userAgent.match(/iPad/i)) {
		$dom.html.addClass('d-ipad');
		device.isIPad = true;
	};
	if (navigator.userAgent.match(/(iPhone|iPod touch)/i)) {
		$dom.html.addClass('d-iphone');
		device.isIPhone = true;
	};
	if (navigator.userAgent.match(/(iPad|iPhone|iPod touch)/i)) {
		$dom.html.addClass('d-ios');
		device.isIOS = true;
	}
	else {
		$dom.html.addClass('d-no-ios');
	};
	if (navigator.userAgent.match(/.*CPU.*OS 7_\d/i)) {
		$dom.html.addClass('d-ios7');
		device.isIOS7 = true;
	};

	/* --- iPad (for fix wrong window height) --- */
	if ($dom.html.hasClass('d-ipad d-ios7')) {
		$dom.window.on('resize orientationchange focusout', function(){
			window.scrollTo(0,0);
		});
	};

	device.isWin = navigator.platform.indexOf("Win") > -1;
	device.isMac = navigator.platform.indexOf("Mac") > -1;
	device.isLinux = navigator.platform.indexOf("Linux") > -1;

	$dom.html.addClass(device.isMac ? 'd-macOS' : 'd-no-macOS');

	/* --- Safari --- */
	device.isSafari = /constructor/i.test(window.HTMLElement);
	$dom.html.addClass(device.isSafari ? 'd-safari' : 'd-no-safari');

	/* --- Firefox --- */
	device.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	$dom.html.addClass(device.isFirefox ? 'd-firefox' : 'd-no-firefox');

	/* --- Fix click onTouch device --- */
	if (device.isMobile && window.FastClick && 'addEventListener' in document) {
		document.addEventListener('DOMContentLoaded', function() {
			FastClick.attach(document.body);
		}, false);
	}

	if (!device.isMobile){
		var timer, body = $dom.body[0];
		$dom.window[0].addEventListener('scroll', function(){
			clearTimeout(timer);
			if (!body.getAttribute("class") || !body.getAttribute("class").match(/disable__hover/)){
				body.classList.add('disable__hover');
			}

			timer = setTimeout(function(){
				body.classList.remove('disable__hover')
			}, 300);
		}, false);
	}

})(window.jQuery || window.Zepto);

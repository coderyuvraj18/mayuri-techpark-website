/* ==========================================
   Vamsiram Builders - Replica JS
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {

	/* ---------- Preloader ---------- */
	function initPreloader() {
		var preloader = document.getElementById('loftloader-wrapper');
		var video = document.getElementById('preloader-video');

		function hidePreloader() {
			if (preloader) {
				preloader.classList.add('hidden-loader');
			}
		}

		if (preloader) {
			// Max wait 5 seconds
			setTimeout(hidePreloader, 5000);

			// Hide when video ends
			if (video) {
				video.addEventListener('ended', hidePreloader);
				video.addEventListener('error', hidePreloader);
			}

			// Also hide on window load
			window.addEventListener('load', function () {
				setTimeout(hidePreloader, 3000);
			});
		}
	}
	initPreloader();

	/* ---------- Mobile menu toggle ---------- */
	function initMobileMenu() {
		var hamburger = document.querySelector('.hamburger');
		var mobileMenu = document.querySelector('.mobile-menu');
		var navigation = document.querySelector('.navigation');

		if (hamburger && mobileMenu && navigation) {
			hamburger.addEventListener('click', function () {
				navigation.classList.toggle('active');
				mobileMenu.classList.toggle('active');
			});
		}

		// Mobile dropdown toggle
		var dropdown = document.querySelector('.mobile-menu .dropdown');
		if (dropdown) {
			var dropdownLink = dropdown.querySelector('.menu-link');
			dropdownLink.addEventListener('click', function (e) {
				e.preventDefault();
				var subMenu = dropdown.querySelector('.sub-menu');
				var arrow = dropdownLink.querySelector('.navigation-arrow');
				if (subMenu) {
					var isVisible = subMenu.style.display === 'block';
					subMenu.style.display = isVisible ? 'none' : 'block';
					if (arrow) {
						arrow.style.transform = isVisible ? 'none' : 'rotate(180deg)';
					}
				}
			});
		}
	}
	initMobileMenu();

	/* ---------- Animated Counters ---------- */
	function animateCounter(el) {
		var start = parseInt(el.getAttribute('data-count-start'), 10) || 0;
		var end = parseInt(el.getAttribute('data-count-end'), 10) || 0;
		var duration = 2000;
		var startTime = null;

		function step(timestamp) {
			if (!startTime) startTime = timestamp;
			var progress = Math.min((timestamp - startTime) / duration, 1);
			var eased = 1 - Math.pow(1 - progress, 3);
			var value = Math.floor(eased * (end - start) + start);
			el.textContent = value + '+';
			if (progress < 1) {
				requestAnimationFrame(step);
			} else {
				el.textContent = end + '+';
			}
		}

		requestAnimationFrame(step);
	}

	function initCounters() {
		var counters = document.querySelectorAll('.project-counter .count');
		if (!counters.length) return;

		var triggered = false;

		function checkTrigger() {
			var first = counters[0];
			if (!first) return;
			var rect = first.getBoundingClientRect();
			if (rect.top < window.innerHeight && !triggered) {
				triggered = true;
				counters.forEach(animateCounter);
				window.removeEventListener('scroll', checkTrigger);
			}
		}

		window.addEventListener('scroll', checkTrigger);
		checkTrigger();
	}
	initCounters();

	/* ---------- Projects horizontal drag scroll ---------- */
	function initProjectsScroll() {
		var collection = document.querySelector('.home__project .collection');
		var wrapper = document.querySelector('.home__project .wrapper');
		if (!collection || !wrapper) return;

		var isDown = false;
		var startX = 0;
		var scrollLeft = 0;

		collection.addEventListener('mousedown', function (e) {
			isDown = true;
			startX = e.pageX - collection.offsetLeft;
			scrollLeft = collection.scrollLeft;
		});

		collection.addEventListener('mouseleave', function () {
			isDown = false;
		});

		collection.addEventListener('mouseup', function () {
			isDown = false;
		});

		collection.addEventListener('mousemove', function (e) {
			if (!isDown) return;
			e.preventDefault();
			var x = e.pageX - collection.offsetLeft;
			var walk = (x - startX) * 1.5;
			collection.scrollLeft = scrollLeft - walk;
		});

		// Touch support
		var touchStartX = 0;
		var touchScrollLeft = 0;
		var isTouching = false;

		collection.addEventListener('touchstart', function (e) {
			touchStartX = e.touches[0].clientX;
			touchScrollLeft = collection.scrollLeft;
			isTouching = true;
		});

		collection.addEventListener('touchmove', function (e) {
			if (!isTouching) return;
			var x = e.touches[0].clientX;
			var walk = (x - touchStartX) * 1.5;
			collection.scrollLeft = touchScrollLeft - walk;
		});

		collection.addEventListener('touchend', function () {
			isTouching = false;
		});
	}
	initProjectsScroll();

	/* ---------- Swiper: Awards ---------- */
	function initAwardSwiper() {
		var awardEl = document.getElementById('awardSlides');
		if (!awardEl || typeof Swiper === 'undefined') return;

		new Swiper(awardEl, {
			slidesPerView: 1.2,
			spaceBetween: 20,
			loop: true,
			speed: 8000,
			allowTouchMove: true,
			autoplay: {
				delay: 0,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
			breakpoints: {
				480: { slidesPerView: 2, spaceBetween: 20 },
				768: { slidesPerView: 3, spaceBetween: 24 },
				1280: { slidesPerView: 5, spaceBetween: 30 },
			},
		});
	}
	initAwardSwiper();

	/* ---------- Swiper: Clientele ---------- */
	function initClienteleSwiper() {
		var clienteleEl = document.getElementById('clienteleScroller');
		if (!clienteleEl || typeof Swiper === 'undefined') return;

		new Swiper(clienteleEl, {
			slidesPerView: 2,
			spaceBetween: 30,
			loop: true,
			speed: 6000,
			allowTouchMove: true,
			grabCursor: true,
			autoplay: {
				delay: 0,
				disableOnInteraction: false,
			},
			breakpoints: {
				480: { slidesPerView: 3 },
				768: { slidesPerView: 4 },
				1024: { slidesPerView: 5, spaceBetween: 40 },
				1280: { slidesPerView: 6, spaceBetween: 40 },
			},
		});
	}
	initClienteleSwiper();

	/* ---------- AOS (Animate On Scroll) ---------- */
	if (typeof AOS !== 'undefined') {
		AOS.init({
			duration: 800,
			easing: 'ease-in-out',
			once: true,
		});
	}

});

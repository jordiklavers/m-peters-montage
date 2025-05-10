initDesktopNavMenu();
dienstenItemHover();
initReviewsSwiper();
faqItemsAnimation();
projectenSwiper();
initParralaxImg();

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create("main", "M0,0 C0.65,0.01 0.05,0.99 1,1");

gsap.defaults({
  ease: "main",
  duration: 0.4,
});

function initDesktopNavMenu() {
  let navWrap = $(".nav_menu");
  let overlay = navWrap.find(".nav_overlay");
  let menu = navWrap.find(".nav_menu-wrap");
  let bg = navWrap.find(".nav_menu-bg");
  let menuLinks = navWrap.find(".nav_menu-link");
  let lineWrap = $(".nav_menu-btn-linewrap")
  let topLine = $(".nav_menu-btn-line1");
  let bottomLine = $(".nav_menu-btn-line2");
  let menuToggles = $("[data-menu-toggle]");
  let html = $("html");

  // OPEN NAV
  let openNav = () => {
    let tl = gsap.timeline();

    navWrap.attr("data-nav", "open");

    // lenis.stop()

    tl.clear()
    tl.set(navWrap, { display: "block" })
    tl.set(menu, { xPercent: 0 }, "<")
    tl.fromTo(topLine, { rotate: 0, xPercent: 0, y: 0 }, { rotate: 90, xPercent: 0, y: 5 }, "<")
    tl.fromTo(bottomLine, { rotate: 0, xPercent: 0, y: 0 }, { rotate: 0, xPercent: 0, y: -5 },
      "<")
    tl.to(lineWrap, { rotate: 45, duration: 0.6 }, "<+50%")
    tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
    tl.fromTo(bg, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.75 }, "<")
    tl.fromTo(".nav_menu-link", { yPercent: 100 }, { yPercent: 0, stagger: 0.1 }, "<+50%")

    $("body").addClass("no-scroll");

    // Add Escape key event listener
    $(document).on("keydown", handleEscapeKey);
  };

  // CLOSE NAV
  const closeNav = () => {
    let tl = gsap.timeline()
    navWrap.attr("data-nav", "closed");
    console.log("Closing nav...");

    //  lenis.start()

    tl.to(lineWrap, { rotate: 0, duration: 0.6 }, "<")
    tl.to(topLine, { rotate: 0, xPercent: 0, y: 0 }, "<+50%")
    tl.to(bottomLine, { rotate: 0, xPercent: 0, y: 0 }, "<")
    tl.to(menu, { xPercent: 120, duration: 1 }, "<")
    tl.to(overlay, { autoAlpha: 0 }, "<")
    tl.set(navWrap, { display: "none" });

    $("body").removeClass("no-scroll");

    // Remove Escape key event listener
    $(document).off("keydown", handleEscapeKey);
  };

  // HANDLE ESCAPE KEY
  const handleEscapeKey = (e) => {
    if (e.key === "Escape") {
      let state = navWrap.attr("data-nav");
      if (state === "open") {
        closeNav();
      }
    }
  };

  // TOGGLE NAV
  menuToggles.each(function () {
    $(this).on("click", function () {
      let state = navWrap.attr("data-nav"); // Controleer de actuele waarde
      if (state === "closed") {
        openNav(); // Open navigatie
      } else if (state === "open") {
        closeNav(); // Sluit navigatie
      }
    });
  });
}

function dienstenItemHover() {
  let trigger = $(".diensten_item");

  trigger.each(function () {
    let firstArrow = $(this).find(".diensten_link-icon1");
    let secondArrow = $(this).find(".diensten_link-icon2");
    let img = $(this).find("img");

    // Maak een timeline voor elke trigger, pauzeer deze standaard
    let tl = gsap.timeline({ paused: true });

    tl.fromTo(
      firstArrow, { x: "0%", y: "0%" }, { x: "100%", y: "-100%", duration: 0.3 }
    ).fromTo(
      secondArrow, { x: "-100%", y: "100%" }, { x: "0%", y: "0%", duration: 0.3 },
      "<" // Gelijktijdig met de vorige animatie
    );
    tl.fromTo(img, { scale: 1 }, { scale: 1.1 }, "<");

    // Hover events om de timeline te spelen of terug te zetten
    $(this).on("mouseenter", () => tl.play());
    $(this).on("mouseleave", () => tl.reverse());
  });
}

function initReviewsSwiper() {
  let swiper = new Swiper(".swiper.is-reviews", {
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    autoplay: {
      delay: 8000,
    },

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 24
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        spaceBetween: 24
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 2.5,
        spaceBetween: 24
      }
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-forward',
      prevEl: '.swiper-button-previous',
    },
  })
}

function faqItemsAnimation() {
  const faqItems = $(".faq_item");
  let currentOpenItem = null;

  faqItems.each(function () {
    const item = $(this);
    const title = item.find(".faq_title");
    const answer = item.find(".faq_answer-wrap");
    const icon = title.find("svg");

    // Set initial states
    answer.height(0);
    item.attr("data-open", "false");

    title.on("click", function () {
      const isOpen = item.attr("data-open") === "true";

      if (currentOpenItem && !currentOpenItem.is(item)) {
        // Close the previously open item
        toggleItem(currentOpenItem, false);
      }

      // Toggle the clicked item
      toggleItem(item, !isOpen);

      currentOpenItem = isOpen ? null : item;
    });
  });

  function toggleItem(item, open) {
    const answer = item.find(".faq_answer-wrap");
    const icon = item.find(".faq_title svg");

    item.attr("data-open", open.toString());

    gsap.to(icon[0], { rotation: open ? 45 : 0, duration: 0.7 });
    gsap.to(answer[0], { height: open ? "auto" : 0, duration: 0.7 });
  }
}

function projectenSwiper() {
  let projectSwiper = new Swiper(".swiper.is-projecten", {
    loop: true,
    centeredSlides: true,
    createElements: true,
    autoplay: {
      delay: 3000,
    },
    pagination: true,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 24
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 24
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4,
        spaceBetween: 24
      }
    },
  })
}

function initParralaxImg() {
  $('[data-img-container]').each(function () {
    const imgContainer = $(this);
    const imgItem = imgContainer.find("img");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: imgContainer, // Gebruik het DOM-element uit de jQuery-selectie
        scrub: true,
        pin: false,
      }
    });

    tl.fromTo(imgItem, { // Gebruik het DOM-element uit de jQuery-selectie
      yPercent: -20,
      ease: 'none'
    }, {
      yPercent: 20,
      ease: 'none'
    });
  });
}

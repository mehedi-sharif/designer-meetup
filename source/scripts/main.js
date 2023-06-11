(function () {
  "use strict";

  // ########################## Preloader ##############################
  // window.addEventListener("load", (e) => {
  //   document.querySelector(".preloader").style.display = "none";
  // });
  //close menu
  document.getElementById("menu-close").addEventListener("click", () => {
    document.getElementById("nav-toggle").checked = false;
  });

  //inti marquees
  const marquees = document.querySelectorAll(".marquee");
  [...marquees].forEach((marquee) => {
    if (!marquee) return;
    new Marquee(marquee, {
      duplicated: true,
      speed: 20,
      startVisible: true,
      gap: 24,
    });
  });

  //sponsors carousel
  if (window.innerWidth >= 768) {
    new Swiper(".sponsor-carousel", {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 24,
      breakpoints: {
        650: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        992: {
          slidesPerView: 6,
          spaceBetween: 70,
        },
      },
    });
  }

  if (window.innerWidth <= 991.98) {
    new Swiper(".gallery-carousel", {
      loop: true,
      slidesPerView: 1.2,
      spaceBetween: 24,
    });
  }

  //scroll marquee
  const marqueeElements = [...document.querySelectorAll(".scroll-marquee")];
  window.addEventListener("load", () => {
    function initScrollMarquee() {
      marqueeElements
        .map((item, index) => {
          const wrapperElement = item.querySelector(".scroll-marquee-wrapper");
          return {
            ele: item,
            wrapperEl: wrapperElement,
            scrollX: item.scrollWidth - item.clientWidth,
            direction: index % 2 === 0 ? 1 : -1,
          };
        })
        .forEach((marquee) => {
          if (marquee.direction === -1) {
            gsap.set(marquee.wrapperEl, { x: -marquee.scrollX });
            gsap.to(marquee.wrapperEl, {
              x: 0,
              scrollTrigger: {
                trigger: marquee.ele,
                start: "bottom bottom",
                end: "bottom 20",
                fastScroll: true,
                scrub: 0.5,
              },
            });
          } else {
            gsap.to(marquee.wrapperEl, {
              x: -marquee.scrollX,
              scrollTrigger: {
                trigger: marquee.ele,
                start: "bottom bottom",
                end: "bottom 20",
                fastScroll: true,
                scrub: 0.5,
              },
            });
          }
        });
    }

    initScrollMarquee();
    window.addEventListener("resize", () => {
      initScrollMarquee();
    });

    //add navigation active state
    document.querySelectorAll(".nav-link").forEach((link, index, arr) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        arr.forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
        const href = e.currentTarget.getAttribute("href");
        const section = document.getElementById(href.replace("#", ""));
        if (!section) return;
        if (href.match(/^#/)) {
          const position = getCoords(section);
          window.scrollTo({
            top: position.top - document.querySelector(".header").clientHeight,
            behavior: "smooth",
          });

          document.querySelector("#nav-toggle").checked = false;
        }
      });
    });
  });

  document.querySelectorAll(".navigator").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute("href");
      const section = document.getElementById(href.replace("#", ""));
      if (!section) return;
      if (href.match(/^#/)) {
        const position = getCoords(section);
        window.scrollTo({
          top: position.top - document.querySelector(".header").clientHeight,
          behavior: "smooth",
        });
      }
    });
  });

  function getCoords(elem) {
    // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
  }

  //parallax
  const wrapper = document.querySelector(".wrapper");
  const parallaxVideo = document.querySelector(".parallax-video");

  const topPos = window.innerWidth > 992 ? "top 20%" : "top 30%";

  gsap.to(parallaxVideo, {
    scrollTrigger: {
      trigger: wrapper,
      start: topPos,
      end: "bottom center",
      scrub: 1,
      pin: parallaxVideo,
    },
  });

  //filter-programs
  const filterNavItems = document.querySelectorAll(".filter-nav li");
  const allPrograms = document.querySelector(".all-programs");

  const shuffleInstance = new Shuffle(allPrograms, {
    itemSelector: ".program",
  });

  filterNavItems.forEach((item) => {
    item.addEventListener("click", function () {
      const group = this.dataset.group;
      filterNavItems.forEach((item) => item.classList.remove("active"));
      item.classList.add("active");
      if (group === "all") {
        shuffleInstance.filter();
        return;
      }
      shuffleInstance.filter(group);
    });
  });

  // // ########################## Tab ##########################
  function setActiveTab(tabGroup, tabName, tabGroupName) {
    const tabsNav = tabGroup.querySelector(
      `[data-tab-group=${tabGroupName}] [data-tab-nav]`
    );
    const tabsContent = tabGroup.querySelector(
      `[data-tab-group=${tabGroupName}] [data-tab-content]`
    );
    tabsNav.querySelectorAll("[data-tab]").forEach((tabNavItem) => {
      tabNavItem.classList.remove("active");
    });
    tabsContent
      .querySelectorAll(
        `[data-tab-group=${tabGroupName}] > [data-tab-content] > [data-tab-panel]`
      )
      .forEach((tabPane) => {
        tabPane.classList.remove("active");
      });

    const selectedTabNavItem = tabsNav.querySelector(
      `[data-tab-group=${tabGroupName}] [data-tab-nav] > [data-tab="${tabName}"]`
    );
    selectedTabNavItem.classList.add("active");
    const selectedTabPane = tabsContent.querySelector(
      `[data-tab-group=${tabGroupName}] > [data-tab-content] > [data-tab-panel="${tabName}"]`
    );
    selectedTabPane.classList.add("active");
  }

  const tabGroups = document.querySelectorAll("[data-tab-group]");
  tabGroups.forEach((tabGroup) => {
    const tabsNav = tabGroup.querySelector("[data-tab-nav]");
    const tabsNavItem = tabsNav.querySelectorAll("[data-tab]");
    const tabGroupName = tabGroup.dataset.tabGroup;
    const activeTabName =
      localStorage.getItem(`activeTabName-${tabGroup.dataset.tabGroup}`) ||
      tabsNavItem[0].getAttribute("data-tab");

    setActiveTab(tabGroup, activeTabName, tabGroupName);

    tabsNavItem.forEach((tabNavItem) => {
      tabNavItem.addEventListener("click", () => {
        const tabName = tabNavItem.dataset.tab;
        setActiveTab(tabGroup, tabName, tabGroupName);
        localStorage.setItem(
          `activeTabName-${tabGroup.dataset.tabGroup}`,
          tabName
        );
      });
    });
  });

  // play audio onclick speaker-icon
  const audioPlayBtn = document.querySelector(".audio-play");
  const audio = document.querySelector(".audio");
  audioPlayBtn.addEventListener("click", () => {
    audio.play();
  });

  const cursor = document.getElementById("custom-cursor");
  document.addEventListener("mousemove", function (e) {
    var x = e.clientX;
    var y = e.clientY;
    cursor.style.transform = "translate(" + x + "px, " + y + "px)";
  });
})();

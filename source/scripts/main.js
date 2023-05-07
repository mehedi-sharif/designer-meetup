(function () {
  "use strict";

  // ########################## Preloader ##############################
  // window.addEventListener("load", (e) => {
  //   document.querySelector(".preloader").style.display = "none";
  // });
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


  //scroll marquee 
  const marqueeElements = [...document.querySelectorAll(".scroll-marquee")];
  window.addEventListener('load', () => {
    function initScrollMarquee () {
      marqueeElements.map((item, index) => {
        const wrapperElement = item.querySelector('.scroll-marquee-wrapper');
        return {ele: item, wrapperEl: wrapperElement, scrollX: item.scrollWidth - item.clientWidth, direction: index % 2 === 0 ? 1 : -1}
      }).forEach(marquee => {
        if(marquee.direction === -1 ) {
          gsap.set(marquee.wrapperEl, {x: -marquee.scrollX})
          gsap.to(marquee.wrapperEl, {
            x: 0,
            scrollTrigger: {
              trigger: marquee.ele,
              start: "bottom bottom",
              end: 'bottom 20',
              fastScroll: true,
              scrub: .5,
            },
          });
        } else {
          gsap.to(marquee.wrapperEl, {
            x: -marquee.scrollX,
            scrollTrigger: {
              trigger: marquee.ele,
              start: "bottom bottom",
              end: 'bottom 20',
              fastScroll: true,
              scrub: .5,
            },
          });
        }
      })
    }
  
    initScrollMarquee()
    window.addEventListener('resize', () => {
      initScrollMarquee()
    })
  })

  //parallax
  const wrapper = document.querySelector('.wrapper');
  const parallaxBg = document.querySelector('.parallax-bg');

  gsap.to(parallaxBg, {
    // yPercent: 100,
    // backgroundPositionY: 90,
    scrollTrigger: {
      trigger: wrapper,
      start: 'top 40%',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: self => {
        if(window.innerWidth >= 992) {
          parallaxBg.style.backgroundPositionY = `${wrapper.clientHeight / 1.1 * self.progress}px`
        } else {
          parallaxBg.style.backgroundPositionY = `${wrapper.clientHeight /1.05 * self.progress}px`
        }
      }
    }
  })


  // // ########################## Tab ##########################
  function setActiveTab(tabGroup, tabName, tabGroupName) {
    const tabsNav = tabGroup.querySelector(`[data-tab-group=${tabGroupName}] [data-tab-nav]`);
    const tabsContent = tabGroup.querySelector(`[data-tab-group=${tabGroupName}] [data-tab-content]`);
    console.log(tabsNav)
    tabsNav.querySelectorAll("[data-tab]").forEach((tabNavItem) => {
      tabNavItem.classList.remove("active");
    });
    tabsContent.querySelectorAll(`[data-tab-group=${tabGroupName}] > [data-tab-content] > [data-tab-panel]`).forEach((tabPane) => {
      tabPane.classList.remove("active");
    });

    const selectedTabNavItem = tabsNav.querySelector(`[data-tab-group=${tabGroupName}] [data-tab-nav] > [data-tab="${tabName}"]`);
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

  // // ########################## Accordion ##########################
  // const accordion = document.querySelectorAll("[data-accordion]");
  // accordion.forEach((header) => {
  //   header.addEventListener("click", () => {
  //     const accordionItem = header.parentElement;
  //     accordionItem.classList.toggle("active");
  //   });
  // });

  // // ########################## Modal ##############################
  // const openModalButtons = document.querySelectorAll("[data-modal-open]");
  // const closeModalButtons = document.querySelectorAll("[data-modal-close]");

  // function openModal(modal) {
  //   if (modal === null) {
  //     return null;
  //   }
  //   const overlay = modal.querySelector("[data-modal-overlay]");
  //   modal.style.display = "block";
  //   overlay.style.display = "block";
  // }

  // function closeModal(modal) {
  //   if (modal === null) {
  //     return null;
  //   }
  //   const overlay = modal.querySelector("[data-modal-overlay]");
  //   modal.style.display = "none";
  //   overlay.style.display = "none";
  // }

  // openModalButtons.forEach((button) => {
  //   button.addEventListener("click", () => {
  //     const modal = button.nextElementSibling;
  //     openModal(modal);
  //   });
  // });

  // closeModalButtons.forEach((button) => {
  //   button.addEventListener("click", () => {
  //     const modal = button.closest("[data-modal]");
  //     closeModal(modal);
  //   });
  // });
})();

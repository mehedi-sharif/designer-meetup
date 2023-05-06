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
          console.log(marquee)
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


  // gsap.to(".scroll-marquee-wrapper", {
  //   x: -(scroller.scrollWidth),
  //   duration: 1.5,
  //   scrollTrigger: {
  //     trigger: ".scroll-marquee",
  //     start: "bottom bottom",
  //     end: () => `+=${window.innerHeight * .75}`,
  //     fastScroll: true,
  //     scrub: 1,
  //   },
  // });

  // ####################### Testimonial Slider #########################
  // new Swiper(".testimonial-slider", {
  //   spaceBetween: 24,
  //   loop: true,
  //   pagination: {
  //     el: ".testimonial-slider-pagination",
  //     type: "bullets",
  //     clickable: true,
  //   },
  //   breakpoints: {
  //     768: {
  //       slidesPerView: 2,
  //     },
  //     992: {
  //       slidesPerView: 3,
  //     },
  //   },
  // });

  // // ########################## Tab ##########################
  // function setActiveTab(tabGroup, tabName) {
  //   const tabsNav = tabGroup.querySelector("[data-tab-nav]");
  //   const tabsContent = tabGroup.querySelector("[data-tab-content]");

  //   tabsNav.querySelectorAll("[data-tab]").forEach((tabNavItem) => {
  //     tabNavItem.classList.remove("active");
  //   });
  //   tabsContent.querySelectorAll("[data-tab-panel]").forEach((tabPane) => {
  //     tabPane.classList.remove("active");
  //   });

  //   const selectedTabNavItem = tabsNav.querySelector(`[data-tab="${tabName}"]`);
  //   selectedTabNavItem.classList.add("active");
  //   const selectedTabPane = tabsContent.querySelector(
  //     `[data-tab-panel="${tabName}"]`
  //   );
  //   selectedTabPane.classList.add("active");
  // }
  // const tabGroups = document.querySelectorAll("[data-tab-group]");
  // tabGroups.forEach((tabGroup) => {
  //   const tabsNav = tabGroup.querySelector("[data-tab-nav]");
  //   const tabsNavItem = tabsNav.querySelectorAll("[data-tab]");
  //   const activeTabName =
  //     localStorage.getItem(`activeTabName-${tabGroup.dataset.tabGroup}`) ||
  //     tabsNavItem[0].getAttribute("data-tab");

  //   setActiveTab(tabGroup, activeTabName);

  //   tabsNavItem.forEach((tabNavItem) => {
  //     tabNavItem.addEventListener("click", () => {
  //       const tabName = tabNavItem.dataset.tab;
  //       setActiveTab(tabGroup, tabName);
  //       localStorage.setItem(
  //         `activeTabName-${tabGroup.dataset.tabGroup}`,
  //         tabName
  //       );
  //     });
  //   });
  // });

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

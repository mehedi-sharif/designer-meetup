// import Swiper from '../plugins/swiper/swiper-bundle.js';

(function () {
  "use strict";

  // Preloader js
  // window.addEventListener("load", (e) => {
  //   document.querySelector(".preloader").style.display = "none";
  // });

  // swiper slider
  new Swiper(".swiper", {
    loop: true,
    spaceBetween: 50,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return `<span class=${className}>${index + 1}</span>`;
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // for tab component
  // Get all the tab groups on the page
  const tabGroups = document.querySelectorAll("[data-tab-group]");
  // Loop through each tab group
  tabGroups.forEach((tabGroup) => {
    // Get the tabs nav and content for this tab group
    const tabsNav = tabGroup.querySelector("[data-tab-nav]");
    const tabsNavItem = tabsNav.querySelectorAll("[data-tab]");

    // Get the active tab index from local storage, or default to 0 if not set
    const activeTabName =
      localStorage.getItem(`activeTabName-${tabGroup.dataset.tabGroup}`) ||
      tabsNavItem[0].getAttribute("data-tab");

    // Set the active tab
    setActiveTab(tabGroup, activeTabName);

    // Add a click event listener to each tab nav item
    tabsNavItem.forEach((tabNavItem) => {
      tabNavItem.addEventListener("click", () => {
        // Get the index of the clicked tab nav item
        const tabName = tabNavItem.dataset.tab;
        setActiveTab(tabGroup, tabName);

        // Save the active tab index to local storage
        localStorage.setItem(
          `activeTabName-${tabGroup.dataset.tabGroup}`,
          tabName
        );
      });
    });
  });

  // Function to set the active tab for a given tab group
  function setActiveTab(tabGroup, tabName) {
    // Get the tabs nav and content for this tab group
    const tabsNav = tabGroup.querySelector("[data-tab-nav]");
    const tabsContent = tabGroup.querySelector("[data-tab-content]");

    // Remove the active class from all tab nav items and content panes
    tabsNav.querySelectorAll("[data-tab]").forEach((tabNavItem) => {
      tabNavItem.classList.remove("active");
    });
    tabsContent.querySelectorAll("[data-tab-panel]").forEach((tabPane) => {
      tabPane.classList.remove("active");
    });

    // Add the active class to the selected tab nav item and content pane
    const selectedTabNavItem = tabsNav.querySelector(`[data-tab="${tabName}"]`);
    selectedTabNavItem.classList.add("active");
    const selectedTabPane = tabsContent.querySelector(
      `[data-tab-panel="${tabName}"]`
    );
    selectedTabPane.classList.add("active");
  }

  // modal components
  const modal = document.getElementById("modal");
  const modalContainer = document.getElementById("modal-container");
  const modalOpenBtn = document.getElementById("modal-open-button");
  const modalCloseBtn = document.getElementById("modal-close-button");

  // modal open button
  modalOpenBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modalContainer.classList.remove("hidden");
  });

  // modal close button
  modalCloseBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    modalContainer.classList.add("hidden");
  });

  // Close the modal click on the modal container
  modalContainer.addEventListener("click", () => {
    modal.classList.add("hidden");
    modalContainer.classList.add("hidden");
  });

  // Accordion component
  const ghtmAccordion = document.querySelectorAll("[data-accordion]");
  ghtmAccordion.forEach((header) => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      accordionItem.classList.toggle("active");
    });
  });

  // toast component
  const showToast = () => {
    const toast = document.getElementById("toast");
    toast.classList.remove("hidden");

    setTimeout(() => {
      toast.classList.add("hidden");
    }, 3000);
  };
  const toastButton = document.getElementById("toast-button");
  toastButton.addEventListener("click", () => {
    showToast();
  });
})();

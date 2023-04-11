(function () {
  "use strict";
  // Navbar Toggler
  // ----------------------------------------
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarMenu = document.querySelector(".navbar-wrapper");

  navbarToggler?.addEventListener("click", (e) => {
    navbarToggler.classList.toggle("active");
    navbarMenu.classList.toggle("active");
  });


  // Sidebar Collapse in Small Devices
  // ----------------------------------------
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggleBtn = document.querySelector(".sidebar-toggler");

  sidebarToggleBtn?.addEventListener("click", (e) => {
    if (sidebarToggleBtn.classList.contains("active")) {
      let overylay = document.querySelector(".overlay");
      overylay.remove();
    } else {
      let overylay = document.createElement("div");
      overylay.className = "overlay block lg:hidden bg-dark-100 bg-opacity-70 z-[999] w-screen h-screen fixed left-0 top-0";
      overylay.addEventListener("click", () => {
        sidebarToggleBtn.click();
      });

      sidebar.parentElement.appendChild(overylay);
    }


    sidebarToggleBtn.classList.toggle("active");
    sidebar.classList.toggle("active");
  });
  

  // Dropdown Menu Toggler For Mobile
  // ----------------------------------------
  const dropdownMenuToggler = document.querySelectorAll(
    ".nav-dropdown > .nav-link"
  );

  dropdownMenuToggler.forEach((toggler) => {
    toggler?.addEventListener("click", (e) => {
      e.target.parentElement.classList.toggle("active");
    });
  });


  // for tab component
  // Get all the tab groups on the page
  const tabGroups = document.querySelectorAll("[data-tab-group]");

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
  const accordion = document.querySelectorAll("[data-accordion]");
  accordion.forEach((header) => {
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

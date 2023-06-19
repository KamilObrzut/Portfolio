//Loading
window.addEventListener("load", () => {
  const elementsWithBackgroundImage = document.querySelectorAll(".preload");

  let loadedCount = 0;
  let totalElementsWithBackgroundImage = 0;

  elementsWithBackgroundImage.forEach(function (element) {
    const computedStyle = getComputedStyle(element);
    const backgroundImage = computedStyle.backgroundImage;
    if (backgroundImage !== "none") {
      const imageUrl = backgroundImage.slice(5, -2);

      const image = new Image();
      image.onload = function () {
        loadedCount++;

        if (loadedCount === totalElementsWithBackgroundImage) {
          elementsWithBackgroundImage.forEach(function (element) {
            element.classList.remove("preload", "disable");
          });

          const loading = document.querySelector(".loading");
          loading.classList.add("disable");
        }
      };
      image.src = imageUrl;

      totalElementsWithBackgroundImage++;
    }
  });
});

// Logo/refresh
const btnRefresh = document.querySelector(".logo");
const refresh = () => {
  location.reload();
};
btnRefresh.addEventListener("click", refresh);

// Small popup
const elements = document.querySelectorAll(".clicked");
const popup = document.querySelector(".popup-small");
const btnShow = document.querySelector(".btn-show");
const btnTrash = document.querySelector(".btn-trash");
const btnChangeColor = document.querySelector(".btn-change-color");
const bin = document.querySelector(".bin");

let currentElement = null;

const showPopup = (element, top, left) => {
  currentElement = element;
  popup.style.top = `${top}px`;
  popup.style.left = `${left}px`;
  popup.classList.add("active");
};

elements.forEach((element) => {
  element.addEventListener("click", (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains("table")) {
      const tableRect = clickedElement.getBoundingClientRect();
      const top = tableRect.top + window.scrollY;
      const left = tableRect.left + window.scrollX;
      showPopup(clickedElement, top, left);
    }
    if (clickedElement.classList.contains("flower-left")) {
      const { top, left } = clickedElement.getBoundingClientRect();
      showPopup(clickedElement, top + 100, left + 50);
    } else {
      const { top, left } = clickedElement.getBoundingClientRect();
      showPopup(clickedElement, top, left);
    }
  });
});

btnShow.addEventListener("click", () => {
  if (currentElement) {
    const targetClass = currentElement.dataset.target;
    const sectionToShow = document.querySelector(`.${targetClass}`);
    sectionToShow.classList.add("active");
  }
  popup.classList.remove("active");
});

btnTrash.addEventListener("click", () => {
  if (currentElement) {
    if (currentElement.classList.contains("table")) {
      const tableChildren = currentElement.querySelectorAll(".clicked");
      tableChildren.forEach((child) => {
        const clonedChild = child.cloneNode(true);
        bin.appendChild(clonedChild);
        child.classList.add("disable");
      });
    } else {
      const clonedElement = currentElement.cloneNode(true);
      bin.appendChild(clonedElement);
      currentElement.classList.add("disable");
    }
  }
  popup.classList.remove("active");
});

//btnChangeColor.addEventListener("click", () => {
//  if (currentElement) {
//    const newColor = "path/to/new/image.jpg";
//    currentElement.style.backgroundImage = `url(${newColor})`;
//  }
//  popup.classList.remove("active");
//});

// Hide elements
const hideObjects = [];

btnTrash.addEventListener("click", (event) => {
  if (currentElement) {
    if (currentElement.classList.contains("table")) {
      const tableChildren = currentElement.querySelectorAll(".clicked");
      hideObjects.push(...tableChildren);
    }
    if (currentElement.classList.contains("screen-one") || currentElement.classList.contains("screen-two")) {
      currentElement.classList.add("disable");
      currentElement.parentElement.classList.add("disable");
      hideObjects.push(currentElement);
      hideObjects.push(currentElement.parentElement);
    } else {
      currentElement.classList.add("disable");
      hideObjects.push(currentElement);
    }
    popup.classList.remove("active");
  }
});

// Bin popup
const hideElements = document.querySelector(".hide-elements");
let lastHideObjectIndex = 0;
let addedParagraphs = [];

const showBin = () => {
  for (let i = lastHideObjectIndex; i < hideObjects.length; i++) {
    const dataValue = hideObjects[i].getAttribute("data");

    if (addedParagraphs.includes(dataValue)) {
      continue;
    }

    const p = document.createElement("p");
    p.textContent = dataValue;
    hideElements.appendChild(p);
    addedParagraphs.push(dataValue);
  }
  bin.classList.add("active");
};

const checkHideObjects = () => {
  if (hideObjects.length > lastHideObjectIndex) {
    showBin();
    lastHideObjectIndex = hideObjects.length;
  }
};

Object.defineProperty(hideObjects, "push", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: function (...items) {
    Array.prototype.push.apply(this, items);
    checkHideObjects();
  },
});

// Restore elements
const btnRestore = document.querySelector(".btn-restore");

const restoreItems = () => {
  const allHideElements = document.querySelectorAll(".disable");

  allHideElements.forEach((element) => {
    if (element.classList.contains("loading")) {
      return;
    } else {
      element.classList.remove("disable");
      bin.classList.remove("active");
      hideElements.innerHTML = "";
      addedParagraphs = [];
    }
  });
  addedParagraphs = [];
};

btnRestore.addEventListener("click", restoreItems);

//About me
const pictureAboutMe = document.querySelector(".picture-one");

const btnCloseAboutme = document.querySelector(".btn-close-aboutme");
const aboutMe = document.querySelector(".popup-aboutme");

const closeAboutMe = () => {
  aboutMe.classList.remove("active");
};
btnCloseAboutme.addEventListener("click", closeAboutMe);

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

const btnRefresh = document.querySelector(".logo");
const refresh = () => {
  location.reload();
};
btnRefresh.addEventListener("click", refresh);

const allElements = document.querySelectorAll(".clicked");
const popupSmall = document.querySelector(".popup-small");

let clickedElement = null;
const hideObjects = [];

allElements.forEach((object) => {
  object.addEventListener("click", (event) => {
    clickedElement = event.currentTarget;
    const { top, left, width, height } = clickedElement.getBoundingClientRect();
    const popupWidth = 70;
    const popupHeight = 50;
    if (object.classList.contains("flower-left")) {
      const popupTop = top + height / 2 - popupHeight / 2;
      const popupLeft = left + width / 2 - popupWidth / 2 + 60;

      popupSmall.style.top = `${popupTop}px`;
      popupSmall.style.left = `${popupLeft}px`;
      popupSmall.classList.toggle("active");
    } else {
      const popupTop = top + height / 2 - popupHeight / 2;
      const popupLeft = left + width / 2 - popupWidth / 2;

      popupSmall.style.top = `${popupTop}px`;
      popupSmall.style.left = `${popupLeft}px`;
      popupSmall.classList.toggle("active");
    }
  });

  const tableChildren = object.querySelectorAll(".clicked");
  tableChildren.forEach((child) => {
    child.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });
});

const btnTrash = document.querySelector(".btn-trash");

btnTrash.addEventListener("click", (event) => {
  if (clickedElement.classList.contains("table")) {
    const tableChildren = clickedElement.querySelectorAll(".clicked");
    hideObjects.push(...tableChildren);
  }
  if (clickedElement.classList.contains("screen-one") || clickedElement.classList.contains("screen-two")) {
    clickedElement.classList.add("disable");
    clickedElement.parentElement.classList.add("disable");
    hideObjects.push(clickedElement);
    hideObjects.push(clickedElement.parentElement);
  } else {
    clickedElement.classList.add("disable");
    hideObjects.push(clickedElement);
  }
  console.log(hideObjects);
});

const bin = document.querySelector(".bin");
const hideElements = document.querySelector(".hide-elements");
let lastHideObjectIndex = 0;

const showBin = () => {
  for (let i = lastHideObjectIndex; i < hideObjects.length; i++) {
    const p = document.createElement("p");
    p.textContent = hideObjects[i].getAttribute("data");
    hideElements.appendChild(p);
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

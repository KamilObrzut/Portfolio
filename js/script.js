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

allElements.forEach((object) => {
  object.addEventListener("click", (event) => {
    const clickedElement = event.currentTarget;
    const { top, left, width, height } = clickedElement.getBoundingClientRect();
    const popupWidth = 100;
    const popupHeight = 50;
    const popupTop = top + height / 2 - popupHeight / 2;
    const popupLeft = left + width / 2 - popupWidth / 2;

    popupSmall.style.top = `${popupTop}px`;
    popupSmall.style.left = `${popupLeft}px`;
    popupSmall.classList.toggle("active");
  });
  const tableChildren = object.querySelectorAll(".clicked");
  tableChildren.forEach((child) => {
    child.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });
});

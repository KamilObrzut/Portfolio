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

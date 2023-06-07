const done = document.querySelector(".done");
const btnDone = document.querySelector(".btn-done");

const showDone = () => {
  done.classList.toggle("disable");
};

btnDone.addEventListener("click", showDone);

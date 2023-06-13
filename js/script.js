const btnRefresh = document.querySelector(".btn-refresh");

const refresh = () => {
  location.reload();
};

btnRefresh.addEventListener("click", refresh);

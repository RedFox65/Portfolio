document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll("#a-propos li");
  const articles = document.querySelectorAll("#a-propos article");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {

      // retire active partout
      tabs.forEach(item => item.classList.remove("active"));
      articles.forEach(article => article.classList.remove("active"));

      // active onglet cliqué
      tab.classList.add("active");

      // récupère l'id cible
      const target = tab.dataset.target;
      const articleToShow = document.getElementById(target);

      if (articleToShow) {
        articleToShow.classList.add("active");
      }
    });
  });
});
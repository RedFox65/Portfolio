document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // SECTION A PROPOS
  // =========================

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


  // =========================
  // SECTION COMPETENCES
  // =========================

  const progressBars = document.querySelectorAll(".progress-bar");

  progressBars.forEach(bar => {

    const text = bar.querySelector("p");

    // texte original
    const originalText = text.textContent;

    // texte affiché au hover
    let hoverText = "";

    switch(originalText.trim()) {

      case "C":
        hoverText = "75%";
        break;

      case "Python":
        hoverText = "90%";
        break;

      case "Java":
        hoverText = "85%";
        break;

      case "Bash":
        hoverText = "70%";
        break;

      case "HTML / CSS":
        hoverText = "75%";
        break;

      case "PHP":
        hoverText = "30%";
        break;

      case "JavaScript":
        hoverText = "10%";
        break;

      case "MySQL":
        hoverText = "45%";
        break;

      case "pgSQL":
        hoverText = "45%";
        break;

      case "Tutorial D":
        hoverText = "20%";
        break;

      case "UML":
        hoverText = "65%";
        break;

      case "Git":
        hoverText = "70%";
        break;

      case "Figma":
        hoverText = "80%";
        break;

      case "Trello":
        hoverText = "95%";
        break;

      case "Project libre":
        hoverText = "55%";
        break;

      default:
        hoverText = originalText;
    }

    // souris entre
    bar.addEventListener("mouseenter", () => {
      text.textContent = hoverText;
    });

    // souris sort
    bar.addEventListener("mouseleave", () => {
      text.textContent = originalText;
    });

  });

});
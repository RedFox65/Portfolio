document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // SECTION A PROPOS
  // =========================

  const tabs = document.querySelectorAll(".a-propos-filtres li");
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
          hoverText = "70%";
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


  // =========================
  // SECTION PORTFOLIO (Filtres + Carrousel)
  // =========================
  const filtres = document.querySelectorAll(".portfolio-filtres li");
  const cartes = document.querySelectorAll(".portfolio-carte");
  const grid = document.querySelector(".portfolio-grid");
  const btnPrev = document.querySelector(".prev-btn");
  const btnNext = document.querySelector(".next-btn");
  
  let currentIndex = 0; // Stocke la position actuelle du carrousel
  const gap = 20;       // Doit être identique au gap CSS (20px)

  // Fonction magique pour faire glisser le carrousel
  const majCarrousel = () => {
    // On ne prend en compte que les cartes qui ne sont pas masquées par le filtre
    const cartesVisibles = Array.from(cartes).filter(carte => carte.style.display !== "none");
    
    // Le défilement max possible est : (total des cartes visibles) - 3
    const maxIndex = Math.max(0, cartesVisibles.length - 3);

    // Sécurités pour ne pas défiler dans le vide
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    // Si on a des cartes visibles, on calcule le décalage en pixels
    if (cartesVisibles.length > 0) {
      const largeurCarte = cartesVisibles[0].getBoundingClientRect().width;
      const deplacement = currentIndex * (largeurCarte + gap);
      grid.style.transform = `translateX(-${deplacement}px)`;
    } else {
      grid.style.transform = `translateX(0px)`;
    }
  };

  // Fonction pour trier les cartes (modifiée pour inclure le carrousel)
  const filtrerCartes = (categorie) => {
    cartes.forEach(carte => {
      if (carte.classList.contains(categorie)) {
        carte.style.display = "flex";
      } else {
        carte.style.display = "none";
      }
    });
    currentIndex = 0; // On revient au début à chaque changement de catégorie
    majCarrousel();   // Recalcule la position du carrousel
  };

  // Événements des Filtres
  if (filtres.length > 0 && cartes.length > 0) {
    const filtreActifAuChargement = document.querySelector(".portfolio-filtres li.active").getAttribute("data-filter");
    filtrerCartes(filtreActifAuChargement);

    filtres.forEach(filtre => {
      filtre.addEventListener("click", () => {
        filtres.forEach(f => f.classList.remove("active"));
        filtre.classList.add("active");
        const categorie = filtre.getAttribute("data-filter");
        filtrerCartes(categorie);
      });
    });
  }

  // Événements des Flèches du Carrousel
  if (btnPrev && btnNext) {
    btnPrev.addEventListener("click", () => {
      currentIndex--; // Recule de 1 projet
      majCarrousel();
    });

    btnNext.addEventListener("click", () => {
      currentIndex++; // Avance de 1 projet
      majCarrousel();
    });
  }


  // ======================
  // FENETRE MODALE
  // ======================
  // On récupère toutes les cartes du portfolio
  const cartesPortfolio = document.querySelectorAll(".portfolio-carte");

  // Pour chaque carte, on configure son bouton et sa modale
  cartesPortfolio.forEach(carte => {
      // On cherche les éléments uniquement à l'intérieur de CETTE carte
      const btnOuvrir = carte.querySelector(".projet-details");
      const modale = carte.querySelector(".modale-projet");
      const btnFermer = carte.querySelector(".btn-fermer");

      if (btnOuvrir && modale) {
          btnOuvrir.addEventListener("click", () => {
              modale.showModal();
          });
      }

      if (btnFermer && modale) {
          btnFermer.addEventListener("click", () => {
              modale.close();
          });
      }

      // Fermer la modale si on clique à l'extérieur de la boîte
      if (modale) {
          modale.addEventListener("click", (e) => {
              const rect = modale.getBoundingClientRect();
              const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.bottom &&
                                  rect.left <= e.clientX && e.clientX <= rect.right);
              if (!isInDialog) {
                  modale.close();
              }
          });
      }
  });


  // ======================
  // SECTION CONTACT
  // ======================
  const formulaire = document.querySelector(".contact-form");

  if (formulaire) {
    formulaire.addEventListener("submit", (e) => {
      // Empêche le rechargement par défaut de la page lors de la soumission
      e.preventDefault(); 
      
      // Petit message pour valider que le clic fonctionne
      alert("Merci pour ton message ! L'interface est prête. (Pour que l'email parte vraiment, il faudra lier ce formulaire à un script PHP ou une API comme Formspree par la suite).");
      
      // Vide les champs du formulaire après "l'envoi"
      formulaire.reset(); 
    });
  }
});
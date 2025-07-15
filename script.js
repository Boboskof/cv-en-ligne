
  // Animation de chargement
  window.addEventListener('load', function() {
    setTimeout(function() {
      const loading = document.getElementById('loading');
      loading.classList.add('fade-out');
      setTimeout(function() {
        loading.style.display = 'none';
      }, 500);
    }, 1000);
  });

  // Apparition au scroll améliorée
  const faders = document.querySelectorAll('.fade-in-section');
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Animation du titre principal
  document.addEventListener("DOMContentLoaded", function () {
    const titre = document.querySelector(".caption .titre");
    if (titre) {
      titre.classList.add("visible");
    }
  });




  document.addEventListener('DOMContentLoaded', () => {

  /* ───────── Références DOM ───────── */
  const bigCircles  = [...document.querySelectorAll('#menu-ronds .circle-link')];
  const miniWrap    = document.getElementById('petits-ronds');
  const svg         = document.getElementById('circuits');
  const title       = document.getElementById('main-title');

  /* ───────── Configuration des 6 ronds (ordre :      *
   *  Formation, Projets, Expérience, Autres, Compétences, CV)  */
  const cfg = [
    { ang: 200, extra:  10 },   // Formation
    { ang: 125, extra: 5 },     // Projets - déplacé de 0.5cm vers le haut et droite
    { ang:  -20, extra:   0 },   // Expérience
    { ang:   30, extra:   0 },   // Autres
    { ang:  270, extra: -50 },   // Compétences
    { ang:  150, extra:   0 }    // CV‑PDF
  ];

  const colors = ['#007bff','#28a745','#17a2b8','#20c997','#00bcd4','#5bc0de'];
  const sizes = [150, 130, 120, 150, 135, 90];   // ↑ +20 px pour 0, 1, 3

  /* ───────── Mise en place des gros ronds ───────── */
  bigCircles.forEach((el, i) => {
    el.style.setProperty('--size', sizes[i] + 'px');
    el.style.background = colors[i];
  });

  /* ───────── Création des petits ronds ───────── */
  const miniCircles = cfg.map(() => {
    const d = document.createElement('div');
    d.className = 'mini-circle';
    miniWrap.appendChild(d);
    return d;
  });

  /* ───────── Helpers ───────── */
  const clearSVG = () => (svg.innerHTML = '');

  /* Facteur de rayon : on compacte le rayon à 80 % sous 1010 px,
     mais **on ne change pas le diamètre des ronds**               */
  const radiusFactor = () => (window.innerWidth <= 1010 ? 0.8 : 1);

  const baseRadius = () =>
    0.5 * Math.min(window.innerWidth, window.innerHeight) * radiusFactor();

  function addCircuit(x1, y1, gx, gy, rad, idx) {
    /* connecte sur le BORD du gros rond */
    const dx = Math.cos(rad) * sizes[idx] / 2;
    const dy = Math.sin(rad) * sizes[idx] / 2;
    const endX = gx - dx;
    const endY = gy - dy;

    const path = `M${x1} ${y1} V${endY} H${endX}`;
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', path);
    p.classList.add('circuit');
    p.style.animationDelay = `${idx * 0.2}s`;
    svg.appendChild(p);
  }

  /* ───────── Positionnement global ───────── */
  function refresh() {
    clearSVG();

    const R0 = baseRadius();
    const tRect = title.getBoundingClientRect();
    const cx = tRect.left + tRect.width  / 2;
    const cy = tRect.top  + tRect.height / 2;

    cfg.forEach(({ ang, extra }, idx) => {
      const rad = ang * Math.PI / 180;
      const R   = R0 + extra;

      /* gros rond */
      const gx = cx + R * Math.cos(rad);
      const gy = cy + R * Math.sin(rad);
      const big = bigCircles[idx];
      big.style.left = `${gx - big.offsetWidth / 2}px`;
      big.style.top  = `${gy - big.offsetHeight / 2}px`;

      /* petit rond (60 % du rayon) */
      const rMini = R * 0.6;
      const sx = cx + rMini * Math.cos(rad);
      const sy = cy + rMini * Math.sin(rad);
      const mini = miniCircles[idx];
      mini.style.left = `${sx - mini.offsetWidth / 2}px`;
      mini.style.top  = `${sy - mini.offsetHeight / 2}px`;

      /* branche façon circuit */
      addCircuit(sx, sy, gx, gy, rad, idx);
    });
  }

  /* ───────── Init + Resize ───────── */
  refresh();
  window.addEventListener('resize', refresh);
  });

  


/* =========================
   INFO PAGE TOGGLE
   ========================= */

const infoLink = document.querySelector('.js-info');
const infoPage = document.getElementById('infoPage');
const infoClose = document.querySelector('.js-info-close');

function setInfoOpen(isOpen){
  document.body.classList.toggle('info-open', isOpen);
  if(infoPage){
    infoPage.setAttribute('aria-hidden', String(!isOpen));
  }
}

if(infoLink && infoPage){
  infoLink.addEventListener('click', (e) => {
    e.preventDefault();
    setInfoOpen(!document.body.classList.contains('info-open'));
  });

  infoPage.addEventListener('click', (e) => {
    if(e.target.closest('.info-page__inner')) return;
    setInfoOpen(false);
  });
}

if(infoClose){
  infoClose.addEventListener('click', (e) => {
    e.preventDefault();
    setInfoOpen(false);
  });
}




















/* =========================
   PROJECT + MODAL
   ========================= */

const grid = document.getElementById("projectGrid");
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalBody = document.getElementById("modalBody");

let lastFocusedEl = null;

const PROJECTS = [
  {
    id: "numero-berlin",
    title: "NUMERO BERLIN",
    meta: "Boris Ovini ",
    cover: "thmbs/31.jpeg",
    images: [
      "img/nb01.jpeg",
      "img/nb02.jpeg",
      "img/nb03.jpeg",
      "img/nb04.jpg",
      "img/nb05.jpg",
      "img/nb06.jpg",
      "img/nb07.jpg"
    ]
  },
  {
    id: "vogue-mexico",
    title: "VOGUE MEXICO",
    meta: "Ward Ivan Rafik",
    cover: "thmbs/32.jpg",
    images: [
      "img/vm01.jpg",
      "img/vm02.jpg",
      "img/vm03.jpg",
      "img/vm04.jpg"
    ]
  },
  {
    id: "replicaman",
    title: "REPLICA MAN",
    meta: "Pavel Golik",
    cover: "thmbs/22.webp",
    images: [
      "img/rm01.webp",
      "img/rm02.webp",
      "img/rm03.webp",
      "img/rm04.webp",
      "img/rm05.webp",
      "img/rm06.webp",
      "img/rm07.webp"
    ]
  },
  {
    id: "untitled",
    title: "UNTITLED.",
    meta: "Lucie Rox",
    cover: "thmbs/02.webp",
    images: [
      "img/un01.webp",
      "img/un02.webp",
      "img/un03.webp",
      "img/un04.webp",
      "img/un05.webp",
      "img/un06.webp"
  ]
  },
    {
    id: "sanstitle",
    title: "SANS-TITLE",
    meta: "Tess Petronio",
    cover: "thmbs/03.webp",
    images: [
      "img/st01.webp",
      "img/st02.webp",
      "img/st03.webp"
    ]
  },
      {
    id: "beautypapers",
    title: "BEAUTY PAPERS",
    meta: "Jérémie Monnier",
    cover: "thmbs/04.webp",
    images: [
      "img/bp01.webp",
      "img/bp02.webp",
      "img/bp03.webp",
      "img/bp04.webp"
    ]
  },
    {
    id: "personql01",
    title: "BEAUTY",
    meta: "",
    cover: "thmbs/01.webp",
    images: [
      "img/pp01.webp",
      "img/pp02.webp",
      "img/pp03.webp",
      "img/pp04.webp"
    ]
  },
  
];

function renderGrid(){
  if(!grid) return;

  grid.innerHTML = PROJECTS.map(p => `
    <article class="card" tabindex="0" role="button" data-project="${escapeHtml(p.id)}">
      <figure>
        <img src="${escapeHtml(p.cover)}" alt="${escapeHtml(p.title)}" loading="lazy" decoding="async">
      </figure>
      <div class="caption">${escapeHtml(p.title)}</div>
    </article>
  `).join("");
}

function openModal(projectId){
  if(!modal || !modalBody || !modalTitle || !modalMeta) return;

  const p = PROJECTS.find(x => x.id === projectId);
  if(!p) return;

  lastFocusedEl = document.activeElement;

  modalTitle.textContent = p.title;
  modalMeta.textContent = p.meta || "";

  modalBody.innerHTML = `
    <div class="modal-stack">
      ${p.images.map(src => `
        <div class="modal-slide">
          <img src="${escapeHtml(src)}" alt="" loading="lazy" decoding="async">
        </div>
      `).join("")}
    </div>
  `;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden","false");
  document.documentElement.classList.add("is-locked");
  document.body.classList.add("is-locked");

  modalBody.scrollTop = 0;
  modalBody.focus();
}

function closeModal(){
  if(!modal || !modalBody) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden","true");
  document.documentElement.classList.remove("is-locked");
  document.body.classList.remove("is-locked");

  modalBody.innerHTML = "";

  if(lastFocusedEl){
    lastFocusedEl.focus();
  }
}

if(grid){
  grid.addEventListener("click", (e) => {
    const card = e.target.closest("[data-project]");
    if(card) openModal(card.dataset.project);
  });

  grid.addEventListener("keydown", (e) => {
    if(e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest("[data-project]");
    if(!card) return;
    e.preventDefault();
    openModal(card.dataset.project);
  });
}

if(modal){
  modal.addEventListener("click", (e) => {
    if(e.target.closest("[data-close='1']")) closeModal();
  });
}

/* =========================
   ESC key (single source of truth)
   Priority: modal > info
   ========================= */

document.addEventListener('keydown', (e) => {
  if(e.key !== 'Escape') return;

  if(modal && modal.classList.contains('is-open')){
    closeModal();
    return;
  }

  setInfoOpen(false);
});

/* =========================
   Utils
   ========================= */

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

/* init */
renderGrid();

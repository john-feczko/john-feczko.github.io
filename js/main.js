/* ============================================================
   John Feczko — Portfolio
   Cards are static HTML (see index.html) for SEO and resilience.
   This file handles: filtering, the project detail modal
   (keyed by data-id), hash deep-links, and scroll reveals.
   ============================================================ */

const IMG = "assets/img/";

/* ---------- project detail database (modal content) ---------- */
const projects = {
  "ai-robot-guide": {
    title: "AI Robot Guide — Senior Research",
    context: "Villanova University · Senior Research · Fall 2026",
    tags: ["AI", "Robotics", "Research"],
    tools: ["NVIDIA DGX Spark", "Jetson Orin", "OCR", "GPS", "Computer Vision", "Python", "APIs"],
    desc: [
      "My senior research project studies how AI, acting through a mobile robotic system, can interpret environmental information and generate motion decisions using a combination of sensors, embedded computing hardware, and AI-based software tools.",
      "The research stack includes an NVIDIA DGX Spark for model workloads, Jetson Orin boxes for onboard edge compute, and a perception pipeline combining GPS, camera data, and Optical Character Recognition (OCR) — so the robot can literally read signs in its environment and act on them."
    ],
    images: []
  },
  "beetlebot": {
    title: "BeetleBot — Combat Robot, Concept to Arena",
    context: "Mechanical Engineering Design Lab · Villanova",
    tags: ["CAD", "Robotics", "Fabrication"],
    tools: ["SolidWorks", "3D Printing", "Aluminum Fabrication", "Electronics Integration"],
    desc: [
      "Our team was tasked with designing and manufacturing a miniature combat robot — then fighting it Battle-Bot style in an arena, for a grade. We built our bot around a 3D-printed inner skeleton wrapped in a full aluminum shell for protection.",
      "The project ran the complete engineering lifecycle: brainstorming, CAD design, drawing packages, fabrication, electrical integration, testing, iteration after every failure — all the way to surviving the arena, where some competing bots literally found their grave. The firsthand experience of design-test-redesign iteration was the real takeaway."
    ],
    images: [
      { src: IMG + "beetlebot-build.jpg", cap: "Fabricated BeetleBot chassis with drivetrain, batteries, receiver, and wiring integrated." },
      { src: IMG + "beetlebot-drawing.png", cap: "BeetleBot assembly drawing — orthographic views plus isometric, drawn, checked, and approved by me." }
    ]
  },
  "fulltilt": {
    title: "Solar Racking Design & GD&T",
    context: "BCI Engineering / FullTilt Solar · Design Internship",
    tags: ["GD&T", "CAD", "Industry"],
    tools: ["Autodesk Inventor", "SolidWorks", "GD&T (ASME Y14.5)", "FAI Reports", "Excel"],
    desc: [
      "As a mechanical design intern at BCI Engineering and its subsidiary FullTilt Solar, I created parts, drawings, and assemblies for production solar racking hardware. A core part of the job was applying Geometric Dimensioning & Tolerancing to part drawings and communicating directly with manufacturers to ensure everything came back within spec.",
      "I drew the detailed drawing for FullTilt's patented 'End Rail' during the company-wide CAD migration from SolidWorks to Autodesk Inventor, and maintained engineering-change reports tracking part revisions driven by tooling constraints, client requests, and cost."
    ],
    images: [
      { src: IMG + "solar-rack.jpg", cap: "Side profile of a solar panel rack assembly modeled in Autodesk Inventor." }
    ]
  },
  "fea-stress": {
    title: "Structural FEA — Stress & Deformation Study",
    context: "Solid Mechanics & Design · Final Project",
    tags: ["FEA", "SolidWorks"],
    tools: ["SolidWorks Simulation", "Static Analysis", "Von Mises Stress"],
    desc: [
      "For the final project of my Solid Mechanics & Design course, I modeled a bent hollow tube and ran a static stress study with assigned point loads to observe calculated stress and deformation across the part.",
      "The study probed peak von Mises stress at critical nodes (9.45×10⁸ N/m² at the highlighted fixture) and compared results against the material's yield strength to identify where the geometry would fail first."
    ],
    images: [
      { src: IMG + "fea-tube-stress.jpg", cap: "Von Mises stress plot — probed node reads 9.45×10⁸ N/m² against a 2.5×10⁸ N/m² yield strength." },
      { src: IMG + "fea-tube-setup.jpg", cap: "Load case setup: fixtures and point loads applied to the bent hollow tube in SolidWorks Simulation." }
    ]
  },
  "fea-thermal": {
    title: "Thermal FEA — Wireless Charger Heat Sink",
    context: "Independent Design Study",
    tags: ["Thermal FEA", "SolidWorks"],
    tools: ["SolidWorks Simulation", "Heat Transfer", "Design for Cooling"],
    desc: [
      "I modeled a to-scale wireless iPhone charging stand and retrofitted the back with a fin array to increase cooling during charging.",
      "A thermal FEA study validated the design — the simulation shows the relatively cooled upper half of the charging stand where the fin array pulls heat away from the coil region."
    ],
    images: [
      { src: IMG + "charger-thermal.png", cap: "Thermal simulation — the fin array visibly cools the upper half of the stand." },
      { src: IMG + "charger-model.png", cap: "The retrofitted charger model outside the thermal study." }
    ]
  },
  "cannon": {
    title: "Civil War Cannon — Assembly & BOM",
    context: "SolidWorks Course · Final Group Project",
    tags: ["CAD", "SolidWorks", "Assemblies"],
    tools: ["SolidWorks", "Assemblies", "BOM", "Drawing Packages"],
    desc: [
      "For a SolidWorks course final project, my group modeled a complete Civil War cannon — 19 parts across wooden body, axle and wheels, and the hinged breech cap subassembly I owned.",
      "We produced a full drawing package: multi-view assembly drawings, a ballooned exploded view, and a bill of materials. At FullTilt Solar I later built far more detailed BOMs — complete with suppliers and costs — but those stay behind NDA."
    ],
    images: [
      { src: IMG + "cannon-exploded.png", cap: "Ballooned exploded assembly view keyed to the BOM." },
      { src: IMG + "cannon-assembly.png", cap: "Multi-view assembly drawing with isometric." },
      { src: IMG + "cannon-bom.png", cap: "Bill of materials for the 19-part assembly." }
    ]
  },
  "frc": {
    title: "FIRST Robotics — Team 5740",
    context: "FIRST Robotics Competition · Design & Fabrication",
    tags: ["Robotics", "CNC", "Manufacturing"],
    tools: ["Autodesk Inventor", "CNC Milling", "Aluminum Fabrication", "Autodesk Vault"],
    desc: [
      "On my high-school FIRST Robotics Competition team I learned Autodesk Inventor and a full shop's worth of manufacturing techniques, building a competition robot from scratch every season.",
      "The 2019–2020 robot stacked a chassis, metal scaffolding, a clear feeding chute, and a top shooter mechanism for launching foam balls. For the 2020–2021 season I designed a large structural side plate in Inventor that served as both scaffolding and chute — designed for CNC milling, then cut on our mill and integrated into the competition robot."
    ],
    images: [
      { src: IMG + "frc-2020-robot.jpg", cap: "The 2019–2020 robot: chassis, scaffolding, feeding chute, and shooter mechanism." },
      { src: IMG + "frc-plate-cad.jpg", cap: "The 2020–2021 structural side plate, designed in Autodesk Inventor for CNC milling." },
      { src: IMG + "frc-cnc-mill.jpg", cap: "The plate being cut on the team's CNC mill." },
      { src: IMG + "frc-2021-robot.jpg", cap: "The finished 2020–2021 competition robot." }
    ]
  },
  "genai-app": {
    title: "Location-Aware GenAI History Guide",
    context: "Class Project · AI Minor Coursework",
    tags: ["AI", "Web App", "RAG"],
    tools: ["Generative AI Orchestration", "RAG", "GPS APIs", "Web Development"],
    desc: [
      "I built a functioning web app that uses generative-AI orchestration, the user's GPS position, and Retrieval-Augmented Generation over curated documentation to produce informed answers about the history of the user's current location.",
      "The project tied together the full modern AI stack — prompt pipelines, retrieval, and location context — into something you can actually walk around with."
    ],
    images: []
  },
  "fire-suppression": {
    title: "Fire Suppression for Refugee Camps",
    context: "Engineering Design Coursework",
    tags: ["Design", "Humanitarian"],
    tools: ["Concept Design", "Prototyping", "Cost Analysis"],
    desc: [
      "Tent fires spread catastrophically fast in arid-climate refugee camps, where firefighting infrastructure is nonexistent. Our team designed a cost-effective automatic fire suppressant system purpose-built for that constraint set.",
      "The design brief forced hard trade-offs between cost, reliability without maintenance, and deployment at camp scale — a very different optimization problem than designing for a developed-world budget."
    ],
    images: []
  },
  "smart-textiles": {
    title: "Smart Textiles — Nanoparticle Research",
    context: "ME Sophomore Research Scholar · Villanova",
    tags: ["Research", "Materials"],
    tools: ["Nanoparticle Assembly", "Monolayer Analysis", "Lab Methods"],
    desc: [
      "As a Mechanical Engineering Sophomore Research Scholar, I researched nanoparticle assembly and atomic monolayer analysis.",
      "The work targeted two applications: enhanced detection of PFAS ('forever chemical') particles, and fireproofing ordinary textiles through nanoparticle coatings — turning everyday fabric into a smart material."
    ],
    images: []
  }
};

/* ---------- wire up static cards ---------- */
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => openModal(card.dataset.id));
});

/* ---------- filters ---------- */
document.getElementById("filters").addEventListener("click", e => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  btn.classList.add("active");
  const f = btn.dataset.filter;
  document.querySelectorAll(".card").forEach(card => {
    card.classList.toggle("hidden", f !== "all" && !card.dataset.cats.split(" ").includes(f));
  });
});

/* ---------- modal / gallery ---------- */
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalCaption = document.getElementById("modalCaption");
const modalThumbs = document.getElementById("modalThumbs");
const modalMedia = document.querySelector(".modal-media");
let current = null, imgIndex = 0;

function openModal(id) {
  current = projects[id];
  if (!current) return;
  imgIndex = 0;
  document.getElementById("modalTitle").textContent = current.title;
  document.getElementById("modalContext").textContent = current.context;
  document.getElementById("modalTags").innerHTML = current.tags.map(t => `<span class="tag">${t}</span>`).join("");
  document.getElementById("modalDesc").innerHTML = current.desc.map(d => `<p>${d}</p>`).join("");
  document.getElementById("modalTools").innerHTML = current.tools.map(t => `<span>${t}</span>`).join("");

  if (current.images.length) {
    modalMedia.style.display = "";
    modalThumbs.innerHTML = current.images
      .map((im, idx) => `<img src="${im.src}" alt="${im.cap}" data-idx="${idx}">`).join("");
    showImage(0);
  } else {
    modalMedia.style.display = "none";
    modalCaption.textContent = "";
    modalThumbs.innerHTML = "";
  }
  const navBtns = current.images.length > 1 ? "" : "none";
  document.querySelector(".gal-prev").style.display = navBtns;
  document.querySelector(".gal-next").style.display = navBtns;

  modal.classList.add("open");
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-card").scrollTop = 0;
  history.replaceState(null, "", "#" + id);   /* shareable deep link */
}

function showImage(idx) {
  imgIndex = (idx + current.images.length) % current.images.length;
  modalImg.src = current.images[imgIndex].src;
  modalImg.alt = current.images[imgIndex].cap;
  modalCaption.textContent = current.images[imgIndex].cap;
  modalThumbs.querySelectorAll("img").forEach((t, i) =>
    t.classList.toggle("active", i === imgIndex));
}

function closeModal() {
  modal.classList.remove("open");
  document.body.classList.remove("modal-open");
  history.replaceState(null, "", window.location.pathname + window.location.search);
}

modal.addEventListener("click", e => {
  if (e.target.dataset.close !== undefined) closeModal();
  const thumb = e.target.closest(".modal-thumbs img");
  if (thumb) showImage(+thumb.dataset.idx);
});
document.querySelector(".gal-prev").addEventListener("click", () => showImage(imgIndex - 1));
document.querySelector(".gal-next").addEventListener("click", () => showImage(imgIndex + 1));
document.addEventListener("keydown", e => {
  if (!modal.classList.contains("open")) return;
  if (e.key === "Escape") closeModal();
  if (current && current.images.length > 1) {
    if (e.key === "ArrowLeft") showImage(imgIndex - 1);
    if (e.key === "ArrowRight") showImage(imgIndex + 1);
  }
});

/* ---------- deep link: open modal if URL hash names a project ---------- */
const hashId = window.location.hash.slice(1);
if (projects[hashId]) {
  openModal(hashId);
  document.getElementById("projects").scrollIntoView();
}

/* ---------- mobile nav ---------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});
navLinks.addEventListener("click", e => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

/* ---------- scroll reveal ---------- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visible"); observer.unobserve(en.target); } });
}, { threshold: 0.08 });
document.querySelectorAll(".card, .tl-item, .skill-col, .lead-card, .about-facts li").forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});

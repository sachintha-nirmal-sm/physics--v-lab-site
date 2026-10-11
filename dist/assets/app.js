document.head.insertAdjacentHTML("beforeend", '<link rel="icon" href="logo.jpeg" type="image/jpeg">');

const pages = [
  ["home", "Home", "index.html"],
  ["domain", "Domain", "domain.html"],
  ["milestones", "Milestones", "milestones.html"],
  ["documents", "Documents", "documents.html"],
  ["presentations", "Presentations", "presentations.html"],
  ["team", "About us", "team.html"],
  ["contact", "Contact", "contact.html"],
];

const icon = (name) => {
  const paths = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    download: '<path d="M12 3v12m-4-4 4 4 4-4M5 21h14"/>',
    file: '<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 13h6M9 17h6"/>',
  };
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
};

const current = document.body.dataset.page || "home";
const header = document.querySelector("[data-site-header]");
const footer = document.querySelector("[data-site-footer]");

if (header) {
  header.innerHTML = `
    <header class="site-header">
      <div class="container nav-wrap">
        <a class="brand" href="index.html" aria-label="PhysiV-Lab home">
          <img class="brand-logo" src="logo.jpeg" alt="" width="42" height="42">
          <span class="brand-text">PhysiV-Lab<small>R26-IT-150</small></span>
        </a>
        <nav class="site-nav" id="site-nav" aria-label="Primary navigation">
          ${pages.map(([id,label,url]) => `<a href="${url}" ${current === id ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
        </nav>
        <div class="nav-actions">
          <button class="icon-button" type="button" data-open-search aria-label="Search this site">${icon("search")}</button>
          <button class="icon-button menu-button" type="button" data-menu aria-controls="site-nav" aria-expanded="false" aria-label="Open navigation">${icon("menu")}</button>
        </div>
      </div>
    </header>`;
}

if (footer) {
  footer.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand"><a class="brand" href="index.html"><img class="brand-logo" src="logo.jpeg" alt="" width="42" height="42"><span>PhysiV-Lab</span></a><p>A mobile virtual physics laboratory bringing practical experimentation, intelligent support, and personalised learning into one accessible ecosystem.</p></div>
          <div><div class="footer-title">Explore</div><div class="footer-links">${pages.slice(1,5).map(([,label,url]) => `<a href="${url}">${label}</a>`).join("")}</div></div>
          <div><div class="footer-title">Project</div><div class="footer-links"><a href="team.html">Research team</a><a href="contact.html">Contact</a><a href="https://github.com/sachintha-nirmal-sm/R26-IT-150" target="_blank" rel="noreferrer">Source repository ↗</a></div></div>
        </div>
        <div class="footer-bottom"><span>© 2026 PhysiV-Lab · Project R26-IT-150</span><span>Department of Information Technology · SLIIT</span></div>
      </div>
    </footer>`;
}

const searchIndex = [
  ["Project overview", "A concise introduction to PhysiV-Lab and its integrated learning loop.", "index.html"],
  ["Literature survey", "Virtual laboratories, gamification, AI support, and learning analytics.", "domain.html#literature"],
  ["Research gap", "The fragmentation between theory, practice, assessment, and remediation.", "domain.html#gap"],
  ["Research problem", "Limited laboratory access and personalised support for rural learners.", "domain.html#problem"],
  ["Objectives", "The overall aim and component-level research objectives.", "domain.html#objectives"],
  ["Methodology", "Design Science Research and the integrated evaluation approach.", "domain.html#methodology"],
  ["Technologies", "Flutter, FastAPI, Firebase, MongoDB, RAG, Flame, and AI services.", "domain.html#technologies"],
  ["Milestones", "Proposal, progress presentations, final assessment, and viva.", "milestones.html"],
  ["Documents", "Topic assessment, proposals, checklists, and thesis records.", "documents.html"],
  ["Presentations", "Proposal and Progress Presentation 1 slide decks.", "presentations.html"],
  ["Research team", "Four researchers and their component responsibilities.", "team.html"],
  ["Contact", "A copy-ready general project enquiry template.", "contact.html"],
];

document.body.insertAdjacentHTML("beforeend", `<dialog class="search-dialog" data-search-dialog><form method="dialog"><span aria-hidden="true">${icon("search")}</span><input data-global-search type="search" placeholder="Search research topics, documents, team…" aria-label="Search site" autocomplete="off"><button class="icon-button" value="cancel" aria-label="Close search">${icon("close")}</button></form><div class="search-results" data-search-results></div></dialog><div class="toast" role="status" data-toast></div>`);

const nav = document.querySelector(".site-nav");
const menuButton = document.querySelector("[data-menu]");
menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.innerHTML = icon(open ? "close" : "menu");
});

const dialog = document.querySelector("[data-search-dialog]");
const globalSearch = document.querySelector("[data-global-search]");
const searchResults = document.querySelector("[data-search-results]");
const renderSearch = (query = "") => {
  const q = query.trim().toLowerCase();
  const results = q ? searchIndex.filter(item => item.join(" ").toLowerCase().includes(q)) : searchIndex.slice(0,6);
  searchResults.innerHTML = results.length ? results.map(([title,description,url]) => `<a class="search-result" href="${url}"><strong>${title}</strong><span>${description}</span></a>`).join("") : '<div class="empty-state" style="display:block">No matching content found.</div>';
};
document.querySelector("[data-open-search]")?.addEventListener("click", () => { renderSearch(); dialog.showModal(); setTimeout(() => globalSearch.focus(), 50); });
globalSearch?.addEventListener("input", (event) => renderSearch(event.target.value));
document.addEventListener("keydown", (event) => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); renderSearch(); dialog.showModal(); globalSearch.focus(); } });

const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold: .12 });
  reveals.forEach(element => observer.observe(element));
} else reveals.forEach(element => element.classList.add("visible"));

document.querySelector("[data-milestone-select]")?.addEventListener("change", (event) => {
  const target = document.getElementById(event.target.value);
  target?.scrollIntoView({ behavior: "smooth", block: "center" });
  target?.querySelector(".timeline-content")?.animate([{ outlineColor: "rgba(23,105,224,.5)" }, { outlineColor: "transparent" }], { duration: 1200 });
});

const documentSearch = document.querySelector("[data-document-search]");
const filterDocuments = () => {
  const q = (documentSearch?.value || "").trim().toLowerCase();
  let visible = 0;
  document.querySelectorAll("[data-document]").forEach(card => {
    const show = card.textContent.toLowerCase().includes(q);
    card.hidden = !show;
    if (show) visible++;
  });
  const empty = document.querySelector("[data-doc-empty]");
  if (empty) empty.style.display = visible ? "none" : "block";
};
documentSearch?.addEventListener("input", filterDocuments);

const toast = document.querySelector("[data-toast]");
const showToast = (message) => { toast.textContent = message; toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 2800); };
document.querySelector("[data-contact-form]")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const text = `Subject: ${data.get("subject")}\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nAudience: ${data.get("audience")}\n\nMessage:\n${data.get("message")}\n\nProject: PhysiV-Lab — R26-IT-150`;
  try { await navigator.clipboard.writeText(text); showToast("Message template copied to your clipboard."); }
  catch { const area = document.createElement("textarea"); area.value = text; document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove(); showToast("Message template copied."); }
});

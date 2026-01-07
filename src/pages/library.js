// src/pages/library.js

// Load CSS once
if (!document.getElementById("library-css")) {
  const link = document.createElement("link");
  link.id = "library-css";
  link.rel = "stylesheet";
  link.href = "src/utils/css/libraries.css/library.css";
  document.head.appendChild(link);
}

export default function initLibrary(container) {
  if (!container) return;

  container.innerHTML = `
    <div id="userBanner" style="margin-bottom:12px"></div>
    <div class="library-page">

      <header class="library-header">
        <h1>Library</h1>
        <p>Your activity, communities, and saved content</p>
      </header>

      <!-- Recent Users -->
      <section class="library-section">
        <div class="section-header">
          <h2>Recent Users</h2>
          <button class="see-all">See All</button>
        </div>

        <div class="card-row">
          ${renderUserCard("Alex")}
          ${renderUserCard("BuilderGuy")}
          ${renderUserCard("PixelDev")}
        </div>
      </section>

      <!-- Communities -->
      <section class="library-section">
        <div class="section-header">
          <h2>Communities</h2>
          <button class="see-all">See All</button>
        </div>

        <div class="card-row">
          ${renderCommunityCard("DynaBlocks")}
          ${renderCommunityCard("Game Builders")}
          ${renderCommunityCard("UI Designers")}
        </div>
      </section>

      <!-- Saved / Favorites -->
      <section class="library-section">
        <div class="section-header">
          <h2>Saved</h2>
          <button class="see-all">See All</button>
        </div>

        <div class="card-row">
          ${renderGenericCard("Saved Item")}
          ${renderGenericCard("Pinned Resource")}
        </div>
      </section>

    </div>
  `;

  setupLibraryEvents();
}

/* Card Helpers */

function renderUserCard(name) {
  return `
    <div class="library-card user-card">
      <div class="avatar"></div>
      <span>${name}</span>
    </div>
  `;
}

function renderCommunityCard(name) {
  return `
    <div class="library-card community-card">
      <div class="icon"></div>
      <span>${name}</span>
    </div>
  `;
}

function renderGenericCard(label) {
  return `
    <div class="library-card generic-card">
      <div class="icon"></div>
      <span>${label}</span>
    </div>
  `;
}

/* Events */

function setupLibraryEvents() {
  const seeAllButtons = document.querySelectorAll('.see-all');
  
  seeAllButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const section = e.target.closest('.library-section');
      const title = section.querySelector('h2').textContent;
      alert(`Viewing all ${title}...`);
    });
  });

  const cards = document.querySelectorAll('.library-card');
  
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const name = card.querySelector('span').textContent;
      alert(`Opening ${name}...`);
    });
  });
}

window.initLibrary = initLibrary;
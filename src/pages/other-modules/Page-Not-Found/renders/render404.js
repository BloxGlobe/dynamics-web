// src/pages/other-modules/Page-Not-Found/render404.js

// Load CSS once
if (!document.getElementById("page-404-css")) {
  const link = document.createElement("link");
  link.id = "page-404-css";
  link.rel = "stylesheet";
  link.href = "src/pages/other-modules/Page-Not-Found/css/404.css";
  document.head.appendChild(link);
}

export default async function render404(container, pageName = "") {
  if (!container) return;

  try {
    const res = await fetch("src/pages/other-modules/Page-Not-Found/404.json");
    
    if (!res.ok) throw new Error("404.json not found");

    const data = await res.json();

    // Use pageName in subtitle if provided
    const subtitle = pageName 
      ? `Page "${pageName}" does not exist.`
      : (data.subtitle || "The page you're looking for doesn't exist or was moved.");

    container.innerHTML = `
      <div class="page-404">
        <div class="page-404-inner">
          
          <svg class="page-404-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="9"/>
            <path d="M9 9h.01M15 9h.01"/>
            <path d="M8 15c1.333-1 2.667-1 4 0s2.667 1 4 0"/>
          </svg>

          <h1 class="page-404-title">
            ${data.title || "Page not found"}
          </h1>

          <p class="page-404-subtitle">
            ${subtitle}
          </p>

          ${data.description ? `
            <p class="page-404-description">
              ${data.description}
            </p>
          ` : ''}

          ${data.button ? `
            <a class="page-404-btn" href="${data.button.href}">
              ${data.button.label}
            </a>
          ` : ''}
        </div>
      </div>
    `;

    // Add click handler for button
    const btn = container.querySelector('.page-404-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        if (btn.getAttribute('href') === '#home') {
          e.preventDefault();
          window.location.hash = 'home';
        }
      });
    }

  } catch (err) {
    console.error("render404 error:", err);
    
    // Fallback 404
    container.innerHTML = `
      <div class="page-404">
        <div class="page-404-inner">
          <svg class="page-404-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="9"/>
            <path d="M9 9h.01M15 9h.01"/>
            <path d="M8 15c1.333-1 2.667-1 4 0s2.667 1 4 0"/>
          </svg>
          <h1 class="page-404-title">Page not found</h1>
          <p class="page-404-subtitle">The page you're looking for doesn't exist.</p>
          <a class="page-404-btn" href="#home">Go Home</a>
        </div>
      </div>
    `;
  }
}
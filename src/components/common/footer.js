/* load's footer css once */
if (!document.getElementById("footer-css")) {
  const link = document.createElement("link");
  link.id = "footer-css";
  link.rel = "stylesheet";
  link.href = "/src/utils/css/footers.css/footer.css"; // absolute path
  document.head.appendChild(link);
}

export default function initFooter(container) {
  if (!container) return;

  const currentLang = localStorage.getItem("language") || "en";
  const year = new Date().getFullYear();

  container.innerHTML = `
    <footer class="site-footer">
      <div class="footer-content">

        <!-- Footer Links -->
        <div class="footer-links">
          <a href="#about">About</a>
          <a href="#jobs">Jobs</a>
          <a href="#blog">Blog</a>
          <a href="#help">Help</a>
          <a href="#terms">Terms</a>
          <a href="#privacy">Privacy</a>
        </div>

        <!-- Bottom Bar -->
        <div class="footer-bottom">

          <!-- Language Selector -->
          <div class="language-selector">
            <select id="language-select">
              <option value="en" ${currentLang === "en" ? "selected" : ""}>English</option>
              <option value="es" ${currentLang === "es" ? "selected" : ""}>Español</option>
              <option value="fr" ${currentLang === "fr" ? "selected" : ""}>Français</option>
              <option value="de" ${currentLang === "de" ? "selected" : ""}>Deutsch</option>
              <option value="pt" ${currentLang === "pt" ? "selected" : ""}>Português</option>
              <option value="zh" ${currentLang === "zh" ? "selected" : ""}>中文</option>
            </select>
          </div>

          <!-- Copyright -->
          <div class="footer-copyright">
            <p>© ${year} Dynamics Corporation</p>
          </div>

        </div>
      </div>
    </footer>
  `;

  /* language change handler */
  const select = container.querySelector("#language-select");
  if (select) {
    select.addEventListener("change", (e) => {
      localStorage.setItem("language", e.target.value);
      location.reload();
    });
  }
}

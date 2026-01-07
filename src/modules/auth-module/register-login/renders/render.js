// src/module/auth-module/register-login/render.js
// Renders login and register modules

import { createLoginForm } from '../login.js';
import { createRegisterForm } from '../register.js';

// Re-export the low-level creators so other modules can import them directly:
export { createLoginForm, createRegisterForm };

/* render login.js */
export function renderLogin(container) {
  container.innerHTML = '';
  const loginElement = createLoginForm();
  container.appendChild(loginElement);
}

/* render register.js */
export function renderRegister(container) {
  container.innerHTML = '';
  const registerElement = createRegisterForm();
  container.appendChild(registerElement);
}

export default {
  renderLogin,
  renderRegister
};
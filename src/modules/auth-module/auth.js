// src/modules/auth-module/auth.js
// Minimal auth module - boots up register-login module

// Use dynamic imports for the register-login renderers so loading failures
// can be caught and handled at runtime instead of throwing during static import.

/* -----*/
let initialized = false;

export function initAuth() {
  if (initialized) return;
  initialized = true;
  console.log('[Auth] Module initialized');
}

/* --------- */
export async function bootLogin(containerId = 'app') {
  const container = typeof containerId === 'string' 
    ? document.getElementById(containerId) 
    : containerId;
  
  if (!container) {
    console.error('[Auth] Container not found:', containerId);
    return;
  }

  try {
    const mod = await import('./register-login/renders/render.js');
    if (mod && typeof mod.renderLogin === 'function') {
      mod.renderLogin(container);
    } else {
      throw new Error('renderLogin not exported from module');
    }
  } catch (err) {
    console.error('[Auth] Failed to load login renderer:', err);
    container.innerHTML = '<div class="auth-error">Unable to load login form. Please try again later.</div>';
  }
}

export async function bootRegister(containerId = 'app') {
  const container = typeof containerId === 'string' 
    ? document.getElementById(containerId) 
    : containerId;
  
  if (!container) {
    console.error('[Auth] Container not found:', containerId);
    return;
  }

  try {
    const mod = await import('./register-login/renders/render.js');
    if (mod && typeof mod.renderRegister === 'function') {
      mod.renderRegister(container);
    } else {
      throw new Error('renderRegister not exported from module');
    }
  } catch (err) {
    console.error('[Auth] Failed to load register renderer:', err);
    container.innerHTML = '<div class="auth-error">Unable to load registration form. Please try again later.</div>';
  }
}

/* ============ MOCK API ============ */
export const authAPI = {
  async login(email, password) {
    await new Promise(r => setTimeout(r, 800));
    
    if (email === 'demo@example.com' && password === 'demo123') {
      return {
        success: true,
        token: btoa(JSON.stringify({ userId: 1, exp: Date.now() + 86400000 })),
        user: { id: 1, username: 'demo', email }
      };
    }
    
    return { success: false, message: 'Invalid email or password' };
  },

  async register(username, email, password) {
    await new Promise(r => setTimeout(r, 1000));
    
    if (email === 'demo@example.com') {
      return { success: false, message: 'Email already registered' };
    }
    
    return {
      success: true,
      user: { id: Date.now(), username, email },
      message: 'Registration successful! Please login.'
    };
  }
};

/* ============ EXPORTS ============ */
export default {
  initAuth,
  bootLogin,
  bootRegister,
  authAPI
};
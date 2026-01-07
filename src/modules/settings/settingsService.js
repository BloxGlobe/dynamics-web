// Simple settings service to load and save account info from the SessionManager
function getStoredUser() {
	try {
		return window.SessionManager?.getUser() || null;
	} catch {
		return null;
	}
}

function _writeUserToStorage(user) {
	try {
		const remember = localStorage.getItem('remember_me') === '1';
		const storage = remember ? localStorage : sessionStorage;
		storage.setItem('user_data', JSON.stringify(user));
		if (window.SessionManager) {
			// update in-memory user if possible
			window.SessionManager._user = user;
		}
	} catch (e) {
		console.warn('Could not persist user:', e);
	}
}

export function initSettings(container) {
	if (!container) return;

	const user = getStoredUser() || { username: '', email: '' };

	container.innerHTML = `
		<h1>Account Settings</h1>
		<div class="settings-account">
			<label>Username</label>
			<input id="settings-username" value="${user.username || ''}" />

			<label>Email</label>
			<input id="settings-email" value="${user.email || ''}" />

			<button id="settings-save">Save</button>
			<div id="settings-msg" style="margin-top:8px"></div>
		</div>
	`;

	const usernameEl = container.querySelector('#settings-username');
	const emailEl = container.querySelector('#settings-email');
	const saveBtn = container.querySelector('#settings-save');
	const msgEl = container.querySelector('#settings-msg');

	function refreshFromSession() {
		const u = getStoredUser();
		if (!u) return;
		usernameEl.value = u.username || '';
		emailEl.value = u.email || '';
	}

	saveBtn.onclick = () => {
		const updated = {
			...(getStoredUser() || {}),
			username: usernameEl.value.trim(),
			email: emailEl.value.trim()
		};

		_writeUserToStorage(updated);

		// notify others that account updated
		window.dispatchEvent(new CustomEvent('session:update', { detail: { user: updated } }));

		msgEl.textContent = 'Saved.';
		setTimeout(() => (msgEl.textContent = ''), 2000);
	};

	// Listen for session changes and refresh fields
	window.addEventListener('session:login', refreshFromSession);
	window.addEventListener('session:logout', () => {
		usernameEl.value = '';
		emailEl.value = '';
	});
}

export function loadAccount() {
	return getStoredUser();
}

const SettingsService = { initSettings, loadAccount };
window.SettingsService = SettingsService;
export default SettingsService;

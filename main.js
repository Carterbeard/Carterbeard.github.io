// ── Menu toggle ──────────────────────────────────────────
const sideMenu  = document.getElementById('sideMenu');
const overlay   = document.getElementById('menuOverlay');
const menuBtn   = document.querySelector('.menu-btn');

function openMenu() {
    menuBtn?.classList.add('open');
    menuBtn?.setAttribute('aria-expanded', 'true');
    sideMenu?.classList.add('active');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    menuBtn?.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
    sideMenu?.classList.remove('active');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
}

function toggleMenu() {
    sideMenu.classList.contains('active') ? closeMenu() : openMenu();
}

overlay?.addEventListener('click', closeMenu);

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && sideMenu.classList.contains('active')) closeMenu();
});

// ── Password gate (lessons.html only) ────────────────────
const passwordInput = document.getElementById('resourcePassword');
const passwordBtn   = document.getElementById('passwordEnter');
const passwordMsg   = document.getElementById('passwordMsg');

if (passwordBtn) {
    const CORRECT = 'tutor2024';

    function checkPassword() {
        const val = passwordInput.value.trim();
        if (!val) {
            showMsg('Please enter the password.', 'error');
            passwordInput.focus();
            return;
        }
        if (val === CORRECT) {
            showMsg('✓ Access granted — resources loading…', 'success');
            passwordInput.disabled = true;
            passwordBtn.disabled   = true;
        } else {
            showMsg('Incorrect password. Please try again.', 'error');
            passwordInput.value = '';
            passwordInput.focus();
        }
    }

    function showMsg(text, type) {
        passwordMsg.textContent = text;
        passwordMsg.className = 'password-msg ' + type;
    }

    passwordBtn.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') checkPassword();
    });
}
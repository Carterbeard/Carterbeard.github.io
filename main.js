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
    // Store only the SHA-256 hash — never the plaintext password.
    // To update: hash your new password at https://emn178.github.io/online-tools/sha256.html
    const CORRECT_HASH = '1c1155d3a55e980a7887496a14b9ebc9678cf4586380419aeb0a0cdce2efc09a';
    const REDIRECT_URL = 'https://drive.google.com/drive/folders/1gHCSv2FU3Zk8ZSRl88rGpp0chj5PgTX4?usp=share_link';

    async function sha256(str) {
        const encoded = new TextEncoder().encode(str);
        const buffer  = await crypto.subtle.digest('SHA-256', encoded);
        return Array.from(new Uint8Array(buffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    async function checkPassword() {
        const val = passwordInput.value.trim();
        if (!val) {
            showMsg('Please enter the password.', 'error');
            passwordInput.focus();
            return;
        }

        const hash = await sha256(val);

        if (hash === CORRECT_HASH) {
            showMsg('✓ Access granted — redirecting…', 'success');
            passwordInput.disabled = true;
            passwordBtn.disabled   = true;
            setTimeout(() => window.location.href = REDIRECT_URL, 800);
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
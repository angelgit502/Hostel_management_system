/*
    Authentication & User Session Management
*/

// Extract friendly display name from email
const getFriendlyName = (email) => {
    const prefix = email.split('@')[0];
    return prefix.replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
};

// Update dashboard UI placeholders with logged-in user details
const applyUserToUI = (role, username) => {
    if (role === 'student') {
        const nameEl = document.getElementById('student-welcome-name');
        const msgEl = document.getElementById('welcome-msg');
        const avatarEl = document.querySelector('#student-dashboard .avatar, .user-area .avatar');

        if (nameEl) nameEl.textContent = username;
        if (msgEl) msgEl.textContent = `${username} | Student`;
        if (avatarEl) avatarEl.textContent = username.charAt(0).toUpperCase();
    } else if (role === 'staff') {
        const nameEl = document.getElementById('staff-welcome-name');
        const msgEl = document.getElementById('staff-welcome-msg');
        const avatarEl = document.querySelector('#staff-dashboard .avatar, .user-area .avatar');

        if (nameEl) nameEl.textContent = username;
        if (msgEl) msgEl.textContent = `${username} | Staff`;
        if (avatarEl) avatarEl.textContent = username.charAt(0).toUpperCase();
    } else if (role === 'admin') {
        const nameEl = document.querySelector('.profile-name');
        const roleEl = document.querySelector('.profile-role');

        if (nameEl) nameEl.textContent = username;
        if (roleEl) roleEl.textContent = 'Administrator';
    }
};

// Restore user session from localStorage
const restoreUser = () => {
    const saved = JSON.parse(localStorage.getItem('hmsUser') || 'null');
    if (saved) {
        applyUserToUI(saved.role, saved.username);
    }
};

// Login Handler logic
const handleLoginSubmit = (roleId, emailId, pwdId, sourceModal) => (event) => {
    event.preventDefault();
    const role = document.getElementById(roleId)?.value;
    const email = document.getElementById(emailId)?.value.trim();
    const password = document.getElementById(pwdId)?.value;

    if (!role || !email || !password) {
        if (window.showToast) window.showToast('Please fill in role, email and password.');
        return;
    }

    const username = getFriendlyName(email);
    localStorage.setItem('hmsUser', JSON.stringify({ role, username, email }));
    applyUserToUI(role, username);

    if (sourceModal && window.closeModal) {
        window.closeModal(sourceModal);
    }

    // Redirect to the appropriate dashboard page based on selected role
    const dashboardPages = {
        student: 'student-dashboard.html',
        staff: 'staff-dashboard.html',
        admin: 'admin-dashboard.html'
    };

    if (dashboardPages[role]) {
        if (window.showToast) window.showToast(`${role.charAt(0).toUpperCase() + role.slice(1)} login successful.`);
        setTimeout(() => {
            window.location.href = dashboardPages[role];
        }, 500);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    restoreUser();

    // Attach login form submission (page form & modal form)
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit('login-role', 'login-email', 'login-pwd', null));
    }

    const modalLoginForm = document.getElementById('modal-login-form');
    const loginModal = document.getElementById('login-modal');
    if (modalLoginForm) {
        modalLoginForm.addEventListener('submit', handleLoginSubmit('modal-login-role', 'modal-login-email', 'modal-login-pwd', loginModal));
    }

    // Role select change listeners to update placeholder
    const updatePlaceholder = (roleSelectId, emailInputId) => {
        const roleSelect = document.getElementById(roleSelectId);
        const emailInput = document.getElementById(emailInputId);
        if (roleSelect && emailInput) {
            roleSelect.addEventListener('change', (e) => {
                const role = e.target.value;
                if (role === 'student') emailInput.placeholder = 'e.g. john.doe@university.edu';
                if (role === 'staff') emailInput.placeholder = 'e.g. employeeId@hostel.edu';
                if (role === 'admin') emailInput.placeholder = 'e.g. admin@hostel.edu';
            });
        }
    };

    updatePlaceholder('login-role', 'login-email');
    updatePlaceholder('modal-login-role', 'modal-login-email');

    // Forgot Password triggers
    document.getElementById('forgot-password')?.addEventListener('click', () => {
        if (window.showToast) window.showToast('Password reset link has been sent to your university email.');
    });
    document.getElementById('modal-forgot-password')?.addEventListener('click', () => {
        if (window.showToast) window.showToast('Password reset link has been sent to your university email.');
    });

    // Logout handler
    document.querySelectorAll('.logout-button').forEach((button) => {
        button.addEventListener('click', () => {
            localStorage.removeItem('hmsUser');
            if (window.showToast) window.showToast('Logged out successfully.');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 500);
        });
    });
});

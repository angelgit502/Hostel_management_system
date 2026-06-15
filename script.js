/*
    Simple JavaScript for the single-page Hostel Management System.
    It only controls navigation, modals, forms, toasts, and demo dashboard updates.
*/

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const modals = document.querySelectorAll('.modal');
    const toast = document.getElementById('app-toast');
    const toastMessage = document.getElementById('toast-message');
    let activeDashboard = null;

    const showToast = (message) => {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = message;
        toast.classList.add('active');
        setTimeout(() => toast.classList.remove('active'), 3000);
    };

    const openModal = (modalId, trigger) => {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        activeDashboard = trigger ? trigger.closest('.dashboard-panel') : null;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (modal) => {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    const getDashboardStat = (name) => {
        if (!activeDashboard) return null;
        return activeDashboard.querySelector(`[data-stat="${name}"]`);
    };

    const addActivity = (type, title, description) => {
        if (!activeDashboard) return;
        const list = activeDashboard.querySelector('[data-activity-list]');
        if (!list) return;

        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-badge ${type}">${type === 'allocate' ? 'R' : '+'}</div>
            <div>
                <span class="activity-text">${title}</span>
                <p class="activity-desc">${description}</p>
                <span class="activity-time">Just now</span>
            </div>
        `;
        list.prepend(item);
    };

    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.forEach((item) => item.classList.remove('active'));
            link.classList.add('active');
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    document.querySelectorAll('.open-modal, .open-action-modal').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            openModal(button.dataset.modal, button);
        });
    });

    document.querySelectorAll('.modal-close').forEach((button) => {
        button.addEventListener('click', () => closeModal(button.closest('.modal')));
    });

    modals.forEach((modal) => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeModal(modal);
        });
    });

    document.getElementById('forgot-password')?.addEventListener('click', () => {
        showToast('Password reset link has been sent to your university email.');
    });

    document.getElementById('login-role')?.addEventListener('change', (event) => {
        const emailInput = document.getElementById('login-email');
        if (!emailInput) return;
        const role = event.target.value;
        if (role === 'student') emailInput.placeholder = 'e.g. john.doe@university.edu';
        if (role === 'staff') emailInput.placeholder = 'e.g. employeeId@hostel.edu';
        if (role === 'admin') emailInput.placeholder = 'e.g. admin@hostel.edu';
    });

    document.getElementById('login-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const role = document.getElementById('login-role').value;
        const target = document.getElementById(`${role}-dashboard`);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            showToast(`${role.toUpperCase()} login successful. Dashboard opened.`);
        }
    });

    document.getElementById('student-reg-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const password = document.getElementById('std-pwd');
        const confirmPassword = document.getElementById('std-confirm-pwd');
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('Passwords do not match');
            confirmPassword.reportValidity();
            return;
        }
        const name = document.getElementById('std-name').value;
        confirmPassword.setCustomValidity('');
        event.target.reset();
        closeModal(document.getElementById('student-modal'));
        showToast(`Welcome ${name}! Student registration submitted successfully.`);
    });

    document.getElementById('staff-reg-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const password = document.getElementById('stf-pwd');
        const confirmPassword = document.getElementById('stf-confirm-pwd');
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('Passwords do not match');
            confirmPassword.reportValidity();
            return;
        }
        const name = document.getElementById('stf-name').value;
        confirmPassword.setCustomValidity('');
        event.target.reset();
        closeModal(document.getElementById('staff-modal'));
        showToast(`Welcome ${name}! Staff registration received.`);
    });

    document.getElementById('frm-add-student')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('new-std-name').value;
        const room = document.getElementById('new-std-room').value;
        const countEl = getDashboardStat('students');
        if (countEl) countEl.textContent = (parseInt(countEl.textContent.replace(',', ''), 10) + 1).toLocaleString();
        addActivity('register', 'New Student Registration', `${name} registered for ${room}`);
        event.target.reset();
        closeModal(document.getElementById('add-student-modal'));
        showToast(`Student "${name}" added successfully.`);
    });

    document.getElementById('frm-add-staff')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('new-stf-name').value;
        const role = document.getElementById('new-stf-role').value;
        const countEl = getDashboardStat('staff');
        if (countEl) countEl.textContent = (parseInt(countEl.textContent, 10) + 1).toString();
        event.target.reset();
        closeModal(document.getElementById('add-staff-modal'));
        showToast(`Staff member "${name}" (${role}) added successfully.`);
    });

    document.getElementById('frm-allocate')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('alloc-name').value;
        const room = document.getElementById('alloc-block').value;
        const occupiedEl = getDashboardStat('occupied');
        const availableEl = getDashboardStat('available');
        if (occupiedEl) occupiedEl.textContent = (parseInt(occupiedEl.textContent, 10) + 1).toString();
        if (availableEl) availableEl.textContent = Math.max(0, parseInt(availableEl.textContent, 10) - 1).toString();
        addActivity('allocate', 'Recent Room Allocation', `${name} allocated to ${room}`);
        event.target.reset();
        closeModal(document.getElementById('allocate-room-modal'));
        showToast(`Room successfully allocated to ${name}.`);
    });

    document.querySelectorAll('.resolve-btn').forEach((button) => {
        button.addEventListener('click', () => {
            document.getElementById(button.dataset.row)?.remove();
            const complaintStats = document.querySelectorAll('[data-stat="complaints"]');
            complaintStats.forEach((stat) => {
                const current = parseInt(stat.textContent, 10);
                if (current > 0) stat.textContent = (current - 1).toString();
            });
            showToast('Complaint resolved successfully.');
        });
    });

    document.getElementById('download-report')?.addEventListener('click', () => {
        closeModal(document.getElementById('report-modal'));
        showToast('Generating report... Download starting shortly.');
    });

    document.getElementById('frm-lodge-complaint')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const desc = document.getElementById('complaint-title').value;
        const list = document.getElementById('student-complaint-list');
        const countEl = document.getElementById('student-complaint-count');

        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-badge complaint">!</div>
            <div>
                <span class="activity-text">${desc}</span>
                <p class="activity-desc">Logged on 2026-06-08 - Status: <span class="badge danger">Open</span></p>
                <span class="activity-time">Awaiting warden assignment.</span>
            </div>
        `;
        list?.prepend(item);
        if (countEl) countEl.textContent = (parseInt(countEl.textContent, 10) + 1).toString();
        event.target.reset();
        showToast('Complaint lodged successfully. The caretaker will review it shortly.');
    });

    document.getElementById('frm-lodge-modal')?.addEventListener('submit', (event) => {
        event.preventDefault();
        event.target.reset();
        closeModal(document.getElementById('complaint-modal'));
        showToast('Complaint ticket created successfully.');
    });

    document.getElementById('contact-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        event.target.reset();
        showToast('Message submitted successfully.');
    });

    document.querySelectorAll('.logout-button').forEach((button) => {
        button.addEventListener('click', () => {
            document.getElementById('login')?.scrollIntoView({ behavior: 'smooth' });
            showToast('Logged out successfully.');
        });
    });
});

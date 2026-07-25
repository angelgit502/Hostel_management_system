/*
    Main Application Script (Global functions, navigation, modal helpers, toasts)
*/

// Toast Notification Utility
window.showToast = (message) => {
    const toast = document.getElementById('app-toast');
    const toastMessage = document.getElementById('toast-message');
    if (!toast || !toastMessage) {
        console.log(message);
        return;
    }
    toastMessage.textContent = message;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
};

// Global Modal Handlers
let activeDashboard = null;

window.openModal = (modalId, trigger) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    activeDashboard = trigger ? trigger.closest('.dashboard-panel') : null;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
};

window.getDashboardStat = (name) => {
    if (!activeDashboard) {
        // Fallback to active dashboard panel on page
        const activePanel = document.querySelector('.dashboard-panel');
        if (!activePanel) return null;
        return activePanel.querySelector(`[data-stat="${name}"]`);
    }
    return activeDashboard.querySelector(`[data-stat="${name}"]`);
};

window.addActivity = (type, title, description) => {
    let list = activeDashboard ? activeDashboard.querySelector('[data-activity-list]') : null;
    if (!list) list = document.querySelector('[data-activity-list]');
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

document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Mobile Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Modal Trigger Buttons
    document.querySelectorAll('.open-modal, .open-action-modal').forEach((button) => {
        button.addEventListener('click', (event) => {
            if (button.tagName === 'A' && button.getAttribute('href') && button.getAttribute('href') !== '#') {
                // allow normal link navigation if it's a page link
            } else {
                event.preventDefault();
            }
            if (button.dataset.modal) {
                window.openModal(button.dataset.modal, button);
            }
        });
    });

    document.querySelectorAll('.modal-close').forEach((button) => {
        button.addEventListener('click', () => window.closeModal(button.closest('.modal')));
    });

    document.querySelectorAll('.modal').forEach((modal) => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) window.closeModal(modal);
        });
    });
});

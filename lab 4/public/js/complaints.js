/*
    Complaint Management & Maintenance Ticket Resolution
*/

document.addEventListener('DOMContentLoaded', () => {
    // Resolve Complaint Button Click Event Listener
    const attachResolveListeners = () => {
        document.querySelectorAll('.resolve-btn').forEach((button) => {
            button.onclick = () => {
                const targetRowId = button.dataset.row;
                if (targetRowId) {
                    const row = document.getElementById(targetRowId);
                    if (row) row.remove();
                } else {
                    button.closest('tr')?.remove();
                }

                const complaintStats = document.querySelectorAll('[data-stat="complaints"]');
                complaintStats.forEach((stat) => {
                    const current = parseInt(stat.textContent, 10) || 0;
                    if (current > 0) stat.textContent = (current - 1).toString();
                });

                const studentCountEl = document.getElementById('student-complaint-count');
                if (studentCountEl) {
                    const current = parseInt(studentCountEl.textContent, 10) || 0;
                    if (current > 0) studentCountEl.textContent = (current - 1).toString();
                }

                if (window.showToast) window.showToast('Complaint resolved successfully.');
            };
        });
    };

    attachResolveListeners();

    // Lodge Complaint Form (Student Dashboard Inline Form)
    const lodgeComplaintForm = document.getElementById('frm-lodge-complaint');
    if (lodgeComplaintForm) {
        lodgeComplaintForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const desc = document.getElementById('complaint-title')?.value || 'Maintenance issue';
            const severity = document.getElementById('complaint-severity')?.value || 'Low';
            const list = document.getElementById('student-complaint-list');
            const countEl = document.getElementById('student-complaint-count');

            const item = document.createElement('div');
            item.className = 'activity-item';
            const todayStr = new Date().toISOString().split('T')[0];
            item.innerHTML = `
                <div class="activity-badge complaint">!</div>
                <div>
                    <span class="activity-text">${desc} (${severity})</span>
                    <p class="activity-desc">Logged on ${todayStr} - Status: <span class="badge danger">Open</span></p>
                    <span class="activity-time">Awaiting warden assignment.</span>
                </div>
            `;
            if (list) list.prepend(item);
            if (countEl) {
                const current = parseInt(countEl.textContent, 10) || 0;
                countEl.textContent = (current + 1).toString();
            }

            event.target.reset();
            if (window.showToast) window.showToast('Complaint lodged successfully. Caretaker will review it shortly.');
        });
    }

    // Lodge Complaint Modal Form
    const lodgeModalForm = document.getElementById('frm-lodge-modal');
    if (lodgeModalForm) {
        lodgeModalForm.addEventListener('submit', (event) => {
            event.preventDefault();
            event.target.reset();
            const complaintModal = document.getElementById('complaint-modal');
            if (complaintModal && window.closeModal) window.closeModal(complaintModal);
            if (window.showToast) window.showToast('Complaint ticket created successfully.');
        });
    }
});

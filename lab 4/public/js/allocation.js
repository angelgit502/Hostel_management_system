/*
    Room Allocation Submission & Occupancy Updates
*/

document.addEventListener('DOMContentLoaded', () => {
    const allocateForm = document.getElementById('frm-allocate');
    if (allocateForm) {
        allocateForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('alloc-name')?.value || 'Student';
            const room = document.getElementById('alloc-block')?.value || 'Block A';

            const occupiedEl = window.getDashboardStat ? window.getDashboardStat('occupied') : document.querySelector('[data-stat="occupied"]');
            const availableEl = window.getDashboardStat ? window.getDashboardStat('available') : document.querySelector('[data-stat="available"]');

            if (occupiedEl) {
                const occupiedVal = parseInt(occupiedEl.textContent, 10) || 0;
                occupiedEl.textContent = (occupiedVal + 1).toString();
            }

            if (availableEl) {
                const availVal = parseInt(availableEl.textContent, 10) || 0;
                availableEl.textContent = Math.max(0, availVal - 1).toString();
            }

            if (window.addActivity) {
                window.addActivity('allocate', 'Recent Room Allocation', `${name} allocated to ${room}`);
            }

            event.target.reset();
            const allocModal = document.getElementById('allocate-room-modal');
            if (allocModal && window.closeModal) window.closeModal(allocModal);
            if (window.showToast) window.showToast(`Room successfully allocated to ${name}.`);
        });
    }
});

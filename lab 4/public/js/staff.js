/*
    Staff Management & Staff Registration JS
*/

document.addEventListener('DOMContentLoaded', () => {
    // Staff Registration Form
    const staffRegForm = document.getElementById('staff-reg-form');
    if (staffRegForm) {
        staffRegForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const password = document.getElementById('stf-pwd');
            const confirmPassword = document.getElementById('stf-confirm-pwd');
            if (password && confirmPassword && password.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity('Passwords do not match');
                confirmPassword.reportValidity();
                return;
            }
            const name = document.getElementById('stf-name')?.value || 'Staff';
            if (confirmPassword) confirmPassword.setCustomValidity('');
            event.target.reset();

            const staffModal = document.getElementById('staff-modal');
            if (staffModal && window.closeModal) window.closeModal(staffModal);
            if (window.showToast) window.showToast(`Welcome ${name}! Staff registration received.`);
        });
    }

    // Add Staff Member Form
    const addStaffForm = document.getElementById('frm-add-staff');
    if (addStaffForm) {
        addStaffForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('new-stf-name')?.value || 'New Staff';
            const role = document.getElementById('new-stf-role')?.value || 'Caretaker';

            const countEl = window.getDashboardStat ? window.getDashboardStat('staff') : document.querySelector('[data-stat="staff"]');
            if (countEl) {
                const current = parseInt(countEl.textContent, 10) || 0;
                countEl.textContent = (current + 1).toString();
            }

            // Append to table if on staff-management page
            const tbody = document.querySelector('.mgmt-table tbody');
            if (tbody && window.location.pathname.includes('staff-management')) {
                const email = document.getElementById('new-stf-email')?.value || 'staff@hostel.edu';
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${name}</td>
                    <td>${role}</td>
                    <td>${email}</td>
                    <td><span class="badge success">Active</span></td>
                `;
                tbody.appendChild(tr);
            }

            event.target.reset();
            const addStaffModal = document.getElementById('add-staff-modal');
            if (addStaffModal && window.closeModal) window.closeModal(addStaffModal);
            if (window.showToast) window.showToast(`Staff member "${name}" (${role}) added successfully.`);
        });
    }
});

/*
    Student Management & Student Registration JS
*/

document.addEventListener('DOMContentLoaded', () => {
    // Student Registration Form (register.html or modal)
    const studentRegForm = document.getElementById('student-reg-form');
    if (studentRegForm) {
        studentRegForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const password = document.getElementById('std-pwd');
            const confirmPassword = document.getElementById('std-confirm-pwd');
            if (password && confirmPassword && password.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity('Passwords do not match');
                confirmPassword.reportValidity();
                return;
            }
            const nameEl = document.getElementById('std-name');
            const name = nameEl ? nameEl.value : 'Student';
            if (confirmPassword) confirmPassword.setCustomValidity('');
            event.target.reset();
            
            const studentModal = document.getElementById('student-modal');
            if (studentModal && window.closeModal) {
                window.closeModal(studentModal);
            }
            if (window.showToast) {
                window.showToast(`Welcome ${name}! Student registration submitted successfully.`);
            }
        });
    }

    // Add Student Form (admin dashboard / student management modal or inline)
    const addStudentForm = document.getElementById('frm-add-student');
    if (addStudentForm) {
        addStudentForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('new-std-name')?.value || 'New Student';
            const room = document.getElementById('new-std-room')?.value || 'Unassigned';

            const countEl = window.getDashboardStat ? window.getDashboardStat('students') : document.querySelector('[data-stat="students"]');
            if (countEl) {
                const currentVal = parseInt(countEl.textContent.replace(/,/g, ''), 10) || 0;
                countEl.textContent = (currentVal + 1).toLocaleString();
            }

            if (window.addActivity) {
                window.addActivity('register', 'New Student Registration', `${name} registered for ${room}`);
            }

            // Append to table if on student-management page
            const tbody = document.querySelector('.mgmt-table tbody');
            if (tbody && window.location.pathname.includes('student-management')) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${name}</td>
                    <td>${room}</td>
                    <td>+1 555 019 8821</td>
                    <td><span class="badge success">Checked In</span></td>
                `;
                tbody.appendChild(tr);
            }

            event.target.reset();
            const addModal = document.getElementById('add-student-modal');
            if (addModal && window.closeModal) window.closeModal(addModal);
            if (window.showToast) window.showToast(`Student "${name}" added successfully.`);
        });
    }
});

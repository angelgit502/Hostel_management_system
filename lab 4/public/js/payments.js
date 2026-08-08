/*
    Fee Management & Report Generator JS
*/

document.addEventListener('DOMContentLoaded', () => {
    // Download Report Action
    const downloadBtn = document.getElementById('download-report');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const reportModal = document.getElementById('report-modal');
            if (reportModal && window.closeModal) window.closeModal(reportModal);
            if (window.showToast) window.showToast('Generating report... Download starting shortly.');
        });
    }
});

/*
    User Profile Data Renderer
*/

document.addEventListener('DOMContentLoaded', () => {
    const savedUser = JSON.parse(localStorage.getItem('hmsUser') || 'null');
    
    const profileName = document.getElementById('user-profile-name');
    const profileEmail = document.getElementById('user-profile-email');
    const profileRole = document.getElementById('user-profile-role');
    const profileAvatar = document.getElementById('user-profile-avatar');

    if (savedUser) {
        if (profileName) profileName.textContent = savedUser.username || 'User';
        if (profileEmail) profileEmail.textContent = savedUser.email || `${savedUser.username.toLowerCase().replace(/\s+/g, '.')}@hostel.edu`;
        if (profileRole) profileRole.textContent = savedUser.role ? savedUser.role.toUpperCase() : 'STUDENT';
        if (profileAvatar) profileAvatar.textContent = savedUser.username ? savedUser.username.charAt(0).toUpperCase() : 'U';
    }
});

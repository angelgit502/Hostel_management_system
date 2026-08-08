/* ============================================================
   Room Management – Full CRUD with Fetch API
   Handles: GET, POST, PUT, DELETE for /api/rooms
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── DOM References ── */
    const container   = document.getElementById('roomContainer');
    const form        = document.getElementById('roomForm');
    const modal       = document.getElementById('room-modal');
    const modalTitle  = document.getElementById('roomModalTitle');
    const submitBtn   = document.getElementById('roomSubmitBtn');
    const deleteBtn   = document.getElementById('roomDeleteBtn');
    const addRoomBtn  = document.getElementById('addRoomBtn');
    const filterBar   = document.getElementById('roomFilterBar');

    // Field shortcuts
    const fRoomNo   = () => document.getElementById('roomNoInput');
    const fRoomType = () => document.getElementById('roomTypeInput');
    const fCapacity = () => document.getElementById('capacityInput');
    const fStatus   = () => document.getElementById('statusInput');
    const fRoomId   = () => document.getElementById('roomIdInput');

    /* ── State ── */
    let allRooms = [];           // cache for filtering
    let currentFilter = 'all';

    /* ─────────────────────────────────────────────────
       LOAD ALL ROOMS (GET /api/rooms)
    ───────────────────────────────────────────────── */
    const loadRooms = () => {
        if (!container) return;
        container.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#64748b;">Loading rooms…</p>';

        fetch('/api/rooms')
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(rooms => {
                allRooms = rooms;
                renderRooms(rooms);
            })
            .catch(err => {
                console.error('Failed to load rooms:', err);
                container.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#ef4444;">Failed to load room data. Please refresh the page.</p>';
            });
    };

    /* ─────────────────────────────────────────────────
       RENDER ROOM CARDS
    ───────────────────────────────────────────────── */
    const renderRooms = (rooms) => {
        // Apply active filter
        const filtered = currentFilter === 'all'
            ? rooms
            : rooms.filter(r => r.status.toLowerCase() === currentFilter);

        container.innerHTML = '';

        if (!filtered.length) {
            container.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#64748b;padding:2rem 0;">
                No ${currentFilter === 'all' ? '' : currentFilter + ' '}rooms found.
            </p>`;
            return;
        }

        filtered.forEach(room => {
            const statusClass = room.status.toLowerCase();
            const card = document.createElement('div');
            card.className = `room-card ${statusClass}`;
            card.dataset.roomId = room._id;

            // Status badge colour
            const badgeClass = statusClass === 'available' ? 'success'
                             : statusClass === 'occupied'  ? 'danger'
                             : 'warning';

            card.innerHTML = `
                <div class="room-card-header">
                    <h4>Room ${room.room_no}</h4>
                    <span class="badge ${badgeClass}">${room.status}</span>
                </div>
                <p class="room-card-type">${room.room_type}</p>
                <p class="room-card-capacity">Capacity: <strong>${room.capacity}</strong></p>
                <div class="room-card-actions">
                    <button class="mini-btn edit-room-btn" data-id="${room._id}" title="Edit room">✏ Edit</button>
                    <button class="mini-btn mini-btn-danger delete-room-btn" data-id="${room._id}" title="Delete room">🗑 Delete</button>
                </div>
            `;

            // Edit button → open modal pre-filled
            card.querySelector('.edit-room-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                openEditModal(room);
            });

            // Delete button → confirm + DELETE
            card.querySelector('.delete-room-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                handleDelete(room._id, room.room_no, room.status);
            });

            container.appendChild(card);
        });
    };

    /* ─────────────────────────────────────────────────
       FILTER BAR
    ───────────────────────────────────────────────── */
    if (filterBar) {
        filterBar.addEventListener('click', (e) => {
            const btn = e.target.closest('.room-filter-btn');
            if (!btn) return;
            filterBar.querySelectorAll('.room-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderRooms(allRooms);
        });
    }

    /* ─────────────────────────────────────────────────
       MODAL HELPERS
    ───────────────────────────────────────────────── */
    // Auto-update capacity when room type changes
    fRoomType().addEventListener('change', () => {
        const type = fRoomType().value;
        const typeCapacityMap = {
            'Single': 1,
            'Double': 2,
            'Three Sharing': 3,
            'Four Sharing': 4
        };
        if (typeCapacityMap[type] !== undefined) {
            fCapacity().value = typeCapacityMap[type];
        }
    });

    // Reset modal to "Add" state
    const resetModal = () => {
        form.reset();
        fRoomId().value = '';
        modalTitle.textContent = 'Add Room';
        submitBtn.textContent = 'Save Room';
        if (deleteBtn) deleteBtn.style.display = 'none';
    };

    // Open modal pre-filled for editing
    const openEditModal = (room) => {
        fRoomNo().value   = room.room_no;
        fRoomType().value = room.room_type;
        fCapacity().value = room.capacity;
        fStatus().value   = room.status;
        fRoomId().value   = room._id;
        modalTitle.textContent = `Edit Room ${room.room_no}`;
        submitBtn.textContent  = 'Update Room';
        if (deleteBtn) deleteBtn.style.display = 'inline-flex';
        window.openModal('room-modal', null);
    };

    // "Add Room" button — always reset the form first
    if (addRoomBtn) {
        addRoomBtn.addEventListener('click', (e) => {
            e.preventDefault();
            resetModal();
            window.openModal('room-modal', addRoomBtn);
        });
    }

    /* ─────────────────────────────────────────────────
       FORM SUBMIT — ADD (POST) or UPDATE (PUT)
    ───────────────────────────────────────────────── */
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Trim and normalize inputs
        const roomId = fRoomId().value.trim();
        const rawRoomNo = fRoomNo().value.trim();
        const rawRoomType = fRoomType().value.trim();
        const rawCapacity = fCapacity().value.trim();
        const rawStatus = fStatus().value.trim();
        // Validate room number format (letters followed by digits, max 10 chars)
        const roomNoPattern = /^[A-Za-z]\d{1,9}$/;
        if (!roomNoPattern.test(rawRoomNo)) {
            window.showToast?.('Room number must start with a letter followed by up to 9 digits (e.g., A101).');
            fRoomNo().classList.add('invalid');
            fRoomNo().focus();
            return;
        }
        // Validate capacity matches room type
        const typeCapacityMap = {
            'Single': 1,
            'Double': 2,
            'Three Sharing': 3,
            'Four Sharing': 4
        };
        const expectedCap = typeCapacityMap[rawRoomType];
        const capNum = parseInt(rawCapacity, 10);
        if (expectedCap && capNum !== expectedCap) {
            window.showToast?.(`Capacity for ${rawRoomType} must be ${expectedCap}.`);
            fCapacity().classList.add('invalid');
            fCapacity().focus();
            return;
        }
        // Validate status
        const allowedStatus = ['Available', 'Occupied', 'Maintenance'];
        if (!allowedStatus.includes(rawStatus)) {
            window.showToast?.('Invalid status selected.');
            fStatus().classList.add('invalid');
            fStatus().focus();
            return;
        }
        // Build sanitized data object
        const roomData = {
            room_no: rawRoomNo,
            room_type: rawRoomType,
            capacity: capNum,
            status: rawStatus
        };
        // Clear any previous invalid styling
        fRoomNo().classList.remove('invalid');
        fRoomType().classList.remove('invalid');
        fCapacity().classList.remove('invalid');
        fStatus().classList.remove('invalid');
        // End of validation block

        // Basic client-side validation
        if (!roomData.room_no) {
            window.showToast?.('Please enter a room number.');
            fRoomNo().focus();
            return;
        }
        if (!roomData.room_type) {
            window.showToast?.('Please select a room type.');
            return;
        }
        if (isNaN(roomData.capacity) || roomData.capacity < 1) {
            window.showToast?.('Capacity must be at least 1.');
            fCapacity().focus();
            return;
        }

        const isEdit = Boolean(roomId);
        const url    = isEdit ? `/api/rooms/${roomId}` : '/api/rooms';
        const method = isEdit ? 'PUT' : 'POST';

        // Disable submit while request is in-flight
        submitBtn.disabled = true;
        submitBtn.textContent = isEdit ? 'Updating…' : 'Saving…';

        try {
            const res  = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(roomData)
            });
            const data = await res.json();

            if (res.ok) {
                const msg = isEdit
                    ? `Room ${roomData.room_no} updated successfully.`
                    : `Room ${roomData.room_no} added successfully.`;
                window.showToast?.(msg);
                window.closeModal(modal);
                resetModal();
                loadRooms();
            } else {
                // Show specific server error
                const errMsg = data.error || (isEdit ? 'Failed to update room.' : 'Failed to add room.');
                window.showToast?.(`Error: ${errMsg}`);
            }
        } catch (err) {
            console.error('Submit error:', err);
            window.showToast?.('Network error. Please check your connection.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = isEdit ? 'Update Room' : 'Save Room';
        }
    });

    /* ─────────────────────────────────────────────────
       DELETE — from modal Delete button
       Reads status from the form's status dropdown
    ───────────────────────────────────────────────── */
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            const id     = fRoomId().value;
            const roomNo = fRoomNo().value;
            const status = fStatus().value;
            if (!id) return;
            handleDelete(id, roomNo, status);
        });
    }

    /* ─────────────────────────────────────────────────
       CUSTOM CONFIRM DIALOG (replaces browser confirm)
       Shows a toast-style overlay with Yes / No buttons.
    ───────────────────────────────────────────────── */
    const showConfirmDialog = (message) => {
        return new Promise((resolve) => {
            // Remove any existing confirm overlay
            const existing = document.getElementById('custom-confirm-overlay');
            if (existing) existing.remove();

            const overlay = document.createElement('div');
            overlay.id = 'custom-confirm-overlay';
            overlay.style.cssText = `
                position: fixed; inset: 0; z-index: 10000;
                background: rgba(0,0,0,0.45);
                display: flex; align-items: center; justify-content: center;
            `;

            const box = document.createElement('div');
            box.style.cssText = `
                background: #1e293b; color: #f1f5f9; border-radius: 12px;
                padding: 28px 32px; max-width: 440px; width: 90%;
                box-shadow: 0 8px 32px rgba(0,0,0,0.4);
                font-family: inherit; text-align: center;
            `;

            const msgEl = document.createElement('p');
            msgEl.style.cssText = 'margin: 0 0 22px; font-size: 15px; line-height: 1.55;';
            msgEl.textContent = message;

            const btnRow = document.createElement('div');
            btnRow.style.cssText = 'display: flex; gap: 12px; justify-content: center;';

            const yesBtn = document.createElement('button');
            yesBtn.textContent = 'Yes, Delete';
            yesBtn.style.cssText = `
                padding: 9px 22px; border: none; border-radius: 8px;
                background: #ef4444; color: #fff; font-size: 14px;
                cursor: pointer; font-weight: 600;
            `;

            const noBtn = document.createElement('button');
            noBtn.textContent = 'Cancel';
            noBtn.style.cssText = `
                padding: 9px 22px; border: 1px solid #475569; border-radius: 8px;
                background: transparent; color: #94a3b8; font-size: 14px;
                cursor: pointer; font-weight: 600;
            `;

            const cleanup = (result) => {
                overlay.remove();
                resolve(result);
            };

            yesBtn.addEventListener('click', () => cleanup(true));
            noBtn.addEventListener('click',  () => cleanup(false));
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) cleanup(false);
            });

            btnRow.appendChild(yesBtn);
            btnRow.appendChild(noBtn);
            box.appendChild(msgEl);
            box.appendChild(btnRow);
            overlay.appendChild(box);
            document.body.appendChild(overlay);

            yesBtn.focus();
        });
    };

    /* ─────────────────────────────────────────────────
       SHARED DELETE HANDLER — with status validation
       Business rule: only "Available" rooms can be deleted.
       (Temporary check until room_allocation table is integrated)
    ───────────────────────────────────────────────── */
    const handleDelete = async (roomId, roomNo, status) => {
        // Business rule: prevent deletion of Occupied or Maintenance rooms
        if (status === 'Occupied') {
            window.showToast?.('Cannot delete room. This room is currently occupied and may be allocated to a student. Please deallocate the room before deleting it.');
            return;
        }
        if (status === 'Maintenance') {
            window.showToast?.('Cannot delete room. This room is currently under maintenance.');
            return;
        }

        // For "Available" rooms, show custom confirmation dialog
        const confirmed = await showConfirmDialog(
            `Are you sure you want to delete Room ${roomNo}? This action cannot be undone.`
        );
        if (!confirmed) return;

        try {
            const res  = await fetch(`/api/rooms/${roomId}`, { method: 'DELETE' });
            const data = await res.json();

            if (res.ok) {
                window.showToast?.('Room deleted successfully.');
                // Close modal if it's open
                if (modal.classList.contains('active')) {
                    window.closeModal(modal);
                    resetModal();
                }
                loadRooms();
            } else {
                window.showToast?.(`Error: ${data.error || 'Failed to delete room.'}`);
            }
        } catch (err) {
            console.error('Delete error:', err);
            window.showToast?.('Network error. Could not delete room.');
        }
    };

    /* ─────────────────────────────────────────────────
       INITIAL LOAD
    ───────────────────────────────────────────────── */
    loadRooms();
});

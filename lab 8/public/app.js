const API_URL = "/api/rooms";


// Auth check
if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
    window.location.href = "login.html";
}


// Capacity map
const capacityMap = {
    "Single": 1,
    "Double": 2,
    "Triple": 3,
    "Four Sharing": 4
};


// Auto-set capacity when room type changes
document.getElementById("room_type").addEventListener("change", function() {
    const capacity = capacityMap[this.value] || "";
    document.getElementById("capacity").value = capacity;
});


// GET - Display all rooms


async function loadRooms() {

    try {

        const response = await fetch(API_URL);

        const rooms = await response.json();

        const tableBody = document.getElementById("roomTableBody");

        tableBody.innerHTML = "";

        if (rooms.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No rooms found.</td></tr>';
            return;
        }

        rooms.forEach(room => {

            const row = document.createElement("tr");

            const isAvailable = room.status === "Available";

            row.innerHTML = `
                <td>${room.room_no}</td>
                <td>${room.room_type}</td>
                <td>${room.capacity}</td>
                <td>${room.status}</td>

                <td>
                    <button onclick="editRoom('${room._id}')">
                        Edit
                    </button>

                    <button
                        class="delete"
                        onclick="deleteRoom('${room._id}')"
                        ${!isAvailable ? 'disabled title="Only available rooms can be deleted"' : ''}
                    >
                        Delete
                    </button>
                </td>
            `;

            tableBody.appendChild(row);

        });

    } catch (error) {

        console.error(error);

        showMessage("Failed to load rooms. Server may be unavailable.", "error");

    }

}


// POST / PUT - Add or Update room


document.getElementById("roomForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const roomId = document.getElementById("roomId").value;

    const room_no = document.getElementById("room_no").value.trim();
    const room_type = document.getElementById("room_type").value;
    const capacity = Number(document.getElementById("capacity").value);
    const status = document.getElementById("status").value;

    // Frontend validation: room number format
    if (!/^[A-Z][0-9]{3}$/.test(room_no)) {
        showMessage("Room number must follow the format A101 (one uppercase letter followed by three digits).", "error");
        return;
    }

    // Frontend validation: capacity matches room type
    if (capacityMap[room_type] && capacity !== capacityMap[room_type]) {
        showMessage("Capacity does not match room type.", "error");
        return;
    }

    const roomData = {
        room_no: room_no,
        room_type: room_type,
        capacity: capacity,
        status: status
    };


    try {

        let response;

        // UPDATE
        if (roomId) {

            response = await fetch(`${API_URL}/${roomId}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(roomData)

            });

        }

        // CREATE
        else {

            response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(roomData)

            });

        }


        const data = await response.json();


        if (!response.ok) {

            showMessage(data.message || data.error, "error");

            return;

        }


        showMessage(
            roomId
                ? "Room updated successfully."
                : "Room added successfully.",
            "success"
        );


        resetForm();

        loadRooms();


    } catch (error) {

        console.error(error);

        showMessage("Server unavailable. Please try again later.", "error");

    }

});



// Edit Room


async function editRoom(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`);

        const room = await response.json();


        document.getElementById("roomId").value = room._id;

        document.getElementById("room_no").value = room.room_no;

        document.getElementById("room_type").value = room.room_type;

        document.getElementById("capacity").value = room.capacity;

        document.getElementById("status").value = room.status;


        document.getElementById("formTitle").textContent =
            "Update Room";

        document.getElementById("submitButton").textContent =
            "Update Room";


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


    } catch (error) {

        console.error(error);

        showMessage("Failed to load room details.", "error");

    }

}



// DELETE - Delete room


async function deleteRoom(id) {

    if (!confirm("Are you sure you want to delete this room?")) {
        return;
    }


    try {

        const response = await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });


        const data = await response.json();


        if (!response.ok) {

            showMessage(data.message, "error");

            return;

        }


        showMessage("Room deleted successfully.", "success");

        loadRooms();


    } catch (error) {

        console.error(error);

        showMessage("Server unavailable. Please try again later.", "error");

    }

}



// Reset form


function resetForm() {

    document.getElementById("roomForm").reset();

    document.getElementById("roomId").value = "";

    document.getElementById("capacity").value = "";

    document.getElementById("formTitle").textContent =
        "Add Room";

    document.getElementById("submitButton").textContent =
        "Add Room";

}



// Show message with color


function showMessage(message, type) {

    const element = document.getElementById("message");

    element.textContent = message;

    element.style.color = type === "success" ? "#27ae60" : "#c0392b";

    setTimeout(() => {

        element.textContent = "";

    }, 4000);

}



// Logout


function logout() {

    sessionStorage.removeItem("isAdminLoggedIn");

    window.location.href = "index.html";

}


// Load rooms when page opens

loadRooms();
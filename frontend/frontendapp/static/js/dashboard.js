console.log("Dashboard Loaded");

const token = localStorage.getItem("access");

const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", createNote);

if (!token) {
    alert("Please login first.");
    window.location.href = "/";
}

loadNotes();

async function loadNotes() {

    const response = await fetch("http://127.0.0.1:8000/api/notes/", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    console.log("Status:", response.status);

    const data = await response.json();

    console.log("Response:", data);

    if (!response.ok) {
        alert("Error loading notes");
        return;
    }

    const container = document.getElementById("notesContainer");
    container.innerHTML = "";

    data.forEach(note => {
        container.innerHTML += `
    <div class="note">

        <h3>${note.title}</h3>

        <p>${note.content}</p>

        <button onclick="editNote(${note.id})">
            Edit
        </button>

        <button onclick="deleteNote(${note.id})">
            Delete
        </button>

        <hr>

    </div>
        `;
    });
}

async function createNote() {

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const response = await fetch("http://127.0.0.1:8000/api/notes/", {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify({
            title: title,
            content: content
        })

    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {

        alert("Note Created!");

        document.getElementById("title").value = "";
        document.getElementById("content").value = "";

        loadNotes();

    } else {

        alert("Failed to create note.");

    }

}

async function deleteNote(id) {

    const response = await fetch(
        `http://127.0.0.1:8000/api/notes/${id}/`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if (response.ok) {

        alert("Note Deleted");

        loadNotes();

    } else {

        alert("Unable to delete note");

    }

}

function editNote(id) {

    alert("Edit Note ID: " + id);

}
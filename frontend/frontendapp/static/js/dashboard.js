console.log("Dashboard Loaded");

const API_URL = "http://127.0.0.1:8000/api/notes/";
const token = localStorage.getItem("access");

let editingNoteId = null;

if (!token) {
    alert("Please login first.");
    window.location.href = "/";
}

const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", createNote);

loadNotes();


// ===============================
// Load Notes
// ===============================

async function loadNotes() {

    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        alert("Unable to load notes.");
        return;
    }

    const notes = await response.json();

    const container = document.getElementById("notesContainer");

    container.innerHTML = "";

    if (notes.length === 0) {
        container.innerHTML = "<h3>No Notes Available</h3>";
        return;
    }

    notes.forEach(note => {

        container.innerHTML += `
            <div class="note">

                <h3>${note.title}</h3>

                <p>${note.content}</p>

                <button onclick='editNote(${note.id}, ${JSON.stringify(note.title)}, ${JSON.stringify(note.content)})'>
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


// ===============================
// Create / Update Note
// ===============================

async function createNote() {

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!title || !content) {
        alert("Please enter title and content.");
        return;
    }

    let url = API_URL;
    let method = "POST";

    if (editingNoteId !== null) {
        url = `${API_URL}${editingNoteId}/`;
        method = "PUT";
    }
console.log("editingNoteId:", editingNoteId);
console.log("URL:", url);
console.log("Method:", method);
    const response = await fetch(url, {

        method: method,

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

        alert(editingNoteId === null ? "Note Created!" : "Note Updated!");

        document.getElementById("title").value = "";
        document.getElementById("content").value = "";

        editingNoteId = null;

        addBtn.innerText = "Add Note";

        loadNotes();

    } else {

        alert("Operation Failed");

        console.log(data);

    }

}


// ===============================
// Edit Note
// ===============================

function editNote(id, title, content) {

    editingNoteId = id;

    document.getElementById("title").value = title;
    document.getElementById("content").value = content;

    addBtn.innerText = "Update Note";
    

}


// ===============================
// Delete Note
// ===============================

async function deleteNote(id) {

    const confirmDelete = confirm("Delete this note?");

    if (!confirmDelete) {
        return;
    }

    const response = await fetch(`${API_URL}${id}/`, {

        method: "DELETE",

        headers: {
            "Authorization": `Bearer ${token}`
        }

    });

    if (response.ok) {

        alert("Note Deleted");

        loadNotes();

    } else {

        alert("Unable to delete note");

    }

}
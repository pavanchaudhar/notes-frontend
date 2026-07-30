console.log("Dashboard Loaded");

const token = localStorage.getItem("access");

if (!token) {
    alert("Please login first.");
    window.location.href = "/";
}

loadNotes();

async function loadNotes() {

    const response = await fetch("/api/notes/", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const notes = await response.json();

    console.log(notes);

    const container = document.getElementById("notesContainer");

    container.innerHTML = "";

    notes.forEach(note => {

        container.innerHTML += `
            <div>
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <hr>
            </div>
        `;

    });

}
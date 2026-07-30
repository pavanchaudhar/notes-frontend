console.log("Dashboard Loaded");

const token = localStorage.getItem("access");

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
            <div>
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <hr>
            </div>
        `;
    });
}
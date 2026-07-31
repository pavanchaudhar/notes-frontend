console.log("Register Page Loaded");

const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", register);

async function register() {

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {

        alert("Registration Successful!");

        window.location.href = "/";

    } else {

        alert("Registration Failed");

        console.log(data);

    }
}
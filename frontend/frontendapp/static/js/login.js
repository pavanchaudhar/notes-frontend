const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", login);

async function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {
    console.log("Login Successful");

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    alert("Redirecting to Dashboard");

    window.location.href = "/dashboard/";
    } else {
        alert(data.detail);
    }
}
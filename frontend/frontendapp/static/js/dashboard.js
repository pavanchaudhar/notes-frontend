console.log("Dashboard Loaded");

const token = localStorage.getItem("access");

console.log("Access Token:");
console.log(token);

if (!token) {
    alert("Please login first.");
    window.location.href = "/";
}
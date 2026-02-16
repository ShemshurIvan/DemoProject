const API_BASE_URL = "http://localhost:8080";

// 1. AUTHENTICATION REDIRECT
function handleLogin() {
    console.log("Initiating GitHub Login...");
    // Changed from 'cognito' to 'github' to match application.properties
    window.location.href = API_BASE_URL + "/oauth2/authorization/github";
}

function handleLogout() {
    window.location.href = API_BASE_URL + "/logout";
}

// 2. CHECK LOGIN STATUS
async function checkAuth() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/api/user/me`); // Fixed path based on your Controller
        const statusLog = document.getElementById('statusLog');

        if (response.ok) {
            const user = await response.json();
            // User is logged in
            document.getElementById('authSection').innerHTML =
                `<button onclick="handleLogout()">Logout (${user.name})</button>`;
            document.getElementById('mainContent').style.display = 'block';
            statusLog.innerText = `System Ready: Logged in as ${user.email}`;
            statusLog.style.color = "#2ecc71";
        } else {
            // User is NOT logged in
            document.getElementById('mainContent').style.display = 'none';
            statusLog.innerText = "Please login to access the Semantic Portal";
            statusLog.style.color = "#e74c3c";
        }
    } catch (err) {
        console.error("Auth check failed:", err);
    }
}

// 3. AI & RAG FUNCTIONS
async function handleAsk() {
    const question = document.getElementById('query').value;
    const responseBox = document.getElementById('aiResponse');
    responseBox.innerText = "AI is thinking...";

    try {
        const response = await fetch(`${API_BASE_URL}/api/rag/ask?question=${encodeURIComponent(question)}`);
        if (response.status === 401) return handleLogin();

        responseBox.innerText = await response.text();
    } catch (err) {
        responseBox.innerText = "Error contacting service.";
    }
}

// Run auth check when page loads
window.addEventListener('DOMContentLoaded', checkAuth);
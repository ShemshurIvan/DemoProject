const API_BASE_URL = "http://localhost:8080"; // Your Spring Boot Backend

// Utility to update the UI status
const updateStatus = (text, isError = false) => {
    const footer = document.getElementById('statusLog');
    footer.innerText = text;
    footer.style.color = isError ? "#e74c3c" : "#2ecc71";
};

// 1. REGISTER USER
async function handleRegister() {
    const payload = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(await response.text());

        const data = await response.json();
        updateStatus(`User ${data.username} registered successfully!`);
    } catch (err) {
        updateStatus(err.message, true);
    }
}

// 2. INGEST DATA (RAG)
async function handleIngest() {
    const content = document.getElementById('knowledgeText').value;
    updateStatus("Processing embeddings...");

    try {
        const response = await fetch(`${API_BASE_URL}/api/rag/ingest`, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: content
        });

        updateStatus(await response.text());
    } catch (err) {
        updateStatus("Ingestion failed", true);
    }
}

// 3. ASK AI
async function handleAsk() {
    const question = document.getElementById('query').value;
    const responseBox = document.getElementById('aiResponse');

    responseBox.innerText = "AI is thinking...";

    try {
        const response = await fetch(`${API_BASE_URL}/api/rag/ask?question=${encodeURIComponent(question)}`);
        const text = await response.text();
        responseBox.innerText = text;
        updateStatus("Query complete");
    } catch (err) {
        responseBox.innerText = "Error contacting AI service.";
        updateStatus("Search error", true);
    }
}
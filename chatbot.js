function sendMessage() {
    const userInput = document.getElementById("userInput");
    const chatHistory = document.getElementById("chatHistory");

    if (userInput.value.trim() !== "") {
        // Append user message to chat history
        chatHistory.innerHTML += `<div class="user-message">${userInput.value}</div>`;

        // TODO: Send user input to chatbot backend and get response
        // For now, we'll just echo the user's message
        chatHistory.innerHTML += `<div class="bot-message">Echo: ${userInput.value}</div>`;

        // Clear the input field
        userInput.value = "";

        // Scroll to the bottom of the chat history
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
}

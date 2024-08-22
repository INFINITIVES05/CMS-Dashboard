// Get elements
const chatboxButton = document.getElementById('chatboxButton');
const chatboxContainer = document.getElementById('chatboxContainer');
const chatboxClose = document.getElementById('chatboxClose');

// Show chatbox on button click
chatboxButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    chatboxContainer.style.display = 'flex';
});

// Hide chatbox on close button click
chatboxClose.addEventListener('click', () => {
    chatboxContainer.style.display = 'none';
});

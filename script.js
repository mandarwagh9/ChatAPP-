// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your Firebase configuration
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
     measurementId: "YOUR_MEASUREMENT_ID"
   }
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Function to join the chat
window.joinChat = function() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;

  if (username && email) {
    // Perform Firebase authentication or other operations with the email here
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('chat-room').style.display = 'block';
  } else {
    alert('Please enter both email and username');
  }
}

// Function to send a message
window.sendMessage = async function() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value;
  const username = document.getElementById('username').value;

  if (message) {
    try {
      await addDoc(collection(db, "messages"), {
        username: username,
        message: message,
        timestamp: new Date(),
        type: 'text'
      });
      messageInput.value = ''; // Clear the input field
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  }
}

// Listen for new messages
const q = query(collection(db, "messages"), orderBy("timestamp", "asc"), limit(50));
onSnapshot(q, (snapshot) => {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = ''; // Clear existing messages
  snapshot.forEach((doc) => {
    const data = doc.data();
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    // Create username span with dynamic color
    const usernameElement = document.createElement('span');
    usernameElement.classList.add('username');
    usernameElement.textContent = `${data.username}: `;
    
    // Create message span
    const messageTextElement = document.createElement('span');
    messageTextElement.textContent = data.message;
    
    // Append username and message text to message element
    messageElement.appendChild(usernameElement);
    messageElement.appendChild(messageTextElement);

    messagesDiv.appendChild(messageElement);
  });
});

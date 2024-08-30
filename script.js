// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

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
const storage = getStorage(app);

// Function to join the chat
window.joinChat = function() {
  const username = document.getElementById('username').value;
  if (username) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('chat-room').style.display = 'block';
  } else {
    alert('Please enter a username');
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

// Function to upload an image
async function uploadImage(file) {
  const storageRef = ref(storage, 'images/' + file.name);
  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    return null;
  }
}

// Function to send an image
window.sendImage = async function() {
  const fileInput = document.getElementById('image-input');
  const file = fileInput.files[0];
  if (file) {
    const downloadURL = await uploadImage(file);
    if (downloadURL) {
      try {
        await addDoc(collection(db, "messages"), {
          username: document.getElementById('username').value,
          message: downloadURL,
          timestamp: new Date(),
          type: 'image'
        });
      } catch (error) {
        console.error("Error sending image:", error.message);
      }
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
    if (data.type === 'image') {
      const img = document.createElement('img');
      img.src = data.message;
      img.style.maxWidth = '100%'; // Ensure images fit within the chat window
      messageElement.appendChild(img);
    } else {
      messageElement.textContent = `${data.username}: ${data.message}`;
    }
    messagesDiv.appendChild(messageElement);
  });
});

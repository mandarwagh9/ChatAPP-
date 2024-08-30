# Cyber Chat Room

Welcome to the **Cyber Chat Room**! This project is a retro-themed chat application with a cyberpunk vibe. Users can join the chat with a username and send text messages in real-time.

## Features

- **Retro Cyberpunk Theme**: Styled with neon colors and a dark background for a cyberpunk look.
- **Real-Time Messaging**: Users can send and receive messages instantly.
- **Anonymous Chat**: No signup required; just enter a username to join the chat.

## Technologies Used

- **HTML**: Structure of the web pages.
- **CSS**: Styling to achieve the retro cyberpunk aesthetic.
- **JavaScript**: Functionality for chat operations and Firebase integration.
- **Firebase**: Backend services for authentication, real-time database, and storage.

## Setup

### Prerequisites

- **Firebase Account**: You need a Firebase account to use Firebase services.
- **Firebase Configuration**: You should have your Firebase project setup with Firestore, Authentication, and Storage.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/mandarwagh9/ChatAPP-.git
   cd ChatAPP-
   ```

2. **Create a Firebase Project**

   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project and add Firestore, Authentication, and Storage.

3. **Update Firebase Configuration**

   - Replace the placeholder Firebase configuration in `script.js` with your own configuration from the Firebase Console.

   ```js
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
     measurementId: "YOUR_MEASUREMENT_ID"
   };
   ```

4. **Serve the Application**

   You can use a local server to serve the application. If you have `npm` installed, you can use a simple server like `http-server`.

   ```bash
   npm install -g http-server
   http-server
   ```

   Navigate to `http://localhost:8080` (or the port displayed) in your web browser to view the chat room.

## Usage

1. **Join the Chat**

   - Enter a username in the input field on the welcome screen.
   - Click the "Join Chat" button to enter the chat room.

2. **Send Messages**

   - Type your message in the input field at the bottom of the chat room.
   - Click the "Send" button to send your message.

## Contributing

Feel free to submit issues and pull requests if you want to contribute to the project. Please ensure that any contributions adhere to the project's coding standards and include tests if applicable.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, please contact [your-email@example.com](mailto:your-email@example.com).

---

Enjoy your chat experience with the Cyber Chat Room! 🚀

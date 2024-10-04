
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCYrLl1WIblJhDUi1lBt6sCHvdl37lhHgE",
    authDomain: "my-comments-section.firebaseapp.com",
    projectId: "my-comments-section",
    storageBucket: "my-comments-section.appspot.com",
    messagingSenderId: "74848503752",
    appId: "1:74848503752:web:27173c5299e3bd91b022fd"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Handle form submission
document.getElementById('commentForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent page reload

  const name = document.getElementById('name').value;
  const commentText = document.getElementById('comment').value;
  const pageIdentifier = window.location.pathname; // Use page URL to identify comments for this page

  // Save comment to Firestore
  db.collection('comments').add({
    name: name,
    comment: commentText,
    page: pageIdentifier, // Store which page the comment belongs to
    timestamp: firebase.firestore.FieldValue.serverTimestamp() // Timestamp of comment
  }).then(() => {
    console.log('Comment added!');
    document.getElementById('commentForm').reset(); // Clear form
    loadComments(); // Reload comments after new one is added
  }).catch((error) => {
    console.error('Error adding comment: ', error);
  });
});

// Function to load and display comments
function loadComments() {
  const pageIdentifier = window.location.pathname; // Get current page URL

  // Get comments for the current page, ordered by timestamp
  db.collection('comments')
    .where('page', '==', pageIdentifier)
    .orderBy('timestamp', 'desc')
    .get()
    .then((querySnapshot) => {
      const commentsBox = document.getElementById('comments-box');
      commentsBox.innerHTML = ''; // Clear previous comments

      querySnapshot.forEach((doc) => {
        const comment = doc.data();
        const commentElement = document.createElement('div');
        commentElement.innerHTML = `
          <strong>${comment.name}</strong> (${comment.timestamp?.toDate().toLocaleString()}):
          <p>${comment.comment}</p>
          <hr>
        `;
        commentsBox.appendChild(commentElement);
      });
    });
}

// Load comments when the page loads
window.onload = loadComments;

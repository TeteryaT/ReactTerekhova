import React, { useState } from 'react';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [avatar, setAvatar] = useState('');
  const [secretWord, setSecretWord] = useState('');

  const handleAddComment = () => {
    if (name && email && message && avatar) {
      const newComment = {
        id: Date.now(),
        name,
        email,
        message,
        date: new Date().toLocaleString(),
        avatar,
        secretWord: Math.random().toString(36).substring(2, 8), // Generate a random secret word
      };
      setComments([...comments, newComment]);
      setName('');
      setEmail('');
      setMessage('');
      setAvatar('');
    }
  };

  const handleEditComment = (id, updatedMessage) => {
    setComments(comments.map(comment => (comment.id === id ? { ...comment, message: updatedMessage } : comment)));
  };

  const handleDeleteComment = (id, enteredSecretWord) => {
    const comment = comments.find(comment => comment.id === id);
    if (comment.secretWord === enteredSecretWord) {
      setComments(comments.filter(comment => comment.id !== id));
    } else {
      alert('Incorrect secret word!');
    }
  };

  const handleViewInfo = (comment) => {
    alert(`User: ${comment.name}\nEmail: ${comment.email}\nDate: ${comment.date}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Comments</h1>
      <div style={styles.formContainer}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ ...styles.input, height: '100px' }}
        />
        <button onClick={handleAddComment} style={styles.button}>Add Comment</button>
      </div>
      <div style={styles.commentsContainer}>
        {comments.map((comment) => (
          <div key={comment.id} style={styles.comment}>
            <img src={comment.avatar} alt={comment.name} style={styles.avatar} />
            <div style={styles.commentContent}>
              <h3>{comment.name}</h3>
              <p>{comment.message}</p>
              <p><strong>Email:</strong> {comment.email}</p>
              <p><strong>Date:</strong> {comment.date}</p>
              <div style={styles.buttonGroup}>
                <button onClick={() => handleEditComment(comment.id, prompt('Edit your message:', comment.message))} style={styles.button}>
                  Edit
                </button>
                <button onClick={() => {
                  const enteredSecretWord = prompt('Enter secret word to delete:');
                  handleDeleteComment(comment.id, enteredSecretWord);
                }} style={styles.button}>
                  Delete
                </button>
                <button onClick={() => handleViewInfo(comment)} style={styles.button}>
                  View Info
                </button>
              </div>
              <p><strong>Secret Word:</strong> {comment.secretWord}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    margin: '5px 0',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    margin: '5px 0',
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  commentsContainer: {
    marginTop: '20px',
  },
  comment: {
    display: 'flex',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  commentContent: {
    flex: 1,
  },
  buttonGroup: {
    marginTop: '10px',
  },
};

export default Comments;
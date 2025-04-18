import logo from './logo.svg';
import './App.css';

import React, { useState } from "react";

// Компонент формы для ввода контакта
function ContactForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    // Валидация
    if (!name || !email || !message || !gender) {
      setErrors("Пожалуйста, заполните все поля.");
      return;
    }

    // Отправка данных
    onSubmit({ name, email, message, gender });

    // Очистка полей
    setName("");
    setEmail("");
    setMessage("");
    setGender("");
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div>
        <label>Имя:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Электронная почта:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Сообщение:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <div className="radio-group">
        <label className="radio-label">
          <input
            type="radio"
            value="male"
            className="radio-input"
            checked={gender === "male"}
            onChange={(e) => setGender(e.target.value)}
          />
          <span className="radio-custom"></span>
          Мужской
        </label>
        <label className="radio-label">
          <input
            type="radio"
            value="female"
            className="radio-input"
            checked={gender === "female"}
            onChange={(e) => setGender(e.target.value)}
          />
          <span className="radio-custom"></span>
          Женский
        </label>
      </div>
      {errors && <p className="error">{errors}</p>}
      <button type="submit" className="btn-submit">Отправить</button>
    </form>
  );
}


// Компонент для отображения списка контактов
function ContactList({ contacts }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Электронная почта</th>
          <th>Сообщение</th>
          <th>Пол</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact, index) => (
          <tr key={index}>
            <td>{contact.name}</td>
            <td>{contact.email}</td>
            <td>{contact.message}</td>
            <td>{contact.gender}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Главный компонент
function App() {
  const [contacts, setContacts] = useState([]);

  const handleAddContact = (contact) => {
    setContacts([...contacts, contact]);
  };

  return (
    <div className="app">
      <h1>Форма контакта</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2>Список контактов</h2>
      <ContactList contacts={contacts} />
    </div>
  );
}

export default App;
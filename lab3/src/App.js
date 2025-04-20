import React, { useState, useMemo } from 'react';
import './App.css';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[\w.-]+@[\w-]+\.[a-z]{2,}$/i;
    if (emailRegex.test(email)) {
      setStatus('success');
      setMessage('Email успешно отправлен!');
    } else {
      setStatus('error');
      setMessage('Некорректный email.');
    }
  };

  return (
    <div>
      <h2>EmailForm</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Введите email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Отправить</button>
      </form>
      {message && <p className={status === 'error' ? 'error' : 'success'}>{message}</p>}
    </div>
  );
};

const initialProducts = [
  { name: 'Товар A', price: 100, quantity: 5 },
  { name: 'Товар B', price: 50, quantity: 0 },
  { name: 'Товар C', price: 200, quantity: 2 },
  { name: 'Товар D', price: 75, quantity: 8 },
  { name: 'Товар E', price: 120, quantity: 1 },
];

const ProductCatalog = () => {
  const [products, setProducts] = useState(initialProducts);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    if (sortConfig.key !== null) {
      sorted.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [products, sortConfig]);

  const totalQty = sortedProducts.reduce((acc, p) => acc + p.quantity, 0);
  const totalSum = sortedProducts.reduce((acc, p) => acc + p.quantity * p.price, 0);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      const direction = prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc';
      return { key, direction };
    });
  };

  return (
    <div>
      <h2>Каталог товаров</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => handleSort('name')}>Название</th>
            <th onClick={() => handleSort('price')}>Цена</th>
            <th onClick={() => handleSort('quantity')}>Количество</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product, index) => {
            const rowClass = product.quantity === 0 ? 'red' : product.quantity < 3 ? 'yellow' : '';
            return (
              <tr key={index} className={rowClass}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p><strong>Общее количество:</strong> {totalQty}</p>
      <p><strong>Общая стоимость:</strong> {totalSum} ₽</p>
    </div>
  );
};

function App() {
  return (
    <div>
      <h1>Лабораторная работа №3</h1>
      <EmailForm />
      <hr />
      <ProductCatalog />
    </div>
  );
}

export default App;
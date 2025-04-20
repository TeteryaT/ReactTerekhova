import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalog from './Catalog';
import OrderForm from './OrderForm';
import watchImage from './watch.jpg';
import acerImage from './acer.jpg';

const App = () => {
  const products = [
    {
      name: 'Смарт-часы SuperWatch',
      price: 7990,
      quantity: 25,
      image: watchImage,
      description: 'Водонепроницаемые спортивные часы с Android 4.4 на борту.',
      weight:40,
      isNew: true,
      discount: 20,
    },
    {
      name: 'Ноутбук Acer Aspire',
      price: 49990,
      quantity: 10,
      image: acerImage,
      description: 'Мощный ноутбук для работы и учебы.',
      weight:1000,
      isNew: false,
      discount: 10,
    },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Catalog products={products} />} />
        <Route path="/order" element={<OrderForm />} />
      </Routes>
    </Router>
  );
};

export default App;
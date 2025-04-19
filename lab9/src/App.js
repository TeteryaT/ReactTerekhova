import React, { useState } from 'react';
import './App.css';
import watchImage from './watch.jpg';
import acerImage from './acer.jpg';
import SortTable from './SortTable';
import Search from './Search';

function App() {
  const [sortKey, setSortKey] = useState(null);

  const sampleProducts = [
    {
      name: 'Смарт-часы SuperWatch',
      price: 7990,
      quantity: 25,
      image: watchImage,
      description: 'Водонепроницаемые спортивные часы с Android 4.4.2 на борту...',
      isNew: true,
      discount: 20,
    },
    {
      name: 'Ноутбук Acer Aspire',
      price: 49990,
      quantity: 10,
      image: acerImage,
      description: 'Мощный ноутбук для работы и учебы.',
      isNew: false,
      discount: 10,
    },
  ];

  const sortedProducts = [...sampleProducts].sort((a, b) => {
    if (a.isNew && !b.isNew) return -1;
    if (!a.isNew && b.isNew) return 1;
    if (!sortKey) return 0;

    if (typeof a[sortKey] === 'string') {
      return a[sortKey].localeCompare(b[sortKey]);
    } else {
      return a[sortKey] - b[sortKey];
    }
  });

  return (
    <div className="App">
      <h1>Каталог и Поиск</h1>
      <Search products={sampleProducts} />
      <h2>Таблица товаров</h2>
      <SortTable products={sortedProducts} onSort={setSortKey} />
    </div>
  );
}

export default App;

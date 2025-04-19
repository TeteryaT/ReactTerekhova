import React, { useState, useMemo } from 'react';
import './App.css';
import watchImage from './watch.jpg';
import acerImage from './acer.jpg';
import SortTable from './SortTable';
import Catalog from './Catalog';

function App() {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

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

  // Обработчик сортировки
  const handleSort = (key) => {
    if (key === sortKey) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  // Мемоизация отсортированных товаров
  const sortedProducts = useMemo(() => {
    const sorted = [...sampleProducts];
    if (!sortKey) return sorted;
    return sorted.sort((a, b) => {
      let valueA = a[sortKey];
      let valueB = b[sortKey];

      if (typeof valueA === 'string') {
        return sortOrder === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return sortOrder === 'asc'
          ? valueA - valueB
          : valueB - valueA;
      }
    });
  }, [sortKey, sortOrder]);

  return (
    <div className="App">
      <h2>Таблица товаров</h2>
      <SortTable products={sortedProducts} onSort={handleSort} />

      <h2>Каталог товаров</h2>
      <Catalog products={sortedProducts} />
    </div>
  );
}

export default App;

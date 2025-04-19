import React, { useState } from 'react';

const Search = ({ products }) => {
  const [query, setQuery] = useState('');
  const [exactMatch, setExactMatch] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const filtered = products.filter(product => {
      const name = product.name.toLowerCase();
      const q = query.toLowerCase();
      return exactMatch ? name === q : name.includes(q);
    });
    setResults(filtered);
  };

  return (
    <div className="search-container">
      <h2>Поиск товара</h2>
      <div className="search-controls">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Введите название товара"
        />
        <label>
          <input
            type="checkbox"
            checked={exactMatch}
            onChange={e => setExactMatch(e.target.checked)}
          />
          Точное совпадение
        </label>
        <button onClick={handleSearch}>Найти</button>
      </div>

      <div className="catalog">
        {results.length > 0 ? (
          results.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={product.image} alt={product.name} className="product-image" />
              {product.isNew && <span className="product-badge">Новинка</span>}
              <h3>{product.name}</h3>
              <p><strong>Описание:</strong> {product.description}</p>
              <p><strong>Количество на складе:</strong> {product.quantity}</p>
              <p><strong>Цена:</strong> {product.price} руб.</p>
              {product.discount > 0 ? (
                <p>
                  <strong>Цена со скидкой:</strong>{' '}
                  <span className="discounted-price">
                    {product.price - (product.price * product.discount / 100)} руб.
                  </span>{' '}
                  <span className="old-price">{product.price} руб.</span> (-{product.discount}%)
                </p>
              ) : (
                <p><strong>Скидка:</strong> отсутствует</p>
              )}
            </div>
          ))
        ) : (
          <p>Ничего не найдено.</p>
        )}
      </div>
      <style jsx>{`
        .search-container {
          padding: 20px;
          background-color: #f5f5f5;
          margin-bottom: 30px;
          border-radius: 10px;
        }

        .search-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }

        .search-controls input[type="text"] {
          padding: 8px;
          flex: 1;
          min-width: 200px;
        }

        .search-controls label {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .search-controls button {
          padding: 8px 16px;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .catalog {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .product-card {
          background-color: white;
          padding: 15px;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          width: 280px;
          position: relative;
        }

        .product-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .product-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: crimson;
          color: white;
          padding: 4px 8px;
          font-size: 12px;
          border-radius: 6px;
        }

        .discounted-price {
          color: red;
          font-weight: bold;
        }

        .old-price {
          text-decoration: line-through;
          color: gray;
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};

export default Search;

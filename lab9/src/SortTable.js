import React from 'react';

const SortTable = ({ products, onSort }) => {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.header} onClick={() => onSort('name')}>Наименование</th>
          <th style={styles.header} onClick={() => onSort('price')}>Стоимость</th>
          <th style={styles.header} onClick={() => onSort('quantity')}>Количество</th>
          <th>Изображение</th>
          <th>Описание</th>
          <th style={styles.header} onClick={() => onSort('discount')}>Скидка</th>
          <th>Новинка</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{product.name}</td>
            <td>
              {product.discount > 0 ? (
                <>
                  <span style={styles.discountedPrice}>
                    {product.price - (product.price * product.discount / 100)} руб.
                  </span>
                  <br />
                  <span style={styles.oldPrice}>{product.price} руб.</span>
                </>
              ) : (
                `${product.price} руб.`
              )}
            </td>
            <td>{product.quantity} шт.</td>
            <td>
              <img src={product.image} alt={product.name} style={styles.image} />
            </td>
            <td>{product.description}</td>
            <td>{product.discount}%</td>
            <td>{product.isNew ? 'Да' : 'Нет'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  header: {
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
    padding: '10px',
    border: '1px solid #ccc',
  },
  image: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
  },
  discountedPrice: {
    color: 'red',
    fontWeight: 'bold',
  },
  oldPrice: {
    textDecoration: 'line-through',
    fontSize: '0.9em',
    color: '#777',
  },
};

export default SortTable;

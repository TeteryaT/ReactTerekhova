import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from './actions';
import { Link } from 'react-router-dom';
import './styles.css';

const Catalog = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    dispatch(addToCart(product));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Каталог товаров</h1>
      <div style={styles.catalog}>
        {products.map((product, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.badges}>
              {product.isNew && <span style={styles.new}>Новинка</span>}
              {product.discount > 0 && (
                <span style={styles.discount}>{product.discount}%</span>
              )}
            </div>
            <img src={product.image} alt={product.name} style={styles.image} />
            <h3>{product.name}</h3>
            <p>
              {product.discount > 0 ? (
                <>
                  <span style={styles.discountedPrice}>
                    {product.price - (product.price * product.discount / 100)} руб.
                  </span>{' '}
                  <span style={styles.oldPrice}>{product.price} руб.</span>
                </>
              ) : (
                `${product.price} руб.`
              )}
            </p>
            <p><strong>Количество:</strong> {product.quantity} шт.</p>
            <p><strong>Масса:</strong> {product.weight} г</p> {/* Добавлено поле массы */}
            <p>{product.description}</p>
            <button onClick={() => handleAddToCart(product)}>Добавить в корзину</button>
          </div>
        ))}
      </div>
      <Link to="/order">
        <button style={styles.orderButton}>Перейти к оформлению заказа</button>
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    marginBottom: '20px',
  },
  catalog: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    position: 'relative',
    width: '250px',
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    marginBottom: '10px',
    borderRadius: '5px',
  },
  discountedPrice: {
    color: 'red',
    fontWeight: 'bold',
  },
  oldPrice: {
    textDecoration: 'line-through',
    color: '#888',
    fontSize: '0.9em',
    marginLeft: '8px',
  },
  badges: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  new: {
    backgroundColor: '#2ecc71',
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '5px',
    fontSize: '12px',
  },
  discount: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '5px',
    fontSize: '12px',
  },
  orderButton: {
    marginTop: '20px',
    padding: '10px 15px',
    backgroundColor: '#35424a',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
};

export default Catalog;
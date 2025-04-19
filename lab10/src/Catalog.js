import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from './actions';
import { Link } from 'react-router-dom'; // Импортируйте Link

const Catalog = () => {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    dispatch(addToCart(product));
  };

  return (
    <div>
      <h1>Каталог товаров</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.price} руб.</p>
          <button onClick={() => handleAddToCart(product)}>Добавить в корзину</button>
        </div>
      ))}
      <Link to="/order">
        <button>Перейти к оформлению заказа</button>
      </Link>
    </div>
  );
};

export default Catalog;
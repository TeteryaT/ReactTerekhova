import React from 'react';

const Catalog = ({ products }) => {
  return (
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
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  catalog: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
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
};

export default Catalog;

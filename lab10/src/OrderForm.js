
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateItemQuantity } from './actions';
import './styles.css';

const OrderForm = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [shippingMethod, setShippingMethod] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [step, setStep] = useState(1);

  const totalWeight = cart.reduce((sum, product) => {
    // Проверяем, что масса продукта задана и является числом
    return sum + (product.weight && typeof product.weight === 'number' ? product.weight * product.quantity : 0);
  }, 0);
  
  const totalAmount = cart.reduce((sum, product) => {
    if (product.isIncluded) {
      return sum + (product.price - (product.price * product.discount / 100)) * product.quantity;
    }
    return sum;
  }, 0);

  const handleShippingChange = (e) => {
    setShippingMethod(e.target.value);
    if (e.target.value === 'pickup') {
      setDeliveryAddress('');
    }
  };

  const handleAddressChange = (e) => {
    setDeliveryAddress(e.target.value);
  };

  const deliveryCost = () => {
    switch (shippingMethod) {
      case 'courier':
        return totalAmount < 200 ? 10 : 0;
      case 'mail':
        // Проверяем, что totalWeight не NaN
        const weightInKg = Math.ceil(totalWeight / 1000); // масса в кг
        return weightInKg > 0 ? weightInKg * 5 : 0; // 5 рублей за кг
      case 'pickup':
        return 0;
      default:
        return 0;
    }
  };

  return (
    <div style={styles.container}>
      {step === 1 ? (
        <div>
          <h2 style={styles.header}>Корзина</h2>
          {cart.map((product) => (
            <div key={product.id} style={styles.productCard}>
              <p style={styles.productName}>{product.name}</p>
              <div style={styles.productControls}>
                <input
                  type="checkbox"
                  checked={product.isIncluded}
                  onChange={() => {
                    product.isIncluded = !product.isIncluded; // Toggle включение в заказ
                  }}
                  style={styles.checkbox}
                />
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => dispatch(updateItemQuantity(product.id, e.target.value))}
                  style={styles.quantityInput}
                />
                <button onClick={() => dispatch(removeFromCart(product.id))} style={styles.removeButton}>Удалить</button>
              </div>
            </div>
          ))}
          <button onClick={() => setStep(2)} style={styles.continueButton}>Продолжить</button>
        </div>
      ) : (
        <div>
          <h3 style={styles.subHeader}>Выберите способ доставки</h3>
          <div style={styles.shippingOptions}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="shipping"
                value="courier"
                checked={shippingMethod === 'courier'}
                onChange={handleShippingChange}
              />
              Курьером
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="shipping"
                value="mail"
                checked={shippingMethod === 'mail'}
                onChange={handleShippingChange}
              />
              Почтой
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="shipping"
                value="pickup"
                checked={shippingMethod === 'pickup'}
                onChange={handleShippingChange}
              />
              Самовывоз
            </label>
          </div>

          {shippingMethod !== 'pickup' && (
            <input
              type="text"
              value={deliveryAddress}
              onChange={handleAddressChange}
              placeholder="Адрес доставки"
              style={styles.addressInput}
            />
          )}

          <h3 style={styles.subHeader}>Выберите способ оплаты</h3>
          <div style={styles.paymentOptions}>
            <label style={styles.radioLabel}>
              <input type="radio" name="payment" value="cash" /> Наличные
            </label>
            <label style={styles.radioLabel}>
              <input type="radio" name="payment" value="card" /> Банковская карта
            </label>
            <label style={styles.radioLabel}>
              <input type="radio" name="payment" value="bankTransfer" /> Банковский перевод
            </label>
          </div>

          <p style={styles.totalAmount}>Итоговая стоимость: {totalAmount + deliveryCost()} руб.</p>
          <button onClick={() => setStep(1)} style={styles.backButton}>Назад</button>
          <button style={styles.paymentButton}>Перейти к оплате</button>
        </div>
      )}
    </div>
  );
};

const styles = {
    container: {
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
      textAlign: 'center',
      color: '#333',
    },
    subHeader: {
      marginTop: '20px',
      color: '#555',
    },
    productCard: {
      padding: '10px',
      margin: '10px 0',
      backgroundColor: '#fff',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    productName: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    productControls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    checkbox: {
      marginRight: '10px',
    },
    quantityInput: {
      width: '60px',
      marginRight: '10px',
      padding: '5px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    removeButton: {
      backgroundColor: '#e74c3c',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      padding: '5px 10px',
      cursor: 'pointer',
    },
    continueButton: {
      marginTop: '20px',
      backgroundColor: '#2ecc71',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      padding: '10px 15px',
      cursor: 'pointer',
      width: '100%',
    },
    shippingOptions: {
      margin: '10px 0',
    },
    radioLabel: {
      display: 'block',
      margin: '5px 0',
      color: '#333',
    },
    addressInput: {
      width: '100%',
      padding: '10px',
      marginTop: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    paymentOptions: {
      margin: '10px 0',
    },
    totalAmount: {
      fontWeight: 'bold',
      marginTop: '20px',
    },
    backButton: {
      marginTop: '10px',
      marginRight: '10px',
      backgroundColor: '#3498db',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      padding: '10px 15px',
      cursor: 'pointer',
    },
    paymentButton: {
      marginTop: '10px',
      backgroundColor: '#2ecc71',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      padding: '10px 15px',
      cursor: 'pointer',
      width: '100%',
    },
  };

export default OrderForm;
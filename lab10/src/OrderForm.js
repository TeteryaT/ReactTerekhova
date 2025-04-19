import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateItemQuantity } from './actions';

const OrderForm = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [shippingMethod, setShippingMethod] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [step, setStep] = useState(1);

  const totalWeight = cart.reduce((sum, product) => sum + product.weight * product.quantity, 0);
  const totalAmount = cart.reduce((sum, product) => sum + (product.price - (product.price * product.discount / 100)) * product.quantity, 0);

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
        return totalWeight * 5;
      case 'pickup':
        return 0;
      default:
        return 0;
    }
  };

  return (
    <div>
      {step === 1 ? (
        <div>
          <h2>Корзина</h2>
          {cart.map((product) => (
            <div key={product.id}>
              <p>{product.name}</p>
              <input
                type="checkbox"
                onChange={() => dispatch(removeFromCart(product.id))}
              />
              <input
                type="number"
                value={product.quantity}
                onChange={(e) => dispatch(updateItemQuantity(product.id, e.target.value))}
              />
              <button onClick={() => dispatch(removeFromCart(product.id))}>Удалить</button>
            </div>
          ))}
          <button onClick={() => setStep(2)}>Продолжить</button>
        </div>
      ) : (
        <div>
          <h3>Выберите способ доставки</h3>
          <label>
            <input
              type="radio"
              name="shipping"
              value="courier"
              checked={shippingMethod === 'courier'}
              onChange={handleShippingChange}
            />
            Курьером
          </label>
          <label>
            <input
              type="radio"
              name="shipping"
              value="mail"
              checked={shippingMethod === 'mail'}
              onChange={handleShippingChange}
            />
            Почтой
          </label>
          <label>
            <input
              type="radio"
              name="shipping"
              value="pickup"
              checked={shippingMethod === 'pickup'}
              onChange={handleShippingChange}
            />
            Самовывоз
          </label>

          {shippingMethod !== 'pickup' && (
            <input
              type="text"
              value={deliveryAddress}
              onChange={handleAddressChange}
              placeholder="Адрес доставки"
            />
          )}

          <h3>Выберите способ оплаты</h3>
          <label>
            <input type="radio" name="payment" value="cash" /> Наличные
          </label>
          <label>
            <input type="radio" name="payment" value="card" /> Банковская карта
          </label>
          <label>
            <input type="radio" name="payment" value="bankTransfer" /> Банковский перевод
          </label>

          <p>Итоговая стоимость: {totalAmount + deliveryCost()} руб.</p>
          <button onClick={() => setStep(1)}>Назад</button>
          <button>Перейти к оплате</button>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
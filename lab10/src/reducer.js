import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_ITEM_QUANTITY } from './actions';

const initialState = {
  cart: [],
  products: [
    {
      id: 1,
      name: 'Смарт-часы SuperWatch',
      price: 7990,
      quantity: 25,
      image: 'watch.jpg',
      description: 'Водонепроницаемые спортивные часы с Android 4.4 на борту.',
      isNew: true,
      discount: 20,
      weight: 0.5,
    },
    {
      id: 2,
      name: 'Ноутбук Acer Aspire',
      price: 49990,
      quantity: 10,
      image: 'acer.jpg',
      description: 'Мощный ноутбук для работы и учебы.',
      isNew: false,
      discount: 10,
      weight: 2.5,
    },
  ],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }], // Добавляем продукт с количеством 1
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.payload),
      };
    case UPDATE_ITEM_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(product =>
          product.id === action.payload.productId
            ? { ...product, quantity: action.payload.quantity }
            : product
        ),
      };
    default:
      return state;
  }
};

export default rootReducer;
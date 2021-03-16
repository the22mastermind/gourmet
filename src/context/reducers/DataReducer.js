export default (state, action) => {
  switch (action.type) {
    case 'ADD_MENU':
      return {
        ...state,
        menu: action.payload,
      };
    case 'GET_MENU': {
      const category = state.menu.filter(item => item.name === action.payload);
      return {
        ...state,
        menuItems: category[0].Items,
      };
    }
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'UPDATE_CART': {
      const updatedCart = state.cart.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        };
        return item;
      });
      return {
        ...state,
        cart: updatedCart,
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    case 'ADD_ORDERS':
      return {
        ...state,
        ordersList: action.payload,
      };
    default:
      return state;
  }
};

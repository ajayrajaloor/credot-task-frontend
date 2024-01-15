const cartReducer = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const existingItem = state.find((item) => item._id === action.payload._id);
  
        if (existingItem) {
          existingItem.quantity += 1;
          return [...state];
        } else {
          return [...state, { ...action.payload, quantity: 1 }];
        }
  
      case 'CLEAR_CART':
        return [];
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  
import React from 'react';
import { BsTrash } from 'react-icons/bs';

const Cart = ({ cartItems, clearCart, closeModal }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-modal">
      <div className="cart-header flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button
          onClick={closeModal}
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          Close
        </button>
      </div>
      <div className="cart-items mt-4">
        {cartItems.map((item) => (
          <div key={item._id} className="cart-item border-b border-gray-300 py-2 flex justify-between items-center">
            <div className="flex flex-col">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs">Quantity: {item.quantity}</p>
            </div>
            <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="cart-footer mt-4">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">Total:</p>
          <p className="text-lg font-semibold">${total.toFixed(2)}</p>
        </div>
        <button
          onClick={clearCart}
          className="clear-cart-btn bg-red-500 text-white py-2 px-4 rounded-full flex items-center mt-2"
        >
          Clear Cart <BsTrash className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Cart;

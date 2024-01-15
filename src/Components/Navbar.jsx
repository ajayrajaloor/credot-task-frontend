import React, { useState } from 'react';
import { BsCart4 } from 'react-icons/bs';
import Modal from 'react-modal';
import Cart from './Cart';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/actions/cartActions';

Modal.setAppElement('#root');

const Navbar = () => {
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const cartItems = useSelector((state) => state);
  const dispatch = useDispatch();

  const openCartModal = () => {
    setCartModalOpen(true);
  };

  const closeCartModal = () => {
    setCartModalOpen(false);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-50">
      <div className="flex items-center mb-4 sm:mb-0">
      <button className="mr-4" onClick={() => console.log("Home clicked")}>
  Home
</button>
<button className="mr-4" onClick={() => console.log("Shoes clicked")}>
  Shoes
</button>
<button className="mr-4" onClick={() => console.log("Backpack clicked")}>
  Backpack
</button>
<button className="mr-4" onClick={() => console.log("Contact clicked")}>
  Contact
</button>
      </div>

      <div className="relative">
        <div className="cart-icon cursor-pointer" onClick={openCartModal}>
          <BsCart4 className="text-white text-2xl sm:text-4xl rounded-full bg-blue-400 p-1" />
        </div>
        {cartItems.length > 0 && (
          <span className="cart-count absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            {cartItems.length}
          </span>
        )}

        <Modal
          isOpen={cartModalOpen}
          onRequestClose={closeCartModal}
          contentLabel="Cart Modal"
          className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg max-w-2xl w-full overflow-auto"
          overlayClassName="overlay fixed top-0 left-0 right-0 bottom-0 bg-black opacity-85 "
        >
          <div className="flex justify-end">
            <button
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={closeCartModal}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <Cart
            cartItems={cartItems}
            clearCart={handleClearCart}
            closeModal={closeCartModal}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;

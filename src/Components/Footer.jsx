import React from 'react';

const Footer = () => {
  return (
    <div className="bg-pink-100 sm:p-8 mt-8 text-center mx-auto my-auto p-3 rounded-sm">
      <div className="max-w-lg mx-auto">
        <h2 className="text-5xl mb-4 flex-grow ">LET'S STAY IN TOUCH</h2>
        <p className="text-lg mb-6 opacity-70">Get updates on sales specials and more</p>
        <div className="flex max-w-md mx-auto justify-start flex-col">
          <input
            type="email"
            placeholder="Enter your email"
            className="py-2 text-left pl-2 text-lg  w-auto border  border-gray-300 rounded-sm outline-none"
          />
          <button className="py-2 mt-1 text-lg w-24 bg-pink-500 border border-gray-400  rounded-xl ">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;

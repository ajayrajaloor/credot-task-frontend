import React from 'react';

const Banner = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-pink-100 h-auto md:h-96 px-8 mt-5 ">

      <div className="flex flex-col sm:flex-row max-w-full sm:w-2/3 py-5">
        <div className="max-w-xl mb-8 sm:mb-0 sm:mr-8 ">
          <h1 className="text-4xl font-bold mb-4">X-box for your living room</h1>
          <p className="mb-4">Contrary to popular belief. Lorem ipsum is not simply random text. It has roots in a piece of classical Latin literature.</p>
          <p className="text-pink-500 text-4xl font-bold mb-4">$600</p>
          <button className="bg-pink-500 text-white px-4 py-2 rounded">Buy now</button>
        </div>
      </div>

      <div className="w-full sm:w-1/3  mt-4">
        <img
          className="w-full h-48 md:h-full object-contain hidden lg:block"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBbsqQRdF3XTNADJDMnLOux-UI9PrD0zsiqw&usqp=CAU"
          alt="Product"
        />
      </div>
    </div>
  );
};

export default Banner;

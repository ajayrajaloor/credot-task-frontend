import React from "react";

const Products = ({ products, addToCart  }) => {
    console.log(products,'prddddddd');
  return (
    <div className="flex flex-wrap justify-between">
      {products.map((product) => (
        <div key={product._id} className="m-4 flex flex-col max-w-xs w-full md:w-1/3 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
          <a className="flex h-60 w-full overflow-hidden" href="#">
            <img
              className="object-contain mx-auto my-auto"
              src={product.imageUrl || 'https://via.placeholder.com/300'}
              alt="product image"
            />
          </a>
          <div className="flex flex-col mt-4 px-5 pb-5 justify-center items-center">
            <a href="">
              <h5 className="text-xl tracking-tight text-slate-900">
                {product.name}
              </h5>
            </a>
            <div className=" h-20 overflow-hidden">
              <p>{product.description}</p>
            </div>
            <div className="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span className="text-3xl font-bold text-slate-900">${product.price}</span>
              </p>
            </div>
            <button
              className="flex items-center justify-center rounded-md bg-slate-900 py-2.5 w-24 text-center text-sm font-medium text-white hover:bg-gray-700"
              onClick={(e) => {
                e.preventDefault(); 
                addToCart(product);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import Products from './Products';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';



export let setSelectedCategory;
export let setCurrentPage;


const Categories = ({ selectedCategory, handleCategoryClick }) => {
  const [products, setProducts] = useState([]);
 const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentPage(0);
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      let apiUrl = 
      // 'http://localhost:3030'
      "https://credot.onrender.com"
      ;

      if (selectedCategory && selectedCategory !== 'All') {
        apiUrl += `?category=${selectedCategory}`;
      } 

      const response = await axios.get(apiUrl);
      const shuffledProducts = shuffleArray(response.data);
      setProducts(shuffledProducts);
    } catch (error) {
      console.log('Error while fetching products', error);
    }
  };
  
  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };


  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Item added to cart');
  };


  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageCount = Math.ceil(products.length / productsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between mt-8 gap-5 ">
        <div className="category-item mx-auto my-auto">
            <button
              className={`bg-emerald-500 hover:bg-gray-300 p-3 rounded-md flex items-center w-48 justify-between ${
                selectedCategory === "All" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleCategoryClick("All")}
            >
              <span className="text-white text-2xl md:text-4xl w-20 md:w-auto">
                All
              </span>
            </button>
          </div>

          <div className="category-item mx-auto my-auto">
            <button
              className={`bg-yellow-500 hover:bg-gray-300 p-3 rounded-md flex items-center w-48 justify-between ${
                selectedCategory === "watch" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleCategoryClick("watch")}
            >
              <span className="text-white text-2xl md:text-4xl w-20 md:w-auto">
                Watch
              </span>
              <div className="ml-2 md:ml-4 w-10 h-10">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTVqipXA6NVjwo3oAqb0g8mQFLjv-6rZn9Tg&usqp=CAU"
                  alt="Watches"
                  className="rounded-full w-full h-full"
                />
              </div>
            </button>
          </div>

          <div className="category-item mx-auto my-auto">
            <button
              className={`bg-pink-500 hover:bg-gray-300 p-3 rounded-md flex items-center w-48 justify-between ${
                selectedCategory === "bag" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleCategoryClick("bag")}
            >
              <span className="text-white text-2xl md:text-4xl w-20 md:w-auto">
                Bag
              </span>
              <div className="ml-2 md:ml-4 w-10 h-10">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIgBPQdiusVzs67triiSbw_bSqsmp_g-vnzw&usqp=CAU"
                  alt="Bags"
                  className="rounded-full w-full h-full"
                />
              </div>
            </button>
          </div>

          <div className="category-item mx-auto my-auto">
            <button
              className={`bg-blue-500 hover:bg-gray-300 p-3 rounded-md flex items-center w-48 justify-between ${
                selectedCategory === "shoe" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleCategoryClick("shoe")}
            >
              <span className="text-white text-2xl md:text-4xl w-20 md:w-auto">
                Shoes
              </span>
              <div className="ml-2 md:ml-4 w-10 h-10">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCrkKKf4OxYCWRKWe0vzevLfOIKkvLABPt4Q&usqp=CAU"
                  alt="Shoes"
                  className="rounded-full w-full h-full"
                />
              </div>
            </button>
          </div>
        </div>

        <div id="products-section">
        <Products products={currentProducts} addToCart={handleAddToCart} />
      </div>

      <ReactPaginate
        previousLabel={
          <span className="w-5 h-10 flex items-center justify-center bg-gray-300 rounded-md">
            <BsChevronLeft className="text-5xl " />
          </span>
        }
        nextLabel={
          <span className="w-5 h-10 flex items-center justify-center bg-gray-300 rounded-md">
            <BsChevronRight className="text-5xl " />
          </span>
        }
        breakLabel={<span className="mr-2">...</span>}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination flex justify-center mt-8'}
        subContainerClassName={'pages pagination'}
        activeClassName={'bg-gray-500 text-white active'}
        pageClassName={
          'block border border-solid border-gray-200 hover:bg-gray-300 w-5 h-10 flex items-center justify-center rounded-md mx-2 cursor-pointer'
        }
        breakClassName={'mx-2'}
        disabledClassName={'text-gray-500 cursor-not-allowed'}
      />

      <div className="text-center mt-4 text-black">
        Page {currentPage + 1} of {pageCount}
      </div>
    </>
  );
};

export default Categories;

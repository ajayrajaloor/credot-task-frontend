import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import Products from './Products';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 6;

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, currentPage]);

  const fetchProducts = async () => {
    try {
      let apiUrl = 
      // 'http://localhost:3030'
      "https://credot.onrender.com"
      ;
  
      if (selectedCategory && selectedCategory.toLowerCase() !== 'all') {
        apiUrl += `?category=${selectedCategory.toLowerCase()}`;
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


  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(0); 
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Item added to cart');
  };

  const categories = [
    { name: 'All', color: 'emerald' },
    { name: 'Watch', color: 'yellow' },
    { name: 'Bag', color: 'pink' },
    { name: 'Shoe', color: 'blue' },
  ];

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
        {categories.map((category) => (
          <div key={category.name} className="category-item mx-auto my-auto">
            <button
              className={`bg-${category.color}-500 hover:bg-gray-300 p-3 rounded-md flex items-center w-48 justify-between ${
                selectedCategory === category.name ? 'bg-gray-300' : ''
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <span className="text-white text-2xl md:text-4xl w-20 md:w-auto">
                {category.name}
              </span>
            </button>
          </div>
        ))}
      </div>

      <Products products={currentProducts} addToCart={handleAddToCart} />

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
        activeClassName={'bg-gray-500 text-white'}
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

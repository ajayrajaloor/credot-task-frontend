import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Modal from "react-modal";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ReactPaginate from "react-paginate";

const firebaseConfig = {
  apiKey: "AIzaSyAksV7qmuxjcYVvgKMzYvsYZvblKJZ4Q3I",
  authDomain: "credot-task.firebaseapp.com",
  projectId: "credot-task",
  storageBucket: "credot-task.appspot.com",
  messagingSenderId: "412806121837",
  appId: "1:412806121837:web:3928372578e88699d6f264",
};

initializeApp(firebaseConfig);
const storage = getStorage();

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  imageUrl: Yup.mixed().required("Image is required"),
});

const AdminProduct = ({ addProduct }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedProducts, setAddedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 6;

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      imageUrl: null,
      description: "",
      category: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const imageFile = formik.values.imageUrl;
        const imageFileName = `${Date.now()}_${imageFile.name}`;
        const imageRef = ref(storage, `images/${imageFileName}`);
        await uploadBytes(imageRef, imageFile);
        const imageUrl = await getDownloadURL(imageRef);

        const formData = { ...values, imageUrl };

        console.log(formData);

        const response = await axios.post(
          // "http://localhost:3030/admin/add-product",
          "https://credot.onrender.com/admin/add-product",
          formData
        );

          console.log(response,'ressssss');

        if (response.status === 201) {
          console.log("Product added successfully:", response.data.product);
          toast.success("Product added successfully");
          addProduct(response.data.product);
          closeModal();
        } else {
          console.error("Failed to add product:", response.data.error);
          toast.error(`Failed to add product: ${response.data.error}`);
        }
      } catch (error) {
        toast.error("Error adding product");
        console.error("Error adding product:", error);
        formik.resetForm();
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:3030"
          "https://credot.onrender.com"
          );
        const sortedProducts = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setAddedProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products");
      }
    };

    fetchProducts();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
    formik.resetForm();
  };

  const closeModal = () => {
    setModalIsOpen(false);
    formik.resetForm();
  };

  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = addedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageCount = Math.ceil(addedProducts.length / productsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-semibold mb-4">Add Product</h2>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={openModal}
      >
        Add Product
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Product Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            right: "0",
            bottom: "0",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            overflowY: "auto",
          },
        }}
      >
        <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4" noValidate>
          <label className="block">
            <span className="text-gray-700">Name:</span>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-input mt-1 block w-full ${
                formik.errors.name && formik.touched.name
                  ? "border-red-500"
                  : ""
              }`}
              required
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500">{formik.errors.name}</p>
            )}
          </label>

          <label className="block">
            <span className="text-gray-700">Price:</span>
            <input
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-input mt-1 block w-full ${
                formik.errors.price && formik.touched.price
                  ? "border-red-500"
                  : ""
              }`}
              required
            />
            {formik.errors.price && formik.touched.price && (
              <p className="text-red-500">{formik.errors.price}</p>
            )}
          </label>

          <label className="block">
            <span className="text-gray-700">Description:</span>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-textarea mt-1 block w-full ${
                formik.errors.description && formik.touched.description
                  ? "border-red-500"
                  : ""
              }`}
              required
            />
            {formik.errors.description && formik.touched.description && (
              <p className="text-red-500">{formik.errors.description}</p>
            )}
          </label>

          <label className="block">
            <span className="text-gray-700">Category:</span>
            <select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-select mt-1 block w-full ${
                formik.errors.category && formik.touched.category
                  ? "border-red-500"
                  : ""
              }`}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="shoe">Shoe</option>
              <option value="watch">Watch</option>
              <option value="shirt">Shirt</option>
            </select>
            {formik.errors.category && formik.touched.category && (
              <p className="text-red-500">{formik.errors.category}</p>
            )}
          </label>

          <label className="block">
            <span className="text-gray-700">Image:</span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                formik.setFieldValue("imageUrl", event.currentTarget.files[0]);
              }}
              onBlur={formik.handleBlur}
              className={`form-input mt-1 block w-full ${
                formik.errors.imageUrl && formik.touched.imageUrl
                  ? "border-red-500"
                  : ""
              }`}
              required
            />
            {formik.errors.imageUrl && formik.touched.imageUrl && (
              <p className="text-red-500">{formik.errors.imageUrl}</p>
            )}
          </label>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
            <button
              onClick={closeModal}
              className="ml-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <div className="flex flex-wrap justify-center  mx-auto mt-8 gap-5">
        {currentProducts.map((product, index) => (
          <div
            key={index}
            className="m-4 flex flex-col max-w-xs w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
          >
            <div className="flex h-60 w-full overflow-hidden">
              <img
                className="object-contain mx-auto my-auto"
                src={product.imageUrl || "https://via.placeholder.com/300"}
                alt="product image"
              />
            </div>
            <div className="flex flex-col mt-4 px-5 pb-5 justify-center items-center">
              <h5 className="text-xl tracking-tight text-slate-900">
                {product.name}
              </h5>
              <div className=" h-20 overflow-hidden">
                <p>{product.description}</p>
              </div>
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-3xl font-bold text-slate-900">
                    ${product.price}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
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
        containerClassName={"pagination flex justify-center mt-8"}
        subContainerClassName={"pages pagination"}
        activeClassName="bg-gray-500 text-white"
        pageClassName={
          "block border border-solid border-gray-200 hover:bg-gray-300 w-5 h-10 flex items-center justify-center rounded-md mx-2 cursor-pointer"
        }
        breakClassName={"mx-2"}
        disabledClassName={"text-gray-500 cursor-not-allowed"}
      />
      <div className="text-center mt-4 text-black">
        Page {currentPage + 1} of {pageCount}
      </div>
    </div>
  );
};

export default AdminProduct;

"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProducts, fetchCategories, sortProducts, setPage, setSortBy, setCategory } from "@/store/slices/productSlice";
import Pagination from "./components/pagination";
import { addToCart } from "@/store/slices/cartSlice";
import CartModal from "./components/cart";

export default function Home() {
  const { filteredProducts, status, categories } = useSelector((state: RootState) => state.products);
  const [isCartOpen, setIsCartOpen] = useState(false);
const cartItemCount = useSelector((state: RootState) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0)
);
  const { currentPage, itemsPerPage } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();
  const PagesPer = 15;
  const [selectedCategories, setSelectedCategories] = useState("");

  const handleCategoryClick = (category: any) => {
    const newCategory = selectedCategories === category ? "" : category;
    dispatch(setPage(1)); 
    setSelectedCategories(newCategory);
    dispatch(setCategory(newCategory));
    //  console.log(filteredProducts, 'filter')
  };

  const resetFilters = () => {
    setSelectedCategories("");
    dispatch(setCategory(""));
  };

  // const items = ["Fast Delivery", "New On Swiggy", "Rating 4.0+", "Non Veg", "Veg", "Offers", "Rs.300 - Rs.600", "Less Than Rs.300"];

  interface Category {
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
  }

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    dispatch(setPage(1)); 
    dispatch(setSortBy(e.target.value));
    console.log(sortProducts());
  };

  console.log("filteredProducts", filteredProducts);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // const [categories, setCategories] = useState<Category[]>([]);

  // useEffect(() => {
  //   setLoading(true);
  //   getData().catch((error) => console.error('Error fetching data:', error));

  //   getCategories();
  // }, []);

  // useEffect(() => {
  //   console.log(loading);
  // }, [loading]);
  // useEffect(() => {
  //   console.log(sort);
  // }, [sort]);

  const [filterOpen, setFilterOpen] = useState(false);

  // const getData = async () => {
  //   await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setFilter(data.meals);
  //       setLoading(false);
  //     });
  // };

  // const getCategories = async () => {
  //   await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCategories(data.categories);
  //       console.log(data.categories);
  //     });
  // };

  // const handleFilter = (filter) => {
  //   dispatch(selectCountry(filter));
  //   setFilterOpen(false);
  // };
  return (
    <div className="App h-[100vh]">
      <header className="header shadow-md	">
        <div className="header_image w-6/12">
          <img src="https://startuparticle.com/wp-content/uploads/2019/11/swiggy-2.jpg" />
        </div>
        <div className="header_searchbar relative">
          {/* <input placeholder='Search Items ' /> */}

          <button onClick={() => setIsCartOpen(true)} className="flex items-center text-gray-700 hover:text-gray-900">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItemCount > 0 && <span className="absolute top-1 left-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span>}
          </button>
        </div>
      </header>

      <section style={{ height: "max-content", minHeight: "100vh" }}>
        <div className="filter-section  flex items-center mt-4 ms-6 me-4">
          <button type="button" style={{ position: "sticky" }} onClick={() => setFilterOpen(!filterOpen)} className="flex py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            filters
            <div className="ms-2">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10.83 5a3.001 3.001 0 0 0-5.66 0H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17ZM4 11h9.17a3.001 3.001 0 0 1 5.66 0H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2Zm1.17 6H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17a3.001 3.001 0 0 0-5.66 0Z" />
              </svg>
            </div>
            {/* {filterOpen && (
              <div className="filter-dropdown shadow-lg">
                {filter?.map((item, index) => (
                  <div
                    className="filter-item"
                    style={{
                      color:
                        selectedCountry === item.strArea ? "blue" : "black",
                    }}
                    onClick={() => handleFilter(item.strArea)}
                  >
                    {item.strArea}
                  </div>
                ))}
              </div>
            )} */}
          </button>
          <div className="relative inline-block text-left mb-4">
  <select
    onChange={handleSortChange}
    className="appearance-none rounded-full border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500"
  >
    <option value="priceLowHigh" className="h-[20px]">Price: Low → High</option>
    <option value="priceHighLow">Price: High → Low</option>
    <option value="titleAZ">Title: A–Z</option>
    <option value="titleZA">Title: Z–A</option>
  </select>
  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>


          <div></div>
        </div>

        <div className={`transition-[height] duration-1000 delay-550 ease-in-out ${filterOpen ? "max-h-120 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
          <div className={`transition-[height] duration-1000 delay-550 ease-in-out ${filterOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden bg-white shadow-md rounded-lg`}>
            <div className="flex justify-between items-center px-4 pt-4">
              <h5 className="text-xl font-bold text-gray-800">Select From the categories</h5>
              <button onClick={resetFilters} className="text-sm text-blue-600 border border-blue-600 px-3 py-1 rounded-md hover:bg-blue-600 hover:text-white transition-all">
                Reset
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 p-4">
              {categories.map((item: any, index: any) => (
                <div
                  key={index}
                  className={`filter-item cursor-pointer p-3 border rounded-lg text-center text-sm font-medium transition-all ${
                    selectedCategories === item // Changed to exact comparison
                      ? "bg-[#daa06d] text-white"
                      : "bg-gray-100 hover:bg-blue-100"
                  }`}
                  onClick={() => handleCategoryClick(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-wide overflow-x-scroll m-3 categories">
          {/* {open ? (
            <div className="sticky top-0 left-0 bg-white z-10">
              <h5 className="m-4 text-xl font-bold">
                Categories That You Can Select From
              </h5>
            </div>
          ) : (
            ""
          )} */}

          <div className="sticky top-0 left-0 bg-white">
            <h5 className="m-4 text-xl font-bold">Products That You Can Select From</h5>
          </div>
        </div>

        <div>
          <div className=" mt-2 mb-2 ms-4 me-4 grid lg:grid-cols-4 lg:gap-4 md:grid-cols-3 md:gap-4  sm:grid-cols-2 sm:gap-4 justify-center ">
            {currentItems.map((item, index) => (
              <div key={index} className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl  m-2 card2 cursor-pointer">
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-[10rem]">
                  <img src={item.image} alt="profile-picture" />
                </div>
                <div className="p-6 text-center">
                  <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">{/* {item.strCategory} */}</h4>
                </div>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title.substring(0, 25)}...</h5>
                  </a>
                  <div>
                    <p>{item.description.substring(0, 35)}...</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="flex justify-center items-center mt-4 p-2 rounded-lg bg-gray-100 w-[100px]"> $ {item.price}</p>
                    <p className="flex justify-center items-center mt-4 p-2 rounded-lg bg-gray-100 w-[150px]">{item.category}</p>
                  </div>
                  <div className="bg-[#DAA06D] p-3 rounded-[10px] flex justify-center items-center mt-4 text-white">
                    <button
                      onClick={() => {
                        dispatch(
                          addToCart({
                            id: item.id,
                            title: item.title,
                            price: item.price,
                            quantity: 1,
                          })
                        );
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
              // <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 card3 cursor-pointer'>
              //   <img
              //     // onClick={() => modalOpener(item.strMeal)}
              //     className='rounded-t-lg lg:h-[350px] md:h-[10rem] sm:h-[10rem] w-full object-contain p-5'
              //     src={item.image}
              //     alt=''
              //   />
              //   <div className='p-5'>
              //     <a href='#'>
              //       <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              //         {item.title}
              //       </h5>
              //     </a>
              //     <div>
              //       <p>{item.description}</p>
              //     </div>
              //     <div className="flex justify-between">
              //       <p  className="flex justify-center items-center mt-4 p-2 rounded-lg bg-gray-100 w-[100px]"> $ {item.price}</p>
              //       <p  className="flex justify-center items-center mt-4 p-2 rounded-lg bg-gray-100 w-[150px]">{item.category}</p>

              //     </div>
              //     <div className="bg-[#DAA06D] p-3 rounded-[10px] flex justify-center items-center mt-4 text-white">
              //       <button  >Add to cart</button>
              //     </div>
              //   </div>
              // </div>
            ))}
          </div>
        </div>

        <div></div>
      </section>

      <Pagination totalItems={filteredProducts.length} currentPage={currentPage} itemsPerPage={PagesPer} onPageChange={(page: number) => dispatch(setPage(page))} />

      <footer className="shadow dark:bg-gray-800 mt-4" style={{ marginTop: "50px" }}>
        <footer className="bg-white rounded-lg m-4 dark:bg-gray-200 shadow-2xl">
          <div className="w-100 flex justify-center">
            <img className="h-[50px]" src="https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/2560px-Swiggy_logo.svg.png" />
          </div>
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024{" "}
              <a href="#" className="hover:underline">
                Swiggy
              </a>
              . All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </footer>

      <div>
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </div>
  );
}

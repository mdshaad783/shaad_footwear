import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetFilteredProductsQuery } from '../redux/api/productApiSlice'
import { setCategories, setChecked, setProducts } from '../redux/features/shop/shopSlice'
import Loader from '../components/Loader'
import {useFetchCategoriesQuery} from '../redux/api/categoryApiSlice'
import ProductCard from './Products/ProductCard'


const shop = () => {
    const dispatch = useDispatch(0)
     const {categories, products, checked, radio} = useSelector((state)=> state.shop)

     const categoriesQuery = useFetchCategoriesQuery()
     const [priceFilter, setPriceFilter] = useState("");
     const filteredProductsQuery = useGetFilteredProductsQuery({checked,radio})

     useEffect(()=>{
        if (!categoriesQuery.isLoading){
            dispatch(setCategories(categoriesQuery.data))
        }
     },[categoriesQuery.data, dispatch])


     useEffect(()=>{
        if(!checked.length || !radio.length){
            if(!filteredProductsQuery.isLoading){
                // Filtering products based on category & price
                const filteredProducts = filteredProductsQuery.data.filter((product)=>{
                    // Check if the product price includes the entered price value 
                    return (
                        product.price.toString().includes(priceFilter) || product.price <= parseInt(priceFilter, 10)
                    )
                }) 
                dispatch(setProducts(filteredProducts));
            }
     }}, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

     const handleBrandClick = (brand)=>{
      const productsByBrand = filteredProductsQuery.data?.filter(
        (product) => product.brand === brand
      )
      dispatch(setProducts(productsByBrand));
     }
      const handleCheck = (value, id)=>{
      const updatedChecked = value? [...checked, id] : checked.filter((c)=> c!=id)
      dispatch(setChecked(updatedChecked))
     }
      
    //  Add all brand option

    const uniqueBrands = [
      ...Array.from(
        new Set(
          filteredProductsQuery.data?.map((product)=>product.brand).filter((brand)=> brand != undefined)
        )
      )
    ]

    const handlePriceChange = e =>{
      // Update price filter state when the user types in the input field
      setPriceFilter(e.target.value)
    }
  return (
    <>
      <div className="container mx-auto pl-[5rem]">
        <div className="flex md:flex-row">
          <div className="p-3 bg-white border border-black mt-2 mb-2 w-[80vw] h-[94vh] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-indigo-100">
            <h2 className="h4 text-center py-2 bg-white border border-black rounded-full mb-2">Filter by Categories</h2>
            <div className="p-5 w-[15rem]">
              {categories?.map((c)=>(
                <div key={c._id} className="mb-2">
                <div className="flex items-center mr-4">
                  <input type="checkbox" id='red-checkbox'
                    onChange={(e)=> handleCheck(e.target.checked, c._id)}
                    className='w-4 h-4 accent-blue-500 text-blue-500 bg-gray-100 border-gray-300 rounded'
                  />
                  <label htmlFor="pink-checkbox" className='ml-2 text-sm font-medium text-gray-700'>{c.name}
                  </label>
                </div>
                </div>
              ))}
            </div>
              <h2 className="h4 text-center py-2 bg-white border border-gray-300 rounded-full mb-2">Filter by Brands</h2>
              <div className="p-5">
              {uniqueBrands?.map((brand) => (
                <>
                  <div key={brand} className="flex items-enter mr-4 mb-5">
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="w-4 h-4 text-blue-500 bg-blue-100 border-blue-300 accent-blue-500"
                    />

                    <label
                      htmlFor="pink-radio"
                      className="ml-2 text-sm font-medium text-gray-700"
                    >
                      {brand}
                    </label>
                  </div>
                </>
              ))}
            </div>
            <h2 className="h4 text-center py-2 rounded-full mb-2 border border-gray-300">Filter by Price</h2>
            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 placeholder-gray-400 border border-black outline-none rounded-lg focus:border-blue-500 focus:outline-none focus:ring-0"
              />
            </div>
            <div className="p-5 pt-0">
              <button
                className="ml-10 border my-4 py-2 px-10 bg-blue-500 border-none rounded-lg hover:bg-blue-600 text-white"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>


          <div className="p-3">
            <h2 className="h4 ml-2 mb-2">{products?.length} Products</h2>
            <div className="flex flex-wrap h-[88vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-indigo-100">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div className="p-3" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default shop
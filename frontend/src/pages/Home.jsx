import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetProductsQuery } from '../redux/api/productApiSlice'
import Loader from '../components/Loader'
import Header from '../components/Header'
import Message from '../components/Message'
import Product from './Products/Product'
import Footer from '../components/Footer'


const Home = () => {
    const {keyword} = useParams();
    const {data, isLoading, isError, error} = useGetProductsQuery({keyword})
  return (
    <>
        {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.data?.message || error?.message}
        </Message>
      ) :(
          <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
              Special Products
            </h1>
              <Link
              to="/shop"
              className="bg-blue-500 text-white font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
            >
              Shop
            </Link>
              </div>
            <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-10 mt-[2rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
              </div>
            </div>
          </>
        )}
        <Footer/>
    </>
  )
}

export default Home
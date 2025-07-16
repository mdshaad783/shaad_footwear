import React from 'react'
import { Link } from 'react-router'
import HeartIcon from './HeartIcon'

const Product = ({product}) => {
  return (
    <div className="w-full ml-[2rem] p-3 relative">
        <div className="relative ">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded" />
            <HeartIcon product={product}/>
        </div>
        <div className="p-4">
            <Link to={`/product/${product._id}`}>
                <h2 className="flex justify-between items-center">
                    <div className="text-lg">
                        {product.name}
                    </div>
                    <span className="bg-blue-500 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">&#8377; {product.price}.00</span>
                </h2>
            </Link> 
        </div>
    </div>
  )
}

export default Product
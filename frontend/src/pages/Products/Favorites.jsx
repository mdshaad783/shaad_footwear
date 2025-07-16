import React from 'react'
import { useSelector } from 'react-redux'
import {selectFavoriteProduct} from '../../redux/features/favorites/favoritesSlice'
import Product from './Product'


const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct)
  // console.log(favorites)

  return (
    <div className='px-10'>
      <h1 className="text-lg font-bold mt-[3rem] ml-[3rem]">
        Favourite Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4">
        {favorites.map((product)=>(
          <Product key={product._id} product={product}/>
        ))}
      </div>
    </div>
  )
}

export default Favorites
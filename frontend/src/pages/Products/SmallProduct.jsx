import { Link } from "react-router";
import HeartIcon from "./HeartIcon";


const SmallProduct = ({product}) => {
  return (
    <div className="w-[15rem] ml-[6rem] pt-3">
        <div className="relative">
            <img src={product.image} alt={product.name} className="object-cover h-[30vh] w-[35vh] rounded"/>
            <HeartIcon product={product}/>
            <div className="px-1 py-3">
                <Link to={`/product/${product._id}`}>
                    <h2 className="flex justify-between items-center">
                        <div>{product.name}</div>
                        <span className="bg-blue-500 text-white text-xs font-medium mr-2 px-2 py-0.5 rounded-full">&#8377; {product.price}.00</span>
                    </h2>
                </Link>
            </div>
        </div>

    </div>
  )
}

export default SmallProduct
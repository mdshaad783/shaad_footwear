import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
  useGetProductByIdQuery,
  useGetNewProductsQuery,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaClock, FaShoppingCart, FaStar, FaStore, FaBox } from "react-icons/fa";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";
// import SizeChart from "../../components/SizeChart.jsx";
// import { useSelectedSize } from '../../redux/features/size/SelectedSizeContext.jsx';
// import { useParams } from "react-router-dom";


const ProductDetails = () => {
  
          // Size

  const { id } = useParams();
  const { data: productForSize} = useGetProductByIdQuery(id);
  const [selectedSize, setSelectedSize] = useState('');

  const rawSizes = productForSize?.sizes || [];
  const sizes = Array.isArray(rawSizes) && typeof rawSizes[0] === 'string'
    ? rawSizes[0].split(',').map((s) => s.trim())
    : [];
    // console.log(sizes)

    // sizeend

  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  // console.log("printing using query",product)
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

    const submitHandler = async (e)=>{
      e.preventDefault()
      try {
        await createReview({
          productId, rating,comment
        }).unwrap()
        refetch()
        toast.success('Review Created Successfully....')
      } catch (error) {
        toast.error(error?.data ||error.message)
        
      }
    }

    const addToCartHandler = ()=>{
      dispatch(addToCart({...product, qty,selectedSize}))
      // console.log({...product})
      // console.log(selectedSize)
      navigate('/cart')
    }
  return (
    <>
      <div className="mx-auto px-1 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-gray-900 font-semibold underline inline-block ml-[6rem] mt-6"
        >
          Go Back
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row items-start gap-10 mt-10 px-8 lg:px-32">
            <div className="relative w-full h-auto lg:w-1/2 object-cover">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[70vh] object-contain bg-white border border-gray-300 rounded"
              />
              <HeartIcon product={product} />
            </div>
            {/* Product Details */}
            <div className="text-gray-900 pb-20 border-t-0 bg-white w-full lg:w-1/2">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-700">{product.name}</h2>
              <p className="my-4 text-gray-400">
                {product.description}
              </p>
              <p className="text-3xl sm:text-4xl font-extrabold text-gray-700 mb-6">
                &#8377; {product.price.toFixed(2)}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
                <div className="one">
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2 text-gray-900" /> Brand:{" "}
                    {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaClock className="mr-2 text-gray-900" /> Added:{" "}
                    {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-gray-900" /> Reviews:{" "}
                    {product.numReviews}
                  </h1>
                </div>
                <div className="two">
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-gray-900" /> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaShoppingCart className="mr-2 text-gray-900" /> Quantity:{" "}{product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaBox className="mr-2 text-gray-900" /> In Stock:{" "} {product.countInStock}
                  </h1>
                </div>
              </div>
              <div className="flex justify-between flex-wrap">
                <Ratings value={product.rating} text={`${product.numReviews} reviews`}/>
                {product.countInStock > 0 &&(
                  <div>
                    <select value={qty} onChange={e => setQty(e.target.value)} className="p-2 w-[6rem] rounded-lg mt-2 bg-transparent focus:outline-none border border-gray-700">
                      {[...Array(product.countInStock).keys()].map((x)=>(
                        <option key={x+1} value={x+1} className="bg-gray-200 border border-gray-300">
                          {x+1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="btn-container flex flex-row">
                <button
                onClick={addToCartHandler}
                disabled={product.countInStock==0} className="bg-blue-500 h-[2.7rem] hover:bg-blue-600 text-white py-2 px-4 rounded-lg md:mt-4 transition-colors duration-200 mr-[13.5rem]">Add to cart</button>

              {/* <SizeChart/> */}

<div>
      <h2 className="text-lg font-semibold mb-3">Select Size</h2>

      <div className="flex flex-row gap-2">
        {sizes.map((size, index) => (
        <label key={index} className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="size"
            value={size}
            checked={selectedSize === size}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="accent-blue-600"
          />
          <span className="text-gray-800 uppercase">{size}</span>
        </label>
      ))}
      </div>

      {selectedSize && (
        <p className="mt-2 text-blue-600">
          Selected: <strong>{selectedSize}</strong>
        </p>
      )}
    </div>



              </div>
              
            </div>
          </div>
          <div className="mt-20 ml-[14rem] px-4 lg:px-0">
              <ProductTabs loadingProductReview={loadingProductReview} userInfo={userInfo} 
              submitHandler={submitHandler}
              rating={rating} setRating={setRating} comment={comment} setComment={setComment} product={product}/>
            </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;

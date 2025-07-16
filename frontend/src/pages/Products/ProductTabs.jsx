import React, { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import SmallProduct from "./SmallProduct";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <section>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab == 1 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          Write Your Review
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab == 2 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </div>
        <div
          className={`flex-1 p-4 w-[12rem] cursor-pointer text-lg ${
            activeTab == 3 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </div>
      </section>
      {/* Second Part */}
      <section>
        {activeTab == 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-2">
                  <label htmlFor="rating" className="block text-xl mb-2">
                    Rating
                  </label>
                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg xl:w-[40rem]"
                  >
                    <option value="">Select</option>
                    <option value="1">Poor</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>
                <div className="my-2">
                  <label htmlFor="comment" className="block text-xl mb-2">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg xl:w-[40rem] text-black"
                    placeholder="Your comment here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2 transition-colors duration-200"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p>
                Please{" "}
                <Link to="/login" className="underline">
                  Sign In
                </Link>{" "}
                to write a review
              </p>
            )}
          </div>
        )}
      </section>
      <section>
        {activeTab == 2 && (
          <>
            <div>{product.reviews.length == 0 && <p className="mt-5 font-extrabold text-3xl">No Reviews</p>}</div>
            <div>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-100 border border-gray-300 p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5"
                >
                  <div className="flex justify-between">
                    <strong className="text-gray-700 my-4">{review.name}</strong>
                    <p className="text-gray-700 my-4">
                      {review.createdAt.substring(0, 10)}
                    </p>
                    <p className="my-4">{review.comment}</p>
                    <Ratings value={review.rating} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <section>
        {activeTab === 3 && (
          <section className="ml-[2rem] flex flex-wrap">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product}/>
                </div>
              ))
            )}
          </section>
          )}
      </section>
    </div>
  );
};

export default ProductTabs;

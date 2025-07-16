import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router'
import { toast } from 'react-toastify'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useDeliverOrderMutation, useGetOrderDetailsQuery, useGetPaypalClientIdQuery, usePayOrderMutation } from '../../redux/api/orderApiSlice'

const Order = () => {

    const {id:orderId} = useParams()
    const {data:order, refetch, isLoading, error} = useGetOrderDetailsQuery(orderId)

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const [deliverOrder, {isLoading:loadingDeliver}] = useDeliverOrderMutation()
    const { userInfo } = useSelector((state) => state.auth)

    const [{isPending}, paypalDispatch] = usePayPalScriptReducer()
5
    const {data:paypal, isLoading:loadingPayPal, error:errorPayPal} = useGetPaypalClientIdQuery()

     useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadingPaPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPaPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);


    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                await payOrder({ orderId, details });
                refetch();
            toast.success("Order is paid");
            } catch (error) {
            toast.error(error?.data?.message || error.message);
            }
        });
    }


    function createOrder(data, actions) {
    return actions.order.create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      }).then((orderID) => {
        return orderID;
      });
  }
  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };



  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messsage variant="danger">{error.data.message}</Messsage>
  ) : (
    <div className="container flex flex-col ml-[7rem] md:flex-row w-[90vw]">
        <div className="md:w-[60vw] pr-4">
            <div className="border border-gray-300 mt-5 pb-4 mb-5">
                {order.orderItems.length === 0 ? (
            <Messsage>Order is empty</Messsage>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-[100%]">
                <thead className="border-b-2">
                  <tr>
                    <th className="px-2 w-[5rem]">Image</th>
                    <th className="p-2">Product</th>
                    <th className="p-2">Size</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2">Unit Price</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>

                      <td>
                        <Link to={`/product/${item.product}`} className='ml-[10rem]'>{item.name}</Link>
                      </td>
                      
                      <td className="p-2 text-center">{item.selectedSize}</td>
                      <td className="p-2 text-center">{item.qty}</td>
                      <td className="p-2 text-center">{item.price}</td>
                      <td className="p-2 text-center">
                        &#8377; {(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
            </div>
      </div>

      <div className="md:w-[25vw] ml-[2rem]">
        <div className="mt-5 border border-gray-300 p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Shipping</h2>
          <p className="mb-4 mt-4">
            <strong className="text-blue-500">Order:</strong> {order._id}
          </p>

          <p className="mb-4">
            <strong className="text-blue-500">Name:</strong>{" "}
            {order.user.username}
          </p>

          <p className="mb-4">
            <strong className="text-blue-500">Email:</strong> {order.user.email}
          </p>

          <p className="mb-4">
            <strong className="text-blue-500">Address:</strong>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>

          <p className="mb-4">
            <strong className="text-blue-500">Method:</strong>{" "}
            {order.paymentMethod}
          </p>

          {order.isPaid ? (
            <Message variant="success">Paid on {order.paidAt}</Message>
          ) : (
            <Message variant="danger">Not paid</Message>
          )}
        </div>

        <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Items</span>
          <span>&#8377; {order.itemsPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>&#8377; {order.shippingPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>&#8377; {order.taxPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total</span>
          <span>&#8377; {order.totalPrice}</span>
        </div>

        {!order.isPaid && (
          <div>
            {loadingPay && <Loader />}{" "}
            {isPending ? (
              <Loader />
            ) : (
              <div>
                <div>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </div>
              </div>
            )}
          </div>
        )}

        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <div>
            <button
              type="button"
              className="bg-blue-500 text-white w-full py-2"
              onClick={deliverHandler}
            >
              Mark As Delivered
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
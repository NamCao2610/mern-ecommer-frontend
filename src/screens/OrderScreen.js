import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getOrderDetails } from '../actions/orderActions';
import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';

function OrderScreen(props) {

    const dispatch = useDispatch();
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector(state => state.orderDetails);

    const { loading, error, order } = orderDetails

    console.log(order);

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        }

        if (!order?._id) {
            dispatch(getOrderDetails(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true)
                }
            }
        }
    }, [dispatch, orderId, order, sdkReady])

    const successPaymentHandler = () => {

    }

    return (
        <div>

            {loading ? (<LoadingBox />) : error ? (<MessageBox>{error}</MessageBox>) : (
                <div>
                    <h1>Order {order._id}</h1>
                    <div className="row top">
                        <div className="col-2">
                            <ul>
                                <li>
                                    <div className="card card-body">
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name: </strong> {order.shippingAddress.fullName} <br />
                                            <strong>Address: </strong> {order.shippingAddress.address},
                                                {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                                                {order.shippingAddress.country}
                                        </p>
                                        {order.isDeliverd ? <MessageBox variant="success">Deliverd at {order.deliveredAt}</MessageBox> : <MessageBox variant="danger">Chua giao hang</MessageBox>}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Method: </strong> {order.paymentMethod} <br />
                                        </p>
                                        {order.isPaid ? <MessageBox variant="success">Paid at {order.paidAt}</MessageBox> : <MessageBox variant="danger">Chua thanh toan</MessageBox>}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Order Items</h2>
                                        <p>
                                            <ul>
                                                {order.orderItems.map((item) => (
                                                    <li key={item._id}>
                                                        <div className="row">
                                                            <div>
                                                                <img src={item.image} alt={item.name} className='small' />
                                                            </div>
                                                            <div className="min-30">
                                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                            </div>

                                                            <div>{item.qty} x ${item.price} = ${item.qty * item.price}</div>

                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <h2>Order Summary</h2>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Items</div>
                                            <div>${order.itemsPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Shipping Price</div>
                                            <div>${order.shippingPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Tax</div>
                                            <div>${order.taxPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div><strong>Order total</strong></div>
                                            <div> <strong>${order.totalPrice.toFixed(2)}</strong></div>
                                        </div>
                                    </li>
                                    {
                                        !order.isPaid && (
                                            <li>
                                                { !sdkReady ? (<LoadingBox />) : (<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>)}
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default OrderScreen

import React, { useEffect, useState } from 'react'
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function ProductScreen({ match, history }) {

    const dispatch = useDispatch()
    const productDetails = useSelector((state) => state.productDetails);

    const { product, loading, error } = productDetails;

    const productId = match.params.id;
    const [qty, setQty] = useState(1);

    useEffect(() => {
        dispatch(detailsProduct(productId))
    }, [dispatch, productId])

    const addToCartHandler = (e) => {
        history.push(`/cart/${productId}?qty=${qty}`)
    }

    return (
        <div>
            <Link to="/">Back to results</Link>
            { loading ? <LoadingBox /> : error ? <MessageBox>{error}</MessageBox> : (
                <div className="row top">
                    <div className="col-2">
                        <img className="large" src={product.image} alt={product.name} />
                    </div>
                    <div className="col-1">
                        <ul>
                            <li>
                                <h1>{product.name}</h1>
                            </li>
                            <li>
                                <Rating rating={product.rating} numReviews={product.numReviews} />
                            </li>
                            <li>Price: ${product.price}</li>
                            <li>Description:
                             <p>{product.description}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li>
                                    <div className="row">
                                        <div>Price</div>
                                        <div className="price">$ {product.price}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Status</div>
                                        <div className="">
                                            {product.countInStock > 0 ? (<span className="success">In Stock</span>) : (<span className="error">Unavailabled</span>)}
                                        </div>
                                    </div>
                                </li>
                                {
                                    product.countInStock > 0 && (
                                        <>
                                            <li>
                                                <div className="row">
                                                    <div>Qty</div>
                                                    <div>
                                                        <select value={qty} onChange={e => setQty(e.target.value)}>
                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                                            </li>
                                        </>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductScreen

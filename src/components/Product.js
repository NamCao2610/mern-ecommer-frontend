import React from 'react'
import Rating from './Rating'

function Product({ product }) {
    return (
        <div key={product._id} className="card">
            <a href={`/product/${product._id}`}>
                <img className="img medium" src={product.image} alt="product" />
            </a>

            <div className="card-body">
                <a href={`/product/${product._id}`}>
                    <h2>{product.name}</h2>
                </a>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <div className="price">
                    <span>${product.price}</span>
                </div>
            </div>
        </div>
    )
}

export default Product

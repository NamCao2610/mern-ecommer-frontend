import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';

function App() {

  const cart = useSelector(state => state.cart);

  return (
    <BrowserRouter>
      <div className="App">
        <div className="grid-container">
          <header className="row">
            <div>
              <Link className="brand" to="/">Amazona</Link>
            </div>
            <div>
              <Link to="/cart">Cart {cart.cartItems.length > 0 && (
                <span className="badge">{cart.cartItems.length}</span>
              )}</Link>
              <Link to="/signin">Sign In</Link>
            </div>
          </header>
          <main>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/" component={HomeScreen} exact></Route>
          </main>
          <footer className="row center">
            All right reserve
        </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

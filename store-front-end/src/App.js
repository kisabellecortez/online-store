import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.js'
import './App.css';
import CartProvider from './context/CartContext.js'

import Home from './pages/Home'
import ShopAll from './pages/shop/Shop_All'
import ShopRings from './pages/shop/Shop_Rings'
import ShopCrystals from './pages/shop/Shop_Crystals'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ShoppingCart from './pages/ShoppingCart'

import Checkout from './stripe/checkout-page.js'

function App() {

  return(
    <div>
      <AuthContextProvider>
        <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/shop/all" element={<ShopAll/>}/>
             <Route path="/shop/crystals" element={<ShopCrystals/>}/>
            <Route path="/shop/rings" element={<ShopRings/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/shoppingcart" element={<ShoppingCart/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
          </Routes>
        </BrowserRouter>
        </CartProvider>
      </AuthContextProvider>
    </div>

  )
}

export default App;
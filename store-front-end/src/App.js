import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthContextProvider } from './context/AuthContext.js'
import CartContextProvider from './context/CartContext.js'

import Home from './pages/Home.js'
import SignIn from './pages/SignIn.js'
import SignUp from './pages/SignUp.js'
import Shop from './pages/Shop.js'
import Cart from './pages/Cart.js'

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/sign-in" element={<SignIn/>}/>
              <Route path="/sign-up" element={<SignUp/>}/>
              <Route path="/shop" element={<Shop/>}/>
              <Route path="/cart" element={<Cart/>}/>
            </Routes>
          </BrowserRouter>
        </CartContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;

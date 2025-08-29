import { createContext, useState, useEffect } from 'react'
import { productsArray } from '../data/productData.js'

class CartProduct{
    constructor(id, size){
        this.id = id; 
        this.name = this.getName(id);
        this.size = size; 
        this.quantity = 1;
        this.price = this.getPrice(id);
        this.type = this.getType(id); 
    }

    getName(id){
        const product = productsArray.find(product => product.id === id); // find product with id 

        return product ? product.name : 0; 
    }

    getPrice(id){
        const product = productsArray.find(product => product.id === id); // find product with id 

        return product ? product.price : 0;
    }

    getType(id){
        const product = productsArray.find(product => product.id === id); // find product with id

        return product ? product.properties : 0; // get type of product if product was found
    }
}

export const CartContext = createContext({
    items: [], 
    getProductQuantity: () => {}, 
    addOneToCart: () => {}, 
    removeOneFromCart: () => {}, 
    deleteFromCart: () => {},
    getTotalCost: () => {}
})

export function CartProvider({children}){
    const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem('cart'))) // initialize cart products with local storage value 

    /* save array of cart products in local storage each time they are modified */
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartProducts)) 
    }, [cartProducts])

    function addItemToCart(id, size){
        const initialCartProducts = cartProducts || []; // initialize cart products if null

        // check if product exists 
        for(let i = 0; i < initialCartProducts.length; i++){
            if(initialCartProducts[i].id === id && initialCartProducts[i].size === size){
                const updatedProducts = [...initialCartProducts];
                updatedProducts[i].quantity += 1; 
                setCartProducts(updatedProducts);
                return; 
            }
        }

        setCartProducts([...initialCartProducts, new CartProduct(id, size)]); // add product to cart if it does not exist 
    }

    function addOneToCart(id, size){
       // find product to add 
       for(let i = 0; i < cartProducts.length; i++){
            if(cartProducts[i].id === id && cartProducts[i].size === size){
                cartProducts[i].quantity += 1
                setCartProducts([...cartProducts])
            }
       }
    }

    function removeOneFromCart(id, size) {
        // find product to delete 
        for(let i = 0; i < cartProducts.length; i++){
            if(cartProducts[i].id === id && cartProducts[i].size === size){
                // remove item from cart
                if(cartProducts[i].quantity === 1){
                    deleteFromCart(id, size); 
                }
                // decrement quantity of item 
                else{
                    cartProducts[i].quantity -= 1; 
                    setCartProducts([...cartProducts])
                }
            }
        }
    }

    function deleteFromCart(id, size) {
        const updatedCartProducts = cartProducts.filter(product => !(product.id === id && product.size === size)); 

        setCartProducts(updatedCartProducts)
    }

    function getTotalCost() {
        let total = 0; 

        // loop through each item 
        for(let i = 0; i < cartProducts.length; i++){   
            total += cartProducts[i].quantity * cartProducts[i].price; // find total price of item 
        }

        return total; 
    }

    const contextValue = {
        items: cartProducts,
        addItemToCart,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
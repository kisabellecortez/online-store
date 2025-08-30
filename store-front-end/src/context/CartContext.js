import { createContext, useState, useEffect } from 'react'
import { productsArray } from '../data/productData.js'
import { UserAuth } from '../context/AuthContext.js'
import { db } from '../firebase.js';
import { doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, collection, increment, query, where } from 'firebase/firestore'

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

        return product.type;
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

export function CartContextProvider({children}){
    const { user } = UserAuth(); 
    const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem('cart')) || []) // initialize cart products with local storage value
    
    console.log(user)

    useEffect(() => {
        async function loadCart(){
            if(user?.uid){
                const cartRef = collection(db, "users", user.uid, "cart");
                const cartSnapshot = await getDocs(cartRef); 
                let cartData = cartSnapshot.docs.map(doc => doc.data()); 
                console.log(cartData)
                cartData = cartData.filter(item => item.quantity > 0); 
                setCartProducts(cartData)
            }
            else{
                const localCart = JSON.parse(localStorage.getItem('cart')) || []; 
                setCartProducts(localCart); 
            } 
        }

        loadCart();
    }, [user])

    /* save array of cart products in local storage each time they are modified */
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartProducts)) 
    }, [cartProducts])

    async function addOneToCart(id, size){
        let index = -1;

        // find product to add 
        for(let i = 0; i < cartProducts.length; i++){
            if(cartProducts[i].id === id && cartProducts[i].size === size){
                index = i; 
            }
        }

        if(index >= 0){
            cartProducts[index].quantity += 1
            setCartProducts([...cartProducts])

            if(user?.uid){
                const docId = `${id}_${size}`;
                const cartProductRef = doc(db, "users", user.uid, "cart", docId)

                await updateDoc(cartProductRef, {
                    quantity: increment(1)
                })
            }
        }
        else{
            addItemToCart(id, size); 
        }
    }

    async function addItemToCart(id, size){
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

        const newProduct = new CartProduct(id, size); 

        setCartProducts([...initialCartProducts, new CartProduct(id, size)]); // add product to cart if it does not exist 

        if(user?.uid){
            const docId = `${id}_${size}`;
            const cartProductRef = doc(db, "users", user.uid, "cart", docId);

            await setDoc(cartProductRef, {
                id: newProduct.id, 
                name: newProduct.name, 
                size: newProduct.size, 
                quantity: 1, 
                price: newProduct.price, 
                type: newProduct.type
            })
        }
    }

    async function removeOneFromCart(id, size) {
        let index = -1; 
        const docId = `${id}_${size}`;

        // find product to delete 
        for(let i = 0; i < cartProducts.length; i++){
            if(cartProducts[i].id === id && cartProducts[i].size === size){
                index = i; 
            }
        }

        if(index >= 0){
            // remove item from cart
            if(cartProducts[index].quantity === 1){
                const updatedCart = cartProducts.filter((_, i) => i !== index); 
                setCartProducts(updatedCart);

                if(user?.uid){
                    const docId = `${id}_${size}`; 
                    const cartProductRef = doc(db, "users", user.uid, "cart", docId); 
                    await deleteDoc(cartProductRef);
                }
            }
            // decrement quantity of item 
            else{
                cartProducts[index].quantity -= 1; 
                setCartProducts([...cartProducts])
                
                if(user?.uid){
                    const cartProductRef = doc(db, "users", user.uid, "cart", docId); 

                    await updateDoc(cartProductRef, {
                        quantity: increment(-1)
                    })
                }
            }
        }
    }

    async function removeFromCart(id, size) {
        const filtered = cartProducts.filter(item => !(item.id === id && item.size === size)); 
        setCartProducts(filtered);

        if(user?.uid){
            const docId = `${id}_${size}`; 
            const cartProductRef = doc(db, "users", user.uid, "cart", docId); 
            await deleteDoc(cartProductRef);
        }
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
        removeFromCart,
        getTotalCost
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;
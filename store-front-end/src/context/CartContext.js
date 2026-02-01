import { createContext, useState, useEffect } from 'react';
import { productsArray } from '../data/productData.js';
import { UserAuth } from '../context/AuthContext.js';
import { db } from '../firebase.js';
import { doc, getDocs, setDoc, updateDoc, deleteDoc, collection, increment } from 'firebase/firestore';

class CartProduct {
    constructor(id, size) {
        this.id = id;
        this.name = this.getName(id);
        this.size = size;
        this.quantity = 1;
        this.price = this.getPrice(id);
        this.type = this.getType(id);
    }

    getName(id) {
        const product = productsArray.find(product => product.id === id);
        return product ? product.name : 0;
    }

    getPrice(id) {
        const product = productsArray.find(product => product.id === id);
        return product ? product.price : 0;
    }

    getType(id) {
        const product = productsArray.find(product => product.id === id);
        return product ? product.type : '';
    }
}

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {}
});

export function CartContextProvider({ children }) {
    const { user } = UserAuth();
    const [cartProducts, setCartProducts] = useState(
        JSON.parse(localStorage.getItem('cart')) || []
    );

    console.log(user);

    useEffect(() => {
        async function loadCart() {
            if (user?.uid) {
                const cartRef = collection(db, "users", user.uid, "cart");
                const cartSnapshot = await getDocs(cartRef);
                let cartData = cartSnapshot.docs.map(doc => doc.data());
                console.log(cartData);
                cartData = cartData.filter(item => item.quantity > 0);
                setCartProducts(cartData);
            } else {
                const localCart = JSON.parse(localStorage.getItem('cart')) || [];
                setCartProducts(localCart);
            }
        }

        loadCart();
    }, [user]);

    // Save cart in localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartProducts));
    }, [cartProducts]);

    async function addOneToCart(id, size) {
        let index = cartProducts.findIndex(item => item.id === id && item.size === size);

        if (index >= 0) {
            cartProducts[index].quantity += 1;
            setCartProducts([...cartProducts]);

            if (user?.uid) {
                const docId = `${id}_${size}`;
                const cartProductRef = doc(db, "users", user.uid, "cart", docId);
                await updateDoc(cartProductRef, { quantity: increment(1) });
            }
        } else {
            addItemToCart(id, size);
        }
    }

    async function addItemToCart(id, size) {
        const initialCartProducts = cartProducts || [];

        const existingIndex = initialCartProducts.findIndex(
            item => item.id === id && item.size === size
        );

        if (existingIndex >= 0) {
            const updatedProducts = [...initialCartProducts];
            updatedProducts[existingIndex].quantity += 1;
            setCartProducts(updatedProducts);
            return;
        }

        const newProduct = new CartProduct(id, size);
        setCartProducts([...initialCartProducts, newProduct]);

        if (user?.uid) {
            const docId = `${id}_${size}`;
            const cartProductRef = doc(db, "users", user.uid, "cart", docId);
            await setDoc(cartProductRef, {
                id: newProduct.id,
                name: newProduct.name,
                size: newProduct.size,
                quantity: 1,
                price: newProduct.price,
                type: newProduct.type
            });
        }
    }

    async function removeOneFromCart(id, size) {
        const index = cartProducts.findIndex(item => item.id === id && item.size === size);
        const docId = `${id}_${size}`;

        if (index >= 0) {
            if (cartProducts[index].quantity === 1) {
                const updatedCart = cartProducts.filter((_, i) => i !== index);
                setCartProducts(updatedCart);

                if (user?.uid) {
                    const cartProductRef = doc(db, "users", user.uid, "cart", docId);
                    await deleteDoc(cartProductRef);
                }
            } else {
                cartProducts[index].quantity -= 1;
                setCartProducts([...cartProducts]);

                if (user?.uid) {
                    const cartProductRef = doc(db, "users", user.uid, "cart", docId);
                    await updateDoc(cartProductRef, { quantity: increment(-1) });
                }
            }
        }
    }

    async function removeFromCart(id, size) {
        const filtered = cartProducts.filter(item => !(item.id === id && item.size === size));
        setCartProducts(filtered);

        if (user?.uid) {
            const docId = `${id}_${size}`;
            const cartProductRef = doc(db, "users", user.uid, "cart", docId);
            await deleteDoc(cartProductRef);
        }
    }

    async function clearCart(){
        setCartProducts([])

        localStorage.setItem('cart', JSON.stringify([]))

        if(user?.uid){
            const cartRef = collection(db, "users", user.uid, "cart")
            const cartSnapshot = await getDocs(cartRef)

            const deletePromises = cartSnapshot.docs.map(docSnap => deleteDoc(doc(db, "users", user.uid, "cart", docSnap.id)))
            await Promise.all(deletePromises)
        }
    }

    function getTotalCost() {
        return cartProducts.reduce((total, item) => total + item.quantity * item.price, 0);
    }

    const contextValue = {
        items: cartProducts,
        addItemToCart,
        addOneToCart,
        removeOneFromCart,
        removeFromCart,
        clearCart,
        getTotalCost
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;

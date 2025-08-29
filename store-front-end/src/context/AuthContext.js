import React, { useContext, createContext, useState, useEffect } from 'react'
import { GoogleAuthProvider , createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser, getAuth, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db, imageDb } from '../firebase.js' 
import { doc, getDocs, setDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({}); 

    const googleSignIn =()=> {
        const provider = new GoogleAuthProvider(); 
        signInWithPopup(auth, provider); 
    }

    const signIn =(email, password)=> {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const createUser = async(email, password)=> {
        await createUserWithEmailAndPassword(auth, email, password); 
        await signInWithEmailAndPassword(auth, email, password); 
        const userAuth = getAuth(); 

        onAuthStateChanged(userAuth, async(user) => {
            if(user){
                const uid = user.uid; 
                await setDoc(doc(db, 'users', uid), {

                })

                const querySnapshot = await getDocs(collection(db, "products")); 
                const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));

                const cartCollectionRef = collection(db, "users", uid, "cart"); 

                productsData.forEach((product) => {
                    const cartProductRef = doc(cartCollectionRef, product.id); 

                    setDoc(cartProductRef, {
                        name: product.name, 
                        description: product.description, 
                        price: product.price, 
                        quantity: 0
                    })
                })
            }
        })
    }

    const logOut =()=> {
        return signOut(auth);
    }

    const updateEmail = async(email)=> {
        await updateEmail(user, email); 
    }

    const updatePassword = async(email)=> {
        await sendPasswordResetEmail(auth, email); 
    }

    const deleteUser =()=> {
        deleteUser(user); 
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser); 
            setUser(currentUser); 
        });
        
        return ()=> {
            unsubscribe(); 
        }
    }, [])

    return(
        <AuthContext.Provider value = {{ googleSignIn, signIn, logOut, deleteUser, createUser, user, updatePassword, updateEmail }}>
            { children }
        </AuthContext.Provider>
    )
}

export const UserAuth =()=> {
    return useContext(AuthContext)
}
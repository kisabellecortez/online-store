import React, { useContext, createContext, useState, useEffect } from 'react'; 
import { GoogleAuthProvider , createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser, getAuth, updateProfile, sendPasswordResetEmail, updateEmail } from 'firebase/auth';
import { auth, db, imageDb } from '../firebase.js' 
import { doc, setDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
const AuthContext = createContext()

export const AuthContextProvider = ({ children })=> {
    const [user, setUser] = useState({});

    const googleSignIn =()=> {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const signIn = (email, password) =>  {
        return signInWithEmailAndPassword(auth, email, password)
    }

    /* create user with email and password */
    const createUser = async(email, password)=>{
        await createUserWithEmailAndPassword(auth, email, password);
        await signInWithEmailAndPassword(auth, email, password); 

        const userAuth = getAuth(); 

        // create user database
        onAuthStateChanged(userAuth, async(user) => {
            if(user){
                const uid = user.uid; 
                
                await setDoc(doc(db, 'users', uid), {
                    
                });
            }
        })
    }

    /* Log Out */
    const logOut = async() => {
        await signOut(auth)
        setUser(null)
    }

    /* user management */
    
    /* update email */
    const updEmail = async(email) => {
        await updateEmail(user, email)
    }

    /* update password */
    const updatePass = async(email) => {
        await sendPasswordResetEmail(auth, email)
        alert("A password change email was send to " + email + "!")
    }

    const updateName = async(firstName, lastName) => {
        const userRef = doc(db, "users", user.uid)
        await setDoc(userRef, {
            first_name: firstName, 
            last_name: lastName
        })
    }

    /* delete user's account */
    const delUser = () => {
        deleteUser(user)
    }

    /* product db management */

    /* add product in database */
    const addProduct = async(name, price, description, stock, type, material, stone)=>{
        var id = getId(name); 

        // add document 
        await setDoc(doc(db, "products", id), {
            name: name, 
            price: price, 
            description: description, 
            stock: stock,
            properties: [type, material, stone], 
            image: id
        });
    }

    const getUserFirstName = async(uid) => {
        try{
            const userRef = doc(db, 'users', uid);
            const userSnap = await getDoc(userRef);

            if(userSnap.exists()){
                return userSnap.data().first_name
            }
            else{
                console.log('User does not exist.')
                return null
            }
        }
        catch(error){
            console.log('Error getting user: ', error)
        }
    }

    const getUserLastName = async(uid) => {
        try{
            const userRef = doc(db, 'users', uid);
            const userSnap = await getDoc(userRef);

            if(userSnap.exists()){
                return userSnap.data().last_name
            }
            else{
                console.log('User does not exist.')
                return null
            }
        }
        catch(error){
            console.log('Error getting user: ', error)
        }
    }

    /* edit product in database */
    const editProduct = async(name, price, description, stock)=>{
        var id = getId(name); 
        const docToUpdate = doc(db, "products", id); 

        // update document 
        await updateDoc(docToUpdate, {
            name: name, 
            price: price, 
            description: description, 
            stock: stock
        })
    }

    /* delete product from database */
    const delProduct = async(name)=>{
        var id = getId(name); 

        // delete document 
        await deleteDoc(doc(db, "products", id))
    }

    /* upload product image into database */
    const uploadImage = async(name, file)=>{
        var id = getId(name); 

        const storageRef = await ref(imageDb, 'products/' + id);
        return uploadBytes(storageRef, file); 
    }

    // creates id from name
    function getId(name){
        var id = ""; 
        
        // concatenate ascii codes
        for(let i = 0; i < name.length; i++){
            id += name.charCodeAt(i); 
        }

        return id; 
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          console.log(currentUser);
          setUser(currentUser);
        });
        return () => {
          unsubscribe();
        };
      }, []);

    return(
        <AuthContext.Provider value = {{ updateName, getUserFirstName, getUserLastName, addProduct, editProduct, delProduct, uploadImage, googleSignIn, signIn, logOut, deleteUser, delUser, createUser, user, updatePass, updEmail }}>
            { children }
        </AuthContext.Provider>
    );
};

export const UserAuth =()=> {
    return useContext(AuthContext)
};
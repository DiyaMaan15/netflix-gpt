import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase"
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_IMG_URL } from '../utils/constant';

const LoginUser = () => {

    const dispatch = useDispatch()

    const[isSignInForm , setIsSignInForm] = useState(true)

    const [errorMessage,  setErrorMessage] = useState()

    const name = useRef(null)
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonCLick = () => {
        const message = checkValidData(email.current.value , password.current.value)
        setErrorMessage(message)

        if(message) return;

        if(!isSignInForm){
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
                  }).then(() => {
                    const { uid , email , displayName } = auth.currentUser;
                    dispatch(
                        addUser({uid: uid , 
                                email: email ,
                                 displayName: displayName
                                }))
                  }).catch((error) => {
                    setErrorMessage(error)
                  });
                
            })
                .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+ "-" +errorMessage)
                });
        }
        else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+ "-" +errorMessage)
            });
        }
    }

    const ToggleSignInForm = () =>{
        setIsSignInForm(!isSignInForm)
    }

  return (
    <div>
        <Header />
        <div className='absolute'>
            <img className='h-screen object-cover md:h-auto' src={BG_IMG_URL}
                  alt='img'/>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className='absolute w-full md:w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>

            { !isSignInForm && (
                <input 
                type='text' 
                placeholder='Full Name' 
                className='p-4 my-4 w-full bg-gray-800' 
            />)
            }

            <input 
            ref={email}
                type='text' 
                placeholder='Email Address' 
                className='p-4 my-4 w-full bg-gray-800' 
            />

            <input 
            ref={password}
                type='password'
                placeholder='Password' 
                className='p-4 my-4 w-full bg-gray-800'
            />

            <p className='text-red-600 text-lg font-bold py-2'>{errorMessage}</p>

            <button className='p-4 my-6 w-full bg-red-700 rounded-md' onClick={handleButtonCLick}>
            {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p className='py-4 cursor-pointer' onClick={ToggleSignInForm}>
            {isSignInForm ? "New To Netflix? Sign up Now" : "Already a User? Sign In Now"}
            </p>
        </form>
    </div>
  )
}

export default LoginUser
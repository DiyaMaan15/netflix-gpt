import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { useEffect } from "react";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constant";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user)

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/")
    }).catch((error) => {
      navigate("/error")
    });
  }

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              const { uid , email , displayName } = user;
              dispatch(addUser({
                uid: uid ,
                email: email ,
                displayName: displayName
                }));
                navigate("/browse")
            } 
            else {
            dispatch(removeUser);
            navigate("/")
            }
          });
          return() => unsubscribe();
    } , [])

    const handleGptSearchClick = () => {
      dispatch(toggleGptSearchView())
    }

    const handleLanguage = (e) => {
      dispatch(changeLanguage(e.target.value))
    }

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
        <img className="w-48 mx-auto md:mx-0"
            src={LOGO}
            alt="logo" />

              {user && ( 
                <div className="flex p-2 justify-between">
                  { showGptSearch && <select className="p-2 m-2 bg-black text-white" onChange={handleLanguage}>
                    {SUPPORTED_LANGUAGES.map((lang )=> (
                      <option key={lang.identifier} value={lang.identifier}>
                        {lang.name}
                      </option>
                    ))}
                  </select>}
                <button onClick={handleGptSearchClick}
                className="mx-4 font-bold text-xl text-white">
                   {showGptSearch ? "Home" : "GPT Search"}
                </button>
                <button onClick={handleSignOut}  
                className="mx-4 font-bold text-xl text-white">
                  Sign Out
              </button>
              </div>
              )
              }
    </div>
  )
}

export default Header
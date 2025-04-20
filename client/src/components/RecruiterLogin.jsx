import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [image, setImage] = useState(false);
  const {setShowRecruiterLogin} = useContext(AppContext)

  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const onSubmitHandler= async(e)=>{
    e.preventDefault()
    if(state === 'Sign Up' && !isTextDataSubmitted){
     setIsTextDataSubmitted(true)   
    }
  }

  useEffect(()=>{
    document.body.style.overflow = 'hidden'
    return ()=>{
        document.body.style.overflow = 'unset'  
    }
  },[])
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form onSubmit={onSubmitHandler} className="relative bg-white p-10 rounded-xl text-slate-500">
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Recruiter {state}
        </h1>
        <p className="text-sm ">Welcome back! Please sign in to continue</p>
        {state === 'Sign Up'  && isTextDataSubmitted ?  <>
            <div className="flex items-center gap-4 my-10">
                <label className="" htmlFor="image">
                    <img className="w-16 h-16 rounded-full" src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload_area" />
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden />
                </label>
                <p className="">Upload Company<br /> Logo</p>
            </div>
        </> : 
        <>
          {state !== "Login" && (
            <div className="border border-gray-300 px-4 py-2 flex items-center ga-2 rounded-full mt-5">
              <img src={assets.person_icon} alt="person_icon" />
              <input
                className="outline-none text-sm ml-2"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Company name"
                required
              />
            </div>
          )}
          <div className="border border-gray-300 px-4 py-2 flex items-center ga-2 rounded-full mt-5">
            <img src={assets.email_icon} alt="email_icon" />
            <input
              className="outline-none text-sm ml-2"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              required
            />
          </div>
          <div className="border border-gray-300 px-4 py-2 flex items-center ga-2 rounded-full mt-5">
            <img src={assets.lock_icon} alt="lock_icon" />
            <input
              className="outline-none text-sm ml-2"
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              required
            />
          </div>
        </>
        }
        {state==='Login' && <p className="text-xs text-gray-600 mt-4 cursor-pointer">
            Forgot password?
        </p>}
          
        <button type="submit" className="bg-blue-600 w-full text-white py-2 rounded-full mt-4 cursor-pointer">
          {state === "Login" ? "login" : isTextDataSubmitted ? "create account" : "next"}
        </button>
        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don&apos;t have an account?<span className="text-blue-600 cursor-pointer" onClick={()=>setState('Sign Up')}>Sign Up</span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account? <span className="text-blue-600 cursor-pointer" onClick={()=>setState('Login')}>Login</span>
          </p>
        )}
        <img onClick={(e)=>setShowRecruiterLogin(false)} src={assets.cross_icon} alt="cross_icon" className="absolute top-5 right-5 cursor-pointer" />
      </form>
    </div>
  );
};

export default RecruiterLogin;

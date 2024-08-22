import React,{ useState } from 'react'
import Navbar from './Navbar'
import { Link, Route, Router } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth,db } from '../FirebaseConfigs/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import './Signup.css'
import Login  from './Login'
import App from '../App'


const Signup = () => {

    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const [email, setEmail]=useState("")
    const [phonenumber, setPhoneNumber]=useState("")
    const [address, setAddress]= useState("")

    const navigate = useNavigate();

    const[errorMsg, setErrorMsg]=useState("")
    const[successMsg, setSuccessMsg]=useState("")

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("hmm")
        createUserWithEmailAndPassword(auth,email,password)
            .then((userCredential) => {
                const user = userCredential.user;
                const initialcartvalue = 0;
                console.log(user);

                addDoc(collection(db, "users"),{
                    username: username , email: email, phonenumber:
                    phonenumber , password: password, cart: initialcartvalue,
                    address: address, uid:user.uid
                }).then(()=> {
                    setSuccessMsg('New User added successfully, You will now be automatically redirected to login page.')
                    setUsername('')
                    setPhoneNumber('')
                    setEmail('')
                    setPassword('')
                    setErrorMsg('')
                    setTimeout(()=> {
                        setSuccessMsg('');
                        navigate('/login')
                    }, 4000);
                    
                })
                .catch((error)=> { setErrorMsg(error.message)});
            })
            .catch((error)=> { 
                console.log(error.message)
                setErrorMsg(error.message)
                if(error.message === 'Firebase: Error(auth/invalid-email).'){
                    setErrorMsg('Please fill all required fields')
                }
                if(error.message === 'Firebase: Error(auth/email-already-in-use).'){
                    setErrorMsg('User already exisits');
                }
                })
    }

  return (
    <div>
        <Navbar/>
        <div class="flex justify-center pt-20 text-2xl text-aqua" className='signup-container'>
            <form class="flex flex-col p-10 border border-solid border-black rounded-lg w-350" className='signup-form' onSubmit={handleSubmit}>
                <p>Create Account</p>

                {successMsg && <>
                    <div class="flex justify-center bg-green-200 p-10 rounded-lg text-green" className='success-msg'>
                        <h3>{successMsg}</h3>
                    </div>
                </>}
                {errorMsg && <>
                    <div class="flex justify-center bg-red-200 p-10 rounded-lg text-red" className='error-msg'>
                       <h3 > {errorMsg} </h3>
                    </div>
                </>}

                <label class="pt-0 mt-16 font-bold text-lg">Your Name</label>
                <input class="my-2 border-2 border-lightpink rounded-md px-5 text-lg focus:outline-none focus:border-lightblue" onChange={(e)=> setUsername(e.target.value)}
                type='text' placeholder='First and last name' id='name' />

                <label class="pt-0 mt-16 font-bold text-lg" >Mobile Number</label>
                <input class="my-2 border-2 border-lightpink rounded-md px-5 text-lg focus:outline-none focus:border-lightblue" onChange={(e)=> setPhoneNumber(e.target.value)}
                type='tel' placeholder='Mobile Number' id='mobile' />

                <label class="pt-0 mt-16 font-bold text-lg">Email</label>
                <input class="my-2 border-2 border-lightpink rounded-md px-5 text-lg focus:outline-none focus:border-lightblue" onChange={(e)=> setEmail(e.target.value)}
                type='email' placeholder='Enter your email' id='email' />

                <label class="pt-0 mt-16 font-bold text-lg">Password</label>
                <input class="my-2 border-2 border-lightpink rounded-md px-5 text-lg focus:outline-none focus:border-lightblue" onChange={(e)=> setPassword(e.target.value)}
                type='password' placeholder='Enter your password' id='password' />

                <label class="pt-0 mt-16 font-bold text-lg">Address</label>
                <textarea onChange={(e)=> setAddress(e.target.value)}
                type='password' placeholder='Enter your address' id='address' />

                <button class="bg-yellow-400 my-20 border-none text-lg font-semibold text-white rounded-lg py-2 px-4" type='submit' id='signup'>Sign up</button>
                <div>
                    <span>Already have an Account?</span>
                    <Link to='/Login'>Sign In</Link>
                </div>

            </form>
        </div>
    </div>
  )
}

export default Signup
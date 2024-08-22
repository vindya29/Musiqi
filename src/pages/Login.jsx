import React, { useState } from 'react';
import Navbar from './Navbar'
import './Login.css'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import { getAuth , signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import logo1  from '../assets/musiqi.jpeg'

const Login = () => {
   
    const [password, setPassword]= useState("");
    const [email, setEmail]=useState("")
    const[errorMsg, setErrorMsg]=useState("")
    const[successMsg, setSuccessMsg]=useState("")

    const auth= getAuth();
    const navigate= useNavigate();

    const handleLogin = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            setSuccessMsg('Logged in Successfully , you will be redirected to homepage')
            setEmail('')
            setPassword('')
            setErrorMsg('')
            setTimeout(() => {
                setSuccessMsg('');
                <Router>
                    {navigate('/app')}
                </Router>
            },3000)
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(error.message)
            setErrorMsg(error.message);
            if(error.message == 'Firebase: Error (auth/invalid-email).'){
                setErrorMsg('Please fill all required fields')
            }
            if(error.message == 'Firebase : Error (auth/user-not-found).'){
                setErrorMsg('Email not Found');
            }
            if(error.message == 'Firebase : Error (auth/invalid-login-credentials).'){
                setErrorMsg('Wrong Password');
            }
        })
    }


  return (
    <div>
        <Navbar />
        <div className='login-container'>
          <img src={logo1} alt="Logo"  style={{ maxWidth: '200px' }} />
            <form className='login-form'>
                <p id='loginp'>Login</p>

                {successMsg && <>
                    <div className='success-msg'>
                       <h3>{successMsg}</h3>
                    </div>
                </>}
                {errorMsg && <>
                    <div className='error-msg'>
                      <h3>{errorMsg}</h3>
                    </div>
                </>}

                

                <label>Email</label>
                <input onChange={(e)=> setEmail(e.target.value)}
                type='email' placeholder='Enter your email' id='email' />

                <label>Password</label>
                <input onChange={(e)=> setPassword(e.target.value)}
                type='password' placeholder='Enter your password' id='password' />

                <button onClick={handleLogin} id='login'>Login</button>
                <div>
                    <span>Don't have an Account? </span>
                    <Link to='/'>Sign Up</Link>
                </div>

            </form>
        </div>
    </div>
  )
}

export default Login

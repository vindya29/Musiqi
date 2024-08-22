import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth,db } from '../FirebaseConfigs/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import './Signup.css'


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
                        navigate('/login');
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
        <div className='signup-container'>
            <form className='signup-form' onSubmit={handleSubmit}>
                <p>Create Account</p>

                {successMsg && <>
                    <div className='success-msg'>
                        <h3>{successMsg}</h3>
                    </div>
                </>}
                {errorMsg && <>
                    <div className='error-msg'>
                       <h3 > {errorMsg} </h3>
                    </div>
                </>}

                <label>Your Name</label>
                <input onChange={(e)=> setUsername(e.target.value)}
                type='text' placeholder='First and last name' id='name' />

                <label>Mobile Number</label>
                <input onChange={(e)=> setPhoneNumber(e.target.value)}
                type='tel' placeholder='Mobile Number' id='mobile' />

                <label>Email</label>
                <input onChange={(e)=> setEmail(e.target.value)}
                type='email' placeholder='Enter your email' id='email' />

                <label>Password</label>
                <input onChange={(e)=> setPassword(e.target.value)}
                type='password' placeholder='Enter your password' id='password' />

                <label>Address</label>
                <textarea onChange={(e)=> setAddress(e.target.value)}
                type='password' placeholder='Enter your address' id='address' />

                <button type='submit' id='signup'>Sign up</button>
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
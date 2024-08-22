// import React from 'react'
// import { Link } from 'react-router-dom'
// import './Navbar.css'
// import cartlogo from '../assets/cartlogo.png'
// import profilelogo from '../assets/profilelogo.png'

// const Navbar = () => {
//   return (
//    <nav>
//     <Link to='/signup'><button>Register</button></Link>
//     <Link to='/login'><button>Login</button></Link>
//     <Link to='/app/userprofile'>
//         <img src={profilelogo} className='profile-icon' />
//     </Link>
//    </nav>
//   )
// }

// export default Navbar

import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Navbar.css";
import profilelogo from "../assets/profilelogo.jpeg";
import { auth, db } from "../FirebaseConfigs/firebaseConfig";
import { QuerySnapshot, collection, getDocs, query, where } from "firebase/firestore";

const Navbar = () => {
  function GetCurrentUser() {
    const [user, setUser] = useState("");
    const usersCollectionRef = collection(db, "users");

    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
            );
            console.log(q);
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const loggeduser = GetCurrentUser();

  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  const [cartdata, setcartdata] = useState([]);

  if(loggeduser){

      const getcartdata = async()=> {

        const cartArray=[];
        const path = `cart-${loggeduser[0].uid}`
        //console.log(path)

        getDocs(collection(db,path)).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            cartArray.push({ ...doc.data(), id: doc.id})
          });
          setcartdata(cartArray)
        }).catch('Error error error')
      }
      getcartdata()
  }


  return (
    <div>
      <div className="navbar">
        <div className="RightContainer">
          {!loggeduser && (
            <nav>
              <Link to="/">
                <button>Register</button>
              </Link>
              <Link to="/login">
                {" "}
                <button>Login</button>{" "}
              </Link>
            </nav>
          )}

          {loggeduser && (
            <nav>
              <Link to="/app/userprofile">
                <img src={profilelogo} className="profile-icon" />
              </Link>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
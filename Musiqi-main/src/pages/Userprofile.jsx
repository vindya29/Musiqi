import React, { useState, useEffect } from "react";
import { auth, db } from "../FirebaseConfigs/firebaseConfig";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import Navbar from "./Navbar";
import "./UserProfile.css";

const GetUser = async (userlogged) => {
  if (userlogged) {
    const q = query(
      collection(db, "users"),
      where("uid", "==", userlogged.uid)
    );
    const data = await getDocs(q);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } else {
    return null;
  }
};

const UserProfile = () => {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userlogged) => {
      const user = await GetUser(userlogged);
      setLoggedUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <div className="userprofile-outercontainer">
        {loggedUser ? (
          <div className="user-profile">
            <p>Your Account Details</p>

            <div className="data-row">
              <span>Your Name - </span>
              <span>{loggedUser[0].username}</span>
            </div>
            <div className="data-row">
              <span>Your Email - </span>
              <span>{loggedUser[0].email}</span>
            </div>
            <div className="data-row">
              <span>Your Phonenumber -</span>
              <span>{loggedUser[0].phonenumber}</span>
            </div>
            <div className="data-row">
              <span>Your address - </span>
              <span>{loggedUser[0].address}</span>
            </div>
          </div>
        ) : (
          <div>
            <p>You are not logged IN</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

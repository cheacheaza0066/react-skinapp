import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import {

  doc,
  getDoc,
  
}  from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';

const initialState = {
  displayName : "",
  email:"",
  phone:"",
  password:"",
  address : ""
}

const ViewUser = () => {
  const navigate = useNavigate()
  const[data,setData] = useState(initialState);
  const {displayName,email,phone,password,address,img} = data;

  const {id} = useParams();
  useEffect(()=>{
    id && getSingleUser();
  },[id]);

  const getSingleUser = async () =>{
    const docRef = doc(db,"users",id);
    const snapshot = await getDoc(docRef);
    if (snapshot) {
      setData({...snapshot.data()});
    }
  }
  
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        {/* <Navbar /> */}
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{displayName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                  {address}
                  </span>
                </div> 
                <div>
                

                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
    
  );
};

export default ViewUser;

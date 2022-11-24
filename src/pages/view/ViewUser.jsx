import "./view.css";
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
      console.log("ข้อมูลมา User")
    }
    

  }
  
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        {/* <Navbar /> */}
        <div className="top">
          <div className="left">
            <div className="container">
                <div className="image mb-3">
                        <img src={img} alt="" />
                 </div>
                 <h1 className="itemTitle  ms-4">{displayName}</h1>

                 <div className="detailItem ms-4">
                  <span className="itemKey"><b>อีเมล :</b></span>
                  <span className="itemValue ms-1"> {email}</span>
                </div>

                <div className="detailItem ms-4">
                  <span className="itemKey"><b>เบอร์โทรศัพท์ :</b></span>
                  <span className="itemValue ms-1"> {phone}</span>
                </div>

                <div className="detailItem ms-4">
                  <span className="itemKey"><b>ที่อยู่ :</b></span>
                  <span className="itemValue ms-1"> {address}</span>
                </div>

           

  



                
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
    
  );
};

export default ViewUser;

import Sidebar from "../../components/sidebar/Sidebar";

import React, { useContext, useRef, useState } from "react"
import { updateEmail, updatePassword} from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, } from "react-router-dom";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Swal from "sweetalert2";


const initialState = {
  
  email:"",
}


const UpdateEmail = ()=>{
  const navigate = useNavigate()
  const[data,setData] = useState(initialState);

  const emailRef = useRef();
  const { currentUser} = useAuth();


  const handleChange =(e)=>{
    setData({...data, [e.target.name]:e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const user = auth.currentUser;

    console.log(currentUser)
    if (emailRef.current.value !== currentUser.email) {
      updateEmail(currentUser,emailRef.current.value);
      
      await updateDoc(doc(db, "users",user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      localStorage.removeItem("user");



      Swal.fire(
        'อัพเดทสำเร็จ',
        'กรุณา LOGIN ใหม่',
        'success',
      )
        navigate("/login")
    }

   
    
  };
  

    return(
      <div className="new">
      <Sidebar />
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1>ฟอร์มเเก้ไขอีเมล</h1>
        </div>
        <div className="bottom">
            <form onSubmit={handleSubmit}>
             
              <div className="formInput  ms-4 mt-3">
                 <label className="form-label" >อีเมล</label>
                 <input className="form-control" defaultValue={currentUser.email} onChange={handleChange} ref={emailRef} required type="email" name="email"  />
                </div>
              <button className="btn btn-success my-3 ms-4" type="submit">
                อัพเดท
              </button>
    
            </form>
      
        </div>
      </div>
    </div>
    )
}

export default UpdateEmail
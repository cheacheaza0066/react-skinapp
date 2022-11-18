import Sidebar from "../../components/sidebar/Sidebar";

import React, { useContext, useRef, useState } from "react"
import { updateEmail, updatePassword} from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, } from "react-router-dom";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";


const initialState = {
  
  email:"",
}


const UpdateAdmin = ()=>{
  const navigate = useNavigate()
  const[data,setData] = useState(initialState);

  const emailRef = useRef();
  // const passwordRef = useRef()
  // const passwordConfirmRef = useRef()
  const { currentUser} = useAuth();


  const handleChange =(e)=>{
    setData({...data, [e.target.name]:e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   alert("พาสเวิด ไม่ตรงกัน")
    //   navigate("/users/")
    // }

    const user = auth.currentUser;
    if (emailRef.current.value !== currentUser.email) {
      updateEmail(currentUser,emailRef.current.value);
      console.log(user.uid)

      
      await updateDoc(doc(db, "users",user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });


      console.log("อัพเดท")
        navigate("/users/")
    }

    
    
  };

  

    return(
      <div className="new">
      <Sidebar />
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1>ฟอร์มเเก้ไขผู้ดูเเลระบบ</h1>
        </div>
        <div className="bottom">
          <div className="left">
          
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
              </div>
              <div className="formInput">
                
                 <label >อีเมล</label>
                 <input defaultValue={currentUser.email} onChange={handleChange} ref={emailRef} required type="email" name="email"  />
                
                 {/* <label >รหัสผ่าน</label>
                 <input  ref={passwordRef}  type="password" name="password"  />

                 <label >รี รหัสผ่าน</label>
                 <input ref={passwordConfirmRef}  type="password" name="password"  /> */}
          
                </div>
              <button type="submit">
                อัพเดท
              </button>
              {/* <button className="btn btn-info" onClick={()=> navigate(`/users/updatePassword`)}>
              จัดการรหัสผ่าน
            </button> */}
            </form>
          </div>
        </div>
      </div>
    </div>
    )
}

export default UpdateAdmin
import Sidebar from "../../components/sidebar/Sidebar";

import React, { useContext, useRef, useState } from "react"
import { updateEmail, updatePassword} from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, } from "react-router-dom";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";


const initialState = {
  
  password:"",
}


const UpdatePassword = ()=>{
  const navigate = useNavigate()
  const[data,setData] = useState(initialState);

  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser} = useAuth();


  const handleChange =(e)=>{
    setData({...data, [e.target.name]:e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        alert("พาสเวิด ไม่ตรงกัน");
      }

    const user = auth.currentUser;

    if (passwordRef.current.value) {
        updatePassword(currentUser,passwordRef.current.value);
        console.log("สำเร็จ")
        navigate("/users/updateProfile")
      }
    
    // if (passwordRef.current.value) {
    //   promises.push(updatePassword(currentUser,passwordRef.current.value))
    // }

    // Promise.all(promises)
    //   .then(() => {
    //     navigate(-1)
    //   })
    //   .catch(() => {
    //   })
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
                
                
                 <label >รหัสผ่าน</label>
                 <input  ref={passwordRef}  type="password" name="password"  />

                 <label >รี รหัสผ่าน</label>
                 <input ref={passwordConfirmRef}  type="password" name="password"  />
          
                </div>
                {/* <button className="btn btn-info" onClick={()=> navigate(`/users/updateProfile`)}>
              กลับ
            </button> */}
              <button type="submit">
                อัพเดท
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
}

export default UpdatePassword
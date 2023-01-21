import Sidebar from "../../components/sidebar/Sidebar";

import React, { useContext, useRef, useState } from "react"
import { updateEmail, updatePassword} from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, } from "react-router-dom";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Swal from "sweetalert2";


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
      Swal.fire('รหัสผ่านไม่ตรงกัน')
      navigate("/users/")

      }

     else if (passwordRef.current.value) {
        updatePassword(currentUser,passwordRef.current.value);
        Swal.fire(
          'สำเร็จ',
          'อัพเดทรหัสผ่านสำเร็จ',
          'success',
        )
        navigate("/users/")
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
          <h1>ฟอร์มเเก้ไขรหัสผ่าน</h1>
        </div>
        <div className="bottom">
         {/* อัพพาส */}
            <form onSubmit={handleSubmit}>
             
              <div className="formInput ms-4 mt-3">
                 <label class="form-label" >รหัสผ่านใหม่</label>
                 <input  class="form-control" ref={passwordRef}  type="password" name="password"  />

                 <label class="form-label">ยืนยันรหัสผ่าน</label>
                 <input  class="form-control" ref={passwordConfirmRef}  type="password" name="password"  />
                </div>
              
              <button type="submit" className="btn btn-success my-3 ms-4">
                อัพเดทรหัสผ่าน
              </button>
            </form>
        
        </div>
      </div>
    </div>
    )
}

export default UpdatePassword
import "./sidebar.scss";
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import StoreIcon from "@mui/icons-material/Store";
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HealingTwoToneIcon from '@mui/icons-material/HealingTwoTone';import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { IconButton } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";
import Swal from "sweetalert2";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate()
  const user = auth.currentUser;


  const logout = async () => {
    await signOut(auth);
    Swal.fire(
      'สำเร็จ',
      'ออกจากระบบสำเร็จ',
      'success',
    )
    navigate("/login")
    localStorage.removeItem("user");
console.log("ออกจากระบบ")
  };

  

  // const DeleteUser = async()=>{
  //   if (window.confirm("คุณเเน่ใจนะว่าจะลบผู้ดูเเลระบบคนนี้")) {
  //     try {
  //     user.delete().then(function() {
  //     localStorage.removeItem("user");
  //     console.log("ลบบัญชี")
  //   });
  //     } catch (error) {
  //       console.log("ลบบัญชีไม่สำเร็จ")

  //     }
  //   }
  // } 


  
  async function DeleteUserInAuth() {
    
    try {
    user.delete().then(function() {
    localStorage.removeItem("user");
    navigate("/login")
    console.log("ลบบัญชี")
  });
    } catch (error) {
      console.log("ลบบัญชีไม่สำเร็จ")
    }
}

 async function DeleteUserInTable(){
    try {
      await deleteDoc(doc(db, "users", user.uid));
      console.log("ลบบัญชีจากตาราง")
    } catch (err) {
      console.log(err);
    }
  };


  // console.log(user.uid,user.email)

  
  return (
    <div className="sidebar">
      {/* <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">lamadmin</span>
        </Link>
      </div> */}
      <hr />
      <div className="center">
        <ul>
          <p className="title">หน้าหลัก</p>
          <Link to="/">
          <li>
            <HouseOutlinedIcon className="icon" />
            <span>หน้าหลัก</span>
          </li>
          </Link>
          
          <p className="title">การจัดการ</p>
          <Link  to="/users" style={{ textDecoration: "none" }}>
            <li>
              <SupervisorAccountIcon className="icon" />
              <span>จัดการผู้ดูเเลระบบ</span>
            </li>
          </Link>
          <Link to="/skin-diseases" style={{ textDecoration: "none" }}>
            <li>
              <HealingTwoToneIcon className="icon" />
              <span>จัดการโรคผิวหนัง</span>
            </li>
          </Link>
          
         
          <p className="title">ตั้งค่าบัญชี</p>

          <Link to="/users/update-email" style={{ textDecoration: "none" }}>
            <li>
              <EmailOutlinedIcon className="icon" />
              <span>จัดการอีเมล</span>
            </li>
          </Link>
          <Link to="/users/updatePassword" style={{ textDecoration: "none" }}>
            <li>
              <KeyOutlinedIcon className="icon" />
              <span>จัดการรหัสผ่าน</span>
            </li>
          </Link>
          
          <Link to="/users/DeleteAccount" style={{ textDecoration: "none" }}>
            <li>
              <DeleteForeverOutlinedIcon className="icon" />
              <span>ลบบัญชี</span>
            </li>
          </Link>


          {/* <Link onClick={() => { DeleteUserInTable(); DeleteUserInAuth();}}  style={{ textDecoration: "none" }}>
            <li>
            <ExitToAppIcon  className="icon"  />
            <span>deleteAccount2</span>
            </li>
          </Link> */}


          {/* <link href="#" onClick={() => { DeleteUserInTable(); DeleteUserInAuth();}}>Trigger here</link> */}


           <Link onClick={logout} to="/login" style={{ textDecoration: "none" }}>
            <li>
            <ExitToAppIcon  className="icon"  />
            <span>Logout</span>
            </li>
          </Link>

        
        </ul>
      </div>
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;

import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { IconButton } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate()
  const user = auth.currentUser;


  const logout = async () => {
    await signOut(auth);
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
            <DashboardIcon className="icon" />
            <span>หน้าหลัก</span>
          </li>
          </Link>
          
          <p className="title">จัดการโรคผิวหนัง</p>
          <Link  to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>จัดการผู้ดูเเลระบบ</span>
            </li>
          </Link>
          <Link to="/skin-diseases" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>จัดการโรคผิวหนัง</span>
            </li>
          </Link>
          
         
          <p className="title">ตั้งค่าบัญชี</p>

          <Link to="/users/update-email" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>จัดการอีเมล</span>
            </li>
          </Link>
          <Link to="/users/updatePassword" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>จัดการรหัสผ่าน</span>
            </li>
          </Link>
          
          <Link to="/users/DeleteAccount" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>ลบบัญชีผู้ใช้</span>
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

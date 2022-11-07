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
import { auth } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate()


  const logout = async () => {
    await signOut(auth);
    navigate("/login")
    localStorage.removeItem("user");
console.log("ออกจากระบบ")
  };

  
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
          <p className="title">MAIN</p>
          <Link to="/">
          <li>
            <DashboardIcon className="icon" />
            <span>หน้าหลัก</span>
          </li>
          </Link>
          
          <p className="title">LISTS</p>
          <Link  to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>จัดการผู้ดูเเลระบบ</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>จัดการโรคผิวหนัง</span>
            </li>
          </Link>
          <br />
          <br />
          <Link to="/users/updateProfile" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>เเก้ไขโปรไฟล</span>
            </li>
          </Link>
          
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

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ListUser from "./pages/list/ListUser";
import ListSkin from "./pages/list/ListSkin";

import ViewUser from "./pages/view/ViewUser";
import New from "./pages/addUser/AddUser";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import UpdateAdmin from "./pages/update/update-admin";
import AddUser from "./pages/addUser/AddUser";
import UpdateProfile from "./pages/update/update-profile";
import UpdatePassword from "./pages/update/update-password";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import DeleteAccount from "./pages/deleteAccount/deleteAccount";
import AddSkin from "./pages/addSkin/AddSkin";
import ViewSkin from "./pages/view/ViewSkins";
import UpdateSkin from "./pages/update/update-skin";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route path="login" element={<Login />}/>
                <Route path="forgot-password" element={<ForgotPassword />}/>
                <Route index element={<RequireAuth><Home /></RequireAuth>}/>
                <Route path="users">
                      <Route index element={ <RequireAuth><ListUser /></RequireAuth>}/>
                      <Route path="update/:id" element={ <RequireAuth> <UpdateAdmin inputs={userInputs} title="เเบบฟอร์มอัพเดทผู้ดูเเลระบบ" /></RequireAuth> }/>
                      <Route path="view/:id" element={ <RequireAuth> <ViewUser inputs={userInputs} /></RequireAuth> }/>
                      <Route path="addUser" element={ <RequireAuth> <AddUser inputs={userInputs} title="เเบบฟอร์มเพิ่มผู้ดูเเลระบบ" /></RequireAuth> }/>
                      <Route path="updateProfile" element={ <RequireAuth> <UpdateProfile inputs={userInputs} title="เเบบฟอร์มเพิ่มผู้ดูเเลระบบ" /></RequireAuth> }/>
                      <Route path="updatePassword" element={ <RequireAuth> <UpdatePassword inputs={userInputs} title="เเบบฟอร์มเพิ่มผู้ดูเเลระบบ" /></RequireAuth> }/>
                      <Route path="deleteAccount" element={ <RequireAuth> <DeleteAccount inputs={userInputs} title="ลบบัญชีผู้ใช้งาน" /></RequireAuth> }/>
                </Route>
                <Route path="skin-diseases">
                      <Route index element={ <RequireAuth><ListSkin /></RequireAuth>}/>
                      <Route path="update/:id" element={ <RequireAuth> <UpdateSkin/></RequireAuth> }/>
                      <Route path="view/:id" element={ <RequireAuth> <ViewSkin inputs={userInputs} title="เเบบฟอร์มอัพเดทผู้ดูเเลระบบ" /></RequireAuth> }/>
                      <Route path="addSkin" element={ <RequireAuth> <AddSkin  title="เเบบฟอร์มเพิ่มผู้ดูเเลระบบ" /></RequireAuth> }/>
                </Route>
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import ViewUser from "./pages/viewUser/ViewUser";
import New from "./pages/addUser/AddUser";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import UpdateAdmin from "./pages/update/update-admin";
import AddUser from "./pages/addUser/AddUser";
import UpdateProfile from "./pages/update/update-profile";
import UpdatePassword from "./pages/update/update-password";

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
                <Route index element={<RequireAuth><Home /></RequireAuth>}/>
                <Route path="users">
                      <Route index element={ <RequireAuth><List /></RequireAuth>}/>
                      <Route path="update/:id" element={ <RequireAuth> <UpdateAdmin inputs={userInputs} title="เเบบฟอร์มอัพเดทผู้ดูเเลระบบ" /></RequireAuth> }/>
                      <Route path="view/:id" element={ <RequireAuth> <ViewUser inputs={userInputs} title="เเบบฟอร์มอัพเดทผู้ดูเเลระบบ" /></RequireAuth> }/>
                      <Route path="addUser" element={ <RequireAuth> <AddUser inputs={userInputs} title="เเบบฟอร์มเพิ่มผู้ดูเเลระบบ" /></RequireAuth> }/>
                      <Route path="updateProfile" element={ <RequireAuth> <UpdateProfile inputs={userInputs} title="เเบบฟอร์มเพิ่มผู้ดูเเลระบบ" /></RequireAuth> }/>
                      <Route path="updatePassword" element={ <RequireAuth> <UpdatePassword inputs={userInputs} title="เเบบฟอร์มเพิ่มผู้ดูเเลระบบ" /></RequireAuth> }/>

                </Route>
                <Route path="products">
                      <Route index element={ <RequireAuth><List /></RequireAuth>}/>
                      <Route path=":productId" element={<RequireAuth><ViewUser /></RequireAuth>}/>
                      <Route path="addUser" element={ <RequireAuth><AddUser inputs={productInputs} title="Add New Product" /></RequireAuth>}/>
                </Route>
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { useContext, useState } from "react";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"
import { Form, Button, Card, Alert } from "react-bootstrap"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navitage = useNavigate()

  const {dispatch} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({type:"LOGIN", payload:user})
        navitage("/")
      })
      .catch((error) => {
        setError("อีเมล หรือ รหัสผ่านไม่ถูกต้อง");
      });
  };

  return (
    <div className="login">
    <div className="card">
      <div className="card-body">
      {/* <h1 className="text-center mb-4">เเอปพลิเคชันให้คำเเนะนำโรคผิวหนัง</h1> */}
        <div className="head">
        <h2 className="text-center mb-2">ล็อคอิน</h2> 
        <p className="mb-5">กรุณาล็อคอินเพื่อเข้าสู่ระบบ จัดการเเอปพลิเคชันให้คำเเนะนำโรคผิวหนัง</p>
        </div>
        
        
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleLogin}>
          <div className="form-group" id="email">
            <label className="mb-2">อีเมล</label>
            <input className="form-control mb-2" type="email"  onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group" id="password">
            <label className="mb-2">รหัสผ่าน</label>
            <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button disabled={loading} className="w-100 mt-3 btn btn-success" type="submit">
            เข้าสู่ระบบ
          </button>
        </form>
        <div className="w-100 text-center mt-3">
          <Link to="/forgot-password"><p>ลืมรหัสผ่าน</p></Link>
        </div>
      </div>
    </div>
    
  </div>
   
  );
};

export default Login;

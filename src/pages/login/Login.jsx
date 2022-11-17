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
    // <div classNameName="login">
    //   <form onSubmit={handleLogin}>
    //     <input
    //       type="email"
    //       placeholder="email"
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       placeholder="password"
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button type="submit">Login</button>
    //     {error && <span>Wrong email or password!</span>}
    //   </form>
    // </div>
    <div className="login">
    <div className="card">
      <div className="card-body">
        <h2 className="text-center mb-4">LOGIN</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleLogin}>
          <div className="form-group" id="email">
            <label className="mb-2">Email</label>
            <input className="form-control mb-2" type="email"  onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group" id="password">
            <label className="mb-2">Password</label>
            <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button disabled={loading} className="w-100 mt-3 btn btn-success" type="submit">
            LOGIN
          </button>
        </form>
        <div className="w-100 text-center mt-3">
          <Link to="/forgot-password">Forgot Password</Link>
        </div>
      </div>
    </div>
    
  </div>
   
  );
};

export default Login;

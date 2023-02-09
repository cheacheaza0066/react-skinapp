import { useContext, useRef, useState } from "react";
import "./forgorpassword.css";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext, useAuth} from "../../context/AuthContext"
import { Form, Button, Card, Alert } from "react-bootstrap"

const ForgotPassword = () => {
    const emailRef = useRef()
    // const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(emailRef.current.value)
        try {
          setMessage("")
          setError("")
          setLoading(true)
          await sendPasswordResetEmail(auth,emailRef.current.value)
          setMessage("โปรดเช็คที่อีเมลของท่าน")
        } catch {
          setError("อีเมลของท่านไม่ถูกต้อง")
        }
    
        setLoading(false)
      }

  return (
    
    <div className="forgotPassword">
    <div className="card">
      <div className="card-body">
        <div className="head">
        <h2 className="text-center mb-2">รีเซ็ตรหัสผ่าน</h2>
        <p className="mb-4">กรูณากรอกอีเมลเพื่อรีเซ็ตรหัสผ่าน</p>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}

        <form onSubmit={handleSubmit}>
          <div className="form-group" id="email">
            <label>อีเมล</label>
            <input className="form-control" type="email"  ref={emailRef} required />
          </div>
          
          <button disabled={loading} className="w-100 mt-3 btn btn-success" type="submit">
            รีเซ็ตรหัสผ่าน
          </button>
        </form>
        <div className="w-100 text-center mt-3">
            <Link to="/login"><p>กลับไปยังหน้าล็อคอิน</p></Link>
          </div>
      </div>
    </div>
    
  </div>
   
  );

  }
export default ForgotPassword;

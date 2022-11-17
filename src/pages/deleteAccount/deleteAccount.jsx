import { useContext, useEffect, useRef, useState } from "react";
import "./deleteaccount.css";
import { deleteUser, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";

const DeleteAccount = () => {
   const user = auth.currentUser
   const navigate = useNavigate()

   const initialState = {
    displayName : "",
    email:"",
    phone:"",
    password:"",
    address : ""
  }
   const[data,setData] = useState(initialState);
   const {id} = useParams();
  useEffect(()=>{
    id && getSingleUser();
  },[id]);

   const getSingleUser = async () =>{
    const docRef = doc(db,"users",user.uid);
    const snapshot = await getDoc(docRef);
    if (snapshot) {
      setData({...snapshot.data()});
    }
    
  }
  
   

    const handleSubmit = async (e) => {
        e.preventDefault();
       if (window.confirm("คุณเเน่ใจนะว่าจะลบผู้ดูเเลระบบคนนี้")) {

        try {

         

            await deleteUser(auth.currentUser);
            await deleteDoc(doc(db, "users", user.uid));


            navigate("/login")
            localStorage.removeItem("user");
   
          } catch (error) {
            
            console.log(error);
          }
       }
        
       
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
                
                   
                <button type="submit">
                  ลบบัญชีผู้ใช้
                </button>
                
              </form>
            </div>
          </div>
        </div>
      </div>
      )

  }
export default DeleteAccount;

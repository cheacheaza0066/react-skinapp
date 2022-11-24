import "./view.css";
import Sidebar from "../../components/sidebar/Sidebar";
import {

 
  doc,
  getDoc,

  
}  from "firebase/firestore";
import { db, } from "../../firebase";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
nameThai : "",
nameEng:"",
  detail:"",
  
}

const ViewSkin = () => {
  const navigate = useNavigate()
  const[data,setData] = useState(initialState);
  const {nameThai,nameEng,detail,img} = data;

  const {id} = useParams();
  useEffect(()=>{
    id && getSingleSkin();
  },[id]);


  const getSingleSkin = async () =>{
    const docRef = doc(db,"Skin",id);
    const snapshot = await getDoc(docRef);
    if (snapshot) {
      setData({...snapshot.data()});
      console.log("ข้อมูลมา Skin")
    }
    

  }
  
  return (
   
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        {/* <Navbar /> */}
        <div className="top">
          <div className="left">
            <div className="container">
                    <div className="image mb-3">
                    <img className="imgskin" src={img} alt="" />
                    </div>
                 <h1 className="itemTitle  ms-4">{nameThai}</h1>
                 <div className="detailItem ms-4">
                  <span className="itemValue ms-1"> {nameEng}</span>
                </div>

                <h4 className="detail-h1 ms-4 mt-5"><b>ข้อมูลโรค {nameThai}</b></h4>

                <div className="detail ms-4 me-4">
                  <span className="itemValue ms-1"> {detail}</span>
                </div>
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
    
  );
};

export default ViewSkin;

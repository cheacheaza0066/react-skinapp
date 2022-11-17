import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import {

    collection,
  doc,
  getDoc,
  getDocs,
  
}  from "firebase/firestore";
import { db, storage } from "../../firebase";
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
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{nameThai}</h1>
                <div className="detailItem">
                  <span className="itemKey">nameEng:</span>
                  <span className="itemValue">{nameEng}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">detail:</span>
                  <span className="itemValue">
                  {detail}
                  </span>
                </div> 
                <div>
                

                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
    
  );
};

export default ViewSkin;

import Sidebar from "../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
// import { createUserWithEmailAndPassword, getAuth, updateEmail, updatePassword  } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";


const initialState = {
    nameThai : "",
    nameEng:"",
    detail : "",
  img : ""
}
const UpdateSkin = ()=>{
  const navigate = useNavigate()
  const[data,setData] = useState(initialState);
  const {nameThai,nameEng,detail,img} = data;
  const [file, setFile] = useState("");
  const [per, setPerc] = useState(null);
  const [isSubmit,setIsSubmit] = useState(null);



  

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleChange =(e)=>{
    setData({...data, [e.target.name]:e.target.value});
  };

  
  const handleSubmut = async (e)=>{
    setIsSubmit(true);
    e.preventDefault();
    try {

      await updateDoc(doc(db, "Skin", id), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate(-1)
    } catch (err) {
      console.log(err);
    }
  };
  const {id} = useParams();
  useEffect(()=>{
    id && getSingleUser();
  },[id]);

  const getSingleUser = async () =>{
    const docRef = doc(db,"Skin",id);
    const snapshot = await getDoc(docRef);
    if (snapshot) {
      setData({...snapshot.data()});
    }
  }

    return(
      <div className="new">
      <Sidebar />
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1>ฟอร์มเเก้ไขโรคผิวหนัง</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={img}
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmut}>
              <div className="formInput">
                <label htmlFor="file">
                  อัพโหลดรูปภาพ: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                 <label >ชื่อภาษาไทย</label>
                 <input  type="text" name="nameThai" onChange={handleChange} value={nameThai} />
                 <label >ชื่อภาษาอังกิด</label>
                 <input  type="text" name="nameEng" onChange={handleChange} value={nameEng} />
                 <label >รายละเอียด</label>
                 <textarea onChange={handleChange} value={detail}  name="" id="detail" cols="30" rows="10">
                </textarea>


                </div>
                  {/* <button type="submit" >อัพเดท</button> */}
              
              <button disabled={per !== null && per < 100} type="submit">
                อัพเดท
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
}

export default UpdateSkin
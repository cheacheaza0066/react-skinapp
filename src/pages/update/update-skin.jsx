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
import Swal from "sweetalert2";


const initialState = {

    // idSkin : "",
    nameThai : "",
    nameEng:"",
    detail : "",
    cause:"",
protect:"",
symptom:"",
therapy:"",
refskin:"",
    img : ""
}
const UpdateSkin = ()=>{
  const navigate = useNavigate()
  const[data,setData] = useState(initialState);
  
  // const {idSkin,nameThai,nameEng,detail,img} = data;
  const {idSkin,nameThai,nameEng,detail,cause,protect,symptom,therapy,medical,refskin,img} = data;

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
        // idSkin : Number(idSkin),
        timeStamp: serverTimestamp(),
      });
      Swal.fire(
        'สำเร็จ',
        'อัพเดทโรคผิวหนังสำเร็จ',
        'success',
      )
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
             <form onSubmit={handleSubmut}>
                <div className="container">
                  <div className="mb-3 imagecontainer">
                    <div className="image mb-3">
                        <img  src={img} alt="" />
                        </div>
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
                {/* <div class="mb-3">
                    <label class="form-label">รหัสโรคผิวหนัง</label>
                 <input class="form-control" type="number" name="idSkin" onChange={handleChange} pattern = "[0-9]*" value={idSkin} />
                  </div> */}

                  <div class="mb-3">
                  <label class="form-label">ชื่อภาษาไทย</label>
                  <input class="form-control" type="text" name="nameThai" onChange={handleChange} value={nameThai} />
                  </div>

                  <div class="mb-3">
                    <label class="form-label">ชื่อภาษาอังกฤษ</label>
                 <input class="form-control" type="text" name="nameEng" onChange={handleChange} value={nameEng} />
                  </div>

                  <div class="mb-3">
                    <label class="form-label">ความเป็นมาของโรคผิวหนัง</label>
                <textarea class="form-control" onChange={handleChange} value={detail}  name="detail" id="detail"  cols="100" rows="10">
                </textarea>                 
                </div>
                <div class="mb-3">
                    <label class="form-label">สาเหตุการเกิดโรคผิวหนัง</label>
                <textarea class="form-control" onChange={handleChange} value={cause}  name="cause" id="cause"  cols="100" rows="10">
                </textarea>                 
                </div>
                <div class="mb-3">
                    <label class="form-label">การป้องกันการเกิดโรคผิวหนัง</label>
                <textarea class="form-control" onChange={handleChange} value={protect}  name="protect" id="protect"  cols="100" rows="10">
                </textarea>                 
                </div>
                <div class="mb-3">
                    <label class="form-label">อาการของโรคผิวหนัง</label>
                <textarea class="form-control" onChange={handleChange} value={symptom}  name="symptom" id="symptom"  cols="100" rows="10">
                </textarea>                 
                </div>
                <div class="mb-3">
                    <label class="form-label">วิธีการรักษาโรคผิวหนัง</label>
                <textarea class="form-control" onChange={handleChange} value={therapy}  name="therapy" id="therapy"  cols="100" rows="10">
                </textarea>                 
                </div>
                <div class="mb-3">
                    <label class="form-label">ยาที่ใช้ในการรักษา </label>
                <textarea class="form-control" onChange={handleChange} value={medical}  name="medical" id="medical"  cols="100" rows="10">
                </textarea>                 
                </div>
                <div class="mb-3">
                    <label class="form-label">เเหล่งที่มา </label>
                <textarea class="form-control" onChange={handleChange} value={refskin}  name="refskin" id="refskin"  cols="100" rows="10">
                </textarea>                 
                </div>


                 <button disabled={per !== null && per < 100} type="submit" className="btn btn-success">
                  อัพเดทโรคผิวหนัง
                  </button>
                </div>
                    </form>
         
        </div>
      </div>
    </div>
    )
}

export default UpdateSkin
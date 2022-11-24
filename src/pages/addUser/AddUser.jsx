import "./addUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";

const AddUser = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate()
  // const {id} = useParams();
  // useEffect(()=>{
  //   id && getSingleUser();
  // },[id]);

  // const getSingleUser = async () =>{
  //   const docRef = doc(db,"users",id);
  //   const snapshot = await getDoc(docRef);
  //   if (snapshot) {
  //     setData({...snapshot.data()});
  //   }
  // }

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

  console.log(data);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate(-1)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
             <form onSubmit={handleAdd}>
                <div className="container">
                  <div className="mb-3 imagecontainer">
                    <div className="image mb-3">
                        <img src={file ? URL.createObjectURL(file)
                              : "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
                          }
                          alt=""
                        />
                        </div>
                        <label htmlFor="file">
                              อัพโหลดรูปภาพ: <DriveFolderUploadOutlinedIcon className="icon" />
                            </label>
                            <input required type="file" id="file" onChange={(e) => setFile(e.target.files[0])}style={{ display: "none", cursor:"pointer" }}/>
                </div>
                <div class="mb-3">
                    <label class="form-label">ชื่อ นามสกุล</label>
                    <input class="form-control" onChange={handleInput} id="displayName" type="text" />
                  </div>

                  <div class="mb-3">
                    <label class="form-label">อีเมล</label>
                    <input class="form-control" onChange={handleInput} id="email" type="text" />
                  </div>

                  <div class="mb-3">
                    <label class="form-label">รหัสผ่าน</label>
                    <input class="form-control"  onChange={handleInput} id="password" type="password" />
                  </div>

                  <div class="mb-3">
                    <label class="form-label">เบอร์โทรศัพท์</label>
                    <input class="form-control"  onChange={handleInput} id="phone" type="mail" />
                  </div>

                  <div class="mb-3">
                    <label class="form-label">ที่อยู่</label>
                    <textarea class="form-control" onChange={handleInput} id="address" cols="100" rows="3"></textarea>                 
                 </div>

                 


                 <button disabled={per !== null && per < 100} type="submit" className="btn btn-success">
                  เพิ่มผู้ดูเเลระบบ
                  </button>
                </div>
                    </form>
         
        </div>
      </div>
    </div>
  );
};

export default AddUser;

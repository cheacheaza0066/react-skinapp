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
import Swal from "sweetalert2";


const AddUser = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate()


  useEffect(() => {
    try {
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
    } catch (error) {
      Swal.fire(
        'ไม่สำเร็จ',
        'โปรดอัพโหลดรูปภาพ',
        'error',
      )
    }
  }, [file]);

 

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
      Swal.fire(
        'สำเร็จ',
        'เพิ่มผู้ดูเเลระบบสำเร็จ',
        'success',
      )
      navigate(-1)
    } catch (err) {
      Swal.fire(
        'ไม่สำเร็จ',
        'เพิ่มผู้ดูเเลระบบไม่สำเร็จโปรดเช็คอีเมลของท่าน',
        'error',
      )
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
                              อัพโหลดรูปภาพ: 
                            </label>
                            <input required type="file" id="file" onChange={(e) => setFile(e.target.files[0])}style={{  cursor:"pointer" }}/>
                </div>
                <div class="mb-3">
                    <label class="form-label">ชื่อ-นามสกุล</label>
                    <input class="form-control" placeholder="ชื่อ-นามสกุล" onChange={handleInput} id="displayName" type="text" required/>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">อีเมล</label>
                    <input class="form-control" placeholder="อีเมล" onChange={handleInput} id="email" type="email" required/>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">รหัสผ่าน</label>
                    <input class="form-control" placeholder="รหัสผ่าน" onChange={handleInput} id="password" type="password" required/>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">เบอร์โทรศัพท์</label>
                    <input class="form-control"  placeholder="เบอร์โทรศัพท์"  onChange={handleInput} id="phone" type="mail" required/>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">ที่อยู่</label>
                    <textarea class="form-control" placeholder="ที่อยู่" onChange={handleInput} id="address" cols="100" rows="3" required></textarea>                 
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

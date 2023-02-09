import "./addSkin.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,

} from "firebase/firestore";
import {  db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Swal from "sweetalert2";

const AddSkin = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  // const [idSkin, setIdSkin] = useState();
  const [per, setPerc] = useState(null);
  const navigate = useNavigate()
  // const id = firebase.firestore().collection('Skin').doc().id

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
    try{
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

//   console.log(data);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };
  

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      
    //   await setDoc(doc(db,"Skin","Skins"), {
    //     ...data,
    //     timeStamp: serverTimestamp(),
    //   });
    console.log(typeof idSkin);

    

    await addDoc(collection(db, "Skin"), {
        // question_id: id,
        ...data,
        
        // idSkin : Number(idSkin)
      });
      Swal.fire(
        'สำเร็จ',
        'เพิ่มโรคผิวหนังสำเร็จ',
        'success',
      )  
      navigate(-1)

    } catch (err) {
      Swal.fire(
        'ไม่สำเร็จ',
        'เพิ่มโรคผิวหนังไม่สำเร็จ',
        'error',
      ) 
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
        <h1 className="text-center">เเบบฟอร์มเพิ่มโรคผิวหนัง</h1>
        </div>

        <div className="bottom">
             <form onSubmit={handleAdd}>
                <div className="container">
                <div className="image mb-3">
                        <img src={file ? URL.createObjectURL(file)
                              : "https://cdn-icons-png.flaticon.com/512/8418/8418513.png"
                          }
                          alt=""
                        />
                        </div>
                  <div className="mb-3 imagecontainer ">
                        <label htmlFor="file">
                              อัพโหลดรูปภาพ:
                            </label>
                            <input required type="file" id="file" onChange={(e) => setFile(e.target.files[0])}style={{  cursor:"pointer" }}/>
                    </div>


                
                {/* <div class="mb-3">
                    <label class="form-label">รหัสโรคผิวหนัง</label>
                    <input class="form-control" onChange={(e)=>{setIdSkin(e.target.valueAsNumber)}} id="idSkin" type="number" required pattern = "[0-9]*"/>
                  </div> */}

                  <div class="mb-3">
                    <label class="form-label">ชื่อภาษาไทย</label>
                    <input class="form-control" placeholder="ชื่อโรคผิวหนังภาษาไทย" onChange={handleInput} id="nameThai" type="text" required/>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">ชื่อภาษาอังกฤษ</label>
                    <input class="form-control" placeholder="ชื่อโรคผิวหนังภาษาอังกฤษ" onChange={handleInput} id="nameEng" type="text" required/>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">ความเป็นมาของโรคผิวหนัง</label>
                    <textarea class="form-control" placeholder="ความเป็นมาของโรคผิวหนัง" onChange={handleInput} id="detail" cols="100" rows="3" required></textarea >                 
                 </div>

                 <div class="mb-3">
                    <label class="form-label">สาเหตุการเกิดโรคผิวหนัง</label>
                    <textarea class="form-control" placeholder="สาเหตุการเกิดโรคผิวหนัง" onChange={handleInput} id="cause" cols="100" rows="3" required></textarea>                 
                 </div>

                 <div class="mb-3">
                    <label class="form-label">การป้องกันการเกิดโรคผิวหนัง</label>
                    <textarea class="form-control" placeholder="การป้องกันการเกิดโรคผิวหนัง" onChange={handleInput} id="protect" cols="100" rows="3" required></textarea>                 
                 </div>

                 <div class="mb-3">
                    <label class="form-label">อาการของโรคผิวหนัง</label>
                    <textarea class="form-control" placeholder="อาการของโรคผิวหนัง" onChange={handleInput} id="symptom" cols="100" rows="3" required></textarea>                 
                 </div>

                 <div class="mb-3">
                    <label class="form-label">วิธีการรักษาโรคผิวหนัง</label>
                    <textarea class="form-control" placeholder="วิธีการรักษาโรคผิวหนัง" onChange={handleInput} id="therapy" cols="100" rows="3" required></textarea>                 
                 </div>
                 
                 <div class="mb-3">
                    <label class="form-label">ยาที่ใช้ในการรักษา</label>
                    <textarea class="form-control" placeholder="ยาที่ใช้ในการรักษา" onChange={handleInput} id="medical" cols="100" rows="3" required></textarea>                 
                 </div>

                 <div class="mb-3">
                    <label class="form-label">เเหล่งที่มา</label>
                    <textarea class="form-control" placeholder="เเหล่งที่มา1,เเหล่งที่มา2" onChange={handleInput} id="refskin" cols="100" rows="3" required></textarea>                 
                 </div>


                 <button disabled={per !== null && per < 100} type="submit" className="btn btn-success">
                  เพิ่มโรคผิวหนัง
                  </button>
                </div>
                    </form>
         
        </div>
      </div>
    </div>
  );
};

export default AddSkin;

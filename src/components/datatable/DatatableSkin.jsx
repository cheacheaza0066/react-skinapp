import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { SkinColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  
} from "firebase/firestore";
import {  db } from "../../firebase";
import {  deleteUser,} from "firebase/auth";
// import userModel from "../../components/model/userModel";






const DatatableSkin = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
 


  useEffect(() => {
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //     });
    //     setData(list);
    //     console.log(list);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();

    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "Skin"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);
  const authDelete = async(id) =>{
    console.log("delete auth")
    if (window.confirm("คุณเเน่ใจนะว่าจะลบผู้ดูเเลระบบคนนี้")) {
      try {
        await deleteUser(id);
        // console.log(id);
      } catch (error) {
              console.log("err");
      }
    
      setData(data.filter((item) => item.id !== id));
    }
  }

  const handleDelete = async (id) => {
    // try {
    //   await deleteDoc(doc(db, "users", id));
    //   setData(data.filter((item) => item.id !== id));
    // } catch (err) {
    //   console.log(err);
    // }

    if (window.confirm("คุณเเน่ใจนะว่าจะลบโรคผิวหนัง")) {
      try {
        // await 
        await deleteDoc(doc(db, "Skin", id));
        // console.log(id);
      } catch (error) {
              console.log("err");
      }
      setData(data.filter((item) => item.id !== id));
    }
  };
  

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button className="btn btn-info" onClick={()=> navigate(`/skin-diseases/view/${params.id}`)}>
              ดูข้อมูล
            </button>
            <button className="btn btn-warning" onClick={()=> navigate(`/skin-diseases/update/${params.id}`)}>
              update
            </button>
            <div className="btn btn-danger"  onClick={() => handleDelete(params.row.id)}>
              ลบ
            </div>
            
            
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <b>โรคผิวหนัง</b>
        
        <Link to="/skin-diseases/addSkin" className="btn btn-success">
          + เพิ่มโรคผิวหนัง
          {/* <button>+ เพิ่มผู้ดูเเลระบบ</button> */}
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={SkinColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableSkin;

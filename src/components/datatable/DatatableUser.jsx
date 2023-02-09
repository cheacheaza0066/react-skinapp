import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { getAuth, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { Button, Card } from "semantic-ui-react";
import { async } from "@firebase/util";
import { Password } from "@mui/icons-material";
// import userModel from "../../components/model/userModel";






const DatatableUser = () => {
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
      collection(db, "users"),
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
        console.log(id);
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

    if (window.confirm("คุณเเน่ใจนะว่าจะลบผู้ดูเเลระบบคนนี้")) {
      try {
        // await 
        await deleteDoc(doc(db, "users", id));
        console.log(id);
      } catch (error) {
              console.log("err");
      }
      setData(data.filter((item) => item.id !== id));
    }
  };
  
  console.log(data)

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            
            
            <button className="btn btn-info" onClick={()=> navigate(`/users/view/${params.id}`)}>
              ดูข้อมูล
            </button>
            
            <button className="btn btn-warning" onClick={()=> navigate(`/users/update/${params.id}`)}>
              เเก้ไข
            </button>

  
            
            {/* <div className="btn btn-danger"  onClick={() => handleDelete(params.row.id)}>
              ลบ
            </div> */}
            
            
          </div>
        );
      },
    },
  ];
  
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <b>ผู้ดูเเลระบบ</b>
       
        <Link to="/users/AddUser" className="btn btn-success">
          <b>+ เพิ่มผู้ดูเเลระบบ</b>
          {/* <button>+ เพิ่มผู้ดูเเลระบบ</button> */}
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableUser;

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
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";

const Datatable = () => {
  const [data, setData] = useState([]);
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

  const handleDelete = async (id) => {
    // try {
    //   await deleteDoc(doc(db, "users", id));
    //   setData(data.filter((item) => item.id !== id));
    // } catch (err) {
    //   console.log(err);
    // }
    if (window.confirm("คุณเเน่ใจนะว่าจะลบผู้ดูเเลระบบคนนี้")) {
      await deleteDoc(doc(db, "users", id));
      getAuth()
      .deleteUser(id)
      .then(() => {
        console.log('Successfully deleted user');
      })
      .catch((error) => {
        console.log('Error deleting user:', error);
      });
      setData(data.filter((item) => item.id !== id));
    
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button onClick={()=> navigate(`/users/view/${params.id}`)}>
              ดูข้อมูล
            </button>
            
            <button onClick={()=> navigate(`/users/update/${params.id}`)}>
              update
            </button>
            <div className="deleteButton"  onClick={() => handleDelete(params.row.id)}>
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
        <b>ผู้ดูเเลระบบ</b>
        
        <Link to="/users/new" className="link">
          + เพิ่มผู้ดูเเลระบบ
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

export default Datatable;

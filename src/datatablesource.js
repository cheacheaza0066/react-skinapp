export const userColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "displayName",
    headerName: "ชื่อ-นามสกุล",
    width: 270,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.displayName}
        </div>
      );
    },
  },
  
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "phone",
    headerName: "เบอร์โทรศัพท์",
    width: 150,
  },
  {
    field: "address",
    headerName: "ที่อยู่",
    width: 200,
  },
 
];


export const SkinColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "nameThai",
    headerName: "ชื่อโรคผิวหนัง",
    width: 270,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.nameThai},{params.row.nameEng}
        </div>
      );
    },
  },
  {
    field: "detail",
    headerName: "รายละเอียด",
    width: 200,
  },
  // {
  //   field: "address",
  //   headerName: "ที่อยู่",
  //   width: 200,
  // },
 
];




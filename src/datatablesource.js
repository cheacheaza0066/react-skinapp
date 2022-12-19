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
    width: 350,
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
    headerName: "ความเป็นมา",
    width: 200,
  },
  // {
  //   field: "cause",
  //   headerName: "สาเหตุการเกิดโรคผิวหนัง",
  //   width: 110,
  // },
  // {
  //   field: "protect",
  //   headerName: "การป้องกันการเกิดโรค",
  //   width: 110,
  // },
  // {
  //   field: "symptom",
  //   headerName: "อาการของโรค",
  //   width: 110,
  // },
  {
    field: "therapy",
    headerName: "วิธีการรักษาโรค",
    width: 200,
  },
  {
    field: "medical",
    headerName: "ยาที่ใช้ในการรักษาโรค",
    width: 200,
  },
  // {
  //   field: "address",
  //   headerName: "ที่อยู่",
  //   width: 200,
  // },
 
];




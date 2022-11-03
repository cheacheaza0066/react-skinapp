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




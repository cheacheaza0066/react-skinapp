import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
// import Navbar from "../../components/navbar/Navbar"
import DatatableSkin from "../../components/datatable/DatatableSkin"

const ListSkin = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        {/* <Navbar/> */}
        <DatatableSkin/>
      </div>
    </div>
  )
}

export default ListSkin
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import DatatableUser from "../../components/datatable/DatatableUser";


const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        {/* <Navbar /> */}
        {/* <div className="widgets">
          <Widget type="user" />
          <Widget type="product" />
         
        </div> */}
                  <DatatableUser/>

       
      </div>
    </div>
  );
};

export default Home;

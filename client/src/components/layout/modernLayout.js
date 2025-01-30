import Views from "../../views";
import Navbar from "../template/navbar";
import Sidebar from "../template/sidebar";

const ModernLayout = (props) => {
  return (
    <div className="app-layout-modern flex flex-auto flex-col">
      <div className="flex flex-auto min-w-0 ">
        <Sidebar />
        <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full bg-white">
          <Navbar />
          <div className="m-2 p-2 bg-white">
            <Views {...props} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernLayout;

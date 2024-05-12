import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
interface userProps {
    userName:string
}
function Appbar({userName}:userProps) {
    const navigate = useNavigate();
    const onLogOut = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userName")
      navigate("/signup");
    };
  return (
    <>
      <div className="bg-white flex justify-between m-auto px-12 p-3 items-center border-b-2 border-gray-400 top-0 sticky z-[999px]">
        <div className="font-bold text-lg">
          <Link to="/blog">Medium</Link>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="bg-gray-900 text-white rounded-full h-8 w-8 flex justify-center items-center">
            {userName[0]?.toUpperCase()}
          </div>
          <button onClick={onLogOut} className="bg-[rgb(24,24,27)] p-2 mx-2 text-sm text-white rounded-md hover:bg-gray-950">Log out</button>
        </div>
      </div>
    </>
  );
}

export default Appbar;

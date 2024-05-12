import { Link } from "react-router-dom";
// export function Layout() {
//   return (
//     <>
//       <Link to="/signup">Singup</Link>
//       <Link to="/signup">Singin</Link>
//     </>
//   );
// }

export function Layout() {
  return (
    <>
      <div className="border-b border-black">
        <div className="flex flex-col m-auto max-w-[80vw]">
          <div className=" bg-white flex justify-between items-center p-4">
            <div className="font-serif font-bold text-xl lg:text-3xl md:text-3xl">
              Medium
            </div>
            <div className="flex flex-row justify-center items-center">
              <button className="text-md cursor-pointer font-medium lg:text-xl mx-2 md:text-xl md:mx-2">
                <Link to="/signin">Signin</Link>
              </button>
              <button className="ml-3 bg-[rgb(25,25,25)] px-2 py-1 hover:bg-gray-950 cursor-pointer text-white text-[13px] w-18 rounded-full lg:w-32 lg:text-lg lg:p-2 d:w-32 md:text-lg md:p-2">
                <Link to="/signup">Get Started</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-start bg-[rgb(243,244,246)] h-[89vh] lg:justify-center lg:items-center">
        <div className="px-6 space-y-6 lg:space-y-7 lg:flex lg:flex-col lg:justify-center lg:items-center">
          <p className="text-7xl font-[sohne] lg:text-9xl lg:text-center">
            Stay Curious.
          </p>
          <p className="font-[gt-super] text-2xl lg:text-4xl">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          <button className="bg-[rgb(25,25,25)] mt-3 text-white py-2 rounded-full w-48 hover:bg-gray-950">
            <Link to="/signup">Start Reading</Link>
          </button>
        </div>
      </div>
    </>
  );
}

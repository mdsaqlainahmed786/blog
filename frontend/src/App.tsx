import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/signup";
import { Signin } from "./pages/signin";
import {BlogwithID} from "./pages/[blogId]"
import { CreateBlog } from "./pages/createblog";
import { Blog } from "./pages/blog";
import { Layout } from "./pages/layout";
 function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Layout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/:blogId" element={<BlogwithID/>} />
          <Route path="/createblog" element={<CreateBlog/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App
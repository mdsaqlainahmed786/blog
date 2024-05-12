import Appbar from "../components/Appbar";
import { BlogCreateComp } from "../components/BlogCreateComp";
export function CreateBlog() {
  const name = localStorage.getItem("userName");
  return (
    <>
      <Appbar userName={name} />
      <BlogCreateComp />
    </>
  );
}

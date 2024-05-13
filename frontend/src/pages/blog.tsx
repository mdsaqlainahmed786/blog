import BlogComp from "../components/BlogComp";
import Appbar from "../components/Appbar";
import React from "react";
import { format } from "date-fns";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BlogCreateBtn } from "../components/BlogCreateBtn";
import { BlogSkeleton } from "../components/BlogSkeleton";
type Author={
  name: string
}

interface Blog{
  title:string
  content: string
  id: string
  author:Author
  postedAt: string
}

export function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const blogsFetcher = useCallback(async () => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName")!;
    setUsername(name);
    try {
      // console.log(token)
      const response = await axios.get(
        "https://backend.riyanahmed1703.workers.dev/api/v1/blog/getall/blogs",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const sortedBlogs = response.data.blogs.sort(
        (a: { postedAt: Date }, b: { postedAt: Date }) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()

      );
      setBlogs(sortedBlogs);

      console.log(response.data.blogs);
      setBlogs(response.data.blogs);
    } catch (err) {
      alert("something went wrong!!");
      console.error(err);
    }
  }, []);
  useEffect(() => {
    blogsFetcher();
  }, [blogsFetcher]);
  return (
    <>
      <Appbar userName={username} />
      {blogs.length !== 0 ? (
        blogs.map((blog: Blog) => (
          <React.Fragment key={blog.id}>
            <BlogComp
              blogTitle={
                blog.title.length > 60
                  ? `${blog.title.slice(0, 60)}...`
                  : blog.title
              }
              blogId={blog.id}
              blogDesc={
                blog.content.length > 100
                  ? `${blog.content.slice(0, 100)}...`
                  : blog.content
              }
              createdAt={format(new Date(blog.postedAt), "dd MMM yyyy")}
              author={blog.author.name} // Assuming `name` is the property containing the author's name
            />
          </React.Fragment>
        ))
      ) : (
       <BlogSkeleton/>
      )}
      <BlogCreateBtn />
    </>
  );
}

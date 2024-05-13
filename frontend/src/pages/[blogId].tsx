import { useParams } from "react-router-dom";
import Appbar from "../components/Appbar";
import { useState, useEffect, useCallback } from "react";
import SingleBlog from "../components/SingleBlog";
import { format } from "date-fns";
import axios from "axios";
import { SingleBlogSkelet } from "../components/SingleBlogSkelet";
type Author = {
  name: string;
};
interface BlogProps {
  title: string;
  author: Author;
  postedAt: Date;
  content: string;
}
export function BlogwithID() {
  const [blog, setBlog] = useState<BlogProps | null>(null);
  const { blogId } = useParams<{ blogId: string }>();
  const userName = localStorage.getItem("userName");
  const blogFetcher = useCallback(async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://backend.riyanahmed1703.workers.dev/api/v1/blog/get/${blogId}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log(response.data.post);
    setBlog(response.data.post);
  }, []);
  useEffect(() => {
    blogFetcher();
  }, [blogFetcher]);
  return (
    <>
      <div>
        <Appbar userName={userName} />
        {blog ? (
          <SingleBlog
            title={blog.title}
            publisher={blog.author.name}
            createdAt={format(new Date(blog.postedAt), "dd MMM yyyy")}
            content={blog.content}
          />
        ) : (
          <>
            {/* <div className="flex justify-center items-center h-[100vh]"> */}
            <SingleBlogSkelet/>
          </>
        )}
      </div>
    </>
  );
}

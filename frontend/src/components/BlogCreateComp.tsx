import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export function BlogCreateComp() {
  const navigate = useNavigate()
  const [blog, setBlog] = useState({
    title: "",
    content: "",
  });

  const onSubmitBlog = async () => {
    const token = localStorage.getItem("token");
    if(!blog.title && !blog.content) return alert("The above fields cannot be empty!")
    try {
      const response = await axios.post(
        "https://backend.riyanahmed1703.workers.dev/api/v1/blog/add",
        {
          title:blog.title,
          content:blog.content
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      alert("Your blog has been successfully posted!")
      navigate("/blog")
      console.log(response.data);
    } catch (error) {
      alert("Something went wrong, try again later!")
      console.error("Error creating blog:", error);
    }
  };
  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-3xl flex justify-center font-bold mb-7">
        Publish your Blog
      </h1>
      <input
        type="text"
        className="border-b-2 border-gray-300 w-full mb-4 px-2 py-1 outline-none text-4xl font-serif"
        placeholder="Title"
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
      />
      <textarea
        className=" w-full h-64 p-2 mb-4 resize-none text-md font-serif outline-none"
        placeholder="Write your story..."
        onChange={(e) => setBlog({ ...blog, content: e.target.value })}
      ></textarea>
      <button
        onClick={onSubmitBlog}
        className="bg-[rgb(24,24,27)] hover:bg-gray-950 text-white py-2 px-4 rounded-md"
      >
        Publish
      </button>
    </div>
  );
}

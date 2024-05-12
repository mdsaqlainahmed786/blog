import { Link } from "react-router-dom";
interface BlogProps {
  author: string;
  createdAt: string;
  blogTitle: string;
  blogDesc: string;
  blogId:string;
}
export function BlogComp({blogId, author, createdAt, blogTitle, blogDesc }: BlogProps) {
  return (
    <>
      <Link to={`/${blogId}`}>
      <div className="flex justify-start items-start mt-9 m-auto max-w-[80vw] lg:w-[40vw] cursor-pointer">
        <div className="flex flex-col justify-start items-start space-y-2">
          <div className="flex flex-row justify-center items-center">
            <div className="bg-gray-900 text-white rounded-full h-8 w-8 flex justify-center items-center">
            {author[0]?.toUpperCase()}
            </div>
            <div className="flex mx-2 font-semibold">{author.charAt(0).toUpperCase() + author.slice(1)}. </div>
            <div className="text-gray-400 text-sm">{createdAt}</div>
          </div>
          <div className="flex font-serif text-2xl hover:underline">{blogTitle}</div>
          <div className="flex text-md font-serif text-gray-600">{blogDesc}</div>
          <div className="text-gray-400">2 minute(s) read</div>
        </div>
      </div>
      </Link>
      {/* Moved hr outside the parent div for better separation */}
      <hr className="mx-10 flex justify-center items-center h-1 mt-4 lg:mx-[450px]" />
    </>
  );
}

export default BlogComp;

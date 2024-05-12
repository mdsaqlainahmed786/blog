interface SingleBlogProps {
  title: string;
  publisher: string;
  createdAt: string;
  content: string;
}
function SingleBlog({ title, publisher, createdAt, content }: SingleBlogProps) {
  return (
    <div className="flex flex-col justify-start items-start m-auto max-w-[90vw] space-y-4 lg:max-w-[40vw]">
      <div className="flex justify-center items-center mt-7">
        <p className="font-serif text-4xl leading-[2.9rem]">{title}</p>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="bg-gray-900 text-white rounded-full h-10 w-10 flex justify-center items-center">
          {publisher.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col mx-2 font-semibold">
          {publisher.charAt(0).toUpperCase() + publisher.slice(1)}
          <div className="text-gray-400 text-sm">Published at {createdAt}</div>
        </div>
      </div>
      <div className="text-lg font-serif">
        <span className="font-extrabold text-9xl">{content[0]}</span>
        <span className=""> {content.slice(1)}</span>
      </div>
    </div>
  );
}

export default SingleBlog;

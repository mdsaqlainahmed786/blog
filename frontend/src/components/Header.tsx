import { Link } from "react-router-dom";

// header title of the signup and signin page

interface HeaderProps {
    title: string;
    text: string;
    route: string;
  }
export function Header({ title, text, route }: HeaderProps) {
  return (
    <>
      <div className="flex flex-col pb-8 justify-center text-center space-y-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        <h1 className="text-gray-500 text-lg font-medium">{text}<Link className="hover:underline" to={route==="Login"?"/signin":"/signup"}> {route}</Link></h1>
      </div>
    </>
  );
}

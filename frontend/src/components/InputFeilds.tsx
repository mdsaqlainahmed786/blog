import React from "react"; // Import React to use JSX

interface InputFieldProps {
  title: string;
  typeOf: string;
  placeHolder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | undefined; // Specify the type of the event
}

export function InputFeild({
  title,
  typeOf,
  placeHolder,
  onChange,
  value,
}: InputFieldProps) {
  return (
    <>
      <div className="flex flex-col space-y-1 p-2">
        <p className="font-bold text-md">{title}</p>
        <input
          className="border border-gray-400 outline-none p-2 w-80 rounded-md"
          type={typeOf}
          placeholder={placeHolder}
          onChange={onChange} // Call the onChange function passed from the parent
          value={value}
          required
        />
      </div>
    </>
  );
}

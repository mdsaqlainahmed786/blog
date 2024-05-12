interface Auth {
  btnLogo:string
}

export function AuthBtn({btnLogo}: Auth) {
  return (
    <button className="w-80 ml-[7px] p-2 mt-4 text-white rounded-md hover:bg-gray-950 bg-[rgb(24,24,27)]">{btnLogo}</button>
  )
}

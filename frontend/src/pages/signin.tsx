import { AuthBtn } from "../components/AuthBtn";
import { Header } from "../components/Header";
import { InputFeild } from "../components/InputFeilds";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export function Signin() {
  const navigate = useNavigate();
  const [userInput, setUserInputs] = useState({
    email: "",
    password: "",
  });
  const onSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend.riyanahmed1703.workers.dev/api/v1/user/signin",
        userInput
      );
      //console.log(response.data.name)
      const token = response.data.jwt;
      const username = response.data.name
      localStorage.setItem("token", `Bearer ${token}`);
      localStorage.setItem("userName", username)
      navigate("/blog");
    } catch (error) {
        alert("Error!.. Check your credentials or try again later!...")
      setUserInputs({
        email:"",
        password:""
      })
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="flex justify-center items-center flex-col w-full h-[600px] lg:h-[100vh]">
          <Header
            title="Sign into your account"
            text="Don't have a account?"
            route={"Signup"}
          />
          <form onSubmit={onSignInSubmit}>
            <InputFeild
              title="Email"
              typeOf="email"
              placeHolder="Enter your email"
              onChange={(e) =>
                setUserInputs({ ...userInput, email: e.target.value })
              }
              value={userInput.email}
            />
            <InputFeild
              title="Password"
              typeOf="password"
              placeHolder="Enter your password"
              onChange={(e) =>
                setUserInputs({ ...userInput, password: e.target.value })
              }
              value={userInput.password}
            />
            <AuthBtn btnLogo="SignIn" />
          </form>
        </div>
        <div className="bg-[rgb(243,244,246)] w-full h-[500px] lg:h-[100vh] flex justify-center items-center">
          <div className="p-16 space-y-3">
            <p className="font-bold text-3xl">
              "The customer service I received was exceptional. The support team
              went above and beyond to address my concerns."
            </p>
            <div className="flex flex-row pt-3 items-center">
              <img
                className="h-11 w-10 rounded-full mr-2"
                src="https://m.foolcdn.com/media/dubs/images/original_imageshttpsg.foolcdn.comeditorialimag.width-880_wkaciBt.jpg"
                alt="this is jpg"
              />
              <div className="space-y-0">
                <p className="font-bold">Jules Winnfield</p>
                <p className="font-medium text-sm text-gray-500">
                  CEO, Acme Inc
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

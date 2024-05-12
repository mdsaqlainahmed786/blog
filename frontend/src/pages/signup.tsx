import { AuthBtn } from "../components/AuthBtn";
import { Header } from "../components/Header";
import { InputFeild } from "../components/InputFeilds";
import { useState } from "react";
import { SignupInput } from "@saqlain-ahmed/medium-common-zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function Signup() {
  const navigate = useNavigate();
  const [userInputs, setUserInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  const onSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend.riyanahmed1703.workers.dev/api/v1/user/signup",
        userInputs
      );
      const token = response.data.jwt;
      const userNamefromJwt = response.data.name
      localStorage.setItem("token", `Bearer ${token}`);
      localStorage.setItem("userName", userNamefromJwt)
      navigate("/blog");
    } catch (error) {
      alert("Error!.. Check your credentials or try again later!...");
      setUserInputs({
        name: "",
        email: "",
        password: "",
      });
      console.error(error);
    }
    // console.log(userInputs.email, userInputs.name, userInputs.password);
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="flex justify-center items-center flex-col w-full h-[600px] lg:h-[100vh]">
          <Header
            title="Create an account"
            text="Already have an account?"
            route={"Login"}
          />
          <form onSubmit={onSignupSubmit}>
            <InputFeild
              title="Username"
              typeOf="text"
              placeHolder="Enter your username"
              value={userInputs.name} // Pass the value of the input field
              onChange={(e) =>
                setUserInputs({ ...userInputs, name: e.target.value })
              }
            />
            <InputFeild
              title="Email"
              typeOf="email"
              placeHolder="Enter your email"
              value={userInputs.email} // Pass the value of the input field
              onChange={(e) =>
                setUserInputs({ ...userInputs, email: e.target.value })
              }
            />
            <InputFeild
              title="Password"
              typeOf="password"
              placeHolder="Enter your password"
              value={userInputs.password} // Pass the value of the input field
              onChange={(e) =>
                setUserInputs({ ...userInputs, password: e.target.value })
              }
            />

            <AuthBtn btnLogo="SignUp" />
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

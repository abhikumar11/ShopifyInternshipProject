import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/AuthAction";
import { toast } from "react-toastify";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [frmData, setFrmData] = useState({ emailid: "", password: "" });

  const { user, message, error } = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();
  const navigate=useNavigate();

  useEffect(() => {
    if (user) {
      toast.success(message);
      navigate("/vendor/dashboard")
    } else {
      toast.error(error);
    }
  }, [user, error, message]);
  const handleInput = (e) => {
    setFrmData({ ...frmData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(frmData));
  };
  return (
    <div className="min-h-screen bg-[#f6f6f7] flex flex-col items-center pt-12 px-4 font-sans text-[#202223]">
      <div className="mb-8 w-[120px] h-[35px] bg-slate-200 rounded" />
      <div className="w-full max-w-[460px] bg-white p-10 rounded-lg border border-[#e1e3e5] shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
        <h1 className="text-2xl font-semibold mb-2 text-center">Login</h1>
        <p className="text-sm text-[#6d7175] text-center mb-8">
          Continue to your Account
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              className="w-full h-[38px] px-3 py-2 border border-[#babfc3] rounded outline-none text-sm transition-all focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/10"
              type="email"
              name="emailid"
              placeholder="Enter Email"
              onChange={handleInput}
              required
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium">Password</label>
              <a href="#" className="text-xs text-[#008060] hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleInput}
              className="w-full h-[38px] px-3 py-2 border border-[#babfc3] rounded outline-none text-sm transition-all focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/10"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full h-10 bg-[#008060] border border-[#005e46] text-white rounded font-semibold text-sm cursor-pointer transition-colors hover:bg-[#006e52] mt-2 hover:cursor-pointer"
          >
            Log in
          </button>
        </form>
        <div className="relative text-center my-8 before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-full before:h-[1px] before:bg-[#e1e3e5] before:z-[1]">
          <span className="bg-white px-3 text-[13px] text-[#6d7175] relative z-[2]">
            New to Site?
          </span>
        </div>
        <a
          href="/register"
          className="block w-full text-center py-2 border border-[#babfc3] rounded font-semibold text-sm text-[#202223] hover:bg-[#f6f6f7] transition-colors"
        >
          Create account
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

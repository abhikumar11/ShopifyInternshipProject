import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "../redux/actions/AuthAction";

const Register = ({ defaultRole }) => {
  const dispatch = useDispatch();
  const { loading, success, error, message } = useSelector((state) => state.userAuth
  );
  console.log({ loading, success, error, message })

  const { role: urlRole } = useParams();
  const currentRole = urlRole || defaultRole || "buyer";

  const [frmData, setFrmData] = useState({
    name: "",
    emailid: "",
    password: "",
  });

  useEffect(() => {
    if (success && message) {
      toast.success(message);
    
    }

    if (error) {
      toast.error(error);
    }
  }, [success, error, message, dispatch]);

  const handleInput = (e) => {
    setFrmData({ ...frmData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      registerUser({
        ...frmData,
        role: currentRole,
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#f6f6f7] flex flex-col items-center text-[#202223] font-sans pt-6 px-4">
      <div className="mb-8 w-[120px] h-[35px] bg-slate-200 rounded" />

      <div className="w-full max-w-[460px] mt-4 bg-white p-10 rounded-lg border border-[#e1e3e5] shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
   
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={frmData.name}
              onChange={handleInput}
              placeholder="Enter Name"
              className="w-full h-[38px] px-3 border border-[#babfc3] rounded outline-none text-sm focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/10"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="emailid"
              value={frmData.emailid}
              onChange={handleInput}
              placeholder="example@email.com"
              className="w-full h-[38px] px-3 border border-[#babfc3] rounded outline-none text-sm focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/10"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={frmData.password}
              onChange={handleInput}
              placeholder="Create a password"
              className="w-full h-[38px] px-3 border border-[#babfc3] rounded outline-none text-sm focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/10"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-10 mt-2 text-white rounded font-semibold text-sm transition-all hover:cursor-pointer
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#008060] hover:bg-[#006e52]"
              }`}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-[12px] text-[#6d7175] mt-6 text-center">
          By clicking "Create Account", you agree to the{" "}
          <span className="text-[#008060] cursor-pointer hover:underline">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-[#008060] cursor-pointer hover:underline">
            Privacy Policy
          </span>
          .
        </p>

        <div className="relative text-center my-8 before:absolute before:top-1/2 before:left-0 before:w-full before:h-[1px] before:bg-[#e1e3e5]">
          <span className="bg-white px-3 text-[13px] text-[#6d7175] relative">
            Already have an Account?
          </span>
        </div>

        <Link to="/login">
          <button className="w-full h-10 bg-white border border-[#babfc3] rounded font-semibold text-sm hover:bg-[#f6f6f7] hover:cursor-pointer">
            Log in
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default Register;

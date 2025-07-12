import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actSignInAuth from "@/store/authSlice/actSignInAuth";
import { useEffect } from "react";
import { resetUI } from "@/store/authSlice/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(actSignInAuth(data))
      .unwrap()
      .then(() => navigate("/"));
  };

  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);
  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-[400px] mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg mb-12">
      <h2 className="text-center mb-7 text-2xl font-semibold text-gray-800">
        Login
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label className="block mb-1.5 font-medium text-gray-700">
            Username
          </label>
          <p className="text-xs text-gray-500 mb-2">
            For test: <span className="font-semibold">emilys</span>
          </p>
          <input
            value="emilys"
            type="text"
            {...register("username", { required: "Username is required" })}
            className={`w-full px-3 py-2 border rounded-md text-base outline-none transition-colors ${
              errors.username
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-teal-500"
            }`}
            placeholder="Enter your username"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="mb-6">
          <label className="block mb-1.5 font-medium text-gray-700">
            Password
          </label>
          <p className="text-xs text-gray-500 mb-2">
            For test: <span className="font-semibold">emilyspass</span>
          </p>
          <input
            value="emilyspass"
            type="password"
            {...register("password", { required: "Password is required" })}
            className={`w-full px-3 py-2 border rounded-md text-base outline-none transition-colors ${
              errors.password
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-teal-500"
            }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg mt-4 transition-colors disabled:opacity-60 cursor-pointer"
        >
          {loading === "pending" ? (
            <div className="flex items-center justify-center ">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </div>
          ) : (
            "Login"
          )}
        </button>
        {error && (
          <div className="alert alert-danger mt-2" role="alert">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;

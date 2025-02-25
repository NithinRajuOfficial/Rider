import { FcGoogle } from "react-icons/fc";
import CustomInputTag from "../components/Input";
import useFormHandler from "../hooks/useFormHandler";
import { userLoginValidationSchema } from "../utils/yupValidations";
import { Link } from "react-router-dom";
import AnimatedGridPattern from "../components/AnimatedGridLayout";

const UserLogin = () => {
  const { register, handleSubmit, errors, reset } = useFormHandler(
    userLoginValidationSchema
  );

  const onSubmit = (data) => {
    console.log(data)
    reset();
    // Handle login logic here
  };

  return (
    <article className="h-screen max-w-md mx-auto px-5 md:p-0 flex items-center justify-center">
      <div className="hidden md:block absolute inset-0 z-0">
        <AnimatedGridPattern
          columns={70}
          rows={30}
          cellSize={25}
          gap={1}
          backgroundColor="#f8fafc"
          lineColor="#e2e8f0"
          highlightColor="#3b82f6"
        />
      </div>
      <article className="relative w-full p-6 bg-white rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input */}
          <CustomInputTag
            type="email"
            label="Email"
            registering={register("email")}
            errors={errors.email}
          />

          {/* Password Input */}
          <CustomInputTag
            type="password"
            label="Password"
            registering={register("password")}
            errors={errors.password}
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200 hover:cursor-pointer"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="text-gray-600">Don&apos;t have an account? </span>
            <Link
              to={"/signup"}
              className="text-blue-600 hover:text-blue-800 hover:cursor-pointer"
            >
              Sign Up
            </Link>
          </div>

          {/* Continue with Google */}
          <button
            type="button"
            className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition duration-200 hover:cursor-pointer"
          >
            <FcGoogle className="text-xl" />
            <span>Continue with Google</span>
          </button>

          {/* Sign in as Captain */}
          <Link
            to={"/captain-login"}
            className="w-full inline-block text-center py-2 px-4 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-md transition duration-200 hover:cursor-pointer"
          >
            Sign in as Captain
          </Link>
        </form>
      </article>
    </article>
  );
};

export default UserLogin;

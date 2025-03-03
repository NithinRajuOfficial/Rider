import { FcGoogle } from "react-icons/fc";
import CustomInputTag from "../components/Input";
import useFormHandler from "../hooks/useFormHandler";
import { captainSignupValidationSchema } from "../utils/yupValidations";
import { Link, useNavigate } from "react-router-dom";
import AnimatedGridPattern from "../components/AnimatedGridLayout";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { showErrorToast, showSuccessToast } from "../utils/toastNotification";
import CustomSelect from "../components/Select";
import { setCaptain } from "../redux/authSliceCaptain";

const CaptainSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, errors, reset } = useFormHandler(
    captainSignupValidationSchema
  );

  const onSubmit = async (data) => {
    try {
      const {
        data: { success, message, userData, token },
      } = await axiosInstance.post("/captains/signup", data);
      console.log(success, message, userData, token);
      if (success) {
        dispatch(setCaptain({ user: userData, token: token }));
        navigate("/captain-home");
        showSuccessToast(message);
      }
    } catch (error) {
      showErrorToast("Signup Failed, Please retry later..");
      if (import.meta.env.MODE === "development") {
        console.error("Signup Error: ", error);
      }
    } finally {
      reset();
    }
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

      <article className="relative w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome To The Family
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex gap-4">
            <CustomInputTag
              type="string"
              label="First Name"
              registering={register("firstName")}
              errors={errors.firstName}
            />
            <CustomInputTag
              type="string"
              label="Last Name"
              registering={register("lastName")}
              errors={errors.lastName}
            />
          </div>

          <div className="flex gap-4">
            <CustomInputTag
              type="email"
              label="Email"
              registering={register("email")}
              errors={errors.email}
            />
            <CustomInputTag
              type="password"
              label="Password"
              registering={register("password")}
              errors={errors.password}
            />
          </div>

          <div className="flex gap-4">
            <CustomInputTag
              type="string"
              label="Vehicle Color"
              registering={register("vehicleColor")}
              errors={errors.vehicleColor}
            />
            <CustomInputTag
              type="string"
              label="Vehicle Plate"
              registering={register("vehiclePlate")}
              errors={errors.vehiclePlate}
            />
          </div>

          <div className="flex gap-4">
            <CustomInputTag
              type="string"
              label="Vehicle Capacity"
              registering={register("vehicleCapacity")}
              errors={errors.vehicleCapacity}
            />
            <CustomSelect
              label="Vehicle Type"
              options={[
                { value: "car", label: "Car" },
                { value: "auto", label: "Auto" },
                { value: "motorcycle", label: "Motorcycle" },
              ]}
              registering={register("vehicleType")}
              errors={errors.vehicleType}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200 hover:cursor-pointer"
          >
            Signup
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="text-center">
            <span className="text-gray-600">Already part of the fam? </span>
            <Link
              to={"/captain-login"}
              className="text-blue-600 hover:text-blue-800"
            >
              Login
            </Link>
          </div>

          <button
            type="button"
            className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition duration-200"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>

          <Link
            to={"/login"}
            className="w-full inline-block text-center py-2 px-4 bg-gray-800 hover:bg-gray-900 text-white rounded-md transition duration-200"
          >
            Sign in as User
          </Link>
        </form>
      </article>
    </article>
  );
};

export default CaptainSignup;

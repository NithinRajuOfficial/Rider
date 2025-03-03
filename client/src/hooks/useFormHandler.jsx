import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const useFormHandler = (validationSchema) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({ resolver: yupResolver(validationSchema) });
  return { register, handleSubmit, errors, reset, control, setValue };
};

export default useFormHandler;

import { Input } from "@material-tailwind/react";

const InputField = ({ label,type, error, register, id, ...rest }) => (
  <div className="mb-4">
    <Input
    color="green"
    label={label}
    type={type}
    autoComplete="off"
    variant="outlined"
      id={id}
      {...register(id, { required: true })}
      className={`shadow appearance-none border ${
        error ? "border-red-500" : ""
      } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
      {...rest}
    />
    {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
  </div>
);

export default InputField;



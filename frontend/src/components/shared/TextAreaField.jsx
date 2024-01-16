import { Textarea } from "@material-tailwind/react";


const TextAreaField = ({ label, error, register, id, ...rest }) => (
  <div className="mb-4">
    <Textarea
      color="green"
      label={label}
      type="text"
      variant="outlined"
      id={id}
      {...register(id, { required: true })}
      className={`shadow appearance-none border ${
        error ? "border-red-500" : ""
      } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      {...rest}
    />
    {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
  </div>
);

export default TextAreaField;
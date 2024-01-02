import { Spinner as Spin } from "@material-tailwind/react";


const Spinner = () => {
    return (
      <div className="flex justify-center items-center mt-10">
        <Spin className="h-10 w-10" color="green" />
      </div>
    );
  };
  
  export default Spinner;
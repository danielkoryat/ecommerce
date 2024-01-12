import { useDispatch } from "react-redux";
import { setAlert } from "../app/alertSlice";

const useAlert = () => {
    const dispatch = useDispatch();

    const setAlertMessage = (type, message) => {
        dispatch(setAlert({ type, message }));
    };

    return setAlertMessage;
    
}

export default useAlert
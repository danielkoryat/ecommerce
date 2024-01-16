import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearAlert } from "../../app/alertSlice";
import PropTypes from "prop-types";
import { Alert as AlertComponent } from "@material-tailwind/react";

const Alert = () => {
  const { message, type, isOpen } = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, dispatch]);

  if (!isOpen) {
    return null;
  }

  const getColor = (alertType) => {
    switch (alertType) {
      case "success":
        return "green";
      case "error":
        return "red";
      case "info":
        return "blue";
      default:
        return "blue";
    }
  };

  const color = getColor(type);

  return (
    <AlertComponent
      open={isOpen}
      color={color}
      onClose={() => dispatch(clearAlert())}
    >
      {message}
    </AlertComponent>
  );
};

Alert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(["success", "error", "info"]),
};

export default Alert;

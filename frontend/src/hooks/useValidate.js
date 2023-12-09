import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../api/services/UserService"; // Adjust the import path as necessary

const useValidate = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const validateUser = async () => {
      try {
        await UserService.isAuthenticated();
        navigate("/");
      } catch (error) {
        navigate("/register");
      }
    };
    validateUser();
  }, [navigate]);

};
כ
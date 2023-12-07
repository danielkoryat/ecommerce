import apiClient from "../axios.js";
import { getErrorMessage } from "../../errors/errorHandler.js";

export const validateUser = async (username, password) => {
  const { data } = await apiClient.post("/auth/login", { username, password });
  return data;
};

export const createUser = async ({ username, email, password }) => {
  try {
    const response = await apiClient.post("/user/signup", {
      username,
      email,
      password,
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(getErrorMessage(response));
    }
  } catch (error) {
    throw new Error(getErrorMessage(error.response));
  }
};

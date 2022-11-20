import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_DEV_BASE_URL
    : process.env.REACT_APP_PROD_BASE_URL;

export const getCurrentUser = async () => {
  const user = JSON.parse(localStorage.getItem("kinogo-user"));

  if (user) {
    const { idToken, refreshToken } = user;
    const response = await axios.post(`${BASE_URL}/users/validate-session`, {
      idToken,
      refreshToken,
    });

    return response.data;
  }

  return { isValid: false };
};

export const signUp = async ({ email, displayName, password }) => {
  const response = await axios.post(`${BASE_URL}/users/sign-up`, {
    email,
    password,
    displayName,
  });

  return response.data;
};

export const signIn = async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/users/sign-in`, {
    email,
    password,
  });

  return response.data;
};

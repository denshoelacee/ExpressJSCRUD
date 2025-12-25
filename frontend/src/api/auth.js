import axios from "axios";


/** API CALLS  */
export const login = async (email, password) => {
  const res = await axios.post("http://localhost:5000/login", { email, password });
  return res.data;
};

export const register = async (userData) => {
  const res = await axios.post("http://localhost:5000/register", userData);
  return res.data;
};



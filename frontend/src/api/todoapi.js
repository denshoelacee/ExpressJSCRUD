import axios from "../utils/axiosInstance";

/**
 * 
 * @param {string} token
 * NO TOKEN, NO AUTHORIZATION
 */
const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

/**
 * API CALLS FOR TODOS
 */
export const fetchTodosApi = (token) =>
  axios.get("/getTodo", authHeader(token));

export const addTodoApi = (data, token) =>
  axios.post("/add", data, authHeader(token));

export const updateTodoApi = (id, data, token) =>
  axios.put(`/updatedetails/${id}`, data, authHeader(token));

export const deleteTodoApi = (id, token) =>
  axios.delete(`/deleteTodo/${id}`, authHeader(token));

export const markDoneApi = (id, token) =>
  axios.put(`/updatestatus/${id}`, {}, authHeader(token));


// PROFILE

export const fetchProfileApi = (token) =>
  axios.get("/profile", authHeader(token));

export const updateProfileApi = (id,data, token) =>
  axios.put(`/profileUpdate"/${id}`,data, authHeader(token));

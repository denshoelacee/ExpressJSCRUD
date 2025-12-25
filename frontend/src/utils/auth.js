// IF NO TOKEN, NO ACCESS
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; 
};

// LOG OUT FUNCTION
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/"; 
};

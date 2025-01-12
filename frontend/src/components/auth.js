export const isAuthenticated = () => {
    return localStorage.getItem("isLoggedIn") === "true";
  };
  
  export const isAdmin = () => {
    return isAuthenticated() && localStorage.getItem("userRole") === "admin";
  };
  
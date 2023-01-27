// import jwtDecode from "jwt-decode";

// const { useNavigate } = require("react-router-dom");

// const isAuthenticated = () => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     const { exp: expiration } = jwtDecode(token);
//     if (expiration * 1000 > new Date().getTime()) {
//       return true;
//     }
//     return false;
//   }
//   return false;
// };

// const redirectIfDisconnected = () => {
//   const navigate = useNavigate;
//   if (!isAuthenticated()) {
//     // j'envoi un toast
//     navigate("/");
//   }
// };

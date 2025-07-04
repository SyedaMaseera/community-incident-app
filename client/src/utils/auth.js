// client/src/utils/auth.js
import { jwtDecode } from 'jwt-decode';

export function getUserFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (e) {
    return null;
  }
}
export function removeToken() {
  localStorage.removeItem('token');
}

// export const getToken = () => {
//   return localStorage.getItem('token');
// };

// export const isLoggedIn = () => {
//   return !!getToken();
// };

// export const logout = () => {
//   localStorage.removeItem('token');
// };

// // ✅ Add this function
// export const getUserFromToken = () => {
//   const token = getToken();
//   if (!token) return null;

//   try {
//     const base64Payload = token.split('.')[1];
//     const payload = atob(base64Payload);
//     return JSON.parse(payload);
//   } catch (e) {
//     console.error("Invalid token", e);
//     return null;
//   }
// };

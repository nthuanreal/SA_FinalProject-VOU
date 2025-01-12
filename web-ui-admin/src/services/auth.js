export const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const saveToken = (token) => localStorage.setItem("jwt", token);
export const getToken = () => localStorage.getItem("jwt");
export const getRoleFromToken = () => {
  const token = getToken();
  if (!token) return null;

  const decoded = decodeToken(token);
  return decoded?.role || null;
};
export const getInfoFromToken = () => {
  const token = getToken();
  return token ? decodeToken(token) : null;
};
export const removeToken = () => localStorage.removeItem("jwt");

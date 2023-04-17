export const url = `https://fastapi-todos-be.onrender.com`;

export const CallToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

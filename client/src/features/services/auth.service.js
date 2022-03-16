import axios from "axios"

const signup = (username, email, password) => {
  return axios({
    method: "POST",
    url: `https://still-gorge-84022.herokuapp.com/api/v1/auth/signup`,
    data: {  name: username, email, password },
  })
};

const login = (email, password) => {
  return axios({
    method: "POST",
    url: `https://still-gorge-84022.herokuapp.com/api/v1/auth/login`,
    data: { email, password },
  })
};

const activateAccount = (token) => {
  return axios({
    method: "POST",
    url: `https://still-gorge-84022.herokuapp.com/api/v1/auth/activate-account`,
    data: { token },
  })
}
const fetchUserByToken = (token) => {
  return ;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  signup,
  activateAccount,
  login,
  fetchUserByToken,
  logout,
};

export default authService;

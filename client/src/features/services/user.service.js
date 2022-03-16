import axios from "axios";
import { isAuth } from "../../utils/cookies";

const update = (token, username, password, role) => {
  let adminParam = ""
  if (isAuth().role === "admin") {
    adminParam = "/admin"
  }
  
  return axios({
    method: "PUT",
    url: `https://still-gorge-84022.herokuapp.com/api/v1/user${adminParam}/update`,
    data: { name: username, password, role },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateRole = (token, role) => { 
  return axios({
    method: "PUT",
    url: `https://still-gorge-84022.herokuapp.com/api/v1/user/update-role`,
    data: { role },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const userService = {
  update,
  updateRole,
};

export default userService;

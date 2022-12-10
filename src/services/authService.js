import { api, requestConfig } from "../utils/config";

//Register an user
const register = async (data) => {
  const config = requestConfig("POST", data);
  const url = `${api}/users/register`;

  try {
    const res = await fetch(url, config)
      .then((resp) => resp.json())
      .catch((err) => err);

    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
    }
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
};

export default authService;

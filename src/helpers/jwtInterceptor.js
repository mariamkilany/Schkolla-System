import axios from "axios";

const jwtInterceoptor = axios.create({
  baseURL: "https://joker.animeraa.com/",
});

jwtInterceoptor.interceptors.request.use((config) => {
  // console.log(config)
  let tokensData = localStorage.getItem("accessToken");
  let id = localStorage.getItem("id");
  config.params = { userId: id };
  config.headers["withCredentials"] = true;
  config.headers["Authorization"] = `Bearer ${tokensData}`;
  return config;
});

jwtInterceoptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      try {
        let apiResponse = await axios.get(
          "http://localhost:4000/v1/admin/refreshToken",
          { withCredentials: true }
        );
        localStorage.setItem("accessToken", apiResponse.data.accessToken);
        error.config.headers[
          "Authorization"
        ] = `Bearer ${apiResponse.data.accessToken}`;
        return axios(error.config);
      } catch (err) {
        localStorage.removeItem("firstLogin");
        console.log(err);
        window.location.href = "/login";
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default jwtInterceoptor;

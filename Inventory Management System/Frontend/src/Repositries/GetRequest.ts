import { HttpStatusCode } from "axios";
import http from "../utils/utils";

const createGetRequest = async (url: string) => {
  try {
    const response = await http.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    if (response.status === HttpStatusCode.Accepted) {
      return response.data.result;
    }
  } catch (error: any) {
    if (error.response.status === HttpStatusCode.Unauthorized) {
      window.location.href = "/src/Components/Login/login.html";
    }
  }
};

export default createGetRequest;

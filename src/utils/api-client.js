import axios from "axios";
import config from "../config.json";

export default axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: `${config.backendURL}/api`,
});

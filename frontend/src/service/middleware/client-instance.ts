{/*service/middleware/client-instance.ts */}
import axios from "axios";

const client = axios.create({
  baseURL: "https://api1.pretendre.space/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default client;

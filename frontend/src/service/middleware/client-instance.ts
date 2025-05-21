{/*service/middleware/client-instance.ts */}
import axios from "axios";

const client = axios.create({
  baseURL: "https://fuzzy-happiness-69wvq6vv665p2rx65-8000.app.github.dev/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default client;

import axios from "axios";

const client = axios.create({
  baseURL: "https://fictional-fortnight-p549j54v55gh759p-8000.app.github.dev/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default client;

// api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bookish-adventure-gvj64vj9jjgfv67g-8000.app.github.dev/api', // Update with your backend URL
});

export default api;
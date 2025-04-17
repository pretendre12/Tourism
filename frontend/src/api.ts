// api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fuzzy-happiness-69wvq6vv665p2rx65-8000.app.github.dev/api', // Update with your backend URL
});

export default api;
<<<<<<< HEAD
import clientInstance from "../middleware/client-instance";

export interface IPayload {
  email: string;  // Ensure this matches your backend payload
  password: string;
}

export const login = async (payload: IPayload) => {
  try {
    const res = await clientInstance.post("/api/login/", payload);
    return res.data; // Return the response data, which includes user info & token
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Login failed");
  }
};
=======
import clientInstance from '../middleware/client-instance';


export interface IPayload {
    username: string
    password: string
}

export const login = async (payload: IPayload) => {
    try {
        const res = await clientInstance.post('/api/route', payload)
        return res.data  // Return only the response data
    } catch (error) {
        throw new Error(`Something went wrong: ${error}`)
    }
}
>>>>>>> 1b419335 (Pending changes exported from your codespace)

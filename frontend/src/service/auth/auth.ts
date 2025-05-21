{/*service/auth/auth.ts*/}
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

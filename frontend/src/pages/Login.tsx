<<<<<<< HEAD
// pages/LoginPage.tsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string().required('Required'),
});

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting, setErrors }: any
  ) => {
    try {
      await login(values.email, values.password);
      navigate('/profile');
    } catch (error) {
      setErrors({ password: 'Invalid email or password' });
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label className="block mb-1">Email</label>
              <Field
                name="email"
                type="email"
                className={`w-full p-2 border ${
                  errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                } rounded`}
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1">Password</label>
              <Field
                name="password"
                type="password"
                className={`w-full p-2 border ${
                  errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                } rounded`}
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
=======
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use React Router for navigation
import client from "../service/middleware/client-instance";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await client.post("/api/login/", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/destinations"); // Navigate properly
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      setMessage(
        error.response?.data?.detail ||
        error.response?.data?.error ||
        "Invalid email or password"
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-80 p-4 border rounded-lg shadow-md">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-2 border rounded mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="p-2 border rounded mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default Login;
>>>>>>> 1b419335 (Pending changes exported from your codespace)

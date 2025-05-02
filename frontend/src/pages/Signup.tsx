import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import api from '../api';

interface SignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function SignupPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: SignupFormValues, { setErrors }: any) => {
    try {
      const signupResponse = await api.post('/signup/', {
        email: values.email,
        password: values.password,
      });

      if (signupResponse.status === 201) {
        try {
          const loginResponse = await api.post('/login/', {
            email: values.email,
            password: values.password,
          });

          if (loginResponse.data.access && loginResponse.data.user) {
            localStorage.setItem('token', loginResponse.data.access);
            localStorage.setItem('user', JSON.stringify(loginResponse.data.user));
            navigate('/profile');
          }
        } catch (loginError) {
          console.error('Auto-login failed:', loginError);
          navigate('/login');
        }
      }
    } catch (error: any) {
      if (error.response?.data) {
        const { data } = error.response;
        const fieldErrors: Record<string, string> = {};

        if (data.email) fieldErrors.email = Array.isArray(data.email) ? data.email[0] : data.email;
        if (data.password) fieldErrors.password = Array.isArray(data.password) ? data.password[0] : data.password;
        if (data.non_field_errors) fieldErrors.confirmPassword = data.non_field_errors[0];

        if (Object.keys(fieldErrors).length > 0) {
          setErrors(fieldErrors);
        } else {
          alert('Signup failed. Please check your information.');
        }
      } else {
        alert('Network error. Please check your connection.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Create Account
      </h1>

      <Formik
        initialValues={{ 
          email: '', 
          password: '',
          confirmPassword: '' 
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              <ErrorMessage name="email">
                {(msg) => <div className="text-red-500 text-sm mt-1">{msg}</div>}
              </ErrorMessage>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              <ErrorMessage name="password">
                {(msg) => <div className="text-red-500 text-sm mt-1">{msg}</div>}
              </ErrorMessage>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Field
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              <ErrorMessage name="confirmPassword">
                {(msg) => <div className="text-red-500 text-sm mt-1">{msg}</div>}
              </ErrorMessage>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4.75V6.25M18.364 5.636L17.308 6.692M19.25 12H17.75M18.364 18.364L17.308 17.308M12 17.75V19.25M7.05005 17.308L5.63605 18.722M6.25 12H4.75M7.05005 6.692L5.63605 5.278"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

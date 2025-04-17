// pages/ProfilePage.tsx
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  const email = user?.email || '';
  const username = user?.username || '';
  const joined = user?.date_joined
    ? new Date(user.date_joined).toLocaleDateString()
    : '';

  // First letter of the email for avatar (e.g., 'A' for admin)
  const avatarInitial = email.charAt(0).toUpperCase();

  const isAdmin = email.toLowerCase() === 'admin';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center text-center mb-6">
          {/* Avatar */}
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md mb-4 ${
              isAdmin ? 'bg-red-600' : 'bg-blue-500'
            }`}
          >
            {avatarInitial}
          </div>

          <h1 className="text-2xl font-semibold text-gray-800">Welcome, {username || 'User'}!</h1>
          <p className="text-sm text-gray-500">{email}</p>
        </div>

        <div className="space-y-4 text-left text-gray-700">
          <div>
            <label className="block text-sm font-semibold">Email:</label>
            <p className="mt-1">{email}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold">Username:</label>
            <p className="mt-1">{username}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold">Member Since:</label>
            <p className="mt-1">{joined}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="mt-8 w-full bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

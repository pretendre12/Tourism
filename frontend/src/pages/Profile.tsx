// pages/ProfilePage.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, logout, token } = useAuth(); // token needed for auth API calls
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const email = user?.email || '';
  const username = user?.username || '';
  const joined = user?.date_joined
    ? new Date(user.date_joined).toLocaleDateString()
    : '';
  const avatarInitial = email.charAt(0).toUpperCase();
  const isAdmin = email.toLowerCase() === 'admin';

  useEffect(() => {
    async function fetchFavorites() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('https://glowing-waffle-45qvgwwj5r6cjggq-8000.app.github.dev/api/user/favorites/', {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch favorites.');
        const data = await res.json();
        console.log("ninja=== " + data);
        setFavorites(data);
      } catch (err: any) {
        setError(err.message || 'Error loading favorites.');
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchFavorites();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md ${
              isAdmin ? 'bg-red-600' : 'bg-blue-500'
            }`}
          >
            {avatarInitial}
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Hello, {username || 'User'}!
            </h1>
            <p className="text-gray-500 text-sm">{email}</p>
            <p className="text-gray-400 text-xs">Member since: {joined}</p>
          </div>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="text-sm font-semibold text-gray-600">Email</label>
            <p className="text-gray-800">{email}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Username</label>
            <p className="text-gray-800">{username}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Joined</label>
            <p className="text-gray-800">{joined}</p>
          </div>
        </div>

        {/* Favorites */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Favorites</h2>

          {loading ? (
            <p className="text-gray-500">Loading favorites...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : favorites.length === 0 ? (
            <p className="text-gray-500">No favorites yet.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {favorites.map((fav, i) => (
                <div
                  key={i}
                  className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200"
                >
                  <h3 className="font-semibold text-lg text-blue-600 truncate">{fav.content_object_title || 'Untitled'}</h3>
                  {fav.content_type_str && (
                    <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 rounded-full px-3 py-1">
                      {fav.content_type_str}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Logout Button */}
        <div className="mt-10">
          <button
            onClick={logout}
            className="w-full bg-red-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

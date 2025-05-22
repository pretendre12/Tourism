import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BACKEND_URL } from '../config/config';

interface FavoriteItem {
  id: number;
  content_type_str: string;
  content_object_title: string;
  object_id: number;
  image?: string;
}

interface NatureProps {
  id: number;
  title: string;
  description: string;
  image1: string;
  image2?: string;
  image3?: string;
  highlights: string;
  is_favorite?: boolean;
}

export default function ProfilePage() {
  const { user, logout, token } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('favorites');
  const email = user?.email || '';
  const username = user?.username || '';
  const avatarInitial = email.charAt(0).toUpperCase();
  const isAdmin = email.toLowerCase() === 'admin';

  const endpointMap: Record<string, string> = {
    nature: 'nature',
    culture: 'culture',
  };

  useEffect(() => {
    async function fetchFavoritesWithImages() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${BACKEND_URL}api/user/favorites/`, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch favorites.');
        const data = await res.json();

        const detailedFavorites = await Promise.all(
          data.map(async (fav: FavoriteItem) => {
            const endpoint = endpointMap[fav.content_type_str];
            if (!endpoint) return fav;

            try {
              const detailRes = await fetch(
                `${BACKEND_URL}api/${endpoint}/${fav.object_id}/`,
                {
                  headers: { Authorization: `JWT ${token}` },
                }
              );
              const detailData: NatureProps = await detailRes.json();
              return {
                ...fav,
                image: detailData.image1 ? `${BACKEND_URL}${detailData.image1}` : null,
              };
            } catch {
              return fav;
            }
          })
        );

        setFavorites(detailedFavorites);
      } catch (err: any) {
        setError(err.message || 'Error loading favorites.');
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchFavoritesWithImages();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Profile Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="relative">
              <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center text-white text-4xl md:text-5xl font-bold border-4 border-white shadow-xl ${
                isAdmin ? 'bg-red-600' : 'bg-blue-500'
              }`}>
                {avatarInitial}
              </div>
              {isAdmin && (
                <span className="absolute bottom-0 right-0 bg-yellow-400 text-xs text-gray-900 font-bold px-2 py-1 rounded-full border-2 border-white">
                  ADMIN
                </span>
              )}
            </div>
            <div className="text-center md:text-left mb-4 md:mb-0 flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {username || 'User'}
              </h1>
              <p className="text-blue-100">{email}</p>
            </div>
            <div>
              <button
                onClick={logout}
                className="px-6 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg font-medium transition duration-200 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto">
          <nav className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-6 py-4 font-medium text-sm transition focus:outline-none whitespace-nowrap ${
                activeTab === 'favorites'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Favorites
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-4 font-medium text-sm transition focus:outline-none whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Account Settings
            </button>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'favorites' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Your Favorites</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                {favorites.length} items
              </span>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                <p className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              </div>
            ) : favorites.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <p className="text-gray-500 text-lg font-medium">You haven't saved any favorites yet.</p>
                <p className="text-gray-400 mt-2 mb-4">Browse our collection and add your favorites!</p>
                <a href="/nature" className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition">
                  Explore now
                </a>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {favorites.map((fav, i) => (
                  <a
                    key={i}
                    href={`/nature`}
                    className="group block overflow-hidden rounded-xl shadow-sm hover:shadow-md transition duration-300 bg-white border border-gray-200"
                  >
                    <div className="relative">
                      {fav.image ? (
                        <img
                          src={fav.image}
                          alt={fav.content_object_title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      {fav.content_type_str && (
                        <span className="absolute top-3 right-3 text-xs font-bold bg-white bg-opacity-90 text-gray-800 rounded-full px-3 py-1 shadow-sm">
                          {fav.content_type_str.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 truncate transition">
                        {fav.content_object_title || 'Untitled'}
                      </h3>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="flex items-center text-gray-500 text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                          Saved
                        </div>
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Account Settings</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-700">
                  {email}
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Username</label>
                <div className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-700">
                  {username}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <button
                onClick={logout}
                className="w-full md:w-auto bg-red-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-red-700 transition duration-200 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
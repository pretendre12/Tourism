import { useEffect, useState } from 'react';

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

// Mock data for demonstration
const mockFavorites: FavoriteItem[] = [
  {
    id: 1,
    content_type_str: 'nature',
    content_object_title: 'Mt. Capistrano',
    object_id: 1,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    content_type_str: 'nature',
    content_object_title: 'Musuan Peak',
    object_id: 2,
    image: 'https://images.unsplash.com/photo-1464822759844-d150ad6d1ba9?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    content_type_str: 'culture',
    content_object_title: 'Ancient Temple',
    object_id: 3,
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d30ba9?w=400&h=300&fit=crop'
  }
];

export default function ProfilePage() {
  // Mock user data
  const user = { email: 'test10@gmail.com', username: 'TestUser' };
  const [favorites, setFavorites] = useState<FavoriteItem[]>(mockFavorites);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [avatarColor, setAvatarColor] = useState('');
  
  const email = user?.email || '';
  const username = user?.username || '';
  const avatarInitial = email.charAt(0).toUpperCase();
  const isAdmin = email.toLowerCase() === 'admin';

  // Generate random avatar color on component mount
  useEffect(() => {
    const colors = ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setAvatarColor(randomColor);
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    // Add logout logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-6">
            <div className="relative">
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-lg ${avatarColor}`}>
                {avatarInitial}
              </div>
              {isAdmin && (
                <span className="absolute bottom-0 right-0 bg-yellow-400 text-xs text-gray-900 font-bold px-2 py-1 rounded-full border-2 border-white">
                  ADMIN
                </span>
              )}
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {username || 'User'}
              </h1>
              <p className="text-gray-600 mt-1">{email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation with Logout */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <nav className="flex">
              <button className="px-6 py-4 font-medium text-sm text-blue-600 border-b-2 border-blue-600 focus:outline-none">
                Favorites
              </button>
            </nav>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-red-600 hover:text-gray-800 font-medium transition duration-200 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Your Favorites</h2>
            <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
              {favorites.length} items
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              <p className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p className="text-gray-600 text-lg font-medium">You haven't saved any favorites yet.</p>
              <p className="text-gray-500 mt-2 mb-4">Browse our collection and add your favorites!</p>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition">
                Explore now
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {favorites.map((fav, i) => (
                <div
                  key={i}
                  className="group block overflow-hidden rounded-lg shadow-sm hover:shadow-md transition duration-300 bg-white border border-gray-200 cursor-pointer"
                >
                  <div className="relative">
                    {fav.image ? (
                      <img
                        src={fav.image}
                        alt={fav.content_object_title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    {fav.content_type_str && (
                      <span className="absolute top-3 right-3 text-xs font-medium bg-white bg-opacity-90 text-gray-700 rounded-full px-3 py-1 shadow-sm">
                        {fav.content_type_str.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 truncate transition">
                      {fav.content_object_title || 'Untitled'}
                    </h3>
                    <div className="mt-3 flex justify-between items-center">
                      <div className="flex items-center text-gray-500 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        Saved
                      </div>
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
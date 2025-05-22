import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config/config';

interface FavoritesContextType {
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}api/favorites/`, {
          headers: { Authorization: `JWT ${localStorage.getItem('token')}` }
        });
        setFavorites(response.data.map((item: any) => item.nature_spot));
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };
    
    if (localStorage.getItem('token')) {
      fetchFavorites();
    }
  }, []);

  const addFavorite = async (id: number) => {
    try {
      await axios.post(`${BACKEND_URL}api/favorites/`, { nature_spot: id }, {
        headers: { Authorization: `JWT ${localStorage.getItem('token')}` }
      });
      setFavorites([...favorites, id]);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  const removeFavorite = async (id: number) => {
    try {
      await axios.delete(`${BACKEND_URL}api/favorites/${id}/`, {
        headers: { Authorization: `JWT ${localStorage.getItem('token')}` }
      });
      setFavorites(favorites.filter(favId => favId !== id));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const isFavorite = (id: number) => favorites.includes(id);

// const handleFavorite = (id: number) => {
//     if (isFavorite(id)) {
//       removeFavorite(id);
//     } else {
//       addFavorite(id);
//     }
//   };


  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
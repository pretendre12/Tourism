// pages/HomePage.tsx
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome {user?.username}!</h1>
      <div>
        <h2>Your Credentials:</h2>
        <p>Email: {user?.email}</p>
        <p>Username: {user?.username}</p>
        <p>ID: {user?.id}</p>
      </div>
      <button onClick={logout}>Logou</button>
    </div>
  );
}
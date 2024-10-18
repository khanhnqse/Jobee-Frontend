import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedJwtToken = localStorage.getItem('jwtToken');
    console.log('Stored User ID:', storedUserId);
    console.log('Stored JWT Token:', storedJwtToken);
    if (storedUserId && storedJwtToken) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      setJwtToken(storedJwtToken);
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []);

  const login = (id, token) => {
    setIsAuthenticated(true);
    setUserId(id);
    setJwtToken(token);
    localStorage.setItem('userId', id);
    localStorage.setItem('jwtToken', token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setJwtToken(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('jwtToken');
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      userId,
      jwtToken,
      login,
      logout,
    }),
    [isAuthenticated, userId, jwtToken]
  );

  if (loading) {
    return <div>Loading...</div>; // Render a loading state while checking authentication
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

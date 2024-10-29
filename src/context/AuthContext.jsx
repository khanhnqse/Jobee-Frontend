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
  const [userRole, setUserRole] = useState(null); // Add userRole state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedJwtToken = localStorage.getItem('jwtToken');
    const storedUserRole = localStorage.getItem('userRole'); // Retrieve userRole from localStorage
    if (storedUserId && storedJwtToken && storedUserRole) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      setJwtToken(storedJwtToken);
      setUserRole(storedUserRole); // Set userRole state
    }
    setLoading(false);
  }, []);

  const login = (id, token, role) => {
    setIsAuthenticated(true);
    setUserId(id);
    setJwtToken(token);
    setUserRole(role); // Set userRole state
    localStorage.setItem('userId', id);
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('userRole', role); // Store userRole in localStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setJwtToken(null);
    setUserRole(null); // Clear userRole state
    localStorage.removeItem('userId');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRole'); // Remove userRole from localStorage
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      userId,
      jwtToken,
      userRole, // Include userRole in context value
      login,
      logout,
    }),
    [isAuthenticated, userId, jwtToken, userRole]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

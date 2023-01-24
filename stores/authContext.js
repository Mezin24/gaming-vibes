import { createContext, useContext, useState, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const AutContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    netlifyIdentity.on('login', (user) => {
      setUser(user);
      netlifyIdentity.close();
      console.log('login event');
    });

    netlifyIdentity.on('logout', () => {
      setUser(null);
      console.log('logout');
    });

    netlifyIdentity.on('init', (user) => {
      setUser(user);
      setAuthReady(true);
      console.log('init ready');
    });

    netlifyIdentity.init();

    return () => {
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
    };
  }, []);

  const login = () => {
    netlifyIdentity.open();
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  return (
    <AutContext.Provider value={{ user, login, logout, authReady }}>
      {children}
    </AutContext.Provider>
  );
};

const useAuthCtx = () => useContext(AutContext);
export default useAuthCtx;

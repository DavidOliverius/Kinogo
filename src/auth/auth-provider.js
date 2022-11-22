import React, { useState, useMemo, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as usersApi from "../api/users-api";

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("kinogo-user");
    setUser(undefined);
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    usersApi
      .getCurrentUser()
      .then(({ isValid }) => {
        if (isValid) {
          setIsLoggedIn(true);
          setUser(JSON.parse(localStorage.getItem("kinogo-user")));
        }
      })
      .catch(() => {
        logout();
      })
      .finally(() => setLoadingInitial(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const signUp = ({ email, password, displayName }) => {
    setLoading(true);

    usersApi
      .signUp({ email, password, displayName })
      .then((user) => {
        setUser(user);
        setIsLoggedIn(true);
        localStorage.setItem("kinogo-user", JSON.stringify(user));
        navigate("/");
      })
      .catch((error) => setError(error.response.data.message))
      .finally(() => setLoading(false));
  };

  const signIn = ({ email, password }) => {
    setLoading(true);

    usersApi
      .signIn({ email, password })
      .then((user) => {
        setUser(user);
        setIsLoggedIn(true);
        localStorage.setItem("kinogo-user", JSON.stringify(user));
        navigate(-1);
      })
      .catch(() => {
        setError(
          "There was a problem signing you in. Please check your email and password"
        );
      })
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      isLoggedIn,
      signIn,
      signUp,
      logout,
    }),
    [user, loading, error, isLoggedIn] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export const useAuth = () => useContext(AuthContext);

import { myAlert } from "../lib/Alert";
import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";
import { localStorageKeys } from "../config/constants/localstorage";
export const handleStorage = {
  remove: (key) => localStorage.removeItem(key),
  set: (key, value) => localStorage.setItem(key, value),
  get: (key) => localStorage.getItem(key),
};

const AuthContext = createContext({
  token: "",
  setToken: (data) => {},
  user: "",
  setUser: (data) => {},
  isUpdatingData: false,
  setIsUpdatingData: (data) => {},
  login: async (data) => {},
  logout: async () => {},
  isCheckingToken: true,
});
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const [isCheckingToken, setIsCheckingLogin] = useState(true);

  const updateUserData = async () => {
    try {
      setIsUpdatingData(true);
      const _token = handleStorage.get(localStorageKeys.auth);
      const response = await authService.checkLogin();
      if (_token && response) {
        setToken(_token);

        handleStorage.set(localStorageKeys.user, {
          roles: response.user.roles,
        });
        setUser({
          roles: response.user.roles,
          email: response.user.email,
          fullName: response.user.fullName,
        });
      } else {
        handleStorage.remove(localStorageKeys.user);
        handleStorage.remove(localStorageKeys.auth);
      }
    } catch (error) {
      console.log(error);
    }
    setIsUpdatingData(false);
  };
  useEffect(() => {
    let interval;

    if (token) {
      interval = setInterval(() => updateUserData(), 15000);
    }

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  useEffect(() => {
    const updateWithTokenInStorage = async () => {
      try {
        setIsCheckingLogin(true);

        await updateUserData();
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setIsCheckingLogin(false);
      }, 1000);
    };
    updateWithTokenInStorage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async ({ email, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        logout();
        const response = await authService.login({ email, password });
        handleStorage.set(localStorageKeys.auth, response.token);
        handleStorage.set(localStorageKeys.user, {
          roles: response.user.roles,
        });

        setToken(response.token);
        setUser({ roles: response.user.roles });

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };
  const logout = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        myAlert.closeAll();
        handleStorage.remove(localStorageKeys.auth);
        handleStorage.remove(localStorageKeys.user);
        setToken("");
        setUser("");
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        login,
        logout,
        isCheckingToken,
        isUpdatingData,
        setIsUpdatingData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

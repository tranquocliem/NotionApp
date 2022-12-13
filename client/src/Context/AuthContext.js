import React, { createContext, useEffect, useState } from "react";
import { isAuthenticated as chechAuth } from "../Service/AccountService";

export const AuthContext = createContext();

const Auth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const apiAuth = async () => {
      const data = await chechAuth();
      if (data) {
        setUser(data.user);
        setIsAuthenticated(data.isAuthenticated);
      }
    };
    apiAuth();
  }, [isAuthenticated]);
  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;

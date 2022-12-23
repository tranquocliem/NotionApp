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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position.coords.latitude); // logs the latitude of the device's current position
      console.log(position.coords.longitude); // logs the longitude of the device's current position
      console.log(position.coords.accuracy); // logs the accuracy of the device's current position in meters
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;

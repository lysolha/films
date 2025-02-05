import React, { createContext, useEffect, useState } from "react";
import movieAPILink from "../utilities/API";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );

  async function fetchSession() {
    await fetch(`${movieAPILink}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "petro@gmail.com",
        password: "super-password",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        saveToken(result.token);
        return result.token;
      });
  }

  useEffect(() => {
    fetchSession();
  }, []);

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const removeToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

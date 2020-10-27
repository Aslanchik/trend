import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null }, () => {
    if (localStorage.getItem("jwt")) {
      const decodedToken = jwtDecode(localStorage.getItem("jwt"));
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwt");
      } else {
        return { user: decodedToken };
      }
    } else return { user: null };
  });

  const login = (userData) => {
    localStorage.setItem("jwt", userData.token);
    dispatch({ type: "LOGIN", payload: userData });
  };
  const logout = () => {
    localStorage.removeItem("jwt");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

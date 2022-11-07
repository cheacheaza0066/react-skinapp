import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};


export const AuthContext = createContext(INITIAL_STATE);

export function useAuth() {
  return useContext(AuthContext)
}





export const AuthContextProvider = ({ children }) => {
  // const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState()
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })

    return unsubscribe
  }, [])


  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch  }}>
      {children}
    </AuthContext.Provider>
  );
};

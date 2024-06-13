import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {

  const [isLogedIn, setIsLogedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
    .then((result) => {
      if (result){
        setIsLogedIn(true);
        setUser(result);
      }else{
        setIsLogedIn(false);
        setUser(null);
      }
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setIsLoading(false);
    })
  }, []);
  
  return (
    <GlobalContext.Provider
      value={{
        isLogedIn,
        setIsLogedIn,
        isLoading,
        setIsLoading,
        user,
        setUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider;

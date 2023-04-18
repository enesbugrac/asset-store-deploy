import { Market } from "@/services/bucket";
import React, { useState } from "react";

interface IGlobalContextProps {
  user: any;
  loading: boolean;
  cart: Market[];
  setUser: (user: any) => void;
  setLoading: (loading: boolean) => void;
  setCart: (cart: Market[]) => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
  user: {},
  loading: true,
  cart: [],
  setCart: () => {},
  setUser: () => {},
  setLoading: () => {},
});

export const GlobalContextProvider = (props: any) => {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentCart, setCurrentCart] = useState<Market[]>([]);

  return (
    <GlobalContext.Provider
      value={{
        cart: currentCart,
        setCart: setCurrentCart,
        user: currentUser,
        loading: isLoading,
        setUser: setCurrentUser,
        setLoading: setIsLoading,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

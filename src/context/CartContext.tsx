import { JSX, createContext, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import { ICartItem } from "../interfaces/CartItem";

export interface ICartContext {
  items: ICartItem[];
  setItems: SetStoreFunction<ICartItem[]>;
}

export const CartContext = createContext<ICartContext>({
  items: [],
  setItems: () => {},
});

export const CartContextProvider = (props: { children: JSX.Element }) => {
  const [items, setItems] = createStore<ICartItem[]>([]);
  return (
    <CartContext.Provider value={{ items, setItems }}>
      {props.children}
    </CartContext.Provider>
  );
};

export function useCartContext() {
  return useContext(CartContext);
}

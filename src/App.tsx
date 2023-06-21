import { Component, createSignal } from "solid-js";
import { Route, Routes, A } from "@solidjs/router";
import banner from "./assets/banner.png";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import { useCartContext } from "./context/CartContext";

const App: Component = () => {
  const [darkTheme, setDarkTheme] = createSignal<boolean>(false);

  function toggleTheme() {
    setDarkTheme((prevValue) => !prevValue);
  }

  const { items } = useCartContext();

  const getTotalItemCount = () => {
    return items.reduce(
      (accumulatedCount, currentItem) =>
        accumulatedCount + currentItem.quantity,
      0
    );
  };

  return (
    <div class="container m-auto">
      <header
        class="my-4 p-2 text-xl flex items-center gap-4"
        classList={{
          "bg-neutral-900": darkTheme(),
          "text-white": darkTheme(),
        }}
      >
        <span
          class="material-symbols-outlined cursor-pointer"
          onClick={toggleTheme}
        >
          light_mode
        </span>
        <h1>Ninja Merch</h1>

        <A href="/"> Home </A>
        <A href="/cart"> Cart({getTotalItemCount()})</A>
      </header>
      <img class="rounded-md" src={banner} alt="Ninja Merch Banner" />
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/cart" component={Cart}></Route>
        <Route path="/product/:id" component={Product}></Route>
      </Routes>
    </div>
  );
};

export default App;

import { Component, For, Show } from "solid-js";
import Card from "../components/Card";
import { useCartContext } from "../context/CartContext";

const Cart: Component = () => {
  const { items } = useCartContext();

  const getTotalAmount = () => {
    return items.reduce(
      (accumulatedAmount, currentItem) =>
        accumulatedAmount +
        currentItem.quantity * (currentItem.price ? currentItem.price : 0),
      0
    );
  };

  return (
    <div class="max-w-md my-8 mx-auto">
      <Card rounded={true}>
        <h2>Your Shopping Cart</h2>
        <Show
          when={items.length > 0}
          fallback={<p class="my-3"> No Items in Cart</p>}
        >
          <For each={items}>
            {(item) => (
              <p class="my-3">
                {item.title} - ${item.price} x {item.quantity}
              </p>
            )}
          </For>
          <p class="mt-8 pt-4 border-t-2 font-bold">
            {" "}
            Total Amount : ${getTotalAmount()}{" "}
          </p>
        </Show>
      </Card>
    </div>
  );
};

export default Cart;

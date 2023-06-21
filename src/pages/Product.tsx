import { useParams } from "@solidjs/router";
import { Component, createResource, createSignal, Show } from "solid-js";
import { IProduct } from "../interfaces/Product";
import { useCartContext } from "../context/CartContext";

async function fetchProduct(id: string): Promise<Partial<IProduct>> {
  const response = await fetch(`http://localhost:4000/products/${id}`);
  const data: Partial<IProduct> = await response.json();
  return data;
}

const Product: Component = () => {
  const params = useParams<{ id: string }>();
  const [product] = createResource(params.id, fetchProduct);
  const { items, setItems } = useCartContext();
  const [addingProductToCart, setAddingProductToCart] = createSignal<boolean>();

  const addProductToCart = () => {
    setAddingProductToCart(true);
    setTimeout(() => {
      setAddingProductToCart(false);
    }, 2000);
    const productIndexInCart = items.findIndex(
      (item) => item.id === product()?.id
    );
    if (productIndexInCart >= 0) {
      setItems(productIndexInCart, "quantity", (quantity) => quantity + 1);
    } else {
      setItems(items.length, { ...product(), quantity: 1 });
    }
  };

  return (
    <div class="my-7">
      <Show when={product()} fallback={<p> loading ... </p>}>
        <div class="grid grid-cols-5 gap-7">
          <div class="col-span-2">
            <img src={product()?.img} alt={product()?.title} />
          </div>
          <div class="col-span-3">
            <h2 class="text-3xl font-bold mb-7">{product()?.title}</h2>
            <p>{product()?.description}</p>
            <p class="my-7 text-2xl"> Only $ {product()?.price}</p>
            <button
              onClick={addProductToCart}
              disabled={addingProductToCart()}
              classList={{
                "disabled-btn": addingProductToCart(),
                btn: !addingProductToCart(),
              }}
            >
              Add to Cart
            </button>

            <Show when={addingProductToCart()}>
              <div class="m-2 p-2 border-amber-500 border-2 rounded-md inline-block">
                {product()?.title} was added to cart
              </div>
            </Show>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default Product;

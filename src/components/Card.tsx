import { Component, JSX } from "solid-js";

const Card: Component<{
  rounded?: boolean;
  flat?: boolean;
  children: JSX.Element;
}> = (props) => {
  return (
    <div
      class="bg-white p-4 text-center"
      classList={{ "rounded-md": props.rounded, "shadow-md": !props.flat }}
    >
      {props.children}
    </div>
  );
};

export default Card;

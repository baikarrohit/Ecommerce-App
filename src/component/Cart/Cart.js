import { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCntx = useContext(CartContext);
  let total = 0;
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCntx.items.map((item) => (
        <li>
          Name: {item.name} - Price: {item.price} - Quantity:{item.quantity}
        </li>
      ))}
    </ul>
  );

  cartCntx.items.forEach((item) => {
    total = total + Number(item.price) * item.quantity;
  });

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${total}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;

import { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, updateItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addItemToCartHandler = (item) => {
    const existingItem = items.findIndex((cartItem) => cartItem.id === item.id);
    if (existingItem === -1) {
      updateItems([...items, item]);
    } else {
      const temp = [...items];
      temp[existingItem].quantity =
        parseInt(temp[existingItem].quantity) + parseInt(item.quantity);
      updateItems(temp);
    }
  };

  const calculateTotalHandler = () => {
    let total = 0;
    items.map((item) => (total += Number(item.price) * Number(item.quantity)));
    setTotalAmount(total);
  };

  const removeItemFromCartHandler = (id) => {
    updateItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === id && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      return updatedItems.filter((item) => item.quantity >= 1);
    });
  };

  const cartContext = {
    items: items,
    totalAmount: totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    calculateTotal: calculateTotalHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

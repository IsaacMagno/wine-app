export const handleSubmit = ({ value }: any) => {
  const cart = localStorage.getItem("cart");
  let cartItems: any;

  let isAdded = false;

  if (!cart) {
    cartItems = {
      items: [
        {
          id: value,
          qty: 1,
        },
      ],
    };
  } else {
    cartItems = JSON.parse(cart);
    cartItems.items = cartItems.items.map((ci: any) => {
      if (ci.id === value) {
        isAdded = true;
        return { id: ci.id, qty: ci.qty + 1 };
      }

      return { id: ci.id, qty: ci.qty };
    });

    if (!isAdded) {
      cartItems.items.push({
        id: value,
        qty: 1,
      });
    }
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
};

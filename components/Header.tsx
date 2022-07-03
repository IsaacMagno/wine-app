import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { HeaderDiv, NavBar, Logo, NavItem, CartTotal } from "../styles/main";
import imageLoader from "../imageLoader";
import CartIcon from "../icons/shopping-cart.png";

const Header = () => {
  const [winesQty, setWinesQty] = useState(0);
  const [empty, setEmpty] = useState(false);
  const nav = ["Clube", "Loja", "Produtores", "Ofertas", "Eventos"];
  const router = useRouter();

  useEffect(() => {
    const cart: any = localStorage.getItem("cart");
    if (!cart) return setEmpty(true);

    const cartItems = JSON.parse(cart);
    const { items } = cartItems;

    const total = items.reduce((acc: any, item: any) => acc + item.qty, 0);

    setWinesQty(total);
  });

  return (
    <HeaderDiv>
      <Logo>WINE</Logo>
      <NavBar>
        {nav.map((n, i) => (
          <NavItem onClick={() => router.push("/")} key={n + i}>
            {n}
          </NavItem>
        ))}
      </NavBar>
      <NavBar onClick={() => router.push("/cart")}>
        <Image
          loader={imageLoader}
          unoptimized
          src={CartIcon}
          alt={"cart Icon"}
          width='20'
          height='20'
          objectFit='contain'
          style={{ cursor: "pointer" }}
        />
        {empty ? <CartTotal>0</CartTotal> : <CartTotal>{winesQty}</CartTotal>}
      </NavBar>
    </HeaderDiv>
  );
};

export default Header;

import { useEffect, useState } from "react";
import type { GetStaticProps } from "next";
import axios from "axios";
import Header from "../components/Header";
import { ContainerCard, CardDiv } from "../styles/main";

const Cart = ({ wines }: any) => {
  const [empty, setEmpty] = useState(false);
  const [itemsOnCart, SetCartItems] = useState([]);

  useEffect(() => {
    const cart: any = localStorage.getItem("cart");
    if (!cart) return setEmpty(true);

    const cartItems = JSON.parse(cart);
    const { items } = cartItems;

    const itemOnCart = items.map((ci: { id: any; qty: any }) => {
      const i = wines.filter((p: any) => p.id == ci.id);

      return {
        id: ci.id,
        name: i[0].name,
        price: i[0].price,
        qty: ci.qty,
        priceMember: i[0].priceMember,
        priceNonMember: i[0].priceNonMember,
      };
    });

    SetCartItems(itemOnCart);
  }, []);

  return (
    <div>
      <Header />
      <ContainerCard>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gridArea: "c",
          }}
        >
          {empty ? (
            <div>Carrinho Vazio </div>
          ) : (
            itemsOnCart.map((i: any) => {
              return (
                <CardDiv>
                  <ul style={{ listStyleType: "none" }}>
                    <li>Produto: {i.name}</li>
                    <li>Preço: R$ {i.price}</li>
                    <li>Sócios: R$ {i.priceMember}</li>
                    <li>Não Sócios: R$ {i.priceNonMember}</li>
                    <li>Quantidade: {i.qty}</li>
                  </ul>
                </CardDiv>
              );
            })
          )}
        </div>
      </ContainerCard>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await axios
    .get("https://wine-back-test.herokuapp.com/products")
    .then((o) => o.data);

  return {
    props: {
      wines: res.items,
    },
  };
};

export default Cart;

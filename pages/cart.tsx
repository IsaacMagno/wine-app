import { useEffect, useState } from "react";
import type { GetStaticProps } from "next";
import axios from "axios";
import Header from "../components/Header";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import imageLoader from "../imageLoader";
import { handleSubmit } from "../functions/handleSubmit";
import { ContainerCard, CardDiv, AddButtons } from "../styles/main";

const Cart = ({ wines }: any) => {
  const [empty, setEmpty] = useState(false);
  const [itemsOnCart, SetCartItems] = useState([]);
  const [reRender, setReRender] = useState(false);

  const router = useRouter();

  const actualize = (target: any) => {
    handleSubmit(target);

    setReRender(true);
  };

  useEffect(() => {
    const cart: any = localStorage.getItem("cart");
    if (!cart) return setEmpty(true);

    const cartItems = JSON.parse(cart);
    const { items } = cartItems;

    if (items.length === 0) return setEmpty(true);

    const itemOnCart = items.map((ci: { id: any; qty: any }) => {
      const i = wines.filter((p: any) => p.id == ci.id);

      return {
        id: ci.id,
        name: i[0].name,
        price: i[0].price,
        qty: ci.qty,
        priceMember: i[0].priceMember,
        priceNonMember: i[0].priceNonMember,
        image: i[0].image,
      };
    });

    SetCartItems(itemOnCart);
    setReRender(false);
  }, [reRender]);

  const handleDelete = ({ value }: any, action: any) => {
    const cart: any = localStorage.getItem("cart");
    const cartItems = JSON.parse(cart);

    const selected = cartItems.items.filter((i: any) => i.id === value);
    if (action == "minus") {
      console.log("teste");
      if (selected[0]) {
        if (selected[0].qty > 0) {
          // setWineQty(selected.qty - 1);

          cartItems.items = cartItems.items.map((ci: any) => {
            if (ci.id === value) {
              return { id: ci.id, qty: ci.qty - 1 };
            }

            return { id: ci.id, qty: ci.qty };
          });
        }
      }
    }

    console.log(action);

    if (action == "delete" || selected[0].qty == 0) {
      cartItems.items = cartItems.items.filter((ci: any) => ci.id !== value);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    setReRender(true);
  };

  return (
    <div>
      <Head>
        <title>Wine - Carrinho</title>
        <meta name='description' content='Carrinho de compras' />
      </Head>
      <Header />
      <ContainerCard style={{ height: "80rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gridArea: "c",
          }}
        >
          {empty ? (
            <div>Carrinho Vazio</div>
          ) : (
            itemsOnCart.map((i: any) => {
              return (
                <CardDiv key={i.id}>
                  <div
                    onClick={() => router.push(`/details/${i.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <Image
                      src={i.image}
                      width='100'
                      height='100'
                      loader={imageLoader}
                      unoptimized
                      alt={i.name}
                    />
                    <ul style={{ listStyleType: "none" }}>
                      <li>Produto: {i.name}</li>
                      <li>Preço: R$ {i.price}</li>
                      <li>Sócios: R$ {i.priceMember}</li>
                      <li>Não Sócios: R$ {i.priceNonMember}</li>
                      <li>Quantidade: {i.qty}</li>
                    </ul>
                  </div>
                  <AddButtons
                    onClick={({ target }) => actualize(target)}
                    value={i.id}
                  >
                    +
                  </AddButtons>
                  <AddButtons
                    onClick={({ target }) => handleDelete(target, "minus")}
                    value={i.id}
                  >
                    -
                  </AddButtons>
                  <AddButtons
                    onClick={({ target }) => handleDelete(target, "delete")}
                    value={i.id}
                  >
                    Deletar
                  </AddButtons>
                </CardDiv>
              );
            })
          )}
        </div>
      </ContainerCard>
      <span style={{ marginLeft: "40%" }}>Desenvolvido por @IsaacMagno</span>
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

import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { GetWineResults } from "../../types";
import imageLoader from "../../imageLoader";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  ContainerDetails,
  DetailsDiv,
  ImageDiv,
  Button,
  BackButton,
} from "../../styles/main";
import { handleSubmit } from "../../functions/handleSubmit";
import Header from "../../components/Header";
import back from "../../icons/costas.png";

const WineDetails = ({ wine }: any) => {
  const [wineQty, setWineQty] = useState(0);
  const [reRender, setReRender] = useState(false);

  const router = useRouter();

  const actualize = (target: any) => {
    handleSubmit(target);

    setReRender(true);
  };

  const handleDelete = ({ value }: any) => {
    const cart: any = localStorage.getItem("cart");
    const cartItems = JSON.parse(cart);

    const selected = cartItems.items[wine.id];
    if (selected) {
      setWineQty(selected.qty - 1);
    }

    cartItems.items = cartItems.items.map((ci: any) => {
      if (ci.id === value) {
        return { id: ci.id, qty: ci.qty - 1 };
      }

      return { id: ci.id, qty: ci.qty };
    });

    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  useEffect(() => {
    const cart: any = localStorage.getItem("cart");
    const cartItems = JSON.parse(cart);
    const { items } = cartItems;

    const selected = items[wine.id];
    if (selected) {
      setWineQty(selected.qty);
    }

    setReRender(false);
  }, [reRender]);

  return (
    <div>
      <Header />
      <ContainerDetails>
        <div>
          <BackButton onClick={() => router.push("/")}>
            <Image
              src={back}
              width={25}
              height={25}
              loader={imageLoader}
              unoptimized
            />
          </BackButton>
        </div>
        <ImageDiv style={{ position: "relative" }}>
          <Image
            src={wine.image}
            layout='fill'
            objectFit='contain'
            loader={imageLoader}
            unoptimized
          />
        </ImageDiv>
        <DetailsDiv>
          <h1>{wine.name}</h1>
          <p>
            <img
              src={wine.flag}
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
            />
            {wine.country} {wine.type} {wine.classification}{" "}
            <img src='https://img.wine.com.br/fenix/image/_big_bang/icons/star.svg' />{" "}
            {wine.rating}
          </p>
          <h3>R$ {wine.priceMember}</h3>
          <h4>Não sócio R$ {wine.priceNonMember}</h4>
          <strong>Comentário do Sommelier</strong>
          <p>{wine.sommelierComment}</p>
          <p>
            <Button onClick={({ target }) => actualize(target)} value={wine.id}>
              +
            </Button>
            <Button
              onClick={({ target }) => handleDelete(target)}
              value={wine.id}
            >
              -
            </Button>
            <Button>{wineQty} Adicionar</Button>
          </p>
        </DetailsDiv>
      </ContainerDetails>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: any = context.query;

  const res = await fetch("https://wine-back-test.herokuapp.com/products");

  const { items }: GetWineResults = await res.json();

  const selectedWine = items[id];

  return {
    props: {
      wine: selectedWine,
    },
  };
};

export default WineDetails;

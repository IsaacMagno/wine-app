import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { GetWineResults } from "../../types";
import imageLoader from "../../imageLoader";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  ContainerDetails,
  DetailsDiv,
  ImageDiv,
  BackButton,
  AddButtons,
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

    const selected = cartItems.items.filter((i: any) => i.id == wine.id);

    if (selected[0]) {
      if (selected[0].qty > 0) {
        setWineQty(selected[0].qty - 1);

        cartItems.items = cartItems.items.map((ci: any) => {
          if (ci.id === value) {
            return { id: ci.id, qty: ci.qty - 1 };
          }

          return { id: ci.id, qty: ci.qty };
        });
      } else {
        cartItems.items = cartItems.items.filter((ci: any) => ci.id !== value);
      }
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    setReRender(true);
  };

  useEffect(() => {
    const cart: any = localStorage.getItem("cart");
    if (!cart) return setWineQty(0);

    const cartItems = JSON.parse(cart);
    const { items } = cartItems;

    const selected = items.filter((i: any) => i.id == wine.id);
    if (selected[0]) {
      setWineQty(selected[0].qty);
    }

    setReRender(false);
  }, [reRender]);

  return (
    <div>
      <Head>
        <title>Wine - Detalhes</title>
        <meta name='description' content='Detalhes vinho' />
      </Head>
      <Header />
      <ContainerDetails>
        <div>
          <BackButton onClick={() => router.push("/")}>
            <Image
              src={back}
              width={18}
              height={18}
              loader={imageLoader}
              unoptimized
              alt='back button'
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
            alt={wine.name}
          />
        </ImageDiv>
        <DetailsDiv>
          <h1>{wine.name}</h1>
          <p>
            <Image
              loader={imageLoader}
              src={wine.flag}
              width={20}
              height={20}
              style={{ marginRight: "8px" }}
              alt={wine.country}
              unoptimized
            />
            {wine.country} {wine.type} {wine.classification}
            <Image
              loader={imageLoader}
              width={17}
              height={17}
              src='https://img.wine.com.br/fenix/image/_big_bang/icons/star.svg'
              alt={wine.rating}
              unoptimized
            />
            {wine.rating}
          </p>
          <h3>R$ {wine.priceMember}</h3>
          <h4>Não sócio R$ {wine.priceNonMember}</h4>
          <strong>Comentário do Sommelier</strong>
          <p>{wine.sommelierComment}</p>
          <p>
            <AddButtons
              onClick={({ target }) => actualize(target)}
              value={wine.id}
            >
              +
            </AddButtons>
            <AddButtons>{wineQty}</AddButtons>
            <AddButtons
              onClick={({ target }) => handleDelete(target)}
              value={wine.id}
            >
              -
            </AddButtons>
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

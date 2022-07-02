import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { GetWineResults } from "../../types";
import imageLoader from "../../imageLoader";
import Image from "next/image";
import Link from "next/link";
import { Container, DetailsDiv, ImageDiv } from "../../styles/main";
import { handleSubmit } from "../../functions/handleSubmit";

const WineDetails = ({ wine }: any) => {
  const [wineQty, setWineQty] = useState(0);
  const [reRender, setReRender] = useState(false);

  const actualize = (target: any) => {
    handleSubmit(target);

    setReRender(true);
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
    <Container>
      <div>
        <Link href='/'>Voltar</Link>
      </div>
      <ImageDiv>
        <Image
          src={wine.image}
          width='300'
          height='400'
          loader={imageLoader}
          unoptimized
        />
      </ImageDiv>
      <DetailsDiv>
        <h1>{wine.name}</h1>
        <p>
          <Image
            src={wine.flag}
            width='25'
            height='25'
            loader={imageLoader}
            unoptimized
          />
          {wine.country} {wine.type} {wine.classification} {wine.rating}
        </p>
        <h3>R$ {wine.priceMember}</h3>
        <h4>Não sócio R$ {wine.priceNonMember}</h4>
        <strong>Comentário do Sommelier</strong>
        <p>{wine.sommelierComment}</p>
        <p>
          <button onClick={({ target }) => actualize(target)} value={wine.id}>
            + | {wineQty} Adicionar
          </button>
        </p>
      </DetailsDiv>
    </Container>
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

import { GetServerSideProps } from "next";
import { GetWineResults } from "../../types";
import imageLoader from "../../imageLoader";
import Image from "next/image";
import { Container, DetailsDiv, ImageDiv } from "../../styles/main";

const WineDetails = ({ wine }: any) => {
  console.log(wine);
  return (
    <Container>
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
          <button>+ | 0</button>
          <button>Adicionar</button>
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

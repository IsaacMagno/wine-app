import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { Wine, GetWineResults } from "../types";
import imageLoader from "../imageLoader";
import { Container, Card, Button, LinkCard, Div } from "../styles/main";

const Home: NextPage<{ wines: Wine[] }> = ({ wines }) => {
  return (
    <Container>
      <Head>
        <title>Catálogo Wine</title>
        <meta name='description' content='catálogo de vinhos' />
      </Head>
      {wines.map((wine) => {
        return (
          <Div>
            <LinkCard href={`/details/${wine.id}`}>
              <Card key={wine.id}>
                <h4>{wine.name}</h4>
                <Image
                  loader={imageLoader}
                  unoptimized
                  src={wine.image}
                  alt={wine.name}
                  width={200}
                  height={500}
                />
                <p>{`${wine.discount}% OFF`}</p>
                <p>{`Sócio Wine R$ ${wine.priceMember}`}</p>
                <p>{`Não Sócio R$ ${wine.priceNonMember}`}</p>
              </Card>
            </LinkCard>
            <Button>Adicionar</Button>
          </Div>
        );
      })}
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(
    "https://wine-back-test.herokuapp.com/products?page=1&limit=10"
  );
  const { items }: GetWineResults = await res.json();

  return {
    props: {
      wines: items,
    },
  };
};

export default Home;

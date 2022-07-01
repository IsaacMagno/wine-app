import React, { useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Wine, GetWineResults } from "../types";
import imageLoader from "../imageLoader";
import { Container, Card, Button, Div } from "../styles/main";

const Home: NextPage<{ wines: Wine[] }> = ({ wines }) => {
  const handleChange = ({ value }: any) => {
    if (value === "0") {
      console.log("acima 40");
    }
    if (value === "1") {
      console.log("40 60");
      console.log(wines);
    }
    if (value === "2") {
      console.log("100 200");
    }
    if (value === "3") {
      console.log("200 500");
    }
    if (value === "4") {
      console.log("acima 500");
    }
  };

  return (
    <Container>
      <Head>
        <title>Catálogo Wine</title>
        <meta name='description' content='catálogo de vinhos' />
      </Head>
      <div>
        <p>Refine sua busca</p>
        <select onChange={({ target }) => handleChange(target)}>
          <option value='0'>Até R$ 40</option>
          <option value='1'>R$ 40 A R$ 60</option>
          <option value='2'>R$ 100 A R$ 200</option>
          <option value='3'>R$ 200 A R$ 500</option>
          <option value='4'>Acima de R$ 500</option>
        </select>
      </div>
      {wines.map((wine) => {
        return (
          <Div>
            <Link href={`/details/${wine.id}`}>
              <Card key={wine.id}>
                <h4>{wine.name}</h4>
                <Image
                  loader={imageLoader}
                  unoptimized
                  src={wine.image}
                  alt={wine.name}
                  width={200}
                  height={400}
                />
                <p>{`${wine.discount}% OFF`}</p>
                <p>{`Sócio Wine R$ ${wine.priceMember}`}</p>
                <p>{`Não Sócio R$ ${wine.priceNonMember}`}</p>
              </Card>
            </Link>
            <Button>Adicionar</Button>
          </Div>
        );
      })}
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://wine-back-test.herokuapp.com/products");
  const { items }: GetWineResults = await res.json();

  return {
    props: {
      wines: items,
    },
  };
};

export default Home;

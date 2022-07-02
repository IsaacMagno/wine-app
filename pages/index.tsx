import React, { useState, useEffect } from "react";
import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Wine, GetWineResults } from "../types";
import imageLoader from "../imageLoader";
import {
  Container,
  Card,
  Button,
  Div,
  Select,
  ContainerWines,
} from "../styles/main";
import { handleSubmit } from "../functions/handleSubmit";
import Header from "../components/Header";
import axios from "axios";

const Home: NextPage<{ wines: Wine[] }> = ({ wines }) => {
  const [wineList, setWineList] = useState(wines);
  const [wineData, setWineData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const d = await axios
        .get("https://wine-back-test.herokuapp.com/products?page=1&limit=10")
        .then((o) => o.data);

      setWineData(d);
    };

    fetchData();
  }, []);

  console.log(wineData);

  const handleChange = ({ target }: any) => {
    const { value } = target;
    if (value === "0") {
      const w: any = wines.filter((wi) => wi.price < 40);
      setWineList(w);
    }
    if (value === "1") {
      const w: any = wines.filter((wi) => wi.price > 40 && wi.price < 60);
      setWineList(w);
    }
    if (value === "2") {
      const w: any = wines.filter((wi) => wi.price > 100 && wi.price < 200);
      setWineList(w);
    }
    if (value === "3") {
      const w: any = wines.filter((wi) => wi.price > 200 && wi.price < 500);
      setWineList(w);
    }
    if (value === "4") {
      const w: any = wines.filter((wi) => wi.price > 500);
      setWineList(w);
    }
    if (value === "5") {
      setWineList(wines);
    }
  };

  return (
    <div>
      <Header />

      <Container>
        <Head>
          <title>Catálogo Wine</title>
          <meta name='description' content='catálogo de vinhos' />
        </Head>

        <Select>
          <h3>Refine sua busca</h3>
          <form>
            <input
              type='radio'
              name='wine-price'
              value='0'
              onChange={(event) => handleChange(event)}
            />
            <label>Até R$ 40</label>
            <br />
            <input
              type='radio'
              name='wine-price'
              value='1'
              onChange={(event) => handleChange(event)}
            />
            <label>R$ 40 A R$ 60</label>
            <br />
            <input
              type='radio'
              name='wine-price'
              value='2'
              onChange={(event) => handleChange(event)}
            />
            <label>R$ 100 A R$ 200</label>
            <br />
            <input
              type='radio'
              name='wine-price'
              value='3'
              onChange={(event) => handleChange(event)}
            />
            <label>R$ 200 A R$ 500</label>
            <br />
            <input
              type='radio'
              name='wine-price'
              value='4'
              onChange={(event) => handleChange(event)}
            />
            <label>Acima de R$ 500</label>
            <br />
            <input
              type='radio'
              name='wine-price'
              value='5'
              onChange={(event) => handleChange(event)}
            />
            <label>Limpar</label>
          </form>
        </Select>
        <ContainerWines>
          {wineList.map((wine) => {
            return (
              <Div>
                <Link href={`/details/${wine.id}`}>
                  <Card key={wine.id} style={{ position: "relative" }}>
                    <Image
                      loader={imageLoader}
                      unoptimized
                      src={wine.image}
                      alt={wine.name}
                      width='200'
                      height='500'
                      objectFit='contain'
                    />
                    <h4>{wine.name}</h4>
                    <p>{`${wine.discount}% OFF`}</p>
                    <p>
                      <strong>Sócio Wine R$ </strong>
                      {wine.priceMember}
                    </p>
                    <p>{`Não Sócio R$ ${wine.priceNonMember}`}</p>
                  </Card>
                </Link>
                <Button
                  onClick={({ target }) => handleSubmit(target)}
                  value={wine.id}
                >
                  Adicionar
                </Button>
              </Div>
            );
          })}
        </ContainerWines>
      </Container>
    </div>
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

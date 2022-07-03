import React, { useState, useEffect } from "react";
import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import imageLoader from "../imageLoader";
import {
  Container,
  Card,
  Button,
  Div,
  Select,
  ContainerWines,
  PageButton,
  Search,
} from "../styles/main";
import { handleSubmit } from "../functions/handleSubmit";
import Header from "../components/Header";
import axios from "axios";

const Home: NextPage<{ wines: any }> = ({ wines }) => {
  const [wineList, setWineList] = useState(wines);
  const [winePages, setPage] = useState([0, 10]);
  const [reRender, setReRender] = useState(false);

  const actualize = (target: any) => {
    handleSubmit(target);

    setReRender(true);
  };

  useEffect(() => {
    setReRender(false);
  }, [reRender]);

  useEffect(() => {
    const pagination = () => {
      const d = wines;

      if (winePages[0] < 0) {
        setPage([0, 10]);
      }

      if (winePages[1] > 70) {
        setPage([60, 70]);
      }

      const show = d.slice(...winePages);

      setWineList(show);
    };

    pagination();
  }, [winePages]);

  const handleChange = ({ target }: any) => {
    const { value } = target;
    if (value === "0") {
      const w: any = wines.filter((wi: any) => wi.price < 40);
      setWineList(w);
    }
    if (value === "1") {
      const w: any = wines.filter((wi: any) => wi.price > 40 && wi.price < 60);
      setWineList(w);
    }
    if (value === "2") {
      const w: any = wines.filter(
        (wi: any) => wi.price > 100 && wi.price < 200
      );
      setWineList(w);
    }
    if (value === "3") {
      const w: any = wines.filter(
        (wi: any) => wi.price > 200 && wi.price < 500
      );
      setWineList(w);
    }
    if (value === "4") {
      const w: any = wines.filter((wi: any) => wi.price > 500);
      setWineList(w);
    }
    if (value === "5") {
      setWineList(wines);
    }
  };

  const handleSearch = ({ target }: any) => {
    const { value } = target;
    const filteredResult = wines.filter((w: any) =>
      w.name.toLowerCase().includes(value.toLowerCase())
    );
    setWineList(filteredResult);
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
            <Search
              type='text'
              placeholder='Pesquisar'
              onChange={(event) => handleSearch(event)}
            />
            <br />
            <br />
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
            <br />
            <br />
          </form>
          <div>
            <PageButton
              onClick={() => setPage([winePages[0] - 10, winePages[1] - 10])}
            >
              Anterior
            </PageButton>
            <PageButton
              onClick={() => setPage([winePages[0] + 10, winePages[1] + 10])}
            >
              Próxima
            </PageButton>
          </div>
        </Select>
        <ContainerWines>
          {wineList.length > 0 ? (
            wineList.map((wine: any) => {
              return (
                <Div key={wine.id}>
                  <Link href={`/details/${wine.id}`}>
                    <Card style={{ position: "relative" }}>
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
                    onClick={({ target }) => actualize(target)}
                    value={wine.id}
                  >
                    Adicionar
                  </Button>
                </Div>
              );
            })
          ) : (
            <div>Sem resultados</div>
          )}
        </ContainerWines>
      </Container>
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

export default Home;

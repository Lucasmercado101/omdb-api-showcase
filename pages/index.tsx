import React from "react";
import Head from "next/head";
import Searchbar from "../components/Searchbar";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
`;

export default function Home() {
  return (
    <Container>
      <Head>
        <title>OMDB Api App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Searchbar />
    </Container>
  );
}

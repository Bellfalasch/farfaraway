import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useState } from "react";
import { Card, Col, Row, Input, Space } from 'antd';

import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  const client = new ApolloClient({
      uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
      cache: new InMemoryCache()
  });
  const { data } = await client.query({
      query: gql`
        query {
          allFilms {
            films {
              id
              title
              director
              producers
              speciesConnection {
                species {
                  name
                  language
                  averageHeight
                }
              }
            }
          }
        }`
  });
  return {
      props: {
          data
      }
  }
}

const Search: NextPage = (movies) => {
    const { data } = movies;
    const [search, setNewSearch] = useState("");
    const [searchDB, setSearchDB] = useState(data?.allFilms.films);

    const { Search } = Input;
    const handleSearchChange = (e) => {
      setNewSearch(e.target.value);
    };

    const filtered = !search
    ? searchDB
    : searchDB.filter((film) =>
        film.title.toLowerCase().includes(search.toLowerCase())
      );
  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <Head>
        <title className="text-3xl text-green-600 p-2">Search Movies Database</title>
        <meta name="description" content="Search Star wars movie Data base" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <h1 className="">
          Search Star wars movies Database
        </h1>

        <Space direction="vertical">
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onChange={handleSearchChange}
          />
        </Space>
        

        <div className="site-card-wrapper">
            <Row gutter={16}>
              {filtered.map((film) => (
                <Col span={8}>
                  <a href={`/movies/${film.id}`} key={film.id}>
                    <Card key={film.id} title={film.title} bordered={false}>
                      Director: {film.director}
                    </Card>
                  </a>
                </Col>
              ))}
            </Row>
          </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Search

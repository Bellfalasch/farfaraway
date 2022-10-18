import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { useRef } from "react";

import styles from '../styles/Home.module.css'


export async function getStaticProps() {
  const client = new ApolloClient({
      uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
      cache: new InMemoryCache()
  });
  const { data } = await client.query({
      query: gql`
  query ($searchQuery: String) {
    allFilms {
      films(filter:) {
        id
        title
        director
        releaseDate
        speciesConnection {
          species {
            name
            classification
            homeworld {
              name
            }
          }
        }
      }
    }
  }
  `
  });
  return {
      props: {
          data
      }
  }
}

const Search: NextPage = (movies) => {
    const { data } = movies;
    const clickPoint = useRef();
    const handleFocus = () => {
        clickPoint.current.style.display = "none";
    };

    const handleBlur = () => {
        clickPoint.current.style.display = "block";
    };
  return (
    <div className={styles.container}>
      <Head>
        <title>Search Movies Database</title>
        <meta name="description" content="Search Star wars movie Data base" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
        Search Star wars movies Database
        </h1>

        <div className="items-center px-4 flex justify-center" >
            <div className="relative mr-3">
                <div className="absolute top-3 left-3 items-center" ref={clickPoint}>
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input
                    type="text"
                    className="block p-2 pl-10 w-70 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:pl-3"
                    placeholder="Search Here..."
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
        </div>

        {data.allFilms.films.map((film) => (
          <div key={film.id}>{film.title}</div>
        ))}
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

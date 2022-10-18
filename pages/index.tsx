import type { NextPage } from 'next'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Layout, List } from 'antd';
import Link from 'next/link';

export async function getStaticProps() {
    const client = new ApolloClient({
        uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
        cache: new InMemoryCache()
    });
    const { data } = await client.query({
        query: gql`
    query Query {
      allFilms {
        films {
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

const Home: NextPage = (movies) => {
    const data = movies.data.allFilms.films
    return (
        <Layout>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item
                        actions={[<Link href={`/movies/${item.id}`} key={item.id}>See more</Link>]
                        }
                    >
                        <List.Item.Meta
                            title={item.title}
                            description={item.releaseDate}
                        />
                    </List.Item >
                )
                }
            />
        </Layout >

    )
}

export default Home

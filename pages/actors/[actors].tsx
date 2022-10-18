import type { NextPage } from 'next'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Layout, List } from 'antd';
import Link from 'next/link';
import { Typography } from 'antd';
const { Title } = Typography;


export async function getServerSideProps(context) {
    console.log(context.query)
    const client = new ApolloClient({
        uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
        cache: new InMemoryCache()
    });
    const { data } = await client.query({
        query: gql`
        query Query {
          person {
            name
            eyeColor
            birthYear
            gender
            id
          }
        }
    `,
    variables: {}
    });
    return {
        props: {
            data
        }
    }
}

const Actors: NextPage = (data) => {
    console.log(data)
    return (
        <Layout>
            <Title>{data.name}</Title>
        </Layout >

    )
}

export default Actors

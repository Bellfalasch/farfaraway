import type { NextPage } from 'next'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Typography } from 'antd';

// @ts-ignore
export async function getServerSideProps(context) {
    console.log(context.query)
    const client = new ApolloClient({
        uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
        cache: new InMemoryCache()
    });
    const { data } = await client.query({
        query: gql`
      query Query {
        allPeople {
          people {
            id
            name
            eyeColor
            height
          }
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

const Actors: NextPage = (actor) => {
  // @ts-ignore
    const data = actor.data.allPeople.people;
    const { Title, Paragraph } = Typography;
    //console.log(data)
    return (
        <>
    <Typography>
      <Title>CHARACTERS</Title>
      <Paragraph>An individual person or character within the Star Wars universe.</Paragraph>
      <ul>
            {
              // @ts-ignore
            data.map((char) => (
            <li  key={char.id}><b>{char.name}</b> - eyecolor: {char.eyeColor}, height: {char.height}</li>
            ))}
      </ul>
        
    </Typography>
    </>
        

    )
}

export default Actors

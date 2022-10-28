import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Typography } from 'antd';

export async function getStaticProps() {
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
  `
  });
  return {
      props: {
          data
      }
  }
}


const Characters: NextPage = (character) => {
  const data = character.data.allPeople.people;
  const { Title, Paragraph } = Typography;
  return (
    <>
    <Typography>
      <Title>CHARACTERS</Title>
      <Paragraph>An individual person or character within the Star Wars universe.</Paragraph>
      <ul>
            {data.map((char) => (
            <li  key={char.id}><b>{char.name}</b> - eyecolor: {char.eyeColor}, height: {char.height}</li>
            ))}
      </ul>
        
    </Typography>
    </>
  )
}

export default Characters

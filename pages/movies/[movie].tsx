import { useRouter } from 'next/router'
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

const Movie = () => {
  const router = useRouter()
  const { movie } = router.query

  if (movie) {
    const movieData = MovieInformation(movie as string);
    console.log(JSON.stringify(movieData,null,4));
  }
  return <p>Movie: {movie}</p>
}

export default Movie


const GET_MOVIE_DATA = gql`
  query getFilms {
    film(id: $movieId) {
      id
      title
      director
      releaseDate
    }
  }
`;

function MovieInformation(movieId: string) {
  const client = new ApolloClient({
    uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    cache: new InMemoryCache()
  });
  const { loading, error, data } = useQuery(GET_MOVIE_DATA, {
    variables: { movieId }
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return data;
}

export async function getServerSideProps() {
  const client = new ApolloClient({
    uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    cache: new InMemoryCache()
  });
  const { data } = await client.query({
    query: gql`
    query getMovies {
      film(id: "ZmlsbXM6NQ==") {
        id
        title
        director
        releaseDate
      }
    }
    `
  });
  //console.log(data)
  return {
    props: {
      data
    }
  }
}
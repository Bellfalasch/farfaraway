import { useRouter } from 'next/router'
import client from "../../../apollo-client";
import { ApolloProvider, gql, useQuery } from '@apollo/client';

export default function Page({
  params,
}: {
  params: { movies: string };
}) {
  return <h1>Hello, Next.js! {params.movies}</h1>;
}
/*
const Movie = () => {
  const router = useRouter()
  const { movie } = router.query

  const movieData = MovieInformation(movie as string);
  console.log(JSON.stringify(movieData,null,4))
  return (
  <ApolloProvider client={client}>
    <p>Movie: {movieData?.film?.title}</p>
  </ApolloProvider>)
}

export default Movie

const GET_MOVIE_DATA = gql`
  query getFilm($id: ID!) {
    film(id: $id) {
      id
      title
      director
      releaseDate
    }
  }
`;

function MovieInformation(movieId: string) {
  const { loading, error, data } = useQuery(GET_MOVIE_DATA, {
    client,
    variables: { id: movieId },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return data;
}*/
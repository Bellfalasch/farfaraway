
export default function Page({
  params,
}: {
  params: { movies: string };
}) {
  console.log(params.movies);
  const movieData = getMovieData(params.movies as string);
  console.log(JSON.stringify(movieData,null,4));
  // @ts-ignore
  return <h1>Hello {movieData?.film?.title}</h1>;
}

async function getMovieData(id: string) {
  const cleaned = decodeURIComponent(id)
  const query = `
      query getFilm {
        film(id: "`+ cleaned + `") {
          id
          title
          director
          releaseDate
          characterConnection {
            edges {
              node {
                name
              }
            }
          }
        }
      }
  `;

  const response = await fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query
    }),
  })
  return await response.json();

}
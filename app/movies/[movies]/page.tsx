
export default function Page({
  params,
}: {
  params: { movies: string };
}) {
  console.log(params.movies);
  const movieData = getMovieData(params.movies as string);
  if (movieData) {
    console.log(JSON.stringify(movieData,null,4));
    // @ts-ignore
    return <h1>Hello {movieData?.film?.title}</h1>;
  } else {
    return <h1>Nothing found</h1>
  }
}

async function getMovieData(id: string) {
  const cleaned = decodeURIComponent(id);
  console.log(cleaned);
  const query = `
    query getFilm($id: ID!)
    {
      film(id: $id)
      {
        id
        title
        director
        releaseDate
        characterConnection
        {
          edges
          {
            node
            {
              name
            }
          }
        }
      }
    }
  `;
  //console.log(JSON.stringify(query,null,4));

  const response = await fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
    method: 'POST',
    headers: {
      "content-type": "application/json",
      "Cache-Control": "no-store",
    },
    body:
      JSON.stringify({
        "query": query,
        "variables": { "id": cleaned }
      }),
  })
  return await response.json();

}
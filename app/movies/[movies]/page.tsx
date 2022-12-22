
async function Page({
  params,
}: {
  params: { movies: string };
}) {
  console.log(params.movies);
  const movieData = await getMovieData(params.movies as string);
  if (movieData) {
    console.log(JSON.stringify(movieData,null,4));
    // @ts-ignore
    const film = movieData?.data?.film;
    return (
      <>
        <h1>Star Wars {film?.episodeID}</h1>
        <h2>{film?.title}</h2>
        <h3>Directed by {film?.director}</h3>
        <h4>Released {film?.releaseDate}</h4>
      </>
    );
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
        episodeID
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

  const response = await fetch(
    'https://swapi-graphql.netlify.app/.netlify/functions/index',
    {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        "Cache-Control": "no-store",
      },
      body:
        JSON.stringify({
          query: query,
          variables: { id: cleaned }
        }),
    }
  );
  //.then(response => { const res = response.json(); console.log(res) })
  //.then(data => { console.log('data',data); return data });
  //console.log(response.ok);
  //console.log(response.status);
  return await response.json();
}

export default Page;
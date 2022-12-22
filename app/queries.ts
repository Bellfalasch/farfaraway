export const getAllMovies = `
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
`;

export const getThisMovie = `
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
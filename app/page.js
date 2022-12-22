import 'antd/dist/antd.css';

import Link from 'next/link';
import Layout, { List } from 'antd/lib/layout/layout';
import getAllMovies from './queries';

export default async function Page() {
  const allMovies = await allMovies();
  const data = allMovies?.data?.allFilms?.films;

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
    </Layout>
  );
}

async function allMovies() {
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
          query: getAllMovies
        })
    }
  );

  return await response.json();
}
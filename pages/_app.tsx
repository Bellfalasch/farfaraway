
import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import { Menu } from 'antd';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
        /*
        items={new Array(15).fill(null).map((_, index) => {
          const key = index + 1;
          return {
            key,
            label: `nav ${key}`,
          };
        })}*/
        />
      </Header>
      <Content style={{ padding: '0 50px' }} >
        <Component {...pageProps} />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Star wars ©2022 Created by BOBB</Footer>
    </Layout>
  )
}

export default MyApp

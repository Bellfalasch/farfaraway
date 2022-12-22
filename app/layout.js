import 'antd/dist/antd.css';

import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import { Menu } from 'antd';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
            />
          </Header>
          <Content style={{ padding: '0 50px' }} >
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Star wars ©2022 Created by BOBB</Footer>
        </Layout>
      </body>
    </html>
  );
}
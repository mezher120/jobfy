import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UpCircleOutlined,
    PlusCircleOutlined,
    LogoutOutlined,

  } from '@ant-design/icons';
  import { Layout, Menu } from 'antd';
  import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Filter from './Filter';

  const { Header, Sider, Content } = Layout;
  
  const DefaultLayout = (props) => {
    const [collapsed, setCollapsed] = useState(false);

function onLogOut(params) {  // para el logout lo removes del local storage al usuario y por el componente protected routes no podes entrar hasta loguearte nuevamente
  localStorage.removeItem('user');
  window.location.href='/login';
}

const userName = JSON.parse(localStorage.getItem('user')).username;

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} 
        style={{position: 'sticky', height: '100%', top:0}} >
          <div className="logo">
            {!collapsed ? <h1>JOBFY</h1> : <h1>JF</h1>}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[window.location.pathname]}
            items={[
              {
                key: '/',
                icon: <UserOutlined />,
                label: <Link to='/' >Home</Link>,
              },
              {
                key: '/profile',
                icon: <VideoCameraOutlined />,
                label: <Link to='/profile' >Profile</Link>,
              },
              {
                key: '/appliedjobs',
                icon: <UpCircleOutlined />,
                label: <Link to='/appliedjobs' >Applied Jobs</Link>,
              },
              {
                key: '/postjob',
                icon: <PlusCircleOutlined />,
                label: <Link to='/postjob' >Post Jobs</Link>,
              },
              {
              key: '/posted',
              icon: <UploadOutlined />,
              label: <Link to='/posted' >Job Posted</Link>,
              },
              {
                key: '/login',
                icon: <LogoutOutlined />,
                label: <Link onClick={onLogOut}>Log Out</Link>,
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0, position: 'sticky', top: 0, zIndex: 9999
            }}
          >

            <div className='flex justify-content-between navb'>
              <div>

            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
              </div>
              <div>
                <Filter />
              </div>
              <div className='usernav flex'>
                <UserOutlined /><h5><b>{userName}</b></h5>
              </div>
            </div>


          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    );
  };
  
  export default DefaultLayout;
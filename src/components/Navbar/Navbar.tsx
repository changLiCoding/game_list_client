import { useState } from 'react';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

import style from './Navbar.module.css'
import type { MenuProps } from 'antd';

export default function Navbar() {
  const items: MenuProps['items'] = [
    {
      label: 'Home',
      key: 'home',
    },
    {
      label: 'Profile',
      key: 'mail',
      icon: <MailOutlined />,
    },
    {
      label: 'Game List',
      key: 'app',
      icon: <AppstoreOutlined />,
      disabled: true,
    },
  ];

  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu className={style.root} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
  )
}


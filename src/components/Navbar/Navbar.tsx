import { useState } from 'react';
import { Menu, Layout, Button, Drawer, Image } from 'antd';
import { AppstoreOutlined, MailOutlined, MenuOutlined } from '@ant-design/icons';

import './Navbar.css'
import type { MenuProps } from 'antd';

const { Header, Content, Footer } = Layout;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const items: MenuProps['items'] = [
    {
      label: 'Home',
      key: 'title',
      className: "menu_item_title"
    },
    {
      label: 'Profile',
      key: 'profile',
      className: "menu-item"
    },
    {
      label: 'Game List',
      key: 'app',
      className: "menu-item"
    }
  ]

  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <>

      <header className="header">

        <div className="logo1">
          <a href="/home">
            <svg style={{ width: "2rem", height: "2rem", color: "rgb(93 93 255)", fill: "currentcolor" }} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M31.952 14.751a260.51 260.51 0 00-4.359-4.407C23.932 6.734 20.16 3.182 16.171 0c1.634.017 3.21.28 4.692.751 3.487 3.114 6.846 6.398 10.163 9.737.493 1.346.811 2.776.926 4.262zm-1.388 7.883c-2.496-2.597-5.051-5.12-7.737-7.471-3.706-3.246-10.693-9.81-15.736-7.418-4.552 2.158-4.717 10.543-4.96 16.238A15.926 15.926 0 010 16C0 9.799 3.528 4.421 8.686 1.766c1.82.593 3.593 1.675 5.038 2.587 6.569 4.14 12.29 9.71 17.792 15.57-.237.94-.557 1.846-.952 2.711zm-4.505 5.81a56.161 56.161 0 00-1.007-.823c-2.574-2.054-6.087-4.805-9.394-4.044-3.022.695-4.264 4.267-4.97 7.52a15.945 15.945 0 01-3.665-1.85c.366-3.242.89-6.675 2.405-9.364 2.315-4.107 6.287-3.072 9.613-1.132 3.36 1.96 6.417 4.572 9.313 7.417a16.097 16.097 0 01-2.295 2.275z" />
            </svg>
          </a>
        </div>

        <nav className="nav1">
          <ul className="ul1">
            <li>
              <a className="li1">Home</a>
            </li>
            <li>
              <a className="li1">Profile</a>
            </li>
            <li>
              <a className="li1">Game List</a>
            </li>
          </ul>

          <ul className="ul1">
            <li>
              <a className="li1"
                href="signin.html">Sign in</a>
            </li>
            <Image
              width={38}
              height={38}
              preview={false}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </ul>
        </nav>
      </header>

      {/* <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer className={style.navbar_drawer} title="Game List" placement="right" closable={false} onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        {/* <Menu className={style.navbar} onClick={onClick} selectedKeys={[current]} mode="vertical" items={items} /> 
      </Drawer> */}
    </>
  )
}

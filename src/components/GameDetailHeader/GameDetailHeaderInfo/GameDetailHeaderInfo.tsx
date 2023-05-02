import { Button, Layout, Dropdown } from 'antd';
import type { MenuProps } from 'antd';

import { HeartOutlined } from '@ant-design/icons';

import { Content } from 'antd/es/layout/layout';
import { Game as GameType } from '@/graphql/__generated__/graphql';
import styles from '@/components/GameDetailHeader/GameDetailHeaderInfo/GameDetailHeaderInfo.module.scss';

function GameDetailHeaderInfo({ game }: { game: GameType | undefined }) {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];

  return (
    <Layout className={styles.infoContainer}>
      <Content className={styles.infoContent}>
        <div className={styles.infoOverlap}>
          <div className={styles.overlapInner}>
            <img
              alt={game?.name}
              src="https://upload.wikimedia.org/wikipedia/zh/thumb/f/fe/Sekiro_art_%28Re-uploaded%29.jpg/220px-Sekiro_art_%28Re-uploaded%29.jpg"
              className={styles.infoImage}
            />
            <div className={styles.infoActions}>
              <div className={styles.listActions}>
                <Button className={styles.add}>add to list </Button>
                <div>
                  <Dropdown menu={{ items }} placement="bottom" arrow>
                    <Button>Change Status</Button>
                  </Dropdown>
                </div>
              </div>
              <div>
                <Button>
                  <HeartOutlined />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.infoInfo}>content</div>
      </Content>
    </Layout>
  );
}

export default GameDetailHeaderInfo;
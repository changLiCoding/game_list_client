import { Button, Col, Row, Statistic, Divider } from 'antd';

import styles from '@/components/ProfileContent/Overview/MainSection/ListStatistic/ListStatistic.module.scss';
import type { UserGamesType } from '@/types/global';

function ListStatistic({ gamesByStatus }: { gamesByStatus?: UserGamesType }) {
  console.log(gamesByStatus);

  return (
    <Row gutter={16} className={styles.statisticContainer}>
      <Col span={4}>
        <Statistic
          valueStyle={{ color: '#b368e6', fontSize: '14px' }}
          title="Games"
          value={15}
        />
      </Col>
      <Col span={4}>
        <Statistic
          title="Playing"
          value={5}
          valueStyle={{ color: '#b368e6', fontSize: '14px' }}
        />
      </Col>
      <Col span={4}>
        <Statistic
          title="Planning"
          value={2}
          valueStyle={{ color: '#b368e6', fontSize: '14px' }}
        />
      </Col>
      <Col span={4}>
        <Statistic
          title="Completed"
          value={1}
          valueStyle={{ color: '#b368e6', fontSize: '14px' }}
        />
      </Col>
      <Col span={4}>
        <Statistic
          title="Dropped"
          value={2}
          valueStyle={{ color: '#b368e6', fontSize: '14px' }}
        />
      </Col>

      <Col span={4}>
        <Statistic
          title="Paused"
          value={5}
          valueStyle={{ color: '#b368e6', fontSize: '14px' }}
        />
      </Col>
      <Divider
        style={{ fontSize: '12px', color: 'rgb(92, 114, 138)' }}
        orientation="left"
      >
        Activities
      </Divider>
      <Col span={18}>
        <Statistic title="Active Users" value={1153} loading />
      </Col>
    </Row>
  );
}

export default ListStatistic;

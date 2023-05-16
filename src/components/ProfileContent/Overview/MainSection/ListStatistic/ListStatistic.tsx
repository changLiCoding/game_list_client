import { Button, Col, Row, Statistic } from 'antd';

import styles from '@/components/ProfileContent/Overview/MainSection/ListStatistic/ListStatistic.module.scss';

function ListStatistic() {
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
        <Statistic title="Playing" value={5} />
      </Col>
      <Col span={4}>
        <Statistic title="Planning" value={2} />
      </Col>
      <Col span={4}>
        <Statistic title="Completed" value={1} />
      </Col>
      <Col span={4}>
        <Statistic title="Dropped" value={2} />
      </Col>

      <Col span={4}>
        <Statistic title="Paused" value={5} />
      </Col>
      <Col span={18}>
        <Statistic title="Active Users" value={1153} loading />
      </Col>
    </Row>
  );
}

export default ListStatistic;

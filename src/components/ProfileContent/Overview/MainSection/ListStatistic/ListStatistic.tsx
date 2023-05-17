import { Col, Row, Statistic, Divider } from 'antd';

import styles from '@/components/ProfileContent/Overview/MainSection/ListStatistic/ListStatistic.module.scss';
import type { UserGamesByStatus } from '@/graphql/__generated__/graphql';

function ListStatistic({
  gamesByStatus,
}: {
  gamesByStatus?: UserGamesByStatus;
}) {
  const gameStatusExtractor = (gamesObjData: UserGamesByStatus) => {
    const result: JSX.Element[] = [];
    Object.keys(gamesObjData).forEach((key) => {
      if (key.includes('Count')) {
        result.push(
          <Col span={4}>
            <Statistic
              valueStyle={{ color: '#b368e6', fontSize: '14px' }}
              title={key.replace('Count', '').toUpperCase()}
              value={
                gamesObjData[
                  key as
                    | 'playingCount'
                    | 'completedCount'
                    | 'pausedCount'
                    | 'droppedCount'
                    | 'planningCount'
                ] || undefined
              }
            />
          </Col>
        );
      }
    });
    return result;
  };

  return (
    <Row gutter={16} className={styles.statisticContainer}>
      {gamesByStatus && gameStatusExtractor(gamesByStatus)}

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

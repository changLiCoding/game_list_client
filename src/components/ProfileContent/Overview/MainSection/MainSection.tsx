import ListStatistic from '@/components/ProfileContent/Overview/MainSection/ListStatistic/ListStatistic';
import styles from '@/components/ProfileContent/Overview/MainSection/MainSection.module.scss';

function MainSection() {
  return (
    <div className={styles.mainSection}>
      <ListStatistic />
      <div style={{ marginTop: '30px' }}>Game List Activity</div>
    </div>
  );
}

export default MainSection;

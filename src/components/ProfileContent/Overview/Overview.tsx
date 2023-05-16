import styles from '@/components/ProfileContent/Overview/Overview.module.scss';
import SideSection from '@/components/ProfileContent/Overview/SideSection/SideSection';
import MainSection from '@/components/ProfileContent/Overview/MainSection/MainSection';

function Overview() {
  return (
    <div className={styles.overview}>
      <SideSection />
      <MainSection />
    </div>
  );
}

export default Overview;

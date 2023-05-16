import styles from '@/components/ProfileContent/Overview/SideSection/SideSection.module.scss';
import ListCards from '@/components/ProfileContent/Overview/SideSection/ListCards';

function SideSection() {
  return (
    <div className={styles.sideSectionContainer}>
      SideSection
      <ListCards />
    </div>
  );
}

export default SideSection;

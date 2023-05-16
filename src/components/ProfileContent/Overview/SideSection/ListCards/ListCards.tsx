import styles from '@/components/ProfileContent/Overview/SideSection/ListCards/ListCards.module.scss';
import type { Game as GameType } from '@/graphql/__generated__/graphql';

function ListCards({
  status,
  gameData,
}: {
  status: string;
  gameData: GameType[] | number | string;
}) {
  return (
    <div className={styles.listContainer}>
      <h2>{status}</h2>
      <div className={styles.listCards}>cards</div>
    </div>
  );
}

export default ListCards;

import styles from '@/components/GameDetailHeader/GameDetailHeaderBanner/GameDetailHeaderBanner.module.scss';
import type { GameDetailsType } from '@/components/GameDetailHeader/types';

function GameDetailHeaderBanner({ game }: GameDetailsType): JSX.Element {
  return (
    <div
      role="banner"
      className={styles.banner}
      style={{
        backgroundImage: `url(${game?.bannerURL})`,
      }}
    >
      <div className={styles.shadow} />
    </div>
  );
}

export default GameDetailHeaderBanner;

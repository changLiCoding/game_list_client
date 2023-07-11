import styles from '@/components/GameDetailHeader/GameDetailHeaderBanner/GameDetailHeaderBanner.module.scss';
import type { GameDetailHeaderBannerType } from '@/components/GameDetailHeader/types';

function GameDetailHeaderBanner({
  game,
}: GameDetailHeaderBannerType): JSX.Element {
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

import { Game as GameType } from '@/graphql/__generated__/graphql';
import styles from '@/components/GameDetailHeader/GameDetailHeaderBanner/GameDetailHeaderBanner.module.scss';

function GameDetailHeaderBanner({
  game,
}: {
  game: GameType | undefined;
}): JSX.Element | null {
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

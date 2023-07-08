import { CloseOutlined } from '@ant-design/icons';
import type { Game } from '@/graphql/__generated__/graphql';
import styles from '@/components/ProfileContent/Favorites/FavoritesCard/FavoritesCard.module.scss';

type DirectorType = {
  id: string;
  name: string;
  imageURL: string;
};

function FavoritesCard({
  director,
  game,
  showRemoveConfirm,
}: {
  game?: Game;
  director?: DirectorType;
  showRemoveConfirm?: (obj: Game, type: string) => void;
}): JSX.Element {
  return game ? (
    <a
      className={styles.favoritesCardContainer}
      href={`/game-detail/${game.id}/${game.name}`}
    >
      <img
        className={styles.favoritesCard}
        src={game.imageURL ? game.imageURL : ''}
        alt={game.name}
      />
      <div className={styles.remove}>
        <CloseOutlined
          onClick={(e) => {
            e.preventDefault();
            if (showRemoveConfirm) {
              showRemoveConfirm(game, 'like');
            }
          }}
        />{' '}
      </div>
    </a>
  ) : (
    <a
      className={styles.favoritesCardContainer}
      href={director && `/game-director/${director.id}/${director.name}`}
    >
      <img
        className={styles.favoritesCard}
        src={director && director.imageURL ? director.imageURL : ''}
        alt={director && director.name}
      />
      <div className={styles.remove}>
        <CloseOutlined />
      </div>
    </a>
  );
}

export default FavoritesCard;

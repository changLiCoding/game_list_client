import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import type { Like as LikeType } from '@/graphql/__generated__/graphql';
import styles from '@/components/ProfileContent/Favorites/FavoritesCard/FavoritesCard.module.scss';

function FavoritesCard({ like }: { like: LikeType }) {
  return like.likeable.__typename === 'Game' ? (
    <a
      className={styles.favoritesCardContainer}
      href={`/game-detail/${like.likeable.id}/${like.likeable.name}`}
    >
      <img
        className={styles.favoritesCard}
        src={like.likeable.imageURL ? like.likeable.imageURL : ''}
        alt={like.likeable.name}
      />
      <div className={styles.remove}>
        <CloseOutlined />{' '}
      </div>
    </a>
  ) : null;
}

export default FavoritesCard;

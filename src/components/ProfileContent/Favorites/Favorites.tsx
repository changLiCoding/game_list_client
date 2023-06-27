import useGetLikedGames from '@/services/like/useGetLikedGames';
import styles from '@/components/ProfileContent/Favorites/Favorites.module.scss';
import FavoritesCard from '@/components/ProfileContent/Favorites/FavoritesCard/FavoritesCard';
import useRemoveModalHook from '@/hooks/useRemoveModalHook';

function Favorites() {
  const { likedGames, loading } = useGetLikedGames();

  const { showRemoveConfirm, contextRemoveModal } = useRemoveModalHook();

  return (
    <div className={styles.container}>
      Favorites
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.favorites}>
          <div className={styles.favorites}>
            <h2>games</h2>
            <div className={styles.favoritesContainer}>
              {likedGames.map((like) =>
                like.likeable.__typename === 'Game' ? (
                  <FavoritesCard
                    key={like.id}
                    game={like.likeable}
                    showRemoveConfirm={showRemoveConfirm}
                  />
                ) : null
              )}
            </div>
          </div>
          <div className={styles.favorites}>
            <h2>Companies</h2>
            <div className={styles.favoritesContainer}>
              {likedGames.map((like) => (
                <div key={like.id} />
              ))}
            </div>
          </div>
          <div className={styles.favorites}>
            <h2>Game Directors</h2>
            <div className={styles.favoritesContainer}>
              {[
                {
                  id: '1',

                  likeable: {
                    id: '1',
                    name: 'Hideo Kojima',
                    imageURL:
                      'https://images.igdb.com/igdb/image/upload/t_avatar_large/xp2uefbgrzgro0fecvt6.jpg',
                    __typename: 'GameDirector',
                  },
                },
                {
                  id: '2',
                  likeable: {
                    id: '2',
                    name: 'Hidetaka Miyazaki',
                    imageURL:
                      'https://images.igdb.com/igdb/image/upload/t_avatar_large/albrur75pcynukytdreb.jpg',
                    __typename: 'GameDirector',
                  },
                },
              ].map((likedDirector) =>
                likedDirector.likeable.__typename === 'GameDirector' ? (
                  <FavoritesCard
                    key={likedDirector.id}
                    director={likedDirector.likeable}
                  />
                ) : null
              )}
            </div>
          </div>
          <div className={styles.favorites}>
            <h2>Game </h2>
            <div className={styles.favoritesContainer}>
              {likedGames.map((like) => (
                <div key={like.id} />
              ))}
            </div>
          </div>
        </div>
      )}
      {contextRemoveModal}
    </div>
  );
}

export default Favorites;

import useGetLikedGames from '@/services/like/useGetLikedGames';
import styles from '@/components/ProfileContent/Favorites/Favorites.module.scss';
import FavoritesCard from '@/components/ProfileContent/Favorites/FavoritesCard/FavoritesCard';

function Favorites() {
  const { likedGames, loading } = useGetLikedGames();

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
                  <FavoritesCard key={like.id} like={like} />
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
              {likedGames.map((like) => (
                <div key={like.id} />
              ))}
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
    </div>
  );
}

export default Favorites;

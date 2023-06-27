import useGetLikedGames from '@/services/like/useGetLikedGames';
import styles from '@/components/ProfileContent/Favorites/Favorites.module.scss';

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
              {likedGames.map((like) => (
                <div key={like.id}>
                  {like.likeable.__typename === 'Game'
                    ? like.likeable?.name
                    : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favorites;

import useGetLikedGames from '@/services/like/useGetLikedGames';

function Favorites() {
  const { likedGames, loading } = useGetLikedGames();

  return (
    <div>
      Favorites
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {likedGames.map((like) => (
            <div key={like.id}>
              {like.likeable.__typename === 'Game' ? like.likeable?.name : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;

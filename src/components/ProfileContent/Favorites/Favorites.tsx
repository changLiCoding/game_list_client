import useGetLikedGames from '@/services/like/useGetLikedGames';

function Favorites() {
  const { likedGames, loading } = useGetLikedGames();

  console.log('likedGames', likedGames);

  return (
    <div>
      Favorites
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {likedGames.map((game) => (
            <div key={game.id}>{game.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;

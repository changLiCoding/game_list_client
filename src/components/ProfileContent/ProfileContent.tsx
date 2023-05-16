import Overview from '@/components/ProfileContent/Overview/Overview';
import Favorites from '@/components/ProfileContent/Favorites/Favorites';
import Reviews from '@/components/ProfileContent/Reviews/Reviews';
import GameList from '@/components/ProfileContent/GameList/GameList';
import Social from '@/components/ProfileContent/Social/Social';
import styles from '@/components/ProfileContent/ProfileContent.module.scss';

function ProfileContent({ routeName }: { routeName: string }) {
  const contentGenerator = (route: string) => {
    switch (route) {
      case 'overview':
        return <Overview />;
      case 'favorites':
        return <Favorites />;
      case 'reviews':
        return <Reviews />;
      case 'gameList':
        return <GameList />;
      case 'social':
        return <Social />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className={styles.profileContent}>{contentGenerator(routeName)}</div>
  );
}

export default ProfileContent;

import { useParams } from 'react-router-dom';

function UserProfile() {
  const { username } = useParams();

  return (
    <div>
      <div>{username}</div>
    </div>
  );
}

export default UserProfile;

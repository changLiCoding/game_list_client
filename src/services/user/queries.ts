import { gql } from '@apollo/client';

export const USER = gql`
  query User {
    getUserById {
      username
      bannerPicture
      userPicture
    }
  }
`;

import gql from "graphql-tag";

export const USER = gql`
  query User {
    getUserById {
      username
      bannerPicture
      userPicture
    }
  }
`;

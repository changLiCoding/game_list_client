// import { apolloClient } from "../../graphql";
// import {
//   GetAllUsersQuery,
//   LoginPayload,
// } from "../../graphql/__generated__/graphql";
// import { GET_ALL_USERS, LOGIN } from "./queries";

// class UserService {
//   async getAllUsers(token: String): Promise<GetAllUsersQuery> {
//     try {
//       const response = await apolloClient.query({
//         query: GET_ALL_USERS,
//         context: {
//           headers: {
//             // Authorization: `Bearer ${localStorage.getItem("token")}`
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       });

//       if (!response || !response.data) throw new Error("Cannot get user list!");

//       return response.data;
//     } catch (err) {
//       throw err;
//     }
//   }

//   async login(email: String, password: String): Promise<LoginPayload> {
//     try {
//       const response = await apolloClient.mutate({
//         mutation: LOGIN,
//         variables: { email, password },
//       });

//       if (!response || !response.data) throw new Error("Cannot sign user in!");

//       return response.data;
//     } catch (err) {
//       throw err;
//     }
//   }
// }

// export default new UserService();

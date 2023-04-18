import { apolloClient } from "../../graphql";
import { User } from "../../graphql/__generated__/graphql";
import { LOGIN } from "./queries";

class UserService {
  async login(email: String, password: String): Promise<User> {
    try {
      const response = await apolloClient.mutate({
        mutation: LOGIN,
        variables: { email, password },
      });

      if (!response || !response.data) throw new Error("Cannot sign user in!");

      return response.data;
    } catch (err) {
      throw err;
    }
  }
}

export default new UserService();

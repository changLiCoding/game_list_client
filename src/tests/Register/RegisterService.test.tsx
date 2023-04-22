import authentication from "../../services/authentication";

describe("Register Service", () => {
  it("Successful send register request", async () => {
    // const userData = await authentication.login("v@gmail.com", "password");
    // expect(userData).toMatchInlineSnapshot(`
    //   {
    //     "__typename": "LoginUserPayload",
    //     "errors": [],
    //     "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNiwiZXhwIjoxNjg0NzY4MzY3fQ.6uVvI-_rsmhLdHcP86LNjiVHziBwb_uyUCcejfcEk6k",
    //     "user": {
    //       "__typename": "User",
    //       "username": "Viet",
    //     },
    //   }
    // `);
    // expect(userData.user).toEqual({
    //   __typename: "User",
    //   username: "Viet",
    // });
  });
});

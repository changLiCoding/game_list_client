import { useEffect } from "react";
import Hero from "../../components/Hero/Hero";
import users from "../../services/users";

const Home = () => {
  const fetchUser = async () => {
    const loginPage = await users.login("v@gmail.com", "password");
    if (loginPage) console.log(loginPage);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <main>
      <Hero />
      <Hero />
    </main>
  );
};

export default Home;

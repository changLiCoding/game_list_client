// import { useEffect } from "react";
import Hero from "../../components/Hero";
// import users from "../../services/users";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { setUser } from "../../features/userSlice";

const Home = () => {
	// const dispatch = useAppDispatch();

	// const fetchUser = async () => {
	//   const loginPage = await users.login("v@gmail.com", "password");
	//   if (loginPage) {
	//     dispatch(setUser({ ...loginPage }));
	//   }
	// };

	// useEffect(() => {
	//   fetchUser();
	// }, []);

	return (
		<main>
			<Hero />
		</main>
	);
};

export default Home;

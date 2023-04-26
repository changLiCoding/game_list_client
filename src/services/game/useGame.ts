import { GET_ALL_GENRES, GET_ALL_PLATFORMS, GET_ALL_TAGS } from "./queries";

import { useQuery } from "@apollo/client";
import { getTokenFromLocalStorage } from "../../constants";

export default function useGame() {
	const { data: allGenres } = useQuery(
		GET_ALL_GENRES,
		getTokenFromLocalStorage
	);
	const { data: allPlatforms } = useQuery(
		GET_ALL_PLATFORMS,
		getTokenFromLocalStorage
	);
	const { data: allTags } = useQuery(GET_ALL_TAGS, getTokenFromLocalStorage);

	const genres = allGenres?.getAllGenres;
	const platforms = allPlatforms?.getAllPlatforms;
	const tags = allTags?.getAllTags;

	return { genres, platforms, tags };
}

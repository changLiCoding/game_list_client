import { Layout, Cascader } from "antd";
import useGame from "../../services/game/useGame";
import FilterField from "./FilterField";

import "./FiltersWrapper.css";

interface Option {
	value: string;
	label: string;
	children?: Option[];
}

export default function FilterWrapper() {
	const onChange = (value: string[]): void => {
		console.log(value);
	};
	const { genres, platforms, tags } = useGame();

	console.log("allGenres: ", genres);

	const optionsGenerator = (typeArray: Array<{ name: string }>): Option[] => {
		return typeArray.map((type: { name: string }) => ({
			value: type.name,
			label: type.name,
		}));
	};

	const genresOptions: Option[] = genres ? optionsGenerator(genres) : [];

	const platformsOptions: Option[] = platforms
		? optionsGenerator(platforms)
		: [];

	const tagsOptions: Option[] = tags ? optionsGenerator(tags) : [];

	console.log("Genres: ", genresOptions);
	console.log("Platforms: ", platformsOptions);
	console.log("Tags: ", tagsOptions);

	return tagsOptions.length === 0 ||
		genresOptions.length === 0 ||
		platformsOptions.length === 0 ? (
		<Layout>Loading</Layout>
	) : (
		<Layout className='layout-FilterWrapper-container'>
			<FilterField
				options={genresOptions}
				onChange={onChange}
				changeOnSelect
			/>

			<FilterField
				options={platformsOptions}
				onChange={onChange}
				changeOnSelect
			/>
			<FilterField
				options={tagsOptions}
				onChange={onChange}
				changeOnSelect
			/>
		</Layout>
	);
}

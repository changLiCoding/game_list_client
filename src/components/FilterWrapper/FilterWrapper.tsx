import React from "react";
import { Layout, Cascader } from "antd";
import useGame from "../../services/game/useGame";

import "./FilterWrapper.css";

interface Option {
	value: string;
	label: string;
	children?: Option[];
}

const options: Option[] = [
	{
		value: "PLAYSTATIONS",
		label: "PLAYSTATIONS",
		children: [
			{
				value: "PLAYSTATIONS2",
				label: "PLAYSTATIONS2",
			},
			{
				value: "PLAYSTATIONS3",
				label: "PLAYSTATIONS3",
			},
			{
				value: "PLAYSTATIONS4",
				label: "PLAYSTATIONS4",
			},
			{
				value: "PLAYSTATIONS5",
				label: "PLAYSTATIONS5",
			},
		],
	},
	{
		value: "XBOX",
		label: "XBOX",
		children: [
			{
				value: "FirstGen XBOX",
				label: "FirstGen XBOX",
			},
			{
				value: "XBOX360",
				label: "XBOX360",
			},
			{
				value: "XBOXONE",
				label: "XBOXONE",
			},
			{
				value: "XBOXSERIESX",
				label: "XBOXSERIESX",
			},
		],
	},
	{
		value: "NINTENDO",
		label: "NINTENDO",
		children: [
			{
				value: "NINTENDO64",
				label: "NINTENDO64",
			},
			{
				value: "NINTENDOGAMECUBE",
				label: "NINTENDOGAMECUBE",
			},
			{
				value: "NINTENDOWII",
				label: "NINTENDOWII",
			},
			{
				value: "NINTENDOWIIU",
				label: "NINTENDOWIIU",
			},
			{
				value: "NINTENDOSWITCH",
				label: "NINTENDOSWITCH",
			},
		],
	},
	{
		value: "PC",
		label: "PC",
		children: [
			{
				value: "PC",
				label: "PC",
			},
		],
	},
	{
		value: "MOBILE",
		label: "MOBILE",
		children: [
			{
				value: "MOBILE",
				label: "MOBILE",
			},
		],
	},
	{
		value: "OTHERS",
		label: "OTHERS",
		children: [
			{
				value: "OTHERS",
				label: "OTHERS",
			},
		],
	},
];

const onChange = (value: string[]): void => {
	console.log(value);
};

export default function FilterWrapper() {
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
		<Layout className='layout-FilterWrapper'>
			{genres && (
				<Cascader
					options={genresOptions}
					onChange={onChange}
					changeOnSelect
				/>
			)}
			{platforms && (
				<Cascader
					options={platformsOptions}
					onChange={onChange}
					changeOnSelect
				/>
			)}
			{tags && (
				<Cascader
					options={tagsOptions}
					onChange={onChange}
					changeOnSelect
				/>
			)}
			<Cascader
				options={options}
				onChange={onChange}
				changeOnSelect
			/>
			<Cascader
				options={options}
				onChange={onChange}
				changeOnSelect
			/>
		</Layout>
	);
}

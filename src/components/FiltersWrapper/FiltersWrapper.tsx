import "./FiltersWrapper.css";
import { Layout } from "antd";
import FilterField from "./FilterField";
import useGame from "@/services/game/useGame";

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
    <Layout className="layout-FiltersWrapper-container">
      <FilterField
        fieldName="Genres"
        options={genresOptions}
        onChange={onChange}
        changeOnSelect
      />

      <FilterField
        fieldName="Platforms"
        options={platformsOptions}
        onChange={onChange}
        changeOnSelect
      />
      <FilterField
        fieldName="Tags"
        options={tagsOptions}
        onChange={onChange}
        changeOnSelect
      />
      <FilterField
        fieldName="Year"
        options={[]}
        onChange={onChange}
        changeOnSelect
      />
    </Layout>
  );
}

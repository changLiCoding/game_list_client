// import React, { useEffect } from "react";
// import { useAppSelector } from "../../app/hooks";
// import { useSelector } from "react-redux";
// import { RootState } from "../../app/store";
import { Layout } from "antd";

import FilterWrapper from "../FilterWrapper/FiltersWrapper";

const Hero: React.FC = () => {
	// const user = useAppSelector((state) => state.user);

	// return <div>{user?.username ? user.username : "HHH"}</div>;
	return (
		<Layout>
			<FilterWrapper></FilterWrapper>
		</Layout>
	);
};

export default Hero;
